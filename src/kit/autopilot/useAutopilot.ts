'use client';

/**
 * 스스로 도는 시연의 시계.
 *
 * 단계를 하나씩 실행하고 끝나면 처음으로 돌아간다. 사람이 화면을 누르거나 자판을 치면
 * 그 즉시 멈춘다 — 시연 중에 조작이 되받아쳐지면 사람은 자기가 뭘 망가뜨렸다고 느낀다.
 * 움직임을 줄여 달라고 설정한 사람에게는 스스로 시작하지 않고, 눌러서 볼 수 있게만 둔다.
 */

import { useEffect, useRef, useState } from 'react';
import { nextIndex, waitFor, type AutopilotStep } from './model';

export interface Autopilot {
  running: boolean;
  /** 몇 번째 단계까지 왔는가. 화면이 진행을 표시할 때 쓴다. */
  index: number;
  stop: () => void;
  restart: () => void;
}

export function useAutopilot(steps: AutopilotStep[], firstWait = 1400): Autopilot {
  // 단계 배열은 렌더마다 새로 만들어지므로 참조로 들고 있는다. 그러지 않으면 시계가 매번 다시 걸린다.
  const stepsRef = useRef(steps);
  stepsRef.current = steps;

  const [running, setRunning] = useState(false);
  const [index, setIndex] = useState(0);

  // 첫 방문에만 스스로 시작한다. 움직임을 줄이는 설정이면 기다린다.
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!reduced) setRunning(true);
  }, []);

  useEffect(() => {
    if (!running) return;
    const stop = () => setRunning(false);
    window.addEventListener('pointerdown', stop);
    window.addEventListener('keydown', stop);
    window.addEventListener('wheel', stop, { passive: true });
    return () => {
      window.removeEventListener('pointerdown', stop);
      window.removeEventListener('keydown', stop);
      window.removeEventListener('wheel', stop);
    };
  }, [running]);

  useEffect(() => {
    if (!running || stepsRef.current.length === 0) return;
    const timer = window.setTimeout(() => {
      stepsRef.current[index % stepsRef.current.length].run();
      setIndex((current) => nextIndex(current, stepsRef.current.length));
    }, waitFor(stepsRef.current, index, firstWait));
    return () => window.clearTimeout(timer);
  }, [running, index, firstWait]);

  return {
    running,
    index,
    stop: () => setRunning(false),
    restart: () => {
      setIndex(0);
      setRunning(true);
    },
  };
}
