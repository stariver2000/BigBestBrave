/**
 * 읽기 속도.
 *
 * 두 가지가 속도를 깎는다. 글자가 시력 문턱에 비해 작을 때, 그리고 대비가 모자랄 때.
 * 둘 다 어느 지점을 넘으면 더 좋아지지 않는다 — 충분히 크고 충분히 또렷하면 그다음은
 * 사람의 문제이지 화면의 문제가 아니다. 그래서 두 몫 모두 0과 1 사이로 두고 곱한다.
 *
 * 여기 쓰인 모양(문턱 위에서는 평평하고 아래에서는 가파르게 떨어지는 곡선)은 읽기 연구에서
 * 거듭 보고된 것이지만, 정확한 계수는 이 페이지가 고른 것이지 어느 논문의 값이 아니다.
 */

import { CONTRAST_PLATEAU, CRITICAL_RESERVE, MAX_WPM, SIZE_FALLOFF } from './config';

function clamp01(value: number): number {
  return Math.min(1, Math.max(0, value));
}

/**
 * 크기가 남기는 몫.
 * 여유(reserve)가 문턱 이상이면 1, 0이면 0, 그 사이는 가파르게 떨어진다.
 */
export function sizeFactor(reserve: number): number {
  return Math.pow(clamp01(reserve / CRITICAL_RESERVE), SIZE_FALLOFF);
}

/**
 * 대비가 남기는 몫.
 * 베버 대비가 문턱(10%)을 넘으면 1이고, 0이면 0이다. 그 사이는 곧게 잇는다.
 */
export function contrastFactor(contrast: number): number {
  return clamp01(Math.max(contrast, 0) / CONTRAST_PLATEAU);
}

/** 분당 낱말. 두 몫을 최고 속도에 곱한다. */
export function wordsPerMinute(size: number, contrast: number): number {
  return MAX_WPM * clamp01(size) * clamp01(contrast);
}
