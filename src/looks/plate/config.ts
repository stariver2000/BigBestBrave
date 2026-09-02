/**
 * 'plate' 룩의 팔레트와 형태 값.
 *
 * 기준으로 삼은 것: 도판 보관실. 인쇄소에서 책의 도판(plate)을 고르던 책상 -
 * 차분한 회백 종이 위에 도판 견본을 늘어놓고 자두빛 도장으로 고른 것을 찍는다.
 * 그림 계획 페이지(/figure)를 위해 만들었다. 자료 유형의 네 갈래색은 페이지
 * 쪽에서 얹히므로 룩 자체는 종이와 잉크와 자두빛 하나로 절제한다.
 *
 * 측정값(APCA Lc / WCAG 대비비, scratchpad의 plate-measure로 실측):
 *   surface(#F7F6F2) 위
 *     fg       #211F1C  Lc 98.0 / 15.20:1
 *     fgMuted  #615D54  Lc 77.1 /  6.06:1
 *     accent   #7C2D57  Lc 84.2 /  8.19:1
 *     border   #CDCBC2          /  1.50:1
 *     strong   #7E7A6F  Lc 64.2 /  3.96:1
 *   bg(#E9E8E3) 위
 *     fg Lc 89.7 / 13.40:1   fgMuted Lc 68.8 / 5.35:1   accent Lc 76.0 / 7.22:1
 *     strong 3.49:1
 *   accentFg #FDEFF5 on accent  Lc -85.9 / 7.95:1
 *   accent on accentSoft(#F0DAE5)  Lc 71.3 / 6.69:1 (WCAG 4.5:1도 넘김)
 */

export const PLATE_PALETTE = {
  bg: '#E9E8E3',
  surface: '#F7F6F2',
  surfaceRaised: '#FFFFFF',
  border: '#CDCBC2',
  borderStrong: '#7E7A6F',
  fg: '#211F1C',
  fgMuted: '#615D54',
  /** 고른 도판에 찍는 자두빛 도장. */
  accent: '#7C2D57',
  accentFg: '#FDEFF5',
  accentSoft: '#F0DAE5',
  accentGlow: 'rgb(124 45 87 / 0.13)',
  focus: '#7C2D57',
} as const;

export const PLATE_SHAPE = {
  radiusSm: '2px',
  radiusMd: '5px',
  radiusLg: '10px',
  shadowSm: 'none',
  shadowMd: '0 1px 2px rgb(33 31 28 / 0.07)',
  shadowLg: '0 2px 5px rgb(33 31 28 / 0.08), 0 10px 28px rgb(33 31 28 / 0.09)',
} as const;

export const PLATE_TYPE = {
  heading: '"Pretendard", "Noto Sans KR", "Helvetica Neue", system-ui, sans-serif',
  body: '"Pretendard", "Noto Sans KR", system-ui, sans-serif',
  mono: '"JetBrains Mono", "SFMono-Regular", ui-monospace, "Menlo", monospace',
} as const;
