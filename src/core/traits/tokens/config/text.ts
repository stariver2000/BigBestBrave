/**
 * 서체 스택과 타입 스케일 매핑표.
 *
 * 파생 로직에는 숫자를 두지 않는다. 표를 바꾸면 그 표를 읽는 모든 페이지가 함께 움직인다.
 */

/** 서체 성격 -> 폰트 스택. 웹폰트를 싣지 않고 시스템 폰트로 성격을 낸다(로딩 비용 0). */
export const TYPE_STACKS: Record<string, { heading: string; body: string }> = {
  grotesk: {
    heading: '"Helvetica Neue", Inter, "Pretendard", system-ui, sans-serif',
    body: 'Inter, "Pretendard", system-ui, sans-serif',
  },
  humanist: {
    heading: '"Segoe UI", "Noto Sans KR", system-ui, sans-serif',
    body: '"Segoe UI", "Noto Sans KR", system-ui, sans-serif',
  },
  geometric: {
    heading: 'Futura, "Century Gothic", "Noto Sans JP", system-ui, sans-serif',
    body: 'Futura, "Century Gothic", "Noto Sans JP", system-ui, sans-serif',
  },
  /* 제목만 세리프로 두고 본문은 산세리프로 받는 짝. 우아함은 제목에서, 가독성은 본문에서 얻는다. */
  'editorial-serif': {
    heading: '"Iowan Old Style", "Apple Garamond", Georgia, "Noto Serif KR", "Yu Mincho", serif',
    body: '"Pretendard", "Noto Sans KR", "Hiragino Sans", system-ui, sans-serif',
  },
  'transitional-serif': {
    heading: 'Georgia, "Times New Roman", "Noto Serif KR", serif',
    body: 'Georgia, "Noto Serif KR", serif',
  },
  'old-style-serif': {
    heading: 'Palatino, "Book Antiqua", "Noto Serif JP", serif',
    body: 'Palatino, "Noto Serif JP", serif',
  },
  didone: {
    heading: 'Didot, "Bodoni MT", "Noto Serif Display", serif',
    body: 'Georgia, "Noto Serif KR", serif',
  },
  slab: {
    heading: 'Rockwell, "Roboto Slab", Courier, serif',
    body: 'Georgia, "Noto Serif KR", serif',
  },
  mono: {
    heading: 'ui-monospace, "SF Mono", "JetBrains Mono", Menlo, monospace',
    body: 'ui-monospace, "SF Mono", "JetBrains Mono", Menlo, monospace',
  },
  condensed: {
    heading: '"Roboto Condensed", "Arial Narrow", system-ui, sans-serif',
    body: 'Inter, system-ui, sans-serif',
  },
  display: {
    heading: 'Impact, "Haettenschweiler", system-ui, sans-serif',
    body: 'Inter, system-ui, sans-serif',
  },
  rounded: {
    heading: '"SF Pro Rounded", "Varela Round", "Noto Sans KR", system-ui, sans-serif',
    body: '"Noto Sans KR", system-ui, sans-serif',
  },
  pixel: {
    heading: '"Press Start 2P", "Courier New", monospace',
    body: 'ui-monospace, Menlo, monospace',
  },
};

export const DEFAULT_TYPE_STACK = TYPE_STACKS.grotesk;

export const MONO_STACK = 'ui-monospace, "SF Mono", "JetBrains Mono", Menlo, monospace';

/** 타입 스케일 공비. */
export const SCALE_RATIO: Record<string, number> = {
  'minor-second': 1.067,
  'major-second': 1.125,
  'minor-third': 1.2,
  'major-third': 1.25,
  'perfect-fourth': 1.333,
  golden: 1.618,
};

/** 굵기 대비 -> 제목/본문 font-weight. */
export const WEIGHT_PAIRS: Record<string, { heading: number; body: number }> = {
  flat: { heading: 400, body: 400 },
  gentle: { heading: 600, body: 400 },
  strong: { heading: 700, body: 400 },
  extreme: { heading: 900, body: 300 },
};

export const TRACKING_EM: Record<string, string> = {
  tight: '-0.02em',
  normal: '0',
  loose: '0.03em',
  wide: '0.12em',
};

export const LEADING_RATIO: Record<string, number> = {
  tight: 1.25,
  normal: 1.5,
  relaxed: 1.7,
  airy: 1.95,
};

export const CASING_TRANSFORM: Record<string, string> = {
  sentence: 'none',
  title: 'capitalize',
  upper: 'uppercase',
  lower: 'lowercase',
};

/**
 * 타입 스케일이 만들어 내는 가장 작은 단계의 하한(px).
 *
 * 스케일 공비만으로 아래 단계를 만들면 밀도 높은 페이지에서 11~12px까지 내려가는데,
 * 그 크기는 한글·일본어에서 특히 읽기 어렵다. 라벨과 각주가 그 크기를 쓰므로 바닥을 둔다.
 */
export const MIN_FONT_SIZE = 13;

/** 본문 기본 크기(px). 밀도가 높을수록 작게 잡는다. */
export const BASE_FONT_SIZE: Record<string, number> = {
  airy: 17,
  spacious: 16.5,
  comfortable: 16,
  compact: 15,
  dense: 14,
  packed: 13,
};
