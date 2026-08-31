'use client';

/**
 * 삐 소리.
 *
 * 오디오 파일을 싣지 않고 그 자리에서 짧은 파형을 만든다. 파일 하나가 없어도 되고,
 * 소리가 필요한 순간에만 오디오 장치를 깨울 수 있다.
 * 브라우저는 사용자가 무언가 누르기 전에는 소리를 내지 못하게 막으므로, 실패해도 조용히 넘어간다.
 */

import { BEEP, RING } from '../config';

let context: AudioContext | null = null;

export function beep(): void {
  if (typeof window === 'undefined') return;

  try {
    // 오디오 장치는 한 번만 열고 계속 쓴다. 누를 때마다 열면 소리가 끊긴다.
    context ??= new AudioContext();
    if (context.state === 'suspended') void context.resume();

    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = 'square';
    oscillator.frequency.value = BEEP.frequency;
    gain.gain.value = BEEP.gain;

    oscillator.connect(gain).connect(context.destination);
    const now = context.currentTime;
    const end = now + BEEP.durationMs / 1000;
    // 끝을 뚝 자르면 딱 소리가 난다. 아주 짧게 줄여 준다.
    gain.gain.setValueAtTime(BEEP.gain, end - 0.01);
    gain.gain.linearRampToValueAtTime(0, end);
    oscillator.start(now);
    oscillator.stop(end);
  } catch {
    // 소리는 이 페이지의 덤이다. 나지 않아도 나머지는 그대로 동작해야 한다.
  }
}

/**
 * 호출이 도착했음을 알리는 소리.
 *
 * 짧은 삐 소리를 몇 번 겹쳐 낸다. 한 번만 울리면 눌러서 난 소리인지 도착해서 난 소리인지
 * 구별되지 않는다. 진동을 지원하는 기기에서는 함께 떨어 준다 — 그 시절 삐삐가 그랬다.
 */
export function ring(): void {
  for (let index = 0; index < RING.beeps; index += 1) {
    window.setTimeout(beep, index * RING.gapMs);
  }

  try {
    navigator.vibrate?.(RING.vibrationMs);
  } catch {
    // 진동은 덤이다. 막혀 있어도 소리와 화면은 그대로 동작한다.
  }
}
