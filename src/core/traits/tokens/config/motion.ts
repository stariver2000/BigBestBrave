/**
 * 모션 지속시간과 가감속 곡선 매핑표.
 *
 * 파생 로직에는 숫자를 두지 않는다. 표를 바꾸면 그 표를 읽는 모든 페이지가 함께 움직인다.
 */

/** 모션 지속시간(ms). fast/base/slow 세 단계. */
export const DURATION_MS: Record<string, { fast: number; base: number; slow: number }> = {
  instant: { fast: 0, base: 0, slow: 0 },
  quick: { fast: 80, base: 140, slow: 220 },
  measured: { fast: 140, base: 240, slow: 400 },
  languid: { fast: 260, base: 520, slow: 900 },
};

export const EASING_CURVE: Record<string, string> = {
  linear: 'linear',
  'ease-out': 'cubic-bezier(0.16, 1, 0.3, 1)',
  'ease-in-out': 'cubic-bezier(0.65, 0, 0.35, 1)',
  overshoot: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  anticipate: 'cubic-bezier(0.68, -0.55, 0.27, 1.55)',
  step: 'steps(6, end)',
};
