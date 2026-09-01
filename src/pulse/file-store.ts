/**
 * JSON 파일 저장소.
 *
 * 댓글 저장소와 같은 방식이다 — 읽고-고치고-쓰는 사이가 겹치면 셈이 사라지므로 락으로 감싸고,
 * 임시 파일에 쓴 뒤 이름을 바꾼다. 다만 여기 담기는 것은 글이 아니라 정수 네 개씩이라 파일이 작다.
 */

import { mkdir, readFile, rename, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';
import { ConcurrencyLock } from '../core/concurrency';
import { applyKinds, emptyTally, type Tally } from '../core/pulse';
import type { PulseStore } from './store';

const WRITE_CONCURRENCY = 1;
const WRITE_QUEUE_TIMEOUT_MS = 5000;

export class FilePulseStore implements PulseStore {
  private readonly lock = new ConcurrencyLock(WRITE_CONCURRENCY, WRITE_QUEUE_TIMEOUT_MS);

  constructor(private readonly filePath: string) {}

  private async readAllRaw(): Promise<Record<string, Tally>> {
    try {
      const raw = await readFile(this.filePath, 'utf8');
      const parsed = JSON.parse(raw) as unknown;
      return parsed && typeof parsed === 'object' ? (parsed as Record<string, Tally>) : {};
    } catch {
      // 아직 파일이 없거나 내용이 깨졌으면 빈 셈에서 시작한다.
      return {};
    }
  }

  async read(path: string): Promise<Tally> {
    const all = await this.readAllRaw();
    return all[path] ?? emptyTally();
  }

  async readAll(): Promise<Record<string, Tally>> {
    return this.readAllRaw();
  }

  async bump(path: string, kinds: readonly string[]): Promise<Tally> {
    return this.lock.run(async () => {
      const all = await this.readAllRaw();
      const next = applyKinds(all[path] ?? emptyTally(), kinds);
      all[path] = next;

      await mkdir(dirname(this.filePath), { recursive: true });
      const temporaryPath = `${this.filePath}.tmp`;
      await writeFile(temporaryPath, JSON.stringify(all, null, 2), 'utf8');
      await rename(temporaryPath, this.filePath);
      return next;
    });
  }
}
