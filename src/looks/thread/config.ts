/**
 * 'thread' 룩의 팔레트와 형태 값.
 *
 * 기준으로 삼은 것: 대화창. 아직 답이 오지 않은 흰 종이 위에, 내가 보낸 말과
 * 끝내 풀리지 않은 말이 서로 다른 색으로 남는다.
 *
 * 왜 두 색인가. 이 화면에는 두 종류의 사실이 나란히 있다 - 해 보면 들었던 것과,
 * 해 봐도 안 들었던 것. 논문이 잰 가장 큰 수는 72%가 끝내 안 풀렸다는 것이므로,
 * 안 풀린 쪽에도 제 색을 준다. 파랑은 잘 든 쪽, 녹슨 주황은 막힌 쪽이다.
 * 이 저장소의 스무 룩 가운데 밝은 지면 위에 이 두 색을 함께 쓰는 것은 여기뿐이다.
 *
 * 측정값(APCA Lc / WCAG 대비비):
 *   surface(#FFFFFF) 위
 *     fg       #16181D  Lc 104.6 / 17.76:1
 *     fgMuted  #5A6070  Lc  81.3 /  6.28:1
 *     accent   #1F4FD8  Lc  81.9 /  6.63:1   해 보니 들었던 쪽
 *     stuck    #A8430C  Lc  79.4 /  6.05:1   해 봐도 막힌 쪽
 *     border   #C2C8D6           /  1.66:1
 *     strong   #7F8698  Lc  62.6 /  3.58:1   WCAG 1.4.11 통과
 *   bg(#F3F4F7) 위
 *     fg       Lc 98.0 / 16.15:1   accent Lc 75.3 / 6.03:1   stuck Lc 72.8 / 5.50:1
 *     border   1.52:1              strong 3.31:1
 *   옅은 바탕 위
 *     accent on #E8EDFC  Lc 71.3 / 5.67:1
 *     stuck  on #FBEDE4  Lc 70.2 / 5.28:1
 *   accentFg #FFFFFF on accent  Lc -87.0 / 6.63:1
 *   stuckFg  #FFFFFF on stuck   Lc -84.5 / 6.05:1
 */

export const THREAD_PALETTE = {
  bg: '#F3F4F7',
  surface: '#FFFFFF',
  surfaceRaised: '#F8F9FC',
  border: '#C2C8D6',
  borderStrong: '#7F8698',
  fg: '#16181D',
  fgMuted: '#5A6070',
  /** 다시 물어서 풀린 쪽. */
  accent: '#1F4FD8',
  accentFg: '#FFFFFF',
  accentSoft: '#E8EDFC',
  accentGlow: 'rgb(31 79 216 / 0.16)',
  focus: '#1F4FD8',
} as const;

/** 끝내 풀리지 않은 쪽. 이 화면에서 가장 큰 수가 여기 속한다. */
export const THREAD_STUCK = {
  stuck: '#A8430C',
  stuckFg: '#FFFFFF',
  stuckSoft: '#FBEDE4',
} as const;

export const THREAD_SHAPE = {
  radiusSm: '5px',
  radiusMd: '12px',
  radiusLg: '20px',
  shadowSm: '0 1px 2px rgb(22 24 29 / 0.05)',
  shadowMd: '0 1px 2px rgb(22 24 29 / 0.05), 0 6px 18px rgb(22 24 29 / 0.05)',
  shadowLg: '0 2px 4px rgb(22 24 29 / 0.05), 0 20px 44px rgb(22 24 29 / 0.09)',
} as const;

export const THREAD_TYPE = {
  heading: '"Pretendard", "Noto Sans KR", "Helvetica Neue", system-ui, sans-serif',
  body: '"Pretendard", "Noto Sans KR", system-ui, sans-serif',
  mono: '"JetBrains Mono", "SFMono-Regular", ui-monospace, "Menlo", monospace',
} as const;
