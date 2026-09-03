/**
 * 'slide' 룩의 팔레트와 형태 값.
 *
 * 기준으로 삼은 것: 현미경의 어두운 시야. 논문이 쓰는 말 그대로 이 페이지의 붓은
 * '마법 렌즈'라, 어두운 바탕에 점이 빛나고 렌즈의 두 경계가 원으로 그려지는 자리다.
 * 지면을 검푸르게 낮춰 점과 경계만 남긴다.
 *
 * 강조는 호박빛 하나다. 무리를 가르는 색(여섯 무리)과 경계의 색은 룩이 아니라
 * 그림의 부호로 페이지 쪽 설정에 산다. 그래서 룩의 강조가 하나뿐이다.
 * 검푸른 지면에 호박빛 강조는 서른네 룩 가운데 여기뿐이다.
 *
 * 측정값(APCA Lc / WCAG 대비비):
 *   surface(#141A21) 위
 *     fg       #E8EEF4  Lc -96.3 / 14.62:1
 *     fgMuted  #A9B6C4  Lc -62.9 /  8.21:1
 *     accent   #F0B429  Lc -74.9 / 10.09:1
 *     border   #2E3947          /  1.53:1
 *     strong   #74839A  Lc -35.8 /  4.15:1   WCAG 1.4.11 통과
 *   bg(#0E1319) 위
 *     fg Lc -99.6 / 16.44:1   accent Lc -78.2 / 11.35:1
 *   accentFg #23180A on accent  Lc 79.7 / 9.15:1
 */

export const SLIDE_PALETTE = {
  bg: '#0E1319',
  surface: '#141A21',
  surfaceRaised: '#1C242E',
  border: '#2E3947',
  borderStrong: '#74839A',
  fg: '#E8EEF4',
  fgMuted: '#A9B6C4',
  /** 렌즈에 걸린 빛. 조작과 선택에 같은 뜻으로만 쓴다. */
  accent: '#F0B429',
  accentFg: '#23180A',
  accentSoft: '#33280E',
  accentGlow: 'rgb(240 180 41 / 0.18)',
  focus: '#F0B429',
} as const;

export const SLIDE_SHAPE = {
  radiusSm: '5px',
  radiusMd: '10px',
  radiusLg: '18px',
  shadowSm: 'none',
  shadowMd: 'inset 0 1px 0 rgb(232 238 244 / 0.04)',
  shadowLg: 'inset 0 1px 0 rgb(232 238 244 / 0.06), 0 18px 42px rgb(0 0 0 / 0.55)',
} as const;

export const SLIDE_TYPE = {
  heading: '"Pretendard", "Noto Sans KR", "Helvetica Neue", system-ui, sans-serif',
  body: '"Pretendard", "Noto Sans KR", system-ui, sans-serif',
  mono: '"JetBrains Mono", "SFMono-Regular", ui-monospace, "Menlo", monospace',
} as const;
