'use client';

/**
 * 작은 보상 화면.
 *
 * 읽는 순서: 사람을 만들고 -> 지금 이 순간의 뽑기를 들여다보고 -> 세 방식을 견주고
 * -> 무엇이 드러났는지 읽는다. 알고리즘을 설명하는 대신 한 번의 뽑기를 그대로 펼쳐
 * 보이는 이유는, 파레토 앞면이라는 말보다 "이 셋은 서로 못 누른다"는 그림이 빠르기 때문이다.
 */

import { useMemo, useState } from 'react';
import { Panel, PaperCard } from '../../../kit';
import {
  AMOUNTS,
  compare,
  CONTEXTS,
  createBandit,
  drawArms,
  INITIAL_RESPONDER,
  PAPER_RESULT,
  ROUNDS,
  SEED,
  successChance,
  type Context,
  type Responder,
  type Strategy,
} from '../../../core/incentive';
import { createRandom } from '../../../core/random';
import { createTranslator, type Locale } from '../../../core/i18n';
import { DIALS, PAPER } from '../config';
import { nudgeDictionary, type NudgeKey } from '../dictionary';
import { Spend } from './Spend';
import styles from './nudge.module.css';

export function Nudge({ locale }: { locale: Locale }) {
  const t = createTranslator(nudgeDictionary, locale);

  const [base, setBase] = useState(INITIAL_RESPONDER.base);
  const [lift, setLift] = useState(INITIAL_RESPONDER.lift);
  const [enough, setEnough] = useState(INITIAL_RESPONDER.enough);
  const [rounds, setRounds] = useState<number>(ROUNDS.initial);
  const [context, setContext] = useState<Context>('off');
  const [drawSeed, setDrawSeed] = useState(0);

  const responder: Responder = useMemo(
    () => ({ base, lift, enough, contextShift: INITIAL_RESPONDER.contextShift }),
    [base, lift, enough],
  );

  const runs = useMemo(() => compare(responder, rounds, SEED), [responder, rounds]);
  const personal = runs.find((run) => run.strategy === 'personal')!;

  /**
   * 화면에 펼쳐 보이는 한 번의 뽑기.
   * 개인화 방식이 실제로 거쳐 온 팔의 상태를 다시 세워 그 위에서 한 번 뽑는다.
   */
  const draws = useMemo(() => {
    const bandit = createBandit();
    for (const round of personal.rounds) {
      const arms = bandit[round.context];
      const index = AMOUNTS.indexOf(round.amount as (typeof AMOUNTS)[number]);
      if (index < 0) continue;
      arms[index] = round.succeeded
        ? { ...arms[index], successes: arms[index].successes + 1 }
        : { ...arms[index], failures: arms[index].failures + 1 };
    }
    return {
      arms: bandit[context],
      draws: drawArms(bandit[context], createRandom(SEED + drawSeed * 131 + context.length)),
    };
  }, [personal, context, drawSeed]);

  const maxCost = Math.max(...draws.draws.map((draw) => draw.cost), 1);
  const won = (value: number) => new Intl.NumberFormat(locale).format(Math.round(value));

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

      <Panel title={t('person-title')} note={t('person-note')}>
        <div className={styles.dials}>
          {(
            [
              { id: 'base', value: Math.round(base * 100), min: DIALS.base.min, max: DIALS.base.max, step: 1, set: (v: number) => setBase(v / 100), unit: '%' },
              { id: 'lift', value: Math.round(lift * 100), min: DIALS.lift.min, max: DIALS.lift.max, step: 1, set: (v: number) => setLift(v / 100), unit: '%' },
              { id: 'enough', value: enough, min: DIALS.enough.min, max: DIALS.enough.max, step: DIALS.enough.step, set: setEnough, unit: '원' },
              { id: 'rounds', value: rounds, min: ROUNDS.min, max: ROUNDS.max, step: ROUNDS.step, set: setRounds, unit: '' },
            ] as const
          ).map((dial) => (
            <label key={dial.id} className={styles.dial}>
              <span className={styles.dialLabel}>
                {t(dial.id as NudgeKey)}
                <span className={styles.dialValue}>
                  {dial.value}
                  {dial.unit}
                </span>
              </span>
              <input
                type="range"
                min={dial.min}
                max={dial.max}
                step={dial.step}
                value={dial.value}
                onChange={(event) => dial.set(Number(event.target.value))}
              />
              {dial.id !== 'rounds' && <span className={styles.quiet}>{t(`${dial.id}-note` as NudgeKey)}</span>}
            </label>
          ))}
        </div>
      </Panel>

      <Panel title={t('arms-title')} note={t('arms-note')}>
        <div className={styles.contexts}>
          {CONTEXTS.map((id) => (
            <button
              key={id}
              type="button"
              className={styles.context}
              data-active={id === context || undefined}
              onClick={() => setContext(id)}
            >
              {t(`ctx-${id}` as NudgeKey)}
            </button>
          ))}
          <button type="button" className={styles.redraw} onClick={() => setDrawSeed((old) => old + 1)}>
            {t('redraw')}
          </button>
        </div>

        <div className={styles.arms}>
          {draws.draws.map((draw, index) => {
            const arm = draws.arms[index];
            return (
              <div key={draw.amount} className={styles.arm} data-front={draw.onFront || undefined}>
                <span className={styles.armAmount}>{won(draw.amount)}원</span>
                {draw.onFront && <span className={styles.armFront}>{t('front')}</span>}

                <span className={styles.barLabel}>{t('chance')}</span>
                <div className={styles.bar}>
                  <div className={styles.barFill} style={{ height: `${draw.theta * 100}%` }} />
                </div>
                <span className={styles.armValue}>{(draw.theta * 100).toFixed(0)}%</span>

                <span className={styles.barLabel}>{t('expected-cost')}</span>
                <div className={styles.bar} data-cost>
                  <div className={styles.barFillCost} style={{ height: `${(draw.cost / maxCost) * 100}%` }} />
                </div>
                <span className={styles.armValue} data-cost>
                  {won(draw.cost)}원
                </span>

                <span className={styles.armTries}>
                  {t('tries')} {arm.successes + arm.failures}
                </span>
                <span className={styles.armTruth}>
                  {(successChance(responder, context, draw.amount) * 100).toFixed(0)}%
                </span>
              </div>
            );
          })}
        </div>
      </Panel>

      <Panel title={t('runs-title')} note={t('runs-note')}>
        <div className={styles.tableScroll}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th scope="col">{t('col-strategy')}</th>
                <th scope="col">{t('col-rate')}</th>
                <th scope="col">{t('col-total')}</th>
                <th scope="col">{t('col-per')}</th>
                <th scope="col">{t('col-mean')}</th>
              </tr>
            </thead>
            <tbody>
              {runs.map((run) => (
                <tr key={run.strategy} data-best={run.strategy === 'personal' || undefined}>
                  <th scope="row">
                    {t(`st-${run.strategy}` as NudgeKey)}
                    <span className={styles.strategyNote}>{t(`sd-${run.strategy}` as NudgeKey)}</span>
                  </th>
                  <td>{(run.successRate * 100).toFixed(1)}%</td>
                  <td data-cost>{won(run.totalCost)}원</td>
                  <td data-cost>
                    {run.costPerSuccess === null ? '—' : `${run.costPerSuccess.toFixed(1)}원`}
                  </td>
                  <td className={styles.settled}>
                    {CONTEXTS.map((id) => (
                      <span key={id} className={styles.settledItem}>
                        <span className={styles.settledName}>{t(`ctx-${id}` as NudgeKey)}</span>
                        {run.meanOffer[id] === null ? t('none') : `${(run.meanOffer[id] as number).toFixed(1)}원`}
                      </span>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>

      <Panel title={t('plot-title')} note={t('plot-note')}>
        <Spend runs={runs} labelOf={(id: Strategy) => t(`st-${id}` as NudgeKey)} axisX={t('plot-x')} axisY={t('plot-y')} />
      </Panel>

      <section className={styles.findings}>
        <h2 className={styles.findingsTitle}>{t('finding-title')}</h2>
        <p>{t('finding-free')}</p>
        <p>{t('finding-enough')}</p>
        <p>{t('finding-linear')}</p>
      </section>

      <p className={styles.paperSaid}>
        {t('paper-said')} ({PAPER_RESULT.participants}명 · {(PAPER_RESULT.personalSuccessRate * 100).toFixed(0)}% ·{' '}
        {PAPER_RESULT.usageDropSeconds}s)
      </p>
      <p className={styles.warning}>{t('warning')}</p>

      <section className={styles.took}>
        <h2 className={styles.tookTitle}>{t('took-title')}</h2>
        <p>{t('took-yes')}</p>
        <p>{t('took-no')}</p>
      </section>
    </div>
  );
}
