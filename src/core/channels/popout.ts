/**
 * 튀어나옴 과제를 겪어 보게 하는 자리.
 *
 * n개의 표식 가운데 하나만 다른 판을 짠다. 논문의 실험 자극을 재현하는 것이 아니라
 * (그 명세는 보충 자료에 있다) 과제의 짜임만 가져온 시연이며, 화면에도 그렇게 적는다.
 * 씨앗을 받는 까닭은 시험이 재현할 수 있어야 하기 때문이다.
 */

import { createRandom } from '../random';

export interface PopoutTrial {
  /** 다른 하나의 자리(0부터). */
  odd: number;
  /** 표식마다의 값. 같은 것은 base, 다른 하나는 deviant다. */
  values: number[];
  base: number;
  deviant: number;
}

/**
 * 판을 짠다. base와 deviant는 0~1 눈금의 채널 값이다.
 * 차이(delta)가 클수록 쉬워진다 - 그것이 튀어나옴의 정의다.
 */
export function makeTrial(seed: number, count: number, delta: number): PopoutTrial {
  const random = createRandom(seed);
  const base = 0.35 + random() * 0.2;
  const deviant = Math.min(1, base + delta);
  const odd = Math.floor(random() * count);
  const values = Array.from({ length: count }, (_, index) => (index === odd ? deviant : base));
  return { odd, values, base, deviant };
}
