/** 차트 왜곡 검사 코어의 공개 진입점. */

export type { Audit, BubbleScale, ChartKind, ChartSpec, Finding, FindingKind } from './types';
export { IDEAL_SLOPE, SEVERITY, SLOPE_TOLERANCE } from './config';
export { clippedCount, extent, radiusFactor, slopeFactor, truncationFactor } from './measure';
export { audit, bankedHeight, honest } from './audit';
export { nextLie, undone, type KnobId, type KnobRange, type LieStep } from './climb';
