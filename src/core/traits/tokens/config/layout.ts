/**
 * 간격·모서리·테두리·입체감·표면 질감 매핑표.
 *
 * 파생 로직에는 숫자를 두지 않는다. 표를 바꾸면 그 표를 읽는 모든 페이지가 함께 움직인다.
 */

/** 밀도 -> 기본 간격 단위(px)와 본문 폭(px). */
export const DENSITY_SPACE: Record<string, { unit: number; contentWidth: number }> = {
  airy: { unit: 10, contentWidth: 1180 },
  spacious: { unit: 9, contentWidth: 1120 },
  comfortable: { unit: 8, contentWidth: 1060 },
  compact: { unit: 6, contentWidth: 1000 },
  dense: { unit: 5, contentWidth: 1440 },
  packed: { unit: 4, contentWidth: 1600 },
};

/**
 * 레이아웃 원형별 본문 폭(px). 밀도가 정한 폭보다 이 값이 우선한다.
 *
 * 폭을 밀도만으로 정하면 작업대(workbench)처럼 넓은 표를 다루는 화면이 읽기 좋은 글줄 폭에
 * 갇혀 버린다. 반대로 잡지형은 넓히면 글줄이 길어져 읽기 힘들다. 형태가 폭을 결정해야 한다.
 * 표에 없는 레이아웃은 밀도가 정한 폭을 그대로 쓴다.
 */
export const LAYOUT_WIDTH: Record<string, number> = {
  workbench: 1440,
  dashboard: 1600,
  'grid-gallery': 1440,
  masonry: 1440,
  canvas: 1920,
  'tree-explorer': 1280,
  terminal: 1100,
  magazine: 760,
  'single-column': 720,
  scrollytelling: 860,
  kiosk: 960,
};

/** 간격 단계는 단위의 배수로 만든다. */
export const SPACE_MULTIPLIERS = [0.5, 1, 1.5, 2, 3, 4, 6, 9] as const;

/** 모서리 -> 반경(px). pill은 큰 값을 넣어 완전한 알약형으로 만든다. */
export const CORNER_RADIUS: Record<string, { sm: number; md: number; lg: number }> = {
  sharp: { sm: 0, md: 0, lg: 0 },
  subtle: { sm: 2, md: 4, lg: 6 },
  rounded: { sm: 6, md: 10, lg: 16 },
  pill: { sm: 999, md: 999, lg: 999 },
  mixed: { sm: 0, md: 12, lg: 24 },
  organic: { sm: 8, md: 18, lg: 32 },
};

export const PILL_RADIUS = 999;

/** 테두리 굵기와 선 종류. */
export const BORDER_STYLE: Record<string, { width: number; style: string }> = {
  none: { width: 0, style: 'none' },
  hairline: { width: 1, style: 'solid' },
  solid: { width: 1.5, style: 'solid' },
  heavy: { width: 3, style: 'solid' },
  double: { width: 4, style: 'double' },
};

/** 입체감 -> 그림자 세기 배수. 실제 색은 파생 단계에서 배경 명도에 맞춰 정한다. */
export const ELEVATION_STRENGTH: Record<string, number> = {
  flat: 0,
  subtle: 0.5,
  layered: 1,
  floating: 1.6,
  dramatic: 2.6,
};

/**
 * 표면 질감 -> background-image.
 * currentColor를 못 쓰므로 색은 파생 단계에서 %COLOR% 자리에 채워 넣는다.
 */
export const SURFACE_TEXTURE: Record<string, string> = {
  plain: 'none',
  paper:
    'repeating-linear-gradient(0deg, %COLOR% 0 1px, transparent 1px 3px), repeating-linear-gradient(90deg, %COLOR% 0 1px, transparent 1px 3px)',
  noise: 'radial-gradient(%COLOR% 0.5px, transparent 0.6px)',
  grain: 'repeating-radial-gradient(%COLOR% 0 0.4px, transparent 0.4px 2px)',
  'gradient-mesh':
    'radial-gradient(at 20% 15%, %COLOR% 0px, transparent 55%), radial-gradient(at 80% 70%, %COLOR% 0px, transparent 50%)',
  glass: 'linear-gradient(135deg, %COLOR% 0%, transparent 60%)',
  metal: 'repeating-linear-gradient(105deg, %COLOR% 0 1px, transparent 1px 4px)',
  fabric:
    'repeating-linear-gradient(45deg, %COLOR% 0 1px, transparent 1px 4px), repeating-linear-gradient(-45deg, %COLOR% 0 1px, transparent 1px 4px)',
  concrete: 'radial-gradient(%COLOR% 1px, transparent 1.4px)',
  holographic:
    'linear-gradient(115deg, %COLOR% 0%, transparent 25%, %COLOR% 50%, transparent 75%, %COLOR% 100%)',
};

export const TEXTURE_COLOR_PLACEHOLDER = '%COLOR%';

/** 질감 오버레이의 불투명도. 배경 위에 아주 옅게만 얹는다. */
export const TEXTURE_ALPHA = 0.06;
