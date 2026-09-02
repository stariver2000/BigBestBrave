/** 훅 구조 코어의 공개 진입점. */

export {
  ANTI_PATTERNS,
  DESIGN_SESSIONS,
  HOOK_SHARE,
  LLM_COMPARISON,
  PROJECTS,
  STUDY,
  TABLE2,
  maxSampleSd,
  type AntiPatternId,
  type MetricTriple,
  type ProjectRow,
} from './config';
export { analyze, type Finding, type FlowEdge, type HookGraph, type ItemUsage } from './detect';
export {
  DIAGRAM,
  depthsOf,
  diagramEdges,
  layoutDiagram,
  type Box,
  type DiagramEdge,
  type DiagramLayout,
  type Slot,
} from './layout';
export {
  countWord,
  matchBracket,
  parseApp,
  type ChildPass,
  type ChildUse,
  type ComponentDecl,
  type EffectDecl,
  type ParsedApp,
  type StateDecl,
} from './parse';
export {
  anchorOf,
  codesToIds,
  idToCode,
  scoreSelection,
  selectableItems,
  truthIds,
  type Score,
  type SelectableItem,
} from './score';
