/** 맥 저장 계층의 공개 진입점. */

import { Pool } from 'pg';
import { readPulseConfig } from './config';
import { FilePulseStore } from './file-store';
import { HttpPulseStore } from './http-store';
import { MemoryPulseStore } from './memory-store';
import { PostgresPulseStore } from './postgres-store';
import type { PulseStore } from './store';

export { readPulseConfig, type PulseConfig } from './config';
export { PostgresPulseStore, type Queryable } from './postgres-store';
export type { PulseStore } from './store';

let store: PulseStore | null = null;
let pgPool: Pool | null = null;

/**
 * 연결 묶음은 프로세스마다 하나만 만든다.
 * 서버리스에서 요청마다 새로 연결하면 데이터베이스 쪽 연결 수가 요청 수만큼 늘어난다.
 */
function pool(databaseUrl: string): Pool {
  pgPool ??= new Pool({ connectionString: databaseUrl, max: 4 });
  return pgPool;
}

/** 설정이 고른 저장소 하나를 프로세스 안에서 나눠 쓴다. */
export function pulseStore(): PulseStore {
  if (store) return store;
  const config = readPulseConfig();
  if (config.driver === 'memory') store = new MemoryPulseStore();
  else if (config.driver === 'http') store = new HttpPulseStore(config.url);
  else if (config.driver === 'postgres') store = new PostgresPulseStore(pool(config.databaseUrl!));
  else store = new FilePulseStore(config.filePath);
  return store;
}
