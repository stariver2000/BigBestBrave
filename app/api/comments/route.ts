/**
 * 댓글 조회·작성 API.
 *
 * 경로가 실제로 등록된 노드인지 확인한 뒤에만 받는다. 확인하지 않으면 아무 문자열이나
 * 경로로 보내 저장소에 쓰레기를 쌓을 수 있다.
 */

import { NextResponse } from 'next/server';
import { addComment, commentLimits, listThread } from '../../../src/comments';
import { nodeByPath } from '../../../src/core/tree';
// 모듈 등록기를 불러와야 트리에 노드가 등록된다.
import '../../../src/modules';

export const dynamic = 'force-dynamic';

/** 입력 오류는 400, 도배·저장 실패는 429/503으로 구분해 화면이 다른 문구를 띄우게 한다. */
const ERROR_STATUS: Record<string, number> = {
  'empty-body': 400,
  'body-too-long': 400,
  'author-too-long': 400,
  'unknown-parent': 400,
  'too-deep': 400,
  'too-fast': 429,
  'storage-error': 503,
};

function knownPath(path: unknown): path is string {
  return typeof path === 'string' && nodeByPath(path) !== undefined;
}

export async function GET(request: Request) {
  const path = new URL(request.url).searchParams.get('path');
  if (!knownPath(path)) {
    return NextResponse.json({ error: 'unknown-path' }, { status: 404 });
  }
  return NextResponse.json({ comments: await listThread(path), limits: commentLimits() });
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as
    | { path?: string; parentId?: string | null; author?: string; body?: string }
    | null;

  if (!body || !knownPath(body.path)) {
    return NextResponse.json({ error: 'unknown-path' }, { status: 404 });
  }

  const result = await addComment({
    path: body.path,
    parentId: typeof body.parentId === 'string' ? body.parentId : null,
    author: typeof body.author === 'string' ? body.author : '',
    body: typeof body.body === 'string' ? body.body : '',
  });

  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: ERROR_STATUS[result.error] ?? 400 });
  }
  // 새로 그린 스레드를 함께 돌려줘 화면이 한 번 더 요청하지 않게 한다.
  return NextResponse.json({ comments: await listThread(body.path) }, { status: 201 });
}
