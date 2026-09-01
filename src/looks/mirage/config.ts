/**
 * 'mirage' 룩의 팔레트와 형태 값.
 *
 * 기준으로 삼은 것: 신기루. 그럴듯하게 보이는데 다가가면 없는 것. t-SNE와 UMAP의
 * 그림에서 군집 사이의 거리가 바로 그것이다 - 또렷이 보이지만 읽으면 안 된다.
 *
 * 왜 두 색인가. 이 화면은 그림에서 읽어도 되는 것과 안 되는 것을 가른다.
 * 짙은 청록은 읽어도 되는 것에, 모래 위 주황은 신기루(읽으면 안 되는 것)에 끝까지
 * 같은 뜻으로만 쓴다. 모래빛 지면에 이 두 색을 쓰는 것은 스물여섯 룩 가운데 여기뿐이다.
 *
 * 측정값(APCA Lc / WCAG 대비비):
 *   surface(#FBF7EF) 위
 *     fg       #1D1A14  Lc  99.6 / 16.24:1
 *     fgMuted  #5F594C  Lc  79.5 /  6.51:1
 *     accent   #0E6B70  Lc  76.2 /  5.86:1   읽어도 되는 것
 *     mirage   #9E4607  Lc  76.1 /  5.90:1   읽으면 안 되는 것
 *     border   #CBC1A8          /  1.68:1
 *     strong   #8B8371  Lc  60.6 /  3.52:1   WCAG 1.4.11 통과
 *   bg(#F1EADC) 위
 *     fg       Lc 92.1 / 14.50:1   accent Lc 68.6 / 5.23:1   mirage Lc 68.6 / 5.26:1
 *     border   1.50:1              strong 3.14:1
 *   옅은 바탕 위
 *     accent on #DCEDEA  Lc 67.9 / 5.17:1
 *     mirage on #F8ECDD  Lc 70.4 / 5.41:1
 *   accentFg #FFFFFF on accent  Lc -85.9 / 6.26:1
 *   mirageFg #FFFFFF on mirage  Lc -85.9 / 6.30:1
 */

export const MIRAGE_PALETTE = {
  bg: '#F1EADC',
  surface: '#FBF7EF',
  surfaceRaised: '#F6F0E4',
  border: '#CBC1A8',
  borderStrong: '#8B8371',
  fg: '#1D1A14',
  fgMuted: '#5F594C',
  /** 읽어도 되는 것. */
  accent: '#0E6B70',
  accentFg: '#FFFFFF',
  accentSoft: '#DCEDEA',
  accentGlow: 'rgb(14 107 112 / 0.14)',
  focus: '#0E6B70',
} as const;

/** 읽으면 안 되는 것. 또렷이 보이는데 없는 것이라 경고빛이 아니라 사막의 주황으로 둔다. */
export const MIRAGE_HEAT = {
  mirage: '#9E4607',
  mirageFg: '#FFFFFF',
  mirageSoft: '#F8ECDD',
} as const;

export const MIRAGE_SHAPE = {
  radiusSm: '4px',
  radiusMd: '9px',
  radiusLg: '16px',
  shadowSm: '0 1px 2px rgb(29 26 20 / 0.05)',
  shadowMd: '0 1px 3px rgb(29 26 20 / 0.06), 0 8px 20px rgb(29 26 20 / 0.05)',
  shadowLg: '0 2px 5px rgb(29 26 20 / 0.06), 0 20px 44px rgb(29 26 20 / 0.09)',
} as const;

export const MIRAGE_TYPE = {
  heading: '"Pretendard", "Noto Sans KR", "Helvetica Neue", system-ui, sans-serif',
  body: '"Pretendard", "Noto Sans KR", system-ui, sans-serif',
  mono: '"JetBrains Mono", "SFMono-Regular", ui-monospace, "Menlo", monospace',
} as const;
