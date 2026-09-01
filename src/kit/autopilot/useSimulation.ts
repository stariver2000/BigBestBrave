'use client';

/**
 * 스스로 도는 계산.
 *
 * 시연(useAutopilot)과 다른 종류의 자율성이다. 시연은 짜인 순서를 보여 주고 손대면 비켜서지만,
 * 시뮬레이션은 화면의 내용 그 자체다 — 사람이 손잡이를 돌리는 동안에도 계속 돌아야 하고,
 * 오히려 그때 무엇이 달라지는지가 볼거리다. 그래서 사람의 조작으로 멈추지 않는다.
 *
 * 대신 두 가지를 지킨다.
 *   - 보이지 않는 탭에서는 멈춘다. 수백 장이 동시에 열려도 보이지 않는 것은 한 톨도 쓰지 않는다.
 *   - 움직임을 줄여 달라고 설정한 사람에게는 스스로 시작하지 않는다.
 */

import { useEffect, useRef, useState } from 'react';

export interface Simulation {
  running: boolean;
  toggle: () => void;
  /** 지금까지 돈 횟수. 화면이 진행을 보여 줄 때 쓴다. */
  ticks: number;
}

export function useSimulation(step: () => void, intervalMs: number): Simulation {
  // 걸음 함수는 렌더마다 새로 만들어지므로 참조로 들고 있는다. 그러지 않으면 시계가 매번 다시 걸린다.
  const stepRef = useRef(step);
  stepRef.current = step;

  const [running, setRunning] = useState(false);
  const [ticks, setTicks] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!reduced) setRunning(true);
  }, []);

  // 보이지 않는 탭에서는 계산을 멈춘다. 돌아오면 멈춘 자리에서 이어 간다.
  useEffect(() => {
    const sync = () => setVisible(!document.hidden);
    sync();
    document.addEventListener('visibilitychange', sync);
    return () => document.removeEventListener('visibilitychange', sync);
  }, []);

  useEffect(() => {
    if (!running || !visible) return;
    const timer = window.setInterval(() => {
      stepRef.current();
      setTicks((count) => count + 1);
    }, intervalMs);
    return () => window.clearInterval(timer);
  }, [running, visible, intervalMs]);

  return { running, ticks, toggle: () => setRunning((current) => !current) };
}
