/**
 * 주어진 폭과 줄 수에 글자를 얼마나 담을 수 있는지 계산한다.
 *
 * 글자 수가 아니라 실제 폭으로 재는 이유: 같은 20글자라도 'iiiiiiii'와 '몸몸몸몸'의 폭이 다르다.
 * 글자 수 제한으로 자르면 큰 글씨에서 자막이 화면 밖으로 나간다.
 * 측정기는 밖에서 주입받아 이 파일이 브라우저에 묶이지 않게 한다.
 */

import type { Measure } from './types';

/** 한 줄에 담을 수 있는 가장 긴 앞부분의 끝 위치를 찾는다. */
function fitOneLine(text: string, measure: Measure, maxWidth: number): number {
  if (measure(text) <= maxWidth) return text.length;

  // 이분 탐색으로 경계를 찾는다. 글자마다 재면 긴 자막에서 측정 횟수가 급격히 늘어난다.
  let low = 0;
  let high = text.length;
  while (low < high) {
    const mid = Math.ceil((low + high) / 2);
    if (measure(text.slice(0, mid)) <= maxWidth) low = mid;
    else high = mid - 1;
  }
  return low;
}

/** 잘린 자리가 단어 한가운데면 직전 공백까지 물러난다. 공백이 없으면 그대로 자른다. */
function retreatToWordBoundary(text: string, cut: number): number {
  if (cut >= text.length) return cut;
  if (/\s/.test(text[cut])) return cut;
  const space = text.lastIndexOf(' ', cut);
  return space > 0 ? space : cut;
}

export interface LayoutResult {
  /** 이 폭·줄 수에 담긴 앞부분의 끝 위치. */
  consumed: number;
  lines: string[];
}

/**
 * 텍스트 앞부분을 maxLines줄 안에 담는다.
 * 반환된 consumed까지가 한 덩어리로 화면에 뜰 수 있는 최대 분량이다.
 */
export function layoutLines(
  text: string,
  measure: Measure,
  maxWidth: number,
  maxLines: number,
): LayoutResult {
  const lines: string[] = [];
  let cursor = 0;

  for (let line = 0; line < maxLines && cursor < text.length; line += 1) {
    const rest = text.slice(cursor);
    const fitted = fitOneLine(rest, measure, maxWidth);
    if (fitted === 0) break;

    const cut = fitted >= rest.length ? rest.length : retreatToWordBoundary(rest, fitted);
    const piece = rest.slice(0, cut).trim();
    if (piece.length === 0) break;

    lines.push(piece);
    cursor += cut;
    // 다음 줄이 공백으로 시작하지 않게 밀어 준다.
    while (cursor < text.length && text[cursor] === ' ') cursor += 1;
  }

  return { consumed: cursor, lines };
}
