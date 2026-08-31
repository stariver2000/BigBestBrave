/**
 * 물음에서 씨앗을 만든다.
 *
 * 같은 사람이 같은 날 같은 것을 물으면 같은 답이 나와야 한다.
 * 그래서 난수를 쓰지 않고, 물음과 날짜와 깃발을 섞어 만든 수에서 모든 것을 끌어낸다.
 * 씨앗에서 수열을 뽑는 일 자체는 다른 페이지도 쓰므로 `core/random`에 있다.
 */

import { dayKey, hashText } from '../random';

/** 물음의 표기 차이는 같은 물음으로 본다. 띄어쓰기를 고쳤다고 답이 달라지면 안 된다. */
export function normalizeQuestion(question: string): string {
  return question.trim().replace(/\s+/g, ' ').toLowerCase();
}

export function seedOf(question: string, flagId: string, date: Date): number {
  return hashText(`${normalizeQuestion(question)}|${flagId}|${dayKey(date)}`);
}
