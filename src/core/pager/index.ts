/** 삐삐 숫자 언어 코어의 공개 진입점. */

export {
  CODEBOOK,
  DIGIT_READINGS,
  HANGUL_SYLLABLE_COUNT,
  MAX_DIGITS,
  READING_RULES,
  SYLLABLE_TO_DIGIT,
  type CodebookEntry,
  type ReadingRule,
} from './config';
export { groupByRule, isRepeated, repeatedEntries, whatPasses, type Passable, type RuleGroup } from './codebook';
export type { Encoded, EncodedPiece, Occurrence, Piece, Segmentation } from './types';
export { codeOfDay, collisions, literalReading, occurrences, onlyDigits, segmentations } from './decode';
export { encode } from './encode';
export { roundTrip, type Echo } from './echo';
