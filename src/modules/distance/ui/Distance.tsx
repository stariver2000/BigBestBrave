'use client';

/**
 * 거리 화면.
 *
 * 순서: 읽기 판을 먼저 주고(고르면 판정이 나온다), 바로 아래에 논문 스스로의 단서를
 * 둔다 - 이 판정은 기법 단위의 거친 것이라는 말을 판정보다 늦지 않게 보여야 한다.
 *
 * 기본값은 t-SNE로 무리 사이 거리를 읽으려는 경우다. 논문의 첫 문단이 든 바로 그
 * 오용이라, 첫 화면에서 신기루 판정이 이미 보인다.
 */

import { useState } from 'react';
import { Badge, Panel, Segmented, type SegmentedOption } from '../../../kit';
import {
  INTERVIEWS,
  REVIEW,
  TASKS,
  TECHNIQUES,
  suitable,
  taskOf,
  techniqueOf,
  type TaskId,
  type TechniqueId,
} from '../../../core/misuse';
import { createTranslator, type Locale } from '../../../core/i18n';
import { PAPER } from '../config';
import { distanceDictionary, type DistanceKey } from '../dictionary';
import { Sketch } from './Sketch';
import styles from './distance.module.css';

/** 문구의 {자리}를 코어 값으로 채운다. */
function fill(text: string, values: Record<string, string | number>): string {
  return Object.entries(values).reduce(
    (out, [key, value]) => out.replaceAll(`{${key}}`, String(value)),
    text,
  );
}

export function Distance({ locale }: { locale: Locale }) {
  const t = createTranslator(distanceDictionary, locale);

  const [task, setTask] = useState<TaskId>('clusterDistance');
  const [technique, setTechnique] = useState<TechniqueId>('tsne');

  const ok = suitable(task, technique);
  const kind = taskOf(task).kind;

  const techniqueOptions: SegmentedOption<TechniqueId>[] = TECHNIQUES.map((entry) => ({
    value: entry.id,
    label: t(`tech-${entry.id}` as DistanceKey),
  }));

  const tsneUses = techniqueOf('tsne').uses ?? 0;
  const umapUses = techniqueOf('umap').uses ?? 0;

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

      <Panel title={t('read-title')} note={t('read-note')}>
        <div className={styles.readGrid}>
          <div className={styles.controls}>
            <span className={styles.smallLabel}>{t('read-what')}</span>
            <div className={styles.tasks}>
              {TASKS.map((entry) => (
                <button
                  key={entry.id}
                  type="button"
                  className={styles.task}
                  data-on={task === entry.id}
                  data-kind={entry.kind}
                  aria-pressed={task === entry.id}
                  onClick={() => setTask(entry.id)}
                >
                  <span className={styles.taskKind}>{t(`kind-${entry.kind}` as DistanceKey)}</span>
                  {t(`task-${entry.id}` as DistanceKey)}
                </button>
              ))}
            </div>
            <span className={styles.smallLabel}>{t('read-with')}</span>
            <Segmented options={techniqueOptions} value={technique} onChange={setTechnique} dense />
          </div>

          <div className={styles.stage}>
            <Sketch task={task} mirage={!ok} />
            <p className={styles.verdict} data-ok={ok}>
              <Badge tone={ok ? 'pass' : 'fail'}>{ok ? t('verdict-ok') : t('verdict-mirage')}</Badge>
            </p>
            <p className={styles.why}>{t(`why-${task}` as DistanceKey)}</p>
            <p className={styles.fine}>{t('sketch-note')}</p>
          </div>
        </div>
      </Panel>

      <Panel title={t('caveat-title')}>
        <p className={styles.note}>{t('caveat-body')}</p>
      </Panel>

      <Panel title={t('split-title')} note={t('split-note')}>
        <div className={styles.splitPair}>
          <div className={styles.splitSide} data-side="local">
            <span className={styles.splitHead}>t-SNE · UMAP</span>
            <p className={styles.splitBody}>{t('split-local')}</p>
          </div>
          <div className={styles.splitSide} data-side="global">
            <span className={styles.splitHead}>PCA · MDS</span>
            <p className={styles.splitBody}>{t('split-global')}</p>
          </div>
        </div>
      </Panel>

      <Panel title={t('scale-title')} note={t('scale-note')}>
        <p className={styles.scale}>
          {fill(t('scale-line'), {
            retrieved: REVIEW.retrieved,
            retained: REVIEW.retained,
            techniques: REVIEW.techniques,
            tsne: tsneUses,
            umap: umapUses,
            noReason: REVIEW.noRationalePercent,
          })}
        </p>
        <p className={styles.fine}>{t('scale-figures')}</p>
      </Panel>

      <Panel title={t('people-title')} note={t('people-note')}>
        <blockquote className={styles.quote}>{t('people-quote')}</blockquote>
        <p className={styles.note}>
          {fill(t('people-line'), {
            practitioners: INTERVIEWS.practitioners,
            cherry: INTERVIEWS.cherryPicked,
            blind: INTERVIEWS.cherryPickedBlind,
            peer: INTERVIEWS.peerSuggested,
          })}
        </p>
      </Panel>

      <Panel title={t('took-title')}>
        <p className={styles.note}>{t('took-yes')}</p>
        <p className={styles.note}>{t('took-no')}</p>
        <p className={styles.note}>{t('took-mine')}</p>
      </Panel>
    </div>
  );
}
