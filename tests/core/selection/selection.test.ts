import { describe, expect, it } from 'vitest';
import {
  beginSelection,
  buildTrials,
  conditionPoints,
  DWELL_MS,
  initialState,
  MULTI,
  report,
  step,
  type FullState,
  type Selection,
  type Target,
  type Trigger,
} from '../../../src/core/selection';

const TARGETS: Target[] = [
  { id: 0, center: 0.3, width: 0.1 }, // 0.25 ~ 0.35
  { id: 1, center: 0.7, width: 0.1 }, // 0.65 ~ 0.75
];

/** 좌표들을 차례로 흘려 넣고 당겨진 방아쇠를 모은다. */
function run(
  trigger: Trigger,
  path: readonly { x: number; time?: number; pinched?: boolean }[],
  targets: readonly Target[] = TARGETS,
) {
  let state: FullState = initialState(path[0].x);
  const fires = [];
  let clock = 0;
  for (const point of path) {
    clock = point.time ?? clock + 16;
    const result = step(trigger, state, { x: point.x, time: clock, pinched: point.pinched ?? false }, targets);
    state = result.state;
    if (result.fire) fires.push(result.fire);
  }
  return { fires, state };
}

describe('크로싱', () => {
  it('들어온 모서리로 되돌아 나오면 고른다', () => {
    const { fires } = run('cross', [{ x: 0.1 }, { x: 0.24 }, { x: 0.3 }, { x: 0.33 }, { x: 0.3 }, { x: 0.2 }]);
    expect(fires).toHaveLength(1);
    expect(fires[0].targetId).toBe(0);
  });

  it('반대편으로 빠져나가면 고르지 않는다', () => {
    const { fires } = run('cross', [{ x: 0.1 }, { x: 0.26 }, { x: 0.3 }, { x: 0.34 }, { x: 0.5 }]);
    expect(fires).toHaveLength(0);
  });

  it('오른쪽에서 들어와 오른쪽으로 나와도 고른다', () => {
    const { fires } = run('cross', [{ x: 0.9 }, { x: 0.74 }, { x: 0.68 }, { x: 0.72 }, { x: 0.8 }]);
    expect(fires).toHaveLength(1);
    expect(fires[0].targetId).toBe(1);
  });

  it('고른 좌표는 가장 깊이 들어간 지점이다', () => {
    // 왼쪽에서 들어와 0.34까지 갔다가 되돌아 나온다.
    const { fires } = run('cross', [{ x: 0.1 }, { x: 0.26 }, { x: 0.34 }, { x: 0.31 }, { x: 0.2 }]);
    expect(fires[0].x).toBeCloseTo(0.34, 10);
  });

  it('과녁을 지나쳐 다시 들어와야만 두 번째로 고를 수 있다', () => {
    const { fires } = run('cross', [
      { x: 0.1 }, { x: 0.28 }, { x: 0.2 },  // 첫 번째 확정
      { x: 0.28 }, { x: 0.2 },              // 두 번째 확정
    ]);
    expect(fires).toHaveLength(2);
  });

  it('머무르기만 해서는 고르지 않는다', () => {
    const { fires } = run('cross', [{ x: 0.1 }, { x: 0.3, time: 0 }, { x: 0.3, time: 5000 }]);
    expect(fires).toHaveLength(0);
  });
});

describe('드웰', () => {
  it('문턱을 넘겨 머무르면 고른다', () => {
    const { fires } = run('dwell', [
      { x: 0.1, time: 0 },
      { x: 0.3, time: 100 },
      { x: 0.3, time: 100 + DWELL_MS - 1 },
      { x: 0.3, time: 100 + DWELL_MS },
    ]);
    expect(fires).toHaveLength(1);
    expect(fires[0].time).toBe(100 + DWELL_MS);
  });

  it('문턱 전에 나가면 고르지 않는다', () => {
    const { fires } = run('dwell', [
      { x: 0.1, time: 0 },
      { x: 0.3, time: 100 },
      { x: 0.5, time: 100 + DWELL_MS - 50 },
      { x: 0.5, time: 5000 },
    ]);
    expect(fires).toHaveLength(0);
  });

  it('한 번 고른 뒤에는 나갔다 와야 다시 고른다', () => {
    const { fires } = run('dwell', [
      { x: 0.1, time: 0 },
      { x: 0.3, time: 10 },
      { x: 0.3, time: 10 + DWELL_MS },
      { x: 0.3, time: 10 + DWELL_MS * 4 },
    ]);
    expect(fires).toHaveLength(1);
  });

  it('지나가는 길의 과녁도 오래 머물면 눌린다 — 마이더스의 손', () => {
    // 0번을 지나 1번으로 가는데, 0번 위에서 느리게 움직이면 0번이 눌린다.
    const { fires } = run('dwell', [
      { x: 0.1, time: 0 },
      { x: 0.28, time: 100 },
      { x: 0.32, time: 100 + DWELL_MS },
      { x: 0.7, time: 900 },
      { x: 0.7, time: 900 + DWELL_MS },
    ]);
    expect(fires.map((f) => f.targetId)).toEqual([0, 1]);
  });
});

describe('핀치', () => {
  it('과녁 위에서 누르면 그 과녁을 고른다', () => {
    const { fires } = run('pinch', [{ x: 0.1 }, { x: 0.3 }, { x: 0.3, pinched: true }]);
    expect(fires).toHaveLength(1);
    expect(fires[0].targetId).toBe(0);
  });

  it('과녁 밖에서 누르면 빈손으로 기록된다', () => {
    const { fires } = run('pinch', [{ x: 0.5, pinched: true }]);
    expect(fires).toHaveLength(1);
    expect(fires[0].targetId).toBeNull();
  });

  it('누르지 않으면 아무리 머물러도 고르지 않는다', () => {
    const { fires } = run('pinch', [{ x: 0.3, time: 0 }, { x: 0.3, time: 9000 }]);
    expect(fires).toHaveLength(0);
  });
});

describe('재진입 세기', () => {
  it('곧장 들어가면 0이다', () => {
    let state = beginSelection(initialState(0.1));
    for (const x of [0.1, 0.2, 0.3]) {
      state = step('dwell', state, { x, time: 0, pinched: false }, TARGETS).state;
    }
    expect(state.reentries).toBe(0);
  });

  it('지나쳤다 되돌아오면 1이다', () => {
    let state = beginSelection(initialState(0.1));
    for (const x of [0.1, 0.3, 0.5, 0.3]) {
      state = step('dwell', state, { x, time: 0, pinched: false }, TARGETS).state;
    }
    expect(state.reentries).toBe(1);
  });
});

describe('과제 만들기', () => {
  it('둘 과제는 번갈아 고르게 짜인다', () => {
    for (const trial of buildTrials('binary', 6, 3)) {
      expect(trial.targets).toHaveLength(2);
      for (let i = 1; i < trial.order.length; i += 1) {
        expect(trial.order[i]).not.toBe(trial.order[i - 1]);
      }
    }
  });

  it('둘 과제는 여섯 조건을 고르게 돈다', () => {
    const trials = buildTrials('binary', 12, 3);
    const conditions = new Set(trials.map((t) => `${t.width}|${t.amplitude}`));
    expect(conditions.size).toBe(6);
  });

  it('셋 과제에는 같은 것·옆 것·건너뛴 것이 한 번씩 들어간다', () => {
    for (const trial of buildTrials('multi', 20, 5)) {
      expect(trial.targets).toHaveLength(MULTI.targets);
      expect(trial.order).toHaveLength(MULTI.selections);
      const first = trial.order[0];
      // 과녁이 셋일 때 '건너뛴 것'이 있으려면 끝에서 출발해야 한다.
      expect([0, MULTI.targets - 1]).toContain(first);
      const rest = trial.order.slice(1);
      expect(rest).toContain(first);
      const gaps = rest.map((id) => Math.abs(id - first)).sort((a, b) => a - b);
      expect(gaps).toEqual([0, 1, 2]);
    }
  });

  it('과녁은 띠 안에 들어온다', () => {
    for (const kind of ['binary', 'multi'] as const) {
      for (const trial of buildTrials(kind, 10, 7)) {
        for (const target of trial.targets) {
          expect(target.center - target.width / 2).toBeGreaterThanOrEqual(0);
          expect(target.center + target.width / 2).toBeLessThanOrEqual(1);
        }
      }
    }
  });

  it('같은 씨앗이면 같은 과제가 나온다', () => {
    expect(buildTrials('multi', 8, 11)).toEqual(buildTrials('multi', 8, 11));
  });
});

/** 성적 계산을 시험하기 위한 가짜 선택 기록. */
function fake(width: number, amplitude: number, x: number, time: number, hit = true): Selection {
  return {
    askedId: 1,
    gotId: hit ? 1 : 0,
    movementTime: time,
    x,
    fromX: x - amplitude,
    width,
    amplitude,
    reentries: 0,
  };
}

describe('피츠 계산', () => {
  it('빗나간 선택은 조건 점에 넣지 않는다', () => {
    const points = conditionPoints([
      fake(0.06, 0.4, 0.7, 1),
      fake(0.06, 0.4, 0.71, 1.1),
      fake(0.06, 0.4, 0.9, 5, false),
    ]);
    expect(points).toHaveLength(1);
    expect(points[0].count).toBe(2);
  });

  it('끝점이 흩어질수록 유효 폭이 넓어진다', () => {
    const tight = conditionPoints([fake(0.06, 0.4, 0.70, 1), fake(0.06, 0.4, 0.705, 1)]);
    const loose = conditionPoints([fake(0.06, 0.4, 0.68, 1), fake(0.06, 0.4, 0.74, 1)]);
    expect(loose[0].effectiveWidth).toBeGreaterThan(tight[0].effectiveWidth);
    // 폭이 넓으면 쉬운 과제이므로 난이도가 낮다.
    expect(loose[0].ide).toBeLessThan(tight[0].ide);
  });

  it('점이 하나뿐인 조건은 버린다 — 표준편차를 낼 수 없다', () => {
    expect(conditionPoints([fake(0.06, 0.4, 0.7, 1)])).toHaveLength(0);
  });

  it('시간이 난이도에 정확히 비례하면 R²가 1이다', () => {
    // 조건 셋을 만든 뒤, 각 조건의 IDe를 먼저 재고 그에 딱 맞는 시간을 되먹인다.
    // 점이 셋이라 우연히 직선이 될 일이 없다.
    const spreads = [0.004, 0.01, 0.02];
    const widths = [0.03, 0.06, 0.09];
    const probe = conditionPoints(
      widths.flatMap((width, i) =>
        [-spreads[i], spreads[i]].map((offset) => fake(width, 0.4, 0.7 + offset, 1)),
      ),
    );
    expect(probe).toHaveLength(3);

    const selections: Selection[] = widths.flatMap((width, i) => {
      const point = probe.find((p) => p.width === width)!;
      const time = 0.2 + 0.5 * point.ide;
      return [-spreads[i], spreads[i]].map((offset) => fake(width, 0.4, 0.7 + offset, time));
    });
    const fitted = report('dwell', selections);
    expect(fitted.rSquared).toBeCloseTo(1, 6);
    expect(fitted.slope).toBeCloseTo(0.5, 6);
    expect(fitted.intercept).toBeCloseTo(0.2, 6);
  });

  it('오류율은 빗나간 비율이다', () => {
    const fitted = report('pinch', [
      fake(0.06, 0.4, 0.7, 1),
      fake(0.06, 0.4, 0.71, 1),
      fake(0.06, 0.4, 0.9, 1, false),
      fake(0.06, 0.4, 0.9, 1, false),
    ]);
    expect(fitted.errorRate).toBeCloseTo(0.5, 10);
  });

  it('기록이 없으면 0으로 떨어지고 터지지 않는다', () => {
    const empty = report('cross', []);
    expect(empty.selectionCount).toBe(0);
    expect(empty.errorRate).toBe(0);
    expect(Number.isFinite(empty.throughput)).toBe(true);
    expect(Number.isFinite(empty.movementTime)).toBe(true);
  });
});

/**
 * 논문의 발견이 나오는 자리를 짚는 시험.
 *
 * 과녁이 늘면 목표까지 가는 길에 다른 과녁을 밟고 지나가게 된다. 그때 드웰은 밟힌 과녁을
 * 골라 버리고(마이더스의 손), 크로싱은 반대편으로 빠져나가므로 아무 일도 일어나지 않는다.
 * 논문에서 과녁이 셋이 되자 오류율이 갈린 까닭이 이것이다.
 */
describe('과녁을 지나칠 때', () => {
  const three: Target[] = [
    { id: 0, center: 0.2, width: 0.08 },
    { id: 1, center: 0.5, width: 0.08 },
    { id: 2, center: 0.8, width: 0.08 },
  ];

  /** 왼쪽 끝에서 오른쪽 끝 과녁까지 일정한 속도로 건너간다. 가운데 과녁을 밟고 지나간다. */
  const sweep = (totalMs: number) =>
    Array.from({ length: 61 }, (_, i) => ({ x: 0.05 + (i / 60) * 0.75, time: (i / 60) * totalMs }));

  it('크로싱은 지나가는 과녁을 고르지 않는다', () => {
    const { fires } = run('cross', sweep(2000), three);
    expect(fires).toHaveLength(0);
  });

  it('드웰은 천천히 지나가면 지나가는 과녁을 골라 버린다', () => {
    // 폭 0.08짜리 과녁은 건너가는 거리 0.75의 약 10.7%다. 그 위에 500ms를 머무르려면
    // 전체 건너가기가 4.7초는 넘어야 한다. 6초로 잡는다.
    const { fires } = run('dwell', sweep(6000), three);
    expect(fires.map((f) => f.targetId)).toContain(1);
  });

  it('드웰도 빠르게 지나가면 밟히지 않는다', () => {
    const { fires } = run('dwell', sweep(300), three);
    expect(fires).toHaveLength(0);
  });

  it('핀치는 누른 순간에만 반응하므로 지나가도 조용하다', () => {
    const { fires } = run('pinch', sweep(2000), three);
    expect(fires).toHaveLength(0);
  });
});

describe('판이 바뀔 때의 잠금', () => {
  it('과녁 안에서 시작하면 한 번 나가기 전까지는 골라지지 않는다', () => {
    // 커서가 이미 0번 과녁 안(0.3)에 있는 채로 새 판이 시작된 상황.
    let state: FullState = initialState(0.3, true);
    const feed = (x: number, time: number, pinched = false) => {
      const result = step('cross', state, { x, time, pinched }, TARGETS);
      state = result.state;
      return result.fire;
    };
    // 오른쪽 절반에서 시작했으므로 '오른쪽에서 들어온 것'으로 읽힌다.
    expect(feed(0.32, 0)).toBeNull();
    // 오른쪽으로 빠져나온다. 잠기지 않았다면 이것만으로 골라졌을 모양이다.
    expect(feed(0.5, 16)).toBeNull();
    // 밖으로 나왔으니 이제 잠금이 풀린다. 평소대로 들어갔다 같은 쪽으로 나오면 골라진다.
    expect(feed(0.32, 32)).toBeNull();
    expect(feed(0.5, 48)).not.toBeNull();
  });

  it('드웰도 잠긴 동안에는 시간이 차도 골라지지 않는다', () => {
    let state: FullState = initialState(0.3, true);
    const feed = (x: number, time: number) => {
      const result = step('dwell', state, { x, time, pinched: false }, TARGETS);
      state = result.state;
      return result.fire;
    };
    expect(feed(0.3, 0)).toBeNull();
    expect(feed(0.3, DWELL_MS * 3)).toBeNull();
    // 한 번 나갔다 들어오면 정상으로 돌아온다.
    expect(feed(0.5, DWELL_MS * 3 + 16)).toBeNull();
    expect(feed(0.3, DWELL_MS * 3 + 32)).toBeNull();
    expect(feed(0.3, DWELL_MS * 4 + 32)).not.toBeNull();
  });

  it('핀치도 잠긴 동안에는 눌러도 반응하지 않는다', () => {
    let state: FullState = initialState(0.3, true);
    const first = step('pinch', state, { x: 0.3, time: 0, pinched: true }, TARGETS);
    expect(first.fire).toBeNull();
    const outside = step('pinch', first.state, { x: 0.5, time: 16, pinched: false }, TARGETS);
    const back = step('pinch', outside.state, { x: 0.3, time: 32, pinched: true }, TARGETS);
    expect(back.fire).not.toBeNull();
  });

  it('잠그지 않으면 예전처럼 곧바로 반응한다', () => {
    const result = step('pinch', initialState(0.3), { x: 0.3, time: 0, pinched: true }, TARGETS);
    expect(result.fire).not.toBeNull();
  });
});
