/**
 * 축 조회와 특성 벡터 검증.
 *
 * 축 목록 자체는 axes/index.ts가 갖고 있고, 이 파일은 그 위에 조회/검증만 얹는다.
 */

import { ALL_AXES } from './axes';
import type { TraitAxis, TraitValue, TraitVector } from './model';

/** id -> 축. 축 수가 수십 개이고 조회가 잦아 한 번만 만들어 재사용한다. */
const AXIS_BY_ID = new Map<string, TraitAxis>(ALL_AXES.map((axis) => [axis.id, axis]));

export function allAxes(): readonly TraitAxis[] {
  return ALL_AXES;
}

export function axisById(id: string): TraitAxis | undefined {
  return AXIS_BY_ID.get(id);
}

export function valueById(axisId: string, valueId: string): TraitValue | undefined {
  return axisById(axisId)?.values.find((value) => value.id === valueId);
}

/** 사이트 전체가 다루는 특성값의 총 개수. 안내 문구와 테스트에서 쓴다. */
export function traitValueCount(): number {
  return ALL_AXES.reduce((total, axis) => total + axis.values.length, 0);
}

export interface VectorIssue {
  axisId: string;
  valueId?: string;
  kind: 'unknown-axis' | 'unknown-value' | 'multiple-values-not-allowed';
}

/** 페이지가 선언한 특성 벡터가 축 정의와 맞는지 검사한다. 빌드 시점 점검용. */
export function validateVector(vector: TraitVector): VectorIssue[] {
  const issues: VectorIssue[] = [];
  for (const [axisId, values] of Object.entries(vector)) {
    const axis = axisById(axisId);
    if (!axis) {
      issues.push({ axisId, kind: 'unknown-axis' });
      continue;
    }
    if (!axis.multi && values.length > 1) {
      issues.push({ axisId, kind: 'multiple-values-not-allowed' });
    }
    for (const valueId of values) {
      if (!axis.values.some((value) => value.id === valueId)) {
        issues.push({ axisId, valueId, kind: 'unknown-value' });
      }
    }
  }
  return issues;
}
