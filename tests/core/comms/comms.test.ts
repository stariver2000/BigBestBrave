import { describe, expect, it } from 'vitest';
import {
  advise,
  atLeast,
  CHANNELS,
  curveOf,
  expectedValue,
  SITUATIONS,
  STANDING_FLOOR,
  TEAMMATES,
  clarityOf,
  reachRate,
  valueAt,
  weightOf,
  type Situation,
  type Weights,
} from '../../../src/core/comms';

const awake: Weights = { standing: 0.5, attention: 0.8 };
const situationOf = (id: string): Situation => SITUATIONS.find((s) => s.id === id)!;
const channelOf = (id: string) => CHANNELS.find((c) => c.id === id)!;

describe('값의 감쇠', () => {
  it('반감기가 지나면 절반이 된다', () => {
    const situation: Situation = { id: 't', importance: 1, halfLifeSeconds: 4, busyness: 0.5, misreadCost: 0.3 };
    expect(valueAt(situation, 0)).toBeCloseTo(1, 10);
    expect(valueAt(situation, 4)).toBeCloseTo(0.5, 10);
    expect(valueAt(situation, 8)).toBeCloseTo(0.25, 10);
  });

  it('급한 정보일수록 빨리 사라진다', () => {
    expect(valueAt(situationOf('fight'), 3) / situationOf('fight').importance).toBeLessThan(
      valueAt(situationOf('objective'), 3) / situationOf('objective').importance,
    );
  });
});

describe('여럿이 응해야 하는 경우', () => {
  it('경계값', () => {
    expect(atLeast(4, 0, 0.3)).toBe(1);
    expect(atLeast(4, 5, 0.9)).toBe(0);
    expect(atLeast(1, 1, 0.4)).toBeCloseTo(0.4, 10);
  });

  it('넷 중 넷은 곱셈과 같다', () => {
    expect(atLeast(4, 4, 0.5)).toBeCloseTo(0.5 ** 4, 10);
  });

  it('적어도 한 명은 여집합과 같다', () => {
    expect(atLeast(4, 1, 0.3)).toBeCloseTo(1 - 0.7 ** 4, 10);
  });

  it('문턱이 높을수록 어렵다', () => {
    for (let k = 1; k < 4; k += 1) {
      expect(atLeast(4, k + 1, 0.4)).toBeLessThan(atLeast(4, k, 0.4));
    }
  });

  /**
   * 논문은 관찰된 수십 번의 오브젝트 투표 중 세 표를 넘긴 것이 하나도 없었다고 적었다.
   * 투표 통로의 notice 값은 그 관찰에 맞춰 고른 것이므로, 그 값이 실제로 그런 결과를
   * 내는지 여기서 붙들어 둔다.
   */
  it('투표가 통과할 확률은 논문이 관찰한 만큼 낮다', () => {
    const vote = channelOf('vote');
    const chance = atLeast(TEAMMATES, vote.needed, vote.notice);
    expect(chance).toBeLessThan(0.1);
    expect(chance).toBeGreaterThan(0);
  });
});

describe('말의 무게', () => {
  it('성적이 좋으면 그대로, 나쁘면 바닥까지 줄어든다', () => {
    expect(weightOf(1)).toBeCloseTo(1, 10);
    expect(weightOf(0)).toBeCloseTo(STANDING_FLOOR, 10);
  });

  it('범위를 벗어난 값도 안전하게 다룬다', () => {
    expect(weightOf(-5)).toBeCloseTo(STANDING_FLOOR, 10);
    expect(weightOf(5)).toBeCloseTo(1, 10);
  });

  it('지고 있으면 같은 말이 덜 먹힌다', () => {
    const situation = situationOf('objective');
    const strong = expectedValue(channelOf('chat'), situation, { standing: 1, attention: 0.8 });
    const weak = expectedValue(channelOf('chat'), situation, { standing: 0, attention: 0.8 });
    expect(strong).toBeGreaterThan(weak);
  });
});

describe('닿을 확률과 뜻의 또렷함', () => {
  it('팀이 깨어 있을수록 잘 닿는다', () => {
    const ping = channelOf('ping');
    expect(reachRate(ping, 1)).toBeGreaterThan(reachRate(ping, 0.4));
  });

  it('팀이 아무도 안 보고 있으면 0이다', () => {
    expect(reachRate(channelOf('ping'), 0)).toBe(0);
  });

  it('한 명만 알아채면 되는 통로가 넷 중 셋보다 잘 닿는다', () => {
    expect(reachRate(channelOf('ping'), 0.8)).toBeGreaterThan(reachRate(channelOf('vote'), 0.8));
  });

  it('오해가 비쌀수록 뜻이 흐릿한 통로가 불리해진다', () => {
    const ping = channelOf('ping');
    const cheap = clarityOf(ping, situationOf('omw'));
    const dear = clarityOf(ping, situationOf('objective'));
    expect(dear).toBeLessThan(cheap);
  });

  it('뜻이 또렷한 통로는 오해가 비싸도 크게 잃지 않는다', () => {
    const objective = situationOf('objective');
    expect(clarityOf(channelOf('chat'), objective)).toBeGreaterThan(
      clarityOf(channelOf('ping'), objective) * 3,
    );
  });
});

describe('기대값', () => {
  it('침묵은 언제나 0이다', () => {
    for (const situation of SITUATIONS) {
      expect(expectedValue(channelOf('silence'), situation, awake)).toBe(0);
      expect(expectedValue(channelOf('silence'), situation, awake, 5)).toBe(0);
    }
  });

  it('늦게 시작할수록 값이 준다', () => {
    const situation = situationOf('missing');
    const now = expectedValue(channelOf('ping'), situation, awake, 0);
    const later = expectedValue(channelOf('ping'), situation, awake, 3);
    expect(later).toBeLessThan(now);
  });

  it('한창 싸울 때는 타이핑이 핑보다 나쁘다', () => {
    const fight = situationOf('fight');
    expect(expectedValue(channelOf('chat'), fight, awake)).toBeLessThan(
      expectedValue(channelOf('ping'), fight, awake),
    );
  });

  it('팀원이 화를 낼 때는 어떤 말도 침묵만 못하다', () => {
    const flame = situationOf('flame');
    for (const channel of CHANNELS) {
      if (channel.id === 'silence') continue;
      expect(expectedValue(channel, flame, awake)).toBeLessThan(0);
    }
    expect(advise(flame, awake).best).toBe('silence');
  });
});

describe('창', () => {
  it('값이 있는 통로에는 창이 있고, 없는 통로에는 없다', () => {
    const advice = advise(situationOf('objective'), awake);
    for (const verdict of advice.verdicts) {
      if (verdict.channel === 'silence') {
        expect(verdict.windowSeconds).toBeNull();
      } else if (verdict.expected > 0) {
        expect(verdict.windowSeconds).not.toBeNull();
      } else {
        expect(verdict.windowSeconds).toBeNull();
      }
    }
  });

  it('급한 상황일수록 창이 좁다', () => {
    const urgent = advise(situationOf('missing'), awake).verdicts.find((v) => v.channel === 'ping')!;
    const patient = advise(situationOf('objective'), awake).verdicts.find((v) => v.channel === 'ping')!;
    expect(urgent.windowSeconds!).toBeLessThan(patient.windowSeconds!);
  });

  it('창이 닫히는 시각에는 기대값이 0 아래다', () => {
    const situation = situationOf('missing');
    const verdict = advise(situation, awake).verdicts.find((v) => v.channel === 'ping')!;
    const at = verdict.windowSeconds!;
    expect(expectedValue(channelOf('ping'), situation, awake, at)).toBeLessThanOrEqual(0);
    expect(expectedValue(channelOf('ping'), situation, awake, Math.max(0, at - 0.1))).toBeGreaterThan(0);
  });

  it('말할 것이 없으면 침묵은 지금부터다', () => {
    expect(advise(situationOf('flame'), awake).silenceAfterSeconds).toBe(0);
  });
});

describe('권고', () => {
  it('언제나 통로 하나를 고른다', () => {
    for (const situation of SITUATIONS) {
      for (const standing of [0, 0.5, 1]) {
        for (const attention of [0, 0.5, 1]) {
          const advice = advise(situation, { standing, attention });
          expect(advice.verdicts).toHaveLength(CHANNELS.length);
          expect(CHANNELS.map((c) => c.id)).toContain(advice.best);
          const chosen = advice.verdicts.find((v) => v.channel === advice.best)!;
          for (const verdict of advice.verdicts) {
            expect(chosen.expected).toBeGreaterThanOrEqual(verdict.expected);
          }
        }
      }
    }
  });

  it('아무도 안 보고 있으면 말할 이유가 없다', () => {
    const advice = advise(situationOf('objective'), { standing: 1, attention: 0 });
    expect(advice.best).toBe('silence');
  });

  it('오브젝트처럼 값이 크고 오래가는 정보라면 말할 값이 있다', () => {
    const advice = advise(situationOf('objective'), { standing: 1, attention: 0.9 });
    expect(advice.best).not.toBe('silence');
    expect(advice.silenceAfterSeconds!).toBeGreaterThan(0);
  });
});

describe('곡선', () => {
  it('시간 순으로 나오고 줄어들기만 한다', () => {
    const points = curveOf('chat', situationOf('objective'), awake);
    expect(points.length).toBeGreaterThan(10);
    for (let i = 1; i < points.length; i += 1) {
      expect(points[i].at).toBeGreaterThan(points[i - 1].at);
      expect(points[i].expected).toBeLessThanOrEqual(points[i - 1].expected + 1e-12);
    }
  });

  it('침묵의 곡선은 평평한 0이다', () => {
    for (const point of curveOf('silence', situationOf('fight'), awake)) {
      expect(point.expected).toBe(0);
    }
  });

  it('없는 통로를 물으면 빈 배열이다', () => {
    expect(curveOf('nope' as never, situationOf('fight'), awake)).toEqual([]);
  });
});
