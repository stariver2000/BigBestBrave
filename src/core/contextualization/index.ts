/** 맥락 코어의 공개 진입점. 다른 계층은 이 파일만 가져다 쓴다. */

export {
  ALPHA,
  AXES,
  CHART_RULE,
  CLICKS,
  COMPONENTS,
  CONTEXT_GRID,
  EXPLORATION,
  MATCH_QUALITY,
  MATCH_TOTAL,
  PASSIVE_READING,
  RANK_CRITERIA,
  RECOMMENDATION_QUALITY,
  type Axis,
  type Behaviour,
  type ChartKind,
  type Component,
  type MatchQuality,
  type Multiplicity,
  type RankCriterion,
  type Span,
} from './config';
export { parseStatement, type ParsedStatement } from './parse';
export { chartFor, contextCells, isLine, shapeAfter, type ContextCell, type Shape } from './chart';
