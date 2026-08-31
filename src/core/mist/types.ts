/**
 * 뿌린 소리의 자료형.
 *
 * 소리를 한 자리에 두고, 듣는 이가 그 자리에 다가가면 커지고 멀어지면 작아진다.
 * 시간이 지나면 흩어져 사라진다. 향이 그러하듯이.
 *
 * 이 모듈은 소리를 내지 않는다. 어느 소리가 얼마나 크게 어느 쪽에서 들려야 하는지만 계산하고,
 * 실제로 울리는 일은 화면이 맡는다.
 */

/** 공중에 뜬 물방울 하나. 소리를 품고 떠다니다 사라진다. */
export interface Particle {
  /** 어느 액체에서 나왔는지. 액체마다 다른 소리를 품는다. */
  liquid: string;
  x: number;
  y: number;
  /** 흐르는 속도(초당 좌표 단위). 뿌린 방향과 흩어짐이 여기 담긴다. */
  vx: number;
  vy: number;
  /** 태어난 뒤 흐른 시간(ms). 이 값이 수명을 넘으면 사라진다. */
  age: number;
  lifetime: number;
}

/** 듣는 이의 자리. */
export interface Listener {
  x: number;
  y: number;
}

/** 한 액체가 지금 얼마나 들리는지. */
export interface Heard {
  liquid: string;
  /** 0~1. 여러 물방울이 겹치면 커지되 1을 넘지 않는다. */
  gain: number;
  /** -1(왼쪽) ~ 1(오른쪽). 들리는 방향이다. */
  pan: number;
}
