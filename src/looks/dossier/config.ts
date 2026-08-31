/**
 * 'dossier' 룩의 팔레트와 형태 값.
 *
 * 기준으로 삼은 것: 오래된 서류철과 활판 인쇄물. 종이빛 지면, 먹빛 활자, 도장 붉은색,
 * 그리고 개인정보를 덮는 검은 먹칠 바. 이 페이지가 다루는 일 자체가 문서 정리이므로
 * 화면도 문서처럼 생기는 편이 설명 없이 읽힌다.
 *
 * 측정값(APCA Lc / WCAG 대비비):
 *   ink    #1C1A16 on sheet  Lc 100.7 / 16.51:1   본문
 *   muted  #5C564A on sheet  Lc  81.8 /  6.92:1   보조 글자
 *   stamp  #A03328 on sheet  Lc  79.7 /  6.66:1   도장 붉은색(글자로도 쓴다)
 *   white  #FFFFFF on stamp  Lc -88.3 /  7.00:1   도장 위 글자
 *   hair   #D5CCB8 on sheet          /  1.52:1    괘선
 *   strong #8A8272 on sheet          /  3.62:1    입력 경계(WCAG 1.4.11)
 */

export const DOSSIER_PALETTE = {
  /** 책상 위 종이. 순백이 아니라 누런빛이 도는 종이색이다. */
  bg: '#EFEADD',
  /** 그 위에 놓인 한 장. 배경보다 밝아 "얹혀 있다"로 읽힌다. */
  surface: '#FBF9F4',
  surfaceRaised: '#FFFFFF',
  border: '#D5CCB8',
  borderStrong: '#8A8272',
  fg: '#1C1A16',
  fgMuted: '#5C564A',
  /** 고무도장 붉은색. 넓은 면에는 쓰지 않고 표시와 강조에만 쓴다. */
  accent: '#A03328',
  accentFg: '#FFFFFF',
  accentSoft: 'rgb(160 51 40 / 0.07)',
  accentGlow: 'rgb(160 51 40 / 0.14)',
  focus: '#A03328',
} as const;

/** 개인정보를 덮는 먹칠 바의 색. 이 룩의 핵심 도형이라 별도 변수로 둔다. */
export const DOSSIER_BAR = '#16130F';

/** 종이 결. 아주 옅은 가로선 두 겹으로 인쇄물의 질감을 만든다. */
export const DOSSIER_GRAIN = 'rgb(28 26 22 / 0.035)';

/**
 * 형태. 모서리를 굴리지 않는다.
 * 둥근 모서리와 번지는 그림자는 화면 속 소프트웨어의 인상을 주고, 종이의 인상을 지운다.
 */
export const DOSSIER_SHAPE = {
  radiusSm: '0px',
  radiusMd: '0px',
  radiusLg: '0px',
  /** 그림자는 번지게 하지 않고 한 칸 어긋나게 둔다. 인쇄물이 겹쳐 놓인 느낌이 난다. */
  shadowSm: '1px 1px 0 rgb(28 26 22 / 0.06)',
  shadowMd: '2px 2px 0 rgb(28 26 22 / 0.07)',
  shadowLg: '4px 4px 0 rgb(28 26 22 / 0.08)',
} as const;

/** 제목은 활판 세리프, 본문은 산세리프, 자료와 라벨은 고정폭. */
export const DOSSIER_TYPE = {
  heading: '"Iowan Old Style", "Apple Garamond", Georgia, "Noto Serif KR", "Yu Mincho", serif',
  body: '"Pretendard", "Noto Sans KR", "Hiragino Sans", system-ui, sans-serif',
} as const;
