/**
 * 패턴 최적화 질의(Pattern Optimization Query)의 탐색.
 *
 * 논문은 Optuna의 TPE로 100회를 돌린다(5.3, 6.2절). TPE는 확률 모형을 세워
 * 잘하는 조합 쪽을 자주 뽑는 방법이라 같은 씨앗 없이는 재현되지 않는다.
 * 이 페이지는 대신 결정론적 좌표 탐색을 쓴다 - 특징을 차례로 돌며, 그 하나만
 * 눈금대로 바꿔 보고 점수가 가장 좋아지는 값을 채택한다. 링크를 열 때마다
 * 같은 길을 걷고, 한 걸음씩 화면에서 볼 수 있다는 이점이 있다.
 * 논문에서 가져온 것은 세 질의와 그 방향, 그리고 "찾는 무늬가 없을 수도 있음을
 * 인정하고 가장 가까운 조합을 돌려준다"는 태도다(3.3절).
 */

import { QUERIES, WEIGHT_MAX, WEIGHT_MIN, WEIGHT_STEP, type QueryId } from './config';
import type { Projected } from './project';

export interface SearchState {
  weights: number[];
  /** 지금 가중치의 점수. 질의 방향과 무관하게 "의미 값" 그대로다. */
  score: number;
  /** 걸음 수. 한 걸음은 특징 하나를 다시 고르는 것이다. */
  step: number;
  /** 다음에 볼 특징의 자리. */
  cursor: number;
  /** 시작 가중치. 무엇이 얼마나 움직였는지 보여 줄 때 쓴다. */
  origin: number[];
  /** 마지막 걸음에서 실제로 값이 바뀐 특징. 없으면 -1. */
  movedFeature: number;
  /** 한 바퀴를 돌았는데 아무것도 안 바뀌면 선다. */
  settled: boolean;
}

/** 질의가 점수를 어느 쪽으로 미는지. */
export function directionOf(query: QueryId): 1 | -1 {
  const found = QUERIES.find((candidate) => candidate.id === query);
  return found?.direction === 'min' ? -1 : 1;
}

/** 한 특징이 가질 수 있는 눈금값들. */
export function weightChoices(): number[] {
  const choices: number[] = [];
  for (let value = WEIGHT_MIN; value <= WEIGHT_MAX + 1e-9; value += WEIGHT_STEP) {
    choices.push(Number(value.toFixed(4)));
  }
  return choices;
}

export function startSearch(weights: readonly number[], score: number): SearchState {
  return {
    weights: [...weights],
    score,
    step: 0,
    cursor: 0,
    origin: [...weights],
    movedFeature: -1,
    settled: false,
  };
}

/**
 * 한 걸음. cursor가 가리키는 특징만 눈금대로 바꿔 보고 가장 좋은 값을 고른다.
 * 동점이면 지금 값을 지킨다 - 이유 없이 흔들리지 않게 하기 위해서다.
 * 한 바퀴(특징 수만큼)를 돌았는데 아무것도 안 바뀌면 settled가 된다.
 */
export function searchStep(
  state: SearchState,
  query: QueryId,
  evaluate: (weights: readonly number[]) => number,
): SearchState {
  if (state.settled) return state;
  const direction = directionOf(query);
  const featureCount = state.weights.length;
  const index = state.cursor % featureCount;

  let bestWeight = state.weights[index];
  let bestScore = state.score;
  for (const candidate of weightChoices()) {
    if (Math.abs(candidate - state.weights[index]) < 1e-9) continue;
    const trial = state.weights.slice();
    trial[index] = candidate;
    const trialScore = evaluate(trial);
    if (direction * trialScore > direction * bestScore + 1e-12) {
      bestScore = trialScore;
      bestWeight = candidate;
    }
  }

  const moved = Math.abs(bestWeight - state.weights[index]) > 1e-9;
  const weights = state.weights.slice();
  weights[index] = bestWeight;

  const step = state.step + 1;
  const cursor = state.cursor + 1;
  // 마지막 한 바퀴 동안 한 번도 안 움직였는지 본다.
  const settled = !moved && step >= featureCount && noRecentMove(state, featureCount);

  return {
    weights,
    score: bestScore,
    step,
    cursor,
    origin: state.origin,
    movedFeature: moved ? index : -1,
    settled,
  };
}

/**
 * 직전 한 바퀴가 조용했는지. 상태에 이력을 쌓지 않으려고, 지금 걸음이 안
 * 움직였고 그 전 걸음도 안 움직였다는 사실만 본다. 한 특징씩 도는 탐색에서
 * 연속으로 특징 수만큼 조용하면 더 나아갈 곳이 없다.
 */
function noRecentMove(state: SearchState, featureCount: number): boolean {
  return state.movedFeature === -1 && state.step % featureCount === featureCount - 1;
}

/** 시작 가중치에서 얼마나 움직였는지. 큰 것부터. */
export function movements(state: SearchState): { index: number; from: number; to: number; delta: number }[] {
  return state.weights
    .map((to, index) => ({
      index,
      from: state.origin[index],
      to,
      delta: to - state.origin[index],
    }))
    .filter((move) => Math.abs(move.delta) > 1e-9)
    .sort((a, b) => Math.abs(b.delta) - Math.abs(a.delta));
}

/** 질의에 필요한 무리 수를 채웠는지. Merge/Separate는 둘 이상이 필요하다(3.3절). */
export function queryAvailable(query: QueryId, groupCount: number): boolean {
  const found = QUERIES.find((candidate) => candidate.id === query);
  return groupCount >= (found?.minGroups ?? 0);
}

/** 투영이 비었을 때를 대비한 안전한 점수 계산. */
export function safeScore(projected: readonly Projected[], compute: () => number): number {
  return projected.length === 0 ? 0 : compute();
}
