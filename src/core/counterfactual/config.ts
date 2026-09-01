/**
 * 반사실 코어의 상수.
 *
 * 근거가 된 연구: CounterStress: Enhancing Stress Coping Planning through Counterfactual
 * Explanations in Personal Informatics (Gyuwon Jung, Uichin Lee, KAIST),
 * CHI 2025, doi:10.1145/3706598.3713730.
 *
 * 논문이 옮길 수 있게 적어 둔 것
 *   - 맥락의 종류 넷: 활동, 장소, 사회적 상황, 시간.
 *   - 반사실마다 보여 준 세 가지 수치: 높은 스트레스일 확률 p, 바꾼 맥락의 수 n,
 *     그 상황을 전에 겪은 횟수 r.
 *   - 겪어 본 적 있는 반사실(r > 0)과 없는 것(r = 0)을 다르게 그렸다.
 *   - 바꾸지 않을 맥락을 잠그는 기능(constraint).
 *   - 고른 반사실에서 맥락마다의 이바지를 섀플리 값으로 내어 막대로 보였다.
 *   - 인과는 거친 정확 짝짓기(coarsened exact matching)로 보았다.
 */

import type { Facet } from './types';

/** 맥락 종류와 그 값들. 값의 수가 적어야 반사실을 전부 훑을 수 있다. */
export const FACETS: readonly Facet[] = ['activity', 'place', 'social', 'time'];

export const VALUES: Record<Facet, readonly string[]> = {
  activity: ['study', 'work', 'commute', 'rest', 'exercise'],
  place: ['home', 'campus', 'cafe', 'outside'],
  social: ['alone', 'friends', 'family', 'strangers'],
  time: ['morning', 'day', 'evening', 'night'],
};

/** 훑어야 할 상황의 총수. 5 x 4 x 4 x 4 = 320이라 전부 세어 볼 수 있다. */
export const SPACE_SIZE = 5 * 4 * 4 * 4;

/** 스트레스 수준이 이 값 이상이면 '높다'고 본다. 5점 척도의 위 두 칸이다. */
export const HIGH_THRESHOLD = 4;

/** 셈에 쓰는 라플라스 평활 상수. 한 번도 안 나온 값이 무한대가 되지 않게 한다. */
export const SMOOTHING = 1;

/** 기록을 몇 줄이나 지을 것인가. */
export const LOG_SIZE = { min: 60, max: 600, step: 20, initial: 300 } as const;

/** 반사실을 몇 개까지 보여 줄 것인가. */
export const SHOW_LIMIT = 8;

/** 씨앗. 같은 씨앗이면 같은 기록이 나온다. */
export const SEED = 20250901;

/**
 * 기록을 지을 때 쓰는 숨은 참값(로그 오즈).
 *
 * 화면의 모형은 이 값을 모른다. 기록만 보고 되짚는다. 그래서 되짚은 무게는 참값과
 * 조금씩 어긋나고, 그 어긋남이야말로 자기 기록으로 무언가를 배울 때 늘 있는 일이다.
 */
export const TRUTH = {
  bias: -0.9,
  activity: { study: 1.1, work: 1.3, commute: 0.5, rest: -0.9, exercise: -1.2 },
  place: { home: -0.5, campus: 0.7, cafe: 0.1, outside: -0.3 },
  social: { alone: 0.4, friends: -0.7, family: -0.2, strangers: 0.8 },
  time: { morning: -0.2, day: 0.2, evening: 0.1, night: 0.9 },
} as const;

/** 어떤 상황을 자주 겪는가. 기록은 고르게 흩어지지 않는다. */
export const HABIT = {
  activity: { study: 0.3, work: 0.25, commute: 0.15, rest: 0.2, exercise: 0.1 },
  place: { home: 0.4, campus: 0.35, cafe: 0.15, outside: 0.1 },
  social: { alone: 0.5, friends: 0.25, family: 0.15, strangers: 0.1 },
  time: { morning: 0.2, day: 0.35, evening: 0.3, night: 0.15 },
} as const;
