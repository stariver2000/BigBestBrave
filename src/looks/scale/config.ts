/**
 * 'scale' 룩의 팔레트와 형태 값.
 *
 * 기준으로 삼은 것: 장부와 저울. 논문의 제목이 "기울기 직전의 저울에 작은 추를 얹는 것"이다.
 *
 * 왜 두 가지 색인가. 이 화면은 처음부터 끝까지 두 가지를 맞바꾼다 — 얼마나 해내는가와
 * 얼마가 드는가. 파레토 앞면이라는 것 자체가 그 맞바꿈의 그림이다. 그래서 색을 둘 두고,
 * 하나는 성공 쪽(짙은 청록), 하나는 비용 쪽(구리)으로 끝까지 같은 뜻으로만 쓴다.
 *
 * 측정값(APCA Lc / WCAG 대비비), 모두 surface(#F7F3F2) 위:
 *   fg      #1E2A28  Lc  95.0 / 13.45:1
 *   fgMuted #5A5250  Lc  79.8 /  6.91:1
 *   accent  #0F6B62  Lc  74.6 /  5.78:1   성공 쪽
 *   cost    #9C5B33  Lc  69.4 /  4.82:1   비용 쪽
 *   border  #CFC4C2          /  1.55:1
 *   strong  #8E817E  Lc  58.4 /  3.41:1   WCAG 1.4.11 통과
 *   accentFg #FFFFFF on accent  Lc -86.4 / 6.36:1
 *   fg on bg(#F0EBEA)  Lc 90.4 / 12.54:1
 */

export const SCALE_PALETTE = {
  /** 오래 쓴 장부의 종이. 따뜻한 회색에 붉은 기가 조금 남아 있다. */
  bg: '#F0EBEA',
  surface: '#F7F3F2',
  surfaceRaised: '#FBF9F8',
  border: '#CFC4C2',
  borderStrong: '#8E817E',
  fg: '#1E2A28',
  fgMuted: '#5A5250',
  /** 성공 쪽. 저울의 한 접시다. */
  accent: '#0F6B62',
  accentFg: '#FFFFFF',
  accentSoft: 'rgb(15 107 98 / 0.1)',
  accentGlow: 'rgb(15 107 98 / 0.2)',
  focus: '#0F6B62',
} as const;

/** 비용 쪽. 저울의 다른 접시이고, 추의 색이다. */
export const SCALE_COST = {
  cost: '#9C5B33',
  costSoft: 'rgb(156 91 51 / 0.1)',
} as const;

export const SCALE_SHAPE = {
  radiusSm: '2px',
  radiusMd: '3px',
  radiusLg: '5px',
  shadowSm: 'none',
  /** 종이 위에 놓인 종이. 그림자는 아주 얕게. */
  shadowMd: '0 1px 0 rgb(30 42 40 / 0.06)',
  shadowLg: '0 1px 0 rgb(30 42 40 / 0.06), 0 8px 20px rgb(30 42 40 / 0.05)',
} as const;

export const SCALE_TYPE = {
  heading: '"Pretendard", "Noto Sans KR", "Helvetica Neue", system-ui, sans-serif',
  body: '"Pretendard", "Noto Sans KR", system-ui, sans-serif',
  /** 금액과 확률이 자리를 지켜야 장부로 읽힌다. */
  mono: '"JetBrains Mono", "SFMono-Regular", ui-monospace, "Menlo", monospace',
} as const;
