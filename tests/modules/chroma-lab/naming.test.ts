import { describe, expect, it } from 'vitest';
import { srgbToOklch } from '@core/color';
import { LOCALES } from '@core/i18n';
import { localPaletteName, sanitizeName } from '../../../src/modules/chroma-lab/naming';

describe('규칙 기반 팔레트 이름', () => {
  it('모든 로케일에서 비어 있지 않은 이름을 만든다', () => {
    const seed = srgbToOklch({ r: 0.31, g: 0.27, b: 0.9, a: 1 });
    for (const locale of LOCALES) {
      expect(localPaletteName(seed, locale).length, locale).toBeGreaterThan(0);
    }
  });

  it('같은 색은 항상 같은 이름을 만든다', () => {
    const seed = srgbToOklch({ r: 0.8, g: 0.2, b: 0.1, a: 1 });
    expect(localPaletteName(seed, 'ko')).toBe(localPaletteName(seed, 'ko'));
  });

  it('색상환 경계에서도 이름이 나온다', () => {
    for (const hue of [0, 15, 180, 359.9]) {
      expect(localPaletteName({ l: 0.5, c: 0.1, h: hue, a: 1 }, 'en').length).toBeGreaterThan(0);
    }
  });
});

describe('LLM 응답 정리', () => {
  it('첫 줄만 취하고 따옴표를 벗긴다', () => {
    expect(sanitizeName('"심야 군청"\n설명이 이어짐', 40)).toBe('심야 군청');
  });

  it('최대 길이를 넘기지 않는다', () => {
    expect(sanitizeName('a'.repeat(100), 10)).toHaveLength(10);
  });
});
