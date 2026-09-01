/**
 * 기록에서 되짚는 스트레스 모형.
 *
 * 맥락 값마다 로그 오즈 무게를 세어 더한다(평활을 붙인 나이브 베이즈를 로그 오즈로 적은 꼴).
 * 굳이 이 모형을 고른 이유는 두 가지다. 하나는 기록 몇백 줄로도 무너지지 않는다는 것,
 * 다른 하나는 무게가 그대로 말이 된다는 것이다 — "밤은 +0.8" 처럼 읽힌다.
 *
 * 이 모형은 숨은 참값을 모른다. 기록만 본다. 그래서 되짚은 값은 참값과 어긋난다.
 */

import { FACETS, HIGH_THRESHOLD, SMOOTHING, VALUES } from './config';
import type { Facet, Fitted, Record_, Situation } from './types';

function sigmoid(x: number): number {
  return 1 / (1 + Math.exp(-x));
}

export function isHigh(record: Record_): boolean {
  return record.level >= HIGH_THRESHOLD;
}

export function fit(records: readonly Record_[]): Fitted {
  const high = records.filter(isHigh).length;
  const low = records.length - high;
  const highRate = records.length === 0 ? 0 : high / records.length;

  const weights = {} as Record<Facet, Record<string, number>>;
  for (const facet of FACETS) {
    weights[facet] = {};
    for (const value of VALUES[facet]) {
      const withValue = records.filter((record) => record.situation[facet] === value);
      const highHere = withValue.filter(isHigh).length;
      const lowHere = withValue.length - highHere;
      const size = VALUES[facet].length;
      // 이 값이 높은 쪽에 얼마나 몰려 있는가를, 전체 쏠림을 뺀 뒤에 본다.
      const inHigh = (highHere + SMOOTHING) / (high + SMOOTHING * size);
      const inLow = (lowHere + SMOOTHING) / (low + SMOOTHING * size);
      weights[facet][value] = Math.log(inHigh / inLow);
    }
  }

  const base = (high + SMOOTHING) / (low + SMOOTHING);
  return { weights, bias: Math.log(base), count: records.length, highRate };
}

/** 이 상황에서 스트레스가 높을 확률. */
export function probability(fitted: Fitted, situation: Situation): number {
  let sum = fitted.bias;
  for (const facet of FACETS) sum += fitted.weights[facet][situation[facet]] ?? 0;
  return sigmoid(sum);
}
