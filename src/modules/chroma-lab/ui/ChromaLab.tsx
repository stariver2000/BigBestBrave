'use client';

/**
 * Chroma Lab 화면 조립.
 *
 * 상태는 URL 질의문자열 하나에만 있고(단일 진실 원천), 파생값(팔레트)은 매 렌더에서 계산한다.
 * 계산이 순수 함수 몇 번이라 캐시가 필요 없고, 그 덕에 뒤로가기·링크 공유가 그대로 동작한다.
 */

import { useCallback, useMemo } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { buildPalette, parseColor } from '../../../core/color';
import type { Locale } from '../../../core/i18n';
import { useClipboard } from '../../../kit';
import { DEFAULT_SEED } from '../config';
import { readState, writeState, type ChromaState } from '../state';
import { ContrastPanel } from './ContrastPanel';
import { ExportPanel } from './ExportPanel';
import { NamingPanel } from './NamingPanel';
import { RampGrid } from './RampGrid';
import { SeedControls } from './SeedControls';
import styles from './chroma.module.css';

const EXPORT_COPY_KEY = 'export';

export function ChromaLab({ locale }: { locale: Locale }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { copiedKey, copy } = useClipboard();

  const state = useMemo(
    () => readState(new URLSearchParams(searchParams.toString())),
    [searchParams],
  );

  const update = useCallback(
    (patch: Partial<ChromaState>) => {
      const next = { ...state, ...patch };
      // replace를 쓰는 이유: 슬라이더 한 칸마다 히스토리가 쌓이면 뒤로가기가 쓸모없어진다.
      router.replace(`${pathname}${writeState(next)}`, { scroll: false });
    },
    [pathname, router, state],
  );

  const parsed = parseColor(state.seed);
  const seedValid = parsed.ok;
  // 입력이 아직 유효하지 않아도 화면은 살아 있어야 하므로 기본 시드로 그린다.
  // (타이핑 도중의 부분 문자열이 화면을 무너뜨리지 않게 하는 장치다.)
  const fallback = parseColor(DEFAULT_SEED);
  const seedColor = parsed.ok ? parsed.color : fallback.ok ? fallback.color : { r: 0, g: 0, b: 0, a: 1 };
  // 팔레트 계산은 순수 함수 몇 번이라 메모이제이션 없이 매 렌더 계산해도 충분하다.
  const palette = buildPalette(seedColor, state.harmony);

  return (
    <div className={styles.layout}>
      <div className={styles.rail}>
        <SeedControls
          state={state}
          locale={locale}
          seed={palette.seed}
          seedValid={seedValid}
          onChange={update}
        />
        <NamingPanel palette={palette} locale={locale} />
      </div>

      <div className={styles.stage}>
        <RampGrid
          palette={palette}
          locale={locale}
          cvd={state.simulateRamp ? state.cvd : 'none'}
          severity={state.severity}
          copiedKey={copiedKey}
          onCopy={copy}
        />
        <div className={styles.splitRow}>
          <ContrastPanel palette={palette} state={state} locale={locale} onChange={update} />
          <ExportPanel
            palette={palette}
            state={state}
            locale={locale}
            copied={copiedKey === EXPORT_COPY_KEY}
            onCopy={(text) => copy(text, EXPORT_COPY_KEY)}
            onChange={update}
          />
        </div>
      </div>
    </div>
  );
}
