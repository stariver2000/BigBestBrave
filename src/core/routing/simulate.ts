/** 세 태도를 같은 날들에 태워 본다. */

import { buildCity } from './city';
import { MODES, SEED, TRIPS } from './config';
import { createRandom, habitualDelays, makeTrip, todaysTimes } from './trip';
import type { City, Mode, Run, Trip } from './types';

export interface SimOptions {
  trips?: number;
  seed?: number;
  start?: number;
  goal?: number;
}

function mean(values: readonly number[]): number {
  return values.length === 0 ? 0 : values.reduce((sum, v) => sum + v, 0) / values.length;
}

/** 태도 하나로 여러 날을 다닌다. 다닐수록 아는 길이 늘어난다. */
export function runMode(mode: Mode, city: City, options: SimOptions = {}): Run {
  const count = options.trips ?? TRIPS.initial;
  const start = options.start ?? 0;
  const goal = options.goal ?? city.nodes.length - 1;
  const random = createRandom(options.seed ?? SEED);
  // 늘 느린 길은 날마다 같아야 하므로 먼저 한 번 정한다.
  const habitual = habitualDelays(city, random);

  const memory = city.edges.map(() => 0);
  const seen = city.edges.map(() => 0);
  const useCount = city.edges.map(() => 0);
  const trips: Trip[] = [];

  for (let index = 0; index < count; index += 1) {
    const truth = todaysTimes(city, habitual, random);
    const trip = makeTrip(mode, { city, truth, memory, seen, start, goal, index });
    for (const edgeId of trip.path) {
      // 지나면서 그 길이 오늘 얼마였는지를 겪는다. 기억은 겪은 것의 평균이다.
      memory[edgeId] += truth[edgeId];
      seen[edgeId] += 1;
      useCount[edgeId] += 1;
    }
    trips.push(trip);
  }

  // 길을 글자열로 바꿔 같은 길끼리 센다.
  const counts = new Map<string, number>();
  for (const trip of trips) {
    const key = trip.path.join('-');
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }
  const top = Math.max(0, ...counts.values());

  return {
    mode,
    trips,
    distinctRoutes: counts.size,
    topRouteShare: trips.length === 0 ? 0 : top / trips.length,
    meanMinutes: mean(trips.map((trip) => trip.minutes)),
    meanRegret: mean(trips.map((trip) => trip.regret)),
    // 도시의 길 가운데 한 번이라도 지나 본 비율. 논문이 말한 '그때 잃는 것'의 한 얼굴이다.
    coverage: useCount.filter((count2) => count2 > 0).length / city.edges.length,
    meanGlances: mean(trips.map((trip) => trip.glances)),
    useCount,
  };
}

/** 세 태도를 같은 씨앗으로 돌린다. 견주려면 같은 날씨를 주어야 한다. */
export function compare(options: SimOptions = {}): { city: City; runs: Run[] } {
  const city = buildCity();
  return { city, runs: MODES.map((mode) => runMode(mode, city, options)) };
}
