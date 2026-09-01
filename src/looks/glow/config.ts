/**
 * 'glow' 룩의 팔레트와 형태 값.
 *
 * 기준으로 삼은 것: 불 꺼진 방에서 혼자 빛나는 화면. 이 페이지가 다루는 것이 바로
 * 그 화면을 내려놓는 일이다.
 *
 * 왜 두 색인가. 이 화면에는 두 개의 빛이 있다 - 붙잡는 빛과 놓아 주는 빛.
 * 차가운 화면빛 파랑은 계속 보는 쪽에, 따뜻한 등불 호박색은 내려놓는 쪽에 끝까지
 * 같은 뜻으로만 쓴다. 이 저장소의 스물네 룩 가운데 차가운 화면빛 파랑을 어두운 지면의
 * 강조색으로 쓰는 것은 여기뿐이다.
 *
 * 측정값(APCA Lc / WCAG 대비비):
 *   surface(#17171D) 위
 *     fg       #EAEAF0  Lc -93.4 / 14.89:1
 *     fgMuted  #B6B7C4  Lc -62.8 /  8.97:1
 *     accent   #A8C7FF  Lc -71.0 / 10.43:1   붙잡는 빛
 *     warm     #FFC46B  Lc -76.0 / 11.35:1   놓아 주는 빛
 *     border   #383945          /  1.56:1
 *     strong   #71737F  Lc -27.9 /  3.79:1   WCAG 1.4.11 통과
 *   bg(#101014) 위
 *     fg       Lc -94.0 / 15.84:1   accent Lc -71.6 / 11.10:1   warm Lc -76.6 / 12.08:1
 *     border   1.66:1               strong 4.03:1
 *   옅은 바탕 위
 *     accent on #1A2438  Lc -69.3 /  9.07:1
 *     warm   on #2E2312  Lc -74.2 /  9.79:1
 *   accentFg #0A1330 on accent  Lc 71.9 / 10.69:1
 *   warmFg   #2B1A02 on warm    Lc 75.4 / 10.68:1
 */

export const GLOW_PALETTE = {
  bg: '#101014',
  surface: '#17171D',
  surfaceRaised: '#1F2028',
  border: '#383945',
  borderStrong: '#71737F',
  fg: '#EAEAF0',
  fgMuted: '#B6B7C4',
  /** 붙잡는 빛. 화면의 차가운 파랑. */
  accent: '#A8C7FF',
  accentFg: '#0A1330',
  accentSoft: '#1A2438',
  accentGlow: 'rgb(168 199 255 / 0.22)',
  focus: '#A8C7FF',
} as const;

/** 놓아 주는 빛. 방의 따뜻한 호박색. */
export const GLOW_WARM = {
  warm: '#FFC46B',
  warmFg: '#2B1A02',
  warmSoft: '#2E2312',
} as const;

export const GLOW_SHAPE = {
  radiusSm: '6px',
  radiusMd: '12px',
  radiusLg: '22px',
  shadowSm: 'none',
  shadowMd: 'inset 0 1px 0 rgb(234 234 240 / 0.04)',
  shadowLg: 'inset 0 1px 0 rgb(234 234 240 / 0.06), 0 20px 48px rgb(0 0 0 / 0.55)',
} as const;

export const GLOW_TYPE = {
  heading: '"Pretendard", "Noto Sans KR", "Helvetica Neue", system-ui, sans-serif',
  body: '"Pretendard", "Noto Sans KR", system-ui, sans-serif',
  mono: '"JetBrains Mono", "SFMono-Regular", ui-monospace, "Menlo", monospace',
} as const;
