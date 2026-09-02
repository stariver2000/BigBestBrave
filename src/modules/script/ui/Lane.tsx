'use client';

/**
 * 자리 살피기 판.
 *
 * 표 6이 말한 것 - 각 갈래가 영상(1000으로 정규화)의 어느 자리에 놓이는지 -
 * 위에 내 문장의 자리를 찍는다. 띠는 말뭉치 120편의 가운데 90%다.
 * 띠 밖은 흔치 않은 자리라는 관찰이지, 잘못이 아니다(패널 설명에 적는다).
 */

import { CATEGORIES, TIME_STATS, type CategoryPlacement } from '../../../core/howto';
import { Panel } from '../../../kit';
import { CATEGORY_COLORS } from '../config';
import type { ScriptDictionary } from '../dictionary';
import styles from './script.module.css';

export function Lane({
  dict,
  lanes,
  hasLabels,
}: {
  dict: ScriptDictionary;
  lanes: readonly CategoryPlacement[];
  hasLabels: boolean;
}) {
  const byCategory = new Map(lanes.map((lane) => [lane.category, lane]));

  return (
    <Panel title={dict.lane.title} note={dict.lane.note}>
      {!hasLabels ? (
        <p className={styles.empty}>{dict.lane.empty}</p>
      ) : (
        <>
          <div className={styles.lanes}>
            {CATEGORIES.map((category) => {
              const lane = byCategory.get(category);
              const band = TIME_STATS[category];
              const color = CATEGORY_COLORS[category];
              return (
                <div key={category} className={styles.lane} data-absent={!lane || undefined}>
                  <span className={styles.laneName}>{dict.categories[category]}</span>
                  <div className={styles.laneTrack}>
                    <span
                      className={styles.laneBand}
                      style={{
                        insetInlineStart: `${band.q5 / 10}%`,
                        inlineSize: `${(band.q95 - band.q5) / 10}%`,
                        background: `color-mix(in srgb, ${color} 16%, transparent)`,
                      }}
                    />
                    {lane?.positions.map((position, i) => (
                      <span
                        key={`${position}-${i}`}
                        className={styles.laneDot}
                        data-outside={lane.outside.includes(position) || undefined}
                        style={{ insetInlineStart: `${position / 10}%`, background: color }}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
          <p className={styles.laneLegend}>
            <span className={styles.legendBand} aria-hidden /> {dict.lane.band}
            <span className={styles.legendDot} aria-hidden /> {dict.lane.dot}
            <span className={styles.legendOutside} aria-hidden /> {dict.lane.outside}
          </p>
        </>
      )}
    </Panel>
  );
}
