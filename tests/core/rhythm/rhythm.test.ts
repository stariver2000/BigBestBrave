import { describe, expect, it } from 'vitest';
import {
  CLOSENESS_THRESHOLDS,
  MIN_WINDOW_MS,
  PATTERNS,
  closenessOf,
  dtwDistance,
  envelopeOf,
  rank,
  similarityOf,
  totalDuration,
  type Pattern,
} from '@core/rhythm';

const pattern = (id: string, pulses: Pattern['pulses']): Pattern => ({ id, pulses });

const knock = pattern('knock', [
  { duration: 70, intensity: 1, gap: 150 },
  { duration: 70, intensity: 1, gap: 150 },
  { duration: 70, intensity: 1, gap: 400 },
]);

/** 같은 리듬을 두 배로 느리게 두드린 것. 모양은 같고 빠르기만 다르다. */
const slowKnock = pattern('slow-knock', [
  { duration: 140, intensity: 1, gap: 300 },
  { duration: 140, intensity: 1, gap: 300 },
  { duration: 140, intensity: 1, gap: 800 },
]);

const longBuzz = pattern('long-buzz', [{ duration: 900, intensity: 1, gap: 0 }]);

describe('리듬 길이', () => {
  it('마지막 떨림 뒤의 쉼은 길이에 넣지 않는다', () => {
    // 70+150 + 70+150 + 70 = 510. 마지막 400은 세지 않는다.
    expect(totalDuration(knock)).toBe(510);
  });

  it('떨림이 없으면 0이다', () => {
    expect(totalDuration(pattern('empty', []))).toBe(0);
  });
});

describe('세기 수열', () => {
  it('언제나 같은 길이로 편다', () => {
    expect(envelopeOf(knock, 510)).toHaveLength(64);
    expect(envelopeOf(longBuzz, 900)).toHaveLength(64);
  });

  it('떨림 구간은 세기가, 쉼 구간은 0이 나온다', () => {
    expect(envelopeOf(longBuzz, 900).every((value) => value === 1)).toBe(true);
  });

  it('쉼이 있는 리듬에는 0이 섞인다', () => {
    expect(envelopeOf(knock, 510).some((value) => value === 0)).toBe(true);
  });

  it('창이 리듬보다 길면 뒤쪽이 침묵으로 남는다', () => {
    // 짧은 리듬을 긴 리듬과 견줄 때 이 침묵이 곧 둘 사이의 거리가 된다.
    const envelope = envelopeOf(knock, 2000);
    expect(envelope[envelope.length - 1]).toBe(0);
  });

  it('빈 리듬은 전부 0이다', () => {
    expect(envelopeOf(pattern('empty', []), MIN_WINDOW_MS).every((value) => value === 0)).toBe(true);
  });
});

describe('동적 시간 정합', () => {
  it('같은 수열의 거리는 0이다', () => {
    expect(dtwDistance([0, 1, 0, 1], [0, 1, 0, 1])).toBe(0);
  });

  it('거리는 방향에 상관없이 같다', () => {
    const a = [0, 0.5, 1, 0];
    const b = [1, 0, 0, 0.5];
    expect(dtwDistance(a, b)).toBeCloseTo(dtwDistance(b, a), 12);
  });

  it('한 박자 밀린 수열은 완전히 다른 것보다 가깝다', () => {
    // 시간축을 늘였다 줄일 수 있어야 사람이 듣는 것과 비슷해진다.
    const base = [0, 1, 1, 0, 0, 0];
    const shifted = [0, 0, 1, 1, 0, 0];
    const opposite = [1, 0, 0, 1, 1, 1];
    expect(dtwDistance(base, shifted)).toBeLessThan(dtwDistance(base, opposite));
  });

  it('빈 수열은 최대 거리로 본다', () => {
    expect(dtwDistance([], [1, 0])).toBe(1);
  });
});

describe('닮음', () => {
  it('자기 자신과는 완전히 닮았다', () => {
    expect(similarityOf(knock, knock)).toBe(1);
    expect(closenessOf(similarityOf(knock, knock))).toBe('same');
  });

  it('빠르기가 다르면 같은 모양이라도 완전히 같지는 않다', () => {
    // 길이를 정규화해 지우지 않는다. 느리게 두드린 노크는 같은 노크가 아니라 닮은 노크다.
    // 논문이 다룬 축 하나가 진동 길이이므로, 빠르기를 지우면 그 축이 사라진다.
    const sameShape = similarityOf(knock, slowKnock);
    expect(sameShape).toBeLessThan(1);
    expect(sameShape).toBeGreaterThan(similarityOf(knock, longBuzz));
  });

  it('닮음은 방향에 상관없이 같다', () => {
    expect(similarityOf(knock, longBuzz)).toBeCloseTo(similarityOf(longBuzz, knock), 12);
  });

  it('결과는 0과 1 사이에 있다', () => {
    for (const a of PATTERNS) {
      for (const b of PATTERNS) {
        const value = similarityOf(a, b);
        expect(value).toBeGreaterThanOrEqual(0);
        expect(value).toBeLessThanOrEqual(1);
      }
    }
  });

  it('세 단계로 나눈다', () => {
    expect(closenessOf(0.99)).toBe('same');
    expect(closenessOf(0.8)).toBe('similar');
    expect(closenessOf(0.2)).toBe('distinct');
  });
});

describe('줄 세우기', () => {
  it('닮은 순으로 돌려준다', () => {
    const ranked = rank(knock);
    for (let index = 1; index < ranked.length; index += 1) {
      expect(ranked[index - 1].similarity).toBeGreaterThanOrEqual(ranked[index].similarity);
    }
  });

  it('자기 자신이 목록에 있으면 맨 앞에 온다', () => {
    const own = PATTERNS.find((item) => item.id === 'knock');
    expect(own).toBeDefined();
    expect(rank(own as Pattern)[0].patternId).toBe('knock');
  });

  it('모든 이름 붙은 리듬을 견준다', () => {
    expect(rank(knock)).toHaveLength(PATTERNS.length);
  });
});

describe('리듬 사전', () => {
  it('id가 겹치지 않는다', () => {
    const ids = PATTERNS.map((item) => item.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('모든 리듬이 떨림을 갖고 세기가 범위 안에 있다', () => {
    for (const item of PATTERNS) {
      expect(item.pulses.length).toBeGreaterThan(0);
      for (const pulse of item.pulses) {
        expect(pulse.intensity).toBeGreaterThan(0);
        expect(pulse.intensity).toBeLessThanOrEqual(1);
        expect(pulse.duration).toBeGreaterThan(0);
      }
    }
  });

  it('서로 다른 리듬으로 지어졌다', () => {
    // 이름이 다른데 모양이 같으면 고를 이유가 없다.
    for (let i = 0; i < PATTERNS.length; i += 1) {
      for (let j = i + 1; j < PATTERNS.length; j += 1) {
        expect(similarityOf(PATTERNS[i], PATTERNS[j])).toBeLessThan(CLOSENESS_THRESHOLDS.same);
      }
    }
  });
});
