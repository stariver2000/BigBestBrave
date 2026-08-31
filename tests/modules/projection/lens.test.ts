import { describe, expect, it } from 'vitest';
import { lookThrough } from '@modules/projection/lens';
import type { PointDistortion } from '@core/projection';

/**
 * 화면 배치: 0번을 가운데 두고 1·2번은 바짝 붙어 있고, 3번은 멀리 떨어져 있다.
 * 사실 관계는 distortions가 들고 있다 — 1번은 원래도 이웃, 2번은 남, 3번은 밀려난 이웃.
 */
const positions: [number, number][] = [
  [100, 100],
  [110, 100],
  [120, 100],
  [400, 400],
];

const distortions: PointDistortion[] = [
  {
    falseNeighbors: 1,
    missingNeighbors: 1,
    missingIndices: [3],
    falseIndices: [2],
    trueNeighbors: [1, 3],
  },
  { falseNeighbors: 0, missingNeighbors: 0, missingIndices: [], falseIndices: [], trueNeighbors: [0] },
  { falseNeighbors: 0, missingNeighbors: 0, missingIndices: [], falseIndices: [], trueNeighbors: [3] },
  { falseNeighbors: 0, missingNeighbors: 0, missingIndices: [], falseIndices: [], trueNeighbors: [0] },
];

describe('진실의 렌즈', () => {
  it('커서에 가장 가까운 점을 기준으로 삼는다', () => {
    expect(lookThrough(positions, distortions, { x: 102, y: 101 }, 50)?.anchor).toBe(0);
    expect(lookThrough(positions, distortions, { x: 380, y: 390 }, 50)?.anchor).toBe(3);
  });

  it('렌즈 안의 이웃을 지킨 이웃과 남으로 가른다', () => {
    const view = lookThrough(positions, distortions, { x: 100, y: 100 }, 50);
    expect(view?.kept).toEqual([1]);
    expect(view?.imposters).toEqual([2]);
  });

  it('원래 이웃이지만 렌즈 밖으로 밀려난 점을 따로 센다', () => {
    const view = lookThrough(positions, distortions, { x: 100, y: 100 }, 50);
    expect(view?.pushed).toEqual([3]);
  });

  it('렌즈를 키우면 밀려났던 이웃이 다시 들어온다', () => {
    const view = lookThrough(positions, distortions, { x: 100, y: 100 }, 500);
    expect(view?.pushed).toEqual([]);
    expect(view?.kept).toEqual([1, 3]);
  });

  it('점이 없으면 볼 것도 없다', () => {
    expect(lookThrough([], [], { x: 0, y: 0 }, 50)).toBeNull();
  });
});
