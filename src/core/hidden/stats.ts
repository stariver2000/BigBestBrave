/**
 * 표 3에서 다시 계산해 내는 값.
 */

import { FUNNEL, GESTURES, type GestureId } from './config';

/** 여섯 손짓의 합. 1,970이어야 한다. */
export function totalInstances(): number {
  return GESTURES.reduce((sum, gesture) => sum + gesture.count, 0);
}

/** 개수에서 앞으로 계산한 백분율. */
export function percentOf(id: GestureId): number {
  const gesture = GESTURES.find((entry) => entry.id === id);
  if (gesture === undefined) throw new Error(`unknown gesture: ${id}`);
  return (gesture.count / totalInstances()) * 100;
}

/** 탐침한 것 가운데 검증되어 남은 몫(%). */
export function validatedShare(): number {
  return (FUNNEL.validated / FUNNEL.probed) * 100;
}

/** 가장 흔한 손짓부터 줄 세운다. */
export function ranked(): GestureId[] {
  return [...GESTURES].sort((a, b) => b.count - a.count).map((gesture) => gesture.id);
}
