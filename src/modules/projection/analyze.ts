/**
 * 화면이 쓰는 형태로 자료를 준비한다.
 *
 * CSV 표에서 어떤 열을 특징으로 쓰고 어떤 열을 좌표로 쓸지 고른 뒤, 검사에 넘긴다.
 * 좌표 열을 지정하지 않으면 PCA로 만들어 기준선을 보여 준다.
 */

import { LIMITS, evaluate, projectToPlane, standardize } from '../../core/projection';
import type { Metrics, PointDistortion } from '../../core/projection';
import { isNumericColumn, type Table } from '../../core/table';

export interface ColumnChoice {
  /** 좌표로 쓸 열의 인덱스. null이면 PCA로 만든다. */
  x: number | null;
  y: number | null;
  label: number | null;
}

export interface Analysis {
  metrics: Metrics;
  distortions: PointDistortion[];
  low: [number, number][];
  labels: string[] | null;
  /** 상한 때문에 잘라 쓴 경우의 전체 행 수. 자르지 않았으면 null. */
  truncatedFrom: number | null;
}

/** 좌표·라벨로 지정된 열은 특징에서 뺀다. 좌표를 특징에 넣으면 자기 자신을 검사하게 된다. */
function featureIndices(table: Table, choice: ColumnChoice): number[] {
  const excluded = new Set([choice.x, choice.y, choice.label].filter((index): index is number => index !== null));
  return table.columns
    .map((_, index) => index)
    .filter((index) => !excluded.has(index) && isNumericColumn(table, index));
}

export function numericColumnIndices(table: Table): number[] {
  return table.columns.map((_, index) => index).filter((index) => isNumericColumn(table, index));
}

export function analyze(
  table: Table,
  choice: ColumnChoice,
  neighbors: number,
  standardizeHigh: boolean,
): Analysis | null {
  const features = featureIndices(table, choice);
  if (features.length < 2 || table.rows.length < neighbors + 2) return null;

  const totalRows = table.rows.length;
  const limit = Math.min(totalRows, LIMITS.maxPoints);
  const rowIndices = Array.from({ length: limit }, (_, index) => index);

  const high = rowIndices.map((row) => features.map((column) => Number(table.rows[row][column])));

  const low: [number, number][] =
    choice.x !== null && choice.y !== null
      ? rowIndices.map((row) => [
          Number(table.rows[row][choice.x as number]),
          Number(table.rows[row][choice.y as number]),
        ])
      : // 표준화 여부는 PCA에도 그대로 적용한다. 검사 대상과 같은 조건에서 뽑아야 비교가 성립한다.
        projectToPlane(standardizeHigh ? standardize(high) : high);

  const labels =
    choice.label === null ? null : rowIndices.map((row) => table.rows[row][choice.label as number]);

  const result = evaluate({ high, low, labels: labels ?? undefined }, neighbors, standardizeHigh);
  return {
    metrics: result.metrics,
    distortions: result.distortions,
    low,
    labels,
    truncatedFrom: totalRows > limit ? totalRows : null,
  };
}

/** 점별 결과를 CSV로 만든다. 어느 점이 문제였는지 원본 자료와 대조할 수 있어야 한다. */
export function reportCsv(analysis: Analysis): string {
  const header = 'index,x,y,label,false_neighbors,missing_neighbors';
  const rows = analysis.distortions.map((distortion, index) => {
    const [x, y] = analysis.low[index];
    const label = analysis.labels ? analysis.labels[index] : '';
    return `${index},${x},${y},${label},${distortion.falseNeighbors},${distortion.missingNeighbors}`;
  });
  return [header, ...rows].join('\n');
}
