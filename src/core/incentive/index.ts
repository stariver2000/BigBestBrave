/**
 * 작은 보상 개인화 코어.
 *
 * 논문의 Algorithm 1(다목적 톰프슨 표집)을 그대로 옮기고, 고정·무작위·개인화 세 방식을
 * 같은 사람에게 돌려 성공률과 비용을 견준다.
 */

export { betaSample, gammaSample } from './beta';
export { chooseArm, createBandit, drawArms, settledAmount, updateArm } from './bandit';
export {
  AMOUNTS,
  CONTEXTS,
  FIXED_AMOUNT,
  INITIAL_RESPONDER,
  PAPER_RESULT,
  ROUNDS,
  SEED,
  STRATEGIES,
} from './config';
export { paretoFront, type Objective } from './pareto';
export { compare, runStrategy, successChance } from './simulate';
export type { Arm, Bandit, Context, Draw, Responder, Round, Run, Strategy } from './types';
