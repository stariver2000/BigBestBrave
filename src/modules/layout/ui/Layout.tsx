'use client';

/**
 * 배치의 두 얼굴 페이지.
 *
 * 자율성: 밀기를 걸면 배치기가 목표를 향해 한 걸음씩 스스로 나아간다
 * (useSimulation). 보이지 않는 탭에서는 멈추고, 사람이 목표나 견본을 바꾸면
 * 물러난다 - 같은 배치를 사람과 계산이 함께 잡고 있기 때문이다.
 *
 * 아하 지점: 정사각으로 민 뒤 두 눈금이 서로 반대로 움직인 것을 보는 순간.
 * 그때 useReach로 알린다. 논문의 그룹 3(가로세로비만 음의 상관)이 눈앞에서
 * 갈리는 자리다.
 */

import { useCallback, useEffect, useMemo, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import type { Locale } from '../../../core/i18n';
import {
  buildGraph,
  initialLayout,
  layoutStep,
  scoreDelta,
  scoreLayout,
  shortestPaths,
  targetDistances,
  type Point,
} from '../../../core/graphaes';
import { Panel, PaperCard, SimulationChip, useReach, useSimulation } from '../../../kit';
import { MAX_STEPS, PAPER, RELATED_PAGES, STEP_INTERVAL } from '../config';
import { readState, writeState, type LayoutState } from '../state';
import { layoutDictionary } from '../dictionary';
import { Stage } from './Stage';
import { Gauges } from './Gauges';
import { Groups } from './Groups';
import styles from './layout.module.css';

export function fill(text: string, values: Record<string, string | number>): string {
  return text.replace(/\{(\w+)\}/g, (whole, key: string) =>
    key in values ? String(values[key]) : whole,
  );
}

export function Layout({ locale }: { locale: Locale }) {
  const dict = layoutDictionary[locale];
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const reach = useReach();

  const state = useMemo(
    () => readState(new URLSearchParams(searchParams.toString())),
    [searchParams],
  );

  const update = useCallback(
    (patch: Partial<LayoutState>) => {
      const next = { ...state, ...patch };
      router.replace(`${pathname}${writeState(next)}`, { scroll: false });
    },
    [pathname, router, state],
  );

  const graph = useMemo(() => buildGraph(state.sample), [state.sample]);
  const target = useMemo(() => targetDistances(shortestPaths(graph)), [graph]);

  /**
   * 걸음 수만으로 배치를 다시 만든다. 링크를 열면 같은 배치가 나오고,
   * 상태에 좌표를 담지 않아도 되므로 URL이 짧게 유지된다.
   */
  /** 바탕 배치: 충실 목표로 base 걸음. 논문의 KK 배치에 해당한다. */
  const basePoints = useMemo(() => {
    let current: Point[] = initialLayout(graph);
    for (let i = 0; i < state.base; i += 1) {
      current = layoutStep(current, graph, target, 'faithful');
    }
    return current;
  }, [graph, target, state.base]);

  const points = useMemo(() => {
    if (state.goal === 'faithful') return basePoints;
    let current = basePoints;
    for (let i = 0; i < state.steps; i += 1) {
      current = layoutStep(current, graph, target, state.goal);
    }
    return current;
  }, [basePoints, graph, target, state.steps, state.goal]);

  // 견줌의 기준은 밀기 전의 바탕 배치다. 원형 시작 배치가 아니라,
  // "잘 그린 배치에서 무엇이 깎였나"를 보여야 하기 때문이다.
  const startPoints = basePoints;
  const scores = useMemo(() => scoreLayout(graph, points, target), [graph, points, target]);
  const startScores = useMemo(
    () => scoreLayout(graph, startPoints, target),
    [graph, startPoints, target],
  );
  const delta = useMemo(() => scoreDelta(startScores, scores), [startScores, scores]);

  const step = useCallback(() => {
    if (state.goal === 'faithful') update({ base: Math.min(MAX_STEPS, state.base + 1) });
    else update({ steps: Math.min(MAX_STEPS, state.steps + 1) });
  }, [state.base, state.goal, state.steps, update]);

  const simulation = useSimulation(step, STEP_INTERVAL);

  // 끝까지 밀면 스스로 멈춘다. 더 밀어도 움직이지 않는 자리다.
  const walked = state.goal === 'faithful' ? state.base : state.steps;
  useEffect(() => {
    if (walked >= MAX_STEPS && simulation.running) simulation.stop();
  }, [walked, simulation]);

  /**
   * 아하 지점: 두 눈금이 서로 반대로 움직인 것을 실제로 본 순간.
   * 걸음이 충분히 쌓였고 미적 하나가 오르는 동안 충실도가 내렸을 때다.
   */
  const [seenTension, setSeenTension] = useState(false);
  useEffect(() => {
    if (seenTension || walked < 8) return;
    const aestheticUp = Object.values(delta.aesthetics).some(
      (value) => value !== null && value > 0.02,
    );
    const faithfulnessDown = Object.values(delta.faithfulness).some((value) => value < -0.02);
    if (aestheticUp && faithfulnessDown) {
      setSeenTension(true);
      reach();
    }
  }, [delta, reach, seenTension, walked]);

  /** 사람이 견본이나 목표를 바꾸면 계산이 물러나고 걸음이 처음으로 돌아간다. */
  const change = useCallback(
    (patch: Partial<LayoutState>) => {
      if (simulation.running) simulation.stop();
      setSeenTension(false);
      // 견본이 바뀌면 바탕부터 다시 짓는다. 목표만 바뀌면 바탕은 지킨다 -
      // 잘 그린 배치를 다른 목표로 미는 것이 이 페이지의 이야기이기 때문이다.
      const resetBase = patch.sample !== undefined && patch.sample !== state.sample;
      update({ ...patch, steps: 0, ...(resetBase ? { base: 0 } : {}) });
    },
    [simulation, state.sample, update],
  );

  return (
    <div className={styles.layout}>
      <div className={styles.stageColumn}>
        <p className={styles.caveat}>{dict.caveat}</p>
        <Stage
          dict={dict}
          graph={graph}
          points={points}
          state={state}
          onChange={change}
          steps={walked}
          running={simulation.running}
          onToggle={simulation.toggle}
          onReset={() => {
            if (simulation.running) simulation.stop();
            setSeenTension(false);
            update({ steps: 0, base: 0 });
          }}
          chip={
            <SimulationChip
              running={simulation.running}
              onToggle={simulation.toggle}
              locale={locale}
            />
          }
        />
        <Gauges dict={dict} scores={scores} delta={delta} steps={walked} />
      </div>

      <div className={styles.sideColumn}>
        <Groups dict={dict} seenTension={seenTension} />

        <Panel title={dict.notes.title}>
          <div className={styles.notes}>
            {([dict.notes.took, dict.notes.left, dict.notes.added] as const).map((block) => (
              <div key={block.title}>
                <h3 className={styles.noteTitle}>{block.title}</h3>
                <ul className={styles.noteList}>
                  {block.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Panel>

        <Panel title={dict.related.title}>
          <ul className={styles.related}>
            {RELATED_PAGES.map((page) => (
              <li key={page.path}>
                <a className={styles.relatedLink} href={page.path}>
                  {dict.related[page.key]}
                </a>
              </li>
            ))}
          </ul>
        </Panel>

        <PaperCard
          label={dict.paperLabel}
          title={PAPER.title}
          meta={`${PAPER.authors} · ${PAPER.affiliation} · ${PAPER.venue}`}
          href={PAPER.link}
          plain={PAPER.plain}
          locale={locale}
        />
      </div>
    </div>
  );
}
