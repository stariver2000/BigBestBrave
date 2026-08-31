/** 특성 시스템의 공개 진입점. */

export { axis, label, v, type TraitAxis, type TraitGroup, type TraitValue, type TraitVector } from './model';
export {
  allAxes,
  axisById,
  traitValueCount,
  validateVector,
  valueById,
  type VectorIssue,
} from './registry';
export { lookup, pick, pickAll } from './vector';
export { deriveTokens } from './tokens/derive';
export { deriveColorBasis, deriveColorTokens } from './tokens/palette';
export { CSS_VAR_PREFIX, TYPE_STEPS, toCssVariables, toStyleObject } from './tokens/css';
export type {
  ColorTokens,
  DesignTokens,
  EdgeTokens,
  MotionTokens,
  RadiusTokens,
  SpaceTokens,
  TextTokens,
} from './tokens/types';
