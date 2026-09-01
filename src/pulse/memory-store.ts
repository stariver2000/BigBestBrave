/**
 * 메모리 저장소.
 *
 * 파일을 쓸 수 없는 환경(서버리스)에서 쓴다. 인스턴스가 죽으면 사라지고, 인스턴스마다 따로 센다.
 * 그래도 기능이 멈추는 것보다는 낫다 — 이 수는 없어도 페이지는 그대로 동작한다.
 */

import { applyKinds, emptyTally, type Tally } from '../core/pulse';
import type { PulseStore } from './store';

export class MemoryPulseStore implements PulseStore {
  private readonly tallies = new Map<string, Tally>();

  async read(path: string): Promise<Tally> {
    return this.tallies.get(path) ?? emptyTally();
  }

  async readAll(): Promise<Record<string, Tally>> {
    return Object.fromEntries(this.tallies);
  }

  async bump(path: string, kinds: readonly string[]): Promise<Tally> {
    const next = applyKinds(this.tallies.get(path) ?? emptyTally(), kinds);
    this.tallies.set(path, next);
    return next;
  }
}
