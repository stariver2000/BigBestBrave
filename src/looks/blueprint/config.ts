/**
 * 'blueprint' 룩의 팔레트와 형태 값.
 *
 * 기준으로 삼은 것: 모눈종이 위의 도면. 이 페이지가 하는 일이 산점도를 계측하는 것이므로,
 * 화면도 계측 도구처럼 생기는 편이 읽힌다. 눈금과 얇은 선, 신호용 파랑 하나.
 *
 * 측정값(APCA Lc / WCAG 대비비):
 *   ink    #0F1A24 on sheet  Lc 104.4 / 17.59:1
 *   muted  #4E5D6C on sheet  Lc  83.3 /  6.76:1
 *   accent #1257C7 on sheet  Lc  81.6 /  6.53:1
 *   white  #FFFFFF on accent Lc -86.7 /  6.53:1
 *   hair   #D7E0E8 on sheet          /  1.34:1
 *   strong #7A8A99 on sheet          /  3.55:1
 */

export const BLUEPRINT_PALETTE = {
  bg: '#EAEFF4',
  surface: '#FFFFFF',
  surfaceRaised: '#F7FAFC',
  border: '#D7E0E8',
  borderStrong: '#7A8A99',
  fg: '#0F1A24',
  fgMuted: '#4E5D6C',
  /** 도면의 신호색. 계측값과 선택 상태에만 쓴다. */
  accent: '#1257C7',
  accentFg: '#FFFFFF',
  accentSoft: 'rgb(18 87 199 / 0.08)',
  accentGlow: 'rgb(18 87 199 / 0.16)',
  focus: '#1257C7',
} as const;

/** 지면의 모눈. 큰 눈금과 작은 눈금 두 겹으로 도면의 인상을 만든다. */
export const BLUEPRINT_GRID = {
  fine: 'rgb(15 26 36 / 0.045)',
  coarse: 'rgb(15 26 36 / 0.075)',
  fineSize: '20px',
  coarseSize: '100px',
} as const;

/** 왜곡이 큰 자리를 표시하는 경고색. 파랑의 반대편에서 고른다. */
export const BLUEPRINT_WARN = '#C2410C';

export const BLUEPRINT_SHAPE = {
  radiusSm: '2px',
  radiusMd: '3px',
  radiusLg: '4px',
  shadowSm: 'none',
  shadowMd: '0 1px 2px rgb(15 26 36 / 0.06)',
  shadowLg: '0 2px 8px rgb(15 26 36 / 0.08)',
} as const;

export const BLUEPRINT_TYPE = {
  heading: '"Pretendard", "Noto Sans KR", "Helvetica Neue", system-ui, sans-serif',
  body: '"Pretendard", "Noto Sans KR", system-ui, sans-serif',
} as const;
