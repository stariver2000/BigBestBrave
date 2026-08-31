/**
 * 댓글 자료 모델과 순수 변환.
 *
 * 저장소와 화면 어느 쪽에도 의존하지 않는다. 스레드로 엮는 계산도 여기 순수 함수로 둔다.
 */

/** 저장되는 형태. 평평한 목록으로 두고 화면에서 트리로 엮는다. */
export interface Comment {
  id: string;
  /** 이 댓글이 달린 페이지의 절대 경로. 트리 좌표가 곧 댓글의 소속이다. */
  path: string;
  /** 답글이면 부모 댓글 id, 원댓글이면 null. */
  parentId: string | null;
  author: string;
  body: string;
  /** ISO 8601 문자열. 저장 형식이 사람이 읽을 수 있어야 나중에 손으로 확인하기 쉽다. */
  createdAt: string;
}

/** 화면이 쓰는 형태. 자식을 품은 트리다. */
export interface CommentNode extends Comment {
  depth: number;
  replies: CommentNode[];
}

/**
 * 이름을 비운 사람에게 붙는 표식.
 * 저장값을 언어 중립으로 두는 이유: 한국어 사용자가 남긴 글을 일본어 사용자가 볼 때도
 * 각자의 언어로 '익명'이 보여야 하기 때문이다. 번역은 화면이 한다.
 */
export const ANONYMOUS_AUTHOR = 'anonymous';

export interface NewComment {
  path: string;
  parentId: string | null;
  author: string;
  body: string;
}

export type ValidationError =
  | 'empty-body'
  | 'body-too-long'
  | 'author-too-long'
  | 'unknown-parent'
  | 'too-deep';

/** 앞뒤 공백과 연속 빈 줄을 정리한다. 저장 전에 한 번만 거친다. */
export function normalizeBody(raw: string): string {
  return raw.replace(/\r\n/g, '\n').replace(/\n{3,}/g, '\n\n').trim();
}

export function normalizeAuthor(raw: string, fallback: string): string {
  const trimmed = raw.trim().replace(/\s+/g, ' ');
  return trimmed.length > 0 ? trimmed : fallback;
}

/** 부모를 따라 올라가며 깊이를 센다. 원댓글이 0이다. */
export function depthOf(comments: readonly Comment[], parentId: string | null): number {
  let depth = 0;
  let current = parentId;
  // 자기 부모가 자신인 순환은 저장 단계에서 막지만, 여기서도 목록 길이를 상한으로 두어 멈춘다.
  for (let guard = 0; guard <= comments.length && current !== null; guard += 1) {
    const parent = comments.find((comment) => comment.id === current);
    if (!parent) break;
    depth += 1;
    current = parent.parentId;
  }
  return depth;
}

/**
 * 평평한 목록을 트리로 엮는다.
 * 원댓글은 오래된 순, 답글도 오래된 순으로 정렬한다. 대화의 흐름이 위에서 아래로 읽히게 하기 위함이다.
 */
export function buildThread(comments: readonly Comment[]): CommentNode[] {
  const byId = new Map<string, CommentNode>();
  for (const comment of comments) {
    byId.set(comment.id, { ...comment, depth: 0, replies: [] });
  }

  const roots: CommentNode[] = [];
  for (const node of byId.values()) {
    const parent = node.parentId === null ? undefined : byId.get(node.parentId);
    if (parent) {
      parent.replies.push(node);
    } else {
      // 부모가 삭제됐거나 다른 페이지의 것이면 원댓글로 취급해 글이 사라지지 않게 한다.
      roots.push(node);
    }
  }

  const byTime = (a: CommentNode, b: CommentNode) => a.createdAt.localeCompare(b.createdAt);
  const assignDepth = (nodes: CommentNode[], depth: number) => {
    nodes.sort(byTime);
    for (const node of nodes) {
      node.depth = depth;
      assignDepth(node.replies, depth + 1);
    }
  };
  assignDepth(roots, 0);
  return roots;
}

export function countComments(nodes: readonly CommentNode[]): number {
  return nodes.reduce((total, node) => total + 1 + countComments(node.replies), 0);
}
