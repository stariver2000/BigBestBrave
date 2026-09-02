import { describe, expect, it } from 'vitest';
import {
  answer,
  DEVICE_MM,
  FELT_RATIO,
  hapticFor,
  LOWER_RATIO,
  RANGE,
  reachOf,
  REPORTED,
  REPOSITION_MM,
  STAIRCASE,
  startRun,
  THRESHOLDS,
  thresholdOf,
  UPPER_RATIO,
  virtualAnswer,
  windowOf,
  type Answer,
  type Run,
} from '../../../src/core/illusion';

/**
 * 논문 표를 옮겨 적은 것이 맞는지 확인한다. 논문은 각 문턱의 '상대 크기 비율'도 함께
 * 실었으므로, 밀리미터에서 다시 셈한 값이 그 비율과 맞아야 한다. 한 자리라도 잘못
 * 옮겼으면 여기서 걸린다.
 */
describe('논문 표를 옮긴 값', () => {
  const PUBLISHED = [
    { ascending: 1.452, descending: 1.44 },
    { ascending: 1.471, descending: 1.44 },
    { ascending: 1.4, descending: 1.382 },
    { ascending: 1.381, descending: 1.372 },
    { ascending: 1.37, descending: 1.336 },
    { ascending: 1.47, descending: 1.457 },
  ];

  it('여섯 차례가 모두 있다', () => {
    expect(THRESHOLDS).toHaveLength(6);
    expect(THRESHOLDS.map((row) => row.sequence)).toEqual([1, 2, 3, 4, 5, 6]);
  });

  it('밀리미터에서 다시 센 비율이 논문이 실은 비율과 맞는다', () => {
    THRESHOLDS.forEach((row, index) => {
      expect(row.ascending / DEVICE_MM).toBeCloseTo(PUBLISHED[index].ascending, 3);
      expect(row.descending / DEVICE_MM).toBeCloseTo(PUBLISHED[index].descending, 3);
    });
  });

  it('올려 잰 문턱이 내려 잰 문턱보다 언제나 크다', () => {
    for (const row of THRESHOLDS) expect(row.ascending).toBeGreaterThan(row.descending);
  });

  it('표준오차는 모두 0보다 크다', () => {
    for (const row of THRESHOLDS) {
      expect(row.ascendingSe).toBeGreaterThan(0);
      expect(row.descendingSe).toBeGreaterThan(0);
    }
  });

  it('평균 치우침이 논문 본문의 42.4%, 40.4%와 맞는다', () => {
    expect(UPPER_RATIO - 1).toBeCloseTo(REPORTED.ascendingBias, 3);
    expect(LOWER_RATIO - 1).toBeCloseTo(REPORTED.descendingBias, 3);
  });

  it('받아들이는 폭이 논문 본문의 2.00%와 맞는다', () => {
    expect(UPPER_RATIO - LOWER_RATIO).toBeCloseTo(REPORTED.windowWidth, 3);
  });

  it('그 폭은 단단한 손잡이보다 좁고 무른 손잡이보다 훨씬 좁다', () => {
    const width = UPPER_RATIO - LOWER_RATIO;
    expect(width).toBeLessThan(REPORTED.priorRigid);
    expect(width).toBeLessThan(REPORTED.priorCompliant);
  });
});

describe('받아들이는 범위', () => {
  it('아래 끝 < 느끼는 크기 < 위 끝', () => {
    for (let mm = RANGE.device.min; mm <= RANGE.device.max; mm += 1) {
      const w = windowOf(mm);
      expect(w.lower).toBeLessThan(w.felt);
      expect(w.felt).toBeLessThan(w.upper);
    }
  });

  it('세 값이 모두 실제 크기보다 크다 — 치우침이 한쪽으로만 있다', () => {
    for (let mm = RANGE.device.min; mm <= RANGE.device.max; mm += 5) {
      const w = windowOf(mm);
      expect(w.lower).toBeGreaterThan(mm);
      expect(w.upper).toBeGreaterThan(mm);
    }
  });

  it('치우침과 폭은 크기에 상관없이 같다 — 비율로 정해지기 때문이다', () => {
    const small = windowOf(20);
    const large = windowOf(120);
    expect(small.bias).toBeCloseTo(large.bias, 12);
    expect(small.width).toBeCloseTo(large.width, 12);
    expect(small.bias).toBeCloseTo(FELT_RATIO, 12);
  });

  it('크기가 커지면 범위도 그만큼 커진다', () => {
    expect(windowOf(110).lower).toBeCloseTo(windowOf(55).lower * 2, 9);
    expect(windowOf(110).upper).toBeCloseTo(windowOf(55).upper * 2, 9);
  });

  it('논문의 기기(55mm)는 73mm에서 81mm 사이로 받아들여진다', () => {
    const w = windowOf(DEVICE_MM);
    expect(w.lower).toBeGreaterThan(73);
    expect(w.lower).toBeLessThan(80);
    expect(w.upper).toBeGreaterThan(77);
    expect(w.upper).toBeLessThan(82);
  });
});

describe('손가락을 옮겨 낼 수 있는 폭', () => {
  it('손가락을 못 옮기면 폭이 받아들이는 범위와 같다', () => {
    const reach = reachOf(DEVICE_MM, 0);
    const w = windowOf(DEVICE_MM);
    expect(reach.smallest).toBeCloseTo(w.lower, 9);
    expect(reach.largest).toBeCloseTo(w.upper, 9);
    // 그 좁은 폭이 곧 이 연구의 출발점이다. 눈만으로는 2%밖에 못 속인다.
    expect(reach.span - 1).toBeCloseTo(REPORTED.windowWidth / LOWER_RATIO, 3);
  });

  it('옮길 수 있는 거리가 늘수록 폭도 늘고 줄지 않는다', () => {
    let previous = 0;
    for (let r = RANGE.reposition.min; r <= RANGE.reposition.max; r += 1) {
      const span = reachOf(DEVICE_MM, r).span;
      expect(span).toBeGreaterThanOrEqual(previous - 1e-12);
      previous = span;
    }
  });

  it('촉각 범위는 기기 크기에서 시작해 옮긴 만큼 늘어난다', () => {
    const reach = reachOf(55, 26.6);
    expect(reach.minHaptic).toBe(55);
    expect(reach.maxHaptic).toBeCloseTo(81.6, 9);
  });

  it('논문의 기기와 손가락 범위로는 두 배 가까이 흉내 낼 수 있다', () => {
    const reach = reachOf(DEVICE_MM, REPOSITION_MM.mean);
    expect(reach.span).toBeGreaterThan(1.5);
    expect(reach.span).toBeLessThan(2.0);
  });

  it('음수를 넣어도 0으로 다룬다', () => {
    expect(reachOf(55, -10).maxHaptic).toBe(55);
  });
});

describe('되짚기', () => {
  it('낼 수 있는 크기를 물으면 촉각 자리가 범위 안에서 나온다', () => {
    const device = 55;
    const reposition = 26.6;
    const reach = reachOf(device, reposition);
    for (let visual = reach.smallest; visual <= reach.largest; visual += 1) {
      const haptic = hapticFor(device, reposition, visual);
      expect(haptic).not.toBeNull();
      expect(haptic!).toBeGreaterThanOrEqual(reach.minHaptic - 1e-9);
      expect(haptic!).toBeLessThanOrEqual(reach.maxHaptic + 1e-9);
    }
  });

  it('범위 밖을 물으면 없다고 답한다', () => {
    const reach = reachOf(55, 26.6);
    expect(hapticFor(55, 26.6, reach.smallest - 1)).toBeNull();
    expect(hapticFor(55, 26.6, reach.largest + 1)).toBeNull();
  });

  it('가운데를 물으면 느끼는 비율로 되돌린 값이 나온다', () => {
    const wanted = 90;
    const haptic = hapticFor(55, 26.6, wanted);
    expect(haptic).toBeCloseTo(wanted / FELT_RATIO, 9);
  });
});

/**
 * 계단법은 이 페이지가 보여 주려는 방법 그 자체다. 문턱은 한 번 물어서 나오지 않고
 * 되돌아선 자리들을 평균해서 나온다 — 그 걸음이 정말 문턱을 찾아가는지 여기서 붙든다.
 */
describe('계단법', () => {
  const limits = { min: 20, max: 200 };

  /** 문턱이 hidden인 가상의 손에게 계단이 끝날 때까지 묻는다. */
  function walk(hidden: number, from: number): Run {
    let run = startRun(from, STAIRCASE.step);
    for (let guard = 0; guard < 500 && !run.done; guard += 1) {
      run = answer(run, virtualAnswer(run.level, hidden), limits);
    }
    return run;
  }

  it('가상의 손은 자기 문턱보다 큰 것만 크다고 답한다', () => {
    expect(virtualAnswer(80, 79.865)).toBe('bigger');
    expect(virtualAnswer(79, 79.865)).toBe('smaller');
  });

  it('크다고 답하면 작은 쪽으로, 작다고 답하면 큰 쪽으로 간다', () => {
    const start = startRun(60, 12);
    expect(answer(start, 'bigger', limits).level).toBe(48);
    expect(answer(start, 'smaller', limits).level).toBe(72);
  });

  it('대답이 뒤집힌 자리가 되돌이이고, 그때 걸음이 반으로 준다', () => {
    let run = startRun(60, 12);
    run = answer(run, 'smaller', limits); // 72로 올라간다
    expect(run.reversals).toHaveLength(0);
    run = answer(run, 'bigger', limits); // 여기서 되돌아선다
    expect(run.reversals).toEqual([72]);
    expect(run.step).toBe(6);
  });

  it('걸음은 가장 작은 걸음보다 잘아지지 않는다', () => {
    let run = startRun(60, STAIRCASE.minStep);
    run = answer(run, 'smaller', limits);
    run = answer(run, 'bigger', limits);
    expect(run.step).toBe(STAIRCASE.minStep);
  });

  it('정해 둔 만큼 되돌아서면 끝난다', () => {
    const run = walk(79.865, 40);
    expect(run.done).toBe(true);
    expect(run.reversals).toHaveLength(STAIRCASE.reversals);
  });

  it('끝난 계단은 더 묻지 않는다', () => {
    const run = walk(79.865, 40);
    expect(answer(run, 'bigger', limits)).toBe(run);
  });

  it('논문의 문턱을 감춰 두면 계단이 그 자리를 찾아낸다', () => {
    // 여섯 차례를 모두 걸어 본다. 어느 자리에서 출발하든 찾아낸 값이 문턱에 붙어야 한다.
    for (const row of THRESHOLDS) {
      const up = thresholdOf(walk(row.ascending, 40))!;
      const down = thresholdOf(walk(row.descending, 120))!;
      expect(Math.abs(up - row.ascending)).toBeLessThan(1);
      expect(Math.abs(down - row.descending)).toBeLessThan(1);
    }
  });

  it('아직 되돌아서지 않았으면 문턱이 없다', () => {
    expect(thresholdOf(startRun(60, 12))).toBeNull();
  });

  it('끝을 넘어가지 않는다', () => {
    let run = startRun(limits.max, 12);
    const said: Answer = 'smaller'; // 계속 큰 쪽으로 밀어 본다
    for (let i = 0; i < 10; i += 1) run = answer(run, said, limits);
    expect(run.level).toBe(limits.max);
  });

  it('걸어온 길을 남긴다', () => {
    const run = walk(79.865, 40);
    expect(run.trail.length).toBeGreaterThan(run.reversals.length);
    expect(run.trail[0]).toBe(40);
  });
});
