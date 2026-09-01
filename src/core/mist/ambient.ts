/**
 * 혼자 뿌리는 손.
 *
 * 이 페이지는 뿌리기 전까지 빈 화면이다. 그러면 소리를 자리에 둔다는 것이 무엇인지,
 * 놓인 소리가 어떻게 번지고 흩어지는지 아무것도 보이지 않는다.
 * 그래서 공간에 손 하나를 둔다. 천천히 돌아다니며 이따금 뿌리고, 뿌린 것은 저 혼자 흩어진다.
 *
 * 사람이 뿌리는 동안에는 이 손이 쉰다. 방이 조용해지는 것이 아니라 자리를 내주는 것이다.
 * 여기에는 시계가 없다. 지금 시각을 받아 다음 상태를 돌려줄 뿐이라 시험할 수 있다.
 */

import { AMBIENT, LIQUIDS } from './config';

export interface Wanderer {
  x: number;
  y: number;
  /** 나아가는 방향(라디안). */
  angle: number;
  /** 다음에 뿌릴 시각(ms). */
  nextAt: number;
  /** 다음에 뿌릴 액체의 자리. 한 가지만 뿌리면 섞이는 것을 볼 수 없다. */
  liquidIndex: number;
}

export interface Bounds {
  width: number;
  height: number;
}

export function startWanderer(bounds: Bounds, now: number, random: () => number): Wanderer {
  return {
    x: bounds.width * (0.3 + random() * 0.4),
    y: bounds.height * (0.3 + random() * 0.4),
    angle: random() * Math.PI * 2,
    // 첫 분무는 기다리지 않는다. 도착한 사람이 빈 화면을 보면 이 페이지는 아무 말도 하지 않은 셈이다.
    nextAt: now,
    liquidIndex: 0,
  };
}

/** 벽에 닿으면 되튄다. 밖으로 나가면 뿌린 것이 화면 밖에 쌓여 아무도 듣지 못한다. */
function reflect(value: number, limit: number, angle: number, axis: 'x' | 'y'): { value: number; angle: number } {
  if (value >= 0 && value <= limit) return { value, angle };
  const clamped = Math.min(Math.max(value, 0), limit);
  const turned = axis === 'x' ? Math.PI - angle : -angle;
  return { value: clamped, angle: turned };
}

/**
 * 한 걸음. 움직이고, 뿌릴 때가 되었는지 본다.
 * 뿌릴 때가 되면 다음 차례를 새로 잡고 액체도 바꾼다 — 다른 소리가 겹쳐야 섞이는 것을 듣는다.
 */
export function wander(
  wanderer: Wanderer,
  now: number,
  dt: number,
  bounds: Bounds,
  random: () => number,
): { wanderer: Wanderer; sprays: boolean } {
  const seconds = dt / 1000;
  const angle = wanderer.angle + (random() - 0.5) * AMBIENT.turn * seconds;

  const movedX = reflect(wanderer.x + Math.cos(angle) * AMBIENT.speed * seconds, bounds.width, angle, 'x');
  const movedY = reflect(wanderer.y + Math.sin(movedX.angle) * AMBIENT.speed * seconds, bounds.height, movedX.angle, 'y');

  const sprays = now >= wanderer.nextAt;
  const span = AMBIENT.interval.max - AMBIENT.interval.min;

  return {
    sprays,
    wanderer: {
      x: movedX.value,
      y: movedY.value,
      angle: movedY.angle,
      nextAt: sprays ? now + AMBIENT.interval.min + random() * span : wanderer.nextAt,
      liquidIndex: sprays ? (wanderer.liquidIndex + 1) % LIQUIDS.length : wanderer.liquidIndex,
    },
  };
}
