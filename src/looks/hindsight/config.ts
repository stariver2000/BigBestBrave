/**
 * 'hindsight' 룩의 팔레트와 형태 값.
 *
 * 기준으로 삼은 것: 지난 일을 되짚어 보는 저녁의 차가운 빛.
 *
 * 왜 두 색인가. 이 화면에는 언제나 두 가지가 나란히 있다 — 실제로 있었던 일과,
 * 그러지 않았더라면 어땠을 일. 그래서 남색은 지금 있는 것에, 산호색은 있었을 수도 있던 것에
 * 끝까지 같은 뜻으로만 쓴다. 지면을 차갑고 평평하게 둔 것은 그 둘이 다투지 않게 하기 위해서다.
 *
 * 측정값(APCA Lc / WCAG 대비비), 모두 surface(#F5F7FA) 위:
 *   fg      #161C24  Lc  99.1 / 15.96:1
 *   fgMuted #4E5765  Lc  80.5 /  6.81:1
 *   accent  #2E3A8C  Lc  87.9 /  9.32:1   지금 있는 것
 *   counter #C4553D  Lc  65.3 /  4.15:1   있었을 수도 있던 것
 *   border  #C3CBD5          /  1.51:1
 *   strong  #78838F  Lc  61.2 /  3.60:1   WCAG 1.4.11 통과
 *   accentFg #FFFFFF on accent  Lc -97.0 / 10.00:1
 *   fg on bg(#ECEFF3)  Lc 94.3 / 14.85:1
 */

export const HINDSIGHT_PALETTE = {
  bg: '#ECEFF3',
  surface: '#F5F7FA',
  surfaceRaised: '#FBFCFD',
  border: '#C3CBD5',
  borderStrong: '#78838F',
  fg: '#161C24',
  fgMuted: '#4E5765',
  /** 실제로 있었던 일. */
  accent: '#2E3A8C',
  accentFg: '#FFFFFF',
  accentSoft: 'rgb(46 58 140 / 0.09)',
  accentGlow: 'rgb(46 58 140 / 0.18)',
  focus: '#2E3A8C',
} as const;

/** 있었을 수도 있던 일. 반사실에만 쓴다. */
export const HINDSIGHT_COUNTER = {
  counter: '#C4553D',
  counterSoft: 'rgb(196 85 61 / 0.1)',
} as const;

export const HINDSIGHT_SHAPE = {
  radiusSm: '2px',
  radiusMd: '4px',
  radiusLg: '6px',
  shadowSm: 'none',
  shadowMd: '0 1px 2px rgb(22 28 36 / 0.05)',
  shadowLg: '0 1px 2px rgb(22 28 36 / 0.05), 0 10px 26px rgb(22 28 36 / 0.06)',
} as const;

export const HINDSIGHT_TYPE = {
  heading: '"Pretendard", "Noto Sans KR", "Helvetica Neue", system-ui, sans-serif',
  body: '"Pretendard", "Noto Sans KR", system-ui, sans-serif',
  mono: '"JetBrains Mono", "SFMono-Regular", ui-monospace, "Menlo", monospace',
} as const;
