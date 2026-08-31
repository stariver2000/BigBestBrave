/**
 * JSON 파일 저장소.
 *
 * 읽고-고치고-쓰는 사이에 다른 쓰기가 끼어들면 글이 통째로 사라지므로 전 과정을 락으로 감싼다.
 * 쓰기는 임시 파일에 먼저 하고 이름을 바꾼다(원자적 교체). 도중에 프로세스가 죽어도
 * 반쯤 쓰인 JSON이 남지 않게 하기 위함이다.
 */

import { mkdir, readFile, rename, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';
import { ConcurrencyLock } from '../core/concurrency';
import type { Comment } from './model';
import type { CommentStore } from './store';

/** 파일 저장소는 한 번에 하나의 쓰기만 허용한다. */
const WRITE_CONCURRENCY = 1;
const WRITE_QUEUE_TIMEOUT_MS = 5000;

export class FileCommentStore implements CommentStore {
  readonly durable = true;
  private readonly lock = new ConcurrencyLock(WRITE_CONCURRENCY, WRITE_QUEUE_TIMEOUT_MS);

  constructor(private readonly filePath: string) {}

  private async readAll(): Promise<Comment[]> {
    try {
      const raw = await readFile(this.filePath, 'utf8');
      const parsed = JSON.parse(raw) as unknown;
      return Array.isArray(parsed) ? (parsed as Comment[]) : [];
    } catch {
      // 파일이 아직 없거나 내용이 깨졌으면 빈 목록에서 시작한다.
      return [];
    }
  }

  private async writeAll(comments: Comment[]): Promise<void> {
    await mkdir(dirname(this.filePath), { recursive: true });
    const temporaryPath = `${this.filePath}.tmp`;
    await writeFile(temporaryPath, JSON.stringify(comments, null, 2), 'utf8');
    await rename(temporaryPath, this.filePath);
  }

  async list(path: string, limit: number): Promise<Comment[]> {
    const all = await this.readAll();
    return all.filter((comment) => comment.path === path).slice(-limit);
  }

  async add(comment: Comment): Promise<Comment> {
    return this.lock.run(async () => {
      const all = await this.readAll();
      all.push(comment);
      await this.writeAll(all);
      return comment;
    });
  }
}
