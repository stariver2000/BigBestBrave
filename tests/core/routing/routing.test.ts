import { describe, expect, it } from 'vitest';
import { createRandom } from '../../../src/core/random';
import {
  appView,
  buildCity,
  compare,
  costOf,
  GRID,
  habitualDelays,
  memoryView,
  makeTrip,
  MODES,
  otherEnd,
  runMode,
  shortest,
  todaysTimes,
  type Times,
} from '../../../src/core/routing';

const city = buildCity();
const flat: Times = city.edges.map((edge) => edge.base);
const noDelay: Times = city.edges.map(() => 0);
const START = 0;
const GOAL = city.nodes.length - 1;

describe('도시', () => {
  it('격자만큼의 자리와 길이 생긴다', () => {
    expect(city.nodes).toHaveLength(GRID * GRID);
    // 가로 이음 GRID*(GRID-1) + 세로 이음 GRID*(GRID-1)
    expect(city.edges).toHaveLength(2 * GRID * (GRID - 1));
  });

  it('길은 이웃한 자리끼리만 잇는다', () => {
    for (const edge of city.edges) {
      const a = city.nodes[edge.from];
      const b = city.nodes[edge.to];
      expect(Math.abs(a.x - b.x) + Math.abs(a.y - b.y)).toBe(1);
    }
  });

  it('이음표가 서로 맞는다', () => {
    for (const edge of city.edges) {
      expect(city.adjacency[edge.from]).toContain(edge.id);
      expect(city.adjacency[edge.to]).toContain(edge.id);
      expect(otherEnd(city, edge.id, edge.from)).toBe(edge.to);
      expect(otherEnd(city, edge.id, edge.to)).toBe(edge.from);
    }
  });

  it('큰길이 있고 골목도 있다', () => {
    const arterial = city.edges.filter((edge) => edge.arterial).length;
    expect(arterial).toBeGreaterThan(0);
    expect(arterial).toBeLessThan(city.edges.length);
  });
});

describe('최단 경로', () => {
  it('막힘이 없으면 곧장 가는 길이가 나온다', () => {
    const route = shortest(city, flat, START, GOAL);
    // 격자 모퉁이에서 모퉁이까지는 최소 2*(GRID-1) 칸이다.
    expect(route.path).toHaveLength(2 * (GRID - 1));
    expect(route.minutes).toBeCloseTo(costOf(route.path, flat), 10);
  });

  it('길을 이으면 실제로 출발에서 도착까지 이어진다', () => {
    const route = shortest(city, flat, START, GOAL);
    let here = START;
    for (const edgeId of route.path) here = otherEnd(city, edgeId, here);
    expect(here).toBe(GOAL);
  });

  it('제자리로 가는 길은 비어 있다', () => {
    expect(shortest(city, flat, 5, 5)).toEqual({ path: [], minutes: 0 });
  });

  /** 최단 경로가 정확하다는 것을 다른 방법으로 확인한다. */
  it('어떤 길도 최단 경로보다 짧을 수 없다', () => {
    const random = createRandom(11);
    const times = todaysTimes(city, noDelay, random);
    const best = shortest(city, times, START, GOAL).minutes;
    // 무작위로 걸어간 길들과 견준다.
    for (let attempt = 0; attempt < 200; attempt += 1) {
      let here = START;
      const seen = new Set<number>([START]);
      let total = 0;
      for (let step = 0; step < 40 && here !== GOAL; step += 1) {
        const options = city.adjacency[here].filter((id) => !seen.has(otherEnd(city, id, here)));
        if (options.length === 0) break;
        const pick = options[Math.floor(random() * options.length)];
        total += times[pick];
        here = otherEnd(city, pick, here);
        seen.add(here);
      }
      if (here === GOAL) expect(total).toBeGreaterThanOrEqual(best - 1e-9);
    }
  });

  it('한 길을 아주 비싸게 만들면 그 길을 피한다', () => {
    const route = shortest(city, flat, START, GOAL);
    const avoid = route.path[0];
    const costly = [...flat];
    costly[avoid] = 9999;
    expect(shortest(city, costly, START, GOAL).path).not.toContain(avoid);
  });
});

describe('오늘의 시간', () => {
  it('평소보다 짧아지는 길은 없다', () => {
    const random = createRandom(3);
    for (let day = 0; day < 30; day += 1) {
      const times = todaysTimes(city, noDelay, random);
      for (const edge of city.edges) expect(times[edge.id]).toBeGreaterThanOrEqual(edge.base);
    }
  });

  it('같은 씨앗이면 같은 날이 온다', () => {
    expect(todaysTimes(city, noDelay, createRandom(7))).toEqual(
      todaysTimes(city, noDelay, createRandom(7)),
    );
  });
});

describe('앎', () => {
  const random = createRandom(13);
  const truth = todaysTimes(city, noDelay, random);

  it('앱이 보는 시간은 평소와 사실 사이에 있다', () => {
    const seen = appView(city, truth);
    for (const edge of city.edges) {
      expect(seen[edge.id]).toBeGreaterThanOrEqual(edge.base - 1e-9);
      expect(seen[edge.id]).toBeLessThanOrEqual(truth[edge.id] + 1e-9);
    }
  });

  it('앱은 큰길을 골목보다 잘 본다', () => {
    // 두 종류 모두 크게 막힌 날을 만들어 견준다.
    const jammed: Times = city.edges.map((edge) => edge.base + 10);
    const seen = appView(city, jammed);
    const arterial = city.edges.find((edge) => edge.arterial)!;
    const street = city.edges.find((edge) => !edge.arterial)!;
    expect(seen[arterial.id] - arterial.base).toBeGreaterThan(seen[street.id] - street.base);
  });

  it('가 본 적 없는 길은 사람 눈에 평소대로 보인다', () => {
    const never = city.edges.map(() => 0);
    const view = memoryView(city, never, never);
    for (const edge of city.edges) expect(view[edge.id]).toBeCloseTo(edge.base, 10);
  });

  it('겪은 것과 평소 시간을 섞는다', () => {
    // 두 번 겪었고 매번 6분씩 더 걸렸다면, 무게 2가 붙어 절반만 반영된다.
    const seenCount = city.edges.map(() => 2);
    const sums = city.edges.map((edge) => (edge.base + 6) * 2);
    const view = memoryView(city, sums, seenCount);
    for (const edge of city.edges) expect(view[edge.id]).toBeCloseTo(edge.base + 3, 10);
  });

  it('많이 겪을수록 겪은 쪽으로 다가간다', () => {
    const edge = city.edges[0];
    const near = memoryView(city, city.edges.map(() => (edge.base + 6) * 20), city.edges.map(() => 20));
    const far = memoryView(city, city.edges.map(() => (edge.base + 6) * 1), city.edges.map(() => 1));
    expect(near[edge.id]).toBeGreaterThan(far[edge.id]);
    expect(near[edge.id]).toBeLessThan(edge.base + 6);
  });

  it('기억은 오늘을 미리 알지 못한다', () => {
    // 어제까지 늘 평소대로였다면, 오늘 크게 막혀도 기억은 평소 시간을 말한다.
    const seenCount = city.edges.map(() => 5);
    const sums = city.edges.map((edge) => edge.base * 5);
    const view = memoryView(city, sums, seenCount);
    for (const edge of city.edges) expect(view[edge.id]).toBeCloseTo(edge.base, 10);
  });
});

describe('한 번 다녀오기', () => {
  const random = createRandom(17);
  const truth = todaysTimes(city, noDelay, random);
  const memory = city.edges.map(() => 0);
  const seen = city.edges.map(() => 0);

  it('세 태도 모두 출발에서 도착까지 이어진다', () => {
    for (const mode of MODES) {
      const trip = makeTrip(mode, { city, truth, memory, seen, start: START, goal: GOAL, index: 0 });
      let here = START;
      for (const edgeId of trip.path) here = otherEnd(city, edgeId, here);
      expect(here).toBe(GOAL);
    }
  });

  /** 다익스트라가 정확하므로 이 성질은 어림이 아니라 반드시 성립한다. */
  it('후회는 결코 0보다 작아지지 않는다', () => {
    const walkRandom = createRandom(19);
    const walkedMemory = city.edges.map(() => 0);
    const walkedSeen = city.edges.map(() => 0);
    const habitual = habitualDelays(city, walkRandom);
    for (let day = 0; day < 60; day += 1) {
      const today = todaysTimes(city, habitual, walkRandom);
      for (const mode of MODES) {
        const trip = makeTrip(mode, {
          city, truth: today, memory: walkedMemory, seen: walkedSeen,
          start: START, goal: GOAL, index: day,
        });
        expect(trip.regret).toBeGreaterThanOrEqual(-1e-9);
        expect(trip.minutes).toBeCloseTo(costOf(trip.path, today), 9);
        expect(trip.regret).toBeCloseTo(trip.minutes - trip.best, 9);
      }
    }
  });

  it('모든 것을 아는 사람이라면 후회가 0이다', () => {
    // 모든 길을 다녀 봤고 앎이 완전하다면 사람의 눈이 곧 사실이다.
    const perfect = shortest(city, truth, START, GOAL);
    expect(costOf(perfect.path, truth) - perfect.minutes).toBeCloseTo(0, 9);
  });
});

describe('여러 날 다니기', () => {
  const { runs } = compare({ trips: 60, seed: 21 });
  const byMode = Object.fromEntries(runs.map((run) => [run.mode, run]));

  it('세 태도가 모두 나온다', () => {
    expect(runs.map((run) => run.mode)).toEqual([...MODES]);
    for (const run of runs) expect(run.trips).toHaveLength(60);
  });

  it('평균은 실제로 잰 평균과 같다', () => {
    for (const run of runs) {
      const raw = run.trips.reduce((sum, trip) => sum + trip.minutes, 0) / run.trips.length;
      expect(run.meanMinutes).toBeCloseTo(raw, 9);
      expect(run.meanRegret).toBeGreaterThanOrEqual(0);
    }
  });

  it('지나 본 비율은 0과 1 사이이고 쓴 길의 수와 맞는다', () => {
    for (const run of runs) {
      const used = run.useCount.filter((count) => count > 0).length;
      expect(run.coverage).toBeCloseTo(used / city.edges.length, 10);
      expect(run.coverage).toBeGreaterThan(0);
      expect(run.coverage).toBeLessThanOrEqual(1);
    }
  });

  it('길을 쓴 횟수의 합은 지나온 길의 총수와 같다', () => {
    for (const run of runs) {
      const total = run.useCount.reduce((sum, count) => sum + count, 0);
      const walked = run.trips.reduce((sum, trip) => sum + trip.path.length, 0);
      expect(total).toBe(walked);
    }
  });

  /**
   * 이 모형이 실제로 내놓는 맞바꿈이다. 미리 정해 둔 결론이 아니라 돌려 보고 확인했다.
   * 한 씨앗에 매달리면 흔들리므로 여러 날씨를 평균낸다.
   */
  it('아는 길을 고쳐 가는 쪽이 켜 두기만 하는 쪽보다 시간을 덜 잃는다', () => {
    const seeds = [21, 99, 7, 55, 3];
    const meanRegretOf = (mode: 'follow' | 'modify' | 'background') =>
      seeds
        .map((seed) => compare({ trips: 60, seed }).runs.find((run) => run.mode === mode)!.meanRegret)
        .reduce((sum, value) => sum + value, 0) / seeds.length;

    const modify = meanRegretOf('modify');
    const background = meanRegretOf('background');
    const follow = meanRegretOf('follow');
    expect(modify).toBeLessThan(background);
    expect(modify).toBeLessThan(follow);
    // 어느 태도든 완벽할 수는 없다.
    expect(modify).toBeGreaterThan(0);
  });

  it('되풀이 몫과 갈래 수가 서로 맞는다', () => {
    for (const run of runs) {
      expect(run.topRouteShare).toBeGreaterThan(0);
      expect(run.topRouteShare).toBeLessThanOrEqual(1);
      expect(run.distinctRoutes).toBeGreaterThanOrEqual(1);
      expect(run.distinctRoutes).toBeLessThanOrEqual(run.trips.length);
      // 갈래가 하나뿐이면 그 하나가 전부다.
      if (run.distinctRoutes === 1) expect(run.topRouteShare).toBe(1);
    }
  });

  it('화면은 따르기에서 가장 많이 본다', () => {
    expect(byMode.follow.meanGlances).toBeGreaterThan(byMode.modify.meanGlances);
    expect(byMode.modify.meanGlances).toBeGreaterThan(byMode.background.meanGlances);
  });

  it('같은 씨앗이면 같은 결과가 나온다', () => {
    expect(runMode('modify', city, { trips: 20, seed: 5 })).toEqual(
      runMode('modify', city, { trips: 20, seed: 5 }),
    );
  });

  it('한 번도 안 다니면 0으로 떨어지고 터지지 않는다', () => {
    const empty = runMode('follow', city, { trips: 0, seed: 1 });
    expect(empty.meanMinutes).toBe(0);
    expect(empty.coverage).toBe(0);
    expect(empty.topRouteShare).toBe(0);
    expect(empty.distinctRoutes).toBe(0);
  });
});
