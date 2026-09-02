/**
 * 거짓말 오르막.
 *
 * 검사기(audit)는 이미 그려진 차트에서 어긋난 곳을 찾아낸다. 이 파일은 그 길을 거꾸로 걷는다 —
 * **숫자는 하나도 건드리지 않고** 손잡이만 돌려서 차이를 얼마나 부풀릴 수 있는지 한 걸음씩 올라간다.
 * 검사기가 매기는 왜곡 배수를 점수로 삼는 언덕 오르기이고, 규칙만으로 도는 계산이라 무겁지 않다.
 *
 * 축 뒤집기는 손잡이에 넣지 않았다. 뒤집기는 차이를 부풀리는 일이 아니라 뜻을 바꾸는 일이라
 * 이 오르막의 점수로 잴 수 없다. 부풀리기와 뒤집기를 한 점수에 섞으면 둘 다 흐려진다.
 */

import { audit } from './audit';
import { EPSILON, SEVERITY } from './config';
import { extent } from './measure';
import type { ChartSpec } from './types';

/** 한 걸음에 돌릴 수 있는 손잡이. */
export type KnobId = 'axis' | 'height' | 'scale';

/** 손잡이를 한 걸음에 얼마나 돌릴지, 어디까지 돌릴 수 있는지. 화면이 정해 넘긴다. */
export interface KnobRange {
  /** 축 시작값을 한 걸음에 올리는 양. */
  axisStep: number;
  /** 그림 높이를 한 걸음에 늘리는 양(px). */
  heightStep: number;
  /** 그림 높이의 끝(px). */
  maxHeight: number;
}

export interface LieStep {
  spec: ChartSpec;
  knob: KnobId;
  /** 이 걸음을 딛고 난 뒤의 왜곡 배수. */
  worst: number;
}

/** 지금 자리에서 한 걸음 갈 수 있는 곳들. */
function reachable(spec: ChartSpec, range: KnobRange): { spec: ChartSpec; knob: KnobId }[] {
  const moves: { spec: ChartSpec; knob: KnobId }[] = [];

  const start = spec.axisMin ?? 0;
  const nextStart = Math.round(start + range.axisStep);
  // 자료가 한 걸음치는 남아 있어야 그림이 그림으로 남는다. 다 잘라 내면 배수가 무한이 되고 볼 것이 없다.
  if (nextStart > start && nextStart <= extent(spec.values).min - range.axisStep) {
    moves.push({ spec: { ...spec, axisMin: nextStart }, knob: 'axis' });
  }

  const nextHeight = spec.height + range.heightStep;
  if (nextHeight <= range.maxHeight) {
    moves.push({ spec: { ...spec, height: nextHeight }, knob: 'height' });
  }

  if (spec.kind === 'bubble' && spec.bubbleScale === 'area') {
    moves.push({ spec: { ...spec, bubbleScale: 'radius' }, knob: 'scale' });
  }

  return moves;
}

/**
 * 더 부풀려 보이게 하는 한 걸음. 더 갈 곳이 없으면 null이다.
 *
 * 갈 수 있는 자리를 모두 검사기에 넣어 보고 배수가 가장 크게 오르는 쪽을 고른다.
 * 지금보다 나아지지 않는 걸음은 딛지 않으므로, 이 걸음을 되풀이하면 반드시 멈춘다.
 */
export function nextLie(spec: ChartSpec, range: KnobRange): LieStep | null {
  const now = audit(spec).worst;
  let best: LieStep | null = null;

  for (const move of reachable(spec, range)) {
    const worst = audit(move.spec).worst;
    if (!Number.isFinite(worst) || worst <= now + EPSILON) continue;
    if (best === null || worst > best.worst) best = { ...move, worst };
  }

  return best;
}

/**
 * 기계가 부풀려 놓은 것을 사람이 다시 눌러 놓았는가.
 *
 * 이 페이지에서 사람이 무언가 알아차리는 자리는 손잡이를 처음 만질 때가 아니라,
 * 크게 부풀어 있던 그림을 자기 손으로 정직한 자리까지 되돌려 놓았을 때다.
 */
export function undone(peak: number, current: number): boolean {
  return peak >= SEVERITY.high && current <= SEVERITY.medium;
}
