/** 크기 착시 코어의 자료형. */

/** 받아들여지는 눈의 크기 범위. 모두 밀리미터다. */
export interface Window {
  /** 손에 쥔 것의 실제 크기. */
  physical: number;
  /** 이 아래로는 '눈이 더 작다'고 느낀다. */
  lower: number;
  /** 이 위로는 '눈이 더 크다'고 느낀다. */
  upper: number;
  /** 두 끝의 가운데. 실제로 느끼는 크기다. */
  felt: number;
  /** felt / physical. 1보다 크면 실제보다 크게 느낀다는 뜻이다. */
  bias: number;
  /** (upper - lower) / physical. 얼마나 너그러운가. */
  width: number;
}

/** 손가락을 옮겨 낼 수 있는 크기의 폭. */
export interface Reach {
  /** 손가락이 감겼을 때의 촉각 크기. */
  minHaptic: number;
  /** 손가락이 펴졌을 때의 촉각 크기. */
  maxHaptic: number;
  /** 그 사이에서 만들어 낼 수 있는 가장 작은 눈의 크기. */
  smallest: number;
  /** 가장 큰 눈의 크기. */
  largest: number;
  /** largest / smallest. 몇 배까지 흉내 낼 수 있는가. */
  span: number;
}
