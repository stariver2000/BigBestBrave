/**
 * 왜곡을 아는 붓의 화면 상태와 URL 직렬화 규칙.
 *
 * 붓질한 결과가 곧 작업물이라 링크 하나로 남에게 그대로 넘어가야 한다.
 * 칠한 점은 개수가 백여 개라 인덱스를 늘어놓으면 주소가 길어진다. 그래서
 * 점마다 한 비트인 비트열로 접고, 다섯 비트씩 끊어 32진 글자로 적는다.
 */

import { booleanField, encodeField, numberField, readField, stringField, writeFields } from '../../kit';

export const BRUSH_MODES = ['plain', 'aware'] as const;
export type BrushMode = (typeof BRUSH_MODES)[number];

export const PROJECTIONS = ['pca', 'random'] as const;
export type ProjectionChoice = (typeof PROJECTIONS)[number];

export interface BrushState {
  projection: ProjectionChoice;
  mode: BrushMode;
  /** 겨누는 무리 번호. */
  target: number;
  /** 칠한 점들의 비트열을 32진으로 접은 것. */
  picked: string;
  /** 무리마다 다른 색으로 칠해 정답을 보여 줄지. */
  reveal: boolean;
}

const ALPHABET = '0123456789abcdefghijklmnopqrstuv';
const BITS = 5;

/** 인덱스 집합을 비트열로 접는다. 다섯 비트씩 한 글자다. */
export function encodePicked(picked: ReadonlySet<number>, total: number): string {
  if (picked.size === 0) return '';
  const chars: string[] = [];
  for (let start = 0; start < total; start += BITS) {
    let value = 0;
    for (let bit = 0; bit < BITS; bit += 1) {
      if (picked.has(start + bit)) value |= 1 << bit;
    }
    chars.push(ALPHABET[value]);
  }
  // 뒤쪽의 빈 글자는 버린다 - 주소를 짧게 유지한다.
  return chars.join('').replace(/0+$/, '');
}

/** 32진 글자열을 인덱스 집합으로 편다. 모르는 글자가 있으면 통째로 빈 집합이다. */
export function decodePicked(codes: string, total: number): Set<number> {
  const picked = new Set<number>();
  for (let position = 0; position < codes.length; position += 1) {
    const value = ALPHABET.indexOf(codes[position]);
    if (value < 0) return new Set();
    for (let bit = 0; bit < BITS; bit += 1) {
      const index = position * BITS + bit;
      if (index < total && (value & (1 << bit)) !== 0) picked.add(index);
    }
  }
  return picked;
}

const FIELDS = {
  projection: stringField('proj', 'pca', PROJECTIONS),
  mode: stringField('mode', 'plain', BRUSH_MODES),
  target: numberField('target', 0, 0, 31),
  picked: stringField('picked', ''),
  reveal: booleanField('reveal', false),
} as const;

export function readState(params: URLSearchParams): BrushState {
  const picked = readField(params, FIELDS.picked);
  return {
    projection: readField(params, FIELDS.projection) as ProjectionChoice,
    mode: readField(params, FIELDS.mode) as BrushMode,
    target: Math.trunc(readField(params, FIELDS.target)),
    // 손으로 고친 주소에 엉뚱한 글자가 있으면 통째로 비운다.
    picked: /^[0-9a-v]*$/.test(picked) ? picked : '',
    reveal: readField(params, FIELDS.reveal),
  };
}

export function writeState(state: BrushState): string {
  return writeFields([
    encodeField(FIELDS.projection, state.projection),
    encodeField(FIELDS.mode, state.mode),
    encodeField(FIELDS.target, state.target),
    encodeField(FIELDS.picked, state.picked),
    encodeField(FIELDS.reveal, state.reveal),
  ]);
}
