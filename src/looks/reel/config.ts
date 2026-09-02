/**
 * 'reel' 룩의 팔레트와 형태 값.
 *
 * 기준으로 삼은 것: 편집자의 책상. 인화지 같은 따뜻한 종이 위에 대본을 펼쳐 놓고
 * 형광펜 대신 검수 도장을 찍는 자리다. 하우투 대본 진단 페이지(/script)를 위해
 * 만들었다 - 여덟 갈래의 표식색이 페이지 쪽에서 얹히므로, 룩 자체는 종이와
 * 잉크와 단 하나의 구릿빛 강조만 갖는 절제된 바탕이어야 한다.
 *
 * 측정값(APCA Lc / WCAG 대비비, scratchpad의 reel-measure로 실측):
 *   surface(#F9F6EE) 위
 *     fg       #241F15  Lc 98.0 / 15.17:1
 *     fgMuted  #675E4C  Lc 76.5 /  5.92:1
 *     accent   #96430A  Lc 77.4 /  6.26:1
 *     border   #D2C7B1          /  1.55:1
 *     strong   #857A63  Lc 63.9 /  3.92:1
 *   bg(#EDE7DA) 위
 *     fg Lc 89.4 / 13.30:1   fgMuted Lc 67.9 / 5.19:1   accent Lc 68.7 / 5.49:1
 *     strong 3.44:1
 *   accentFg #FFF3E6 on accent  Lc -81.0 / 6.19:1
 *   accent on accentSoft(#F2DEC6)  Lc 65.0 / 5.17:1 (WCAG 4.5:1도 넘김)
 */

export const REEL_PALETTE = {
  bg: '#EDE7DA',
  surface: '#F9F6EE',
  surfaceRaised: '#FFFFFF',
  border: '#D2C7B1',
  borderStrong: '#857A63',
  fg: '#241F15',
  fgMuted: '#675E4C',
  /** 검수 도장의 구릿빛. 지시(Method)의 표식색과 같은 계열로 쓴다. */
  accent: '#96430A',
  accentFg: '#FFF3E6',
  accentSoft: '#F2DEC6',
  accentGlow: 'rgb(150 67 10 / 0.14)',
  focus: '#96430A',
} as const;

export const REEL_SHAPE = {
  radiusSm: '3px',
  radiusMd: '6px',
  radiusLg: '12px',
  shadowSm: 'none',
  shadowMd: '0 1px 2px rgb(36 31 21 / 0.08)',
  shadowLg: '0 2px 6px rgb(36 31 21 / 0.10), 0 12px 32px rgb(36 31 21 / 0.10)',
} as const;

export const REEL_TYPE = {
  heading: '"Pretendard", "Noto Sans KR", "Helvetica Neue", system-ui, sans-serif',
  body: '"Pretendard", "Noto Sans KR", system-ui, sans-serif',
  mono: '"JetBrains Mono", "SFMono-Regular", ui-monospace, "Menlo", monospace',
} as const;
