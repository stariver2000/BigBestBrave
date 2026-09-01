/**
 * 'prism' 룩의 팔레트와 형태 값.
 *
 * 기준으로 삼은 것: 지각 실험실의 흰 벽. 자극만 남기고 나머지를 지운 방.
 * 이 논문이 차트의 비계를 걷어내고 원시 자극만 남긴 것과 같은 이유다.
 *
 * 왜 두 색인가. 이 화면의 알맹이가 두 능력의 어긋남이다 - 정확히 읽히는 것과
 * 얼른 눈에 띄는 것. 파랑은 정확히 읽히는 쪽에, 자홍은 눈에 띄는 쪽에 끝까지
 * 같은 뜻으로만 쓴다. 흰 지면 위에 이 두 색을 함께 쓰는 것은 스물다섯 룩 가운데 여기뿐이다.
 *
 * 측정값(APCA Lc / WCAG 대비비):
 *   surface(#FFFFFF) 위
 *     fg       #17181C  Lc 104.5 / 17.74:1
 *     fgMuted  #585D68  Lc  82.7 /  6.60:1
 *     accent   #1D5FB8  Lc  80.4 /  6.21:1   정확히 읽히는 것
 *     pop      #B0248C  Lc  78.7 /  6.04:1   얼른 눈에 띄는 것
 *     border   #C4C9D4          /  1.66:1
 *     strong   #7E8595  Lc  64.6 /  3.70:1   WCAG 1.4.11 통과
 *   bg(#F2F3F6) 위
 *     fg       Lc 97.4 / 15.99:1   accent Lc 73.3 / 5.60:1   pop Lc 71.6 / 5.44:1
 *     border   1.50:1              strong 3.33:1
 *   옅은 바탕 위
 *     accent on #E5EDF9  Lc 69.3 / 5.27:1
 *     pop    on #F8E6F3  Lc 66.9 / 5.06:1
 *   accentFg #FFFFFF on accent  Lc -85.6 / 6.21:1
 *   popFg    #FFFFFF on pop     Lc -84.0 / 6.04:1
 */

export const PRISM_PALETTE = {
  bg: '#F2F3F6',
  surface: '#FFFFFF',
  surfaceRaised: '#F7F8FB',
  border: '#C4C9D4',
  borderStrong: '#7E8595',
  fg: '#17181C',
  fgMuted: '#585D68',
  /** 정확히 읽히는 것. */
  accent: '#1D5FB8',
  accentFg: '#FFFFFF',
  accentSoft: '#E5EDF9',
  accentGlow: 'rgb(29 95 184 / 0.14)',
  focus: '#1D5FB8',
} as const;

/** 얼른 눈에 띄는 것. 정확히 읽히는 것과 따로 논다는 것이 이 화면의 알맹이다. */
export const PRISM_POP = {
  pop: '#B0248C',
  popFg: '#FFFFFF',
  popSoft: '#F8E6F3',
} as const;

export const PRISM_SHAPE = {
  radiusSm: '3px',
  radiusMd: '6px',
  radiusLg: '10px',
  shadowSm: '0 1px 2px rgb(23 24 28 / 0.05)',
  shadowMd: '0 1px 2px rgb(23 24 28 / 0.05), 0 6px 16px rgb(23 24 28 / 0.05)',
  shadowLg: '0 2px 4px rgb(23 24 28 / 0.05), 0 18px 40px rgb(23 24 28 / 0.08)',
} as const;

export const PRISM_TYPE = {
  heading: '"Pretendard", "Noto Sans KR", "Helvetica Neue", system-ui, sans-serif',
  body: '"Pretendard", "Noto Sans KR", system-ui, sans-serif',
  mono: '"JetBrains Mono", "SFMono-Regular", ui-monospace, "Menlo", monospace',
} as const;
