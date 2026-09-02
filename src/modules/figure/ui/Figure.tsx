'use client';

/**
 * 그림 계획 페이지.
 *
 * 화면 상태(계획 항목들, 갈래표에서 고른 칸)는 전부 URL에 실린다 - 짜 놓은
 * 그림 계획이 링크 하나로 공저자에게 넘어가고, "이 칸을 봐 달라"는 링크도 된다.
 */

import { useCallback, useMemo } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import type { Locale } from '../../../core/i18n';
import { CORPUS, summarizePlan, type PlanItem } from '../../../core/taviz';
import { Panel, PaperCard } from '../../../kit';
import { PAPER, RELATED_PAGES } from '../config';
import { readState, writeState, type FigureState } from '../state';
import { figureDictionary } from '../dictionary';
import { Plan, Diagnosis } from './Plan';
import { Matrix } from './Matrix';
import { Corpus } from './Corpus';
import styles from './figure.module.css';

export function fill(text: string, values: Record<string, string | number>): string {
  return text.replace(/\{(\w+)\}/g, (whole, key: string) =>
    key in values ? String(values[key]) : whole,
  );
}

export function Figure({ locale }: { locale: Locale }) {
  const dict = figureDictionary[locale];
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const state = useMemo(
    () => readState(new URLSearchParams(searchParams.toString())),
    [searchParams],
  );

  const update = useCallback(
    (patch: Partial<FigureState>) => {
      const next = { ...state, ...patch };
      // replace를 쓰는 이유: 항목 하나마다 히스토리가 쌓이면 뒤로가기가 쓸모없어진다.
      router.replace(`${pathname}${writeState(next)}`, { scroll: false });
    },
    [pathname, router, state],
  );

  const summary = useMemo(() => summarizePlan(state.items), [state.items]);
  const setItems = useCallback((items: PlanItem[]) => update({ items }), [update]);

  return (
    <div className={styles.layout}>
      <div className={styles.planColumn}>
        <Plan dict={dict} items={state.items} onChange={setItems} />
        <Diagnosis dict={dict} items={state.items} summary={summary} />
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
      </div>

      <div className={styles.readColumn}>
        <Matrix dict={dict} cell={state.cell} onCell={(cell) => update({ cell })} />
        <Corpus dict={dict} />

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

/** 말뭉치 셈 문자열에 공통으로 쓰이는 값들. Corpus와 Diagnosis가 함께 쓴다. */
export const CORPUS_FILL = {
  hits: CORPUS.titleAbstractHits,
  supp: CORPUS.supplementaryHits,
  papers: CORPUS.papers,
  noVis: CORPUS.papersWithoutVisuals,
  visuals: CORPUS.extractedVisuals,
  result: CORPUS.resultVisuals,
  resultPapers: CORPUS.resultPapers,
  core: CORPUS.coreQualitativeVisuals,
  denominator: CORPUS.coreQualitativeDenominator,
} as const;
