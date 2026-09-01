'use client';

/**
 * 산점도 신뢰도 검사 화면.
 *
 * 계산은 자료가 바뀔 때만 다시 한다. 모든 점쌍의 거리를 재므로 비용이 점 개수의 제곱으로 늘어나
 * 입력 한 글자마다 다시 계산하면 화면이 멈춘다.
 */

import { useMemo, useState } from 'react';
import { Button, Field, Panel, PaperCard, useClipboard } from '../../../kit';
import { LIMITS } from '../../../core/projection';
import { parseCsv } from '../../../core/table';
import { createTranslator, type Locale } from '../../../core/i18n';
import { BLUEPRINT_PALETTE } from '../../../looks/blueprint/config';
import { DEFAULT_SETTINGS, DOWNLOAD_FILENAME, PAPER } from '../config';
import { projectionDictionary } from '../dictionary';
import { analyze, numericColumnIndices, reportCsv, type ColumnChoice } from '../analyze';
import { sampleCsv } from '../sample';
import { MetricPanel } from './MetricPanel';
import { ScatterPlot } from './ScatterPlot';
import styles from './projection.module.css';

const REPORT_COPY_KEY = 'report';

function download(text: string, filename: string): void {
  const blob = new Blob([text], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}

export function Reliability({ locale }: { locale: Locale }) {
  const t = createTranslator(projectionDictionary, locale);
  const { copiedKey, copy } = useClipboard();

  const [source, setSource] = useState('');
  const [choice, setChoice] = useState<ColumnChoice>({ x: null, y: null, label: null });
  const [neighbors, setNeighbors] = useState<number>(DEFAULT_SETTINGS.neighbors);
  const [standardizeColumns, setStandardizeColumns] = useState<boolean>(DEFAULT_SETTINGS.standardize);

  const table = useMemo(() => parseCsv(source), [source]);
  // 예시를 보고 있을 때만 그 예시가 무엇을 보여 주려는 것인지 밝힌다.
  // 남의 자료에 대고 설명하면 그 자료가 그런 자료라는 뜻이 되어 버린다.
  const showingSample = source === sampleCsv();
  const numeric = useMemo(() => numericColumnIndices(table), [table]);

  const analysis = useMemo(
    () => (table.rows.length === 0 ? null : analyze(table, choice, neighbors, standardizeColumns)),
    [table, choice, neighbors, standardizeColumns],
  );

  /** 예시를 넣을 때는 열 지정을 초기화한다. 앞 자료의 열 번호가 남아 있으면 엉뚱한 축을 잡는다. */
  const loadSample = () => {
    setSource(sampleCsv());
    setChoice({ x: null, y: null, label: null });
  };

  const columnOptions = (allowNone: string) => (
    <>
      <option value="">{allowNone}</option>
      {table.columns.map((name, index) => (
        <option key={index} value={index}>
          {name}
        </option>
      ))}
    </>
  );

  const setColumn = (key: keyof ColumnChoice) => (value: string) =>
    setChoice((current) => ({ ...current, [key]: value === '' ? null : Number(value) }));

  // 렌즈가 쓰는 문구를 한 묶음으로 넘긴다. 그림 부품이 사전을 알 필요는 없다.
  const lensLabels = {
    kept: t('lens-kept'),
    imposters: t('lens-imposters'),
    pushed: t('lens-pushed'),
    idle: t('lens-idle'),
    legendLow: t('plot-legend-low'),
    legendHigh: t('plot-legend-high'),
  };

  return (
    <div className={styles.layout}>
      <PaperCard
        label={t('paper-label')}
        title={PAPER.title}
        meta={`${PAPER.affiliation} · ${PAPER.venue}`}
        href={PAPER.doi}
        plain={PAPER.plain}
        locale={locale}
      />

      <div className={styles.main}>
        <Panel title={t('plot-title')} note={t('plot-note')}>
          {analysis ? (
            <ScatterPlot
              points={analysis.low}
              distortions={analysis.distortions}
              neighbors={neighbors}
              accentHex={BLUEPRINT_PALETTE.accent}
              labels={lensLabels}
            />
          ) : (
            <p className={styles.plotEmpty}>{table.rows.length === 0 ? t('plot-empty') : t('data-need')}</p>
          )}
        </Panel>

        <div className={styles.side}>
          <MetricPanel metrics={analysis?.metrics} t={t} />

          <Panel title={t('mapping-title')} note={t('mapping-note')}>
            <div className={styles.controlRow}>
              <Field label={t('mapping-x')}>
                <select
                  className={styles.select}
                  value={choice.x ?? ''}
                  onChange={(event) => setColumn('x')(event.target.value)}
                >
                  {columnOptions(t('mapping-auto'))}
                </select>
              </Field>
              <Field label={t('mapping-y')}>
                <select
                  className={styles.select}
                  value={choice.y ?? ''}
                  onChange={(event) => setColumn('y')(event.target.value)}
                >
                  {columnOptions(t('mapping-auto'))}
                </select>
              </Field>
              <Field label={t('mapping-label')}>
                <select
                  className={styles.select}
                  value={choice.label ?? ''}
                  onChange={(event) => setColumn('label')(event.target.value)}
                >
                  {columnOptions(t('mapping-none'))}
                </select>
              </Field>
            </div>

            <div className={styles.controlRow}>
              <Field label={`${t('settings-neighbors')} ${neighbors}`}>
                <input
                  className={styles.slider}
                  type="range"
                  min={LIMITS.neighbors.min}
                  max={LIMITS.neighbors.max}
                  value={neighbors}
                  onChange={(event) => setNeighbors(Number(event.target.value))}
                />
              </Field>
              <label className={styles.checkbox}>
                <input
                  type="checkbox"
                  checked={standardizeColumns}
                  onChange={(event) => setStandardizeColumns(event.target.checked)}
                />
                {t('settings-standardize')}
              </label>
            </div>
          </Panel>
        </div>
      </div>

      <Panel
        title={t('data-title')}
        note={t('data-note')}
        actions={
          <div className={styles.actions}>
            <Button onClick={loadSample}>{t('data-sample')}</Button>
            <Button onClick={() => setSource('')}>{t('data-clear')}</Button>
            {analysis && (
              <>
                <Button variant="primary" onClick={() => download(reportCsv(analysis), DOWNLOAD_FILENAME)}>
                  {t('export-report')}
                </Button>
                <Button onClick={() => copy(reportCsv(analysis), REPORT_COPY_KEY)}>
                  {copiedKey === REPORT_COPY_KEY ? t('copied') : t('copy')}
                </Button>
              </>
            )}
          </div>
        }
      >
        <textarea
          className={styles.textarea}
          value={source}
          placeholder={t('data-placeholder')}
          spellCheck={false}
          onChange={(event) => setSource(event.target.value)}
        />
        <div className={styles.meta}>
          <span>
            <span className={styles.metaStrong}>{table.rows.length}</span> {t('data-rows')}
          </span>
          <span>
            <span className={styles.metaStrong}>{numeric.length}</span> {t('data-columns')}
          </span>
          {analysis?.truncatedFrom && (
            <span className={styles.warn}>
              {LIMITS.maxPoints}
              {t('data-truncated')}
            </span>
          )}
        </div>

        {showingSample && (
          <div className={styles.sampleNote}>
            <p className={styles.sampleTitle}>{t('sample-title')}</p>
            <p className={styles.sampleBody}>{t('sample-body')}</p>
          </div>
        )}
      </Panel>
    </div>
  );
}
