/**
 * 고차원 자료를 씨앗에서 짓는다.
 *
 * 실제 자료집을 싣지 않는 이유는 두 가지다. 하나는 무게이고, 하나는 **정직함**이다.
 * 여기서 하려는 말은 "이 자료에서 이런 일이 있었다"가 아니라 "지표들이 서로 겹친다"이고,
 * 그 말은 성질을 알고 만든 자료에서 더 또렷하게 드러난다. 네 벌은 각각 다른 함정을 판다.
 */

import { createRandom } from '../random';
import { POINT_COUNT, SHAPE, type DatasetId } from './config';
import type { Dataset } from './types';

/** 박스-뮐러 변환. 균등 난수 둘을 정규 난수 하나로 바꾼다. */
function gaussian(random: () => number): number {
  const u = Math.max(random(), 1e-9);
  const v = random();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

function noiseColumns(count: number, scale: number, random: () => number): number[] {
  return Array.from({ length: count }, () => gaussian(random) * scale);
}

/** 흩어진 덩어리. 라벨과 눈에 보이는 무리가 일치하는, 가장 순한 자료다. */
function blobs(random: () => number): Dataset {
  const { groups, dimensions, spread } = SHAPE.blobs;
  const centers = Array.from({ length: groups }, () =>
    Array.from({ length: dimensions }, () => gaussian(random) * 2.2),
  );
  const rows: number[][] = [];
  const labels: string[] = [];
  for (let i = 0; i < POINT_COUNT; i += 1) {
    const group = i % groups;
    rows.push(centers[group].map((value) => value + gaussian(random) * spread));
    labels.push(`G${group + 1}`);
  }
  return { id: 'blobs', rows, labels };
}

/**
 * 두 초승달. 서로 얽혀 있어 직선으로는 갈라지지 않는다.
 * 군집 지표와 국소 지표가 가장 크게 엇갈리는 자료다.
 */
function moons(random: () => number): Dataset {
  const { noiseDimensions, jitter } = SHAPE.moons;
  const rows: number[][] = [];
  const labels: string[] = [];
  for (let i = 0; i < POINT_COUNT; i += 1) {
    const upper = i % 2 === 0;
    const t = (i / POINT_COUNT) * Math.PI * 2;
    const angle = upper ? t / 2 : t / 2 + Math.PI;
    const x = Math.cos(angle) + (upper ? 0 : 1);
    const y = Math.sin(angle) + (upper ? 0 : 0.5);
    rows.push([
      x + gaussian(random) * jitter,
      y + gaussian(random) * jitter,
      ...noiseColumns(noiseDimensions, jitter * 2, random),
    ]);
    labels.push(upper ? 'A' : 'B');
  }
  return { id: 'moons', rows, labels };
}

/**
 * 초입방체의 꼭짓점 근처. 어느 두 축을 골라도 네 귀퉁이가 예쁘게 보이는 함정 자료다.
 * 보기 좋은 그림이 곧 옳은 그림은 아니라는 것을 지표가 잡아내는지 본다.
 */
function hypercube(random: () => number): Dataset {
  const { dimensions, jitter } = SHAPE.hypercube;
  const rows: number[][] = [];
  const labels: string[] = [];
  for (let i = 0; i < POINT_COUNT; i += 1) {
    const corner = Array.from({ length: dimensions }, (_, axis) =>
      ((i >> axis) & 1) === 1 ? 1 : -1,
    );
    rows.push(corner.map((value) => value + gaussian(random) * jitter));
    // 라벨은 첫 축의 부호로만 나눈다. 나머지 축은 라벨과 무관하다.
    labels.push(corner[0] > 0 ? 'P' : 'N');
  }
  return { id: 'hypercube', rows, labels };
}

/**
 * 말린 띠. 띠를 따라가면 이웃이지만, 곧게 재면 건너편이 더 가깝다.
 * 국소 지표와 전역 지표가 정반대로 대답하게 만드는 자료다.
 */
function manifold(random: () => number): Dataset {
  const { noiseDimensions, turns, jitter } = SHAPE.manifold;
  const rows: number[][] = [];
  const labels: string[] = [];
  for (let i = 0; i < POINT_COUNT; i += 1) {
    const t = (i / (POINT_COUNT - 1)) * turns * Math.PI;
    const radius = 1 + t * 0.55;
    rows.push([
      radius * Math.cos(t) + gaussian(random) * jitter,
      radius * Math.sin(t) + gaussian(random) * jitter,
      t * 0.4 + gaussian(random) * jitter,
      ...noiseColumns(noiseDimensions, jitter * 3, random),
    ]);
    labels.push(`S${Math.min(3, Math.floor((t / (turns * Math.PI)) * 4) + 1)}`);
  }
  return { id: 'manifold', rows, labels };
}

const BUILDERS: Record<DatasetId, (random: () => number) => Dataset> = {
  blobs,
  moons,
  hypercube,
  manifold,
};

export function buildDataset(id: DatasetId, seed: number): Dataset {
  return BUILDERS[id](createRandom(seed));
}
