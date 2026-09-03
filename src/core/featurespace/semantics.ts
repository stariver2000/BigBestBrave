/**
 * 두 시각 의미(visual semantics). 논문 5.1절의 식을 그대로 옮겼다.
 *
 * Clusteredness (식 1) = Calinski-Harabasz 지수
 *     [Σ nᵢ‖Cᵢ - C‖² / (k-1)] × [(N-k) / Σᵢ Σ_{x∈Cᵢ} ‖x - Cᵢ‖²]
 *   k-means로 투영에 이름을 붙인 뒤 그 나뉨의 질을 잰다. 클수록 무리가 또렷하다.
 *
 * Overlap (식 2, 3) = Distribution Consistency
 *   투영을 20×20 격자로 나누고, 점이 있는 칸마다 무리 분포의 엔트로피
 *     H(p) = -Σ pᵢ log₂ pᵢ  (pᵢ는 그 칸 안에서 무리 i가 차지한 비율)
 *   를 구해 모두 더한다. 클수록 무리가 국소적으로 섞여 있다.
 *
 * 논문이 식 2 아래에 "ranges from 0 to 1"이라 적었는데, m개 무리의 엔트로피
 * 상한은 log₂(m)이라 무리가 셋 이상이면 1을 넘는다(셋이면 약 1.585).
 * 고치지 않고 그대로 두되, entropyUpperBound()로 상한을 함께 밝힌다.
 */

import { createRandom } from '../random/seeded';
import { GRID } from './config';
import type { Projected } from './project';

/** k-means 결과. 이름은 0..k-1이다. */
export interface Clustering {
  labels: number[];
  centroids: { x: number; y: number }[];
  /** 실제로 점이 붙은 무리 수. 빈 무리는 세지 않는다. */
  usedClusters: number;
}

/**
 * k-means. 씨앗을 고정해 늘 같은 답을 준다.
 * 초기 중심은 k-means++ 방식으로 고르되, 난수기는 밖에서 한 번만 만든다.
 */
export function kmeans(points: readonly Projected[], k: number, seed = 7): Clustering {
  const n = points.length;
  if (n === 0 || k <= 0) return { labels: [], centroids: [], usedClusters: 0 };
  if (k >= n) {
    return {
      labels: points.map((_, i) => i),
      centroids: points.map((p) => ({ x: p.x, y: p.y })),
      usedClusters: n,
    };
  }

  const random = createRandom(seed);
  const centroids: { x: number; y: number }[] = [{ x: points[0].x, y: points[0].y }];
  while (centroids.length < k) {
    // 가장 가까운 중심까지의 거리 제곱에 비례해 다음 중심을 고른다.
    const weights = points.map((point) => {
      let best = Infinity;
      for (const centroid of centroids) {
        const dx = point.x - centroid.x;
        const dy = point.y - centroid.y;
        best = Math.min(best, dx * dx + dy * dy);
      }
      return best;
    });
    const total = weights.reduce((sum, weight) => sum + weight, 0);
    let target = random() * total;
    let chosen = points.length - 1;
    for (let i = 0; i < points.length; i += 1) {
      target -= weights[i];
      if (target <= 0) {
        chosen = i;
        break;
      }
    }
    centroids.push({ x: points[chosen].x, y: points[chosen].y });
  }

  let labels = new Array(n).fill(0);
  for (let round = 0; round < 40; round += 1) {
    let moved = false;
    for (let i = 0; i < n; i += 1) {
      let best = 0;
      let bestDistance = Infinity;
      for (let c = 0; c < centroids.length; c += 1) {
        const dx = points[i].x - centroids[c].x;
        const dy = points[i].y - centroids[c].y;
        const distance = dx * dx + dy * dy;
        if (distance < bestDistance) {
          bestDistance = distance;
          best = c;
        }
      }
      if (labels[i] !== best) moved = true;
      labels[i] = best;
    }
    const sums = centroids.map(() => ({ x: 0, y: 0, count: 0 }));
    for (let i = 0; i < n; i += 1) {
      sums[labels[i]].x += points[i].x;
      sums[labels[i]].y += points[i].y;
      sums[labels[i]].count += 1;
    }
    for (let c = 0; c < centroids.length; c += 1) {
      if (sums[c].count > 0) {
        centroids[c] = { x: sums[c].x / sums[c].count, y: sums[c].y / sums[c].count };
      }
    }
    if (!moved && round > 0) break;
  }

  const used = new Set(labels).size;
  return { labels, centroids, usedClusters: used };
}

/**
 * 식 1. 점이 하나도 흩어지지 않아 안쪽 제곱합이 0이면 값이 무한이 되므로,
 * 그때는 0을 준다(무리를 잴 수 없는 자리다).
 */
export function clusteredness(points: readonly Projected[], k: number, seed = 7): number {
  const n = points.length;
  if (n === 0 || k < 2 || k >= n) return 0;
  const { labels, centroids } = kmeans(points, k, seed);

  const grand = { x: 0, y: 0 };
  for (const point of points) {
    grand.x += point.x;
    grand.y += point.y;
  }
  grand.x /= n;
  grand.y /= n;

  const counts = new Array(centroids.length).fill(0);
  for (const label of labels) counts[label] += 1;

  let between = 0;
  for (let c = 0; c < centroids.length; c += 1) {
    if (counts[c] === 0) continue;
    const dx = centroids[c].x - grand.x;
    const dy = centroids[c].y - grand.y;
    between += counts[c] * (dx * dx + dy * dy);
  }

  let within = 0;
  for (let i = 0; i < n; i += 1) {
    const centroid = centroids[labels[i]];
    const dx = points[i].x - centroid.x;
    const dy = points[i].y - centroid.y;
    within += dx * dx + dy * dy;
  }
  if (within < 1e-12) return 0;

  return (between / (k - 1)) * ((n - k) / within);
}

/** 격자 칸 하나의 셈. 화면이 어디가 섞였는지 보여 줄 때 쓴다. */
export interface Cell {
  gx: number;
  gy: number;
  counts: Record<string, number>;
  total: number;
  entropy: number;
}

/** 점을 20×20 격자에 담는다. 좌표는 [0, 1]로 정규화돼 있다고 본다. */
export function cellsOf(
  points: readonly Projected[],
  groupOf: (id: number) => string,
): Cell[] {
  const map = new Map<string, Cell>();
  for (const point of points) {
    const gx = Math.min(GRID - 1, Math.max(0, Math.floor(point.x * GRID)));
    const gy = Math.min(GRID - 1, Math.max(0, Math.floor(point.y * GRID)));
    const key = `${gx},${gy}`;
    const cell = map.get(key) ?? { gx, gy, counts: {}, total: 0, entropy: 0 };
    const group = groupOf(point.id);
    cell.counts[group] = (cell.counts[group] ?? 0) + 1;
    cell.total += 1;
    map.set(key, cell);
  }
  for (const cell of map.values()) {
    cell.entropy = entropy(Object.values(cell.counts), cell.total);
  }
  // 격자 순서로 정렬해 두면 화면과 시험이 같은 순서를 본다.
  return [...map.values()].sort((a, b) => a.gy - b.gy || a.gx - b.gx);
}

/** 식 2. 밑이 2인 엔트로피. */
export function entropy(counts: readonly number[], total: number): number {
  if (total <= 0) return 0;
  let sum = 0;
  for (const count of counts) {
    if (count <= 0) continue;
    const p = count / total;
    sum -= p * Math.log2(p);
  }
  return sum;
}

/**
 * 논문이 "0에서 1"이라 적은 칸 엔트로피의 실제 상한. 무리가 m개면 log₂(m)이다.
 * 무리가 둘일 때만 1이 되고, 셋이면 1.585까지 오른다.
 */
export function entropyUpperBound(groupCount: number): number {
  return groupCount <= 1 ? 0 : Math.log2(groupCount);
}

/** 식 3. 점이 있는 칸의 엔트로피를 모두 더한다. */
export function overlap(points: readonly Projected[], groupOf: (id: number) => string): number {
  return cellsOf(points, groupOf).reduce((sum, cell) => sum + cell.entropy, 0);
}
