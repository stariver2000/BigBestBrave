/**
 * 팔레트 이름 생성.
 *
 * 범용 완성 엔드포인트를 열지 않고 용도별 라우트를 두는 이유:
 * 공개된 자유 프롬프트 통로는 남이 우리 로컬 모델을 임의로 쓰게 만드는 구멍이 되기 때문이다.
 * 프롬프트는 서버에서 조립하고, 클라이언트는 색과 로케일만 보낸다.
 */

import { NextResponse } from 'next/server';
import { parseColor, srgbToOklch, toHex } from '../../../../src/core/color';
import { isLocale } from '../../../../src/core/i18n';
import { complete } from '../../../../src/llm';
import { NAMING, buildNamingPrompt, sanitizeName } from '../../../../src/modules/chroma-lab';

export const dynamic = 'force-dynamic';

const SYSTEM_PROMPT =
  'You name color palettes. Reply with a single evocative name and nothing else.';

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as
    | { hex?: string; harmony?: string; locale?: string }
    | null;

  const parsed = body?.hex ? parseColor(body.hex) : { ok: false as const, reason: 'empty' as const };
  if (!parsed.ok || !isLocale(body?.locale)) {
    return NextResponse.json({ reason: 'bad-request' }, { status: 400 });
  }

  const seed = srgbToOklch(parsed.color);
  const prompt = buildNamingPrompt(seed, toHex(parsed.color), body?.harmony ?? 'mono', body.locale);

  const outcome = await complete({
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      { role: 'user', content: prompt },
    ],
    temperature: NAMING.temperature,
    maxTokens: NAMING.maxTokens,
  });

  if (!outcome.ok) {
    // 실패 사유는 화면이 사용자 언어로 번역해 보여 준다. 여기서는 기계가 읽는 키만 돌려준다.
    return NextResponse.json({ reason: outcome.reason }, { status: 200 });
  }

  return NextResponse.json({ name: sanitizeName(outcome.result.text, NAMING.maxNameLength) });
}
