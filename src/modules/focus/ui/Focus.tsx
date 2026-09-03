'use client';

/**
 * 초점 맞추기 페이지.
 *
 * 자율성: 부탁을 걸면 좌표 탐색이 한 걸음씩 스스로 돈다(useSimulation).
 * 사람이 손잡이를 만지면 탐색은 물러난다 - 같은 손잡이를 사람과 계산이
 * 함께 잡고 있으므로, 사람이 잡을 때 계산이 손을 뗀다.
 *
 * 아하 지점: 탐색이 멎은 뒤 "무엇이 움직였나"를 보는 순간. 그때 useReach로
 * 알린다. 논문에서도 열다섯 중 열하나가 질의가 크게 바꾼 특징에서 탐색을
 * 이어 갔다(8.3절) - 그 순간이 이 페이지의 요점이다.
 */

import { useCallback, useMemo, useRef, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import type { Locale } from '../../../core/i18n';
import {
  FEATURES,
  buildCafes,
  clusteredness,
  movements,
  overlap,
  project,
  queryAvailable,
  searchStep,
  startSearch,
  type QueryId,
  type SearchState,
} from '../../../core/featurespace';
import { Panel, PaperCard, SimulationChip, useReach, useSimulation } from '../../../kit';
import { PAPER, RELATED_PAGES, STEP_INTERVAL } from '../config';
import { DEFAULT_WEIGHTS, readState, writeState, type FocusState } from '../state';
import { focusDictionary } from '../dictionary';
import { Scatter } from './Scatter';
import { Knobs } from './Knobs';
import { Query } from './Query';
import { Study } from './Study';
import styles from './focus.module.css';

export function fill(text: string, values: Record<string, string | number>): string {
  return text.replace(/\{(\w+)\}/g, (whole, key: string) =>
    key in values ? String(values[key]) : whole,
  );
}

/** 카페 자료는 한 번만 짓는다. 씨앗이 고정돼 있어 언제나 같다. */
const CAFES = buildCafes();
const GROUP_OF = new Map(CAFES.map((cafe) => [cafe.id, cafe.group as string]));
const groupOf = (id: number) => GROUP_OF.get(id) ?? '?';

export function Focus({ locale }: { locale: Locale }) {
  const dict = focusDictionary[locale];
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const reach = useReach();

  const state = useMemo(
    () => readState(new URLSearchParams(searchParams.toString())),
    [searchParams],
  );

  const update = useCallback(
    (patch: Partial<FocusState>) => {
      const next = { ...state, ...patch };
      // replace를 쓰는 이유: 손잡이 한 칸마다 히스토리가 쌓이면 뒤로가기가 쓸모없어진다.
      router.replace(`${pathname}${writeState(next)}`, { scroll: false });
    },
    [pathname, router, state],
  );

  const projected = useMemo(() => project(CAFES, state.weights), [state.weights]);
  const scoreClusteredness = useMemo(
    () => clusteredness(projected, state.k),
    [projected, state.k],
  );
  const scoreOverlap = useMemo(() => overlap(projected, groupOf), [projected]);

  /** 질의가 재는 값. 무리 찾기는 또렷함, 나머지는 섞임이다. */
  const evaluate = useCallback(
    (weights: readonly number[]) => {
      const points = project(CAFES, weights);
      return state.query === 'findClusters'
        ? clusteredness(points, state.k)
        : overlap(points, groupOf);
    },
    [state.k, state.query],
  );

  const currentScore = state.query === 'findClusters' ? scoreClusteredness : scoreOverlap;
  const [search, setSearch] = useState<SearchState | null>(null);
  // 탐색이 스스로 URL을 바꾸므로, 사람이 만졌는지 구별하려고 마지막 자취를 들고 있는다.
  const lastWritten = useRef<string>('');

  const step = useCallback(() => {
    setSearch((current) => {
      if (current === null || current.settled) return current;
      const next = searchStep(current, state.query, evaluate);
      const encoded = next.weights.join(',');
      lastWritten.current = encoded;
      update({ weights: next.weights });
      // 멎는 순간이 이 페이지의 아하 지점이다.
      if (next.settled) reach();
      return next;
    });
  }, [evaluate, reach, state.query, update]);

  const simulation = useSimulation(step, STEP_INTERVAL);

  const startQuery = useCallback(() => {
    setSearch(startSearch(state.weights, currentScore));
    if (!simulation.running) simulation.toggle();
  }, [currentScore, simulation, state.weights]);

  /** 사람이 손잡이를 만지면 탐색은 물러난다. */
  const setWeights = useCallback(
    (weights: number[]) => {
      if (simulation.running) simulation.stop();
      setSearch(null);
      update({ weights });
    },
    [simulation, update],
  );

  const moved = search ? movements(search) : [];
  const available = queryAvailable(state.query, 3);

  return (
    <div className={styles.layout}>
      <div className={styles.stageColumn}>
        <p className={styles.caveat}>{dict.caveat}</p>
        <Scatter
          dict={dict}
          points={projected}
          groupOf={groupOf}
          k={state.k}
          onK={(k) => update({ k })}
          clusteredness={scoreClusteredness}
          overlap={scoreOverlap}
        />
        <Knobs dict={dict} weights={state.weights} onChange={setWeights} defaults={DEFAULT_WEIGHTS} />
      </div>

      <div className={styles.sideColumn}>
        <Query
          dict={dict}
          locale={locale}
          query={state.query}
          onQuery={(query) => {
            setSearch(null);
            if (simulation.running) simulation.stop();
            update({ query });
          }}
          available={available}
          search={search}
          moved={moved}
          running={simulation.running}
          onRun={startQuery}
          onToggle={simulation.toggle}
          chip={
            <SimulationChip
              running={simulation.running}
              onToggle={simulation.toggle}
              locale={locale}
            />
          }
        />
        <Study dict={dict} />

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

/** 특징 이름을 사전에서 꺼낸다. 없는 이름은 id 그대로 둔다. */
export function featureName(dict: { features: Record<string, { name: string }> }, index: number): string {
  const id = FEATURES[index]?.id ?? '';
  return dict.features[id]?.name ?? id;
}
