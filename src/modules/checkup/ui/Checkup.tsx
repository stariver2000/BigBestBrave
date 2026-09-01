'use client';

/**
 * 유출 확인 화면.
 *
 * 세 덩이로 읽힌다. 위에서 글자를 넣고, 바로 아래 한 줄로 할 일을 받고, 그 아래에서
 * 왜 그런지를 본다. 이 순서를 고른 이유: 근거가 된 연구가 짚은 걸림돌이 '경보 피로'와
 * '낮은 체감 급함'이었다. 근거를 먼저 늘어놓으면 읽다 지치고, 경고만 던지면 움직이지 않는다.
 * 그래서 할 일은 언제나 한 줄이고, 근거는 그 뒤에 둔다.
 */

import { Fragment, useMemo, useState } from 'react';
import { Panel } from '../../../kit';
import { checkPassword } from '../../../core/checkup';
import { createTranslator, type Locale } from '../../../core/i18n';
import { CORPUS_SLIDER, HASH_GROUP, INITIAL_PASSWORD, PAPER, SAMPLES } from '../config';
import { checkupDictionary, type CheckupKey } from '../dictionary';
import { compact, group, percent, toDuration } from './format';
import styles from './checkup.module.css';

export function Checkup({ locale }: { locale: Locale }) {
  const t = createTranslator(checkupDictionary, locale);

  const [password, setPassword] = useState(INITIAL_PASSWORD);
  const [revealed, setRevealed] = useState(true);
  const [exponent, setExponent] = useState(9);

  const corpusSize = useMemo(() => Math.round(Math.pow(10, exponent)), [exponent]);
  const report = useMemo(
    () => checkPassword(password, { corpusSize }),
    [password, corpusSize],
  );
  const { anonymity, split, derivation } = report;

  /** 초를 사람이 읽는 한 덩이로. */
  const spell = (seconds: number) => {
    const duration = toDuration(seconds);
    if (duration.unitKey === null) return t('instant');
    return `${compact(duration.amount, locale)} ${t(duration.unitKey as CheckupKey)}`;
  };

  return (
    <div className={styles.layout}>
      <p className={styles.paper}>
        <span className={styles.paperLabel}>{t('paper-label')}</span>
        <a href={PAPER.link} target="_blank" rel="noreferrer">
          {PAPER.title}
        </a>
        <span className={styles.paperMeta}>
          {PAPER.authors} · {PAPER.venue}
        </span>
      </p>

      <Panel title={t('input-title')} note={t('input-note')}>
        <div className={styles.entry}>
          <input
            className={styles.password}
            type={revealed ? 'text' : 'password'}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder={t('input-placeholder')}
            aria-label={t('input-label')}
            autoComplete="off"
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck={false}
          />
          <button type="button" className={styles.reveal} onClick={() => setRevealed(!revealed)}>
            {revealed ? t('conceal') : t('reveal')}
          </button>
        </div>

        <div className={styles.samples}>
          <span className={styles.samplesLabel}>{t('samples-label')}</span>
          {SAMPLES.map((sample) => (
            <button
              key={sample.key}
              type="button"
              className={styles.sample}
              data-active={sample.value === password || undefined}
              onClick={() => setPassword(sample.value)}
            >
              {t(sample.key as CheckupKey)}
            </button>
          ))}
        </div>

        <p className={styles.local}>
          <span className={styles.localMark} aria-hidden="true" />
          {t('local-note')}
        </p>
      </Panel>

      {/* 할 일은 언제나 한 줄이다. 경고를 여러 개 쌓지 않는다. */}
      <div className={styles.verdict} data-urgency={report.urgency}>
        <span className={styles.verdictBadge}>{t(`urgency-${report.urgency}` as CheckupKey)}</span>
        <p className={styles.verdictAction}>{t(`action-${report.urgency}` as CheckupKey)}</p>
      </div>

      <div className={styles.columns}>
        <Panel title={t('anon-title')} note={t('anon-note')}>
          <div className={styles.hash}>
            <div className={styles.hashPart} data-role="sent">
              <span className={styles.hashLabel}>
                {t('sent-label')}
                <span className={styles.hashLabelNote}>{t('sent-note')}</span>
              </span>
              <code className={styles.hashText}>{split.prefix}</code>
            </div>
            <div className={styles.hashPart} data-role="kept">
              <span className={styles.hashLabel}>
                {t('kept-label')}
                <span className={styles.hashLabelNote}>{t('kept-note')}</span>
              </span>
              <code className={styles.hashText}>
                {group(split.suffix, HASH_GROUP).map((chunk, index) => (
                  <span key={index} className={styles.hashChunk}>
                    {chunk}
                  </span>
                ))}
              </code>
            </div>
          </div>

          <div className={styles.bits}>
            <span className={styles.bitsSent} style={{ flexGrow: anonymity.bitsSent }}>
              {anonymity.bitsSent} {t('bits-unit')}
            </span>
            <span className={styles.bitsKept} style={{ flexGrow: anonymity.bitsWithheld }}>
              {anonymity.bitsWithheld} {t('bits-unit')}
            </span>
          </div>

          <label className={styles.slider}>
            <span className={styles.sliderLabel}>
              {t('corpus-label')}
              <span className={styles.sliderValue}>{compact(corpusSize, locale)}</span>
            </span>
            <input
              type="range"
              min={CORPUS_SLIDER.minExponent}
              max={CORPUS_SLIDER.maxExponent}
              step={CORPUS_SLIDER.step}
              value={exponent}
              onChange={(event) => setExponent(Number(event.target.value))}
            />
            <span className={styles.quiet}>{t('corpus-note')}</span>
          </label>

          <dl className={styles.figures}>
            <div className={styles.figure}>
              <dt>{t('bucket-label')}</dt>
              <dd className={styles.figureBig}>{compact(anonymity.expectedBucket, locale)}</dd>
              <dd className={styles.quiet}>{t('bucket-note')}</dd>
            </div>
            <div className={styles.figure}>
              <dt>{t('guess-label')}</dt>
              <dd className={styles.figureBig}>{percent(anonymity.guessProbability, locale)}</dd>
              <dd className={styles.quiet}>{t('guess-note')}</dd>
            </div>
          </dl>
        </Panel>

        <Panel title={t('path-title')} note={t('path-note')}>
          {password.length === 0 ? (
            <p className={styles.quiet}>{t('empty-note')}</p>
          ) : derivation === null ? (
            <div className={styles.notfound}>
              <p className={styles.notfoundTitle}>{t('notfound-title')}</p>
              <p className={styles.quiet}>{t('notfound-note')}</p>
            </div>
          ) : (
            <>
              {/* 사전 단어에서 이 비밀번호까지의 사슬. 목록이 아니라 그림이라 li를 쓰지 않는다. */}
              <div className={styles.chain}>
                <div className={styles.step} data-kind="base">
                  <span className={styles.stepLabel}>{t('base-label')}</span>
                  <code className={styles.stepWord}>{derivation.base}</code>
                  <span className={styles.stepFactor}>
                    {t('rank-label')} #{compact(derivation.baseRank, locale)}
                  </span>
                </div>
                {derivation.rules.map((rule, index) => (
                  <Fragment key={`${rule.id}-${index}`}>
                    <span className={styles.arrow} aria-hidden="true">
                      →
                    </span>
                    <div className={styles.step} data-kind="rule">
                      <span className={styles.stepLabel}>{t(`rule-${rule.id}` as CheckupKey)}</span>
                      {(rule.id === 'suffix' || rule.id === 'prefix') && (
                        <code className={styles.stepWord}>{rule.detail}</code>
                      )}
                      <span className={styles.stepFactor}>×{compact(rule.branching, locale)}</span>
                    </div>
                  </Fragment>
                ))}
              </div>

              <p className={styles.attempts}>
                <span className={styles.attemptsLabel}>{t('attempts-label')}</span>
                <span className={styles.attemptsNumber}>{compact(derivation.attempts, locale)}</span>
                <span className={styles.quiet}>{t('attempts-note')}</span>
              </p>

              <dl className={styles.figures}>
                <div className={styles.figure}>
                  <dt>{t('offline-label')}</dt>
                  <dd className={styles.figureBig} data-tone="alert">
                    {spell(report.crackTime!.offline)}
                  </dd>
                  <dd className={styles.quiet}>{t('offline-note')}</dd>
                </div>
                <div className={styles.figure}>
                  <dt>{t('online-label')}</dt>
                  <dd className={styles.figureBig}>{spell(report.crackTime!.online)}</dd>
                  <dd className={styles.quiet}>{t('online-note')}</dd>
                </div>
              </dl>
            </>
          )}
        </Panel>
      </div>

      <section className={styles.took}>
        <h2 className={styles.tookTitle}>{t('took-title')}</h2>
        <p>{t('took-yes')}</p>
        <p>{t('took-no')}</p>
      </section>
    </div>
  );
}
