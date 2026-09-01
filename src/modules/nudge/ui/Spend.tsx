'use client';

/** 돈이 쌓이는 모양. 가로는 겪은 횟수, 세로는 그때까지 나간 돈이다. */

import type { Run, Strategy } from '../../../core/incentive';
import { PLOT } from '../config';
import styles from './nudge.module.css';

export function Spend({
  runs,
  labelOf,
  axisX,
  axisY,
}: {
  runs: readonly Run[];
  labelOf: (id: Strategy) => string;
  axisX: string;
  axisY: string;
}) {
  const rounds = Math.max(...runs.map((run) => run.rounds.length), 1);
  const top = Math.max(...runs.map((run) => run.totalCost), 1);

  const px = (index: number) => PLOT.pad + (index / rounds) * (PLOT.width - PLOT.pad * 2);
  const py = (value: number) => PLOT.height - PLOT.pad - (value / top) * (PLOT.height - PLOT.pad * 2);

  return (
    <div className={styles.plotWrap}>
      <svg className={styles.plot} viewBox={`0 0 ${PLOT.width} ${PLOT.height}`} role="img">
        <line x1={PLOT.pad} y1={PLOT.height - PLOT.pad} x2={PLOT.width - PLOT.pad} y2={PLOT.height - PLOT.pad} className={styles.axis} />
        <line x1={PLOT.pad} y1={PLOT.pad - 8} x2={PLOT.pad} y2={PLOT.height - PLOT.pad} className={styles.axis} />

        {[0.5, 1].map((fraction) => (
          <g key={fraction}>
            <line x1={PLOT.pad} y1={py(top * fraction)} x2={PLOT.width - PLOT.pad} y2={py(top * fraction)} className={styles.grid} />
            <text x={PLOT.pad - 6} y={py(top * fraction) + 4} className={styles.tick} textAnchor="end">
              {Math.round(top * fraction)}
            </text>
          </g>
        ))}

        {runs.map((run) => (
          <polyline
            key={run.strategy}
            className={styles.line}
            data-strategy={run.strategy}
            points={run.rounds.map((round) => `${px(round.index)},${py(round.spent)}`).join(' ')}
          />
        ))}

        {runs.map((run) => (
          <text
            key={`l-${run.strategy}`}
            x={PLOT.width - PLOT.pad + 4}
            y={py(run.totalCost) + 3}
            className={styles.lineLabel}
            data-strategy={run.strategy}
          >
            {labelOf(run.strategy)}
          </text>
        ))}

        <text x={PLOT.width - PLOT.pad} y={PLOT.height - 6} className={styles.axisLabel} textAnchor="end">
          {axisX}
        </text>
        <text x={PLOT.pad - 4} y={PLOT.pad - 16} className={styles.axisLabel} textAnchor="start">
          {axisY}
        </text>
      </svg>
    </div>
  );
}
