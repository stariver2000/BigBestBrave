/** 페이지 트리 코어의 공개 진입점. */

export { MAX_DEPTH, ROOT_ID, ROOT_PATH } from './config';
export type { PageNode } from './model';
export { isValidSlug, toPath, toSegments } from './path';
export {
  TreeRegistrationError,
  allNodes,
  childrenOf,
  depthOf,
  nodeById,
  nodeByPath,
  nodeBySegments,
  pathOf,
  registerNode,
  trailOf,
} from './registry';
