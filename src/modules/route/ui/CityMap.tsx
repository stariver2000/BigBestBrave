'use client';

/**
 * 지나온 자취를 그린 지도.
 *
 * 도시의 모든 길을 옅게 깔고, 지난 횟수만큼 굵은 자홍 선을 얹는다.
 * 늘 같은 길로 다닌 태도는 굵은 선 하나가, 이리저리 다닌 태도는 가는 선 여럿이 남는다.
 */

import type { City, Run } from '../../../core/routing';
import { GRID } from '../../../core/routing';
import { MAP, STROKE } from '../config';
import styles from './route.module.css';

export function CityMap({ city, run }: { city: City; run: Run }) {
  const span = MAP.size - MAP.pad * 2;
  const step = span / (GRID - 1);
  const at = (nodeId: number) => {
    const node = city.nodes[nodeId];
    return { x: MAP.pad + node.x * step, y: MAP.pad + node.y * step };
  };
  const busiest = Math.max(1, ...run.useCount);

  return (
    <svg className={styles.map} viewBox={`0 0 ${MAP.size} ${MAP.size}`} role="img">
      {/* 도시의 모든 길. 인쇄된 선처럼 옅게. */}
      {city.edges.map((edge) => {
        const a = at(edge.from);
        const b = at(edge.to);
        return (
          <line
            key={`road-${edge.id}`}
            x1={a.x}
            y1={a.y}
            x2={b.x}
            y2={b.y}
            className={styles.road}
            data-arterial={edge.arterial || undefined}
          />
        );
      })}

      {/* 지나온 길. 자주 지날수록 굵다. */}
      {city.edges.map((edge) => {
        const used = run.useCount[edge.id];
        if (used === 0) return null;
        const a = at(edge.from);
        const b = at(edge.to);
        const width = STROKE.min + (used / busiest) * (STROKE.max - STROKE.min);
        return (
          <line
            key={`used-${edge.id}`}
            x1={a.x}
            y1={a.y}
            x2={b.x}
            y2={b.y}
            className={styles.used}
            strokeWidth={width}
          />
        );
      })}

      {city.nodes.map((node) => {
        const point = at(node.id);
        const isStart = node.id === 0;
        const isGoal = node.id === city.nodes.length - 1;
        return (
          <circle
            key={node.id}
            cx={point.x}
            cy={point.y}
            r={isStart || isGoal ? MAP.dot + 1.5 : MAP.dot - 1.5}
            className={styles.dot}
            data-end={isStart ? 'start' : isGoal ? 'goal' : undefined}
          />
        );
      })}
    </svg>
  );
}
