'use client';

/**
 * 손으로 고치는 차트 페이지.
 *
 * 자율성: 시연자가 논문 과제 1(묶음 → 쌓기, 클릭 흐리기)을 한 조작씩 스스로
 * 밟아 보인다(useSimulation). 논문에서는 사람이 시스템에 시연하는데 여기서는
 * 거꾸로다. 사람이 손잡이를 만지면 시연은 물러난다.
 *
 * 아하 지점: 손짓 한 번이 코드 여러 줄을 바꾸는 것을 처음 본 순간.
 * 그때 useReach로 알린다 - 논문의 DG1(코드와 그림의 대응)이 몸에 닿는 자리다.
 */

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import type { Locale } from '../../../core/i18n';
import {
  DEFAULT_SPEC,
  applyEdit,
  changedLines,
  generateCode,
  reachedTarget,
  remainingEdits,
  type Edit,
  type Spec,
} from '../../../core/chartspec';
import { Panel, PaperCard, SimulationChip, useReach, useSimulation } from '../../../kit';
import { PAPER, RELATED_PAGES, STEP_INTERVAL } from '../config';
import { readState, writeState, type HandlesState } from '../state';
import { handlesDictionary } from '../dictionary';
import { ChartStage } from './ChartStage';
import { CodePane } from './CodePane';
import { EditBar } from './EditBar';
import { StudyPane } from './StudyPane';
import styles from './handles.module.css';

export function fill(text: string, values: Record<string, string | number>): string {
  return text.replace(/\{(\w+)\}/g, (whole, key: string) =>
    key in values ? String(values[key]) : whole,
  );
}

export function Handles({ locale }: { locale: Locale }) {
  const dict = handlesDictionary[locale];
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const reach = useReach();

  const state = useMemo(
    () => readState(new URLSearchParams(searchParams.toString())),
    [searchParams],
  );

  const update = useCallback(
    (patch: Partial<HandlesState>) => {
      router.replace(`${pathname}${writeState({ ...state, ...patch })}`, { scroll: false });
    },
    [pathname, router, state],
  );

  const code = useMemo(() => generateCode(state.spec), [state.spec]);
  const [lastEdit, setLastEdit] = useState<{ label: string; lines: number } | null>(null);
  const [sawRipple, setSawRipple] = useState(false);

  /** 조작 하나를 적용하고, 코드가 몇 줄 따라 바뀌었는지 센다. */
  const runEdit = useCallback(
    (edit: Edit, label: string, byPerson: boolean) => {
      const nextSpec = applyEdit(state.spec, edit);
      const lines = changedLines(code, generateCode(nextSpec));
      setLastEdit({ label, lines });
      // 아하 지점: 손짓 하나가 코드 여러 줄을 바꾼 것을 처음 본 순간.
      if (!sawRipple && lines >= 5) {
        setSawRipple(true);
        reach();
      }
      update({ spec: nextSpec });
      return byPerson;
    },
    [code, reach, sawRipple, state.spec, update],
  );

  const pending = useMemo(() => remainingEdits(state.spec), [state.spec]);
  const done = reachedTarget(state.spec);

  const labelOf = useCallback(
    (edit: Edit): string => {
      if (edit.kind === 'toMode') {
        return edit.mode === 'stacked' ? dict.edits.toStacked : dict.edits.toGrouped;
      }
      if (edit.kind === 'setInteraction') {
        if (edit.interaction === 'clickDim') return dict.edits.clickDim;
        if (edit.interaction === 'hoverTooltip') return dict.edits.hoverTooltip;
        return dict.edits.noInteraction;
      }
      if (edit.kind === 'toggleLegend') return dict.edits.toggleLegend;
      if (edit.kind === 'moveSeries') return `${edit.series} →`;
      return '';
    },
    [dict.edits],
  );

  /** 시연 한 걸음: 남은 조작 가운데 첫 것을 밟는다. */
  const step = useCallback(() => {
    const next = remainingEdits(state.spec)[0];
    if (!next) return;
    runEdit(next, labelOf(next), false);
  }, [labelOf, runEdit, state.spec]);

  const simulation = useSimulation(step, STEP_INTERVAL);

  /*
   * 이 페이지의 시연은 스스로 시작하지 않는다. 시작하자마자 돌아 버리면 처음
   * 배치(묶은 막대)를 볼 새가 없어 시연이 보일 것이 없어진다. useSimulation은
   * 마운트 때 스스로 켜지므로, 그 효과가 돈 뒤 한 번 꺼 둔다.
   */
  const armed = useRef(false);
  useEffect(() => {
    if (armed.current) return;
    armed.current = true;
    simulation.stop();
  }, [simulation]);

  // 목표에 닿으면 시연은 스스로 멎는다. 렌더 중이 아니라 효과에서 멈춘다.
  useEffect(() => {
    if (done && simulation.running) simulation.stop();
  }, [done, simulation]);

  /** 사람이 손잡이를 잡으면 시연이 물러난다. */
  const byPerson = useCallback(
    (edit: Edit, label: string) => {
      if (simulation.running) simulation.stop();
      runEdit(edit, label, true);
    },
    [runEdit, simulation],
  );

  const reset = useCallback(() => {
    if (simulation.running) simulation.stop();
    setLastEdit(null);
    update({ spec: DEFAULT_SPEC as Spec, picked: '' });
  }, [simulation, update]);

  return (
    <div className={styles.layout}>
      <div className={styles.workColumn}>
        <p className={styles.caveat}>{dict.caveat}</p>
        <ChartStage
          dict={dict}
          spec={state.spec}
          picked={state.picked}
          onPick={(picked) => update({ picked })}
          onEdit={byPerson}
        />
        <EditBar
          dict={dict}
          spec={state.spec}
          lastEdit={lastEdit}
          onEdit={byPerson}
          onReset={reset}
        />
        <CodePane
          dict={dict}
          code={code}
          picked={state.picked}
          onPick={(picked) => update({ picked })}
        />
      </div>

      <div className={styles.sideColumn}>
        <Panel
          title={dict.demo.title}
          note={dict.demo.note}
          actions={
            <SimulationChip
              running={simulation.running}
              onToggle={simulation.toggle}
              locale={locale}
            />
          }
        >
          <p className={styles.demoLine}>
            {fill(dict.demo.stepLine, { done: 2 - pending.length, total: 2 })}
          </p>
          {done ? (
            <>
              <p className={styles.demoDone}>{dict.demo.done}</p>
              <p className={styles.handOver}>{dict.demo.handOver}</p>
            </>
          ) : (
            <button type="button" className={styles.demoButton} onClick={simulation.toggle}>
              {simulation.running ? dict.demo.stop : dict.demo.run}
            </button>
          )}
        </Panel>

        <StudyPane dict={dict} />

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
