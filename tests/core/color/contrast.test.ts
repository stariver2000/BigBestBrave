import { describe, expect, it } from 'vitest';
import { apcaContrast, wcagContrastRatio, wcagLevelOf } from '@core/color/contrast';

const WHITE = { r: 1, g: 1, b: 1, a: 1 };
const BLACK = { r: 0, g: 0, b: 0, a: 1 };

describe('WCAG 2.1 대비비', () => {
  it('흑백 대비는 21:1이다', () => {
    expect(wcagContrastRatio(BLACK, WHITE)).toBeCloseTo(21, 5);
  });

  it('같은 색끼리는 1:1이다', () => {
    expect(wcagContrastRatio(WHITE, WHITE)).toBeCloseTo(1, 10);
  });

  it('문턱값 경계에서 등급이 바뀐다', () => {
    expect(wcagLevelOf(4.5)).toBe('aa');
    expect(wcagLevelOf(4.49)).toBe('aa-large');
    expect(wcagLevelOf(7)).toBe('aaa');
  });
});

describe('APCA Lc', () => {
  it('밝은 배경 위 검은 글자는 양수, 반대는 음수다', () => {
    expect(apcaContrast(BLACK, WHITE)).toBeGreaterThan(100);
    expect(apcaContrast(WHITE, BLACK)).toBeLessThan(-100);
  });

  it('같은 색은 0을 돌려준다', () => {
    expect(apcaContrast(WHITE, WHITE)).toBe(0);
  });

  it('범위를 벗어난 채널이 들어와도 NaN이 되지 않는다', () => {
    // 색역 매핑 이분 탐색은 -1e-7 같은 미세한 음수를 남긴다. 그 값이 그대로 들어오는 경로가 있다.
    const slightlyNegative = { r: -1e-7, g: 0.5, b: 1 + 1e-7, a: 1 };
    expect(Number.isFinite(apcaContrast(slightlyNegative, WHITE))).toBe(true);
  });

  it('대비가 커질수록 절대값이 커진다', () => {
    const mid = { r: 0.5, g: 0.5, b: 0.5, a: 1 };
    expect(Math.abs(apcaContrast(BLACK, WHITE))).toBeGreaterThan(Math.abs(apcaContrast(mid, WHITE)));
  });
});
