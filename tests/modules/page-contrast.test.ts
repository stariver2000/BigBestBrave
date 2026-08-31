import { describe, expect, it } from 'vitest';
import { apcaContrast, parseColor, wcagContrastRatio, type Srgb } from '@core/color';
import { CSS_VAR_PREFIX } from '@core/traits';
import { allNodes } from '@core/tree';
import { MIN_FONT_SIZE, ROLE_CONTRAST } from '../../src/core/traits/tokens/config';
import { frameVariables } from '../../src/looks/resolve';
// 모듈 등록기를 불러오는 것 자체가 모든 페이지를 트리에 등록한다.
import '../../src/modules';

function color(hex: string): Srgb {
  const parsed = parseColor(hex);
  if (!parsed.ok) throw new Error(`파싱 실패: ${hex}`);
  return parsed.color;
}

/**
 * 등록된 모든 페이지가 "실제로 화면에 나가는 색"으로 가독성 기준을 통과하는지 검사한다.
 *
 * 파생 토큰이 아니라 룩까지 덮은 최종 변수를 읽는 이유: 룩은 손으로 고른 색이라
 * 엔진의 보증을 받지 않는다. 검사하지 않으면 룩을 새로 만들 때마다 읽기 어려운 화면이 나온다.
 * 페이지가 수백 개로 늘어나도 이 검사가 마지막 방어선이 된다.
 */
describe.each(allNodes().map((node) => [node.id, node] as const))('페이지 가독성: %s', (_id, node) => {
  const vars = frameVariables(node);
  const value = (name: string) => vars[`${CSS_VAR_PREFIX}-${name}`];

  const bg = color(value('bg'));
  const surface = color(value('surface'));

  it('본문색이 배경과 카드 위에서 모두 본문 기준을 넘는다', () => {
    expect(Math.abs(apcaContrast(color(value('fg')), bg))).toBeGreaterThanOrEqual(70);
    expect(Math.abs(apcaContrast(color(value('fg')), surface))).toBeGreaterThanOrEqual(70);
  });

  it('보조 글자가 카드 위에서 큰 글씨 기준을 넘는다', () => {
    expect(Math.abs(apcaContrast(color(value('fg-muted')), surface))).toBeGreaterThanOrEqual(
      ROLE_CONTRAST.mutedTextLc,
    );
  });

  it('강조색 위의 라벨이 읽힌다', () => {
    expect(Math.abs(apcaContrast(color(value('accent-fg')), color(value('accent'))))).toBeGreaterThanOrEqual(60);
  });

  it('강조색이 카드 위에서 글자로 쓰일 만큼 대비된다', () => {
    expect(Math.abs(apcaContrast(color(value('accent')), surface))).toBeGreaterThanOrEqual(60);
  });

  it('조작 요소 경계가 비텍스트 대비 기준(3:1)을 만족한다', () => {
    expect(wcagContrastRatio(color(value('border-strong')), surface)).toBeGreaterThanOrEqual(
      ROLE_CONTRAST.borderRatio - 0.01,
    );
  });

  it('카드 경계는 눈에 보이되 조작 요소 경계보다 조용하다', () => {
    // 장식적 경계까지 3:1로 그으면 화면이 격자무늬가 된다. 보이는 최소치만 지킨다.
    const subtle = wcagContrastRatio(color(value('border-color')), surface);
    expect(subtle).toBeGreaterThanOrEqual(1.1);
    expect(subtle).toBeLessThan(wcagContrastRatio(color(value('border-strong')), surface));
  });

  it('가장 작은 글자 단계가 하한 아래로 내려가지 않는다', () => {
    expect(Number.parseFloat(value('text-n1'))).toBeGreaterThanOrEqual(MIN_FONT_SIZE);
  });
});
