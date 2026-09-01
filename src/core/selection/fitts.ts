/**
 * 피츠 법칙 맞추기.
 *
 * 명목 폭이 아니라 **유효 폭**을 쓴다. 사람은 작은 과녁에서 더 조심하고 큰 과녁에서
 * 대충 찍기 때문에, 명목 폭으로 재면 그 조절이 통째로 사라진다. 유효 폭은 끝점이
 * 실제로 흩어진 정도(표준편차)에서 되짚는다. ISO 9241-9의 관행이다.
 *
 *   We = 4.133 × (끝점의 표준편차)
 *   IDe = log2(Ae / We + 1)
 *   MT = a + b × IDe
 *   처리량 TP = IDe / MT의 평균 (bits/second)
 */

import { EFFECTIVE_WIDTH_FACTOR } from './config';
import type { ConditionPoint, Selection, TriggerReport, Trigger } from './types';

function mean(values: readonly number[]): number {
  return values.length === 0 ? 0 : values.reduce((sum, v) => sum + v, 0) / values.length;
}

function standardDeviation(values: readonly number[]): number {
  if (values.length < 2) return 0;
  const average = mean(values);
  const variance = values.reduce((sum, v) => sum + (v - average) ** 2, 0) / (values.length - 1);
  return Math.sqrt(variance);
}

/** 조건(폭 × 거리)마다 한 점씩. 빗나간 선택은 넣지 않는다. 그것은 오류율로 따로 센다. */
export function conditionPoints(selections: readonly Selection[]): ConditionPoint[] {
  const buckets = new Map<string, Selection[]>();
  for (const selection of selections) {
    if (selection.gotId !== selection.askedId) continue;
    const key = `${selection.width}|${selection.amplitude}`;
    const bucket = buckets.get(key);
    if (bucket) bucket.push(selection);
    else buckets.set(key, [selection]);
  }

  const points: ConditionPoint[] = [];
  for (const bucket of buckets.values()) {
    if (bucket.length < 2) continue; // 표준편차를 낼 수 없다
    const spread = standardDeviation(bucket.map((s) => s.x));
    const effectiveWidth = spread * EFFECTIVE_WIDTH_FACTOR;
    const effectiveAmplitude = mean(bucket.map((s) => Math.abs(s.x - s.fromX)));
    if (effectiveWidth <= 0 || effectiveAmplitude <= 0) continue;
    points.push({
      width: bucket[0].width,
      amplitude: bucket[0].amplitude,
      effectiveWidth,
      effectiveAmplitude,
      ide: Math.log2(effectiveAmplitude / effectiveWidth + 1),
      movementTime: mean(bucket.map((s) => s.movementTime)),
      count: bucket.length,
    });
  }
  return points.sort((a, b) => a.ide - b.ide);
}

/** 최소제곱 직선. 점이 둘보다 적으면 기울기를 낼 수 없다. */
function fitLine(points: readonly ConditionPoint[]): {
  intercept: number;
  slope: number;
  rSquared: number;
} {
  if (points.length < 2) return { intercept: 0, slope: 0, rSquared: 0 };
  const xs = points.map((p) => p.ide);
  const ys = points.map((p) => p.movementTime);
  const mx = mean(xs);
  const my = mean(ys);
  let covariance = 0;
  let variance = 0;
  for (let i = 0; i < xs.length; i += 1) {
    covariance += (xs[i] - mx) * (ys[i] - my);
    variance += (xs[i] - mx) ** 2;
  }
  if (variance === 0) return { intercept: my, slope: 0, rSquared: 0 };
  const slope = covariance / variance;
  const intercept = my - slope * mx;

  let residual = 0;
  let total = 0;
  for (let i = 0; i < xs.length; i += 1) {
    residual += (ys[i] - (intercept + slope * xs[i])) ** 2;
    total += (ys[i] - my) ** 2;
  }
  return { intercept, slope, rSquared: total === 0 ? 0 : 1 - residual / total };
}

export function report(trigger: Trigger, selections: readonly Selection[]): TriggerReport {
  const points = conditionPoints(selections);
  const { intercept, slope, rSquared } = fitLine(points);
  const hits = selections.filter((s) => s.gotId === s.askedId);
  const throughputs = points
    .filter((point) => point.movementTime > 0)
    .map((point) => point.ide / point.movementTime);

  return {
    trigger,
    intercept,
    slope,
    rSquared,
    throughput: mean(throughputs),
    movementTime: mean(hits.map((s) => s.movementTime)),
    errorRate: selections.length === 0 ? 0 : 1 - hits.length / selections.length,
    reentries: mean(selections.map((s) => s.reentries)),
    points,
    selectionCount: selections.length,
  };
}
