/**
 * 'hush' 룩의 팔레트와 형태 값.
 *
 * 기준으로 삼은 것: 무대 뒤의 낮춘 목소리. 앞무대(공개 채널)의 소란과
 * 뒷무대(개인 귓속말)의 조용함이 이 화면의 두 장소다.
 *
 * 왜 두 색인가. 조정에는 두 무대가 있다 - 모두가 보는 앞무대와 한 사람만 듣는 뒷무대.
 * 하늘빛은 뒷무대의 귓속말에, 장밋빛은 앞무대의 공개 조치에 끝까지 같은 뜻으로만 쓴다.
 * 짙은 남빛 지면에 하늘빛과 장밋빛을 함께 쓰는 것은 스물아홉 룩 가운데 여기뿐이다.
 *
 * 측정값(APCA Lc / WCAG 대비비):
 *   surface(#1C2333) 위
 *     fg       #ECEFF5  Lc -94.7 / 13.63:1
 *     fgMuted  #B2BACB  Lc -62.3 /  8.06:1
 *     accent   #8BD0E8  Lc -69.6 /  9.18:1   뒷무대의 귓속말
 *     stage    #F2A0B4  Lc -61.0 /  7.82:1   앞무대의 공개 조치
 *     border   #39425A          /  1.57:1
 *     strong   #76809A  Lc -32.2 /  3.98:1   WCAG 1.4.11 통과
 *   bg(#151A27) 위
 *     fg       Lc -95.9 / 15.08:1   accent Lc -70.8 / 10.16:1   stage Lc -62.2 / 8.65:1
 *     border   1.74:1               strong 4.40:1
 *   옅은 바탕 위
 *     accent on #1B3340  Lc -67.0 / 7.71:1
 *     stage  on #3A2029  Lc -60.1 / 7.38:1
 *   accentFg #082230 on accent  Lc 70.4 / 9.58:1
 *   stageFg  #33101A on stage   Lc 62.8 / 8.51:1
 */

export const HUSH_PALETTE = {
  bg: '#151A27',
  surface: '#1C2333',
  surfaceRaised: '#242C3F',
  border: '#39425A',
  borderStrong: '#76809A',
  fg: '#ECEFF5',
  fgMuted: '#B2BACB',
  /** 뒷무대의 귓속말. */
  accent: '#8BD0E8',
  accentFg: '#082230',
  accentSoft: '#1B3340',
  accentGlow: 'rgb(139 208 232 / 0.18)',
  focus: '#8BD0E8',
} as const;

/** 앞무대의 공개 조치. */
export const HUSH_STAGE = {
  stage: '#F2A0B4',
  stageFg: '#33101A',
  stageSoft: '#3A2029',
} as const;

export const HUSH_SHAPE = {
  radiusSm: '5px',
  radiusMd: '10px',
  radiusLg: '18px',
  shadowSm: 'none',
  shadowMd: 'inset 0 1px 0 rgb(236 239 245 / 0.05)',
  shadowLg: 'inset 0 1px 0 rgb(236 239 245 / 0.06), 0 16px 40px rgb(0 0 0 / 0.5)',
} as const;

export const HUSH_TYPE = {
  heading: '"Pretendard", "Noto Sans KR", "Helvetica Neue", system-ui, sans-serif',
  body: '"Pretendard", "Noto Sans KR", system-ui, sans-serif',
  mono: '"JetBrains Mono", "SFMono-Regular", ui-monospace, "Menlo", monospace',
} as const;
