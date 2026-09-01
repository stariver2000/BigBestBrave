'use client';

/**
 * 귓속말 화면.
 *
 * 맨 앞이 겪는 판이다. 같은 말썽에 세 갈래 조치를 해 보면 앞무대와 뒷무대에 남는 것이
 * 다르다는 것이 한눈에 보인다. 기본 상태는 아무 조치도 안 한 채로 두어, 세 단추가
 * 저마다 무엇을 바꾸는지 눌러서 확인하게 한다.
 *
 * 말썽 메시지와 공개 경고문은 지어낸 글이고, 귓속말 본문만 도구의 원문이다.
 * 그 구분을 화면에도 적었다.
 */

import { useMemo, useState } from 'react';
import { Badge, Button, Panel } from '../../../kit';
import {
  NUDGES,
  OUTCOMES,
  SERVERS,
  STUDY,
  catalogedSum,
  continuedServers,
  nudgeShare,
  totalNudges,
  type NudgeId,
} from '../../../core/backchannel';
import { createTranslator, type Locale } from '../../../core/i18n';
import { DEMO_MESSAGE, PAPER } from '../config';
import { whisperDictionary, type WhisperKey } from '../dictionary';
import styles from './whisper.module.css';

/** 문구의 {자리}를 코어 값으로 채운다. */
function fill(text: string, values: Record<string, string | number>): string {
  return Object.entries(values).reduce(
    (out, [key, value]) => out.replaceAll(`{${key}}`, String(value)),
    text,
  );
}

type Action = 'idle' | 'public' | 'removed' | 'nudged';
const OUTCOME_KEYS = ['silent', 'positive', 'negative'] as const;
const OUTCOME_VALUES = {
  silent: OUTCOMES.silent,
  positive: OUTCOMES.visiblyPositive,
  negative: OUTCOMES.negative,
} as const;

export function Whisper({ locale }: { locale: Locale }) {
  const t = createTranslator(whisperDictionary, locale);

  const [action, setAction] = useState<Action>('idle');
  const [nudge, setNudge] = useState<NudgeId>('gentleWarning');

  const chosenNudge = NUDGES.find((entry) => entry.id === nudge);
  const total = useMemo(() => totalNudges(), []);
  const continued = useMemo(() => continuedServers(), []);

  const frontKey = `front-${action === 'idle' ? 'idle' : action}` as WhisperKey;
  const backKey =
    action === 'nudged' ? null : (`back-${action === 'idle' ? 'idle' : action}` as WhisperKey);

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

      <Panel
        title={t('try-title')}
        note={t('try-note')}
        actions={<Button onClick={() => setAction('idle')}>{t('act-reset')}</Button>}
      >
        <div className={styles.incident}>
          <span className={styles.channel}>{DEMO_MESSAGE.channel}</span>
          <div className={styles.message} data-removed={action === 'removed'}>
            <span className={styles.author}>{DEMO_MESSAGE.author}</span>
            <span className={styles.messageText}>
              {action === 'removed' ? t('front-removed') : t('try-message')}
            </span>
          </div>
        </div>

        <div className={styles.actions}>
          <Button onClick={() => setAction('public')}>{t('act-public')}</Button>
          <Button onClick={() => setAction('removed')}>{t('act-remove')}</Button>
          <Button onClick={() => setAction('nudged')} variant="primary">
            {t('act-nudge')}
          </Button>
          {action === 'nudged' && (
            <div className={styles.nudgePick}>
              {NUDGES.map((entry) => (
                <button
                  key={entry.id}
                  type="button"
                  className={styles.nudgeOption}
                  data-on={nudge === entry.id}
                  aria-pressed={nudge === entry.id}
                  onClick={() => setNudge(entry.id)}
                >
                  {t(`n-${entry.id}` as WhisperKey)}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className={styles.stages}>
          <div className={styles.stagePane} data-side="front">
            <span className={styles.stageName}>{t('front-title')}</span>
            <p className={styles.stageBody} data-kind={action === 'public' ? 'mod' : undefined}>
              {action === 'removed' ? t('front-removed') : t(frontKey)}
            </p>
          </div>
          <div className={styles.stagePane} data-side="back">
            <span className={styles.stageName}>{t('back-title')}</span>
            {backKey !== null ? (
              <p className={styles.stageBody}>{t(backKey)}</p>
            ) : (
              <div className={styles.dm}>
                <span className={styles.dmIntro}>{t('back-nudge-intro')}</span>
                <p className={styles.dmText}>{chosenNudge?.text}</p>
              </div>
            )}
          </div>
        </div>

        {action !== 'idle' && (
          <p className={styles.read} data-kind={action}>
            {t(`try-read-${action === 'nudged' ? 'nudged' : action === 'public' ? 'public' : 'removed'}` as WhisperKey)}
          </p>
        )}
        <p className={styles.note}>{t('try-mine')}</p>
      </Panel>

      <Panel title={t('nudges-title')} note={t('nudges-note')}>
        <div className={styles.nudgeList}>
          {[...NUDGES]
            .sort((a, b) => b.catalogedUses - a.catalogedUses)
            .map((entry) => (
              <div key={entry.id} className={styles.nudgeRow}>
                <span className={styles.nudgeName}>{t(`n-${entry.id}` as WhisperKey)}</span>
                <span className={styles.nudgeBarWrap}>
                  <span
                    className={styles.nudgeBar}
                    style={{ width: `${(entry.catalogedUses / catalogedSum()) * 100}%` }}
                  />
                </span>
                <span className={styles.nudgeCount}>
                  {fill(t('uses'), {
                    count: entry.catalogedUses,
                    percent: nudgeShare(entry.id).toFixed(1),
                  })}
                </span>
              </div>
            ))}
        </div>
      </Panel>

      <Panel title={t('outcome-title')} note={t('outcome-note')}>
        <div className={styles.outcomes}>
          {OUTCOME_KEYS.map((key) => (
            <div key={key} className={styles.outcome} data-kind={key}>
              <span className={styles.outcomeValue}>{OUTCOME_VALUES[key]}</span>
              <span className={styles.outcomeName}>{t(`o-${key}` as WhisperKey)}</span>
              <span className={styles.outcomeDetail}>{t(`od-${key}` as WhisperKey)}</span>
            </div>
          ))}
        </div>
        <p className={styles.note}>{t('outcome-typo')}</p>
      </Panel>

      <Panel title={t('servers-title')} note={t('servers-note')}>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>{t('sv-wave')}</th>
                <th>{t('sv-category')}</th>
                <th className={styles.num}>{t('sv-members')}</th>
                <th className={styles.num}>{t('sv-nudges')}</th>
                <th className={styles.num}>{t('sv-days')}</th>
              </tr>
            </thead>
            <tbody>
              {SERVERS.map((row) => (
                <tr key={row.server} data-continued={row.days > STUDY.minDays}>
                  <td>{row.wave}</td>
                  <td>{t(`cat-${row.category}` as WhisperKey)}</td>
                  <td className={styles.num}>{row.members.toLocaleString('en-US')}</td>
                  <td className={styles.num} data-max={row.nudges === 166}>
                    {row.nudges}
                  </td>
                  <td className={styles.num}>{row.days}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className={styles.note}>
          {fill(t('servers-line'), { total, continued })}{' '}
          <Badge tone="neutral">{STUDY.minDays}d+</Badge>
        </p>
        <p className={styles.read}>{t('servers-read')}</p>
      </Panel>

      <Panel title={t('took-title')}>
        <p className={styles.note}>{t('took-yes')}</p>
        <p className={styles.note}>{t('took-no')}</p>
        <p className={styles.note}>{t('took-mine')}</p>
      </Panel>
    </div>
  );
}
