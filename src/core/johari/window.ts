/**
 * 조하리의 창과 어긋남 가르기.
 *
 * 두 수만 있으면 네 칸이 정해진다 — 내가 아는 정도(s)와 상대가 보는 정도(o).
 *
 *   열린 곳    = min(s, o)
 *   안 보이는 곳 = max(0, o - s)     상대는 보는데 나는 모른다
 *   감춘 곳    = max(0, s - o)     나는 아는데 상대는 못 본다
 *   모르는 곳  = M - max(s, o)
 *
 * 넷을 더하면 언제나 M이다. min + |s-o| + M - max = min + (max-min) + M - max = M.
 * 어림이 아니라 항등식이므로, 화면의 네 칸은 반드시 꽉 찬다.
 */

import { AREAS, SCALE } from './config';
import type { Area, Sheet, Split, Window } from './types';

function clamp(value: number): number {
  return Math.min(SCALE, Math.max(0, Math.round(value)));
}

/** 자리 하나의 창. */
export function windowOf(area: Area, selfKnows: number, seesMe: number): Window {
  const s = clamp(selfKnows);
  const o = clamp(seesMe);
  return {
    area,
    open: Math.min(s, o),
    blind: Math.max(0, o - s),
    hidden: Math.max(0, s - o),
    unknown: SCALE - Math.max(s, o),
    selfKnows: s,
    seesMe: o,
  };
}

/** 내 답과 상대가 나를 본 답으로 여섯 자리의 창을 만든다. */
export function windowsOf(mine: Sheet, theirSeesMe: readonly number[]): Window[] {
  return AREAS.map((area, index) => windowOf(area, mine.selfKnows[index] ?? 0, theirSeesMe[index] ?? 0));
}

/**
 * 어긋남을 둘로 가른다.
 *   (s - o) = (s - g) + (g - o)
 * g는 상대가 이만큼 볼 거라던 내 짐작이다. 앞쪽은 알면서 감춘 몫, 뒤쪽은 짐작이 빗나간 몫이다.
 */
export function splitOf(area: Area, selfKnows: number, guess: number, seesMe: number): Split {
  const s = clamp(selfKnows);
  const g = clamp(guess);
  const o = clamp(seesMe);
  return { area, total: s - o, withheld: s - g, misjudged: g - o };
}

export function splitsOf(mine: Sheet, theirSeesMe: readonly number[]): Split[] {
  return AREAS.map((area, index) =>
    splitOf(area, mine.selfKnows[index] ?? 0, mine.guessesOther[index] ?? 0, theirSeesMe[index] ?? 0),
  );
}

function mean(values: readonly number[]): number {
  return values.length === 0 ? 0 : values.reduce((sum, v) => sum + v, 0) / values.length;
}

/** 두 사람의 답을 합쳐 한 사람 쪽에서 본 보고서. */
export function report(mine: Sheet, theirs: Sheet): {
  windows: Window[];
  splits: Split[];
  metaError: number;
  blindSpots: Window[];
  iSee: number;
  seenByOther: number;
  asymmetry: number;
} {
  const windows = windowsOf(mine, theirs.seesOther);
  const splits = splitsOf(mine, theirs.seesOther);
  const iSee = mean(mine.seesOther.map(clamp));
  const seenByOther = mean(theirs.seesOther.map(clamp));
  return {
    windows,
    splits,
    // 짐작이 얼마나 빗나갔는가. 부호를 지우고 평균낸다.
    metaError: mean(splits.map((split) => Math.abs(split.misjudged))),
    blindSpots: [...windows].sort((a, b) => b.blind - a.blind),
    iSee,
    seenByOther,
    asymmetry: iSee - seenByOther,
  };
}
