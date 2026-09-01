/**
 * 'proof' 룩의 팔레트와 형태 값.
 *
 * 기준으로 삼은 것: 교정지. 검은 활자 위에 붉은 교정 부호가 얹히는 화면이다.
 * 이 페이지가 하는 일이 "어디가 잘못됐는지 짚어 표시하는 것"이라 그 자리에 어울린다.
 *
 * 측정값(APCA Lc / WCAG 대비비):
 *   ink    #14161A on sheet  Lc 104.8 / 18.11:1
 *   muted  #575D64 on sheet  Lc  82.9 /  6.66:1
 *   red    #B32B22 on sheet  Lc  80.4 /  6.39:1
 *   sheet  #FFFFFF on red    Lc -85.5 /  6.39:1
 *   strong #7F8489 on sheet          /  3.77:1
 */

export const PROOF_PALETTE = {
  /** 차가운 종이. 서류철의 누런 종이와 구별하려고 회청빛으로 잡았다. */
  bg: '#F0F1F2',
  surface: '#FFFFFF',
  surfaceRaised: '#FFFFFF',
  border: '#E1E3E6',
  borderStrong: '#7F8489',
  fg: '#14161A',
  fgMuted: '#575D64',
  /** 교정 부호의 붉은색. 짚는 자리에만 쓴다. */
  accent: '#B32B22',
  accentFg: '#FFFFFF',
  accentSoft: 'rgb(179 43 34 / 0.08)',
  accentGlow: 'rgb(179 43 34 / 0.16)',
  focus: '#B32B22',
} as const;

export const PROOF_SHAPE = {
  radiusSm: '0px',
  radiusMd: '0px',
  radiusLg: '0px',
  shadowSm: 'none',
  shadowMd: '0 1px 2px rgb(20 22 26 / 0.05)',
  shadowLg: '0 2px 8px rgb(20 22 26 / 0.07)',
} as const;

export const PROOF_TYPE = {
  heading: '"Pretendard", "Noto Sans KR", "Helvetica Neue", system-ui, sans-serif',
  body: '"Pretendard", "Noto Sans KR", system-ui, sans-serif',
} as const;
