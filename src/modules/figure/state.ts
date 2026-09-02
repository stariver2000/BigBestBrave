/**
 * 그림 계획 페이지의 화면 상태와 URL 직렬화 규칙.
 *
 * 계획이 곧 작업물이다 - 학회 준비 중인 사람이 짠 그림 계획이 링크 하나로
 * 공저자에게 넘어가야 한다. 항목마다 두 글자(유형 a~k + 부호 0~4)로 실리고,
 * 갈래표에서 고른 칸(cell)도 실려서 "이 칸을 봐 달라"는 링크가 된다.
 */

import { decodePlan, encodePlan, type PlanItem } from '../../core/taviz';
import { encodeField, readField, stringField, writeFields } from '../../kit';
import { DEFAULT_PLAN, MAX_PLAN_ITEMS } from './config';

export interface FigureState {
  items: PlanItem[];
  /** 갈래표에서 고른 칸. 'a0' 꼴, ''는 고른 칸 없음. */
  cell: string;
}

const DEFAULT_PLAN_ENCODED = encodePlan(DEFAULT_PLAN);

const FIELDS = {
  plan: stringField('plan', DEFAULT_PLAN_ENCODED),
  cell: stringField('cell', ''),
} as const;

export function readState(params: URLSearchParams): FigureState {
  const rawPlan = readField(params, FIELDS.plan);
  const rawCell = readField(params, FIELDS.cell);
  return {
    // decodePlan이 엉뚱한 글자를 거르므로 손으로 고친 URL도 안전하다.
    items: decodePlan(rawPlan).slice(0, MAX_PLAN_ITEMS),
    cell: /^[a-k][0-4]$/.test(rawCell) ? rawCell : '',
  };
}

export function writeState(state: FigureState): string {
  return writeFields([
    encodeField(FIELDS.plan, encodePlan(state.items)),
    encodeField(FIELDS.cell, state.cell),
  ]);
}
