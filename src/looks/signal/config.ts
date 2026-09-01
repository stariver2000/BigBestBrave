/**
 * 'signal' 룩의 팔레트와 형태 값.
 *
 * 기준으로 삼은 것: 불 꺼진 방의 계기 하나. 색이라고는 경고등 하나뿐이다.
 *
 * 왜 무채색인가. 이 페이지가 묻는 것은 "지금 이 말을 할 값이 있는가"이고, 답은 언제나
 * 하나의 통로거나 침묵이다. 색이 여럿이면 눈이 먼저 고르기 시작한다. 그래서 지면과 글자는
 * 완전한 무채색으로 두고, 색은 지금 고를 것 하나와 아직 열려 있는 것 하나에만 남겼다.
 * 이 저장소의 어두운 룩 다섯은 모두 색이 도는 검정이다(올리브·보라·따뜻한 검정·강철·청록).
 * 진짜 무채색 지면은 여기뿐이다.
 *
 * 측정값(APCA Lc / WCAG 대비비), 모두 surface(#191919) 위:
 *   fg      #F2F2F2  Lc -98.1 / 15.71:1
 *   fgMuted #BCBCBC  Lc -65.1 /  9.26:1
 *   accent  #FFA05C  Lc -62.4 /  8.74:1   지금 고를 것
 *   ok      #8FD6B0  Lc -71.6 / 10.39:1   아직 열려 있는 것
 *   border  #3C3C3C          /  1.56:1
 *   strong  #787878  Lc -29.8 /  3.98:1   WCAG 1.4.11 통과
 *   accentFg #170800 on accent  Lc 64.8 / 9.74:1
 *   fg on bg(#121212)  Lc -98.8 / 16.73:1
 */

export const SIGNAL_PALETTE = {
  bg: '#121212',
  surface: '#191919',
  surfaceRaised: '#232323',
  border: '#3C3C3C',
  borderStrong: '#787878',
  fg: '#F2F2F2',
  fgMuted: '#BCBCBC',
  /** 경고등. 이 화면에서 유일하게 시선을 끄는 색이다. */
  accent: '#FFA05C',
  accentFg: '#170800',
  accentSoft: 'rgb(255 160 92 / 0.13)',
  accentGlow: 'rgb(255 160 92 / 0.24)',
  focus: '#FFA05C',
} as const;

/** 아직 값이 남아 있는 것. 창이 열려 있음을 뜻한다. */
export const SIGNAL_OPEN = {
  ok: '#8FD6B0',
  okSoft: 'rgb(143 214 176 / 0.12)',
} as const;

export const SIGNAL_SHAPE = {
  /** 계기에는 곡선이 없다. */
  radiusSm: '1px',
  radiusMd: '2px',
  radiusLg: '3px',
  shadowSm: 'none',
  shadowMd: 'none',
  shadowLg: '0 0 0 1px rgb(242 242 242 / 0.05)',
} as const;

export const SIGNAL_TYPE = {
  heading: '"Pretendard", "Noto Sans KR", "Helvetica Neue", system-ui, sans-serif',
  body: '"Pretendard", "Noto Sans KR", system-ui, sans-serif',
  /** 초와 값이 자리를 지켜야 눈이 표를 훑는다. */
  mono: '"JetBrains Mono", "SFMono-Regular", ui-monospace, "Menlo", monospace',
} as const;
