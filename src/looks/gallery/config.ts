/**
 * 'gallery' 룩의 팔레트와 형태 값.
 *
 * 기준으로 삼은 것: 흰 벽의 전시장. 이 페이지에서 색은 화면이 아니라 뿌린 안개가 낸다.
 * 그래서 지면은 색을 거의 갖지 않고, 강조색도 화면 밖 표시에만 쓴다.
 *
 * 측정값(APCA Lc / WCAG 대비비):
 *   ink    #17171A on sheet  Lc 104.7 / 17.89:1
 *   muted  #5E5E5C on sheet  Lc  82.3 /  6.50:1
 *   amber  #9C5600 on sheet  Lc  77.6 /  5.61:1
 *   sheet  #FFFFFF on amber  Lc -79.1 /  4.92:1
 *   strong #8A8884 on sheet          /  3.54:1
 */

export const GALLERY_PALETTE = {
  bg: '#F2F1EE',
  surface: '#FFFFFF',
  surfaceRaised: '#FFFFFF',
  border: '#E3E2DE',
  borderStrong: '#8A8884',
  fg: '#17171A',
  fgMuted: '#5E5E5C',
  /** 전시장의 안내판 색. 벽이 흰 만큼 강조는 하나면 충분하다. */
  accent: '#9C5600',
  accentFg: '#FFFFFF',
  accentSoft: 'rgb(156 86 0 / 0.08)',
  accentGlow: 'rgb(156 86 0 / 0.16)',
  focus: '#9C5600',
} as const;

export const GALLERY_SHAPE = {
  radiusSm: '2px',
  radiusMd: '3px',
  radiusLg: '4px',
  /** 전시장의 벽에는 그림자가 거의 없다. 층은 아주 옅은 선으로만 만든다. */
  shadowSm: 'none',
  shadowMd: '0 1px 3px rgb(23 23 26 / 0.04)',
  shadowLg: '0 2px 10px rgb(23 23 26 / 0.06)',
} as const;

export const GALLERY_TYPE = {
  heading: '"Pretendard", "Noto Sans KR", "Helvetica Neue", system-ui, sans-serif',
  body: '"Pretendard", "Noto Sans KR", system-ui, sans-serif',
} as const;
