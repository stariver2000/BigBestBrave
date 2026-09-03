'use client';

/**
 * 그림 판. 막대를 눌러 고르고, 다른 막대 위로 끌면 쌓인다(DG2).
 * 고른 것은 코드 쪽에서도 함께 밝아진다(DG1).
 *
 * 끌기는 pointerdown/move/up으로 만든다. 브라우저의 HTML5 드래그를 쓰지 않는
 * 이유: 터치와 마우스가 같은 길을 걷게 하고, 끌리는 중의 미리보기(DG3)를
 * 우리 손으로 그리기 위해서다.
 */

import { useCallback, useRef, useState } from 'react';
import { CATEGORIES, layoutBars, seriesIndex, type Edit, type Spec } from '../../../core/chartspec';
import { HANDLE_SERIES } from '../../../looks/handle/config';
import { Panel } from '../../../kit';
import type { HandlesDictionary } from '../dictionary';
import { fill } from './Handles';
import styles from './handles.module.css';

const W = 320;
const H = 220;
const PAD = 10;

export function ChartStage({
  dict,
  spec,
  picked,
  onPick,
  onEdit,
}: {
  dict: HandlesDictionary;
  spec: Spec;
  picked: string;
  onPick: (picked: string) => void;
  onEdit: (edit: Edit, label: string) => void;
}) {
  const bars = layoutBars(spec);
  const [dragging, setDragging] = useState<string | null>(null);
  const [hovering, setHovering] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);

  const onPointerDown = useCallback(
    (event: React.PointerEvent, series: string) => {
      onPick('marks');
      if (spec.mode === 'stacked') return;
      setDragging(series);
      (event.target as Element).setPointerCapture?.(event.pointerId);
    },
    [onPick, spec.mode],
  );

  const onPointerMove = useCallback(
    (event: React.PointerEvent) => {
      if (dragging === null || !svgRef.current) return;
      const box = svgRef.current.getBoundingClientRect();
      const x = (event.clientX - box.left) / box.width;
      // 자기 칸을 벗어나 다른 막대 쪽으로 가면 놓을 자리로 본다.
      setHovering(x > 0.05 && x < 0.95);
    },
    [dragging],
  );

  const onPointerUp = useCallback(() => {
    if (dragging !== null && hovering) {
      onEdit({ kind: 'toMode', mode: 'stacked' }, dict.edits.toStacked);
    }
    setDragging(null);
    setHovering(false);
  }, [dict.edits.toStacked, dragging, hovering, onEdit]);

  return (
    <Panel title={dict.chart.title} note={dict.chart.note}>
      <svg
        ref={svgRef}
        className={styles.plot}
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label={dict.chart.title}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <text
          className={styles.chartTitle}
          x={W / 2}
          y={16}
          data-picked={picked === 'title' || undefined}
          onClick={() => onPick('title')}
        >
          {spec.title}
        </text>

        <line
          className={styles.axis}
          x1={PAD}
          y1={H - 26}
          x2={W - PAD}
          y2={H - 26}
          data-picked={picked === 'xAxis' || undefined}
          onClick={() => onPick('xAxis')}
        />
        <line
          className={styles.axis}
          x1={PAD}
          y1={26}
          x2={PAD}
          y2={H - 26}
          data-picked={picked === 'yAxis' || undefined}
          onClick={() => onPick('yAxis')}
        />

        {bars.map((bar, index) => {
          const plotH = H - 26 - 26;
          const x = PAD + bar.x * (W - 2 * PAD);
          const width = bar.width * (W - 2 * PAD);
          const height = bar.height * plotH;
          const y = H - 26 - (bar.y * plotH + height);
          return (
            <rect
              key={`${bar.category}-${bar.series}-${index}`}
              className={styles.bar}
              x={x}
              y={y}
              width={Math.max(1, width - 1)}
              height={Math.max(1, height)}
              fill={HANDLE_SERIES[seriesIndex(spec, bar.series) % HANDLE_SERIES.length]}
              data-picked={picked === 'marks' || undefined}
              data-dragging={dragging === bar.series || undefined}
              onPointerDown={(event) => onPointerDown(event, bar.series)}
            />
          );
        })}

        {CATEGORIES.map((category, index) => (
          <text
            key={category}
            className={styles.tick}
            x={PAD + ((index + 0.5) / CATEGORIES.length) * (W - 2 * PAD)}
            y={H - 12}
          >
            {category}
          </text>
        ))}

        {dragging !== null && hovering && (
          <text className={styles.dropHint} x={W / 2} y={H / 2}>
            {dict.chart.dropHint}
          </text>
        )}
      </svg>

      {spec.legend && (
        <ul className={styles.legend} data-picked={picked === 'legend' || undefined}>
          {spec.order.map((series) => (
            <li key={series} className={styles.legendItem}>
              <span
                className={styles.legendSwatch}
                style={{ background: HANDLE_SERIES[seriesIndex(spec, series) % HANDLE_SERIES.length] }}
                aria-hidden
              />
              {series}
            </li>
          ))}
        </ul>
      )}

      <p className={styles.pickedLine}>
        {picked === ''
          ? dict.chart.nothingPicked
          : fill(dict.chart.picked, { node: dict.nodes[picked as keyof typeof dict.nodes] ?? picked })}
      </p>
      <p className={styles.hint}>
        {spec.mode === 'grouped' ? dict.chart.grabHint : ''} {dict.chart.keyboard}
      </p>
    </Panel>
  );
}
