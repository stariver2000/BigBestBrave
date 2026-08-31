import { describe, expect, it } from 'vitest';
import { apcaContrast, parseColor, srgbToOklch } from '@core/color';
import { deriveTokens, toCssVariables, type TraitVector } from '@core/traits';

function color(hex: string) {
  const parsed = parseColor(hex);
  if (!parsed.ok) throw new Error(`파싱 실패: ${hex}`);
  return parsed.color;
}

describe('특성 -> 토큰 파생', () => {
  it('밝기 특성이 다크/라이트를 가른다', () => {
    expect(deriveTokens({ brightness: ['abyssal'] }).color.dark).toBe(true);
    expect(deriveTokens({ brightness: ['bright'] }).color.dark).toBe(false);
  });

  it('선언한 대비 기준을 본문색이 실제로 만족한다', () => {
    const cases: TraitVector[] = [
      { brightness: ['abyssal'], 'contrast-policy': ['apca-body'] },
      { brightness: ['bright'], 'contrast-policy': ['apca-body'] },
      { brightness: ['muted'], intensity: ['neon'], 'contrast-policy': ['wcag-aaa'] },
    ];
    for (const vector of cases) {
      const tokens = deriveTokens(vector);
      const lc = Math.abs(apcaContrast(color(tokens.color.fg), color(tokens.color.bg)));
      // wcag-aaa는 Lc 90을 목표로 매핑돼 있으므로 가장 엄격한 사례도 통과해야 한다.
      expect(lc, JSON.stringify(vector)).toBeGreaterThanOrEqual(60);
    }
  });

  it('어떤 색상·밝기 조합에서도 강조색 라벨이 읽힌다', () => {
    // 노랑 계열은 중간 명도에서 흰색과도 검정과도 대비가 낮아 가장 까다로운 사례다.
    const temperatures = ['icy', 'cool', 'neutral', 'warm', 'hot', 'scorching'];
    const brightnesses = ['abyssal', 'muted', 'balanced', 'radiant'];
    for (const temperature of temperatures) {
      for (const brightness of brightnesses) {
        const vector = { temperature: [temperature], brightness: [brightness], intensity: ['saturated'] };
        const tokens = deriveTokens(vector);
        const lc = Math.abs(apcaContrast(color(tokens.color.accentFg), color(tokens.color.accent)));
        expect(lc, JSON.stringify(vector)).toBeGreaterThanOrEqual(55);
      }
    }
  });

  it('밀도가 높을수록 간격 단위가 작아진다', () => {
    const airy = deriveTokens({ density: ['airy'] }).space.unit;
    const packed = deriveTokens({ density: ['packed'] }).space.unit;
    expect(packed).toBeLessThan(airy);
  });

  it('강조색은 배경에서도 떠 보인다', () => {
    for (const brightness of ['abyssal', 'dim', 'balanced', 'radiant']) {
      for (const temperature of ['icy', 'cool', 'warm', 'hot']) {
        const vector: TraitVector = { brightness: [brightness], temperature: [temperature], intensity: ['vivid'] };
        const tokens = deriveTokens(vector);
        const lc = Math.abs(apcaContrast(color(tokens.color.accent), color(tokens.color.bg)));
        expect(lc, JSON.stringify(vector)).toBeGreaterThanOrEqual(35);
      }
    }
  });

  it('강조색은 색역이 허용하는 채도를 실제로 살려 쓴다', () => {
    // 청록 계열은 밝은 쪽에서 채도가 급격히 깎이므로, 명도를 고정하면 회색에 가까워진다.
    const tokens = deriveTokens({ brightness: ['dim'], temperature: ['cool'], intensity: ['vivid'] });
    const accent = srgbToOklch(color(tokens.color.accent));
    expect(accent.c).toBeGreaterThan(0.08);
  });

  it('CSS 변수는 접두사를 갖고 빈 값이 없다', () => {
    const vars = toCssVariables(deriveTokens({}));
    for (const [name, value] of Object.entries(vars)) {
      expect(name.startsWith('--bbb-')).toBe(true);
      expect(value.length, name).toBeGreaterThan(0);
    }
  });

  it('특성을 하나도 선언하지 않아도 완전한 토큰이 나온다', () => {
    const tokens = deriveTokens({});
    expect(tokens.text.fontBody.length).toBeGreaterThan(0);
    expect(tokens.space.scale).toHaveLength(8);
  });
});
