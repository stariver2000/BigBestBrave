/** sRGB 부호화/선형화와 16진 표기 변환. 순수 함수만 둔다. */

import { SRGB_TRANSFER } from './config';
import type { LinearRgb, Srgb } from './types';

export function clamp01(value: number): number {
  if (value < 0) return 0;
  if (value > 1) return 1;
  return value;
}

/** 부호화된 채널값 -> 선형 광량. */
export function channelToLinear(channel: number): number {
  if (channel <= SRGB_TRANSFER.threshold) {
    return channel / SRGB_TRANSFER.linearSlope;
  }
  const shifted = (channel + SRGB_TRANSFER.offset) / (1 + SRGB_TRANSFER.offset);
  return Math.pow(shifted, SRGB_TRANSFER.gamma);
}

/** 선형 광량 -> 부호화된 채널값. */
export function channelToEncoded(linear: number): number {
  if (linear <= SRGB_TRANSFER.encodeThreshold) {
    return linear * SRGB_TRANSFER.linearSlope;
  }
  const compressed = Math.pow(linear, 1 / SRGB_TRANSFER.gamma);
  return compressed * (1 + SRGB_TRANSFER.offset) - SRGB_TRANSFER.offset;
}

export function toLinear(color: Srgb): LinearRgb {
  return {
    r: channelToLinear(color.r),
    g: channelToLinear(color.g),
    b: channelToLinear(color.b),
  };
}

export function fromLinear(linear: LinearRgb, alpha = 1): Srgb {
  return {
    r: channelToEncoded(linear.r),
    g: channelToEncoded(linear.g),
    b: channelToEncoded(linear.b),
    a: alpha,
  };
}

/** 세 채널이 모두 [0,1] 안에 있는지. epsilon은 부동소수 오차 허용폭. */
export function isInGamut(color: Srgb, epsilon: number): boolean {
  const channels = [color.r, color.g, color.b];
  return channels.every((channel) => channel >= -epsilon && channel <= 1 + epsilon);
}

export function clampSrgb(color: Srgb): Srgb {
  return { r: clamp01(color.r), g: clamp01(color.g), b: clamp01(color.b), a: clamp01(color.a) };
}

function channelToHexPair(channel: number): string {
  const byte = Math.round(clamp01(channel) * 255);
  return byte.toString(16).padStart(2, '0');
}

/** #rrggbb 또는 알파가 1이 아니면 #rrggbbaa 로 직렬화한다. */
export function toHex(color: Srgb): string {
  const base = `#${channelToHexPair(color.r)}${channelToHexPair(color.g)}${channelToHexPair(color.b)}`;
  if (color.a >= 1) return base;
  return `${base}${channelToHexPair(color.a)}`;
}

/** CSS rgb() 표기. 소수점 없는 정수 채널로 뽑는다. */
export function toRgbString(color: Srgb): string {
  const r = Math.round(clamp01(color.r) * 255);
  const g = Math.round(clamp01(color.g) * 255);
  const b = Math.round(clamp01(color.b) * 255);
  if (color.a >= 1) return `rgb(${r} ${g} ${b})`;
  return `rgb(${r} ${g} ${b} / ${Number(color.a.toFixed(3))})`;
}
