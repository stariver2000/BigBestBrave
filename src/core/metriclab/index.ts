/**
 * 지표 비교 코어.
 *
 * 산점도 무리를 만들어 여러 지표로 채점한 뒤, **지표들끼리** 얼마나 같이 움직이는지 잰다.
 * 산점도 한 장의 품질을 재는 `src/core/projection`과 묻는 것이 다르다.
 * 저쪽은 "이 그림을 믿어도 되나", 이쪽은 "이 자를 믿어도 되나"이다.
 */

export { analyze, similarityMatrix, type Analysis } from './cluster';
export {
  CLUSTER_COUNT,
  DATASETS,
  METRICS,
  NEIGHBORS,
  OPPOSITE_THRESHOLD,
  POINT_COUNT,
  POPULATION,
  RECIPES,
  SEED,
  TWIN_THRESHOLD,
  type DatasetId,
  type Recipe,
} from './config';
export { buildDataset } from './datasets';
export { runLab, type LabOptions, type LabResult } from './lab';
export {
  distanceConsistency,
  klDivergence,
  labelTrustworthiness,
  measure,
  metricById,
  mrre,
  neighborOverlap,
  prepareHigh,
  prepareLow,
  silhouette,
  stress,
  type HighSide,
  type Prepared,
} from './metrics';
export { buildProjections } from './projections';
export type {
  Dataset,
  LabReport,
  MetricCluster,
  MetricFamily,
  MetricScores,
  MetricSimilarity,
  MetricSpec,
  Projection,
  Twin,
} from './types';
