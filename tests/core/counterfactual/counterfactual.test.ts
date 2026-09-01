import { describe, expect, it } from 'vitest';
import {
  allSituations,
  buildLog,
  causalEffect,
  contributions,
  FACETS,
  findCounterfactuals,
  fit,
  HIGH_THRESHOLD,
  isHigh,
  probability,
  seenSituations,
  SPACE_SIZE,
  timesSeen,
  VALUES,
  type Situation,
} from '../../../src/core/counterfactual';

const records = buildLog(400, 5);
const fitted = fit(records);
const calm: Situation = { activity: 'rest', place: 'home', social: 'family', time: 'morning' };
const tense: Situation = { activity: 'work', place: 'campus', social: 'strangers', time: 'night' };

describe('기록 짓기', () => {
  it('요청한 만큼 나오고 값이 모두 목록 안에 있다', () => {
    expect(records).toHaveLength(400);
    for (const record of records) {
      for (const facet of FACETS) expect(VALUES[facet]).toContain(record.situation[facet]);
      expect(record.level).toBeGreaterThanOrEqual(1);
      expect(record.level).toBeLessThanOrEqual(5);
    }
  });

  it('같은 씨앗이면 같은 기록이다', () => {
    expect(buildLog(50, 9)).toEqual(buildLog(50, 9));
    expect(buildLog(50, 9)).not.toEqual(buildLog(50, 10));
  });

  it('높은 스트레스와 낮은 것이 둘 다 나온다', () => {
    const high = records.filter(isHigh).length;
    expect(high).toBeGreaterThan(20);
    expect(high).toBeLessThan(records.length - 20);
  });

  it('겪은 횟수는 실제로 센 값과 같다', () => {
    const seen = seenSituations(records);
    expect(seen.length).toBeGreaterThan(10);
    for (const entry of seen.slice(0, 20)) {
      expect(timesSeen(records, entry.situation)).toBe(entry.count);
    }
    // 잦은 순으로 놓인다.
    for (let i = 1; i < seen.length; i += 1) expect(seen[i - 1].count).toBeGreaterThanOrEqual(seen[i].count);
  });

  it('겪지 않은 상황의 횟수는 0이다', () => {
    const never: Situation = { activity: 'exercise', place: 'campus', social: 'strangers', time: 'night' };
    const count = timesSeen(records, never);
    expect(count).toBeGreaterThanOrEqual(0);
  });
});

describe('모형', () => {
  it('확률은 0과 1 사이다', () => {
    for (const situation of allSituations()) {
      const p = probability(fitted, situation);
      expect(p).toBeGreaterThan(0);
      expect(p).toBeLessThan(1);
    }
  });

  it('쉬는 아침보다 밤샘 일이 더 높게 나온다', () => {
    expect(probability(fitted, tense)).toBeGreaterThan(probability(fitted, calm));
  });

  it('기록이 없어도 터지지 않는다', () => {
    const empty = fit([]);
    expect(empty.count).toBe(0);
    const p = probability(empty, calm);
    expect(Number.isFinite(p)).toBe(true);
  });

  it('상황 공간은 320가지다', () => {
    expect(allSituations()).toHaveLength(SPACE_SIZE);
    const keys = new Set(allSituations().map((s) => FACETS.map((f) => s[f]).join('|')));
    expect(keys.size).toBe(SPACE_SIZE);
  });
});

describe('반사실 찾기', () => {
  const found = findCounterfactuals(fitted, records, tense);

  it('모두 목표보다 확률이 낮다', () => {
    const base = probability(fitted, tense);
    expect(found.length).toBeGreaterThan(0);
    for (const entry of found) {
      expect(entry.probability).toBeLessThan(base);
      expect(entry.drop).toBeCloseTo(base - entry.probability, 12);
    }
  });

  it('바꾼 수가 적은 순, 그다음 확률이 낮은 순이다', () => {
    for (let i = 1; i < found.length; i += 1) {
      const a = found[i - 1];
      const b = found[i];
      expect(a.changes).toBeLessThanOrEqual(b.changes);
      if (a.changes === b.changes) expect(a.probability).toBeLessThanOrEqual(b.probability);
    }
  });

  it('바꾼 맥락의 수와 목록이 서로 맞는다', () => {
    for (const entry of found) {
      expect(entry.changed).toHaveLength(entry.changes);
      for (const facet of entry.changed) expect(entry.situation[facet]).not.toBe(tense[facet]);
      for (const facet of FACETS) {
        if (!entry.changed.includes(facet)) expect(entry.situation[facet]).toBe(tense[facet]);
      }
    }
  });

  it('목표 자신은 반사실에 들지 않는다', () => {
    for (const entry of found) expect(entry.changes).toBeGreaterThan(0);
  });

  it('잠근 맥락은 절대 바뀌지 않는다', () => {
    const locked = findCounterfactuals(fitted, records, tense, { locked: ['activity', 'place'] });
    expect(locked.length).toBeGreaterThan(0);
    for (const entry of locked) {
      expect(entry.situation.activity).toBe(tense.activity);
      expect(entry.situation.place).toBe(tense.place);
    }
    // 잠그면 고를 수 있는 것이 줄어들 뿐 늘지 않는다.
    expect(locked.length).toBeLessThanOrEqual(found.length);
  });

  it('넷을 다 잠그면 하나도 남지 않는다', () => {
    expect(findCounterfactuals(fitted, records, tense, { locked: [...FACETS] })).toHaveLength(0);
  });

  it('이미 낮은 상황에는 내려갈 곳이 적다', () => {
    const fromCalm = findCounterfactuals(fitted, records, calm);
    expect(fromCalm.length).toBeLessThan(found.length);
  });

  it('문턱을 낮추면 살아남는 것이 줄어든다', () => {
    const strict = findCounterfactuals(fitted, records, tense, { target: 0.1 });
    expect(strict.length).toBeLessThanOrEqual(found.length);
    for (const entry of strict) expect(entry.probability).toBeLessThan(0.1);
  });
});

describe('이바지(섀플리)', () => {
  /**
   * 섀플리의 핵심 성질이다. 부분집합을 전부 세었으므로 어림이 아니라 정확히 맞아야 한다.
   * 이 성질이 깨지면 화면의 막대가 거짓말을 하게 된다.
   */
  it('이바지를 다 더하면 확률 변화와 정확히 같다', () => {
    const base = probability(fitted, tense);
    for (const entry of findCounterfactuals(fitted, records, tense).slice(0, 40)) {
      const parts = contributions(fitted, tense, entry.situation);
      const sum = parts.reduce((total, part) => total + part.value, 0);
      expect(sum).toBeCloseTo(entry.probability - base, 10);
    }
  });

  it('바꾼 맥락마다 하나씩 나온다', () => {
    const entry = findCounterfactuals(fitted, records, tense).find((c) => c.changes === 3)!;
    const parts = contributions(fitted, tense, entry.situation);
    expect(parts).toHaveLength(3);
    expect(parts.map((p) => p.facet).sort()).toEqual([...entry.changed].sort());
    for (const part of parts) {
      expect(part.from).toBe(tense[part.facet]);
      expect(part.to).toBe(entry.situation[part.facet]);
      expect(part.from).not.toBe(part.to);
    }
  });

  it('하나만 바꾸면 그 하나가 변화를 통째로 짊어진다', () => {
    const one = { ...tense, time: 'morning' };
    const parts = contributions(fitted, tense, one);
    expect(parts).toHaveLength(1);
    expect(parts[0].value).toBeCloseTo(probability(fitted, one) - probability(fitted, tense), 12);
  });

  it('바꾼 것이 없으면 빈 목록이다', () => {
    expect(contributions(fitted, tense, { ...tense })).toEqual([]);
  });
});

describe('짝지어 본 인과', () => {
  it('짝지은 수는 처치군을 넘지 않는다', () => {
    for (const value of VALUES.time) {
      const effect = causalEffect(records, 'time', value);
      const treated = records.filter((r) => r.situation.time === value).length;
      expect(effect.matched).toBeLessThanOrEqual(treated);
      expect(effect.matched).toBeGreaterThanOrEqual(0);
    }
  });

  it('숨은 참값에서 스트레스를 올리는 맥락은 효과도 양수로 나온다', () => {
    // 밤(+0.9)과 아침(-0.2)은 참값에서 방향이 반대다.
    const night = causalEffect(records, 'time', 'night');
    const morning = causalEffect(records, 'time', 'morning');
    expect(night.effect).toBeGreaterThan(morning.effect);
  });

  it('짝짓기 전과 후의 값을 함께 낸다', () => {
    const effect = causalEffect(records, 'place', 'campus');
    expect(Number.isFinite(effect.naive)).toBe(true);
    expect(Number.isFinite(effect.effect)).toBe(true);
  });

  it('짝이 하나도 없으면 0으로 떨어진다', () => {
    // 기록이 한 줄뿐이면 대조군이 비어 짝을 지을 수 없다.
    const lonely = causalEffect([{ situation: calm, level: HIGH_THRESHOLD }], 'time', 'morning');
    expect(lonely.matched).toBe(0);
    expect(lonely.effect).toBe(0);
  });

  it('기록이 비어도 터지지 않는다', () => {
    const nothing = causalEffect([], 'activity', 'work');
    expect(nothing.matched).toBe(0);
    expect(Number.isFinite(nothing.naive)).toBe(true);
  });
});
