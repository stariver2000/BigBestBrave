/**
 * 'vault' 룩의 팔레트와 형태 값.
 *
 * 기준으로 삼은 것: 금고 안쪽. 차가운 강철빛 어둠에 놋쇠 손잡이 하나.
 *
 * 왜 이 색인가. 이 페이지는 비밀번호를 다루지만 겁을 주려는 화면이 아니다. 근거가 된 연구가
 * 짚은 걸림돌 중 하나가 '경보 피로'였다. 빨강으로 뒤덮인 화면은 사람을 움직이는 대신 지치게 한다.
 * 그래서 바탕은 조용히 가라앉히고, 붉은 기는 정말 급한 한 줄에만 쓴다.
 *
 * 측정값(APCA Lc / WCAG 대비비), 모두 surface(#171C24) 위:
 *   fg      #E4E9F0  Lc -91.7 / 14.02:1
 *   fgMuted #AEB9C8  Lc -62.4 /  8.61:1
 *   accent  #E0B269  Lc -63.4 /  8.75:1   놋쇠
 *   alert   #F59A84  Lc -59.0 /  8.01:1   급한 한 줄에만
 *   steady  #7FC8A9  Lc -63.3 /  8.74:1   기기 밖으로 나가지 않는 것
 *   border  #333C4A          /  1.54:1
 *   strong  #6E7A8B  Lc -29.9 /  3.92:1   WCAG 1.4.11 통과
 *   accentFg #14100A on accent  Lc 65.7 / 9.69:1
 *   fg on bg(#10141A) Lc -92.5 / 15.14:1
 */

export const VAULT_PALETTE = {
  /** 금고 안의 어둠. 푸른 기가 도는 강철빛이다. */
  bg: '#10141A',
  surface: '#171C24',
  surfaceRaised: '#1F252F',
  border: '#333C4A',
  borderStrong: '#6E7A8B',
  fg: '#E4E9F0',
  fgMuted: '#AEB9C8',
  /** 놋쇠. 자물쇠와 열쇠의 색이고, 이 룩에서 유일하게 따뜻한 것이다. */
  accent: '#E0B269',
  accentFg: '#14100A',
  accentSoft: 'rgb(224 178 105 / 0.12)',
  accentGlow: 'rgb(224 178 105 / 0.22)',
  focus: '#E0B269',
} as const;

/**
 * 상태를 가리키는 두 색.
 * alert는 정말 급한 한 줄에만, steady는 '이것은 기기 밖으로 나가지 않는다'에만 쓴다.
 */
export const VAULT_SIGNAL = {
  alert: '#F59A84',
  alertSoft: 'rgb(245 154 132 / 0.13)',
  steady: '#7FC8A9',
  steadySoft: 'rgb(127 200 169 / 0.12)',
} as const;

export const VAULT_SHAPE = {
  radiusSm: '3px',
  radiusMd: '6px',
  radiusLg: '10px',
  /** 어둠 속에서 그림자는 보이지 않는다. 대신 위쪽 모서리의 옅은 빛으로 두께를 만든다. */
  shadowSm: 'none',
  shadowMd: 'inset 0 1px 0 rgb(228 233 240 / 0.05)',
  shadowLg: 'inset 0 1px 0 rgb(228 233 240 / 0.07), 0 20px 48px rgb(0 0 0 / 0.45)',
} as const;

export const VAULT_TYPE = {
  heading: '"Pretendard", "Noto Sans KR", "Helvetica Neue", system-ui, sans-serif',
  body: '"Pretendard", "Noto Sans KR", system-ui, sans-serif',
  /** 해시는 자리마다 폭이 같아야 앞뒤를 눈으로 가를 수 있다. */
  mono: '"JetBrains Mono", "SFMono-Regular", ui-monospace, "Menlo", monospace',
} as const;
