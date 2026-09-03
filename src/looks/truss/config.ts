/**
 * 'truss' 룩의 팔레트와 형태 값.
 *
 * 기준으로 삼은 것: 어두운 제도판 위의 뼈대. 그래프 배치를 두 가치로 재는
 * 페이지(/layout)를 위해 만들었다. 이 페이지는 두 가치의 긴장이 주제라
 * 강조색이 둘이다 - 읽기 좋음은 호박빛, 충실함은 청록빛으로 끝까지 같은 뜻으로만 쓴다.
 * 짙은 청록 지면에 이 두 색을 함께 쓰는 것은 이 룩뿐이다.
 *
 * 측정값(APCA Lc / WCAG 대비비, scratchpad의 tr로 실측):
 *   surface(#16262A) 위
 *     fg       #E6F0F0  Lc -94.0 / 13.45:1
 *     fgMuted  #A9BEC0  Lc -62.4 /  8.04:1
 *     accent   #F2B872  Lc -67.6 /  8.83:1   읽기 좋음
 *     second   #7FD4C8  Lc -68.9 /  9.04:1   충실함
 *     border   #2E4449          /  1.52:1
 *     strong   #6C8489  Lc -32.0 /  3.94:1
 *   bg(#0F1A1C) 위
 *     fg Lc -95.6 / 15.27:1   fgMuted Lc -64.0 / 9.13:1
 *     accent Lc -69.2 / 10.02:1   second Lc -70.5 / 10.26:1
 *     border 1.72:1   strong 4.47:1
 *   accentFg #2A1703 on accent  Lc 69.4 / 9.71:1
 *   accent on accentSoft(#33240F)  Lc -67.0 / 8.48:1
 *   second on secondSoft(#0E2F2B)  Lc -67.7 / 8.32:1  (둘 다 WCAG 4.5:1도 넘김)
 */

export const TRUSS_PALETTE = {
  bg: '#0F1A1C',
  surface: '#16262A',
  surfaceRaised: '#1D3136',
  border: '#2E4449',
  borderStrong: '#6C8489',
  fg: '#E6F0F0',
  fgMuted: '#A9BEC0',
  /** 읽기 좋음(미적 지표). */
  accent: '#F2B872',
  accentFg: '#2A1703',
  accentSoft: '#33240F',
  accentGlow: 'rgb(242 184 114 / 0.18)',
  focus: '#F2B872',
} as const;

/** 충실함(DR 품질 지표). */
export const TRUSS_SECOND = {
  second: '#7FD4C8',
  secondFg: '#06231F',
  secondSoft: '#0E2F2B',
} as const;

export const TRUSS_SHAPE = {
  radiusSm: '3px',
  radiusMd: '8px',
  radiusLg: '16px',
  shadowSm: 'none',
  shadowMd: 'inset 0 1px 0 rgb(230 240 240 / 0.04)',
  shadowLg: 'inset 0 1px 0 rgb(230 240 240 / 0.05), 0 16px 38px rgb(0 0 0 / 0.5)',
} as const;

export const TRUSS_TYPE = {
  heading: '"Pretendard", "Noto Sans KR", "Helvetica Neue", system-ui, sans-serif',
  body: '"Pretendard", "Noto Sans KR", system-ui, sans-serif',
  mono: '"JetBrains Mono", "SFMono-Regular", ui-monospace, "Menlo", monospace',
} as const;
