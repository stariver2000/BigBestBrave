/**
 * 계단법(staircase).
 *
 * 이 페이지가 이미 갖고 있던 것은 논문 Table 2의 **결과**였다. 여기 없던 것이 그 숫자를
 * 만들어 낸 **방법**이다. 문턱은 한 번 재서 나오지 않는다 — 크기를 조금씩 올려 가며 묻고,
 * 대답이 뒤집히면 걸음을 반으로 줄여 되돌아서고, 그러기를 여러 번 되풀이해 되돌아선 자리들을
 * 평균한 것이 문턱이다. 이 파일이 그 걸음이다.
 *
 * 대답하는 쪽이 사람이든 계산이든 이 걸음은 같다. 그래서 화면은 같은 계단을 두 번 쓴다 —
 * 한 번은 논문의 문턱을 가진 가상의 손이, 한 번은 화면 앞의 사람이 대답한다.
 *
 * 걸음의 크기와 되돌이 횟수는 이 페이지가 정한 값이다(config의 STAIRCASE).
 * 논문이 쓴 계단법의 설정은 본문에 실려 있지 않아 옮겨 오지 않았다.
 */

import { STAIRCASE } from './config';
import type { Answer, Run, RunLimits } from './types';

function clamp(value: number, limits: RunLimits): number {
  return Math.min(limits.max, Math.max(limits.min, value));
}

/** 계단 하나를 시작한다. 올려 가며 잴 때는 작은 쪽에서, 내려 가며 잴 때는 큰 쪽에서 출발한다. */
export function startRun(from: number, step: number): Run {
  return { level: from, step, moving: null, reversals: [], trail: [], done: false };
}

/**
 * 한 번 대답한다.
 *
 * '크다'고 답하면 다음은 작은 쪽으로, '작다'고 답하면 큰 쪽으로 간다. 문턱은 그 사이에 있다.
 * 가던 쪽이 바뀌는 자리가 되돌이이고, 되돌아설 때마다 걸음이 반으로 줄어 문턱에 좁혀 든다.
 */
export function answer(run: Run, said: Answer, limits: RunLimits): Run {
  if (run.done) return run;

  const wanted = said === 'bigger' ? 'down' : 'up';
  const reversed = run.moving !== null && run.moving !== wanted;

  const step = reversed ? Math.max(STAIRCASE.minStep, run.step * STAIRCASE.shrink) : run.step;
  const reversals = reversed ? [...run.reversals, run.level] : run.reversals;
  const done = reversals.length >= STAIRCASE.reversals;
  const next = clamp(run.level + (wanted === 'up' ? step : -step), limits);

  return {
    // 끝난 계단은 마지막 자리에 서 있는다. 화면이 그 자리를 그대로 보여 줄 수 있어야 한다.
    level: done ? run.level : next,
    step,
    moving: wanted,
    reversals,
    trail: [...run.trail, run.level],
    done,
  };
}

/** 되돌아선 자리들을 평균한 문턱. 아직 한 번도 되돌아서지 않았으면 null이다. */
export function thresholdOf(run: Run): number | null {
  if (run.reversals.length === 0) return null;
  const tail = run.reversals.slice(-STAIRCASE.average);
  return tail.reduce((sum, value) => sum + value, 0) / tail.length;
}

/**
 * 흔들리지 않는 가상의 손. 자기 문턱보다 큰 것만 크다고 답한다.
 *
 * 사람은 이렇게 대답하지 않는다 — 문턱 언저리에서는 같은 크기에도 다르게 답한다.
 * 그 흔들림까지 흉내 내지 않은 까닭은, 이 손이 보여 줄 것이 사람의 변덕이 아니라
 * **계단이 문턱을 찾아가는 길**이기 때문이다.
 */
export function virtualAnswer(level: number, threshold: number): Answer {
  return level > threshold ? 'bigger' : 'smaller';
}
