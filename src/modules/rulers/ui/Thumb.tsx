'use client';

/** 산점도 한 장의 작은 미리보기. 라벨마다 다른 밝기의 점으로 그린다. */

import { THUMB } from '../config';
import type { Projection } from '../../../core/metriclab';
import styles from './rulers.module.css';

export function Thumb({
  projection,
  labels,
}: {
  projection: Projection;
  labels: readonly string[];
}) {
  const groups = [...new Set(labels)];
  const xs = projection.low.map(([x]) => x);
  const ys = projection.low.map(([, y]) => y);
  const spanX = Math.max(...xs) - Math.min(...xs) || 1;
  const spanY = Math.max(...ys) - Math.min(...ys) || 1;
  const span = Math.max(spanX, spanY);
  const minX = Math.min(...xs);
  const minY = Math.min(...ys);
  const pad = THUMB.dot * 2;
  const usable = THUMB.size - pad * 2;

  return (
    <svg
      className={styles.thumb}
      viewBox={`0 0 ${THUMB.size} ${THUMB.size}`}
      role="img"
      aria-label={projection.recipe}
    >
      {projection.low.map(([x, y], index) => (
        <circle
          key={index}
          cx={pad + ((x - minX) / span) * usable}
          // SVG의 y는 아래로 자라므로 뒤집어 그린다.
          cy={THUMB.size - pad - ((y - minY) / span) * usable}
          r={THUMB.dot}
          className={styles.thumbDot}
          data-group={groups.indexOf(labels[index]) % 4}
        />
      ))}
    </svg>
  );
}
