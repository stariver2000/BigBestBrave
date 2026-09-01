'use client';

/**
 * 물렁함 착시 화면.
 *
 * 파형 넷을 나란히 그려 두고, 눌러 보면 소리로 들려준다. 브라우저는 진동의 파형을 바꿀 수
 * 없으므로 손끝으로는 흉내 낼 수 없지만, 귀로는 또렷이 갈린다. 그 갈림을 먼저 겪게 한 다음
 * "그런데 손끝은 이걸 못 가릅니다"라고 말하는 것이 이 화면의 순서다.
 */

import { useEffect, useMemo, useRef, useState } from 'react';
import { Panel, PaperCard } from '../../../kit';
import {
  amplitudeFor,
  AXES,
  BURST_MS,
  CARRIER_HZ,
  cycle,
  DELAY_RANGE,
  DELAY_THRESHOLD_MS,
  delayHeadroom,
  PRESS,
  rms,
  verdicts,
  WAVEFORMS,
  type Axis,
  type Dimension,
  type Waveform,
} from '../../../core/compliance';
import { createTranslator, type Locale } from '../../../core/i18n';
import { AUDIO, PAPER, WAVE } from '../config';
import { softenDictionary, type SoftenKey } from '../dictionary';
import styles from './soften.module.css';

export function Soften({ locale }: { locale: Locale }) {
  const t = createTranslator(softenDictionary, locale);

  const [waveform, setWaveform] = useState<Waveform>('sine');
  const [delay, setDelay] = useState<number>(DELAY_RANGE.initial);
  const [axis, setAxis] = useState<Axis>('z');
  const [carrier, setCarrier] = useState<number>(CARRIER_HZ.initial);
  const [depth, setDepth] = useState<number>(PRESS.initialDepth);
  const [playing, setPlaying] = useState(false);
  const [canBuzz, setCanBuzz] = useState(true);

  const audioRef = useRef<{ ctx: AudioContext; stop: () => void } | null>(null);

  useEffect(() => {
    setCanBuzz(typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function');
    return () => audioRef.current?.stop();
  }, []);

  const amplitude = amplitudeFor(depth, 1.3);
  const list = useMemo(() => verdicts({ delay }), [delay]);
  const headroom = delayHeadroom(delay);
  const shapes = useMemo(
    () => Object.fromEntries(WAVEFORMS.map((kind) => [kind, cycle(kind, 96)])) as Record<Waveform, number[]>,
    [],
  );

  /** 고른 파형을 그대로 소리로 만든다. 진동으로는 못 내지만 귀로는 낼 수 있다. */
  const play = () => {
    audioRef.current?.stop();
    if (playing) {
      setPlaying(false);
      return;
    }
    try {
      const Ctor = window.AudioContext ?? (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new Ctor();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = waveform;
      osc.frequency.value = carrier;
      gain.gain.value = AUDIO.gain * amplitude;
      osc.connect(gain).connect(ctx.destination);
      const stop = () => {
        try {
          osc.stop();
          void ctx.close();
        } catch {
          // 이미 멈춘 경우. 그냥 둔다.
        }
      };
      osc.start();
      osc.stop(ctx.currentTime + AUDIO.seconds);
      osc.onended = () => setPlaying(false);
      audioRef.current = { ctx, stop };
      setPlaying(true);
    } catch {
      setPlaying(false);
    }
  };

  /** 브라우저의 떨림은 켜고 끄는 것뿐이다. 지연만 흉내 낼 수 있다. */
  const buzz = () => {
    if (!canBuzz) return;
    navigator.vibrate?.([Math.round(delay), BURST_MS]);
  };

  const label = (key: string) => t(key as SoftenKey);

  return (
    <div className={styles.layout}>
      <PaperCard
        label={t('paper-label')}
        title={PAPER.title}
        meta={`${PAPER.authors} · ${PAPER.affiliation} · ${PAPER.venue}`}
        href={PAPER.link}
        plain={PAPER.plain}
        locale={locale}
      />

      <section className={styles.how}>
        <h2 className={styles.howTitle}>{t('how-title')}</h2>
        <p>{t('how-body')}</p>
      </section>

      <Panel title={t('design-title')} note={t('design-note')}>
        <div className={styles.waves}>
          {WAVEFORMS.map((kind) => (
            <button
              key={kind}
              type="button"
              className={styles.wave}
              data-active={kind === waveform || undefined}
              onClick={() => setWaveform(kind)}
            >
              <svg className={styles.waveArt} viewBox={`0 0 ${WAVE.width} ${WAVE.height}`} aria-hidden="true">
                <polyline
                  className={styles.wavePath}
                  points={shapes[kind]
                    .map((value, index) => {
                      const x = WAVE.pad + (index / (shapes[kind].length - 1)) * (WAVE.width - WAVE.pad * 2);
                      const y = WAVE.height / 2 - value * ((WAVE.height - WAVE.pad * 2) / 2);
                      return `${x.toFixed(1)},${y.toFixed(1)}`;
                    })
                    .join(' ')}
                />
              </svg>
              <span className={styles.waveName}>{label(`w-${kind}`)}</span>
              <span className={styles.waveRms}>RMS {rms(shapes[kind]).toFixed(3)}</span>
            </button>
          ))}
        </div>

        <div className={styles.dials}>
          <label className={styles.dial}>
            <span className={styles.dialLabel}>
              {t('delay')}
              <span className={styles.dialValue} data-over={delay > DELAY_THRESHOLD_MS || undefined}>
                {delay}
                {t('ms')}
              </span>
            </span>
            <input
              type="range"
              min={DELAY_RANGE.min}
              max={DELAY_RANGE.max}
              step={DELAY_RANGE.step}
              value={delay}
              onChange={(event) => setDelay(Number(event.target.value))}
            />
            <span className={styles.quiet} data-over={delay > DELAY_THRESHOLD_MS || undefined}>
              {headroom >= 0
                ? `${t('headroom-under')} ${headroom}${t('ms')}`
                : `${t('headroom-over')} ${-headroom}${t('ms')}`}
            </span>
          </label>

          <label className={styles.dial}>
            <span className={styles.dialLabel}>
              {t('carrier')}
              <span className={styles.dialValue}>{carrier}Hz</span>
            </span>
            <input
              type="range"
              min={CARRIER_HZ.min}
              max={CARRIER_HZ.max}
              value={carrier}
              onChange={(event) => setCarrier(Number(event.target.value))}
            />
          </label>

          <label className={styles.dial}>
            <span className={styles.dialLabel}>
              {t('depth')}
              <span className={styles.dialValue}>{Math.round(depth * 100)}%</span>
            </span>
            <input
              type="range"
              min={0}
              max={100}
              value={Math.round(depth * 100)}
              onChange={(event) => setDepth(Number(event.target.value) / 100)}
            />
            <span className={styles.quiet}>×{amplitude.toFixed(2)}</span>
          </label>
        </div>

        <div className={styles.axes}>
          {AXES.map((id) => (
            <button
              key={id}
              type="button"
              className={styles.axisButton}
              data-active={id === axis || undefined}
              onClick={() => setAxis(id)}
            >
              {label(`ax-${id}`)}
            </button>
          ))}
          <span className={styles.quiet}>{t('ax-note')}</span>
        </div>

        <div className={styles.actions}>
          <button type="button" className={styles.play} onClick={play}>
            {playing ? t('stop') : t('listen')}
          </button>
          <button type="button" className={styles.buzzButton} onClick={buzz} disabled={!canBuzz}>
            {canBuzz ? t('buzz') : t('no-buzz')}
          </button>
        </div>
      </Panel>

      <Panel title={t('verdict-title')} note={t('verdict-note')}>
        <ul className={styles.verdicts}>
          {list.map((verdict) => (
            <li key={verdict.factor} className={styles.verdict} data-felt={verdict.noticeable || undefined}>
              <span className={styles.verdictName}>{label(`f-${verdict.factor}`)}</span>
              <span className={styles.verdictState}>
                {verdict.noticeable ? t('felt') : t('not-felt')}
              </span>
              <span className={styles.verdictDims}>
                <span className={styles.verdictDimsLabel}>{t('moves')}</span>
                {verdict.dimensions.length === 0 ? (
                  <span className={styles.quiet}>{t('moves-none')}</span>
                ) : (
                  verdict.dimensions.map((dimension: Dimension) => (
                    <span key={dimension} className={styles.dim}>
                      {label(`d-${dimension}`)}
                    </span>
                  ))
                )}
              </span>
            </li>
          ))}
        </ul>
      </Panel>

      <section className={styles.ear}>
        <h2 className={styles.howTitle}>{t('ear-title')}</h2>
        <p>{t('ear-body')}</p>
      </section>

      <p className={styles.warning}>{t('warning')}</p>

      <section className={styles.took}>
        <h2 className={styles.howTitle}>{t('took-title')}</h2>
        <p>{t('took-yes')}</p>
        <p>{t('took-no')}</p>
        <p className={styles.mine}>{t('took-mine')}</p>
      </section>
    </div>
  );
}
