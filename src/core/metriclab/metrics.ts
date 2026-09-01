/**
 * 아홉 개 지표.
 *
 * 각 지표가 "무엇을 잘못이라고 보는가"를 주석에 적어 둔다. 이 페이지의 요점이
 * **설계 의도와 실제 행동이 다르다**는 것이므로, 의도를 또렷이 적어 두어야
 * 나중에 행동과 견줄 수 있다.
 *
 * 신뢰도와 연속성은 `src/core/projection`의 것을 그대로 쓴다. 같은 정의를 두 번 적으면
 * 언젠가 두 값이 갈린다. 나머지 일곱 개는 여기서 정의한다.
 */

import {
  continuity,
  distanceMatrix,
  neighborsOf,
  rankMatrix,
  spearman,
  standardize,
  trustworthiness,
} from '../projection';
import { EPSILON, METRICS } from './config';
import type { Dataset, MetricSpec, Projection } from './types';

/**
 * 모든 지표가 함께 쓰는 재료. `src/core/projection`의 `prepare`가 만드는 것과
 * 같은 모양이라 그쪽 함수에 그대로 넘길 수 있다(구조적 타이핑).
 */
export interface Prepared {
  highDistances: Float64Array[];
  lowDistances: Float64Array[];
  highRanks: Int32Array[];
  lowRanks: Int32Array[];
  size: number;
}

/** 고차원 쪽은 산점도가 바뀌어도 그대로다. 한 번만 만들어 돌려 쓴다. */
export interface HighSide {
  distances: Float64Array[];
  ranks: Int32Array[];
  size: number;
}

export function prepareHigh(dataset: Dataset): HighSide {
  const distances = distanceMatrix(standardize(dataset.rows));
  return { distances, ranks: rankMatrix(distances), size: dataset.rows.length };
}

export function prepareLow(high: HighSide, projection: Projection): Prepared {
  const lowDistances = distanceMatrix(projection.low.map(([x, y]) => [x, y]));
  return {
    highDistances: high.distances,
    lowDistances,
    highRanks: high.ranks,
    lowRanks: rankMatrix(lowDistances),
    size: high.size,
  };
}

/**
 * 평균 상대 순위 오차(MRRE). 이웃인지 아닌지만 보는 신뢰도와 달리 **순위가 몇 칸 밀렸는지**를 센다.
 * 가까운 이웃일수록 한 칸의 밀림을 크게 벌한다(1/r로 나눈다).
 * 여기서는 1에서 빼 "클수록 좋음"으로 방향을 맞춘다.
 */
export function mrre(prepared: Prepared, k: number): number {
  const { size, highRanks, lowRanks } = prepared;
  let normalizer = 0;
  for (let rank = 1; rank <= k; rank += 1) normalizer += Math.abs(size - 2 * rank + 1) / rank;
  if (normalizer <= 0) return 1;

  let total = 0;
  for (let i = 0; i < size; i += 1) {
    for (const j of neighborsOf(lowRanks, i, k)) {
      const low = lowRanks[i][j];
      const high = highRanks[i][j];
      total += Math.abs(high - low) / low;
    }
  }
  return 1 - total / (size * normalizer);
}

/**
 * 이웃 집합 겹침. 고차원에서의 이웃 k개와 산점도에서의 이웃 k개가 얼마나 같은 사람들인가(자카드).
 * 순위는 보지 않고 **명단만** 본다. 신뢰도·연속성과 의도가 가장 가까운 지표라
 * 행동도 붙어 다닐 것 같지만, 그 짐작이 맞는지가 이 페이지의 질문이다.
 */
export function neighborOverlap(prepared: Prepared, k: number): number {
  const { size, highRanks, lowRanks } = prepared;
  let total = 0;
  for (let i = 0; i < size; i += 1) {
    const high = new Set(neighborsOf(highRanks, i, k));
    const low = neighborsOf(lowRanks, i, k);
    let shared = 0;
    for (const j of low) if (high.has(j)) shared += 1;
    const union = high.size + low.length - shared;
    total += union > 0 ? shared / union : 1;
  }
  return total / size;
}

/**
 * 라벨 신뢰도. 산점도에서의 이웃 k개 중 나와 같은 라벨의 비율.
 * "무리가 무리로 보이는가"를 묻는다. 고차원 구조는 아예 보지 않는다.
 */
export function labelTrustworthiness(
  prepared: Prepared,
  labels: readonly string[],
  k: number,
): number {
  const { size, lowRanks } = prepared;
  let total = 0;
  for (let i = 0; i < size; i += 1) {
    const neighbors = neighborsOf(lowRanks, i, k);
    if (neighbors.length === 0) continue;
    let same = 0;
    for (const j of neighbors) if (labels[j] === labels[i]) same += 1;
    total += same / neighbors.length;
  }
  return total / size;
}

function centroidsOf(points: readonly [number, number][], labels: readonly string[]) {
  const sums = new Map<string, { x: number; y: number; n: number }>();
  labels.forEach((label, i) => {
    const bucket = sums.get(label) ?? { x: 0, y: 0, n: 0 };
    bucket.x += points[i][0];
    bucket.y += points[i][1];
    bucket.n += 1;
    sums.set(label, bucket);
  });
  return new Map([...sums].map(([label, b]) => [label, [b.x / b.n, b.y / b.n] as const]));
}

/**
 * 거리 일관성(Sips 외). 산점도에서 자기 무리의 무게중심이 가장 가까운 점의 비율.
 * 라벨 신뢰도와 의도가 거의 같아 보이지만 재는 방식이 다르다 —
 * 하나는 이웃을, 하나는 무게중심을 본다.
 */
export function distanceConsistency(
  projection: Projection,
  labels: readonly string[],
): number {
  const centroids = [...centroidsOf(projection.low, labels)];
  if (centroids.length < 2) return 1;
  let correct = 0;
  projection.low.forEach(([x, y], i) => {
    let bestLabel = centroids[0][0];
    let best = Infinity;
    for (const [label, [cx, cy]] of centroids) {
      const distance = (x - cx) ** 2 + (y - cy) ** 2;
      if (distance < best) {
        best = distance;
        bestLabel = label;
      }
    }
    if (bestLabel === labels[i]) correct += 1;
  });
  return correct / projection.low.length;
}

/**
 * 실루엣. 자기 무리 안의 평균 거리와 가장 가까운 남의 무리까지의 평균 거리를 견준다.
 * -1에서 1 사이다. 무리가 떨어져 있을수록 크다.
 */
export function silhouette(prepared: Prepared, labels: readonly string[]): number {
  const { size, lowDistances } = prepared;
  const groups = new Map<string, number[]>();
  labels.forEach((label, i) => {
    const bucket = groups.get(label);
    if (bucket) bucket.push(i);
    else groups.set(label, [i]);
  });
  if (groups.size < 2) return 0;

  let total = 0;
  for (let i = 0; i < size; i += 1) {
    const own = groups.get(labels[i])!;
    let inside = 0;
    for (const j of own) if (j !== i) inside += lowDistances[i][j];
    const a = own.length > 1 ? inside / (own.length - 1) : 0;

    let b = Infinity;
    for (const [label, members] of groups) {
      if (label === labels[i]) continue;
      let sum = 0;
      for (const j of members) sum += lowDistances[i][j];
      b = Math.min(b, sum / members.length);
    }
    const denominator = Math.max(a, b);
    total += denominator > 0 ? (b - a) / denominator : 0;
  }
  return total / size;
}

/**
 * 크러스컬 스트레스(정규화). 두 거리 집합을 가장 잘 겹치도록 크기를 맞춘 뒤 남는 어긋남.
 * 이웃인지 아닌지는 보지 않고 **모든 점쌍의 길이**만 본다. 작을수록 좋다.
 */
export function stress(prepared: Prepared): number {
  const { size, highDistances, lowDistances } = prepared;
  let dot = 0;
  let lowSquare = 0;
  for (let i = 0; i < size; i += 1) {
    for (let j = i + 1; j < size; j += 1) {
      dot += highDistances[i][j] * lowDistances[i][j];
      lowSquare += lowDistances[i][j] ** 2;
    }
  }
  // 크기를 맞추는 배수. 이것이 없으면 그림을 통째로 키우기만 해도 점수가 달라진다.
  const scale = lowSquare > EPSILON ? dot / lowSquare : 0;

  let residual = 0;
  let highSquare = 0;
  for (let i = 0; i < size; i += 1) {
    for (let j = i + 1; j < size; j += 1) {
      residual += (highDistances[i][j] - scale * lowDistances[i][j]) ** 2;
      highSquare += highDistances[i][j] ** 2;
    }
  }
  return highSquare > EPSILON ? Math.sqrt(residual / highSquare) : 0;
}

/** 거리에서 이웃 확률 분포를 만든다. 각 점의 폭은 그 점의 k번째 이웃까지의 거리로 정한다. */
function neighborProbabilities(
  distances: readonly Float64Array[],
  ranks: readonly Int32Array[],
  size: number,
  k: number,
): Float64Array[] {
  return distances.map((row, i) => {
    let sigma = 0;
    for (let j = 0; j < size; j += 1) if (ranks[i][j] === k) sigma = row[j];
    if (sigma <= EPSILON) sigma = 1;
    const weights = new Float64Array(size);
    let sum = 0;
    for (let j = 0; j < size; j += 1) {
      if (j === i) continue;
      const weight = Math.exp(-((row[j] / sigma) ** 2));
      weights[j] = weight;
      sum += weight;
    }
    if (sum > EPSILON) for (let j = 0; j < size; j += 1) weights[j] /= sum;
    return weights;
  });
}

/**
 * KL 발산. 고차원의 이웃 확률 분포와 산점도의 이웃 확률 분포가 얼마나 다른가.
 * 이웃 명단도 순위도 아닌 **확률**을 본다. 작을수록 좋다.
 */
export function klDivergence(prepared: Prepared, k: number): number {
  const { size, highDistances, lowDistances, highRanks, lowRanks } = prepared;
  const p = neighborProbabilities(highDistances, highRanks, size, k);
  const q = neighborProbabilities(lowDistances, lowRanks, size, k);
  let total = 0;
  for (let i = 0; i < size; i += 1) {
    for (let j = 0; j < size; j += 1) {
      if (i === j) continue;
      const pi = p[i][j];
      if (pi <= EPSILON) continue;
      total += pi * Math.log(pi / Math.max(q[i][j], EPSILON));
    }
  }
  return total / size;
}

/** 모든 점쌍 거리의 스피어만 순위 상관. 전역 구조가 얼마나 남았는지. */
function distanceRankCorrelation(prepared: Prepared): number {
  const { size, highDistances, lowDistances } = prepared;
  const high: number[] = [];
  const low: number[] = [];
  for (let i = 0; i < size; i += 1) {
    for (let j = i + 1; j < size; j += 1) {
      high.push(highDistances[i][j]);
      low.push(lowDistances[i][j]);
    }
  }
  return spearman(high, low);
}

/** 지표 하나를 잰다. 라벨이 필요한데 라벨이 한 종류뿐이면 null이 나온다. */
export function measure(
  spec: MetricSpec,
  prepared: Prepared,
  projection: Projection,
  dataset: Dataset,
  k: number,
): number {
  switch (spec.id) {
    case 'trustworthiness':
      return trustworthiness(prepared, k);
    case 'continuity':
      return continuity(prepared, k);
    case 'mrre':
      return mrre(prepared, k);
    case 'neighbor-overlap':
      return neighborOverlap(prepared, k);
    case 'label-trustworthiness':
      return labelTrustworthiness(prepared, dataset.labels, k);
    case 'distance-consistency':
      return distanceConsistency(projection, dataset.labels);
    case 'silhouette':
      return silhouette(prepared, dataset.labels);
    case 'stress':
      return stress(prepared);
    case 'kl-divergence':
      return klDivergence(prepared, k);
    default:
      // 전역 구조를 보는 예비 지표. 목록에 없으면 여기까지 오지 않는다.
      return distanceRankCorrelation(prepared);
  }
}

export function metricById(id: string): MetricSpec {
  const found = METRICS.find((metric) => metric.id === id);
  if (!found) throw new Error(`unknown metric: ${id}`);
  return found;
}
