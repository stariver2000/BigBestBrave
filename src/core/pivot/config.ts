/**
 * CHI 2020 마우스 센서 위치 논문에서 옮겨 적은 자리.
 *
 * 근거: Sunjun Kim (Aalto·DGIST), Byungjoo Lee (KAIST), Thomas van Gemert (Aalto),
 * Antti Oulasvirta (Aalto). "Optimal Sensor Position for a Computer Mouse." CHI '20,
 * doi:10.1145/3313831.3376735. 전문은 저자들이 올려 둔 PDF
 * (userinterfaces.aalto.fi/mouse_sensor_position/)로 읽었다.
 *
 * 옮긴 것: 가상 센서 수식(식 1~4), 기기의 레일 치수, 로봇 실험(표 1), 여섯 사람의
 * 회귀(표 2), 포인팅 실험의 설계와 본문이 숫자로 적은 결과 전부.
 * 그림 9(참가자별 처리량 곡선)와 그림 11의 막대값은 그림에만 있어 옮기지 않았다.
 *
 * 부호와 방향: 센서 위치 p는 맨 앞이 0, 맨 뒤가 1이다(논문의 0%~100% 표기 그대로).
 * 회전 θ가 더해질 때 호(弧)는 가로 축에만 실리고 세로 축은 그대로다(논문 그림 1).
 */

/** 실험 기기의 치수. 센서 사이 거리는 레일 치수에서 유도한다. */
export const DEVICE = {
  /** 레일의 장착 자리 간격(mm)과 간격 수. 20%~80% 구간에 일곱 자리가 있다. */
  railIntervalMm: 7.2,
  railIntervals: 6,
  /** 레일이 덮는 몫: 20%~80%, 곧 전체의 60%. */
  railSpanShare: 0.6,
  /**
   * 앞 센서(0%)와 뒤 센서(100%) 사이 거리 r.
   * 7.2mm × 6칸 = 43.2mm가 전체의 60%이므로 r = 72mm다. 시험이 이 유도를 붙든다.
   */
  sensorSpanMm: 72,
  /** 가상 기기의 센서 해상도. 표 1의 kilocount를 mm로 되돌릴 때 쓴다. */
  cpi: 12000,
  /** 껍데기 치수(mm). 로지텍 G102/G203의 생김새를 본떴다고 논문이 적었다. */
  shellMm: { width: 117, depth: 62, height: 38 },
} as const;

/** 포인팅 실험의 설계. 곱이 전부 맞물린다: 7×18×15 = 1,890, ×14 = 26,460. */
export const STUDY = {
  participants: 14,
  /** 센서 위치 일곱 수준(%). */
  positions: [0, 20, 40, 50, 60, 80, 100],
  distancesPx: [300, 900],
  widthsPx: [20, 50, 120],
  instancesPerCombo: 3,
  trialsPerSession: 15,
  sessionsPerBlock: 18,
  trialsTotal: 26460,
  outliers: 39,
  successRate: { meanPercent: 94.7, sdPercent: 1.5, minPercent: 91.9 },
  userCpi: 800,
} as const;

/**
 * 처리량(TP, bits/s). 위치별 값은 본문이 숫자로 적은 세 자리(50%·0%·100%)만 옮겼다.
 * 나머지 네 위치의 값은 그림 9에만 있어 옮기지 않았다 — 화면에도 그렇게 적는다.
 */
export const THROUGHPUT = {
  rangeBitsPerS: [4.0, 7.0],
  mean: 5.5,
  sd: 0.6,
  fittsFit: { r2Mean: 0.91, r2Sd: 0.04, interceptSMean: 0.016, interceptSSd: 0.057 },
  at50: 5.77,
  at0: 5.16,
  at100: 4.97,
  /** 본문의 표기. 반올림 전의 원값에서 계산된 것이라 표기값끼리의 재계산과 0.1%p쯤 어긋난다. */
  printedDropAt0Percent: 10.7,
  printedDropAt100Percent: 14.0,
  anova: { f: 20.83, df: [3.51, 45.6], etaP2: 0.616 },
} as const;

/** 길 이탈(MAE, px). 처리량과 같은 세 자리만 본문에 있다. */
export const PATH_DEVIATION = {
  maeRangePx: [15.5, 31.1],
  maeMean: 19.8,
  maeSd: 3.1,
  at50: 18.0,
  at0: 22.1,
  at100: 21.6,
  printedRiseAt0Percent: 22.5,
  printedRiseAt100Percent: 19.9,
  anova: { f: 19.02, df: [3.13, 40.6], etaP2: 0.594 },
  corrWithTp: -0.69,
  rmse: { rangePx: [18.7, 40.3], mean: 24.0, sd: 4.0, corrWithTp: -0.7 },
} as const;

/** 사람마다 최적 자리가 다르다는 셈. */
export const INDIVIDUAL = {
  /** 14명 가운데 13명에게서 위치 효과가 유의했다. 예외는 P4 하나. */
  significantCount: 13,
  exception: { id: 'P4', chi2: 5.92, p: 0.43 },
  effectSizes: { participant: 0.462, position: 0.241, interaction: 0.165 },
  /**
   * 개인별 최적 자리의 평균 TP와 50% 자리의 평균 TP. 차 0.236 bits/s ≈ 4.1%.
   * 여기의 50% 값(5.798)은 위치 비교 문단의 5.77과 다르다 — 셈의 자리가 달라
   * 보이며, 논문이 두 값을 다 적었으므로 둘 다 그대로 옮겼다.
   */
  personalBestTp: 6.034,
  centerTp: 5.798,
  printedGainPercent: 4.1,
  exampleP14: { maeAt0: 23.5, maeAt60: 17.9, maeAt100: 26.1, d: 900, w: 20 },
} as const;

export interface RegressionRow {
  id: string;
  cpi: number;
  dx: { slope: number; intercept: number; r2: number };
  dy: { slope: number; intercept: number; r2: number };
}

/**
 * 표 2. 게임(AimBooster)을 치른 여섯 사람의 앞·뒤 센서 회귀.
 * dX 기울기가 1보다 한참 작다 = 뒤 센서는 앞 센서 가로의 절반쯤만 읽는다.
 * dY 기울기는 1 = 세로는 어느 센서든 같다. 회전이 가로에만 실린다는 수식의 사람 쪽 증거다.
 */
export const HUMAN_REGRESSIONS: readonly RegressionRow[] = [
  { id: 'P1', cpi: 1200, dx: { slope: 0.55, intercept: -0.009, r2: 0.595 }, dy: { slope: 1.02, intercept: -0.006, r2: 0.989 } },
  { id: 'P2', cpi: 800, dx: { slope: 0.6, intercept: 0.073, r2: 0.845 }, dy: { slope: 1.01, intercept: 0.004, r2: 0.991 } },
  { id: 'P3', cpi: 1200, dx: { slope: 0.52, intercept: -0.006, r2: 0.834 }, dy: { slope: 1.01, intercept: -0.008, r2: 0.99 } },
  { id: 'P4', cpi: 600, dx: { slope: 0.54, intercept: -0.008, r2: 0.932 }, dy: { slope: 1.01, intercept: -0.011, r2: 0.992 } },
  { id: 'P5', cpi: 1200, dx: { slope: 0.55, intercept: 0.093, r2: 0.747 }, dy: { slope: 1.01, intercept: 0.003, r2: 0.989 } },
  { id: 'P6', cpi: 1200, dx: { slope: 0.58, intercept: -0.165, r2: 0.776 }, dy: { slope: 1.0, intercept: 0.003, r2: 0.99 } },
];

/**
 * 표 2의 Average 행 표기. dX의 R² 평균 .790은 여섯 값의 평균 .788과 0.002 어긋난다.
 * 반올림 전 값으로 계산했다면 이만큼 어긋나기 어렵다 - 표기 쪽의 실수로 보이며,
 * 고치지 않고 시험과 화면이 그 어긋남을 붙든다. 나머지 다섯 칸은 재계산과 맞는다.
 */
export const HUMAN_PRINTED_AVERAGE = {
  dx: { slope: 0.56, intercept: -0.004, r2: 0.79 },
  dy: { slope: 1.01, intercept: -0.003, r2: 0.99 },
} as const;

/** 사람 관찰의 나머지: 여섯 명(남 5, 여 1, 나이 평균 30.2 SD 5.9), 앞 센서 dX 최대 192%. */
export const HUMAN_OBSERVATION = {
  n: 6,
  ageMean: 30.2,
  ageSd: 5.9,
  maxFrontDxPercent: 192,
} as const;

/**
 * 표 1. 로봇 팔로 잰 ∞ 궤적 길이(kilocount). 1 kilocount = 1,000카운트 = 25.4/12 mm.
 *
 * 두 가지를 붙들었다.
 *   - 회전 조건 Virtual의 20% 자리 값이 '35.7'로 찍혀 있다. 표와 본문 모두 가상-물리
 *     어긋남이 1% 미만이라 하고 물리 쪽 같은 칸은 347.2이므로, 이 칸은 인쇄 오기로
 *     보인다(345.7 언저리였을 것이다). 고치지 않고 그대로 옮겨 적고 화면에 밝힌다.
 *   - 본문의 "20% 자리가 80% 자리보다 6.9% 길게 갔다"는 표의 값으로 재계산하면
 *     6.5%다(347.2/326.0). 표기값이 반올림된 것이라 본문의 원자료와 어긋날 수 있다.
 */
export const ROBOT = {
  plannedLengthMm: 700,
  rotationDeg: { atLeft: -20, atRight: 40 },
  boundsCm: { width: 24, height: 11 },
  avgLengthKc: { translateOnly: { physical: 335.1, virtual: 335.0 }, withRotation: { physical: 341.7, virtual: 338.5 } },
  printedAvgLengthMm: { translateOnly: { physical: 709.4, virtual: 709.1 }, withRotation: { physical: 723.4, virtual: 716.5 } },
  lengthAt20Kc: { translateOnly: { physical: 333.1, virtual: 335.2 }, withRotation: { physical: 347.2, virtual: 35.7 } },
  lengthAt80Kc: { translateOnly: { physical: 328.0, virtual: 334.8 }, withRotation: { physical: 326.0, virtual: 326.9 } },
  discrepancy: {
    translateOnly: { kc: 1.33, printedPercent: 0.4 },
    withRotation: { kc: 3.12, printedPercent: 0.91 },
  },
  printedLongerPercent: 6.9,
  armAccuracyMm: 0.1,
} as const;
