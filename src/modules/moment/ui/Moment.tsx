'use client';

/**
 * 끼어드는 때 화면.
 *
 * 순서: 먼저 겪게 하고(12자리 마찰), 그 다음에 사다리를 편다. 겪어 보지 않으면
 * "수용도"라는 말이 숫자로만 읽힌다. 열두 자리를 손으로 쳐 본 다음에야 그 숫자가
 * 무엇을 재는지 몸이 안다.
 *
 * 이 시연은 예측하지 않는다. 단추를 눌러야 뜬다. 언제 띄울지 아는 것이 논문의
 * 알맹이인데 그 앎은 모델 안에 있고 모델은 여기 없다. 그 사실을 화면에도 적었다.
 */

import { useMemo, useState } from 'react';
import { Badge, Button, Panel, PaperCard } from '../../../kit';
import {
  ACCURACY,
  CONDITIONS,
  DESIGN,
  EFFECT_SIZES,
  EXPLANATION_EXAMPLES,
  RANKING,
  RECEPTIVITY,
  SCALE,
  VISIT_REDUCTION,
  accuracyComposition,
  digitsMatch,
  feedbackRate,
  fourWayAccuracyComposition,
  frictionDigits,
  ratio,
  receptivityGain,
  type ConditionId,
} from '../../../core/jitai';
import { createTranslator, type Locale } from '../../../core/i18n';
import { DEMO_CATEGORIES, PAPER } from '../config';
import { momentDictionary, type MomentKey } from '../dictionary';
import styles from './moment.module.css';

type DemoState = 'idle' | 'shown' | 'left' | 'continued';

/** 문구의 {자리}를 코어 값으로 채운다. 숫자를 사전에 박아 두면 코어와 어긋나도 아무도 모른다. */
function fill(text: string, values: Record<string, string | number>): string {
  return Object.entries(values).reduce(
    (out, [key, value]) => out.replaceAll(`{${key}}`, String(value)),
    text,
  );
}

/** 상대값 막대의 눈금 위끝. 가장 큰 배율(1.975)이 안에 들어오도록 둔다. */
const BAR_MAX = 2.1;

export function Moment({ locale }: { locale: Locale }) {
  const t = createTranslator(momentDictionary, locale);

  const [demo, setDemo] = useState<DemoState>('idle');
  const [seed, setSeed] = useState(1);
  const [typed, setTyped] = useState('');
  const [wrong, setWrong] = useState(false);
  const [detail, setDetail] = useState(false);
  const [condition, setCondition] = useState<ConditionId>('adaptiveWExp');

  const digits = useMemo(() => frictionDigits(seed), [seed]);
  const compose3 = useMemo(() => accuracyComposition(), []);
  const compose4 = useMemo(() => fourWayAccuracyComposition(), []);
  const gain = useMemo(() => receptivityGain(), []);

  const explaining = condition === 'adaptiveWExp';
  const demoExamples = EXPLANATION_EXAMPLES.filter((entry) =>
    (DEMO_CATEGORIES as readonly string[]).includes(entry.high),
  );

  const launch = () => {
    setSeed((prev) => prev + 1);
    setTyped('');
    setWrong(false);
    setDemo('shown');
  };

  const tryContinue = () => {
    if (digitsMatch(digits, typed)) setDemo('continued');
    else setWrong(true);
  };

  /** 막대 하나. 값이 없으면(Control) 1.0이다. */
  const bar = (value: number, kind: 'accuracy' | 'receptivity') => (
    <span className={styles.barWrap}>
      <span className={styles.bar} data-kind={kind} style={{ width: `${(value / BAR_MAX) * 100}%` }} />
    </span>
  );

  /** 사다리의 상대값. 본문이 적은 수만 쓴다 - Control 1.0, 나머지는 6.3절의 증가율에서. */
  const ladder: Record<ConditionId, { accuracy: number | null; receptivity: number | null }> = {
    control: { accuracy: 1, receptivity: 1 },
    personalized: {
      accuracy: ratio(ACCURACY.three.personalizedVsControl),
      receptivity: ratio(RECEPTIVITY.three.personalizedVsControl),
    },
    // 설명 없는 적응형 홀로의 Control 대비 값은 본문에 없다. 지어내지 않고 비워 둔다.
    adaptiveWoExp: { accuracy: null, receptivity: null },
    adaptiveWExp: {
      accuracy: ratio(ACCURACY.four.wExpVsControl),
      receptivity: ratio(RECEPTIVITY.four.wExpVsControl),
    },
  };

  return (
    <div className={styles.layout}>
      <PaperCard
        label={t('paper-label')}
        title={PAPER.title}
        meta={`${PAPER.authors} · ${PAPER.affiliation} · ${PAPER.venue} · ${PAPER.fullText}`}
        href={PAPER.link}
        plain={PAPER.plain}
        locale={locale}
      />

      <Panel title={t('demo-title')} note={t('demo-note')}>
        <div className={styles.phone}>
          {demo === 'idle' && (
            <div className={styles.phoneIdle}>
              <Button onClick={launch} variant="primary">
                {t('demo-launch')}
              </Button>
            </div>
          )}

          {demo === 'shown' && (
            <div className={styles.overlay}>
              <p className={styles.overlayTitle}>{t('demo-overlay-title')}</p>
              {explaining && (
                <div className={styles.why}>
                  <span className={styles.whyLabel}>{t('demo-why')}</span>
                  <div className={styles.whyChips}>
                    {DEMO_CATEGORIES.map((category) => (
                      <span key={category} className={styles.whyChip}>
                        {category}
                      </span>
                    ))}
                  </div>
                  {detail && (
                    <ul className={styles.whyDetail}>
                      {demoExamples.map((entry) => (
                        <li key={entry.feature}>
                          <span className={styles.whyLow}>{entry.low}</span>
                          <code className={styles.whyFeature}>{entry.feature}</code>
                        </li>
                      ))}
                    </ul>
                  )}
                  <button type="button" className={styles.whyToggle} onClick={() => setDetail(!detail)}>
                    {detail ? t('demo-less') : t('demo-more')}
                  </button>
                  <p className={styles.fine}>{t('demo-why-note')}</p>
                </div>
              )}
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
                <Button onClick={tryContinue}>{t('demo-continue')}</Button>
                <Button onClick={() => setDemo('left')} variant="primary">
                  {t('demo-leave')}
                </Button>
              </div>
            </div>
          )}

          {(demo === 'left' || demo === 'continued') && (
            <div className={styles.phoneIdle}>
              <p className={styles.outcome} data-kind={demo}>
                {demo === 'left' ? t('demo-left') : t('demo-continued')}
              </p>
              <Button onClick={launch}>{t('demo-again')}</Button>
            </div>
          )}
        </div>
        <p className={styles.note}>{t('demo-mine')}</p>
      </Panel>

      <Panel
        title={t('ladder-title')}
        note={t('ladder-note')}
      >
        <div className={styles.ladder}>
          {CONDITIONS.map((entry) => {
            const values = ladder[entry.id];
            const on = condition === entry.id;
            return (
              <button
                key={entry.id}
                type="button"
                className={styles.rung}
                data-on={on}
                aria-pressed={on}
                onClick={() => setCondition(entry.id)}
              >
                <span className={styles.rungHead}>
                  <span className={styles.rungName}>{t(`c-${entry.id}` as MomentKey)}</span>
                  <span className={styles.rungFlags}>
                    {(['ml', 'adaptive', 'explainable'] as const).map((flag) => (
                      <span key={flag} className={styles.flag} data-on={entry[flag]}>
                        {t(`f-${flag}` as MomentKey)}
                      </span>
                    ))}
                  </span>
                </span>
                <span className={styles.rungDesc}>{t(`cd-${entry.id}` as MomentKey)}</span>
                <span className={styles.metric}>
                  <span className={styles.metricLabel}>{t('m-accuracy')}</span>
                  {values.accuracy === null ? (
                    <span className={styles.metricNone}>–</span>
                  ) : (
                    <>
                      {bar(values.accuracy, 'accuracy')}
                      <span className={styles.metricValue}>{values.accuracy.toFixed(2)}</span>
                    </>
                  )}
                </span>
                <span className={styles.metric}>
                  <span className={styles.metricLabel}>{t('m-receptivity')}</span>
                  {values.receptivity === null ? (
                    <span className={styles.metricNone}>–</span>
                  ) : (
                    <>
                      {bar(values.receptivity, 'receptivity')}
                      <span className={styles.metricValue}>{values.receptivity.toFixed(2)}</span>
                    </>
                  )}
                </span>
              </button>
            );
          })}
        </div>
        <p className={styles.note}>
          {t('vs-control')} 1.00 ·{' '}
          {fill(t('design-line'), {
            interval: DESIGN.predictionIntervalMin,
            cooldown: DESIGN.cooldownMin,
          })}
        </p>
      </Panel>

      <Panel title={t('mixed-title')} note={t('mixed-note')}>
        <div className={styles.mixed}>
          <div className={styles.mixedSide}>
            <span className={styles.smallLabel}>{t('mixed-visits')}</span>
            <div className={styles.mixedRow}>
              <span className={styles.mixedName}>{t('c-adaptiveWoExp')}</span>
              <span className={styles.mixedValue} data-kind="warm">
                −{VISIT_REDUCTION.woExp.percent.toFixed(1)}%
              </span>
              <Badge tone="pass">{t('mixed-sig')}</Badge>
            </div>
            <div className={styles.mixedRow}>
              <span className={styles.mixedName}>{t('c-adaptiveWExp')}</span>
              <span className={styles.mixedValue}>−{VISIT_REDUCTION.wExp.percent.toFixed(1)}%</span>
              <Badge tone="neutral">{t('mixed-marginal')}</Badge>
            </div>
          </div>
          <div className={styles.mixedSide}>
            <span className={styles.smallLabel}>{t('mixed-rank')}</span>
            <div className={styles.mixedRow}>
              <span className={styles.mixedName}>{t('c-adaptiveWExp')}</span>
              <span className={styles.mixedValue} data-kind="accent">
                {RANKING.wExp.first}% {t('mixed-first')}
              </span>
              <span className={styles.mixedValue} data-kind="warm">
                {RANKING.wExp.third}% {t('mixed-third')}
              </span>
            </div>
            <div className={styles.mixedRow}>
              <span className={styles.mixedName}>{t('c-adaptiveWoExp')}</span>
              <span className={styles.mixedValue}>
                {RANKING.woExp.first}% {t('mixed-first')}
              </span>
              <span className={styles.mixedValue}>
                {RANKING.woExp.third}% {t('mixed-third')}
              </span>
            </div>
          </div>
        </div>
        <p className={styles.note}>
          {fill(t('mixed-read'), {
            rEff: EFFECT_SIZES.effectiveness.toFixed(2),
            rTrust: EFFECT_SIZES.trust.toFixed(2),
          })}
        </p>
      </Panel>

      <Panel title={t('check-title')} note={t('check-note')}>
        <div className={styles.checks}>
          <div className={styles.check}>
            <span className={styles.checkName}>{t('check-compose')}</span>
            <span className={styles.checkPair}>
              <span className={styles.checkCell}>
                <span className={styles.smallLabel}>{t('check-ours')}</span>
                <span className={styles.checkValue}>+{compose3.composed.toFixed(1)}%</span>
              </span>
              <span className={styles.checkCell}>
                <span className={styles.smallLabel}>{t('check-theirs')}</span>
                <span className={styles.checkValue}>+{compose3.stated.toFixed(1)}%</span>
              </span>
            </span>
            <Badge tone="pass">{t('check-match')}</Badge>
          </div>
          <div className={styles.check}>
            <span className={styles.checkName}>{t('check-abstract')}</span>
            <span className={styles.checkPair}>
              <span className={styles.checkCell}>
                <span className={styles.smallLabel}>{t('check-ours')}</span>
                <span className={styles.checkValue}>+{gain.toFixed(2)}%</span>
              </span>
              <span className={styles.checkCell}>
                <span className={styles.smallLabel}>{t('check-theirs')}</span>
                <span className={styles.checkValue}>&gt;{RECEPTIVITY.abstractClaim.toFixed(1)}%</span>
              </span>
            </span>
            <Badge tone="pass">{t('check-match')}</Badge>
          </div>
          <div className={styles.check}>
            <span className={styles.checkName}>{t('check-four')}</span>
            <span className={styles.checkPair}>
              <span className={styles.checkCell}>
                <span className={styles.smallLabel}>{t('check-ours')}</span>
                <span className={styles.checkValue}>+{compose4.composed.toFixed(1)}%</span>
              </span>
              <span className={styles.checkCell}>
                <span className={styles.smallLabel}>{t('check-theirs')}</span>
                <span className={styles.checkValue}>+{compose4.stated.toFixed(1)}%</span>
              </span>
            </span>
            <Badge tone="fail">{t('check-mismatch')}</Badge>
          </div>
        </div>
        <p className={styles.note}>{t('check-verdict')}</p>
      </Panel>

      <Panel title={t('scale-title')} note={t('scale-note')}>
        <p className={styles.scale}>
          {fill(t('scale-line'), {
            participants: SCALE.participants,
            weeks: SCALE.weeks,
            apps: SCALE.apps,
            sessions: SCALE.sessions.toLocaleString('en-US'),
            minutes: SCALE.minutes.toLocaleString('en-US'),
            labels: SCALE.labels.toLocaleString('en-US'),
            entry: SCALE.labelStageShare.entry,
            using: SCALE.labelStageShare.using,
            exit: SCALE.labelStageShare.exit,
            encounters: SCALE.encounters.toLocaleString('en-US'),
            feedback: SCALE.feedbackLabels.toLocaleString('en-US'),
            rate: feedbackRate().toFixed(1),
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
