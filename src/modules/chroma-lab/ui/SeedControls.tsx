'use client';

/** 시드 색·조화 규칙·색각 시뮬레이션을 고르는 제어부. */

import { Field, Panel, Segmented, TextInput, type SegmentedOption } from '../../../kit';
import { CVD_PREVALENCE, type HarmonyKind, type Oklch } from '../../../core/color';
import { createTranslator, type Locale } from '../../../core/i18n';
import { CVD_CHOICES, HARMONY_CHOICES, type CvdChoice } from '../config';
import { chromaDictionary, type ChromaKey } from '../dictionary';
import type { ChromaState } from '../state';
import styles from './chroma.module.css';

/** 조화 규칙 id -> 사전 키. 사전에 없는 규칙은 id를 그대로 보여 준다. */
function harmonyLabel(kind: HarmonyKind, t: (key: ChromaKey) => string): string {
  const key = `harmony-${kind}` as ChromaKey;
  const translated = t(key);
  return translated === key ? kind : translated;
}

/** 색각 이상 항목 라벨: 유병률을 함께 보여 줘야 우선순위 판단이 된다. */
function cvdLabel(choice: CvdChoice, locale: Locale, t: (key: ChromaKey) => string): string {
  if (choice === 'none') return t('cvd-none');
  const share = CVD_PREVALENCE[choice];
  const percent = new Intl.NumberFormat(locale, { style: 'percent', maximumFractionDigits: 2 }).format(share);
  return `${choice} · ${percent}`;
}

export function SeedControls({
  state,
  locale,
  seed,
  seedValid,
  onChange,
}: {
  state: ChromaState;
  locale: Locale;
  /** 화면에 그려지고 있는 실제 시드. 입력이 유효하지 않으면 기본 시드가 들어온다. */
  seed: Oklch;
  seedValid: boolean;
  onChange: (patch: Partial<ChromaState>) => void;
}) {
  const t = createTranslator(chromaDictionary, locale);

  const harmonyOptions: SegmentedOption<HarmonyKind>[] = HARMONY_CHOICES.map((kind) => ({
    value: kind,
    label: harmonyLabel(kind, t),
  }));

  const cvdOptions: SegmentedOption<CvdChoice>[] = CVD_CHOICES.map((choice) => ({
    value: choice,
    label: choice === 'none' ? t('cvd-none') : choice,
    title: cvdLabel(choice, locale, t),
  }));

  return (
    <>
      <Panel title={t('seed-label')} note={seedValid ? undefined : t('seed-invalid')}>
        <div className={styles.seedRow}>
          {/* 네이티브 색 선택기는 항상 유효한 #rrggbb를 주므로 입력 오류 없이 색을 잡는 보조 수단이 된다. */}
          <input
            className={styles.colorWell}
            type="color"
            aria-label={t('seed-picker')}
            value={seedValid ? state.seed.slice(0, 7) : '#000000'}
            onChange={(event) => onChange({ seed: event.target.value })}
          />
          <TextInput
            value={state.seed}
            onChange={(seed) => onChange({ seed })}
            invalid={!seedValid}
            placeholder="#4f46e5 / oklch(60% 0.15 264)"
          />
        </div>
        {/* OKLCH 수치를 함께 보여 준다. hex만으로는 명도·채도를 가늠할 수 없다. */}
        <dl className={styles.readout}>
          <div>
            <dt>L</dt>
            <dd>{(seed.l * 100).toFixed(1)}%</dd>
          </div>
          <div>
            <dt>C</dt>
            <dd>{seed.c.toFixed(3)}</dd>
          </div>
          <div>
            <dt>H</dt>
            <dd>{seed.h.toFixed(1)}°</dd>
          </div>
        </dl>
      </Panel>

      <Panel title={t('harmony-label')}>
        <Segmented options={harmonyOptions} value={state.harmony} onChange={(harmony) => onChange({ harmony })} />
      </Panel>

      <Panel title={t('cvd-label')}>
        <Segmented options={cvdOptions} value={state.cvd} onChange={(cvd) => onChange({ cvd })} />
        {state.cvd !== 'none' && (
          <Field label={`${t('cvd-severity')} · ${Math.round(state.severity * 100)}%`}>
            <input
              className={styles.slider}
              type="range"
              min={0}
              max={1}
              step={0.05}
              value={state.severity}
              onChange={(event) => onChange({ severity: Number(event.target.value) })}
            />
          </Field>
        )}
      </Panel>
    </>
  );
}
