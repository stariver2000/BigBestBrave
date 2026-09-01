/**
 * 파레토 앞면.
 *
 * 두 가지를 한꺼번에 잘하려 할 때 쓰는 방법이다. 여기서는 성공 확률은 크게, 기대 비용은
 * 작게 하려 한다. 어떤 선택지가 다른 선택지보다 두 가지 모두에서 못하지 않으면 앞면에 남는다.
 * 남은 것들 사이에는 우열이 없다 — 하나를 얻으려면 다른 하나를 내주어야 한다.
 * 논문은 그 앞면에서 무작위로 하나를 골랐고, 여기서도 그렇게 한다.
 */

export interface Objective {
  /** 클수록 좋은 값. */
  gain: number;
  /** 작을수록 좋은 값. */
  cost: number;
}

/** b가 a를 누르는가. 두 값 모두 못하지 않고, 적어도 하나는 낫다면 그렇다. */
function dominates(b: Objective, a: Objective): boolean {
  const notWorse = b.gain >= a.gain && b.cost <= a.cost;
  const better = b.gain > a.gain || b.cost < a.cost;
  return notWorse && better;
}

/** 앞면에 드는 것들의 자리 번호. */
export function paretoFront(options: readonly Objective[]): number[] {
  const front: number[] = [];
  for (let i = 0; i < options.length; i += 1) {
    let beaten = false;
    for (let j = 0; j < options.length; j += 1) {
      if (i === j) continue;
      if (dominates(options[j], options[i])) {
        beaten = true;
        break;
      }
    }
    if (!beaten) front.push(i);
  }
  return front;
}
