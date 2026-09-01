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
  CONDITIONS,
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
