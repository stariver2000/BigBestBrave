/**
 * 검사 기준값.
 *
 * 점 개수 상한이 있는 이유: 모든 점쌍의 거리를 계산하므로 비용이 점 개수의 제곱으로 늘어난다.
 * 브라우저에서 화면이 멈추지 않는 선을 상한으로 잡았다.
 */

export const LIMITS = {
  /** 이보다 많은 점은 앞에서부터 잘라 쓴다. */
  maxPoints: 1200,
  neighbors: { min: 3, max: 100 },
} as const;

export const DEFAULTS = {
  /** 이웃 수. 국소 구조를 볼 때 흔히 쓰는 값이다. */
  neighbors: 15,
} as const;

/**
 * 지표를 말로 옮길 때 쓰는 구간.
 * 절대적인 합격선은 없지만, 실무에서 "이 정도면 믿고 본다"고 여겨지는 선을 표시해 준다.
 */
export const GRADE_THRESHOLDS = [
  { min: 0.95, key: 'excellent' },
  { min: 0.9, key: 'good' },
  { min: 0.8, key: 'fair' },
  { min: 0, key: 'poor' },
] as const;

