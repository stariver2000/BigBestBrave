'use client';

/**
 * 숨은 손짓 화면.
 *
 * 맨 앞이 겪는 판이다. 단서 없는 목록에서 숨은 손짓 셋을 직접 찾아보게 한다.
 * 못 찾는 답답함 자체가 이 논문의 논지라서, 힌트 판이 그 말을 대신한다.
 *
 * 포인터 다루기: 길게 누름은 pointerdown에서 시계를 걸고 pointerup/leave에서 끈다.
 * 밀기는 pointerdown의 x를 기억해 두고 move에서 가로 이동이 문턱을 넘으면 성립한다.
 * 길게 누름 시계가 울리기 전에 크게 움직이면 밀기로 본다(둘이 겹치지 않게).
 */

import { useMemo, useRef, useState } from 'react';
import { Badge, Button, Panel } from '../../../kit';
import {
  DEMO_THRESHOLDS,
  FUNNEL,
  GESTURES,
  percentOf,
  validatedShare,
} from '../../../core/hidden';
import { createTranslator, type Locale } from '../../../core/i18n';
import { DEMO_TARGETS, PAPER, type DemoTarget } from '../config';
import { hiddenDictionary, type HiddenKey } from '../dictionary';
import styles from './hidden.module.css';

/** 문구의 {자리}를 코어 값으로 채운다. */
function fill(text: string, values: Record<string, string | number>): string {
  return Object.entries(values).reduce(
    (out, [key, value]) => out.replaceAll(`{${key}}`, String(value)),
    text,
  );
}

const MAILS = [1, 2, 3] as const;

export function Hidden({ locale }: { locale: Locale }) {
  const t = createTranslator(hiddenDictionary, locale);

  const [found, setFound] = useState<DemoTarget[]>([]);
  const [rowState, setRowState] = useState<Record<number, 'idle' | 'archived' | 'selected'>>({});
  const [zoomed, setZoomed] = useState(false);

  const pressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const startX = useRef<number | null>(null);
  const moved = useRef(false);

  const mark = (target: DemoTarget) =>
    setFound((prev) => (prev.includes(target) ? prev : [...prev, target]));

  const clearTimer = () => {
    if (pressTimer.current !== null) clearTimeout(pressTimer.current);
    pressTimer.current = null;
  };

  const onRowDown = (row: number, x: number) => {
    startX.current = x;
    moved.current = false;
    clearTimer();
    pressTimer.current = setTimeout(() => {
      if (moved.current) return;
      setRowState((prev) => ({ ...prev, [row]: 'selected' }));
      mark('longPressRow');
    }, DEMO_THRESHOLDS.longPressMs);
  };

  const onRowMove = (row: number, x: number) => {
    if (startX.current === null) return;
    const dx = x - startX.current;
    if (Math.abs(dx) > 10) moved.current = true;
    if (Math.abs(dx) >= DEMO_THRESHOLDS.swipePx) {
      clearTimer();
      startX.current = null;
      setRowState((prev) => ({ ...prev, [row]: 'archived' }));
      mark('swipeRow');
    }
  };

  const onRowUp = () => {
    clearTimer();
    startX.current = null;
  };

  const reset = () => {
    setFound([]);
    setRowState({});
    setZoomed(false);
  };

  const share = useMemo(() => validatedShare(), []);

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
        title={t('hunt-title')}
        note={t('hunt-note')}
        actions={<Button onClick={reset}>{t('hunt-reset')}</Button>}
      >
        <div className={styles.huntGrid}>
          <div className={styles.phone}>
            {MAILS.map((row) => {
              const state = rowState[row] ?? 'idle';
              return (
                <div
                  key={row}
                  className={styles.mailRow}
                  data-state={state}
                  onPointerDown={(event) => state === 'idle' && onRowDown(row, event.clientX)}
                  onPointerMove={(event) => state === 'idle' && onRowMove(row, event.clientX)}
                  onPointerUp={onRowUp}
                  onPointerLeave={onRowUp}
                >
                  <span className={styles.mailFrom}>{t(`mail-${row}-from` as HiddenKey)}</span>
                  <span className={styles.mailLine}>{t(`mail-${row}-line` as HiddenKey)}</span>
                  {state !== 'idle' && (
                    <span className={styles.mailBadge}>
                      {state === 'archived' ? t('archived') : t('selected')}
                    </span>
                  )}
                </div>
              );
            })}
            <div
              className={styles.photo}
              data-zoomed={zoomed}
              onDoubleClick={() => {
                setZoomed(true);
                mark('doubleTapPhoto');
              }}
            >
              <svg viewBox="0 0 120 72" className={styles.photoArt} aria-hidden="true">
                <rect x="0" y="0" width="120" height="72" className={styles.photoSky} />
                <circle cx="94" cy="16" r="9" className={styles.photoSun} />
                <path d="M0 58 L30 34 L52 52 L76 28 L120 60 L120 72 L0 72 Z" className={styles.photoHill} />
              </svg>
              <span className={styles.photoCaption}>
                {t('photo-caption')}
                {zoomed && <em className={styles.photoZoom}> · {t('zoomed')}</em>}
              </span>
            </div>
          </div>

          <div className={styles.scoreboard}>
            <p className={styles.progress}>{fill(t('hunt-progress'), { found: found.length })}</p>
            <ul className={styles.foundList}>
              {DEMO_TARGETS.map((target) => (
                <li key={target} className={styles.foundItem} data-found={found.includes(target)}>
                  {found.includes(target) ? t(`found-${target}` as HiddenKey) : '· · ·'}
                </li>
              ))}
            </ul>
            {found.length < DEMO_TARGETS.length && (
              <div className={styles.hint}>
                <span className={styles.hintTitle}>{t('hint-title')}</span>
                <span className={styles.hintBody}>{t('hint-body')}</span>
              </div>
            )}
          </div>
        </div>
        <p className={styles.note}>{t('hunt-mine')}</p>
      </Panel>

      <Panel title={t('share-title')} note={t('share-note')}>
        <div className={styles.gestures}>
          {GESTURES.map((gesture) => (
            <div key={gesture.id} className={styles.gesture}>
              <div className={styles.gestureHead}>
                <span className={styles.gestureName}>{t(`g-${gesture.id}` as HiddenKey)}</span>
                <span className={styles.gestureCount}>
                  {fill(t('of-total'), {
                    count: gesture.count,
                    percent: percentOf(gesture.id).toFixed(1),
                  })}
                </span>
              </div>
              <span className={styles.barWrap}>
                <span
                  className={styles.bar}
                  style={{ width: `${(gesture.count / GESTURES[0].count) * 100}%` }}
                />
              </span>
              <span className={styles.gestureDef}>{t(`gd-${gesture.id}` as HiddenKey)}</span>
              <span className={styles.gestureUse}>{t(`u-${gesture.id}` as HiddenKey)}</span>
            </div>
          ))}
        </div>
        <p className={styles.note}>{t('share-footnote')}</p>
      </Panel>

      <Panel title={t('funnel-title')} note={t('funnel-note')}>
        <div className={styles.funnel}>
          <span className={styles.funnelBig}>{FUNNEL.probed.toLocaleString('en-US')}</span>
          <span className={styles.funnelArrow}>→</span>
          <span className={styles.funnelBig} data-kind="kept">
            {FUNNEL.validated.toLocaleString('en-US')}
          </span>
          <Badge tone="neutral">{share.toFixed(1)}%</Badge>
        </div>
        <p className={styles.note}>
          {fill(t('funnel-line'), {
            apps: FUNNEL.apps,
            probed: FUNNEL.probed.toLocaleString('en-US'),
            validated: FUNNEL.validated.toLocaleString('en-US'),
            share: share.toFixed(1),
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
