/**
 * 트리 전 구간을 담당하는 단일 라우트.
 *
 * 도메인은 고정하고 경로만 갈라지는 구조이므로, 라우트 파일을 페이지마다 만들지 않는다.
 * 경로 조각을 트리 레지스트리에 물어 노드를 찾고, 그 노드에 등록된 컴포넌트를 그린다.
 * 새 페이지를 추가할 때 이 파일은 절대 수정되지 않는다.
 */

import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { nodeBySegments } from '../../src/core/tree';
import { PageFrame, currentLocale } from '../../src/shell';
import { componentFor } from '../../src/modules';

export default async function TreePage({ params }: { params: Promise<{ slug?: string[] }> }) {
  const { slug } = await params;
  const node = nodeBySegments(slug ?? []);
  if (!node) notFound();

  const Page = componentFor(node.id);
  if (!Page) notFound();

  const locale = await currentLocale();

  return (
    <PageFrame node={node} locale={locale}>
      {/* 페이지 컴포넌트는 URL 질의문자열에서 자기 상태를 읽는다.
          useSearchParams는 서스펜스 경계를 요구하므로 여기서 감싼다. */}
      <Suspense fallback={null}>
        <Page locale={locale} />
      </Suspense>
    </PageFrame>
  );
}
