'use client';

/**
 * 자막 재분할 화면.
 *
 * 값이 바뀔 때마다 전체를 다시 계산한다. 자막 수백 개에 대한 순수 계산이라 충분히 빠르고,
 * 중간 상태를 들고 있지 않는 편이 "지금 화면에 보이는 것이 곧 결과"라는 보장을 지킨다.
 */

import { useMemo, useState } from 'react';
import { Button, Panel, useClipboard } from '../../../kit';
import {
  DEFAULTS,
  LIMITS,
  formatSubtitle,
  inspect,
  parseSubtitle,
  rechunk,
  summarize,
  type ChunkOptions,
} from '../../../core/subtitle';
import { createTranslator, type Locale } from '../../../core/i18n';
import {
  CAPTION_FONT_STACK,
  CAPTION_FONT_WEIGHT,
  CAPTION_WIDTH_RATIO,
  DEFAULT_SETTINGS,
  DOWNLOAD_BASENAME,
  PAPER,
  SAMPLE_SRT,
  SETTING_ORIGINS,
} from '../config';
import { subtitleDictionary, type SubtitleKey } from '../dictionary';
import { createMeasure } from '../measure';
import { Outcome } from './Outcome';
import { Quality } from './Quality';
import { SettingSlider } from './SettingSlider';
import { Theater } from './Theater';
import styles from './subtitle.module.css';

const RESULT_COPY_KEY = 'result';

function download(text: string, filename: string): void {
  const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}

export function Rechunker({ locale }: { locale: Locale }) {
  const t = createTranslator(subtitleDictionary, locale);
  const { copiedKey, copy } = useClipboard();

  const [source, setSource] = useState('');
  const [fontSize, setFontSize] = useState<number>(DEFAULT_SETTINGS.fontSize);
  const [displayWidth, setDisplayWidth] = useState<number>(DEFAULT_SETTINGS.displayWidth);
  const [maxLines, setMaxLines] = useState<number>(DEFAULT_SETTINGS.maxLines);
  const [maxCps, setMaxCps] = useState<number>(DEFAULT_SETTINGS.maxCps);
  const [pauseThreshold, setPauseThreshold] = useState<number>(DEFAULT_SETTINGS.pauseThreshold);

  const parsed = useMemo(() => parseSubtitle(source), [source]);

  // 폭 측정기는 재분할과 상영관이 함께 쓴다. 두 곳이 다른 자로 재면 "넘쳤다"는 표시가 어긋난다.
  const measure = useMemo(() => createMeasure(fontSize), [fontSize]);

  const result = useMemo(() => {
    // 자막이 놓일 수 있는 폭은 화면 폭 전체가 아니다. 좌우 여백을 남기는 것이 방송 관행이다.
    const maxWidth = displayWidth * CAPTION_WIDTH_RATIO;
    const options: ChunkOptions = {
      measure,
      maxWidth,
      maxLines,
      minDuration: DEFAULTS.minDuration,
      maxDuration: DEFAULTS.maxDuration,
      maxCps,
      pauseThreshold,
    };
    const chunks = rechunk(parsed.cues, options);
    const issues = inspect(chunks, {
      measure,
      maxWidth,
      minDuration: options.minDuration,
      maxDuration: options.maxDuration,
      maxCps,
    });

    // 원본에서 넘치던 자막 수. 결과에 남은 넘침과 견주면 "무엇이 달라졌는지"가 나온다.
    const overflowBefore = parsed.cues.filter((cue) => measure(cue.text) > maxWidth).length;
    const stats = summarize(chunks, issues);

    return { chunks, issues, stats, overflowBefore, maxWidth };
  }, [parsed, measure, displayWidth, maxLines, maxCps, pauseThreshold]);

  const exported = useMemo(
    () => (result.chunks.length === 0 ? '' : formatSubtitle(result.chunks, parsed.format)),
    [result.chunks, parsed.format],
  );

  // 값의 성격을 사전에서 꺼내 슬라이더에 붙인다. 슬라이더 부품은 성격이 무엇인지 알 필요가 없다.
  const originOf = (key: keyof typeof SETTING_ORIGINS) => t(`origin-${SETTING_ORIGINS[key]}` as SubtitleKey);

  return (
    <div className={styles.layout}>
      <p className={styles.paper}>
        <span className={styles.paperLabel}>{t('paper-label')}</span>
        <a className={styles.paperTitle} href={PAPER.doi} target="_blank" rel="noreferrer">
          {PAPER.title}
        </a>
        <span className={styles.paperMeta}>
          {PAPER.authors} · {PAPER.affiliation} · {PAPER.venue}
        </span>
      </p>

      <Panel title={t('theater-title')} note={t('theater-note')}>
        <Theater
          cues={parsed.cues}
          chunks={result.chunks}
          measure={measure}
          pauseThreshold={pauseThreshold}
          fontSize={fontSize}
          captionWidth={result.maxWidth}
          fontStack={CAPTION_FONT_STACK}
          fontWeight={CAPTION_FONT_WEIGHT}
          t={t}
        />
      </Panel>

      <Panel title={t('settings-title')} note={t('settings-note')}>
        <div className={styles.settingGrid}>
          <SettingSlider
            label={t('font-size')} value={fontSize} unit="px" origin={originOf('fontSize')}
            min={LIMITS.fontSize.min} max={LIMITS.fontSize.max} step={1} onChange={setFontSize}
          />
          <SettingSlider
            label={t('display-width')} value={displayWidth} unit="px" origin={originOf('displayWidth')}
            min={LIMITS.displayWidth.min} max={LIMITS.displayWidth.max} step={20} onChange={setDisplayWidth}
          />
          <SettingSlider
            label={t('max-lines')} value={maxLines} unit="" origin={originOf('maxLines')}
            min={LIMITS.maxLines.min} max={LIMITS.maxLines.max} step={1} onChange={setMaxLines}
          />
          <SettingSlider
            label={t('max-cps')} value={maxCps} unit="cps" origin={originOf('maxCps')}
            min={LIMITS.maxCps.min} max={LIMITS.maxCps.max} step={1} onChange={setMaxCps}
          />
          <SettingSlider
            label={t('pause-threshold')} value={pauseThreshold} unit="ms" origin={originOf('pauseThreshold')}
            min={LIMITS.pauseThreshold.min} max={LIMITS.pauseThreshold.max} step={50} onChange={setPauseThreshold}
          />
        </div>

        {/* 슬라이더가 아닌 값도 결과를 정한다. 조절할 수 없다고 감추면 어디서 온 값인지 알 수 없다. */}
        <p className={styles.durationRow}>
          <span>{t('duration-label')}</span>
          <span className={styles.settingValue}>
            {(DEFAULTS.minDuration / 1000).toFixed(2)}s – {(DEFAULTS.maxDuration / 1000).toFixed(1)}s
          </span>
          <span className={styles.origin}>{originOf('duration')}</span>
        </p>
        <p className={styles.originNote}>{t('origin-note')}</p>
      </Panel>

      <div className={styles.workspace}>
        <Panel
          title={t('source-title')}
          note={t('source-note')}
          actions={
            <div className={styles.actions}>
              <Button onClick={() => setSource(SAMPLE_SRT)}>{t('source-sample')}</Button>
              <Button onClick={() => setSource('')}>{t('source-clear')}</Button>
            </div>
          }
        >
          <textarea
            className={styles.textarea}
            value={source}
            placeholder={t('source-placeholder')}
            spellCheck={false}
            onChange={(event) => setSource(event.target.value)}
          />
          <div className={styles.meta}>
            <span>
              {parsed.cues.length}
              {t('source-parsed')}
            </span>
            {parsed.skipped > 0 && (
              <span className={styles.metaStrong}>
                {parsed.skipped}
                {t('source-skipped')}
              </span>
            )}
          </div>
        </Panel>

        <Panel
          title={t('result-title')}
          note={t('result-note')}
          actions={
            <div className={styles.actions}>
              <Button
                variant="primary"
                disabled={exported.length === 0}
                onClick={() => copy(exported, RESULT_COPY_KEY)}
              >
                {copiedKey === RESULT_COPY_KEY ? t('result-copied') : t('result-copy')}
              </Button>
              <Button
                disabled={exported.length === 0}
                onClick={() => download(exported, `${DOWNLOAD_BASENAME}.${parsed.format}`)}
              >
                {t('result-download')}
              </Button>
            </div>
          }
        >
          <pre className={styles.output}>{exported.length === 0 ? t('source-empty') : exported}</pre>
          {result.chunks.length > 0 && (
            <Outcome
              numbers={{
                cues: parsed.cues.length,
                chunks: result.stats.chunkCount,
                overflowBefore: result.overflowBefore,
                overflowAfter: result.stats.counts.overflow ?? 0,
                peakCps: result.stats.peakCps,
                maxCps,
              }}
              t={t}
            />
          )}
        </Panel>
      </div>

      <Panel title={t('quality-title')} note={t('quality-note')}>
        <Quality issues={result.issues} maxWidth={result.maxWidth} t={t} />
      </Panel>
    </div>
  );
}
