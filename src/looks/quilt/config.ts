/**
 * 'quilt' 룩의 팔레트와 형태 값.
 *
 * 기준으로 삼은 것: 서른아홉 조각을 이어 붙인 조각보. 이 화면이 실제로 그 모양이다 -
 * 다섯 갈래 아래 서른아홉 칸이 깔려 있고, 채운 칸과 빈 칸이 한눈에 갈린다.
 *
 * 왜 두 색인가. 이 화면에는 두 종류의 빈 칸이 있다 - 내가 아직 정하지 않은 칸과,
 * 논문 무리 전체가 오래 비워 둔 칸. 앞의 것은 채우면 되지만 뒤의 것은 채울 사람이 없다.
 * 청록은 내가 정한 것에, 산호색은 아무도 안 보는 자리에 끝까지 같은 뜻으로만 쓴다.
 * 이 저장소의 스물두 룩 가운데 어두운 지면 위에 청록과 산호를 함께 쓰는 것은 여기뿐이다.
 *
 * 측정값(APCA Lc / WCAG 대비비):
 *   surface(#1B1E26) 위
 *     fg       #ECEEF3  Lc -94.9 / 14.35:1
 *     fgMuted  #B0B6C2  Lc -60.9 /  8.19:1
 *     accent   #6FD3C4  Lc -68.1 /  9.36:1   내가 정한 것
 *     gap      #FFA184  Lc -62.9 /  8.48:1   아무도 안 보는 자리
 *     border   #383E4D           /  1.56:1
 *     strong   #767E90  Lc -31.9 /  4.09:1   WCAG 1.4.11 통과
 *   bg(#14161C) 위
 *     fg       Lc -95.8 / 15.58:1   accent Lc -69.1 / 10.15:1   gap Lc -63.8 / 9.20:1
 *     border   1.69:1               strong 4.44:1
 *   옅은 바탕 위
 *     accent on #17322F  Lc -65.4 / 7.69:1
 *     gap    on #33211A  Lc -61.8 / 7.78:1
 *   accentFg #06201C on accent  Lc 69.0 / 9.58:1
 *   gapFg    #2A0E04 on gap     Lc 64.8 / 9.19:1
 */

export const QUILT_PALETTE = {
  bg: '#14161C',
  surface: '#1B1E26',
  surfaceRaised: '#232733',
  border: '#383E4D',
  borderStrong: '#767E90',
  fg: '#ECEEF3',
  fgMuted: '#B0B6C2',
  /** 내가 정한 것. */
  accent: '#6FD3C4',
  accentFg: '#06201C',
  accentSoft: '#17322F',
  accentGlow: 'rgb(111 211 196 / 0.20)',
  focus: '#6FD3C4',
} as const;

/** 논문 무리 전체가 오래 비워 둔 자리. */
export const QUILT_GAP = {
  gap: '#FFA184',
  gapFg: '#2A0E04',
  gapSoft: '#33211A',
} as const;

export const QUILT_SHAPE = {
  radiusSm: '2px',
  radiusMd: '3px',
  radiusLg: '5px',
  shadowSm: 'none',
  shadowMd: 'inset 0 1px 0 rgb(236 238 243 / 0.04)',
  shadowLg: 'inset 0 1px 0 rgb(236 238 243 / 0.06), 0 16px 40px rgb(0 0 0 / 0.5)',
} as const;

export const QUILT_TYPE = {
  heading: '"Pretendard", "Noto Sans KR", "Helvetica Neue", system-ui, sans-serif',
  body: '"Pretendard", "Noto Sans KR", system-ui, sans-serif',
  mono: '"JetBrains Mono", "SFMono-Regular", ui-monospace, "Menlo", monospace',
} as const;
