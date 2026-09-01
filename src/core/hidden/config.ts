/**
 * CHI 2026 GhostUI에서 옮겨 적은 자리.
 *
 * 근거: Minkyu Kweon, Seokhyeon Park, Soohyun Lee, You Been Lee, Jeongmin Rhee,
 * Jinwook Seo (SNU). "GhostUI: Unveiling Hidden Interactions in Mobile UI." CHI '26.
 * 전문은 연구실이 올려 둔 PDF(hcil.snu.ac.kr/cms/uploads/Ghost_UI_...)로 읽었다. CC-BY 4.0.
 *
 * 옮긴 것: 표 2(여섯 손짓의 정의), 표 3(숨은 상호작용 1,970건의 손짓별 분포와 쓰임새),
 * 3.4절의 깔때기(자동 탐침 8,312건 -> 검증된 숨은 상호작용 1,970건, 앱 81개).
 * 표 4(VLM 성능)는 옮기지 않았다 - 모델 학습의 결과라 이 사이트가 다루지 않는 부분이다.
 * 쓰임새 문구는 저자들이 LDA(k=3)로 뽑은 것을 그대로 옮긴 것이며 번역만 했다.
 *
 * 부호와 방향: count는 1,970건 가운데 그 손짓이 차지한 건수다. 많다고 좋은 것이 아니라
 * 그만큼 그 손짓 뒤에 기능이 자주 숨는다는 뜻이다.
 */

export type GestureId = 'tap' | 'doubleTap' | 'longPress' | 'swipe' | 'scroll' | 'pinch';

export interface Gesture {
  id: GestureId;
  /** 방향이 있는 손짓만 적는다. 없으면 null. */
  direction: 'horizontal' | 'vertical' | 'inOut' | null;
  count: number;
  /** 논문이 함께 적은 백분율. 개수에서 앞으로 계산해 맞는지 시험이 확인한다. */
  percent: number;
}

/** 표 3. 여섯 손짓의 분포. 합이 정확히 1,970이다. */
export const GESTURES: readonly Gesture[] = [
  { id: 'tap', direction: null, count: 596, percent: 30.3 },
  { id: 'doubleTap', direction: null, count: 188, percent: 9.5 },
  // 길게 누름의 백분율은 논문 표기 그대로 19.3이지만 379/1970은 19.24다.
  // 개수의 합이 1,970과 정확히 맞으므로 개수가 옳고 표기가 반올림 실수로 보인다.
  { id: 'longPress', direction: null, count: 379, percent: 19.3 },
  { id: 'swipe', direction: 'horizontal', count: 513, percent: 26.0 },
  { id: 'scroll', direction: 'vertical', count: 118, percent: 6.0 },
  { id: 'pinch', direction: 'inOut', count: 176, percent: 8.9 },
];

/** 3.4절의 깔때기. 탐침한 것 가운데 4분의 1쯤만 검증된 숨은 상호작용으로 남았다. */
export const FUNNEL = {
  probed: 8312,
  validated: 1970,
  apps: 81,
} as const;

/**
 * 시연의 설계 값. 논문의 것이 아니라 이 페이지가 정한 값이다.
 * 길게 누름의 문턱은 흔한 모바일 관행(약 0.5초)을 따랐다.
 */
export const DEMO_THRESHOLDS = {
  longPressMs: 500,
  swipePx: 48,
} as const;
