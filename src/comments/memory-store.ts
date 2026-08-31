/**
 * 메모리 저장소.
 *
 * 파일을 쓸 수 없는 환경(서버리스 등)에서 기능이 죽지 않게 하는 대체 구현이다.
 * 프로세스가 내려가면 사라지므로 운영용이 아니며, 그 사실을 호출부가 알 수 있게 durable=false를 노출한다.
 */

import type { Comment } from './model';
import type { CommentStore } from './store';

export class MemoryCommentStore implements CommentStore {
  readonly durable = false;
  private readonly comments: Comment[] = [];

  async list(path: string, limit: number): Promise<Comment[]> {
    return this.comments.filter((comment) => comment.path === path).slice(-limit);
  }

  async add(comment: Comment): Promise<Comment> {
    this.comments.push(comment);
    return comment;
  }
}
