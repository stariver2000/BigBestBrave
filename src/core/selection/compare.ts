/**
 * 견줄 수 있게 되었는가.
 *
 * 이 페이지는 처음부터 한 가지를 못박아 두었다 — 논문의 수치와 여기서 나온 수치를 직접
 * 견주면 안 되고, 견줄 수 있는 것은 **세 방식 사이의 순서**뿐이라는 것. 그렇다면 방아쇠
 * 하나만 해 본 사람에게는 이 페이지가 줄 것이 아직 없다. 순서는 둘부터 생긴다.
 *
 * 그 자리가 이 페이지의 아하 지점이다. 몇 개를 넘겨야 하는지(MIN_TRIGGERS)와 한 방아쇠에서
 * 몇 번은 골라야 하는지(MIN_SELECTIONS)는 이 페이지가 정한 값이다.
 */

import type { TriggerReport } from './types';

/** 순서는 둘부터 생긴다. */
export const MIN_TRIGGERS = 2;

/** 한 방아쇠에서 이만큼은 골라야 그 방아쇠를 '해 봤다'고 친다. 연습 판을 뺀 한 판 분량이다. */
export const MIN_SELECTIONS = 6;

export function comparable(reports: readonly TriggerReport[]): boolean {
  return reports.filter((entry) => entry.selectionCount >= MIN_SELECTIONS).length >= MIN_TRIGGERS;
}
