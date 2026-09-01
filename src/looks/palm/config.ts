/**
 * 'palm' 룩의 팔레트와 형태 값.
 *
 * 기준으로 삼은 것: 손바닥의 온기. 살빛이 도는 흰 지면에 장미빛과 청회색.
 *
 * 왜 두 색인가. 이 화면에는 언제나 두 앎이 맞선다 — 눈이 보는 크기와 손이 쥔 크기.
 * 장미빛은 눈에, 청회색은 손에 끝까지 같은 뜻으로만 쓴다.
 * 이 저장소의 열일곱 룩 가운데 장미빛을 강조색으로 쓰는 것은 여기뿐이다.
 *
 * 측정값(APCA Lc / WCAG 대비비), 모두 surface(#FBF8F7) 위:
 *   fg      #1E1A19  Lc 100.3 / 16.33:1
 *   fgMuted #57504E  Lc  83.5 /  7.46:1
 *   accent  #A8365E  Lc  76.4 /  5.92:1   눈이 보는 것
 *   touch   #3F5A6B  Lc  81.4 /  6.89:1   손이 쥔 것
 *   border  #D6CAC7          /  1.51:1
 *   strong  #8C7F7C  Lc  62.2 /  3.65:1   WCAG 1.4.11 통과
 *   accentFg #FFFFFF on accent  Lc -85.5 / 6.26:1
 *   fg on bg(#F5F1F0)  Lc 96.3 / 15.38:1
 */

export const PALM_PALETTE = {
  bg: '#F5F1F0',
  surface: '#FBF8F7',
  surfaceRaised: '#FFFFFF',
  border: '#D6CAC7',
  borderStrong: '#8C7F7C',
  fg: '#1E1A19',
  fgMuted: '#57504E',
  /** 눈이 보는 것. */
  accent: '#A8365E',
  accentFg: '#FFFFFF',
  accentSoft: 'rgb(168 54 94 / 0.1)',
  accentGlow: 'rgb(168 54 94 / 0.2)',
  focus: '#A8365E',
} as const;

/** 손이 쥔 것. */
export const PALM_TOUCH = {
  touch: '#3F5A6B',
  touchSoft: 'rgb(63 90 107 / 0.11)',
} as const;

export const PALM_SHAPE = {
  radiusSm: '4px',
  radiusMd: '10px',
  /** 손에 쥐는 것을 다루는 화면이라 모서리를 넉넉히 굴린다. */
  radiusLg: '18px',
  shadowSm: 'none',
  shadowMd: '0 1px 2px rgb(30 26 25 / 0.05)',
  shadowLg: '0 1px 2px rgb(30 26 25 / 0.05), 0 12px 28px rgb(30 26 25 / 0.07)',
} as const;

export const PALM_TYPE = {
  heading: '"Pretendard", "Noto Sans KR", "Helvetica Neue", system-ui, sans-serif',
  body: '"Pretendard", "Noto Sans KR", system-ui, sans-serif',
  mono: '"JetBrains Mono", "SFMono-Regular", ui-monospace, "Menlo", monospace',
} as const;
