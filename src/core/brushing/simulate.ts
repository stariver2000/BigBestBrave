/**
 * 두 붓질을 시늉해 견주는 자리.
 *
 * 논문의 Finding A·B는 사람 24명이 낸 것이라 여기서 재현할 수 없다. 대신 두 붓질의
 * **규칙만** 시늉해 이 페이지의 자료에서 무엇이 일어나는지 본다. 이것은 논문의 결과가
 * 아니라 이 판의 성질이며, 화면에도 그렇게 적는다.
 *
 *   보통 붓  : 화면에서 가까운 점부터 담는다. 2D 거리만 본다.
 *   아는 붓  : 담은 것들에 대한 고차원 가까움이 높은 점부터 담는다.
 *
 * 둘 다 같은 자리에서 시작하고 같은 개수를 담는다. 다른 것은 "무엇을 가까움으로 보는가"뿐이다.
 */

import { closenessMap, scoreAgainst, type Point2D, type Score } from './brush';

/** 화면 거리만 보고 가까운 순서로 담는다. */
export function naiveBrush(
  coords: readonly Point2D[],
  startIndex: number,
  size: number,
): Set<number> {
  const origin = coords[startIndex];
  const order = coords
    .map((point, index) => ({ index, gap: Math.hypot(point.x - origin.x, point.y - origin.y) }))
    .sort((a, b) => (a.gap === b.gap ? a.index - b.index : a.gap - b.gap));
  return new Set(order.slice(0, size).map((entry) => entry.index));
}

/**
 * 고차원 가까움이 높은 점부터 담는다.
 *
 * 실제 기법은 사람이 붓을 끌 때마다 점을 다시 배치하고, 사람은 핵심 영역에 들어온
 * 점을 담는다. 그 되풀이의 알맹이가 "지금 담은 것에 대한 가까움이 높은 점이 먼저
 * 들어온다"이므로, 여기서는 한 번에 하나씩 담으며 가까움을 다시 계산한다.
 */
export function awareBrush(
  startIndex: number,
  size: number,
  neighbors: readonly number[][],
  similarity: readonly (readonly number[])[],
): Set<number> {
  const brushed = new Set([startIndex]);
  while (brushed.size < size) {
    const closeness = closenessMap(brushed, neighbors, similarity);
    let best = -1;
    let bestValue = -1;
    for (let index = 0; index < closeness.length; index += 1) {
      if (brushed.has(index)) continue;
      if (closeness[index] > bestValue) {
        bestValue = closeness[index];
        best = index;
      }
    }
    // 더 담을 것이 없으면(모두 가까움 0) 멈춘다 - 억지로 채우지 않는다.
    if (best < 0 || bestValue <= 0) break;
    brushed.add(best);
  }
  return brushed;
}

export interface Comparison {
  naive: Score;
  aware: Score;
  startIndex: number;
  size: number;
}

/** 같은 자리에서 같은 개수를 담아 두 붓질을 견준다. */
export function compareBrushes(
  coords: readonly Point2D[],
  labels: readonly number[],
  targetLabel: number,
  startIndex: number,
  neighbors: readonly number[][],
  similarity: readonly (readonly number[])[],
): Comparison {
  const truth = new Set(labels.flatMap((label, index) => (label === targetLabel ? [index] : [])));
  const size = truth.size;
  return {
    naive: scoreAgainst(truth, naiveBrush(coords, startIndex, size)),
    aware: scoreAgainst(truth, awareBrush(startIndex, size, neighbors, similarity)),
    startIndex,
    size,
  };
}
