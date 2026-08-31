/**
 * 'garden' 룩의 팔레트와 형태 값.
 *
 * 기준으로 삼은 것: 화분 옆의 조용한 방. 이 페이지에는 도구가 없고 사물 하나가 놓여 있을 뿐이라,
 * 화면도 물러나 있어야 한다. 초록은 잎에서, 회백색은 전자잉크에서 가져왔다.
 *
 * 측정값(APCA Lc / WCAG 대비비):
 *   ink    #1E2A22 on sheet  Lc 100.1 / 14.56:1
 *   muted  #5A6B5F on sheet  Lc  76.7 /  5.54:1
 *   moss   #357049 on sheet  Lc  77.7 /  5.76:1
 *   sheet  #FBFDF9 on moss   Lc -82.7 /  5.76:1
 *   strong #7E8E80 on sheet          /  3.38:1
 *   전자잉크 #39423A on #E4E7DE Lc 79.3 / 8.33:1
 */

export const GARDEN_PALETTE = {
  bg: '#EDF1EA',
  surface: '#FBFDF9',
  surfaceRaised: '#FFFFFF',
  border: '#DCE5DA',
  borderStrong: '#7E8E80',
  fg: '#1E2A22',
  fgMuted: '#5A6B5F',
  accent: '#357049',
  accentFg: '#FBFDF9',
  accentSoft: 'rgb(53 112 73 / 0.08)',
  accentGlow: 'rgb(53 112 73 / 0.16)',
  focus: '#357049',
} as const;

/** 전자잉크 화면. 빛나지 않고 반사만 하는 회백색과 그 위의 먹색. */
export const GARDEN_EPAPER = { screen: '#E4E7DE', ink: '#39423A' } as const;

export const GARDEN_SHAPE = {
  radiusSm: '8px',
  radiusMd: '14px',
  radiusLg: '20px',
  shadowSm: '0 1px 2px rgb(30 42 34 / 0.04)',
  shadowMd: '0 2px 8px rgb(30 42 34 / 0.05), 0 16px 40px rgb(30 42 34 / 0.05)',
  shadowLg: '0 4px 14px rgb(30 42 34 / 0.06), 0 40px 80px rgb(30 42 34 / 0.08)',
} as const;

export const GARDEN_TYPE = {
  heading: '"Pretendard", "Noto Sans KR", system-ui, sans-serif',
  body: '"Pretendard", "Noto Sans KR", system-ui, sans-serif',
} as const;
