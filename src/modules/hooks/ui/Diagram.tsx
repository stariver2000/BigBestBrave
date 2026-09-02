'use client';

/**
 * 중첩 상자-화살표 그림.
 *
 * 논문의 그림 짜임 그대로: 컴포넌트 상자를 계층 열로 늘어놓고, 상태·프롭·이펙트를
 * 상자 안에 품고, 값의 흐름을 화살표로 잇는다. 경고(정답)를 켜면 검출기가 잡은
 * 요소와 그 요소가 낀 간선이 빨갛게 칠해진다 - 빨강은 개발 환경의 관례다(6.2절).
 *
 * 마디를 누르면 의심 표시가 켜지고 꺼진다. 코드 밑의 칩과 같은 것을 가리킨다.
 */

import { useMemo } from 'react';
import {
  diagramEdges,
  layoutDiagram,
  selectableItems,
  type HookGraph,
} from '../../../core/hookgraph';
import { NODE_COLORS } from '../config';
import styles from './hooks.module.css';

const KIND_COLOR = {
  state: NODE_COLORS.state,
  prop: NODE_COLORS.prop,
  effect: NODE_COLORS.effect,
} as const;

export function Diagram({
  graph,
  picked,
  truth,
  warn,
  onToggle,
}: {
  graph: HookGraph;
  picked: ReadonlySet<string>;
  truth: ReadonlySet<string>;
  warn: boolean;
  onToggle: (id: string) => void;
}) {
  const layout = useMemo(() => layoutDiagram(graph), [graph]);
  const edges = useMemo(() => diagramEdges(graph), [graph]);
  const items = useMemo(() => selectableItems(graph), [graph]);

  const boxOf = (id: string) => layout.boxes[id.split('.')[0]];

  return (
    <div className={styles.diagramScroll}>
      <svg
        className={styles.diagram}
        viewBox={`0 0 ${layout.width} ${layout.height}`}
        style={{ minWidth: layout.width }}
        role="img"
      >
        {edges.map((edge, index) => {
          const from = layout.slots[edge.fromId];
          const to = layout.slots[edge.toId];
          const fromBox = boxOf(edge.fromId);
          const toBox = boxOf(edge.toId);
          if (!from || !to || !fromBox || !toBox) return null;
          const flagged = warn && (truth.has(edge.fromId) || truth.has(edge.toId));
          const sameBox = fromBox === toBox;
          // 같은 상자 안의 간선(의존·호출)은 왼쪽으로 볼록하게, 상자 사이는 오른끝→왼끝.
          const path = sameBox
            ? `M ${from.x} ${from.y} C ${from.x - 16} ${from.y}, ${to.x - 16} ${to.y}, ${to.x} ${to.y}`
            : `M ${fromBox.x + fromBox.width - 6} ${from.y} C ${fromBox.x + fromBox.width + 34} ${from.y}, ${
                toBox.x - 34
              } ${to.y}, ${toBox.x + 2} ${to.y}`;
          return (
            <path
              key={index}
              className={styles.edge}
              d={path}
              stroke={flagged ? NODE_COLORS.warn : undefined}
              strokeDasharray={edge.carriesSetter ? '4 3' : undefined}
              data-flagged={flagged || undefined}
            />
          );
        })}

        {graph.components.map((component) => {
          const box = layout.boxes[component.name];
          if (!box) return null;
          return (
            <g key={component.name}>
              <rect
                className={styles.componentBox}
                x={box.x}
                y={box.y}
                width={box.width}
                height={box.height}
                rx={8}
                stroke={NODE_COLORS.component}
              />
              <text className={styles.componentName} x={box.x + 10} y={box.y + 16}>
                {component.name}
              </text>
            </g>
          );
        })}

        {items.map((item) => {
          const slot = layout.slots[item.id];
          if (!slot) return null;
          const flagged = warn && truth.has(item.id);
          const isPicked = picked.has(item.id);
          return (
            <g
              key={item.id}
              className={styles.node}
              data-picked={isPicked || undefined}
              data-flagged={flagged || undefined}
              onClick={() => onToggle(item.id)}
            >
              {flagged && (
                <rect
                  className={styles.flagBack}
                  x={slot.x - 5}
                  y={slot.y - 9}
                  width={150}
                  height={18}
                  rx={4}
                  fill={NODE_COLORS.warn}
                />
              )}
              <circle
                cx={slot.x + 2}
                cy={slot.y}
                r={4.5}
                fill={KIND_COLOR[item.kind]}
                stroke={isPicked ? 'var(--bbb-accent)' : 'none'}
                strokeWidth={isPicked ? 2.5 : 0}
              />
              <text className={styles.nodeName} x={slot.x + 12} y={slot.y + 3.5}>
                {item.name}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
