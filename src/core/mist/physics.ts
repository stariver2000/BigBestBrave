/**
 * 안개의 움직임.
 *
 * 뿌린 물방울은 나아가다 공기에 밀려 느려지고, 수명이 다하면 사라진다.
 * 모든 계산은 순수 함수다. 시간(dt)을 밖에서 넣어 주므로, 테스트에서 시간을 마음대로 돌릴 수 있다.
 */

import { DRAG, LIFETIME, MAX_PARTICLES, SPRAY } from './config';
import type { Particle } from './types';

/** 한 번 뿌린다. 방향은 원뿔 안에서 갈라지고, 시작 자리도 조금씩 흩뿌려진다. */
export function spray(
  x: number,
  y: number,
  angle: number,
  liquid: string,
  random: () => number,
): Particle[] {
  const drops: Particle[] = [];
  for (let index = 0; index < SPRAY.count; index += 1) {
    const spread = (random() - 0.5) * SPRAY.cone;
    const speed = SPRAY.speed * (0.5 + random());
    drops.push({
      liquid,
      x: x + (random() - 0.5) * SPRAY.jitter,
      y: y + (random() - 0.5) * SPRAY.jitter,
      vx: Math.cos(angle + spread) * speed,
      vy: Math.sin(angle + spread) * speed,
      age: 0,
      lifetime: LIFETIME.min + random() * (LIFETIME.max - LIFETIME.min),
    });
  }
  return drops;
}

/**
 * 시간을 dt(ms)만큼 흘린다.
 *
 * 속도는 지수적으로 줄어든다: v(t) = v₀·DRAG^t.
 * 나아간 거리는 그 속도를 시간에 대해 적분한 값이라 v₀·(DRAG^dt − 1) / ln(DRAG) 이다.
 * 시작 속도를 dt 내내 곱하면 프레임이 성길수록 더 멀리 가 버려, 화면마다 안개가 다르게 퍼진다.
 * dt가 아주 작을 때 이 식은 v₀·dt로 수렴하므로 촘촘한 화면에서도 같은 결과가 나온다.
 */
export function step(particles: readonly Particle[], dt: number): Particle[] {
  const seconds = dt / 1000;
  const decay = Math.pow(DRAG, seconds);
  const travel = (decay - 1) / Math.log(DRAG);

  const next: Particle[] = [];
  for (const particle of particles) {
    const age = particle.age + dt;
    if (age >= particle.lifetime) continue;
    next.push({
      ...particle,
      age,
      x: particle.x + particle.vx * travel,
      y: particle.y + particle.vy * travel,
      vx: particle.vx * decay,
      vy: particle.vy * decay,
    });
  }
  return next;
}

/** 물방울을 더한다. 한도를 넘으면 오래된 것부터 밀어낸다. */
export function add(particles: readonly Particle[], drops: readonly Particle[]): Particle[] {
  const merged = [...particles, ...drops];
  return merged.length > MAX_PARTICLES ? merged.slice(merged.length - MAX_PARTICLES) : merged;
}
