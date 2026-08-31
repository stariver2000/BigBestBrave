'use client';

/** 가리는 방식과 찾을 항목을 고르는 제어부. */

import { Panel, Segmented, type SegmentedOption } from '../../../kit';
import { DETECTORS, MASK_STYLES, type DetectorId, type MaskStyle } from '../../../core/redaction';
import { createTranslator, type Locale } from '../../../core/i18n';
import { redactorDictionary, type RedactorKey } from '../dictionary';
import styles from './redactor.module.css';

export function DetectorControls({
  locale,
  style,
  enabled,
  counts,
  onStyleChange,
  onToggle,
}: {
  locale: Locale;
  style: MaskStyle;
  enabled: readonly DetectorId[];
  /** 탐지기별로 이번 원문에서 찾은 개수. 켜져 있지만 못 찾은 항목과 구분해 보여 준다. */
  counts: Record<string, number>;
  onStyleChange: (next: MaskStyle) => void;
  onToggle: (detector: DetectorId) => void;
}) {
  const t = createTranslator(redactorDictionary, locale);

  const styleOptions: SegmentedOption<MaskStyle>[] = MASK_STYLES.map((value) => ({
    value,
    label: t(`style-${value}` as RedactorKey),
  }));

  return (
    <div className={styles.controlGrid}>
      <Panel title={t('style-title')}>
        <Segmented options={styleOptions} value={style} onChange={onStyleChange} />
        <p className={styles.styleNote}>{t(`style-note-${style}` as RedactorKey)}</p>
      </Panel>

      <Panel title={t('detectors-title')} note={t('detectors-note')}>
        <div className={styles.chipList}>
          {DETECTORS.map((spec) => {
            const on = enabled.includes(spec.id);
            const found = counts[spec.id] ?? 0;
            return (
              <button
                key={spec.id}
                type="button"
                aria-pressed={on}
                className={`${styles.chip} ${on ? styles.chipOn : ''}`}
                onClick={() => onToggle(spec.id)}
              >
                {t(`detector-${spec.id}` as RedactorKey)}
                {on && found > 0 && <span className={styles.chipCount}>{found}</span>}
              </button>
            );
          })}
        </div>
      </Panel>
    </div>
  );
}
