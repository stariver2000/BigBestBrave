/**
 * 'pulse' 룩의 팔레트와 형태 값.
 *
 * 기준으로 삼은 것: 눈을 감았을 때의 어둠과, 거기서 느껴지는 맥박.
 * 이 페이지는 보는 것이 아니라 느끼는 것을 다루므로, 화면은 물러나고 하나의 색만 남는다.
 *
 * 측정값(APCA Lc / WCAG 대비비):
 *   fg     #EFE7F2 on panel  Lc -92.0 / 13.73:1
 *   muted  #C4B8CD on panel  Lc -64.5 /  8.75:1
 *   coral  #FFA595 on panel  Lc -64.7 /  7.9:1   글자로도 쓰인다
 *   ink    #17131C on coral  Lc  66.9            산호색 위의 글자
 *   strong #8B7F98 on panel          /  4.41:1
 */

export const PULSE_PALETTE = {
  bg: '#17131C',
  surface: '#221C29',
  surfaceRaised: '#2C2434',
  border: '#3A3145',
  borderStrong: '#8B7F98',
  fg: '#EFE7F2',
  fgMuted: '#C4B8CD',
  /** 맥박의 색. 살갗 아래에서 비치는 붉은빛에서 가져왔다. */
  accent: '#FFA595',
  accentFg: '#17131C',
  accentSoft: 'rgb(255 165 149 / 0.12)',
  accentGlow: 'rgb(255 165 149 / 0.22)',
  focus: '#FFA595',
} as const;

/** 지면에 아주 옅게 번지는 두 개의 빛. 어둠이 완전히 죽지 않게 한다. */
export const PULSE_WASH = {
  a: 'rgb(255 165 149 / 0.10)',
  b: 'rgb(149 165 255 / 0.08)',
} as const;

export const PULSE_SHAPE = {
  /** 모두 둥글게. 진동은 각이 없다. */
  radiusSm: '10px',
  radiusMd: '18px',
  radiusLg: '28px',
  shadowSm: 'none',
  shadowMd: '0 0 0 1px rgb(239 231 242 / 0.05)',
  shadowLg: '0 0 0 1px rgb(239 231 242 / 0.07), 0 30px 70px rgb(0 0 0 / 0.5)',
} as const;

export const PULSE_TYPE = {
  heading: '"Pretendard", "Noto Sans KR", system-ui, sans-serif',
  body: '"Pretendard", "Noto Sans KR", system-ui, sans-serif',
} as const;
