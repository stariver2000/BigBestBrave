/**
 * 크기 착시 코어의 상수.
 *
 * 근거가 된 연구: Big or Small, It's All in Your Head: Visuo-Haptic Illusion of Size-Change
 * Using Finger-Repositioning (Myung Jin Kim, Eyal Ofek, Michel Pahud, Mike J. Sinclair,
 * Andrea Bianchi), CHI 2024, doi:10.1145/3613904.3642254.
 *
 * 연구진은 크기가 변하지 않는 손잡이를 만들고, 손가락이 감기는 자리를 옮기는 것만으로
 * 손에 든 물건이 커지거나 작아지는 느낌을 냈다. 아래 값은 논문 Table 2에서 그대로 옮겼다.
 *
 * 방향 약속: 여기서 '비율'은 언제나 실제 기기 크기에 대한 눈에 보이는 크기의 비다.
 * 100%보다 크면 눈에 보이는 쪽이 더 크다는 뜻이다.
 */

/** 실험에 쓴 기기의 실제 지름(밀리미터). 링 지름이다. */
export const DEVICE_MM = 55;

/** 손가락을 옮길 수 있는 거리(밀리미터). 새끼손가락이 감겼을 때와 펴졌을 때의 차이다. */
export const REPOSITION_MM = { mean: 26.6, sd: 6.2 } as const;

/**
 * 논문 Table 2. 손가락을 옮기는 여섯 가지 차례마다 잰 문턱이다.
 *
 * ascending: 작은 쪽에서 올려 가며 잰 문턱. 받아들이는 범위의 위쪽 끝이다.
 * descending: 큰 쪽에서 내려 가며 잰 문턱. 아래쪽 끝이다.
 * se: 표준오차. 참가자는 열두 명이었다.
 */
export const THRESHOLDS = [
  { sequence: 1, ascending: 79.865, ascendingSe: 4.374, descending: 79.223, descendingSe: 3.735 },
  { sequence: 2, ascending: 80.919, ascendingSe: 6.131, descending: 79.2, descendingSe: 5.224 },
  { sequence: 3, ascending: 76.977, ascendingSe: 5.077, descending: 75.992, descendingSe: 4.828 },
  { sequence: 4, ascending: 75.946, ascendingSe: 4.988, descending: 75.442, descendingSe: 5.085 },
  { sequence: 5, ascending: 75.35, ascendingSe: 3.696, descending: 73.471, descendingSe: 3.352 },
  { sequence: 6, ascending: 80.85, ascendingSe: 4.943, descending: 80.14, descendingSe: 5.01 },
] as const;

/** 참가자 수. */
export const PARTICIPANTS = 12;

/**
 * 논문이 본문에 적은 값들. 내가 표에서 다시 셈한 값과 맞는지 시험으로 견준다.
 * 옮겨 적다가 한 자리 틀리면 여기서 걸린다.
 */
export const REPORTED = {
  /** 올려 가며 잰 문턱은 기기보다 평균 이만큼 컸다. */
  ascendingBias: 0.424,
  /** 내려 가며 잰 문턱은 평균 이만큼 컸다. */
  descendingBias: 0.404,
  /** 위 끝과 아래 끝의 차이. 아주 좁다. */
  windowWidth: 0.02,
  /** 견준 선행 연구: 단단한 손잡이 6.0%, 무른 손잡이 32.7%. */
  priorRigid: 0.06,
  priorCompliant: 0.327,
} as const;

/** 화면에서 만져 볼 수 있는 범위. */
export const RANGE = {
  device: { min: 20, max: 120, step: 1 },
  reposition: { min: 0, max: 60, step: 0.5 },
} as const;

/**
 * 계단법의 설정.
 *
 * 이 값들은 이 페이지가 정한 것이다. 논문이 쓴 계단법의 걸음과 되돌이 횟수는 본문에 실려 있지 않아
 * 옮겨 오지 않았다. 여기서는 화면 앞의 사람이 지루해지기 전에 끝나도록 골랐다.
 */
export const STAIRCASE = {
  /** 처음 걸음(mm). */
  step: 12,
  /** 되돌아설 때마다 걸음에 곱하는 값. */
  shrink: 0.5,
  /** 이보다 작은 걸음은 쓰지 않는다(mm). 더 잘게 물어도 사람이 답할 수 없다. */
  minStep: 0.5,
  /** 이만큼 되돌아서면 계단이 끝난다. */
  reversals: 6,
  /** 문턱은 마지막 이만큼의 되돌이를 평균해서 낸다. 처음 몇 번은 걸음이 커서 거칠다. */
  average: 4,
} as const;

/** 처음 놓여 있는 값. 논문의 기기와 같게 둔다. */
export const INITIAL = { device: DEVICE_MM, reposition: REPOSITION_MM.mean } as const;
