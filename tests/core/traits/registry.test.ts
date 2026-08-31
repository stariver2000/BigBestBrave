import { describe, expect, it } from 'vitest';
import { LOCALES } from '@core/i18n';
import { allAxes, traitValueCount, validateVector } from '@core/traits';

describe('특성 레지스트리', () => {
  it('수백 개 규모의 특성값을 갖는다', () => {
    expect(traitValueCount()).toBeGreaterThanOrEqual(300);
  });

  it('축 id와 특성값 id가 전부 유일하다', () => {
    const axisIds = allAxes().map((axis) => axis.id);
    expect(new Set(axisIds).size).toBe(axisIds.length);
    for (const axis of allAxes()) {
      const valueIds = axis.values.map((value) => value.id);
      expect(new Set(valueIds).size, `중복 값: ${axis.id}`).toBe(valueIds.length);
    }
  });

  it('모든 특성값이 3개 언어 레이블을 갖는다', () => {
    for (const axis of allAxes()) {
      for (const locale of LOCALES) {
        expect(axis.label[locale], `축 라벨 누락: ${axis.id}/${locale}`).toBeTruthy();
      }
      for (const value of axis.values) {
        for (const locale of LOCALES) {
          expect(value.label[locale], `값 라벨 누락: ${axis.id}.${value.id}/${locale}`).toBeTruthy();
        }
      }
    }
  });

  it('알 수 없는 축과 값을 잡아낸다', () => {
    const issues = validateVector({ nope: ['x'], density: ['not-a-density'] });
    expect(issues).toContainEqual({ axisId: 'nope', kind: 'unknown-axis' });
    expect(issues).toContainEqual({ axisId: 'density', valueId: 'not-a-density', kind: 'unknown-value' });
  });

  it('단일 선택 축에 값을 여러 개 넣으면 지적한다', () => {
    const issues = validateVector({ density: ['airy', 'dense'] });
    expect(issues).toContainEqual({ axisId: 'density', kind: 'multiple-values-not-allowed' });
  });
});
