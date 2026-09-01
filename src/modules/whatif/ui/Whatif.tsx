'use client';

/**
 * 반사실 화면.
 *
 * 읽는 순서: 기록을 정하고 -> 되짚을 상황을 고르고 -> 바꿀 수 없는 것을 잠그고 ->
 * 남은 길들을 보고 -> 하나를 골라 무엇이 얼마나 내렸는지 보고 -> 정말 그것 때문이었는지 본다.
 *
 * 마지막 칸(인과)이 없으면 이 화면은 위험하다. 모형은 같이 나타나는 것을 배울 뿐인데,
 * 반사실은 "바꾸라"고 말하기 때문이다. 그래서 짝지어 본 값을 같은 화면에 둔다.
 */

import { useMemo, useState } from 'react';
import { Panel, PaperCard } from '../../../kit';
import {
  buildLog,
  causalEffect,
  contributions,
  FACETS,
  findCounterfactuals,
  fit,
  LOG_SIZE,
  probability,
  SEED,
  seenSituations,
  SHOW_LIMIT,
  VALUES,
  type Facet,
  type Situation,
} from '../../../core/counterfactual';
import { createTranslator, type Locale } from '../../../core/i18n';
import { BAR, PAPER, TARGET_CHOICES } from '../config';
import { whatifDictionary, type WhatifKey } from '../dictionary';
import styles from './whatif.module.css';

export function Whatif({ locale }: { locale: Locale }) {
  const t = createTranslator(whatifDictionary, locale);

  const [size, setSize] = useState<number>(LOG_SIZE.initial);
  const [targetIndex, setTargetIndex] = useState(0);
  const [locked, setLocked] = useState<Facet[]>([]);
  const [chosen, setChosen] = useState<number | null>(null);

  const records = useMemo(() => buildLog(size, SEED), [size]);
  const fitted = useMemo(() => fit(records), [records]);
  /*
   * 겪어 본 상황 중에서 잦은 것을 먼저 추리고, 그 안에서 스트레스가 높은 순으로 놓는다.
   * 잦은 순 그대로 두면 맨 앞이 늘 '집에서 혼자 쉬는 낮'이 된다 — 가장 자주 겪는 것은
   * 대개 가장 편한 것이기 때문이다. 그런 상황에는 되짚을 것이 없다.
   * 이 페이지는 힘들었던 장면을 되짚는 도구이므로 높은 쪽이 먼저 와야 한다.
   */
  const seen = useMemo(() => {
    const frequent = seenSituations(records).slice(0, TARGET_CHOICES);
    return [...frequent].sort(
      (a, b) => probability(fitted, b.situation) - probability(fitted, a.situation),
    );
  }, [records, fitted]);

  const target: Situation = seen[Math.min(targetIndex, seen.length - 1)]?.situation ?? seen[0].situation;
  const targetP = probability(fitted, target);

  const paths = useMemo(
    () => findCounterfactuals(fitted, records, target, { locked }).slice(0, SHOW_LIMIT),
    [fitted, records, target, locked],
  );
  const picked = chosen === null ? null : paths[chosen] ?? null;
  const parts = useMemo(
    () => (picked === null ? [] : contributions(fitted, target, picked.situation)),
    [fitted, target, picked],
  );

  /** 고른 상황에 들어 있는 맥락들의 인과. 화면에 있는 것만 따진다. */
  const causes = useMemo(
    () => FACETS.map((facet) => causalEffect(records, facet, target[facet])),
    [records, target],
  );

  const label = (facet: Facet, value: string) => t(`v-${value}` as WhatifKey);
  const facetName = (facet: Facet) => t(`f-${facet}` as WhatifKey);
  const pct = (value: number) => `${Math.round(value * 100)}%`;
  const points = (value: number) => `${value >= 0 ? '+' : '−'}${Math.abs(value * 100).toFixed(1)}%p`;

  const biggestBar = Math.max(...parts.map((part) => Math.abs(part.value)), 0.001);

  const toggleLock = (facet: Facet) => {
    setChosen(null);
    setLocked((old) => (old.includes(facet) ? old.filter((entry) => entry !== facet) : [...old, facet]));
  };

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

      <Panel title={t('log-title')} note={t('log-note')}>
        <label className={styles.dial}>
          <span className={styles.dialLabel}>
            {t('log-size')}
            <span className={styles.dialValue}>
              {records.length} {t('records')} · {t('high-rate')} {pct(fitted.highRate)}
            </span>
          </span>
          <input
            type="range"
            min={LOG_SIZE.min}
            max={LOG_SIZE.max}
            step={LOG_SIZE.step}
            value={size}
            onChange={(event) => {
              setSize(Number(event.target.value));
              setChosen(null);
            }}
          />
        </label>
      </Panel>

      <Panel title={t('target-title')} note={t('target-note')}>
        <div className={styles.targets}>
          {seen.map((entry, index) => {
            const p = probability(fitted, entry.situation);
            return (
              <button
                key={index}
                type="button"
                className={styles.target}
                data-active={index === targetIndex || undefined}
                onClick={() => {
                  setTargetIndex(index);
                  setChosen(null);
                }}
              >
                <span className={styles.targetWords}>
                  {FACETS.map((facet) => label(facet, entry.situation[facet])).join(' · ')}
                </span>
                <span className={styles.targetMeta}>
                  {entry.count}
                  {t('seen-times')} · {pct(p)}
                </span>
              </button>
            );
          })}
        </div>
      </Panel>

      <Panel title={t('cf-title')} note={t('cf-note')}>
        <div className={styles.locks}>
          <span className={styles.lockLabel}>{t('lock')}</span>
          {FACETS.map((facet) => (
            <button
              key={facet}
              type="button"
              className={styles.lock}
              data-on={locked.includes(facet) || undefined}
              onClick={() => toggleLock(facet)}
            >
              {facetName(facet)}
            </button>
          ))}
          <span className={styles.quiet}>{t('lock-note')}</span>
        </div>

        <div className={styles.nowRow}>
          <span className={styles.nowTag}>{t('now')}</span>
          <span className={styles.nowWords}>
            {FACETS.map((facet) => label(facet, target[facet])).join(' · ')}
          </span>
          <span className={styles.nowP}>{pct(targetP)}</span>
        </div>

        {paths.length === 0 ? (
          <p className={styles.quiet}>{t('cf-empty')}</p>
        ) : (
          <ul className={styles.paths}>
            {paths.map((path, index) => (
              <li key={index}>
                <button
                  type="button"
                  className={styles.path}
                  data-picked={index === chosen || undefined}
                  data-fresh={path.seen === 0 || undefined}
                  onClick={() => setChosen(index === chosen ? null : index)}
                >
                  <span className={styles.pathWords}>
                    {FACETS.map((facet) => (
                      <span
                        key={facet}
                        className={styles.word}
                        data-changed={path.changed.includes(facet) || undefined}
                      >
                        {label(facet, path.situation[facet])}
                      </span>
                    ))}
                  </span>
                  <span className={styles.pathStats}>
                    <span className={styles.pathP}>{pct(path.probability)}</span>
                    <span className={styles.pathDrop}>
                      {t('drop')} {points(-path.drop)}
                    </span>
                    <span className={styles.pathChanges}>
                      {t('changes')} {path.changes}
                    </span>
                    <span className={styles.pathSeen} data-fresh={path.seen === 0 || undefined}>
                      {path.seen === 0 ? t('never-tried') : `${t('tried')} ${path.seen}`}
                    </span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </Panel>

      <Panel title={t('why-title')} note={t('why-note')}>
        {parts.length === 0 ? (
          <p className={styles.quiet}>{t('why-empty')}</p>
        ) : (
          <>
            <ul className={styles.bars}>
              {parts.map((part) => (
                <li key={part.facet} className={styles.barRow}>
                  <span className={styles.barName}>
                    {facetName(part.facet)}
                    <span className={styles.barMove}>
                      {label(part.facet, part.from)} → {label(part.facet, part.to)}
                    </span>
                  </span>
                  <span className={styles.barTrack} style={{ width: BAR.width }}>
                    <span
                      className={styles.barFill}
                      data-down={part.value < 0 || undefined}
                      style={{ width: `${(Math.abs(part.value) / biggestBar) * 100}%` }}
                    />
                  </span>
                  <span className={styles.barValue} data-down={part.value < 0 || undefined}>
                    {points(part.value)}
                  </span>
                </li>
              ))}
            </ul>
            <p className={styles.sum}>
              {t('why-sum')} {points(parts.reduce((total, part) => total + part.value, 0))} ={' '}
              {pct(targetP)} → {pct(picked!.probability)}
            </p>
          </>
        )}
      </Panel>

      <Panel title={t('cause-title')} note={t('cause-note')}>
        <div className={styles.tableScroll}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th scope="col">{t('now')}</th>
                <th scope="col">{t('cause-naive')}</th>
                <th scope="col">{t('cause-matched')}</th>
                <th scope="col">{t('cause-gap')}</th>
                <th scope="col">{t('cause-pairs')}</th>
              </tr>
            </thead>
            <tbody>
              {causes.map((cause) => {
                const thin = cause.matched < 12;
                return (
                  <tr key={cause.facet} data-thin={thin || undefined}>
                    <th scope="row">
                      {facetName(cause.facet)}
                      <span className={styles.causeValue}>{label(cause.facet, cause.value)}</span>
                    </th>
                    <td>{cause.naive >= 0 ? '+' : '−'}{Math.abs(cause.naive).toFixed(2)}</td>
                    <td className={styles.strong} data-up={cause.effect > 0 || undefined}>
                      {cause.effect >= 0 ? '+' : '−'}
                      {Math.abs(cause.effect).toFixed(2)}
                      <span className={styles.causeWord}>
                        {cause.effect > 0 ? t('cause-up') : t('cause-down')}
                      </span>
                    </td>
                    <td>{Math.abs(cause.naive - cause.effect).toFixed(2)}</td>
                    <td>
                      {cause.matched}
                      {thin && <span className={styles.thin}>{t('cause-thin')}</span>}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Panel>

      <p className={styles.warning}>{t('warning')}</p>

      <section className={styles.took}>
        <h2 className={styles.tookTitle}>{t('took-title')}</h2>
        <p>{t('took-yes')}</p>
        <p>{t('took-no')}</p>
      </section>
    </div>
  );
}
