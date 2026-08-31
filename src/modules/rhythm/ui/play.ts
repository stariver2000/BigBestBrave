'use client';

/**
 * 리듬을 실제로 느끼게 한다.
 *
 * 손에 닿는 진동이 본래의 감각이지만, 진동 장치가 없는 화면도 많다. 그래서 두 갈래로 내보낸다.
 *   - 진동: 휴대전화의 떨림. 세기를 조절할 수 없는 규격이라 길이로만 표현된다.
 *   - 소리: 아주 낮은 음. 세기를 소리 크기로 옮겨 두 축을 모두 남긴다.
 * 둘 다 실패해도 화면의 막대는 그대로 흐르므로, 눈으로는 언제나 리듬을 볼 수 있다.
 */

import type { Pattern } from '../../../core/rhythm';
import { TONE } from '../config';

let context: AudioContext | null = null;

/** 진동 규격은 [떨림, 쉼, 떨림, ...] 순서의 밀리초 배열을 받는다. */
function toVibrationPattern(pattern: Pattern): number[] {
  const steps: number[] = [];
  pattern.pulses.forEach((pulse, index) => {
    steps.push(Math.round(pulse.duration));
    if (index < pattern.pulses.length - 1) steps.push(Math.round(pulse.gap));
  });
  return steps;
}

function playTone(pattern: Pattern): void {
  context ??= new AudioContext();
  if (context.state === 'suspended') void context.resume();

  const now = context.currentTime;
  let cursor = 0;
  for (const pulse of pattern.pulses) {
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = 'sine';
    oscillator.frequency.value = TONE.frequency;

    const start = now + cursor / 1000;
    const end = start + pulse.duration / 1000;
    // 시작과 끝을 살짝 눕힌다. 뚝 끊으면 딱 소리가 나서 떨림으로 들리지 않는다.
    gain.gain.setValueAtTime(0, start);
    gain.gain.linearRampToValueAtTime(pulse.intensity * TONE.maxGain, start + 0.012);
    gain.gain.setValueAtTime(pulse.intensity * TONE.maxGain, Math.max(start + 0.012, end - 0.012));
    gain.gain.linearRampToValueAtTime(0, end);

    oscillator.connect(gain).connect(context.destination);
    oscillator.start(start);
    oscillator.stop(end);
    cursor += pulse.duration + pulse.gap;
  }
}

export function playPattern(pattern: Pattern): void {
  if (typeof window === 'undefined' || pattern.pulses.length === 0) return;

  try {
    navigator.vibrate?.(toVibrationPattern(pattern));
  } catch {
    // 진동을 지원하지 않는 기기에서는 소리로만 전한다.
  }

  try {
    playTone(pattern);
  } catch {
    // 소리를 낼 수 없어도 화면의 막대는 그대로 흐른다.
  }
}

/** 리듬 전체가 흐르는 데 걸리는 시간. 재생 표시를 언제 끌지 정하는 데 쓴다. */
export function playbackLength(pattern: Pattern): number {
  return pattern.pulses.reduce(
    (total, pulse, index) => total + pulse.duration + (index === pattern.pulses.length - 1 ? 0 : pulse.gap),
    0,
  );
}
