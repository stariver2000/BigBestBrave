'use client';

/**
 * 난이도-시간 그림.
 *
 * 가로가 유효 난이도, 세로가 걸린 시간이다. 피츠 법칙이 맞는다면 점들이 직선 위에 놓인다.
 * 방아쇠마다 다른 표시로 그리고, 맞춘 직선을 함께 얹는다.
 */

import type { Trigger, TriggerReport } from '../../../core/selection';
import type { ReachKey } from '../dictionary';
import styles from './reach.module.css';

const BOX = { width: 460, height: 240, pad: 40 } as const;

export function Scatter({
  reports,
  labelOf,
  t,
}: {
  reports: readonly TriggerReport[];
  labelOf: (id: Trigger) => string;
  t: (key: ReachKey) => string;
}) {
  const points = reports.flatMap((entry) => entry.points.map((point) => ({ point, entry })));
  if (points.length < 2) return <p className={styles.quiet}>{t('plot-empty')}</p>;

  const ids = points.map((p) => p.point.ide);
  const times = points.map((p) => p.point.movementTime);
  const idMax = Math.max(...ids, 1) * 1.1;
  const timeMax = Math.max(...times, 0.5) * 1.15;

  const px = (ide: number) => BOX.pad + (ide / idMax) * (BOX.width - BOX.pad * 2);
  const py = (time: number) => BOX.height - BOX.pad - (time / timeMax) * (BOX.height - BOX.pad * 2);

  return (
    <div className={styles.plotWrap}>
      <svg className={styles.plot} viewBox={`0 0 ${BOX.width} ${BOX.height}`} role="img">
        <line x1={BOX.pad} y1={BOX.height - BOX.pad} x2={BOX.width - BOX.pad} y2={BOX.height - BOX.pad} className={styles.axis} />
        <line x1={BOX.pad} y1={BOX.pad} x2={BOX.pad} y2={BOX.height - BOX.pad} className={styles.axis} />

        {[0.25, 0.5, 0.75, 1].map((fraction) => (
          <g key={fraction}>
            <line
              x1={BOX.pad}
              y1={py(timeMax * fraction)}
              x2={BOX.width - BOX.pad}
              y2={py(timeMax * fraction)}
              className={styles.grid}
            />
            <text x={BOX.pad - 6} y={py(timeMax * fraction) + 4} className={styles.tick} textAnchor="end">
              {(timeMax * fraction).toFixed(1)}
            </text>
          </g>
        ))}
        {[0.5, 1].map((fraction) => (
          <text
            key={fraction}
            x={px(idMax * fraction)}
            y={BOX.height - BOX.pad + 16}
            className={styles.tick}
            textAnchor="middle"
          >
            {(idMax * fraction).toFixed(1)}
          </text>
        ))}

        {reports.map((entry) =>
          entry.points.length >= 2 ? (
            <line
              key={`fit-${entry.trigger}`}
              x1={px(0)}
              y1={py(entry.intercept)}
              x2={px(idMax)}
              y2={py(entry.intercept + entry.slope * idMax)}
              className={styles.fit}
              data-trigger={entry.trigger}
            />
          ) : null,
        )}

        {points.map(({ point, entry }, index) => (
          <circle
            key={index}
            cx={px(point.ide)}
            cy={py(point.movementTime)}
            r={4}
            className={styles.dot}
            data-trigger={entry.trigger}
          />
        ))}

        <text x={BOX.width - BOX.pad} y={BOX.height - 6} className={styles.axisLabel} textAnchor="end">
          {t('plot-x')}
        </text>
        <text x={BOX.pad - 6} y={BOX.pad - 12} className={styles.axisLabel} textAnchor="start">
          {t('plot-y')}
        </text>
      </svg>

      <p className={styles.plotLegend}>
        {reports.map((entry) => (
          <span key={entry.trigger} className={styles.plotLegendItem}>
            <span className={styles.plotDot} data-trigger={entry.trigger} aria-hidden="true" />
            {labelOf(entry.trigger)}
          </span>
        ))}
      </p>
    </div>
  );
}
