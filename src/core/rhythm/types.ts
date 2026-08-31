/**
 * 진동 리듬의 자료형.
 *
 * 논문이 다룬 두 축(진동의 세기와 길이)을 그대로 자료 구조로 옮겼다.
 * 이 모듈은 브라우저 API를 모른다. 실제로 떨게 하는 일은 화면이 맡는다.
 */

/** 한 번의 떨림. 세기는 0~1, 시간은 밀리초다. */
export interface Pulse {
  /** 떨리는 길이. */
  duration: number;
  /** 세기. 0은 떨지 않음, 1은 가장 세게. */
  intensity: number;
  /** 이 떨림이 끝난 뒤의 쉼. 마지막 떨림 뒤의 쉼은 리듬에 포함하지 않는다. */
  gap: number;
}

export interface Pattern {
  id: string;
  pulses: Pulse[];
}

/** 두 리듬이 얼마나 닮았는지. 논문이 나눈 세 단계를 그대로 쓴다. */
export type Closeness = 'same' | 'similar' | 'distinct';

export interface Match {
  patternId: string;
  /** 0~1. 1이면 같은 리듬이다. */
  similarity: number;
  closeness: Closeness;
}
