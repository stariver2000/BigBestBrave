/**
 * 왜곡 배수 계산.
 *
 * 뼈대는 하나다 — **그림에서 읽히는 차이 ÷ 자료의 실제 차이**.
 * 이 값이 1이면 정직하고, 2면 두 배로 부풀려 보인다.
 * 종류마다 "그림에서 읽히는 차이"를 구하는 방법만 다르다.
 */

import { EPSILON, IDEAL_SLOPE } from './config';
import type { ChartSpec } from './types';

export function extent(values: readonly number[]): { min: number; max: number } {
  return { min: Math.min(...values), max: Math.max(...values) };
}

/**
 * 축을 자를 때의 왜곡 배수.
 *
 * 자료에서의 상대 차이는 (최대−최소)/최소 이고,
 * 그림에서는 축 시작점이 올라간 만큼 분모가 줄어 (최대−최소)/(최소−시작점) 이 된다.
 * 그래서 배수는 최소 ÷ (최소 − 시작점) 으로 정리된다. 시작점이 0이면 1이다.
 */
export function truncationFactor(spec: ChartSpec): number {
  const start = spec.axisMin ?? 0;
  const { min } = extent(spec.values);
  const shown = min - start;
  if (shown <= EPSILON) return Number.POSITIVE_INFINITY;
  return min / shown;
}

/**
 * 원의 반지름에 값을 이었을 때의 왜곡 배수.
 *
 * 눈은 원의 넓이로 크기를 읽는다. 반지름을 값에 비례시키면 넓이는 값의 제곱에 비례하므로,
 * 두 값의 비가 r일 때 넓이의 비는 r²이 된다. 배수는 r²/r = r 이다.
 */
export function radiusFactor(spec: ChartSpec): number {
  const { min, max } = extent(spec.values);
  if (min <= EPSILON) return Number.POSITIVE_INFINITY;
  return max / min;
}

/**
 * 선 그래프에서 가로세로 비율이 기울기를 얼마나 바꿨는지.
 *
 * 값들을 그림 좌표로 옮긴 뒤 이웃한 점 사이 기울기의 절대값을 중앙값으로 모은다.
 * 그 값이 1(45도)이면 변화율이 가장 바르게 읽힌다. 1보다 크면 가팔라 보이고 작으면 눕는다.
 */
export function slopeFactor(spec: ChartSpec): number {
  if (spec.values.length < 2) return 1;

  const start = spec.axisMin ?? 0;
  const end = spec.axisMax ?? extent(spec.values).max;
  const span = end - start;
  if (Math.abs(span) <= EPSILON) return Number.POSITIVE_INFINITY;

  const stepX = spec.width / (spec.values.length - 1);
  const slopes: number[] = [];
  for (let index = 1; index < spec.values.length; index += 1) {
    const dy = ((spec.values[index] - spec.values[index - 1]) / span) * spec.height;
    slopes.push(Math.abs(dy / stepX));
  }

  slopes.sort((a, b) => a - b);
  const middle = Math.floor(slopes.length / 2);
  const median =
    slopes.length % 2 === 0 ? (slopes[middle - 1] + slopes[middle]) / 2 : slopes[middle];
  return median / IDEAL_SLOPE;
}

/** 축 위쪽이 잘려 그림 밖으로 나간 값이 있는지. */
export function clippedCount(spec: ChartSpec): number {
  if (spec.axisMax === null) return 0;
  return spec.values.filter((value) => value > (spec.axisMax as number)).length;
}
