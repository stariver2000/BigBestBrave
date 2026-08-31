/**
 * 대비 계산: WCAG 2.1 대비비와 APCA(Lc).
 *
 * 두 지표를 함께 내보내는 이유: 법적 준수 근거는 아직 WCAG 2.1이지만,
 * 실제 가독성 판단은 극성을 반영하는 APCA가 더 정확하기 때문이다.
 */

import { APCA, WCAG } from './config';
import { clamp01, toLinear } from './srgb';
import type { Srgb } from './types';

export type WcagLevel = 'fail' | 'aa-large' | 'aa' | 'aaa';

export interface ContrastReport {
  /** WCAG 2.1 대비비 (1~21). */
  ratio: number;
  wcagLevel: WcagLevel;
  /** APCA Lc 절대값이 아닌 부호 있는 값. 음수는 어두운 배경 위 밝은 글자를 뜻한다. */
  lc: number;
  /** APCA.levels에서 고른 용도 키. UI는 이 키로 다국어 문구를 찾는다. */
  apcaLevelKey: string;
}

export function relativeLuminance(color: Srgb): number {
  const linear = toLinear(color);
  const { r, g, b } = WCAG.coefficients;
  return linear.r * r + linear.g * g + linear.b * b;
}

export function wcagContrastRatio(foreground: Srgb, background: Srgb): number {
  const a = relativeLuminance(foreground);
  const b = relativeLuminance(background);
  const lighter = Math.max(a, b);
  const darker = Math.min(a, b);
  return (lighter + WCAG.flare) / (darker + WCAG.flare);
}

export function wcagLevelOf(ratio: number): WcagLevel {
  if (ratio >= WCAG.thresholds.aaa) return 'aaa';
  if (ratio >= WCAG.thresholds.aa) return 'aa';
  if (ratio >= WCAG.thresholds.aaLarge) return 'aa-large';
  return 'fail';
}

/**
 * APCA 전용 화면 휘도. WCAG의 선형화와 달리 단순 거듭제곱(2.4)을 쓴다.
 *
 * 채널을 클램프하는 이유: 색역 매핑 이분 탐색은 -1e-7 같은 미세한 음수를 남길 수 있고,
 * 음수에 실수 지수를 적용하면 NaN이 되어 대비값 전체가 오염된다.
 */
function apcaLuminance(color: Srgb): number {
  const { r, g, b } = APCA.coefficients;
  const power = APCA.mainTRC;
  const red = Math.pow(clamp01(color.r), power);
  const green = Math.pow(clamp01(color.g), power);
  const blue = Math.pow(clamp01(color.b), power);
  return red * r + green * g + blue * b;
}

/** 검은색 근처에서 인지 대비가 과대평가되는 것을 막는 소프트 클램프. */
function softClampBlack(luminance: number): number {
  if (luminance >= APCA.blackThreshold) return luminance;
  return luminance + Math.pow(APCA.blackThreshold - luminance, APCA.blackClamp);
}

/**
 * APCA Lc 값을 계산한다. 양수는 밝은 배경 위 어두운 글자(정방향),
 * 음수는 어두운 배경 위 밝은 글자(역방향)이며, 절대값이 클수록 잘 읽힌다.
 */
export function apcaContrast(text: Srgb, background: Srgb): number {
  const textLuminance = softClampBlack(apcaLuminance(text));
  const backgroundLuminance = softClampBlack(apcaLuminance(background));

  if (Math.abs(backgroundLuminance - textLuminance) < APCA.deltaYMin) return 0;

  if (backgroundLuminance > textLuminance) {
    const { bgExp, txtExp, scale, offset } = APCA.forward;
    const raw =
      (Math.pow(backgroundLuminance, bgExp) - Math.pow(textLuminance, txtExp)) * scale;
    const adjusted = raw < APCA.lowClip ? 0 : raw - offset;
    return adjusted * 100;
  }

  const { bgExp, txtExp, scale, offset } = APCA.reverse;
  const raw = (Math.pow(backgroundLuminance, bgExp) - Math.pow(textLuminance, txtExp)) * scale;
  const adjusted = raw > -APCA.lowClip ? 0 : raw + offset;
  return adjusted * 100;
}

export function apcaLevelKeyOf(lc: number): string {
  const magnitude = Math.abs(lc);
  // levels는 min 내림차순이므로 먼저 걸리는 항목이 가장 높은 등급이다.
  const matched = APCA.levels.find((level) => magnitude >= level.min);
  return matched ? matched.key : 'invisible';
}

export function analyzeContrast(foreground: Srgb, background: Srgb): ContrastReport {
  const ratio = wcagContrastRatio(foreground, background);
  const lc = apcaContrast(foreground, background);
  return {
    ratio,
    wcagLevel: wcagLevelOf(ratio),
    lc,
    apcaLevelKey: apcaLevelKeyOf(lc),
  };
}
