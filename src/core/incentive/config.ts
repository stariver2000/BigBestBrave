/**
 * 작은 보상 개인화 코어의 상수.
 *
 * 근거가 된 연구: Like Adding a Small Weight to a Scale About to Tip: Personalizing
 * Micro-Financial Incentives for Digital Wellbeing (Sueun Jang, Youngseok Seo,
 * Woohyeok Choi, Uichin Lee), CHI 2025, doi:10.1145/3706598.3714208.
 *
 * 논문은 알고리즘을 그대로 실었다(Algorithm 1). 그래서 이 페이지는 드물게
 * 방법을 통째로 옮길 수 있었다. 옮긴 것은 다음과 같다.
 *   - 팔 = 보상 금액. 0, 25, 50, 75, 100원 다섯 가지.
 *   - 각 팔의 성공 확률을 톰프슨 표집으로 뽑는다: theta_k ~ Beta(alpha_k + 1, beta_k + 1).
 *   - 기대 비용 omega_k = theta_k x i_k.
 *   - 성공은 크게, 비용은 작게 — 두 목표의 파레토 앞면을 구하고 그 안에서 무작위로 고른다.
 *   - 성공하면 alpha를, 실패하면 beta를 하나 올린다. 처음 값은 둘 다 0이다.
 *   - 맥락 셋(근무 시간, 근무 외, 주말)마다 팔을 따로 둔다.
 */

import type { Context, Responder, Strategy } from './types';

/** 보상 금액(원). 논문이 쓴 다섯 가지 그대로다. */
export const AMOUNTS = [0, 25, 50, 75, 100] as const;

/** 견주는 방식 셋. 논문의 세 집단과 같다. */
export const STRATEGIES: readonly Strategy[] = ['fixed', 'random', 'personal'];

/** 고정 보상 집단이 받은 금액. */
export const FIXED_AMOUNT = 50;

export const CONTEXTS: readonly Context[] = ['work', 'off', 'weekend'];

/** 몇 회를 돌릴 것인가. */
export const ROUNDS = { min: 30, max: 600, step: 10, initial: 240 } as const;

/** 처음 놓여 있는 사람. */
export const INITIAL_RESPONDER: Responder = {
  base: 0.3,
  lift: 0.4,
  enough: 50,
  contextShift: { work: -0.1, off: 0, weekend: 0.08 },
};

/** 씨앗. 같은 씨앗이면 같은 결과가 나온다. */
export const SEED = 20250901;

/**
 * 논문이 낸 수치. 화면에 함께 적되 내 결과와 견주지는 않는다.
 * 여기 시늉은 지어낸 사람을 상대로 돌린 것이라 조건이 전혀 다르다.
 */
export const PAPER_RESULT = {
  participants: 72,
  personalSuccessRate: 0.58,
  usageDropSeconds: 339.2,
} as const;
