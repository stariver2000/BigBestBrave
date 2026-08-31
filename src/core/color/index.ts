/**
 * 색 코어의 공개 진입점.
 * 다른 계층은 이 파일만 import하고 내부 파일을 직접 참조하지 않는다.
 */

export type { GamutMapped, LinearRgb, Oklab, Oklch, Srgb } from './types';
export { clamp01, clampSrgb, fromLinear, toHex, toLinear, toRgbString } from './srgb';
export {
  isOklchInGamut,
  linearToOklab,
  mapIntoGamut,
  oklabToLinear,
  oklchToDisplayable,
  oklchToSrgb,
  srgbToOklch,
  toOklchString,
} from './oklab';
export { parseColor, type ParseResult } from './parse';
export {
  analyzeContrast,
  apcaContrast,
  apcaLevelKeyOf,
  relativeLuminance,
  wcagContrastRatio,
  wcagLevelOf,
  type ContrastReport,
  type WcagLevel,
} from './contrast';
export { CVD_KINDS, prevalenceOf, simulateCvd, type CvdKind } from './cvd';
export { HARMONY_KINDS, buildHarmony, rotationsOf, type HarmonyKind, type HarmonyMember } from './harmony';
export { buildRamp, rampStepNumbers, type RampEntry } from './ramp';
export { buildPalette, stepOf, type Palette, type PaletteTrack } from './palette';
export { APCA, CVD_PREVALENCE, HARMONY_ROTATIONS, RAMP_STEPS, WCAG } from './config';
