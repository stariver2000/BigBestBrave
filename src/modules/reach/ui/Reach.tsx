'use client';

/**
 * 선택 방식 실험 화면.
 *
 * 한 번에 방아쇠 하나씩 돌리고, 결과는 방아쇠별로 쌓인다. 셋을 다 돌리면 표에서 나란히 견줄 수
 * 있다. 논문의 수치는 그 옆에 **작게** 둔다. 나란히 놓되 같은 크기로 놓지 않는 이유는,
 * 두 수치가 같은 조건에서 나온 것이 아니어서 눈이 먼저 견주면 안 되기 때문이다.
 */

import { useCallback, useMemo, useRef, useState } from 'react';
import { Panel, PaperCard } from '../../../kit';
import {
  buildTrials,
  PAPER_BINARY,
  PAPER_MULTI,
  report,
  SEED,
  WARMUP_TRIALS,
  type Fire,
  type Selection,
  type TaskKind,
  type Trigger,
  type TriggerReport,
} from '../../../core/selection';
import { createTranslator, type Locale } from '../../../core/i18n';
import { FLASH_MS, PAPER, TRIALS } from '../config';
import { reachDictionary, type ReachKey } from '../dictionary';
import { Lane } from './Lane';
import { Scatter } from './Scatter';
import styles from './reach.module.css';

const TRIGGERS: Trigger[] = ['cross', 'dwell', 'pinch'];
const TASKS: TaskKind[] = ['binary', 'multi'];

interface Cursor {
  trial: number;
  selection: number;
}

export function Reach({ locale }: { locale: Locale }) {
  const t = createTranslator(reachDictionary, locale);

  const [task, setTask] = useState<TaskKind>('binary');
  const [trigger, setTrigger] = useState<Trigger>('cross');
  const [trialCount, setTrialCount] = useState<number>(TRIALS.initial);
  const [haptics, setHaptics] = useState(false);

  const [running, setRunning] = useState(false);
  const [runSeed, setRunSeed] = useState(SEED);
  const [at, setAt] = useState<Cursor>({ trial: 0, selection: 0 });
  const [flash, setFlash] = useState<'ok' | 'miss' | null>(null);
  const [records, setRecords] = useState<Record<string, Selection[]>>({});

  // 앞선 선택이 끝난 시각과 자리. 이동 시간과 실제 이동 거리를 여기서 잰다.
  const lastRef = useRef<{ time: number; x: number } | null>(null);
  const flashTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const trials = useMemo(() => buildTrials(task, trialCount, runSeed), [task, trialCount, runSeed]);
  const trial = trials[Math.min(at.trial, trials.length - 1)];
  const askedId = trial.order[Math.min(at.selection, trial.order.length - 1)];
  const isWarmup = at.trial < WARMUP_TRIALS;
  const finished = at.trial >= trials.length;

  const start = () => {
    setRecords((old) => ({ ...old, [`${task}|${trigger}`]: [] }));
    lastRef.current = null;
    setAt({ trial: 0, selection: 0 });
    setFlash(null);
    setRunning(true);
  };

  const onEngage = useCallback((x: number, time: number) => {
    lastRef.current = { time, x };
  }, []);

  const onFire = useCallback(
    (fire: Fire, reentries: number) => {
      const previous = lastRef.current;
      lastRef.current = { time: fire.time, x: fire.x };
      if (previous === null) return;

      const hit = fire.targetId === askedId;
      setFlash(hit ? 'ok' : 'miss');
      if (flashTimer.current) clearTimeout(flashTimer.current);
      flashTimer.current = setTimeout(() => setFlash(null), FLASH_MS);

      if (!isWarmup) {
        const record: Selection = {
          askedId,
          gotId: fire.targetId,
          movementTime: (fire.time - previous.time) / 1000,
          x: fire.x,
          fromX: previous.x,
          width: trial.width,
          amplitude: trial.amplitude,
          reentries,
        };
        const key = `${task}|${trigger}`;
        setRecords((old) => ({ ...old, [key]: [...(old[key] ?? []), record] }));
      }

      setAt((old) => {
        const nextSelection = old.selection + 1;
        if (nextSelection < trial.order.length) return { ...old, selection: nextSelection };
        const nextTrial = old.trial + 1;
        if (nextTrial >= trials.length) setRunning(false);
        return { trial: nextTrial, selection: 0 };
      });
    },
    [askedId, isWarmup, task, trigger, trial, trials.length],
  );

  /** 이번 과제에서 방아쇠마다의 성적. 기록이 없는 방아쇠는 표에 나오지 않는다. */
  const reports = useMemo(
    () =>
      TRIGGERS.map((id) => ({ id, data: records[`${task}|${id}`] ?? [] }))
        .filter((entry) => entry.data.length > 0)
        .map((entry) => report(entry.id, entry.data)),
    [records, task],
  );

  const paperOf = (id: Trigger) =>
    task === 'binary' ? PAPER_BINARY[id] : id === 'pinch' ? null : PAPER_MULTI[id];

  const percent = (value: number) => `${(value * 100).toFixed(2)}%`;

  /** a + b·ID 꼴로 적는다. 기울기가 음수면 부호를 식 안으로 넣어야 '+ -0.000'이 안 나온다. */
  const model = (intercept: number, slope: number) =>
    `${intercept.toFixed(3)} ${slope < 0 ? '−' : '+'} ${Math.abs(slope).toFixed(3)}·ID`;

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
        <div className={styles.choices}>
          {TASKS.map((id) => (
            <button
              key={id}
              type="button"
              className={styles.choice}
              data-active={id === task || undefined}
              disabled={running}
              onClick={() => setTask(id)}
            >
              <span className={styles.choiceName}>{t(`task-${id}` as ReachKey)}</span>
              <span className={styles.choiceNote}>{t(`task-${id}-note` as ReachKey)}</span>
            </button>
          ))}
        </div>

        <div className={styles.choices}>
          {TRIGGERS.map((id) => (
            <button
              key={id}
              type="button"
              className={styles.choice}
              data-active={id === trigger || undefined}
              disabled={running}
              onClick={() => setTrigger(id)}
            >
              <span className={styles.choiceName}>{t(`t-${id}` as ReachKey)}</span>
              <span className={styles.choiceNote}>{t(`h-${id}` as ReachKey)}</span>
            </button>
          ))}
        </div>

        <div className={styles.controls}>
          <label className={styles.control}>
            <span className={styles.controlLabel}>
              {t('trials')}
              <span className={styles.controlValue}>{trialCount}</span>
            </span>
            <input
              type="range"
              min={TRIALS.min}
              max={TRIALS.max}
              value={trialCount}
              disabled={running}
              onChange={(event) => setTrialCount(Number(event.target.value))}
            />
          </label>

          <label className={styles.toggle}>
            <input type="checkbox" checked={haptics} onChange={(event) => setHaptics(event.target.checked)} />
            <span>
              {t('haptics')}
              <span className={styles.quiet}> {t('haptics-note')}</span>
            </span>
          </label>

          <button
            type="button"
            className={styles.action}
            onClick={() => {
              if (running) {
                setRunning(false);
              } else {
                setRunSeed((old) => old + 1);
                start();
              }
            }}
          >
            {running ? t('stop') : finished ? t('restart') : t('start')}
          </button>
        </div>
      </Panel>

      <Panel title={t('lane-title')} note={t('lane-note')}>
        <p className={styles.status} data-warmup={running && isWarmup ? true : undefined}>
          {!running && !finished && t('idle')}
          {!running && finished && t('done')}
          {running && isWarmup && `${t('warmup')} · `}
          {running && `${t('progress')} ${Math.min(at.trial + 1, trials.length)}/${trials.length}`}
          {running && ` · ${trigger === 'pinch' ? t('pinch-hint') : t('move-hint')}`}
        </p>

        <Lane
          targets={trial.targets}
          askedId={askedId}
          running={running}
          trigger={trigger}
          onFire={onFire}
          onEngage={onEngage}
          selectionKey={at.trial * 100 + at.selection}
          flash={flash}
          haptics={haptics}
        />
      </Panel>

      <Panel title={t('results-title')} note={t('results-note')}>
        {reports.length === 0 ? (
          <p className={styles.quiet}>{t('results-empty')}</p>
        ) : (
          <div className={styles.tableScroll}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th scope="col">{t('col-trigger')}</th>
                  <th scope="col">{t('col-mt')}</th>
                  <th scope="col">{t('col-er')}</th>
                  <th scope="col">{t('col-tp')}</th>
                  <th scope="col">{t('col-model')}</th>
                  <th scope="col">{t('col-fit')}</th>
                  <th scope="col">{t('col-tre')}</th>
                  <th scope="col">{t('col-n')}</th>
                </tr>
              </thead>
              <tbody>
                {reports.map((entry) => {
                  const theirs = paperOf(entry.trigger);
                  const full = theirs !== null && 'throughput' in theirs ? theirs : null;
                  return (
                    <tr key={entry.trigger}>
                      <th scope="row">{t(`t-${entry.trigger}` as ReachKey)}</th>
                      <td>
                        {entry.movementTime.toFixed(2)}s
                        {full && <span className={styles.theirs}>{full.movementTime.toFixed(2)}</span>}
                      </td>
                      <td>
                        {percent(entry.errorRate)}
                        {theirs && <span className={styles.theirs}>{percent(theirs.errorRate)}</span>}
                      </td>
                      <td>
                        {entry.throughput.toFixed(2)}
                        {full && <span className={styles.theirs}>{full.throughput.toFixed(2)}</span>}
                      </td>
                      <td className={styles.model}>
                        {entry.points.length >= 2 ? model(entry.intercept, entry.slope) : '—'}
                        {full && (
                          <span className={styles.theirs}>{model(full.intercept, full.slope)}</span>
                        )}
                      </td>
                      <td>
                        {entry.points.length >= 2 ? entry.rSquared.toFixed(2) : '—'}
                        {full && <span className={styles.theirs}>{full.rSquared.toFixed(2)}</span>}
                      </td>
                      <td>
                        {entry.reentries.toFixed(2)}
                        {full && <span className={styles.theirs}>{full.reentries.toFixed(2)}</span>}
                      </td>
                      <td>{entry.selectionCount}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        <p className={styles.legendNote}>
          <span className={styles.theirsChip}>{t('theirs')}</span>
          {t('warning')}
        </p>
      </Panel>

      <Panel title={t('plot-title')} note={t('plot-note')}>
        <Scatter reports={reports} labelOf={(id: Trigger) => t(`t-${id}` as ReachKey)} t={t} />
      </Panel>

      <section className={styles.said}>
        <h2 className={styles.saidTitle}>{t('paper-said-title')}</h2>
        <p>{t('paper-said-binary')}</p>
        <p>{t('paper-said-multi')}</p>
      </section>

      <section className={styles.took}>
        <h2 className={styles.tookTitle}>{t('took-title')}</h2>
        <p>{t('took-yes')}</p>
        <p>{t('took-no')}</p>
      </section>
    </div>
  );
}

export type { TriggerReport };
