'use client';

/**
 * 지표 비교 화면.
 *
 * 읽는 순서를 이렇게 잡았다. 무엇을 채점했는지(그림들) → 자들이 서로 얼마나 겹치는지(행렬)
 * → 그래서 몇 개만 쓰면 되는지(무리와 대표) → 하고 싶은 말(설계는 다른데 답이 같은 쌍).
 * 결론을 먼저 던지지 않는 이유는, 이 페이지의 주장이 "직접 보면 안다"는 것이기 때문이다.
 */

import { useDeferredValue, useMemo, useState } from 'react';
import { Panel } from '../../../kit';
import {
  CLUSTER_COUNT,
  DATASETS,
  METRICS,
  NEIGHBORS,
  POPULATION,
  runLab,
  type DatasetId,
  type Twin,
} from '../../../core/metriclab';
import { createTranslator, type Locale } from '../../../core/i18n';
import { CELL, HEAT_FLIP, HEAT_MAX_ALPHA, INITIAL, PAPER, THUMB } from '../config';
import { rulersDictionary, type RulersKey } from '../dictionary';
import { Thumb } from './Thumb';
import styles from './rulers.module.css';

/** 상관 한 칸의 배경. 부호가 색을, 크기가 진하기를 정한다. */
function heatStyle(rho: number) {
  const alpha = Math.min(Math.abs(rho), 1) * HEAT_MAX_ALPHA;
  const channel = rho >= 0 ? 'var(--bbb-heat-pos)' : 'var(--bbb-heat-neg)';
  return {
    background: `rgb(${channel} / ${alpha.toFixed(3)})`,
    color: Math.abs(rho) > HEAT_FLIP ? 'var(--bbb-surface-raised)' : 'var(--bbb-fg)',
  };
}

/**
 * 끌고 있는 동안에는 값만 보여 주고, 손을 뗄 때 계산을 돌린다.
 * 산점도 백 장을 채점하는 데 몇백 밀리초가 걸려, 끄는 내내 다시 계산하면 화면이 멈춘다.
 */
function CommitRange({
  label,
  value,
  min,
  max,
  step = 1,
  onCommit,
}: {
  label: React.ReactNode;
  value: number;
  min: number;
  max: number;
  step?: number;
  onCommit: (next: number) => void;
}) {
  const [draft, setDraft] = useState(value);
  const commit = () => onCommit(draft);
  return (
    <label className={styles.control}>
      <span className={styles.controlLabel}>
        {label}
        <span className={styles.controlValue}>{draft}</span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={draft}
        onChange={(event) => setDraft(Number(event.target.value))}
        onPointerUp={commit}
        onKeyUp={commit}
        onBlur={commit}
      />
    </label>
  );
}

export function Rulers({ locale }: { locale: Locale }) {
  const t = createTranslator(rulersDictionary, locale);

  const [dataset, setDataset] = useState<DatasetId>(INITIAL.dataset);
  const [population, setPopulation] = useState<number>(INITIAL.population);
  const [k, setK] = useState<number>(INITIAL.k);
  const [clusterCount, setClusterCount] = useState<number | null>(null);

  const result = useMemo(() => runLab({ dataset, population, k }), [dataset, population, k]);
  const analysis = useDeferredValue(result.analysis);

  const count = clusterCount ?? analysis.suggestedClusterCount;
  const clusters = useMemo(() => analysis.clustersFor(count), [analysis, count]);
  const order = analysis.leafOrder;

  /** 지표가 몇 번째 무리에 속하는지. 행렬에 무리 경계를 그리는 데 쓴다. */
  const clusterOf = useMemo(() => {
    const map = new Map<string, number>();
    clusters.forEach((cluster, index) => {
      for (const member of cluster.members) map.set(member, index);
    });
    return map;
  }, [clusters]);

  const rhoAt = (a: string, b: string) =>
    analysis.similarity.rho[analysis.similarity.order.indexOf(a)][
      analysis.similarity.order.indexOf(b)
    ];

  const familyOf = (id: string) => METRICS.find((metric) => metric.id === id)!.family;
  const nameOf = (id: string) => t(`m-${id}` as RulersKey);

  const thumbs = result.projections.slice(0, THUMB.count);

  /** 쌍 목록. 같이 도는 쌍과 반대로 도는 쌍이 같은 모양으로 읽혀야 한다. */
  const pairList = (pairs: readonly Twin[], empty: string) =>
    pairs.length === 0 ? (
      <p className={styles.quiet}>{empty}</p>
    ) : (
      <ul className={styles.twins}>
        {pairs.map((pair) => (
          <li
            key={`${pair.a}-${pair.b}`}
            className={styles.twin}
            data-cross={pair.crossFamily || undefined}
          >
            <span className={styles.twinPair}>
              <span className={styles.twinName}>
                <span className={styles.familyDot} data-family={familyOf(pair.a)} aria-hidden="true" />
                {nameOf(pair.a)}
              </span>
              <span className={styles.twinEquals} aria-hidden="true">
                {pair.rho >= 0 ? '\u2248' : '\u2195'}
              </span>
              <span className={styles.twinName}>
                <span className={styles.familyDot} data-family={familyOf(pair.b)} aria-hidden="true" />
                {nameOf(pair.b)}
              </span>
            </span>
            <span className={styles.twinRho}>{pair.rho.toFixed(3)}</span>
            <span className={styles.twinTag}>
              {pair.crossFamily ? t('twins-cross') : t('twins-same')}
            </span>
          </li>
        ))}
      </ul>
    );

  return (
    <div className={styles.layout}>
      <p className={styles.paper}>
        <span className={styles.paperLabel}>{t('paper-label')}</span>
        <a href={PAPER.link} target="_blank" rel="noreferrer">
          {PAPER.title}
        </a>
        <span className={styles.paperMeta}>
          {PAPER.authors} · {PAPER.affiliation} · {PAPER.venue}
        </span>
      </p>

      <Panel title={t('controls-title')} note={t('controls-note')}>
        <div className={styles.datasets}>
          {DATASETS.map((id) => (
            <button
              key={id}
              type="button"
              className={styles.dataset}
              data-active={id === dataset || undefined}
              onClick={() => setDataset(id)}
            >
              <span className={styles.datasetName}>{t(`data-${id}` as RulersKey)}</span>
              <span className={styles.datasetNote}>{t(`data-${id}-note` as RulersKey)}</span>
            </button>
          ))}
        </div>

        <div className={styles.controls}>
          <CommitRange
            label={t('population')}
            value={population}
            min={POPULATION.min}
            max={POPULATION.max}
            step={POPULATION.step}
            onCommit={setPopulation}
          />
          <CommitRange
            label={t('neighbors')}
            value={k}
            min={NEIGHBORS.min}
            max={NEIGHBORS.max}
            onCommit={setK}
          />
          <label className={styles.control}>
            <span className={styles.controlLabel}>
              {t('clusters')}
              <span className={styles.controlValue}>{count}</span>
            </span>
            <input
              type="range"
              min={CLUSTER_COUNT.min}
              max={CLUSTER_COUNT.max}
              value={count}
              onChange={(event) => setClusterCount(Number(event.target.value))}
            />
            <span className={styles.quiet}>
              {t('suggested')} {analysis.suggestedClusterCount} · {t('elapsed')} {result.elapsed < 10 ? result.elapsed.toFixed(2) : result.elapsed.toFixed(0)}ms
            </span>
          </label>
        </div>
      </Panel>

      <Panel title={t('strip-title')} note={t('strip-note')}>
        <div className={styles.strip}>
          {thumbs.map((projection, index) => (
            <figure key={index} className={styles.stripItem}>
              <Thumb projection={projection} labels={result.dataset.labels} />
              <figcaption className={styles.stripCaption}>{projection.recipe}</figcaption>
            </figure>
          ))}
        </div>
      </Panel>

      <Panel title={t('heat-title')} note={t('heat-note')}>
        <div className={styles.matrixScroll}>
          <table className={styles.matrix} style={{ ['--cell' as string]: `${CELL}px` }}>
            <thead>
              <tr>
                <th />
                {order.map((id) => (
                  <th key={id} className={styles.colHead} scope="col">
                    <span className={styles.colHeadText} data-family={familyOf(id)}>
                      {nameOf(id)}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {order.map((row) => (
                <tr key={row}>
                  <th className={styles.rowHead} scope="row">
                    <span className={styles.familyDot} data-family={familyOf(row)} aria-hidden="true" />
                    {nameOf(row)}
                  </th>
                  {order.map((column) => {
                    const rho = rhoAt(row, column);
                    const sameCluster = clusterOf.get(row) === clusterOf.get(column);
                    return (
                      <td
                        key={column}
                        className={styles.cell}
                        data-same={sameCluster || undefined}
                        data-diagonal={row === column || undefined}
                        style={heatStyle(rho)}
                      >
                        {rho.toFixed(2).replace('0.', '.')}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className={styles.legend}>
          <span className={styles.legendSwatch} data-sign="pos" aria-hidden="true" />
          {t('heat-legend-pos')}
          <span className={styles.legendSwatch} data-sign="neg" aria-hidden="true" />
          {t('heat-legend-neg')}
          <span className={styles.legendGap} />
          {(['local', 'cluster', 'global'] as const).map((family) => (
            <span key={family} className={styles.legendFamily}>
              <span className={styles.familyDot} data-family={family} aria-hidden="true" />
              {t(`family-${family}` as RulersKey)}
            </span>
          ))}
        </p>
      </Panel>

      <Panel title={t('clusters-title')} note={t('clusters-note')}>
        <div className={styles.clusters}>
          {clusters.map((cluster) => (
            <section key={cluster.representative} className={styles.cluster}>
              <header className={styles.clusterHead}>
                <span className={styles.clusterName}>{nameOf(cluster.representative)}</span>
                <span className={styles.clusterTag}>{t('representative')}</span>
                {cluster.members.length > 1 && (
                  <span className={styles.clusterCohesion}>
                    {t('cohesion')} {cluster.cohesion.toFixed(2)}
                  </span>
                )}
              </header>
              <ul className={styles.members}>
                {cluster.members.map((member) => (
                  <li
                    key={member}
                    className={styles.member}
                    data-representative={member === cluster.representative || undefined}
                  >
                    <span className={styles.familyDot} data-family={familyOf(member)} aria-hidden="true" />
                    <span className={styles.memberName}>{nameOf(member)}</span>
                    <span className={styles.memberWhat}>{t(`w-${member}` as RulersKey)}</span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <p className={styles.recommended}>
          <span className={styles.recommendedLabel}>{t('recommended')}</span>
          {clusters.map((cluster) => (
            <span key={cluster.representative} className={styles.recommendedItem}>
              {nameOf(cluster.representative)}
            </span>
          ))}
        </p>
      </Panel>

      <Panel title={t('twins-title')} note={t('twins-note')}>
        {pairList(analysis.twins, t('twins-empty'))}
      </Panel>

      <Panel title={t('opposites-title')} note={t('opposites-note')}>
        {pairList(analysis.opposites, t('opposites-empty'))}
      </Panel>

      <section className={styles.took}>
        <h2 className={styles.tookTitle}>{t('took-title')}</h2>
        <p>{t('took-yes')}</p>
        <p>{t('took-no')}</p>
      </section>
    </div>
  );
}
