/**
 * 페이지의 맥을 세는 API.
 *
 * 받는 것은 경로 하나와 사건 이름 몇 개뿐이다. 누가 보냈는지는 묻지도, 남기지도 않는다 —
 * 주소도 신원도 저장하지 않으므로 이 자료로는 한 사람을 되짚을 수 없다.
 * 등록된 노드의 경로만 받는다. 그러지 않으면 아무 문자열이나 보내 저장소를 부풀릴 수 있다.
 *
 * 한 요청이 하는 일은 정수 몇 개를 올리는 것이라, 페이지가 수백 장이어도 서버가 하는 일은 늘지 않는다.
 */

import { NextResponse } from 'next/server';
import { PULSE_KINDS, readingOf } from '../../../src/core/pulse';
import { nodeByPath } from '../../../src/core/tree';
import { pulseStore, readPulseConfig } from '../../../src/pulse';
// 모듈 등록기를 불러와야 트리에 노드가 등록된다.
import '../../../src/modules';

export const dynamic = 'force-dynamic';

function knownPath(path: unknown): path is string {
  return typeof path === 'string' && nodeByPath(path) !== undefined;
}

export async function GET(request: Request) {
  const path = new URL(request.url).searchParams.get('path');
  const store = pulseStore();

  // 경로를 주면 그 페이지만, 주지 않으면 전부. 어느 쪽이든 나가는 것은 셈과 비율뿐이다.
  if (path === null) {
    const all = await store.readAll();
    const pages = Object.entries(all).map(([at, tally]) => ({ path: at, tally, reading: readingOf(tally) }));
    return NextResponse.json({ pages });
  }

  if (!knownPath(path)) {
    return NextResponse.json({ error: 'unknown-path' }, { status: 404 });
  }
  const tally = await store.read(path);
  return NextResponse.json({ path, tally, reading: readingOf(tally) });
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as { path?: string; kinds?: unknown } | null;
  if (!body || !knownPath(body.path)) {
    return NextResponse.json({ error: 'unknown-path' }, { status: 404 });
  }

  const config = readPulseConfig();
  const kinds = Array.isArray(body.kinds)
    ? body.kinds.filter((kind): kind is string => typeof kind === 'string').slice(0, config.maxKindsPerRequest)
    : [];
  if (kinds.length === 0) {
    return NextResponse.json({ error: 'no-kinds', known: PULSE_KINDS }, { status: 400 });
  }

  try {
    await pulseStore().bump(body.path, kinds);
  } catch {
    // 셈이 실패해도 화면은 그대로 동작해야 한다. 조용히 넘기고 성공으로 답한다.
    return new NextResponse(null, { status: 204 });
  }
  return new NextResponse(null, { status: 204 });
}
