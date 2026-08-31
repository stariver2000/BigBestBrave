'use client';

/**
 * 재생 시계.
 *
 * 프레임마다 지난 시간을 알려 준다. setInterval을 쓰지 않는 이유는 두 가지다.
 * 탭이 뒤로 가면 브라우저가 프레임을 멈춰 주므로 보이지 않는 화면이 계속 돌지 않고,
 * 프레임 간격을 직접 재므로 화면 주사율이 달라도 같은 속도로 흐른다.
 */

import { useEffect, useRef } from 'react';

export function useClock(active: boolean, onFrame: (elapsedMs: number) => void): void {
  // 콜백이 매 렌더마다 새로 만들어져도 시계를 다시 걸지 않기 위해 참조로 들고 있는다.
  const frameHandler = useRef(onFrame);
  frameHandler.current = onFrame;

  useEffect(() => {
    if (!active) return;

    let previous = performance.now();
    let handle = 0;

    const step = (now: number) => {
      const elapsed = now - previous;
      previous = now;
      frameHandler.current(elapsed);
      handle = requestAnimationFrame(step);
    };

    handle = requestAnimationFrame(step);
    return () => cancelAnimationFrame(handle);
  }, [active]);
}
