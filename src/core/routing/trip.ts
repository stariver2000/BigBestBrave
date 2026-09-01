/**
 * 하루치 길과 세 가지 태도.
 *
 * 앎이 세 벌 있다. 사실(실제 시간), 앱이 보는 것, 사람이 보는 것.
 * 앱은 큰길을 잘 보고 사람은 다녀 본 길을 잘 본다. 세 태도는 이 두 앎을 다르게 섞는다.
 *
 *   follow     — 앱의 앎만 쓴다.
 *   modify     — 다녀 본 길은 내 앎으로, 나머지는 앱의 앎으로.
 *   background — 내 앎만 쓰되, 앱이 보기에 내 길이 크게 밀리면 그때만 앱을 따른다.
 */

import { createRandom } from '../random';
import { costOf, shortest } from './city';
import { GLANCES, HABITUAL, INTERRUPT_MINUTES, JAM, KNOWS, MEMORY_PRIOR } from './config';
import type { City, Mode, Times, Trip } from './types';

/**
 * 늘 느린 길. 도시가 만들어질 때 한 번 정해지고 날마다 그대로다.
 * 이것이 있어야 기억이 쓸모를 갖는다.
 */
export function habitualDelays(city: City, random: () => number): Times {
  return city.edges.map(() =>
    random() < HABITUAL.chance
      ? HABITUAL.minMinutes + random() * (HABITUAL.maxMinutes - HABITUAL.minMinutes)
      : 0,
  );
}

/** 오늘의 실제 시간표. 평소 시간 + 늘 느린 몫 + 오늘만의 막힘. */
export function todaysTimes(city: City, habitual: Times, random: () => number): Times {
  return city.edges.map((edge, id) => {
    const usual = edge.base + habitual[id];
    if (random() >= JAM.chance) return usual;
    return usual + JAM.minMinutes + random() * (JAM.maxMinutes - JAM.minMinutes);
  });
}

/**
 * 앱이 보는 오늘. 큰길은 잘 보고 골목은 흐릿하게 본다.
 * 앱은 '늘 느린 길'도 오늘 자료로만 알므로 골목에서는 그마저 놓친다.
 */
export function appView(city: City, truth: Times): Times {
  return city.edges.map((edge, id) => {
    const share = edge.arterial ? KNOWS.appArterial : KNOWS.appStreet;
    return edge.base + (truth[id] - edge.base) * share;
  });
}

/**
 * 사람이 기억하는 시간. 오늘을 미리 아는 것이 아니라, 지금까지 겪은 것의 평균이다.
 * 가 본 적 없는 길은 평소 시간으로 어림한다.
 *
 * 이 구분이 이 모형의 고비였다. 기억이 오늘을 꿰뚫어 보게 두면 사람이 앱만큼 밝아져
 * 세 태도가 갈리지 않는다. 사람이 아는 것은 '이 길이 대개 어떤지'까지다.
 */
export function memoryView(city: City, memory: readonly number[], seen: readonly number[]): Times {
  return city.edges.map((edge, id) => {
    // 겪은 것과 평소 시간을 섞는다. 한 번의 나쁜 날이 그 길을 영영 버리게 두지 않기 위해서다.
    const count = seen[id] ?? 0;
    return (edge.base * MEMORY_PRIOR + (memory[id] ?? 0)) / (MEMORY_PRIOR + count);
  });
}

/**
 * 앱의 오늘에 내가 아는 것을 얹는다.
 *
 * 두 앎을 그냥 바꿔치기하면 안 된다. 앱이 보는 것은 '오늘'이고 내 기억은 '평소'라,
 * 한 지도 안에 섞으면 뜻이 어긋난 수들을 견주게 된다. 실제로 그렇게 해 보면 다녀 본 길이
 * 늘 비싸 보여 자꾸 모르는 길로 새고, 셋 중 가장 나쁜 결과가 나왔다.
 *
 * 사람이 앱보다 아는 것은 '이 길이 평소에 얼마나 더 걸리는가'다. 그리고 앱은 그 몫을
 * 큰길에서는 대부분 보지만 골목에서는 거의 놓친다. 그러니 앱이 놓친 몫만큼만 얹어 준다.
 */
function corrected(city: City, app: Times, mine: Times, seen: readonly number[]): Times {
  return city.edges.map((edge, id) => {
    if ((seen[id] ?? 0) === 0) return app[id];
    const share = edge.arterial ? KNOWS.appArterial : KNOWS.appStreet;
    const iKnowIsSlow = Math.max(0, mine[id] - edge.base);
    return app[id] + (1 - share) * iKnowIsSlow;
  });
}

export interface TripInput {
  city: City;
  truth: Times;
  /** 길마다 겪은 시간의 합. */
  memory: number[];
  /** 길마다 겪은 횟수. */
  seen: number[];
  start: number;
  goal: number;
  index: number;
}

/** 태도 하나로 한 번 다녀온다. */
export function makeTrip(mode: Mode, input: TripInput): Trip {
  const { city, truth, memory, seen, start, goal, index } = input;
  const app = appView(city, truth);
  const mine = memoryView(city, memory, seen);

  let path: number[];
  if (mode === 'follow') {
    path = shortest(city, app, start, goal).path;
  } else if (mode === 'modify') {
    path = shortest(city, corrected(city, app, mine, seen), start, goal).path;
  } else {
    // 늘 다니던 길로 간다. 앱이 보기에 그 길이 크게 밀릴 때만 듣는다.
    const habit = shortest(city, mine, start, goal).path;
    const appRoute = shortest(city, app, start, goal);
    path = costOf(habit, app) - appRoute.minutes > INTERRUPT_MINUTES ? appRoute.path : habit;
  }

  const best = shortest(city, truth, start, goal).minutes;
  const minutes = costOf(path, truth);
  return {
    index,
    mode,
    path,
    minutes,
    best,
    // 다익스트라가 정확하므로 후회는 0보다 작아질 수 없다.
    regret: minutes - best,
    glances: GLANCES[mode],
  };
}

export { createRandom };
