/**
 * 명세에서 막대의 자리를 계산한다. 코드와 같은 명세에서 나오므로 둘이 어긋나지
 * 않는다(DG1). 화면은 이 자리를 SVG로 그리고, 막대를 끌면 조작이 된다(DG2).
 *
 * 좌표는 [0, 1] 사각형 안이다. 화면 크기는 화면 쪽이 정한다.
 */

import { CATEGORIES, VALUES } from './config';
import { effectiveMax, type Spec } from './spec';

export interface Bar {
  category: string;
  series: string;
  value: number;
  /** [0,1] 좌표. y는 아래가 0이다. */
  x: number;
  y: number;
  width: number;
  height: number;
}

const GROUP_PAD = 0.2;

export function layoutBars(spec: Spec): Bar[] {
  const max = effectiveMax(spec);
  if (max <= 0) return [];
  const bars: Bar[] = [];
  const bandWidth = 1 / CATEGORIES.length;
  const inner = bandWidth * (1 - GROUP_PAD);
  const offset = (bandWidth - inner) / 2;

  CATEGORIES.forEach((category, index) => {
    const bandStart = index * bandWidth + offset;
    if (spec.mode === 'grouped') {
      const each = inner / Math.max(1, spec.order.length);
      spec.order.forEach((series, seriesIndex) => {
        const value = VALUES[category]?.[series] ?? 0;
        bars.push({
          category,
          series,
          value,
          x: bandStart + seriesIndex * each,
          y: 0,
          width: each,
          height: Math.min(1, value / max),
        });
      });
    } else {
      let bottom = 0;
      for (const series of spec.order) {
        const value = VALUES[category]?.[series] ?? 0;
        const height = Math.min(1, value / max);
        bars.push({ category, series, value, x: bandStart, y: bottom, width: inner, height });
        bottom += height;
      }
    }
  });
  return bars;
}

/** 계열마다 정해진 색 자리. 실제 색은 룩이 정한다. */
export function seriesIndex(spec: Spec, series: string): number {
  const at = spec.order.indexOf(series);
  return at < 0 ? 0 : at;
}

/** 쌓기에서 한 칸의 합계. 화면이 축 눈금을 그릴 때 쓴다. */
export function categoryTotal(spec: Spec, category: string): number {
  return spec.order.reduce((sum, series) => sum + (VALUES[category]?.[series] ?? 0), 0);
}
