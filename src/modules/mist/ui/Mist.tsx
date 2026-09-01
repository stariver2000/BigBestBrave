'use client';

/**
 * 소리를 뿌리는 화면.
 *
 * 한 프레임마다 세 가지를 한다: 안개를 흘리고, 그리고, 지금 자리에서 들리는 것을 소리로 넘긴다.
 * 상태를 React에 두지 않고 ref에 두는 이유: 물방울이 수백 개이고 매 프레임 바뀌므로,
 * 그때마다 화면을 다시 그리게 하면 브라우저가 따라오지 못한다.
 * 화면에 보여 줄 숫자만 성기게 끌어올린다.
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import { Panel, PaperCard, SimulationChip, useReach } from '../../../kit';
import { HEARING, LIQUIDS, add, blending, envelopeAt, listen, spray, startWanderer, step, wander, type Heard, type Particle, type Wanderer } from '../../../core/mist';
import { createRandom } from '../../../core/random';
import { createTranslator, type Locale } from '../../../core/i18n';
import { CANVAS, DROP_RADIUS, PAPER, SPRAY_INTERVAL } from '../config';
import { mistDictionary, type MistKey } from '../dictionary';
import { MistAudio } from './audio';
import styles from './mist.module.css';

/** 화면에 성기게 올려 보내는 숫자들. 매 프레임 올리면 화면이 버티지 못한다. */
interface Meters {
  drops: number;
  heard: Heard[];
  blend: number;
}

const METER_INTERVAL = 200;

export function Mist({ locale }: { locale: Locale }) {
  const t = createTranslator(mistDictionary, locale);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particles = useRef<Particle[]>([]);
  const pointer = useRef({ x: CANVAS.width / 2, y: CANVAS.height / 2, down: false });
  const lastSprayAt = useRef(0);
  const random = useRef(createRandom(20260901));
  const audio = useRef(new MistAudio());
  const liquidRef = useRef(LIQUIDS[0].id);
  const soundRef = useRef(false);

  const [liquid, setLiquid] = useState(LIQUIDS[0].id);
  const [sound, setSound] = useState(false);
  const [sprayed, setSprayed] = useState(false);
  const [meters, setMeters] = useState<Meters>({ drops: 0, heard: [], blend: 0 });
  /*
   * 공간에 손 하나를 둔다. 이 페이지는 뿌리기 전까지 빈 화면이라, 소리를 자리에 둔다는 것이
   * 무엇인지 아무것도 보이지 않았다. 이제 방이 저 혼자 숨 쉰다 — 천천히 돌아다니며 이따금 뿌리고,
   * 뿌린 것은 흩어진다. 사람이 뿌리는 동안에는 쉬면서 자리를 내준다.
   */
  const [ambient, setAmbient] = useState(true);
  const ambientRef = useRef(true);
  const wanderer = useRef<Wanderer | null>(null);
  // 이 페이지가 통한 순간: 다른 소리 둘이 겹쳐 들린 때. 섞임이 이 연구가 꼽은 즐거움이다.
  const reach = useReach();
  const reachRef = useRef(reach);
  reachRef.current = reach;

  liquidRef.current = liquid;
  soundRef.current = sound;
  ambientRef.current = ambient;

  /** 화면 좌표를 뿌리는 자리의 좌표로 옮긴다. 화면이 줄어들어도 계산은 같은 크기에서 한다. */
  const toCanvas = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    return {
      x: ((event.clientX - bounds.left) / bounds.width) * CANVAS.width,
      y: ((event.clientY - bounds.top) / bounds.height) * CANVAS.height,
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return;

    let frame = 0;
    let previous = performance.now();
    let meterAt = 0;

    const loop = (now: number) => {
      const dt = Math.min(now - previous, 120);
      previous = now;

      particles.current = step(particles.current, dt);

      // 방이 저 혼자 뿌린다. 사람이 뿌리는 동안에는 쉰다 — 조용해지는 것이 아니라 자리를 내주는 것이다.
      if (ambientRef.current && !pointer.current.down) {
        wanderer.current ??= startWanderer(CANVAS, now, random.current);
        const stepped = wander(wanderer.current, now, dt, CANVAS, random.current);
        wanderer.current = stepped.wanderer;
        if (stepped.sprays) {
          const liquidId = LIQUIDS[stepped.wanderer.liquidIndex].id;
          const angle = random.current() * Math.PI * 2;
          particles.current = add(
            particles.current,
            spray(stepped.wanderer.x, stepped.wanderer.y, angle, liquidId, random.current),
          );
        }
      }

      // 누르고 있는 동안 일정 간격으로 계속 뿌린다.
      if (pointer.current.down && now - lastSprayAt.current > SPRAY_INTERVAL) {
        lastSprayAt.current = now;
        const angle = random.current() * Math.PI * 2;
        particles.current = add(
          particles.current,
          spray(pointer.current.x, pointer.current.y, angle, liquidRef.current, random.current),
        );
      }

      context.clearRect(0, 0, CANVAS.width, CANVAS.height);

      // 물방울은 가운데가 진하고 가장자리로 갈수록 사라지는 원으로 그린다. 겹치면 짙어진다.
      for (const particle of particles.current) {
        const alpha = envelopeAt(particle) * 0.5;
        if (alpha <= 0) continue;
        const color = LIQUIDS.find((item) => item.id === particle.liquid)?.color ?? '#888';
        const gradient = context.createRadialGradient(
          particle.x, particle.y, 0, particle.x, particle.y, DROP_RADIUS,
        );
        gradient.addColorStop(0, color);
        gradient.addColorStop(1, 'transparent');
        context.globalAlpha = alpha;
        context.fillStyle = gradient;
        context.beginPath();
        context.arc(particle.x, particle.y, DROP_RADIUS, 0, Math.PI * 2);
        context.fill();
      }
      context.globalAlpha = 1;

      // 듣는 범위를 옅은 원으로 표시한다. 어디까지 들리는지 눈으로 알 수 있어야 한다.
      context.strokeStyle = 'rgba(23, 23, 26, 0.14)';
      context.setLineDash([3, 7]);
      context.beginPath();
      context.arc(pointer.current.x, pointer.current.y, HEARING.radius, 0, Math.PI * 2);
      context.stroke();
      context.setLineDash([]);

      const heard = listen(particles.current, pointer.current);
      if (soundRef.current) audio.current.update(heard);

      if (now - meterAt > METER_INTERVAL) {
        meterAt = now;
        setMeters({ drops: particles.current.length, heard, blend: blending(heard) });
        // 둘 이상이 겹쳐 들리는 순간이 이 페이지의 요점이다. 한 번만 세어진다.
        if (heard.length > 1) reachRef.current();
      }

      frame = window.requestAnimationFrame(loop);
    };

    frame = window.requestAnimationFrame(loop);
    return () => window.cancelAnimationFrame(frame);
  }, []);

  const toggleSound = () => {
    const next = !sound;
    setSound(next);
    if (next) audio.current.start();
    else audio.current.mute();
  };

  const heardCount = meters.heard.filter((item) => item.gain > 0.02).length;

  return (
    <div className={styles.layout}>
      <PaperCard
        label={t('paper-label')}
        title={PAPER.title}
        meta={`${PAPER.authors} · ${PAPER.affiliation} · ${PAPER.venue}`}
        href={PAPER.doi}
        plain={PAPER.plain}
        locale={locale}
      />

      <Panel
        title={t('canvas-title')}
        note={t('canvas-note')}
        actions={
          <SimulationChip running={ambient} onToggle={() => setAmbient(!ambient)} locale={locale} />
        }
      >
        <div
          className={styles.stage}
          onPointerMove={(event) => {
            const point = toCanvas(event);
            pointer.current.x = point.x;
            pointer.current.y = point.y;
          }}
          onPointerDown={(event) => {
            event.currentTarget.setPointerCapture(event.pointerId);
            const point = toCanvas(event);
            pointer.current = { ...point, down: true };
            // 첫 조작에서 소리를 켠다. 브라우저가 그전에는 소리를 막는다.
            if (!sound) toggleSound();
            setSprayed(true);
          }}
          onPointerUp={() => {
            pointer.current.down = false;
          }}
          onPointerCancel={() => {
            pointer.current.down = false;
          }}
        >
          <canvas ref={canvasRef} className={styles.canvas} width={CANVAS.width} height={CANVAS.height} />
          {!sprayed && <div className={styles.hint}>{t('canvas-hint')}</div>}
          {sprayed && !sound && <div className={styles.silent}>{t('canvas-silent')}</div>}
        </div>

        <div className={styles.meters}>
          <span>
            {t('meter-drops')} <span className={styles.meterValue}>{meters.drops}</span>
          </span>
          <span>
            {t('meter-heard')} <span className={styles.meterValue}>{heardCount}</span>
          </span>
          <span>
            {t('meter-blend')} <span className={styles.meterValue}>{Math.round(meters.blend * 100)}%</span>
          </span>
        </div>
      </Panel>

      <Panel title={t('liquid-title')} note={t('liquid-note')}>
        <div className={styles.liquids}>
          {LIQUIDS.map((item) => {
            const heard = meters.heard.find((entry) => entry.liquid === item.id);
            const audible = (heard?.gain ?? 0) > 0.02;
            return (
              <button
                key={item.id}
                type="button"
                className={`${styles.liquid} ${liquid === item.id ? styles.liquidOn : ''}`}
                onClick={() => setLiquid(item.id)}
              >
                <span
                  className={`${styles.swatch} ${audible ? styles.swatchHeard : ''}`}
                  style={{ background: item.color, color: item.color }}
                />
                {t(`name-${item.id}` as MistKey)}
              </button>
            );
          })}
        </div>

        <div className={styles.controls}>
          <button
            type="button"
            className={`${styles.action} ${sound ? styles.actionOn : ''}`}
            onClick={toggleSound}
          >
            {sound ? t('sound-off') : t('sound-on')}
          </button>
          <button
            type="button"
            className={styles.action}
            onClick={() => {
              particles.current = [];
            }}
          >
            {t('clear')}
          </button>
        </div>
      </Panel>

      <Panel title={t('finding-title')}>
        <p className={styles.finding}>{t('finding-body')}</p>
        <p className={styles.quiet}>{t('paper-note')}</p>
      </Panel>
    </div>
  );
}
