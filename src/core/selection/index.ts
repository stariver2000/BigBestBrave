/**
 * 선택 방식 실험 코어.
 *
 * 세 가지 방아쇠(크로싱·드웰·핀치)의 규칙과, 그 성적을 재는 피츠 법칙 계산.
 * 화면에 기대지 않으므로 상태 기계와 통계를 따로 시험할 수 있다.
 */

export {
  BINARY_CONDITIONS,
  BINARY_SELECTIONS,
  DWELL_MS,
  EFFECTIVE_WIDTH_FACTOR,
  HAPTIC_MS,
  MULTI,
  PAPER_BINARY,
  PAPER_GRAND,
  PAPER_MULTI,
  SEED,
  WARMUP_TRIALS,
} from './config';
export { conditionPoints, report } from './fitts';
export { buildTrials, type TaskKind, type Trial } from './task';
export { beginSelection, initialState, step, type FullState, type StepResult } from './triggers';
export type {
  ConditionPoint,
  Fire,
  Frame,
  Selection,
  Target,
  Trigger,
  TriggerReport,
  TriggerState,
} from './types';
