'use client';

/**
 * 맥락 화면.
 *
 * 순서가 뜻을 갖는다. 문장을 가르고, 스스로 물어 볼 자리를 먼저 주고, 그 다음에야
 * 논문의 열 칸을 편다. 논문이 스스로 적어 둔 역효과가 "건네받은 물음이 있으면 스스로
 * 묻기를 그만두게 된다"였기 때문이다. 그 순서를 화면이 지킨다.
 *
 * 기본값은 '펼쳐 둠'이다. 첫 화면에서 열 칸이 이미 보여야 볼거리가 있다.
 * 가려 두기는 아래쪽 판에서 까닭과 함께 권한다.
 */

import { useMemo, useState } from 'react';
import { Badge, Button, Panel, Segmented, TextInput, type SegmentedOption } from '../../../kit';
import {
  ALPHA,
  AXES,
  CLICKS,
  COMPONENTS,
  CONTEXT_GRID,
  EXPLORATION,
  MATCH_QUALITY,
  MATCH_TOTAL,
  PASSIVE_READING,
  chartFor,
  isLine,
  parseStatement,
  shapeAfter,
  type Axis,
  type Component,
  type ContextCell,
} from '../../../core/contextualization';
import { createTranslator, type Locale } from '../../../core/i18n';
import { PAPER, PRESETS, RATING_SCALE } from '../config';
import { contextDictionary, type ContextKey } from '../dictionary';
import { ShapePlot } from './ShapePlot';
import styles from './context.module.css';

type Cover = 'open' | 'covered';

const MATCH_ROWS = ['entity', 'date', 'indicator', 'all'] as const;
const EXPLORE_ROWS = ['fertility', 'carbon', 'total'] as const;

export function Context({ locale }: { locale: Locale }) {
  const t = createTranslator(contextDictionary, locale);

  const [sentence, setSentence] = useState<string>(PRESETS[0]);
  const [cover, setCover] = useState<Cover>('open');
  const [own, setOwn] = useState<string[]>([]);
  const [draft, setDraft] = useState('');
  const [picked, setPicked] = useState<ContextCell | null>({ component: 'entity', axis: 'relational' });

  const parsed = useMemo(() => parseStatement(sentence), [sentence]);

  // 문구의 빈자리를 코어의 값으로 채운다. 숫자를 사전에 적어 두면 코어와 어긋나도 아무도 모른다.
  const clickSentence = useMemo(() => {
    const { total, generated, fallback } = CLICKS.questions;
    const share = (count: number) => ((count / total) * 100).toFixed(1);
    return t('ev-clicks')
      .replace('{total}', String(total))
      .replace('{generated}', String(generated))
      .replace('{gpct}', share(generated))
      .replace('{fallback}', String(fallback))
      .replace('{fpct}', share(fallback));
  }, [t]);
  const shape = picked ? shapeAfter(picked, parsed.span) : null;
  const kind = shape ? chartFor(shape) : null;

  const coverOptions: SegmentedOption<Cover>[] = [
    { value: 'open', label: t('hide-off') },
    { value: 'covered', label: t('hide-on') },
  ];

  const addOwn = () => {
    const text = draft.trim();
    if (text.length === 0) return;
    setOwn((prev) => [...prev, text]);
    setDraft('');
  };

  const partRow = (key: ContextKey, value: string | null) => (
    <div className={styles.part} data-missing={value === null}>
      <span className={styles.partLabel}>{t(key)}</span>
      <span className={styles.partValue}>{value ?? t('p-missing')}</span>
    </div>
  );

  return (
    <div className={styles.layout}>
      <p className={styles.paper}>
        <span className={styles.paperLabel}>{t('paper-label')}</span>
        <a href={PAPER.link} target="_blank" rel="noreferrer">
          {PAPER.title}
        </a>
        <span className={styles.paperMeta}>
          {PAPER.authors} · {PAPER.affiliation} · {PAPER.venue} · {t('full-text')} {PAPER.fullText}
        </span>
      </p>

      <Panel title={t('stmt-title')} note={t('stmt-note')}>
        <div className={styles.presets}>
          <span className={styles.smallLabel}>{t('stmt-preset')}</span>
          {PRESETS.map((preset) => (
            <button
              key={preset}
              type="button"
              className={styles.preset}
              data-on={preset === sentence}
              onClick={() => setSentence(preset)}
            >
              {preset}
            </button>
          ))}
        </div>

        <label className={styles.field}>
          <span className={styles.smallLabel}>{t('stmt-input')}</span>
          <TextInput value={sentence} onChange={setSentence} />
        </label>

        <div className={styles.parts}>
          {partRow('p-entity', parsed.entity)}
          {partRow('p-indicator', parsed.indicator)}
          {partRow('p-date', parsed.date)}
          {partRow('p-value', parsed.value)}
          <div className={styles.part}>
            <span className={styles.partLabel}>{t('shape-span')}</span>
            <span className={styles.partValue}>
              {parsed.span === 'point' ? t('p-span-point') : t('p-span-duration')}
            </span>
          </div>
        </div>
        <p className={styles.note}>
          {Math.round(parsed.confidence * 3)} / 3 {t('p-confidence')} · {t('p-rule')}
        </p>
      </Panel>

      <Panel title={t('own-title')} note={t('own-note')}>
        <div className={styles.ownRow}>
          <TextInput value={draft} onChange={setDraft} placeholder={t('own-placeholder')} />
          <Button onClick={addOwn}>{t('own-add')}</Button>
        </div>
        <div className={styles.ownList}>
          <span className={styles.smallLabel}>{t('own-saved')}</span>
          {own.length === 0 ? (
            <span className={styles.note}>{t('own-empty')}</span>
          ) : (
            own.map((question, index) => (
              <p key={`${question}-${index}`} className={styles.ownItem}>
                {question}
              </p>
            ))
          )}
        </div>
      </Panel>

      <Panel
        title={t('grid-title')}
        note={cover === 'covered' ? t('grid-hidden') : t('grid-note')}
        actions={<Segmented options={coverOptions} value={cover} onChange={setCover} dense />}
      >
        <div className={styles.grid}>
          <div className={styles.gridRow}>
            <div className={styles.gridHead} />
            {AXES.map((axis) => (
              <div key={axis} className={styles.gridHead}>
                {t(`a-${axis}` as ContextKey)}
              </div>
            ))}
          </div>
          {COMPONENTS.map((component: Component) => (
            <div key={component} className={styles.gridRow}>
              <div className={styles.rowHead}>{t(`c-${component}` as ContextKey)}</div>
              {AXES.map((axis: Axis) => {
                if (!CONTEXT_GRID[component][axis]) {
                  return (
                    <div key={axis} className={styles.cellEmpty}>
                      <span className={styles.cellName}>{t('empty-cell')}</span>
                      <span className={styles.cellWhy}>
                        {t(component === 'indicator' ? 'empty-why-indicator' : 'empty-why-date')}
                      </span>
                    </div>
                  );
                }
                const on = picked?.component === component && picked.axis === axis;
                return (
                  <button
                    key={axis}
                    type="button"
                    className={styles.cell}
                    data-on={on}
                    aria-pressed={on}
                    onClick={() => setPicked({ component, axis })}
                  >
                    <span className={styles.cellName}>
                      {t(`c-${component}` as ContextKey)} · {t(`a-${axis}` as ContextKey)}
                    </span>
                    {cover === 'open' && (
                      <span className={styles.cellQuestion}>
                        {t(`q-${component}-${axis}` as ContextKey)}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
        <p className={styles.note}>{t('empty-mine')}</p>
      </Panel>

      <Panel title={t('shape-title')} note={t('shape-note')}>
        {shape === null || kind === null ? (
          <p className={styles.note}>{t('shape-pick')}</p>
        ) : (
          <div className={styles.shape}>
            <div className={styles.shapeFacts}>
              <div className={styles.fact}>
                <span className={styles.smallLabel}>{t('shape-entities')}</span>
                <span className={styles.factValue}>{t(`shape-${shape.entities}` as ContextKey)}</span>
              </div>
              <div className={styles.fact}>
                <span className={styles.smallLabel}>{t('shape-indicators')}</span>
                <span className={styles.factValue}>{t(`shape-${shape.indicators}` as ContextKey)}</span>
              </div>
              <div className={styles.fact}>
                <span className={styles.smallLabel}>{t('shape-span')}</span>
                <span className={styles.factValue}>{t(`shape-${shape.span}` as ContextKey)}</span>
              </div>
              <div className={styles.fact} data-kind={isLine(kind) ? 'line' : 'bar'}>
                <span className={styles.smallLabel}>&rarr;</span>
                <span className={styles.factChart}>{t(`k-${kind}` as ContextKey)}</span>
              </div>
            </div>
            <ShapePlot kind={kind} />
          </div>
        )}
        <p className={styles.note}>{t('shape-only')}</p>
      </Panel>

      <div className={styles.pair}>
        <Panel title={t('ev-title')} note={t('ev-note')}>
          <div className={styles.table}>
            {MATCH_ROWS.map((row) => {
              const cell = MATCH_QUALITY[row];
              return (
                <div key={row} className={styles.tableRow}>
                  <span className={styles.tableName}>{t(`ev-${row}` as ContextKey)}</span>
                  <span className={styles.tableBarWrap}>
                    <span className={styles.tableBar} style={{ width: `${cell.percent}%` }} />
                  </span>
                  <span className={styles.tableNum}>{cell.percent.toFixed(1)}%</span>
                  <span className={styles.tableFine}>
                    {t('ev-match')} {cell.matched} / {MATCH_TOTAL}
                    {cell.rating > 0 ? ` · ${t('ev-rating')} ${cell.rating.toFixed(2)} / ${RATING_SCALE.max}` : ''}
                  </span>
                </div>
              );
            })}
          </div>
          <p className={styles.note}>{clickSentence}</p>
        </Panel>

        <Panel title={t('ex-title')} note={t('ex-note')}>
          <div className={styles.table}>
            {EXPLORE_ROWS.map((row) => {
              const cell = EXPLORATION[row];
              const significant = cell.p < ALPHA;
              return (
                <div key={row} className={styles.tableRow}>
                  <span className={styles.tableName}>{t(`ex-${row}` as ContextKey)}</span>
                  <span className={styles.tableNum} data-kind="tool">
                    {cell.withTool.toFixed(2)}
                  </span>
                  <span className={styles.tableNum} data-kind="base">
                    {cell.baseline.toFixed(2)}
                  </span>
                  <Badge tone={significant ? 'pass' : 'fail'}>
                    {significant ? t('ex-sig') : t('ex-nosig')}
                  </Badge>
                  <span className={styles.tableFine}>
                    p = {cell.p.toFixed(3)} · {cell.statistic}
                  </span>
                </div>
              );
            })}
          </div>
          <p className={styles.note}>
            <span className={styles.swatchTool} /> {t('ex-tool')} &nbsp;
            <span className={styles.swatchBase} /> {t('ex-base')}
          </p>
        </Panel>
      </div>

      <Panel title={t('passive-title')} note={t('passive-note')}>
        <blockquote className={styles.quote}>{t('passive-quote')}</blockquote>
        <p className={styles.note}>{t('passive-counts')}</p>
        <div className={styles.counts}>
          <span className={styles.count} data-kind="own">
            {PASSIVE_READING.nudged} / {PASSIVE_READING.participants}
          </span>
          <span className={styles.count} data-kind="warn">
            {PASSIVE_READING.shallow} / {PASSIVE_READING.participants}
          </span>
          <span className={styles.count} data-kind="warn">
            {PASSIVE_READING.passive} / {PASSIVE_READING.participants}
          </span>
        </div>
        <p className={styles.note}>{t('hide-note')}</p>
      </Panel>

      <Panel title={t('took-title')}>
        <p className={styles.note}>{t('took-yes')}</p>
        <p className={styles.note}>{t('took-no')}</p>
        <p className={styles.note}>{t('took-mine')}</p>
      </Panel>
    </div>
  );
}
