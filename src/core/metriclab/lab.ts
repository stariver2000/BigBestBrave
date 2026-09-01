/** 자료 짓기 → 산점도 무리 짓기 → 점수 매기기 → 묶기까지 한 번에. */

import { METRICS, POINT_COUNT, SEED, type DatasetId } from './config';
import { buildDataset } from './datasets';
import { measure, prepareHigh, prepareLow } from './metrics';
import { buildProjections } from './projections';
import { analyze, type Analysis } from './cluster';
import type { Dataset, MetricScores, Projection } from './types';

export interface LabOptions {
  dataset: DatasetId;
  /** 산점도 몇 장을 만들어 볼 것인가. */
  population: number;
  /** 국소 지표가 쓰는 이웃 수. */
  k: number;
  seed?: number;
}

export interface LabResult {
  dataset: Dataset;
  projections: Projection[];
  scores: MetricScores[];
  analysis: Analysis;
  /** 계산에 걸린 밀리초. 화면에 적어 두면 매개변수를 올릴 때 감이 온다. */
  elapsed: number;
}

/** 밀리초 시계. 브라우저에서는 소수점 아래까지 나오고, 없으면 Date로 떨어진다. */
function now(): number {
  return typeof performance === 'undefined' ? Date.now() : performance.now();
}

export function runLab(options: LabOptions): LabResult {
  const started = now();
  const seed = options.seed ?? SEED;
  const dataset = buildDataset(options.dataset, seed);
  const projections = buildProjections(dataset, options.population, seed + 1);
  const high = prepareHigh(dataset);

  // 지표마다 한 줄씩. 줄 안의 순서는 산점도 순서와 같다.
  const scores: MetricScores[] = METRICS.map((metric) => ({ metricId: metric.id, scores: [] }));
  for (const projection of projections) {
    const prepared = prepareLow(high, projection);
    METRICS.forEach((metric, index) => {
      scores[index].scores.push(measure(metric, prepared, projection, dataset, options.k));
    });
  }

  return {
    dataset,
    projections,
    scores,
    analysis: analyze(scores),
    elapsed: now() - started,
  };
}

export { POINT_COUNT };
