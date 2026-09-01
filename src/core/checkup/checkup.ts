/** 앞의 조각들을 모아 한 장의 보고서로 만든다. */

import { anonymitySet, splitHash } from './anonymity';
import { CORPUS_SIZE, GUESS_RATE, PREFIX_LENGTH, URGENCY_THRESHOLD } from './config';
import { sha1Hex } from './sha1';
import type { CheckupReport, CrackTime, Derivation, Urgency } from './types';
import { deriveFromCorpus, isInCorpus } from './variants';

export interface CheckupOptions {
  /** 확인 서비스가 들고 있다고 가정하는 해시 개수. */
  corpusSize?: number;
  prefixLength?: number;
}

function crackTimeOf(attempts: number): CrackTime {
  // 평균적으로 전체의 절반쯤에서 걸린다고 보는 관행을 쓰지 않았다.
  // 여기서 낸 attempts는 이미 "이 비밀번호에 닿는 시도 번호"라 그대로 나누면 된다.
  return { offline: attempts / GUESS_RATE.offline, online: attempts / GUESS_RATE.online };
}

function urgencyOf(exact: boolean, derivation: Derivation | null): Urgency {
  if (exact) return 'critical';
  if (derivation === null) return 'unknown';
  if (derivation.attempts < URGENCY_THRESHOLD.high) return 'high';
  if (derivation.attempts < URGENCY_THRESHOLD.caution) return 'caution';
  return 'unknown';
}

export function checkPassword(password: string, options: CheckupOptions = {}): CheckupReport {
  const prefixLength = options.prefixLength ?? PREFIX_LENGTH;
  const corpusSize = options.corpusSize ?? CORPUS_SIZE.initial;
  const derivation = deriveFromCorpus(password);
  const exact = isInCorpus(password);
  return {
    split: splitHash(sha1Hex(password), prefixLength),
    anonymity: anonymitySet(corpusSize, prefixLength),
    derivation,
    exact,
    urgency: urgencyOf(exact, derivation),
    crackTime: derivation === null ? null : crackTimeOf(derivation.attempts),
  };
}
