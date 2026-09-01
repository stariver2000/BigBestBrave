/**
 * 거친 정확 짝짓기(coarsened exact matching).
 *
 * "밤이라서 스트레스가 높은가, 아니면 밤에 하는 일이 힘든 것인가"를 가른다.
 * 방법은 단순하다. 그 맥락이 있는 기록(처치군)과 없는 기록(대조군)을 나누고,
 * 나머지 맥락 셋의 조합이 똑같은 것끼리만 짝지어 견준다. 조합이 같은 짝이 없으면 버린다.
 * 그렇게 하면 두 무리의 남은 조건이 같아져, 차이를 그 맥락 탓으로 볼 수 있다.
 *
 * 짝짓기 전의 단순 차이도 함께 낸다. 둘이 크게 다르면 그 차이가 곧 교란이었다는 뜻이다.
 */

import { FACETS } from './config';
import type { CausalEffect, Facet, Record_ } from './types';

function mean(values: readonly number[]): number {
  return values.length === 0 ? 0 : values.reduce((sum, v) => sum + v, 0) / values.length;
}

/** 나머지 맥락 셋의 조합을 열쇠로 만든다. */
function stratumOf(record: Record_, facet: Facet): string {
  return FACETS.filter((entry) => entry !== facet)
    .map((entry) => record.situation[entry])
    .join('|');
}

export function causalEffect(records: readonly Record_[], facet: Facet, value: string): CausalEffect {
  const treated = records.filter((record) => record.situation[facet] === value);
  const control = records.filter((record) => record.situation[facet] !== value);
  const naive = mean(treated.map((r) => r.level)) - mean(control.map((r) => r.level));

  // 나머지 조건이 같은 층에서만 견준다.
  const controlByStratum = new Map<string, number[]>();
  for (const record of control) {
    const key = stratumOf(record, facet);
    const bucket = controlByStratum.get(key);
    if (bucket) bucket.push(record.level);
    else controlByStratum.set(key, [record.level]);
  }

  const pairedTreated: number[] = [];
  const pairedControl: number[] = [];
  for (const record of treated) {
    const bucket = controlByStratum.get(stratumOf(record, facet));
    if (!bucket || bucket.length === 0) continue;
    pairedTreated.push(record.level);
    // 층 안의 평균을 짝으로 삼는다. 층마다 대조가 여럿일 수 있기 때문이다.
    pairedControl.push(mean(bucket));
  }

  const treatedMean = mean(pairedTreated);
  const controlMean = mean(pairedControl);
  return {
    facet,
    value,
    treated: treatedMean,
    control: controlMean,
    effect: pairedTreated.length === 0 ? 0 : treatedMean - controlMean,
    matched: pairedTreated.length,
    naive,
  };
}
