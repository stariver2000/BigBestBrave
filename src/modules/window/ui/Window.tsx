'use client';

/**
 * 말할 틈 화면.
 *
 * 화면이 하는 말은 언제나 한 줄이다 — 지금 이것을 쓰거나, 아무 말도 하지 말거나.
 * 그 아래에 왜 그런지가 통로별 셈과 곡선으로 놓인다. 결론을 먼저 두는 이유는
 * 이 페이지가 흉내 내려는 것이 몇 초 안에 내려야 하는 결정이기 때문이다.
 */

import { useMemo, useState } from 'react';
import { Panel, PaperCard } from '../../../kit';
import {
  advise,
  CHANNELS,
  SITUATIONS,
  type ChannelId,
  type Weights,
} from '../../../core/comms';
import { createTranslator, type Locale } from '../../../core/i18n';
import { BAR_HORIZON, INITIAL, PAPER } from '../config';
import { windowDictionary, type WindowKey } from '../dictionary';
import { Curves } from './Curves';
import styles from './window.module.css';

export function Window({ locale }: { locale: Locale }) {
  const t = createTranslator(windowDictionary, locale);

  const [situationId, setSituationId] = useState<string>(INITIAL.situation);
  const [standing, setStanding] = useState<number>(INITIAL.standing);
  const [attention, setAttention] = useState<number>(INITIAL.attention);

  const situation = SITUATIONS.find((entry) => entry.id === situationId) ?? SITUATIONS[0];
  const weights: Weights = useMemo(() => ({ standing, attention }), [standing, attention]);
  const advice = useMemo(() => advise(situation, weights), [situation, weights]);

  const nameOf = (id: ChannelId) => t(`c-${id}` as WindowKey);
  const silent = advice.best === 'silence';
  const bestVerdict = advice.verdicts.find((verdict) => verdict.channel === advice.best)!;

  /** 통로를 기대값 순으로 놓는다. 침묵은 기준선이므로 언제나 표에 남긴다. */
  const rows = [...advice.verdicts].sort((a, b) => b.expected - a.expected);

  const seconds = (value: number | null) =>
    value === null ? t('never') : value >= BAR_HORIZON ? t('always') : `${value.toFixed(1)}${t('verdict-seconds')}`;

  return (
    <div className={styles.layout}>
      <PaperCard
        label={t('paper-label')}
        title={PAPER.title}
        meta={`${PAPER.authors} · ${PAPER.affiliation} · ${PAPER.venue}`}
        href={PAPER.link}
        plain={PAPER.plain}
        locale={locale}
      />

      <Panel title={t('setup-title')} note={t('setup-note')}>
        <div className={styles.situations}>
          {SITUATIONS.map((entry) => (
            <button
              key={entry.id}
              type="button"
              className={styles.situation}
              data-active={entry.id === situationId || undefined}
              onClick={() => setSituationId(entry.id)}
            >
              <span className={styles.situationName}>{t(`s-${entry.id}` as WindowKey)}</span>
              <span className={styles.situationNote}>{t(`s-${entry.id}-note` as WindowKey)}</span>
            </button>
          ))}
        </div>

        <div className={styles.dials}>
          {(
            [
              { id: 'standing', value: standing, set: setStanding },
              { id: 'attention', value: attention, set: setAttention },
            ] as const
          ).map((dial) => (
            <label key={dial.id} className={styles.dial}>
              <span className={styles.dialLabel}>
                {t(dial.id as WindowKey)}
                <span className={styles.dialValue}>{Math.round(dial.value * 100)}</span>
              </span>
              <input
                type="range"
                min={0}
                max={100}
                value={Math.round(dial.value * 100)}
                onChange={(event) => dial.set(Number(event.target.value) / 100)}
              />
              <span className={styles.quiet}>{t(`${dial.id}-note` as WindowKey)}</span>
            </label>
          ))}
        </div>
      </Panel>

      {/* 판단은 언제나 한 줄이다. */}
      <div className={styles.verdict} data-silent={silent || undefined}>
        {silent ? (
          <p className={styles.verdictLine}>
            <span className={styles.verdictWord}>{t('verdict-silence')}</span>
          </p>
        ) : (
          <p className={styles.verdictLine}>
            <span className={styles.verdictLabel}>{t('verdict-say')}</span>
            <span className={styles.verdictWord}>{nameOf(advice.best)}</span>
            <span className={styles.verdictWindow}>
              {t('verdict-window')}{' '}
              <strong>{seconds(bestVerdict.windowSeconds)}</strong>
            </span>
          </p>
        )}
        <p className={styles.verdictWhy}>{t(`w-${advice.best}` as WindowKey)}</p>
      </div>

      <Panel title={t('table-title')} note={t('table-note')}>
        <div className={styles.tableScroll}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th scope="col">{t('col-channel')}</th>
                <th scope="col">{t('col-value')}</th>
                <th scope="col">{t('col-window')}</th>
                <th scope="col">{t('col-lands')}</th>
                <th scope="col">{t('col-left')}</th>
                <th scope="col">{t('col-reach')}</th>
                <th scope="col">{t('col-clarity')}</th>
                <th scope="col">{t('col-hands')}</th>
                <th scope="col">{t('col-friction')}</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((verdict) => {
                const isSilence = verdict.channel === 'silence';
                return (
                  <tr
                    key={verdict.channel}
                    data-best={verdict.channel === advice.best || undefined}
                    data-dead={!isSilence && verdict.expected <= 0 ? true : undefined}
                  >
                    <th scope="row">{nameOf(verdict.channel)}</th>
                    <td className={styles.strong}>{verdict.expected.toFixed(3)}</td>
                    <td>{isSilence ? '—' : seconds(verdict.windowSeconds)}</td>
                    <td>{isSilence ? '—' : `${verdict.landsAt.toFixed(2)}s`}</td>
                    <td>{isSilence ? '—' : `${Math.round(verdict.remaining * 100)}%`}</td>
                    <td>{isSilence ? '—' : `${Math.round(verdict.reach * 100)}%`}</td>
                    <td>{isSilence ? '—' : verdict.clarity.toFixed(2)}</td>
                    <td>{isSilence ? '—' : `−${verdict.attentionCost.toFixed(3)}`}</td>
                    <td>{isSilence ? '—' : `−${verdict.frictionCost.toFixed(3)}`}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <p className={styles.channelNotes}>
          {CHANNELS.filter((channel) => channel.id !== 'silence').map((channel) => (
            <span key={channel.id} className={styles.channelNote}>
              <span className={styles.channelName}>{nameOf(channel.id)}</span>
              {t(`w-${channel.id}` as WindowKey)}
            </span>
          ))}
        </p>
      </Panel>

      <Panel title={t('plot-title')} note={t('plot-note')}>
        <Curves
          situation={situation}
          weights={weights}
          best={advice.best}
          labelOf={nameOf}
          axisX={t('plot-x')}
          axisY={t('plot-y')}
          zeroLabel={t('plot-zero')}
        />
      </Panel>

      <section className={styles.observed}>
        <h2 className={styles.observedTitle}>{t('observed-title')}</h2>
        <p>{t('observed-ping')}</p>
        <p>{t('observed-vote')}</p>
        <p>{t('observed-notice')}</p>
      </section>

      <p className={styles.warning}>{t('warning')}</p>

      <section className={styles.took}>
        <h2 className={styles.tookTitle}>{t('took-title')}</h2>
        <p>{t('took-yes')}</p>
        <p>{t('took-no')}</p>
      </section>
    </div>
  );
}
