/**
 * 부적 그리기.
 *
 * 점사와 같은 씨앗에서 획을 뽑는다. 같은 물음에는 같은 부적이 나오고, 물음이 달라지면
 * 다른 그림이 된다. 이미지 파일을 싣지 않고 좌표만 만들어 화면이 그리게 한다.
 *
 * 형태는 부적의 얼개를 따랐다 — 가운데를 지나는 세로 기둥, 거기서 뻗는 가로획,
 * 위쪽의 갈고리, 아래쪽의 인장. 실제 부적의 문양을 옮긴 것은 아니다.
 */

import { createRandom } from '../random';
import type { Talisman } from './types';

const SIZE = 200;
const MARGIN = 34;

/** 가로획은 기둥을 가로지르되 좌우 길이가 다르다. 대칭이면 인쇄물처럼 보인다. */
function crossStroke(y: number, left: number, right: number): string {
  return `M ${SIZE / 2 - left} ${y} L ${SIZE / 2 + right} ${y}`;
}

/** 위쪽 갈고리. 기둥 끝에서 한쪽으로 꺾인다. */
function hookStroke(direction: number): string {
  const x = SIZE / 2;
  return `M ${x} ${MARGIN} L ${x + 22 * direction} ${MARGIN} L ${x + 22 * direction} ${MARGIN + 18}`;
}

export function talismanOf(seed: number): Talisman {
  const random = createRandom(seed);
  const strokes: string[] = [];

  // 세로 기둥. 부적의 중심이라 항상 그린다.
  strokes.push(`M ${SIZE / 2} ${MARGIN} L ${SIZE / 2} ${SIZE - MARGIN - 34}`);
  strokes.push(hookStroke(random() < 0.5 ? -1 : 1));

  // 가로획 서너 개. 위치와 길이는 씨앗이 정한다.
  const barCount = 3 + Math.floor(random() * 3);
  const span = SIZE - MARGIN * 2 - 52;
  for (let index = 0; index < barCount; index += 1) {
    const y = MARGIN + 26 + (span * (index + 1)) / (barCount + 1);
    strokes.push(crossStroke(y, 14 + random() * 26, 14 + random() * 26));
    // 가끔 가로획 끝에서 아래로 짧게 떨어뜨린다.
    if (random() < 0.45) {
      const direction = random() < 0.5 ? -1 : 1;
      const reach = 14 + random() * 24;
      strokes.push(`M ${SIZE / 2 + reach * direction} ${y} L ${SIZE / 2 + reach * direction} ${y + 12}`);
    }
  }

  // 아래쪽 인장. 3×3 칸 중 씨앗이 고른 칸만 채운다.
  const seal: { x: number; y: number; size: number }[] = [];
  const cell = 9;
  const originX = SIZE / 2 - cell * 1.5;
  const originY = SIZE - MARGIN - 28;
  for (let row = 0; row < 3; row += 1) {
    for (let column = 0; column < 3; column += 1) {
      if (random() < 0.55) {
        seal.push({ x: originX + column * cell, y: originY + row * cell, size: cell - 2 });
      }
    }
  }

  return { size: SIZE, strokes, seal };
}
