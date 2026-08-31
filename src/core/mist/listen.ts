/**
 * 무엇이 얼마나 들리는지 센다.
 *
 * 향이 그러하듯 가까울수록 진하고 멀어지면 옅어진다. 여러 물방울이 겹치면 커지되,
 * 아무리 겹쳐도 1을 넘지 않는다. 소리가 무한히 커지는 일은 없기 때문이다.
 */

import { ENVELOPE, HEARING, LIQUIDS } from './config';
import type { Heard, Listener, Particle } from './types';

/** 태어나고 사라지는 동안의 크기. 양 끝을 눕혀 뚝 끊기지 않게 한다. */
export function envelopeAt(particle: Particle): number {
  const ratio = particle.age / particle.lifetime;
  if (ratio >= 1) return 0;
  if (ratio < ENVELOPE.attack) return ratio / ENVELOPE.attack;
  if (ratio > 1 - ENVELOPE.release) return (1 - ratio) / ENVELOPE.release;
  return 1;
}

/** 거리에 따라 줄어드는 크기. 범위를 벗어나면 0이다. */
export function falloffAt(distance: number): number {
  if (distance >= HEARING.radius) return 0;
  return Math.pow(1 - distance / HEARING.radius, HEARING.falloff);
}

/**
 * 지금 들리는 소리를 액체별로 모은다.
 *
 * 크기는 겹칠수록 커지되 1에서 멈춘다. 방향은 크기로 가중한 평균이라,
 * 크게 들리는 쪽이 방향을 정한다.
 */
export function listen(particles: readonly Particle[], listener: Listener): Heard[] {
  const sums = new Map<string, { gain: number; panWeighted: number }>();

  for (const particle of particles) {
    const dx = particle.x - listener.x;
    const dy = particle.y - listener.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const amount = falloffAt(distance) * envelopeAt(particle);
    if (amount <= 0) continue;

    const entry = sums.get(particle.liquid) ?? { gain: 0, panWeighted: 0 };
    entry.gain += amount;
    // 좌우 치우침은 반경 대비 가로 거리로 본다. 범위를 벗어나지 않게 잘라 둔다.
    entry.panWeighted += amount * Math.max(-1, Math.min(1, dx / HEARING.radius));
    sums.set(particle.liquid, entry);
  }

  return LIQUIDS.map((liquid) => {
    const entry = sums.get(liquid.id);
    if (!entry || entry.gain <= 0) return { liquid: liquid.id, gain: 0, pan: 0 };
    return {
      liquid: liquid.id,
      gain: Math.min(1, entry.gain),
      pan: entry.panWeighted / entry.gain,
    };
  });
}

/**
 * 지금 소리가 얼마나 섞여 있는지(0~1).
 *
 * 논문이 꼽은 즐거움 중 하나가 서로 다른 소리를 섞는 것이었다. 그 정도를 눈에 보이게 하려고
 * 액체별 크기의 고른 정도를 잰다. 한 가지만 들리면 0, 여러 가지가 고르게 들리면 1에 가깝다.
 */
export function blending(heard: readonly Heard[]): number {
  const active = heard.filter((item) => item.gain > 0);
  if (active.length <= 1) return 0;

  const total = active.reduce((sum, item) => sum + item.gain, 0);
  // 섀넌 엔트로피를 가능한 최대값으로 나눠 0~1로 만든다.
  const entropy = active.reduce((sum, item) => {
    const share = item.gain / total;
    return sum - share * Math.log(share);
  }, 0);
  return entropy / Math.log(active.length);
}
