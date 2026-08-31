/** 색상환 회전 기반 조화 규칙. 회전각 목록은 config에서만 정의한다. */

import { HARMONY_ROTATIONS } from './config';
import type { Oklch } from './types';

export type HarmonyKind = keyof typeof HARMONY_ROTATIONS;

export const HARMONY_KINDS = Object.keys(HARMONY_ROTATIONS) as HarmonyKind[];

export interface HarmonyMember {
  /** 시드 색상에서 회전한 각도. 0이면 시드 자신이다. */
  rotation: number;
  color: Oklch;
}

export function rotationsOf(kind: HarmonyKind): readonly number[] {
  return HARMONY_ROTATIONS[kind];
}

/**
 * 시드를 기준으로 조화 색을 만든다.
 * 명도와 채도는 시드 값을 그대로 유지하고 색상만 돌린다. 색역 매핑은 하지 않는데,
 * 램프 생성 단계에서 어차피 한 번 더 매핑되므로 여기서 미리 깎으면 정보만 잃기 때문이다.
 */
export function buildHarmony(seed: Oklch, kind: HarmonyKind): HarmonyMember[] {
  return rotationsOf(kind).map((rotation) => ({
    rotation,
    color: { ...seed, h: (((seed.h + rotation) % 360) + 360) % 360 },
  }));
}
