'use client';

/**
 * 일기 쓰는 사물.
 *
 * 화면이 열리면 사물은 이번 방문을 알아차리고 오늘 일기를 쓴다. 당신이 머무는 동안에도
 * 계속 지켜보다가, 머문 시간의 구간이 바뀌면 오늘 것을 다시 쓴다. 전자잉크가 한 번 깜빡인다.
 *
 * 기억은 이 기기의 저장소에만 있다. 서버로 가지 않으므로, 다른 기기에서 이 사물은 당신을 모른다.
 */

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Panel, PaperCard, SimulationChip, useReach, useSimulation } from '../../../kit';
import {
  composeEntry,
  moodOf,
  nextStayBand,
  renderEntry,
  stayBand,
  upsertEntry,
  vocabularySize,
  type Observation,
  type StoredEntry,
} from '../../../core/diary';
import { createTranslator, type Locale } from '../../../core/i18n';
import { BODY, EPAPER_LINES, PAPER, TICK_MS } from '../config';
import { arecaDictionary, type ArecaKey } from '../dictionary';
import { loadMemory, forgetMemory, saveMemory, type Memory } from '../storage';
import styles from './areca.module.css';

/** 흐른 시간을 사물이 말하는 방식으로 옮긴다. 초 단위로 세지 않는다. */
function coarseGap(ms: number, locale: Locale): string {
  const hours = ms / (1000 * 60 * 60);
  const days = Math.floor(hours / 24);
  const units: [number, Intl.RelativeTimeFormatUnit][] = [
    [days, 'day'],
    [Math.floor(hours), 'hour'],
    [Math.floor(ms / 60000), 'minute'],
  ];
  const formatter = new Intl.RelativeTimeFormat(locale, { numeric: 'always' });
  const found = units.find(([value]) => value >= 1);
  return found ? formatter.format(-found[0], found[1]) : formatter.format(0, 'minute');
}

export function Areca({ locale }: { locale: Locale }) {
  const t = createTranslator(arecaDictionary, locale);

  const [memory, setMemory] = useState<Memory | null>(null);
  const [today, setToday] = useState<StoredEntry | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [forgotten, setForgotten] = useState(false);

  // 이번 방문이 시작된 시각과, 마지막으로 쓴 머문 구간. 다시 쓸지 판단하는 기준이다.
  const arrivedAt = useRef<number>(Date.now());
  const writtenBand = useRef<string>('');
  /*
   * 사물이 지금 알아차리고 있는 것. 일기는 구간이 바뀔 때만 다시 쓰이지만, 사물은 그사이에도
   * 계속 보고 있다. 그 보는 일을 화면에 내놓지 않으면 사물은 가만히 있는 것처럼 보인다.
   */
  const [attention, setAttention] = useState<Observation | null>(null);
  // 다른 탭으로 갔다 돌아온 횟수. 사물이 느낄 수 있는 몇 안 되는 것 중 하나다.
  const awayCount = useRef(0);
  const memoryRef = useRef<Memory | null>(null);
  // 이 페이지가 통한 순간: 사물이 당신을 알아본 채로 다시 만난 때.
  const reach = useReach();

  const observeNow = useCallback(
    (base: Memory): Observation => ({
      visitCount: base.visitCount,
      hour: new Date(arrivedAt.current).getHours(),
      sinceLast: base.lastVisitAt === null ? null : arrivedAt.current - base.lastVisitAt,
      stay: Date.now() - arrivedAt.current,
      away: awayCount.current,
    }),
    [],
  );

  /** 지금까지의 관찰로 오늘 일기를 다시 쓴다. 구간이 그대로면 아무것도 하지 않는다. */
  const write = useCallback(
    (base: Memory, force: boolean) => {
      const stay = Date.now() - arrivedAt.current;
      const band = stayBand(stay);
      if (!force && band === writtenBand.current) return;
      writtenBand.current = band;

      const observation = observeNow(base);
      const entry = composeEntry(observation, arrivedAt.current);
      setToday(entry);
      if (!force) {
        // 다시 쓸 때만 깜빡인다. 처음 켜질 때의 깜빡임은 성가시다.
        setRefreshing(true);
        window.setTimeout(() => setRefreshing(false), 420);
      }
      // 이번 방문의 일기는 갈아 끼운다. 그리고 도착 시각을 남겨, 다음 방문이 간격을 잴 수 있게 한다.
      saveMemory({
        visitCount: base.visitCount,
        lastVisitAt: arrivedAt.current,
        entries: upsertEntry(base.entries, entry),
      });
    },
    [observeNow],
  );

  /*
   * 사물이 지켜보는 일 자체. 짜인 순서를 트는 것이 아니라 계속 도는 과정이라,
   * 사람이 손을 대도 멈추지 않는다. 보이지 않는 탭에서는 쉰다 — 그때 사물이 아는 것은
   * "당신이 자리를 비웠다"뿐이고, 그건 돌아올 때 한 번 세면 된다.
   */
  const simulation = useSimulation(() => {
    const base = memoryRef.current;
    if (!base) return;
    setAttention(observeNow(base));
    write(base, false);
  }, TICK_MS);

  useEffect(() => {
    const stored = loadMemory();
    // 이번 방문을 세어 넣고, 지난 방문들의 일기는 그대로 둔다.
    const base: Memory = {
      visitCount: stored.visitCount + 1,
      lastVisitAt: stored.lastVisitAt,
      entries: stored.entries,
    };
    setMemory(base);
    memoryRef.current = base;
    write(base, true);
    setAttention(observeNow(base));
    // 다시 만난 것 자체가 이 페이지의 요점이다. 처음 온 사람에게는 아직 아무 일도 일어나지 않았다.
    if (base.visitCount > 1) reach();

    // 자리를 비웠다 돌아오는 것을 센다. 나갈 때가 아니라 돌아올 때 세야 "돌아왔다"가 된다.
    const noticeReturn = () => {
      if (!document.hidden) awayCount.current += 1;
    };
    document.addEventListener('visibilitychange', noticeReturn);
    return () => document.removeEventListener('visibilitychange', noticeReturn);
  }, [write, observeNow, reach]);

  const past = useMemo(() => (memory ? [...memory.entries].reverse() : []), [memory]);

  const heading = (entry: StoredEntry) => {
    const isFirst = entry.visitCount <= 1;
    return isFirst ? t('visit-first') : `${entry.visitCount}${t('visit-nth')}`;
  };

  return (
    <div className={styles.layout}>
      <div className={styles.column}>
        <PaperCard
          label={t('paper-label')}
          title={PAPER.title}
          meta={`${PAPER.authors} · ${PAPER.affiliation} · ${PAPER.venue}`}
          href={PAPER.doi}
          plain={PAPER.plain}
          locale={locale}
        />

        <div className={styles.stage}>
          <div className={styles.body} style={{ inlineSize: BODY.width, blockSize: BODY.height }}>
            <div className={`${styles.epaper} ${refreshing ? styles.refreshing : ''}`}>
              <div className={styles.epaperHead}>
                <span>{today ? heading(today) : ''}</span>
                <span>{today ? t(`mood-${today.mood}` as ArecaKey) : ''}</span>
              </div>
              {/* 기기 화면은 작다. 앞부분만 비치고, 온전한 일기는 아래 칸에서 읽는다. */}
              {today &&
                renderEntry(today, locale)
                  .slice(0, EPAPER_LINES)
                  .map((line, index) => (
                    <p key={index} className={styles.epaperLine}>
                      {line}
                    </p>
                  ))}
            </div>
          </div>
        </div>

        {/*
          사물이 지금 알아차리고 있는 것. 아는 것이 넷뿐이라는 사실이 그대로 보이도록,
          일기보다 앞이 아니라 옆에 둔다. 좁다는 것이 이 사물의 성격이다.
        */}
        <Panel
          title={t('watch-title')}
          note={t('watch-note')}
          actions={<SimulationChip running={simulation.running} onToggle={simulation.toggle} locale={locale} />}
        >
          {attention && (
            <div className={styles.watch}>
              <p className={styles.watchRow}>
                <span className={styles.watchLabel}>{t('watch-visit')}</span>
                <span className={styles.watchValue}>
                  {attention.visitCount <= 1 ? t('visit-first') : `${attention.visitCount}${t('visit-nth')}`}
                </span>
              </p>
              <p className={styles.watchRow}>
                <span className={styles.watchLabel}>{t('watch-stay')}</span>
                <span className={styles.watchValue}>{Math.floor(attention.stay / 1000)}s</span>
              </p>
              <p className={styles.watchRow}>
                <span className={styles.watchLabel}>{t('watch-away')}</span>
                <span className={styles.watchValue}>{attention.away}</span>
              </p>
              <p className={styles.watchRow}>
                <span className={styles.watchLabel}>{t('watch-mood')}</span>
                <span className={styles.watchValue}>{t(`mood-${moodOf(attention)}` as ArecaKey)}</span>
              </p>
              <p className={styles.watchRow}>
                <span className={styles.watchLabel}>{t('watch-next')}</span>
                <span className={styles.watchValue}>
                  {nextStayBand(attention.stay)
                    ? `${Math.ceil((nextStayBand(attention.stay)?.inMs ?? 0) / 1000)}s`
                    : t('watch-next-none')}
                </span>
              </p>
            </div>
          )}
        </Panel>

        <Panel title={t('today-title')} note={t('today-note')}>
          {today && (
            <div className={styles.entry}>
              <div className={styles.entryHead}>
                <span>{heading(today)}</span>
                <span className={styles.mood}>{t(`mood-${today.mood}` as ArecaKey)}</span>
                {memory?.lastVisitAt && (
                  <span>
                    {coarseGap(arrivedAt.current - memory.lastVisitAt, locale)} {t('visit-since')}
                  </span>
                )}
              </div>
              {renderEntry(today, locale).map((line, index) => (
                <p key={index} className={styles.entryLine}>
                  {line}
                </p>
              ))}
            </div>
          )}
        </Panel>

        <Panel
          title={t('archive-title')}
          note={t('archive-note')}
          actions={
            past.length > 0 ? (
              <span className={styles.quiet}>
                {past.length}
                {t('archive-count')}
              </span>
            ) : undefined
          }
        >
          {past.length === 0 ? (
            <p className={styles.quiet}>{t('archive-empty')}</p>
          ) : (
            <div className={styles.archive}>
              {past.map((entry) => (
                <div key={entry.at} className={styles.archiveItem}>
                  <div className={styles.entryHead}>
                    <span>{heading(entry)}</span>
                    <span className={styles.mood}>{t(`mood-${entry.mood}` as ArecaKey)}</span>
                  </div>
                  {renderEntry(entry, locale).map((line, index) => (
                    <p key={index} className={styles.entryLine}>
                      {line}
                    </p>
                  ))}
                </div>
              ))}
            </div>
          )}
        </Panel>

        <Panel title={t('memory-title')} note={t('memory-note')}>
          <button
            type="button"
            className={styles.forget}
            onClick={() => {
              forgetMemory();
              setForgotten(true);
              setMemory({ visitCount: 1, lastVisitAt: null, entries: [] });
            }}
          >
            {t('memory-forget')}
          </button>
          {forgotten && <p className={styles.quiet}>{t('memory-forgotten')}</p>}
        </Panel>

        <Panel title={t('about-title')}>
          <p className={styles.about}>{t('about-body')}</p>
          <p className={styles.quiet}>
            {t('about-vocab')} · {vocabularySize()}
          </p>
          <p className={styles.quiet}>{t('paper-note')}</p>
        </Panel>
      </div>
    </div>
  );
}
