import { describe, expect, it } from 'vitest';
import { createRandom, dayKey, hashText, pick, pickMany, shuffle } from '@core/random';

/**
 * 이 사이트의 놀이는 "무작위처럼 보이되 무작위가 아닌 것"에 기대고 있다.
 * 같은 씨앗에서 같은 것이 나온다는 보장이 깨지면, 같은 자료를 연 두 사람이 다른 문제를 받는다.
 */
describe('씨앗 난수', () => {
  it('같은 씨앗은 같은 수열을 낸다', () => {
    const first = Array.from({ length: 5 }, createRandom(20250901));
    const second = Array.from({ length: 5 }, createRandom(20250901));
    expect(first).toEqual(second);
  });

  it('다른 씨앗은 다른 수열을 낸다', () => {
    const first = createRandom(1)();
    const second = createRandom(2)();
    expect(first).not.toBe(second);
  });

  it('난수는 0 이상 1 미만이다', () => {
    const random = createRandom(7);
    for (let index = 0; index < 200; index += 1) {
      const value = random();
      expect(value).toBeGreaterThanOrEqual(0);
      expect(value).toBeLessThan(1);
    }
  });
});

describe('고르기', () => {
  const items = ['가', '나', '다', '라', '마'];

  it('고른 것은 언제나 목록 안에 있다', () => {
    const random = createRandom(11);
    for (let index = 0; index < 100; index += 1) {
      expect(items).toContain(pick(items, random));
    }
  });

  it('여러 개를 고르면 서로 겹치지 않는다', () => {
    const chosen = pickMany(items, 3, createRandom(3));
    expect(chosen).toHaveLength(3);
    expect(new Set(chosen).size).toBe(3);
  });

  it('목록보다 많이 달라고 해도 있는 만큼만 준다', () => {
    expect(pickMany(items, 99, createRandom(3))).toHaveLength(items.length);
  });

  it('섞어도 구성은 그대로고 원본은 그대로다', () => {
    const shuffled = shuffle(items, createRandom(5));
    expect([...shuffled].sort()).toEqual([...items].sort());
    expect(items).toEqual(['가', '나', '다', '라', '마']);
  });
});

describe('씨앗 만들기', () => {
  it('같은 글은 같은 수로, 다른 글은 다른 수로 간다', () => {
    expect(hashText('사랑해')).toBe(hashText('사랑해'));
    expect(hashText('사랑해')).not.toBe(hashText('사랑헤'));
  });

  it('날짜 열쇠는 하루가 지나면 달라진다', () => {
    expect(dayKey(new Date(2025, 8, 1))).toBe(dayKey(new Date(2025, 8, 1, 23, 59)));
    expect(dayKey(new Date(2025, 8, 1))).not.toBe(dayKey(new Date(2025, 8, 2)));
  });
});
