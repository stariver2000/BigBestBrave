/**
 * 'aperture' 룩의 팔레트와 형태 값.
 *
 * 기준으로 삼은 것: 광학대 위의 조리개. 어두운 실험대에서 여러 손잡이를 돌려
 * 상이 맺힐 때까지 초점을 맞추는 자리다. 특징 가중치를 돌려 투영이 또렷해지는
 * 것을 보는 페이지(/lens)를 위해 만들었다. 세 무리의 색은 페이지 쪽에서 얹히므로
 * 룩 자체는 어두운 판과 호박빛 초점 하나로 절제한다.
 *
 * 측정값(APCA Lc / WCAG 대비비, scratchpad의 ap·ap2로 실측):
 *   surface(#1A2029) 위
 *     fg       #E9EDF2  Lc -93.7 / 13.93:1
 *     fgMuted  #B0B9C6  Lc -62.0 /  8.27:1
 *     accent   #E9B44C  Lc -64.6 /  8.65:1
 *     border   #37414E          /  1.58:1
 *     strong   #6E7A88  Lc -29.3 /  3.74:1
 *   bg(#12161B) 위
 *     fg Lc -94.9 / 15.45:1   fgMuted Lc -63.2 / 9.17:1   accent Lc -65.8 / 9.60:1
 *     border 1.75:1   strong 4.15:1
 *   accentFg #241703 on accent  Lc 66.3 / 9.26:1
 *   accent on accentSoft(#2E2513)  Lc -63.5 / 7.98:1 (WCAG 4.5:1도 넘김)
 */

export const APERTURE_PALETTE = {
  bg: '#12161B',
  surface: '#1A2029',
  surfaceRaised: '#212936',
  border: '#37414E',
  borderStrong: '#6E7A88',
  fg: '#E9EDF2',
  fgMuted: '#B0B9C6',
  /** 초점이 맞은 자리의 호박빛. */
  accent: '#E9B44C',
  accentFg: '#241703',
  accentSoft: '#2E2513',
  accentGlow: 'rgb(233 180 76 / 0.20)',
  focus: '#E9B44C',
} as const;

export const APERTURE_SHAPE = {
  radiusSm: '3px',
  radiusMd: '7px',
  radiusLg: '14px',
  shadowSm: 'none',
  shadowMd: 'inset 0 1px 0 rgb(233 237 242 / 0.04)',
  shadowLg: 'inset 0 1px 0 rgb(233 237 242 / 0.05), 0 14px 36px rgb(0 0 0 / 0.55)',
} as const;

export const APERTURE_TYPE = {
  heading: '"Pretendard", "Noto Sans KR", "Helvetica Neue", system-ui, sans-serif',
  body: '"Pretendard", "Noto Sans KR", system-ui, sans-serif',
  mono: '"JetBrains Mono", "SFMono-Regular", ui-monospace, "Menlo", monospace',
} as const;
