/**
 * 진실의 렌즈.
 *
 * 산점도는 거리를 지어낸다. 붙어 있는 두 점이 원래도 가까웠는지는 그림만 봐서는 알 수 없다.
 * 그래서 그림 위에 렌즈를 올린다. 렌즈가 닿은 자리를 기준으로,
 *   - 원래도 이웃이던 점은 지킨 이웃,
 *   - 우연히 옆에 온 점은 남,
 *   - 원래 이웃인데 렌즈 밖으로 밀려난 점은 잃은 이웃
 * 으로 갈라 준다. 답을 맞히게 하지 않고, 손을 움직이는 동안 사실이 드러나게 한다.
 *
 * 이 파일은 화면 좌표만 다루는 순수 계산이다. React도 SVG도 모른다.
 */

import type { PointDistortion } from '../../core/projection';

export interface LensView {
  /** 렌즈의 기준점. 커서에 가장 가까운 점이다. */
  anchor: number;
  /** 렌즈 안에 있으면서 원래도 이웃이던 점들. */
  kept: number[];
  /** 렌즈 안에 있지만 원래는 남이던 점들. 그림이 만들어 낸 이웃이다. */
  imposters: number[];
  /** 원래 이웃인데 렌즈 밖으로 밀려난 점들. 선으로 이어 어디 있는지 보여 준다. */
  pushed: number[];
}

/** 두 점 사이의 화면 거리. 렌즈 안인지 밖인지만 가리면 되므로 제곱근까지 낸다. */
function distance(ax: number, ay: number, bx: number, by: number): number {
  return Math.hypot(ax - bx, ay - by);
}

/** 커서에 가장 가까운 점. 점이 없으면 -1. */
function nearestTo(
  positions: readonly [number, number][],
  cursorX: number,
  cursorY: number,
): number {
  let best = -1;
  let bestDistance = Infinity;
  positions.forEach(([x, y], index) => {
    const away = distance(x, y, cursorX, cursorY);
    if (away < bestDistance) {
      bestDistance = away;
      best = index;
    }
  });
  return best;
}

export function lookThrough(
  positions: readonly [number, number][],
  distortions: readonly PointDistortion[],
  cursor: { x: number; y: number },
  radius: number,
): LensView | null {
  const anchor = nearestTo(positions, cursor.x, cursor.y);
  if (anchor === -1 || distortions[anchor] === undefined) return null;

  const [anchorX, anchorY] = positions[anchor];
  const inLens = (index: number) => {
    const [x, y] = positions[index];
    return distance(x, y, anchorX, anchorY) <= radius;
  };

  const truth = distortions[anchor];
  return {
    anchor,
    kept: truth.trueNeighbors.filter((index) => index !== anchor && inLens(index)),
    imposters: truth.falseIndices.filter(inLens),
    pushed: truth.trueNeighbors.filter((index) => index !== anchor && !inLens(index)),
  };
}
