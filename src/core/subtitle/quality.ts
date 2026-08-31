/**
 * 자막 품질 점검.
 *
 * 재분할 결과가 실제로 읽을 수 있는지 수치로 확인한다. 눈으로 훑어서는 300개 자막 중
 * 어느 것이 너무 빠른지 알 수 없고, 그 판단이야말로 도구가 대신해야 하는 일이다.
 */

import type { Chunk, Measure, QualityIssue } from './types';

/** 초당 글자 수. 공백을 세지 않는 관행을 따른다. */
export function charactersPerSecond(chunk: Chunk): number {
  const characters = chunk.lines.join('').replace(/\s/g, '').length;
  const seconds = (chunk.end - chunk.start) / 1000;
  return seconds <= 0 ? Number.POSITIVE_INFINITY : characters / seconds;
}

export interface QualityOptions {
  measure: Measure;
  maxWidth: number;
  minDuration: number;
  maxDuration: number;
  maxCps: number;
}

export function inspect(chunks: readonly Chunk[], options: QualityOptions): QualityIssue[] {
  const issues: QualityIssue[] = [];

  chunks.forEach((chunk, index) => {
    const duration = chunk.end - chunk.start;
    const cps = charactersPerSecond(chunk);

    if (cps > options.maxCps) issues.push({ kind: 'too-fast', index, value: cps });
    if (duration < options.minDuration) issues.push({ kind: 'too-short', index, value: duration });
    if (duration > options.maxDuration) issues.push({ kind: 'too-long', index, value: duration });

    // 폭을 넘긴 줄은 화면에서 잘리거나 강제로 접힌다. 재분할이 실패한 자리라 반드시 알려야 한다.
    const widest = Math.max(...chunk.lines.map((line) => options.measure(line)));
    if (widest > options.maxWidth) issues.push({ kind: 'overflow', index, value: widest });

    const next = chunks[index + 1];
    if (next && next.start < chunk.end) issues.push({ kind: 'overlap', index, value: chunk.end - next.start });
  });

  return issues;
}

/** 화면 요약용 집계. 종류별 개수와 가장 빠른 구간을 함께 돌려준다. */
export function summarize(chunks: readonly Chunk[], issues: readonly QualityIssue[]) {
  const counts: Record<string, number> = {};
  for (const issue of issues) counts[issue.kind] = (counts[issue.kind] ?? 0) + 1;

  const speeds = chunks.map(charactersPerSecond).filter((value) => Number.isFinite(value));
  const peakCps = speeds.length > 0 ? Math.max(...speeds) : 0;
  const totalDuration = chunks.reduce((total, chunk) => total + (chunk.end - chunk.start), 0);

  return { counts, peakCps, chunkCount: chunks.length, totalDuration };
}
