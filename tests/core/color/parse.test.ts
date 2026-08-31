import { describe, expect, it } from 'vitest';
import { parseColor } from '@core/color/parse';

describe('색 문자열 파싱', () => {
  it('축약 hex를 확장한다', () => {
    const result = parseColor('#f0a');
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.color.r).toBeCloseTo(1, 6);
      expect(result.color.g).toBeCloseTo(0, 6);
      expect(result.color.b).toBeCloseTo(0xaa / 255, 6);
    }
  });

  it('rgb()의 쉼표 표기와 슬래시 표기를 모두 받는다', () => {
    const comma = parseColor('rgb(255, 0, 0)');
    const slash = parseColor('rgb(255 0 0 / 0.5)');
    expect(comma.ok && comma.color.r).toBe(1);
    expect(slash.ok && slash.color.a).toBe(0.5);
  });

  it('oklch() 입력을 sRGB로 되돌린다', () => {
    const result = parseColor('oklch(60% 0.15 264)');
    expect(result.ok).toBe(true);
  });

  it('빈 문자열과 알 수 없는 형식을 구분한다', () => {
    expect(parseColor('   ')).toEqual({ ok: false, reason: 'empty' });
    expect(parseColor('바다색')).toEqual({ ok: false, reason: 'unknown-format' });
  });
});
