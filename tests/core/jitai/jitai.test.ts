/**
 * 옮겨 적기가 옳았는지 되짚는 시험.
 *
 * 이 논문의 상대 증가율은 서로 곱으로 맞물린다. 세 갈래 표는 소수 첫째 자리까지
 * 맞아떨어지고, 초록의 "8.0% 넘게"도 표에서 되짚어진다. 네 갈래 표는 GLMM 사후
 * 추정이라 맞물리지 않는데, 그 어긋남의 폭까지 시험이 붙들어 둔다.
 */

import { describe, expect, it } from 'vitest';
import {
  ACCURACY,
  APPS,
  bandOf,
  CONDITIONS,
  contextOf,
  EMPTY_MEMORY,
  LOOP,
  nextUse,
  remember,
  scoreOf,
  shouldSpeak,
  silenced,
  urge,
  weightOf,
  type AppKind,
  type Memory,
  type Use,
  DESIGN,
  EFFECT_SIZES,
  EXPLANATION_EXAMPLES,
  RANKING,
  RECEPTIVITY,
  SCALE,
  VISIT_REDUCTION,
  accuracyComposition,
  compose,
  delta,
  digitsMatch,
  feedbackRate,
  fourWayAccuracyComposition,
  frictionDigits,
  labelShareSum,
  ratio,
  receptivityGain,
} from '../../../src/core/jitai';

describe('표 1 - 네 가지 개입 방식', () => {
  it('네 방식이 사다리를 이룬다 - 켜진 것이 하나씩 는다', () => {
    expect(CONDITIONS).toHaveLength(4);
    const onCounts = CONDITIONS.map(
      (condition) => Number(condition.ml) + Number(condition.adaptive) + Number(condition.explainable),
    );
    expect(onCounts).toEqual([0, 1, 2, 3]);
  });

  it('적응은 ML 없이 켜지지 않고, 설명은 적응 없이 켜지지 않는다', () => {
    for (const condition of CONDITIONS) {
      if (condition.adaptive) expect(condition.ml).toBe(true);
      if (condition.explainable) expect(condition.adaptive).toBe(true);
    }
  });
});

describe('실험의 크기', () => {
  it('라벨 시점별 몫의 합이 100에서 반올림 폭 안에 있다', () => {
    expect(Math.abs(labelShareSum() - 100)).toBeLessThanOrEqual(0.15);
  });

  it('피드백 라벨은 개입 만남보다 적고, 그 비율은 81.7%다', () => {
    expect(SCALE.feedbackLabels).toBeLessThan(SCALE.encounters);
    expect(feedbackRate()).toBeCloseTo(81.7, 1);
  });

  it('사람마다 앱 수의 평균이 전체 앱 수를 넘지 않는다', () => {
    expect(SCALE.appsPerPersonMean).toBeLessThanOrEqual(SCALE.apps);
    // 하지만 71명 x 17개 = 1207개가 149개보다 크다. 같은 앱을 여럿이 고른 것이다.
    expect(SCALE.participants * SCALE.appsPerPersonMean).toBeGreaterThan(SCALE.apps);
  });
});

describe('상대 증가율의 맞물림', () => {
  it('배율과 증가율이 서로를 되짚는다', () => {
    expect(ratio(17.1)).toBeCloseTo(1.171, 12);
    expect(delta(ratio(32.8))).toBeCloseTo(32.8, 10);
    expect(compose(0, 0)).toBeCloseTo(0, 12);
  });

  /** 이 파일에서 가장 중요한 시험. 세 수 가운데 하나라도 잘못 옮기면 어긋난다. */
  it('정확도: 17.1과 32.8을 이으면 논문의 55.5가 소수 첫째 자리까지 나온다', () => {
    const { composed, stated } = accuracyComposition();
    // (1.171)(1.328) = 1.5551 -> 55.5% (논문 값 55.5%)
    expect(Math.abs(composed - stated)).toBeLessThan(0.15);
  });

  it('초록의 "수용도 8.0% 넘게"가 세 갈래 표에서 되짚어진다', () => {
    // 1.290 / 1.194 = 1.0804 -> 8.04%. 초록은 >8.0%라 적었다.
    expect(receptivityGain()).toBeGreaterThan(RECEPTIVITY.abstractClaim);
    expect(receptivityGain()).toBeCloseTo(8.04, 1);
  });

  /**
   * 네 갈래 표는 맞물리지 않는다. 17.1과 66.9를 이으면 95.4가 나오는데 논문은 97.5라
   * 적었다. GLMM 사후 추정이라 그렇다. 어긋남의 폭(약 2.1%p)을 그대로 붙들어 둔다 -
   * 옮겨 적기를 다시 하다 이 폭이 변하면 어딘가를 잘못 만진 것이다.
   */
  it('네 갈래 표의 어긋남은 2.1%p 언저리이고, 맞물리는 척하지 않는다', () => {
    const { composed, stated } = fourWayAccuracyComposition();
    expect(composed).toBeCloseTo(95.44, 1);
    expect(stated).toBe(97.5);
    expect(Math.abs(stated - composed)).toBeGreaterThan(1);
    expect(Math.abs(stated - composed)).toBeLessThan(3);
  });

  it('사다리를 오를수록 정확도 이득이 커진다', () => {
    expect(ACCURACY.four.wExpVsWoExp).toBeLessThan(ACCURACY.four.wExpVsPersonalized);
    expect(ACCURACY.four.wExpVsPersonalized).toBeLessThan(ACCURACY.four.wExpVsControl);
    expect(RECEPTIVITY.four.wExpVsWoExp).toBeLessThan(RECEPTIVITY.four.wExpVsPersonalized);
    expect(RECEPTIVITY.four.wExpVsPersonalized).toBeLessThan(RECEPTIVITY.four.wExpVsControl);
  });
});

describe('설명의 엇갈린 효과', () => {
  it('방문 감소는 설명이 없는 쪽이 더 크고, 그쪽만 뜻있다', () => {
    expect(VISIT_REDUCTION.woExp.percent).toBeGreaterThan(VISIT_REDUCTION.wExp.percent);
    expect(VISIT_REDUCTION.woExp.significant).toBe(true);
    expect(VISIT_REDUCTION.wExp.significant).toBe(false);
  });

  it('설명이 있는 쪽은 1등 표도 3등 표도 더 많이 받았다 - 갈리는 것이다', () => {
    expect(RANKING.wExp.first).toBeGreaterThan(RANKING.woExp.first);
    expect(RANKING.wExp.third).toBeGreaterThan(RANKING.woExp.third);
  });

  it('순위 몫은 백분율 눈금 안에 있다', () => {
    for (const side of [RANKING.wExp, RANKING.woExp]) {
      expect(side.first + side.third).toBeLessThanOrEqual(100);
      expect(side.first).toBeGreaterThan(0);
    }
  });

  it('논문이 함께 적은 효과 크기는 크지 않다', () => {
    expect(EFFECT_SIZES.effectiveness).toBeLessThan(0.3);
    expect(EFFECT_SIZES.trust).toBeLessThan(0.3);
  });
});

describe('표 2 - 설명의 두 층위', () => {
  it('아홉 예시가 있고 특징 이름이 겹치지 않는다', () => {
    expect(EXPLANATION_EXAMPLES).toHaveLength(9);
    expect(new Set(EXPLANATION_EXAMPLES.map((entry) => entry.feature)).size).toBe(9);
  });

  it('높은 층위의 갈래는 다섯이다', () => {
    const highs = new Set(EXPLANATION_EXAMPLES.map((entry) => entry.high));
    expect(highs).toEqual(new Set(['Phone & App Use', 'Activity', 'Social', 'Location', 'Time']));
  });

  it('화면은 상위 세 갈래만 보여 준다 - 다섯 가운데 셋이다', () => {
    expect(DESIGN.topCategories).toBe(3);
    expect(DESIGN.topCategories).toBeLessThan(new Set(EXPLANATION_EXAMPLES.map((e) => e.high)).size);
  });
});

describe('마찰 과제', () => {
  it('숫자열은 열두 자리이고 숫자로만 되어 있다', () => {
    const digits = frictionDigits(7);
    expect(digits).toHaveLength(DESIGN.frictionDigits);
    expect(digits).toMatch(/^\d{12}$/);
  });

  it('같은 씨앗이면 같은 숫자열, 다른 씨앗이면 다른 숫자열이다', () => {
    expect(frictionDigits(7)).toBe(frictionDigits(7));
    expect(frictionDigits(7)).not.toBe(frictionDigits(8));
  });

  it('공백을 섞어 쳐도 받아 주지만 틀린 숫자는 받아 주지 않는다', () => {
    const digits = frictionDigits(7);
    const spaced = digits.slice(0, 4) + ' ' + digits.slice(4, 8) + ' ' + digits.slice(8);
    expect(digitsMatch(digits, spaced)).toBe(true);
    expect(digitsMatch(digits, digits.slice(0, 11) + (digits[11] === '0' ? '1' : '0'))).toBe(false);
    expect(digitsMatch(digits, '')).toBe(false);
  });

  it('쉬는 시간이 재는 간격보다 길다 - 개입 직후에 또 개입하지 않기 위해서다', () => {
    expect(DESIGN.cooldownMin).toBeGreaterThan(DESIGN.predictionIntervalMin);
  });
});

/**
 * 가장 작은 고리. 이 페이지가 오래 비워 두었던 자리다 — 논문의 알맹이는 "언제 끼어들지"를
 * 사람에게서 배우는 것인데, 화면에는 그 결과만 있고 배우는 일이 없었다.
 * 아래 시험이 붙드는 것은 하나다: 사람이 답한 대로 기계의 행동이 정말 달라지는가.
 */
describe('가장 작은 고리', () => {
  const at = (hour: number, minutesInApp: number, app: AppKind = APPS[0]): Use => ({
    atMin: hour * 60,
    app,
    minutesInApp,
  });

  it('하루를 네 시간대로 가른다', () => {
    expect(bandOf(9 * 60)).toBe('morning');
    expect(bandOf(14 * 60)).toBe('afternoon');
    expect(bandOf(20 * 60)).toBe('evening');
    expect(bandOf(23 * 60 + 30)).toBe('night');
  });

  it('맥락은 시간대와 앱 둘로만 가른다', () => {
    expect(contextOf(at(20, 10, 'social'))).toBe('evening:social');
    // 같은 시간대 안에서는 몇 분을 보았든 같은 맥락이다. 그래야 배울 거리가 쌓인다.
    expect(contextOf(at(20, 40, 'social'))).toBe(contextOf(at(19, 5, 'social')));
  });

  it('오래 볼수록 과사용 쪽 점수가 오른다', () => {
    expect(urge(at(14, 5))).toBeLessThan(urge(at(14, 30)));
    expect(urge(at(14, LOOP.longMin))).toBe(1);
  });

  it('밤에는 같은 시간을 보아도 점수가 더 높다', () => {
    expect(urge(at(23, 10))).toBeGreaterThan(urge(at(14, 10)));
  });

  it('아직 아무것도 묻지 않았으면 무게는 반이다', () => {
    expect(weightOf(EMPTY_MEMORY, 'evening:social')).toBe(0.5);
  });

  it('넘길수록 그 자리에서 조용해지고, 받아들일수록 일찍 말을 건다', () => {
    const use = at(20, 30, 'social');
    let quiet: Memory = EMPTY_MEMORY;
    let loud: Memory = EMPTY_MEMORY;
    for (let i = 0; i < 4; i += 1) {
      quiet = { ...remember(quiet, use, false), lastAtMin: null };
      loud = { ...remember(loud, use, true), lastAtMin: null };
    }
    expect(scoreOf(quiet, use)).toBeLessThan(scoreOf(EMPTY_MEMORY, use));
    expect(scoreOf(loud, use)).toBeGreaterThan(scoreOf(EMPTY_MEMORY, use));
  });

  it('배운 것은 그 맥락에만 남는다', () => {
    const evening = at(20, 30, 'social');
    const morning = at(9, 30, 'social');
    const after = { ...remember(EMPTY_MEMORY, evening, false), lastAtMin: null };
    expect(scoreOf(after, evening)).toBeLessThan(scoreOf(EMPTY_MEMORY, evening));
    expect(scoreOf(after, morning)).toBe(scoreOf(EMPTY_MEMORY, morning));
  });

  it('개입 뒤 냉각 시간 안에는 아무리 점수가 높아도 말을 걸지 않는다', () => {
    const use = at(20, LOOP.longMin, 'social');
    expect(shouldSpeak(EMPTY_MEMORY, use)).toBe(true);
    const justSpoke: Memory = { counts: {}, lastAtMin: use.atMin - (DESIGN.cooldownMin - 1) };
    expect(shouldSpeak(justSpoke, use)).toBe(false);
    const cooled: Memory = { counts: {}, lastAtMin: use.atMin - DESIGN.cooldownMin };
    expect(shouldSpeak(cooled, use)).toBe(true);
  });

  it('넘기기를 되풀이하면 말을 걸던 자리에서 조용해진다', () => {
    const use = at(20, LOOP.longMin, 'social');
    let memory: Memory = EMPTY_MEMORY;
    let quieted = false;
    for (let i = 0; i < 6 && !quieted; i += 1) {
      const after = remember(memory, use, false);
      quieted = silenced(memory, after, use);
      memory = after;
    }
    expect(quieted).toBe(true);
  });

  it('한 번의 대답으로는 배웠다고 하지 않는다', () => {
    const use = at(20, LOOP.longMin, 'social');
    const after = remember(EMPTY_MEMORY, use, false);
    expect(silenced(EMPTY_MEMORY, after, use)).toBe(false);
  });

  it('냉각 때문에 잠깐 쉬는 것은 배워서 조용해진 것이 아니다', () => {
    const use = at(20, LOOP.longMin, 'social');
    const before: Memory = { counts: {}, lastAtMin: null };
    const after: Memory = { counts: {}, lastAtMin: use.atMin };
    expect(silenced(before, after, use)).toBe(false);
  });

  it('받아들인 자리에서는 조용해지지 않는다', () => {
    const use = at(20, LOOP.longMin, 'social');
    let memory: Memory = EMPTY_MEMORY;
    for (let i = 0; i < 6; i += 1) {
      const after = remember(memory, use, true);
      expect(silenced(memory, after, use)).toBe(false);
      memory = after;
    }
  });

  it('흉내 낸 하루는 논문이 정한 간격만큼씩 흐른다', () => {
    const first = { atMin: LOOP.startMin, app: APPS[0], minutesInApp: 0 };
    const second = nextUse(first, 1, APPS);
    expect(second.atMin - first.atMin).toBe(DESIGN.predictionIntervalMin);
  });

  it('같은 걸음이면 같은 하루가 나온다', () => {
    const start = { atMin: LOOP.startMin, app: APPS[0], minutesInApp: 0 };
    const once = nextUse(start, 7, APPS);
    const twice = nextUse(start, 7, APPS);
    expect(once).toEqual(twice);
  });

  it('앱을 바꾸면 이어 본 시간이 처음으로 돌아가고, 아니면 쌓인다', () => {
    let use: Use = { atMin: LOOP.startMin, app: APPS[0], minutesInApp: 0 };
    let switched = 0;
    let stayed = 0;
    for (let step = 0; step < 120; step += 1) {
      const before = use;
      use = nextUse(use, step, APPS);
      if (use.app === before.app) {
        expect(use.minutesInApp).toBe(before.minutesInApp + DESIGN.predictionIntervalMin);
        stayed += 1;
      } else {
        expect(use.minutesInApp).toBe(DESIGN.predictionIntervalMin);
        switched += 1;
      }
    }
    // 하루가 한 앱에만 머물러도, 매 걸음 앱이 튀어도 볼 것이 없다.
    expect(switched).toBeGreaterThan(0);
    expect(stayed).toBeGreaterThan(switched);
  });
});
