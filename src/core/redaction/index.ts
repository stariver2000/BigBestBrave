/** 개인정보 탐지·가림 코어의 공개 진입점. */

export type { DetectorId, Match, MaskStyle, RedactionResult } from './types';
export { digitsOf, isBrnValid, isLuhnValid, isRrnValid } from './checksums';
export { DEFAULT_MASK_STYLE, DETECTORS, MASK_STYLES, type DetectorSpec } from './config';
export { allDetectorIds, defaultDetectors, detectorSpec, scan } from './detectors';
export { redact, type LabelResolver, type RedactOptions } from './redact';
