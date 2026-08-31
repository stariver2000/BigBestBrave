'use client';

/** 복사 버튼용 훅. 복사 성공 표시를 잠깐 띄웠다가 되돌린다. */

import { useCallback, useEffect, useRef, useState } from 'react';

const FEEDBACK_MS = 1400;

export function useClipboard() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // 컴포넌트가 사라진 뒤 타이머가 상태를 건드리지 않도록 정리한다.
  useEffect(() => {
    return () => {
      if (timerRef.current !== null) clearTimeout(timerRef.current);
    };
  }, []);

  const copy = useCallback(async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(key);
    } catch {
      // 클립보드 권한이 없는 환경(비보안 컨텍스트 등)에서는 조용히 실패시킨다.
      setCopiedKey(null);
      return;
    }
    if (timerRef.current !== null) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setCopiedKey(null), FEEDBACK_MS);
  }, []);

  return { copiedKey, copy };
}
