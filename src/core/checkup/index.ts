/**
 * 유출 확인 코어.
 *
 * 두 가지를 계산한다.
 *   1) 해시의 앞 몇 글자만 보낼 때 서버가 알게 되는 것의 크기 (k-익명성)
 *   2) 알려진 유출 단어에서 이 비밀번호에 이르는 가장 짧은 길
 *
 * 비밀번호는 이 코어 밖으로 나가지 않는다. 통신도, 저장도 없다.
 */

export { anonymitySet, splitHash } from './anonymity';
export { checkPassword, type CheckupOptions } from './checkup';
export {
  AFFIX_PATTERN,
  BRANCHING,
  CORPUS,
  CORPUS_SIZE,
  GUESS_RATE,
  HASH_BITS,
  HASH_HEX_LENGTH,
  LEET_MAP,
  PREFIX_LENGTH,
  URGENCY_THRESHOLD,
} from './config';
export { sha1Bytes, sha1Hex } from './sha1';
export type {
  AnonymitySet,
  AppliedRule,
  CheckupReport,
  CrackTime,
  Derivation,
  HashSplit,
  RuleId,
  Urgency,
} from './types';
export { CORPUS_WORD_COUNT, deriveFromCorpus, isInCorpus } from './variants';
