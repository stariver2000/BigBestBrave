/**
 * 특성(trait) 시스템의 자료 모델.
 *
 * 한 페이지는 "주제 + 분위기 + 형태 + 상호작용 + 문체 + 기술 조건"의 조합으로 규정되고,
 * 그 조합에서 디자인 토큰과 레이아웃 결정이 기계적으로 파생된다.
 * 이 파일은 어떤 축이 존재하는지 모르며, 축 정의는 axes/ 아래에만 있다.
 */

import type { Locale } from '../i18n';

/** 축을 묶는 상위 분류. UI에서 특성 편집기를 섹션으로 나눌 때 쓴다. */
export type TraitGroup =
  | 'identity'
  | 'mood'
  | 'form'
  | 'typography'
  | 'motion'
  | 'interaction'
  | 'voice'
  | 'content'
  | 'system'
  | 'accessibility';

/** 한 축이 가질 수 있는 값 하나. */
export interface TraitValue {
  id: string;
  label: Record<Locale, string>;
}

export interface TraitAxis {
  id: string;
  group: TraitGroup;
  label: Record<Locale, string>;
  values: readonly TraitValue[];
  /**
   * 한 페이지가 이 축에서 여러 값을 동시에 가질 수 있는지.
   * 예: domain은 복수 선택(게임+마케팅)이 자연스럽지만 layout-archetype은 하나여야 한다.
   */
  multi: boolean;
}

/** 페이지가 선언한 특성 조합. 키는 축 id, 값은 특성값 id 목록. */
export type TraitVector = Readonly<Record<string, readonly string[]>>;

export function axis(
  id: string,
  group: TraitGroup,
  label: Record<Locale, string>,
  values: readonly TraitValue[],
  multi = false,
): TraitAxis {
  return { id, group, label, values, multi };
}

/** 특성값 정의를 한 줄로 쓰기 위한 헬퍼. 인자 순서는 항상 ko, en, ja. */
export function v(id: string, ko: string, en: string, ja: string): TraitValue {
  return { id, label: { ko, en, ja } };
}

/** 축 라벨도 같은 순서의 3개 언어로 받는다. */
export function label(ko: string, en: string, ja: string): Record<Locale, string> {
  return { ko, en, ja };
}
