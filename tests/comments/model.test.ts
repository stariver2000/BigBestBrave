import { describe, expect, it } from 'vitest';
import { buildThread, countComments, depthOf, normalizeAuthor, normalizeBody, type Comment } from '../../src/comments';

function comment(id: string, parentId: string | null, createdAt: string): Comment {
  return { id, path: '/', parentId, author: 'a', body: id, createdAt };
}

describe('댓글 스레드', () => {
  const flat = [
    comment('root-b', null, '2026-01-02T00:00:00.000Z'),
    comment('root-a', null, '2026-01-01T00:00:00.000Z'),
    comment('reply-a2', 'root-a', '2026-01-03T00:00:00.000Z'),
    comment('reply-a1', 'root-a', '2026-01-01T12:00:00.000Z'),
    comment('reply-deep', 'reply-a1', '2026-01-04T00:00:00.000Z'),
  ];

  it('부모-자식 관계로 트리를 만든다', () => {
    const thread = buildThread(flat);
    expect(thread.map((node) => node.id)).toEqual(['root-a', 'root-b']);
    expect(thread[0].replies.map((node) => node.id)).toEqual(['reply-a1', 'reply-a2']);
    expect(thread[0].replies[0].replies[0].id).toBe('reply-deep');
  });

  it('깊이를 매긴다', () => {
    const thread = buildThread(flat);
    expect(thread[0].depth).toBe(0);
    expect(thread[0].replies[0].depth).toBe(1);
    expect(thread[0].replies[0].replies[0].depth).toBe(2);
  });

  it('부모가 사라진 답글도 잃어버리지 않고 원댓글로 올린다', () => {
    const orphan = [comment('lost', 'gone', '2026-01-01T00:00:00.000Z')];
    expect(buildThread(orphan).map((node) => node.id)).toEqual(['lost']);
  });

  it('전체 개수는 답글까지 센다', () => {
    expect(countComments(buildThread(flat))).toBe(flat.length);
  });

  it('부모 사슬을 따라 깊이를 계산한다', () => {
    expect(depthOf(flat, null)).toBe(0);
    expect(depthOf(flat, 'root-a')).toBe(1);
    expect(depthOf(flat, 'reply-a1')).toBe(2);
  });
});

describe('입력 정리', () => {
  it('연속된 빈 줄을 하나로 줄이고 앞뒤 공백을 없앤다', () => {
    expect(normalizeBody('  가\n\n\n\n나  ')).toBe('가\n\n나');
  });

  it('이름이 비면 기본값을 쓴다', () => {
    expect(normalizeAuthor('   ', '익명')).toBe('익명');
    expect(normalizeAuthor('  홍   길동 ', '익명')).toBe('홍 길동');
  });
});
