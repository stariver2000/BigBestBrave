/**
 * 겪는 판의 채점 - 사람이 고른 요소와 검출기의 정답을 논문의 잣대로 견준다.
 *
 * 논문의 실험은 참가자가 앤티패턴을 보고하면 정밀도·재현율로 채점했고,
 * 표 2가 그 평균이다. 이 판도 같은 잣대를 쓴다. 다만 이 판의 과제는
 * 지어낸 작은 앱이라, 여기서 나온 점수를 표 1·표 2와 견줄 수는 없다 -
 * 다른 프로젝트, 다른 크기, 다른 시간이다. 화면에도 그렇게 적는다.
 *
 * 고를 수 있는 요소는 상태·프롭·이펙트 하나하나이고, 정답 요소는 검출
 * 결과(Finding)의 닻이다. 드릴링의 닻은 원류 상태다 - 경로의 "넘기기만 하는
 * 프롭"은 forwardedOnly로 따로 잡히므로, 사슬 하나가 정답 요소 둘을 만든다.
 */

import type { Finding, HookGraph } from './detect';

/** 고를 수 있는 요소 하나. id는 `컴포넌트.종류.이름` 꼴로 그래프 안에서 유일하다. */
export interface SelectableItem {
  id: string;
  component: string;
  kind: 'state' | 'prop' | 'effect';
  name: string;
}

/** 그래프의 고를 수 있는 요소 전부, 추출 순서대로. */
export function selectableItems(graph: HookGraph): SelectableItem[] {
  const items: SelectableItem[] = [];
  for (const component of graph.components) {
    for (const state of component.states) {
      items.push({
        id: `${component.name}.state.${state.value}`,
        component: component.name,
        kind: 'state',
        name: state.value,
      });
    }
    for (const prop of component.props) {
      items.push({ id: `${component.name}.prop.${prop}`, component: component.name, kind: 'prop', name: prop });
    }
    for (const effect of component.effects) {
      items.push({
        id: `${component.name}.effect.${effect.index}`,
        component: component.name,
        kind: 'effect',
        name: `useEffect #${effect.index + 1}`,
      });
    }
  }
  return items;
}

/** 검출 하나가 가리키는 요소 id. 드릴링은 경로가 아니라 원류 상태를 닻으로 삼는다. */
export function anchorOf(finding: Finding): string {
  switch (finding.detail) {
    case 'unusedState':
      return `${finding.component}.state.${finding.item}`;
    case 'unusedProp':
    case 'forwardedOnly':
      return `${finding.component}.prop.${finding.item}`;
    case 'drilled':
      return `${finding.origin?.component ?? finding.component}.state.${finding.item}`;
    case 'setterInEffect':
      return `${finding.component}.effect.${finding.effectIndex ?? 0}`;
  }
}

/** 정답 요소 집합. 여러 검출이 같은 요소를 가리키면 하나로 센다. */
export function truthIds(findings: readonly Finding[]): string[] {
  return [...new Set(findings.map(anchorOf))];
}

const CODE_ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyz';

/** 요소를 URL에 실을 한 글자 코드로. 요소가 36개를 넘는 코드는 이 판에 올리지 않는다. */
export function idToCode(items: readonly SelectableItem[], id: string): string | null {
  const index = items.findIndex((item) => item.id === id);
  if (index < 0 || index >= CODE_ALPHABET.length) return null;
  return CODE_ALPHABET[index];
}

/** URL의 코드 문자열을 요소 id 배열로. 모르는 글자는 조용히 버린다. */
export function codesToIds(items: readonly SelectableItem[], codes: string): string[] {
  const ids: string[] = [];
  for (const char of codes) {
    const index = CODE_ALPHABET.indexOf(char);
    if (index >= 0 && index < items.length && !ids.includes(items[index].id)) ids.push(items[index].id);
  }
  return ids;
}

export interface Score {
  precision: number;
  recall: number;
  f1: number;
  hits: number;
}

/** 논문의 잣대 그대로: 정밀도·재현율·F1. 아무것도 안 골랐으면 전부 0이다. */
export function scoreSelection(truth: readonly string[], picked: readonly string[]): Score {
  const truthSet = new Set(truth);
  const hits = picked.filter((id) => truthSet.has(id)).length;
  const precision = picked.length === 0 ? 0 : hits / picked.length;
  const recall = truth.length === 0 ? 0 : hits / truth.length;
  const f1 = precision + recall === 0 ? 0 : (2 * precision * recall) / (precision + recall);
  return { precision, recall, f1, hits };
}
