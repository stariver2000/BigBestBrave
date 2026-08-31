/**
 * 페이지 모듈 등록기.
 *
 * 새 페이지를 추가하는 절차는 두 단계뿐이다.
 *   1) src/modules/<페이지>/ 디렉토리를 만들고 node.ts와 화면 컴포넌트를 넣는다.
 *   2) 이 파일의 PAGE_MODULES 배열에 한 줄 추가한다.
 * 기존 모듈은 건드리지 않는다.
 */

import type { ComponentType } from 'react';
import { registerNode, type PageNode } from '../core/tree';
import type { Locale } from '../core/i18n';
import { ChromaLab, chromaLabNode } from './chroma-lab';
import { Redactor, redactorNode } from './redactor';
import { Areca, arecaNode } from './areca';
import { Beeper, beeperNode } from './beeper';
import { Mist, mistNode } from './mist';
import { Reliability, projectionNode } from './projection';
import { Rhythm, rhythmNode } from './rhythm';
import { Rechunker, subtitleNode } from './subtitle';

/** 모든 페이지 컴포넌트가 받는 공통 props. 페이지 고유 상태는 URL에서 스스로 읽는다. */
export interface PageProps {
  locale: Locale;
}

export interface PageModule {
  node: PageNode;
  Page: ComponentType<PageProps>;
}

/** 등록 순서가 곧 트리 등록 순서다. 부모가 자식보다 먼저 와야 한다. */
const PAGE_MODULES: PageModule[] = [
  { node: redactorNode, Page: Redactor },
  { node: chromaLabNode, Page: ChromaLab },
  { node: subtitleNode, Page: Rechunker },
  { node: projectionNode, Page: Reliability },
  { node: beeperNode, Page: Beeper },
  { node: rhythmNode, Page: Rhythm },
  { node: arecaNode, Page: Areca },
  { node: mistNode, Page: Mist },
];

const componentByNodeId = new Map<string, ComponentType<PageProps>>();

// 모듈 스코프에서 한 번만 실행된다. 라우트가 요청마다 다시 등록하지 않도록 여기 둔다.
for (const pageModule of PAGE_MODULES) {
  registerNode(pageModule.node);
  componentByNodeId.set(pageModule.node.id, pageModule.Page);
}

export function componentFor(nodeId: string): ComponentType<PageProps> | undefined {
  return componentByNodeId.get(nodeId);
}
