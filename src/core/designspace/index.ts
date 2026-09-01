/** 설계 공간 코어의 공개 진입점. 다른 계층은 이 파일만 가져다 쓴다. */

export {
  ASPECTS,
  CORPUS,
  DIMENSIONS,
  FOUNDATION_MODEL_PAPERS,
  UNDER_EXPLORED,
  UNDER_REPRESENTED,
  type AspectId,
  type Dimension,
} from './config';
export { configurationCeiling, configurationFloor, digitsOf, scientific, totalCodes } from './size';
export {
  coverageOf,
  dimensionById,
  dimensionsOf,
  isDecided,
  toggleCode,
  type AspectCoverage,
  type Coverage,
  type Picks,
} from './coverage';
