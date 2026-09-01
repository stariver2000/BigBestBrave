/**
 * 'dyad' 룩의 팔레트와 형태 값.
 *
 * 기준으로 삼은 것: 둘이 마주 앉은 저녁의 방. 세피아 어둠에 등불 하나.
 *
 * 왜 두 색인가. 이 화면에는 언제나 두 사람이 있고, 어느 쪽이 한 말인지가 뜻의 전부다.
 * 그래서 금빛은 나에게, 연보라는 상대에게 끝까지 같은 뜻으로만 쓴다.
 * 지면을 따뜻한 어둠으로 둔 것은 남의 눈에 비친 나를 보는 일이 서늘하기 때문이다.
 * 이 저장소의 어두운 룩 여섯 중 갈색 계열은 여기뿐이다.
 *
 * 측정값(APCA Lc / WCAG 대비비), 모두 surface(#241E1A) 위:
 *   fg      #F2ECE4  Lc -93.9 / 14.03:1
 *   fgMuted #C6B9AC  Lc -63.7 /  8.57:1
 *   accent  #D9B36C  Lc -62.3 /  8.32:1   나
 *   other   #AFBDE2  Lc -65.0 /  8.78:1   상대
 *   border  #453B34          /  1.51:1
 *   strong  #8B7A6E  Lc -31.4 /  4.00:1   WCAG 1.4.11 통과
 *   accentFg #1A1204 on accent  Lc 64.8 / 9.38:1
 *   fg on bg(#1C1714)  Lc -94.8 / 15.14:1
 */

export const DYAD_PALETTE = {
  bg: '#1C1714',
  surface: '#241E1A',
  surfaceRaised: '#2E2722',
  border: '#453B34',
  borderStrong: '#8B7A6E',
  fg: '#F2ECE4',
  fgMuted: '#C6B9AC',
  /** 나. 등불의 금빛이다. */
  accent: '#D9B36C',
  accentFg: '#1A1204',
  accentSoft: 'rgb(217 179 108 / 0.13)',
  accentGlow: 'rgb(217 179 108 / 0.24)',
  focus: '#D9B36C',
} as const;

/** 상대. 창밖에서 드는 빛의 색이다. */
export const DYAD_OTHER = {
  other: '#AFBDE2',
  otherSoft: 'rgb(175 189 226 / 0.13)',
} as const;

export const DYAD_SHAPE = {
  radiusSm: '3px',
  radiusMd: '6px',
  radiusLg: '10px',
  shadowSm: 'none',
  shadowMd: 'inset 0 1px 0 rgb(242 236 228 / 0.05)',
  shadowLg: 'inset 0 1px 0 rgb(242 236 228 / 0.07), 0 20px 46px rgb(0 0 0 / 0.42)',
} as const;

export const DYAD_TYPE = {
  heading: '"Pretendard", "Noto Sans KR", "Helvetica Neue", system-ui, sans-serif',
  body: '"Pretendard", "Noto Sans KR", system-ui, sans-serif',
  /** 주고받는 코드는 손으로 옮겨 적을 수 있어야 하므로 자리가 고른 글꼴로. */
  mono: '"JetBrains Mono", "SFMono-Regular", ui-monospace, "Menlo", monospace',
} as const;
