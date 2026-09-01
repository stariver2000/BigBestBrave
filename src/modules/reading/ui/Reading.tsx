'use client';

/**
 * 읽기 쉬움과 시선 옮김 화면.
 *
 * 판단은 맨 위에 한 줄, 그다음 두 막대, 그다음 왜 그런지. 그리고 답이 뒤집히는 자리.
 * 뒤집히는 자리를 따로 보이는 까닭: 이 페이지의 요점이 '어느 쪽이 낫다'가 아니라
 * '무엇이 달라지면 답이 바뀌는가'이기 때문이다.
 */

import { useMemo, useState } from 'react';
import { Panel } from '../../../kit';
import {
  compare,
  INITIAL,
  RANGE,
  type Reading as ReadingValue,
  type Setting,
  type Surface,
} from '../../../core/legibility';
import { createTranslator, type Locale } from '../../../core/i18n';
import { BAR, PAPER } from '../config';
import { readingDictionary, type ReadingKey } from '../dictionary';
import styles from './reading.module.css';

const DIALS = [
  { id: 'ambient', range: RANGE.ambient, unit: '' },
  { id: 'arcminutes', range: RANGE.arcminutes, unit: "'" },
  { id: 'words', range: RANGE.words, unit: '' },
  { id: 'lookAways', range: RANGE.lookAways, unit: '' },
] as const;

const NOTE_KEY: Record<string, ReadingKey> = {
  ambient: 'ambient-note',
  arcminutes: 'arcminutes-note',
  words: 'words-note',
  lookAways: 'lookaways-note',
};

const LABEL_KEY: Record<string, ReadingKey> = {
  ambient: 'ambient',
  arcminutes: 'arcminutes',
  words: 'words',
  lookAways: 'lookaways',
};

export function Reading({ locale }: { locale: Locale }) {
  const t = createTranslator(readingDictionary, locale);
  const [setting, setSetting] = useState<Setting>({ ...INITIAL });

  const verdict = useMemo(() => compare(setting), [setting]);
  const name = (surface: Surface) => t(`s-${surface}` as ReadingKey);

  const longest = Math.max(
    Number.isFinite(verdict.ar.totalSeconds) ? verdict.ar.totalSeconds : 0,
    Number.isFinite(verdict.phone.totalSeconds) ? verdict.phone.totalSeconds : 0,
    1,
  );
  const tie = verdict.savedSeconds < 1;

  const row = (label: string, ar: string, phone: string) => (
    <tr key={label}>
      <th scope="row">{label}</th>
      <td data-ar>{ar}</td>
      <td data-phone>{phone}</td>
    </tr>
  );

  const bar = (value: ReadingValue) => {
    const unreadable = !Number.isFinite(value.totalSeconds);
    return (
      <div key={value.surface} className={styles.barRow}>
        <span className={styles.barName} data-surface={value.surface}>
          {name(value.surface)}
        </span>
        <span className={styles.barTrack} style={{ maxWidth: BAR.width }}>
          {unreadable ? (
            <span className={styles.barDead}>{t('unreadable')}</span>
          ) : (
            <>
              <span
                className={styles.barRead}
                data-surface={value.surface}
                style={{ width: `${(value.readSeconds / longest) * 100}%` }}
              >
                {t('bar-read')}
              </span>
              {value.switchSeconds > 0 && (
                <span
                  className={styles.barSwitch}
                  style={{ width: `${(value.switchSeconds / longest) * 100}%` }}
                >
                  {t('bar-switch')}
                </span>
              )}
            </>
          )}
        </span>
        <span className={styles.barTotal}>
          {unreadable ? '—' : `${value.totalSeconds.toFixed(1)}${t('seconds')}`}
        </span>
      </div>
    );
  };

  return (
    <div className={styles.layout}>
      <p className={styles.paper}>
        <span className={styles.paperLabel}>{t('paper-label')}</span>
        <a href={PAPER.link} target="_blank" rel="noreferrer">
          {PAPER.title}
        </a>
        <span className={styles.paperMeta}>
          {PAPER.authors} · {PAPER.affiliation} · {PAPER.venue}
        </span>
      </p>

      <Panel title={t('setup-title')} note={t('setup-note')}>
        <div className={styles.dials}>
          {DIALS.map((dial) => (
            <label key={dial.id} className={styles.dial}>
              <span className={styles.dialLabel}>
                {t(LABEL_KEY[dial.id])}
                <span className={styles.dialValue}>
                  {setting[dial.id]}
                  {dial.unit}
                </span>
              </span>
              <input
                type="range"
                min={dial.range.min}
                max={dial.range.max}
                step={dial.range.step}
                value={setting[dial.id]}
                onChange={(event) =>
                  setSetting((old) => ({ ...old, [dial.id]: Number(event.target.value) }))
                }
              />
              <span className={styles.quiet}>{t(NOTE_KEY[dial.id])}</span>
            </label>
          ))}
        </div>

        <p className={styles.ambientHints}>
          <span>{t('amb-indoor')} 200</span>
          <span>{t('amb-window')} 2000</span>
          <span>{t('amb-outdoor')} 12000</span>
        </p>
      </Panel>

      <div className={styles.verdict} data-tie={tie || undefined} data-winner={verdict.winner}>
        {tie ? (
          <p className={styles.verdictLine}>{t('verdict-tie')}</p>
        ) : (
          /* 이름 뒤에 서술어를 붙이면 언어마다 조사와 수 일치가 어긋난다.
             (한국어의 이/가, 영어의 is/are) 그래서 이름 앞에 이름표를 둔다. */
          <p className={styles.verdictLine}>
            <span className={styles.verdictLabel}>{t('verdict-faster')}</span>
            <span className={styles.verdictWho}>{name(verdict.winner)}</span>
            <span className={styles.verdictGap}>
              {t('verdict-by')} {verdict.savedSeconds.toFixed(1)}
              {t('seconds')}
            </span>
          </p>
        )}
        <p className={styles.verdictWhy}>{t(`d-${verdict.winner}` as ReadingKey)}</p>
      </div>

      <Panel title={t('bars-title')} note={t('bars-note')}>
        <div className={styles.bars}>
          {bar(verdict.ar)}
          {bar(verdict.phone)}
        </div>
      </Panel>

      <Panel title={t('flip-title')} note=" ">
        <ul className={styles.flips}>
          <li className={styles.flip}>
            <span className={styles.flipLabel}>{t('ambient')}</span>
            {verdict.ambientCrossover === null ? (
              <span className={styles.quiet}>{t('flip-none')}</span>
            ) : (
              <>
                <span className={styles.flipValue}>{verdict.ambientCrossover}</span>
                <span className={styles.quiet}>{t('flip-ambient')}</span>
              </>
            )}
          </li>
          <li className={styles.flip}>
            <span className={styles.flipLabel}>{t('lookaways')}</span>
            {verdict.lookAwayCrossover === null ? (
              <span className={styles.quiet}>{t('flip-none')}</span>
            ) : (
              <>
                <span className={styles.flipValue}>{verdict.lookAwayCrossover}</span>
                <span className={styles.quiet}>{t('flip-lookaway')}</span>
              </>
            )}
          </li>
        </ul>
      </Panel>

      <Panel title={t('detail-title')} note={t('detail-note')}>
        <div className={styles.tableScroll}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th scope="col">{t('col-what')}</th>
                <th scope="col" data-ar>
                  {name('ar')}
                </th>
                <th scope="col" data-phone>
                  {name('phone')}
                </th>
              </tr>
            </thead>
            <tbody>
              {row(t('row-mm'), `${verdict.ar.millimetres.toFixed(1)}mm`, `${verdict.phone.millimetres.toFixed(1)}mm`)}
              {row(t('row-reserve'), verdict.ar.reserve.toFixed(2), verdict.phone.reserve.toFixed(2))}
              {row(
                t('row-weber'),
                `${(verdict.ar.contrast * 100).toFixed(0)}%`,
                `${(verdict.phone.contrast * 100).toFixed(0)}%`,
              )}
              {row(t('row-sizefactor'), verdict.ar.sizeFactor.toFixed(2), verdict.phone.sizeFactor.toFixed(2))}
              {row(
                t('row-contrastfactor'),
                verdict.ar.contrastFactor.toFixed(2),
                verdict.phone.contrastFactor.toFixed(2),
              )}
              {row(
                t('row-wpm'),
                verdict.ar.wordsPerMinute.toFixed(0),
                verdict.phone.wordsPerMinute.toFixed(0),
              )}
            </tbody>
          </table>
        </div>
      </Panel>

      <section className={styles.why}>
        <h2 className={styles.whyTitle}>{t('why-title')}</h2>
        <p>{t('why-additive')}</p>
        <p>{t('why-reserve')}</p>
        <p>{t('why-switch')}</p>
      </section>

      <p className={styles.warning}>{t('warning')}</p>

      <section className={styles.took}>
        <h2 className={styles.whyTitle}>{t('took-title')}</h2>
        <p>{t('took-yes')}</p>
        <p>{t('took-no')}</p>
      </section>
    </div>
  );
}
