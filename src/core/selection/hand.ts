/**
 * 규칙으로 움직이는 손.
 *
 * 이 페이지에는 과제가 있었지만, 사람이 손을 대기 전까지는 아무 일도 일어나지 않았다.
 * 그리고 논문의 알맹이 하나가 글로만 있었다 — 과녁이 셋이 되면 크로싱의 이점이 사라지고
 * 오류가 는다는 것. **왜** 그런지는 규칙에서 곧바로 나온다. 과녁이 둘이면 사이에 아무것도
 * 없지만, 셋이면 먼 과녁으로 가는 길에 가운데 과녁을 지나가야 한다. 지나가던 손이 잠깐
 * 뒤로 흔들리면 들어온 모서리로 되나온 것이 되고, 크로싱은 그것을 '골랐다'로 읽는다.
 *
 * 그래서 이 손은 성적을 내려고 있는 것이 아니라 **그 일이 일어나는 것을 보이려고** 있다.
 * 빠르기·떨림·지나침 깊이는 이 페이지가 정한 값이며(config의 HAND) 논문의 사람 자료가
 * 아니다. 여기서 나오는 맞고 틀림을 논문의 오류율과 견주면 안 된다.
 *
 * 판정은 사람이 할 때와 똑같이 triggers.ts의 step()이 한다. 손은 좌표만 만든다.
 */

import { DWELL_MS, HAND } from './config';
import type { Target, Trigger } from './types';

export interface Hand {
  /** 띠 좌표(0~1). */
  x: number;
  /** 노리는 과녁. */
  askedId: number;
  /** 과녁 안으로 얼마나 깊이 들어갔다 되나올지. 들어갈 때 정한다. */
  depth: number;
  /**
   * 어느 쪽에서 다가가고 있는가. 다가가기 시작할 때 정하고 그대로 붙든다.
   * 매 걸음 다시 재면 가운데를 지나친 순간 방향이 뒤집혀, 되나오려던 손이 앞으로 더 간다.
   */
  fromLeft: boolean | null;
  /** 되나오는 중인가. 크로싱은 되나와야 확정된다. */
  leaving: boolean;
  /** 과녁 안에서 기다린 시간(ms). 드웰에 쓴다. */
  waited: number;
  /** 이번 프레임에 확정 신호를 보냈는가(핀치). */
  pinch: boolean;
  /** 몇 번째 걸음인가. 흔들림을 되풀이 가능하게 만든다. */
  step: number;
}

export function newHand(x: number, askedId: number, step = 0): Hand {
  return { x, askedId, depth: 0, fromLeft: null, leaving: false, waited: 0, pinch: false, step };
}

/** 걸음마다 흔들리지만 되풀이하면 같은 값이 나오는 수(0~1). */
function jitter(step: number): number {
  const mixed = Math.sin(step * 78.233) * 43758.5453;
  return Math.abs(mixed - Math.floor(mixed));
}

/** 이번 걸음의 떨림. 사람 손은 곧게 가지 않는다. 이따금 뒤로도 간다. */
function tremorOf(step: number, dtMs: number): number {
  return (jitter(step) - 0.5) * 2 * HAND.tremorPerSecond * (dtMs / 1000);
}

/**
 * 손이 한 걸음 움직인다.
 *
 * 크로싱일 때는 과녁 안으로 조금 더 들어갔다가 들어온 쪽으로 되나온다. 가는 길 내내 손이
 * 떨리므로, 지나가는 과녁 위에서 그 떨림이 뒤로 향하면 그 과녁이 골라진다.
 * 드웰은 가운데에 서서 기다리고, 핀치는 가운데에 닿고 잠깐 뒤에 한 번 신호를 보낸다.
 */
export function handStep(hand: Hand, targets: readonly Target[], trigger: Trigger, dtMs: number): Hand {
  const target = targets.find((entry) => entry.id === hand.askedId);
  if (target === undefined) return { ...hand, pinch: false, step: hand.step + 1 };

  const from = hand.x;
  const step = hand.step + 1;
  const travel = HAND.speedPerSecond * (dtMs / 1000);
  // 가는 동안에만 떨린다. 멈춰 서서 기다리는 손까지 흔들리면 드웰이 영영 차지 않는다.
  const speed = travel + tremorOf(step, dtMs);

  // 이번 판에 과녁 안으로 얼마나 더 들어갈지. 반폭에 대한 비율이라 되나올 자리는 과녁 안이다.
  const depth =
    hand.depth === 0
      ? (target.width / 2) * (HAND.depthMin + jitter(step + 0.5) * (HAND.depthMax - HAND.depthMin))
      : hand.depth;

  const fromLeft = hand.fromLeft ?? from < target.center;
  const goal = fromLeft ? target.center + depth : target.center - depth;

  if (trigger === 'cross') {
    if (!hand.leaving) {
      const next = fromLeft ? Math.min(goal, from + speed) : Math.max(goal, from - speed);
      const reached = Math.abs(next - goal) <= HAND.arriveWithin;
      return { ...hand, x: next, depth, fromLeft, leaving: reached, pinch: false, step };
    }
    // 들어온 모서리 쪽으로 되나온다. 과녁 밖으로 완전히 나가야 확정된다.
    const edge = fromLeft ? target.center - target.width : target.center + target.width;
    const next = fromLeft ? Math.max(edge, from - speed) : Math.min(edge, from + speed);
    return { ...hand, x: next, depth, fromLeft, pinch: false, step };
  }

  // 드웰과 핀치는 가운데에 서는 것이 일이다. 다 온 뒤에는 떨지 않는다.
  const arrivedAlready = Math.abs(from - target.center) <= HAND.arriveWithin;
  const pace = arrivedAlready ? 0 : speed;
  const next = fromLeft ? Math.min(target.center, from + pace) : Math.max(target.center, from - pace);
  const arrived = Math.abs(next - target.center) <= HAND.arriveWithin;

  if (trigger === 'dwell') {
    return { ...hand, x: next, depth, fromLeft, waited: arrived ? hand.waited + dtMs : 0, pinch: false, step };
  }

  // 핀치: 가운데에 닿고 나서 사람이 손가락을 맞대는 데 걸리는 만큼 뜸을 들인 뒤 한 번 보낸다.
  const waited = arrived ? hand.waited + dtMs : 0;
  return { ...hand, x: next, depth, fromLeft, waited, pinch: arrived && waited >= HAND.pinchDelayMs, step };
}

/** 손이 이번 과녁에서 할 일을 다 했는가. 다음 과녁으로 넘어갈 때를 정한다. */
export function handSettled(hand: Hand, trigger: Trigger): boolean {
  if (trigger === 'dwell') return hand.waited >= DWELL_MS + HAND.pinchDelayMs;
  if (trigger === 'pinch') return hand.waited >= HAND.pinchDelayMs * 2;
  return hand.leaving;
}
