/**
 * 견본 고차원 자료와 두 가지 투영.
 *
 * 논문은 MNIST를 10차원으로 줄여 쓰고 t-SNE와 무작위 직교 투영으로 왜곡의 양을
 * 조절했다(5.1.1절). 이 페이지는 MNIST를 싣지 않는다 - 자료가 크고, 남의 자료다.
 * 대신 씨앗에서 짓는 고차원 무리를 쓰되, **왜곡을 만드는 방법은 논문 그대로** 가져왔다.
 *
 *   낮은 왜곡  : 주성분 분석(PCA). 이 저장소가 이미 가진 것을 쓴다.
 *   높은 FN    : 무작위 직교 투영. 논문이 높은 가짜 이웃을 만들 때 쓴 바로 그 방법이며,
 *                "언제나 점 사이 거리를 줄이므로 FN이 높아진다"는 논문의 설명 그대로다.
 *
 * t-SNE(낮은 왜곡·높은 MN)는 옮기지 않았다. 반복 최적화라 이 사이트의 조건(연산 예산 0)에
 * 맞지 않고, 초매개변수에 따라 그림이 달라져 "같은 씨앗이면 같은 그림"도 깨진다.
 */

import { createRandom } from '../random';
import { projectToPlane } from '../projection';
import { nearestNeighbors } from './snn';

export interface Dataset {
  /** 고차원 좌표. */
  rows: number[][];
  /** 점마다의 정답 무리 번호. 채점의 기준이다. */
  labels: number[];
  clusterCount: number;
}

export const DATA_SHAPE = {
  dimensions: 10,
  clusters: 6,
  perCluster: 30,
  /** 무리 중심이 흩어지는 폭. 이 값에서 고차원 갈림과 2D 왜곡이 함께 정해진다. */
  spread: 2.8,
  /** 무리 안의 퍼짐. */
  jitter: 1,
} as const;

export type DataShape = typeof DATA_SHAPE;

/** 표준정규 난수 두 개를 한 번에 뽑는다(박스-뮐러). 무리를 공 모양으로 흩기 위함이다. */
function gaussianPair(random: () => number): [number, number] {
  // 0에 로그를 씌우지 않도록 아래를 막는다.
  const u1 = Math.max(random(), 1e-12);
  const u2 = random();
  const radius = Math.sqrt(-2 * Math.log(u1));
  const angle = 2 * Math.PI * u2;
  return [radius * Math.cos(angle), radius * Math.sin(angle)];
}

function gaussians(random: () => number, count: number): number[] {
  const values: number[] = [];
  while (values.length < count) {
    const [a, b] = gaussianPair(random);
    values.push(a);
    if (values.length < count) values.push(b);
  }
  return values;
}

/**
 * 씨앗에서 고차원 무리 자료를 짓는다. 같은 씨앗이면 누구에게나 같은 자료가 나온다.
 *
 * **치수를 실측으로 골랐다.** 이 페이지가 서려면 자료가 두 조건을 동시에 만족해야 한다:
 * (1) 고차원에서는 무리가 진짜로 갈려 있을 것 - 그래야 "고차원의 이웃"이 뜻을 갖는다.
 * (2) 2차원 그림에서는 무리가 겹칠 것 - 그래야 보여 줄 왜곡이 있다.
 *
 * 10차원·여섯 무리·간격 2.8에서 고차원 kNN 순도는 1.000이고 PCA 그림의 순도는 0.90,
 * 무작위 직교 투영은 0.78이다. 즉 화면에서 이웃해 보이는 것의 열에 하나(무작위 투영에서는
 * 다섯에 하나)가 실제로는 남남이다. 시험이 이 두 조건을 붙든다.
 *
 * 무리를 여섯으로 둔 것이 핵심이다. 여섯 무리가 10차원에서 서로 떨어져 있어도 2차원 평면
 * 하나에 전부 갈라 놓을 수는 없어, 어떤 쌍은 반드시 겹친다. 무리를 서넛만 두면 PCA가
 * 거의 완벽히 갈라내 왜곡이 사라진다(실측했다).
 */
export function makeDataset(seed: number, shape: DataShape = DATA_SHAPE): Dataset {
  const random = createRandom(seed);
  const { dimensions, clusters, perCluster, spread, jitter } = shape;

  const centers: number[][] = [];
  for (let c = 0; c < clusters; c += 1) {
    centers.push(gaussians(random, dimensions).map((value) => value * spread));
  }

  const rows: number[][] = [];
  const labels: number[] = [];
  for (let c = 0; c < clusters; c += 1) {
    for (let i = 0; i < perCluster; i += 1) {
      const noise = gaussians(random, dimensions);
      rows.push(centers[c].map((value, axis) => value + noise[axis] * jitter));
      labels.push(c);
    }
  }
  return { rows, labels, clusterCount: clusters };
}

/** 그람-슈미트로 두 축을 서로 직교하게 만든다. 무작위 직교 투영의 준비다. */
function orthonormalPair(random: () => number, dimensions: number): [number[], number[]] {
  const first = gaussians(random, dimensions);
  const firstNorm = Math.hypot(...first);
  const axis1 = first.map((value) => value / firstNorm);

  const second = gaussians(random, dimensions);
  const dot = second.reduce((sum, value, i) => sum + value * axis1[i], 0);
  const rejected = second.map((value, i) => value - dot * axis1[i]);
  const secondNorm = Math.hypot(...rejected);
  const axis2 = rejected.map((value) => value / secondNorm);

  return [axis1, axis2];
}

/**
 * 무작위 직교 투영. 고차원의 두 직교 축에 그대로 눌러 담는다.
 * 축이 자료의 퍼진 방향과 무관하므로 서로 먼 점들이 화면에서 겹친다 - 가짜 이웃이다.
 */
export function randomOrthogonalProjection(rows: readonly (readonly number[])[], seed: number): [number, number][] {
  if (rows.length === 0) return [];
  const random = createRandom(seed);
  const [axis1, axis2] = orthonormalPair(random, rows[0].length);
  return rows.map((row) => [
    row.reduce((sum, value, i) => sum + value * axis1[i], 0),
    row.reduce((sum, value, i) => sum + value * axis2[i], 0),
  ]);
}

export const PROJECTION_KINDS = ['pca', 'random'] as const;
export type ProjectionKind = (typeof PROJECTION_KINDS)[number];

/** 고른 방식으로 2차원에 눌러 담는다. */
export function project(
  rows: readonly (readonly number[])[],
  kind: ProjectionKind,
  seed: number,
): [number, number][] {
  return kind === 'pca'
    ? projectToPlane(rows as readonly number[][])
    : randomOrthogonalProjection(rows, seed);
}

/** 투영 좌표를 화면 상자 안으로 옮긴다. 가로세로 비를 지켜 무리 모양이 일그러지지 않게 한다. */
export function fitToBox(
  coords: readonly (readonly [number, number])[],
  width: number,
  height: number,
  margin: number,
): { x: number; y: number }[] {
  if (coords.length === 0) return [];
  const xs = coords.map((point) => point[0]);
  const ys = coords.map((point) => point[1]);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);
  const spanX = maxX - minX || 1;
  const spanY = maxY - minY || 1;
  const scale = Math.min((width - margin * 2) / spanX, (height - margin * 2) / spanY);
  // 남는 자리를 반씩 나눠 가운데 놓는다.
  const offsetX = (width - spanX * scale) / 2;
  const offsetY = (height - spanY * scale) / 2;
  return coords.map((point) => ({
    x: offsetX + (point[0] - minX) * scale,
    y: offsetY + (point[1] - minY) * scale,
  }));
}

/**
 * 2차원 그림에서 무리마다 이웃이 얼마나 남남인가.
 *
 * 화면에서 각 점의 가까운 이웃 몇을 보고, 그중 다른 무리인 비율을 무리별로 센다.
 * 값이 높을수록 그 무리는 그림에서 남의 무리에 파묻혀 있다 - 보통 붓으로는 집기
 * 어려운 무리이며, 이 페이지가 기본으로 겨누는 자리다.
 */
export function confusionByCluster(
  coords: readonly { x: number; y: number }[],
  labels: readonly number[],
  clusterCount: number,
  k: number,
): number[] {
  const flat = coords.map((point) => [point.x, point.y]);
  const near = nearestNeighbors(flat, k);
  const wrong = new Array<number>(clusterCount).fill(0);
  const total = new Array<number>(clusterCount).fill(0);
  near.forEach((list, index) => {
    const label = labels[index];
    for (const other of list) {
      total[label] += 1;
      if (labels[other] !== label) wrong[label] += 1;
    }
  });
  return wrong.map((count, cluster) => (total[cluster] === 0 ? 0 : count / total[cluster]));
}

/** 그림에서 가장 많이 파묻힌 무리. 같으면 번호가 작은 쪽을 고른다. */
export function hardestCluster(confusion: readonly number[]): number {
  let best = 0;
  for (let c = 1; c < confusion.length; c += 1) {
    if (confusion[c] > confusion[best]) best = c;
  }
  return best;
}
