/**
 * 'atlas' 룩의 팔레트와 형태 값.
 *
 * 기준으로 삼은 것: 접었다 편 종이 지도. 길은 초록 실선, 내가 고른 길은 자홍 굵은 선.
 *
 * 왜 두 색인가. 이 화면에는 도시의 모든 길이 있고 그중 내가 지나온 길이 있다.
 * 초록은 길 그 자체에, 자홍은 내가 고른 자취에 끝까지 같은 뜻으로만 쓴다.
 * 자홍은 이 저장소의 열다섯 룩 가운데 처음 쓰는 색이다.
 *
 * 측정값(APCA Lc / WCAG 대비비), 모두 surface(#FAF8F6) 위:
 *   fg      #1B1916  Lc 100.4 / 16.56:1
 *   fgMuted #57514A  Lc  83.2 /  7.39:1
 *   accent  #A8296F  Lc  77.2 /  6.17:1   내가 지나온 자취
 *   road    #2F6F5E  Lc  75.3 /  5.57:1   길 그 자체
 *   border  #CFC7BE          /  1.55:1
 *   strong  #8A8177  Lc  61.8 /  3.61:1   WCAG 1.4.11 통과
 *   accentFg #FFFFFF on accent  Lc -86.3 / 6.54:1
 *   fg on bg(#F3F1EE)  Lc 96.2 / 15.56:1
 */

export const ATLAS_PALETTE = {
  /** 오래 접어 둔 지도의 종이. */
  bg: '#F3F1EE',
  surface: '#FAF8F6',
  surfaceRaised: '#FFFFFF',
  border: '#CFC7BE',
  borderStrong: '#8A8177',
  fg: '#1B1916',
  fgMuted: '#57514A',
  /** 내가 지나온 자취. */
  accent: '#A8296F',
  accentFg: '#FFFFFF',
  accentSoft: 'rgb(168 41 111 / 0.1)',
  accentGlow: 'rgb(168 41 111 / 0.2)',
  focus: '#A8296F',
} as const;

/** 길 그 자체. 지도에 인쇄된 선의 색이다. */
export const ATLAS_ROAD = {
  road: '#2F6F5E',
  roadSoft: 'rgb(47 111 94 / 0.14)',
} as const;

export const ATLAS_SHAPE = {
  radiusSm: '2px',
  radiusMd: '3px',
  radiusLg: '5px',
  shadowSm: 'none',
  shadowMd: '0 1px 0 rgb(27 25 22 / 0.05)',
  shadowLg: '0 1px 0 rgb(27 25 22 / 0.05), 0 10px 22px rgb(27 25 22 / 0.06)',
} as const;

export const ATLAS_TYPE = {
  heading: '"Pretendard", "Noto Sans KR", "Helvetica Neue", system-ui, sans-serif',
  body: '"Pretendard", "Noto Sans KR", system-ui, sans-serif',
  mono: '"JetBrains Mono", "SFMono-Regular", ui-monospace, "Menlo", monospace',
} as const;
