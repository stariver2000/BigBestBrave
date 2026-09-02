/**
 * 훅 구조 그래프와 안티패턴 검출.
 *
 * 검출 규칙은 논문 2.2절의 정의를 그대로 코드로 옮긴 것이다.
 *   - Unreferenced States and Props: 정의된 컴포넌트 안에서 안 쓰이는
 *     State 값·Prop(완전 미사용), 그리고 쓰지 않고 자식에게 넘기기만 하는 Prop.
 *   - Prop drilling: State 값이 직접 쓰이지 않는 컴포넌트를 거쳐 전달되는 것.
 *     "넘기기만 하는" 컴포넌트가 하나라도 낀 전달 경로를 찾는다.
 *   - Effect modifying parent States: 부모의 세터가 Prop으로 내려와
 *     자식의 Effect 안에서 호출되는 것.
 *
 * HookLens도 추출 때 확인한 참조 관계에서 이 셋을 밝힌다고 적었다(6.1~6.2절).
 * 다만 실제 시스템의 규칙 전문은 논문에 없으므로, 여기의 규칙은 정의를 읽고
 * 이 페이지가 다시 쓴 것이다. 그 사실을 화면에도 밝힌다.
 */

import type { AntiPatternId } from './config';
import { countWord, type ComponentDecl, type ParsedApp } from './parse';

export interface FlowEdge {
  fromComponent: string;
  /** 부모 쪽에서 넘긴 식별자(State 값·세터·Prop). */
  fromName: string;
  toComponent: string;
  toProp: string;
  carriesSetter: boolean;
  /** 값의 뿌리 State. 뿌리를 못 찾으면 null (지역 변수 등). */
  origin: { component: string; state: string } | null;
}

export interface Finding {
  pattern: AntiPatternId;
  detail: 'unusedState' | 'unusedProp' | 'forwardedOnly' | 'drilled' | 'setterInEffect';
  component: string;
  item: string;
  /** 드릴링 경로: 뿌리 컴포넌트부터 마지막까지. */
  path?: string[];
  origin?: { component: string; state: string };
  effectIndex?: number;
}

export interface ItemUsage {
  /** 넘기기를 뺀 진짜 사용 횟수. */
  uses: number;
  /** 자식에게 넘긴 횟수. */
  passes: number;
}

export interface HookGraph {
  components: ComponentDecl[];
  flows: FlowEdge[];
  findings: Finding[];
  /** 아무도 자식으로 쓰지 않는 컴포넌트(진입점 후보). */
  roots: string[];
  /** usage[컴포넌트][이름] - 화면이 근거를 보여 줄 때 쓴다. */
  usage: Record<string, Record<string, ItemUsage>>;
}

function usageOf(component: ComponentDecl, name: string, isStateDecl: boolean): ItemUsage {
  const raw = countWord(component.body, name);
  let passes = 0;
  let attrMentions = 0;
  for (const child of component.children) {
    for (const pass of child.passes) {
      if (pass.identifier === name) passes += 1;
      // 속성 이름(accent={accent}의 왼쪽)은 자식의 이름표지 이 변수의 사용이 아니다.
      // 빼지 않으면 속성명과 식별자가 같은 흔한 표기에서 "넘기기만 하는 프롭"이
      // 사용된 것으로 오판되어 드릴링을 놓친다.
      if (pass.attr === name) attrMentions += 1;
    }
  }
  // 선언 자리(const [값, 세터] = useState)는 사용이 아니다. Prop 선언은 본문 밖이다.
  const decl = isStateDecl ? 1 : 0;
  return { uses: Math.max(0, raw - decl - passes - attrMentions), passes };
}

export function analyze(app: ParsedApp): HookGraph {
  const byName = new Map(app.components.map((component) => [component.name, component]));

  // 사용 셈
  const usage: Record<string, Record<string, ItemUsage>> = {};
  for (const component of app.components) {
    const table: Record<string, ItemUsage> = {};
    for (const state of component.states) {
      table[state.value] = usageOf(component, state.value, true);
      if (state.setter) table[state.setter] = usageOf(component, state.setter, true);
    }
    for (const prop of component.props) {
      table[prop] = usageOf(component, prop, false);
    }
    usage[component.name] = table;
  }

  // 흐름 만들기: 우선 부모의 State·세터에서 출발하는 것만 뿌리를 안다.
  const flows: FlowEdge[] = [];
  for (const component of app.components) {
    const stateValues = new Set(component.states.map((state) => state.value));
    const setterToState = new Map(
      component.states
        .filter((state) => state.setter !== null)
        .map((state) => [state.setter as string, state.value]),
    );
    const propSet = new Set(component.props);
    for (const child of component.children) {
      if (!byName.has(child.component)) continue;
      for (const pass of child.passes) {
        if (pass.identifier === null) continue;
        const name = pass.identifier;
        if (stateValues.has(name)) {
          flows.push({
            fromComponent: component.name,
            fromName: name,
            toComponent: child.component,
            toProp: pass.attr,
            carriesSetter: false,
            origin: { component: component.name, state: name },
          });
        } else if (setterToState.has(name)) {
          flows.push({
            fromComponent: component.name,
            fromName: name,
            toComponent: child.component,
            toProp: pass.attr,
            carriesSetter: true,
            origin: { component: component.name, state: setterToState.get(name) as string },
          });
        } else if (propSet.has(name)) {
          // 뿌리는 아래 고정점 반복에서 거슬러 올라가 채운다.
          flows.push({
            fromComponent: component.name,
            fromName: name,
            toComponent: child.component,
            toProp: pass.attr,
            carriesSetter: false,
            origin: null,
          });
        }
      }
    }
  }

  // Prop에서 출발한 흐름의 뿌리를 고정점까지 거슬러 채운다.
  // 한 컴포넌트가 여러 부모에게 쓰이면 뿌리가 여럿일 수 있는데, 그때는 먼저
  // 찾은 것을 쓴다(화면에는 흐름이 전부 그려지므로 검산이 가능하다).
  for (let round = 0; round < app.components.length + 1; round += 1) {
    let changed = false;
    for (const flow of flows) {
      if (flow.origin !== null) continue;
      const upstream = flows.find(
        (candidate) =>
          candidate.toComponent === flow.fromComponent &&
          candidate.toProp === flow.fromName &&
          candidate.origin !== null,
      );
      if (upstream) {
        flow.origin = upstream.origin;
        flow.carriesSetter = upstream.carriesSetter;
        changed = true;
      }
    }
    if (!changed) break;
  }

  const findings: Finding[] = [];

  // 1) Unreferenced States and Props
  for (const component of app.components) {
    for (const state of component.states) {
      const valueUsage = usage[component.name][state.value];
      const setterUsage = state.setter ? usage[component.name][state.setter] : null;
      // 값도 세터도 아무 데도 안 쓰이면 완전 미사용 State다.
      if (
        valueUsage.uses === 0 &&
        valueUsage.passes === 0 &&
        (setterUsage === null || (setterUsage.uses === 0 && setterUsage.passes === 0))
      ) {
        findings.push({
          pattern: 'unreferenced',
          detail: 'unusedState',
          component: component.name,
          item: state.value,
        });
      }
    }
    for (const prop of component.props) {
      const propUsage = usage[component.name][prop];
      if (propUsage.uses === 0 && propUsage.passes === 0) {
        findings.push({ pattern: 'unreferenced', detail: 'unusedProp', component: component.name, item: prop });
      } else if (propUsage.uses === 0 && propUsage.passes > 0) {
        // 정의의 뒷절: 쓰지 않고 넘기기만 한다.
        findings.push({ pattern: 'unreferenced', detail: 'forwardedOnly', component: component.name, item: prop });
      }
    }
  }

  // 2) Prop drilling: 넘기기만 하는 컴포넌트가 낀 값 전달 경로.
  const forwarders = new Set(
    findings
      .filter((finding) => finding.detail === 'forwardedOnly')
      .map((finding) => `${finding.component}.${finding.item}`),
  );
  const seenPaths = new Set<string>();
  for (const flow of flows) {
    if (flow.carriesSetter || flow.origin === null) continue;
    if (!forwarders.has(`${flow.fromComponent}.${flow.fromName}`)) continue;
    // 이 흐름의 fromComponent가 넘기기만 하는 자리다. 경로를 양쪽으로 잇는다.
    const backward: string[] = [flow.fromComponent];
    let cursor = { component: flow.fromComponent, prop: flow.fromName };
    for (let hop = 0; hop < app.components.length; hop += 1) {
      const upstream = flows.find(
        (candidate) => candidate.toComponent === cursor.component && candidate.toProp === cursor.prop,
      );
      if (!upstream) break;
      backward.unshift(upstream.fromComponent);
      if (upstream.origin && upstream.fromComponent === upstream.origin.component) break;
      cursor = { component: upstream.fromComponent, prop: upstream.fromName };
    }
    const forward: string[] = [];
    let ahead = { component: flow.toComponent, prop: flow.toProp };
    for (let hop = 0; hop < app.components.length; hop += 1) {
      forward.push(ahead.component);
      if (!forwarders.has(`${ahead.component}.${ahead.prop}`)) break;
      const next = flows.find(
        (candidate) => candidate.fromComponent === ahead.component && candidate.fromName === ahead.prop,
      );
      if (!next) break;
      ahead = { component: next.toComponent, prop: next.toProp };
    }
    const path = [...backward, ...forward];
    const key = `${flow.origin.component}.${flow.origin.state}:${path.join('>')}`;
    if (seenPaths.has(key)) continue;
    seenPaths.add(key);
    findings.push({
      pattern: 'drilling',
      detail: 'drilled',
      component: flow.fromComponent,
      item: flow.origin.state,
      path,
      origin: flow.origin,
    });
  }

  // 3) Effect modifying parent States: 세터를 실은 흐름이 닿은 Prop이
  //    그 컴포넌트의 Effect 안에서 호출된다.
  for (const component of app.components) {
    for (const effect of component.effects) {
      for (const called of effect.calls) {
        const incoming = flows.find(
          (candidate) =>
            candidate.toComponent === component.name &&
            candidate.toProp === called &&
            candidate.carriesSetter &&
            candidate.origin !== null,
        );
        if (incoming && incoming.origin) {
          findings.push({
            pattern: 'effectParent',
            detail: 'setterInEffect',
            component: component.name,
            item: called,
            origin: incoming.origin,
            effectIndex: effect.index,
          });
        }
      }
    }
  }

  const usedAsChild = new Set(
    app.components.flatMap((component) => component.children.map((child) => child.component)),
  );
  const roots = app.components.map((component) => component.name).filter((name) => !usedAsChild.has(name));

  return { components: app.components, flows, findings, roots, usage };
}
