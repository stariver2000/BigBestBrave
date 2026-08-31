/**
 * 자막 재분할.
 *
 * KAIST의 OptiSub(CHI 2025)가 제시한 착안점을 따랐다. 글자 수로 자르는 대신
 * (1) 지정한 글씨 크기·화면 폭에 실제로 들어가는 만큼만 담고,
 * (2) 자를 자리는 말이 끊긴 지점(pause)을 우선한다.
 * 논문의 최적화 수식을 그대로 옮긴 것은 아니며, 같은 착안점을 이 코드가 나름대로 구현한 것이다.
 *
 * 자막 파일에는 음성 파형이 없으므로, 원본 덩어리 사이의 빈 시간을 말이 끊긴 지점으로 삼는다.
 */

import { BREAK_SCORE, CHUNK_GAP, CLAUSE_END, CLOSING_BRACKET, MIN_FILL_RATIO, SENTENCE_END } from './config';
import { layoutLines } from './layout';
import type { Chunk, ChunkOptions, Cue } from './types';

/** 이어 붙인 한 묶음. 원본 경계가 어디였는지(그리고 얼마나 쉬었는지)를 함께 들고 있는다. */
interface Run {
  text: string;
  start: number;
  end: number;
  /** 글자 위치 -> 그 자리에서 쉰 시간(ms). 분할점 점수와 시각 배분에 함께 쓴다. */
  pauses: { offset: number; gap: number }[];
  /** 글자 위치 -> 원본에서의 시각(ms). 시간 배분의 기준점이다. */
  anchors: { offset: number; time: number }[];
}

/** 빈 시간이 기준보다 큰 곳에서 묶음을 끊는다. 그보다 짧게 쉰 자리는 한 묶음 안의 분할 후보가 된다. */
function buildRuns(cues: readonly Cue[], pauseThreshold: number): Run[] {
  const runs: Run[] = [];
  let current: Run | null = null;

  for (const cue of cues) {
    if (!current) {
      current = { text: cue.text, start: cue.start, end: cue.end, pauses: [], anchors: [{ offset: 0, time: cue.start }] };
      continue;
    }
    const gap = cue.start - current.end;
    if (gap > pauseThreshold) {
      runs.push(current);
      current = { text: cue.text, start: cue.start, end: cue.end, pauses: [], anchors: [{ offset: 0, time: cue.start }] };
      continue;
    }
    const offset = current.text.length + 1;
    current.text = `${current.text} ${cue.text}`;
    current.pauses.push({ offset, gap: Math.max(0, gap) });
    current.anchors.push({ offset, time: cue.start });
    current.end = cue.end;
  }

  if (current) runs.push(current);
  return runs;
}

/** 위치별 분할 점수. 여러 근거가 겹치면 가장 큰 값을 쓴다. */
function breakScoreAt(run: Run, offset: number): number {
  if (offset <= 0 || offset >= run.text.length) return 0;
  const previous = run.text[offset - 1];
  const scores: number[] = [];

  if (SENTENCE_END.test(previous)) scores.push(BREAK_SCORE.sentenceEnd);
  if (CLAUSE_END.test(previous)) scores.push(BREAK_SCORE.clauseEnd);
  if (CLOSING_BRACKET.test(previous)) scores.push(BREAK_SCORE.closingBracket);
  if (run.text[offset] === ' ' || previous === ' ') scores.push(BREAK_SCORE.whitespace);
  if (run.pauses.some((pause) => Math.abs(pause.offset - offset) <= 1)) scores.push(BREAK_SCORE.pause);
  if (scores.length === 0) scores.push(BREAK_SCORE.character);

  return Math.max(...scores);
}

/**
 * 담을 수 있는 최대 분량(capacity) 안에서 가장 좋은 분할점을 고른다.
 * 너무 앞에서 자르면 마지막 줄이 휑해지므로 MIN_FILL_RATIO보다 앞은 보지 않는다.
 */
function chooseBreak(run: Run, from: number, capacity: number): number {
  const limit = from + capacity;
  if (limit >= run.text.length) return run.text.length;

  const floor = from + Math.floor(capacity * MIN_FILL_RATIO);
  let best = limit;
  let bestScore = -1;
  for (let offset = limit; offset > floor; offset -= 1) {
    const score = breakScoreAt(run, offset);
    // 같은 점수라면 뒤쪽(더 많이 채운 쪽)이 이긴다. 위에서 아래로 훑으므로 첫 최고값이 그것이다.
    if (score > bestScore) {
      bestScore = score;
      best = offset;
    }
  }
  return best;
}

/** 글자 위치를 원본 시각으로 옮긴다. 기준점 사이는 글자 수에 비례해 나눈다. */
function timeAt(run: Run, offset: number): number {
  const anchors = run.anchors;
  let previous = anchors[0];
  for (const anchor of anchors) {
    if (anchor.offset > offset) {
      const span = anchor.offset - previous.offset;
      const ratio = span === 0 ? 0 : (offset - previous.offset) / span;
      return previous.time + (anchor.time - previous.time) * ratio;
    }
    previous = anchor;
  }
  const tailSpan = run.text.length - previous.offset;
  const ratio = tailSpan === 0 ? 1 : (offset - previous.offset) / tailSpan;
  return previous.time + (run.end - previous.time) * ratio;
}

export function rechunk(cues: readonly Cue[], options: ChunkOptions): Chunk[] {
  const chunks: Chunk[] = [];

  for (const run of buildRuns(cues, options.pauseThreshold)) {
    let cursor = 0;
    while (cursor < run.text.length) {
      const rest = run.text.slice(cursor);
      const capacity = layoutLines(rest, options.measure, options.maxWidth, options.maxLines).consumed;
      if (capacity === 0) break;

      const cut = chooseBreak(run, cursor, capacity);
      const piece = run.text.slice(cursor, cut).trim();
      if (piece.length === 0) break;

      const { lines } = layoutLines(piece, options.measure, options.maxWidth, options.maxLines);
      const start = timeAt(run, cursor);
      const end = timeAt(run, cut);
      chunks.push({ start, end, lines });

      cursor = cut;
      while (cursor < run.text.length && run.text[cursor] === ' ') cursor += 1;
    }
  }

  return enforceTiming(chunks, options);
}

/**
 * 표시 시간을 사람이 읽을 수 있는 범위로 맞춘다.
 *
 * 순서가 중요하다: 먼저 읽기 속도와 최소 시간을 만족하도록 늘리고,
 * 그 결과 다음 자막과 겹치면 뒤쪽을 밀지 않고 앞쪽을 줄인다.
 * 뒤로 밀면 자막이 화면과 어긋나기 시작해 한 번 어긋난 것이 끝까지 이어진다.
 */
function enforceTiming(chunks: Chunk[], options: ChunkOptions): Chunk[] {
  return chunks.map((chunk, index) => {
    const characters = chunk.lines.join(' ').length;
    const neededForReading = (characters / options.maxCps) * 1000;
    const wanted = Math.max(chunk.end - chunk.start, options.minDuration, neededForReading);
    const duration = Math.min(wanted, options.maxDuration);

    const next = chunks[index + 1];
    const ceiling = next ? next.start - CHUNK_GAP : Number.POSITIVE_INFINITY;
    const end = Math.min(chunk.start + duration, Math.max(ceiling, chunk.start + 1));

    return { start: Math.round(chunk.start), end: Math.round(end), lines: chunk.lines };
  });
}
