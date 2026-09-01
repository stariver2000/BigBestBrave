/**
 * 바깥 서비스에 맡기는 저장소.
 *
 * 서버리스에서는 파일이 남지 않고 인스턴스마다 메모리가 따로 논다. 그래서 셈을 한곳에 모으려면
 * 밖에 작은 서비스가 하나 있어야 한다(services/pulse). 이 구현은 그 서비스와 말을 주고받을 뿐이다.
 *
 * 그 서비스가 꺼져 있어도 사이트는 그대로 동작해야 한다. 쓰기 실패는 부르는 쪽이 삼키고,
 * 읽기 실패는 숨기지 않고 던진다 — 0과 "모른다"는 다른 말이라, 0으로 보여 주면 거짓이 된다.
 */

import { emptyTally, type Tally } from '../core/pulse';
import type { PulseStore } from './store';

/** 이보다 오래 걸리면 포기한다. 셈 때문에 화면이 기다리는 일은 없어야 한다. */
const TIMEOUT_MS = 1500;

export class HttpPulseStore implements PulseStore {
  constructor(private readonly baseUrl: string) {}

  private async call(path: string, init?: RequestInit): Promise<Response> {
    return fetch(`${this.baseUrl}${path}`, { ...init, signal: AbortSignal.timeout(TIMEOUT_MS) });
  }

  async read(path: string): Promise<Tally> {
    const response = await this.call(`/pulse?path=${encodeURIComponent(path)}`);
    if (!response.ok) throw new Error(`pulse-service ${response.status}`);
    const body = (await response.json()) as { tally?: Tally };
    return body.tally ?? emptyTally();
  }

  async readAll(): Promise<Record<string, Tally>> {
    const response = await this.call('/pulse');
    if (!response.ok) throw new Error(`pulse-service ${response.status}`);
    const body = (await response.json()) as { pages?: Record<string, Tally> };
    return body.pages ?? {};
  }

  async bump(path: string, kinds: readonly string[]): Promise<Tally> {
    await this.call('/pulse', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ path, kinds }),
    });
    // 올린 뒤의 셈이 굳이 필요하지 않다. 되읽으려고 한 번 더 다녀오지 않는다.
    return emptyTally();
  }
}
