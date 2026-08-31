/**
 * 댓글 기능 설정.
 *
 * 값은 전부 환경변수로 주입한다. 저장 위치와 한도를 코드에 박지 않는 이유:
 * 로컬(파일)·서버리스(외부 저장소)에서 실행 조건이 다르고, 운영 중 한도를 조정하게 되기 때문이다.
 */

export interface CommentConfig {
  /** 저장 방식. file은 로컬 개발용, memory는 쓰기 불가 환경의 임시 동작. */
  driver: 'file' | 'memory';
  /** driver가 file일 때 쓰는 JSON 파일 경로. */
  filePath: string;
  maxBodyLength: number;
  maxAuthorLength: number;
  /** 대댓글 최대 깊이. 1이면 원댓글에만 답글을 달 수 있다. */
  maxDepth: number;
  /** 한 페이지에서 한 번에 내려주는 최대 개수. */
  pageSize: number;
  /** 같은 작성자가 연속으로 쓸 때 요구하는 최소 간격(ms). 도배를 막는 최소 장치다. */
  minIntervalMs: number;
}

const DEFAULTS = {
  filePath: '.data/comments.json',
  maxBodyLength: 2000,
  maxAuthorLength: 24,
  maxDepth: 3,
  pageSize: 200,
  minIntervalMs: 3000,
} as const;

function readNumber(raw: string | undefined, fallback: number): number {
  if (!raw) return fallback;
  const parsed = Number(raw);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

export function loadCommentConfig(env: Record<string, string | undefined> = process.env): CommentConfig {
  const driver = env.COMMENTS_DRIVER === 'memory' ? 'memory' : 'file';
  return {
    driver,
    filePath: env.COMMENTS_FILE?.trim() || DEFAULTS.filePath,
    maxBodyLength: readNumber(env.COMMENTS_MAX_BODY, DEFAULTS.maxBodyLength),
    maxAuthorLength: readNumber(env.COMMENTS_MAX_AUTHOR, DEFAULTS.maxAuthorLength),
    maxDepth: readNumber(env.COMMENTS_MAX_DEPTH, DEFAULTS.maxDepth),
    pageSize: readNumber(env.COMMENTS_PAGE_SIZE, DEFAULTS.pageSize),
    minIntervalMs: readNumber(env.COMMENTS_MIN_INTERVAL_MS, DEFAULTS.minIntervalMs),
  };
}
