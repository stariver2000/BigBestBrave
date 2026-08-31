/**
 * 점사 짓기.
 *
 * 조각을 이어 붙여 만든다. 실제 점사도 정해진 형식 위에서 짜이므로, 조각 조합은
 * 이 형식의 한계가 아니라 형식 그 자체다. 언어모델이 필요하지 않은 이유이기도 하다.
 */

import {
  BODIES,
  BODY_LINES,
  FLAGS,
  GUAS,
  MIN_QUESTION_LENGTH,
  OPENINGS,
  REFUSALS,
  REMEDIES,
  TERMS,
  WARNINGS,
} from './config';
import { createRandom, pick, pickMany } from '../random';
import { normalizeQuestion, seedOf } from './seed';
import type { Flag, Localized, Reading } from './types';

export function flagById(id: string): Flag | undefined {
  return FLAGS.find((flag) => flag.id === id);
}

/** 물음이 받아들여질 만한지. 한 글자만 적고 답을 바라는 것은 성의가 아니다. */
export function isAskable(question: string): boolean {
  return normalizeQuestion(question).length >= MIN_QUESTION_LENGTH;
}

export function readingOf(question: string, flagId: string, date: Date): Reading {
  const seed = seedOf(question, flagId, date);
  const random = createRandom(seed);
  const bodies = BODIES[flagId] ?? BODIES.yellow;

  // 뽑는 순서가 곧 씨앗의 소비 순서다. 순서를 바꾸면 같은 물음의 답이 달라지므로 고정한다.
  return {
    flagId,
    opening: pick(OPENINGS, random),
    gua: pick(GUAS, random),
    body: pickMany(bodies, BODY_LINES, random),
    warning: pick(WARNINGS, random),
    remedy: pick(REMEDIES, random),
    term: pick(TERMS, random),
    seed,
  };
}

/** 같은 것을 다시 물었을 때 돌려줄 말. 물음마다 다른 거절이 나온다. */
export function refusalOf(question: string, date: Date): Localized {
  return pick(REFUSALS, createRandom(seedOf(question, 'refusal', date)));
}

/** 두 물음이 같은 물음인지. 띄어쓰기와 대소문자 차이는 같은 것으로 본다. */
export function isSameQuestion(a: string, b: string): boolean {
  return normalizeQuestion(a) === normalizeQuestion(b);
}
