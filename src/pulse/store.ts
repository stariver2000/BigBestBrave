/**
 * 맥 저장소 계약.
 *
 * 저장하는 것은 페이지마다 네 개의 수뿐이다. 그래서 어떤 구현이든 한 줄 갱신으로 끝나고,
 * 페이지가 수백 장으로 늘어도 저장소가 하는 일은 늘지 않는다.
 * 나중에 외부 저장소(파이썬 서비스든 DB든)가 필요해지면 이 계약만 새로 구현한다.
 */

import type { Tally } from '../core/pulse';

export interface PulseStore {
  /** 한 페이지의 셈. 없으면 빈 셈. */
  read(path: string): Promise<Tally>;
  /** 모든 페이지의 셈. 지표 화면이 한 번에 읽는다. */
  readAll(): Promise<Record<string, Tally>>;
  /** 사건들을 더하고 더해진 셈을 돌려준다. */
  bump(path: string, kinds: readonly string[]): Promise<Tally>;
}
