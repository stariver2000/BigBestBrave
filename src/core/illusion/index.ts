/**
 * 크기 착시 코어.
 *
 * 손에 쥔 것을 실제보다 얼마나 크게 느끼는지, 그리고 그 느낌이 얼마나 좁은지를
 * 논문이 잰 값에서 되짚는다. 손가락이 닿는 자리를 옮겨 낼 수 있는 크기의 폭도 낸다.
 */

export {
  DEVICE_MM,
  INITIAL,
  PARTICIPANTS,
  RANGE,
  REPORTED,
  REPOSITION_MM,
  STAIRCASE,
  THRESHOLDS,
} from './config';
export { FELT_RATIO, hapticFor, LOWER_RATIO, reachOf, UPPER_RATIO, windowOf } from './window';
export { answer, startRun, thresholdOf, virtualAnswer } from './staircase';
export type { Answer, Direction, Reach, Run, RunLimits, Window } from './types';
