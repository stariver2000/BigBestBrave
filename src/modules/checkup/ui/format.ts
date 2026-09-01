/** 화면에 숫자를 적기 위한 변환. 계산이 아니라 표기라서 코어가 아닌 여기에 둔다. */

import { DURATION_UNITS, INSTANT_SECONDS } from '../config';

export interface Duration {
  /** 단위 사전 키. INSTANT_SECONDS보다 짧으면 null이다. */
  unitKey: string | null;
  amount: number;
}

/** 초를 사람이 읽는 가장 큰 단위로 바꾼다. */
export function toDuration(seconds: number): Duration {
  if (seconds < INSTANT_SECONDS) return { unitKey: null, amount: 0 };
  for (const unit of DURATION_UNITS) {
    if (seconds >= unit.seconds) return { unitKey: unit.key, amount: seconds / unit.seconds };
  }
  return { unitKey: 'unit-second', amount: seconds };
}

/** 큰 수는 유효 숫자 세 자리까지만 적는다. 뒤의 자리는 어차피 어림이다. */
export function compact(value: number, locale: string): string {
  if (!Number.isFinite(value)) return '∞';
  if (value >= 1e15) {
    const exponent = Math.floor(Math.log10(value));
    return `10^${exponent}`;
  }
  const rounded = value >= 100 ? Math.round(value) : Number(value.toPrecision(3));
  return new Intl.NumberFormat(locale, { maximumFractionDigits: 2 }).format(rounded);
}

/** 0.001 같은 작은 확률을 백분율로. */
export function percent(value: number, locale: string): string {
  return new Intl.NumberFormat(locale, {
    style: 'percent',
    maximumSignificantDigits: 2,
  }).format(value);
}

/** 해시를 눈으로 세기 좋게 덩이로 자른다. */
export function group(text: string, size: number): string[] {
  const chunks: string[] = [];
  for (let at = 0; at < text.length; at += size) chunks.push(text.slice(at, at + size));
  return chunks;
}
