/**
 * 'veil' 룩의 팔레트와 형태 값.
 *
 * 기준으로 삼은 것: 얇은 장막 뒤의 방. 화면은 멀쩡해 보이는데, 그 뒤에 손짓으로만
 * 열리는 기능이 숨어 있다. 이 페이지가 다루는 것이 바로 그 장막이다.
 *
 * 왜 두 색인가. 이 화면에는 두 상태가 있다 - 아직 숨어 있는 것과 손짓으로 드러난 것.
 * 연보라는 장막(숨은 것)에, 복숭아빛은 드러난 것에 끝까지 같은 뜻으로만 쓴다.
 * 어두운 지면 위 복숭아빛 강조색은 스물일곱 룩 가운데 여기뿐이다.
 *
 * 측정값(APCA Lc / WCAG 대비비):
 *   surface(#211E2B) 위
 *     fg       #EFEDF4  Lc -94.6 / 14.08:1
 *     fgMuted  #B7B3C4  Lc -60.3 /  7.98:1
 *     accent   #FFAD7E  Lc -66.7 /  8.97:1   드러난 것
 *     veil     #B2BAF4  Lc -65.0 /  8.73:1   숨은 것
 *     border   #413D52          /  1.57:1
 *     strong   #7E7994  Lc -30.9 /  3.93:1   WCAG 1.4.11 통과
 *   bg(#191722) 위
 *     fg       Lc -95.6 / 15.24:1   accent Lc -67.6 / 9.71:1   veil Lc -66.0 / 9.45:1
 *     border   1.70:1               strong 4.25:1
 *   옅은 바탕 위
 *     accent on #38251C  Lc -65.0 / 7.95:1
 *     veil   on #232741  Lc -63.5 / 7.80:1
 *   accentFg #301403 on accent  Lc 67.8 / 9.40:1
 *   veilFg   #101331 on veil    Lc 67.2 / 9.68:1
 */

export const VEIL_PALETTE = {
  bg: '#191722',
  surface: '#211E2B',
  surfaceRaised: '#2A2637',
  border: '#413D52',
  borderStrong: '#7E7994',
  fg: '#EFEDF4',
  fgMuted: '#B7B3C4',
  /** 손짓으로 드러난 것. */
  accent: '#FFAD7E',
  accentFg: '#301403',
  accentSoft: '#38251C',
  accentGlow: 'rgb(255 173 126 / 0.20)',
  focus: '#FFAD7E',
} as const;

/** 아직 숨어 있는 것. 장막의 연보라. */
export const VEIL_HIDDEN = {
  veil: '#B2BAF4',
  veilFg: '#101331',
  veilSoft: '#232741',
} as const;

export const VEIL_SHAPE = {
  radiusSm: '6px',
  radiusMd: '12px',
  radiusLg: '20px',
  shadowSm: 'none',
  shadowMd: 'inset 0 1px 0 rgb(239 237 244 / 0.05)',
  shadowLg: 'inset 0 1px 0 rgb(239 237 244 / 0.07), 0 18px 44px rgb(0 0 0 / 0.5)',
} as const;

export const VEIL_TYPE = {
  heading: '"Pretendard", "Noto Sans KR", "Helvetica Neue", system-ui, sans-serif',
  body: '"Pretendard", "Noto Sans KR", system-ui, sans-serif',
  mono: '"JetBrains Mono", "SFMono-Regular", ui-monospace, "Menlo", monospace',
} as const;
