/**
 * 차원 축소 산점도의 신뢰도 지표.
 *
 * 신뢰도(trustworthiness)와 연속성(continuity)은 Venna와 Kaski가 제시한 표준 정의를 따른다.
 * 두 지표는 서로 반대 방향의 잘못을 잡는다.
 *   - 신뢰도: 산점도에서 가까워 보이는데 원래는 멀었던 점(거짓 이웃)
 *   - 연속성: 원래는 가까웠는데 산점도에서 밀려난 점(놓친 이웃)
 * 하나만 보면 속는다. 모든 점을 한 덩어리로 뭉쳐 그리면 연속성은 높지만 신뢰도가 무너진다.
 */

import { distanceMatrix, neighborsOf, rankMatrix, standardize } from './distance';
import type { Metrics, PointDistortion, Projection } from './types';

/**
 * 두 지표에 공통으로 쓰이는 정규화 상수.
 * 최악의 경우(순위가 완전히 뒤집힌 경우) 벌점 합과 같아, 결과가 0~1에 들어오게 만든다.
 */
function normalizer(n: number, k: number): number {
  const denominator = n * k * (2 * n - 3 * k - 1);
  // 점이 이웃 수에 비해 너무 적으면 분모가 0 이하가 된다. 그때는 정규화를 포기하고 1로 둔다.
  return denominator > 0 ? 2 / denominator : 1;
}

interface Prepared {
  highRanks: Int32Array[];
  lowRanks: Int32Array[];
  highDistances: Float64Array[];
  lowDistances: Float64Array[];
  size: number;
}

/** 거리·순위 행렬은 모든 지표가 공유하므로 한 번만 만든다. */
export function prepare(projection: Projection, standardizeHigh: boolean): Prepared {
  const high = standardizeHigh ? standardize(projection.high) : projection.high.map((row) => [...row]);
  const low = projection.low.map(([x, y]) => [x, y]);

  const highDistances = distanceMatrix(high);
  const lowDistances = distanceMatrix(low);
  return {
    highDistances,
    lowDistances,
    highRanks: rankMatrix(highDistances),
    lowRanks: rankMatrix(lowDistances),
    size: high.length,
  };
}

/** 산점도의 이웃 중 원래 순위가 k보다 뒤였던 점에 (순위 - k)만큼 벌점을 준다. */
function penalty(
  primaryRanks: readonly Int32Array[],
  secondaryRanks: readonly Int32Array[],
  size: number,
  k: number,
): number {
  let total = 0;
  for (let i = 0; i < size; i += 1) {
    for (const j of neighborsOf(primaryRanks, i, k)) {
      const rank = secondaryRanks[i][j];
      if (rank > k) total += rank - k;
    }
  }
  return total;
}

export function trustworthiness(prepared: Prepared, k: number): number {
  return 1 - normalizer(prepared.size, k) * penalty(prepared.lowRanks, prepared.highRanks, prepared.size, k);
}

export function continuity(prepared: Prepared, k: number): number {
  return 1 - normalizer(prepared.size, k) * penalty(prepared.highRanks, prepared.lowRanks, prepared.size, k);
}

/** 2차원 이웃 k개 중 자기와 같은 라벨의 비율. 군집이 실제로 모여 있는지를 본다. */
export function neighborhoodHit(prepared: Prepared, labels: readonly string[], k: number): number {
  let hits = 0;
  for (let i = 0; i < prepared.size; i += 1) {
    for (const j of neighborsOf(prepared.lowRanks, i, k)) {
      if (labels[i] === labels[j]) hits += 1;
    }
  }
  return hits / (prepared.size * k);
}

/**
 * 모든 점쌍 거리의 스피어만 순위 상관.
 * 국소 이웃이 아니라 전체 구조(무엇이 무엇보다 먼가)가 남았는지를 본다.
 */
export function distanceCorrelation(prepared: Prepared): number {
  const highValues: number[] = [];
  const lowValues: number[] = [];
  for (let i = 0; i < prepared.size; i += 1) {
    for (let j = i + 1; j < prepared.size; j += 1) {
      highValues.push(prepared.highDistances[i][j]);
      lowValues.push(prepared.lowDistances[i][j]);
    }
  }
  return spearman(highValues, lowValues);
}

/** 값들을 순위로 바꾼다. 동점은 평균 순위를 나눠 갖는다. */
function toRanks(values: readonly number[]): number[] {
  const order = values.map((value, index) => ({ value, index })).sort((a, b) => a.value - b.value);
  const ranks = new Array<number>(values.length);

  let position = 0;
  while (position < order.length) {
    let end = position;
    while (end + 1 < order.length && order[end + 1].value === order[position].value) end += 1;
    const average = (position + end) / 2 + 1;
    for (let i = position; i <= end; i += 1) ranks[order[i].index] = average;
    position = end + 1;
  }
  return ranks;
}

export function spearman(a: readonly number[], b: readonly number[]): number {
  if (a.length < 2) return 1;
  const ranksA = toRanks(a);
  const ranksB = toRanks(b);

  const mean = (a.length + 1) / 2;
  let covariance = 0;
  let varianceA = 0;
  let varianceB = 0;
  for (let i = 0; i < a.length; i += 1) {
    const da = ranksA[i] - mean;
    const db = ranksB[i] - mean;
    covariance += da * db;
    varianceA += da * da;
    varianceB += db * db;
  }
  const denominator = Math.sqrt(varianceA * varianceB);
  return denominator === 0 ? 0 : covariance / denominator;
}

/** 점마다 거짓 이웃·놓친 이웃을 센다. 어느 자리가 못 믿을 곳인지 화면에 표시하는 근거다. */
export function pointDistortions(prepared: Prepared, k: number): PointDistortion[] {
  const distortions: PointDistortion[] = [];
  for (let i = 0; i < prepared.size; i += 1) {
    const lowNeighbors = new Set(neighborsOf(prepared.lowRanks, i, k));
    const highNeighbors = neighborsOf(prepared.highRanks, i, k);

    // 원래는 이웃인데 산점도에서 밀려난 점들.
    const missingIndices = highNeighbors.filter((j) => !lowNeighbors.has(j));
    // 산점도에서는 옆에 있는데 원래 공간에서는 남이던 점들.
    const falseIndices: number[] = [];
    for (const j of lowNeighbors) if (prepared.highRanks[i][j] > k) falseIndices.push(j);

    distortions.push({
      falseNeighbors: falseIndices.length,
      missingNeighbors: missingIndices.length,
      missingIndices,
      falseIndices,
      trueNeighbors: highNeighbors,
    });
  }
  return distortions;
}

export function evaluate(projection: Projection, k: number, standardizeHigh: boolean): {
  metrics: Metrics;
  distortions: PointDistortion[];
} {
  const prepared = prepare(projection, standardizeHigh);
  return {
    metrics: {
      trustworthiness: trustworthiness(prepared, k),
      continuity: continuity(prepared, k),
      neighborhoodHit: projection.labels ? neighborhoodHit(prepared, projection.labels, k) : null,
      distanceCorrelation: distanceCorrelation(prepared),
      k,
      pointCount: prepared.size,
    },
    distortions: pointDistortions(prepared, k),
  };
}
