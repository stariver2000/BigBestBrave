import { describe, expect, it } from 'vitest';
import { createRandom } from '../../../src/core/random';
import {
  AMOUNTS,
  betaSample,
  chooseArm,
  compare,
  createBandit,
  drawArms,
  FIXED_AMOUNT,
  gammaSample,
  paretoFront,
  runStrategy,
  settledAmount,
  successChance,
  updateArm,
  type Responder,
} from '../../../src/core/incentive';

const flat: Responder = { base: 0.5, lift: 0, enough: 50, contextShift: { work: 0, off: 0, weekend: 0 } };
const steep: Responder = { base: 0.05, lift: 0.85, enough: 100, contextShift: { work: 0, off: 0, weekend: 0 } };
/** 25원이면 충분한 사람. 그 위는 더 줘도 소용없다. */
const cheap: Responder = { base: 0.15, lift: 0.6, enough: 25, contextShift: { work: 0, off: 0, weekend: 0 } };

/** 표본의 평균과 표준편차. */
function stats(values: readonly number[]) {
  const mean = values.reduce((sum, v) => sum + v, 0) / values.length;
  const variance = values.reduce((sum, v) => sum + (v - mean) ** 2, 0) / values.length;
  return { mean, sd: Math.sqrt(variance) };
}

describe('감마와 베타 뽑기', () => {
  it('감마의 평균은 모양값과 같다', () => {
    const random = createRandom(1);
    const samples = Array.from({ length: 20000 }, () => gammaSample(3, random));
    expect(stats(samples).mean).toBeCloseTo(3, 1);
  });

  it('베타(1,1)은 균등분포다', () => {
    const random = createRandom(2);
    const samples = Array.from({ length: 20000 }, () => betaSample(1, 1, random));
    const { mean, sd } = stats(samples);
    expect(mean).toBeCloseTo(0.5, 1);
    // 균등분포의 표준편차는 1/sqrt(12) = 0.2887이다.
    expect(sd).toBeCloseTo(0.2887, 1);
  });

  it('베타의 평균은 a/(a+b)다', () => {
    const random = createRandom(3);
    const samples = Array.from({ length: 20000 }, () => betaSample(8, 2, random));
    expect(stats(samples).mean).toBeCloseTo(0.8, 1);
  });

  it('본 것이 많을수록 뽑히는 값이 좁아진다', () => {
    // 난수기는 반드시 반복문 밖에서 한 번만 만든다. 안에서 만들면 매번 같은 씨앗이라
    // 같은 값만 8000번 나오고, 흩어짐이 0에 가까워져 시험이 뜻을 잃는다.
    const wideRandom = createRandom(4);
    const wide = stats(Array.from({ length: 8000 }, () => betaSample(2, 2, wideRandom)));
    const narrowRandom = createRandom(5);
    const narrow = stats(Array.from({ length: 8000 }, () => betaSample(200, 200, narrowRandom)));
    expect(wide.sd).toBeGreaterThan(0.1);
    expect(narrow.sd).toBeLessThan(wide.sd);
  });

  it('언제나 0과 1 사이다', () => {
    const random = createRandom(6);
    for (let i = 0; i < 3000; i += 1) {
      const value = betaSample(1 + (i % 9), 1 + ((i * 3) % 7), random);
      expect(value).toBeGreaterThanOrEqual(0);
      expect(value).toBeLessThanOrEqual(1);
      expect(Number.isFinite(value)).toBe(true);
    }
  });
});

describe('파레토 앞면', () => {
  it('눌린 것은 빠진다', () => {
    // b가 a보다 성공도 높고 비용도 낮다.
    const front = paretoFront([
      { gain: 0.4, cost: 30 },
      { gain: 0.8, cost: 10 },
    ]);
    expect(front).toEqual([1]);
  });

  it('맞바꿈 관계에 있는 것들은 모두 남는다', () => {
    const front = paretoFront([
      { gain: 0.9, cost: 90 },
      { gain: 0.6, cost: 30 },
      { gain: 0.3, cost: 0 },
    ]);
    expect(front).toEqual([0, 1, 2]);
  });

  it('완전히 같은 것들은 서로를 누르지 않는다', () => {
    expect(paretoFront([{ gain: 0.5, cost: 10 }, { gain: 0.5, cost: 10 }])).toEqual([0, 1]);
  });

  it('빈 목록과 하나짜리', () => {
    expect(paretoFront([])).toEqual([]);
    expect(paretoFront([{ gain: 0.1, cost: 99 }])).toEqual([0]);
  });

  it('같은 성공률이면 더 싼 쪽만 남는다', () => {
    expect(paretoFront([{ gain: 0.7, cost: 50 }, { gain: 0.7, cost: 0 }])).toEqual([1]);
  });
});

describe('팔과 뽑기', () => {
  it('처음에는 다섯 팔 모두 아무것도 보지 않았다', () => {
    const bandit = createBandit();
    for (const context of ['work', 'off', 'weekend'] as const) {
      expect(bandit[context]).toHaveLength(AMOUNTS.length);
      expect(bandit[context].every((arm) => arm.successes === 0 && arm.failures === 0)).toBe(true);
    }
  });

  it('뽑기는 팔마다 하나씩 나오고 값이 제자리에 있다', () => {
    const draws = drawArms(createBandit().work, createRandom(7));
    expect(draws).toHaveLength(AMOUNTS.length);
    for (const draw of draws) {
      expect(draw.theta).toBeGreaterThanOrEqual(0);
      expect(draw.theta).toBeLessThanOrEqual(1);
      expect(draw.cost).toBeCloseTo(draw.theta * draw.amount, 12);
    }
    expect(draws.some((draw) => draw.onFront)).toBe(true);
  });

  it('0원 팔은 비용이 0이라 언제나 앞면에 남는다', () => {
    // 비용을 더 낮출 방법이 없으므로 누구도 0원 팔을 누를 수 없다.
    const random = createRandom(8);
    for (let i = 0; i < 200; i += 1) {
      const draws = drawArms(createBandit().work, random);
      expect(draws[0].amount).toBe(0);
      expect(draws[0].onFront).toBe(true);
    }
  });

  it('고른 팔은 언제나 앞면에서 나온다', () => {
    const random = createRandom(9);
    for (let i = 0; i < 200; i += 1) {
      const draws = drawArms(createBandit().off, random);
      expect(draws[chooseArm(draws, random)].onFront).toBe(true);
    }
  });

  it('결과를 세어 넣는다', () => {
    const arm = { amount: 50, successes: 2, failures: 1 };
    expect(updateArm(arm, true).successes).toBe(3);
    expect(updateArm(arm, false).failures).toBe(2);
    // 원래 것은 건드리지 않는다.
    expect(arm.successes).toBe(2);
  });

  it('아무것도 해 보지 않았으면 정착한 금액이 없다', () => {
    expect(settledAmount(createBandit().work)).toBeNull();
  });

  it('한 팔만 겪었으면 그 금액이 정착한 금액이다', () => {
    const arms = createBandit().work.map((arm, index) =>
      index === 2 ? { ...arm, successes: 3, failures: 1 } : arm,
    );
    expect(settledAmount(arms)).toBe(AMOUNTS[2]);
  });
});

describe('사람 모형', () => {
  it('돈이 늘면 성공 확률도 는다', () => {
    for (let i = 1; i < AMOUNTS.length; i += 1) {
      expect(successChance(steep, 'work', AMOUNTS[i])).toBeGreaterThan(
        successChance(steep, 'work', AMOUNTS[i - 1]),
      );
    }
  });

  it('돈에 움직이지 않는 사람은 금액과 무관하다', () => {
    for (const amount of AMOUNTS) expect(successChance(flat, 'off', amount)).toBeCloseTo(0.5, 12);
  });

  it('확률은 0과 1 사이를 벗어나지 않는다', () => {
    const wild: Responder = { base: 0.9, lift: 0.9, enough: 50, contextShift: { work: -2, off: 0, weekend: 2 } };
    for (const amount of AMOUNTS) {
      for (const context of ['work', 'off', 'weekend'] as const) {
        const value = successChance(wild, context, amount);
        expect(value).toBeGreaterThanOrEqual(0);
        expect(value).toBeLessThanOrEqual(1);
      }
    }
  });
});

describe('돌려 보기', () => {
  it('회 수만큼 기록이 남고 쓴 돈이 늘기만 한다', () => {
    const run = runStrategy('personal', steep, 90, 11);
    expect(run.rounds).toHaveLength(90);
    for (let i = 1; i < run.rounds.length; i += 1) {
      expect(run.rounds[i].spent).toBeGreaterThanOrEqual(run.rounds[i - 1].spent);
    }
    expect(run.totalCost).toBe(run.rounds[run.rounds.length - 1].spent);
  });

  it('고정 방식은 언제나 같은 금액을 건다', () => {
    const run = runStrategy('fixed', steep, 60, 12);
    expect(run.rounds.every((round) => round.amount === FIXED_AMOUNT)).toBe(true);
  });

  it('무작위 방식은 다섯 금액을 두루 쓴다', () => {
    const run = runStrategy('random', steep, 200, 13);
    expect(new Set(run.rounds.map((round) => round.amount)).size).toBe(AMOUNTS.length);
  });

  it('실패한 회에는 돈이 나가지 않는다', () => {
    const run = runStrategy('random', steep, 150, 14);
    for (let i = 1; i < run.rounds.length; i += 1) {
      if (!run.rounds[i].succeeded) {
        expect(run.rounds[i].spent).toBe(run.rounds[i - 1].spent);
      }
    }
  });

  it('같은 씨앗이면 같은 결과가 나온다', () => {
    expect(runStrategy('personal', steep, 80, 15)).toEqual(runStrategy('personal', steep, 80, 15));
  });

  it('맥락 셋이 돌아가며 온다', () => {
    const run = runStrategy('fixed', steep, 30, 16);
    expect(run.rounds.slice(0, 6).map((round) => round.context)).toEqual([
      'work', 'off', 'weekend', 'work', 'off', 'weekend',
    ]);
  });

  /**
   * 이 페이지가 하고 싶은 말이다. 돈에 전혀 움직이지 않는 사람에게는
   * 파레토 앞면이 값싼 팔을 남기므로, 알고리즘이 스스로 지갑을 닫는다.
   */
  it('돈에 움직이지 않는 사람에게는 개인화가 돈을 훨씬 덜 쓴다', () => {
    const [fixed, , personal] = compare(flat, 400, 17);
    expect(personal.totalCost).toBeLessThan(fixed.totalCost * 0.6);
    // 그러면서 성공률은 크게 다르지 않다. 어차피 돈이 성공을 바꾸지 못하기 때문이다.
    expect(Math.abs(personal.successRate - fixed.successRate)).toBeLessThan(0.12);
  });

  it('돈에 크게 움직이는 사람에게는 성공률을 지킨다', () => {
    const [fixed, , personal] = compare(steep, 400, 18);
    expect(personal.successRate).toBeGreaterThan(fixed.successRate * 0.75);
  });

  it('셋을 견줄 때 회 수와 방식이 어긋나지 않는다', () => {
    const runs = compare(steep, 60, 19);
    expect(runs.map((run) => run.strategy)).toEqual(['fixed', 'random', 'personal']);
    expect(runs.every((run) => run.rounds.length === 60)).toBe(true);
  });

  it('평균 제시 금액은 실제로 건 금액의 평균이다', () => {
    const run = runStrategy('fixed', steep, 30, 21);
    // 고정 방식은 언제나 50원이므로 세 맥락 모두 평균이 50이다.
    for (const context of ['work', 'off', 'weekend'] as const) {
      expect(run.meanOffer[context]).toBeCloseTo(FIXED_AMOUNT, 10);
    }
  });

  it('충분한 지점이 낮으면 개인화가 더 적게 건다', () => {
    const mean = (r: Responder) => {
      const personal = compare(r, 400, 22)[2];
      const values = (['work', 'off', 'weekend'] as const).map((c) => personal.meanOffer[c] ?? 0);
      return values.reduce((sum, v) => sum + v, 0) / values.length;
    };
    expect(mean(cheap)).toBeLessThan(mean(steep));
  });

  it('회가 없으면 0으로 떨어지고 터지지 않는다', () => {
    const run = runStrategy('personal', steep, 0, 20);
    expect(run.successRate).toBe(0);
    expect(run.totalCost).toBe(0);
    expect(run.costPerSuccess).toBeNull();
    expect(run.meanOffer.work).toBeNull();
  });
});
