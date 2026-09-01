/**
 * 관찰을 구간으로 나눈다.
 *
 * 사물은 "3시간 12분 만에 왔다"처럼 세지 않는다. "금방 또 왔다" 정도로 안다.
 * 그래서 숫자를 몇 개의 구간으로 접고, 일기는 그 구간만 보고 쓴다.
 */

import { AWAY_RESTLESS, HOUR_BANDS, RETURN_BANDS, STAY_BANDS } from './config';
import type { Mood, Observation } from './types';

export function hourBand(hour: number): string {
  const found = HOUR_BANDS.find((band) =>
    // 밤은 자정을 넘어가므로 시작이 끝보다 크다. 그 경우만 따로 본다.
    band.from < band.to ? hour >= band.from && hour < band.to : hour >= band.from || hour < band.to,
  );
  return found ? found.id : 'night';
}

export function returnBand(sinceLast: number | null): string {
  if (sinceLast === null) return 'first';
  const found = RETURN_BANDS.find((band) => band.id !== 'first' && sinceLast <= band.max);
  return found ? found.id : 'distant';
}

export function stayBand(stay: number): string {
  const found = STAY_BANDS.find((band) => stay <= band.max);
  return found ? found.id : 'long';
}

/** 관찰에서 기분을 정한다. 먼저 걸리는 것이 이긴다. */
export function moodOf(observation: Observation): Mood {
  const back = returnBand(observation.sinceLast);
  if (back === 'first') return 'curious';
  if (back === 'soon') return 'restless';
  if (back === 'distant') return 'lonely';
  // 머무는 동안 자리를 자꾸 비우면, 오래 머물렀더라도 차분해지지 않는다.
  if (observation.away >= AWAY_RESTLESS) return 'restless';
  if (stayBand(observation.stay) === 'long') return 'content';
  return 'settled';
}

/**
 * 다음 구간까지 얼마나 남았는가.
 *
 * 사물이 일기를 다시 쓰는 것은 머문 구간이 바뀔 때다. 그 사정을 화면이 말해 주면
 * 사람은 사물이 언제 움직일지 알고 기다릴 수 있다 — 언제 움직일지 모르는 것은 그냥 고장 난 것처럼 보인다.
 * 마지막 구간에 이르면 더 넘어갈 곳이 없으므로 null이다.
 */
export function nextStayBand(stay: number): { id: string; inMs: number } | null {
  const current = stayBand(stay);
  const index = STAY_BANDS.findIndex((band) => band.id === current);
  const next = STAY_BANDS[index + 1];
  if (!next || !Number.isFinite(STAY_BANDS[index].max)) return null;
  return { id: next.id, inMs: Math.max(0, STAY_BANDS[index].max - stay) };
}
