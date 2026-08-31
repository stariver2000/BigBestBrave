/**
 * 특성 벡터 -> 디자인 토큰 전체 조립.
 *
 * 색은 palette.ts가 담당하고, 이 파일은 간격·모서리·타이포·모션·가장자리를 파생해 합친다.
 * 모든 수치는 config.ts의 표에서만 온다.
 */

import { parseColor, toRgbString } from '../../color';
import { lookup, pick } from '../vector';
import type { TraitVector } from '../model';
import { deriveColorTokens } from './palette';
import {
  BASE_FONT_SIZE,
  BORDER_STYLE,
  CASING_TRANSFORM,
  CORNER_RADIUS,
  DEFAULT_TYPE_STACK,
  DENSITY_SPACE,
  DURATION_MS,
  EASING_CURVE,
  ELEVATION_STRENGTH,
  LAYOUT_WIDTH,
  LEADING_RATIO,
  MONO_STACK,
  PILL_RADIUS,
  SCALE_RATIO,
  SPACE_MULTIPLIERS,
  SURFACE_TEXTURE,
  TEXTURE_ALPHA,
  TEXTURE_COLOR_PLACEHOLDER,
  TRACKING_EM,
  TYPE_STACKS,
  WEIGHT_PAIRS,
} from './config';
import type {
  DesignTokens,
  EdgeTokens,
  MotionTokens,
  RadiusTokens,
  SpaceTokens,
  TextTokens,
} from './types';

function deriveSpace(vector: TraitVector): SpaceTokens {
  const density = pick(vector, 'density');
  const config = lookup(DENSITY_SPACE, density, DENSITY_SPACE.comfortable);
  // 레이아웃 원형이 폭을 정해 두었으면 그것이 밀도가 정한 폭을 이긴다.
  const width = LAYOUT_WIDTH[pick(vector, 'layout')] ?? config.contentWidth;
  return {
    unit: config.unit,
    scale: SPACE_MULTIPLIERS.map((multiplier) => config.unit * multiplier),
    contentWidth: width,
  };
}

function deriveRadius(vector: TraitVector): RadiusTokens {
  const corner = pick(vector, 'corner');
  const radius = lookup(CORNER_RADIUS, corner, CORNER_RADIUS.rounded);
  return {
    sm: `${radius.sm}px`,
    md: `${radius.md}px`,
    lg: `${radius.lg}px`,
    pill: `${PILL_RADIUS}px`,
  };
}

function deriveText(vector: TraitVector): TextTokens {
  const stack = lookup(TYPE_STACKS, pick(vector, 'type-voice'), DEFAULT_TYPE_STACK);
  const weights = lookup(WEIGHT_PAIRS, pick(vector, 'type-contrast'), WEIGHT_PAIRS.gentle);
  return {
    fontHeading: stack.heading,
    fontBody: stack.body,
    fontMono: MONO_STACK,
    ratio: lookup(SCALE_RATIO, pick(vector, 'type-scale'), SCALE_RATIO['major-third']),
    baseSize: lookup(BASE_FONT_SIZE, pick(vector, 'density'), BASE_FONT_SIZE.comfortable),
    tracking: lookup(TRACKING_EM, pick(vector, 'tracking'), TRACKING_EM.normal),
    leading: lookup(LEADING_RATIO, pick(vector, 'leading'), LEADING_RATIO.normal),
    transform: lookup(CASING_TRANSFORM, pick(vector, 'casing'), CASING_TRANSFORM.sentence),
    headingWeight: weights.heading,
    bodyWeight: weights.body,
  };
}

function deriveMotion(vector: TraitVector): MotionTokens {
  const duration = lookup(DURATION_MS, pick(vector, 'motion-duration'), DURATION_MS.measured);
  return {
    fast: `${duration.fast}ms`,
    base: `${duration.base}ms`,
    slow: `${duration.slow}ms`,
    easing: lookup(EASING_CURVE, pick(vector, 'easing'), EASING_CURVE['ease-out']),
  };
}

/** 그림자 색은 배경 명암에 따라 다르다. 밝은 배경에서는 검은 그림자, 어두운 배경에서는 더 짙은 검정. */
function shadowColor(dark: boolean, alpha: number): string {
  const opacity = dark ? alpha * 1.8 : alpha;
  return `rgb(0 0 0 / ${Number(opacity.toFixed(3))})`;
}

function deriveEdge(vector: TraitVector, dark: boolean, textureColor: string): EdgeTokens {
  const border = lookup(BORDER_STYLE, pick(vector, 'border'), BORDER_STYLE.hairline);
  const strength = lookup(ELEVATION_STRENGTH, pick(vector, 'elevation'), ELEVATION_STRENGTH.subtle);
  const texturePattern = lookup(SURFACE_TEXTURE, pick(vector, 'surface'), SURFACE_TEXTURE.plain);
  // 질감 패턴은 색 자리표시자를 갖고 있다. 실제 색은 여기서 한 번에 치환한다.
  const texture =
    texturePattern === 'none'
      ? 'none'
      : texturePattern.split(TEXTURE_COLOR_PLACEHOLDER).join(textureColor);

  return {
    width: `${border.width}px`,
    style: border.style,
    shadowSm:
      strength === 0 ? 'none' : `0 1px ${2 * strength}px ${shadowColor(dark, 0.06 * strength)}`,
    shadowMd:
      strength === 0 ? 'none' : `0 ${2 * strength}px ${8 * strength}px ${shadowColor(dark, 0.08 * strength)}`,
    shadowLg:
      strength === 0 ? 'none' : `0 ${6 * strength}px ${24 * strength}px ${shadowColor(dark, 0.1 * strength)}`,
    texture,
  };
}

/** 16진 색 문자열에 알파를 입혀 rgb() 표기로 바꾼다. 파싱 실패 시 투명색으로 떨어진다. */
function withAlpha(hex: string, alpha: number): string {
  const parsed = parseColor(hex);
  if (!parsed.ok) return 'rgb(0 0 0 / 0)';
  return toRgbString({ ...parsed.color, a: alpha });
}

export function deriveTokens(vector: TraitVector): DesignTokens {
  const color = deriveColorTokens(vector);
  // 질감은 전경색을 아주 옅게 얹어 만든다. 배경색과 같은 계열이라 튀지 않는다.
  // CSS 상대 색 문법(rgb(from ...))을 쓰지 않고 여기서 채널을 풀어 두는 이유:
  // 구형 브라우저에서 값 전체가 무효가 되면 질감이 아니라 배경 자체가 사라지기 때문.
  const textureColor = withAlpha(color.fg, TEXTURE_ALPHA);
  return {
    color,
    space: deriveSpace(vector),
    radius: deriveRadius(vector),
    text: deriveText(vector),
    motion: deriveMotion(vector),
    edge: deriveEdge(vector, color.dark, textureColor),
  };
}
