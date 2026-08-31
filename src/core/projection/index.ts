/** 차원 축소 신뢰도 검사 코어의 공개 진입점. */

export type { Metrics, PointDistortion, Projection } from './types';
export { DEFAULTS, GRADE_THRESHOLDS, LIMITS } from './config';
export { distanceMatrix, euclidean, neighborsOf, rankMatrix, standardize } from './distance';
export {
  continuity,
  distanceCorrelation,
  evaluate,
  neighborhoodHit,
  pointDistortions,
  prepare,
  spearman,
  trustworthiness,
} from './metrics';
export { projectToPlane } from './pca';
