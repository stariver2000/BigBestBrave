/**
 * 어느 자리가 맞고 어느 자리가 안 맞는가.
 *
 * 논문은 점수를 매기지 않았다. 그러므로 여기서도 매기지 않는다. 자리마다 세 갈래로만
 * 가른다 - 맞는다, 가장자리다, 안 맞는다.
 *
 * 1~5의 다섯 자리를 세 갈래에 붙이는 규칙은 이 페이지가 세운 것이다. 논문은 "가운데가
 * 좋다", "유연한 쪽이 좋다"까지만 말했지 세 번째 칸이 어떻다고 말하지 않았다. 규칙은
 * 아래에 적어 두었고, 화면에도 이것이 내 규칙임을 밝혀 두었다.
 *
 * 부호와 방향: fits > edge > misfits 순으로 잘 맞는다. 다만 이것은 순서일 뿐 크기가 아니다.
 * 세 갈래를 숫자로 바꾸어 더하지 않는다 - 논문에 없는 저울을 만드는 일이 되기 때문이다.
 */

import {
  AXES,
  FOCUS_VERDICT,
  type Axis,
  type FocusKind,
  type Position,
  type Verdict,
} from './config';

/**
 * 한 축의 한 자리에 대한 판정.
 *
 *   peakMiddle  3이 맞고, 2와 4는 가장자리, 1과 5는 안 맞는다.
 *   towardHigh  4와 5가 맞고, 3은 가장자리, 1과 2는 안 맞는다.
 *   towardLow   1과 2가 맞고, 3은 가장자리, 4와 5는 안 맞는다.
 */
export function verdictAt(axis: Axis, position: Position): Verdict {
  if (axis.shape === 'peakMiddle') {
    if (position === 3) return 'fits';
    return position === 2 || position === 4 ? 'edge' : 'misfits';
  }
  if (axis.shape === 'towardHigh') {
    if (position >= 4) return 'fits';
    return position === 3 ? 'edge' : 'misfits';
  }
  if (position <= 2) return 'fits';
  return position === 3 ? 'edge' : 'misfits';
}

/**
 * 논문이 그 자리에서 안 맞는 까닭을 댔는가.
 * 까닭이 있는 쪽 끝에 갔을 때만 참이다. 맞는 쪽 끝에는 댈 까닭이 없다.
 */
export function hasReasonAt(axis: Axis, position: Position): boolean {
  if (position <= 2) return axis.reasons.low;
  if (position >= 4) return axis.reasons.high;
  return false;
}

/** 그 자리가 논문이 "도구를 쓰지 말라"고 한 자리인가. 심한 해악의 끝에서만 참이다. */
export function isBlocked(axis: Axis, position: Position): boolean {
  return axis.blocksAtHigh && position === 5;
}

export type Placement = Readonly<Record<string, Position>>;

export interface Reading {
  /** 축마다의 판정. */
  byAxis: { axis: Axis; position: Position; verdict: Verdict; blocked: boolean }[];
  /** 갈래별 개수. 점수가 아니라 셈이다. */
  fits: number;
  edge: number;
  misfits: number;
  /** 공동체 갈래의 판정. 축이 아니라 따로 온다. */
  focus: Verdict;
  /** 논문이 도구를 쓰지 말라고 한 자리에 걸렸는가. 걸리면 나머지 셈은 뜻이 없다. */
  blocked: boolean;
}

/** 기본 자리. 자리를 안 정한 축은 가운데로 둔다. */
export const MIDDLE: Position = 3;

export function read(placement: Placement, focus: FocusKind): Reading {
  const byAxis = AXES.map((axis) => {
    const position = placement[axis.id] ?? MIDDLE;
    return { axis, position, verdict: verdictAt(axis, position), blocked: isBlocked(axis, position) };
  });

  const count = (verdict: Verdict) => byAxis.filter((entry) => entry.verdict === verdict).length;

  return {
    byAxis,
    fits: count('fits'),
    edge: count('edge'),
    misfits: count('misfits'),
    focus: FOCUS_VERDICT[focus],
    blocked: byAxis.some((entry) => entry.blocked),
  };
}

/** 가운데가 맞는 축이 몇 개인가. 이 페이지가 하려는 말이 이 수에 들어 있다. */
export function peakMiddleCount(): number {
  return AXES.filter((axis) => axis.shape === 'peakMiddle').length;
}
