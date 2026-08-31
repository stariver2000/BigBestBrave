'use client';

/**
 * 계측 결과 칸.
 *
 * 지표 하나만 크게 띄우지 않는다. 신뢰도와 연속성은 서로 반대 방향의 잘못을 잡으므로,
 * 나란히 놓고 함께 읽어야 한다. 한 줄 평(verdict)은 그 둘의 차이가 무엇을 뜻하는지 옮긴 것이다.
 */

import { Panel } from '../../../kit';
import { GRADE_THRESHOLDS } from '../../../core/projection';
import type { Metrics } from '../../../core/projection';
import { MEASURE_SOURCE } from '../config';
import type { ProjectionKey } from '../dictionary';
import styles from './projection.module.css';

function gradeKey(value: number): ProjectionKey {
  const matched =
    GRADE_THRESHOLDS.find((grade) => value >= grade.min) ?? GRADE_THRESHOLDS[GRADE_THRESHOLDS.length - 1];
  return `grade-${matched.key}` as ProjectionKey;
}

/** 두 지표의 차이가 어느 쪽으로 기울었는지. 차이가 거의 없으면 균형으로 본다. */
function verdictKey(metrics: Metrics): ProjectionKey {
  if (Math.abs(metrics.trustworthiness - metrics.continuity) < 0.02) return 'verdict-balanced';
  return metrics.trustworthiness < metrics.continuity ? 'verdict-false' : 'verdict-missing';
}

/**
 * 지표 한 장. 무엇을 재는지(note)와 함께 **무엇을 놓치는지**(blind)를 같은 자리에 둔다.
 * 재는 것만 적으면 그 수치 하나로 판단하게 되고, 이 페이지가 하려는 말은 정반대이기 때문이다.
 */
function MetricCard({
  name,
  value,
  note,
  blind,
  blindLabel,
  grade,
}: {
  name: string;
  value: string;
  note: string;
  blind: string;
  blindLabel: string;
  grade?: string;
}) {
  return (
    <div className={styles.metric}>
      <span className={styles.metricName}>{name}</span>
      <span className={styles.metricValue}>{value}</span>
      {grade && <span className={styles.metricGrade}>{grade}</span>}
      <span className={styles.metricNote}>{note}</span>
      <span className={styles.metricBlind}>
        <span className={styles.metricBlindLabel}>{blindLabel}</span>
        {blind}
      </span>
    </div>
  );
}

export function MetricPanel({
  metrics,
  t,
}: {
  metrics: Metrics | undefined;
  t: (key: ProjectionKey) => string;
}) {
  return (
    <Panel title={t('metric-title')} note={t('metric-note')}>
      {metrics ? (
        <>
          <div className={styles.metricGrid}>
            <MetricCard
              name={t('metric-trust')}
              value={metrics.trustworthiness.toFixed(3)}
              grade={t(gradeKey(metrics.trustworthiness))}
              note={t('metric-trust-note')}
              blind={t('metric-trust-blind')}
              blindLabel={t('metric-blind')}
            />
            <MetricCard
              name={t('metric-continuity')}
              value={metrics.continuity.toFixed(3)}
              grade={t(gradeKey(metrics.continuity))}
              note={t('metric-continuity-note')}
              blind={t('metric-continuity-blind')}
              blindLabel={t('metric-blind')}
            />
            <MetricCard
              name={t('metric-global')}
              value={metrics.distanceCorrelation.toFixed(3)}
              note={t('metric-global-note')}
              blind={t('metric-global-blind')}
              blindLabel={t('metric-blind')}
            />
            {metrics.neighborhoodHit !== null && (
              <MetricCard
                name={t('metric-hit')}
                value={metrics.neighborhoodHit.toFixed(3)}
                note={t('metric-hit-note')}
                blind={t('metric-hit-blind')}
                blindLabel={t('metric-blind')}
              />
            )}
          </div>
          <p className={styles.verdict}>
            <strong>{t('verdict-title')}</strong> — {t(verdictKey(metrics))}
          </p>

          {/*
            지표는 이웃 수 k와 한 몸이고, 등급은 합격선이 아니다. 값 옆에 이 두 사정을 두지 않으면
            숫자만 떼어 인용되기 쉽다 — 이 페이지가 막으려는 것이 바로 그 인용이다.
          */}
          <p className={styles.scope}>
            <span className={styles.scopeItem}>
              {t('metric-k')} k = {metrics.k}
            </span>
            <span className={styles.scopeItem}>
              {metrics.pointCount} {t('metric-points')}
            </span>
          </p>
          <p className={styles.metricNote}>{t('metric-k-note')}</p>

          <p className={styles.scope}>
            <span className={styles.scopeLabel}>{t('grade-scale')}</span>
            {GRADE_THRESHOLDS.map((grade) => (
              <span key={grade.key} className={styles.scopeItem}>
                {t(`grade-${grade.key}` as ProjectionKey)}
                {/* 가장 낮은 구간은 문턱이 0이라 적을 값이 없다. 0.00을 적으면 기준처럼 읽힌다. */}
                {grade.min > 0 && <span className={styles.scopeValue}>≥ {grade.min.toFixed(2)}</span>}
              </span>
            ))}
          </p>
          <p className={styles.metricNote}>{t('grade-note')}</p>
          {/* 지표의 정의를 세운 연구와, 이 페이지의 근거가 된 서베이는 서로 다르다. 둘 다 밝힌다. */}
          <p className={styles.metricNote}>{MEASURE_SOURCE}</p>
        </>
      ) : (
        <p className={styles.metricNote}>{t('plot-empty')}</p>
      )}
    </Panel>
  );
}
