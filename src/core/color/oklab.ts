/**
 * OKLab / OKLCH 변환과 sRGB 색역 매핑.
 *
 * 팔레트 생성이 OKLab 위에서 이뤄지는 이유: HSL은 같은 L에서도 색상마다
 * 체감 밝기가 크게 달라 램프가 균일해 보이지 않기 때문이다.
 */

import { GAMUT_MAP, OKLAB_MATRICES } from './config';
import { clampSrgb, fromLinear, isInGamut, toLinear } from './srgb';
import type { GamutMapped, LinearRgb, Oklab, Oklch, Srgb } from './types';

function applyMatrix(matrix: readonly (readonly number[])[], v: readonly number[]): number[] {
  return matrix.map((row) => row[0] * v[0] + row[1] * v[1] + row[2] * v[2]);
}

export function linearToOklab(linear: LinearRgb): Oklab {
  const lms = applyMatrix(OKLAB_MATRICES.linearToLms, [linear.r, linear.g, linear.b]);
  // 세제곱근은 LMS 응답을 인지 균일 축으로 펴는 단계다. 음수 입력이 들어올 수 있어
  // Math.cbrt를 쓴다(Math.pow(x, 1/3)은 음수에서 NaN).
  const nonlinear = lms.map((value) => Math.cbrt(value));
  const lab = applyMatrix(OKLAB_MATRICES.lmsToLab, nonlinear);
  return { l: lab[0], a: lab[1], b: lab[2] };
}

export function oklabToLinear(lab: Oklab): LinearRgb {
  const nonlinear = applyMatrix(OKLAB_MATRICES.labToLms, [lab.l, lab.a, lab.b]);
  const lms = nonlinear.map((value) => value * value * value);
  const rgb = applyMatrix(OKLAB_MATRICES.lmsToLinear, lms);
  return { r: rgb[0], g: rgb[1], b: rgb[2] };
}

export function srgbToOklch(color: Srgb): Oklch {
  const lab = linearToOklab(toLinear(color));
  const chroma = Math.sqrt(lab.a * lab.a + lab.b * lab.b);
  // atan2는 -180~180을 주므로 0~360으로 정규화한다. 무채색(c≈0)의 각도는 의미가 없어 0으로 둔다.
  const rawHue = (Math.atan2(lab.b, lab.a) * 180) / Math.PI;
  const hue = chroma < 1e-6 ? 0 : (rawHue + 360) % 360;
  return { l: lab.l, c: chroma, h: hue, a: color.a };
}

export function oklchToSrgb(color: Oklch): Srgb {
  const radians = (color.h * Math.PI) / 180;
  const lab: Oklab = {
    l: color.l,
    a: color.c * Math.cos(radians),
    b: color.c * Math.sin(radians),
  };
  return fromLinear(oklabToLinear(lab), color.a);
}

export function isOklchInGamut(color: Oklch): boolean {
  return isInGamut(oklchToSrgb(color), GAMUT_MAP.epsilon);
}

/**
 * 명도와 색상은 유지한 채 채도만 낮춰 sRGB 색역 안으로 되돌린다.
 * 채도를 단순 클리핑하지 않고 이분 탐색하는 이유: 채널 클리핑은 색상(hue)을 틀어버린다.
 */
export function mapIntoGamut(color: Oklch): GamutMapped {
  if (isOklchInGamut(color)) {
    return { color, clipped: false, chromaLoss: 0 };
  }
  let low = 0;
  let high = Math.min(color.c, GAMUT_MAP.maxChroma);
  for (let i = 0; i < GAMUT_MAP.iterations; i += 1) {
    const mid = (low + high) / 2;
    if (isOklchInGamut({ ...color, c: mid })) {
      low = mid;
    } else {
      high = mid;
    }
  }
  return { color: { ...color, c: low }, clipped: true, chromaLoss: color.c - low };
}

/**
 * 색역 매핑까지 마친 뒤 안전하게 sRGB로 내리는 표준 경로.
 * 마지막에 클램프하는 이유: 이분 탐색의 허용 오차만큼 채널이 범위를 살짝 넘을 수 있는데,
 * 그 값이 그대로 밖으로 나가면 하위 계산(거듭제곱 등)에서 문제가 된다.
 */
export function oklchToDisplayable(color: Oklch): Srgb {
  return clampSrgb(oklchToSrgb(mapIntoGamut(color).color));
}

/** CSS oklch() 표기. 브라우저가 지원하지 않을 때를 대비해 hex와 병기해 쓴다. */
export function toOklchString(color: Oklch): string {
  const l = `${(color.l * 100).toFixed(2)}%`;
  const c = color.c.toFixed(4);
  const h = color.h.toFixed(2);
  if (color.a >= 1) return `oklch(${l} ${c} ${h})`;
  return `oklch(${l} ${c} ${h} / ${Number(color.a.toFixed(3))})`;
}
