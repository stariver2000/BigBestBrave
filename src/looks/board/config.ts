/**
 * 'board' 룩의 팔레트와 형태 값.
 *
 * 기준으로 삼은 것: 회의실의 화이트보드. 컴포넌트 상자와 화살표를 마커로 그려 가며
 * 코드 구조를 설명하는 자리다. 이 페이지가 하는 일이 정확히 그것이라 - 코드를
 * 상자와 선으로 옮겨 그리는 것 - 지면을 보드의 흰빛으로 두고 강조는 마커 파랑 하나만 쓴다.
 *
 * 다른 색(상태의 초록, 프롭의 보라, 이펙트의 주황, 경고의 빨강)은 룩이 아니라
 * 그림의 부호로, 페이지 쪽 설정에 산다. 룩의 강조가 하나뿐인 이유다.
 * 밝은 지면에 마커 파랑 단색 강조는 서른셋 룩 가운데 여기뿐이다.
 *
 * 측정값(APCA Lc / WCAG 대비비):
 *   surface(#FFFFFF) 위
 *     fg       #1C232E  Lc 103.4 / 15.42:1
 *     fgMuted  #4E5A6A  Lc  75.4 /  7.29:1
 *     accent   #1D4ED8  Lc  71.2 /  6.70:1
 *     border   #D8DDE4          /  1.35:1
 *     strong   #8B94A3  Lc  44.0 /  3.11:1   WCAG 1.4.11 통과
 *   bg(#F4F6F9) 위
 *     fg Lc 100.7 / 14.28:1   accent Lc 68.6 / 6.21:1
 *   accentFg #FFFFFF on accent  Lc -78.2 / 6.70:1
 */

export const BOARD_PALETTE = {
  bg: '#F4F6F9',
  surface: '#FFFFFF',
  surfaceRaised: '#EDF1F5',
  border: '#D8DDE4',
  borderStrong: '#8B94A3',
  fg: '#1C232E',
  fgMuted: '#4E5A6A',
  /** 마커 파랑. 조작과 선택에 같은 뜻으로만 쓴다. */
  accent: '#1D4ED8',
  accentFg: '#FFFFFF',
  accentSoft: '#E4EBFB',
  accentGlow: 'rgb(29 78 216 / 0.14)',
  focus: '#1D4ED8',
} as const;

export const BOARD_SHAPE = {
  radiusSm: '4px',
  radiusMd: '8px',
  radiusLg: '14px',
  shadowSm: 'none',
  shadowMd: '0 1px 2px rgb(28 35 46 / 0.06)',
  shadowLg: '0 1px 2px rgb(28 35 46 / 0.06), 0 14px 34px rgb(28 35 46 / 0.10)',
} as const;

export const BOARD_TYPE = {
  heading: '"Pretendard", "Noto Sans KR", "Helvetica Neue", system-ui, sans-serif',
  body: '"Pretendard", "Noto Sans KR", system-ui, sans-serif',
  mono: '"JetBrains Mono", "SFMono-Regular", ui-monospace, "Menlo", monospace',
} as const;
