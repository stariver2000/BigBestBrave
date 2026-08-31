/** 타임코드 문자열과 밀리초의 상호 변환. */

import type { SubtitleFormat } from './types';

/** SRT는 쉼표, VTT는 마침표로 밀리초를 구분한다. 두 표기를 모두 받아 읽는다. */
const TIMECODE = /^(?:(\d+):)?(\d{1,2}):(\d{2})[.,](\d{1,3})$/;

export function parseTimecode(raw: string): number | null {
  const match = TIMECODE.exec(raw.trim());
  if (!match) return null;
  const [, hours, minutes, seconds, fraction] = match;
  // 밀리초 자리가 3자리보다 짧으면 뒤를 0으로 채운다('.5'는 500ms다).
  const millis = Number(fraction.padEnd(3, '0'));
  return Number(hours ?? 0) * 3600000 + Number(minutes) * 60000 + Number(seconds) * 1000 + millis;
}

function pad(value: number, length: number): string {
  return String(Math.floor(value)).padStart(length, '0');
}

export function formatTimecode(ms: number, format: SubtitleFormat): string {
  const clamped = Math.max(0, Math.round(ms));
  const hours = clamped / 3600000;
  const minutes = (clamped % 3600000) / 60000;
  const seconds = (clamped % 60000) / 1000;
  const millis = clamped % 1000;
  const separator = format === 'srt' ? ',' : '.';
  return `${pad(hours, 2)}:${pad(minutes, 2)}:${pad(seconds, 2)}${separator}${pad(millis, 3)}`;
}
