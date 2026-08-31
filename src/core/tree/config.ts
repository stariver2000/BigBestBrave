/** 페이지 트리의 구조적 제약. */

/** 트리 최대 깊이. 루트가 1층이고, 10층까지 내려갈 수 있다. */
export const MAX_DEPTH = 10;

/** URL 경로 구분자와 루트 경로. */
export const PATH_SEPARATOR = '/';
export const ROOT_PATH = '/';

/** slug에 허용하는 문자. 소문자, 숫자, 하이픈만 쓴다(도메인은 그대로 두고 경로만 갈라지므로 안정성이 중요). */
export const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

/** 루트 노드의 id. 모든 경로 탐색의 출발점이다. */
export const ROOT_ID = 'root';
