/**
 * 반사실 찾기와 섀플리 값.
 *
 * 상황이 320가지뿐이라 **전부 세어 본다.** 근사도 표집도 하지 않는다. 반사실을 찾는 일이
 * 보통 어려운 이유는 특징 공간이 크기 때문인데, 여기서는 맥락이 넷이고 값이 몇 개씩이라
 * 남김없이 훑는 편이 빠르고 무엇보다 정확하다.
 *
 * 섀플리도 마찬가지다. 바꾼 맥락이 최대 넷이므로 부분집합이 16가지고, 전부 세면 끝난다.
 * 표집으로 어림잡을 이유가 없다. 그래서 이바지들의 합이 확률 변화와 **정확히** 같아진다.
 */

import { FACETS, VALUES } from './config';
import { probability } from './model';
import type { Contribution, Counterfactual, Facet, Fitted, Record_, Situation } from './types';
import { timesSeen } from './log';

/** 상황 320가지를 전부 만든다. */
export function allSituations(): Situation[] {
  let out: Situation[] = [{} as Situation];
  for (const facet of FACETS) {
    const next: Situation[] = [];
    for (const partial of out) {
      for (const value of VALUES[facet]) next.push({ ...partial, [facet]: value });
    }
    out = next;
  }
  return out;
}

export interface SearchOptions {
  /** 바꾸지 않을 맥락. 논문의 constraint 기능이다. */
  locked?: readonly Facet[];
  /** 이 확률 아래로 내려가는 것만 반사실로 본다. */
  target?: number;
}

/**
 * 목표 상황보다 스트레스 확률이 낮은 상황들을 전부 찾는다.
 * 바꾼 것이 적은 순, 그다음 확률이 낮은 순으로 놓는다(논문의 정렬 기준 둘).
 */
export function findCounterfactuals(
  fitted: Fitted,
  records: readonly Record_[],
  target: Situation,
  options: SearchOptions = {},
): Counterfactual[] {
  const locked = new Set(options.locked ?? []);
  const base = probability(fitted, target);
  const ceiling = options.target ?? base;
  const found: Counterfactual[] = [];

  for (const situation of allSituations()) {
    const changed = FACETS.filter((facet) => situation[facet] !== target[facet]);
    if (changed.length === 0) continue;
    if (changed.some((facet) => locked.has(facet))) continue;
    const p = probability(fitted, situation);
    if (p >= ceiling) continue;
    found.push({
      situation,
      probability: p,
      changes: changed.length,
      changed,
      seen: timesSeen(records, situation),
      drop: base - p,
    });
  }

  return found.sort((a, b) => a.changes - b.changes || a.probability - b.probability);
}

/**
 * 바꾼 맥락마다의 이바지. 정확한 섀플리 값이다.
 *
 * v(S) = 목표 상황에서 S에 든 맥락만 바꿨을 때의 확률.
 * phi_i = 부분집합마다의 가중 평균 기여. 전부 더하면 v(전체) - v(빈집합)과 같다.
 */
export function contributions(
  fitted: Fitted,
  target: Situation,
  counterfactual: Situation,
): Contribution[] {
  const changed = FACETS.filter((facet) => counterfactual[facet] !== target[facet]);
  const size = changed.length;
  if (size === 0) return [];

  const value = (subset: readonly Facet[]): number => {
    const mixed = { ...target };
    for (const facet of subset) mixed[facet] = counterfactual[facet];
    return probability(fitted, mixed);
  };

  const factorial = (n: number): number => (n <= 1 ? 1 : n * factorial(n - 1));

  return changed.map((facet) => {
    const others = changed.filter((entry) => entry !== facet);
    let total = 0;
    // 나머지 맥락들의 부분집합을 전부 훑는다. 최대 8가지다.
    for (let mask = 0; mask < 1 << others.length; mask += 1) {
      const subset = others.filter((_, index) => (mask >> index) & 1);
      const weight = (factorial(subset.length) * factorial(size - subset.length - 1)) / factorial(size);
      total += weight * (value([...subset, facet]) - value(subset));
    }
    return { facet, from: target[facet], to: counterfactual[facet], value: total };
  });
}
