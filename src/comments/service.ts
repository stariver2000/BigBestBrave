/**
 * 댓글 서비스: 검증과 저장을 한곳에서 처리한다.
 *
 * 라우트가 직접 저장소를 만지지 않게 해서, 검증 규칙이 한 군데에만 있도록 한다.
 * 실패를 예외 대신 결과 객체로 돌려주는 이유: 사용자 입력 오류는 예외가 아니라 정상 흐름이기 때문이다.
 */

import { randomUUID } from 'node:crypto';
import { loadCommentConfig, type CommentConfig } from './config';
import { FileCommentStore } from './file-store';
import { MemoryCommentStore } from './memory-store';
import {
  ANONYMOUS_AUTHOR,
  buildThread,
  depthOf,
  normalizeAuthor,
  normalizeBody,
  type Comment,
  type CommentNode,
  type NewComment,
  type ValidationError,
} from './model';
import type { CommentStore } from './store';

export type AddResult =
  | { ok: true; comment: Comment }
  | { ok: false; error: ValidationError | 'too-fast' | 'storage-error' };

/**
 * 저장소와 설정은 프로세스 수명 동안 한 번만 만든다.
 * 라우트 핸들러는 요청마다 실행되지만 모듈은 한 번만 초기화되므로, 파일 락도 여기서 공유된다.
 */
let sharedConfig: CommentConfig | null = null;
let sharedStore: CommentStore | null = null;
/** 도배 방지용 마지막 작성 시각. 키는 작성자 지문(경로+이름)이다. */
const lastPostAt = new Map<string, number>();

function service(): { config: CommentConfig; store: CommentStore } {
  if (!sharedConfig || !sharedStore) {
    sharedConfig = loadCommentConfig();
    sharedStore =
      sharedConfig.driver === 'file'
        ? new FileCommentStore(sharedConfig.filePath)
        : new MemoryCommentStore();
  }
  return { config: sharedConfig, store: sharedStore };
}

export async function listThread(path: string): Promise<CommentNode[]> {
  const { config, store } = service();
  const comments = await store.list(path, config.pageSize);
  return buildThread(comments);
}

function validate(
  input: NewComment,
  existing: readonly Comment[],
  config: CommentConfig,
): ValidationError | null {
  const body = normalizeBody(input.body);
  if (body.length === 0) return 'empty-body';
  if (body.length > config.maxBodyLength) return 'body-too-long';
  if (input.author.trim().length > config.maxAuthorLength) return 'author-too-long';
  if (input.parentId !== null) {
    const parent = existing.find((comment) => comment.id === input.parentId);
    if (!parent) return 'unknown-parent';
    // 부모의 깊이가 이미 한도면 그 아래로는 더 달 수 없다.
    if (depthOf(existing, input.parentId) + 1 > config.maxDepth) return 'too-deep';
  }
  return null;
}

export async function addComment(input: NewComment): Promise<AddResult> {
  const { config, store } = service();
  const existing = await store.list(input.path, config.pageSize);

  const problem = validate(input, existing, config);
  if (problem) return { ok: false, error: problem };

  const author = normalizeAuthor(input.author, ANONYMOUS_AUTHOR);
  const fingerprint = `${input.path}::${author}`;
  const previous = lastPostAt.get(fingerprint);
  if (previous !== undefined && Date.now() - previous < config.minIntervalMs) {
    return { ok: false, error: 'too-fast' };
  }

  const comment: Comment = {
    id: randomUUID(),
    path: input.path,
    parentId: input.parentId,
    author,
    body: normalizeBody(input.body),
    createdAt: new Date().toISOString(),
  };

  try {
    const saved = await store.add(comment);
    lastPostAt.set(fingerprint, Date.now());
    return { ok: true, comment: saved };
  } catch {
    return { ok: false, error: 'storage-error' };
  }
}

/** 화면이 입력 한도를 미리 알 수 있게 노출한다. */
export function commentLimits(): { maxBodyLength: number; maxAuthorLength: number; maxDepth: number } {
  const { config } = service();
  return {
    maxBodyLength: config.maxBodyLength,
    maxAuthorLength: config.maxAuthorLength,
    maxDepth: config.maxDepth,
  };
}
