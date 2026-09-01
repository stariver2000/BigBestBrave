'use client';

/**
 * 과제가 벌어지는 띠.
 *
 * 포인터의 가로 위치만 읽어 0~1로 옮기고, 화면 새로고침마다 방아쇠 상태 기계를 한 걸음 굴린다.
 * 매 프레임 굴리는 이유는 드웰 때문이다. 드웰은 **아무 일도 일어나지 않는 동안** 시간이 차야
 * 당겨지므로, 포인터 이벤트만 듣고 있으면 손을 멈춘 순간 시계도 멈춘다.
 *
 * 포인터 이벤트를 띠가 아니라 창에 매다는 이유는, 띠 밖으로 커서가 벗어나도 가로 위치는
 * 계속 뜻이 있기 때문이다. 위아래로 조금 벗어났다고 과제가 끊기면 기록이 더러워진다.
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import {
  beginSelection,
  DWELL_MS,
  initialState,
  step,
  type Fire,
  type FullState,
  type Target,
  type Trigger,
} from '../../../core/selection';
import { LANE, TRAIL_MS } from '../config';
import styles from './reach.module.css';

export interface LaneProps {
  targets: readonly Target[];
  /** 지금 골라야 하는 과녁. */
  askedId: number;
  running: boolean;
  trigger: Trigger;
  /** 방아쇠가 당겨졌다. 좌표와 시각이 함께 온다. */
  onFire: (fire: Fire, reentries: number) => void;
  /** 커서가 처음 띠에 닿았다. 첫 선택의 시계가 여기서 시작한다. */
  onEngage: (x: number, time: number) => void;
  /** 새 선택이 시작될 때마다 올라간다. 상태 기계를 되돌리는 신호다. */
  selectionKey: number;
  /** 방금 고른 결과. 맞았으면 true. 잠깐 띠에 남긴다. */
  flash: 'ok' | 'miss' | null;
  haptics: boolean;
}

export function Lane({
  targets,
  askedId,
  running,
  trigger,
  onFire,
  onEngage,
  selectionKey,
  flash,
  haptics,
}: LaneProps) {
  const laneRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef<FullState>(initialState(0));
  const pointerRef = useRef<{ x: number; pinched: boolean } | null>(null);
  const engagedRef = useRef(false);
  const insideRef = useRef<number | null>(null);
  const [cursor, setCursor] = useState<number | null>(null);
  const [dwellProgress, setDwellProgress] = useState(0);
  const [trail, setTrail] = useState<{ x: number; at: number }[]>([]);

  // 새 선택이 시작되면 재진입 세기를 되돌린다. 상태 기계 자체는 이어 간다.
  useEffect(() => {
    stateRef.current = beginSelection(stateRef.current);
  }, [selectionKey]);

  /*
   * 판이 바뀌면 과녁의 자리와 폭이 통째로 달라진다. 그때 '지금 어느 과녁 안에 있다'는
   * 앞 판의 기억을 그대로 들고 가면, 새 판 첫 프레임에 있지도 않은 과녁에서 빠져나온 것으로
   * 읽혀 엉뚱한 선택이 기록된다. 그래서 과녁이 바뀌면 상태를 통째로 되돌린다.
   */
  useEffect(() => {
    stateRef.current = initialState(pointerRef.current?.x ?? 0, true);
  }, [targets]);

  useEffect(() => {
    if (!running) {
      pointerRef.current = null;
      engagedRef.current = false;
      setCursor(null);
      setDwellProgress(0);
      setTrail([]);
    }
  }, [running]);

  const readX = useCallback((clientX: number) => {
    const box = laneRef.current?.getBoundingClientRect();
    if (!box || box.width === 0) return null;
    return Math.min(1, Math.max(0, (clientX - box.left) / box.width));
  }, []);

  useEffect(() => {
    if (!running) return undefined;

    const move = (event: PointerEvent) => {
      const x = readX(event.clientX);
      if (x === null) return;
      pointerRef.current = { x, pinched: pointerRef.current?.pinched ?? false };
    };
    const down = (event: PointerEvent) => {
      const x = readX(event.clientX);
      if (x === null) return;
      pointerRef.current = { x, pinched: true };
    };
    const key = (event: KeyboardEvent) => {
      if (event.code !== 'Space' && event.key !== ' ') return;
      event.preventDefault();
      if (pointerRef.current) pointerRef.current = { ...pointerRef.current, pinched: true };
    };

    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('pointerdown', down);
    window.addEventListener('keydown', key);
    return () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerdown', down);
      window.removeEventListener('keydown', key);
    };
  }, [running, readX]);

  useEffect(() => {
    if (!running) return undefined;
    let raf = 0;

    const tick = () => {
      raf = requestAnimationFrame(tick);
      const pointer = pointerRef.current;
      if (pointer === null) return;
      const time = performance.now();

      if (!engagedRef.current) {
        engagedRef.current = true;
        stateRef.current = initialState(pointer.x, true);
        onEngage(pointer.x, time);
      }

      const result = step(trigger, stateRef.current, { x: pointer.x, time, pinched: pointer.pinched }, targets);
      stateRef.current = result.state;
      pointerRef.current = { ...pointer, pinched: false };

      setCursor(pointer.x);
      setTrail((old) => [...old, { x: pointer.x, at: time }].filter((p) => time - p.at < TRAIL_MS).slice(-90));

      // 과녁에 새로 들어가면 짧게 한 번 떤다. 논문이 쓴 신호를 그대로 옮겼다.
      if (haptics && result.state.insideId !== insideRef.current && result.state.insideId !== null) {
        navigator.vibrate?.(10);
      }
      insideRef.current = result.state.insideId;

      setDwellProgress(
        trigger === 'dwell' && result.state.insideId !== null && result.state.armed
          ? Math.min(1, (time - result.state.enteredAt) / DWELL_MS)
          : 0,
      );

      if (result.fire) {
        if (haptics) navigator.vibrate?.(20);
        onFire(result.fire, result.state.reentries);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [running, trigger, targets, onFire, onEngage, haptics]);

  return (
    <div
      ref={laneRef}
      className={styles.lane}
      data-running={running || undefined}
      data-flash={flash ?? undefined}
      style={{ height: LANE.height }}
    >
      {targets.map((target) => (
        <div
          key={target.id}
          className={styles.target}
          data-asked={target.id === askedId || undefined}
          style={{
            left: `${(target.center - target.width / 2) * 100}%`,
            width: `${target.width * 100}%`,
          }}
        >
          {target.id === askedId && dwellProgress > 0 && (
            <div className={styles.dwell} style={{ transform: `scaleY(${dwellProgress})` }} />
          )}
        </div>
      ))}

      {trail.map((point, index) => (
        <div
          key={index}
          className={styles.trail}
          style={{ left: `${point.x * 100}%`, opacity: (index + 1) / (trail.length + 4) }}
        />
      ))}

      {cursor !== null && (
        <div className={styles.cursor} style={{ left: `${cursor * 100}%`, width: LANE.cursor }} />
      )}
    </div>
  );
}
