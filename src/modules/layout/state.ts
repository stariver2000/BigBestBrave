/**
 * 배치의 두 얼굴 페이지의 화면 상태와 URL 직렬화.
 *
 * "이 그래프를 이 목표로 이만큼 밀면 이렇게 된다"가 이 페이지의 발견이므로,
 * 견본·목표·걸음 수를 URL에 실어 그 자리를 그대로 넘길 수 있게 한다.
 * 배치 자체는 싣지 않는다 - 걸음 수만 있으면 결정론적으로 같은 배치가 나온다.
 */

import { GOALS, SAMPLES, type GoalId, type SampleId } from '../../core/graphaes';
import { encodeField, numberField, readField, stringField, writeFields } from '../../kit';
import { DEFAULT_GOAL, DEFAULT_SAMPLE, MAX_STEPS } from './config';

export interface LayoutState {
  sample: SampleId;
  goal: GoalId;
  /**
   * 충실 목표로 간 걸음. 이것이 논문의 KK 배치에 해당하는 바탕이다.
   * 다른 목표로 밀 때도 이 바탕에서 출발해야 "잘 그린 배치를 밀면 무엇이
   * 깎이는가"라는 이야기가 성립한다.
   */
  base: number;
  /** 바탕 위에서 지금 목표로 민 걸음. 목표가 충실이면 쓰이지 않는다. */
  steps: number;
}

const FIELDS = {
  sample: stringField('g', DEFAULT_SAMPLE, SAMPLES.map((entry) => entry.id)),
  goal: stringField('to', DEFAULT_GOAL, GOALS),
  base: numberField('b', 0, 0, MAX_STEPS),
  steps: numberField('n', 0, 0, MAX_STEPS),
} as const;

export function readState(params: URLSearchParams): LayoutState {
  return {
    sample: readField(params, FIELDS.sample) as SampleId,
    goal: readField(params, FIELDS.goal) as GoalId,
    base: Math.round(readField(params, FIELDS.base)),
    steps: Math.round(readField(params, FIELDS.steps)),
  };
}

export function writeState(state: LayoutState): string {
  return writeFields([
    encodeField(FIELDS.sample, state.sample),
    encodeField(FIELDS.goal, state.goal),
    encodeField(FIELDS.base, state.base),
    encodeField(FIELDS.steps, state.steps),
  ]);
}
