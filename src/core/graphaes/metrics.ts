/**
 * 미적 지표와 충실도 지표.
 *
 * 논문은 미적 지표를 Mooney et al.의 구현으로, 충실도를 ZADU로 쟀다(3장).
 * 이 페이지는 그 가운데 브라우저에서 결정론적으로 셀 수 있는 것만 다시 구현한다.
 * 방향은 논문을 따라 모두 "클수록 좋음"으로 맞춘다.
 *
 * 미적 여섯
 *   nodeResolution    가장 가까운 두 점 / 가장 먼 두 점. 점이 뭉치지 않을수록 크다.
 *   nodeUniformity    점이 격자 칸에 고르게 퍼진 정도(엔트로피를 1로 맞춘 것).
 *   crossingAngle     교차하는 간선들이 90도에 얼마나 가까운가.
 *   edgeCrossings     교차가 적을수록 1에 가깝다(가능한 교차 수로 나눈 것).
 *   aspectRatio       배치 테두리의 짧은 변 / 긴 변. 정사각이면 1.
 *   edgeOrthogonality 간선이 가로세로에 얼마나 붙어 있는가.
 *
 * 충실도 셋 - 모두 그래프 최단경로 거리를 참값으로 삼는다.
 *   stress           거리 차이를 1에서 뺀 것(클수록 충실).
 *   trustworthiness  2D의 가까운 이웃이 원래도 가까웠는가.
 *   continuity       원래 가까웠던 이웃이 2D에서도 가까운가.
 */

import { NEIGHBOR_K } from './config';
import type { Graph } from './graph';
import type { Point } from './layout';

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));

export function nodeResolution(points: readonly Point[]): number {
  const n = points.length;
  if (n < 2) return 1;
  let min = Infinity;
  let max = 0;
  for (let i = 0; i < n; i += 1) {
    for (let j = i + 1; j < n; j += 1) {
      const d = Math.hypot(points[i].x - points[j].x, points[i].y - points[j].y);
      min = Math.min(min, d);
      max = Math.max(max, d);
    }
  }
  return max < 1e-12 ? 0 : clamp01(min / max);
}

/** 격자 칸에 담아 분포의 고름을 엔트로피로 잰다. 칸 수는 점 수에 맞춘다. */
export function nodeUniformity(points: readonly Point[]): number {
  const n = points.length;
  if (n === 0) return 0;
  const side = Math.max(2, Math.round(Math.sqrt(n)));
  const counts = new Map<string, number>();
  for (const point of points) {
    const gx = Math.min(side - 1, Math.max(0, Math.floor(point.x * side)));
    const gy = Math.min(side - 1, Math.max(0, Math.floor(point.y * side)));
    const key = `${gx},${gy}`;
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }
  let entropy = 0;
  for (const count of counts.values()) {
    const p = count / n;
    entropy -= p * Math.log2(p);
  }
  const cells = side * side;
  const maxEntropy = Math.log2(Math.min(cells, n));
  return maxEntropy <= 0 ? 1 : clamp01(entropy / maxEntropy);
}

/** 두 선분이 실제로 가로지르는지. 끝점을 나눠 가지면 교차로 보지 않는다. */
function crossingOf(
  a: Point, b: Point, c: Point, d: Point,
): { crosses: boolean; angle: number } {
  const r = { x: b.x - a.x, y: b.y - a.y };
  const s = { x: d.x - c.x, y: d.y - c.y };
  const denominator = r.x * s.y - r.y * s.x;
  if (Math.abs(denominator) < 1e-12) return { crosses: false, angle: 0 };
  const t = ((c.x - a.x) * s.y - (c.y - a.y) * s.x) / denominator;
  const u = ((c.x - a.x) * r.y - (c.y - a.y) * r.x) / denominator;
  const crosses = t > 1e-9 && t < 1 - 1e-9 && u > 1e-9 && u < 1 - 1e-9;
  if (!crosses) return { crosses: false, angle: 0 };
  const dot = r.x * s.x + r.y * s.y;
  const lengths = Math.hypot(r.x, r.y) * Math.hypot(s.x, s.y);
  const cosine = lengths < 1e-12 ? 0 : Math.min(1, Math.max(-1, dot / lengths));
  // 예각으로 접어 0~90도로 본다.
  const degrees = (Math.acos(cosine) * 180) / Math.PI;
  return { crosses: true, angle: degrees > 90 ? 180 - degrees : degrees };
}

export interface CrossingReport {
  count: number;
  /** 교차가 없으면 null. 없는 것을 0으로 두면 "최악"과 헷갈린다. */
  meanAngle: number | null;
  /** 끝점을 나눠 갖지 않은 간선 쌍의 수. 교차율의 분모다. */
  candidatePairs: number;
}

export function crossings(graph: Graph, points: readonly Point[]): CrossingReport {
  const edges = graph.edges;
  let count = 0;
  let angleSum = 0;
  let candidates = 0;
  for (let i = 0; i < edges.length; i += 1) {
    for (let j = i + 1; j < edges.length; j += 1) {
      const [a, b] = edges[i];
      const [c, d] = edges[j];
      if (a === c || a === d || b === c || b === d) continue;
      candidates += 1;
      const result = crossingOf(points[a], points[b], points[c], points[d]);
      if (result.crosses) {
        count += 1;
        angleSum += result.angle;
      }
    }
  }
  return {
    count,
    meanAngle: count === 0 ? null : angleSum / count,
    candidatePairs: candidates,
  };
}

/** 교차가 적을수록 1. 논문의 방향(클수록 좋음)에 맞춘 것이다. */
export function edgeCrossings(report: CrossingReport): number {
  return report.candidatePairs === 0 ? 1 : clamp01(1 - report.count / report.candidatePairs);
}

/**
 * 교차각. 90도에 가까울수록 1이다. 교차가 하나도 없으면 잴 수 없어 null을 준다 -
 * 이 자리에 1을 넣으면 "교차가 없다"와 "교차가 다 직각이다"가 뒤섞인다.
 */
export function crossingAngle(report: CrossingReport): number | null {
  return report.meanAngle === null ? null : clamp01(report.meanAngle / 90);
}

export function aspectRatio(points: readonly Point[]): number {
  if (points.length === 0) return 1;
  const xs = points.map((p) => p.x);
  const ys = points.map((p) => p.y);
  const spanX = Math.max(...xs) - Math.min(...xs);
  const spanY = Math.max(...ys) - Math.min(...ys);
  const longer = Math.max(spanX, spanY);
  const shorter = Math.min(spanX, spanY);
  return longer < 1e-12 ? 1 : clamp01(shorter / longer);
}

/** 간선마다 가장 가까운 축까지의 각을 재어 0도면 1, 45도면 0으로 둔다. */
export function edgeOrthogonality(graph: Graph, points: readonly Point[]): number {
  if (graph.edges.length === 0) return 1;
  let sum = 0;
  for (const [a, b] of graph.edges) {
    const dx = Math.abs(points[b].x - points[a].x);
    const dy = Math.abs(points[b].y - points[a].y);
    if (dx < 1e-12 && dy < 1e-12) {
      sum += 1;
      continue;
    }
    const degrees = (Math.atan2(Math.min(dx, dy), Math.max(dx, dy)) * 180) / Math.PI;
    sum += 1 - degrees / 45;
  }
  return clamp01(sum / graph.edges.length);
}

/** 스트레스를 1에서 뺀 값. 거리 차이의 제곱합을 목표 거리 제곱합으로 나눈다. */
export function faithfulnessStress(points: readonly Point[], target: readonly number[][]): number {
  const n = points.length;
  let diff = 0;
  let total = 0;
  for (let i = 0; i < n; i += 1) {
    for (let j = i + 1; j < n; j += 1) {
      const d = target[i][j];
      const actual = Math.hypot(points[i].x - points[j].x, points[i].y - points[j].y);
      diff += (d - actual) ** 2;
      total += d * d;
    }
  }
  return total < 1e-12 ? 1 : clamp01(1 - Math.sqrt(diff / total));
}

function neighborsOf(distances: readonly number[], self: number, k: number): number[] {
  return distances
    .map((d, index) => ({ d, index }))
    .filter((entry) => entry.index !== self)
    // 거리가 같으면 번호 순으로 - 그래야 늘 같은 답이 나온다.
    .sort((p, q) => p.d - q.d || p.index - q.index)
    .slice(0, k)
    .map((entry) => entry.index);
}

/** 2D의 이웃 k명 가운데 원래도 이웃이던 비율. */
export function trustworthiness(
  points: readonly Point[],
  target: readonly number[][],
  k = NEIGHBOR_K,
): number {
  return neighborOverlap(points, target, k, 'projection');
}

/** 원래 이웃 k명 가운데 2D에서도 이웃인 비율. */
export function continuity(
  points: readonly Point[],
  target: readonly number[][],
  k = NEIGHBOR_K,
): number {
  return neighborOverlap(points, target, k, 'original');
}

function neighborOverlap(
  points: readonly Point[],
  target: readonly number[][],
  k: number,
  from: 'projection' | 'original',
): number {
  const n = points.length;
  if (n <= 1) return 1;
  const size = Math.min(k, n - 1);
  let sum = 0;
  for (let i = 0; i < n; i += 1) {
    const flat = points.map((p) => Math.hypot(p.x - points[i].x, p.y - points[i].y));
    const projected = new Set(neighborsOf(flat, i, size));
    const original = new Set(neighborsOf(target[i], i, size));
    const [source, other] = from === 'projection' ? [projected, original] : [original, projected];
    let shared = 0;
    for (const node of source) if (other.has(node)) shared += 1;
    sum += shared / size;
  }
  return clamp01(sum / n);
}
