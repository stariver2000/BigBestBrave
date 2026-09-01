'use client';

/**
 * 길찾기 태도 화면.
 *
 * 세 태도를 같은 도시, 같은 날씨에 태워 지도 셋과 표 하나로 보인다.
 * 지도를 먼저 두는 이유: 숫자보다 "늘 같은 길로 다녔구나"가 눈에 먼저 들어오기 때문이다.
 */

import { useMemo, useState } from 'react';
import { Panel, PaperCard } from '../../../kit';
import { compare, MODES, SEED, TRIPS, type Mode } from '../../../core/routing';
import { createTranslator, type Locale } from '../../../core/i18n';
import { PAPER } from '../config';
import { routeDictionary, type RouteKey } from '../dictionary';
import { CityMap } from './CityMap';
import styles from './route.module.css';

export function Route({ locale }: { locale: Locale }) {
  const t = createTranslator(routeDictionary, locale);

  const [trips, setTrips] = useState<number>(TRIPS.initial);
  const [seed, setSeed] = useState<number>(SEED);

  const { city, runs } = useMemo(() => compare({ trips, seed }), [trips, seed]);

  const bestTime = runs.reduce((a, b) => (b.meanRegret < a.meanRegret ? b : a));
  const bestCalm = runs.reduce((a, b) => (b.meanGlances < a.meanGlances ? b : a));
  const modeName = (mode: Mode) => t(`m-${mode}` as RouteKey);

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
        <div className={styles.controls}>
          <label className={styles.dial}>
            <span className={styles.dialLabel}>
              {t('trips')}
              <span className={styles.dialValue}>{trips}</span>
            </span>
            <input
              type="range"
              min={TRIPS.min}
              max={TRIPS.max}
              step={TRIPS.step}
              value={trips}
              onChange={(event) => setTrips(Number(event.target.value))}
            />
          </label>
          <button type="button" className={styles.reshuffle} onClick={() => setSeed((old) => old + 1)}>
            {t('reshuffle')}
          </button>
        </div>

        <div className={styles.modes}>
          {MODES.map((mode) => (
            <div key={mode} className={styles.modeCard}>
              <span className={styles.modeName}>{modeName(mode)}</span>
              <span className={styles.modeNote}>{t(`w-${mode}` as RouteKey)}</span>
            </div>
          ))}
        </div>
      </Panel>

      <Panel title={t('maps-title')} note={t('maps-note')}>
        <div className={styles.maps}>
          {runs.map((run) => (
            <figure key={run.mode} className={styles.mapBox}>
              <CityMap city={city} run={run} />
              <figcaption className={styles.mapName}>
                {modeName(run.mode)}
                <span className={styles.mapStat}>
                  {t('col-top')} {(run.topRouteShare * 100).toFixed(0)}%
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
        <p className={styles.legend}>
          <span className={styles.legendLine} data-kind="road" />
          {t('legend-road')}
          <span className={styles.legendLine} data-kind="used" />
          {t('legend-used')}
          <span className={styles.legendDot} data-end="start" />
          {t('legend-start')}
          <span className={styles.legendDot} data-end="goal" />
          {t('legend-goal')}
        </p>
      </Panel>

      <Panel title={t('table-title')} note={t('table-note')}>
        <div className={styles.tableScroll}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th scope="col">{t('col-mode')}</th>
                <th scope="col">{t('col-minutes')}</th>
                <th scope="col">{t('col-regret')}</th>
                <th scope="col">{t('col-glances')}</th>
                <th scope="col">{t('col-routes')}</th>
                <th scope="col">{t('col-top')}</th>
                <th scope="col">{t('col-seen')}</th>
              </tr>
            </thead>
            <tbody>
              {runs.map((run) => (
                <tr key={run.mode}>
                  <th scope="row">
                    {modeName(run.mode)}
                    <span className={styles.marks}>
                      {run.mode === bestTime.mode && <span className={styles.mark}>{t('best-time')}</span>}
                      {run.mode === bestCalm.mode && (
                        <span className={styles.mark} data-calm>
                          {t('best-calm')}
                        </span>
                      )}
                    </span>
                  </th>
                  <td>{run.meanMinutes.toFixed(1)}</td>
                  <td className={styles.strong} data-best={run.mode === bestTime.mode || undefined}>
                    +{run.meanRegret.toFixed(2)}
                  </td>
                  <td data-calm={run.mode === bestCalm.mode || undefined}>{run.meanGlances.toFixed(0)}</td>
                  <td>{run.distinctRoutes}</td>
                  <td>{(run.topRouteShare * 100).toFixed(0)}%</td>
                  <td>{(run.coverage * 100).toFixed(0)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>

      <section className={styles.lost}>
        <h2 className={styles.lostTitle}>{t('lost-title')}</h2>
        <p className={styles.quiet}>{t('lost-note')}</p>
        {MODES.map((mode) => (
          <p key={mode} className={styles.lostItem}>
            <span className={styles.lostName}>{modeName(mode)}</span>
            {t(`lost-${mode}` as RouteKey)}
          </p>
        ))}
      </section>

      <section className={styles.how}>
        <h2 className={styles.lostTitle}>{t('how-title')}</h2>
        <p>{t('how-app')}</p>
        <p>{t('how-me')}</p>
        <p>{t('how-why')}</p>
      </section>

      <p className={styles.warning}>{t('warning')}</p>

      <section className={styles.took}>
        <h2 className={styles.lostTitle}>{t('took-title')}</h2>
        <p>{t('took-yes')}</p>
        <p>{t('took-no')}</p>
      </section>
    </div>
  );
}
