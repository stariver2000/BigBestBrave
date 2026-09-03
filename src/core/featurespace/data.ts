/**
 * 지어낸 카페 자료.
 *
 * 논문은 실제 구매 이력(7,200점 11특징)을 썼지만 남의 자료라 가져오지 않았다.
 * 대신 여기서 예순 곳의 카페를 짓는다. 세 무리(작업·수다·포장)가 실제로 있고,
 * 그 무리를 가르는 것은 세 특징(소음·좌석·와이파이)뿐이며 나머지 다섯은
 * 무리와 무관한 잡음이다. 가중치를 돌렸을 때 무엇이 무리를 만드는지 눈으로
 * 확인할 수 있어야 이 페이지의 이야기가 성립하기 때문이다.
 *
 * 씨앗 난수기는 반복문 밖에서 한 번만 만든다.
 */

import { createRandom } from '../random/seeded';
import { FEATURES, GROUPS, POINTS_PER_GROUP, type GroupId } from './config';

export interface Point {
  id: number;
  /** 참 무리. 자료를 지을 때 정해지며 화면에서 색으로만 쓴다. */
  group: GroupId;
  /** FEATURES 순서의 특징 값. 0~1로 맞춰 둔다. */
  values: number[];
}

/** 무리마다 가르는 세 특징의 중심값. 나머지는 무리와 무관하다. */
const CENTERS: Record<GroupId, { noise: number; seats: number; wifi: number }> = {
  work: { noise: 0.2, seats: 0.75, wifi: 0.9 },
  talk: { noise: 0.8, seats: 0.6, wifi: 0.35 },
  takeout: { noise: 0.45, seats: 0.1, wifi: 0.3 },
};

/** 가르는 특징의 흩어짐. 무리가 겹치지 않을 만큼만 좁다. */
const SPREAD = 0.09;

export function buildCafes(seed = 20260903): Point[] {
  const random = createRandom(seed);
  const points: Point[] = [];
  let id = 0;
  for (const group of GROUPS) {
    const center = CENTERS[group];
    for (let n = 0; n < POINTS_PER_GROUP; n += 1) {
      const values = FEATURES.map((feature) => {
        if (feature.id === 'noise') return clamp(center.noise + gauss(random) * SPREAD);
        if (feature.id === 'seats') return clamp(center.seats + gauss(random) * SPREAD);
        if (feature.id === 'wifi') return clamp(center.wifi + gauss(random) * SPREAD);
        // 잡음 특징: 무리와 무관하게 고르게 흩는다.
        return clamp(random());
      });
      points.push({ id, group, values });
      id += 1;
    }
  }
  return points;
}

/** Box-Muller 한 쪽만. 균등 난수 둘을 정규 하나로 바꾼다. */
function gauss(random: () => number): number {
  const u = Math.max(1e-9, random());
  const v = random();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

function clamp(value: number): number {
  return Math.min(1, Math.max(0, value));
}
