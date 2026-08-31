/**
 * 한 페이지가 실제로 화면에 내보내는 CSS 변수를 만든다.
 *
 * 파생 토큰(특성 엔진) 위에 룩(손으로 고른 미감)을 덮는 순서가 여기 한 곳에만 있다.
 * 화면과 테스트가 같은 함수를 쓰게 해서, 검사한 색과 실제로 칠해지는 색이 어긋나지 않게 한다.
 */

import { deriveTokens, toStyleObject } from '../core/traits';
import type { PageNode } from '../core/tree';
import { lookVariables } from './index';

export function frameVariables(node: PageNode): Record<string, string> {
  return { ...toStyleObject(deriveTokens(node.traits)), ...lookVariables(node.look) };
}

/**
 * 변수를 :root 규칙 문자열로 만든다.
 *
 * 프레임 요소에 인라인으로 심지 않고 문서 루트에 두는 이유: html과 body의 배경색도 같은 변수를
 * 읽어야 하기 때문이다. 프레임 안쪽에만 심으면 화면 맨 아래처럼 프레임이 닿지 않는 자리에
 * 직전 룩의 색이 남는다.
 */
export function frameStyleSheet(node: PageNode): string {
  const body = Object.entries(frameVariables(node))
    .map(([name, value]) => `${name}:${value}`)
    .join(';');
  return `:root{${body}}`;
}
