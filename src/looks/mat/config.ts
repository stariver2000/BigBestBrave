/**
 * 'mat' 룩의 팔레트와 형태 값.
 *
 * 기준으로 삼은 것: 밤의 책상 매트. 손은 매트 위에서 움직이고, 화면의 커서는
 * 그 움직임의 번역이다. 이 페이지가 다루는 것이 바로 그 번역의 오차라서,
 * 지면은 매트의 회청 고무빛으로 가라앉히고 강조는 형광 민트 한 색만 쓴다.
 *
 * 왜 민트인가. 이 화면의 볼거리는 궤적이다 - 어두운 매트 위에 형광 잉크로
 * 그은 듯한 줄. 어두운 지면 위 민트빛 강조는 서른두 룩 가운데 여기뿐이다.
 *
 * 측정값(APCA Lc / WCAG 대비비):
 *   surface(#1E222A) 위
 *     fg       #ECEFF4  Lc -95.9 / 13.68:1
 *     fgMuted  #B4BBC9  Lc -63.7 /  8.11:1
 *     accent   #6FE0CE  Lc -74.3 /  9.62:1
 *     border   #3A414F          /  1.62:1
 *     strong   #7C8598  Lc -35.9 /  4.14:1   WCAG 1.4.11 통과
 *   bg(#171A1F) 위
 *     fg Lc -97.5 / 15.29:1   accent Lc -75.9 / 10.75:1
 *   accentFg #06261F on accent  Lc 78.9 / 8.53:1
 */

export const MAT_PALETTE = {
  bg: '#171A1F',
  surface: '#1E222A',
  surfaceRaised: '#262B35',
  border: '#3A414F',
  borderStrong: '#7C8598',
  fg: '#ECEFF4',
  fgMuted: '#B4BBC9',
  /** 매트 위의 형광 잉크. 궤적과 조작에 같은 뜻으로 쓴다. */
  accent: '#6FE0CE',
  accentFg: '#06261F',
  accentSoft: '#15342E',
  accentGlow: 'rgb(111 224 206 / 0.18)',
  focus: '#6FE0CE',
} as const;

export const MAT_SHAPE = {
  radiusSm: '6px',
  radiusMd: '10px',
  radiusLg: '18px',
  shadowSm: 'none',
  shadowMd: 'inset 0 1px 0 rgb(236 239 244 / 0.05)',
  shadowLg: 'inset 0 1px 0 rgb(236 239 244 / 0.06), 0 16px 40px rgb(0 0 0 / 0.5)',
} as const;

export const MAT_TYPE = {
  heading: '"Pretendard", "Noto Sans KR", "Helvetica Neue", system-ui, sans-serif',
  body: '"Pretendard", "Noto Sans KR", system-ui, sans-serif',
  mono: '"JetBrains Mono", "SFMono-Regular", ui-monospace, "Menlo", monospace',
} as const;
