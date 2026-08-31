/**
 * SRT / WebVTT 읽기.
 *
 * 두 형식은 시간 구분자와 머리말만 다르고 구조가 같아 하나의 해석기로 처리한다.
 * 해석하지 못한 덩어리는 버리되 개수를 세어 돌려준다. 조용히 사라지면 사용자가 알 수 없기 때문이다.
 */

import { parseTimecode } from './timecode';
import type { Cue, ParseResult, SubtitleFormat } from './types';

const ARROW = '-->';
const VTT_HEADER = /^WEBVTT/;

/** 원본의 줄바꿈은 재분할 대상이므로 공백 하나로 접는다. */
function foldLines(lines: string[]): string {
  return lines.join(' ').replace(/\s+/g, ' ').trim();
}

function parseBlock(block: string[]): Cue | null {
  const timingIndex = block.findIndex((line) => line.includes(ARROW));
  if (timingIndex < 0) return null;

  const [rawStart, rawEnd] = block[timingIndex].split(ARROW);
  const start = parseTimecode(rawStart);
  // VTT의 타이밍 줄에는 위치 지정자가 뒤에 붙을 수 있어 첫 토큰만 취한다.
  const end = parseTimecode((rawEnd ?? '').trim().split(/\s+/)[0] ?? '');
  if (start === null || end === null || end <= start) return null;

  const text = foldLines(block.slice(timingIndex + 1));
  if (text.length === 0) return null;
  return { start, end, text };
}

export function detectFormat(source: string): SubtitleFormat {
  return VTT_HEADER.test(source.trimStart()) ? 'vtt' : 'srt';
}

export function parseSubtitle(source: string): ParseResult {
  const format = detectFormat(source);
  const normalized = source.replace(/\r\n?/g, '\n');
  const blocks = normalized.split(/\n{2,}/);

  const cues: Cue[] = [];
  let skipped = 0;
  for (const raw of blocks) {
    const lines = raw.split('\n').filter((line) => line.trim().length > 0);
    if (lines.length === 0) continue;
    // VTT 머리말과 NOTE 블록은 자막이 아니므로 실패로 세지 않는다.
    if (VTT_HEADER.test(lines[0]) || lines[0].startsWith('NOTE')) continue;

    const cue = parseBlock(lines);
    if (cue) cues.push(cue);
    else skipped += 1;
  }

  cues.sort((a, b) => a.start - b.start);
  return { cues, format, skipped };
}
