'use client';

/**
 * 마우스의 배꼽 화면.
 *
 * 맨 앞이 그리는 판이다. 로봇이 논문의 ∞ 계획을 그리는 동안 같은 손놀림이
 * 세 개의 커서로 갈라지는 것을 보여 주고, 손을 대면 비켜서서 직접 긋게 한다.
 * 수식은 코어에 있고, 화면은 표본열을 만들어 넘길 뿐이다.
 *
 * 좌표 약속: 판의 mm 좌표는 SVG 좌표와 같다(y 아래로 증가). ∞는 위아래 대칭이라
 * 부호 방향이 그림을 바꾸지 않는다. 손 궤적의 기준(가운데 센서)은 첫 점에 닻을 둔다.
 */

import { useMemo, useRef, useState, type PointerEvent, type ReactNode } from 'react';
import { AutopilotChip, Badge, Button, Panel, PaperCard, useAutopilot } from '../../../kit';
import {
  DEVICE,
  HUMAN_PRINTED_AVERAGE,
  HUMAN_REGRESSIONS,
  INDIVIDUAL,
  PATH_DEVIATION,
  ROBOT,
  STUDY,
  THROUGHPUT,
  dropPercent,
  kilocountToMm,
  personalGain,
  planAngle,
  planLengthMm,
  planSamples,
  regressionAverage,
  risePercent,
  tracePath,
  xExtent,
  type Point,
  type Sample,
} from '../../../core/pivot';
import { createTranslator, type Locale } from '../../../core/i18n';
import { DEMO, PAD, PAPER, TRACE_COLORS } from '../config';
import { mouseDictionary } from '../dictionary';
import styles from './mouse.module.css';

/** 문구의 {자리}를 코어 값으로 채운다. 숫자를 사전에 박아 두면 코어와 어긋나도 아무도 모른다. */
function fill(text: string, values: Record<string, string | number>): string {
  return Object.entries(values).reduce(
    (out, [key, value]) => out.replaceAll(`{${key}}`, String(value)),
    text,
  );
}

/** ∞ 한 바퀴의 표본열. 결정론이라 모듈에서 한 번만 만든다. */
const PLAN = planSamples();
const PLAN_HALF_WIDTH = (ROBOT.boundsCm.width * 10) / 2;
const PAD_CENTER: Point = { x: PAD.widthMm / 2, y: PAD.heightMm / 2 };
/** 손 표본의 상한. 오래 그려도 판이 무거워지지 않게 한다. */
const MAX_HAND_SAMPLES = 2400;

function polylineOf(points: readonly Point[], anchor: Point): string {
  return points.map((point) => `${(anchor.x + point.x).toFixed(2)},${(anchor.y + point.y).toFixed(2)}`).join(' ');
}

/** 판 위 x(mm)를 기울기 규칙의 좌표로 옮긴다. 판이 ∞보다 넓어 끝은 끝값에 붙인다. */
function tiltAt(padX: number): number {
  const centered = padX - PAD_CENTER.x;
  const clamped = Math.max(-PLAN_HALF_WIDTH, Math.min(PLAN_HALF_WIDTH, centered));
  return planAngle(clamped);
}

export function Mouse({ locale }: { locale: Locale }) {
  const t = createTranslator(mouseDictionary, locale);

  const [mode, setMode] = useState<'robot' | 'hand'>('robot');
  const [robotCount, setRobotCount] = useState(0);
  const [handSamples, setHandSamples] = useState<Sample[]>([]);
  const [handAnchor, setHandAnchor] = useState<Point>(PAD_CENTER);
  const [customP, setCustomP] = useState(30);

  const padRef = useRef<SVGSVGElement | null>(null);
  const lastPoint = useRef<Point | null>(null);

  // 시연: 60ms마다 계획 표본 셋씩 밀어 넣는다. 단계가 처음으로 돌아오면 궤적도 처음부터다.
  const stepCount = Math.ceil(PLAN.length / DEMO.samplesPerStep);
  const steps = useMemo(
    () =>
      Array.from({ length: stepCount }, (_, i) => ({
        wait: DEMO.stepWaitMs,
        run: () => setRobotCount(Math.min((i + 1) * DEMO.samplesPerStep, PLAN.length)),
      })),
    [stepCount],
  );
  const autopilot = useAutopilot(steps);

  const samples = mode === 'robot' ? PLAN.slice(0, robotCount) : handSamples;
  const anchor = mode === 'robot' ? PAD_CENTER : handAnchor;

  const traces = useMemo(() => {
    const front = tracePath(samples, 0);
    const center = tracePath(samples, 0.5);
    const rear = tracePath(samples, 1);
    const custom = tracePath(samples, customP / 100);
    return { front, center, rear, custom };
  }, [samples, customP]);

  const frontWidth = xExtent(traces.front);
  const rearWidth = xExtent(traces.rear);
  const widthRatio = rearWidth > 1 ? (frontWidth / rearWidth - 1) * 100 : null;

  const toPadMm = (event: PointerEvent<SVGSVGElement>): Point | null => {
    const rect = padRef.current?.getBoundingClientRect();
    if (!rect || rect.width === 0) return null;
    return {
      x: ((event.clientX - rect.left) / rect.width) * PAD.widthMm,
      y: ((event.clientY - rect.top) / rect.height) * PAD.heightMm,
    };
  };

  const onPadDown = (event: PointerEvent<SVGSVGElement>) => {
    const point = toPadMm(event);
    if (!point) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    lastPoint.current = point;
    setMode('hand');
    setHandAnchor(point);
    setHandSamples([]);
  };

  const onPadMove = (event: PointerEvent<SVGSVGElement>) => {
    const last = lastPoint.current;
    if (!last) return;
    const point = toPadMm(event);
    if (!point) return;
    const dx = point.x - last.x;
    const dy = point.y - last.y;
    if (Math.hypot(dx, dy) < 0.5) return;
    const dtheta = tiltAt(point.x) - tiltAt(last.x);
    lastPoint.current = point;
    setHandSamples((prev) =>
      prev.length >= MAX_HAND_SAMPLES ? prev : [...prev, { dx, dy, dtheta }],
    );
  };

  const onPadUp = () => {
    lastPoint.current = null;
  };

  const clearPad = () => {
    setMode('hand');
    setHandSamples([]);
  };

  const restart = () => {
    setMode('robot');
    setRobotCount(0);
    autopilot.restart();
  };

  const gain = personalGain();

  return (
    <div className={styles.layout}>
      <PaperCard
        label={t('paper-label')}
        title={PAPER.title}
        meta={`${PAPER.authors} · ${PAPER.affiliation} · ${PAPER.venue} · ${t('full-text')} ${PAPER.fullText}`}
        href={PAPER.link}
        plain={PAPER.plain}
        locale={locale}
      />

      <Panel
        title={t('pad-title')}
        note={t('pad-note')}
        actions={<Button onClick={clearPad}>{t('pad-reset')}</Button>}
      >
        <AutopilotChip running={autopilot.running} onRestart={restart} locale={locale} />
        <svg
          ref={padRef}
          className={styles.pad}
          viewBox={`0 0 ${PAD.widthMm} ${PAD.heightMm}`}
          onPointerDown={onPadDown}
          onPointerMove={onPadMove}
          onPointerUp={onPadUp}
          onPointerLeave={onPadUp}
          role="img"
        >
          <polyline className={styles.trace} stroke={TRACE_COLORS.rear} points={polylineOf(traces.rear, anchor)} />
          <polyline className={styles.trace} stroke={TRACE_COLORS.front} points={polylineOf(traces.front, anchor)} />
          <polyline className={styles.trace} stroke={TRACE_COLORS.center} points={polylineOf(traces.center, anchor)} />
          <polyline
            className={styles.traceCustom}
            stroke={TRACE_COLORS.custom}
            points={polylineOf(traces.custom, anchor)}
          />
        </svg>

        <div className={styles.legend}>
          <span className={styles.legendItem}>
            <i className={styles.swatch} style={{ background: TRACE_COLORS.front }} />
            {t('legend-front')}
          </span>
          <span className={styles.legendItem}>
            <i className={styles.swatch} style={{ background: TRACE_COLORS.center }} />
            {t('legend-center')}
          </span>
          <span className={styles.legendItem}>
            <i className={styles.swatch} style={{ background: TRACE_COLORS.rear }} />
            {t('legend-rear')}
          </span>
          <span className={styles.legendItem}>
            <i className={styles.swatch} style={{ background: TRACE_COLORS.custom }} />
            {fill(t('legend-custom'), { p: customP })}
          </span>
        </div>

        <label className={styles.slider}>
          <span className={styles.sliderLabel}>{t('slider-label')}</span>
          <span className={styles.sliderEnd}>{t('slider-front')}</span>
          <input
            type="range"
            min={0}
            max={100}
            step={1}
            value={customP}
            onChange={(event) => setCustomP(Number(event.target.value))}
          />
          <span className={styles.sliderEnd}>{t('slider-rear')}</span>
        </label>

        {widthRatio !== null && samples.length > 10 && (
          <p className={styles.readout}>
            {fill(t('pad-readout'), {
              front: frontWidth.toFixed(0),
              rear: rearWidth.toFixed(0),
              ratio: widthRatio.toFixed(0),
            })}
          </p>
        )}
        <p className={styles.note}>{t('pad-mine')}</p>
      </Panel>

      <Panel title={t('mech-title')} note={t('mech-note')}>
        <dl className={styles.equations}>
          <div className={styles.equation}>
            <dt>{t('eq-front-label')}</dt>
            <dd>front = rear + r·θ</dd>
          </div>
          <div className={styles.equation}>
            <dt>{t('eq-virtual-label')}</dt>
            <dd>virtual(p) = (1−p)·front + p·rear</dd>
          </div>
          <div className={styles.equation}>
            <dt>{t('eq-rotation-label')}</dt>
            <dd>θ = (front − rear) ÷ r,&ensp;r = {DEVICE.sensorSpanMm}mm</dd>
          </div>
        </dl>
        <p className={styles.note}>{t('mech-span')}</p>
        <p className={styles.note}>{t('mech-vertical')}</p>
      </Panel>

      <Panel title={t('study-title')} note={t('study-note')}>
        <div className={styles.measures}>
          <div className={styles.measure}>
            <p className={styles.measureCaption}>{t('tp-caption')}</p>
            <MeasureRow
              label={t('pos-center')}
              value={THROUGHPUT.at50.toFixed(2)}
              share={THROUGHPUT.at50 / THROUGHPUT.at50}
              badge={<Badge tone="pass">{t('baseline')}</Badge>}
            />
            <MeasureRow
              label={t('pos-front')}
              value={THROUGHPUT.at0.toFixed(2)}
              share={THROUGHPUT.at0 / THROUGHPUT.at50}
              badge={
                <Badge tone="fail">
                  {fill(t('worse-by'), { pct: dropPercent(THROUGHPUT.at50, THROUGHPUT.at0).toFixed(1) })}
                </Badge>
              }
            />
            <MeasureRow
              label={t('pos-rear')}
              value={THROUGHPUT.at100.toFixed(2)}
              share={THROUGHPUT.at100 / THROUGHPUT.at50}
              badge={
                <Badge tone="fail">
                  {fill(t('worse-by'), { pct: dropPercent(THROUGHPUT.at50, THROUGHPUT.at100).toFixed(1) })}
                </Badge>
              }
            />
          </div>
          <div className={styles.measure}>
            <p className={styles.measureCaption}>{t('mae-caption')}</p>
            <MeasureRow
              label={t('pos-center')}
              value={PATH_DEVIATION.at50.toFixed(1)}
              share={PATH_DEVIATION.at50 / PATH_DEVIATION.at0}
              badge={<Badge tone="pass">{t('baseline')}</Badge>}
            />
            <MeasureRow
              label={t('pos-front')}
              value={PATH_DEVIATION.at0.toFixed(1)}
              share={1}
              badge={
                <Badge tone="fail">
                  {fill(t('rise-by'), { pct: risePercent(PATH_DEVIATION.at50, PATH_DEVIATION.at0).toFixed(1) })}
                </Badge>
              }
            />
            <MeasureRow
              label={t('pos-rear')}
              value={PATH_DEVIATION.at100.toFixed(1)}
              share={PATH_DEVIATION.at100 / PATH_DEVIATION.at0}
              badge={
                <Badge tone="fail">
                  {fill(t('rise-by'), { pct: risePercent(PATH_DEVIATION.at50, PATH_DEVIATION.at100).toFixed(1) })}
                </Badge>
              }
            />
          </div>
        </div>
        <p className={styles.note}>{t('study-figure')}</p>
        <p className={styles.note}>{t('study-individual')}</p>
        <p className={styles.note}>
          {t('study-personal')} ({INDIVIDUAL.personalBestTp.toFixed(3)} − {INDIVIDUAL.centerTp.toFixed(3)} ={' '}
          {gain.diff.toFixed(3)} bits/s, {gain.percent.toFixed(1)}%)
        </p>
        <p className={styles.note}>{t('study-effect')}</p>
        <p className={styles.note}>{t('study-tension')}</p>
      </Panel>

      <Panel title={t('humans-title')} note={t('humans-note')}>
        <div className={styles.humans}>
          <div className={styles.humanHead}>
            <span />
            <span>{t('humans-dx')}</span>
            <span>{t('humans-dy')}</span>
          </div>
          {HUMAN_REGRESSIONS.map((row) => (
            <div key={row.id} className={styles.humanRow}>
              <span className={styles.humanId}>
                {row.id} <em>@{row.cpi}</em>
              </span>
              <SlopeBar value={row.dx.slope} />
              <SlopeBar value={row.dy.slope} />
            </div>
          ))}
          <div className={styles.humanRow} data-average>
            <span className={styles.humanId}>Avg</span>
            <SlopeBar value={regressionAverage((row) => row.dx.slope)} />
            <SlopeBar value={regressionAverage((row) => row.dy.slope)} />
          </div>
        </div>
        <p className={styles.note}>{t('humans-line')}</p>
        <p className={styles.note}>{t('humans-192')}</p>
        <p className={styles.note}>{t('humans-footnote')}</p>
      </Panel>

      <Panel
        title={t('robot-title')}
        note={fill(t('robot-note'), {
          planned: ROBOT.plannedLengthMm,
          computed: planLengthMm().toFixed(1),
        })}
      >
        <div className={styles.robotTable}>
          <RobotRow
            label="∞ + 0°"
            physicalKc={ROBOT.avgLengthKc.translateOnly.physical}
            virtualKc={ROBOT.avgLengthKc.translateOnly.virtual}
          />
          <RobotRow
            label="∞ + (−20°~+40°)"
            physicalKc={ROBOT.avgLengthKc.withRotation.physical}
            virtualKc={ROBOT.avgLengthKc.withRotation.virtual}
          />
        </div>
        <p className={styles.note}>{t('robot-check')}</p>
        <p className={styles.note}>{t('robot-catch-357')}</p>
        <p className={styles.note}>{t('robot-catch-69')}</p>
      </Panel>

      <Panel title={t('took-title')}>
        <p className={styles.note}>{t('took-yes')}</p>
        <p className={styles.note}>{t('took-no')}</p>
        <p className={styles.note}>{t('took-mine')}</p>
      </Panel>
    </div>
  );
}

function MeasureRow({
  label,
  value,
  share,
  badge,
}: {
  label: string;
  value: string;
  share: number;
  badge: ReactNode;
}) {
  return (
    <div className={styles.measureRow}>
      <span className={styles.measureLabel}>{label}</span>
      <span className={styles.barWrap}>
        <span className={styles.bar} style={{ width: `${Math.min(share, 1) * 100}%` }} />
      </span>
      <span className={styles.measureValue}>{value}</span>
      {badge}
    </div>
  );
}

/** 기울기 0~1.1을 막대로. 1.0에 눈금을 두어 "세로는 1, 가로는 절반"이 한눈에 읽히게 한다. */
function SlopeBar({ value }: { value: number }) {
  const max = 1.1;
  return (
    <span className={styles.slopeWrap}>
      <span className={styles.slopeBar} style={{ width: `${Math.min(value / max, 1) * 100}%` }} />
      <span className={styles.slopeTick} style={{ left: `${(1 / max) * 100}%` }} />
      <span className={styles.slopeValue}>{value.toFixed(2)}</span>
    </span>
  );
}

function RobotRow({ label, physicalKc, virtualKc }: { label: string; physicalKc: number; virtualKc: number }) {
  return (
    <div className={styles.robotRow}>
      <span className={styles.robotLabel}>{label}</span>
      <span className={styles.robotCell}>
        {physicalKc.toFixed(1)} kc = {kilocountToMm(physicalKc).toFixed(1)}mm
      </span>
      <span className={styles.robotCell}>
        {virtualKc.toFixed(1)} kc = {kilocountToMm(virtualKc).toFixed(1)}mm
      </span>
    </div>
  );
}
