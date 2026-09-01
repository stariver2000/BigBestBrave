import { describe, expect, it } from 'vitest';
import {
  arcminutesOf,
  millimetresFor,
  compare,
  contrastFactor,
  contrastOf,
  CONTRAST_PLATEAU,
  CRITICAL_RESERVE,
  DISTANCE,
  dioptreGap,
  INITIAL,
  logMarOf,
  MAX_WPM,
  RANGE,
  read,
  sizeFactor,
  switchCost,
  wordsPerMinute,
  type Setting,
} from '../../../src/core/legibility';

const base: Setting = { ...INITIAL };

describe('눈에 맺히는 크기', () => {
  it('가까울수록 크게 맺힌다', () => {
    expect(arcminutesOf(3, DISTANCE.phone)).toBeGreaterThan(arcminutesOf(3, DISTANCE.ar));
  });

  it('거리가 절반이면 크기는 거의 두 배다', () => {
    // 작은 각도에서는 탄젠트가 거의 선형이라 두 배에 아주 가깝다.
    const near = arcminutesOf(3, 500);
    const far = arcminutesOf(3, 1000);
    expect(near / far).toBeGreaterThan(1.99);
    expect(near / far).toBeLessThan(2.01);
  });

  it('5분각이 logMAR 0이다', () => {
    expect(logMarOf(5)).toBeCloseTo(0, 10);
    expect(logMarOf(50)).toBeCloseTo(1, 10);
    expect(logMarOf(0.5)).toBeCloseTo(-1, 10);
  });

  /*
   * 여기서 logMAR은 '글자 크기'를 재는 눈금이다(print size). 클수록 큰 글자다.
   * 시력을 재는 임상 logMAR과 방향이 반대이니 헷갈리지 않게 적어 둔다.
   */
  it('글자가 클수록 logMAR도 커진다', () => {
    for (let mm = 2; mm < 8; mm += 0.5) {
      expect(logMarOf(arcminutesOf(mm + 0.5, 400))).toBeGreaterThan(logMarOf(arcminutesOf(mm, 400)));
    }
  });
});

describe('대비', () => {
  /** 이 페이지의 핵심 물리다. 투과형 AR은 검정을 만들 수 없다. */
  it('AR의 대비는 둘레가 밝을수록 0으로 다가간다', () => {
    let previous = Infinity;
    for (const ambient of [50, 200, 1000, 5000, 20000, 100000]) {
      const value = contrastOf('ar', ambient);
      expect(value).toBeLessThan(previous);
      expect(value).toBeGreaterThan(0);
      previous = value;
    }
    expect(contrastOf('ar', 1e7)).toBeCloseTo(0, 3);
  });

  it('폰의 대비는 둘레가 밝아져도 AR만큼 무너지지 않는다', () => {
    for (const ambient of [1000, 5000, 20000]) {
      expect(contrastOf('phone', ambient)).toBeGreaterThan(contrastOf('ar', ambient));
    }
  });

  it('어두운 곳에서는 둘 다 대비가 크다', () => {
    expect(contrastOf('ar', 20)).toBeGreaterThan(CONTRAST_PLATEAU);
    expect(contrastOf('phone', 20)).toBeGreaterThan(CONTRAST_PLATEAU);
  });

  it('대비 몫은 0과 1 사이이고 문턱에서 1이 된다', () => {
    expect(contrastFactor(0)).toBe(0);
    expect(contrastFactor(CONTRAST_PLATEAU)).toBeCloseTo(1, 10);
    expect(contrastFactor(1000)).toBe(1);
    for (const value of [0, 0.02, 0.1, 0.5, 5, 100]) {
      expect(contrastFactor(value)).toBeGreaterThanOrEqual(0);
      expect(contrastFactor(value)).toBeLessThanOrEqual(1);
    }
  });
});

describe('크기 몫', () => {
  it('여유가 없으면 0, 문턱을 넘으면 1이다', () => {
    expect(sizeFactor(0)).toBe(0);
    expect(sizeFactor(-1)).toBe(0);
    expect(sizeFactor(CRITICAL_RESERVE)).toBeCloseTo(1, 10);
    expect(sizeFactor(CRITICAL_RESERVE * 3)).toBe(1);
  });

  it('여유가 늘면 몫도 줄지 않는다', () => {
    let previous = -1;
    for (let reserve = -0.2; reserve <= 0.6; reserve += 0.02) {
      const value = sizeFactor(reserve);
      expect(value).toBeGreaterThanOrEqual(previous - 1e-12);
      previous = value;
    }
  });
});

describe('읽기 속도', () => {
  it('두 몫이 모두 1일 때 가장 빠르다', () => {
    expect(wordsPerMinute(1, 1)).toBe(MAX_WPM);
  });

  it('한 몫이라도 0이면 못 읽는다', () => {
    expect(wordsPerMinute(0, 1)).toBe(0);
    expect(wordsPerMinute(1, 0)).toBe(0);
  });
});

describe('시선 옮기기', () => {
  it('두 화면의 디옵터 차이가 0보다 크다', () => {
    expect(dioptreGap()).toBeGreaterThan(0);
    expect(dioptreGap()).toBeCloseTo(1000 / DISTANCE.phone - 1000 / DISTANCE.ar, 10);
  });

  it('한 번 옮기는 값은 1초 안팎이다', () => {
    expect(switchCost()).toBeGreaterThan(0.5);
    expect(switchCost()).toBeLessThan(3);
  });
});

describe('한 화면 읽기', () => {
  /** 이 항등식이 화면의 두 막대를 떠받친다. */
  it('걸린 시간은 읽는 시간과 옮기는 시간의 합이다', () => {
    for (const ambient of [100, 800, 3000, 12000]) {
      for (const lookAways of [0, 3, 12]) {
        for (const surface of ['ar', 'phone'] as const) {
          const value = read(surface, { ...base, ambient, lookAways });
          expect(value.totalSeconds).toBeCloseTo(value.readSeconds + value.switchSeconds, 9);
        }
      }
    }
  });

  it('AR은 시선을 옮기지 않는다', () => {
    for (const lookAways of [0, 5, 40]) {
      expect(read('ar', { ...base, lookAways }).switchSeconds).toBe(0);
    }
  });

  it('폰의 옮기는 시간은 돌아보는 횟수에 정비례한다', () => {
    const one = read('phone', { ...base, lookAways: 1 }).switchSeconds;
    expect(read('phone', { ...base, lookAways: 7 }).switchSeconds).toBeCloseTo(one * 7, 9);
    expect(read('phone', { ...base, lookAways: 0 }).switchSeconds).toBe(0);
  });

  it('같은 각도를 내려면 먼 화면일수록 글자가 커야 한다', () => {
    expect(read('ar', base).millimetres).toBeGreaterThan(read('phone', base).millimetres);
  });

  it('밝은 곳에서 AR은 읽히지 않게 된다', () => {
    const dim = read('ar', { ...base, ambient: 100 });
    const bright = read('ar', { ...base, ambient: 20000 });
    expect(bright.wordsPerMinute).toBeLessThan(dim.wordsPerMinute);
    expect(bright.totalSeconds).toBeGreaterThan(dim.totalSeconds);
  });

  it('둘레가 밝아져도 폰의 속도는 거의 그대로다', () => {
    const dim = read('phone', { ...base, ambient: 100 });
    const bright = read('phone', { ...base, ambient: 20000 });
    expect(bright.wordsPerMinute).toBeCloseTo(dim.wordsPerMinute, 6);
  });

  it('글자를 키우면 시간이 줄거나 그대로다', () => {
    let previous = Infinity;
    for (let arc = RANGE.arcminutes.min; arc <= RANGE.arcminutes.max; arc += 1) {
      const value = read('ar', { ...base, arcminutes: arc }).totalSeconds;
      expect(value).toBeLessThanOrEqual(previous + 1e-9);
      previous = value;
    }
  });

  it('못 읽을 만큼 작으면 시간이 무한대다', () => {
    const tiny = read('ar', { ...base, arcminutes: 1 });
    expect(tiny.wordsPerMinute).toBe(0);
    expect(tiny.totalSeconds).toBe(Number.POSITIVE_INFINITY);
  });
});

describe('두 화면 견주기', () => {
  it('이긴 쪽이 실제로 더 빠르다', () => {
    for (const ambient of [80, 500, 2000, 9000]) {
      for (const lookAways of [0, 4, 20]) {
        const verdict = compare({ ...base, ambient, lookAways });
        const winner = verdict[verdict.winner];
        const loser = verdict.winner === 'ar' ? verdict.phone : verdict.ar;
        expect(winner.totalSeconds).toBeLessThanOrEqual(loser.totalSeconds);
        expect(verdict.savedSeconds).toBeCloseTo(
          Math.abs(verdict.ar.totalSeconds - verdict.phone.totalSeconds),
          6,
        );
      }
    }
  });

  it('밀리미터와 분각은 서로 되돌아간다', () => {
    for (const arc of [8, 16, 30]) {
      for (const distance of [400, 2000]) {
        expect(arcminutesOf(millimetresFor(arc, distance), distance)).toBeCloseTo(arc, 9);
      }
    }
  });

  it('한 번도 안 돌아보면 폰이 이긴다', () => {
    // 옮길 값이 없고 폰의 화소가 더 촘촘하므로 질 이유가 없다.
    expect(compare({ ...base, lookAways: 0 }).winner).toBe('phone');
  });

  it('자주 돌아보면 AR이 이긴다', () => {
    expect(compare({ ...base, lookAways: RANGE.lookAways.max }).winner).toBe('ar');
  });

  it('아주 밝은 곳에서는 자주 돌아봐도 폰이 이긴다', () => {
    // 풍경에 잠긴 글은 아무리 눈앞에 있어도 못 읽는다.
    expect(compare({ ...base, ambient: 20000, lookAways: 20 }).winner).toBe('phone');
  });

  /** 뒤집히는 자리를 찾았다면 그 자리에서 실제로 승자가 달라야 한다. */
  it('찾아낸 뒤집힘 자리에서 답이 정말 바뀐다', () => {
    for (const ambient of [200, 1200, 6000]) {
      for (const lookAways of [1, 6, 15]) {
        const setting = { ...base, ambient, lookAways };
        const verdict = compare(setting);

        if (verdict.ambientCrossover !== null) {
          const flipped = compare({ ...setting, ambient: verdict.ambientCrossover });
          expect(flipped.winner).not.toBe(verdict.winner);
        }
        if (verdict.lookAwayCrossover !== null) {
          const flipped = compare({ ...setting, lookAways: verdict.lookAwayCrossover });
          expect(flipped.winner).not.toBe(verdict.winner);
        }
      }
    }
  });

  it('돌아보는 횟수를 늘리면 폰만 느려진다', () => {
    const few = compare({ ...base, lookAways: 2 });
    const many = compare({ ...base, lookAways: 20 });
    expect(many.phone.totalSeconds).toBeGreaterThan(few.phone.totalSeconds);
    expect(many.ar.totalSeconds).toBeCloseTo(few.ar.totalSeconds, 9);
  });

  it('처음 설정에서는 어느 한쪽이 모든 값에서 이기지 않는다', () => {
    const verdict = compare(base);
    // 폰은 더 또렷하고, AR은 옮길 일이 없다. 그래서 한쪽이 두 값을 다 가져가지 않는다.
    expect(verdict.phone.wordsPerMinute).toBeGreaterThan(verdict.ar.wordsPerMinute);
    expect(verdict.phone.switchSeconds).toBeGreaterThan(verdict.ar.switchSeconds);
  });
});
