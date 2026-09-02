import { describe, expect, it } from 'vitest';
import {
  audit,
  bankedHeight,
  clippedCount,
  honest,
  nextLie,
  radiusFactor,
  slopeFactor,
  truncationFactor,
  undone,
  type ChartSpec,
  type KnobRange,
} from '@core/chartaudit';

const spec = (over: Partial<ChartSpec> = {}): ChartSpec => ({
  kind: 'bar',
  values: [100, 104, 108, 112],
  axisMin: null,
  axisMax: null,
  width: 400,
  height: 240,
  bubbleScale: 'area',
  inverted: false,
  ...over,
});

describe('축 자르기', () => {
  it('0에서 시작하면 왜곡이 없다', () => {
    expect(truncationFactor(spec({ axisMin: 0 }))).toBe(1);
    expect(truncationFactor(spec({ axisMin: null }))).toBe(1);
  });

  it('축을 올릴수록 차이가 부풀려진다', () => {
    // 100~112 자료를 95에서 시작하면 실제 12% 차이가 훨씬 크게 읽힌다.
    expect(truncationFactor(spec({ axisMin: 95 }))).toBe(20);
    expect(truncationFactor(spec({ axisMin: 98 }))).toBe(50);
  });

  it('가장 작은 값까지 잘라내면 무한히 부풀려진다', () => {
    expect(truncationFactor(spec({ axisMin: 100 }))).toBe(Number.POSITIVE_INFINITY);
  });
});

describe('원의 크기', () => {
  it('넓이에 이으면 문제 삼지 않는다', () => {
    expect(audit(spec({ kind: 'bubble', bubbleScale: 'area', axisMin: 0 })).findings).toHaveLength(0);
  });

  it('반지름에 이으면 값의 비만큼 부풀려진다', () => {
    // 두 값의 비가 4면 넓이의 비는 16이 되어 네 배로 읽힌다.
    expect(radiusFactor(spec({ values: [10, 40] }))).toBe(4);
  });
});

describe('기울기', () => {
  it('45도에 가까우면 왜곡이 없다', () => {
    // 값이 한 칸에 100씩 오르고, 축 범위 400을 높이 400에 담으면 기울기가 정확히 1이다.
    const flat = spec({ kind: 'line', values: [0, 100, 200, 300, 400], axisMin: 0, axisMax: 400, width: 400, height: 400 });
    expect(slopeFactor(flat)).toBeCloseTo(1, 6);
    expect(audit(flat).findings).toHaveLength(0);
  });

  it('높이를 늘이면 가팔라 보인다', () => {
    const steep = spec({ kind: 'line', values: [0, 100, 200, 300, 400], axisMin: 0, axisMax: 400, width: 400, height: 1200 });
    expect(slopeFactor(steep)).toBeCloseTo(3, 6);
    expect(audit(steep).findings[0].kind).toBe('aspect-distortion');
  });

  it('높이를 줄이면 눕는다', () => {
    const flatten = spec({ kind: 'line', values: [0, 100, 200, 300, 400], axisMin: 0, axisMax: 400, width: 400, height: 100 });
    expect(slopeFactor(flatten)).toBeLessThan(1);
    expect(audit(flatten).findings[0].kind).toBe('aspect-distortion');
  });

  it('점이 하나뿐이면 기울기를 따지지 않는다', () => {
    expect(slopeFactor(spec({ kind: 'line', values: [5] }))).toBe(1);
  });
});

describe('잘린 범위와 뒤집힌 축', () => {
  it('축 위쪽이 낮으면 값이 그림 밖으로 나간다', () => {
    expect(clippedCount(spec({ axisMax: 105 }))).toBe(2);
    expect(audit(spec({ axisMax: 105 })).findings.some((f) => f.kind === 'clipped-range')).toBe(true);
  });

  it('뒤집힌 축은 배수로 재지 않는다', () => {
    const found = audit(spec({ inverted: true })).findings.find((f) => f.kind === 'inverted-axis');
    expect(found?.factor).toBeNull();
    expect(found?.severity).toBe('high');
  });
});

describe('종합', () => {
  it('정직한 막대에서는 아무것도 나오지 않는다', () => {
    const clean = audit(spec({ axisMin: 0 }));
    expect(clean.findings).toHaveLength(0);
    expect(clean.worst).toBe(1);
  });

  it('여러 요소가 겹치면 모두 짚는다', () => {
    const messy = audit(spec({ kind: 'bubble', axisMin: 95, bubbleScale: 'radius', inverted: true }));
    expect(messy.findings.map((f) => f.kind).sort()).toEqual(
      ['inverted-axis', 'radius-encoding', 'truncated-axis'].sort(),
    );
  });

  it('가장 큰 왜곡 배수를 알려 준다', () => {
    // 무한대는 세지 않는다. 화면에 보여 줄 수 있는 값만 남긴다.
    const messy = audit(spec({ kind: 'bubble', values: [10, 40], axisMin: 5, bubbleScale: 'radius' }));
    expect(messy.worst).toBeGreaterThan(1);
    expect(Number.isFinite(messy.worst)).toBe(true);
  });

  it('선 그래프의 축 자르기는 문제 삼지 않는다', () => {
    // 변화를 보는 그림이라 0에서 시작할 이유가 없다.
    expect(audit(spec({ kind: 'line', values: [100, 101, 102], axisMin: 99, axisMax: 103, height: 40 })).findings
      .some((f) => f.kind === 'truncated-axis')).toBe(false);
  });
});

describe('바로잡기', () => {
  it('막대의 축을 0으로 되돌린다', () => {
    expect(honest(spec({ axisMin: 95 })).axisMin).toBe(0);
  });

  it('원을 넓이에 잇도록 되돌린다', () => {
    expect(honest(spec({ kind: 'bubble', bubbleScale: 'radius' })).bubbleScale).toBe('area');
  });

  it('잘린 위쪽을 풀어 준다', () => {
    expect(honest(spec({ axisMax: 105 })).axisMax).toBeNull();
  });

  it('선 그래프의 높이를 45도에 맞춘다', () => {
    const steep = spec({ kind: 'line', values: [0, 100, 200, 300, 400], axisMin: 0, axisMax: 400, width: 400, height: 1200 });
    expect(bankedHeight(steep)).toBe(400);
    expect(audit(honest(steep)).findings).toHaveLength(0);
  });

  it('바로잡은 차트에는 어긋난 곳이 없다', () => {
    const messy = spec({ kind: 'bubble', values: [10, 40], axisMin: 5, bubbleScale: 'radius', inverted: true });
    expect(audit(honest(messy)).findings).toHaveLength(0);
  });
});

/**
 * 오르막은 이 페이지의 논지 그 자체다 — 숫자를 하나도 바꾸지 않고 그림만으로 얼마나 부풀릴 수 있는가.
 * 그러니 걸음이 숫자를 건드리는 순간 페이지가 하는 말이 거짓이 된다. 아래 첫 시험이 그것을 지킨다.
 */
describe('거짓말 오르막', () => {
  const range: KnobRange = { axisStep: 8, heightStep: 40, maxHeight: 460 };

  it('숫자는 한 톨도 바꾸지 않는다', () => {
    let current = spec();
    for (let guard = 0; guard < 100; guard += 1) {
      const step = nextLie(current, range);
      if (step === null) break;
      expect(step.spec.values).toEqual(current.values);
      current = step.spec;
    }
    expect(current.values).toEqual([100, 104, 108, 112]);
  });

  it('한 걸음마다 더 부풀어 보인다', () => {
    const first = nextLie(spec(), range);
    expect(first).not.toBeNull();
    expect(first!.worst).toBeGreaterThan(audit(spec()).worst);

    const second = nextLie(first!.spec, range);
    expect(second!.worst).toBeGreaterThan(first!.worst);
  });

  it('막대는 축을 올려 부풀린다', () => {
    expect(nextLie(spec(), range)?.knob).toBe('axis');
  });

  it('자료가 다 잘려 나갈 만큼은 올리지 않는다', () => {
    // 최소값이 100이고 한 걸음이 8이면 92까지 올릴 수 있고, 여덟씩 딛으므로 88에서 멈춘다.
    // 그 위로 올리면 그림에 자료가 한 걸음치도 남지 않는다.
    let current = spec();
    for (let guard = 0; guard < 100; guard += 1) {
      const step = nextLie(current, range);
      if (step === null) break;
      current = step.spec;
    }
    expect(current.axisMin).toBe(88);
    expect(Number.isFinite(audit(current).worst)).toBe(true);
  });

  it('반드시 멈춘다', () => {
    let current = spec({ kind: 'line' });
    let steps = 0;
    while (steps < 200) {
      const step = nextLie(current, range);
      if (step === null) break;
      current = step.spec;
      steps += 1;
    }
    expect(nextLie(current, range)).toBeNull();
    expect(steps).toBeLessThan(200);
  });

  it('원 그래프는 반지름에 값을 잇는 손잡이도 쓴다', () => {
    const bubble = spec({ kind: 'bubble', values: [10, 90] });
    const knobs = new Set<string>();
    let current = bubble;
    for (let guard = 0; guard < 50; guard += 1) {
      const step = nextLie(current, range);
      if (step === null) break;
      knobs.add(step.knob);
      current = step.spec;
    }
    expect(knobs.has('scale')).toBe(true);
    expect(current.bubbleScale).toBe('radius');
  });

  it('선 그래프는 높이로도 기울기를 세운다', () => {
    const line = spec({ kind: 'line', height: 100 });
    const knobs: string[] = [];
    let current = line;
    for (let guard = 0; guard < 50; guard += 1) {
      const step = nextLie(current, range);
      if (step === null) break;
      knobs.push(step.knob);
      current = step.spec;
    }
    expect(knobs).toContain('height');
  });

  it('이미 꼭대기면 더 갈 곳이 없다', () => {
    const topped = spec({ axisMin: 88, height: 460 });
    expect(nextLie(topped, range)).toBeNull();
  });
});

describe('사람이 되돌려 놓기', () => {
  it('크게 부풀었던 것을 정직한 자리로 되돌리면 알아차린 것이다', () => {
    expect(undone(12.5, 1)).toBe(true);
  });

  it('반쯤 되돌린 것으로는 아직 아니다', () => {
    expect(undone(12.5, 2)).toBe(false);
  });

  it('처음부터 부풀지 않았으면 되돌릴 것도 없다', () => {
    expect(undone(1, 1)).toBe(false);
  });
});
