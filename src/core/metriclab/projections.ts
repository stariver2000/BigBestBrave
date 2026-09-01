/**
 * 산점도 무리를 짓는다.
 *
 * 지표들이 서로 얼마나 겹치는지 보려면 **점수가 넓게 퍼진 산점도 무리**가 있어야 한다.
 * 좋은 그림만 모아 놓으면 모든 지표가 다 같이 높은 점수를 주고, 그러면 상관이 무의미해진다.
 * 그래서 여기서는 일부러 서로 다른 방식으로 망가뜨린다. 어떤 방식은 국소 이웃을 부수고
 * 전역 거리는 남기고, 어떤 방식은 그 반대다. 그 어긋남이 있어야 지표가 갈린다.
 *
 * 논문은 40가지 차원 축소 기법에서 300장씩 뽑았다. 이 페이지는 브라우저에서 돌아야 해서
 * 반복 최적화가 필요한 기법(t-SNE, UMAP 따위)을 쓸 수 없다. 대신 **선형 사영과
 * 이름 붙은 망가뜨리기**로 같은 목적을 이룬다 — 넓게 퍼진 무리.
 */

import { projectToPlane } from '../projection';
import { createRandom } from '../random';
import { RECIPES, type Recipe } from './config';
import type { Dataset, Projection } from './types';

type Point = [number, number];

function gaussian(random: () => number): number {
  const u = Math.max(random(), 1e-9);
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * random());
}

/** 좌표를 원점 중심으로 옮기고 크기를 맞춘다. 지표는 크기에 흔들리지 않아야 한다. */
function normalize(points: Point[]): Point[] {
  const n = points.length;
  const cx = points.reduce((sum, p) => sum + p[0], 0) / n;
  const cy = points.reduce((sum, p) => sum + p[1], 0) / n;
  const centered: Point[] = points.map(([x, y]) => [x - cx, y - cy]);
  const scale = Math.sqrt(centered.reduce((sum, [x, y]) => sum + x * x + y * y, 0) / n) || 1;
  return centered.map(([x, y]) => [x / scale, y / scale]);
}

/** 아무 방향으로나 잘라 본 평면. 가장 흔한 '나쁜 사영'이다. */
function randomLinear(rows: readonly number[][], random: () => number): Point[] {
  const dimensions = rows[0].length;
  const a = Array.from({ length: dimensions }, () => gaussian(random));
  const b = Array.from({ length: dimensions }, () => gaussian(random));
  return rows.map((row) => [
    row.reduce((sum, value, i) => sum + value * a[i], 0),
    row.reduce((sum, value, i) => sum + value * b[i], 0),
  ]);
}

/** 원래 축 두 개만 골라 그린 그림. 사람이 자주 하는 일이다. */
function axisPair(rows: readonly number[][], random: () => number): Point[] {
  const dimensions = rows[0].length;
  const i = Math.floor(random() * dimensions);
  let j = Math.floor(random() * dimensions);
  if (j === i) j = (i + 1) % dimensions;
  return rows.map((row) => [row[i], row[j]]);
}

export interface RecipeResult {
  points: Point[];
  /** 화면에 적을 짧은 설명. 매개변수까지 담는다. */
  label: string;
}

function apply(recipe: Recipe, dataset: Dataset, random: () => number): RecipeResult {
  const base = () => projectToPlane(dataset.rows) as Point[];

  switch (recipe) {
    case 'pca':
      return { points: base(), label: 'pca' };

    case 'random-linear':
      return { points: randomLinear(dataset.rows, random), label: 'random-linear' };

    case 'axis-pair':
      return { points: axisPair(dataset.rows, random), label: 'axis-pair' };

    case 'pca-noise': {
      // 전역 모양은 남기고 국소 이웃만 흔든다.
      const amount = 0.1 + random() * 0.9;
      const points = normalize(base()).map<Point>(([x, y]) => [
        x + gaussian(random) * amount,
        y + gaussian(random) * amount,
      ]);
      return { points, label: `pca-noise σ=${amount.toFixed(2)}` };
    }

    case 'pca-shuffle': {
      // 일부 점만 엉뚱한 자리로 던진다. 나머지는 그대로다.
      const fraction = 0.05 + random() * 0.35;
      const points = normalize(base());
      const moved = points.map<Point>((point) =>
        random() < fraction ? [gaussian(random), gaussian(random)] : point,
      );
      return { points: moved, label: `pca-shuffle ${(fraction * 100).toFixed(0)}%` };
    }

    case 'pca-squash': {
      // 한 축을 눌러 납작하게. 이웃 관계는 남지만 거리는 어그러진다.
      const factor = 0.02 + random() * 0.5;
      const points = normalize(base()).map<Point>(([x, y]) => [x, y * factor]);
      return { points, label: `pca-squash ×${factor.toFixed(2)}` };
    }

    case 'cluster-collapse': {
      // 라벨마다 무게중심으로 끌어당긴다. 군집 지표는 좋아지고 국소 지표는 무너진다.
      const pull = 0.2 + random() * 0.75;
      const points = normalize(base());
      const sums = new Map<string, { x: number; y: number; n: number }>();
      dataset.labels.forEach((label, i) => {
        const bucket = sums.get(label) ?? { x: 0, y: 0, n: 0 };
        bucket.x += points[i][0];
        bucket.y += points[i][1];
        bucket.n += 1;
        sums.set(label, bucket);
      });
      const pulled = points.map<Point>(([x, y], i) => {
        const bucket = sums.get(dataset.labels[i])!;
        const cx = bucket.x / bucket.n;
        const cy = bucket.y / bucket.n;
        return [x + (cx - x) * pull, y + (cy - y) * pull];
      });
      return { points: pulled, label: `cluster-collapse ${(pull * 100).toFixed(0)}%` };
    }

    case 'radial': {
      // 무게중심에서의 거리만 남기고 방향은 임의로 준다.
      // 전역 거리 구조는 살아 있는데 이웃은 전부 남남이 되는, 지표가 크게 갈리는 그림이다.
      const points = normalize(base());
      const spin = random() * Math.PI * 2;
      const radial = points.map<Point>(([x, y], i) => {
        const radius = Math.hypot(x, y);
        const angle = spin + i * 2.39996; // 황금각. 고르게 흩는다.
        return [radius * Math.cos(angle), radius * Math.sin(angle)];
      });
      return { points: radial, label: 'radial' };
    }
  }
}

/**
 * 산점도 무리를 만든다.
 * 방식을 돌아가며 고르므로, 무리가 작아도 여덟 가지가 고르게 섞인다.
 */
export function buildProjections(dataset: Dataset, count: number, seed: number): Projection[] {
  const random = createRandom(seed);
  const projections: Projection[] = [];
  for (let i = 0; i < count; i += 1) {
    const recipe = RECIPES[i % RECIPES.length];
    const { points, label } = apply(recipe, dataset, random);
    projections.push({ recipe: label, low: normalize(points) });
  }
  return projections;
}
