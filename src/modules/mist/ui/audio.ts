'use client';

/**
 * 안개를 소리로 낸다.
 *
 * 액체마다 진동자 하나를 켜 두고, 화면이 계산한 크기와 방향을 매 프레임 그 진동자에 넘긴다.
 * 소리를 그때그때 새로 만들지 않는 이유: 물방울이 수백 개라 그때마다 만들면 소리가 끊기고,
 * 무엇보다 이 소리는 "울리는 사건"이 아니라 "그 자리에 있는 상태"이기 때문이다.
 *
 * 브라우저는 사용자가 무언가 누르기 전에는 소리를 내지 못하게 막는다. 그래서 켜는 일은 밖에서 시킨다.
 */

import { LIQUIDS, type Heard } from '../../../core/mist';
import { GAIN_GLIDE, MAX_GAIN } from '../config';

interface Voice {
  gain: GainNode;
  panner: StereoPannerNode;
  /** 흔들림을 만드는 낮은 진동자. 액체마다 깊이가 다르다. */
  vibrato?: OscillatorNode;
}

export class MistAudio {
  private context: AudioContext | null = null;
  private voices = new Map<string, Voice>();

  /** 사용자의 첫 조작에서 부른다. 이미 켜져 있으면 아무 일도 하지 않는다. */
  start(): void {
    if (this.context) {
      if (this.context.state === 'suspended') void this.context.resume();
      return;
    }
    try {
      const context = new AudioContext();
      this.context = context;

      for (const liquid of LIQUIDS) {
        const oscillator = context.createOscillator();
        const gain = context.createGain();
        const panner = context.createStereoPanner();

        oscillator.type = liquid.wave;
        oscillator.frequency.value = liquid.frequency;
        gain.gain.value = 0;

        // 흔들림은 음높이를 조금씩 밀고 당겨 만든다. 곧은 소리보다 살아 있게 들린다.
        if (liquid.vibrato > 0) {
          const lfo = context.createOscillator();
          const depth = context.createGain();
          lfo.frequency.value = 0.6 + liquid.vibrato * 0.35;
          depth.gain.value = liquid.vibrato;
          lfo.connect(depth).connect(oscillator.frequency);
          lfo.start();
          this.voices.set(liquid.id, { gain, panner, vibrato: lfo });
        } else {
          this.voices.set(liquid.id, { gain, panner });
        }

        oscillator.connect(gain).connect(panner).connect(context.destination);
        oscillator.start();
      }
    } catch {
      // 소리를 낼 수 없는 환경에서도 화면의 안개는 그대로 흐른다.
      this.context = null;
    }
  }

  /** 계산된 결과를 소리에 옮긴다. 값이 뚝 바뀌지 않도록 조금씩 따라가게 한다. */
  update(heard: readonly Heard[]): void {
    const context = this.context;
    if (!context) return;

    const now = context.currentTime;
    for (const item of heard) {
      const voice = this.voices.get(item.liquid);
      if (!voice) continue;
      voice.gain.gain.setTargetAtTime(item.gain * MAX_GAIN, now, GAIN_GLIDE);
      voice.panner.pan.setTargetAtTime(item.pan, now, GAIN_GLIDE);
    }
  }

  /** 소리를 끈다. 진동자는 그대로 두고 크기만 0으로 내린다. */
  mute(): void {
    const context = this.context;
    if (!context) return;
    for (const voice of this.voices.values()) {
      voice.gain.gain.setTargetAtTime(0, context.currentTime, GAIN_GLIDE);
    }
  }

  get ready(): boolean {
    return this.context !== null;
  }
}
