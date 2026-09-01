/**
 * 'gauge' 룩의 팔레트와 형태 값.
 *
 * 기준으로 삼은 것: 밤에 켜 둔 계측기. 짙은 청록 유리 아래에 눈금이 있고, 바늘만 밝다.
 *
 * 왜 이 색인가. 이 페이지에서 눈이 좇아야 하는 것은 오직 하나, 띠 위를 움직이는 커서다.
 * 바탕이 밝으면 커서와 배경이 같은 무게로 다투고, 100분의 1초를 재는 과제에서 그 다툼이
 * 그대로 기록에 남는다. 그래서 지면을 깊이 내리고 밝은 것은 커서와 켜진 과녁에만 남겼다.
 * 이 저장소의 다른 룩 중 **채도 있는 지면**을 쓰는 것은 여기뿐이다(나머지는 모두 무채색에 가깝다).
 *
 * 측정값(APCA Lc / WCAG 대비비), 모두 surface(#0F2C30) 위:
 *   fg      #E6F2F1  Lc -94.1 / 12.88:1
 *   fgMuted #A9C4C6  Lc -64.4 /  8.01:1
 *   accent  #F3B252  Lc -64.1 /  7.94:1   켜진 과녁, 바늘
 *   ok      #63D6A8  Lc -66.2 /  8.23:1   맞힘
 *   miss    #FFA98B  Lc -64.1 /  7.94:1   빗나감
 *   border  #28535A          /  1.74:1
 *   strong  #5E8B92  Lc -33.0 /  3.92:1   WCAG 1.4.11 통과
 *   accentFg #1A1200 on accent  Lc 68.1 / 10.00:1
 *   fg on bg(#0B2225)  Lc -95.7 / 14.44:1
 */

export const GAUGE_PALETTE = {
  /** 계측기 유리 아래의 어둠. 청록이 남아 있다. */
  bg: '#0B2225',
  surface: '#0F2C30',
  surfaceRaised: '#16383D',
  border: '#28535A',
  borderStrong: '#5E8B92',
  fg: '#E6F2F1',
  fgMuted: '#A9C4C6',
  /** 켜진 눈금의 호박색. 어둠 속에서 가장 먼저 눈에 드는 색이다. */
  accent: '#F3B252',
  accentFg: '#1A1200',
  accentSoft: 'rgb(243 178 82 / 0.14)',
  accentGlow: 'rgb(243 178 82 / 0.26)',
  focus: '#F3B252',
} as const;

/** 맞힘과 빗나감. 성적을 적을 때만 쓰고, 과제 중에는 쓰지 않는다(눈이 흔들린다). */
export const GAUGE_SIGNAL = {
  ok: '#63D6A8',
  okSoft: 'rgb(99 214 168 / 0.13)',
  miss: '#FFA98B',
  missSoft: 'rgb(255 169 139 / 0.13)',
} as const;

export const GAUGE_SHAPE = {
  radiusSm: '2px',
  radiusMd: '4px',
  radiusLg: '7px',
  shadowSm: 'none',
  shadowMd: 'inset 0 1px 0 rgb(230 242 241 / 0.06)',
  shadowLg: 'inset 0 1px 0 rgb(230 242 241 / 0.08), 0 18px 44px rgb(0 0 0 / 0.5)',
} as const;

export const GAUGE_TYPE = {
  heading: '"Pretendard", "Noto Sans KR", "Helvetica Neue", system-ui, sans-serif',
  body: '"Pretendard", "Noto Sans KR", system-ui, sans-serif',
  /** 시간과 오류율이 자리를 지켜야 눈이 표를 훑을 수 있다. */
  mono: '"JetBrains Mono", "SFMono-Regular", ui-monospace, "Menlo", monospace',
} as const;
