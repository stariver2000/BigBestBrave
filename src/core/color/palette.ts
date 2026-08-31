/**
 * 조화 규칙 + 톤 램프를 합쳐 하나의 팔레트 자료구조로 만든다.
 *
 * 이 파일이 색 코어의 최상단 조립 지점이며, UI는 여기서 나온 Palette만 소비한다.
 * (UI가 harmony/ramp를 직접 조합하지 않게 해서 규칙이 한곳에 남도록 한다.)
 */

import { buildHarmony, type HarmonyKind } from './harmony';
import { srgbToOklch } from './oklab';
import { buildRamp, type RampEntry } from './ramp';
import { toHex } from './srgb';
import type { Oklch, Srgb } from './types';

export interface PaletteTrack {
  /** 시드로부터의 색상 회전각. 트랙을 구분하는 안정적인 키다. */
  rotation: number;
  base: Oklch;
  baseHex: string;
  ramp: RampEntry[];
}

export interface Palette {
  seed: Oklch;
  seedHex: string;
  harmony: HarmonyKind;
  tracks: PaletteTrack[];
}

export function buildPalette(seedColor: Srgb, harmony: HarmonyKind): Palette {
  const seed = srgbToOklch(seedColor);
  const tracks = buildHarmony(seed, harmony).map((member) => ({
    rotation: member.rotation,
    base: member.color,
    baseHex: toHex(seedColor),
    ramp: buildRamp(member.color),
  }));
  return { seed, seedHex: toHex(seedColor), harmony, tracks };
}

/** 램프에서 특정 단계를 찾는다. 없으면 undefined. */
export function stepOf(track: PaletteTrack, step: number): RampEntry | undefined {
  return track.ramp.find((entry) => entry.step === step);
}
