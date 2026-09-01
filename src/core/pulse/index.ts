/** 페이지의 맥 코어의 공개 진입점. */

export { MIN_VIEWS, PULSE_KINDS, STAY_AFTER_MS } from './config';
export {
  accepts,
  applyKinds,
  emptyTally,
  isPulseKind,
  readingOf,
  type PulseKind,
  type Reading,
  type Tally,
} from './model';
