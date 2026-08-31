import { describe, expect, it } from 'vitest';
import {
  BODIES,
  FLAGS,
  GUAS,
  isAskable,
  isSameQuestion,
  normalizeQuestion,
  readingOf,
  refusalOf,
  seedOf,
  talismanOf,
} from '@core/oracle';

const DAY = new Date(2026, 7, 31);
const OTHER_DAY = new Date(2026, 8, 1);

describe('물음 다루기', () => {
  it('띄어쓰기와 대소문자 차이는 같은 물음으로 본다', () => {
    expect(isSameQuestion('올해  이직해도  될까', '올해 이직해도 될까')).toBe(true);
    expect(normalizeQuestion('  Should I GO  ')).toBe('should i go');
  });

  it('너무 짧은 물음은 받지 않는다', () => {
    expect(isAskable('음')).toBe(false);
    expect(isAskable('올해 이직해도 될까')).toBe(true);
  });
});

describe('점사', () => {
  it('같은 물음과 같은 날이면 같은 답이 나온다', () => {
    // 변덕스럽지 않다는 인상이 이 페이지의 전부다. 이 성질이 깨지면 신점이 아니라 뽑기가 된다.
    const first = readingOf('올해 이직해도 될까', 'blue', DAY);
    const second = readingOf('올해  이직해도 될까 ', 'blue', DAY);
    expect(second).toEqual(first);
  });

  it('날이 바뀌면 답도 달라진다', () => {
    const today = readingOf('올해 이직해도 될까', 'blue', DAY);
    const tomorrow = readingOf('올해 이직해도 될까', 'blue', OTHER_DAY);
    expect(tomorrow.seed).not.toBe(today.seed);
  });

  it('깃발이 다르면 답도 달라진다', () => {
    const blue = readingOf('같은 물음', 'blue', DAY);
    const red = readingOf('같은 물음', 'red', DAY);
    expect(red.seed).not.toBe(blue.seed);
  });

  it('풀이는 뽑은 깃발의 갈래에서만 나온다', () => {
    for (const flag of FLAGS) {
      const reading = readingOf('무엇을 해야 하나', flag.id, DAY);
      for (const line of reading.body) {
        expect(BODIES[flag.id]).toContainEqual(line);
      }
    }
  });

  it('풀이 두 줄이 서로 겹치지 않는다', () => {
    for (const flag of FLAGS) {
      const reading = readingOf('겹치는지 본다', flag.id, DAY);
      expect(reading.body).toHaveLength(2);
      expect(reading.body[0]).not.toEqual(reading.body[1]);
    }
  });

  it('모든 조각이 세 언어를 갖춘다', () => {
    const reading = readingOf('세 언어를 갖췄나', 'black', DAY);
    const parts = [reading.opening, reading.gua, reading.warning, reading.remedy, reading.term, ...reading.body];
    for (const part of parts) {
      for (const locale of ['ko', 'en', 'ja'] as const) {
        expect(part[locale].trim()).toBeTruthy();
      }
    }
  });

  it('괘는 정해진 목록에서만 나온다', () => {
    expect(GUAS).toContainEqual(readingOf('괘를 본다', 'white', DAY).gua);
  });

  it('물음이 다르면 씨앗도 다르다', () => {
    expect(seedOf('가', 'blue', DAY)).not.toBe(seedOf('나', 'blue', DAY));
  });
});

describe('거절', () => {
  it('같은 물음에는 같은 거절이 돌아온다', () => {
    expect(refusalOf('두 번 묻는다', DAY)).toEqual(refusalOf('두 번 묻는다', DAY));
  });
});

describe('부적', () => {
  it('같은 씨앗이면 같은 그림이 나온다', () => {
    const seed = seedOf('부적을 본다', 'red', DAY);
    expect(talismanOf(seed)).toEqual(talismanOf(seed));
  });

  it('씨앗이 다르면 그림도 달라진다', () => {
    const a = talismanOf(seedOf('물음 하나', 'red', DAY));
    const b = talismanOf(seedOf('물음 둘', 'red', DAY));
    expect(a.strokes.join('|')).not.toBe(b.strokes.join('|'));
  });

  it('기둥과 갈고리는 항상 있고 획이 좌표 안에 머문다', () => {
    const talisman = talismanOf(seedOf('좌표를 본다', 'blue', DAY));
    expect(talisman.strokes.length).toBeGreaterThanOrEqual(5);
    const numbers = talisman.strokes.join(' ').match(/-?\d+(\.\d+)?/g) ?? [];
    for (const value of numbers.map(Number)) {
      expect(value).toBeGreaterThanOrEqual(0);
      expect(value).toBeLessThanOrEqual(talisman.size);
    }
  });
});
