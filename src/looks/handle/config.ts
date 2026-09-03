/**
 * 'handle' 룩의 팔레트와 형태 값.
 *
 * 기준으로 삼은 것: 밝은 작업대에 놓인 손잡이. 그림을 손으로 잡아 고치는
 * 페이지(/handles)를 위해 만들었다. 잡을 수 있는 것은 보랏빛, 코드 쪽에서
 * 짝을 이루는 것은 짙은 청록으로 끝까지 같은 뜻으로만 쓴다.
 * 밝은 연보라 지면에 이 두 색을 함께 쓰는 것은 이 룩뿐이다.
 *
 * 측정값(APCA Lc / WCAG 대비비, scratchpad의 hd·hd2·hd3로 실측):
 *   surface(#FAF9FC) 위
 *     fg       #1E1B26  Lc 100.5 / 16.15:1
 *     fgMuted  #5B5668  Lc  81.1 /  6.73:1
 *     accent   #6D3BD4  Lc  78.1 /  6.21:1   잡을 수 있는 것
 *     second   #0A6659  Lc  80.0 /  6.55:1   코드 쪽 짝
 *     border   #CDC8DA          /  1.56:1
 *     strong   #7E7890  Lc  65.8 /  4.02:1
 *   bg(#EDEBF2) 위
 *     fg Lc 92.6 / 14.33:1   fgMuted Lc 73.2 / 5.97:1
 *     accent Lc 70.1 / 5.51:1   second Lc 72.0 / 5.81:1
 *     border 1.31:1(장식용)   strong 3.57:1
 *   accentFg #F6EEFF on accent  Lc -77.4 / 5.76:1
 *   accent on accentSoft(#EADFFA)  Lc 65.2 / 5.09:1
 *   second on secondSoft(#DAEFEA)  Lc 71.1 / 5.73:1  (둘 다 WCAG 4.5:1도 넘김)
 */

export const HANDLE_PALETTE = {
  bg: '#EDEBF2',
  surface: '#FAF9FC',
  surfaceRaised: '#FFFFFF',
  border: '#CDC8DA',
  borderStrong: '#7E7890',
  fg: '#1E1B26',
  fgMuted: '#5B5668',
  /** 잡을 수 있는 것. */
  accent: '#6D3BD4',
  accentFg: '#F6EEFF',
  accentSoft: '#EADFFA',
  accentGlow: 'rgb(109 59 212 / 0.16)',
  focus: '#6D3BD4',
} as const;

/** 코드 쪽에서 짝을 이루는 것. */
export const HANDLE_SECOND = {
  second: '#0A6659',
  secondFg: '#EAF7F4',
  secondSoft: '#DAEFEA',
} as const;

export const HANDLE_SHAPE = {
  radiusSm: '4px',
  radiusMd: '9px',
  radiusLg: '18px',
  shadowSm: 'none',
  shadowMd: '0 1px 2px rgb(30 27 38 / 0.07)',
  shadowLg: '0 2px 6px rgb(30 27 38 / 0.09), 0 14px 34px rgb(30 27 38 / 0.10)',
} as const;

export const HANDLE_TYPE = {
  heading: '"Pretendard", "Noto Sans KR", "Helvetica Neue", system-ui, sans-serif',
  body: '"Pretendard", "Noto Sans KR", system-ui, sans-serif',
  mono: '"JetBrains Mono", "SFMono-Regular", ui-monospace, "Menlo", monospace',
} as const;

/**
 * 차트 계열 넷의 색. 같은 지면에서 실측했다 - 모두 surface 위 APCA |Lc| >= 70.6,
 * WCAG >= 4.74:1이고 bg 위에서도 |Lc| >= 62.6이다. 강조색(보라)과 섞이지 않게
 * 넷째를 황토로 두었다.
 */
export const HANDLE_SERIES = ['#1C6BA8', '#B2543A', '#4A6B1F', '#8A6420'] as const;
