/**
 * 옮겨 적은 구조가 논문과 맞는지, 그리고 판정 규칙이 앞뒤가 맞는지 되짚는 시험.
 *
 * 이 논문은 질적 연구라 되짚을 숫자가 거의 없다. 있는 것은 4.2절의 깔때기 셋뿐이고,
 * 그 셋은 서로 맞물린다. 나머지는 구조가 스스로 앞뒤가 맞는지를 전수로 훑는다 -
 * 여덟 축 곱하기 다섯 자리는 마흔 칸뿐이라 전부 셀 수 있다.
 */

import { describe, expect, it } from 'vitest';
import {
  AXES,
  FOCUS_KINDS,
  FOCUS_VERDICT,
  FUNNEL,
  MIDDLE,
  POSITIONS,
  hasReasonAt,
  isBlocked,
  peakMiddleCount,
  read,
  verdictAt,
  type Placement,
  type Position,
  type Verdict,
} from '../../../src/core/restorative';

describe('옮겨 적은 구조', () => {
  it('축은 여덟 개이고 id가 겹치지 않는다', () => {
    expect(AXES).toHaveLength(8);
    expect(new Set(AXES.map((axis) => axis.id)).size).toBe(8);
  });

  it('세 범위에 축이 골고루 있다', () => {
    const counts = { where: 0, how: 0, when: 0 };
    for (const axis of AXES) counts[axis.scope] += 1;
    expect(counts).toEqual({ where: 2, how: 3, when: 3 });
    expect(counts.where + counts.how + counts.when).toBe(AXES.length);
  });

  /** 이 페이지가 하려는 말이 이 수에 있다. 여덟 가운데 넷은 '많을수록 좋다'가 아니다. */
  it('가운데가 맞는 축이 넷이다', () => {
    expect(peakMiddleCount()).toBe(4);
    expect(AXES.filter((axis) => axis.shape === 'towardHigh')).toHaveLength(3);
    expect(AXES.filter((axis) => axis.shape === 'towardLow')).toHaveLength(1);
  });

  it('양 끝의 이름이 서로 다르고 비어 있지 않다', () => {
    for (const axis of AXES) {
      expect(axis.poles[0]).not.toBe(axis.poles[1]);
      expect(axis.poles[0].length).toBeGreaterThan(0);
      expect(axis.poles[1].length).toBeGreaterThan(0);
    }
  });

  /** 가운데가 맞는 축은 양 끝 모두에 까닭이 있어야 한다. 한쪽만 있으면 가운데가 봉우리일 수 없다. */
  it('가운데가 맞는 축은 양 끝 모두에 안 맞는 까닭이 적혀 있다', () => {
    for (const axis of AXES) {
      if (axis.shape !== 'peakMiddle') continue;
      expect(axis.reasons.low, axis.id).toBe(true);
      expect(axis.reasons.high, axis.id).toBe(true);
    }
  });

  /** 한쪽으로 기운 축은 맞는 쪽 끝에 까닭이 없어야 한다. 맞는 자리에 안 맞는 까닭을 달 수 없다. */
  it('한쪽으로 기운 축은 맞는 쪽 끝에 까닭이 없다', () => {
    for (const axis of AXES) {
      if (axis.shape === 'towardHigh') expect(axis.reasons.high, axis.id).toBe(false);
      if (axis.shape === 'towardLow') expect(axis.reasons.low, axis.id).toBe(false);
    }
  });

  it('도구를 쓰지 말라고 한 축은 해악의 세기 하나뿐이다', () => {
    const blocking = AXES.filter((axis) => axis.blocksAtHigh);
    expect(blocking).toHaveLength(1);
    expect(blocking[0].id).toBe('severity');
    // 그 축은 낮은 쪽이 맞는 축이어야 앞뒤가 맞는다. 5쪽이 막히는데 5쪽이 맞을 수는 없다.
    expect(blocking[0].shape).toBe('towardLow');
  });

  it('공동체 갈래 셋의 판정이 서로 다르다', () => {
    expect(FOCUS_KINDS).toHaveLength(3);
    expect(new Set(FOCUS_KINDS.map((kind) => FOCUS_VERDICT[kind])).size).toBe(3);
    // 거친 곳은 쓸 일은 많지만 효과는 낮다. 논문이 위험과 보상을 함께 적은 자리다.
    expect(FOCUS_VERDICT.toxic).toBe('edge');
  });
});

describe('연구의 깔때기 (4.2절)', () => {
  it('배포한 사람은 쓴 사람과 기회를 못 만난 사람으로 정확히 나뉜다', () => {
    expect(FUNNEL.used + FUNNEL.noOccasion).toBe(FUNNEL.deployed);
  });

  it('깔때기는 좁아지기만 한다', () => {
    expect(FUNNEL.deployed).toBeLessThan(FUNNEL.phase1);
    expect(FUNNEL.used).toBeLessThan(FUNNEL.deployed);
  });

  it('열여섯 가운데 둘이 실제로 썼다', () => {
    expect(FUNNEL.phase1).toBe(16);
    expect(FUNNEL.used).toBe(2);
    // 여덟 명 가운데 한 명꼴이다. 화면이 이 비를 말할 때 과장하지 않도록 붙들어 둔다.
    expect(FUNNEL.phase1 / FUNNEL.used).toBe(8);
  });
});

describe('판정 규칙 (여덟 축 x 다섯 자리 전수)', () => {
  it('마흔 칸을 모두 훑어도 세 갈래 말고는 나오지 않는다', () => {
    const allowed: Verdict[] = ['fits', 'edge', 'misfits'];
    let counted = 0;
    for (const axis of AXES) {
      for (const position of POSITIONS) {
        counted += 1;
        expect(allowed).toContain(verdictAt(axis, position));
      }
    }
    expect(counted).toBe(40);
  });

  it('축마다 맞는 자리가 적어도 하나, 안 맞는 자리도 적어도 하나 있다', () => {
    for (const axis of AXES) {
      const verdicts = POSITIONS.map((position) => verdictAt(axis, position));
      expect(verdicts, axis.id).toContain('fits');
      expect(verdicts, axis.id).toContain('misfits');
    }
  });

  it('가운데가 맞는 축은 판정이 좌우로 대칭이다', () => {
    for (const axis of AXES) {
      if (axis.shape !== 'peakMiddle') continue;
      expect(verdictAt(axis, 1)).toBe(verdictAt(axis, 5));
      expect(verdictAt(axis, 2)).toBe(verdictAt(axis, 4));
      expect(verdictAt(axis, 3)).toBe('fits');
    }
  });

  it('한쪽으로 기운 축은 자리가 옮겨 갈수록 판정이 한 방향으로만 간다', () => {
    const rank: Record<Verdict, number> = { misfits: 0, edge: 1, fits: 2 };
    for (const axis of AXES) {
      if (axis.shape === 'peakMiddle') continue;
      const line = POSITIONS.map((position) => rank[verdictAt(axis, position)]);
      const rising = line.every((value, index) => index === 0 || value >= line[index - 1]);
      const falling = line.every((value, index) => index === 0 || value <= line[index - 1]);
      expect(rising || falling, axis.id).toBe(true);
    }
  });

  it('안 맞는 까닭은 맞지 않는 자리에서만 나온다', () => {
    for (const axis of AXES) {
      for (const position of POSITIONS) {
        if (!hasReasonAt(axis, position)) continue;
        expect(verdictAt(axis, position), `${axis.id} @ ${position}`).not.toBe('fits');
      }
    }
  });

  it('막히는 자리는 마흔 칸 가운데 하나뿐이다', () => {
    let blocked = 0;
    for (const axis of AXES) for (const position of POSITIONS) if (isBlocked(axis, position)) blocked += 1;
    expect(blocked).toBe(1);
  });
});

describe('읽어 낸 결과', () => {
  const allAt = (position: Position): Placement =>
    Object.fromEntries(AXES.map((axis) => [axis.id, position]));

  it('세 갈래의 합이 언제나 여덟이다', () => {
    for (const position of POSITIONS) {
      const reading = read(allAt(position), 'social');
      expect(reading.fits + reading.edge + reading.misfits).toBe(AXES.length);
    }
  });

  it('자리를 안 정한 축은 가운데로 본다', () => {
    expect(read({}, 'social').byAxis.every((entry) => entry.position === MIDDLE)).toBe(true);
    // 가운데에 모두 두면 가운데가 맞는 축 넷이 맞고, 한쪽으로 기운 축 넷은 가장자리다.
    const reading = read({}, 'social');
    expect(reading.fits).toBe(4);
    expect(reading.edge).toBe(4);
    expect(reading.misfits).toBe(0);
  });

  it('모두 한쪽 끝으로 몰면 맞는 축이 줄어든다', () => {
    const middle = read({}, 'social');
    for (const position of [1, 5] as Position[]) {
      expect(read(allAt(position), 'social').fits).toBeLessThan(middle.fits);
    }
  });

  it('해악이 가장 심한 자리에 두면 막힌다', () => {
    expect(read({ severity: 5 }, 'social').blocked).toBe(true);
    expect(read({ severity: 4 }, 'social').blocked).toBe(false);
    expect(read({}, 'social').blocked).toBe(false);
  });

  it('공동체 갈래를 바꾸면 판정이 바뀐다', () => {
    const seen = FOCUS_KINDS.map((kind) => read({}, kind).focus);
    expect(new Set(seen).size).toBe(3);
  });

  it('공동체 갈래는 축의 셈을 건드리지 않는다', () => {
    // 갈래와 축은 다른 종류의 값이다. 한 눈금에 섞지 않는다.
    const a = read({}, 'social');
    const b = read({}, 'formal');
    expect([a.fits, a.edge, a.misfits]).toEqual([b.fits, b.edge, b.misfits]);
  });
});
