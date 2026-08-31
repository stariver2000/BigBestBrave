import { beforeAll, describe, expect, it } from 'vitest';
import {
  MAX_DEPTH,
  ROOT_ID,
  TreeRegistrationError,
  childrenOf,
  depthOf,
  nodeBySegments,
  pathOf,
  registerNode,
  trailOf,
  type PageNode,
} from '@core/tree';

function node(id: string, slug: string, parentId: string | null): PageNode {
  const text = { ko: id, en: id, ja: id };
  return { id, slug, parentId, title: text, summary: text, capability: text, traits: {} };
}

// 레지스트리는 모듈 스코프 싱글턴이므로 파일 하나에서 한 번만 구성한다.
beforeAll(() => {
  registerNode(node(ROOT_ID, '', null));
  registerNode(node('design', 'design', ROOT_ID));
  registerNode(node('color', 'color', 'design'));
});

describe('페이지 트리', () => {
  it('경로 조각으로 노드를 찾는다', () => {
    expect(nodeBySegments([])?.id).toBe(ROOT_ID);
    expect(nodeBySegments(['design', 'color'])?.id).toBe('color');
    expect(nodeBySegments(['design', 'nope'])).toBeUndefined();
  });

  it('절대 경로는 조상 slug를 이어 만든다', () => {
    expect(pathOf(nodeBySegments(['design', 'color'])!)).toBe('/design/color');
    expect(pathOf(nodeBySegments([])!)).toBe('/');
  });

  it('루트를 1층으로 세어 깊이를 계산한다', () => {
    expect(depthOf(nodeBySegments([])!)).toBe(1);
    expect(depthOf(nodeBySegments(['design', 'color'])!)).toBe(3);
  });

  it('브레드크럼은 루트부터 현재까지 이어진다', () => {
    const trail = trailOf(nodeBySegments(['design', 'color'])!);
    expect(trail.map((step) => step.id)).toEqual([ROOT_ID, 'design', 'color']);
  });

  it('자식 목록은 등록 순서를 유지한다', () => {
    expect(childrenOf(ROOT_ID).map((child) => child.id)).toEqual(['design']);
  });

  it('중복 id와 잘못된 slug를 거부한다', () => {
    expect(() => registerNode(node('design', 'other', ROOT_ID))).toThrow(TreeRegistrationError);
    expect(() => registerNode(node('bad', 'Not A Slug', ROOT_ID))).toThrow(TreeRegistrationError);
  });

  it('최대 깊이를 넘는 등록을 막는다', () => {
    let parent = 'color';
    // 이미 3층이므로 MAX_DEPTH까지 채운 뒤 한 칸 더 시도한다.
    for (let depth = 4; depth <= MAX_DEPTH; depth += 1) {
      const id = `level-${depth}`;
      registerNode(node(id, `level-${depth}`, parent));
      parent = id;
    }
    expect(() => registerNode(node('too-deep', 'too-deep', parent))).toThrow(TreeRegistrationError);
  });
});
