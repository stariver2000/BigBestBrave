'use client';

/**
 * 리듬 페이지.
 *
 * 두드려 만든 리듬을 이름 붙은 리듬들과 견주고, 닮은 만큼 가까이 놓아 보여 준다.
 * 계산은 두드릴 때마다 다시 한다. 리듬 열두 개와의 비교라 값이 싸고,
 * 손을 뗀 순간 마당이 움직여야 "내 리듬이 이걸 끌어당겼다"는 감각이 생긴다.
 */

import { useCallback, useMemo, useRef, useState } from 'react';
import { AutopilotChip, Panel, PaperCard, useAutopilot } from '../../../kit';
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
  // 시연이 "지금 가장 가까운 리듬"을 짚을 때 쓴다. 단계는 미리 짜이므로 그때의 값을 참조로 읽는다.
  const closestId = useRef<string | null>(null);
  closestId.current = closest?.patternId ?? null;

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

  /*
   * 스스로 도는 시연. 마당은 리듬이 놓일 때마다 다시 배치되는데, 그 움직임이 이 페이지의 요점이다.
   * 그래서 화면이 먼저 두드린다 — 한 박씩 놓일 때마다 이름 붙은 리듬들이 가까워지고 멀어진다.
   * 두드리는 간격이 곧 리듬이라, 각 단계의 기다림이 그대로 그 리듬의 쉼이 된다.
   */
  const autopilot = useAutopilot([
    { wait: 0, run: () => setPulses([]) },
    { wait: 400, run: () => addPulse({ duration: 90, intensity: 0.7, gap: 0 }) },
    { wait: 240, run: () => addPulse({ duration: 90, intensity: 0.7, gap: 240 }) },
    { wait: 620, run: () => addPulse({ duration: 90, intensity: 0.4, gap: 620 }) },
    { wait: 240, run: () => addPulse({ duration: 90, intensity: 0.7, gap: 240 }) },
    { wait: 620, run: () => addPulse({ duration: 90, intensity: 0.7, gap: 620 }) },
    { wait: 3600, run: () => setSelectedId(closestId.current) },
    { wait: 4200, run: () => { setSelectedId(null); setBorrowed(true); setPulses([...starter.pulses]); } },
  ]);

  const nameOf = useCallback(
    (patternId: string) => t(`name-${patternId}` as RhythmKey),
    [t],
  );

  const selected = selectedId ? PATTERNS.find((pattern) => pattern.id === selectedId) : undefined;
  const selectedSimilarity = selected ? similarityOf(mine, selected) : 0;

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

        <Panel
          title={t('field-title')}
          note={t('field-note')}
          actions={<AutopilotChip running={autopilot.running} onRestart={autopilot.restart} locale={locale} />}
        >
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
