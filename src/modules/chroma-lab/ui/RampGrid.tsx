'use client';

/** 조화 트랙별 톤 램프 표시. 색을 누르면 hex가 클립보드로 간다. */

import { Panel } from '../../../kit';
import { analyzeContrast, simulateCvd, toHex, type Palette, type Srgb } from '../../../core/color';
import { createTranslator, type Locale } from '../../../core/i18n';
import { chromaDictionary } from '../dictionary';
import type { CvdChoice } from '../config';
import styles from './chroma.module.css';

/** 스와치 위 글자색: 배경 대비가 큰 쪽(흰색/검정)을 고른다. */
function readableInk(background: Srgb): string {
  const white: Srgb = { r: 1, g: 1, b: 1, a: 1 };
  const black: Srgb = { r: 0, g: 0, b: 0, a: 1 };
  const whiteLc = Math.abs(analyzeContrast(white, background).lc);
  const blackLc = Math.abs(analyzeContrast(black, background).lc);
  return whiteLc >= blackLc ? '#ffffff' : '#000000';
}

export function RampGrid({
  palette,
  locale,
  cvd,
  severity,
  copiedKey,
  onCopy,
}: {
  palette: Palette;
  locale: Locale;
  cvd: CvdChoice;
  severity: number;
  copiedKey: string | null;
  onCopy: (hex: string, key: string) => void;
}) {
  const t = createTranslator(chromaDictionary, locale);

  return (
    <Panel title={t('ramp-title')} note={t('ramp-note')}>
      <div>
        {palette.tracks.map((track, trackIndex) => (
          <div className={styles.rampTrack} key={track.rotation}>
            <div className={styles.trackLabel}>
              <span className={styles.trackIndex}>{String(trackIndex + 1).padStart(2, '0')}</span>
              <span>{track.rotation >= 0 ? `+${track.rotation}°` : `${track.rotation}°`}</span>
              <span className={styles.trackRule} aria-hidden />
            </div>
            <div className={styles.rampRow}>
              {track.ramp.map((entry) => {
                // 시뮬레이션이 켜져 있으면 표시색만 바꾸고, 복사되는 값은 항상 원본이다.
                const shown = cvd === 'none' ? entry.srgb : simulateCvd(entry.srgb, cvd, severity);
                const key = `${trackIndex}-${entry.step}`;
                const copied = copiedKey === key;
                const classNames = [styles.swatch];
                if (entry.clipped) classNames.push(styles.clipped);
                if (entry.isSeedAnchor) classNames.push(styles.anchor);
                return (
                  <button
                    type="button"
                    key={entry.step}
                    className={classNames.join(' ')}
                    style={{ background: toHex(shown), color: readableInk(shown) }}
                    onClick={() => onCopy(entry.hex, key)}
                    title={entry.clipped ? t('ramp-clipped') : entry.isSeedAnchor ? t('ramp-anchor') : entry.hex}
                  >
                    <span className={styles.swatchStep}>{entry.step}</span>
                    <span className={styles.swatchHex}>{copied ? t('ramp-copied') : entry.hex}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </Panel>
  );
}
