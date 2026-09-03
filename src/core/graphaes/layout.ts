/**
 * 배치 만들기. 세 목표를 향해 한 걸음씩 나아간다.
 *
 * 논문은 MDS로 초기화한 Kamada-Kawai를 썼다(3장). KK는 최단경로 거리와 2D 거리의
 * 차이(스트레스)를 줄이는 것이므로, 여기서는 그 스트레스를 줄이는 걸음을 직접
 * 돈다(stress majorization의 한 걸음). 초기 배치는 씨앗 난수가 아니라 원 위의
 * 규칙적인 자리라, 링크를 열 때마다 같은 배치에서 시작한다.
 *
 * 세 목표
 *   faithful   - 스트레스를 줄인다(논문의 KK와 같은 방향)
 *   square     - 배치를 정사각 테두리에 맞춘다(Aspect Ratio를 좋게)
 *   orthogonal - 간선을 축에 맞춘다(Edge Orthogonality를 좋게)
 * 뒤의 둘은 논문의 그룹 3·4를 몸으로 겪게 하려고 이 페이지가 더한 것이다.
 */

import type { GoalId } from './config';
import type { Graph } from './graph';

export interface Point {
  x: number;
  y: number;
}

/** 원 위에 고르게 놓는 시작 배치. 결정론적이라 늘 같은 곳에서 출발한다. */
export function initialLayout(graph: Graph): Point[] {
  return Array.from({ length: graph.nodeCount }, (_, i) => {
    const angle = (2 * Math.PI * i) / graph.nodeCount;
    return { x: 0.5 + 0.42 * Math.cos(angle), y: 0.5 + 0.42 * Math.sin(angle) };
  });
}

/** 배치를 [0,1] 사각형에 담되 가로세로 비율은 지킨다. 비교가 공정해야 한다. */
export function normalize(points: readonly Point[]): Point[] {
  if (points.length === 0) return [];
  const xs = points.map((p) => p.x);
  const ys = points.map((p) => p.y);
  const minX = Math.min(...xs);
  const minY = Math.min(...ys);
  const span = Math.max(Math.max(...xs) - minX, Math.max(...ys) - minY);
  if (span < 1e-12) return points.map(() => ({ x: 0.5, y: 0.5 }));
  // 긴 쪽을 1로 맞추고 짧은 쪽은 가운데로 민다.
  const spanX = Math.max(...xs) - minX;
  const spanY = Math.max(...ys) - minY;
  const padX = (span - spanX) / 2;
  const padY = (span - spanY) / 2;
  return points.map((p) => ({ x: (p.x - minX + padX) / span, y: (p.y - minY + padY) / span }));
}

/**
 * 스트레스 감소 한 걸음(SMACOF 방식). 목표 거리는 최단경로 거리를 눈금에 맞춘 것.
 * 가중치는 1/d²로 두어 가까운 쌍을 더 존중한다 - KK의 관행이다.
 */
function stressStep(points: readonly Point[], target: readonly number[][]): Point[] {
  const n = points.length;
  const next: Point[] = [];
  for (let i = 0; i < n; i += 1) {
    let sumX = 0;
    let sumY = 0;
    let weightSum = 0;
    for (let j = 0; j < n; j += 1) {
      if (i === j) continue;
      const d = target[i][j];
      if (d <= 0) continue;
      const weight = 1 / (d * d);
      const dx = points[i].x - points[j].x;
      const dy = points[i].y - points[j].y;
      const actual = Math.hypot(dx, dy) || 1e-9;
      // j에서 목표 거리만큼 떨어진 자리로 i를 당긴다.
      sumX += weight * (points[j].x + (d * dx) / actual);
      sumY += weight * (points[j].y + (d * dy) / actual);
      weightSum += weight;
    }
    next.push(
      weightSum > 0
        ? { x: sumX / weightSum, y: sumY / weightSum }
        : { x: points[i].x, y: points[i].y },
    );
  }
  return normalize(next);
}

/** 정사각 테두리로 미는 한 걸음. 짧은 축을 늘려 비율을 1에 가깝게 한다. */
function squareStep(points: readonly Point[]): Point[] {
  const xs = points.map((p) => p.x);
  const ys = points.map((p) => p.y);
  const spanX = Math.max(...xs) - Math.min(...xs) || 1e-9;
  const spanY = Math.max(...ys) - Math.min(...ys) || 1e-9;
  const minX = Math.min(...xs);
  const minY = Math.min(...ys);
  // 짧은 쪽을 조금씩 늘린다. 한 번에 늘리면 겪을 것이 없다.
  const rate = 0.25;
  const scaleX = spanX < spanY ? 1 + rate * (spanY / spanX - 1) : 1;
  const scaleY = spanY < spanX ? 1 + rate * (spanX / spanY - 1) : 1;
  return normalize(
    points.map((p) => ({
      x: minX + (p.x - minX) * scaleX,
      y: minY + (p.y - minY) * scaleY,
    })),
  );
}

/** 간선을 가로세로에 맞추는 한 걸음. 각 간선을 가까운 축 쪽으로 조금 돌린다. */
function orthogonalStep(points: readonly Point[], graph: Graph): Point[] {
  const moved = points.map((p) => ({ x: p.x, y: p.y }));
  const rate = 0.18;
  for (const [a, b] of graph.edges) {
    const dx = moved[b].x - moved[a].x;
    const dy = moved[b].y - moved[a].y;
    if (Math.abs(dx) < 1e-9 && Math.abs(dy) < 1e-9) continue;
    // 가로에 가까우면 세로 차이를 줄이고, 세로에 가까우면 가로 차이를 줄인다.
    if (Math.abs(dx) >= Math.abs(dy)) {
      const shift = (dy * rate) / 2;
      moved[a].y += shift;
      moved[b].y -= shift;
    } else {
      const shift = (dx * rate) / 2;
      moved[a].x += shift;
      moved[b].x -= shift;
    }
  }
  return normalize(moved);
}

/** 최단경로 거리를 [0,1] 배치에 맞는 눈금으로 바꾼다. */
export function targetDistances(paths: readonly number[][]): number[][] {
  let longest = 0;
  for (const row of paths) {
    for (const d of row) longest = Math.max(longest, d);
  }
  const scale = longest > 0 ? 1 / longest : 1;
  return paths.map((row) => row.map((d) => d * scale));
}

/** 목표에 맞는 한 걸음. 어느 목표든 결과는 정규화돼 서로 견줄 수 있다. */
export function layoutStep(
  points: readonly Point[],
  graph: Graph,
  target: readonly number[][],
  goal: GoalId,
): Point[] {
  if (goal === 'faithful') return stressStep(points, target);
  if (goal === 'square') return squareStep(points);
  return orthogonalStep(points, graph);
}
