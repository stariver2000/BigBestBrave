'use client';

/**
 * 문턱을 재는 계단.
 *
 * 이 페이지에는 논문 Table 2의 결과가 있었지만 그 숫자가 어떻게 나왔는지는 없었다.
 * 여기서 그 방법이 눈앞에서 돈다 — 가상의 손이 논문의 문턱을 감춰 두고 대답하면,
 * 계단은 여섯 차례를 하나씩 걸어 그 자리를 찾아낸다.
 *
 * 그리고 아무 때나 사람이 대답을 이어받을 수 있다. 같은 계단, 다른 대답하는 이다.
 * 눈으로만 견줄 때 자기 치우침이 거의 0이라는 것을 자기 손으로 재고 나면,
 * 손에 쥔 것에서 42%가 얼마나 큰 어긋남인지가 숫자가 아니라 몸으로 남는다.
 */

import { useRef, useState } from 'react';
import { SimulationChip, useReach, useSimulation } from '../../../kit';
import {
  answer,
  DEVICE_MM,
  FELT_RATIO,
  startRun,
  STAIRCASE,
  THRESHOLDS,
  thresholdOf,
  virtualAnswer,
  type Answer,
  type Run,
} from '../../../core/illusion';
import { createTranslator, type Locale } from '../../../core/i18n';
import { CLIMB_MS, LIMITS, PLOT, PX_PER_MM, START } from '../config';
import { gripDictionary, type GripKey } from './../dictionary';
import styles from './grip.module.css';

/** 가상의 손이 걷는 차례. 여섯 차례를 올려 가며 한 번, 내려 가며 한 번씩 돈다. */
const LEGS = THRESHOLDS.flatMap((row) => [
  { sequence: row.sequence, up: true, hidden: row.ascending },
  { sequence: row.sequence, up: false, hidden: row.descending },
]);

const beginning = (up: boolean) => startRun(up ? START.low : START.high, STAIRCASE.step);

export function Staircase({ locale }: { locale: Locale }) {
  const t = createTranslator(gripDictionary, locale);
  const reach = useReach();

  const [leg, setLeg] = useState(0);
  const [run, setRun] = useState<Run>(() => beginning(true));
  const [mine, setMine] = useState(false);
  /** 사람이 잰 두 문턱. 올려 가며 잰 것과 내려 가며 잰 것. */
  const [found, setFound] = useState<{ up: number | null; down: number | null }>({ up: null, down: null });
  const [goingUp, setGoingUp] = useState(true);
  const rest = useRef(0);

  const machine = useSimulation(() => {
    if (mine) return;
    if (!run.done) {
      setRun((current) => answer(current, virtualAnswer(current.level, LEGS[leg].hidden), LIMITS));
      return;
    }
    // 찾아낸 자리를 잠깐 보여 준 뒤 다음 차례로 넘어간다.
    rest.current += 1;
    if (rest.current > STAIRCASE.average) {
      rest.current = 0;
      const next = (leg + 1) % LEGS.length;
      setLeg(next);
      setRun(beginning(LEGS[next].up));
    }
  }, CLIMB_MS);

  const said = (value: Answer) => {
    const after = answer(run, value, LIMITS);
    setRun(after);
    if (!after.done) return;

    const mark = thresholdOf(after);
    const both = goingUp ? { ...found, up: mark } : { ...found, down: mark };
    setFound(both);
    if (both.up !== null && both.down !== null) {
      // 두 방향을 다 재고 나야 치우침과 창이 나온다. 이 자리가 이 페이지의 아하 지점이다.
      reach();
      return;
    }
    setGoingUp(!goingUp);
    setRun(beginning(!goingUp));
  };

  const takeOver = () => {
    machine.stop();
    setMine(true);
    setFound({ up: null, down: null });
    setGoingUp(true);
    setRun(beginning(true));
  };

  const giveBack = () => {
    setMine(false);
    setRun(beginning(LEGS[leg].up));
    if (!machine.running) machine.toggle();
  };

  const mark = thresholdOf(run);
  const now = LEGS[leg];
  const complete = found.up !== null && found.down !== null;
  const middle = complete ? (found.up! + found.down!) / 2 : null;

  const px = (millimetres: number) => Math.round(millimetres * PX_PER_MM);

  /** 그림에 그릴 걸음들. 끝나지 않은 계단은 서 있는 자리까지 함께 그린다. */
  const walk = run.trail.concat(run.done ? [] : [run.level]).slice(-PLOT.steps);
  /** 걸어온 길에서 방향이 바뀐 자리. 되돌이가 그림의 어디였는지는 길에서 곧바로 읽힌다. */
  const turns = walk
    .map((_, index) => index)
    .filter(
      (index) =>
        index > 0 &&
        index < walk.length - 1 &&
        Math.sign(walk[index + 1] - walk[index]) !== Math.sign(walk[index] - walk[index - 1]),
    );
  const span = Math.max(PLOT.minSteps, walk.length - 1);
  const plotX = (index: number) => (index / span) * PLOT.width;
  const plotY = (millimetres: number) =>
    PLOT.height - ((millimetres - LIMITS.min) / (LIMITS.max - LIMITS.min)) * PLOT.height;

  return (
    <>
      <div className={styles.whoRow}>
        {!mine && <SimulationChip running={machine.running} onToggle={machine.toggle} locale={locale} />}
        <p className={styles.quiet}>{mine ? t('who-human') : t('who-machine')}</p>
        <button type="button" className={styles.reset} onClick={mine ? giveBack : takeOver}>
          {mine ? t('give-back') : t('take-over')}
        </button>
      </div>

      <div className={styles.circles}>
        <figure className={styles.circleBox}>
          <span className={styles.disc} style={{ width: px(DEVICE_MM), height: px(DEVICE_MM) }} />
          <figcaption className={styles.circleLabel}>
            {t('held')} <b>{DEVICE_MM}mm</b>
          </figcaption>
        </figure>
        <figure className={styles.circleBox}>
          <span
            className={`${styles.disc} ${styles.discSeen}`}
            style={{ width: px(run.level), height: px(run.level) }}
          />
          <figcaption className={styles.circleLabel}>
            {t('seen')} <b>{run.level.toFixed(1)}mm</b>
          </figcaption>
        </figure>
      </div>

      {mine && !complete && (
        <div className={styles.askRow}>
          <span className={styles.ask}>{t('ask')}</span>
          <button type="button" className={styles.answer} onClick={() => said('bigger')}>
            {t('yes')}
          </button>
          <button type="button" className={styles.answer} onClick={() => said('smaller')}>
            {t('no')}
          </button>
        </div>
      )}

      <svg className={styles.plot} viewBox={`0 0 ${PLOT.width} ${PLOT.height}`} role="img" aria-label={t('plot-alt')}>
        <polyline
          className={styles.plotLine}
          points={walk.map((level, index) => `${plotX(index)},${plotY(level)}`).join(' ')}
        />
        {turns.map((index) => (
          <circle key={index} cx={plotX(index)} cy={plotY(walk[index])} r={3} className={styles.plotDot} />
        ))}
        {mark !== null && (
          <line x1={0} y1={plotY(mark)} x2={PLOT.width} y2={plotY(mark)} className={styles.plotMark} />
        )}
      </svg>

      <dl className={styles.readouts}>
        {!mine && (
          <div className={styles.readout}>
            <dt>{t('leg')}</dt>
            <dd>
              {t('seq')} {now.sequence} · {now.up ? t('dir-up') : t('dir-down')}
            </dd>
          </div>
        )}
        {mine && (
          <div className={styles.readout}>
            <dt>{t('leg')}</dt>
            <dd>{goingUp ? t('dir-up') : t('dir-down')}</dd>
          </div>
        )}
        <div className={styles.readout}>
          <dt>{t('reversals')}</dt>
          <dd>
            {run.reversals.length} / {STAIRCASE.reversals}
          </dd>
        </div>
        <div className={styles.readout}>
          <dt>{t('found')}</dt>
          <dd className={styles.big}>{mark === null ? '—' : `${mark.toFixed(1)}mm`}</dd>
        </div>
        {!mine && run.done && (
          <div className={styles.readout}>
            <dt>{t('matches')}</dt>
            <dd>{now.hidden.toFixed(3)}mm</dd>
          </div>
        )}
      </dl>

      {complete && (
        <section className={styles.mineResult}>
          <p className={styles.mineLine}>
            {t('your-window')} <b>{found.down!.toFixed(1)}mm – {found.up!.toFixed(1)}mm</b>
          </p>
          <p className={styles.mineLine}>
            {t('your-bias')} <b>{(((middle! - DEVICE_MM) / DEVICE_MM) * 100).toFixed(1)}%</b>
            <span className={styles.quiet}>
              {' '}
              · {t('paper-bias')} +{((FELT_RATIO - 1) * 100).toFixed(1)}%
            </span>
          </p>
          <p className={styles.quiet}>{t('your-lesson')}</p>
          <button type="button" className={styles.reset} onClick={takeOver}>
            {t('again')}
          </button>
        </section>
      )}
    </>
  );
}
