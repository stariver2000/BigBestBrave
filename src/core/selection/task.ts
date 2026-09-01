/**
 * 과제 만들기.
 *
 * 연구 1: 과녁 둘을 번갈아 여섯 번 고른다. 폭 세 가지 × 거리 두 가지를 무작위 순서로.
 * 연구 2: 가운데 정렬된 과녁 셋에서 네 번 고른다. 순서에는 같은 과녁 다시 고르기,
 *         옆 과녁, 건너뛴 과녁이 한 번씩 들어가도록 짠다. 논문의 구조 그대로다.
 */

import { createRandom, shuffle } from '../random';
import { BINARY_CONDITIONS, BINARY_SELECTIONS, MULTI } from './config';
import type { Target } from './types';

export type TaskKind = 'binary' | 'multi';

export interface Trial {
  kind: TaskKind;
  targets: Target[];
  /** 골라야 하는 과녁의 순서. */
  order: number[];
  width: number;
  amplitude: number;
}

function binaryTrial(width: number, amplitude: number): Trial {
  const left = 0.5 - amplitude / 2;
  const right = 0.5 + amplitude / 2;
  const targets: Target[] = [
    { id: 0, center: left, width },
    { id: 1, center: right, width },
  ];
  // 번갈아 고른다. 첫 과녁은 오른쪽이다(커서가 왼쪽에서 출발하므로).
  const order = Array.from({ length: BINARY_SELECTIONS }, (_, i) => (i % 2 === 0 ? 1 : 0));
  return { kind: 'binary', targets, order, width, amplitude };
}

function multiTrial(random: () => number): Trial {
  const { targets: count, width, gap } = MULTI;
  const targets: Target[] = Array.from({ length: count }, (_, id) => ({
    id,
    center: 0.5 + (id - (count - 1) / 2) * gap,
    width,
  }));

  // 첫 과녁을 고른 뒤, 같은 것 / 옆 것 / 건너뛴 것을 한 번씩 무작위 순서로 잇는다.
  //
  // 첫 과녁은 양 끝 중 하나여야 한다. 과녁이 셋일 때 가운데에서 출발하면 나머지 둘이 모두
  // 옆 과녁이라 '건너뛴 것'이 없어진다. 논문의 구조를 지키려면 끝에서 시작할 수밖에 없다.
  const first = random() < 0.5 ? 0 : count - 1;
  const adjacent = first === 0 ? 1 : count - 2;
  const distant = first === 0 ? count - 1 : 0;
  const rest = shuffle([first, adjacent, distant], random);
  return { kind: 'multi', targets, order: [first, ...rest], width, amplitude: gap };
}

/** 판을 만든다. 같은 씨앗이면 같은 순서가 나온다. */
export function buildTrials(kind: TaskKind, count: number, seed: number): Trial[] {
  const random = createRandom(seed);
  if (kind === 'multi') return Array.from({ length: count }, () => multiTrial(random));

  const trials: Trial[] = [];
  while (trials.length < count) {
    for (const condition of shuffle([...BINARY_CONDITIONS], random)) {
      if (trials.length >= count) break;
      trials.push(binaryTrial(condition.width, condition.amplitude));
    }
  }
  return trials;
}
