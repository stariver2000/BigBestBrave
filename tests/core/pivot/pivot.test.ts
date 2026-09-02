import { describe, expect, it } from 'vitest';
import {
  DEVICE,
  HUMAN_PRINTED_AVERAGE,
  HUMAN_REGRESSIONS,
  INDIVIDUAL,
  PATH_DEVIATION,
  PLAN_STEPS,
  ROBOT,
  STUDY,
  THROUGHPUT,
  discrepancyPercent,
  dropPercent,
  kilocountToMm,
  pathLength,
  personalGain,
  planAngle,
  planLengthMm,
  planPoint,
  planSamples,
  regressionAverage,
  risePercent,
  robotLongerPercent,
  rotationOf,
  sensorReading,
  tracePath,
  trialsPerParticipant,
  virtualReading,
  xExtent,
  type Sample,
} from '@core/pivot';

describe('센서 수식 (식 1~4)', () => {
  const sample: Sample = { dx: 3.2, dy: -1.7, dtheta: 0.05 };
  const front = sensorReading(sample, 0);
  const rear = sensorReading(sample, 1);

  it('앞 센서와 뒤 센서의 가로 차이는 정확히 r·dθ다 (식 3)', () => {
    expect(front.x - rear.x).toBeCloseTo(DEVICE.sensorSpanMm * sample.dtheta, 12);
    expect(rotationOf(front, rear)).toBeCloseTo(sample.dtheta, 12);
  });

  it('세로는 센서 자리와 무관하게 같다 (그림 1)', () => {
    expect(front.y).toBe(rear.y);
    expect(sensorReading(sample, 0.37).y).toBe(sample.dy);
  });

  it('가상 센서 합성(식 1)은 그 자리의 물리 센서(식 2)와 일치한다', () => {
    for (const p of [0, 0.2, 0.4, 0.5, 0.6, 0.8, 1]) {
      const physical = sensorReading(sample, p);
      const virtual = virtualReading(front, rear, p);
      expect(virtual.x).toBeCloseTo(physical.x, 12);
      expect(virtual.y).toBeCloseTo(physical.y, 12);
    }
  });

  it('회전이 없으면 어느 자리든 같은 궤적이 나온다', () => {
    const flat: Sample[] = [
      { dx: 5, dy: 2, dtheta: 0 },
      { dx: -3, dy: 4, dtheta: 0 },
    ];
    expect(tracePath(flat, 0)).toEqual(tracePath(flat, 1));
  });
});

describe('로봇 ∞ 계획', () => {
  it('폭 24cm, 높이 11cm 안에 정확히 들어간다', () => {
    let minX = Infinity;
    let maxX = -Infinity;
    let minY = Infinity;
    let maxY = -Infinity;
    for (let i = 0; i <= PLAN_STEPS; i += 1) {
      const point = planPoint(i / PLAN_STEPS);
      minX = Math.min(minX, point.x);
      maxX = Math.max(maxX, point.x);
      minY = Math.min(minY, point.y);
      maxY = Math.max(maxY, point.y);
    }
    expect(maxX - minX).toBeCloseTo(ROBOT.boundsCm.width * 10, 6);
    expect(maxY - minY).toBeCloseTo(ROBOT.boundsCm.height * 10, 6);
  });

  it('기울기 규칙은 왼끝 -20°, 오른끝 +40°다', () => {
    const halfWidth = (ROBOT.boundsCm.width * 10) / 2;
    expect((planAngle(-halfWidth) * 180) / Math.PI).toBeCloseTo(-20, 10);
    expect((planAngle(halfWidth) * 180) / Math.PI).toBeCloseTo(40, 10);
  });

  it('한 바퀴가 제자리로 돌아오고, 회전의 합도 0이다', () => {
    const samples = planSamples();
    const sum = samples.reduce(
      (total, sample) => ({
        dx: total.dx + sample.dx,
        dy: total.dy + sample.dy,
        dtheta: total.dtheta + sample.dtheta,
      }),
      { dx: 0, dy: 0, dtheta: 0 },
    );
    expect(sum.dx).toBeCloseTo(0, 9);
    expect(sum.dy).toBeCloseTo(0, 9);
    expect(sum.dtheta).toBeCloseTo(0, 9);
  });

  it('이 판의 길이는 표본 수를 늘려도 수렴하며, 논문의 계획 700mm와 3mm 안에서 만난다', () => {
    const coarse = planLengthMm(PLAN_STEPS);
    const fine = planLengthMm(PLAN_STEPS * 4);
    expect(Math.abs(fine - coarse)).toBeLessThan(0.5);
    // 같은 폭·높이의 1:2 리사주가 702.1mm로 계산된다. 매개변수식이 달라도 계획 길이가
    // 거의 같으므로, 화면은 "계산값 702mm, 논문의 계획 700mm"로 둘 다 적는다.
    expect(fine).toBeCloseTo(702.1, 0);
    expect(Math.abs(fine - ROBOT.plannedLengthMm)).toBeLessThan(3);
  });

  it('계획대로 그리면 앞 센서 커서가 뒤 센서 커서보다 넓게 간다', () => {
    const samples = planSamples();
    const frontWidth = xExtent(tracePath(samples, 0));
    const rearWidth = xExtent(tracePath(samples, 1));
    expect(frontWidth).toBeGreaterThan(rearWidth);
    // 가운데 궤적은 계획의 폭 그대로다(기준점이 가운데이므로).
    expect(xExtent(tracePath(samples, 0.5))).toBeCloseTo(ROBOT.boundsCm.width * 10, 6);
  });
});

describe('기기 치수의 유도', () => {
  it('센서 사이 거리 72mm는 레일 치수에서 나온다', () => {
    const railSpan = DEVICE.railIntervalMm * DEVICE.railIntervals;
    expect(railSpan / DEVICE.railSpanShare).toBeCloseTo(DEVICE.sensorSpanMm, 10);
  });
});

describe('포인팅 실험의 셈', () => {
  it('시행 수의 곱이 맞물린다: 7×18×15 = 1,890, ×14 = 26,460', () => {
    expect(trialsPerParticipant()).toBe(1890);
    expect(trialsPerParticipant() * STUDY.participants).toBe(STUDY.trialsTotal);
  });

  it('설계의 곱도 맞는다: 거리 2 × 폭 3 × 반복 3 = 회기 18', () => {
    expect(STUDY.distancesPx.length * STUDY.widthsPx.length * STUDY.instancesPerCombo).toBe(
      STUDY.sessionsPerBlock,
    );
  });

  it('처리량 하락의 표기는 재계산과 0.2%p 안에서 맞는다', () => {
    const at100 = dropPercent(THROUGHPUT.at50, THROUGHPUT.at100);
    const at0 = dropPercent(THROUGHPUT.at50, THROUGHPUT.at0);
    expect(Math.abs(at100 - THROUGHPUT.printedDropAt100Percent)).toBeLessThan(0.2);
    expect(Math.abs(at0 - THROUGHPUT.printedDropAt0Percent)).toBeLessThan(0.2);
  });

  it('길 이탈 상승의 표기는 재계산과 0.35%p 안에서 맞는다 (반올림 전 원자료의 표기)', () => {
    const at100 = risePercent(PATH_DEVIATION.at50, PATH_DEVIATION.at100);
    const at0 = risePercent(PATH_DEVIATION.at50, PATH_DEVIATION.at0);
    expect(Math.abs(at100 - PATH_DEVIATION.printedRiseAt100Percent)).toBeLessThan(0.15);
    expect(Math.abs(at0 - PATH_DEVIATION.printedRiseAt0Percent)).toBeLessThan(0.35);
  });

  it('개인 최적의 이득은 차가 정확히 0.236 bits/s, 비로 4.1%쯤이다', () => {
    const gain = personalGain();
    expect(gain.diff).toBeCloseTo(0.236, 10);
    expect(Math.abs(gain.percent - INDIVIDUAL.printedGainPercent)).toBeLessThan(0.1);
  });

  it('유의한 참가자 수는 전체에서 예외 하나를 뺀 것이다', () => {
    expect(INDIVIDUAL.significantCount).toBe(STUDY.participants - 1);
  });
});

describe('표 2 (여섯 사람의 회귀)', () => {
  it('평균 행의 다섯 칸은 재계산과 반올림 자리까지 맞는다', () => {
    expect(regressionAverage((row) => row.dx.slope)).toBeCloseTo(HUMAN_PRINTED_AVERAGE.dx.slope, 2);
    expect(regressionAverage((row) => row.dx.intercept)).toBeCloseTo(HUMAN_PRINTED_AVERAGE.dx.intercept, 3);
    expect(regressionAverage((row) => row.dy.slope)).toBeCloseTo(HUMAN_PRINTED_AVERAGE.dy.slope, 2);
    // dY 절편의 평균은 -.0025로, 표기 -.003과의 차가 정확히 반올림 문턱(0.0005)에 놓인다.
    expect(
      Math.abs(regressionAverage((row) => row.dy.intercept) - HUMAN_PRINTED_AVERAGE.dy.intercept),
    ).toBeLessThanOrEqual(0.0005);
    expect(regressionAverage((row) => row.dy.r2)).toBeCloseTo(HUMAN_PRINTED_AVERAGE.dy.r2, 2);
  });

  it('dX의 R² 평균 표기 .790은 여섯 값의 평균 .788과 어긋난다 - 고치지 않고 붙든다', () => {
    const recomputed = regressionAverage((row) => row.dx.r2);
    expect(recomputed).toBeCloseTo(0.78817, 4);
    const gap = HUMAN_PRINTED_AVERAGE.dx.r2 - recomputed;
    expect(gap).toBeGreaterThan(0.001);
    expect(gap).toBeLessThan(0.003);
  });

  it('여섯 사람 모두 dX 기울기는 1보다 한참 작고 dY 기울기는 1에 붙어 있다', () => {
    for (const row of HUMAN_REGRESSIONS) {
      expect(row.dx.slope).toBeGreaterThanOrEqual(0.52);
      expect(row.dx.slope).toBeLessThanOrEqual(0.6);
      expect(Math.abs(row.dy.slope - 1)).toBeLessThanOrEqual(0.02 + 1e-9);
    }
  });
});

describe('표 1 (로봇 실험)', () => {
  it('kilocount → mm 환산이 표의 mm 표기와 0.15mm 안에서 맞는다', () => {
    expect(Math.abs(kilocountToMm(ROBOT.avgLengthKc.translateOnly.physical) - 709.4)).toBeLessThan(0.15);
    expect(Math.abs(kilocountToMm(ROBOT.avgLengthKc.translateOnly.virtual) - 709.1)).toBeLessThan(0.15);
    expect(Math.abs(kilocountToMm(ROBOT.avgLengthKc.withRotation.physical) - 723.4)).toBeLessThan(0.15);
    expect(Math.abs(kilocountToMm(ROBOT.avgLengthKc.withRotation.virtual) - 716.5)).toBeLessThan(0.15);
  });

  it('가상-물리 어긋남의 백분율 표기가 재계산과 맞는다 (.40%, .91%)', () => {
    expect(discrepancyPercent('translateOnly')).toBeCloseTo(ROBOT.discrepancy.translateOnly.printedPercent, 2);
    expect(discrepancyPercent('withRotation')).toBeCloseTo(ROBOT.discrepancy.withRotation.printedPercent, 2);
  });

  it('본문의 6.9%는 표의 값으로 재계산하면 6.5%다 - 어긋남의 폭을 붙든다', () => {
    const recomputed = robotLongerPercent();
    expect(recomputed).toBeCloseTo(6.5, 1);
    const gap = ROBOT.printedLongerPercent - recomputed;
    expect(gap).toBeGreaterThan(0.3);
    expect(gap).toBeLessThan(0.5);
  });

  it("회전 조건 Virtual 20% 칸의 '35.7'은 오기로 보인다 - 모순의 크기를 붙든다", () => {
    const physical = ROBOT.lengthAt20Kc.withRotation.physical;
    const printed = ROBOT.lengthAt20Kc.withRotation.virtual;
    // 표기 그대로라면 가상 센서가 물리 센서의 10분의 1밖에 못 갔다는 뜻인데,
    // 같은 표가 가상-물리 어긋남을 1% 미만(.91%)이라고 적는다. 둘은 양립할 수 없다.
    expect((physical - printed) / physical).toBeGreaterThan(0.85);
    expect(ROBOT.discrepancy.withRotation.printedPercent).toBeLessThan(1);
  });

  it('궤적 길이 계산이 자명한 경우와 맞는다', () => {
    expect(pathLength([{ x: 0, y: 0 }, { x: 3, y: 4 }])).toBeCloseTo(5, 12);
  });
});
