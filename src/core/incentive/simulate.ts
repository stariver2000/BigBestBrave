/**
 * 세 방식을 같은 사람에게 돌려 본다.
 *
 * 사람은 지어낸 것이다. 논문도 알고리즘을 시험하려고 같은 일을 했다("hypothetical user
 * behaviors, assuming that users would be more likely to succeed as incentive amounts
 * increased"). 다만 논문에는 72명의 실제 참가자도 있었고 여기에는 없다.
 * 그러니 여기 나오는 성공률과 비용은 이 지어낸 사람에 대한 것이지 사람 일반에 대한 것이 아니다.
 */

import { createRandom, pick } from '../random';
import { chooseArm, createBandit, drawArms, updateArm } from './bandit';
import { AMOUNTS, CONTEXTS, FIXED_AMOUNT } from './config';
import type { Context, Responder, Round, Run, Strategy } from './types';

/**
 * 이 사람이 이 맥락에서 이 금액을 걸었을 때 해낼 확률.
 * '충분한 지점'까지는 돈에 따라 오르고, 그 위로는 더 줘도 그대로다.
 */
export function successChance(responder: Responder, context: Context, amount: number): number {
  const enough = Math.max(1, responder.enough);
  const reached = Math.min(1, amount / enough);
  const raw = responder.base + responder.contextShift[context] + responder.lift * reached;
  return Math.min(1, Math.max(0, raw));
}

/** 회마다 맥락이 돌아가며 온다. 실제 하루도 그렇게 흐른다. */
function contextAt(index: number): Context {
  return CONTEXTS[index % CONTEXTS.length];
}

/** 한 맥락에서 걸린 금액의 평균. 그 맥락을 한 번도 겪지 않았으면 null이다. */
function meanOfferIn(records: readonly Round[], context: Context): number | null {
  const mine = records.filter((round) => round.context === context);
  if (mine.length === 0) return null;
  return mine.reduce((sum, round) => sum + round.amount, 0) / mine.length;
}

export function runStrategy(
  strategy: Strategy,
  responder: Responder,
  rounds: number,
  seed: number,
): Run {
  const random = createRandom(seed);
  const bandit = createBandit();
  const records: Round[] = [];
  let spent = 0;
  let succeeded = 0;

  for (let index = 0; index < rounds; index += 1) {
    const context = contextAt(index);
    const arms = bandit[context];

    let armIndex: number;
    if (strategy === 'fixed') {
      armIndex = AMOUNTS.indexOf(FIXED_AMOUNT);
    } else if (strategy === 'random') {
      armIndex = AMOUNTS.indexOf(pick([...AMOUNTS], random));
    } else {
      armIndex = chooseArm(drawArms(arms, random), random);
    }

    const amount = arms[armIndex].amount;
    const won = random() < successChance(responder, context, amount);
    // 논문과 같이 성공했을 때만 지급한다.
    if (won) {
      spent += amount;
      succeeded += 1;
    }
    arms[armIndex] = updateArm(arms[armIndex], won);
    records.push({ index, context, amount, succeeded: won, spent });
  }

  return {
    strategy,
    rounds: records,
    successRate: rounds === 0 ? 0 : succeeded / rounds,
    totalCost: spent,
    costPerSuccess: succeeded === 0 ? null : spent / succeeded,
    meanOffer: {
      work: meanOfferIn(records, 'work'),
      off: meanOfferIn(records, 'off'),
      weekend: meanOfferIn(records, 'weekend'),
    },
  };
}

/** 세 방식을 같은 씨앗으로 돌린다. 견주려면 같은 운을 주어야 한다. */
export function compare(responder: Responder, rounds: number, seed: number): Run[] {
  return (['fixed', 'random', 'personal'] as Strategy[]).map((strategy, index) =>
    runStrategy(strategy, responder, rounds, seed + index * 7919),
  );
}
