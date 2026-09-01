/**
 * 지표들끼리의 상관을 재고, 닮은 것끼리 묶고, 무리마다 대표를 세운다.
 *
 * 논문의 절차를 그대로 따른다.
 *   1) 산점도 무리를 지표마다 점수 매겨 **순위**로 바꾼다.
 *   2) 지표 쌍마다 스피어만 순위 상관을 낸다. 값이 아니라 순위를 보는 이유는,
 *      지표마다 점수의 분포 모양이 달라 값끼리는 견줄 수 없기 때문이다.
 *   3) 1 - 상관을 거리로 삼아 평균 연결 계층 군집화를 한다.
 *   4) 무리마다 다른 것들과 가장 닮은 지표를 대표로 세운다.
 *
 * 무리 수를 고르는 방법만 다르다. 논문은 Kneedle 알고리즘을 썼고, 여기서는
 * 같은 생각을 더 짧게 옮긴 **끝점을 이은 직선에서 가장 멀리 떨어진 점**을 쓴다.
 */

import { spearman } from '../projection';
import { METRICS, OPPOSITE_THRESHOLD, TWIN_LIMIT, TWIN_THRESHOLD } from './config';
import type { MetricCluster, MetricScores, MetricSimilarity, Twin } from './types';

/** 값이 작을수록 좋은 지표는 뒤집어 방향을 맞춘다. 그래야 상관의 부호가 뜻을 갖는다. */
function orient(scores: readonly number[], higherIsBetter: boolean): number[] {
  return higherIsBetter ? [...scores] : scores.map((value) => -value);
}

export function similarityMatrix(scores: readonly MetricScores[]): MetricSimilarity {
  const order = scores.map((entry) => entry.metricId);
  const oriented = scores.map((entry) => {
    const spec = METRICS.find((metric) => metric.id === entry.metricId);
    return orient(entry.scores, spec ? spec.higherIsBetter : true);
  });

  const rho = oriented.map((a, i) =>
    oriented.map((b, j) => {
      if (i === j) return 1;
      const value = spearman(a, b);
      // 산점도 무리가 너무 고르면 순위가 없어 NaN이 나온다. 그때는 '모름'이 아니라 0으로 둔다.
      return Number.isFinite(value) ? value : 0;
    }),
  );
  return { order, rho };
}

interface Node {
  members: number[];
  left: Node | null;
  right: Node | null;
}

function leaf(index: number): Node {
  return { members: [index], left: null, right: null };
}

/** 두 무리 사이의 거리. 평균 연결 — 모든 쌍의 평균이다. */
function linkage(a: Node, b: Node, rho: readonly number[][]): number {
  let total = 0;
  for (const i of a.members) for (const j of b.members) total += 1 - rho[i][j];
  return total / (a.members.length * b.members.length);
}

/** 잎에서 뿌리까지 합쳐 가며 단계마다의 무리 목록을 남긴다. */
function buildDendrogram(rho: readonly number[][]): { levels: Node[][]; root: Node } {
  let nodes: Node[] = rho.map((_, index) => leaf(index));
  const levels: Node[][] = [nodes];

  while (nodes.length > 1) {
    let bestA = 0;
    let bestB = 1;
    let best = Infinity;
    for (let i = 0; i < nodes.length; i += 1) {
      for (let j = i + 1; j < nodes.length; j += 1) {
        const distance = linkage(nodes[i], nodes[j], rho);
        if (distance < best) {
          best = distance;
          bestA = i;
          bestB = j;
        }
      }
    }
    const merged: Node = {
      members: [...nodes[bestA].members, ...nodes[bestB].members],
      left: nodes[bestA],
      right: nodes[bestB],
    };
    nodes = nodes.filter((_, index) => index !== bestA && index !== bestB);
    nodes.push(merged);
    levels.push(nodes);
  }
  return { levels, root: nodes[0] };
}

/** 덴드로그램을 왼쪽부터 훑은 잎 순서. 이 순서로 놓아야 히트맵에 덩어리가 보인다. */
function leavesOf(node: Node): number[] {
  if (node.left === null || node.right === null) return [...node.members];
  return [...leavesOf(node.left), ...leavesOf(node.right)];
}

function clustersAt(levels: readonly Node[][], count: number): Node[] {
  // levels[0]이 잎 전부(=지표 수)이고 뒤로 갈수록 하나씩 줄어든다.
  const index = levels[0].length - count;
  return levels[Math.min(Math.max(index, 0), levels.length - 1)];
}

/** 무리 안에서 다른 것들과 가장 닮은 지표. 그 하나만 골라 쓰면 무리 전체를 대신한다. */
function representativeOf(members: readonly number[], rho: readonly number[][]): {
  index: number;
  cohesion: number;
} {
  if (members.length === 1) return { index: members[0], cohesion: 1 };
  let bestIndex = members[0];
  let best = -Infinity;
  let total = 0;
  let pairs = 0;
  for (const i of members) {
    let sum = 0;
    for (const j of members) {
      if (i === j) continue;
      sum += rho[i][j];
      total += rho[i][j];
      pairs += 1;
    }
    const average = sum / (members.length - 1);
    if (average > best) {
      best = average;
      bestIndex = i;
    }
  }
  return { index: bestIndex, cohesion: pairs > 0 ? total / pairs : 1 };
}

/**
 * 무리 수가 c일 때의 **대신함 정도**: 지표마다 자기 무리 대표와의 상관을 평균낸 값.
 * c가 지표 수와 같아지면 1이 된다(저마다 자기가 대표다).
 */
function coverageAt(levels: readonly Node[][], rho: readonly number[][], count: number): number {
  const groups = clustersAt(levels, count);
  let total = 0;
  let size = 0;
  for (const group of groups) {
    const { index } = representativeOf(group.members, rho);
    for (const member of group.members) {
      total += member === index ? 1 : rho[member][index];
      size += 1;
    }
  }
  return size > 0 ? total / size : 1;
}

/**
 * 팔꿈치. 첫 점과 끝 점을 이은 직선에서 가장 멀리 떨어진 점이 꺾이는 자리다.
 * 무리를 더 나눠도 대신함이 별로 늘지 않기 시작하는 지점을 고른다.
 */
function elbowOf(values: readonly number[]): number {
  if (values.length < 3) return 1;
  const lastIndex = values.length - 1;
  const dx = lastIndex;
  const dy = values[lastIndex] - values[0];
  const norm = Math.hypot(dx, dy) || 1;
  let bestIndex = 0;
  let best = -Infinity;
  for (let i = 1; i < lastIndex; i += 1) {
    const distance = Math.abs(dy * i - dx * (values[i] - values[0])) / norm;
    if (distance > best) {
      best = distance;
      bestIndex = i;
    }
  }
  return bestIndex + 1;
}

/**
 * 행동이 묶여 있는 쌍을 고른다. `keep`이 어느 쪽을 셀지 정한다.
 * 설계 갈래가 다른데도 묶여 있는 쌍에 표시를 달아 둔다. 논문이 하고 싶은 말이 거기 있다.
 */
function pairsOf(
  similarity: MetricSimilarity,
  keep: (rho: number) => boolean,
  rank: (rho: number) => number,
): Twin[] {
  const found: Twin[] = [];
  const familyOf = (id: string) => METRICS.find((metric) => metric.id === id)?.family;
  for (let i = 0; i < similarity.order.length; i += 1) {
    for (let j = i + 1; j < similarity.order.length; j += 1) {
      const rho = similarity.rho[i][j];
      if (!keep(rho)) continue;
      const a = similarity.order[i];
      const b = similarity.order[j];
      found.push({ a, b, rho, crossFamily: familyOf(a) !== familyOf(b) });
    }
  }
  return found.sort((x, y) => rank(y.rho) - rank(x.rho)).slice(0, TWIN_LIMIT);
}

export interface Analysis {
  similarity: MetricSimilarity;
  leafOrder: string[];
  gainByCount: number[];
  suggestedClusterCount: number;
  clustersFor: (count: number) => MetricCluster[];
  /** 같이 움직이는 쌍. */
  twins: Twin[];
  /** 반대로 움직이는 쌍. 하나가 오르면 다른 하나가 내린다. */
  opposites: Twin[];
}

export function analyze(scores: readonly MetricScores[]): Analysis {
  const similarity = similarityMatrix(scores);
  const { rho, order } = similarity;
  const { levels, root } = buildDendrogram(rho);

  const gainByCount = Array.from({ length: order.length }, (_, index) =>
    coverageAt(levels, rho, index + 1),
  );

  return {
    similarity,
    leafOrder: leavesOf(root).map((index) => order[index]),
    gainByCount,
    suggestedClusterCount: elbowOf(gainByCount),
    twins: pairsOf(similarity, (rho) => rho >= TWIN_THRESHOLD, (rho) => rho),
    opposites: pairsOf(similarity, (rho) => rho <= OPPOSITE_THRESHOLD, (rho) => -rho),
    clustersFor: (count: number) =>
      clustersAt(levels, count).map((group) => {
        const { index, cohesion } = representativeOf(group.members, rho);
        return {
          members: group.members.map((member) => order[member]),
          representative: order[index],
          cohesion,
        };
      }),
  };
}
