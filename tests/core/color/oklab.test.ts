import { describe, expect, it } from 'vitest';
import { isOklchInGamut, mapIntoGamut, oklchToSrgb, srgbToOklch } from '@core/color/oklab';

describe('OKLab 변환', () => {
  it('sRGB -> OKLCH -> sRGB 왕복에서 값이 보존된다', () => {
    const samples = [
      { r: 0.31, g: 0.27, b: 0.9, a: 1 },
      { r: 1, g: 1, b: 1, a: 1 },
      { r: 0, g: 0, b: 0, a: 1 },
      { r: 0.5, g: 0.2, b: 0.05, a: 1 },
    ];
    for (const sample of samples) {
      const roundTrip = oklchToSrgb(srgbToOklch(sample));
      expect(roundTrip.r).toBeCloseTo(sample.r, 6);
      expect(roundTrip.g).toBeCloseTo(sample.g, 6);
      expect(roundTrip.b).toBeCloseTo(sample.b, 6);
    }
  });

  it('무채색의 색상각은 0으로 정규화된다', () => {
    expect(srgbToOklch({ r: 0.5, g: 0.5, b: 0.5, a: 1 }).h).toBe(0);
  });

  it('색역 밖 색은 명도와 색상을 유지한 채 채도만 줄어든다', () => {
    const outOfGamut = { l: 0.6, c: 0.45, h: 150, a: 1 };
    const mapped = mapIntoGamut(outOfGamut);
    expect(mapped.clipped).toBe(true);
    expect(mapped.color.l).toBe(outOfGamut.l);
    expect(mapped.color.h).toBe(outOfGamut.h);
    expect(mapped.color.c).toBeLessThan(outOfGamut.c);
    expect(isOklchInGamut(mapped.color)).toBe(true);
  });
});
