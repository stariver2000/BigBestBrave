'use client';

/**
 * 팔레트 이름 짓기.
 *
 * LLM은 선택지일 뿐이고 기본값은 항상 규칙 기반 이름이다.
 * 이 페이지의 특성 llm-usage = optional, offline = degraded 를 실제 동작으로 지킨다.
 */

import { useState } from 'react';
import { Button, Panel } from '../../../kit';
import type { Palette } from '../../../core/color';
import { createTranslator, type Locale } from '../../../core/i18n';
import { chromaDictionary, type ChromaKey } from '../dictionary';
import { localPaletteName } from '../naming';
import styles from './chroma.module.css';

type NameSource = 'local' | 'llm';

interface NameState {
  text: string;
  source: NameSource;
  /** 사전 키. 실패 사유를 사용자 언어로 보여 주기 위해 키로만 들고 있는다. */
  noticeKey: ChromaKey | null;
  pending: boolean;
}

/** 게이트웨이 실패 사유 -> 사용자에게 보여 줄 사전 키. */
const REASON_KEYS: Record<string, ChromaKey> = {
  'not-configured': 'naming-offline',
  busy: 'naming-busy',
  timeout: 'naming-error',
  'upstream-error': 'naming-error',
};

export function NamingPanel({ palette, locale }: { palette: Palette; locale: Locale }) {
  const t = createTranslator(chromaDictionary, locale);
  const fallbackName = localPaletteName(palette.seed, locale);
  const [state, setState] = useState<NameState>({
    text: '',
    source: 'local',
    noticeKey: null,
    pending: false,
  });

  const askLlm = async () => {
    setState((previous) => ({ ...previous, pending: true, noticeKey: null }));
    try {
      const response = await fetch('/api/llm/palette-name', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ hex: palette.seedHex, harmony: palette.harmony, locale }),
      });
      const payload = (await response.json()) as { name?: string; reason?: string };
      if (payload.name) {
        setState({ text: payload.name, source: 'llm', noticeKey: null, pending: false });
        return;
      }
      const noticeKey = REASON_KEYS[payload.reason ?? ''] ?? 'naming-error';
      setState({ text: '', source: 'local', noticeKey, pending: false });
    } catch {
      // 네트워크 자체가 끊긴 경우에도 규칙 기반 이름은 그대로 남아 있어야 한다.
      setState({ text: '', source: 'local', noticeKey: 'naming-error', pending: false });
    }
  };

  const shown = state.source === 'llm' && state.text.length > 0 ? state.text : fallbackName;

  return (
    <Panel
      title={t('naming-title')}
      note={t('naming-note')}
      actions={
        <Button onClick={askLlm} disabled={state.pending}>
          {state.pending ? t('naming-thinking') : t('naming-ask')}
        </Button>
      }
    >
      <div className={styles.nameDisplay}>{shown}</div>
      <div className={styles.nameFooter}>
        <span className={styles.nameSwatch} style={{ background: palette.seedHex }} aria-hidden />
        <span>{state.source === 'llm' ? palette.seedHex : `${t('naming-local')} · ${palette.seedHex}`}</span>
      </div>
      {state.noticeKey && <span className={styles.hint}>{t(state.noticeKey)}</span>}
    </Panel>
  );
}
