/**
 * 표 2와 5장에서 다시 계산해 내는 값.
 */

import { NUDGES, SERVERS, STUDY, type NudgeId } from './config';

/** 열한 서버가 보낸 귓속말의 합. */
export function totalNudges(): number {
  return SERVERS.reduce((sum, row) => sum + row.nudges, 0);
}

/** 연구 기간(14일)을 넘겨 제 발로 계속 쓴 서버 수. 본문은 여섯이라 적었다. */
export function continuedServers(): number {
  return SERVERS.filter((row) => row.days > STUDY.minDays).length;
}

/** 가장 오래 쓴 날수와 가장 짧은 날수. */
export function dayRange(): { min: number; max: number } {
  const days = SERVERS.map((row) => row.days);
  return { min: Math.min(...days), max: Math.max(...days) };
}

/** 귓속말을 가장 많이 보낸 서버와 회원이 가장 많은 서버. 둘은 같은 서버가 아니다. */
export function heaviestUser() {
  return [...SERVERS].sort((a, b) => b.nudges - a.nudges)[0];
}

export function largestServer() {
  return [...SERVERS].sort((a, b) => b.members - a.members)[0];
}

/** 등록 사례 86건 가운데 이 귓속말의 몫(%). */
export function nudgeShare(id: NudgeId): number {
  const nudge = NUDGES.find((entry) => entry.id === id);
  if (nudge === undefined) throw new Error(`unknown nudge: ${id}`);
  const total = NUDGES.reduce((sum, entry) => sum + entry.catalogedUses, 0);
  return (nudge.catalogedUses / total) * 100;
}

/** 등록 사례의 귓속말별 합. 86이어야 한다. */
export function catalogedSum(): number {
  return NUDGES.reduce((sum, entry) => sum + entry.catalogedUses, 0);
}
