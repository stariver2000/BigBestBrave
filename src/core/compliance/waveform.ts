/**
 * 파형 만들기.
 *
 * 네 가지 파형을 한 주기 안에서 뽑는다. 값은 언제나 -1과 1 사이이고,
 * 대칭인 파형(사인·사각·삼각)은 한 주기의 평균이 정확히 0이다.
 * 톱니는 한쪽으로 기울어 있어 평균이 0이지만 모양이 다르다.
 *
 * 이 페이지의 재미는 여기 있다. 네 파형은 눈으로 보면 전혀 다르고 귀로 들어도 다르다.
 * 그런데 논문은 손끝이 이들을 구별하지 못한다고 했다.
 */

import { SAMPLE_COUNT, type Waveform } from './config';

/** 위상 t(0~1)에서의 값. 언제나 -1 이상 1 이하다. */
export function sampleAt(kind: Waveform, phase: number): number {
  // 위상을 0~1로 감는다. 음수도 받아들인다.
  const t = phase - Math.floor(phase);
  switch (kind) {
    case 'sine':
      return Math.sin(2 * Math.PI * t);
    case 'square':
      return t < 0.5 ? 1 : -1;
    case 'triangle':
      // 0에서 1로, 1에서 -1로, 다시 0으로.
      return t < 0.25 ? 4 * t : t < 0.75 ? 2 - 4 * t : 4 * t - 4;
    case 'sawtooth':
      return 2 * t - 1;
  }
}

/** 한 주기를 고르게 나눠 뽑는다. 그림과 소리가 같은 값을 쓴다. */
export function cycle(kind: Waveform, count: number = SAMPLE_COUNT): number[] {
  return Array.from({ length: count }, (_, index) => sampleAt(kind, index / count));
}

/** 제곱평균제곱근. 세기를 견줄 때 쓴다. */
export function rms(values: readonly number[]): number {
  if (values.length === 0) return 0;
  const sum = values.reduce((total, value) => total + value * value, 0);
  return Math.sqrt(sum / values.length);
}

/**
 * 누르는 깊이를 진동 세기로 옮긴다.
 *
 * 물렁함 착시의 뼈대다. 깊이 누를수록 세게 울리면 손가락은 표면이 밀려 들어간다고 읽는다.
 * 방향 약속: 값이 클수록 세게 울린다는 뜻이고, 깊이가 0이면 울리지 않는다.
 */
export function amplitudeFor(depth: number, stiffness: number): number {
  const d = Math.min(1, Math.max(0, depth));
  const k = Math.max(0.1, stiffness);
  // 굳을수록 같은 깊이에서 더 세게 밀어낸다. 1을 넘지 않게 붙인다.
  return Math.min(1, d * k);
}
