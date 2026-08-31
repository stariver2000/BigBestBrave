/**
 * 색 코어의 모든 수치 상수를 한곳에 모은 설정 파일.
 *
 * 로직 파일(srgb/oklab/contrast/cvd/harmony/ramp)에는 매직 넘버를 두지 않는다.
 * 표준이 개정되거나(예: APCA 계수 갱신) 디자인 정책이 바뀌면 이 파일만 고친다.
 */

/** sRGB 전달 함수(IEC 61966-2-1)의 분기점과 계수. */
export const SRGB_TRANSFER = {
  threshold: 0.04045,
  linearSlope: 12.92,
  offset: 0.055,
  gamma: 2.4,
  /** 역방향(선형 -> 부호화)에서 쓰는 분기점. */
  encodeThreshold: 0.0031308,
} as const;

/** WCAG 2.1 상대 휘도 계수와 대비비 보정항. */
export const WCAG = {
  coefficients: { r: 0.2126, g: 0.7152, b: 0.0722 },
  /** 대비비 (L1 + flare) / (L2 + flare) 의 flare 항. */
  flare: 0.05,
  thresholds: { aaLarge: 3, aa: 4.5, aaa: 7 },
} as const;

/**
 * APCA-W3 (0.1.9, 상수집합 0.98G-4g) 계수.
 * WCAG2와 달리 텍스트/배경의 극성(어느 쪽이 밝은가)에 따라 지수가 달라지므로
 * 정방향(BoW: 밝은 배경 위 어두운 글자)과 역방향(WoB)을 나눠 보관한다.
 */
export const APCA = {
  mainTRC: 2.4,
  coefficients: { r: 0.2126729, g: 0.7151522, b: 0.072175 },
  /** 검은색 근처에서 인지 대비가 무너지는 구간을 보정하는 소프트 클램프. */
  blackThreshold: 0.022,
  blackClamp: 1.414,
  forward: { bgExp: 0.56, txtExp: 0.57, scale: 1.14, offset: 0.027 },
  reverse: { bgExp: 0.65, txtExp: 0.62, scale: 1.14, offset: 0.027 },
  /** 이 값보다 휘도 차가 작으면 대비를 0으로 본다. */
  deltaYMin: 0.0005,
  /** 이 값보다 작은 결과는 잡음으로 보고 0으로 잘라낸다. */
  lowClip: 0.1,
  /**
   * Lc 절대값 기준 용도 판정. APCA는 "통과/실패"가 아니라 폰트 크기·굵기와
   * 함께 읽는 지표이므로, 여기서는 실무에서 통용되는 하한만 라벨로 제공한다.
   */
  levels: [
    { min: 90, key: 'body-preferred' },
    { min: 75, key: 'body-min' },
    { min: 60, key: 'large-text' },
    { min: 45, key: 'headline' },
    { min: 30, key: 'ui-nontext' },
    { min: 15, key: 'decorative' },
    { min: 0, key: 'invisible' },
  ],
} as const;

/** OKLab <-> 선형 sRGB 변환 행렬 (Björn Ottosson, 2020). */
export const OKLAB_MATRICES = {
  linearToLms: [
    [0.4122214708, 0.5363325363, 0.0514459929],
    [0.2119034982, 0.6806995451, 0.1073969566],
    [0.0883024619, 0.2817188376, 0.6299787005],
  ],
  lmsToLab: [
    [0.2104542553, 0.793617785, -0.0040720468],
    [1.9779984951, -2.428592205, 0.4505937099],
    [0.0259040371, 0.7827717662, -0.808675766],
  ],
  labToLms: [
    [1, 0.3963377774, 0.2158037573],
    [1, -0.1055613458, -0.0638541728],
    [1, -0.0894841775, -1.291485548],
  ],
  lmsToLinear: [
    [4.0767416621, -3.3077115913, 0.2309699292],
    [-1.2684380046, 2.6097574011, -0.3413193965],
    [-0.0041960863, -0.7034186147, 1.707614701],
  ],
} as const;

/** 색역 밖 OKLCH를 sRGB 안으로 되돌릴 때 쓰는 채도 이분 탐색 설정. */
export const GAMUT_MAP = {
  /** 채널값이 이 폭만큼 벗어나는 것까지는 반올림 오차로 보고 허용한다. */
  epsilon: 1e-5,
  iterations: 24,
  maxChroma: 0.5,
} as const;

/**
 * Machado(2009) 색각 이상 시뮬레이션 행렬. 중증도 1.0 기준이며,
 * 중간 중증도는 항등행렬과의 선형 보간으로 근사한다(원 논문의 단계별 표를 대체).
 */
export const CVD_MATRICES = {
  protanopia: [
    [0.152286, 1.052583, -0.204868],
    [0.114503, 0.786281, 0.099216],
    [-0.003882, -0.048116, 1.051998],
  ],
  deuteranopia: [
    [0.367322, 0.860646, -0.227968],
    [0.280085, 0.672501, 0.047413],
    [-0.01182, 0.04294, 0.968881],
  ],
  tritanopia: [
    [1.255528, -0.076749, -0.178779],
    [-0.078411, 0.930809, 0.147602],
    [0.004733, 0.691367, 0.3039],
  ],
} as const;

/** 색각 이상 유병률(대략치). UI에서 시뮬레이션 항목을 정렬·설명할 때 쓴다. */
export const CVD_PREVALENCE = {
  deuteranopia: 0.06,
  protanopia: 0.02,
  tritanopia: 0.0003,
  achromatopsia: 0.00003,
} as const;

/**
 * 색상환 회전각으로 정의한 조화 규칙.
 * 값은 시드 색상(hue)에 더할 각도이며, 0은 항상 시드 자신을 뜻한다.
 */
export const HARMONY_ROTATIONS = {
  mono: [0],
  complementary: [0, 180],
  analogous: [-30, 0, 30],
  'analogous-wide': [-60, -30, 0, 30, 60],
  triad: [0, 120, 240],
  'split-complementary': [0, 150, 210],
  tetrad: [0, 60, 180, 240],
  square: [0, 90, 180, 270],
  'compound-warm': [0, 30, 195],
  'compound-cool': [0, -30, 165],
} as const;

/**
 * 톤 램프의 단계 정의.
 * l은 OKLab 명도 목표치, chroma는 시드 채도에 곱할 배수다.
 * 양 끝에서 채도를 낮추는 이유: 극단 명도에서 채도를 유지하면 sRGB 색역을 크게 벗어나
 * 색역 매핑이 색상을 틀어버리기 때문.
 */
export const RAMP_STEPS = [
  { step: 50, l: 0.971, chroma: 0.24 },
  { step: 100, l: 0.936, chroma: 0.4 },
  { step: 200, l: 0.885, chroma: 0.62 },
  { step: 300, l: 0.82, chroma: 0.82 },
  { step: 400, l: 0.74, chroma: 0.95 },
  { step: 500, l: 0.66, chroma: 1 },
  { step: 600, l: 0.58, chroma: 0.98 },
  { step: 700, l: 0.5, chroma: 0.9 },
  { step: 800, l: 0.42, chroma: 0.76 },
  { step: 900, l: 0.34, chroma: 0.6 },
  { step: 950, l: 0.26, chroma: 0.44 },
] as const;

/** 시드 색이 램프의 어느 단계에 해당하는지 표시할 때 쓰는 허용 오차(OKLab L). */
export const RAMP_SEED_MATCH_TOLERANCE = 0.04;
