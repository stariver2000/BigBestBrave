/**
 * 'cinema' 룩의 팔레트와 형태 값.
 *
 * 기준으로 삼은 것: 불 꺼진 상영관. 자막은 어두운 화면 위에서 읽히는 물건이므로,
 * 자막을 다루는 도구도 같은 조건에서 보여야 결과를 눈으로 판단할 수 있다.
 * 강조색은 방송 자막의 노란색을 그대로 가져왔다.
 *
 * 측정값(APCA Lc / WCAG 대비비):
 *   text    #EDE7DA on panel  Lc -90.9 / 13.71:1
 *   muted   #C0BAAB on panel  Lc -63.6 /  8.73:1
 *   caption #F2D14E on panel  Lc -78.3 / 11.26:1
 *   screen  #14140F on caption Lc 79.5 / 12.32:1   자막색 위의 글자
 *   hair    #33322A on panel          /  1.31:1
 *   strong  #77766A on panel          /  3.69:1
 */

export const CINEMA_PALETTE = {
  /** 상영관의 어둠. 완전한 검정이 아니라 따뜻한 기가 도는 어둠이다. */
  bg: '#14140F',
  surface: '#1E1D17',
  surfaceRaised: '#262519',
  border: '#33322A',
  borderStrong: '#77766A',
  /** 스크린 흰색. 차가운 흰색은 어둠 속에서 눈을 찌른다. */
  fg: '#EDE7DA',
  fgMuted: '#C0BAAB',
  /** 방송 자막의 노란색. 어두운 화면 위에서 가장 잘 읽히는 색이라 관행이 됐다. */
  accent: '#F2D14E',
  accentFg: '#14140F',
  accentSoft: 'rgb(242 209 78 / 0.12)',
  accentGlow: 'rgb(242 209 78 / 0.2)',
  focus: '#F2D14E',
} as const;

/** 화면 위아래의 레터박스와 필름 그레인. */
export const CINEMA_FILM = {
  letterbox: '#0B0B08',
  grain: 'rgb(237 231 218 / 0.028)',
} as const;

export const CINEMA_SHAPE = {
  radiusSm: '2px',
  radiusMd: '4px',
  radiusLg: '6px',
  /** 어둠 속에서는 그림자가 보이지 않는다. 대신 옅은 윤곽선으로 층을 만든다. */
  shadowSm: 'none',
  shadowMd: '0 0 0 1px rgb(237 231 218 / 0.04)',
  shadowLg: '0 0 0 1px rgb(237 231 218 / 0.07), 0 24px 60px rgb(0 0 0 / 0.5)',
} as const;

export const CINEMA_TYPE = {
  heading: '"Pretendard", "Noto Sans KR", "Helvetica Neue", system-ui, sans-serif',
  body: '"Pretendard", "Noto Sans KR", system-ui, sans-serif',
} as const;
