'use client';

/**
 * 서로 기록하기 화면.
 *
 * 이 페이지는 일부러 혼자서는 끝나지 않는다. 조하리의 창은 두 사람의 답이 있어야 그려지고,
 * 그것이 논문의 요점이기 때문이다. 다만 처음 열었을 때 빈 화면을 보여 주면 무엇을 하는
 * 도구인지 알 수 없으므로, 지어낸 두 사람을 미리 넣어 두고 그렇다고 적어 둔다.
 */

import { useMemo, useState } from 'react';
import { Panel } from '../../../kit';
import {
  AREAS,
  decode,
  encode,
  report,
  SAMPLE,
  SCALE,
  type Area,
  type Sheet,
} from '../../../core/johari';
import { createTranslator, type Locale } from '../../../core/i18n';
import { PANE, PAPER } from '../config';
import { peerDictionary, type PeerKey } from '../dictionary';
import { Windows } from './Windows';
import styles from './peer.module.css';

const BLANK: Sheet = {
  selfKnows: AREAS.map(() => 0),
  guessesOther: AREAS.map(() => 0),
  seesOther: AREAS.map(() => 0),
};

/** 예시는 `as const`라 원소마다 리터럴 타입이 붙는다. 읽기용 수 배열로 받아 푼다. */
const asSheet = (source: {
  readonly selfKnows: readonly number[];
  readonly guessesOther: readonly number[];
  readonly seesOther: readonly number[];
}): Sheet => ({
  selfKnows: [...source.selfKnows],
  guessesOther: [...source.guessesOther],
  seesOther: [...source.seesOther],
});

type Column = keyof Sheet;
const COLUMNS: { id: Column; key: PeerKey }[] = [
  { id: 'selfKnows', key: 'q-self' },
  { id: 'guessesOther', key: 'q-guess' },
  { id: 'seesOther', key: 'q-sees' },
];

export function Peer({ locale }: { locale: Locale }) {
  const t = createTranslator(peerDictionary, locale);

  const [mine, setMine] = useState<Sheet>(() => asSheet(SAMPLE.mine));
  const [theirCode, setTheirCode] = useState(() => encode(asSheet(SAMPLE.theirs)));
  const [sample, setSample] = useState(true);
  const [copied, setCopied] = useState(false);

  const myCode = useMemo(() => encode(mine), [mine]);
  const decoded = useMemo(() => decode(theirCode), [theirCode]);
  const theirs = decoded.sheet ?? null;
  const made = useMemo(() => (theirs === null ? null : report(mine, theirs)), [mine, theirs]);

  const set = (column: Column, index: number, value: number) => {
    setSample(false);
    setMine((old) => {
      const next = [...old[column]];
      next[index] = value;
      return { ...old, [column]: next };
    });
  };

  const areaName = (area: Area) => t(`a-${area}` as PeerKey);

  const copy = async () => {
    try {
      await navigator.clipboard?.writeText(myCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // 클립보드를 못 쓰는 자리도 있다. 그때는 글자를 직접 고르면 된다.
      setCopied(false);
    }
  };

  const asymWord =
    made === null ? '' : Math.abs(made.asymmetry) < 0.34 ? t('asym-even') : made.asymmetry > 0 ? t('asym-more') : t('asym-less');

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

      {sample && (
        <p className={styles.sample}>
          {t('sample-note')}
          <button
            type="button"
            className={styles.sampleAction}
            onClick={() => {
              setMine(BLANK);
              setTheirCode('');
              setSample(false);
            }}
          >
            {t('clear')}
          </button>
        </p>
      )}

      <Panel title={t('mine-title')} note={t('mine-note')}>
        <div className={styles.sheet}>
          {AREAS.map((area, index) => (
            <section key={area} className={styles.area}>
              <h3 className={styles.areaName}>{areaName(area)}</h3>
              <p className={styles.areaNote}>{t(`d-${area}` as PeerKey)}</p>
              <div className={styles.rows}>
                {COLUMNS.map((column) => (
                  <label key={column.id} className={styles.row}>
                    <span className={styles.rowLabel} data-column={column.id}>
                      {t(column.key)}
                    </span>
                    <input
                      className={styles.range}
                      type="range"
                      min={0}
                      max={SCALE}
                      step={1}
                      value={mine[column.id][index] ?? 0}
                      data-column={column.id}
                      onChange={(event) => set(column.id, index, Number(event.target.value))}
                    />
                    <span className={styles.rowValue}>{mine[column.id][index] ?? 0}</span>
                  </label>
                ))}
              </div>
            </section>
          ))}
        </div>
      </Panel>

      <Panel title={t('code-title')} note={t('code-note')}>
        <div className={styles.codes}>
          <div className={styles.codeBox}>
            <span className={styles.codeLabel}>{t('my-code')}</span>
            <code className={styles.code}>{myCode}</code>
            <button type="button" className={styles.copy} onClick={copy}>
              {copied ? t('copied') : t('copy')}
            </button>
          </div>

          <label className={styles.codeBox} data-other>
            <span className={styles.codeLabel} data-other>
              {t('their-code')}
            </span>
            <input
              className={styles.codeInput}
              value={theirCode}
              placeholder={t('paste')}
              spellCheck={false}
              autoCapitalize="characters"
              onChange={(event) => {
                setTheirCode(event.target.value);
                setSample(false);
              }}
            />
            <span className={styles.codeState} data-ok={decoded.ok || undefined}>
              {decoded.ok ? t('code-ok') : t(`e-${decoded.reason}` as PeerKey)}
            </span>
          </label>
        </div>
      </Panel>

      {made !== null && (
        <>
          <Panel title={t('win-title')} note={t('win-note')}>
            <Windows
              windows={made.windows}
              size={PANE}
              areaName={areaName}
              labels={{
                open: t('open'),
                blind: t('blind'),
                hidden: t('hidden'),
                unknown: t('unknown'),
                self: t('win-self'),
                sees: t('win-sees'),
              }}
            />
            <p className={styles.legend}>
              <span className={styles.chip} data-kind="open" />
              {t('open')}
              <span className={styles.chip} data-kind="blind" />
              {t('blind')}
              <span className={styles.chip} data-kind="hidden" />
              {t('hidden')}
              <span className={styles.chip} data-kind="unknown" />
              {t('unknown')}
            </p>

            <p className={styles.topBlind}>
              <span className={styles.topBlindLabel}>{t('top-blind')}</span>
              {made.blindSpots[0].blind === 0 ? (
                <span className={styles.quiet}>{t('top-blind-none')}</span>
              ) : (
                made.blindSpots
                  .filter((entry) => entry.blind > 0)
                  .slice(0, 3)
                  .map((entry) => (
                    <span key={entry.area} className={styles.topBlindItem}>
                      {areaName(entry.area)} +{entry.blind}
                    </span>
                  ))
              )}
            </p>
          </Panel>

          <Panel title={t('split-title')} note={t('split-note')}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th scope="col">{' '}</th>
                    <th scope="col">{t('withheld')}</th>
                    <th scope="col">{t('misjudged')}</th>
                    <th scope="col">{t('total-gap')}</th>
                  </tr>
                </thead>
                <tbody>
                  {made.splits.map((split) => (
                    <tr key={split.area}>
                      <th scope="row">{areaName(split.area)}</th>
                      <td data-sign={split.withheld === 0 ? undefined : split.withheld > 0 ? 'up' : 'down'}>
                        {split.withheld > 0 ? '+' : split.withheld < 0 ? '−' : ''}
                        {Math.abs(split.withheld)}
                      </td>
                      <td data-sign={split.misjudged === 0 ? undefined : split.misjudged > 0 ? 'up' : 'down'}>
                        {split.misjudged > 0 ? '+' : split.misjudged < 0 ? '−' : ''}
                        {Math.abs(split.misjudged)}
                      </td>
                      <td className={styles.strong}>
                        {split.total > 0 ? '+' : split.total < 0 ? '−' : ''}
                        {Math.abs(split.total)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Panel>

          <div className={styles.figures}>
            <section className={styles.figure}>
              <h2 className={styles.figureTitle}>{t('meta-title')}</h2>
              <p className={styles.figureBig}>{made.metaError.toFixed(2)}</p>
              <p className={styles.figureLabel}>{t('meta-error')}</p>
              <p className={styles.quiet}>{t('meta-note')}</p>
            </section>

            <section className={styles.figure}>
              <h2 className={styles.figureTitle}>{t('asym-title')}</h2>
              <p className={styles.scaleRow}>
                <span className={styles.scaleSide} data-mine>
                  {t('i-see')} {made.iSee.toFixed(2)}
                </span>
                <span className={styles.scaleSide} data-other>
                  {t('seen-by')} {made.seenByOther.toFixed(2)}
                </span>
              </p>
              <p className={styles.figureWord}>{asymWord}</p>
              <p className={styles.quiet}>{t('asym-note')}</p>
            </section>
          </div>
        </>
      )}

      <p className={styles.warning}>{t('warning')}</p>

      <section className={styles.took}>
        <h2 className={styles.tookTitle}>{t('took-title')}</h2>
        <p>{t('took-yes')}</p>
        <p>{t('took-no')}</p>
      </section>
    </div>
  );
}
