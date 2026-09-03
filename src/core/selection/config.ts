/**
 * 선택 방식 실험 코어의 상수.
 *
 * 근거가 된 연구: Cross, Dwell, or Pinch: Designing and Evaluating Around-Device Selection
 * Methods for Unmodified Smartwatches (Jiwan Kim, Jiwan Son, Ian Oakley, KAIST),
 * CHI 2025, doi:10.1145/3706598.3714308.
 */

/**
 * 드웰 문턱(밀리초). 논문이 고른 값 그대로다.
 * 짧게 잡으면 지나가다 눌리고(마이더스의 손), 길게 잡으면 느려진다.
 */
export const DWELL_MS = 500;

/**
 * 유효 폭을 낼 때 표준편차에 곱하는 상수.
 * 정규분포에서 96%가 들어오는 구간의 폭이다. ISO 9241-9의 관행을 따른다.
 */
export const EFFECTIVE_WIDTH_FACTOR = 4.133;

/**
 * 띠의 좌표는 0~1이다. 논문은 밀리미터를 썼지만(폭 3·6·9mm, 거리 12·15mm)
 * 화면 크기가 제각각이라 비율로 옮긴다. 비율 자체는 논문의 비를 지킨다.
 */
export const BINARY_CONDITIONS = [
  { width: 0.03, amplitude: 0.4 },
  { width: 0.03, amplitude: 0.5 },
  { width: 0.06, amplitude: 0.4 },
  { width: 0.06, amplitude: 0.5 },
  { width: 0.09, amplitude: 0.4 },
  { width: 0.09, amplitude: 0.5 },
] as const;

/** 한 판에서 두 과녁을 오가며 고르는 횟수. 논문과 같다. */
export const BINARY_SELECTIONS = 6;

/** 여러 과녁 과제: 가운데 정렬된 세 개. 논문이 고른 폭·거리를 비율로 옮겼다. */
export const MULTI = { targets: 3, width: 0.06, gap: 0.24, selections: 4 } as const;

/** 처음 흔들림(들어갈 때)과 확정 흔들림(고를 때)의 길이. 논문이 쓴 값이다. */
export const HAPTIC_MS = { enter: 10, confirm: 20 } as const;

/** 연습 판. 이만큼은 성적에 넣지 않는다. 논문도 첫 블록을 연습으로 버렸다. */
export const WARMUP_TRIALS = 1;

/** 씨앗. 같은 씨앗이면 같은 순서의 과제가 나온다. */
export const SEED = 20250901;

/**
 * 논문이 실은 값. 화면에서 내 성적과 나란히 놓는다.
 *
 * 연구 1(과녁 둘, 1차원 피츠 과제, 참가자 18명):
 *   방식별 피츠 모형·적합도·처리량·이동시간·오류율·재진입
 * 연구 2(과녁 셋, 참가자 12명): 이동 시간에는 차이가 없었고 오류율만 갈렸다.
 *
 * **이 값들과 내 성적을 직접 견주면 안 된다.** 논문은 손가락을 초음파로 좇았고
 * 여기서는 마우스나 손가락으로 화면을 짚는다. 견줄 수 있는 것은 세 방식 사이의 **순서**다.
 */
export const PAPER_BINARY = {
  cross: { intercept: 0.065, slope: 0.475, rSquared: 0.98, throughput: 2.18, movementTime: 0.88, errorRate: 0.0329, reentries: 0 },
  dwell: { intercept: 0.47, slope: 0.461, rSquared: 0.94, throughput: 1.48, movementTime: 1.34, errorRate: 0, reentries: 0.12 },
  pinch: { intercept: 0.021, slope: 1.234, rSquared: 0.9, throughput: 0.92, movementTime: 1.48, errorRate: 0.0752, reentries: 0.12 },
} as const;

export const PAPER_MULTI = {
  cross: { errorRate: 0.0521, comfort: 3.17 },
  dwell: { errorRate: 0.0136, comfort: 4.33 },
} as const;

/** 논문의 전체 평균. */
export const PAPER_GRAND = {
  binary: { movementTime: 1.23, errorRate: 0.035 },
  multi: { movementTime: 1.51, errorRate: 0.0329 },
} as const;

/* ------------------------------------------------------------------------- *
 * 여기서부터는 논문에서 옮긴 것이 아니다.
 *
 * 사람이 손대기 전에 띠 위에서 스스로 움직이는 손의 값이다. 이 손은 성적을 내려는 것이
 * 아니라 규칙이 어떻게 어긋나는지 보이려는 것이다. 그러므로 아래 값에서 나오는 맞고 틀림을
 * 논문의 오류율과 견주면 안 된다.
 * ------------------------------------------------------------------------- */

export const HAND = {
  /** 띠를 가로지르는 빠르기(초당 띠 비율). */
  speedPerSecond: 0.55,
  /**
   * 과녁 가운데를 지나 더 들어가는 깊이. 과녁 **반폭**에 대한 비율이라 1보다 작으면
   * 되나올 자리가 과녁 안이다. 판마다 이 사이에서 흔들린다.
   */
  depthMin: 0.2,
  depthMax: 0.9,
  /**
   * 손떨림의 크기(초당 띠 비율). 빠르기보다 크게 잡아야 이따금 뒤로도 간다.
   * 눈으로 알아볼 만큼은 어긋나되 늘 어긋나지는 않도록 고른 값이다. 여기서 나오는
   * 어긋남의 잦기는 잰 값이 아니라 이 값이 만든 것이므로 논문의 오류율과 견주면 안 된다.
   */
  tremorPerSecond: 0.7,
  /** 이만큼 가까우면 '다 왔다'로 친다(띠 비율). 떨림 때문에 딱 맞는 자리에 서지 못한다. */
  arriveWithin: 0.004,
  /** 가운데에 닿고 나서 손가락을 맞대기까지의 뜸(ms). */
  pinchDelayMs: 220,
  /** 한 과녁을 마치고 다음 과녁으로 옮기기 전에 쉬는 시간(ms). */
  restMs: 380,
} as const;
