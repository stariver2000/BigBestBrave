/**
 * 그래프 미학·충실도 코어의 공개 진입점.
 *
 * 근거: Readability vs. Faithfulness (EuroVis 2026 GDxDR,
 * doi:10.2312/evgdxdr.20261001). 자세한 것은 config.ts의 머리말.
 */

import { MEASURED_AESTHETICS, type AestheticId, type FaithfulnessId } from './config';
import type { Graph } from './graph';
import type { Point } from './layout';
import {
  aspectRatio,
  continuity,
  crossingAngle,
  crossings,
  edgeCrossings,
  edgeOrthogonality,
  faithfulnessStress,
  nodeResolution,
  nodeUniformity,
  trustworthiness,
} from './metrics';

export * from './config';
export * from './graph';
export * from './layout';
export * from './metrics';

export interface Scores {
  /** 잴 수 없는 지표는 null이다(교차가 없을 때의 교차각). */
  aesthetics: Record<AestheticId, number | null>;
  faithfulness: Record<FaithfulnessId, number>;
}

/** 배치 하나를 두 눈으로 잰다. 미적 여섯과 충실도 셋. */
export function scoreLayout(
  graph: Graph,
  points: readonly Point[],
  target: readonly number[][],
): Scores {
  const report = crossings(graph, points);
  const aesthetics = {
    nodeResolution: nodeResolution(points),
    nodeUniformity: nodeUniformity(points),
    crossingAngle: crossingAngle(report),
    edgeCrossings: edgeCrossings(report),
    aspectRatio: aspectRatio(points),
    edgeOrthogonality: edgeOrthogonality(graph, points),
  } as Record<AestheticId, number | null>;

  return {
    aesthetics,
    faithfulness: {
      stress: faithfulnessStress(points, target),
      trustworthiness: trustworthiness(points, target),
      continuity: continuity(points, target),
    },
  };
}

/** 재는 지표만 추린 목록. 화면이 표를 그릴 때 쓴다. */
export function measuredAesthetics(): readonly AestheticId[] {
  return MEASURED_AESTHETICS;
}

/** 두 점수의 차이. 어느 쪽이 오르고 어느 쪽이 내렸는지 화면이 보여 준다. */
export function scoreDelta(before: Scores, after: Scores): {
  aesthetics: Record<string, number | null>;
  faithfulness: Record<string, number>;
} {
  const aesthetics: Record<string, number | null> = {};
  for (const id of MEASURED_AESTHETICS) {
    const a = before.aesthetics[id];
    const b = after.aesthetics[id];
    aesthetics[id] = a === null || b === null ? null : b - a;
  }
  const faithfulness: Record<string, number> = {};
  for (const key of Object.keys(after.faithfulness) as FaithfulnessId[]) {
    faithfulness[key] = after.faithfulness[key] - before.faithfulness[key];
  }
  return { aesthetics, faithfulness };
}
