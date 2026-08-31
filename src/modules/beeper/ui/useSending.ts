'use client';

/**
 * 보내는 동안의 상태.
 *
 * 누르면 곧바로 도착하지 않는다. 액정에 숫자가 한 자리씩 찍히고, 기기가 떨리고,
 * 그러고 나서야 상대가 읽은 말이 나온다. 이 기다림이 이 페이지의 절반이다.
 * 바로 결과를 띄우면 그냥 변환기가 되고, 삐삐를 쓰던 감각은 남지 않는다.
 */

import { useEffect, useState } from 'react';
import { REVEAL_INTERVAL_MS } from '../config';
import { beep, ring } from './beep';

type Phase = 'idle' | 'sending' | 'delivered';

export interface Sending {
  /** 지금 액정에 떠 있는 숫자. 보내는 동안에는 한 자리씩 늘어난다. */
  digits: string;
  /** 도착하는 중인가. 기기가 떨린다. */
  ringing: boolean;
  /** 다 도착했는가. 이때부터 상대가 읽은 말을 보여 준다. */
  delivered: boolean;
  send: () => void;
}

export function useSending(full: string): Sending {
  const [phase, setPhase] = useState<Phase>('idle');
  const [shown, setShown] = useState(0);

  // 글을 고치면 보낸 것은 없던 일이 된다. 앞 문장의 도착 결과가 남아 있으면 거짓말이 된다.
  useEffect(() => {
    setPhase('idle');
    setShown(0);
  }, [full]);

  // 한 자리씩 찍는다. 자리마다 짧은 소리가 나고, 다 찍히면 도착한 것으로 본다.
  useEffect(() => {
    if (phase !== 'sending') return;
    if (shown >= full.length) {
      setPhase('delivered');
      return;
    }
    const timer = window.setTimeout(() => {
      beep();
      setShown((current) => current + 1);
    }, REVEAL_INTERVAL_MS);
    return () => window.clearTimeout(timer);
  }, [phase, shown, full]);

  const send = () => {
    if (full.length === 0) return;
    setShown(0);
    setPhase('sending');
    ring();
  };

  return {
    // 보내기 전에는 눌러 담긴 숫자를 그대로 보여 준다. 보내는 중에만 한 자리씩 드러난다.
    digits: phase === 'idle' ? full : full.slice(0, shown),
    ringing: phase === 'sending',
    delivered: phase === 'delivered',
    send,
  };
}
