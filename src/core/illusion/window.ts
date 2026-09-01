/**
 * 받아들여지는 범위와, 손가락을 옮겨 낼 수 있는 폭.
 *
 * 논문이 잰 것은 두 가지다.
 *   1) 사람은 손에 쥔 것을 실제보다 약 40% 크게 느낀다. 치우침이 크다.
 *   2) 그런데 그 느낌은 아주 또렷하다. 받아들이는 폭이 2%밖에 안 된다.
 *
 * 이 둘이 합쳐지면 이 연구의 요점이 나온다. 눈으로만 속이려 해도 2%밖에 못 속이므로,
 * 크기를 바꿔 보이려면 손가락이 닿는 자리를 실제로 옮겨야 한다.
 *
 * 여섯 차례의 문턱을 평균해 하나의 비율로 쓴다. 논문이 반복측정 분산분석으로
 * 차례들 사이에 뜻있는 차이가 없다고 밝혔기 때문이다(F(2.963, 32.591) = 0.089, p = .472).
 */

import { DEVICE_MM, THRESHOLDS } from './config';
import type { Reach, Window } from './types';

function mean(values: readonly number[]): number {
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

/** 여섯 차례를 평균한 위 끝의 비율. 실제 크기에 대한 배수다. */
export const UPPER_RATIO = mean(THRESHOLDS.map((row) => row.ascending)) / DEVICE_MM;

/** 아래 끝의 비율. */
export const LOWER_RATIO = mean(THRESHOLDS.map((row) => row.descending)) / DEVICE_MM;

/** 두 끝의 가운데. 실제로 느끼는 크기의 비율이다. */
export const FELT_RATIO = (UPPER_RATIO + LOWER_RATIO) / 2;

/** 손에 쥔 크기가 주어졌을 때 눈이 받아들이는 범위. */
export function windowOf(physical: number): Window {
  const lower = physical * LOWER_RATIO;
  const upper = physical * UPPER_RATIO;
  return {
    physical,
    lower,
    upper,
    felt: (lower + upper) / 2,
    bias: FELT_RATIO,
    width: (upper - lower) / physical,
  };
}

/**
 * 손가락을 옮겨 낼 수 있는 눈의 크기 폭.
 *
 * 기기 자체는 크기가 변하지 않는다. 다만 손가락이 감기는 자리를 옮기면 촉각으로 잡히는
 * 크기가 달라진다. 그 촉각 크기마다 받아들여지는 눈의 범위가 따로 있으므로,
 * 낼 수 있는 눈의 크기는 두 끝의 범위를 이어 붙인 것이 된다.
 */
export function reachOf(device: number, reposition: number): Reach {
  const minHaptic = device;
  const maxHaptic = device + Math.max(0, reposition);
  return {
    minHaptic,
    maxHaptic,
    smallest: windowOf(minHaptic).lower,
    largest: windowOf(maxHaptic).upper,
    span: minHaptic <= 0 ? 1 : windowOf(maxHaptic).upper / windowOf(minHaptic).lower,
  };
}

/** 이 눈의 크기를 내려면 손가락을 어디에 두어야 하는가. 범위 밖이면 null. */
export function hapticFor(device: number, reposition: number, visual: number): number | null {
  const reach = reachOf(device, reposition);
  if (visual < reach.smallest || visual > reach.largest) return null;
  // 느끼는 비율로 되돌리되, 낼 수 있는 촉각 범위 안으로 붙인다.
  const wanted = visual / FELT_RATIO;
  return Math.min(reach.maxHaptic, Math.max(reach.minHaptic, wanted));
}
