'use client';

/**
 * 창이 닫히는 모양.
 *
 * 가로는 지금부터 몇 초 뒤에 말을 시작하는가, 세로는 그때의 기대값이다.
 * 0선이 곧 침묵이므로, 선이 0을 지나 내려가는 지점이 그 통로의 창이 닫히는 순간이다.
 */

import { curveOf, HORIZON_SECONDS, type ChannelId, type Situation, type Weights } from '../../../core/comms';
import { PLOT } from '../config';
import styles from './window.module.css';

const DRAWN: ChannelId[] = ['chat', 'ping', 'emote', 'vote'];

export function Curves({
  situation,
  weights,
  best,
  labelOf,
  axisX,
  axisY,
  zeroLabel,
}: {
  situation: Situation;
  weights: Weights;
  best: ChannelId;
  labelOf: (id: ChannelId) => string;
  axisX: string;
  axisY: string;
  zeroLabel: string;
}) {
  const series = DRAWN.map((id) => ({ id, points: curveOf(id, situation, weights) }));
  const values = series.flatMap((entry) => entry.points.map((point) => point.expected));
  const top = Math.max(0.05, ...values);
  /*
   * 아래쪽은 위쪽의 두 배까지만 보여 준다. 이모트처럼 한참 아래에 있는 선 하나가
   * 눈금을 통째로 늘여 버리면, 정작 봐야 할 0 언저리가 납작해져 아무것도 읽히지 않는다.
   * 범위를 벗어난 선은 그림 밖으로 잘라 낸다.
   */
  const bottom = Math.max(Math.min(-0.05, ...values), -top * 2);

  const px = (at: number) => PLOT.pad + (at / HORIZON_SECONDS) * (PLOT.width - PLOT.pad * 2);
  const py = (value: number) =>
    PLOT.height - PLOT.pad - ((value - bottom) / (top - bottom)) * (PLOT.height - PLOT.pad * 2);

  return (
    <div className={styles.plotWrap}>
      <svg className={styles.plot} viewBox={`0 0 ${PLOT.width} ${PLOT.height}`} role="img">
        <defs>
          <clipPath id="window-plot-clip">
            <rect
              x={PLOT.pad}
              y={PLOT.pad - 8}
              width={PLOT.width - PLOT.pad * 2}
              height={PLOT.height - PLOT.pad * 2 + 8}
            />
          </clipPath>
        </defs>
        {/* 0선. 이 선이 침묵이고, 모든 판단의 기준이다. */}
        <line x1={PLOT.pad} y1={py(0)} x2={PLOT.width - PLOT.pad} y2={py(0)} className={styles.zeroLine} />
        <text x={PLOT.width - PLOT.pad} y={py(0) - 6} className={styles.zeroLabel} textAnchor="end">
          {zeroLabel}
        </text>

        <line
          x1={PLOT.pad}
          y1={PLOT.pad - 8}
          x2={PLOT.pad}
          y2={PLOT.height - PLOT.pad}
          className={styles.axis}
        />

        {[0, 3, 6, 9, 12].map((second) => (
          <text key={second} x={px(second)} y={PLOT.height - PLOT.pad + 16} className={styles.tick} textAnchor="middle">
            {second}
          </text>
        ))}

        <g clipPath="url(#window-plot-clip)">
        {series.map((entry) => (
          <polyline
            key={entry.id}
            className={styles.curve}
            data-best={entry.id === best || undefined}
            points={entry.points.map((point) => `${px(point.at)},${py(point.expected)}`).join(' ')}
          />
        ))}
        </g>

        {/* 창이 닫히는 지점에 표를 남긴다. */}
        {series.map((entry) => {
          const crossing = entry.points.find((point) => point.expected <= 0);
          if (!crossing || crossing.at === 0) return null;
          return (
            <g key={`x-${entry.id}`}>
              <circle cx={px(crossing.at)} cy={py(0)} r={3} className={styles.cross} data-best={entry.id === best || undefined} />
              <text x={px(crossing.at)} y={py(0) + 16} className={styles.crossLabel} textAnchor="middle">
                {labelOf(entry.id)}
              </text>
            </g>
          );
        })}

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
