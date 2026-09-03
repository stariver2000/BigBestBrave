'use client';

/**
 * 두 눈금 판. 왼쪽은 보기 좋음(미적), 오른쪽은 속이지 않음(충실도).
 *
 * 점수를 지어내지 않는다 - 배치에서 실제로 잰 값이고, 잴 수 없는 자리
 * (교차가 없을 때의 교차각)는 그렇다고 적는다.
 */

import {
  MEASURED_AESTHETICS,
  MEASURED_FAITHFULNESS,
  type FaithfulnessId,
  type Scores,
} from '../../../core/graphaes';
import { Panel } from '../../../kit';
import { GAUGE_VARS } from '../config';
import type { LayoutDictionary } from '../dictionary';
import styles from './layout.module.css';

function Row({
  name,
  value,
  delta,
  color,
  emptyLabel,
  labels,
}: {
  name: string;
  value: number | null;
  delta: number | null;
  color: string;
  emptyLabel: string;
  labels: { up: string; down: string; same: string };
}) {
  if (value === null) {
    return (
      <li className={styles.gaugeRow}>
        <span className={styles.gaugeName}>{name}</span>
        <span className={styles.gaugeEmpty}>{emptyLabel}</span>
      </li>
    );
  }
  const moved = delta === null ? 0 : delta;
  const direction = Math.abs(moved) < 0.005 ? 'same' : moved > 0 ? 'up' : 'down';
  return (
    <li className={styles.gaugeRow}>
      <span className={styles.gaugeName}>{name}</span>
      <span className={styles.gaugeBarWrap}>
        <span
          className={styles.gaugeBar}
          style={{ inlineSize: `${Math.round(value * 100)}%`, background: color }}
        />
      </span>
      <span className={styles.gaugeValue}>{value.toFixed(3)}</span>
      <span className={styles.gaugeDelta} data-direction={direction}>
        {direction === 'same' ? labels.same : `${moved > 0 ? '+' : ''}${moved.toFixed(3)}`}
      </span>
    </li>
  );
}

export function Gauges({
  dict,
  scores,
  delta,
  steps,
}: {
  dict: LayoutDictionary;
  scores: Scores;
  delta: { aesthetics: Record<string, number | null>; faithfulness: Record<string, number> };
  steps: number;
}) {
  const labels = { up: dict.gauges.up, down: dict.gauges.down, same: dict.gauges.same };

  return (
    <Panel title={dict.gauges.title} note={dict.gauges.note}>
      <div className={styles.gaugeColumns}>
        <div>
          <h3 className={styles.gaugeHead} style={{ color: GAUGE_VARS.readability }}>
            {dict.gauges.readability}
          </h3>
          <ul className={styles.gaugeList}>
            {MEASURED_AESTHETICS.map((id) => (
              <Row
                key={id}
                name={dict.aesthetics[id]}
                value={scores.aesthetics[id]}
                delta={delta.aesthetics[id] ?? null}
                color={GAUGE_VARS.readability}
                emptyLabel={dict.gauges.noCrossing}
                labels={labels}
              />
            ))}
          </ul>
        </div>
        <div>
          <h3 className={styles.gaugeHead} style={{ color: GAUGE_VARS.faithfulness }}>
            {dict.gauges.faithfulness}
          </h3>
          <ul className={styles.gaugeList}>
            {MEASURED_FAITHFULNESS.map((id: FaithfulnessId) => (
              <Row
                key={id}
                name={dict.faithfulness[id]}
                value={scores.faithfulness[id]}
                delta={delta.faithfulness[id] ?? null}
                color={GAUGE_VARS.faithfulness}
                emptyLabel={dict.gauges.noCrossing}
                labels={labels}
              />
            ))}
          </ul>
        </div>
      </div>
      <p className={styles.deltaHint}>
        {steps === 0 ? dict.gauges.deltaHint : `${dict.gauges.deltaTitle} · ${dict.gauges.deltaHint}`}
      </p>
    </Panel>
  );
}
