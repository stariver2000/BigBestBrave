/**
 * 차트 명세와 그 위에서 도는 조작.
 *
 * 논문의 뼈대(3.2.2절): 그림과 코드가 같은 하나의 구조화된 상태에서 나온다.
 * 그래서 시각 요소를 고르든 코드 블록을 고르든 같은 상태 마디에 닿고, 직접
 * 조작·코드 편집·언어모델 수정이 서로 어긋나지 않는다. 이 페이지는 그 뼈대만
 * 가져온다 - 언어모델은 없고, 조작은 결정론적인 규칙 몇 개다.
 */

import { CATEGORIES, SERIES, VALUES } from './config';

/** 상태의 마디. 코드 블록과 시각 요소가 같은 id를 나눠 갖는다. */
export const NODES = ['title', 'xAxis', 'yAxis', 'marks', 'legend', 'interaction'] as const;
export type NodeId = (typeof NODES)[number];

export type Mode = 'grouped' | 'stacked';
export type Interaction = 'none' | 'clickDim' | 'hoverTooltip';

export interface Spec {
  mode: Mode;
  /** 계열을 이 순서로 그린다. 정렬 조작이 바꾼다. */
  order: string[];
  interaction: Interaction;
  legend: boolean;
  /** y축 위끝. null이면 자료에서 저절로 정한다. */
  yMax: number | null;
  title: string;
}

export const DEFAULT_SPEC: Spec = {
  mode: 'grouped',
  order: [...SERIES],
  interaction: 'none',
  legend: true,
  yMax: null,
  title: '분기별 값',
};

/** 논문 과제 1의 목표: 묶음을 쌓기로 바꾸고 클릭하면 나머지가 흐려지게. */
export const TARGET_SPEC: Pick<Spec, 'mode' | 'interaction'> = {
  mode: 'stacked',
  interaction: 'clickDim',
};

/** 자료에서 저절로 정하는 y축 위끝. 쌓기면 합계가 기준이다. */
export function autoMax(spec: Spec): number {
  if (spec.mode === 'stacked') {
    const totals = CATEGORIES.map((category) =>
      spec.order.reduce((sum, series) => sum + (VALUES[category]?.[series] ?? 0), 0),
    );
    return Math.max(...totals);
  }
  let biggest = 0;
  for (const category of CATEGORIES) {
    for (const series of spec.order) biggest = Math.max(biggest, VALUES[category]?.[series] ?? 0);
  }
  return biggest;
}

/** 실제로 쓰는 y축 위끝. */
export function effectiveMax(spec: Spec): number {
  return spec.yMax ?? autoMax(spec);
}

/** 조작 하나. 화면의 손짓과 코드 변화가 이 이름으로 이어진다. */
export type Edit =
  | { kind: 'toMode'; mode: Mode }
  | { kind: 'moveSeries'; series: string; to: number }
  | { kind: 'setInteraction'; interaction: Interaction }
  | { kind: 'toggleLegend' }
  | { kind: 'setYMax'; value: number | null }
  | { kind: 'setTitle'; text: string };

/** 조작이 건드리는 상태 마디. 화면이 "이 조작이 이 코드를 바꾼다"를 보일 때 쓴다. */
export function touchedNodes(edit: Edit): NodeId[] {
  switch (edit.kind) {
    case 'toMode':
      // 모양이 바뀌면 자리 계산과 y축이 함께 바뀐다. 이것이 이 페이지의 요점이다.
      return ['marks', 'yAxis'];
    case 'moveSeries':
      return ['marks', 'legend'];
    case 'setInteraction':
      return ['interaction', 'marks'];
    case 'toggleLegend':
      return ['legend'];
    case 'setYMax':
      return ['yAxis'];
    case 'setTitle':
      return ['title'];
  }
}

/** 조작을 적용한 새 명세. 원본은 건드리지 않는다. */
export function applyEdit(spec: Spec, edit: Edit): Spec {
  switch (edit.kind) {
    case 'toMode':
      // 모양을 바꾸면 손으로 고정해 둔 y축은 놓아준다. 쌓기와 묶음은 눈금이 다르다.
      return { ...spec, mode: edit.mode, yMax: null };
    case 'moveSeries': {
      const without = spec.order.filter((series) => series !== edit.series);
      if (without.length === spec.order.length) return spec;
      const at = Math.min(without.length, Math.max(0, edit.to));
      return { ...spec, order: [...without.slice(0, at), edit.series, ...without.slice(at)] };
    }
    case 'setInteraction':
      return { ...spec, interaction: edit.interaction };
    case 'toggleLegend':
      return { ...spec, legend: !spec.legend };
    case 'setYMax':
      return { ...spec, yMax: edit.value };
    case 'setTitle':
      return { ...spec, title: edit.text };
  }
}

/** 두 명세가 같은지. 목표에 닿았는지 볼 때 쓴다. */
export function sameSpec(a: Spec, b: Spec): boolean {
  return (
    a.mode === b.mode &&
    a.interaction === b.interaction &&
    a.legend === b.legend &&
    a.yMax === b.yMax &&
    a.title === b.title &&
    a.order.length === b.order.length &&
    a.order.every((series, index) => series === b.order[index])
  );
}

/** 논문 과제 1의 목표에 닿았는지. 모양과 상호작용 둘 다 맞아야 한다. */
export function reachedTarget(spec: Spec): boolean {
  return spec.mode === TARGET_SPEC.mode && spec.interaction === TARGET_SPEC.interaction;
}

/**
 * 목표까지 남은 조작들. 시연자가 이 순서로 한 걸음씩 밟는다.
 * 규칙은 단순하다 - 모양을 먼저 맞추고, 그 다음 상호작용을 단다.
 */
export function remainingEdits(spec: Spec): Edit[] {
  const edits: Edit[] = [];
  if (spec.mode !== TARGET_SPEC.mode) edits.push({ kind: 'toMode', mode: TARGET_SPEC.mode });
  if (spec.interaction !== TARGET_SPEC.interaction) {
    edits.push({ kind: 'setInteraction', interaction: TARGET_SPEC.interaction });
  }
  return edits;
}
