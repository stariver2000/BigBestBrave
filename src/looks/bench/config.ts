/**
 * 'bench' 룩의 팔레트와 형태 값.
 *
 * 기준으로 삼은 것: 실험대 상판. 씻어 낸 세이지빛 리놀륨, 검은 잉크, 그리고 붉은 표식.
 *
 * 왜 중간 밝기의 지면인가. 이 페이지의 주인공은 **상관 행렬**이고, 상관은 양수와 음수가
 * 대칭으로 갈린다. 흰 지면 위에서는 음의 칸이 흐린 얼룩으로만 보이고 양의 칸만 눈에 든다.
 * 지면을 가운데로 끌어와야 두 방향이 같은 무게로 읽힌다. 이 저장소의 다른 열 개 룩 중
 * 중간 밝기 지면을 쓰는 것은 여기뿐이다.
 *
 * 측정값(APCA Lc / WCAG 대비비), 모두 surface(#D5D8CF) 위:
 *   fg      #1A1D18  Lc  80.4 / 11.80:1
 *   fgMuted #4C5147  Lc  64.7 /  5.65:1
 *   accent  #8A3324  Lc  63.9 /  5.64:1   붉은 표식
 *   cool    #2A5B76  Lc  61.8 /  5.09:1   음의 상관
 *   border  #A4A99C          /  1.67:1
 *   strong  #6E7466  Lc  50.0 /  3.34:1   WCAG 1.4.11 통과
 *   accentFg #FFFFFF on accent  Lc -92.1 / 8.14:1
 *   fg on bg(#C6C9C0)  Lc 72.0 / 10.15:1
 */

export const BENCH_PALETTE = {
  /** 실험대 상판. 완전한 회색이 아니라 풀빛이 조금 남아 있다. */
  bg: '#C6C9C0',
  surface: '#D5D8CF',
  surfaceRaised: '#E2E4DC',
  border: '#A4A99C',
  borderStrong: '#6E7466',
  fg: '#1A1D18',
  fgMuted: '#4C5147',
  /** 표본에 찍는 붉은 표식. */
  accent: '#8A3324',
  accentFg: '#FFFFFF',
  accentSoft: 'rgb(138 51 36 / 0.13)',
  accentGlow: 'rgb(138 51 36 / 0.24)',
  focus: '#8A3324',
} as const;

/**
 * 상관 행렬의 두 방향. rgb 세 값만 담는 이유는 화면에서 투명도를 붙여 쓰기 때문이다
 * (`rgb(var(--bbb-heat-pos) / 0.4)`). 칸의 진하기가 곧 상관의 크기다.
 */
export const BENCH_HEAT = {
  positive: '138 51 36',
  negative: '42 91 118',
} as const;

export const BENCH_SHAPE = {
  /** 실험 기구에는 둥근 데가 없다. */
  radiusSm: '2px',
  radiusMd: '3px',
  radiusLg: '4px',
  shadowSm: 'none',
  /** 중간 밝기 지면에서는 그림자보다 밝은 윗면이 두께를 만든다. */
  shadowMd: 'inset 0 1px 0 rgb(255 255 255 / 0.5)',
  shadowLg: 'inset 0 1px 0 rgb(255 255 255 / 0.6), 0 2px 0 rgb(26 29 24 / 0.07)',
} as const;

export const BENCH_TYPE = {
  heading: '"Pretendard", "Noto Sans KR", "Helvetica Neue", system-ui, sans-serif',
  body: '"Pretendard", "Noto Sans KR", system-ui, sans-serif',
  /** 숫자가 격자로 늘어서야 행렬이 행렬로 보인다. */
  mono: '"JetBrains Mono", "SFMono-Regular", ui-monospace, "Menlo", monospace',
} as const;
