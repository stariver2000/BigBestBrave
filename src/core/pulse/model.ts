/**
 * 페이지의 맥.
 *
 * 사람마다의 기록이 아니라 페이지마다의 셈이다. 누가 왔는지는 세지 않고, 몇 번 그랬는지만 센다.
 * 그래서 이 자료로는 한 사람을 되짚을 수 없고, 되짚을 수 없어야 한다는 것이 이 페이지들의 약속이다.
 */

import { PULSE_KINDS, MIN_VIEWS } from './config';

export type PulseKind = (typeof PULSE_KINDS)[number];

export type Tally = Record<PulseKind, number>;

export function emptyTally(): Tally {
  return { view: 0, touch: 0, reach: 0, stay: 0 };
}

export function isPulseKind(value: unknown): value is PulseKind {
  return typeof value === 'string' && (PULSE_KINDS as readonly string[]).includes(value);
}

/** 들어온 사건들을 셈에 더한다. 모르는 이름은 조용히 버린다 — 셈이 오염되는 편이 더 나쁘다. */
export function applyKinds(tally: Tally, kinds: readonly string[]): Tally {
  const next = { ...tally };
  for (const kind of kinds) {
    if (isPulseKind(kind)) next[kind] += 1;
  }
  return next;
}

/**
 * 이 사건을 세도 되는가.
 *
 * 두 가지를 막는다.
 *   - 같은 종류를 여러 번 세는 것. 한 번 온 사람이 두 번 세어지면 비율이 100%를 넘는다.
 *   - **스스로 도는 시연이 대신 닿은 '아하 지점'.** 화면이 혼자 끝까지 가 놓고 사람이 갔다고
 *     세면 이 지표는 곧 거짓말이 된다. 그래서 손을 댄 뒤에 닿은 것만 사람의 것으로 친다.
 */
export function accepts(kind: PulseKind, already: ReadonlySet<PulseKind>): boolean {
  if (already.has(kind)) return false;
  if (kind === 'reach') return already.has('touch');
  return true;
}

/**
 * 셈에서 읽어 낸 것.
 *
 * 비율은 셋 다 "직전 단계를 밟은 사람 가운데"로 잡는다. 방문 대비로 잡으면 뒤 단계가 늘 작아 보여
 * 무엇이 병목인지 가려지지 않는다. 표본이 모자라면 비율 대신 null을 준다.
 */
export interface Reading {
  /** 열어 본 사람 가운데 손을 댄 비율. */
  touched: number | null;
  /** 손을 댄 사람 가운데 그 페이지가 정한 자리까지 간 비율. */
  reached: number | null;
  /** 열어 본 사람 가운데 머문 비율. */
  stayed: number | null;
  /** 점수를 매길 만큼 왔는가. */
  enough: boolean;
}

function ratio(part: number, whole: number): number | null {
  if (whole <= 0) return null;
  return Math.min(1, part / whole);
}

export function readingOf(tally: Tally, minViews: number = MIN_VIEWS): Reading {
  const enough = tally.view >= minViews;
  if (!enough) return { touched: null, reached: null, stayed: null, enough };
  return {
    touched: ratio(tally.touch, tally.view),
    reached: ratio(tally.reach, tally.touch),
    stayed: ratio(tally.stay, tally.view),
    enough,
  };
}
