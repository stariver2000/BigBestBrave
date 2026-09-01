/**
 * 'lens' 룩의 팔레트와 형태 값.
 *
 * 기준으로 삼은 것: 렌즈에 입힌 코팅의 청록빛과, 그 너머로 드는 따뜻한 빛.
 *
 * 왜 두 색인가. 이 화면에는 언제나 두 화면이 나란히 있다 — 눈앞에 떠 있는 것과 손에 든 것.
 * 청록은 AR 쪽에, 호박색은 폰 쪽에 끝까지 같은 뜻으로만 쓴다.
 * 이 저장소의 열여섯 룩 가운데 청록을 강조색으로 쓰는 것은 여기뿐이다.
 *
 * 측정값(APCA Lc / WCAG 대비비), 모두 surface(#F7FAFA) 위:
 *   fg      #12191A  Lc 101.2 / 16.96:1
 *   fgMuted #4B5658  Lc  83.0 /  7.22:1
 *   accent  #00697A  Lc  77.7 /  6.06:1   AR 쪽
 *   warm    #9A5A12  Lc  73.5 /  5.20:1   폰 쪽
 *   border  #C2CDCF          /  1.53:1
 *   strong  #7B8789  Lc  61.3 /  3.53:1   WCAG 1.4.11 통과
 *   accentFg #FFFFFF on accent  Lc -86.2 / 6.36:1
 *   fg on bg(#EDF1F2)  Lc 95.8 / 15.65:1
 */

export const LENS_PALETTE = {
  bg: '#EDF1F2',
  surface: '#F7FAFA',
  surfaceRaised: '#FFFFFF',
  border: '#C2CDCF',
  borderStrong: '#7B8789',
  fg: '#12191A',
  fgMuted: '#4B5658',
  /** 눈앞에 떠 있는 화면. */
  accent: '#00697A',
  accentFg: '#FFFFFF',
  accentSoft: 'rgb(0 105 122 / 0.1)',
  accentGlow: 'rgb(0 105 122 / 0.2)',
  focus: '#00697A',
} as const;

/** 손에 든 화면. */
export const LENS_WARM = {
  warm: '#9A5A12',
  warmSoft: 'rgb(154 90 18 / 0.12)',
} as const;

export const LENS_SHAPE = {
  radiusSm: '3px',
  radiusMd: '6px',
  radiusLg: '12px',
  shadowSm: 'none',
  shadowMd: '0 1px 2px rgb(18 25 26 / 0.05)',
  shadowLg: '0 1px 2px rgb(18 25 26 / 0.05), 0 12px 30px rgb(18 25 26 / 0.07)',
} as const;

export const LENS_TYPE = {
  heading: '"Pretendard", "Noto Sans KR", "Helvetica Neue", system-ui, sans-serif',
  body: '"Pretendard", "Noto Sans KR", system-ui, sans-serif',
  mono: '"JetBrains Mono", "SFMono-Regular", ui-monospace, "Menlo", monospace',
} as const;
