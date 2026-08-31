'use client';

/**
 * 글자 폭 측정기.
 *
 * 코어는 폭을 재는 방법을 모른다. 브라우저에서는 캔버스가 실제 서체로 재 주므로,
 * 미리보기에 쓰는 것과 똑같은 서체·크기·굵기를 넘겨야 계산과 화면이 어긋나지 않는다.
 * 캔버스를 쓸 수 없는 환경에서는 글자 수로 어림잡아 기능이 멈추지 않게 한다.
 */

import type { Measure } from '../../core/subtitle';
import { CAPTION_FONT_STACK, CAPTION_FONT_WEIGHT } from './config';

/** 캔버스를 만들 수 없을 때 쓰는 어림값. 한글은 대략 정사각형, 라틴 문자는 그 절반 폭으로 본다. */
function approximate(fontSize: number): Measure {
  return (text) => {
    let width = 0;
    for (const character of text) {
      width += /[　-鿿가-힯＀-￯]/.test(character) ? fontSize : fontSize * 0.55;
    }
    return width;
  };
}

/** 측정용 캔버스는 하나만 만들어 재사용한다. 자막 수백 개를 재는 동안 매번 만들 이유가 없다. */
let sharedContext: CanvasRenderingContext2D | null = null;

export function createMeasure(fontSize: number): Measure {
  if (typeof document === 'undefined') return approximate(fontSize);

  if (!sharedContext) {
    sharedContext = document.createElement('canvas').getContext('2d');
  }
  const context = sharedContext;
  if (!context) return approximate(fontSize);

  context.font = `${CAPTION_FONT_WEIGHT} ${fontSize}px ${CAPTION_FONT_STACK}`;
  return (text) => context.measureText(text).width;
}
