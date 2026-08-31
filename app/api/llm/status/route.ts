/**
 * LLM 가용성 조회.
 *
 * 화면이 "LLM 버튼을 보여 줄지" 판단하는 데만 쓰이므로 엔드포인트 주소 같은 설정은 노출하지 않는다.
 */

import { NextResponse } from 'next/server';
import { llmHealthy, llmStatus } from '../../../../src/llm';

export const dynamic = 'force-dynamic';

export async function GET() {
  const status = llmStatus();
  // 설정돼 있다는 것과 실제로 떠 있다는 것은 다르다. 로컬 런타임은 수시로 꺼지므로 매번 확인한다.
  const reachable = status.configured ? await llmHealthy() : false;
  return NextResponse.json({
    configured: status.configured,
    reachable,
    model: status.configured ? status.model : null,
    queue: status.lock,
  });
}
