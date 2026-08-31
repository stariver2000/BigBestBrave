/**
 * 색각 이상 시뮬레이션.
 *
 * 행렬은 선형 광량 공간에서 적용해야 한다. 부호화된 sRGB에 곱하면
 * 감마 때문에 어두운 색이 실제보다 크게 왜곡된다.
 */

import { CVD_MATRICES, CVD_PREVALENCE, WCAG } from './config';
import { fromLinear, toLinear } from './srgb';
import type { LinearRgb, Srgb } from './types';

export type CvdKind = keyof typeof CVD_MATRICES | 'achromatopsia';

/** UI 목록의 표시 순서. 유병률이 높은 것부터 보여준다. */
export const CVD_KINDS: readonly CvdKind[] = [
  'deuteranopia',
  'protanopia',
  'tritanopia',
  'achromatopsia',
];

export function prevalenceOf(kind: CvdKind): number {
  return CVD_PREVALENCE[kind];
}

/** 중증도 보간: 항등행렬과 완전 이상 행렬 사이를 선형 보간한다. */
function blendWithIdentity(matrix: readonly (readonly number[])[], severity: number): number[][] {
  const identity = [
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 1],
  ];
  return matrix.map((row, i) => row.map((value, j) => identity[i][j] * (1 - severity) + value * severity));
}

function applyMatrix(matrix: readonly (readonly number[])[], linear: LinearRgb): LinearRgb {
  const v = [linear.r, linear.g, linear.b];
  const out = matrix.map((row) => row[0] * v[0] + row[1] * v[1] + row[2] * v[2]);
  return { r: out[0], g: out[1], b: out[2] };
}

/** 전색맹: 휘도만 남긴다. WCAG 계수를 재사용하는 이유는 같은 인지 휘도 정의를 쓰기 위함이다. */
function toGrayscale(linear: LinearRgb, severity: number): LinearRgb {
  const { r, g, b } = WCAG.coefficients;
  const luminance = linear.r * r + linear.g * g + linear.b * b;
  return {
    r: linear.r * (1 - severity) + luminance * severity,
    g: linear.g * (1 - severity) + luminance * severity,
    b: linear.b * (1 - severity) + luminance * severity,
  };
}

/** severity는 0(정상)~1(완전 이상). */
export function simulateCvd(color: Srgb, kind: CvdKind, severity = 1): Srgb {
  const clampedSeverity = Math.max(0, Math.min(1, severity));
  const linear = toLinear(color);
  const simulated =
    kind === 'achromatopsia'
      ? toGrayscale(linear, clampedSeverity)
      : applyMatrix(blendWithIdentity(CVD_MATRICES[kind], clampedSeverity), linear);
  const encoded = fromLinear(simulated, color.a);
  // 행렬 결과는 색역을 벗어날 수 있다. 시뮬레이션 결과는 표시가 목적이므로 단순 클리핑으로 충분하다.
  return {
    r: Math.max(0, Math.min(1, encoded.r)),
    g: Math.max(0, Math.min(1, encoded.g)),
    b: Math.max(0, Math.min(1, encoded.b)),
    a: encoded.a,
  };
}
