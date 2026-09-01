/**
 * 'circle' 룩의 팔레트와 형태 값.
 *
 * 기준으로 삼은 것: 둘러앉은 자리. 회복적 정의는 처벌하는 자리가 아니라 마주 앉는
 * 자리에서 이루어진다. 그래서 각을 없애고 모서리를 넉넉히 굴렸다.
 *
 * 왜 두 색인가. 이 화면은 축마다 맞는지 안 맞는지를 말한다. 짙은 청록은 맞는 자리에,
 * 흙빛 붉은색은 안 맞는 자리에 끝까지 같은 뜻으로만 쓴다. 붉은색을 쓰되 경고가 아니라
 * 흙빛으로 낮춘 까닭은, 안 맞는다는 것이 잘못이라는 뜻이 아니기 때문이다.
 * 이 저장소의 스물세 룩 가운데 옅은 풀빛 지면에 이 두 색을 쓰는 것은 여기뿐이다.
 *
 * 측정값(APCA Lc / WCAG 대비비):
 *   surface(#FBFCF9) 위
 *     fg       #191D1A  Lc 101.9 / 16.55:1
 *     fgMuted  #565E58  Lc  81.0 /  6.50:1
 *     accent   #106B62  Lc  79.2 /  6.18:1   맞는 자리
 *     miss     #A0442A  Lc  78.5 /  6.08:1   안 맞는 자리
 *     border   #BEC5B9          /  1.72:1
 *     strong   #828A80  Lc  61.2 /  3.46:1   WCAG 1.4.11 통과
 *   bg(#ECEFE8) 위
 *     fg       Lc 93.8 / 14.67:1   accent Lc 71.1 / 5.48:1   miss Lc 70.4 / 5.39:1
 *     border   1.52:1              strong 3.07:1
 *   옅은 바탕 위
 *     accent on #DCEDE9  Lc 68.4 / 5.25:1
 *     miss   on #F7E6DF  Lc 67.7 / 5.17:1
 *   accentFg #FFFFFF on accent  Lc -86.4 / 6.36:1
 *   missFg   #FFFFFF on miss    Lc -85.7 / 6.26:1
 */

export const CIRCLE_PALETTE = {
  bg: '#ECEFE8',
  surface: '#FBFCF9',
  surfaceRaised: '#F4F6F1',
  border: '#BEC5B9',
  borderStrong: '#828A80',
  fg: '#191D1A',
  fgMuted: '#565E58',
  /** 맞는 자리. */
  accent: '#106B62',
  accentFg: '#FFFFFF',
  accentSoft: '#DCEDE9',
  accentGlow: 'rgb(16 107 98 / 0.14)',
  focus: '#106B62',
} as const;

/** 안 맞는 자리. 잘못이 아니라 어긋남이므로 경고빛이 아니라 흙빛으로 둔다. */
export const CIRCLE_MISS = {
  miss: '#A0442A',
  missFg: '#FFFFFF',
  missSoft: '#F7E6DF',
} as const;

export const CIRCLE_SHAPE = {
  radiusSm: '8px',
  radiusMd: '16px',
  radiusLg: '28px',
  shadowSm: '0 1px 2px rgb(25 29 26 / 0.05)',
  shadowMd: '0 2px 4px rgb(25 29 26 / 0.05), 0 8px 24px rgb(25 29 26 / 0.05)',
  shadowLg: '0 4px 8px rgb(25 29 26 / 0.05), 0 22px 48px rgb(25 29 26 / 0.08)',
} as const;

export const CIRCLE_TYPE = {
  heading: '"Pretendard", "Noto Sans KR", "Helvetica Neue", system-ui, sans-serif',
  body: '"Pretendard", "Noto Sans KR", system-ui, sans-serif',
  mono: '"JetBrains Mono", "SFMono-Regular", ui-monospace, "Menlo", monospace',
} as const;
