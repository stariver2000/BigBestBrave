/** 재분할 결과를 SRT / WebVTT 문자열로 되돌린다. */

import { formatTimecode } from './timecode';
import type { Chunk, SubtitleFormat } from './types';

export function formatSubtitle(chunks: readonly Chunk[], format: SubtitleFormat): string {
  const blocks = chunks.map((chunk, index) => {
    const timing = `${formatTimecode(chunk.start, format)} --> ${formatTimecode(chunk.end, format)}`;
    const body = chunk.lines.join('\n');
    // SRT는 번호 줄이 필수이고 VTT는 선택이라 넣지 않는다.
    return format === 'srt' ? `${index + 1}\n${timing}\n${body}` : `${timing}\n${body}`;
  });

  const document = blocks.join('\n\n');
  return format === 'vtt' ? `WEBVTT\n\n${document}\n` : `${document}\n`;
}
