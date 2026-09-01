import { describe, expect, it } from 'vitest';
import {
  DEVICE_MM,
  FELT_RATIO,
  hapticFor,
  LOWER_RATIO,
  RANGE,
  reachOf,
  REPORTED,
  REPOSITION_MM,
  THRESHOLDS,
  UPPER_RATIO,
  windowOf,
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
