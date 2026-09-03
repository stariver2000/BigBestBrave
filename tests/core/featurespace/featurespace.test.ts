import { describe, expect, it } from 'vitest';
import {
  FEATURES,
  GRID,
  GROUPS,
  MODEL_EXPERIMENT,
  POINTS_PER_GROUP,
  QUERIES,
  QUERY_ITERATIONS,
  USER_STUDY,
  buildCafes,
  cellsOf,
  clusteredness,
  entropy,
  entropyUpperBound,
  jacobiEigen,
  kmeans,
  movements,
  overlap,
  project,
  queryAvailable,
  searchStep,
  startSearch,
  weightChoices,
  type Point,
} from '@core/featurespace';

/**
 * 옮겨 적기와 계산 검증.
 *
 * 논문(TVCG 2026, doi:10.1109/TVCG.2025.3622114)의 식 1~3을 손으로 푼 값과
 * 맞춰 보고, 실험·연구 수치를 되짚는다. 논문이 "0에서 1"이라 적은 엔트로피
 * 상한의 어긋남은 고치지 않고 붙든다.
 */
const groupOf = (points: readonly Point[]) => {
  const map = new Map(points.map((point) => [point.id, point.group as string]));
  return (id: number) => map.get(id) ?? '?';
};

describe('논문 수치 옮겨 적기', () => {
  it('세 질의의 방향이 3.2.2절과 같다', () => {
    expect(QUERIES).toHaveLength(3);
    const byId = new Map(QUERIES.map((query) => [query.id, query]));
    expect(byId.get('findClusters')?.semantic).toBe('clusteredness');
    expect(byId.get('findClusters')?.direction).toBe('max');
    expect(byId.get('mergeGroups')?.direction).toBe('max');
    expect(byId.get('separateGroups')?.direction).toBe('min');
    // Merge와 Separate는 무리가 둘 이상이어야 한다.
    expect(byId.get('mergeGroups')?.minGroups).toBe(2);
    expect(byId.get('separateGroups')?.minGroups).toBe(2);
    expect(byId.get('findClusters')?.minGroups).toBe(0);
  });

  it('격자와 반복 수가 논문 그대로다 (20x20, 100회)', () => {
    expect(GRID).toBe(20);
    expect(GRID * GRID).toBe(400);
    expect(QUERY_ITERATIONS).toBe(100);
  });

  it('모형 실험의 값이 서로 어긋나지 않는다', () => {
    const { inferenceTimeMean, inferenceTimeRange, featureRange } = MODEL_EXPERIMENT;
    // 평균 16%가 범위 [13.1, 20.3] 안에 있다.
    expect(inferenceTimeMean).toBeGreaterThanOrEqual(inferenceTimeRange[0]);
    expect(inferenceTimeMean).toBeLessThanOrEqual(inferenceTimeRange[1]);
    expect(featureRange[0]).toBeLessThan(featureRange[1]);
    // 모든 보존 지표는 0~1이고, UMAP 기준이 고차원 기준보다 높다(본문 서술).
    for (const key of ['trustworthiness', 'continuity', 'mrre'] as const) {
      const high = MODEL_EXPERIMENT.againstHighDim[key];
      const umap = MODEL_EXPERIMENT.againstUmap[key];
      expect(high.mean).toBeGreaterThan(0);
      expect(high.mean).toBeLessThanOrEqual(1);
      expect(umap.mean).toBeGreaterThanOrEqual(high.mean);
    }
  });

  it('사용자 연구의 인원 셈이 총계와 맞는다', () => {
    expect(USER_STUDY.males + USER_STUDY.females).toBe(USER_STUDY.participants);
    expect(USER_STUDY.perCondition * 2).toBe(USER_STUDY.participants);
    expect(USER_STUDY.followedQueryFeatures).toBeLessThanOrEqual(USER_STUDY.perCondition);
  });

  it('나이 표기가 범위 안에서 가능한 표준편차다', () => {
    const [min, max] = USER_STUDY.ageRange;
    expect(USER_STUDY.ageMean).toBeGreaterThan(min);
    expect(USER_STUDY.ageMean).toBeLessThan(max);
    // 폭이 w인 n개 값의 표본 표준편차 상한은 (w/2)·sqrt(n/(n-1)).
    const bound = ((max - min) / 2) * Math.sqrt(USER_STUDY.participants / (USER_STUDY.participants - 1));
    expect(USER_STUDY.ageSd).toBeLessThan(bound);
  });

  it('검정값의 유의 표시가 p와 어긋나지 않는다', () => {
    for (const test of USER_STUDY.tests) {
      expect(test.significant).toBe(test.p < 0.05);
      expect(test.r).toBeGreaterThan(0);
      expect(test.r).toBeLessThan(1);
    }
  });
});

describe('식 2의 상한 - 논문의 어긋남', () => {
  it('무리가 둘일 때만 칸 엔트로피의 상한이 1이다', () => {
    // 논문은 "ranges from 0 to 1"이라 적었다. 무리가 둘이면 맞다.
    expect(entropyUpperBound(2)).toBeCloseTo(1, 12);
    expect(entropy([5, 5], 10)).toBeCloseTo(1, 12);
  });

  it('무리가 셋이면 1을 넘는다 (log2(3) = 1.585)', () => {
    expect(entropyUpperBound(3)).toBeCloseTo(Math.log2(3), 12);
    expect(entropyUpperBound(3)).toBeGreaterThan(1);
    // 한 칸에 세 무리가 고르게 있으면 실제로 1을 넘는다.
    expect(entropy([2, 2, 2], 6)).toBeCloseTo(Math.log2(3), 12);
    expect(entropy([2, 2, 2], 6)).toBeGreaterThan(1);
  });

  it('한 무리만 있는 칸은 0이다', () => {
    expect(entropy([7], 7)).toBe(0);
    expect(entropyUpperBound(1)).toBe(0);
    expect(entropy([], 0)).toBe(0);
  });
});

describe('식 1 - Calinski-Harabasz', () => {
  it('손으로 푼 값과 맞는다', () => {
    // 네 점을 두 무리로: (0,0),(0,0) 과 (1,0),(1,0)
    // 전체 중심 (0.5, 0), 무리 중심 (0,0),(1,0). 안쪽 제곱합 0 -> 잴 수 없어 0.
    const flat = [
      { id: 0, x: 0, y: 0 },
      { id: 1, x: 0, y: 0 },
      { id: 2, x: 1, y: 0 },
      { id: 3, x: 1, y: 0 },
    ];
    expect(clusteredness(flat, 2)).toBe(0);

    // 흩어짐이 있는 경우: (0,0),(0.2,0) | (1,0),(1.2,0)
    // 무리 중심 (0.1,0),(1.1,0), 전체 중심 (0.6,0)
    // between = 2*0.25 + 2*0.25 = 1.0,  within = 4*0.01 = 0.04
    // CH = (1.0/(2-1)) * ((4-2)/0.04) = 1.0 * 50 = 50
    const spread = [
      { id: 0, x: 0, y: 0 },
      { id: 1, x: 0.2, y: 0 },
      { id: 2, x: 1, y: 0 },
      { id: 3, x: 1.2, y: 0 },
    ];
    expect(clusteredness(spread, 2)).toBeCloseTo(50, 6);
  });

  it('또렷이 갈린 배치가 뒤섞인 배치보다 크다', () => {
    const apart = [
      { id: 0, x: 0, y: 0 },
      { id: 1, x: 0.05, y: 0.05 },
      { id: 2, x: 1, y: 1 },
      { id: 3, x: 0.95, y: 0.95 },
    ];
    const mixed = [
      { id: 0, x: 0, y: 0 },
      { id: 1, x: 1, y: 1 },
      { id: 2, x: 0.05, y: 0.05 },
      { id: 3, x: 0.95, y: 0.95 },
    ];
    // 같은 점 집합이라도 갈린 쪽이 크거나 같다(k-means가 같은 답에 이르면 같다).
    expect(clusteredness(apart, 2)).toBeGreaterThanOrEqual(clusteredness(mixed, 2) - 1e-9);
  });

  it('잴 수 없는 자리에서는 0을 준다', () => {
    expect(clusteredness([], 3)).toBe(0);
    expect(clusteredness([{ id: 0, x: 0, y: 0 }], 3)).toBe(0);
    // k가 1이면 나눌 수 없다.
    expect(clusteredness([{ id: 0, x: 0, y: 0 }, { id: 1, x: 1, y: 1 }], 1)).toBe(0);
  });
});

describe('식 3 - 겹침', () => {
  const twoGroups = (id: number) => (id < 2 ? 'a' : 'b');

  it('한 칸에 두 무리가 반씩이면 1이다', () => {
    const points = [
      { id: 0, x: 0.51, y: 0.51 },
      { id: 1, x: 0.52, y: 0.52 },
      { id: 2, x: 0.53, y: 0.53 },
      { id: 3, x: 0.54, y: 0.54 },
    ];
    // 네 점이 모두 같은 칸(20x20 격자에서 0.5~0.55는 한 칸)에 든다.
    expect(cellsOf(points, twoGroups)).toHaveLength(1);
    expect(overlap(points, twoGroups)).toBeCloseTo(1, 12);
  });

  it('무리가 칸으로 갈리면 0이다', () => {
    const points = [
      { id: 0, x: 0.02, y: 0.02 },
      { id: 1, x: 0.03, y: 0.03 },
      { id: 2, x: 0.97, y: 0.97 },
      { id: 3, x: 0.98, y: 0.98 },
    ];
    expect(overlap(points, twoGroups)).toBe(0);
  });

  it('칸이 여럿이면 엔트로피가 더해진다', () => {
    const points = [
      { id: 0, x: 0.02, y: 0.02 },
      { id: 1, x: 0.03, y: 0.03 },
      { id: 2, x: 0.97, y: 0.97 },
      { id: 3, x: 0.98, y: 0.98 },
    ];
    // 각 칸에 두 무리가 반씩 들어가게 이름을 바꾸면 1 + 1 = 2가 된다.
    const alternating = (id: number) => (id % 2 === 0 ? 'a' : 'b');
    expect(overlap(points, alternating)).toBeCloseTo(2, 12);
  });

  it('격자 밖으로 나가지 않는다', () => {
    const points = [
      { id: 0, x: 0, y: 0 },
      { id: 1, x: 1, y: 1 },
    ];
    const cells = cellsOf(points, () => 'a');
    for (const cell of cells) {
      expect(cell.gx).toBeGreaterThanOrEqual(0);
      expect(cell.gx).toBeLessThan(GRID);
      expect(cell.gy).toBeGreaterThanOrEqual(0);
      expect(cell.gy).toBeLessThan(GRID);
    }
  });
});

describe('지어낸 카페 자료', () => {
  const cafes = buildCafes();

  it('무리마다 같은 수로 예순 곳이다', () => {
    expect(cafes).toHaveLength(GROUPS.length * POINTS_PER_GROUP);
    for (const group of GROUPS) {
      expect(cafes.filter((cafe) => cafe.group === group)).toHaveLength(POINTS_PER_GROUP);
    }
  });

  it('모든 특징 값이 0과 1 사이다', () => {
    for (const cafe of cafes) {
      expect(cafe.values).toHaveLength(FEATURES.length);
      for (const value of cafe.values) {
        expect(value).toBeGreaterThanOrEqual(0);
        expect(value).toBeLessThanOrEqual(1);
      }
    }
  });

  it('같은 씨앗이면 같은 자료가 나온다', () => {
    expect(buildCafes(1234)).toEqual(buildCafes(1234));
    expect(buildCafes(1234)).not.toEqual(buildCafes(5678));
  });

  it('가르는 특징만 무리별 평균이 갈린다', () => {
    const meanOf = (group: string, index: number) => {
      const rows = cafes.filter((cafe) => cafe.group === group);
      return rows.reduce((sum, row) => sum + row.values[index], 0) / rows.length;
    };
    FEATURES.forEach((feature, index) => {
      const means = GROUPS.map((group) => meanOf(group, index));
      const span = Math.max(...means) - Math.min(...means);
      if (feature.separates) {
        expect(span, feature.id).toBeGreaterThan(0.2);
      } else {
        expect(span, feature.id).toBeLessThan(0.2);
      }
    });
  });
});

describe('가중 투영', () => {
  const cafes = buildCafes();
  const equal = FEATURES.map(() => 1);

  it('결과가 [0, 1] 사각형 안에 있고 점 수가 같다', () => {
    const projected = project(cafes, equal);
    expect(projected).toHaveLength(cafes.length);
    for (const point of projected) {
      expect(point.x).toBeGreaterThanOrEqual(0);
      expect(point.x).toBeLessThanOrEqual(1);
      expect(point.y).toBeGreaterThanOrEqual(0);
      expect(point.y).toBeLessThanOrEqual(1);
    }
  });

  it('같은 가중치면 같은 그림이 나온다 (결정론적)', () => {
    expect(project(cafes, equal)).toEqual(project(cafes, equal));
  });

  it('가중치를 바꾸면 그림이 바뀐다', () => {
    const onlyNoise = FEATURES.map((feature) => (feature.id === 'noise' ? 2 : 0));
    expect(project(cafes, onlyNoise)).not.toEqual(project(cafes, equal));
  });

  it('가중치가 모두 0이면 한가운데로 모은다', () => {
    const projected = project(cafes, FEATURES.map(() => 0));
    for (const point of projected) {
      expect(point.x).toBe(0.5);
      expect(point.y).toBe(0.5);
    }
  });

  it('가르는 특징만 켜면 무리가 더 또렷해진다', () => {
    const separating = FEATURES.map((feature) => (feature.separates ? 1 : 0));
    const noise = FEATURES.map((feature) => (feature.separates ? 0 : 1));
    expect(clusteredness(project(cafes, separating), 3)).toBeGreaterThan(
      clusteredness(project(cafes, noise), 3),
    );
  });

  it('가르는 특징만 켜면 무리가 덜 섞인다', () => {
    const separating = FEATURES.map((feature) => (feature.separates ? 1 : 0));
    const noise = FEATURES.map((feature) => (feature.separates ? 0 : 1));
    const group = groupOf(cafes);
    expect(overlap(project(cafes, separating), group)).toBeLessThan(
      overlap(project(cafes, noise), group),
    );
  });
});

describe('야코비 고유분해', () => {
  it('대각 행렬의 고유값을 내림차순으로 준다', () => {
    const { values } = jacobiEigen([
      [3, 0, 0],
      [0, 1, 0],
      [0, 0, 2],
    ]);
    expect(values[0]).toBeCloseTo(3, 9);
    expect(values[1]).toBeCloseTo(2, 9);
    expect(values[2]).toBeCloseTo(1, 9);
  });

  it('알려진 2x2의 고유값과 맞는다', () => {
    // [[2,1],[1,2]]의 고유값은 3과 1이다.
    const { values, vectors } = jacobiEigen([
      [2, 1],
      [1, 2],
    ]);
    expect(values[0]).toBeCloseTo(3, 9);
    expect(values[1]).toBeCloseTo(1, 9);
    // 고유벡터가 실제로 Av = λv를 만족한다.
    const v = vectors[0];
    expect(2 * v[0] + 1 * v[1]).toBeCloseTo(3 * v[0], 9);
  });

  it('부호가 고정돼 늘 같은 벡터를 준다', () => {
    const matrix = [
      [4, 1],
      [1, 3],
    ];
    expect(jacobiEigen(matrix)).toEqual(jacobiEigen(matrix));
  });
});

describe('k-means', () => {
  it('갈린 두 덩이를 갈라낸다', () => {
    const points = [
      { id: 0, x: 0, y: 0 },
      { id: 1, x: 0.05, y: 0 },
      { id: 2, x: 1, y: 1 },
      { id: 3, x: 0.95, y: 1 },
    ];
    const { labels } = kmeans(points, 2);
    expect(labels[0]).toBe(labels[1]);
    expect(labels[2]).toBe(labels[3]);
    expect(labels[0]).not.toBe(labels[2]);
  });

  it('같은 씨앗이면 같은 이름표를 준다', () => {
    const points = buildCafes().map((cafe, i) => ({ id: i, x: cafe.values[0], y: cafe.values[1] }));
    expect(kmeans(points, 3)).toEqual(kmeans(points, 3));
  });

  it('k가 점 수 이상이면 점마다 제 무리를 준다', () => {
    const points = [
      { id: 0, x: 0, y: 0 },
      { id: 1, x: 1, y: 1 },
    ];
    expect(kmeans(points, 5).usedClusters).toBe(2);
  });
});

describe('질의 탐색', () => {
  const cafes = buildCafes();
  const group = groupOf(cafes);
  const equal = FEATURES.map(() => 1);

  const findScore = (weights: readonly number[]) => clusteredness(project(cafes, weights), 3);
  const overlapScore = (weights: readonly number[]) => overlap(project(cafes, weights), group);

  it('눈금값이 0에서 2까지 0.25 간격이다', () => {
    const choices = weightChoices();
    expect(choices[0]).toBe(0);
    expect(choices[choices.length - 1]).toBe(2);
    expect(choices).toHaveLength(9);
  });

  it('무리 찾기는 걸음마다 무리를 더 또렷하게 만든다', () => {
    let state = startSearch(equal, findScore(equal));
    const first = state.score;
    for (let i = 0; i < FEATURES.length; i += 1) {
      state = searchStep(state, 'findClusters', findScore);
    }
    expect(state.score).toBeGreaterThan(first);
    expect(state.step).toBe(FEATURES.length);
  });

  it('무리 가르기는 겹침을 줄인다', () => {
    let state = startSearch(equal, overlapScore(equal));
    const first = state.score;
    for (let i = 0; i < FEATURES.length; i += 1) {
      state = searchStep(state, 'separateGroups', overlapScore);
    }
    expect(state.score).toBeLessThanOrEqual(first);
  });

  it('무리 합치기는 겹침을 늘린다', () => {
    const start = FEATURES.map((feature) => (feature.separates ? 2 : 0));
    let state = startSearch(start, overlapScore(start));
    const first = state.score;
    for (let i = 0; i < FEATURES.length; i += 1) {
      state = searchStep(state, 'mergeGroups', overlapScore);
    }
    expect(state.score).toBeGreaterThanOrEqual(first);
  });

  it('같은 시작에서 같은 길을 걷는다 (결정론적)', () => {
    const walk = () => {
      let state = startSearch(equal, findScore(equal));
      for (let i = 0; i < 5; i += 1) state = searchStep(state, 'findClusters', findScore);
      return state;
    };
    expect(walk()).toEqual(walk());
  });

  it('움직인 특징을 큰 것부터 돌려준다', () => {
    let state = startSearch(equal, findScore(equal));
    for (let i = 0; i < FEATURES.length; i += 1) {
      state = searchStep(state, 'findClusters', findScore);
    }
    const moved = movements(state);
    expect(moved.length).toBeGreaterThan(0);
    for (let i = 1; i < moved.length; i += 1) {
      expect(Math.abs(moved[i].delta)).toBeLessThanOrEqual(Math.abs(moved[i - 1].delta));
    }
  });

  it('무리가 하나면 합치기·가르기를 쓸 수 없다', () => {
    expect(queryAvailable('findClusters', 1)).toBe(true);
    expect(queryAvailable('mergeGroups', 1)).toBe(false);
    expect(queryAvailable('separateGroups', 2)).toBe(true);
  });

  it('선 탐색은 더 움직이지 않는다', () => {
    const settled = { ...startSearch(equal, 1), settled: true };
    expect(searchStep(settled, 'findClusters', findScore)).toEqual(settled);
  });
});
