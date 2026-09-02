/**
 * 중첩 노드-링크 그림의 결정론적 배치.
 *
 * 논문의 그림은 컴포넌트 상자를 계층 순서로 가로로 늘어놓고, 상태·프롭·이펙트를
 * 상자 안에 품는다(6.2절). 여기서도 같은 짜임을 쓰되 힘-기반 배치는 쓰지 않는다 -
 * 같은 코드는 언제나 같은 그림이 되어야 검산할 수 있기 때문이다.
 *
 * 규칙: 뿌리가 0열, 자식은 부모보다 한 열 오른쪽. 같은 열 안에서는 추출 순서대로
 * 위에서 아래로 쌓는다. 요소 슬롯은 상자 안에서 상태·프롭·이펙트 순서다.
 */

import type { HookGraph } from './detect';
import { selectableItems } from './score';

export const DIAGRAM = {
  boxWidth: 172,
  headerHeight: 24,
  rowHeight: 20,
  boxPadding: 8,
  gapX: 72,
  gapY: 18,
  margin: 12,
} as const;

export interface Box {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface Slot {
  x: number;
  y: number;
}

export interface DiagramLayout {
  boxes: Record<string, Box>;
  /** score.ts의 요소 id → 상자 안 슬롯 중심 좌표. */
  slots: Record<string, Slot>;
  width: number;
  height: number;
}

/** 컴포넌트 이름 → 깊이. 뿌리 여럿도 전부 0열이다. 사슬이 끊긴 컴포넌트도 0열에 둔다. */
export function depthsOf(graph: HookGraph): Record<string, number> {
  const depths: Record<string, number> = {};
  for (const root of graph.roots) depths[root] = 0;
  // 자식 관계를 따라 층을 내린다. 순환은 없다고 보지만, 한계 횟수로 무한을 막는다.
  for (let round = 0; round < graph.components.length + 1; round += 1) {
    let changed = false;
    for (const component of graph.components) {
      const parentDepth = depths[component.name];
      if (parentDepth === undefined) continue;
      for (const child of component.children) {
        const next = parentDepth + 1;
        if (depths[child.component] === undefined || depths[child.component] < next) {
          depths[child.component] = next;
          changed = true;
        }
      }
    }
    if (!changed) break;
  }
  for (const component of graph.components) {
    if (depths[component.name] === undefined) depths[component.name] = 0;
  }
  return depths;
}

export function layoutDiagram(graph: HookGraph): DiagramLayout {
  const depths = depthsOf(graph);
  const boxes: Record<string, Box> = {};
  const slots: Record<string, Slot> = {};
  const columnY: Record<number, number> = {};

  for (const component of graph.components) {
    const rows = component.states.length + component.props.length + component.effects.length;
    const height = DIAGRAM.headerHeight + rows * DIAGRAM.rowHeight + DIAGRAM.boxPadding;
    const depth = depths[component.name];
    const x = DIAGRAM.margin + depth * (DIAGRAM.boxWidth + DIAGRAM.gapX);
    const y = columnY[depth] ?? DIAGRAM.margin;
    boxes[component.name] = { x, y, width: DIAGRAM.boxWidth, height };
    columnY[depth] = y + height + DIAGRAM.gapY;
  }

  for (const item of selectableItems(graph)) {
    const box = boxes[item.component];
    const component = graph.components.find((candidate) => candidate.name === item.component);
    if (box === undefined || component === undefined) continue;
    const stateCount = component.states.length;
    const propCount = component.props.length;
    let row: number;
    if (item.kind === 'state') row = component.states.findIndex((state) => state.value === item.name);
    else if (item.kind === 'prop') row = stateCount + component.props.indexOf(item.name);
    else row = stateCount + propCount + Number(item.id.split('.').at(-1));
    slots[item.id] = {
      x: box.x + DIAGRAM.boxPadding,
      y: box.y + DIAGRAM.headerHeight + row * DIAGRAM.rowHeight + DIAGRAM.rowHeight / 2,
    };
  }

  const width =
    DIAGRAM.margin * 2 +
    (Math.max(...Object.values(depths)) + 1) * (DIAGRAM.boxWidth + DIAGRAM.gapX) -
    DIAGRAM.gapX;
  const height = Math.max(...Object.values(columnY)) - DIAGRAM.gapY + DIAGRAM.margin;
  return { boxes, slots, width, height };
}

export interface DiagramEdge {
  fromId: string;
  toId: string;
  kind: 'flow' | 'dep' | 'set';
  carriesSetter: boolean;
}

/** 부모 요소의 슬롯 id. 세터 이름이 오면 그 상태의 슬롯으로 돌린다. */
function sourceSlotId(graph: HookGraph, componentName: string, name: string): string | null {
  const component = graph.components.find((candidate) => candidate.name === componentName);
  if (component === undefined) return null;
  const state = component.states.find((candidate) => candidate.value === name);
  if (state !== undefined) return `${componentName}.state.${state.value}`;
  const bySetter = component.states.find((candidate) => candidate.setter === name);
  if (bySetter !== undefined) return `${componentName}.state.${bySetter.value}`;
  if (component.props.includes(name)) return `${componentName}.prop.${name}`;
  return null;
}

/** 그림에 그릴 간선 전부: 값의 흐름, 이펙트의 의존, 이펙트의 세터 호출. */
export function diagramEdges(graph: HookGraph): DiagramEdge[] {
  const edges: DiagramEdge[] = [];
  for (const flow of graph.flows) {
    const fromId = sourceSlotId(graph, flow.fromComponent, flow.fromName);
    if (fromId === null) continue;
    edges.push({
      fromId,
      toId: `${flow.toComponent}.prop.${flow.toProp}`,
      kind: 'flow',
      carriesSetter: flow.carriesSetter,
    });
  }
  for (const component of graph.components) {
    for (const effect of component.effects) {
      const effectId = `${component.name}.effect.${effect.index}`;
      for (const dep of effect.deps ?? []) {
        const depId = sourceSlotId(graph, component.name, dep);
        if (depId !== null) edges.push({ fromId: depId, toId: effectId, kind: 'dep', carriesSetter: false });
      }
      for (const called of effect.calls) {
        const calledId = sourceSlotId(graph, component.name, called);
        if (calledId !== null && calledId.includes('.prop.')) {
          edges.push({ fromId: effectId, toId: calledId, kind: 'set', carriesSetter: true });
        }
      }
    }
  }
  return edges;
}
