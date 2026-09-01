/**
 * 어느 요소가 왜곡을 만드는지 짚는다.
 *
 * 논문의 착안점이 여기 있다 — "이 차트는 오해를 부른다"로 끝내지 않고,
 * **어느 요소가** 얼마나 어긋나게 만드는지 하나씩 나눠 짚는다.
 * 그래야 무엇을 고쳐야 하는지 알 수 있다.
 */

import { SEVERITY, SLOPE_TOLERANCE } from './config';
import { clippedCount, radiusFactor, slopeFactor, truncationFactor } from './measure';
import type { Audit, Finding, ChartSpec } from './types';

function severityOf(factor: number): Finding['severity'] {
  const magnitude = factor >= 1 ? factor : 1 / factor;
  if (magnitude >= SEVERITY.high) return 'high';
  if (magnitude >= SEVERITY.medium) return 'medium';
  return 'low';
}

export function audit(spec: ChartSpec): Audit {
  const findings: Finding[] = [];

  // 축 자르기는 막대와 원에서만 문제가 된다. 선 그래프는 변화를 보는 그림이라 0에서 시작할 이유가 없다.
  if (spec.kind !== 'line' && (spec.axisMin ?? 0) !== 0) {
    const factor = truncationFactor(spec);
    findings.push({ kind: 'truncated-axis', factor, severity: severityOf(factor) });
  }

  if (spec.kind === 'bubble' && spec.bubbleScale === 'radius') {
    const factor = radiusFactor(spec);
    findings.push({ kind: 'radius-encoding', factor, severity: severityOf(factor) });
  }

  if (spec.kind === 'line') {
    const factor = slopeFactor(spec);
    const off = factor >= 1 ? factor : 1 / factor;
    if (off > SLOPE_TOLERANCE) {
      findings.push({ kind: 'aspect-distortion', factor, severity: severityOf(factor) });
    }
  }

  if (spec.inverted) {
    // 방향이 뒤집힌 것은 배수로 잴 수 없다. 크기가 아니라 뜻이 바뀌는 문제다.
    findings.push({ kind: 'inverted-axis', factor: null, severity: 'high' });
  }

  if (clippedCount(spec) > 0) {
    findings.push({ kind: 'clipped-range', factor: null, severity: 'high' });
  }

  const factors = findings
    .map((finding) => finding.factor)
    .filter((factor): factor is number => factor !== null && Number.isFinite(factor));

  return { findings, worst: factors.length === 0 ? 1 : Math.max(...factors) };
}

/** 어긋난 곳을 모두 바로잡은 설정. 옆에 나란히 놓고 견주기 위한 것이다. */
export function honest(spec: ChartSpec): ChartSpec {
  const max = Math.max(...spec.values);
  return {
    ...spec,
    axisMin: spec.kind === 'line' ? spec.axisMin : 0,
    axisMax: spec.axisMax !== null && spec.axisMax < max ? null : spec.axisMax,
    bubbleScale: 'area',
    inverted: false,
    // 선 그래프는 평균 기울기가 45도에 가깝도록 높이를 다시 잡는다.
    height: spec.kind === 'line' ? bankedHeight(spec) : spec.height,
  };
}

/** 평균 기울기를 45도에 맞추는 높이. 이 지침을 따르면 변화율이 바르게 읽힌다. */
export function bankedHeight(spec: ChartSpec): number {
  const factor = slopeFactor(spec);
  if (!Number.isFinite(factor) || factor <= 0) return spec.height;
  return Math.round(spec.height / factor);
}
