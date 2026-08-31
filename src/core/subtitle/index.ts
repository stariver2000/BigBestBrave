/** 자막 코어의 공개 진입점. */

export type {
  BreakReason,
  Chunk,
  ChunkOptions,
  Cue,
  IssueKind,
  Measure,
  ParseResult,
  QualityIssue,
  SubtitleFormat,
} from './types';
export { BREAK_LADDER, BREAK_SCORE, DEFAULTS, LIMITS, TAIL_AFTER_LAST } from './config';
export { formatTimecode, parseTimecode } from './timecode';
export { detectFormat, parseSubtitle } from './parse';
export { layoutLines, type LayoutResult } from './layout';
export { rechunk } from './chunk';
export { charactersPerSecond, inspect, summarize, type QualityOptions } from './quality';
export { formatSubtitle } from './format';
export { advance, blockAt, buildTimeline, nearestBlock, widestLine, type TimeBlock, type Timeline } from './timeline';
