import { describe, expect, it } from 'vitest';
import {
  AFFECTS,
  amplitudeFor,
  AXES,
  cycle,
  DELAY_THRESHOLD_MS,
  delayHeadroom,
  delayNoticeable,
  DIMENSIONS,
  noticeableCount,
  rms,
  sampleAt,
  verdicts,
  WAVEFORMS,
} from '../../../src/core/compliance';

describe('파형', () => {
  it('네 가지가 모두 -1과 1 사이에 있다', () => {
    for (const kind of WAVEFORMS) {
      for (let i = 0; i <= 400; i += 1) {
        const value = sampleAt(kind, i / 400);
        expect(value).toBeGreaterThanOrEqual(-1);
        expect(value).toBeLessThanOrEqual(1);
      }
    }
  });

  it('한 주기가 지나면 같은 값으로 돌아온다', () => {
    for (const kind of WAVEFORMS) {
      for (const phase of [0, 0.13, 0.37, 0.5, 0.82]) {
        expect(sampleAt(kind, phase + 3)).toBeCloseTo(sampleAt(kind, phase), 10);
      }
    }
  });

  it('음수 위상도 받아들인다', () => {
    for (const kind of WAVEFORMS) {
      expect(sampleAt(kind, -0.25)).toBeCloseTo(sampleAt(kind, 0.75), 10);
    }
  });

  /** 대칭인 세 파형은 한 주기를 고르게 나눠 뽑으면 평균이 정확히 0이다. */
  it('대칭 파형의 한 주기 평균은 0이다', () => {
    for (const kind of ['sine', 'square', 'triangle'] as const) {
      const values = cycle(kind, 512);
      const mean = values.reduce((sum, v) => sum + v, 0) / values.length;
      expect(mean).toBeCloseTo(0, 9);
    }
  });

  /*
   * 톱니는 대칭이 아니다. t = 0, 1/n, ..., (n-1)/n 에서 2t-1을 뽑으면
   * 평균이 정확히 -1/n 이 된다. 0으로 어림하지 않고 그 값 그대로 붙들어 둔다.
   * n이 커지면 0으로 다가가지만, 어느 n에서도 정확히 0은 아니다.
   */
  it('톱니파의 한 주기 평균은 정확히 -1/n 이다', () => {
    for (const n of [8, 64, 512, 2048]) {
      const values = cycle('sawtooth', n);
      const mean = values.reduce((sum, v) => sum + v, 0) / values.length;
      expect(mean).toBeCloseTo(-1 / n, 12);
    }
  });

  it('사각파는 두 값만 갖는다', () => {
    const values = new Set(cycle('square', 64));
    expect(values).toEqual(new Set([1, -1]));
  });

  it('사각파의 실효값은 1이다', () => {
    expect(rms(cycle('square', 512))).toBeCloseTo(1, 9);
  });

  it('사인파의 실효값은 1을 루트2로 나눈 값이다', () => {
    expect(rms(cycle('sine', 2048))).toBeCloseTo(1 / Math.SQRT2, 3);
  });

  it('삼각파의 실효값은 1을 루트3으로 나눈 값이다', () => {
    expect(rms(cycle('triangle', 2048))).toBeCloseTo(1 / Math.sqrt(3), 3);
  });

  it('톱니파의 실효값도 1을 루트3으로 나눈 값이다', () => {
    expect(rms(cycle('sawtooth', 2048))).toBeCloseTo(1 / Math.sqrt(3), 3);
  });

  /** 이 페이지가 하고 싶은 말이다. 네 파형은 실효값부터 서로 다르다 — 그런데 손은 못 가른다. */
  it('네 파형의 실효값이 서로 다르다', () => {
    const values = WAVEFORMS.map((kind) => rms(cycle(kind, 2048)));
    expect(new Set(values.map((v) => v.toFixed(3))).size).toBeGreaterThan(1);
  });

  it('삼각파는 네 지점에서 정확한 값을 갖는다', () => {
    expect(sampleAt('triangle', 0)).toBeCloseTo(0, 12);
    expect(sampleAt('triangle', 0.25)).toBeCloseTo(1, 12);
    expect(sampleAt('triangle', 0.5)).toBeCloseTo(0, 12);
    expect(sampleAt('triangle', 0.75)).toBeCloseTo(-1, 12);
  });

  it('요청한 만큼 뽑는다', () => {
    for (const count of [8, 64, 300]) expect(cycle('sine', count)).toHaveLength(count);
  });

  it('빈 목록의 실효값은 0이다', () => {
    expect(rms([])).toBe(0);
  });
});

describe('누르는 깊이와 세기', () => {
  it('깊이가 0이면 울리지 않는다', () => {
    for (const k of [0.5, 1, 3]) expect(amplitudeFor(0, k)).toBe(0);
  });

  it('깊이가 늘면 세기도 줄지 않는다', () => {
    let previous = -1;
    for (let d = 0; d <= 1; d += 0.02) {
      const value = amplitudeFor(d, 1.4);
      expect(value).toBeGreaterThanOrEqual(previous - 1e-12);
      previous = value;
    }
  });

  it('굳을수록 같은 깊이에서 더 세게 울린다', () => {
    expect(amplitudeFor(0.4, 2)).toBeGreaterThan(amplitudeFor(0.4, 1));
  });

  it('세기는 1을 넘지 않는다', () => {
    for (const d of [0.5, 1, 5]) for (const k of [1, 5, 50]) {
      expect(amplitudeFor(d, k)).toBeLessThanOrEqual(1);
    }
  });

  it('범위 밖의 깊이도 안으로 끌어당긴다', () => {
    expect(amplitudeFor(-3, 1)).toBe(0);
    expect(amplitudeFor(9, 1)).toBe(1);
  });
});

describe('초록이 밝힌 것', () => {
  it('문턱은 25밀리초다', () => {
    expect(DELAY_THRESHOLD_MS).toBe(25);
    expect(delayNoticeable(25)).toBe(false);
    expect(delayNoticeable(25.1)).toBe(true);
    expect(delayNoticeable(0)).toBe(false);
  });

  it('남은 여유는 문턱에서 뺀 값이다', () => {
    expect(delayHeadroom(10)).toBe(15);
    expect(delayHeadroom(25)).toBe(0);
    expect(delayHeadroom(40)).toBe(-15);
  });

  /** 초록의 네 줄을 그대로 옮겼는지 표에서 되짚는다. */
  it('파형은 어떤 느낌도 움직이지 않는다', () => {
    for (const dimension of DIMENSIONS) expect(AFFECTS.waveform[dimension]).toBe(false);
  });

  it('지연은 네 느낌을 모두 움직인다', () => {
    for (const dimension of DIMENSIONS) expect(AFFECTS.delay[dimension]).toBe(true);
  });

  it('축은 불쾌함만 빼고 움직인다', () => {
    expect(AFFECTS.axis.soft).toBe(true);
    expect(AFFECTS.axis.smooth).toBe(true);
    expect(AFFECTS.axis.elastic).toBe(true);
    expect(AFFECTS.axis.unpleasant).toBe(false);
  });

  it('축이 움직이는 느낌은 지연이 움직이는 것의 부분집합이다', () => {
    for (const dimension of DIMENSIONS) {
      if (AFFECTS.axis[dimension]) expect(AFFECTS.delay[dimension]).toBe(true);
    }
  });

  it('축은 셋이다', () => {
    expect(AXES).toHaveLength(3);
  });
});

describe('판정', () => {
  it('세 가지 설정에 대해 하나씩 나온다', () => {
    const list = verdicts({ delay: 10 });
    expect(list.map((v) => v.factor)).toEqual(['waveform', 'delay', 'axis']);
  });

  it('파형은 언제나 안 느껴진다', () => {
    for (const delay of [0, 10, 25, 60, 100]) {
      const waveform = verdicts({ delay }).find((v) => v.factor === 'waveform')!;
      expect(waveform.noticeable).toBe(false);
      expect(waveform.dimensions).toEqual([]);
    }
  });

  it('지연은 문턱을 넘을 때만 느껴진다', () => {
    expect(verdicts({ delay: 20 }).find((v) => v.factor === 'delay')!.noticeable).toBe(false);
    expect(verdicts({ delay: 30 }).find((v) => v.factor === 'delay')!.noticeable).toBe(true);
  });

  it('느껴지지 않는 설정에는 움직이는 느낌도 없다', () => {
    for (const delay of [0, 25, 26, 100]) {
      for (const verdict of verdicts({ delay })) {
        if (!verdict.noticeable) expect(verdict.dimensions).toEqual([]);
        else expect(verdict.dimensions.length).toBeGreaterThan(0);
      }
    }
  });

  it('느껴지는 설정의 수는 지연에 따라 하나 또는 둘이다', () => {
    // 축은 언제나 느껴지고 파형은 언제나 안 느껴지므로, 지연만이 수를 바꾼다.
    expect(noticeableCount({ delay: 10 })).toBe(1);
    expect(noticeableCount({ delay: 40 })).toBe(2);
  });
});
