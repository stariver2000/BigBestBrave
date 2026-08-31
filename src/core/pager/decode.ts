/**
 * 숫자를 말로 되돌리기.
 *
 * 삐삐 숫자는 한 가지로만 읽히지 않는다. 1004는 '천사'로도 읽히고 '백(100) 사(4)'로도 읽힌다.
 * 그 여러 갈래를 모두 보여 주는 것이 이 페이지의 재미이므로, 한 답을 고르지 않고 다 내놓는다.
 */

import { CODEBOOK, DIGIT_READINGS, MAX_SEGMENTATIONS } from './config';
import type { Piece, Segmentation } from './types';

/** 숫자를 한자음으로 그대로 읽는다. 8282 -> 팔이팔이. */
export function literalReading(digits: string): string {
  return digits
    .split('')
    .map((digit) => DIGIT_READINGS[digit] ?? digit)
    .join('');
}

export function onlyDigits(input: string): string {
  return input.replace(/\D/g, '');
}

/** 이 자리에서 시작하는 코드집 항목들. 긴 것부터 본다. */
function codesAt(digits: string, start: number): { index: number; length: number }[] {
  const found: { index: number; length: number }[] = [];
  CODEBOOK.forEach((entry, index) => {
    if (digits.startsWith(entry.digits, start)) {
      found.push({ index, length: entry.digits.length });
    }
  });
  return found.sort((a, b) => b.length - a.length);
}

/**
 * 숫자를 나누는 모든 방법을 찾는다.
 *
 * 코드집에 걸리지 않는 부분은 한 덩어리로 묶어 그냥 읽는다. 한 글자씩 쪼개면
 * 경우의 수가 폭발하는 데다, 사람이 읽을 때도 붙여 읽기 때문이다.
 */
export function segmentations(digits: string): Segmentation[] {
  const results: Segmentation[] = [];

  const walk = (position: number, pieces: Piece[], matched: number): void => {
    if (results.length >= MAX_SEGMENTATIONS * 4) return;
    if (position >= digits.length) {
      results.push({ pieces: [...pieces], matched });
      return;
    }

    for (const code of codesAt(digits, position)) {
      const entry = CODEBOOK[code.index];
      pieces.push({ digits: entry.digits, codeIndex: code.index, reading: entry.meaning.ko });
      walk(position + code.length, pieces, matched + code.length);
      pieces.pop();
    }

    // 코드로 읽지 않고 남은 숫자를 다음 코드 직전까지 한 덩어리로 읽는 갈래.
    let next = position + 1;
    while (next < digits.length && codesAt(digits, next).length === 0) next += 1;
    const chunk = digits.slice(position, next);
    pieces.push({ digits: chunk, codeIndex: null, reading: literalReading(chunk) });
    walk(next, pieces, matched);
    pieces.pop();
  };

  walk(0, [], 0);

  // 코드집에 많이 걸린 해석을 먼저, 같으면 조각이 적은 쪽을 먼저 보여 준다.
  const ranked = results.sort((a, b) => b.matched - a.matched || a.pieces.length - b.pieces.length);
  const seen = new Set<string>();
  const unique: Segmentation[] = [];
  for (const segmentation of ranked) {
    const key = segmentation.pieces.map((piece) => `${piece.digits}:${piece.codeIndex}`).join('|');
    if (seen.has(key)) continue;
    seen.add(key);
    unique.push(segmentation);
    if (unique.length >= MAX_SEGMENTATIONS) break;
  }
  return unique;
}

/** 날짜에서 오늘의 암호를 고른다. 서버 없이 모두에게 같은 것이 보이게 하기 위함이다. */
export function codeOfDay(date: Date): number {
  const key = date.getFullYear() * 10000 + (date.getMonth() + 1) * 100 + date.getDate();
  return key % CODEBOOK.length;
}
