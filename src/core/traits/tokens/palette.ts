/**
 * 특성 -> 색 토큰 파생.
 *
 * 순서: (1) 색온도/분위기로 색상각 결정 -> (2) 강도로 채도 결정 -> (3) 밝기로 배경 명도 결정
 * -> (4) 역할별로 "필요한 대비를 만족할 때까지" 명도를 밀어 색을 찾는다.
 *
 * 역할색을 고정 오프셋으로 만들지 않는 이유: 같은 오프셋이라도 배경 명도에 따라 실제 대비가
 * 크게 달라진다. 어두운 배경에서 보조 글자가 읽히지 않는 문제가 정확히 그렇게 생겼다.
 */

import {
  apcaContrast,
  mapIntoGamut,
  oklchToSrgb,
  toHex,
  toRgbString,
  wcagContrastRatio,
} from '../../color';
import type { Oklch, Srgb } from '../../color';
import { lookup, pick, pickAll } from '../vector';
import type { TraitVector } from '../model';
import {
  ACCENT_MIN_BG_LC,
  ACCENT_TINT_ALPHA,
  ACCENT_MIN_FG_LC,
  ACCENT_SEARCH,
  ACHROMATIC_TEMPERATURE,
  ATMOSPHERE_TINT,
  BRIGHTNESS_BG_L,
  CONTRAST_TARGET_LC,
  DEFAULT_CONTRAST_TARGET_LC,
  FG_SEARCH,
  INTENSITY_CHROMA,
  NEUTRAL_CHROMA_SCALE,
  ROLE_CONTRAST,
  TEMPERATURE_HUE,
} from './config';
import type { ColorTokens } from './types';

interface ColorBasis {
  hue: number;
  chroma: number;
  backgroundL: number;
  dark: boolean;
}

const WHITE: Srgb = { r: 1, g: 1, b: 1, a: 1 };
const BLACK: Srgb = { r: 0, g: 0, b: 0, a: 1 };

function toColor(l: number, c: number, h: number): Srgb {
  const target: Oklch = { l: Math.max(0, Math.min(1, l)), c: Math.max(0, c), h, a: 1 };
  return oklchToSrgb(mapIntoGamut(target).color);
}

/** 분위기 여러 개가 선언되면 색상 이동은 합산하고 채도 배수는 곱한다. */
function applyAtmosphere(vector: TraitVector, hue: number, chroma: number): { hue: number; chroma: number } {
  let shiftedHue = hue;
  let scaledChroma = chroma;
  for (const atmosphere of pickAll(vector, 'atmosphere')) {
    const tint = ATMOSPHERE_TINT[atmosphere];
    if (!tint) continue;
    shiftedHue += tint.hueShift;
    scaledChroma *= tint.chromaScale;
  }
  return { hue: ((shiftedHue % 360) + 360) % 360, chroma: scaledChroma };
}

export function deriveColorBasis(vector: TraitVector): ColorBasis {
  const temperature = pick(vector, 'temperature');
  const baseHue = lookup(TEMPERATURE_HUE, temperature, TEMPERATURE_HUE.neutral);
  const baseChroma =
    temperature === ACHROMATIC_TEMPERATURE
      ? 0
      : lookup(INTENSITY_CHROMA, pick(vector, 'intensity'), INTENSITY_CHROMA.restrained);
  const tinted = applyAtmosphere(vector, baseHue, baseChroma);
  const backgroundL = lookup(BRIGHTNESS_BG_L, pick(vector, 'brightness'), BRIGHTNESS_BG_L.balanced);
  return { hue: tinted.hue, chroma: tinted.chroma, backgroundL, dark: backgroundL < 0.5 };
}

/**
 * 기준 명도에서 배경 반대 방향으로 훑으며 조건을 처음 만족하는 색을 고른다.
 *
 * 최대 대비(순검정/순백)를 바로 쓰지 않는 이유: 필요 이상의 대비는 눈부심을 만들고,
 * 보조 글자·테두리처럼 "본문보다 조용해야 하는" 역할의 위계가 무너진다.
 * 조건을 끝내 만족하지 못하면 훑은 범위의 끝값(가장 대비가 큰 색)을 돌려준다.
 */
function searchAwayFromBackground(
  basis: ColorBasis,
  chroma: number,
  startL: number,
  accept: (candidate: Srgb) => boolean,
): Srgb {
  const direction = basis.dark ? 1 : -1;
  const limit = basis.dark ? FG_SEARCH.max : FG_SEARCH.min;

  let lightness = startL;
  let last = toColor(lightness, chroma, basis.hue);
  while ((direction > 0 && lightness <= limit) || (direction < 0 && lightness >= limit)) {
    const candidate = toColor(lightness, chroma, basis.hue);
    if (accept(candidate)) return candidate;
    last = candidate;
    lightness += direction * FG_SEARCH.step;
  }
  return last;
}

/** 강조색 위에 얹을 글자색: 흰색과 검은색 중 APCA 절대값이 큰 쪽과 그 대비값. */
function bestAccentForeground(accent: Srgb): { color: Srgb; lc: number } {
  const whiteLc = Math.abs(apcaContrast(WHITE, accent));
  const blackLc = Math.abs(apcaContrast(BLACK, accent));
  return whiteLc >= blackLc ? { color: WHITE, lc: whiteLc } : { color: BLACK, lc: blackLc };
}

/**
 * 강조색을 고른다.
 *
 * 조건 두 가지를 만족하는 후보 중에서 실제로 낼 수 있는 채도가 가장 높은 명도를 고른다.
 *   (1) 강조색 위의 라벨(흰색 또는 검정)이 ACCENT_MIN_FG_LC 이상
 *   (2) 강조색 자체가 배경 대비 ACCENT_MIN_BG_LC 이상
 * 조건을 만족하는 후보가 없으면 라벨 대비가 가장 큰 후보로 물러선다.
 */
function buildAccent(basis: ColorBasis, chroma: number, background: Srgb): { accent: Srgb; foreground: Srgb } {
  const band = basis.dark ? ACCENT_SEARCH.onDark : ACCENT_SEARCH.onLight;

  let bestQualified: { accent: Srgb; foreground: Srgb; chroma: number } | null = null;
  let bestFallback: { accent: Srgb; foreground: Srgb; lc: number } | null = null;

  for (let lightness = band.min; lightness <= band.max; lightness += ACCENT_SEARCH.step) {
    // 요청한 채도가 색역을 넘으면 mapIntoGamut이 깎으므로, 실제로 남은 채도를 읽어 비교한다.
    const mapped = mapIntoGamut({ l: lightness, c: chroma, h: basis.hue, a: 1 });
    const candidate = oklchToSrgb(mapped.color);
    const foreground = bestAccentForeground(candidate);
    const backgroundLc = Math.abs(apcaContrast(candidate, background));

    if (foreground.lc >= ACCENT_MIN_FG_LC && backgroundLc >= ACCENT_MIN_BG_LC) {
      if (!bestQualified || mapped.color.c > bestQualified.chroma) {
        bestQualified = { accent: candidate, foreground: foreground.color, chroma: mapped.color.c };
      }
    }
    if (!bestFallback || foreground.lc > bestFallback.lc) {
      bestFallback = { accent: candidate, foreground: foreground.color, lc: foreground.lc };
    }
  }

  const chosen = bestQualified ?? bestFallback;
  // 탐색 구간이 비어 있을 수 없으므로 chosen은 항상 존재하지만, 타입을 좁히기 위해 기본값을 둔다.
  if (!chosen) {
    const middle = oklchToSrgb(mapIntoGamut({ l: (band.min + band.max) / 2, c: chroma, h: basis.hue, a: 1 }).color);
    return { accent: middle, foreground: bestAccentForeground(middle).color };
  }
  return { accent: chosen.accent, foreground: chosen.foreground };
}

function contrastTargetOf(vector: TraitVector): number {
  const policies = pickAll(vector, 'contrast-policy');
  if (policies.length === 0) return DEFAULT_CONTRAST_TARGET_LC;
  // 여러 기준이 선언되면 가장 엄격한 것을 따른다.
  return Math.max(...policies.map((policy) => CONTRAST_TARGET_LC[policy] ?? DEFAULT_CONTRAST_TARGET_LC));
}

export function deriveColorTokens(vector: TraitVector): ColorTokens {
  const basis = deriveColorBasis(vector);
  const bodyTargetLc = contrastTargetOf(vector);
  const background = toColor(basis.backgroundL, basis.chroma * NEUTRAL_CHROMA_SCALE.bg, basis.hue);

  // 표면은 배경에서, 떠 있는 표면은 그 표면에서 각각 한 층씩 떨어져야 층위가 읽힌다.
  const surface = searchAwayFromBackground(
    basis,
    basis.chroma * NEUTRAL_CHROMA_SCALE.surface,
    basis.backgroundL,
    (candidate) => wcagContrastRatio(candidate, background) >= ROLE_CONTRAST.surfaceRatio,
  );
  const surfaceRaised = searchAwayFromBackground(
    basis,
    basis.chroma * NEUTRAL_CHROMA_SCALE.surface,
    basis.backgroundL,
    (candidate) =>
      wcagContrastRatio(candidate, background) >= ROLE_CONTRAST.surfaceRatio * ROLE_CONTRAST.raisedRatio,
  );
  // 테두리는 표면 위에 그어지므로 배경이 아니라 표면을 기준으로 대비를 잰다.
  // 역할이 둘로 나뉜다: 카드 경계는 옅게, 조작 요소 경계는 3:1까지.
  const border = searchAwayFromBackground(
    basis,
    basis.chroma * NEUTRAL_CHROMA_SCALE.border,
    basis.backgroundL,
    (candidate) => wcagContrastRatio(candidate, surface) >= ROLE_CONTRAST.subtleBorderRatio,
  );
  const borderStrong = searchAwayFromBackground(
    basis,
    basis.chroma * NEUTRAL_CHROMA_SCALE.border,
    basis.backgroundL,
    (candidate) => wcagContrastRatio(candidate, surface) >= ROLE_CONTRAST.borderRatio,
  );
  const foreground = searchAwayFromBackground(
    basis,
    basis.chroma * NEUTRAL_CHROMA_SCALE.fgMuted,
    basis.backgroundL,
    (candidate) => Math.abs(apcaContrast(candidate, background)) >= bodyTargetLc,
  );
  // 보조 글자는 본문보다 조용하되, 어떤 배경에서도 큰 글씨 기준(Lc 60)은 넘긴다.
  const muted = searchAwayFromBackground(
    basis,
    basis.chroma * NEUTRAL_CHROMA_SCALE.fgMuted,
    basis.backgroundL,
    (candidate) => Math.abs(apcaContrast(candidate, surface)) >= ROLE_CONTRAST.mutedTextLc,
  );

  const { accent, foreground: accentForeground } = buildAccent(basis, basis.chroma, background);

  return {
    bg: toHex(background),
    surface: toHex(surface),
    surfaceRaised: toHex(surfaceRaised),
    border: toHex(border),
    borderStrong: toHex(borderStrong),
    fg: toHex(foreground),
    fgMuted: toHex(muted),
    accent: toHex(accent),
    accentFg: toHex(accentForeground),
    // 알파를 가진 형태로 내보내는 이유: 어떤 표면 위에 얹혀도 그 표면 색과 자연스럽게 섞여야 한다.
    accentSoft: toRgbString({ ...accent, a: ACCENT_TINT_ALPHA.soft }),
    accentGlow: toRgbString({ ...accent, a: ACCENT_TINT_ALPHA.glow }),
    focus: toHex(accent),
    dark: basis.dark,
  };
}
