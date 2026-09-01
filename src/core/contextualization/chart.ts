/**
 * 고른 맥락이 어떤 그림을 부르는가(표 1).
 *
 * 이 규칙은 논문의 것을 그대로 옮긴 것이다. 뒤집어 말하면, 무엇을 견주기로 했는지가
 * 정해지면 그림의 모양은 이미 정해져 있다는 뜻이다. 그림을 먼저 고르고 자료를 끼워
 * 맞추는 순서가 아니다.
 */

import { AXES, CHART_RULE, CONTEXT_GRID, type Axis, type ChartKind, type Component, type Multiplicity, type Span } from './config';

export interface Shape {
  entities: Multiplicity;
  indicators: Multiplicity;
  span: Span;
}

export function chartFor(shape: Shape): ChartKind {
  return CHART_RULE[shape.span][shape.entities][shape.indicators];
}

/** 그 그림이 선인가 막대인가. 표 1에서 시간 종류가 곧 이 갈림이다. */
export function isLine(kind: ChartKind): boolean {
  return kind === 'singleLine' || kind === 'multiLine' || kind === 'multiLinePerEntity';
}

/** 맥락 하나. 표 2의 열 칸이 각각 여기 하나씩 대응한다. */
export interface ContextCell {
  component: Component;
  axis: Axis;
}

/** 표 2에서 실제로 채워진 칸만 낸다. 열 칸이다. */
export function contextCells(): ContextCell[] {
  const cells: ContextCell[] = [];
  for (const component of ['entity', 'indicator', 'date'] as const) {
    for (const axis of AXES) {
      if (CONTEXT_GRID[component][axis]) cells.push({ component, axis });
    }
  }
  return cells;
}

/**
 * 어떤 맥락을 고르면 견줄 것이 어떻게 늘어나는가.
 *
 * 맥락은 언제나 그 조각 하나를 늘린다 - 주체 쪽 맥락은 나라를 여럿으로, 지표 쪽 맥락은
 * 지표를 여럿으로, 시점 쪽 맥락은 한 시점을 기간으로 바꾼다. 이것은 논문에 적힌 규칙이
 * 아니라 표 1과 표 2를 잇기 위해 이 페이지가 세운 규칙이다.
 * 원래 문장이 이미 기간이면 시점 쪽 맥락을 골라도 기간 그대로다.
 */
export function shapeAfter(cell: ContextCell, base: Span): Shape {
  return {
    entities: cell.component === 'entity' ? 'multiple' : 'single',
    indicators: cell.component === 'indicator' ? 'multiple' : 'single',
    span: cell.component === 'date' ? 'duration' : base,
  };
}
