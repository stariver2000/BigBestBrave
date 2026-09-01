'use client';

/**
 * 페이지의 맥을 재는 자리.
 *
 * 세 가지는 어느 페이지에서나 같은 방식으로 잰다 — 열렸는가(view), 사람이 손을 댔는가(touch),
 * 머물렀는가(stay). 그래서 프레임이 한 번 감싸면 모든 페이지가 함께 세어진다.
 * 네 번째(reach)만 페이지마다 다르다. 그 페이지가 "여기까지 오면 통한 것"이라고 정한 자리이며,
 * 페이지가 useReach()로 직접 알린다.
 *
 * 보내는 것은 경로와 사건 이름뿐이다. 누구인지는 만들지도 보내지도 않는다.
 * 창을 닫는 순간에도 남은 것을 보내야 해서 sendBeacon을 쓴다 — 실패하면 그냥 잃는다.
 * 이 수는 없어도 페이지는 그대로 동작하며, 그래서 실패를 사람에게 알리지 않는다.
 */

import { createContext, useCallback, useContext, useEffect, useRef, type ReactNode } from 'react';
import { STAY_AFTER_MS, accepts, type PulseKind } from '../../core/pulse';

const PULSE_ENDPOINT = '/api/pulse';
/**
 * 모아 두었다가 함께 보내는 간격(ms).
 *
 * 사건마다 보내면 요청이 잘게 쪼개지고, 떠날 때만 보내면 창이 그냥 닫히는 경우에 통째로 잃는다.
 * 그래서 사건이 생기면 짧게 모았다가 한 번 보내고(coalesce), 그 뒤로는 긴 간격으로만 확인한다.
 */
const COALESCE_MS = 1200;
const FLUSH_EVERY_MS = 15000;

const ReachContext = createContext<() => void>(() => {});

export function useReach(): () => void {
  return useContext(ReachContext);
}

export function PulseProvider({ path, children }: { path: string; children: ReactNode }) {
  const pending = useRef<PulseKind[]>([]);
  const sent = useRef<Set<PulseKind>>(new Set());
  const coalescing = useRef(0);

  /**
   * 모아 둔 것을 보낸다.
   *
   * 평소에는 fetch로 보낸다 — 무엇이 오갔는지 개발자 도구에서 보이고, 실패도 잡힌다.
   * 창을 닫는 순간에는 fetch가 취소되므로 sendBeacon으로 바꿔 던진다. 그마저 실패하면 잃는다.
   * 이 수는 없어도 페이지는 그대로 동작하며, 그래서 실패를 사람에게 알리지 않는다.
   */
  const flush = useCallback(
    (leaving = false) => {
      if (pending.current.length === 0) return;
      const body = JSON.stringify({ path, kinds: pending.current });
      pending.current = [];
      try {
        if (leaving) {
          navigator.sendBeacon(PULSE_ENDPOINT, new Blob([body], { type: 'application/json' }));
          return;
        }
        void fetch(PULSE_ENDPOINT, {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body,
          keepalive: true,
        }).catch(() => undefined);
      } catch {
        // 셈은 덤이다. 보내지 못하면 조용히 잃는다.
      }
    },
    [path],
  );

  const scheduleFlush = useCallback(() => {
    if (coalescing.current !== 0) return;
    coalescing.current = window.setTimeout(() => {
      coalescing.current = 0;
      flush();
    }, COALESCE_MS);
  }, [flush]);

  const record = useCallback(
    (kind: PulseKind) => {
      // 셀 수 있는 사건인지는 코어가 정한다 — 종류마다 한 번, 아하 지점은 손을 댄 뒤에만.
      if (!accepts(kind, sent.current)) return;
      sent.current.add(kind);
      pending.current.push(kind);
      scheduleFlush();
    },
    [scheduleFlush],
  );

  useEffect(() => {
    record('view');

    const touch = () => record('touch');
    window.addEventListener('pointerdown', touch, { once: true });
    window.addEventListener('keydown', touch, { once: true });

    const stayTimer = window.setTimeout(() => record('stay'), STAY_AFTER_MS);
    const flushTimer = window.setInterval(() => flush(), FLUSH_EVERY_MS);
    const leave = () => flush(true);
    window.addEventListener('pagehide', leave);

    return () => {
      window.removeEventListener('pointerdown', touch);
      window.removeEventListener('keydown', touch);
      window.removeEventListener('pagehide', leave);
      window.clearTimeout(stayTimer);
      window.clearInterval(flushTimer);
      window.clearTimeout(coalescing.current);
      coalescing.current = 0;
      flush();
    };
  }, [record, flush]);

  const reach = useCallback(() => record('reach'), [record]);

  return <ReachContext.Provider value={reach}>{children}</ReachContext.Provider>;
}
