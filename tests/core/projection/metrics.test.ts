import { describe, expect, it } from 'vitest';
import {
  continuity,
  distanceCorrelation,
  evaluate,
  neighborhoodHit,
  pointDistortions,
  prepare,
  projectToPlane,
  spearman,
  standardize,
  trustworthiness,
} from '@core/projection';
import type { Projection } from '@core/projection';

/** 두 덩어리가 뚜렷하게 나뉜 3차원 자료. 좌표를 어떻게 주느냐에 따라 지표가 달라져야 한다. */
function twoClusters(count: number): { high: number[][]; labels: string[] } {
  const high: number[][] = [];
  const labels: string[] = [];
  for (let i = 0; i < count; i += 1) {
    const far = i >= count / 2;
    const jitter = (i % 7) * 0.01;
    high.push(far ? [10 + jitter, 10 + jitter, 10] : [jitter, jitter, 0]);
    labels.push(far ? 'B' : 'A');
  }
  return { high, labels };
}

describe('표준화', () => {
  it('열마다 평균 0, 표준편차 1이 된다', () => {
    const result = standardize([[1, 100], [2, 200], [3, 300]]);
    for (let column = 0; column < 2; column += 1) {
      const values = result.map((row) => row[column]);
      const mean = values.reduce((a, b) => a + b, 0) / values.length;
      expect(mean).toBeCloseTo(0, 10);
    }
  });

  it('값이 모두 같은 열에서 0으로 나누지 않는다', () => {
    const result = standardize([[5], [5], [5]]);
    expect(result.every((row) => Number.isFinite(row[0]))).toBe(true);
  });
});

describe('순위 상관', () => {
  it('같은 순서면 1이다', () => {
    expect(spearman([1, 2, 3, 4], [10, 20, 30, 40])).toBeCloseTo(1, 10);
  });

  it('뒤집힌 순서면 -1이다', () => {
    expect(spearman([1, 2, 3, 4], [40, 30, 20, 10])).toBeCloseTo(-1, 10);
  });
});

describe('신뢰도와 연속성', () => {
  const { high, labels } = twoClusters(40);

  it('좌표가 원본 구조를 그대로 담으면 두 지표 모두 1에 가깝다', () => {
    // 앞 두 축만 쓴 좌표는 이 자료의 이웃 관계를 그대로 보존한다.
    const projection: Projection = { high, low: high.map(([x, y]) => [x, y]), labels };
    const prepared = prepare(projection, false);
    expect(trustworthiness(prepared, 5)).toBeGreaterThan(0.99);
    expect(continuity(prepared, 5)).toBeGreaterThan(0.99);
  });

  it('좌표를 무작위로 흩뜨리면 두 지표가 함께 떨어진다', () => {
    const scrambled: [number, number][] = high.map((_, index) => [
      Math.sin(index * 12.9898) * 100,
      Math.cos(index * 78.233) * 100,
    ]);
    const prepared = prepare({ high, low: scrambled, labels }, false);
    expect(trustworthiness(prepared, 5)).toBeLessThan(0.9);
    expect(continuity(prepared, 5)).toBeLessThan(0.9);
  });

  it('모든 점을 한 자리에 뭉치면 연속성은 높지만 신뢰도가 무너진다', () => {
    // 이 사례가 두 지표를 함께 봐야 하는 이유다. 하나만 보면 속는다.
    const collapsed: [number, number][] = high.map(() => [0, 0]);
    const prepared = prepare({ high, low: collapsed, labels }, false);
    expect(trustworthiness(prepared, 5)).toBeLessThan(continuity(prepared, 5));
  });

  it('두 지표 모두 0과 1 사이에 있다', () => {
    const projection: Projection = { high, low: high.map(([x, y]) => [x, y]), labels };
    const prepared = prepare(projection, true);
    for (const value of [trustworthiness(prepared, 7), continuity(prepared, 7)]) {
      expect(value).toBeGreaterThanOrEqual(0);
      expect(value).toBeLessThanOrEqual(1);
    }
  });
});

describe('이웃 적중률', () => {
  it('군집이 유지되면 1에 가깝다', () => {
    const { high, labels } = twoClusters(40);
    const prepared = prepare({ high, low: high.map(([x, y]) => [x, y]), labels }, false);
    expect(neighborhoodHit(prepared, labels, 5)).toBeGreaterThan(0.95);
  });
});

describe('전체 구조', () => {
  it('좌표가 원본을 담으면 거리 순위 상관이 높다', () => {
    const { high } = twoClusters(30);
    const prepared = prepare({ high, low: high.map(([x, y]) => [x, y]) }, false);
    expect(distanceCorrelation(prepared)).toBeGreaterThan(0.9);
  });
});

describe('점별 왜곡', () => {
  it('완벽한 좌표에서는 놓친 이웃이 없다', () => {
    const { high } = twoClusters(30);
    const prepared = prepare({ high, low: high.map(([x, y]) => [x, y]) }, false);
    const total = pointDistortions(prepared, 5).reduce((sum, item) => sum + item.missingNeighbors, 0);
    expect(total).toBe(0);
  });

  it('뭉개진 좌표에서는 놓친 이웃이 생긴다', () => {
    const { high } = twoClusters(30);
    const prepared = prepare({ high, low: high.map((_, i) => [i % 3, 0] as [number, number]) }, false);
    const total = pointDistortions(prepared, 5).reduce((sum, item) => sum + item.missingNeighbors, 0);
    expect(total).toBeGreaterThan(0);
  });
});

describe('PCA', () => {
  it('같은 입력이면 항상 같은 좌표가 나온다', () => {
    const { high } = twoClusters(20);
    expect(projectToPlane(high)).toEqual(projectToPlane(high));
  });

  it('분산이 가장 큰 방향을 첫 축으로 잡는다', () => {
    // x축 분산이 y축보다 훨씬 크므로 첫 축의 값 범위가 더 넓어야 한다.
    const rows = Array.from({ length: 40 }, (_, i) => [i, (i % 2) * 0.01, 0]);
    const projected = projectToPlane(rows);
    const spread = (values: number[]) => Math.max(...values) - Math.min(...values);
    expect(spread(projected.map((p) => p[0]))).toBeGreaterThan(spread(projected.map((p) => p[1])));
  });
});

describe('통합 평가', () => {
  it('라벨이 없으면 이웃 적중률을 계산하지 않는다', () => {
    const { high } = twoClusters(20);
    const result = evaluate({ high, low: high.map(([x, y]) => [x, y]) }, 5, true);
    expect(result.metrics.neighborhoodHit).toBeNull();
    expect(result.metrics.pointCount).toBe(20);
    expect(result.distortions).toHaveLength(20);
  });
});
