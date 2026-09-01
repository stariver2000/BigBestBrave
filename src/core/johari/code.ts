/**
 * 답을 짧은 글자로 바꾸고 되돌리기.
 *
 * 서로 기록하려면 상대의 답이 있어야 한다. 그런데 이 사이트에는 계정도 서버도 없다.
 * 그래서 답을 열여덟 개의 작은 수로 보고 비트로 눌러 담아 글자로 바꾼다. 그 글자를
 * 상대에게 건네면 된다. 열여덟 칸이 각각 세 비트라 54비트, 판 번호와 검사값을 더해도
 * 열대여섯 글자면 끝난다.
 *
 * 헷갈리는 글자(0, O, 1, I)를 뺀 32자만 쓴다. 손으로 옮겨 적을 수 있어야 하기 때문이다.
 */

import { ALPHABET, AREAS, BITS_PER_VALUE, CODE_VERSION, SCALE } from './config';
import type { Sheet } from './types';

const VALUES_PER_SHEET = AREAS.length * 3;

function clamp(value: number): number {
  return Math.min(SCALE, Math.max(0, Math.round(value || 0)));
}

/** 답을 한 줄의 수로 편다. */
function flatten(sheet: Sheet): number[] {
  return [...sheet.selfKnows, ...sheet.guessesOther, ...sheet.seesOther]
    .slice(0, VALUES_PER_SHEET)
    .map(clamp);
}

/** 값들을 더해 만든 검사값. 한 글자 잘못 적으면 거의 언제나 걸린다. */
function checksum(values: readonly number[]): number {
  let sum = CODE_VERSION * 7;
  for (let i = 0; i < values.length; i += 1) sum += values[i] * (i + 3);
  return sum % 32;
}

export function encode(sheet: Sheet): string {
  const values = flatten(sheet);
  while (values.length < VALUES_PER_SHEET) values.push(0);

  // 판 번호를 앞에 놓고, 세 비트짜리 값들을 이어 붙인다.
  let bits = CODE_VERSION.toString(2).padStart(4, '0');
  for (const value of values) bits += value.toString(2).padStart(BITS_PER_VALUE, '0');
  while (bits.length % 5 !== 0) bits += '0';

  let out = '';
  for (let at = 0; at < bits.length; at += 5) out += ALPHABET[parseInt(bits.slice(at, at + 5), 2)];
  return out + ALPHABET[checksum(values)];
}

export interface DecodeResult {
  ok: boolean;
  sheet?: Sheet;
  /** 왜 안 되는지. 화면이 이 열쇠로 문구를 찾는다. */
  reason?: 'empty' | 'letter' | 'length' | 'version' | 'checksum';
}

export function decode(text: string): DecodeResult {
  const cleaned = text.trim().toUpperCase().replace(/[\s-]/g, '');
  if (cleaned.length === 0) return { ok: false, reason: 'empty' };
  for (const letter of cleaned) if (!ALPHABET.includes(letter)) return { ok: false, reason: 'letter' };

  const body = cleaned.slice(0, -1);
  const tail = cleaned.slice(-1);
  let bits = '';
  for (const letter of body) bits += ALPHABET.indexOf(letter).toString(2).padStart(5, '0');
  if (bits.length < 4 + VALUES_PER_SHEET * BITS_PER_VALUE) return { ok: false, reason: 'length' };

  if (parseInt(bits.slice(0, 4), 2) !== CODE_VERSION) return { ok: false, reason: 'version' };

  const values: number[] = [];
  for (let i = 0; i < VALUES_PER_SHEET; i += 1) {
    const at = 4 + i * BITS_PER_VALUE;
    values.push(Math.min(SCALE, parseInt(bits.slice(at, at + BITS_PER_VALUE), 2)));
  }
  if (ALPHABET[checksum(values)] !== tail) return { ok: false, reason: 'checksum' };

  const size = AREAS.length;
  return {
    ok: true,
    sheet: {
      selfKnows: values.slice(0, size),
      guessesOther: values.slice(size, size * 2),
      seesOther: values.slice(size * 2, size * 3),
    },
  };
}
