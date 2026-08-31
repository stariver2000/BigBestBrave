/** 댓글 계층의 공개 진입점. 라우트는 이 파일만 import한다. */

export { loadCommentConfig, type CommentConfig } from './config';
export {
  ANONYMOUS_AUTHOR,
  buildThread,
  countComments,
  depthOf,
  normalizeAuthor,
  normalizeBody,
  type Comment,
  type CommentNode,
  type NewComment,
  type ValidationError,
} from './model';
export { addComment, commentLimits, listThread, type AddResult } from './service';
export type { CommentStore } from './store';
