import { describe, expect, it } from 'vitest';
import { createRandom } from '@core/random';
import {
  HEARING,
  LIFETIME,
  LIQUIDS,
  MAX_PARTICLES,
  SPRAY,
  add,
  blending,
  envelopeAt,
  falloffAt,
  listen,
  spray,
  step,
  type Particle,
} from '@core/mist';

const drop = (over: Partial<Particle> = {}): Particle => ({
  liquid: 'drip',
  x: 0,
  y: 0,
  vx: 0,
  vy: 0,
  age: 3000,
  lifetime: 8000,
  ...over,
});

describe('뿌리기', () => {
  const random = createRandom(42);

  it('한 번에 정해진 수만큼 나온다', () => {
    expect(spray(100, 100, 0, 'drip', random)).toHaveLength(SPRAY.count);
  });

  it('뿌린 자리 근처에서 시작한다', () => {
    for (const particle of spray(100, 100, 0, 'bell', createRandom(7))) {
      expect(Math.abs(particle.x - 100)).toBeLessThanOrEqual(SPRAY.jitter);
      expect(Math.abs(particle.y - 100)).toBeLessThanOrEqual(SPRAY.jitter);
    }
  });

  it('뿌린 방향으로 나아간다', () => {
    // 오른쪽(각도 0)으로 뿌리면 모두 오른쪽 성분을 갖는다.
    for (const particle of spray(0, 0, 0, 'drip', createRandom(11))) {
      expect(particle.vx).toBeGreaterThan(0);
    }
  });

  it('수명이 정해진 범위 안에 있다', () => {
    for (const particle of spray(0, 0, 0, 'drip', createRandom(3))) {
      expect(particle.lifetime).toBeGreaterThanOrEqual(LIFETIME.min);
      expect(particle.lifetime).toBeLessThanOrEqual(LIFETIME.max);
    }
  });

  it('같은 씨앗이면 같은 안개가 나온다', () => {
    expect(spray(50, 50, 1, 'wind', createRandom(9))).toEqual(spray(50, 50, 1, 'wind', createRandom(9)));
  });
});

describe('흐르기', () => {
  it('속도만큼 나아간다', () => {
    const [moved] = step([drop({ vx: 100, vy: 0, age: 0 })], 1000);
    // 1초 동안 나아가되 공기 저항으로 100보다는 덜 간다.
    expect(moved.x).toBeGreaterThan(0);
    expect(moved.x).toBeLessThanOrEqual(100);
  });

  it('시간이 지나면 느려진다', () => {
    const once = step([drop({ vx: 100, age: 0 })], 1000)[0];
    const twice = step([once], 1000)[0];
    expect(Math.abs(twice.vx)).toBeLessThan(Math.abs(once.vx));
  });

  it('수명이 다하면 사라진다', () => {
    expect(step([drop({ age: 7900, lifetime: 8000 })], 200)).toHaveLength(0);
  });

  it('프레임을 잘게 나눠도 같은 자리에 온다', () => {
    // 매 프레임 일정 비율을 곱하면 프레임이 촘촘한 화면에서만 빨리 멈춘다. 그러면 안 된다.
    const start = drop({ vx: 120, vy: 60, age: 0 });
    const coarse = step([start], 1000)[0];
    let fine = start;
    for (let i = 0; i < 20; i += 1) fine = step([fine], 50)[0];
    expect(fine.x).toBeCloseTo(coarse.x, 0);
    expect(fine.y).toBeCloseTo(coarse.y, 0);
  });

  it('한도를 넘으면 오래된 것부터 밀어낸다', () => {
    const many = Array.from({ length: MAX_PARTICLES + 30 }, (_, i) => drop({ x: i }));
    const kept = add(many, [drop({ x: -1 })]);
    expect(kept).toHaveLength(MAX_PARTICLES);
    expect(kept[kept.length - 1].x).toBe(-1);
  });
});

describe('여닫힘', () => {
  it('태어날 때와 사라질 때는 작고 가운데서 가장 크다', () => {
    expect(envelopeAt(drop({ age: 0, lifetime: 8000 }))).toBe(0);
    expect(envelopeAt(drop({ age: 4000, lifetime: 8000 }))).toBe(1);
    expect(envelopeAt(drop({ age: 7900, lifetime: 8000 }))).toBeLessThan(0.1);
  });
});

describe('거리에 따라 줄어들기', () => {
  it('가까울수록 크고 범위 밖에서는 들리지 않는다', () => {
    expect(falloffAt(0)).toBe(1);
    expect(falloffAt(HEARING.radius)).toBe(0);
    expect(falloffAt(HEARING.radius + 50)).toBe(0);
  });

  it('멀어질수록 단조롭게 줄어든다', () => {
    let previous = falloffAt(0);
    for (let d = 10; d < HEARING.radius; d += 10) {
      const current = falloffAt(d);
      expect(current).toBeLessThan(previous);
      previous = current;
    }
  });
});

describe('듣기', () => {
  it('모든 액체 자리를 돌려주되 없는 것은 0이다', () => {
    const heard = listen([], { x: 0, y: 0 });
    expect(heard).toHaveLength(LIQUIDS.length);
    expect(heard.every((item) => item.gain === 0)).toBe(true);
  });

  it('다가가면 커지고 멀어지면 작아진다', () => {
    const particles = [drop({ x: 0, y: 0 })];
    const near = listen(particles, { x: 10, y: 0 }).find((h) => h.liquid === 'drip');
    const far = listen(particles, { x: 150, y: 0 }).find((h) => h.liquid === 'drip');
    expect(near?.gain ?? 0).toBeGreaterThan(far?.gain ?? 0);
  });

  it('겹쳐도 1을 넘지 않는다', () => {
    const many = Array.from({ length: 60 }, () => drop({ x: 0, y: 0 }));
    const heard = listen(many, { x: 0, y: 0 }).find((h) => h.liquid === 'drip');
    expect(heard?.gain).toBe(1);
  });

  it('오른쪽에 있으면 오른쪽에서 들린다', () => {
    const right = listen([drop({ x: 80, y: 0 })], { x: 0, y: 0 }).find((h) => h.liquid === 'drip');
    const left = listen([drop({ x: -80, y: 0 })], { x: 0, y: 0 }).find((h) => h.liquid === 'drip');
    expect(right?.pan ?? 0).toBeGreaterThan(0);
    expect(left?.pan ?? 0).toBeLessThan(0);
  });

  it('방향은 범위를 벗어나지 않는다', () => {
    for (const heard of listen([drop({ x: 189, y: 0 })], { x: 0, y: 0 })) {
      expect(heard.pan).toBeGreaterThanOrEqual(-1);
      expect(heard.pan).toBeLessThanOrEqual(1);
    }
  });
});

describe('섞임', () => {
  it('한 가지만 들리면 섞이지 않은 것이다', () => {
    expect(blending(listen([drop({ x: 0, y: 0 })], { x: 0, y: 0 }))).toBe(0);
  });

  it('여러 가지가 고르게 들리면 1에 가깝다', () => {
    const particles = LIQUIDS.map((liquid) => drop({ liquid: liquid.id, x: 0, y: 0 }));
    expect(blending(listen(particles, { x: 0, y: 0 }))).toBeCloseTo(1, 5);
  });

  it('한쪽이 크게 우세하면 덜 섞인 것으로 본다', () => {
    const lopsided = [
      ...Array.from({ length: 20 }, () => drop({ liquid: 'drip', x: 0, y: 0 })),
      drop({ liquid: 'bell', x: 170, y: 0 }),
    ];
    const value = blending(listen(lopsided, { x: 0, y: 0 }));
    expect(value).toBeGreaterThan(0);
    expect(value).toBeLessThan(0.6);
  });
});
