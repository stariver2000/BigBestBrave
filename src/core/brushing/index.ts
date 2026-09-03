/** 왜곡을 아는 붓 코어의 공개 진입점. */

export {
  DISTORTION_LEVELS,
  FINDINGS,
  LENS,
  RELOCATION_DELAY_MS,
  STUDIES,
  TECHNIQUES,
  type DistortionLevel,
  type TechniqueId,
} from './config';
export {
  DATA_SHAPE,
  PROJECTION_KINDS,
  confusionByCluster,
  fitToBox,
  hardestCluster,
  makeDataset,
  project,
  randomOrthogonalProjection,
  type Dataset,
  type ProjectionKind,
} from './data';
export {
  closenessMap,
  closenessTo,
  coveredBy,
  findSeeds,
  lensAt,
  radiusFor,
  relocate,
  scoreAgainst,
  type Lens,
  type Point2D,
  type Score,
} from './brush';
export {
  awareBrush,
  compareBrushes,
  naiveBrush,
  type Comparison,
} from './simulate';
export { densities, distance, nearestNeighbors, neighborCountFor, snnSimilarity } from './snn';
