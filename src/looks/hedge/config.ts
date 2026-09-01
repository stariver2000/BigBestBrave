/**
 * 'hedge' 룩의 팔레트와 형태 값.
 *
 * 기준으로 삼은 것: 생울타리 안의 밭. 좋은 울타리가 좋은 배움을 만든다는 제목 그대로,
 * 지킬 것과 내보낼 것 사이에 산 울타리를 친다.
 *
 * 왜 두 색인가. 이 화면의 물음이 두 갈래다 - 내가 지킬 일과 맡길 일. 풀빛 초록은
 * 울타리 안(스스로 하는 것)에, 볏짚빛은 울타리 밖으로 내보내는 것(맡기는 것)에
 * 끝까지 같은 뜻으로만 쓴다. 짙은 초록 지면은 스물여덟 룩 가운데 여기뿐이다.
 *
 * 측정값(APCA Lc / WCAG 대비비):
 *   surface(#18231C) 위
 *     fg       #EAF1EC  Lc -95.3 / 14.11:1
 *     fgMuted  #AFC0B4  Lc -63.9 /  8.50:1
 *     accent   #8FD9A8  Lc -71.7 /  9.77:1   울타리 안, 스스로 하는 것
 *     hay      #E8C27A  Lc -70.6 /  9.59:1   내보내는 것, 맡기는 것
 *     border   #33443A          /  1.57:1
 *     strong   #73897B  Lc -34.3 /  4.32:1   WCAG 1.4.11 통과
 *   bg(#111A14) 위
 *     fg       Lc -96.4 / 15.48:1   accent Lc -72.8 / 10.71:1   hay Lc -71.7 / 10.52:1
 *     border   1.72:1               strong 4.73:1
 *   옅은 바탕 위
 *     accent on #1C3325  Lc -69.1 / 8.17:1
 *     hay    on #332813  Lc -69.0 / 8.55:1
 *   accentFg #0B2413 on accent  Lc 72.1 / 9.92:1
 *   hayFg    #2C1F05 on hay     Lc 70.8 / 9.52:1
 */

export const HEDGE_PALETTE = {
  bg: '#111A14',
  surface: '#18231C',
  surfaceRaised: '#1F2D24',
  border: '#33443A',
  borderStrong: '#73897B',
  fg: '#EAF1EC',
  fgMuted: '#AFC0B4',
  /** 울타리 안. 스스로 하는 것. */
  accent: '#8FD9A8',
  accentFg: '#0B2413',
  accentSoft: '#1C3325',
  accentGlow: 'rgb(143 217 168 / 0.18)',
  focus: '#8FD9A8',
} as const;

/** 울타리 밖으로 내보내는 것. 맡기는 것. */
export const HEDGE_HAY = {
  hay: '#E8C27A',
  hayFg: '#2C1F05',
  haySoft: '#332813',
} as const;

export const HEDGE_SHAPE = {
  radiusSm: '4px',
  radiusMd: '9px',
  radiusLg: '15px',
  shadowSm: 'none',
  shadowMd: 'inset 0 1px 0 rgb(234 241 236 / 0.05)',
  shadowLg: 'inset 0 1px 0 rgb(234 241 236 / 0.06), 0 16px 40px rgb(0 0 0 / 0.5)',
} as const;

export const HEDGE_TYPE = {
  heading: '"Pretendard", "Noto Sans KR", "Helvetica Neue", system-ui, sans-serif',
  body: '"Pretendard", "Noto Sans KR", system-ui, sans-serif',
  mono: '"JetBrains Mono", "SFMono-Regular", ui-monospace, "Menlo", monospace',
} as const;
