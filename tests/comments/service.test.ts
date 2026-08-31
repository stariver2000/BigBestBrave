import { describe, expect, it } from 'vitest';
import { mkdtemp, readFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { FileCommentStore } from '../../src/comments/file-store';
import type { Comment } from '../../src/comments';

function comment(id: string, path: string): Comment {
  return { id, path, parentId: null, author: 'a', body: id, createdAt: new Date().toISOString() };
}

describe('파일 저장소', () => {
  it('동시에 들어온 쓰기가 서로를 덮어쓰지 않는다', async () => {
    const directory = await mkdtemp(join(tmpdir(), 'bbb-comments-'));
    const store = new FileCommentStore(join(directory, 'comments.json'));

    // 락이 없으면 읽기-쓰기 사이가 겹쳐 마지막 하나만 남는다.
    await Promise.all(
      Array.from({ length: 12 }, (_, index) => store.add(comment(`c${index}`, '/'))),
    );

    const saved = await store.list('/', 100);
    expect(saved).toHaveLength(12);
  });

  it('경로별로 목록을 나눈다', async () => {
    const directory = await mkdtemp(join(tmpdir(), 'bbb-comments-'));
    const store = new FileCommentStore(join(directory, 'comments.json'));
    await store.add(comment('a', '/'));
    await store.add(comment('b', '/design'));
    expect((await store.list('/', 100)).map((item) => item.id)).toEqual(['a']);
    expect((await store.list('/design', 100)).map((item) => item.id)).toEqual(['b']);
  });

  it('사람이 읽을 수 있는 JSON으로 남긴다', async () => {
    const directory = await mkdtemp(join(tmpdir(), 'bbb-comments-'));
    const file = join(directory, 'nested', 'comments.json');
    const store = new FileCommentStore(file);
    await store.add(comment('a', '/'));
    const raw = await readFile(file, 'utf8');
    expect(raw).toContain('\n  {');
  });
});
