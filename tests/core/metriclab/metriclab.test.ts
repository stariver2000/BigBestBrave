import { describe, expect, it } from 'vitest';
import {
  analyze,
  buildDataset,
  buildProjections,
  klDivergence,
  labelTrustworthiness,
  METRICS,
  neighborOverlap,
  POINT_COUNT,
  prepareHigh,
  prepareLow,
  runLab,
  silhouette,
  similarityMatrix,
  stress,
} from '../../../src/core/metriclab';
import type { Projection } from '../../../src/core/metriclab';

const dataset = buildDataset('blobs', 7);
const high = prepareHigh(dataset);

/** 고차원 자료의 앞 두 축을 그대로 쓴 그림. 완벽하지는 않아도 구조를 잘 지킨다. */
function honest(): Projection {
  return { recipe: 'first-two', low: dataset.rows.map((row) => [row[0], row[1]] as [number, number]) };
}

/** 모든 점을 한 자리에 뭉친 그림. 어떤 지표로 재어도 나빠야 한다. */
function collapsed(): Projection {
  return { recipe: 'collapsed', low: dataset.rows.map(() => [0, 0] as [number, number]) };
}

describe('자료', () => {
  it('네 벌 모두 같은 개수의 점과 라벨을 낸다', () => {
    for (const id of ['blobs', 'moons', 'hypercube', 'manifold'] as const) {
      const built = buildDataset(id, 1);
      expect(built.rows).toHaveLength(POINT_COUNT);
      expect(built.labels).toHaveLength(POINT_COUNT);
      expect(new Set(built.labels).size).toBeGreaterThan(1);
    }
  });

  it('같은 씨앗이면 같은 자료가 나온다', () => {
    expect(buildDataset('moons', 42)).toEqual(buildDataset('moons', 42));
    expect(buildDataset('moons', 42)).not.toEqual(buildDataset('moons', 43));
  });

  it('한 벌 안에서 모든 점의 차원이 같다', () => {
    for (const id of ['blobs', 'moons', 'hypercube', 'manifold'] as const) {
      const built = buildDataset(id, 3);
      const width = built.rows[0].length;
      expect(built.rows.every((row) => row.length === width)).toBe(true);
      expect(built.rows.flat().every((value) => Number.isFinite(value))).toBe(true);
    }
  });
});

describe('산점도 무리', () => {
  it('요청한 만큼 만들고 여덟 가지 방식을 고르게 섞는다', () => {
    const projections = buildProjections(dataset, 16, 5);
    expect(projections).toHaveLength(16);
    const kinds = new Set(projections.map((p) => p.recipe.split(' ')[0]));
    expect(kinds.size).toBe(8);
  });

  it('좌표는 언제나 유한하다', () => {
    for (const projection of buildProjections(dataset, 24, 9)) {
      expect(projection.low).toHaveLength(POINT_COUNT);
      expect(projection.low.every(([x, y]) => Number.isFinite(x) && Number.isFinite(y))).toBe(true);
    }
  });

  it('같은 씨앗이면 같은 무리가 나온다', () => {
    expect(buildProjections(dataset, 8, 11)).toEqual(buildProjections(dataset, 8, 11));
  });
});

describe('지표', () => {
  const good = prepareLow(high, honest());
  const bad = prepareLow(high, collapsed());

  it('이웃 겹침은 0과 1 사이이고, 뭉갠 그림에서 더 낮다', () => {
    const a = neighborOverlap(good, 10);
    const b = neighborOverlap(bad, 10);
    expect(a).toBeGreaterThanOrEqual(0);
    expect(a).toBeLessThanOrEqual(1);
    expect(a).toBeGreaterThan(b);
  });

  it('스트레스는 뭉갠 그림에서 더 크다', () => {
    expect(stress(bad)).toBeGreaterThan(stress(good));
  });

  it('스트레스는 그림을 통째로 키워도 달라지지 않는다', () => {
    const scaled = prepareLow(high, {
      recipe: 'scaled',
      low: honest().low.map(([x, y]) => [x * 37, y * 37] as [number, number]),
    });
    expect(stress(scaled)).toBeCloseTo(stress(good), 10);
  });

  it('KL 발산은 음수가 아니고 뭉갠 그림에서 더 크다', () => {
    expect(klDivergence(good, 10)).toBeGreaterThanOrEqual(0);
    expect(klDivergence(bad, 10)).toBeGreaterThan(klDivergence(good, 10));
  });

  it('라벨 신뢰도는 무리끼리 모아 놓으면 올라간다', () => {
    const grouped = prepareLow(high, {
      recipe: 'grouped',
      // 라벨마다 멀리 떨어진 자리에 몰아 놓는다.
      low: dataset.labels.map((label) => {
        const index = Number(label.slice(1));
        return [Math.cos(index) * 50, Math.sin(index) * 50] as [number, number];
      }),
    });
    // 라벨을 섞어 흩은 그림과 견준다. 흩으면 이웃 중 같은 라벨의 비율이 우연 수준으로 떨어진다.
    const scattered = prepareLow(high, {
      recipe: 'scattered',
      low: dataset.labels.map((_, i) => [Math.cos(i * 2.4) * i, Math.sin(i * 2.4) * i] as [number, number]),
    });
    expect(labelTrustworthiness(grouped, dataset.labels, 10)).toBeGreaterThan(
      labelTrustworthiness(scattered, dataset.labels, 10),
    );
  });

  it('실루엣은 -1과 1 사이다', () => {
    const value = silhouette(good, dataset.labels);
    expect(value).toBeGreaterThanOrEqual(-1);
    expect(value).toBeLessThanOrEqual(1);
  });
});

describe('지표끼리의 상관', () => {
  it('대각선은 1이고 행렬은 대칭이다', () => {
    const { rho, order } = runLab({ dataset: 'blobs', population: 24, k: 10 }).analysis.similarity;
    for (let i = 0; i < order.length; i += 1) {
      expect(rho[i][i]).toBe(1);
      for (let j = 0; j < order.length; j += 1) {
        expect(rho[i][j]).toBeCloseTo(rho[j][i], 12);
        expect(rho[i][j]).toBeGreaterThanOrEqual(-1.0001);
        expect(rho[i][j]).toBeLessThanOrEqual(1.0001);
      }
    }
  });

  it('자기 자신을 뒤집은 지표와는 완전히 반대로 움직인다', () => {
    const scores = [
      { metricId: 'trustworthiness', scores: [0.1, 0.5, 0.9, 0.3] },
      // stress는 '작을수록 좋음'이라 방향을 맞추면 부호가 뒤집힌다.
      { metricId: 'stress', scores: [0.1, 0.5, 0.9, 0.3] },
    ];
    expect(similarityMatrix(scores).rho[0][1]).toBeCloseTo(-1, 10);
  });

  it('점수가 모두 같으면 상관이 NaN이 아니라 0이다', () => {
    const flat = similarityMatrix([
      { metricId: 'trustworthiness', scores: [0.5, 0.5, 0.5] },
      { metricId: 'continuity', scores: [0.1, 0.2, 0.3] },
    ]);
    expect(flat.rho[0][1]).toBe(0);
  });
});

describe('묶기', () => {
  const result = runLab({ dataset: 'blobs', population: 32, k: 10 });
  const { analysis } = result;

  it('잎 순서는 지표 전부를 한 번씩 담는다', () => {
    expect([...analysis.leafOrder].sort()).toEqual(METRICS.map((m) => m.id).sort());
  });

  it('무리 수를 정하면 그 수만큼 나오고 모든 지표가 한 무리에만 든다', () => {
    for (let count = 2; count <= METRICS.length; count += 1) {
      const clusters = analysis.clustersFor(count);
      expect(clusters).toHaveLength(count);
      const members = clusters.flatMap((cluster) => cluster.members);
      expect(members).toHaveLength(METRICS.length);
      expect(new Set(members).size).toBe(METRICS.length);
      for (const cluster of clusters) {
        expect(cluster.members).toContain(cluster.representative);
      }
    }
  });

  it('무리 하나면 모두가 한 덩어리, 지표 수만큼이면 저마다 혼자다', () => {
    expect(analysis.clustersFor(1)[0].members).toHaveLength(METRICS.length);
    expect(analysis.clustersFor(METRICS.length).every((c) => c.members.length === 1)).toBe(true);
  });

  it('대신함은 무리를 늘릴수록 커지고 끝에서 1이 된다', () => {
    const gains = analysis.gainByCount;
    expect(gains).toHaveLength(METRICS.length);
    expect(gains[gains.length - 1]).toBeCloseTo(1, 10);
    for (let i = 1; i < gains.length; i += 1) {
      expect(gains[i]).toBeGreaterThanOrEqual(gains[i - 1] - 1e-9);
    }
  });

  it('제안하는 무리 수는 범위 안에 있다', () => {
    expect(analysis.suggestedClusterCount).toBeGreaterThanOrEqual(1);
    expect(analysis.suggestedClusterCount).toBeLessThanOrEqual(METRICS.length);
  });

  it('닮은 쌍은 문턱을 넘고 내림차순이다', () => {
    for (let i = 1; i < analysis.twins.length; i += 1) {
      expect(analysis.twins[i - 1].rho).toBeGreaterThanOrEqual(analysis.twins[i].rho);
    }
    expect(analysis.twins.every((twin) => twin.rho >= 0.9)).toBe(true);
    expect(analysis.twins.every((twin) => twin.a !== twin.b)).toBe(true);
  });
});

describe('전체 실행', () => {
  it('지표마다 산점도 수만큼의 점수를 낸다', () => {
    const result = runLab({ dataset: 'moons', population: 24, k: 8 });
    expect(result.scores).toHaveLength(METRICS.length);
    for (const entry of result.scores) {
      expect(entry.scores).toHaveLength(24);
      expect(entry.scores.every((value) => Number.isFinite(value))).toBe(true);
    }
  });

  it('같은 설정이면 같은 결과가 나온다', () => {
    const a = runLab({ dataset: 'manifold', population: 16, k: 8 });
    const b = runLab({ dataset: 'manifold', population: 16, k: 8 });
    expect(a.scores).toEqual(b.scores);
    expect(a.analysis.leafOrder).toEqual(b.analysis.leafOrder);
  });

  it('네 자료 모두 끝까지 돈다', () => {
    for (const id of ['blobs', 'moons', 'hypercube', 'manifold'] as const) {
      const result = runLab({ dataset: id, population: 16, k: 8 });
      expect(result.analysis.clustersFor(3)).toHaveLength(3);
    }
  });
});

describe('반대로 도는 쌍', () => {
  const analysis = runLab({ dataset: 'moons', population: 40, k: 12 }).analysis;

  it('문턱을 넘고 음의 크기 순으로 정렬된다', () => {
    for (const pair of analysis.opposites) expect(pair.rho).toBeLessThanOrEqual(-0.5);
    for (let i = 1; i < analysis.opposites.length; i += 1) {
      expect(analysis.opposites[i - 1].rho).toBeLessThanOrEqual(analysis.opposites[i].rho);
    }
  });

  it('같이 도는 쌍과 겹치지 않는다', () => {
    const keys = new Set(analysis.twins.map((pair) => `${pair.a}|${pair.b}`));
    for (const pair of analysis.opposites) expect(keys.has(`${pair.a}|${pair.b}`)).toBe(false);
  });

  it('반대로 도는 둘은 같은 무리에 들어가지 않는다', () => {
    // 1 - 상관을 거리로 쓰므로 음의 상관은 거리가 1보다 크다. 무리를 충분히 나누면 갈린다.
    const clusters = analysis.clustersFor(4);
    for (const pair of analysis.opposites) {
      const home = (id: string) => clusters.findIndex((cluster) => cluster.members.includes(id));
      expect(home(pair.a)).not.toBe(home(pair.b));
    }
  });
});
