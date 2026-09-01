/**
 * 자기 기록을 짓는다.
 *
 * 실제 사람의 기록을 실을 수는 없다. 그래서 숨은 참값에서 지어낸다. 다만 지어내는 방식이
 * 중요하다. 상황을 고르게 뽑으면 인과를 볼 일이 없어진다 — 짝짓기가 걷어 낼 교란이
 * 애초에 없기 때문이다. 사람은 늘 같은 자리에서 같은 일을 하므로, 여기서도 상황을
 * 치우치게 뽑고 맥락끼리 서로 얽히게 둔다. 그래야 "단순 차이"와 "짝지은 차이"가 갈린다.
 */

import { createRandom } from '../random';
import { FACETS, HABIT, HIGH_THRESHOLD, TRUTH, VALUES } from './config';
import type { Facet, Record_, Situation } from './types';

function sigmoid(x: number): number {
  return 1 / (1 + Math.exp(-x));
}

/** 치우친 확률로 하나 고르기. */
function weightedPick(values: readonly string[], weights: Record<string, number>, random: () => number): string {
  const total = values.reduce((sum, value) => sum + (weights[value] ?? 0), 0);
  let roll = random() * total;
  for (const value of values) {
    roll -= weights[value] ?? 0;
    if (roll <= 0) return value;
  }
  return values[values.length - 1];
}

/** 숨은 참값이 보는 이 상황의 위험. */
export function trueRisk(situation: Situation): number {
  const weights = TRUTH as unknown as Record<Facet, Record<string, number>>;
  let sum = TRUTH.bias;
  for (const facet of FACETS) sum += weights[facet][situation[facet]] ?? 0;
  return sigmoid(sum);
}

export function buildLog(size: number, seed: number): Record_[] {
  const random = createRandom(seed);
  const habit = HABIT as unknown as Record<Facet, Record<string, number>>;
  const records: Record_[] = [];

  for (let i = 0; i < size; i += 1) {
    const situation = {} as Situation;
    for (const facet of FACETS) situation[facet] = weightedPick(VALUES[facet], habit[facet], random);

    // 맥락끼리 얽히게 만든다. 공부는 주로 학교에서, 운동은 주로 밖에서 하는 식이다.
    if (situation.activity === 'study' && random() < 0.6) situation.place = 'campus';
    if (situation.activity === 'exercise' && random() < 0.7) situation.place = 'outside';
    if (situation.activity === 'rest' && random() < 0.65) situation.place = 'home';
    if (situation.place === 'home' && random() < 0.5) situation.social = 'alone';

    // 수준은 1~5. 위험이 높을수록 위 칸이 자주 나온다.
    const risk = trueRisk(situation);
    const roll = random();
    const level = roll < risk ? (random() < 0.5 ? HIGH_THRESHOLD : 5) : 1 + Math.floor(random() * 3);
    records.push({ situation, level });
  }
  return records;
}

/** 이 상황을 전에 몇 번이나 겪었는가. 논문의 r이다. */
export function timesSeen(records: readonly Record_[], situation: Situation): number {
  return records.filter((record) => FACETS.every((facet) => record.situation[facet] === situation[facet])).length;
}

/** 기록에 실제로 나온 상황들을 잦은 순으로. 목표 상황은 여기서만 고른다(논문도 그랬다). */
export function seenSituations(records: readonly Record_[]): { situation: Situation; count: number }[] {
  const buckets = new Map<string, { situation: Situation; count: number }>();
  for (const record of records) {
    const key = FACETS.map((facet) => record.situation[facet]).join('|');
    const found = buckets.get(key);
    if (found) found.count += 1;
    else buckets.set(key, { situation: { ...record.situation }, count: 1 });
  }
  return [...buckets.values()].sort((a, b) => b.count - a.count);
}
