'use client';

/** 내보내기부. 포맷은 키트의 직렬화기를 그대로 쓴다(다른 페이지도 같은 코드를 공유한다). */

import { Button, Field, Panel, Segmented, TextInput, exportPalette, EXPORT_FORMATS, type ExportFormat, type SegmentedOption } from '../../../kit';
import type { Palette } from '../../../core/color';
import { createTranslator, type Locale } from '../../../core/i18n';
import { chromaDictionary } from '../dictionary';
import type { ChromaState } from '../state';
import styles from './chroma.module.css';

const FORMAT_OPTIONS: SegmentedOption<ExportFormat>[] = EXPORT_FORMATS.map((format) => ({
  value: format,
  label: format,
}));

export function ExportPanel({
  palette,
  state,
  locale,
  copied,
  onCopy,
  onChange,
}: {
  palette: Palette;
  state: ChromaState;
  locale: Locale;
  copied: boolean;
  onCopy: (text: string) => void;
  onChange: (patch: Partial<ChromaState>) => void;
}) {
  const t = createTranslator(chromaDictionary, locale);
  const code = exportPalette(palette, state.format, { prefix: state.prefix });

  return (
    <Panel
      title={t('export-title')}
      note={t('export-note')}
      actions={
        <Button variant="primary" onClick={() => onCopy(code)}>
          {copied ? t('export-copied') : t('export-copy')}
        </Button>
      }
    >
      <Segmented dense options={FORMAT_OPTIONS} value={state.format} onChange={(format) => onChange({ format })} />
      <Field label={t('export-prefix')}>
        <TextInput value={state.prefix} onChange={(prefix) => onChange({ prefix })} />
      </Field>
      <pre className={styles.code}>{code}</pre>
    </Panel>
  );
}
