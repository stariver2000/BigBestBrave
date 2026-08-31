'use client';

/**
 * 리듬 페이지.
 *
 * 두드려 만든 리듬을 이름 붙은 리듬들과 견주고, 닮은 만큼 가까이 놓아 보여 준다.
 * 계산은 두드릴 때마다 다시 한다. 리듬 열두 개와의 비교라 값이 싸고,
 * 손을 뗀 순간 마당이 움직여야 "내 리듬이 이걸 끌어당겼다"는 감각이 생긴다.
 */

import { useCallback, useMemo, useState } from 'react';
import { Panel } from '../../../kit';
import {
  INTENSITY_STEPS,
  PATTERNS,
  closenessOf,
  rank,
  similarityOf,
  totalDuration,
  type Pattern,
  type Pulse,
} from '../../../core/rhythm';
import { createTranslator, type Locale } from '../../../core/i18n';
import { PAPER, STARTER_PATTERN_ID } from '../config';
import { rhythmDictionary, type RhythmKey } from '../dictionary';
import { RhythmBars } from './RhythmBars';
import { RhythmField } from './RhythmField';
import { TapPad, appendPulse } from './TapPad';
import { playPattern } from './play';
import styles from './rhythm.module.css';

const MINE_ID = 'mine';

export function Rhythm({ locale }: { locale: Locale }) {
  const t = createTranslator(rhythmDictionary, locale);

  const starter = PATTERNS.find((pattern) => pattern.id === STARTER_PATTERN_ID) ?? PATTERNS[0];
  // 처음에는 이름 붙은 리듬 하나를 빌려 놓는다. 빈 마당을 먼저 보여 주면 무엇을 하는 곳인지 알 수 없다.
  const [pulses, setPulses] = useState<Pulse[]>([...starter.pulses]);
  const [borrowed, setBorrowed] = useState(true);
  const [intensity, setIntensity] = useState<number>(INTENSITY_STEPS[2].value);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [held, setHeld] = useState(false);

  const mine: Pattern = useMemo(() => ({ id: MINE_ID, pulses }), [pulses]);
  const matches = useMemo(() => rank(mine), [mine]);
  const closest = matches[0];

  const addPulse = useCallback(
    (pulse: Pulse) => {
      setPulses((current) => {
        // 빌려 온 리듬 위에 덧붙이면 내 리듬이 아니다. 첫 두드림에서 비우고 시작한다.
        const base = borrowed ? [] : current;
        return appendPulse(base, borrowed ? { ...pulse, gap: 0 } : pulse);
      });
      setBorrowed(false);
    },
    [borrowed],
  );

  const nameOf = useCallback(
    (patternId: string) => t(`name-${patternId}` as RhythmKey),
    [t],
  );

  const selected = selectedId ? PATTERNS.find((pattern) => pattern.id === selectedId) : undefined;
  const selectedSimilarity = selected ? similarityOf(mine, selected) : 0;

  return (
    <div className={styles.layout}>
      <div className={styles.column}>
        <p className={styles.paper}>
          <span className={styles.paperLabel}>{t('paper-label')}</span>
          <a href={PAPER.doi} target="_blank" rel="noreferrer">
            {PAPER.title}
          </a>
          <span>
            {PAPER.authors} · {PAPER.affiliation} · {PAPER.venue}
          </span>
        </p>

        <Panel title={t('tap-title')} note={t('tap-note')}>
          <TapPad
            intensity={intensity}
            label={held ? '' : t('tap-hint')}
            onPulse={addPulse}
            onHoldChange={setHeld}
          />

          <div className={styles.controls}>
            <span className={styles.hint}>{t('tap-strength')}</span>
            <div className={styles.strengthGroup}>
              {INTENSITY_STEPS.map((step) => (
                <button
                  key={step.id}
                  type="button"
                  className={`${styles.strength} ${intensity === step.value ? styles.strengthOn : ''}`}
                  onClick={() => setIntensity(step.value)}
                >
                  {t(`strength-${step.id}` as RhythmKey)}
                </button>
              ))}
            </div>
            <button
              type="button"
              className={styles.action}
              disabled={pulses.length === 0}
              onClick={() => playPattern(mine)}
            >
              {t('tap-play')}
            </button>
            <button
              type="button"
              className={styles.action}
              onClick={() => {
                setPulses([]);
                setBorrowed(false);
              }}
            >
              {t('tap-clear')}
            </button>
          </div>
        </Panel>

        <Panel title={t('mine-title')}>
          {pulses.length === 0 ? (
            <p className={styles.hint}>{t('tap-empty')}</p>
          ) : (
            <>
              <RhythmBars pattern={mine} />
              <div className={styles.meta}>
                <span>
                  <span className={styles.metaStrong}>{pulses.length}</span>
                  {t('mine-pulses')}
                </span>
                <span>
                  <span className={styles.metaStrong}>{Math.round(totalDuration(mine))}</span>{' '}
                  {t('mine-length')}
                </span>
                {closest && (
                  <span>
                    {t('field-closest')} · <span className={styles.metaStrong}>{nameOf(closest.patternId)}</span>{' '}
                    {(closest.similarity * 100).toFixed(0)}%
                  </span>
                )}
              </div>
            </>
          )}
        </Panel>

        <Panel title={t('field-title')} note={t('field-note')}>
          <RhythmField
            matches={matches}
            selectedId={selectedId}
            youLabel={t('field-you')}
            nameOf={nameOf}
            onSelect={(patternId) => {
              setSelectedId(patternId);
              const pattern = PATTERNS.find((item) => item.id === patternId);
              if (pattern) playPattern(pattern);
            }}
          />

          {selected && (
            <div className={styles.selected}>
              <div className={styles.selectedHead}>
                <span className={styles.selectedName}>{nameOf(selected.id)}</span>
                <span
                  className={`${styles.closeness} ${
                    closenessOf(selectedSimilarity) === 'same'
                      ? styles.closenessSame
                      : closenessOf(selectedSimilarity) === 'similar'
                        ? styles.closenessSimilar
                        : ''
                  }`}
                >
                  {t(`close-${closenessOf(selectedSimilarity)}` as RhythmKey)} ·{' '}
                  {(selectedSimilarity * 100).toFixed(0)}%
                </span>
              </div>
              <RhythmBars pattern={selected} />
            </div>
          )}
        </Panel>

        <Panel title={t('finding-title')}>
          <p className={styles.finding}>{t('finding-body')}</p>
          <p className={styles.hint}>{t('paper-note')}</p>
        </Panel>
      </div>
    </div>
  );
}
