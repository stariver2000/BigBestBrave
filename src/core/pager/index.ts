/** 삐삐 숫자 언어 코어의 공개 진입점. */

export { CODEBOOK, DIGIT_READINGS, MAX_DIGITS, SYLLABLE_TO_DIGIT, type CodebookEntry } from './config';
export type { Encoded, EncodedPiece, Piece, Segmentation } from './types';
export { codeOfDay, literalReading, onlyDigits, segmentations } from './decode';
export { encode } from './encode';
export { roundTrip, type Echo } from './echo';
