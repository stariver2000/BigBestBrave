/**
 * 'serene' 룩의 팔레트와 형태 값.
 *
 * 특성 엔진이 계산한 색을 그대로 쓰지 않는 이유:
 * 엔진은 "대비 기준을 넘는 색"을 찾을 뿐 "우아한 색"을 고르지는 못한다.
 * 그래서 지면·잉크·강조색은 손으로 고르고, 아래 주석의 실측 대비값으로 근거를 남긴다.
 * 엔진은 간격·타입 스케일·모션처럼 계산이 통하는 영역에서 계속 쓰인다.
 *
 * 측정값(APCA Lc / WCAG 대비비):
 *   ink   #221E2E on paper  Lc  99.4 / 15.39:1   본문 — 넉넉히 통과
 *   muted #6B6580 on white  Lc  77.6 /  5.53:1   보조 글자 — 본문 최소선 통과
 *   accent#6F5FAE on white  Lc  76.5 /  5.35:1   강조 글자 — 본문 최소선 통과
 *   white #FFFFFF on accent Lc -81.9 /  5.35:1   버튼 라벨 — 통과
 *   border#E9E4F2 on white           /  1.27:1   카드 경계 — 보이는 최소치
 *   strong#8C80A8 on white           /  3.16:1   입력 경계 — WCAG 1.4.11 통과
 */

export const SERENE_PALETTE = {
  /** 아주 옅은 라일락이 도는 종이빛 지면. 순백보다 눈이 편하고 색이 더 정확히 보인다. */
  bg: '#F7F4FB',
  surface: '#FFFFFF',
  surfaceRaised: '#FDFCFE',
  /** 카드 경계. 선으로 가두지 않고 겨우 인지되는 정도만 남긴다. */
  border: '#E9E4F2',
  /** 입력·선택처럼 조작 가능한 요소의 경계. 여기만 3:1을 지킨다. */
  borderStrong: '#8C80A8',
  /** 완전한 검정 대신 보랏빛이 도는 잉크. 지면과 같은 계열이라 부드럽게 앉는다. */
  fg: '#221E2E',
  fgMuted: '#6B6580',
  accent: '#6F5FAE',
  accentFg: '#FFFFFF',
  accentSoft: 'rgb(111 95 174 / 0.09)',
  accentGlow: 'rgb(111 95 174 / 0.16)',
  focus: '#6F5FAE',
} as const;

/** 지면에 깔리는 두 개의 빛무리. 색면이 아니라 빛으로 느껴져야 해서 알파를 아주 낮게 둔다. */
export const SERENE_WASH = {
  /** 좌상단 — 라일락 */
  a: 'rgb(167 139 250 / 0.16)',
  /** 우상단 — 살구빛 */
  b: 'rgb(246 186 196 / 0.18)',
  /** 하단 — 옅은 하늘 */
  c: 'rgb(167 205 246 / 0.14)',
} as const;

/** 형태. 모서리를 크게 굴리고 그림자를 넓게 흩어 부드러움을 만든다. */
export const SERENE_SHAPE = {
  radiusSm: '10px',
  radiusMd: '16px',
  radiusLg: '24px',
  shadowSm: '0 1px 2px rgb(34 30 46 / 0.04)',
  shadowMd: '0 2px 6px rgb(34 30 46 / 0.04), 0 12px 32px rgb(34 30 46 / 0.06)',
  shadowLg: '0 4px 12px rgb(34 30 46 / 0.05), 0 32px 64px rgb(34 30 46 / 0.09)',
} as const;
