/** 채널 코어의 공개 진입점. 다른 계층은 이 파일만 가져다 쓴다. */

export {
  ACCURACY_BASELINE,
  CHANCE_LOG_ERROR,
  CHANNEL_COUNT,
  POPOUT_ACCURACY,
  POWER_CORRECTION,
  SEPARABILITY,
  TASKS,
  TASK_COUNT,
  TILT_EQUIVALENCE,
  WEBER_FITS,
  WORST_PAIR,
  type ChannelId,
  type TaskId,
  type WeberFit,
} from './config';
export { curve, leftSlope, minimalDifference, rightSlope, type WeberParams } from './model';
export {
  accuracyRanking,
  dissociation,
  popoutRanking,
  separabilityBaseline,
  separabilityShift,
  worstPairGapToChance,
  type RankedChannel,
} from './rank';
export { makeTrial, type PopoutTrial } from './popout';
