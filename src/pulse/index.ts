/** 맥 저장 계층의 공개 진입점. */

import { readPulseConfig } from './config';
import { FilePulseStore } from './file-store';
import { HttpPulseStore } from './http-store';
import { MemoryPulseStore } from './memory-store';
import type { PulseStore } from './store';

export { readPulseConfig, type PulseConfig } from './config';
export type { PulseStore } from './store';

let store: PulseStore | null = null;

/** 설정이 고른 저장소 하나를 프로세스 안에서 나눠 쓴다. */
export function pulseStore(): PulseStore {
  if (store) return store;
  const config = readPulseConfig();
  if (config.driver === 'memory') store = new MemoryPulseStore();
  else if (config.driver === 'http') store = new HttpPulseStore(config.url);
  else store = new FilePulseStore(config.filePath);
  return store;
}
