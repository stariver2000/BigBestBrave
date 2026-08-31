'use client';

/**
 * 사물의 기억.
 *
 * 브라우저의 저장소에만 둔다. 서버로 보내지 않으므로 이 사물은 이 기기에서만 당신을 안다.
 * 저장소를 쓸 수 없는 환경(사생활 보호 모드 등)에서도 페이지는 그대로 돌아가야 하므로,
 * 읽고 쓰는 일은 실패해도 조용히 넘어간다. 그때 이 사물은 매번 당신을 처음 보게 된다.
 */

import { MAX_ENTRIES, type StoredEntry } from '../../core/diary';
import { STORAGE_KEY } from './config';

export interface Memory {
  visitCount: number;
  /** 직전 방문이 시작된 시각. 다음 방문에서 "얼마 만인지"를 재는 기준이다. */
  lastVisitAt: number | null;
  entries: StoredEntry[];
}

const EMPTY: Memory = { visitCount: 0, lastVisitAt: null, entries: [] };

export function loadMemory(): Memory {
  if (typeof window === 'undefined') return EMPTY;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY;
    const parsed = JSON.parse(raw) as Partial<Memory>;
    return {
      visitCount: typeof parsed.visitCount === 'number' ? parsed.visitCount : 0,
      lastVisitAt: typeof parsed.lastVisitAt === 'number' ? parsed.lastVisitAt : null,
      entries: Array.isArray(parsed.entries) ? parsed.entries : [],
    };
  } catch {
    return EMPTY;
  }
}

export function saveMemory(memory: Memory): void {
  if (typeof window === 'undefined') return;
  try {
    // 오래된 일기부터 잊는다. 사물의 기억도 무한하지 않다.
    const entries = memory.entries.slice(-MAX_ENTRIES);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...memory, entries }));
  } catch {
    // 저장할 수 없어도 이번 방문의 일기는 화면에 남는다.
  }
}

export function forgetMemory(): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // 지울 수 없으면 그대로 둔다.
  }
}
