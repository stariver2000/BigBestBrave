/**
 * 일기 짓기.
 *
 * 관찰을 구간으로 접은 뒤, 구간마다 정해진 묶음에서 문장을 하나씩 고른다.
 * 고르는 데 쓰는 씨앗은 방문 횟수와 날짜에서 나온다. 같은 날 같은 방문에는 같은 일기가 나오고,
 * 다음 방문에는 다른 문장이 나온다.
 *
 * 문장 대신 "어느 묶음의 몇 번째"만 저장한다. 그래야 나중에 언어를 바꿔도 지난 일기가 다시 읽힌다.
 */

import { createRandom, hashText, randomIndex } from '../random';
import { INNER, INTENT, OPENING, RETURN, STAY } from './config';
import type { Localized } from './types';
import { hourBand, moodOf, returnBand, stayBand } from './observe';
import type { FragmentRef, Observation, StoredEntry } from './types';

/** 묶음 이름 -> 문장 목록. 저장된 자리를 다시 문장으로 되돌릴 때 쓴다. */
const POOLS: Record<string, readonly Localized[]> = {
  inner: INNER,
  intent: INTENT,
  ...Object.fromEntries(Object.entries(OPENING).map(([key, value]) => [`opening:${key}`, value])),
  ...Object.fromEntries(Object.entries(RETURN).map(([key, value]) => [`return:${key}`, value])),
  ...Object.fromEntries(Object.entries(STAY).map(([key, value]) => [`stay:${key}`, value])),
};

export function composeEntry(observation: Observation, at: number): StoredEntry {
  const seed = hashText(`${observation.visitCount}|${new Date(at).toDateString()}`);
  const random = createRandom(seed);

  const pools = [
    `opening:${hourBand(observation.hour)}`,
    `return:${returnBand(observation.sinceLast)}`,
    `stay:${stayBand(observation.stay)}`,
    'inner',
    'intent',
  ];

  const lines: FragmentRef[] = pools.map((pool) => ({
    pool,
    index: randomIndex(POOLS[pool].length, random),
  }));

  return { at, mood: moodOf(observation), lines, visitCount: observation.visitCount };
}

/** 저장된 자리를 지금 언어의 문장으로 되돌린다. 묶음이 사라졌으면 그 줄만 건너뛴다. */
export function renderEntry(entry: StoredEntry, locale: keyof Localized): string[] {
  return entry.lines
    .map((ref) => POOLS[ref.pool]?.[ref.index])
    .filter((line): line is Localized => line !== undefined)
    .map((line) => line[locale]);
}

/**
 * 일기를 기억에 넣는다.
 *
 * 같은 방문의 일기는 더하지 않고 갈아 끼운다. 머무는 동안 일기가 다시 쓰이는데,
 * 그때마다 쌓으면 한 번의 방문이 여러 장으로 남는다.
 */
export function upsertEntry(entries: readonly StoredEntry[], entry: StoredEntry): StoredEntry[] {
  const others = entries.filter((item) => item.visitCount !== entry.visitCount);
  return [...others, entry].sort((a, b) => a.visitCount - b.visitCount);
}

/** 이 사물이 아는 문장 수. 화면에서 어휘가 좁다는 사실을 밝힐 때 쓴다. */
export function vocabularySize(): number {
  return Object.values(POOLS).reduce((total, pool) => total + pool.length, 0);
}
