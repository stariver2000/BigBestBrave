/**
 * 노드 등록과 경로 해석.
 *
 * 전역 Map 하나에 노드를 모으고, 경로 문자열 -> 노드 색인을 함께 유지한다.
 * 경로 색인을 미리 만들어 두는 이유: 트리가 10층·수백 노드로 자라도 요청당 탐색이 O(1)이어야 하기 때문.
 */

import { MAX_DEPTH, ROOT_ID } from './config';
import { isValidSlug, toPath, toSegments } from './path';
import type { PageNode } from './model';

const nodesById = new Map<string, PageNode>();
const nodeIdByPath = new Map<string, string>();
const childIdsByParent = new Map<string | null, string[]>();

export class TreeRegistrationError extends Error {}

/** 조상 slug를 이어 붙여 절대 경로를 만든다. 부모가 아직 없으면 예외를 던진다. */
function computePath(node: PageNode): string {
  const segments: string[] = [];
  let current: PageNode | undefined = node;
  // 루트에 닿을 때까지 위로 거슬러 올라간 뒤 뒤집는다.
  while (current && current.parentId !== null) {
    segments.unshift(current.slug);
    const parent: PageNode | undefined = nodesById.get(current.parentId);
    if (!parent) {
      throw new TreeRegistrationError(`부모 노드를 찾을 수 없습니다: ${current.parentId}`);
    }
    current = parent;
  }
  return toPath(segments);
}

export function registerNode(node: PageNode): PageNode {
  if (nodesById.has(node.id)) {
    throw new TreeRegistrationError(`이미 등록된 노드 id입니다: ${node.id}`);
  }
  if (node.parentId === null && node.id !== ROOT_ID) {
    throw new TreeRegistrationError(`루트는 하나뿐입니다. id를 '${ROOT_ID}'로 두세요: ${node.id}`);
  }
  if (node.parentId !== null && !isValidSlug(node.slug)) {
    throw new TreeRegistrationError(`slug 형식이 올바르지 않습니다: '${node.slug}'`);
  }

  nodesById.set(node.id, node);
  const path = computePath(node);
  if (depthOfPath(path) > MAX_DEPTH) {
    nodesById.delete(node.id);
    throw new TreeRegistrationError(`트리 최대 깊이(${MAX_DEPTH})를 넘었습니다: ${path}`);
  }
  if (nodeIdByPath.has(path)) {
    nodesById.delete(node.id);
    throw new TreeRegistrationError(`경로가 중복됩니다: ${path}`);
  }
  nodeIdByPath.set(path, node.id);

  const siblings = childIdsByParent.get(node.parentId) ?? [];
  siblings.push(node.id);
  childIdsByParent.set(node.parentId, siblings);
  return node;
}

/** 루트를 1층으로 센다. '/'는 1, '/a'는 2. */
function depthOfPath(path: string): number {
  return toSegments(path).length + 1;
}

export function nodeById(id: string): PageNode | undefined {
  return nodesById.get(id);
}

export function nodeByPath(path: string): PageNode | undefined {
  const id = nodeIdByPath.get(toPath(toSegments(path)));
  return id ? nodesById.get(id) : undefined;
}

export function nodeBySegments(segments: readonly string[]): PageNode | undefined {
  return nodeByPath(toPath(segments));
}

export function pathOf(node: PageNode): string {
  return computePath(node);
}

export function depthOf(node: PageNode): number {
  return depthOfPath(computePath(node));
}

export function childrenOf(nodeId: string | null): PageNode[] {
  const ids = childIdsByParent.get(nodeId) ?? [];
  return ids.map((id) => nodesById.get(id)).filter((node): node is PageNode => node !== undefined);
}

/** 루트부터 해당 노드까지의 경로상 노드 목록. 브레드크럼에 그대로 쓴다. */
export function trailOf(node: PageNode): PageNode[] {
  const trail: PageNode[] = [node];
  let current = node;
  while (current.parentId !== null) {
    const parent = nodesById.get(current.parentId);
    if (!parent) break;
    trail.unshift(parent);
    current = parent;
  }
  return trail;
}

export function allNodes(): PageNode[] {
  return [...nodesById.values()];
}
