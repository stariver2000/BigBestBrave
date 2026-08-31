/** 경로 문자열과 slug 배열 사이의 변환. 라우팅 계층과 무관한 순수 함수만 둔다. */

import { PATH_SEPARATOR, ROOT_PATH, SLUG_PATTERN } from './config';

/** '/a/b' -> ['a','b'] . 빈 조각과 앞뒤 슬래시는 버린다. */
export function toSegments(path: string): string[] {
  return path.split(PATH_SEPARATOR).filter((segment) => segment.length > 0);
}

/** ['a','b'] -> '/a/b' . 빈 배열은 루트 경로가 된다. */
export function toPath(segments: readonly string[]): string {
  if (segments.length === 0) return ROOT_PATH;
  return PATH_SEPARATOR + segments.join(PATH_SEPARATOR);
}

export function isValidSlug(slug: string): boolean {
  return SLUG_PATTERN.test(slug);
}
