'use client';

/**
 * 왜곡을 아는 붓 화면.
 *
 * 맨 앞이 그림판이다. 눌린 그림 위에서 직접 붓질하고, 아는 붓을 켜면 붓 주변의
 * 점이 고차원 이웃 관계에 따라 다시 배치되는 것을 눈으로 본다.
 *
 * 무거운 셈(SNN 유사도 180×180)은 자료와 투영이 바뀔 때만 한다. 붓이 움직일 때마다
 * 다시 계산하는 것은 가까움뿐이고, 그것은 이웃 목록만 훑으므로 가볍다.
 */

import { useCallback, useEffect, useMemo, useRef, useState, type PointerEvent } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Badge, Button, Panel, PaperCard, Segmented } from '../../../kit';
import {
  DATA_SHAPE,
  FINDINGS,
  RELOCATION_DELAY_MS,
  STUDIES,
  closenessMap,
  confusionByCluster,
  coveredBy,
  densities,
  findSeeds,
  fitToBox,
  hardestCluster,
  lensAt,
  makeDataset,
  nearestNeighbors,
  neighborCountFor,
  project,
  relocate,
  scoreAgainst,
  snnSimilarity,
  type Point2D,
} from '../../../core/brushing';
import { createTranslator, type Locale } from '../../../core/i18n';
import { BOARD, CLUSTER_COLORS, DATA_SEED, LENS_COLORS, PAPER } from '../config';
import { brushDictionary } from '../dictionary';
import { decodePicked, encodePicked, readState, writeState, type BrushState } from '../state';
import styles from './brush.module.css';

/** 문구의 {자리}를 코어 값으로 채운다. 숫자를 사전에 박아 두면 코어와 어긋나도 아무도 모른다. */
function fill(text: string, values: Record<string, string | number>): string {
  return Object.entries(values).reduce(
    (out, [key, value]) => out.replaceAll(`{${key}}`, String(value)),
    text,
  );
}

/** 자료와 이웃 셈. 씨앗이 고정이라 모듈에서 한 번만 짓는다. */
const DATA = makeDataset(DATA_SEED);
const K = neighborCountFor(DATA.rows.length);
const NEIGHBORS = nearestNeighbors(DATA.rows, K);
const SIMILARITY = snnSimilarity(NEIGHBORS, K);
const DENSITY = densities(SIMILARITY);
const MAX_DENSITY = Math.max(...DENSITY);

export function Brush({ locale }: { locale: Locale }) {
  const t = createTranslator(brushDictionary, locale);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const state = useMemo(() => readState(new URLSearchParams(searchParams.toString())), [searchParams]);

  const update = useCallback(
    (patch: Partial<BrushState>) => {
      const next = { ...state, ...patch };
      // replace를 쓰는 이유: 붓질 한 번마다 히스토리가 쌓이면 뒤로가기가 쓸모없어진다.
      router.replace(`${pathname}${writeState(next)}`, { scroll: false });
    },
    [pathname, router, state],
  );

  /** 원래 자리. 투영이 바뀔 때만 다시 계산한다. */
  const original = useMemo(
    () => fitToBox(project(DATA.rows, state.projection, DATA_SEED), BOARD.size, BOARD.size, BOARD.margin),
    [state.projection],
  );

  const confusion = useMemo(
    () => confusionByCluster(original, DATA.labels, DATA.clusterCount, 6),
    [original],
  );

  // 겨눌 무리의 기본값은 그림에서 가장 파묻힌 무리다 - 보통 붓이 가장 크게 속는 자리다.
  const defaultTarget = useMemo(() => hardestCluster(confusion), [confusion]);
  const target = state.target < DATA.clusterCount ? state.target : defaultTarget;

  const picked = useMemo(() => decodePicked(state.picked, DATA.rows.length), [state.picked]);

  const [painter, setPainter] = useState<Point2D | null>(null);
  const [settled, setSettled] = useState(false);
  const [drawing, setDrawing] = useState(false);
  const boardRef = useRef<SVGSVGElement | null>(null);
  const settleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // 붓이 멈춰 있으면 재배치를 부른다. 논문이 반복 설계로 정한 800ms 그대로다.
  useEffect(() => {
    if (settleTimer.current !== null) clearTimeout(settleTimer.current);
    if (painter === null || state.mode !== 'aware') {
      setSettled(false);
      return;
    }
    // 끌고 있는 동안은 기다리지 않는다 - 논문도 붓질 중에는 재배치를 이어서 한다.
    if (drawing) {
      setSettled(true);
      return;
    }
    setSettled(false);
    settleTimer.current = setTimeout(() => setSettled(true), RELOCATION_DELAY_MS);
    return () => {
      if (settleTimer.current !== null) clearTimeout(settleTimer.current);
    };
  }, [painter, drawing, state.mode]);

  /**
   * 지금 무엇을 기준으로 가까움을 재는가.
   * 이미 칠한 것이 있으면 그것이 기준이고, 없으면 붓 아래에서 찾은 씨앗이 기준이다.
   */
  const anchor = useMemo(() => {
    if (picked.size > 0) return picked;
    if (painter === null) return new Set<number>();
    const covered = coveredBy(original, painter.x, painter.y, BOARD.painterRadius);
    return new Set(findSeeds(covered, DENSITY, SIMILARITY));
  }, [picked, painter, original]);

  const closeness = useMemo(
    () => (anchor.size === 0 ? null : closenessMap(anchor, NEIGHBORS, SIMILARITY)),
    [anchor],
  );

  /** 화면에 그릴 자리. 아는 붓이 자리를 잡았을 때만 옮긴다. */
  const shown = useMemo(() => {
    if (state.mode !== 'aware' || !settled || painter === null || closeness === null) return original;
    const lens = lensAt(painter.x, painter.y, BOARD.painterRadius);
    return original.map((point, index) => relocate(point, closeness[index], lens));
  }, [original, state.mode, settled, painter, closeness]);

  const truth = useMemo(
    () => new Set(DATA.labels.flatMap((label, index) => (label === target ? [index] : []))),
    [target],
  );
  const score = scoreAgainst(truth, picked);

  const toBoard = (event: PointerEvent<SVGSVGElement>): Point2D | null => {
    const rect = boardRef.current?.getBoundingClientRect();
    if (!rect || rect.width === 0) return null;
    return {
      x: ((event.clientX - rect.left) / rect.width) * BOARD.size,
      y: ((event.clientY - rect.top) / rect.height) * BOARD.size,
    };
  };

  /** 지금 보이는 자리를 기준으로 칠한다 - 사람이 보는 것과 집히는 것이 같아야 한다. */
  const paintAt = (point: Point2D) => {
    const covered = coveredBy(shown, point.x, point.y, BOARD.painterRadius);
    if (covered.length === 0) return;
    const next = new Set(picked);
    for (const index of covered) next.add(index);
    if (next.size !== picked.size) update({ picked: encodePicked(next, DATA.rows.length) });
  };

  const onDown = (event: PointerEvent<SVGSVGElement>) => {
    const point = toBoard(event);
    if (point === null) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    setPainter(point);
    setDrawing(true);
    paintAt(point);
  };

  const onMove = (event: PointerEvent<SVGSVGElement>) => {
    const point = toBoard(event);
    if (point === null) return;
    setPainter(point);
    if (drawing) paintAt(point);
  };

  const onUp = () => setDrawing(false);
  const onLeave = () => {
    setDrawing(false);
    setPainter(null);
  };

  const lens = painter !== null ? lensAt(painter.x, painter.y, BOARD.painterRadius) : null;
  const showLens = state.mode === 'aware' && settled && lens !== null;

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
        title={t('board-title')}
        note={t('board-note')}
        actions={
          <div className={styles.actions}>
            <Button onClick={() => update({ picked: '' })}>{t('clear')}</Button>
            <Button variant="primary" onClick={() => update({ reveal: !state.reveal })}>
              {state.reveal ? t('reveal-on') : t('reveal-off')}
            </Button>
          </div>
        }
      >
        <div className={styles.controls}>
          <Segmented
            options={[
              { value: 'plain', label: t('mode-plain') },
              { value: 'aware', label: t('mode-aware') },
            ]}
            value={state.mode}
            onChange={(mode) => update({ mode })}
          />
          <Segmented
            options={[
              { value: 'pca', label: t('proj-pca') },
              { value: 'random', label: t('proj-random') },
            ]}
            value={state.projection}
            onChange={(projection) => update({ projection, picked: '' })}
          />
          <label className={styles.targetPick}>
            <span className={styles.targetLabel}>{t('target-label')}</span>
            <span className={styles.swatchRow}>
              {CLUSTER_COLORS.slice(0, DATA.clusterCount).map((color, index) => (
                <button
                  key={index}
                  type="button"
                  className={styles.targetSwatch}
                  data-active={index === target || undefined}
                  style={{ background: color }}
                  title={fill(t('cluster-name'), { n: index })}
                  aria-label={fill(t('cluster-name'), { n: index })}
                  onClick={() => update({ target: index, picked: '' })}
                />
              ))}
            </span>
          </label>
        </div>

        <svg
          ref={boardRef}
          className={styles.board}
          viewBox={`0 0 ${BOARD.size} ${BOARD.size}`}
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
          onPointerLeave={onLeave}
          role="img"
        >
          {showLens && lens !== null && (
            <>
              <circle
                className={styles.lensRing}
                cx={lens.centerX}
                cy={lens.centerY}
                r={lens.outer}
                stroke={LENS_COLORS.outer}
              />
              <circle
                className={styles.lensRing}
                cx={lens.centerX}
                cy={lens.centerY}
                r={lens.inner}
                stroke={LENS_COLORS.inner}
              />
            </>
          )}

          {shown.map((point, index) => {
            const isPicked = picked.has(index);
            const isTarget = DATA.labels[index] === target;
            // 진하기의 뜻이 국면마다 다르다: 기준이 없으면 고차원 밀도, 있으면 그 기준과의 가까움.
            const weight = closeness === null ? DENSITY[index] / MAX_DENSITY : closeness[index];
            const color = state.reveal ? CLUSTER_COLORS[DATA.labels[index]] : 'var(--bbb-fg-muted)';
            return (
              <circle
                key={index}
                className={styles.point}
                cx={point.x}
                cy={point.y}
                r={isPicked ? BOARD.pointRadius + 1.5 : BOARD.pointRadius}
                fill={isPicked ? 'var(--bbb-accent)' : color}
                fillOpacity={isPicked ? 1 : 0.25 + weight * 0.75}
                stroke={isTarget && state.reveal ? CLUSTER_COLORS[target] : 'none'}
                strokeWidth={isTarget && state.reveal ? 1.4 : 0}
              />
            );
          })}

          {painter !== null && (
            <circle
              className={styles.painter}
              cx={painter.x}
              cy={painter.y}
              r={BOARD.painterRadius}
            />
          )}
        </svg>

        <div className={styles.legend}>
          <span className={styles.legendItem}>
            <i className={styles.dot} style={{ background: 'var(--bbb-accent)' }} /> {t('legend-picked')}
          </span>
          <span className={styles.legendItem}>
            <i className={styles.ring} style={{ borderColor: LENS_COLORS.inner }} /> {t('legend-inner')}
          </span>
          <span className={styles.legendItem}>
            <i className={styles.ring} style={{ borderColor: LENS_COLORS.outer }} /> {t('legend-outer')}
          </span>
        </div>

        <p className={styles.score}>
          {picked.size === 0
            ? t('score-empty')
            : fill(t('score-line'), {
                p: score.precision.toFixed(2),
                r: score.recall.toFixed(2),
                f: score.f1.toFixed(2),
                truth: truth.size,
                hits: Math.round(score.recall * truth.size),
              })}
        </p>
        <p className={styles.note}>
          {fill(t('confusion-line'), { n: target, percent: Math.round(confusion[target] * 100) })}{' '}
          {target === defaultTarget ? t('confusion-hard') : ''}
          {confusion[target] === Math.min(...confusion) ? t('confusion-easy') : ''}
        </p>
        <p className={styles.note}>{t('score-hint')}</p>
        <p className={styles.note}>{t('board-mine')}</p>
      </Panel>

      <Panel title={t('how-title')} note={t('how-note')}>
        <dl className={styles.steps}>
          {([1, 2, 3, 4] as const).map((step) => (
            <div key={step} className={styles.step}>
              <dt>{t(`how-${step}` as 'how-1')}</dt>
              <dd>{t(`how-${step}-body` as 'how-1-body')}</dd>
            </div>
          ))}
        </dl>
        <p className={styles.note}>{t('lens-note')}</p>
        <p className={styles.note}>
          {t('snn-note')}{' '}
          {fill(t('snn-params'), { n: DATA.rows.length, k: K, dims: DATA_SHAPE.dimensions })}
        </p>
      </Panel>

      <Panel title={t('study-title')} note={t('study-note')}>
        <div className={styles.findings}>
          <Badge tone="pass">
            {t('badge-technique')} · F({FINDINGS.study1Technique.df.join(',')}) ={' '}
            {FINDINGS.study1Technique.f}
          </Badge>
          <Badge tone="pass">
            {t('badge-interaction')} · F({FINDINGS.study1Interaction.df.join(',')}) ={' '}
            {FINDINGS.study1Interaction.f}
          </Badge>
          <Badge tone="neutral">
            {t('badge-low')} · F({FINDINGS.lowDistortion.df.join(',')}) = {FINDINGS.lowDistortion.f}, p ={' '}
            {FINDINGS.lowDistortion.p}
          </Badge>
        </div>
        <p className={styles.note}>{t('study-a')}</p>
        <p className={styles.note}>{t('study-b')}</p>
        <p className={styles.note}>{t('study-c')}</p>
        <p className={styles.note}>{t('study-e')}</p>
        <p className={styles.note}>
          {t('study-people')} ({STUDIES.study1.participants} + {STUDIES.study2.participants} ={' '}
          {STUDIES.total})
        </p>
        <p className={styles.note}>{t('study-figure')}</p>
      </Panel>

      <Panel title={t('took-title')}>
        <p className={styles.note}>{t('took-yes')}</p>
        <p className={styles.note}>{t('took-no')}</p>
        <p className={styles.note}>{t('took-mine')}</p>
      </Panel>
    </div>
  );
}
