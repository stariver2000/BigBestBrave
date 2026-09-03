import { describe, expect, it } from 'vitest';
import {
  DATA_SHAPE,
  LENS,
  STUDIES,
  closenessMap,
  closenessTo,
  compareBrushes,
  confusionByCluster,
  coveredBy,
  densities,
  findSeeds,
  fitToBox,
  hardestCluster,
  lensAt,
  makeDataset,
  nearestNeighbors,
  neighborCountFor,
  project,
  radiusFor,
  relocate,
  scoreAgainst,
  snnSimilarity,
} from '@core/brushing';

/** 시험 전체가 쓰는 견본. 씨앗이 고정이라 언제나 같은 자료다. */
const SEED = 20260903;
const data = makeDataset(SEED);
const k = neighborCountFor(data.rows.length);
const neighbors = nearestNeighbors(data.rows, k);
const similarity = snnSimilarity(neighbors, k);
const density = densities(similarity);

describe('SNN 유사도 (논문 4.1절)', () => {
  it('k는 점 개수의 제곱근이다', () => {
    expect(data.rows).toHaveLength(data.clusterCount * DATA_SHAPE.perCluster);
    expect(k).toBe(Math.round(Math.sqrt(data.rows.length)));
  });

  it('대칭이고 대각선은 0이다', () => {
    for (let i = 0; i < 12; i += 1) {
      expect(similarity[i][i]).toBe(0);
      for (let j = 0; j < 12; j += 1) expect(similarity[i][j]).toBe(similarity[j][i]);
    }
  });

  it('이웃을 하나도 안 나눠 가지면 0이다', () => {
    // 서로 멀찍이 떨어진 두 점을 지어 확인한다.
    const far = [[0, 0], [0.1, 0], [0.2, 0], [100, 0], [100.1, 0], [100.2, 0]];
    const farNeighbors = nearestNeighbors(far, 2);
    const farSimilarity = snnSimilarity(farNeighbors, 2);
    expect(farSimilarity[0][3]).toBe(0);
    expect(farSimilarity[0][1]).toBeGreaterThan(0);
  });

  it('같은 무리끼리가 다른 무리보다 대체로 더 닮았다', () => {
    // 무리 0의 첫 점을 기준으로, 같은 무리 평균이 다른 무리 평균보다 커야 한다.
    let same = 0;
    let sameCount = 0;
    let other = 0;
    let otherCount = 0;
    for (let j = 1; j < data.rows.length; j += 1) {
      if (data.labels[j] === data.labels[0]) {
        same += similarity[0][j];
        sameCount += 1;
      } else {
        other += similarity[0][j];
        otherCount += 1;
      }
    }
    expect(same / sameCount).toBeGreaterThan(other / otherCount);
  });

  it('같은 씨앗이면 같은 자료가 나온다', () => {
    expect(makeDataset(SEED).rows[7]).toEqual(data.rows[7]);
    expect(makeDataset(SEED + 1).rows[7]).not.toEqual(data.rows[7]);
  });
});

describe('고차원 가까움', () => {
  it('제 이웃을 전부 칠하면 1, 하나도 안 칠하면 0이다', () => {
    const point = 5;
    const all = new Set(neighbors[point]);
    expect(closenessTo(point, all, neighbors, similarity)).toBeCloseTo(1, 10);
    expect(closenessTo(point, new Set<number>(), neighbors, similarity)).toBe(0);
  });

  it('언제나 0과 1 사이다', () => {
    const brushed = new Set([0, 1, 2, 3, 4, 5]);
    for (const value of closenessMap(brushed, neighbors, similarity)) {
      expect(value).toBeGreaterThanOrEqual(0);
      expect(value).toBeLessThanOrEqual(1);
    }
  });

  it('칠한 점 자신은 1이다', () => {
    const brushed = new Set([10, 11]);
    const map = closenessMap(brushed, neighbors, similarity);
    expect(map[10]).toBe(1);
    expect(map[11]).toBe(1);
  });

  it('같은 무리를 칠하면 그 무리의 가까움이 다른 무리보다 높다', () => {
    const cluster0 = data.labels.flatMap((label, index) => (label === 0 ? [index] : []));
    const brushed = new Set(cluster0.slice(0, 20));
    const map = closenessMap(brushed, neighbors, similarity);
    const inside = cluster0.slice(20).map((index) => map[index]);
    const outside = data.labels.flatMap((label, index) => (label !== 0 ? [map[index]] : []));
    const mean = (values: number[]) => values.reduce((a, b) => a + b, 0) / values.length;
    expect(mean(inside)).toBeGreaterThan(mean(outside));
  });
});

describe('씨앗 점 찾기 (Step 2)', () => {
  it('붓 안에서 밀도가 가장 높은 점이 첫 씨앗이다', () => {
    const covered = [3, 17, 42, 61];
    const seeds = findSeeds(covered, density, similarity);
    const best = covered.reduce((a, b) => (density[a] >= density[b] ? a : b));
    expect(seeds[0]).toBe(best);
  });

  it('씨앗은 전부 붓이 덮은 점이다', () => {
    const covered = [0, 1, 2, 3, 40, 80];
    const seeds = findSeeds(covered, density, similarity);
    for (const seed of seeds) expect(covered).toContain(seed);
  });

  it('붓 밖의 이웃을 만나면 거기서 멈춘다', () => {
    // 규칙만 겨누도록 손으로 지은 네 점. 밀도는 0번이 가장 높고,
    // 0번과 닮은 순서는 1 > 2 > 3이다.
    const toyDensity = [10, 1, 1, 1];
    const toySimilarity = [
      [0, 5, 3, 1],
      [5, 0, 0, 0],
      [3, 0, 0, 0],
      [1, 0, 0, 0],
    ];
    // 가장 닮은 1번이 붓 밖이면 씨앗은 0번 하나뿐이다 - 그 뒤는 더 먼 이웃이다.
    expect(findSeeds([0, 2, 3], toyDensity, toySimilarity)).toEqual([0]);
    // 1번이 붓 안이고 2번이 밖이면 거기까지만 담는다.
    expect(findSeeds([0, 1, 3], toyDensity, toySimilarity)).toEqual([0, 1]);
    // 전부 붓 안이면 닮은 순서로 전부 담는다.
    expect(findSeeds([0, 1, 2, 3], toyDensity, toySimilarity)).toEqual([0, 1, 2, 3]);
  });

  it('빈 붓은 빈 씨앗이다', () => {
    expect(findSeeds([], density, similarity)).toEqual([]);
  });
});

describe('렌즈와 재배치 (Step 3)', () => {
  const lens = lensAt(100, 100, 20);

  it('바깥 경계는 안쪽의 세 배다 - 고리 폭이 붓의 지름과 같아진다', () => {
    expect(lens.outer).toBe(lens.inner * LENS.outerRatio);
    expect(lens.outer - lens.inner).toBe(lens.inner * 2);
  });

  it('가까움 1은 안쪽 경계 안, 0은 바깥 경계 밖이다', () => {
    expect(radiusFor(1, lens, 50)).toBeLessThan(lens.inner);
    expect(radiusFor(0, lens, 5)).toBeGreaterThan(lens.outer);
  });

  it('고리 안의 규칙이 두 경계와 이어진다: r = τ(3 − 2c)', () => {
    expect(radiusFor(0.999, lens, 40)).toBeCloseTo(lens.inner * (3 - 2 * 0.999), 10);
    expect(radiusFor(0.5, lens, 40)).toBeCloseTo(lens.inner * 2, 10);
    expect(radiusFor(0.001, lens, 40)).toBeCloseTo(lens.inner * (3 - 2 * 0.001), 10);
  });

  it('가까울수록 중심에 붙는다 - 순서가 뒤집히지 않는다', () => {
    let previous = Infinity;
    for (const closeness of [0.1, 0.3, 0.5, 0.7, 0.9]) {
      const radius = radiusFor(closeness, lens, 40);
      expect(radius).toBeLessThan(previous);
      previous = radius;
    }
  });

  it('재배치는 방향을 지키고 거리만 고친다', () => {
    const original = { x: 140, y: 100 };
    const moved = relocate(original, 0.5, lens);
    // 같은 방향(중심에서 오른쪽)에 그대로 있다.
    expect(moved.y).toBeCloseTo(100, 10);
    expect(moved.x).toBeGreaterThan(lens.centerX);
    expect(Math.hypot(moved.x - lens.centerX, moved.y - lens.centerY)).toBeCloseTo(lens.inner * 2, 10);
  });

  it('중심에 얹힌 점은 흔들지 않는다', () => {
    expect(relocate({ x: 100, y: 100 }, 0, lens)).toEqual({ x: 100, y: 100 });
  });
});

describe('붓이 덮은 점', () => {
  it('반지름 안의 점만 담는다', () => {
    const points = [{ x: 0, y: 0 }, { x: 3, y: 4 }, { x: 30, y: 0 }];
    expect(coveredBy(points, 0, 0, 5)).toEqual([0, 1]);
    expect(coveredBy(points, 0, 0, 1)).toEqual([0]);
  });
});

describe('채점', () => {
  it('전부 맞히면 1이고, 0으로 나누지 않는다', () => {
    const truth = new Set([1, 2, 3]);
    expect(scoreAgainst(truth, truth).f1).toBe(1);
    expect(scoreAgainst(truth, new Set<number>())).toMatchObject({ precision: 0, recall: 0, f1: 0 });
    expect(scoreAgainst(new Set<number>(), new Set([1]))).toMatchObject({ recall: 0, f1: 0 });
  });

  it('절반만 고르면 재현율이 절반이다', () => {
    const truth = new Set([1, 2, 3, 4]);
    const score = scoreAgainst(truth, new Set([1, 2]));
    expect(score.precision).toBe(1);
    expect(score.recall).toBe(0.5);
  });
});

describe('투영과 왜곡 (이 페이지가 서는 두 조건)', () => {
  const purity = (rows: number[][], k: number) => {
    const near = nearestNeighbors(rows, k);
    let hits = 0;
    let total = 0;
    near.forEach((list, index) => {
      for (const other of list) {
        total += 1;
        if (data.labels[other] === data.labels[index]) hits += 1;
      }
    });
    return hits / total;
  };

  it('조건 1: 고차원에서는 무리가 진짜로 갈려 있다', () => {
    // 이것이 깨지면 "고차원의 이웃"이라는 말 자체가 뜻을 잃는다.
    expect(purity(data.rows, k)).toBeGreaterThan(0.99);
  });

  it('조건 2: 2차원 그림에서는 무리가 겹친다 - 보여 줄 왜곡이 있다', () => {
    const pca = purity(project(data.rows, 'pca', SEED).map(([x, y]) => [x, y]), 6);
    const random = purity(project(data.rows, 'random', SEED).map(([x, y]) => [x, y]), 6);
    // 화면 이웃의 일부는 반드시 남남이어야 한다.
    expect(pca).toBeLessThan(0.95);
    expect(random).toBeLessThan(0.9);
    // 무작위 직교 투영이 PCA보다 더 뭉갠다 - 논문이 높은 FN을 만들 때 쓴 방법이다.
    expect(random).toBeLessThan(pca);
  });

  it('무리마다 파묻힌 정도가 다르다 - 쉬운 무리와 어려운 무리가 함께 있다', () => {
    const coords = fitToBox(project(data.rows, 'pca', SEED), 400, 400, 20);
    const confusion = confusionByCluster(coords, data.labels, data.clusterCount, 6);
    expect(confusion).toHaveLength(data.clusterCount);
    expect(Math.max(...confusion) - Math.min(...confusion)).toBeGreaterThan(0.1);
    expect(hardestCluster(confusion)).toBe(confusion.indexOf(Math.max(...confusion)));
  });

  it('같은 씨앗이면 같은 투영이 나온다', () => {
    expect(project(data.rows, 'random', SEED)).toEqual(project(data.rows, 'random', SEED));
  });

  it('상자 맞춤이 여백 안에 들어간다', () => {
    const fitted = fitToBox(project(data.rows, 'pca', SEED), 400, 300, 20);
    for (const point of fitted) {
      expect(point.x).toBeGreaterThanOrEqual(-0.001);
      expect(point.x).toBeLessThanOrEqual(400.001);
      expect(point.y).toBeGreaterThanOrEqual(-0.001);
      expect(point.y).toBeLessThanOrEqual(300.001);
    }
  });
});

describe('논문의 셈', () => {
  it('두 실험의 참가자를 합하면 초록의 24명이다', () => {
    expect(STUDIES.study1.participants + STUDIES.study2.participants).toBe(STUDIES.total);
  });

  it('성별 셈이 각 실험의 인원과 맞는다', () => {
    expect(STUDIES.study1.males + STUDIES.study1.females).toBe(STUDIES.study1.participants);
    expect(STUDIES.study2.males + STUDIES.study2.females).toBe(STUDIES.study2.participants);
  });

  it('나이 표준편차가 범위가 허용하는 상한 안에 있다', () => {
    // 폭 w의 범위에 갇힌 n개 값의 표본 표준편차 상한은 (w/2)·√(n/(n-1))이다.
    const bound = (min: number, max: number, n: number) => ((max - min) / 2) * Math.sqrt(n / (n - 1));
    const one = STUDIES.study1;
    const two = STUDIES.study2;
    expect(one.ageSd).toBeLessThan(bound(one.ageMin, one.ageMax, one.participants));
    expect(two.ageSd).toBeLessThan(bound(two.ageMin, two.ageMax, two.participants));
  });

  it('평균 나이가 범위 안에 있다', () => {
    expect(STUDIES.study1.ageMean).toBeGreaterThan(STUDIES.study1.ageMin);
    expect(STUDIES.study1.ageMean).toBeLessThan(STUDIES.study1.ageMax);
    expect(STUDIES.study2.ageMean).toBeGreaterThan(STUDIES.study2.ageMin);
    expect(STUDIES.study2.ageMean).toBeLessThan(STUDIES.study2.ageMax);
  });

  it('자극의 점 개수 범위가 무리 수 × 무리당 점수와 맞물린다', () => {
    // 무리 2~4개, 무리당 100·150·200점.
    expect(2 * 100).toBe(STUDIES.pointsMin);
    expect(4 * 200).toBe(STUDIES.pointsMax);
  });
});

describe('두 붓질 견주기 (이 판의 성질, 논문의 결과가 아니다)', () => {
  const coords = fitToBox(project(data.rows, 'pca', SEED), 400, 400, 20);
  const confusion = confusionByCluster(coords, data.labels, data.clusterCount, 6);
  /** 그림에서 가장 파묻힌 무리를 겨눈다 - 보통 붓이 가장 크게 속는 자리다. */
  const target = hardestCluster(confusion);
  /** 그 무리 가운데 고차원 밀도가 가장 높은 점에서 시작한다 - 논문 Step 1이 이르는 자리다. */
  const start = data.labels
    .flatMap((label, index) => (label === target ? [index] : []))
    .reduce((a, b) => (density[a] >= density[b] ? a : b));

  const result = compareBrushes(coords, data.labels, target, start, neighbors, similarity);

  it('같은 자리에서 같은 개수를 담는다 - 다른 것은 가까움의 뜻뿐이다', () => {
    expect(result.size).toBe(DATA_SHAPE.perCluster);
    expect(result.startIndex).toBe(start);
  });

  it('아는 붓이 파묻힌 무리를 거의 그대로 집어낸다', () => {
    expect(result.aware.f1).toBeGreaterThan(0.9);
  });

  it('보통 붓은 겹친 무리에 속아 정확도를 잃는다', () => {
    expect(result.naive.f1).toBeLessThan(result.aware.f1);
  });

  it('가장 안 파묻힌 무리에서는 두 붓이 비슷하다 - 왜곡이 없으면 차이도 없다', () => {
    // 논문의 Finding B-1과 같은 방향이다: 왜곡이 낮으면 어느 기법이든 잘 듣는다.
    const easy = confusion.indexOf(Math.min(...confusion));
    const easyStart = data.labels
      .flatMap((label, index) => (label === easy ? [index] : []))
      .reduce((a, b) => (density[a] >= density[b] ? a : b));
    const far = compareBrushes(coords, data.labels, easy, easyStart, neighbors, similarity);
    expect(far.naive.f1).toBeGreaterThan(0.9);
    expect(Math.abs(far.aware.f1 - far.naive.f1)).toBeLessThan(0.12);
  });

  it('시늉은 결정론이다 - 같은 입력이면 같은 점수가 나온다', () => {
    expect(compareBrushes(coords, data.labels, target, start, neighbors, similarity)).toEqual(result);
  });
});
