/**
 * 댓글 저장소 계약.
 *
 * 구현을 갈아 끼울 수 있게 인터페이스만 둔다. 지금은 파일과 메모리 두 가지가 있고,
 * 배포 환경에서 지속 저장이 필요해지면 같은 계약으로 외부 DB 구현을 추가한다.
 */

import type { Comment } from './model';

export interface CommentStore {
  /** 한 페이지의 댓글을 오래된 순으로 돌려준다. */
  list(path: string, limit: number): Promise<Comment[]>;
  /** 저장 후 저장된 댓글을 돌려준다. */
  add(comment: Comment): Promise<Comment>;
}
