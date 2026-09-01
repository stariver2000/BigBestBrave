/**
 * 내가 정한 것과 정하지 않은 것을 가른다.
 *
 * 이 페이지가 파는 것이 여기 있다. 설계 공간의 쓸모는 "내가 무엇을 정했는가"가 아니라
 * "내가 무엇을 안 보고 있는가"를 비추는 데 있다. 논문의 사용 사례도 그렇게 적혀 있다 -
 * 연구자들이 표를 보고 나서야 자료의 출처와 평가의 초점을 빠뜨렸음을 깨닫는다.
 *
 * 부호와 방향: covered가 클수록 많이 정했다는 뜻이다. blind는 정하지 않은 차원이며,
 * 그 가운데 shared는 논문 무리도 적게 다룬 것, alone은 남들은 다루는데 나만 비운 것이다.
 */

import { ASPECTS, DIMENSIONS, UNDER_REPRESENTED, type AspectId, type Dimension } from './config';

/** 차원 id마다 고른 코드들. 비어 있으면 아직 정하지 않은 것이다. */
export type Picks = Readonly<Record<string, readonly string[]>>;

export interface AspectCoverage {
  aspect: AspectId;
  total: number;
  decided: number;
  /** 0~1. 그 갈래의 차원 가운데 얼마를 정했는가. */
  share: number;
}

export interface Coverage {
  byAspect: AspectCoverage[];
  decided: number;
  total: number;
  /** 아직 정하지 않은 차원. */
  blind: Dimension[];
  /** 그 가운데 논문 무리도 적게 다룬 것. 비워 두어도 혼자는 아니다. */
  shared: Dimension[];
  /** 남들은 다루는데 나만 비운 것. 여기가 진짜 사각지대다. */
  alone: Dimension[];
}

export function dimensionsOf(aspect: AspectId): Dimension[] {
  return DIMENSIONS.filter((dimension) => dimension.aspect === aspect);
}

export function dimensionById(id: string): Dimension | undefined {
  return DIMENSIONS.find((dimension) => dimension.id === id);
}

/** 그 차원을 정했다고 볼 것인가. 코드를 하나라도 골랐으면 정한 것이다. */
export function isDecided(picks: Picks, id: string): boolean {
  return (picks[id]?.length ?? 0) > 0;
}

export function coverageOf(picks: Picks): Coverage {
  const byAspect = ASPECTS.map((aspect) => {
    const dimensions = dimensionsOf(aspect);
    const decided = dimensions.filter((dimension) => isDecided(picks, dimension.id)).length;
    return { aspect, total: dimensions.length, decided, share: dimensions.length === 0 ? 0 : decided / dimensions.length };
  });

  const blind = DIMENSIONS.filter((dimension) => !isDecided(picks, dimension.id));
  const shared = blind.filter((dimension) => UNDER_REPRESENTED.includes(dimension.id));
  const alone = blind.filter((dimension) => !UNDER_REPRESENTED.includes(dimension.id));

  return {
    byAspect,
    decided: DIMENSIONS.length - blind.length,
    total: DIMENSIONS.length,
    blind,
    shared,
    alone,
  };
}

/** 고른 코드를 넣고 뺀다. 같은 차원에 여러 코드를 함께 둘 수 있다. */
export function toggleCode(picks: Picks, id: string, code: string): Picks {
  const current = picks[id] ?? [];
  const next = current.includes(code) ? current.filter((one) => one !== code) : [...current, code];
  const updated: Record<string, readonly string[]> = { ...picks };
  if (next.length === 0) delete updated[id];
  else updated[id] = next;
  return updated;
}
