/**
 * 자막을 시간축 위에 올린다.
 *
 * 재분할이 잘 됐는지는 정지 화면으로 판단하기 어렵다. 실제로 흘러가는 동안
 * "글자가 넘치는가, 너무 빨리 지나가는가"가 드러나기 때문이다. 그래서 재생에 필요한 계산을
 * 여기 순수 함수로 둔다. 화면은 시계(requestAnimationFrame)만 맡고, 무엇을 보여 줄지는 이 파일이 정한다.
 */

import { TAIL_AFTER_LAST } from './config';
import type { Chunk, Cue } from './types';

/** 시작과 끝이 있는 구간. 자막 덩어리도, 말이 쉰 자리도 같은 모양이다. */
export interface TimeBlock {
  start: number;
  end: number;
}

export interface Timeline {
  /** 재생이 끝나는 시각(ms). 마지막 자막이 사라진 뒤 잠깐의 여운을 더한 값이다. */
  duration: number;
  /**
   * 말이 끊긴 구간. 재분할이 자를 자리로 우선 삼는 지점이며,
   * 시간 막대에 표시해 "왜 여기서 잘렸는가"를 눈으로 보게 한다.
   */
  pauses: TimeBlock[];
}

export function buildTimeline(cues: readonly Cue[], pauseThreshold: number): Timeline {
  if (cues.length === 0) return { duration: 0, pauses: [] };

  // 자막 사이의 빈 시간이 기준을 넘으면 그 자리를 말이 쉰 곳으로 본다.
  // (음성 파형이 없으므로 자막 사이의 침묵이 쉼을 대신한다.)
  const pauses: TimeBlock[] = [];
  for (let index = 1; index < cues.length; index += 1) {
    const gap = cues[index].start - cues[index - 1].end;
    if (gap >= pauseThreshold && gap > 0) {
      pauses.push({ start: cues[index - 1].end, end: cues[index].start });
    }
  }

  const last = cues[cues.length - 1];
  return { duration: last.end + TAIL_AFTER_LAST, pauses };
}

/**
 * 지금 화면에 떠 있어야 할 구간의 자리를 찾는다. 없으면 -1.
 *
 * 매 프레임 호출되므로 이분 탐색으로 찾는다. 자막은 시작 시각 순으로 정렬돼 있으므로
 * 시작이 time 이하인 마지막 구간 하나만 확인하면 된다.
 */
export function blockAt(blocks: readonly TimeBlock[], time: number): number {
  let low = 0;
  let high = blocks.length - 1;
  let candidate = -1;

  while (low <= high) {
    const middle = (low + high) >> 1;
    if (blocks[middle].start <= time) {
      candidate = middle;
      low = middle + 1;
    } else {
      high = middle - 1;
    }
  }

  if (candidate === -1) return -1;
  return time < blocks[candidate].end ? candidate : -1;
}

/**
 * 멈춰 있을 때 보여 줄 구간의 자리.
 *
 * 지금 떠 있는 것이 있으면 그것을, 없으면 다음에 뜰 것을 준다.
 * 재생 중의 빈 화면은 사실이지만, 멈춘 화면이 검게 비어 있으면 무엇도 판단할 수 없다.
 */
export function nearestBlock(blocks: readonly TimeBlock[], time: number): number {
  const active = blockAt(blocks, time);
  if (active !== -1) return active;

  const upcoming = blocks.findIndex((block) => block.start > time);
  if (upcoming !== -1) return upcoming;
  return blocks.length - 1;
}

/**
 * 다음 프레임의 재생 시각. 끝에 닿으면 처음으로 돌아간다.
 * 되감기 버튼을 누르지 않아도 계속 돌아가야, 옆에 두고 몇 번이고 다시 보게 된다.
 */
export function advance(time: number, elapsed: number, speed: number, duration: number): number {
  if (duration <= 0) return 0;
  const next = time + elapsed * speed;
  return next >= duration ? 0 : next;
}

/** 자막 한 덩어리 중 가장 긴 줄의 폭. 넘침을 화면에 알릴 때 쓴다. */
export function widestLine(chunk: Chunk, measure: (text: string) => number): number {
  return chunk.lines.reduce((widest, line) => Math.max(widest, measure(line)), 0);
}
