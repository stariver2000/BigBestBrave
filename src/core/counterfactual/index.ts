/**
 * 반사실 코어.
 *
 * 자기 기록에서 스트레스 모형을 되짚고, "무엇을 바꿨더라면 낮았을까"를 남김없이 찾는다.
 * 상황이 320가지뿐이라 근사 없이 전부 셀 수 있고, 섀플리 값도 정확하게 낸다.
 */

export { causalEffect } from './causal';
export {
  FACETS,
  HIGH_THRESHOLD,
  LOG_SIZE,
  SEED,
  SHOW_LIMIT,
  SPACE_SIZE,
  VALUES,
} from './config';
export { buildLog, seenSituations, timesSeen, trueRisk } from './log';
export { fit, isHigh, probability } from './model';
export { allSituations, contributions, findCounterfactuals, type SearchOptions } from './search';
export type {
  CausalEffect,
  Contribution,
  Counterfactual,
  Facet,
  Fitted,
  Record_,
  Situation,
} from './types';
