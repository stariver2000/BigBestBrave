/**
 * 색 파생에 쓰는 매핑표: 색상각, 채도, 배경 명도, 표면 오프셋, 강조색·본문색 탐색 조건.
 *
 * 파생 로직에는 숫자를 두지 않는다. 표를 바꾸면 그 표를 읽는 모든 페이지가 함께 움직인다.
 */

/** 색온도 -> 기준 색상각(OKLCH hue, 도). */
export const TEMPERATURE_HUE: Record<string, number> = {
  icy: 232,
  cool: 210,
  neutral: 268,
  warm: 62,
  hot: 32,
  scorching: 22,
  ambient: 0,
};

/** 무채색 지정 시 채도를 0으로 만들기 위한 특성값. */
export const ACHROMATIC_TEMPERATURE = 'ambient';

/** 채도 강도 -> 기준 채도(OKLCH chroma). */
export const INTENSITY_CHROMA: Record<string, number> = {
  monochrome: 0,
  desaturated: 0.02,
  restrained: 0.06,
  vivid: 0.13,
  saturated: 0.19,
  neon: 0.27,
};

/** 밝기 -> 배경 명도(OKLab L). 0.5 미만이면 다크 계열로 취급한다. */
export const BRIGHTNESS_BG_L: Record<string, number> = {
  abyssal: 0.11,
  dim: 0.18,
  muted: 0.26,
  balanced: 0.968,
  bright: 0.986,
  radiant: 1,
};

/** 분위기 -> 색상/채도 미세 조정. 표에 없는 분위기는 조정하지 않는다. */
export const ATMOSPHERE_TINT: Record<string, { hueShift: number; chromaScale: number }> = {
  mysterious: { hueShift: -18, chromaScale: 0.85 },
  futuristic: { hueShift: -8, chromaScale: 1.25 },
  ancient: { hueShift: 14, chromaScale: 0.7 },
  dreamy: { hueShift: 12, chromaScale: 0.8 },
  brutal: { hueShift: 0, chromaScale: 0.45 },
  elegant: { hueShift: -6, chromaScale: 0.6 },
  cosmic: { hueShift: -30, chromaScale: 1.1 },
  pastoral: { hueShift: 48, chromaScale: 0.75 },
  industrial: { hueShift: 6, chromaScale: 0.4 },
  sacred: { hueShift: 26, chromaScale: 0.65 },
  feral: { hueShift: 20, chromaScale: 1.15 },
  sterile: { hueShift: -4, chromaScale: 0.3 },
};

/**
 * 각 역할이 지켜야 할 최소 대비.
 *
 * 예전에는 배경에서 고정 오프셋만큼 명도를 밀어 표면·테두리·보조 글자를 만들었는데,
 * 그 방식은 배경 명도에 따라 대비가 들쭉날쭉해져 어두운 테마에서 보조 글자가 읽히지 않았다.
 * 지금은 오프셋 대신 "이 대비를 만족할 때까지 민다"로 바꿨다.
 */
export const ROLE_CONTRAST = {
  /** 보조 글자(라벨, 설명, 각주). 본문보다 낮되 큰 글씨 기준은 넘긴다. APCA Lc. */
  mutedTextLc: 60,
  /**
   * 조작 가능한 요소(입력창, 버튼)의 경계. WCAG 1.4.11이 요구하는 3:1.
   * 이 굵기의 선을 모든 카드에 두르면 화면이 격자무늬처럼 답답해지므로 조작 요소에만 쓴다.
   */
  borderRatio: 3,
  /**
   * 카드·구분선처럼 "있으면 층이 읽히고 없어도 의미가 사라지지 않는" 경계.
   * WCAG는 이런 장식적 경계에 3:1을 요구하지 않는다. 여기서는 눈에 보이는 최소치만 잡는다.
   */
  subtleBorderRatio: 1.5,
  /** 패널 표면이 배경에서 층으로 읽히기 위한 최소 WCAG 대비비. */
  surfaceRatio: 1.22,
  /** 떠 있는 표면이 그 아래 표면에서 다시 한 층 떠 보이기 위한 최소 대비비. */
  raisedRatio: 1.18,
} as const;

/**
 * 배경·표면·테두리에 남길 채도 비율(강조색 채도 대비).
 *
 * 값을 크게 잡으면 화면 전체가 강조색 하나로 물들어 "팔레트"가 아니라 "단색 필터를 씌운 와이어프레임"이 된다.
 * 지면은 거의 무채색으로 두고 채도는 강조색에만 몰아주는 것이 현대적인 인터페이스의 기본 규칙이다.
 */
export const NEUTRAL_CHROMA_SCALE = { bg: 0.05, surface: 0.06, border: 0.08, fgMuted: 0.07 } as const;

/** 강조색을 옅게 깔 때 쓰는 알파. 칩 배경(soft)과 히어로 뒤 광원(glow)에 각각 쓴다. */
export const ACCENT_TINT_ALPHA = { soft: 0.14, glow: 0.22 } as const;

/**
 * 강조색을 고르는 탐색 범위(OKLab L).
 *
 * 고정 명도를 쓰지 않는 이유: sRGB에서 색상마다 낼 수 있는 최대 채도가 명도에 따라 크게 다르다.
 * 예를 들어 청록은 밝은 쪽에서 채도가 급격히 깎여 탁해진다. 그래서 명도를 하나로 못 박는 대신
 * 범위 안에서 "조건을 만족하면서 가장 선명한" 명도를 찾는다.
 */
export const ACCENT_SEARCH = {
  step: 0.01,
  onDark: { min: 0.55, max: 0.92 },
  onLight: { min: 0.35, max: 0.72 },
} as const;

/** 강조색 위에 올릴 글자(버튼 라벨 등)가 확보해야 할 APCA Lc 절대값. */
export const ACCENT_MIN_FG_LC = 60;

/** 강조색 자체가 배경에서 떠 보이기 위해 확보해야 할 APCA Lc 절대값. */
export const ACCENT_MIN_BG_LC = 40;

/** 대비 기준 특성값 -> 본문 텍스트가 만족해야 할 APCA Lc 절대값. */
export const CONTRAST_TARGET_LC: Record<string, number> = {
  'wcag-aa': 60,
  'wcag-aaa': 90,
  'apca-body': 75,
  'apca-large': 60,
};

export const DEFAULT_CONTRAST_TARGET_LC = 75;

/** 본문색 탐색 범위와 간격(OKLab L). 배경에서 멀어지는 방향으로 훑는다. */
export const FG_SEARCH = { step: 0.01, min: 0, max: 1 } as const;
