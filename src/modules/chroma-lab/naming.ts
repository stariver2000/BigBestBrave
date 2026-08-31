/**
 * 색에서 이름을 만드는 결정론적 규칙.
 *
 * LLM이 붙어 있지 않아도 팔레트에 이름이 있어야 하므로, 색상·명도·채도 구간을
 * 어휘표에 대응시켜 이름을 조립한다. LLM은 이 결과를 대체하는 선택지일 뿐이다.
 */

import type { Oklch } from '../../core/color';
import type { Locale } from '../../core/i18n';
import { CHROMA_WORDS, HUE_NAMES, LIGHTNESS_WORDS } from './config';

/** 어휘표는 [ko, en, ja] 순서 배열이므로 로케일을 인덱스로 바꾼다. */
const LOCALE_INDEX: Record<Locale, number> = { ko: 0, en: 1, ja: 2 };

/** 일본어는 단어 사이를 띄우지 않는 편이 자연스럽다. */
const JOINERS: Record<Locale, string> = { ko: ' ', en: ' ', ja: '' };

function hueWord(hue: number, index: number): string {
  const sectorSize = 360 / HUE_NAMES.length;
  // 색상환의 경계가 이름 사이 한가운데 오도록 반 구간만큼 밀어서 나눈다.
  const shifted = (((hue + sectorSize / 2) % 360) + 360) % 360;
  const sector = Math.floor(shifted / sectorSize) % HUE_NAMES.length;
  return HUE_NAMES[sector][index];
}

function bandWord(
  bands: readonly { max: number; words: readonly [string, string, string] }[],
  value: number,
  index: number,
): string {
  const matched = bands.find((band) => value < band.max);
  const chosen = matched ?? bands[bands.length - 1];
  return chosen.words[index];
}

export function localPaletteName(seed: Oklch, locale: Locale): string {
  const index = LOCALE_INDEX[locale];
  const parts = [
    bandWord(LIGHTNESS_WORDS, seed.l, index),
    bandWord(CHROMA_WORDS, seed.c, index),
    hueWord(seed.h, index),
  ];
  return parts.join(JOINERS[locale]);
}

/** LLM에 보낼 프롬프트. 색 수치를 그대로 주고 이름만 받도록 형식을 좁힌다. */
export function buildNamingPrompt(seed: Oklch, hex: string, harmony: string, locale: Locale): string {
  const languageName = { ko: '한국어', en: 'English', ja: '日本語' }[locale];
  return [
    `Color: ${hex} (OKLCH L=${seed.l.toFixed(3)} C=${seed.c.toFixed(3)} H=${seed.h.toFixed(1)})`,
    `Harmony: ${harmony}`,
    `Write one evocative palette name in ${languageName}.`,
    'Answer with the name only. No quotes, no explanation, no punctuation at the end.',
  ].join('\n');
}

/** 모델이 설명을 덧붙이는 경우가 있어 첫 줄만 취하고 길이를 자른다. */
export function sanitizeName(raw: string, maxLength: number): string {
  const firstLine = raw.split('\n')[0].trim();
  const unquoted = firstLine.replace(/^["'「『]+|["'」』]+$/g, '').trim();
  return unquoted.slice(0, maxLength);
}
