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

/** 계단법에서 한 번의 대답. 보이는 것이 쥔 것보다 큰가 작은가. */
export type Answer = 'bigger' | 'smaller';

/** 계단이 지금 걸어가는 쪽. */
export type Direction = 'up' | 'down';

/** 계단이 오르내릴 수 있는 크기의 끝(mm). */
export interface RunLimits {
  min: number;
  max: number;
}

/** 계단 하나. 문턱 하나를 찾는 동안의 상태 전부다. */
export interface Run {
  /** 지금 보이는 크기(mm). */
  level: number;
  /** 지금 걸음의 크기(mm). 되돌아설 때마다 반으로 줄어든다. */
  step: number;
  /** 지금 걸어가는 쪽. 아직 한 걸음도 걷지 않았으면 null. */
  moving: Direction | null;
  /** 되돌아선 자리들(mm). */
  reversals: number[];
  /** 지나온 자리 전부(mm). 화면이 걸어온 길을 그린다. */
  trail: number[];
  done: boolean;
}
