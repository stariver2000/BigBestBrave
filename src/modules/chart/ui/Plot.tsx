'use client';

/**
 * 차트 한 장을 그린다.
 *
 * 이 그림은 검사 대상이다. 그래서 어긋난 설정을 "예쁘게 고쳐" 그리지 않고,
 * 설정한 그대로 — 축을 자른 채, 뒤집힌 채, 원을 반지름에 이은 채 — 그린다.
 * 그래야 계산된 왜곡 배수와 눈에 보이는 것이 일치한다.
 */

import { extent, type ChartSpec } from '../../../core/chartaudit';
import { PLOT } from '../config';
import styles from './chart.module.css';

const PAD = { left: 42, right: 12, top: 14, bottom: 24 };

export function Plot({ spec }: { spec: ChartSpec }) {
  const { max } = extent(spec.values);
  const start = spec.axisMin ?? 0;
  const end = spec.axisMax ?? max;
  const span = end - start || 1;

  const innerWidth = PLOT.width - PAD.left - PAD.right;
  const innerHeight = spec.height;
  const totalHeight = innerHeight + PAD.top + PAD.bottom;

  /** 값을 세로 좌표로. 뒤집기가 켜져 있으면 위아래를 바꾼다. */
  const toY = (value: number) => {
    const ratio = (value - start) / span;
    const clamped = Math.max(0, Math.min(1, ratio));
    return spec.inverted ? PAD.top + clamped * innerHeight : PAD.top + (1 - clamped) * innerHeight;
  };

  const stepX = spec.values.length > 1 ? innerWidth / (spec.values.length - 1) : innerWidth;
  const toX = (index: number) =>
    spec.kind === 'bar'
      ? PAD.left + (innerWidth / spec.values.length) * (index + 0.5)
      : PAD.left + index * stepX;

  return (
    <svg className={styles.plot} viewBox={`0 0 ${PLOT.width} ${totalHeight}`} role="img">
      <line className={styles.axis} x1={PAD.left} y1={PAD.top} x2={PAD.left} y2={PAD.top + innerHeight} />
      <line
        className={styles.axis}
        x1={PAD.left}
        y1={PAD.top + innerHeight}
        x2={PLOT.width - PAD.right}
        y2={PAD.top + innerHeight}
      />

      {/* 축 눈금은 시작값과 끝값만 적는다. 축이 어디서 시작하는지가 이 페이지의 요점이다. */}
      <text className={styles.tick} x={PAD.left - 6} y={PAD.top + innerHeight} textAnchor="end">
        {spec.inverted ? end : start}
      </text>
      <text className={styles.tick} x={PAD.left - 6} y={PAD.top + 9} textAnchor="end">
        {spec.inverted ? start : end}
      </text>

      {spec.kind === 'bar' &&
        spec.values.map((value, index) => {
          const width = (innerWidth / spec.values.length) * 0.62;
          const y = toY(value);
          const base = spec.inverted ? PAD.top : PAD.top + innerHeight;
          return (
            <rect
              key={index}
              className={styles.mark}
              x={toX(index) - width / 2}
              y={Math.min(y, base)}
              width={width}
              height={Math.abs(base - y)}
            />
          );
        })}

      {spec.kind === 'line' && (
        <polyline
          className={styles.markLine}
          points={spec.values.map((value, index) => `${toX(index)},${toY(value)}`).join(' ')}
        />
      )}

      {spec.kind === 'bubble' &&
        spec.values.map((value, index) => {
          // 넓이에 이으면 반지름은 값의 제곱근에 비례하고, 반지름에 이으면 값에 그대로 비례한다.
          const ratio = Math.max(0, value) / (max || 1);
          const scale = spec.bubbleScale === 'area' ? Math.sqrt(ratio) : ratio;
          const radius = scale * Math.min(innerHeight, innerWidth / spec.values.length) * 0.45;
          return (
            <circle
              key={index}
              className={styles.mark}
              cx={PAD.left + (innerWidth / spec.values.length) * (index + 0.5)}
              cy={PAD.top + innerHeight / 2}
              r={Math.max(1, radius)}
            />
          );
        })}
    </svg>
  );
}
