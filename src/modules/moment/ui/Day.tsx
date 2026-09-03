'use client';

/**
 * 흉내 낸 하루.
 *
 * 이 페이지는 오래 이렇게 적어 두고 있었다 — "이 시연은 예측하지 않는다. 단추를 눌러야 뜬다."
 * 그 빈자리가 하필 논문의 알맹이였다. 이제 하루가 스스로 흐르고, 다섯 걸음마다 다시 재고,
 * 말을 걸지 말지 스스로 정한다. 그리고 당신의 대답으로 배운다.
 *
 * 배우는 방법은 코어에 있다(core/jitai/loop.ts) — 맥락마다 받아들인 비율을 세는 것뿐이다.
 * 논문의 모델은 여기 없고, 여기 있는 것은 그 고리를 가장 작게 만든 것이다.
 */

import { useRef, useState } from 'react';
import { Button, SimulationChip, useReach, useSimulation } from '../../../kit';
import {
  APPS,
  DESIGN,
  EMPTY_MEMORY,
  LOOP,
  bandOf,
  contextOf,
  digitsMatch,
  frictionDigits,
  nextUse,
  remember,
  scoreOf,
  shouldSpeak,
  silenced,
  urge,
  weightOf,
  type Memory,
  type Use,
} from '../../../core/jitai';
import { createTranslator, type Locale } from '../../../core/i18n';
import { momentDictionary, type MomentKey } from '../dictionary';
import styles from './moment.module.css';

const FIRST: Use = { atMin: LOOP.startMin, app: APPS[0], minutesInApp: 0 };

/** 자정부터 몇 분을 시계로. */
function clock(atMin: number): string {
  const hour = Math.floor(atMin / 60) % 24;
  const minute = atMin % 60;
  return `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
}

export function Day({ locale }: { locale: Locale }) {
  const t = createTranslator(momentDictionary, locale);
  const reach = useReach();

  const [use, setUse] = useState<Use>(FIRST);
  const [memory, setMemory] = useState<Memory>(EMPTY_MEMORY);
  const [asking, setAsking] = useState(false);
  const [typed, setTyped] = useState('');
  const [wrong, setWrong] = useState(false);
  /** 배움 때문에 조용해진 자리. 한 번 나오면 그대로 둔다 — 이 페이지가 보여 주려던 것이다. */
  const [quiet, setQuiet] = useState<string | null>(null);
  const step = useRef(0);

  const digits = frictionDigits(use.atMin);

  const day = useSimulation(() => {
    // 개입이 떠 있는 동안 하루는 기다린다. 지금은 사람이 답할 차례다.
    if (asking) return;
    step.current += 1;
    const moved = nextUse(use, step.current, APPS);
    setUse(moved);
    if (shouldSpeak(memory, moved)) {
      setTyped('');
      setWrong(false);
      setAsking(true);
    }
  }, LOOP.tickMs);

  /** 사람의 대답을 받아 적고 하루를 다시 흐르게 한다. */
  const answered = (accepted: boolean) => {
    const after = remember(memory, use, accepted);
    if (!accepted && quiet === null && silenced(memory, after, use)) {
      setQuiet(contextOf(use));
      reach();
    }
    setMemory(after);
    setAsking(false);
    if (accepted) setUse({ ...use, minutesInApp: 0 });
  };

  const keepGoing = () => {
    if (digitsMatch(digits, typed)) answered(false);
    else setWrong(true);
  };

  const score = scoreOf(memory, use);
  const learned = Object.entries(memory.counts);
  const appName = (app: string) => t(`app-${app}` as MomentKey);
  const bandName = (band: string) => t(`band-${band}` as MomentKey);
  const contextName = (key: string) => {
    const [band, app] = key.split(':');
    return `${bandName(band)} · ${appName(app)}`;
  };

  return (
    <>
      <div className={styles.dayHead}>
        <SimulationChip running={day.running} onToggle={day.toggle} locale={locale} />
        <span className={styles.clock}>{clock(use.atMin)}</span>
        <span className={styles.dayNow}>
          {appName(use.app)} · {t('day-for')} {use.minutesInApp}
          {t('day-min')}
        </span>
      </div>

      <div className={styles.phone}>
        {asking ? (
          <div className={styles.overlay}>
            <p className={styles.overlayTitle}>{t('demo-overlay-title')}</p>
            <div className={styles.why}>
              <span className={styles.whyLabel}>{t('demo-why')}</span>
              <div className={styles.whyChips}>
                <span className={styles.whyChip}>
                  {t('why-long')} {use.minutesInApp}
                  {t('day-min')}
                </span>
                {bandOf(use.atMin) === 'night' && <span className={styles.whyChip}>{t('why-night')}</span>}
                <span className={styles.whyChip}>
                  {t('why-here')} {Math.round(weightOf(memory, contextOf(use)) * 100)}%
                </span>
              </div>
              <p className={styles.fine}>{t('why-mine')}</p>
            </div>
            <p className={styles.overlayBody}>{t('demo-overlay-body')}</p>
            <p className={styles.digits}>{digits.replace(/(\d{4})(?=\d)/g, '$1 ')}</p>
            <input
              className={styles.digitInput}
              value={typed}
              inputMode="numeric"
              autoComplete="off"
              placeholder={t('demo-typed')}
              onChange={(event) => {
                setTyped(event.target.value);
                setWrong(false);
              }}
            />
            {wrong && <p className={styles.wrong}>{t('demo-wrong')}</p>}
            <div className={styles.overlayActions}>
              <Button onClick={keepGoing}>{t('demo-continue')}</Button>
              <Button onClick={() => answered(true)} variant="primary">
                {t('demo-leave')}
              </Button>
            </div>
          </div>
        ) : (
          <div className={styles.phoneIdle}>
            <p className={styles.dayApp}>{appName(use.app)}</p>
            <span className={styles.meter}>
              <span className={styles.meterFill} style={{ width: `${Math.min(100, score * 100)}%` }} />
              <span className={styles.meterLine} style={{ left: `${LOOP.threshold * 100}%` }} />
            </span>
            <p className={styles.fine}>
              {t('day-score')} {score.toFixed(2)} · {t('day-threshold')} {LOOP.threshold} ·{' '}
              {t('day-urge')} {urge(use).toFixed(2)}
            </p>
          </div>
        )}
      </div>

      <div className={styles.learned}>
        <span className={styles.whyLabel}>{t('day-learned')}</span>
        {learned.length === 0 ? (
          <p className={styles.fine}>{t('day-nothing')}</p>
        ) : (
          <dl className={styles.learnedList}>
            {learned.map(([key, seen]) => (
              <div key={key} className={styles.learnedRow} data-quiet={key === quiet || undefined}>
                <dt>{contextName(key)}</dt>
                <dd>
                  <span className={styles.meter}>
                    <span
                      className={styles.meterFill}
                      style={{ width: `${weightOf(memory, key) * 100}%` }}
                    />
                  </span>
                  <span className={styles.learnedCount}>
                    {t('day-accepted')} {seen.accepted} · {t('day-dismissed')} {seen.dismissed}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        )}
        {quiet !== null && (
          <p className={styles.quietLine}>
            {t('day-quiet')} <b>{contextName(quiet)}</b>
          </p>
        )}
      </div>

      <p className={styles.note}>
        {t('demo-mine')} {t('day-interval')} {DESIGN.predictionIntervalMin}
        {t('day-min')} · {t('day-cooldown')} {DESIGN.cooldownMin}
        {t('day-min')}
      </p>
    </>
  );
}
