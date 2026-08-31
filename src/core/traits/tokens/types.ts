/** 특성에서 파생된 디자인 토큰의 자료형. CSS 변수로 직렬화되기 직전의 중간 표현이다. */

export interface ColorTokens {
  bg: string;
  surface: string;
  surfaceRaised: string;
  /** 카드·구분선용 옅은 경계. 층을 읽히게 하되 화면을 격자로 만들지 않는다. */
  border: string;
  /** 입력창·버튼처럼 조작 가능한 요소의 경계. 비텍스트 대비 3:1을 보장한다. */
  borderStrong: string;
  fg: string;
  fgMuted: string;
  accent: string;
  accentFg: string;
  /** 강조색을 옅게 깐 면. 선택 상태·칩 배경에 쓴다. */
  accentSoft: string;
  /** 히어로 뒤에 까는 광원. 배경에서 자연스럽게 사라지도록 알파를 갖는다. */
  accentGlow: string;
  focus: string;
  /** 배경이 어두운 계열인지. 이미지/그림자 처리 분기에 쓴다. */
  dark: boolean;
}

export interface SpaceTokens {
  /** 기본 간격 단위(px). 나머지 단계는 이 값의 배수다. */
  unit: number;
  scale: number[];
  contentWidth: number;
}

export interface RadiusTokens {
  sm: string;
  md: string;
  lg: string;
  pill: string;
}

export interface TextTokens {
  fontHeading: string;
  fontBody: string;
  fontMono: string;
  /** 타입 스케일 공비. 단계별 크기는 base * ratio^n 으로 계산한다. */
  ratio: number;
  baseSize: number;
  tracking: string;
  leading: number;
  transform: string;
  headingWeight: number;
  bodyWeight: number;
}

export interface MotionTokens {
  fast: string;
  base: string;
  slow: string;
  easing: string;
}

export interface EdgeTokens {
  width: string;
  style: string;
  shadowSm: string;
  shadowMd: string;
  shadowLg: string;
  /** 표면 질감을 만드는 background-image 값. 질감이 없으면 'none'. */
  texture: string;
}

export interface DesignTokens {
  color: ColorTokens;
  space: SpaceTokens;
  radius: RadiusTokens;
  text: TextTokens;
  motion: MotionTokens;
  edge: EdgeTokens;
}
