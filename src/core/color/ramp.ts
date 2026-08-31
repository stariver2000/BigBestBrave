/**
 * 톤 램프 생성.
 *
 * 입력은 시드 한 색, 출력은 50~950 단계의 색 목록이다.
 * 단계별 목표 명도와 채도 배수는 config(RAMP_STEPS)에만 있고, 여기서는 적용만 한다.
 */

import { RAMP_SEED_MATCH_TOLERANCE, RAMP_STEPS } from './config';
import { mapIntoGamut, oklchToSrgb } from './oklab';
import { toHex } from './srgb';
import type { Oklch, Srgb } from './types';

export interface RampEntry {
  step: number;
  oklch: Oklch;
  srgb: Srgb;
  hex: string;
  /** sRGB 색역을 벗어나 채도를 깎았는지. UI에서 경고 표시에 쓴다. */
  clipped: boolean;
  /** 시드 색과 명도가 가장 가까운 단계인지. 시드가 램프의 어디에 놓이는지 보여준다. */
  isSeedAnchor: boolean;
}

function buildEntry(seed: Oklch, step: (typeof RAMP_STEPS)[number]): Omit<RampEntry, 'isSeedAnchor'> {
  const target: Oklch = { l: step.l, c: seed.c * step.chroma, h: seed.h, a: seed.a };
  const mapped = mapIntoGamut(target);
  const srgb = oklchToSrgb(mapped.color);
  return { step: step.step, oklch: mapped.color, srgb, hex: toHex(srgb), clipped: mapped.clipped };
}

/** 시드 명도에 가장 가까운 단계의 인덱스. 동률이면 밝은 쪽을 고른다. */
function findAnchorIndex(seed: Oklch): number {
  let bestIndex = 0;
  let bestDistance = Number.POSITIVE_INFINITY;
  RAMP_STEPS.forEach((step, index) => {
    const distance = Math.abs(step.l - seed.l);
    if (distance < bestDistance) {
      bestDistance = distance;
      bestIndex = index;
    }
  });
  return bestDistance <= RAMP_SEED_MATCH_TOLERANCE ? bestIndex : -1;
}

export function buildRamp(seed: Oklch): RampEntry[] {
  const anchorIndex = findAnchorIndex(seed);
  return RAMP_STEPS.map((step, index) => ({
    ...buildEntry(seed, step),
    isSeedAnchor: index === anchorIndex,
  }));
}

export function rampStepNumbers(): number[] {
  return RAMP_STEPS.map((step) => step.step);
}
