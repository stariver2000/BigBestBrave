/**
 * 말할 틈 코어.
 *
 * 급한 판에서 한마디를 할지 말지, 한다면 어느 통로로 할지를 값으로 따진다.
 * 숫자는 이 페이지가 지어낸 것이고, 근거가 된 논문에서 가져온 것은 구조뿐이다.
 */

export {
  ATTENTION_PRICE,
  CHANNELS,
  FRICTION_PRICE,
  COMMIT_MULTIPLIER,
  HORIZON_SECONDS,
  PING_RATES,
  SITUATIONS,
  STANDING_FLOOR,
  TEAMMATES,
} from './config';
export {
  advise,
  atLeast,
  clarityOf,
  curveOf,
  expectedValue,
  reachRate,
  valueAt,
  weightOf,
  type Weights,
} from './model';
export type { Advice, Channel, ChannelId, ChannelVerdict, Situation } from './types';
