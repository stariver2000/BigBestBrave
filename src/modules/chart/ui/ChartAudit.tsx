'use client';

/**
 * 차트 왜곡 검사 화면.
 *
 * 왼쪽에서 설정을 만지면 오른쪽 두 그림이 함께 바뀐다.
 * 보여 준 그림과 바로잡은 그림을 나란히 두는 이유: 배수만 적어 두면 실감이 나지 않는다.
 * 같은 자료가 이렇게 달라 보인다는 것을 옆에 놓고 보아야 안다.
 */

import { useMemo, useState } from 'react';
import { Panel, PaperCard } from '../../../kit';
import { audit, extent, honest, type ChartKind, type ChartSpec } from '../../../core/chartaudit';
import { createTranslator, type Locale } from '../../../core/i18n';
import { FACTOR_CAP, PAPER, PLOT, SAMPLE_VALUES } from '../config';
import { chartDictionary, type ChartKey } from '../dictionary';
import { Plot } from './Plot';
import styles from './chart.module.css';

const KINDS: ChartKind[] = ['bar', 'line', 'bubble'];

/** 사람이 적은 자료를 숫자로 읽는다. 읽히지 않는 것은 버리고, 하나도 없으면 예시로 되돌린다. */
function parseValues(text: string): number[] {
  const numbers = text
    .split(/[,\s]+/)
    .map((token) => Number(token))
    .filter((value) => Number.isFinite(value));
  return numbers.length >= 2 ? numbers : SAMPLE_VALUES;
}

export function ChartAudit({ locale }: { locale: Locale }) {
  const t = createTranslator(chartDictionary, locale);

  const [kind, setKind] = useState<ChartKind>('bar');
  const [text, setText] = useState(SAMPLE_VALUES.join(', '));
  const [axisMin, setAxisMin] = useState<number | null>(null);
  const [height, setHeight] = useState(200);
  const [inverted, setInverted] = useState(false);
  const [radiusScale, setRadiusScale] = useState(false);

  const values = useMemo(() => parseValues(text), [text]);
  const bounds = useMemo(() => extent(values), [values]);

  const shown: ChartSpec = {
    kind,
    values,
    axisMin,
    axisMax: null,
    width: PLOT.width,
    height,
    bubbleScale: radiusScale ? 'radius' : 'area',
    inverted,
  };
  const corrected = useMemo(() => honest(shown), [shown]);
  const report = useMemo(() => audit(shown), [shown]);

  const worst = Number.isFinite(report.worst) ? report.worst : FACTOR_CAP;
  const flagged = report.findings.length > 0;

  return (
    <div className={styles.layout}>
      <PaperCard
        label={t('paper-label')}
        title={PAPER.title}
        meta={`${PAPER.affiliation} · ${PAPER.venue}`}
        href={PAPER.link}
        plain={PAPER.plain}
        locale={locale}
      />

      <div className={styles.main}>
        <Panel title={t('controls-title')} note={t('controls-note')}>
          <div className={styles.controls}>
            <div className={styles.row}>
              <span className={styles.rowLabel}>{t('kind')}</span>
              <div className={styles.plots} style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: 6 }}>
                {KINDS.map((option) => (
                  <button
                    key={option}
                    type="button"
                    className={styles.input}
                    style={{
                      cursor: 'pointer',
                      fontWeight: kind === option ? 700 : 400,
                      borderColor: kind === option ? 'var(--bbb-accent)' : undefined,
                      color: kind === option ? 'var(--bbb-accent)' : undefined,
                    }}
                    onClick={() => setKind(option)}
                  >
                    {t(`kind-${option}` as ChartKey)}
                  </button>
                ))}
              </div>
            </div>

            <label className={styles.row}>
              <span className={styles.rowLabel}>{t('values')}</span>
              <input className={styles.input} value={text} onChange={(event) => setText(event.target.value)} />
              <span className={styles.quiet}>{t('values-note')}</span>
            </label>

            <label className={styles.row}>
              <span className={styles.rowLabel}>
                {t('axis-min')}{' '}
                <span className={styles.rowValue}>{axisMin === null ? t('axis-auto') : axisMin}</span>
              </span>
              <input
                className={styles.slider}
                type="range"
                min={0}
                max={Math.max(1, Math.floor(bounds.min))}
                value={axisMin ?? 0}
                onChange={(event) => {
                  const next = Number(event.target.value);
                  setAxisMin(next === 0 ? null : next);
                }}
              />
            </label>

            <label className={styles.row}>
              <span className={styles.rowLabel}>
                {t('height')} <span className={styles.rowValue}>{height}px</span>
              </span>
              <input
                className={styles.slider}
                type="range"
                min={PLOT.minHeight}
                max={PLOT.maxHeight}
                step={10}
                value={height}
                onChange={(event) => setHeight(Number(event.target.value))}
              />
            </label>

            <label className={styles.toggle}>
              <input type="checkbox" checked={inverted} onChange={(event) => setInverted(event.target.checked)} />
              {t('invert')}
            </label>

            {kind === 'bubble' && (
              <label className={styles.toggle}>
                <input
                  type="checkbox"
                  checked={radiusScale}
                  onChange={(event) => setRadiusScale(event.target.checked)}
                />
                {t('radius-scale')}
              </label>
            )}
          </div>
        </Panel>

        <div className={styles.layout}>
          <div className={styles.plots}>
            <div className={`${styles.plotBox} ${flagged ? styles.plotFlagged : ''}`}>
              <span className={`${styles.plotLabel} ${flagged ? styles.plotLabelFlagged : ''}`}>
                {t('shown-title')}
              </span>
              <span className={styles.plotNote}>{t('shown-note')}</span>
              <Plot spec={shown} />
            </div>
            <div className={styles.plotBox}>
              <span className={styles.plotLabel}>{t('honest-title')}</span>
              <span className={styles.plotNote}>{t('honest-note')}</span>
              <Plot spec={corrected} />
            </div>
          </div>

          {flagged ? (
            <p className={styles.verdict}>
              <span className={styles.verdictNumber}>{worst.toFixed(1)}</span>
              <span>
                {t('verdict-times')} · {t('verdict-worst')}
              </span>
            </p>
          ) : (
            <p className={`${styles.verdict} ${styles.verdictClean}`}>{t('verdict-clean')}</p>
          )}
        </div>
      </div>

      <Panel title={t('findings-title')} note={t('findings-note')}>
        {report.findings.length === 0 ? (
          <p className={styles.quiet}>{t('verdict-clean')}</p>
        ) : (
          <div className={styles.findings}>
            {report.findings.map((finding) => (
              <div key={finding.kind} className={styles.finding}>
                <div className={styles.findingHead}>
                  <span className={styles.findingName}>{t(`kind-${finding.kind}` as ChartKey)}</span>
                  <span className={styles.findingFactor}>
                    {finding.factor === null || !Number.isFinite(finding.factor)
                      ? t('factor-unmeasurable')
                      : `${t('factor-label')} ${finding.factor.toFixed(1)}${t('verdict-times')}`}
                  </span>
                  <span className={styles.findingSeverity}>
                    {t(`severity-${finding.severity}` as ChartKey)}
                  </span>
                </div>
                <p className={styles.findingWhy}>{t(`why-${finding.kind}` as ChartKey)}</p>
              </div>
            ))}
          </div>
        )}
        <p className={styles.quiet}>{t('paper-note')}</p>
      </Panel>
    </div>
  );
}
