import { describe, expect, it } from 'vitest';
import { AMBIENT, LIQUIDS, startWanderer, wander } from '@core/mist';
import { createRandom } from '@core/random';

const bounds = { width: 640, height: 360 };

/** 시험은 같은 씨앗을 쓴다. 혼자 도는 것이라도 왜 그렇게 움직였는지 되짚을 수 있어야 한다. */
const random = () => createRandom(20260901);

describe('혼자 뿌리는 손', () => {
  it('마당 안에서 시작한다', () => {
    const wanderer = startWanderer(bounds, 0, random());
    expect(wanderer.x).toBeGreaterThan(0);
    expect(wanderer.x).toBeLessThan(bounds.width);
    expect(wanderer.y).toBeGreaterThan(0);
    expect(wanderer.y).toBeLessThan(bounds.height);
  });

  it('오래 걸어도 마당을 벗어나지 않는다', () => {
    // 밖으로 나가면 뿌린 것이 화면 밖에 쌓여 아무도 듣지 못한다.
    const dice = random();
    let wanderer = startWanderer(bounds, 0, dice);
    for (let step = 0; step < 600; step += 1) {
      wanderer = wander(wanderer, step * 100, 100, bounds, dice).wanderer;
      expect(wanderer.x).toBeGreaterThanOrEqual(0);
      expect(wanderer.x).toBeLessThanOrEqual(bounds.width);
      expect(wanderer.y).toBeGreaterThanOrEqual(0);
      expect(wanderer.y).toBeLessThanOrEqual(bounds.height);
    }
  });

  it('도착하자마자 한 번 뿌린다', () => {
    // 빈 화면으로 맞이하면 이 페이지는 아무 말도 하지 않은 셈이 된다.
    const dice = random();
    const wanderer = startWanderer(bounds, 1000, dice);
    expect(wander(wanderer, 1000, 16, bounds, dice).sprays).toBe(true);
  });

  it('뿌린 뒤에는 다음 차례가 올 때까지 쉰다', () => {
    const dice = random();
    const first = wander(startWanderer(bounds, 0, dice), 0, 16, bounds, dice);
    expect(first.wanderer.nextAt).toBeGreaterThanOrEqual(AMBIENT.interval.min);
    expect(first.wanderer.nextAt).toBeLessThanOrEqual(AMBIENT.interval.max);
    expect(wander(first.wanderer, AMBIENT.interval.min - 1, 16, bounds, dice).sprays).toBe(false);
  });

  it('뿌릴 때마다 액체를 바꾼다', () => {
    // 한 가지만 뿌리면 섞이는 것을 들을 수 없다. 섞임이 이 연구가 꼽은 즐거움이다.
    const dice = random();
    let wanderer = startWanderer(bounds, 0, dice);
    const used: number[] = [];
    for (let round = 0; round < LIQUIDS.length + 1; round += 1) {
      used.push(wanderer.liquidIndex);
      wanderer = wander(wanderer, wanderer.nextAt, 16, bounds, dice).wanderer;
    }
    expect(new Set(used).size).toBe(LIQUIDS.length);
  });

  it('같은 씨앗이면 같은 길을 간다', () => {
    const walk = () => {
      const dice = random();
      let wanderer = startWanderer(bounds, 0, dice);
      for (let step = 0; step < 40; step += 1) {
        wanderer = wander(wanderer, step * 100, 100, bounds, dice).wanderer;
      }
      return wanderer;
    };
    expect(walk()).toEqual(walk());
  });
});
