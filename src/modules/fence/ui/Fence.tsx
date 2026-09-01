'use client';

/**
 * 울타리 화면.
 *
 * 순서: 열아홉 가지 일의 지도를 먼저 펴고(고르면 13명의 셈이 나온다), 그 다음에
 * 세 가지 저울을 둔다. 판정은 없다 - 질적 연구라 논문도 점수를 매기지 않았고,
 * 저울을 대 보는 것은 읽는 사람의 몫이라는 것을 화면이 그대로 말한다.
 *
 * 기본 선택은 '질문하기'다. 13명 전원이 맡긴 유일한 일이라, 첫 화면에서
 * "전원이 맡긴 일은 이것 하나뿐"이라는 문장이 바로 선다.
 */

import { useMemo, useState } from 'react';
import { Panel } from '../../../kit';
import {
  CATEGORY_USAGE,
  KEYWORDS,
  MONTHS,
  PARTICIPANTS,
  REDDIT_COMMENTS,
  REDDIT_EVENTS,
  REDDIT_POSTS,
  SUBTASKS,
  categoriesInPhase,
  monthTotal,
  redditSums,
  subtasksOf,
  type PhaseId,
} from '../../../core/delegation';
import { createTranslator, type Locale } from '../../../core/i18n';
import { PAPER } from '../config';
import { fenceDictionary, type FenceKey } from '../dictionary';
import styles from './fence.module.css';

/** 문구의 {자리}를 코어 값으로 채운다. */
function fill(text: string, values: Record<string, string | number>): string {
  return Object.entries(values).reduce(
    (out, [key, value]) => out.replaceAll(`{${key}}`, String(value)),
    text,
  );
}

const PHASES: PhaseId[] = ['forethought', 'performance', 'selfReflection'];
const SCALES = ['accuracy', 'independence', 'authenticity'] as const;

export function Fence({ locale }: { locale: Locale }) {
  const t = createTranslator(fenceDictionary, locale);

  const [picked, setPicked] = useState<string>('askQuestions');
  const pickedTask = SUBTASKS.find((subtask) => subtask.id === picked);

  const sums = useMemo(() => redditSums(), []);
  const maxMonth = useMemo(() => Math.max(...MONTHS.map((month) => monthTotal(month))), []);
  const keywordOf = (word: string) => KEYWORDS.find((keyword) => keyword.word === word)?.total ?? 0;
  const shownKeywords = useMemo(
    () => KEYWORDS.filter((keyword) => keyword.total > 0).sort((a, b) => b.total - a.total),
    [],
  );

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

      <Panel title={t('map-title')} note={t('map-note')}>
        <div className={styles.phases}>
          {PHASES.map((phase) => (
            <div key={phase} className={styles.phase}>
              <span className={styles.phaseName}>{t(`ph-${phase}` as FenceKey)}</span>
              {categoriesInPhase(phase).map((category) => (
                <div key={category} className={styles.category}>
                  <span className={styles.categoryName}>{t(`c-${category}` as FenceKey)}</span>
                  {subtasksOf(category).map((subtask) => (
                    <button
                      key={subtask.id}
                      type="button"
                      className={styles.subtask}
                      data-on={picked === subtask.id}
                      aria-pressed={picked === subtask.id}
                      onClick={() => setPicked(subtask.id)}
                    >
                      <span className={styles.subtaskName}>{t(`s-${subtask.id}` as FenceKey)}</span>
                      <span className={styles.subtaskBarWrap}>
                        <span
                          className={styles.subtaskBar}
                          style={{ width: `${(subtask.count / PARTICIPANTS) * 100}%` }}
                        />
                      </span>
                      <span className={styles.subtaskCount}>{subtask.count}</span>
                    </button>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>
        <p className={styles.picked}>
          {pickedTask === undefined
            ? t('map-pick')
            : fill(t('map-picked'), { count: pickedTask.count })}
          {pickedTask?.count === PARTICIPANTS && <strong> {t('map-only-all')}</strong>}
        </p>
        <p className={styles.note}>
          {fill(t('map-usage'), {
            all: CATEGORY_USAGE.usedAllFive,
            four: CATEGORY_USAGE.usedFour,
          })}
        </p>
      </Panel>

      <Panel title={t('scales-title')} note={t('scales-note')}>
        <div className={styles.scales}>
          {SCALES.map((scale) => (
            <div key={scale} className={styles.scale}>
              <span className={styles.scaleName}>{t(`sc-${scale}` as FenceKey)}</span>
              <p className={styles.scaleBody}>{t(`scd-${scale}` as FenceKey)}</p>
              <blockquote className={styles.scaleQuote}>{t(`scq-${scale}` as FenceKey)}</blockquote>
            </div>
          ))}
        </div>
      </Panel>

      <Panel title={t('obstacle-title')} note={t('obstacle-note')}>
        <div className={styles.obstacles}>
          <p className={styles.obstacle}>{t('ob-selection')}</p>
          <p className={styles.obstacle}>{t('ob-execution')}</p>
        </div>
        <p className={styles.meta}>{t('obstacle-meta')}</p>
      </Panel>

      <Panel title={t('months-title')} note={t('months-note')}>
        <div className={styles.months}>
          {MONTHS.map((month) => {
            const events = REDDIT_EVENTS.filter((event) => event.month === month);
            return (
              <div key={month} className={styles.month}>
                <div className={styles.monthBars}>
                  <span
                    className={styles.monthBar}
                    data-kind="comments"
                    style={{ height: `${(REDDIT_COMMENTS[month] / maxMonth) * 120}px` }}
                    title={`${t('comments')} ${REDDIT_COMMENTS[month]}`}
                  />
                  <span
                    className={styles.monthBar}
                    data-kind="posts"
                    style={{ height: `${(REDDIT_POSTS[month] / maxMonth) * 120}px` }}
                    title={`${t('posts')} ${REDDIT_POSTS[month]}`}
                  />
                </div>
                <span className={styles.monthTotal}>{monthTotal(month)}</span>
                <span className={styles.monthName}>{month}</span>
                {events.map((event) => (
                  <span key={event.kind} className={styles.event}>
                    {t(`ev-${event.kind}` as FenceKey)}
                  </span>
                ))}
              </div>
            );
          })}
        </div>
        <p className={styles.note}>
          {fill(t('months-line'), { posts: sums.posts, comments: sums.comments, all: sums.all })}
          {' '}
          <span className={styles.legendPosts}>■</span> {t('posts')}{' '}
          <span className={styles.legendComments}>■</span> {t('comments')}
        </p>
      </Panel>

      <Panel title={t('words-title')} note={t('words-note')}>
        <div className={styles.words}>
          {shownKeywords.map((keyword) => (
            <span
              key={keyword.word}
              className={styles.word}
              data-group={keyword.group}
              style={{ fontSize: `${Math.max(0.72, Math.sqrt(keyword.total / 725) * 2.2)}em` }}
            >
              {keyword.word}
              <sub className={styles.wordCount}>{keyword.total}</sub>
            </span>
          ))}
        </div>
        <p className={styles.note}>
          {fill(t('words-line'), {
            ai: keywordOf('AI'),
            chatgpt: keywordOf('ChatGPT'),
            gemini: keywordOf('Gemini'),
            claude: keywordOf('Claude'),
          })}
        </p>
        <p className={styles.note}>{t('words-ia')}</p>
      </Panel>

      <Panel title={t('took-title')}>
        <p className={styles.note}>{t('took-yes')}</p>
        <p className={styles.note}>{t('took-no')}</p>
        <p className={styles.note}>{t('took-mine')}</p>
      </Panel>
    </div>
  );
}
