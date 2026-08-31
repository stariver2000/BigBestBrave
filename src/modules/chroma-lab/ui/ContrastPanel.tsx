'use client';

/**
 * 대비 검사부.
 *
 * 글자색과 배경색을 팔레트 안에서 고르게 하는 이유: 임의의 두 색을 비교하는 도구는 많지만,
 * 실제로 필요한 판단은 "내가 만든 팔레트 안에서 어떤 조합이 통과하는가"이기 때문이다.
 */

import { Badge, Button, Field, Panel } from '../../../kit';
import { analyzeContrast, simulateCvd, type Palette, type Srgb } from '../../../core/color';
import { createTranslator, type Locale } from '../../../core/i18n';
import { APCA_THRESHOLDS, PREVIEW_SAMPLES, type CvdChoice } from '../config';
import { chromaDictionary, type ChromaKey } from '../dictionary';
import type { ChromaState } from '../state';
import styles from './chroma.module.css';

interface Selection {
  track: number;
  step: number;
}

function entryOf(palette: Palette, selection: Selection) {
  const track = palette.tracks[selection.track] ?? palette.tracks[0];
  return track.ramp.find((item) => item.step === selection.step) ?? track.ramp[0];
}

/** 시뮬레이션이 켜져 있으면 대비도 시뮬레이션된 색으로 계산한다(색각 이상 사용자가 겪는 실제 대비). */
function displayed(color: Srgb, cvd: CvdChoice, severity: number): Srgb {
  return cvd === 'none' ? color : simulateCvd(color, cvd, severity);
}

function SwatchSelect({
  palette,
  value,
  onChange,
  label,
}: {
  palette: Palette;
  value: Selection;
  onChange: (next: Selection) => void;
  label: string;
}) {
  const steps = palette.tracks[0]?.ramp ?? [];
  return (
    <Field label={label}>
      <div className={styles.selectPair}>
        <select
          className={styles.select}
          value={value.track}
          onChange={(event) => onChange({ ...value, track: Number(event.target.value) })}
        >
          {palette.tracks.map((track, index) => (
            <option key={track.rotation} value={index}>
              #{index + 1} ({track.rotation >= 0 ? `+${track.rotation}` : track.rotation}°)
            </option>
          ))}
        </select>
        <select
          className={styles.select}
          value={value.step}
          onChange={(event) => onChange({ ...value, step: Number(event.target.value) })}
        >
          {steps.map((entry) => (
            <option key={entry.step} value={entry.step}>
              {entry.step}
            </option>
          ))}
        </select>
      </div>
    </Field>
  );
}

export function ContrastPanel({
  palette,
  state,
  locale,
  onChange,
}: {
  palette: Palette;
  state: ChromaState;
  locale: Locale;
  onChange: (patch: Partial<ChromaState>) => void;
}) {
  const t = createTranslator(chromaDictionary, locale);

  const textSelection: Selection = { track: state.textTrack, step: state.textStep };
  const backgroundSelection: Selection = { track: state.backgroundTrack, step: state.backgroundStep };
  const textEntry = entryOf(palette, textSelection);
  const backgroundEntry = entryOf(palette, backgroundSelection);

  const textColor = displayed(textEntry.srgb, state.cvd, state.severity);
  const backgroundColor = displayed(backgroundEntry.srgb, state.cvd, state.severity);
  const report = analyzeContrast(textColor, backgroundColor);
  const levelText = t(`level-${report.apcaLevelKey}` as ChromaKey);

  // 선택한 배경에서 본문 기준을 통과하는 단계를 미리 훑어 보여 준다.
  const safeSteps = palette.tracks[textSelection.track].ramp.filter((entry) => {
    const candidate = displayed(entry.srgb, state.cvd, state.severity);
    return Math.abs(analyzeContrast(candidate, backgroundColor).lc) >= APCA_THRESHOLDS.body;
  });

  const swap = () =>
    onChange({
      textTrack: backgroundSelection.track,
      textStep: backgroundSelection.step,
      backgroundTrack: textSelection.track,
      backgroundStep: textSelection.step,
    });

  return (
    <Panel
      title={t('contrast-title')}
      note={t('contrast-note')}
      actions={<Button onClick={swap}>{t('contrast-swap')}</Button>}
    >
      <div className={styles.pickerRow}>
        <SwatchSelect
          palette={palette}
          value={textSelection}
          label={t('contrast-text')}
          onChange={(next) => onChange({ textTrack: next.track, textStep: next.step })}
        />
        <SwatchSelect
          palette={palette}
          value={backgroundSelection}
          label={t('contrast-background')}
          onChange={(next) => onChange({ backgroundTrack: next.track, backgroundStep: next.step })}
        />
      </div>

      <div className={styles.metrics}>
        <div className={styles.metric}>
          <span className={styles.metricValue}>{report.ratio.toFixed(2)}</span>
          <span className={styles.metricLabel}>{t('contrast-ratio')}</span>
        </div>
        <div className={styles.metric}>
          <span className={styles.metricValue}>{report.lc.toFixed(1)}</span>
          <span className={styles.metricLabel}>{t('contrast-lc')}</span>
        </div>
        <div className={styles.badgeStack}>
          <Badge tone={report.wcagLevel === 'fail' ? 'fail' : 'pass'}>
            WCAG {report.wcagLevel.toUpperCase()}
          </Badge>
          <Badge tone={Math.abs(report.lc) >= APCA_THRESHOLDS.large ? 'pass' : 'fail'}>{levelText}</Badge>
        </div>
      </div>

      <div
        className={styles.preview}
        style={{ background: backgroundEntry.hex, color: textEntry.hex }}
      >
        {PREVIEW_SAMPLES.map((sample) => (
          <p
            key={sample.key}
            className={styles.previewLine}
            style={{ fontSize: `${sample.size}px`, fontWeight: sample.weight }}
          >
            {t(`sample-${sample.key}` as ChromaKey)}
          </p>
        ))}
      </div>

      <Field label={t('contrast-safe-title')}>
        {safeSteps.length === 0 ? (
          <span className={styles.hint}>{t('contrast-safe-empty')}</span>
        ) : (
          <div className={styles.safeList}>
            {safeSteps.map((entry) => (
              <span key={entry.step} className={styles.safeChip} style={{ color: entry.hex }}>
                {entry.step}
              </span>
            ))}
          </div>
        )}
      </Field>
    </Panel>
  );
}
