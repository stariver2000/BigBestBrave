import { describe, expect, it } from 'vitest';
import {
  AESTHETICS,
  FINDINGS,
  GROUPS,
  METHOD,
  MEASURED_AESTHETICS,
  adjacency,
  aspectRatio,
  buildGraph,
  continuity,
  crossingAngle,
  crossings,
  edgeCrossings,
  edgeOrthogonality,
  faithfulnessStress,
  initialLayout,
  layoutStep,
  nodeResolution,
  nodeUniformity,
  normalize,
  scoreDelta,
  scoreLayout,
  shortestPaths,
  targetDistances,
  trustworthiness,
  type Point,
} from '@core/graphaes';

/**
 * 옮겨 적기와 계산 검증.
 *
 * 논문(EuroVis 2026 GDxDR, doi:10.2312/evgdxdr.20261001)의 네 그룹 행 범위와
 * 본문 수치를 되짚고, 기하 지표는 손으로 푼 값과 맞춘다. 히트맵의 개별 상관계수는
 * 그림에만 있어 옮기지 않았으므로 여기서도 검사하지 않는다.
 */
describe('논문 옮겨 적기', () => {
  it('미적 지표가 열하나이고 행 번호가 1부터 차례대로다', () => {
    expect(AESTHETICS).toHaveLength(11);
    AESTHETICS.forEach((aesthetic, index) => {
      expect(aesthetic.row).toBe(index + 1);
    });
  });

  it('네 그룹의 행 범위가 빈틈없이 열하나를 덮는다 (1-5 / 6-9 / 10 / 11)', () => {
    expect(GROUPS.map((group) => group.rows)).toEqual([[1, 5], [6, 9], [10, 10], [11, 11]]);
    // 모든 지표가 정확히 한 그룹에 든다.
    for (const aesthetic of AESTHETICS) {
      const owners = GROUPS.filter(
        (group) => aesthetic.row >= group.rows[0] && aesthetic.row <= group.rows[1],
      );
      expect(owners, aesthetic.id).toHaveLength(1);
      expect(owners[0].id).toBe(aesthetic.group);
    }
  });

  it('가브리엘 비율의 이름 역설이 그대로 담겼다', () => {
    // 본문: Gabriel Ratio-Edges는 그룹 1(노드 분포), Gabriel Ratio-Nodes는 그룹 2(간선 명료).
    const byId = new Map(AESTHETICS.map((entry) => [entry.id, entry]));
    expect(byId.get('gabrielEdges')?.group).toBe(1);
    expect(byId.get('gabrielNodes')?.group).toBe(2);
  });

  it('본문 수치가 서로 어긋나지 않는다', () => {
    // 평균이 가장 높은 것(0.6198)이 개별 최고(0.7953)보다 작아야 한다.
    expect(FINDINGS.highestAverage.r).toBeLessThan(FINDINGS.highestWithMrre.r);
    // 그룹 1의 견고한 관계가 그룹 2보다 많다("2 vs. 7").
    expect(FINDINGS.groupRobust.group1).toBeGreaterThan(FINDINGS.groupRobust.group2);
    // 독립 그룹의 상한은 견고 기준보다 낮다 - 그래서 견고할 수 없다.
    expect(FINDINGS.independentAbsR).toBeLessThan(METHOD.robustAbsR);
    // 견고하다고 센 관계 수는 그룹 1의 총계를 넘지 않는다.
    expect(FINDINGS.robustCounts.crossingAngle).toBeLessThanOrEqual(FINDINGS.groupRobust.group1);
    expect(FINDINGS.robustCounts.nodeResolution).toBeLessThanOrEqual(FINDINGS.groupRobust.group1);
  });

  it('가장 높은 평균을 낸 지표는 견고하지 않다고 적혀 있다', () => {
    // 본문: "가장 높은 평균 상관이지만 크기와 밀도 변화에 매우 민감하다".
    expect(FINDINGS.highestAverage.aesthetic).toBe('gabrielEdges');
    expect(FINDINGS.highestAverage.robust).toBe(false);
  });

  it('방법의 범위가 뒤집히지 않았다', () => {
    expect(METHOD.nodeRange[0]).toBeLessThan(METHOD.nodeRange[1]);
    expect(METHOD.densityRange[0]).toBeLessThan(METHOD.densityRange[1]);
    expect(METHOD.variancePercent).toBeGreaterThan(0);
    expect(METHOD.variancePercent).toBeLessThanOrEqual(100);
    expect(METHOD.graphs).toBe(627);
  });

  it('재는 지표는 논문의 열하나 가운데 있는 것들이다', () => {
    const known = new Set(AESTHETICS.map((entry) => entry.id));
    for (const id of MEASURED_AESTHETICS) {
      expect(known.has(id), id).toBe(true);
    }
    expect(MEASURED_AESTHETICS.length).toBeLessThan(AESTHETICS.length);
  });
});

describe('견본 그래프', () => {
  it('격자는 6x6이고 간선이 60개다', () => {
    const grid = buildGraph('grid');
    expect(grid.nodeCount).toBe(36);
    // 6x6 격자: 가로 6행 x 5 + 세로 6열 x 5 = 60
    expect(grid.edges).toHaveLength(60);
  });

  it('나무는 노드보다 간선이 하나 적다', () => {
    const tree = buildGraph('tree');
    expect(tree.edges).toHaveLength(tree.nodeCount - 1);
  });

  it('모든 견본이 하나로 이어져 있다', () => {
    for (const id of ['clusters', 'grid', 'tree'] as const) {
      const graph = buildGraph(id);
      const seen = new Set([0]);
      const queue = [0];
      const neighbors = adjacency(graph);
      for (let head = 0; head < queue.length; head += 1) {
        for (const next of neighbors[queue[head]]) {
          if (!seen.has(next)) {
            seen.add(next);
            queue.push(next);
          }
        }
      }
      expect(seen.size, id).toBe(graph.nodeCount);
    }
  });

  it('같은 견본은 늘 같은 그래프다', () => {
    expect(buildGraph('clusters')).toEqual(buildGraph('clusters'));
  });

  it('간선에 자기 고리나 중복이 없다', () => {
    for (const id of ['clusters', 'grid', 'tree'] as const) {
      const graph = buildGraph(id);
      const keys = new Set<string>();
      for (const [a, b] of graph.edges) {
        expect(a, id).not.toBe(b);
        expect(a, id).toBeLessThan(b);
        keys.add(`${a},${b}`);
      }
      expect(keys.size, id).toBe(graph.edges.length);
    }
  });
});

describe('최단경로', () => {
  it('선분 그래프의 거리를 바르게 센다', () => {
    // 0 - 1 - 2
    const path = shortestPaths({ nodeCount: 3, edges: [[0, 1], [1, 2]] });
    expect(path[0][0]).toBe(0);
    expect(path[0][1]).toBe(1);
    expect(path[0][2]).toBe(2);
    expect(path[2][0]).toBe(2);
  });

  it('대칭이고 대각선이 0이다', () => {
    const graph = buildGraph('clusters');
    const paths = shortestPaths(graph);
    for (let i = 0; i < graph.nodeCount; i += 1) {
      expect(paths[i][i]).toBe(0);
      for (let j = 0; j < graph.nodeCount; j += 1) {
        expect(paths[i][j]).toBe(paths[j][i]);
      }
    }
  });

  it('끊긴 쌍은 가장 먼 거리보다 하나 더 멀다', () => {
    // 0-1 과 2-3 두 조각.
    const paths = shortestPaths({ nodeCount: 4, edges: [[0, 1], [2, 3]] });
    expect(paths[0][1]).toBe(1);
    expect(paths[0][2]).toBe(2);
  });
});

describe('기하 지표', () => {
  const square: Point[] = [
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: 1, y: 1 },
    { x: 0, y: 1 },
  ];

  it('정사각형의 가로세로비는 1이다', () => {
    expect(aspectRatio(square)).toBeCloseTo(1, 12);
    // 가로로 두 배 긴 배치는 0.5다.
    expect(aspectRatio([{ x: 0, y: 0 }, { x: 1, y: 0.5 }])).toBeCloseTo(0.5, 12);
  });

  it('축에 붙은 간선은 직교성 1, 45도는 0이다', () => {
    const axis = { nodeCount: 2, edges: [[0, 1]] as [number, number][] };
    expect(edgeOrthogonality(axis, [{ x: 0, y: 0 }, { x: 1, y: 0 }])).toBeCloseTo(1, 12);
    expect(edgeOrthogonality(axis, [{ x: 0, y: 0 }, { x: 0, y: 1 }])).toBeCloseTo(1, 12);
    expect(edgeOrthogonality(axis, [{ x: 0, y: 0 }, { x: 1, y: 1 }])).toBeCloseTo(0, 12);
  });

  it('직각으로 만나는 두 간선의 교차각은 1이다', () => {
    // (0,0)-(1,1) 과 (0,1)-(1,0): 가운데서 90도로 만난다.
    const graph = { nodeCount: 4, edges: [[0, 1], [2, 3]] as [number, number][] };
    const points: Point[] = [
      { x: 0, y: 0 },
      { x: 1, y: 1 },
      { x: 0, y: 1 },
      { x: 1, y: 0 },
    ];
    const report = crossings(graph, points);
    expect(report.count).toBe(1);
    expect(report.meanAngle).toBeCloseTo(90, 9);
    expect(crossingAngle(report)).toBeCloseTo(1, 9);
  });

  it('교차가 없으면 교차각은 잴 수 없어 null이다', () => {
    const graph = { nodeCount: 4, edges: [[0, 1], [2, 3]] as [number, number][] };
    const apart: Point[] = [
      { x: 0, y: 0 },
      { x: 0.2, y: 0 },
      { x: 0.8, y: 1 },
      { x: 1, y: 1 },
    ];
    const report = crossings(graph, apart);
    expect(report.count).toBe(0);
    expect(crossingAngle(report)).toBeNull();
    // 교차가 없으면 교차 지표는 1(가장 좋음)이다.
    expect(edgeCrossings(report)).toBe(1);
  });

  it('끝점을 나눠 가진 간선은 교차로 세지 않는다', () => {
    const graph = { nodeCount: 3, edges: [[0, 1], [1, 2]] as [number, number][] };
    const points: Point[] = [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }];
    const report = crossings(graph, points);
    expect(report.count).toBe(0);
    expect(report.candidatePairs).toBe(0);
  });

  it('점 해상도는 가장 가까운 쌍과 가장 먼 쌍의 비다', () => {
    // (0,0),(1,0),(3,0): 가장 가까운 1, 가장 먼 3 -> 1/3
    expect(nodeResolution([{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 3, y: 0 }])).toBeCloseTo(1 / 3, 12);
  });

  it('고르게 퍼진 점이 한 칸에 뭉친 점보다 균일하다', () => {
    const spread = Array.from({ length: 16 }, (_, i) => ({
      x: (i % 4) / 4 + 0.1,
      y: Math.floor(i / 4) / 4 + 0.1,
    }));
    const clumped = Array.from({ length: 16 }, (_, i) => ({ x: 0.01 * i, y: 0.01 * i }));
    expect(nodeUniformity(spread)).toBeGreaterThan(nodeUniformity(clumped));
    expect(nodeUniformity(spread)).toBeCloseTo(1, 6);
  });
});

describe('충실도 지표', () => {
  it('목표 거리와 똑같이 놓이면 스트레스 점수가 1이다', () => {
    const points: Point[] = [{ x: 0, y: 0 }, { x: 1, y: 0 }];
    const target = [[0, 1], [1, 0]];
    expect(faithfulnessStress(points, target)).toBeCloseTo(1, 12);
  });

  it('같은 자리에 다 모으면 스트레스 점수가 0이다', () => {
    const points: Point[] = [{ x: 0.5, y: 0.5 }, { x: 0.5, y: 0.5 }];
    expect(faithfulnessStress(points, [[0, 1], [1, 0]])).toBeCloseTo(0, 12);
  });

  it('이웃이 그대로 보존되면 신뢰도·연속성이 1이다', () => {
    const points: Point[] = [
      { x: 0, y: 0 },
      { x: 0.1, y: 0 },
      { x: 0.9, y: 0 },
      { x: 1, y: 0 },
    ];
    const target = [
      [0, 0.1, 0.9, 1],
      [0.1, 0, 0.8, 0.9],
      [0.9, 0.8, 0, 0.1],
      [1, 0.9, 0.1, 0],
    ];
    expect(trustworthiness(points, target, 1)).toBeCloseTo(1, 12);
    expect(continuity(points, target, 1)).toBeCloseTo(1, 12);
  });

  it('이웃이 완전히 뒤바뀌면 1보다 작다', () => {
    const points: Point[] = [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 0.05, y: 0 },
      { x: 0.95, y: 0 },
    ];
    const target = [
      [0, 0.1, 0.9, 1],
      [0.1, 0, 0.8, 0.9],
      [0.9, 0.8, 0, 0.1],
      [1, 0.9, 0.1, 0],
    ];
    expect(trustworthiness(points, target, 1)).toBeLessThan(1);
  });
});

describe('배치 걸음', () => {
  const graph = buildGraph('clusters');
  const target = targetDistances(shortestPaths(graph));

  it('시작 배치는 늘 같고 [0,1] 안에 있다', () => {
    const first = initialLayout(graph);
    expect(first).toEqual(initialLayout(graph));
    for (const point of first) {
      expect(point.x).toBeGreaterThanOrEqual(0);
      expect(point.x).toBeLessThanOrEqual(1);
    }
  });

  it('충실 목표는 스트레스 점수를 올린다', () => {
    let points = initialLayout(graph);
    const before = faithfulnessStress(points, target);
    for (let i = 0; i < 12; i += 1) points = layoutStep(points, graph, target, 'faithful');
    expect(faithfulnessStress(points, target)).toBeGreaterThan(before);
  });

  it('정사각 목표는 가로세로비를 1에 가깝게 만든다', () => {
    // 일부러 납작한 배치에서 시작한다.
    let points = normalize(initialLayout(graph).map((p) => ({ x: p.x, y: p.y * 0.3 })));
    const before = aspectRatio(points);
    for (let i = 0; i < 12; i += 1) points = layoutStep(points, graph, target, 'square');
    expect(aspectRatio(points)).toBeGreaterThan(before);
  });

  it('직교 목표는 간선을 축에 붙인다', () => {
    let points = initialLayout(graph);
    const before = edgeOrthogonality(graph, points);
    for (let i = 0; i < 12; i += 1) points = layoutStep(points, graph, target, 'orthogonal');
    expect(edgeOrthogonality(graph, points)).toBeGreaterThan(before);
  });

  it('같은 시작에서 같은 길을 걷는다 (결정론적)', () => {
    const walk = (goal: 'faithful' | 'square' | 'orthogonal') => {
      let points = initialLayout(graph);
      for (let i = 0; i < 6; i += 1) points = layoutStep(points, graph, target, goal);
      return points;
    };
    expect(walk('faithful')).toEqual(walk('faithful'));
    expect(walk('orthogonal')).toEqual(walk('orthogonal'));
  });

  it('걸음마다 배치가 [0,1] 사각형 안에 남는다', () => {
    let points = initialLayout(graph);
    for (let i = 0; i < 10; i += 1) {
      points = layoutStep(points, graph, target, 'faithful');
      for (const point of points) {
        expect(point.x).toBeGreaterThanOrEqual(-1e-9);
        expect(point.x).toBeLessThanOrEqual(1 + 1e-9);
        expect(point.y).toBeGreaterThanOrEqual(-1e-9);
        expect(point.y).toBeLessThanOrEqual(1 + 1e-9);
      }
    }
  });
});

describe('두 눈으로 재기', () => {
  const graph = buildGraph('clusters');
  const target = targetDistances(shortestPaths(graph));

  it('점수가 모두 0과 1 사이이거나 null이다', () => {
    const scores = scoreLayout(graph, initialLayout(graph), target);
    for (const value of Object.values(scores.aesthetics)) {
      if (value === null) continue;
      expect(value).toBeGreaterThanOrEqual(0);
      expect(value).toBeLessThanOrEqual(1);
    }
    for (const value of Object.values(scores.faithfulness)) {
      expect(value).toBeGreaterThanOrEqual(0);
      expect(value).toBeLessThanOrEqual(1);
    }
  });

  it('격자에서 정사각으로 미는 것이 충실도를 깎는다 - 논문의 그룹 3', () => {
    // 격자 그래프는 스트레스를 줄이면 납작한 배치가 된다(비율 0.57).
    // 그것을 억지로 정사각에 맞추면 거리가 왜곡돼 충실도가 떨어진다.
    const grid = buildGraph('grid');
    const gridTarget = targetDistances(shortestPaths(grid));
    let points = initialLayout(grid);
    for (let i = 0; i < 25; i += 1) points = layoutStep(points, grid, gridTarget, 'faithful');
    const before = scoreLayout(grid, points, gridTarget);

    let squared = points;
    for (let i = 0; i < 15; i += 1) squared = layoutStep(squared, grid, gridTarget, 'square');
    const after = scoreLayout(grid, squared, gridTarget);

    const delta = scoreDelta(before, after);
    expect(delta.aesthetics.aspectRatio).toBeGreaterThan(0.3);
    expect(delta.faithfulness.stress).toBeLessThan(-0.05);
  });

  it('뭉치 그래프에서는 방향이 반대다 - 상관은 627개의 평균이지 개별 보장이 아니다', () => {
    // 뭉치 그래프는 이미 거의 정사각(0.925)이라 밀어도 왜곡이 거의 없고,
    // 스트레스 점수가 오히려 조금 오른다. 논문의 상관은 627개 그래프의 것이고
    // 개별 그래프에서 늘 같은 방향이라는 뜻이 아니다. 화면도 이것을 적는다.
    const graph2 = buildGraph('clusters');
    const target2 = targetDistances(shortestPaths(graph2));
    let points = initialLayout(graph2);
    for (let i = 0; i < 25; i += 1) points = layoutStep(points, graph2, target2, 'faithful');
    const before = scoreLayout(graph2, points, target2);
    let squared = points;
    for (let i = 0; i < 15; i += 1) squared = layoutStep(squared, graph2, target2, 'square');
    const after = scoreLayout(graph2, squared, target2);
    expect(scoreDelta(before, after).faithfulness.stress).toBeGreaterThan(0);
  });

  it('직교로 미는 것은 직교성만 크게 올리고 충실도는 거의 건드리지 않는다 - 그룹 4', () => {
    // 논문: Edge Orthogonality는 모든 DR 지표와 |r| < 0.1로 구조적으로 독립이다.
    for (const id of ['clusters', 'grid', 'tree'] as const) {
      const each = buildGraph(id);
      const eachTarget = targetDistances(shortestPaths(each));
      let points = initialLayout(each);
      for (let i = 0; i < 25; i += 1) points = layoutStep(points, each, eachTarget, 'faithful');
      const before = scoreLayout(each, points, eachTarget);
      let turned = points;
      for (let i = 0; i < 15; i += 1) turned = layoutStep(turned, each, eachTarget, 'orthogonal');
      const after = scoreLayout(each, turned, eachTarget);
      const delta = scoreDelta(before, after);
      // 직교성은 크게 오르고,
      expect(delta.aesthetics.edgeOrthogonality, id).toBeGreaterThan(0.15);
      // 충실도의 움직임은 그보다 훨씬 작다.
      expect(Math.abs(delta.faithfulness.stress), id).toBeLessThan(0.05);
    }
  });

  it('차이 셈이 두 점수의 뺄셈과 같다', () => {
    const a = scoreLayout(graph, initialLayout(graph), target);
    const b = scoreLayout(graph, layoutStep(initialLayout(graph), graph, target, 'faithful'), target);
    const delta = scoreDelta(a, b);
    expect(delta.faithfulness.stress).toBeCloseTo(b.faithfulness.stress - a.faithfulness.stress, 12);
  });

  it('한쪽이 null이면 차이도 null이다', () => {
    const a = scoreLayout(graph, initialLayout(graph), target);
    const withNull = { ...a, aesthetics: { ...a.aesthetics, crossingAngle: null } };
    expect(scoreDelta(withNull, a).aesthetics.crossingAngle).toBeNull();
  });
});
