/**
 * 논문의 수치를 되짚어 내는 계산.
 *
 * 상대 증가율은 곱으로 맞물린다. Control 대비 17.1% 좋고 그보다 32.8% 더 좋다면
 * Control 대비 (1.171 x 1.328 - 1) = 55.5%여야 한다. 세 갈래 표는 이것이 소수
 * 첫째 자리까지 맞아떨어진다. 네 갈래 표는 GLMM 사후 추정이라 정확히 맞물리지
 * 않는데, 그것도 맞물리지 않는 그대로 계산해 보여 준다. 맞추려고 고치지 않는다.
 */

import { ACCURACY, DESIGN, RECEPTIVITY, SCALE } from './config';
import { createRandom } from '../random';

/** 증가율(%)을 배율로. 17.1 -> 1.171. */
export function ratio(deltaPercent: number): number {
  return 1 + deltaPercent / 100;
}

/** 배율을 증가율(%)로. 1.171 -> 17.1. */
export function delta(ratioValue: number): number {
  return (ratioValue - 1) * 100;
}

/** 두 상대 증가율을 이어 붙인 값(%). (1+a)(1+b) - 1 이다. */
export function compose(aPercent: number, bPercent: number): number {
  return delta(ratio(aPercent) * ratio(bPercent));
}

/** 세 갈래 정확도 표의 되짚기: 17.1과 32.8을 이으면 55.5가 나와야 한다. */
export function accuracyComposition(): { composed: number; stated: number } {
  return {
    composed: compose(ACCURACY.three.personalizedVsControl, ACCURACY.three.adaptiveVsPersonalized),
    stated: ACCURACY.three.adaptiveVsControl,
  };
}

/** 초록의 "수용도 8.0% 넘게"를 세 갈래 표에서 되짚는다. 1.290 / 1.194 - 1 이다. */
export function receptivityGain(): number {
  return delta(ratio(RECEPTIVITY.three.adaptiveVsControl) / ratio(RECEPTIVITY.three.personalizedVsControl));
}

/** 네 갈래 정확도의 되짚기. GLMM 추정이라 어긋나며, 어긋난 값 그대로 낸다. */
export function fourWayAccuracyComposition(): { composed: number; stated: number } {
  return {
    composed: compose(ACCURACY.three.personalizedVsControl, ACCURACY.four.wExpVsPersonalized),
    stated: ACCURACY.four.wExpVsControl,
  };
}

/** 개입을 만나 피드백을 남긴 비율(%). 39188 / 47939 이다. */
export function feedbackRate(): number {
  return (SCALE.feedbackLabels / SCALE.encounters) * 100;
}

/** 라벨 시점별 몫의 합(%). 반올림 탓에 100에서 조금 어긋날 수 있고, 그 폭을 시험이 잰다. */
export function labelShareSum(): number {
  const { entry, using, exit } = SCALE.labelStageShare;
  return entry + using + exit;
}

/**
 * 마찰 과제의 숫자열을 만든다. 논문의 열두 자리를 그대로 따른다.
 * 씨앗을 받는 까닭은 시험이 재현할 수 있어야 하기 때문이고, 화면은 매번 다른 씨앗을 준다.
 */
export function frictionDigits(seed: number): string {
  const random = createRandom(seed);
  let out = '';
  for (let i = 0; i < DESIGN.frictionDigits; i += 1) out += Math.floor(random() * 10);
  return out;
}

/** 입력이 과제와 맞는가. 공백은 너그럽게 받아 준다 - 화면의 마찰은 지연이지 형벌이 아니다. */
export function digitsMatch(expected: string, typed: string): boolean {
  return typed.replace(/\s+/g, '') === expected;
}
