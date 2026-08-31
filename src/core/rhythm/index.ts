/** 진동 리듬 코어의 공개 진입점. */

export type { Closeness, Match, Pattern, Pulse } from './types';
export {
  CLOSENESS_THRESHOLDS,
  ENVELOPE_SAMPLES,
  MIN_WINDOW_MS,
  IDLE_TIMEOUT,
  INTENSITY_STEPS,
  MAX_PULSES,
  PATTERNS,
  TAP_DURATION,
  WARP_BAND,
} from './config';
export { envelopeOf, totalDuration } from './envelope';
export { closenessOf, dtwDistance, rank, similarityOf } from './similarity';
