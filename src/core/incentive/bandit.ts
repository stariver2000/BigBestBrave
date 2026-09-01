/**
 * 논문의 Algorithm 1을 그대로 옮긴 것.
 *
 *   1  되풀이한다
 *   2    각 팔 k에 대하여
 *   3      theta_k ~ Beta(alpha_k + 1, beta_k + 1)
 *   4      omega_k <- theta_k x i_k
 *   5    끝
 *   6    k* <- (theta는 크게, omega는 작게)의 파레토 앞면에서 하나
 *   7    i[k*]를 이번 성공의 보상으로 건다
 *   8    성공했으면 alpha_k*를 하나 올리고
 *  10    아니면 beta_k*를 하나 올린다
 *  13  끝
 */

import { createRandom } from '../random';
import { betaSample } from './beta';
import { AMOUNTS, CONTEXTS } from './config';
import { paretoFront } from './pareto';
import type { Arm, Bandit, Context, Draw } from './types';

export function createBandit(): Bandit {
  const build = (): Arm[] => AMOUNTS.map((amount) => ({ amount, successes: 0, failures: 0 }));
  return { work: build(), off: build(), weekend: build() };
}

/** 한 맥락의 팔들을 한 번씩 뽑아 본다. 화면이 이 값을 그대로 보여 준다. */
export function drawArms(arms: readonly Arm[], random: () => number): Draw[] {
  const sampled = arms.map((arm) => {
    const theta = betaSample(arm.successes + 1, arm.failures + 1, random);
    return { amount: arm.amount, theta, cost: theta * arm.amount };
  });
  const front = new Set(paretoFront(sampled.map((entry) => ({ gain: entry.theta, cost: entry.cost }))));
  return sampled.map((entry, index) => ({ ...entry, onFront: front.has(index) }));
}

/** 앞면에서 하나를 무작위로 고른다. 논문이 적은 그대로다. */
export function chooseArm(draws: readonly Draw[], random: () => number): number {
  const front = draws.map((draw, index) => (draw.onFront ? index : -1)).filter((index) => index >= 0);
  if (front.length === 0) return 0;
  return front[Math.min(front.length - 1, Math.floor(random() * front.length))];
}

/** 결과를 세어 넣는다. 팔의 상태는 이 두 숫자가 전부다. */
export function updateArm(arm: Arm, succeeded: boolean): Arm {
  return succeeded
    ? { ...arm, successes: arm.successes + 1 }
    : { ...arm, failures: arm.failures + 1 };
}

/** 지금까지의 셈으로 볼 때 각 맥락에서 가장 자주 골랐을 금액. */
export function settledAmount(arms: readonly Arm[]): number | null {
  let best: Arm | null = null;
  for (const arm of arms) {
    const tries = arm.successes + arm.failures;
    if (tries === 0) continue;
    if (best === null || tries > best.successes + best.failures) best = arm;
  }
  return best === null ? null : best.amount;
}

export { CONTEXTS, createRandom };
export type { Context };
