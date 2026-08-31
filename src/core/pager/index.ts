/** 삐삐 숫자 언어 코어의 공개 진입점. */

export {
  CODEBOOK,
  DIGIT_READINGS,
  MAX_DIGITS,
  READING_RULES,
  SYLLABLE_TO_DIGIT,
  type CodebookEntry,
  type ReadingRule,
} from './config';
export { groupByRule, isRepeated, repeatedEntries, type RuleGroup } from './codebook';
export type { Encoded, EncodedPiece, Piece, Segmentation } from './types';
export { codeOfDay, literalReading, onlyDigits, segmentations } from './decode';
export { encode } from './encode';
export { roundTrip, type Echo } from './echo';
