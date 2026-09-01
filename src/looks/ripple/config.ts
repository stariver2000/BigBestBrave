/**
 * 'ripple' 룩의 팔레트와 형태 값.
 *
 * 기준으로 삼은 것: 어두운 유리 아래로 지나가는 떨림. 보랏빛 파동과 초록빛 응답.
 *
 * 왜 두 색인가. 이 화면에는 두 가지가 나란히 있다 — 눈과 귀에는 또렷한데 손끝은
 * 알아채지 못하는 것, 그리고 손끝이 실제로 알아채는 것. 보랏빛은 앞쪽에, 초록빛은
 * 뒤쪽에 끝까지 같은 뜻으로만 쓴다.
 * 이 저장소의 열여덟 룩 가운데 보랏빛을 어두운 지면 위 강조색으로 쓰는 것은 여기뿐이다.
 *
 * 측정값(APCA Lc / WCAG 대비비), 모두 surface(#1C1C25) 위:
 *   fg      #EDEDF4  Lc -94.8 / 14.51:1
 *   fgMuted #B6B6C6  Lc -61.9 /  8.45:1
 *   accent  #C4B0FA  Lc -64.1 /  8.81:1   보이지만 안 느껴지는 것
 *   felt    #7ED4B0  Lc -68.9 /  9.61:1   손끝이 알아채는 것
 *   border  #3A3A48          /  1.51:1
 *   strong  #7C7C90  Lc -31.9 /  4.14:1   WCAG 1.4.11 통과
 *   accentFg #120A22 on accent  Lc 66.7 / 10.01:1
 *   fg on bg(#15151C)  Lc -95.6 / 15.59:1
 */

export const RIPPLE_PALETTE = {
  bg: '#15151C',
  surface: '#1C1C25',
  surfaceRaised: '#252531',
  border: '#3A3A48',
  borderStrong: '#7C7C90',
  fg: '#EDEDF4',
  fgMuted: '#B6B6C6',
  /** 파형. 보이고 들리지만 손끝은 못 가른다. */
  accent: '#C4B0FA',
  accentFg: '#120A22',
  accentSoft: 'rgb(196 176 250 / 0.13)',
  accentGlow: 'rgb(196 176 250 / 0.24)',
  focus: '#C4B0FA',
} as const;

/** 손끝이 실제로 알아채는 것. */
export const RIPPLE_FELT = {
  felt: '#7ED4B0',
  feltSoft: 'rgb(126 212 176 / 0.13)',
} as const;

export const RIPPLE_SHAPE = {
  radiusSm: '3px',
  radiusMd: '7px',
  radiusLg: '14px',
  shadowSm: 'none',
  shadowMd: 'inset 0 1px 0 rgb(237 237 244 / 0.05)',
  shadowLg: 'inset 0 1px 0 rgb(237 237 244 / 0.07), 0 18px 44px rgb(0 0 0 / 0.45)',
} as const;

export const RIPPLE_TYPE = {
  heading: '"Pretendard", "Noto Sans KR", "Helvetica Neue", system-ui, sans-serif',
  body: '"Pretendard", "Noto Sans KR", system-ui, sans-serif',
  mono: '"JetBrains Mono", "SFMono-Regular", ui-monospace, "Menlo", monospace',
} as const;
