'use client';

/**
 * 채널 화면.
 *
 * 순서: 먼저 튀어나옴을 겪게 하고(넓이는 바로 보이고 밝기는 한참 걸린다), 그 다음에
 * 두 순위표를 나란히 편다. 겪은 뒤에 보면 순위표의 어긋남이 낯설지 않다.
 *
 * 정확도와 튀어나옴은 종류가 다른 값(로그 오차와 정답률)이라 한 눈금에 놓지 않는다.
 * 두 표를 따로 그리고, 어긋나는 두 채널(넓이·길이)만 색으로 잇는다.
 */

import { useMemo, useState } from 'react';
import { Button, Panel, Segmented, type SegmentedOption } from '../../../kit';
import {
  CHANCE_LOG_ERROR,
  POPOUT_ACCURACY,
  POWER_CORRECTION,
  SEPARABILITY,
  WEBER_FITS,
  WORST_PAIR,
  accuracyRanking,
  curve,
  makeTrial,
  popoutRanking,
  separabilityBaseline,
  worstPairGapToChance,
} from '../../../core/channels';
import { createTranslator, type Locale } from '../../../core/i18n';
import { DEMO, DEMO_CHANNELS, MODEL_SHAPE, PAPER, type DemoChannel } from '../config';
import { channelDictionary, type ChannelKey } from '../dictionary';
import { Mark } from './Mark';
import styles from './channel.module.css';

/** 문구의 {자리}를 코어 값으로 채운다. */
function fill(text: string, values: Record<string, string | number>): string {
  return Object.entries(values).reduce(
    (out, [key, value]) => out.replaceAll(`{${key}}`, String(value)),
    text,
  );
}

const SEP_ROWS = ['length', 'tilt', 'area', 'luminance', 'saturation', 'curvature'] as const;
const SEP_COLS = ['position', 'length', 'tilt', 'area', 'luminance', 'saturation', 'curvature'] as const;
const WEBER_ROWS = ['area', 'curvature', 'length', 'luminance', 'saturation', 'tilt-low', 'tilt-high'] as const;

export function Channel({ locale }: { locale: Locale }) {
  const t = createTranslator(channelDictionary, locale);

  const [demoChannel, setDemoChannel] = useState<DemoChannel>('area');
  const [seed, setSeed] = useState(1);
  const [picked, setPicked] = useState<number | null>(null);

  const trial = useMemo(() => makeTrial(seed, DEMO.count, DEMO.delta), [seed]);
  const accuracy = useMemo(() => accuracyRanking(), []);
  const popout = useMemo(() => popoutRanking(), []);
  const shape = useMemo(() => curve(MODEL_SHAPE, MODEL_SHAPE.steps), []);

  const channelOptions: SegmentedOption<DemoChannel>[] = DEMO_CHANNELS.map((id) => ({
    value: id,
    label: t(`ch-${id}` as ChannelKey),
  }));

  const nextBoard = (channel?: DemoChannel) => {
    if (channel) setDemoChannel(channel);
    setSeed((prev) => prev + 1);
    setPicked(null);
  };

  const maxShapeY = Math.max(...shape.map((point) => point.y));

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

      <Panel title={t('try-title')} note={t('try-note')}>
        <div className={styles.tryHead}>
          <Segmented options={channelOptions} value={demoChannel} onChange={(next) => nextBoard(next)} dense />
          <Button onClick={() => nextBoard()}>{t('try-next')}</Button>
        </div>
        <p className={styles.tryPrompt}>{t('try-find')}</p>
        <div className={styles.board}>
          {trial.values.map((value, index) => (
            <button
              key={`${seed}-${index}`}
              type="button"
              className={styles.cell}
              data-state={picked === null ? 'open' : index === trial.odd ? 'odd' : picked === index ? 'missed' : 'rest'}
              onClick={() => picked === null && setPicked(index)}
              aria-label={`${index + 1}`}
            >
              <Mark channel={demoChannel} value={value} />
            </button>
          ))}
        </div>
        {picked !== null && (
          <p className={styles.verdict} data-hit={picked === trial.odd}>
            {picked === trial.odd ? t('try-hit') : t('try-miss')}{' '}
            {t('try-measured')}: {(POPOUT_ACCURACY[demoChannel] * 100).toFixed(1)}%
          </p>
        )}
        <p className={styles.note}>{t('try-mine')}</p>
      </Panel>

      <Panel title={t('rank-title')} note={t('rank-note')}>
        <div className={styles.rankPair}>
          <div className={styles.rankSide}>
            <span className={styles.rankHead}>{t('rank-accuracy')}</span>
            <span className={styles.rankUnit}>{t('rank-accuracy-unit')}</span>
            {accuracy.map((entry, index) => (
              <div key={entry.id} className={styles.rankRow} data-mark={entry.id === 'area' ? 'pop' : entry.id === 'length' ? 'accent' : undefined}>
                <span className={styles.rankPlace}>{index + 1}</span>
                <span className={styles.rankName}>{t(`ch-${entry.id}` as ChannelKey)}</span>
                <span className={styles.rankValue}>{entry.value === null ? '–' : entry.value.toFixed(3)}</span>
              </div>
            ))}
          </div>
          <div className={styles.rankSide}>
            <span className={styles.rankHead}>{t('rank-popout')}</span>
            <span className={styles.rankUnit}>{t('rank-popout-unit')}</span>
            {popout.map((entry, index) => (
              <div key={entry.id} className={styles.rankRow} data-mark={entry.id === 'area' ? 'pop' : entry.id === 'length' ? 'accent' : undefined}>
                <span className={styles.rankPlace}>{index + 1}</span>
                <span className={styles.rankName}>{t(`ch-${entry.id}` as ChannelKey)}</span>
                <span className={styles.rankValue}>{(entry.value as number).toFixed(3)}</span>
              </div>
            ))}
          </div>
        </div>
        <p className={styles.note}>{t('rank-position-note')}</p>
        <p className={styles.note}>{t('rank-area-caveat')}</p>
        <p className={styles.read}>{t('rank-read')}</p>
      </Panel>

      <Panel title={t('sep-title')} note={t('sep-note')}>
        <div className={styles.matrixWrap}>
          <table className={styles.matrix}>
            <thead>
              <tr>
                <th className={styles.matrixCorner}>{t('sep-primary')} ↓</th>
                {SEP_COLS.map((column) => (
                  <th key={column}>{t(`ch-${column}` as ChannelKey)}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {SEP_ROWS.map((row) => (
                <tr key={row}>
                  <th>{t(`ch-${row}` as ChannelKey)}</th>
                  {SEP_COLS.map((column) => {
                    const value = SEPARABILITY[row][column];
                    const isBaseline = column === row;
                    const baseline = separabilityBaseline(row) ?? 0;
                    const shifted = value !== null && !isBaseline ? value - baseline : 0;
                    return (
                      <td
                        key={column}
                        data-kind={
                          value === null
                            ? 'untested'
                            : isBaseline
                              ? 'baseline'
                              : shifted > 0.15
                                ? 'worse'
                                : shifted < -0.1
                                  ? 'better'
                                  : undefined
                        }
                      >
                        {value === null ? '·' : value.toFixed(3)}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className={styles.note}>
          {t('sep-baseline')}: {t('sep-primary')} = {t('sep-secondary')} · {t('sep-untested')}: ·
        </p>
        <p className={styles.read}>
          {fill(t('sep-worst'), {
            from: WORST_PAIR.from.toFixed(3),
            to: WORST_PAIR.to.toFixed(3),
            chance: CHANCE_LOG_ERROR.toFixed(2),
            gap: worstPairGapToChance().toFixed(3),
          })}
        </p>
      </Panel>

      <Panel title={t('weber-title')} note={t('weber-note')}>
        <div className={styles.weberPair}>
          <div className={styles.shapeBox}>
            <svg className={styles.shape} viewBox="0 0 260 120" aria-hidden="true">
              <line x1="10" y1="110" x2="250" y2="110" className={styles.axis} />
              <line x1="10" y1="10" x2="10" y2="110" className={styles.axis} />
              <polyline
                className={styles.shapeLine}
                points={shape
                  .map(
                    (point) =>
                      `${10 + (point.x / MODEL_SHAPE.xmax) * 240},${110 - (point.y / maxShapeY) * 95}`,
                  )
                  .join(' ')}
              />
            </svg>
            <span className={styles.shapeNote}>{t('weber-shape-note')}</span>
          </div>
          <div className={styles.weberTableWrap}>
            <table className={styles.weberTable}>
              <thead>
                <tr>
                  <th />
                  <th>{t('weber-r2')}</th>
                  <th>{t('weber-left')}</th>
                  <th>{t('weber-right')}</th>
                </tr>
              </thead>
              <tbody>
                {WEBER_ROWS.map((row) => (
                  <tr key={row}>
                    <th>{t(`w-${row}` as ChannelKey)}</th>
                    <td>{WEBER_FITS[row].r2.toFixed(2)}</td>
                    <td>{WEBER_FITS[row].left.toFixed(4)}</td>
                    <td data-negative={WEBER_FITS[row].right < 0}>{WEBER_FITS[row].right.toFixed(4)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <p className={styles.read}>
          {fill(t('weber-read'), { lengthRight: WEBER_FITS.length.right.toFixed(4) })}
        </p>
      </Panel>

      <Panel title={t('alpha-title')} note={t('alpha-note')}>
        <p className={styles.read}>
          {fill(t('alpha-read'), {
            alphaArea: POWER_CORRECTION.area.alpha.toFixed(3),
            improveArea: POWER_CORRECTION.area.improvement.toFixed(3),
            improveSat: POWER_CORRECTION.saturation.improvement.toFixed(3),
            improveLum: POWER_CORRECTION.luminance.improvement.toFixed(3),
          })}
        </p>
        <div className={styles.alphaBars}>
          {([
            ['area', POWER_CORRECTION.area.improvement],
            ['saturation', POWER_CORRECTION.saturation.improvement],
            ['luminance', POWER_CORRECTION.luminance.improvement],
          ] as const).map(([id, improvement]) => (
            <div key={id} className={styles.alphaRow}>
              <span className={styles.rankName}>{t(`ch-${id}` as ChannelKey)}</span>
              <span className={styles.alphaBarWrap}>
                <span
                  className={styles.alphaBar}
                  style={{ width: `${(improvement / POWER_CORRECTION.area.improvement) * 100}%` }}
                />
              </span>
              <span className={styles.rankValue}>{improvement.toFixed(3)}</span>
            </div>
          ))}
        </div>
      </Panel>

      <Panel title={t('took-title')}>
        <p className={styles.note}>{t('took-yes')}</p>
        <p className={styles.note}>{t('took-no')}</p>
        <p className={styles.note}>{t('took-mine')}</p>
      </Panel>
    </div>
  );
}
