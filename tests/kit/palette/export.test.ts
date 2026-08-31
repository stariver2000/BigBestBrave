import { describe, expect, it } from 'vitest';
import { buildPalette } from '@core/color';
import { EXPORT_FORMATS, exportPalette } from '../../../src/kit/palette';

const palette = buildPalette({ r: 0.31, g: 0.27, b: 0.9, a: 1 }, 'triad');

describe('팔레트 내보내기', () => {
  it('모든 포맷이 비어 있지 않은 문자열을 만든다', () => {
    for (const format of EXPORT_FORMATS) {
      expect(exportPalette(palette, format).length, format).toBeGreaterThan(0);
    }
  });

  it('CSS는 접두사를 반영한다', () => {
    expect(exportPalette(palette, 'css', { prefix: 'brand' })).toContain('--brand-primary-500');
  });

  it('JSON은 트랙별 단계 지도를 담는다', () => {
    const parsed = JSON.parse(exportPalette(palette, 'json')) as {
      colors: Record<string, Record<string, string>>;
    };
    expect(Object.keys(parsed.colors)).toEqual(['primary', 'secondary', 'tertiary']);
    expect(parsed.colors.primary['500']).toMatch(/^#[0-9a-f]{6}$/);
  });

  it('SVG 스와치는 트랙 수만큼 행을 만든다', () => {
    const svg = exportPalette(palette, 'svg', { swatchSize: 10 });
    const rectCount = svg.split('<rect').length - 1;
    expect(rectCount).toBe(palette.tracks.length * palette.tracks[0].ramp.length);
  });
});
