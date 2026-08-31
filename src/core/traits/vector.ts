/** TraitVector 질의 헬퍼. 페이지가 선언하지 않은 축은 기본값으로 메운다. */

import { AXIS_FALLBACKS } from './tokens/config';
import type { TraitVector } from './model';

/** 축의 첫 번째 값을 꺼낸다. 없으면 기본값 표, 그것도 없으면 빈 문자열. */
export function pick(vector: TraitVector, axisId: string): string {
  const values = vector[axisId];
  if (values && values.length > 0) return values[0];
  return AXIS_FALLBACKS[axisId] ?? '';
}

/** 다중 선택 축의 전체 값. 선언이 없으면 빈 배열(기본값을 끼워 넣지 않는다). */
export function pickAll(vector: TraitVector, axisId: string): readonly string[] {
  return vector[axisId] ?? [];
}


/** 표에서 값을 찾되 없으면 지정한 기본 항목으로 떨어진다. */
export function lookup<T>(table: Record<string, T>, key: string, fallback: T): T {
  return table[key] ?? fallback;
}
