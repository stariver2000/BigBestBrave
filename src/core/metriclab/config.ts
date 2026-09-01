/**
 * 지표 비교 코어의 상수.
 *
 * 근거가 된 연구: Metric Design != Metric Behavior: Improving Metric Selection for the
 * Unbiased Evaluation of Dimensionality Reduction (Jiyeon Bae, Hyeon Jeon, Jinwook Seo,
 * 서울대학교), IEEE VIS 2025 short paper, doi:10.1109/VIS60296.2025.00014.
 */

import type { MetricSpec } from './types';

/**
 * 이 페이지가 재는 아홉 개 지표.
 *
 * 논문이 쓴 지표 목록을 그대로 옮기지 않았다. 논문은 수십 개를 다루고 그중 일부는
 * 별도의 구현과 매개변수가 필요하다. 여기서는 **브라우저 안에서 결정론적으로 계산되고
 * 정의가 공개된 것**으로만 골랐고, 대신 논문이 가르는 세 갈래를 모두 담았다.
 * 논문의 주장은 지표 목록이 아니라 **갈래가 행동을 예측하지 못한다**는 것이므로,
 * 목록이 달라도 같은 질문에 답할 수 있다.
 */
export const METRICS: readonly MetricSpec[] = [
  { id: 'trustworthiness', family: 'local', higherIsBetter: true, needsLabels: false },
  { id: 'continuity', family: 'local', higherIsBetter: true, needsLabels: false },
  { id: 'mrre', family: 'local', higherIsBetter: true, needsLabels: false },
  { id: 'neighbor-overlap', family: 'local', higherIsBetter: true, needsLabels: false },
  { id: 'label-trustworthiness', family: 'cluster', higherIsBetter: true, needsLabels: true },
  { id: 'distance-consistency', family: 'cluster', higherIsBetter: true, needsLabels: true },
  { id: 'silhouette', family: 'cluster', higherIsBetter: true, needsLabels: true },
  { id: 'stress', family: 'global', higherIsBetter: false, needsLabels: false },
  { id: 'kl-divergence', family: 'global', higherIsBetter: false, needsLabels: false },
];

/** 이웃 수 k. 국소 지표는 전부 이 값에 매달려 있어 한곳에서 정한다. */
export const NEIGHBORS = { min: 5, max: 30, initial: 12 } as const;

/** 산점도 무리의 크기. 많을수록 상관이 안정되지만 계산이 길어진다. */
export const POPULATION = { min: 20, max: 120, step: 10, initial: 60 } as const;

/** 자료의 점 개수. 거리 행렬이 점 수의 제곱으로 커지므로 함부로 올리지 않는다. */
export const POINT_COUNT = 120;

/** 무리 수. 논문은 팔꿈치 방법으로 다섯을 골랐다. 여기서는 사용자가 직접 움직인다. */
export const CLUSTER_COUNT = { min: 2, max: 7 } as const;

/** 이만큼보다 상관이 높으면 '갈아 끼워도 되는 사이'로 본다. */
export const TWIN_THRESHOLD = 0.9;

/**
 * 이만큼보다 상관이 낮으면(즉 음으로 크면) '서로 반대로 도는 사이'로 본다.
 *
 * 왜 반대쪽도 세는가. 논문의 걱정은 **겹침**이다. 그런데 한쪽이 오르면 다른 쪽이 내리는 쌍도
 * 겹친 것이다 — 하나를 알면 다른 하나를 알 수 있으니 서로 다른 증거가 아니다.
 * 다만 무리를 지을 때는 논문대로 1-상관을 거리로 쓴다. 반대로 도는 둘을 한 무리에 넣으면
 * 대표 하나가 다른 하나를 대신할 수 없기 때문이다. 여기서 따로 짚는 이유가 그것이다.
 */
export const OPPOSITE_THRESHOLD = -0.5;

/** 화면에 늘어놓을 쌍의 최대 개수. */
export const TWIN_LIMIT = 6;

/** KL 발산을 계산할 때 0으로 나누는 것을 막는 바닥값. */
export const EPSILON = 1e-12;

/** 산점도를 만드는 방식들. 서로 다른 방식으로 망가뜨려야 지표가 갈린다. */
export const RECIPES = [
  'pca',
  'random-linear',
  'axis-pair',
  'pca-noise',
  'pca-shuffle',
  'pca-squash',
  'cluster-collapse',
  'radial',
] as const;

export type Recipe = (typeof RECIPES)[number];

/** 자료 종류. 전부 씨앗에서 만들어지므로 누가 열어도 같은 그림이 나온다. */
export const DATASETS = ['blobs', 'moons', 'hypercube', 'manifold'] as const;

export type DatasetId = (typeof DATASETS)[number];

/** 자료를 만들 때 쓰는 값들. */
export const SHAPE = {
  /** 흩어진 덩어리 자료의 덩어리 수와 차원. */
  blobs: { groups: 4, dimensions: 8, spread: 0.55 },
  /** 두 초승달. 잡음 차원을 붙여 고차원으로 만든다. */
  moons: { noiseDimensions: 6, jitter: 0.09 },
  /** 초입방체의 꼭짓점. 어느 두 축을 골라도 그럴듯해 보이는 함정 자료다. */
  hypercube: { dimensions: 6, jitter: 0.12 },
  /** 말린 띠. 국소 이웃은 뚜렷한데 전역 거리는 펼쳐야만 맞는 자료다. */
  manifold: { noiseDimensions: 4, turns: 2.2, jitter: 0.05 },
} as const;

/** 기본 씨앗. 바꾸면 자료와 산점도 무리가 통째로 달라진다. */
export const SEED = 20250901;
