/**
 * 물렁함 착시 코어의 상수.
 *
 * 근거가 된 연구: Effects of Waveform, Time Delay, and Vibration Axis on the Perception of
 * Vibrotactile Compliance Illusions on Smartphone Touchscreens
 * (Joyoung Han, Youngin Kim, J. Jung, Keunwoo Park, Geehyuk Lee),
 * International Journal of Human-Computer Interaction 2024,
 * doi:10.1080/10447318.2024.2385184.
 *
 * 이 논문은 유료라 전문을 구하지 못했다. 초록에 밝혀진 것까지만 옮긴다.
 *   - 딱딱한 표면도 누르는 손가락에 알맞은 진동을 주면 물렁하게 느껴진다.
 *   - 실험 셋을 돌린 결과, 흔한 스마트폰 조건에서 파형은 구별되지 않았다.
 *   - 25밀리초를 넘는 시간 지연과 세 가지 진동 축은 구별되었다.
 *   - 시간 지연은 물렁함·매끄러움·탄성·불쾌함에 뜻있는 영향을 주었고,
 *     진동 축은 물렁함·매끄러움·탄성에 뜻있는 영향을 주었다.
 *
 * 아래 표는 그 네 줄을 그대로 옮긴 것이다. 실험의 수치(평균, 표준편차, F값)는 없다.
 */

/** 이 값을 넘는 지연은 느껴진다. 초록이 밝힌 유일한 수치다. */
export const DELAY_THRESHOLD_MS = 25;

/** 고를 수 있는 파형. 논문은 이들 사이에 차이가 없다고 했다. */
export const WAVEFORMS = ['sine', 'square', 'triangle', 'sawtooth'] as const;
export type Waveform = (typeof WAVEFORMS)[number];

/** 진동을 흔드는 방향. 화면에 수직인 z가 보통 쓰인다. */
export const AXES = ['x', 'y', 'z'] as const;
export type Axis = (typeof AXES)[number];

/** 느낌을 재는 네 갈래. 논문이 이 이름들로 물었다. */
export const DIMENSIONS = ['soft', 'smooth', 'elastic', 'unpleasant'] as const;
export type Dimension = (typeof DIMENSIONS)[number];

/**
 * 초록이 밝힌 것: 어느 설정이 어느 느낌을 움직이는가.
 *
 * 방향 약속: true는 '뜻있는 영향이 있었다'는 뜻이지, 좋아진다거나 나빠진다는 뜻이 아니다.
 * 초록은 방향까지는 밝히지 않았으므로 여기서도 방향을 지어내지 않는다.
 */
export const AFFECTS: Record<'waveform' | 'delay' | 'axis', Record<Dimension, boolean>> = {
  // 흔한 스마트폰 조건에서는 파형 자체가 구별되지 않았다.
  waveform: { soft: false, smooth: false, elastic: false, unpleasant: false },
  delay: { soft: true, smooth: true, elastic: true, unpleasant: true },
  axis: { soft: true, smooth: true, elastic: true, unpleasant: false },
};

/** 소리로 들려줄 때의 기본 주파수(Hz). 손끝이 가장 예민한 언저리다. */
export const CARRIER_HZ = { min: 60, max: 300, initial: 180 } as const;

/** 누르는 깊이(0~1)를 진동 세기로 옮길 때의 값. */
export const PRESS = { maxDepth: 1, initialDepth: 0.5 } as const;

/** 지연 눈금의 범위(밀리초). */
export const DELAY_RANGE = { min: 0, max: 100, step: 1, initial: 12 } as const;

/** 한 번 울릴 때의 길이(밀리초). */
export const BURST_MS = 120;

/** 파형을 그릴 때 뽑는 점의 수. */
export const SAMPLE_COUNT = 256;
