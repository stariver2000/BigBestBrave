/**
 * 두 리듬이 얼마나 닮았는지 잰다.
 *
 * 표본을 하나씩 맞대어 빼면, 같은 리듬이라도 한 박자 밀린 것만으로 전혀 다른 리듬이 된다.
 * 사람은 그렇게 듣지 않는다. 그래서 시간축을 늘였다 줄였다 하며 가장 잘 맞는 대응을 찾는
 * 동적 시간 정합(DTW)으로 잰다. 논문이 쓴 지표는 공개돼 있지 않으므로 이 선택은 이 페이지의 것이다.
 */

import { CLOSENESS_THRESHOLDS, MIN_WINDOW_MS, PATTERNS, WARP_BAND } from './config';
import { envelopeOf, totalDuration } from './envelope';
import type { Closeness, Match, Pattern } from './types';

/**
 * 두 수열 사이의 동적 시간 정합 거리.
 *
 * 표를 채워 가며 "여기까지 맞추는 데 든 최소 비용"을 구한다. 각 칸은 왼쪽·위·대각선 중
 * 가장 싼 길에 자기 자리의 차이를 더한 값이다. 마지막 칸이 전체 비용이 된다.
 */
export function dtwDistance(a: readonly number[], b: readonly number[], band = WARP_BAND): number {
  const rows = a.length;
  const columns = b.length;
  if (rows === 0 || columns === 0) return 1;

  // 한 줄만 들고 굴린다. 표 전체를 들고 있을 이유가 없다.
  let previous = new Float64Array(columns + 1).fill(Number.POSITIVE_INFINITY);
  previous[0] = 0;

  for (let i = 1; i <= rows; i += 1) {
    const current = new Float64Array(columns + 1).fill(Number.POSITIVE_INFINITY);
    // 대각선에서 band칸 안쪽만 계산한다. 밖은 애초에 갈 수 없는 길이다.
    const from = Math.max(1, i - band);
    const to = Math.min(columns, i + band);
    for (let j = from; j <= to; j += 1) {
      const cost = Math.abs(a[i - 1] - b[j - 1]);
      current[j] = cost + Math.min(previous[j], current[j - 1], previous[j - 1]);
    }
    previous = current;
  }

  // 지나온 칸 수가 아니라 수열 길이로 나눈다. 길이가 같은 수열끼리는 이것이 곧 평균 차이다.
  const total = previous[columns];
  return Number.isFinite(total) ? total / Math.max(rows, columns) : 1;
}

/**
 * 0~1. 1이면 같은 모양이다.
 * 창은 두 리듬 중 긴 쪽에 맞춘다. 짧은 리듬은 남는 자리가 침묵으로 채워져,
 * 긴 리듬과 견줄 때 그만큼 멀어진다. 그것이 실제로 손에 닿는 차이다.
 */
export function similarityOf(a: Pattern, b: Pattern): number {
  const windowMs = Math.max(totalDuration(a), totalDuration(b), MIN_WINDOW_MS);
  const distance = dtwDistance(envelopeOf(a, windowMs), envelopeOf(b, windowMs));
  return Math.max(0, Math.min(1, 1 - distance));
}

export function closenessOf(similarity: number): Closeness {
  if (similarity >= CLOSENESS_THRESHOLDS.same) return 'same';
  if (similarity >= CLOSENESS_THRESHOLDS.similar) return 'similar';
  return 'distinct';
}

/** 이름 붙은 리듬들을 내 리듬과 견주어 닮은 순으로 돌려준다. */
export function rank(mine: Pattern, candidates: readonly Pattern[] = PATTERNS): Match[] {
  return candidates
    .map((pattern) => {
      const similarity = similarityOf(mine, pattern);
      return { patternId: pattern.id, similarity, closeness: closenessOf(similarity) };
    })
    .sort((a, b) => b.similarity - a.similarity);
}
