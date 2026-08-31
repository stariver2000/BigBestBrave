/** 신점 코어의 공개 진입점. */

export { BODIES, FLAGS, GUAS, MIN_QUESTION_LENGTH } from './config';
export type { Flag, Localized, Reading, Talisman } from './types';
export { normalizeQuestion, seedOf } from './seed';
export { flagById, isAskable, isSameQuestion, readingOf, refusalOf } from './reading';
export { talismanOf } from './talisman';
