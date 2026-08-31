import { describe, expect, it } from 'vitest';
import { buildPalette } from '@core/color/palette';
import { buildRamp } from '@core/color/ramp';
import { srgbToOklch } from '@core/color/oklab';
import { RAMP_STEPS } from '@core/color/config';

const SEED = { r: 0.31, g: 0.27, b: 0.9, a: 1 };

describe('톤 램프', () => {
  it('설정된 단계 수만큼 만들고 명도가 단조 감소한다', () => {
    const ramp = buildRamp(srgbToOklch(SEED));
    expect(ramp).toHaveLength(RAMP_STEPS.length);
    for (let i = 1; i < ramp.length; i += 1) {
      expect(ramp[i].oklch.l).toBeLessThan(ramp[i - 1].oklch.l);
    }
  });

  it('모든 단계가 sRGB 색역 안의 hex로 나온다', () => {
    for (const entry of buildRamp(srgbToOklch(SEED))) {
      expect(entry.hex).toMatch(/^#[0-9a-f]{6}$/);
    }
  });
});

describe('팔레트', () => {
  it('조화 규칙의 회전 수만큼 트랙이 생긴다', () => {
    expect(buildPalette(SEED, 'triad').tracks).toHaveLength(3);
    expect(buildPalette(SEED, 'mono').tracks).toHaveLength(1);
  });

  it('트랙의 색상각은 시드에서 규칙만큼 돌아가 있다', () => {
    const palette = buildPalette(SEED, 'complementary');
    const delta = (palette.tracks[1].base.h - palette.tracks[0].base.h + 360) % 360;
    expect(delta).toBeCloseTo(180, 6);
  });
});
