/** 불만 코어의 공개 진입점. 다른 계층은 이 파일만 가져다 쓴다. */

export {
  CODE_CATEGORY,
  DISSATISFACTION,
  DISSATISFACTION_BY_KNOWLEDGE,
  DISSATISFACTION_IDS,
  MIN_COUNT_FOR_RANK,
  PROSE_PREFERENCE,
  REPORTED,
  TACTIC_CATEGORY,
  TACTIC_CATEGORY_BY_KNOWLEDGE,
  TACTIC_CODE,
  TACTIC_CODES,
  TACTIC_CODE_BY_KNOWLEDGE,
  TACTIC_IDS,
  type Cell,
  type DissatisfactionId,
  type Knowledge,
  type Measured,
  type TacticCode,
  type TacticId,
} from './config';
export { chiSquare, impliedTotal, percentOf, type ChiSquareResult, type ContingencyRow } from './stats';
export { gapFor, rankCodes, severest, shareOf, type GapReport, type RankedCode } from './tactics';
