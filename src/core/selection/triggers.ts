/**
 * 세 가지 선택 방아쇠의 상태 기계.
 *
 * 셋 다 순수 함수다. 프레임 하나(커서 좌표·시각·확정 신호)를 넣으면 다음 상태와,
 * 방아쇠가 당겨졌다면 그 순간을 돌려준다. 화면 없이도 시험할 수 있어야 하기 때문이다.
 *
 * 논문의 정의를 그대로 옮겼다.
 *   크로싱: 한 모서리로 들어가 **같은 모서리로** 다시 나오면 확정. 반대편으로 빠지면 취소.
 *           고른 좌표는 방향이 바뀌는 지점(가장 깊이 들어간 곳)에서 잡는다.
 *   드웰:   과녁 위에 500ms 머무르면 확정. 좌표는 그 순간의 커서 자리다.
 *   핀치:   확정 신호가 오면 그때 커서가 얹힌 과녁을 고른다.
 */

import { DWELL_MS } from './config';
import type { Fire, Frame, Target, Trigger, TriggerState } from './types';

/** 상태에 담기지만 자료형 밖으로는 내보내지 않는 내부 값까지 포함한 전체 상태. */
export interface FullState extends TriggerState {
  /** 직전 프레임의 커서 좌표. 어느 모서리로 들어왔는지 가리는 데 쓴다. */
  lastX: number;
  /** 과녁 안에서 가장 깊이 들어간 지점. 크로싱의 선택 좌표다. */
  extremeX: number;
  /** 지금 과녁에서 방아쇠를 당길 수 있는가. 한 번 당기면 나갔다 와야 다시 당길 수 있다. */
  armed: boolean;
  /** 이번 선택에서 과녁 안으로 들어간 횟수. */
  entries: number;
  /**
   * 과녁 밖으로 한 번 나가기 전까지 방아쇠를 잠근다.
   *
   * 판이 바뀌면 과녁의 자리가 통째로 달라지는데, 그 순간 커서가 이미 어느 과녁 안에 놓여
   * 있을 수 있다. 그대로 두면 거기서 빠져나오는 것만으로 엉뚱한 과녁이 골라진다.
   * 논문도 판과 판 사이에 손을 제자리에 두는 1초를 두어 같은 일을 막았다.
   */
  blocked: boolean;
}

export function initialState(x: number, blocked = false): FullState {
  return {
    insideId: null,
    enteredAt: 0,
    enteredFrom: null,
    reentries: 0,
    lastX: x,
    extremeX: x,
    armed: false,
    entries: 0,
    blocked,
  };
}

/** 새 선택이 시작될 때 재진입 세기를 되돌린다. 상태 기계 자체는 이어 간다. */
export function beginSelection(state: FullState): FullState {
  return { ...state, entries: state.insideId === null ? 0 : 1, reentries: 0 };
}

function lowOf(target: Target): number {
  return target.center - target.width / 2;
}

function highOf(target: Target): number {
  return target.center + target.width / 2;
}

function targetAt(targets: readonly Target[], x: number): Target | null {
  for (const target of targets) {
    if (x >= lowOf(target) && x <= highOf(target)) return target;
  }
  return null;
}

export interface StepResult {
  state: FullState;
  fire: Fire | null;
}

export function step(
  trigger: Trigger,
  state: FullState,
  frame: Frame,
  targets: readonly Target[],
): StepResult {
  const hit = targetAt(targets, frame.x);
  const previous = state.insideId === null ? null : targets.find((t) => t.id === state.insideId) ?? null;
  /*
   * 과녁 밖으로 나오면 잠금이 풀린다. 다만 **다음 프레임부터** 풀려야 한다.
   * 밖으로 나온 그 프레임에서 바로 풀어 버리면, 잠금이 막으려던 바로 그 '빠져나옴'이
   * 통과해 버린다(판이 바뀐 자리에서 엉뚱한 과녁이 골라지던 원인이 이것이었다).
   * 그래서 판정에는 들어올 때의 값(state.blocked)을 쓰고, 다음 상태에만 풀린 값을 담는다.
   */
  const blocked = state.blocked && hit !== null;
  let next: FullState = { ...state, lastX: frame.x, blocked };
  let fire: Fire | null = null;

  // 1) 과녁에서 나왔다.
  if (previous !== null && (hit === null || hit.id !== previous.id)) {
    if (trigger === 'cross' && state.armed && !state.blocked && state.enteredFrom !== null) {
      const exitedFrom = frame.x < lowOf(previous) ? 'left' : 'right';
      // 들어온 모서리로 되돌아 나왔을 때만 확정이다. 반대편으로 빠지면 그냥 지나간 것이다.
      if (exitedFrom === state.enteredFrom) {
        fire = { targetId: previous.id, x: state.extremeX, time: frame.time };
      }
    }
    next = { ...next, insideId: null, enteredFrom: null, armed: false };
  }

  // 2) 과녁에 들어갔다.
  if (hit !== null && hit.id !== state.insideId) {
    const entries = state.entries + 1;
    next = {
      ...next,
      insideId: hit.id,
      enteredAt: frame.time,
      enteredFrom: state.lastX < hit.center ? 'left' : 'right',
      extremeX: frame.x,
      armed: true,
      entries,
      reentries: Math.max(0, entries - 1),
    };
  }

  // 3) 과녁 안에서 더 깊이 들어갔다.
  if (hit !== null && hit.id === next.insideId && next.enteredFrom !== null) {
    const deeper =
      next.enteredFrom === 'left'
        ? Math.max(next.extremeX, frame.x)
        : Math.min(next.extremeX, frame.x);
    next = { ...next, extremeX: deeper };
  }

  // 4) 머무름과 확정 신호.
  if (fire === null && hit !== null && next.armed && !state.blocked) {
    if (trigger === 'dwell' && frame.time - next.enteredAt >= DWELL_MS) {
      fire = { targetId: hit.id, x: frame.x, time: frame.time };
      next = { ...next, armed: false };
    }
  }
  if (fire === null && trigger === 'pinch' && frame.pinched && !state.blocked) {
    // 과녁 밖에서 눌러도 기록한다. 헛디딘 것도 성적이다.
    fire = { targetId: hit === null ? null : hit.id, x: frame.x, time: frame.time };
    next = { ...next, armed: false };
  }

  return { state: next, fire };
}
