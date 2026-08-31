/**
 * 'pager' 룩의 팔레트와 형태 값.
 *
 * 기준으로 삼은 것: 1990년대 무선호출기. 어두운 플라스틱 몸체와 연둣빛 LCD 한 장.
 * 이 페이지는 도구가 아니라 체험이므로, 화면이 곧 그 시절의 기기처럼 보여야 한다.
 *
 * 측정값(APCA Lc / WCAG 대비비):
 *   fg     #E8E7DC on panel  Lc -86.3 / 10.28:1
 *   muted  #C2C1B2 on panel  Lc -63.1 /  7.03:1
 *   lcd    #C3D94E on panel  Lc -71.4 /  8.12:1
 *   ink    #10160A on screen         /  8.6:1 이상 (LCD 위 글자)
 *   strong #8B8C7E on panel          /  3.74:1
 */

export const PAGER_PALETTE = {
  bg: '#26271F',
  surface: '#32332B',
  surfaceRaised: '#3C3D34',
  border: '#4A4B41',
  borderStrong: '#8B8C7E',
  fg: '#E8E7DC',
  fgMuted: '#C2C1B2',
  /** LCD의 연둣빛. 이 색만 밝게 쓴다. */
  accent: '#C3D94E',
  accentFg: '#1B2410',
  accentSoft: 'rgb(195 217 78 / 0.12)',
  accentGlow: 'rgb(195 217 78 / 0.22)',
  focus: '#C3D94E',
} as const;

/** 액정 그 자체의 색. 배경은 연두, 글자는 거의 검정에 가까운 진녹색이다. */
export const PAGER_LCD = {
  screen: '#A8B884',
  ink: '#10160A',
  /** 액정 위에 깔리는 격자. 도트 매트릭스의 결을 흉내 낸다. */
  grid: 'rgb(16 22 10 / 0.07)',
} as const;

export const PAGER_SHAPE = {
  radiusSm: '3px',
  radiusMd: '6px',
  radiusLg: '10px',
  /* 플라스틱 몸체의 인상: 위쪽 하이라이트와 아래쪽 그림자. */
  shadowSm: 'inset 0 1px 0 rgb(255 255 255 / 0.06)',
  shadowMd: 'inset 0 1px 0 rgb(255 255 255 / 0.07), 0 2px 6px rgb(0 0 0 / 0.35)',
  shadowLg: 'inset 0 1px 0 rgb(255 255 255 / 0.09), 0 12px 32px rgb(0 0 0 / 0.45)',
} as const;

export const PAGER_TYPE = {
  heading: '"Pretendard", "Noto Sans KR", system-ui, sans-serif',
  body: '"Pretendard", "Noto Sans KR", system-ui, sans-serif',
} as const;
