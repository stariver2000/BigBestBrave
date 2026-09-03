'use client';

/**
 * 산점도와 두 잣대.
 *
 * 점의 색은 참 무리이고 자리는 지금 손잡이가 만든 것이다. 그래서 "색이 뭉쳐
 * 보이면 손잡이가 잘 맞은 것"이라는 읽기가 성립한다.
 * 잣대 둘은 걸음마다 다시 재어 그대로 보인다 - 점수를 지어내지 않는다.
 */

import { GRID, K_CHOICES, entropyUpperBound, type Projected } from '../../../core/featurespace';
import { Panel } from '../../../kit';
import { GROUP_COLORS } from '../config';
import type { FocusDictionary } from '../dictionary';
import { fill } from './Focus';
import styles from './focus.module.css';

const SIZE = 320;

export function Scatter({
  dict,
  points,
  groupOf,
  k,
  onK,
  clusteredness,
  overlap,
}: {
  dict: FocusDictionary;
  points: readonly Projected[];
  groupOf: (id: number) => string;
  k: number;
  onK: (k: number) => void;
  clusteredness: number;
  overlap: number;
}) {
  // 모두 한가운데로 모인 상태(가중치가 전부 0)를 알아본다.
  const collapsed = points.length > 0 && points.every((point) => point.x === 0.5 && point.y === 0.5);

  return (
    <Panel title={dict.scatter.title} note={dict.scatter.note}>
      <div className={styles.stage}>
        <svg
          className={styles.plot}
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          role="img"
          aria-label={dict.scatter.title}
        >
          {/* 20x20 격자. 겹침을 재는 칸이 눈에 보여야 그 수가 무슨 뜻인지 안다. */}
          {Array.from({ length: GRID + 1 }, (_, i) => (
            <g key={i}>
              <line
                className={styles.gridLine}
                x1={(i / GRID) * SIZE}
                y1={0}
                x2={(i / GRID) * SIZE}
                y2={SIZE}
              />
              <line
                className={styles.gridLine}
                x1={0}
                y1={(i / GRID) * SIZE}
                x2={SIZE}
                y2={(i / GRID) * SIZE}
              />
            </g>
          ))}
          {points.map((point) => (
            <circle
              key={point.id}
              cx={point.x * SIZE}
              cy={(1 - point.y) * SIZE}
              r={4}
              fill={GROUP_COLORS[groupOf(point.id) as keyof typeof GROUP_COLORS] ?? '#888'}
              opacity={0.9}
            />
          ))}
        </svg>

        <div className={styles.scores}>
          <div className={styles.score}>
            <span className={styles.scoreName}>{dict.scatter.clusteredness}</span>
            <span className={styles.scoreValue}>{clusteredness.toFixed(1)}</span>
            <span className={styles.kRow}>
              <span className={styles.scoreHint}>{dict.scatter.kLabel}</span>
              {/* 좁은 폭에서도 가로를 지켜야 해서 Segmented 대신 작은 단추 줄을 쓴다. */}
              <span className={styles.kButtons} role="group" aria-label={dict.scatter.kLabel}>
                {K_CHOICES.map((choice) => (
                  <button
                    key={choice}
                    type="button"
                    className={styles.kButton}
                    data-active={choice === k || undefined}
                    aria-pressed={choice === k}
                    onClick={() => onK(choice)}
                  >
                    {choice}
                  </button>
                ))}
              </span>
            </span>
            <span className={styles.scoreHint}>{fill(dict.scatter.clusterednessHint, { k })}</span>
          </div>
          <div className={styles.score}>
            <span className={styles.scoreName}>{dict.scatter.overlap}</span>
            <span className={styles.scoreValue}>{overlap.toFixed(2)}</span>
            <span className={styles.scoreHint}>{dict.scatter.overlapHint}</span>
          </div>
          <p className={styles.boundNote}>
            {fill(dict.scatter.boundNote, { bound: entropyUpperBound(3).toFixed(3) })}
          </p>
          {collapsed && <p className={styles.boundNote}>{dict.scatter.empty}</p>}
        </div>
      </div>

      <ul className={styles.legend}>
        {(Object.keys(GROUP_COLORS) as (keyof typeof GROUP_COLORS)[]).map((group) => (
          <li key={group} className={styles.legendItem}>
            <span className={styles.legendDot} style={{ background: GROUP_COLORS[group] }} aria-hidden />
            {dict.groups[group]}
          </li>
        ))}
      </ul>
    </Panel>
  );
}
