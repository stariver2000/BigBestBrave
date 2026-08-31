import { describe, expect, it } from 'vitest';
import { LOCALES } from '@core/i18n';
import { allNodes, pathOf } from '@core/tree';
import { validateVector } from '@core/traits';
// 모듈 등록기를 불러오는 것 자체가 모든 페이지를 트리에 등록한다.
import '../../src/modules';

/**
 * 페이지가 지켜야 할 최소 계약.
 *
 * capability는 화면에 나오지 않기 때문에 검사하지 않으면 조용히 비워진 채로 남는다.
 * "한 페이지에 판매 가능한 기능 하나"라는 규칙을 코드에서 강제하는 자리가 여기다.
 */
describe.each(allNodes().map((node) => [node.id, node] as const))('페이지 계약: %s', (_id, node) => {
  it('세 언어 모두에 제목·설명·기능이 선언돼 있다', () => {
    for (const locale of LOCALES) {
      expect(node.title[locale]?.trim(), `title/${locale}`).toBeTruthy();
      expect(node.summary[locale]?.trim(), `summary/${locale}`).toBeTruthy();
      expect(node.capability[locale]?.trim(), `capability/${locale}`).toBeTruthy();
    }
  });

  it('선언한 특성이 축 정의와 어긋나지 않는다', () => {
    expect(validateVector(node.traits)).toEqual([]);
  });

  it('경로가 트리에서 유일하게 해석된다', () => {
    expect(pathOf(node).startsWith('/')).toBe(true);
  });
});
