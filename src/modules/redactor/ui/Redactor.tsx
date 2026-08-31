'use client';

/**
 * 개인정보 지우개 화면.
 *
 * 원문은 컴포넌트 상태에만 있다. URL에도, 저장소에도, 서버에도 남기지 않는다.
 * "브라우저를 떠나지 않는다"는 약속이 이 페이지의 기능 자체이므로, 그 약속을 어길 경로를 만들지 않는다.
 */

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Button, Panel, useClipboard } from '../../../kit';
import {
  defaultDetectors,
  redact,
  type DetectorId,
  type MaskStyle,
} from '../../../core/redaction';
import { createTranslator, type Locale } from '../../../core/i18n';
import { DEFAULT_STYLE, DOWNLOAD_FILENAME, MAX_INPUT_LENGTH, SAMPLE_TEXT } from '../config';
import { redactorDictionary, type RedactorKey } from '../dictionary';
import { DetectorControls } from './DetectorControls';
import styles from './redactor.module.css';

const RESULT_COPY_KEY = 'result';

/** 결과를 파일로 내려받는다. 브라우저 안에서 만들어 바로 넘기므로 서버를 거치지 않는다. */
function downloadText(text: string, filename: string): void {
  const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  // 만들어 둔 임시 URL을 놓아준다. 남겨 두면 탭이 살아 있는 동안 메모리를 붙잡는다.
  URL.revokeObjectURL(url);
}

export function Redactor({ locale }: { locale: Locale }) {
  const t = createTranslator(redactorDictionary, locale);
  const { copiedKey, copy } = useClipboard();

  const [source, setSource] = useState('');
  const [style, setStyle] = useState<MaskStyle>(DEFAULT_STYLE);
  const [enabled, setEnabled] = useState<DetectorId[]>(defaultDetectors());

  // 라벨은 화면의 언어를 따른다. 코어는 문구를 모르므로 여기서 넘겨준다.
  const result = useMemo(
    () =>
      redact(source, {
        enabled,
        style,
        label: (detector) => t(`detector-${detector}` as RedactorKey),
      }),
    [source, enabled, style, t],
  );

  const toggle = (detector: DetectorId) =>
    setEnabled((current) =>
      current.includes(detector)
        ? current.filter((id) => id !== detector)
        : [...current, detector],
    );

  const total = result.matches.length;

  return (
    <div className={styles.layout}>
      <section className={styles.privacy}>
        <h2 className={styles.privacyTitle}>
          <span className={styles.privacyDot} aria-hidden />
          {t('privacy-title')}
        </h2>
        <p className={styles.privacyBody}>{t('privacy-body')}</p>
      </section>

      <DetectorControls
        locale={locale}
        style={style}
        enabled={enabled}
        counts={result.counts}
        onStyleChange={setStyle}
        onToggle={toggle}
      />

      <div className={styles.workspace}>
        <Panel
          title={t('input-title')}
          note={t('input-note')}
          actions={
            <div className={styles.actions}>
              <Button onClick={() => setSource(SAMPLE_TEXT[locale])}>{t('input-sample')}</Button>
              <Button onClick={() => setSource('')}>{t('input-clear')}</Button>
            </div>
          }
        >
          <textarea
            className={styles.textarea}
            value={source}
            maxLength={MAX_INPUT_LENGTH}
            placeholder={t('input-placeholder')}
            spellCheck={false}
            onChange={(event) => setSource(event.target.value)}
          />
          <div className={styles.meta}>
            <span>
              {source.length.toLocaleString(locale)} {t('input-length')}
            </span>
          </div>
        </Panel>

        <Panel
          title={t('output-title')}
          note={t('output-note')}
          actions={
            <div className={styles.actions}>
              <Button
                variant="primary"
                onClick={() => copy(result.text, RESULT_COPY_KEY)}
                disabled={result.text.length === 0}
              >
                {copiedKey === RESULT_COPY_KEY ? t('output-copied') : t('output-copy')}
              </Button>
              <Button
                onClick={() => downloadText(result.text, DOWNLOAD_FILENAME)}
                disabled={result.text.length === 0}
              >
                {t('output-download')}
              </Button>
            </div>
          }
        >
          <pre className={`${styles.output} ${source.length === 0 ? styles.outputEmpty : ''}`}>
            {source.length === 0 ? t('output-empty') : result.text}
          </pre>
          <div className={styles.meta}>
            {total === 0 ? (
              <span>{source.length === 0 ? '' : t('found-none')}</span>
            ) : (
              <span>
                <span className={styles.total}>{total}</span>
                {t('found-total')}
              </span>
            )}
          </div>
        </Panel>
      </div>

      <NextPageCard locale={locale} />
    </div>
  );
}

/**
 * 다음 페이지로 가는 안내.
 *
 * 트리의 자식 목록을 기계적으로 나열하지 않고, 지금 있는 한 장만 손으로 소개한다.
 * 페이지가 늘어나면 이 자리를 그때의 내용에 맞게 다시 설계한다.
 */
function NextPageCard({ locale }: { locale: Locale }) {
  const copy = {
    ko: { label: '다음', title: '크로마 랩', summary: '색 팔레트를 만들고 대비와 색각 이상까지 검증합니다.' },
    en: { label: 'Next', title: 'Chroma Lab', summary: 'Build a palette and verify contrast and color vision deficiency.' },
    ja: { label: '次へ', title: 'クロマラボ', summary: '配色を作り、コントラストと色覚特性まで検証します。' },
  }[locale];

  return (
    <Link className={styles.nextCard} href="/color">
      <span className={styles.nextLabel}>{copy.label}</span>
      <span className={styles.nextTitle}>{copy.title}</span>
      <span className={styles.nextSummary}>{copy.summary}</span>
    </Link>
  );
}
