/**
 * 'margin' 룩의 팔레트와 형태 값.
 *
 * 기준으로 삼은 것: 책의 난외. 본문이 있고, 그 옆 여백에 손으로 적은 물음이 있다.
 * 이 페이지가 하는 일이 정확히 그것이다 - 문장 하나를 놓고 그 옆에 무엇을 더 물어야
 * 하는지를 적는다.
 *
 * 왜 두 색인가. 이 화면에는 두 종류의 물음이 있다 - 도구가 건네준 물음과, 읽는 사람이
 * 스스로 적은 물음. 논문 스스로 밝힌 역효과가 앞의 것이 뒤의 것을 밀어낸다는 것이었다.
 * 그래서 자주는 건네받은 것에, 초록은 스스로 적은 것에 끝까지 같은 뜻으로만 쓴다.
 * 이 저장소의 스물한 룩 가운데 따뜻한 종이 위에 자주와 초록을 함께 쓰는 것은 여기뿐이다.
 *
 * 측정값(APCA Lc / WCAG 대비비):
 *   surface(#FFFDF7) 위
 *     fg       #1C1A16  Lc 103.0 / 17.08:1
 *     fgMuted  #5E5850  Lc  83.2 /  6.91:1
 *     accent   #6E3A8C  Lc  85.9 /  7.80:1   도구가 건네준 물음
 *     own      #1E7A4F  Lc  74.9 /  5.22:1   스스로 적은 물음
 *     border   #D0C7B2          /  1.65:1
 *     strong   #8B8272  Lc  64.3 /  3.73:1   WCAG 1.4.11 통과
 *   bg(#F5F1E8) 위
 *     fg       Lc 96.0 / 15.41:1   accent Lc 78.9 / 7.04:1   own Lc 67.9 / 4.71:1
 *     border   1.49:1              strong 3.37:1
 *   옅은 바탕 위
 *     accent on #F0E7F6  Lc 74.7 / 6.60:1
 *     own    on #E4F2EA  Lc 66.3 / 4.60:1
 *   accentFg #FFFFFF on accent  Lc -91.8 / 7.93:1
 *   ownFg    #FFFFFF on own     Lc -81.4 / 5.31:1
 */

export const MARGIN_PALETTE = {
  bg: '#F5F1E8',
  surface: '#FFFDF7',
  surfaceRaised: '#FAF6EC',
  border: '#D0C7B2',
  borderStrong: '#8B8272',
  fg: '#1C1A16',
  fgMuted: '#5E5850',
  /** 도구가 건네준 물음. */
  accent: '#6E3A8C',
  accentFg: '#FFFFFF',
  accentSoft: '#F0E7F6',
  accentGlow: 'rgb(110 58 140 / 0.14)',
  focus: '#6E3A8C',
} as const;

/** 스스로 적은 물음. 논문이 밝힌 역효과에 대한 이 페이지의 답이다. */
export const MARGIN_OWN = {
  own: '#1E7A4F',
  ownFg: '#FFFFFF',
  ownSoft: '#E4F2EA',
} as const;

export const MARGIN_SHAPE = {
  radiusSm: '2px',
  radiusMd: '4px',
  radiusLg: '8px',
  shadowSm: '0 1px 1px rgb(28 26 22 / 0.05)',
  shadowMd: '0 1px 2px rgb(28 26 22 / 0.06), 0 4px 12px rgb(28 26 22 / 0.04)',
  shadowLg: '0 2px 4px rgb(28 26 22 / 0.06), 0 16px 36px rgb(28 26 22 / 0.08)',
} as const;

export const MARGIN_TYPE = {
  heading: '"Pretendard", "Noto Serif KR", Georgia, system-ui, serif',
  body: '"Pretendard", "Noto Sans KR", system-ui, sans-serif',
  mono: '"JetBrains Mono", "SFMono-Regular", ui-monospace, "Menlo", monospace',
} as const;
