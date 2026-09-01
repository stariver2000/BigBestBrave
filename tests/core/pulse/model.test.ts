import { describe, expect, it } from 'vitest';
import { MIN_VIEWS, accepts, applyKinds, emptyTally, isPulseKind, readingOf } from '@core/pulse';

describe('맥 세기', () => {
  it('아는 사건만 센다', () => {
    const tally = applyKinds(emptyTally(), ['view', 'touch', 'ghost', 'reach']);
    expect(tally).toEqual({ view: 1, touch: 1, reach: 1, stay: 0 });
  });

  it('모르는 이름은 사건이 아니다', () => {
    expect(isPulseKind('view')).toBe(true);
    expect(isPulseKind('click')).toBe(false);
    expect(isPulseKind(7)).toBe(false);
  });

  it('원래 셈을 건드리지 않는다', () => {
    const before = emptyTally();
    applyKinds(before, ['view']);
    expect(before.view).toBe(0);
  });
});

describe('맥 읽기', () => {
  const many = (view: number, touch: number, reach: number, stay = 0) => ({ view, touch, reach, stay });

  it('표본이 모자라면 비율을 내지 않는다', () => {
    // 셋이 와서 둘이 만졌다고 67%라 부르면 그 수는 잡음을 따라 춤춘다.
    const reading = readingOf(many(3, 2, 1));
    expect(reading.enough).toBe(false);
    expect(reading.touched).toBeNull();
    expect(reading.reached).toBeNull();
  });

  it('표본이 차면 단계마다의 비율을 낸다', () => {
    const reading = readingOf(many(100, 40, 10, 30));
    expect(reading.enough).toBe(true);
    expect(reading.touched).toBeCloseTo(0.4);
    // 아하까지 간 비율은 방문이 아니라 '만진 사람' 가운데로 잰다.
    expect(reading.reached).toBeCloseTo(0.25);
    expect(reading.stayed).toBeCloseTo(0.3);
  });

  it('아무도 만지지 않았으면 그다음 비율은 낼 수 없다', () => {
    const reading = readingOf(many(MIN_VIEWS, 0, 0));
    expect(reading.touched).toBe(0);
    expect(reading.reached).toBeNull();
  });

  it('비율은 1을 넘지 않는다', () => {
    // 같은 사람이 두 번 보낸 사건이 있어도 비율이 100%를 넘어 보이지 않게 한다.
    expect(readingOf(many(30, 40, 0))?.touched).toBe(1);
  });
});

describe('셀 수 있는 사건인가', () => {
  it('같은 종류는 한 번만 센다', () => {
    expect(accepts('view', new Set())).toBe(true);
    expect(accepts('view', new Set(['view'] as const))).toBe(false);
  });

  it('아하 지점은 사람이 손을 댄 뒤에만 센다', () => {
    // 스스로 도는 시연이 대신 끝까지 가 놓고 사람이 갔다고 세면 이 지표는 거짓말이 된다.
    expect(accepts('reach', new Set(['view'] as const))).toBe(false);
    expect(accepts('reach', new Set(['view', 'touch'] as const))).toBe(true);
  });

  it('손댐과 머묾은 앞선 조건이 없다', () => {
    expect(accepts('touch', new Set(['view'] as const))).toBe(true);
    expect(accepts('stay', new Set(['view'] as const))).toBe(true);
  });
});
