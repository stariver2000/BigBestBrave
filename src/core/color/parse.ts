/**
 * 사용자 입력 문자열 -> Srgb 파싱.
 *
 * 실패를 예외로 던지지 않고 결과 객체로 돌려주는 이유: 입력창에 한 글자씩 타이핑되는
 * 도중의 부분 문자열도 정상적인 "아직 유효하지 않음" 상태이기 때문이다.
 */

import { clamp01 } from './srgb';
import { oklchToDisplayable } from './oklab';
import type { Srgb } from './types';

export type ParseResult =
  | { ok: true; color: Srgb }
  | { ok: false; reason: 'empty' | 'unknown-format' | 'out-of-range' };

const HEX_PATTERN = /^#?([0-9a-f]{3,8})$/i;
const RGB_PATTERN = /^rgba?\(([^)]+)\)$/i;
const HSL_PATTERN = /^hsla?\(([^)]+)\)$/i;
const OKLCH_PATTERN = /^oklch\(([^)]+)\)$/i;

/** rgb(1 2 3 / 0.5)와 rgb(1,2,3,0.5)를 모두 받아 숫자 토큰 배열로 만든다. */
function splitComponents(body: string): string[] {
  return body
    .replace(/\//g, ' ')
    .split(/[\s,]+/)
    .map((token) => token.trim())
    .filter((token) => token.length > 0);
}

/** 백분율이면 0~1로, 아니면 지정한 분모로 나눠 정규화한다. */
function normalizeComponent(token: string, fullScale: number): number | null {
  if (token.endsWith('%')) {
    const percent = Number(token.slice(0, -1));
    return Number.isFinite(percent) ? percent / 100 : null;
  }
  const value = Number(token);
  return Number.isFinite(value) ? value / fullScale : null;
}

function parseHex(digits: string): ParseResult {
  // #rgb / #rgba 축약형은 각 자리를 두 번 반복해 8비트로 확장한다.
  const expanded =
    digits.length === 3 || digits.length === 4
      ? digits
          .split('')
          .map((digit) => digit + digit)
          .join('')
      : digits;
  if (expanded.length !== 6 && expanded.length !== 8) {
    return { ok: false, reason: 'unknown-format' };
  }
  const bytes: number[] = [];
  for (let i = 0; i < expanded.length; i += 2) {
    bytes.push(parseInt(expanded.slice(i, i + 2), 16));
  }
  return {
    ok: true,
    color: {
      r: bytes[0] / 255,
      g: bytes[1] / 255,
      b: bytes[2] / 255,
      a: bytes.length === 4 ? bytes[3] / 255 : 1,
    },
  };
}

function parseRgb(body: string): ParseResult {
  const tokens = splitComponents(body);
  if (tokens.length < 3) return { ok: false, reason: 'unknown-format' };
  const channels = tokens.slice(0, 3).map((token) => normalizeComponent(token, 255));
  if (channels.some((channel) => channel === null)) return { ok: false, reason: 'out-of-range' };
  const alpha = tokens[3] === undefined ? 1 : normalizeComponent(tokens[3], 1);
  if (alpha === null) return { ok: false, reason: 'out-of-range' };
  const [r, g, b] = channels as number[];
  return { ok: true, color: { r: clamp01(r), g: clamp01(g), b: clamp01(b), a: clamp01(alpha) } };
}

/** HSL -> sRGB. 중간 표현을 거치지 않는 표준 변환식. */
function hslToSrgb(hue: number, saturation: number, lightness: number, alpha: number): Srgb {
  const chroma = (1 - Math.abs(2 * lightness - 1)) * saturation;
  const sector = (((hue % 360) + 360) % 360) / 60;
  const second = chroma * (1 - Math.abs((sector % 2) - 1));
  const base = lightness - chroma / 2;
  // 6개 색상 구간별로 (r,g,b) 배치가 순환한다.
  const table: [number, number, number][] = [
    [chroma, second, 0],
    [second, chroma, 0],
    [0, chroma, second],
    [0, second, chroma],
    [second, 0, chroma],
    [chroma, 0, second],
  ];
  const [r, g, b] = table[Math.floor(sector) % 6];
  return { r: r + base, g: g + base, b: b + base, a: alpha };
}

function parseHsl(body: string): ParseResult {
  const tokens = splitComponents(body);
  if (tokens.length < 3) return { ok: false, reason: 'unknown-format' };
  const hue = Number(tokens[0].replace(/deg$/i, ''));
  const saturation = normalizeComponent(tokens[1], 1);
  const lightness = normalizeComponent(tokens[2], 1);
  const alpha = tokens[3] === undefined ? 1 : normalizeComponent(tokens[3], 1);
  if (!Number.isFinite(hue) || saturation === null || lightness === null || alpha === null) {
    return { ok: false, reason: 'out-of-range' };
  }
  return { ok: true, color: hslToSrgb(hue, clamp01(saturation), clamp01(lightness), clamp01(alpha)) };
}

function parseOklch(body: string): ParseResult {
  const tokens = splitComponents(body);
  if (tokens.length < 3) return { ok: false, reason: 'unknown-format' };
  const lightness = normalizeComponent(tokens[0], 1);
  const chroma = Number(tokens[1]);
  const hue = Number(tokens[2].replace(/deg$/i, ''));
  const alpha = tokens[3] === undefined ? 1 : normalizeComponent(tokens[3], 1);
  if (lightness === null || !Number.isFinite(chroma) || !Number.isFinite(hue) || alpha === null) {
    return { ok: false, reason: 'out-of-range' };
  }
  return { ok: true, color: oklchToDisplayable({ l: lightness, c: chroma, h: hue, a: clamp01(alpha) }) };
}

export function parseColor(input: string): ParseResult {
  const text = input.trim().toLowerCase();
  if (text.length === 0) return { ok: false, reason: 'empty' };

  const hex = HEX_PATTERN.exec(text);
  if (hex) return parseHex(hex[1]);

  const rgb = RGB_PATTERN.exec(text);
  if (rgb) return parseRgb(rgb[1]);

  const hsl = HSL_PATTERN.exec(text);
  if (hsl) return parseHsl(hsl[1]);

  const oklch = OKLCH_PATTERN.exec(text);
  if (oklch) return parseOklch(oklch[1]);

  return { ok: false, reason: 'unknown-format' };
}
