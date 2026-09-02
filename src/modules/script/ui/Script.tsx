'use client';

/**
 * 대본 진단 페이지.
 *
 * 화면 상태(견본·라벨·필터·표 단위)는 전부 URL에 실린다 - 라벨을 단 대본이
 * 곧 작업물이라, 링크 하나로 남에게 그대로 넘어가야 하기 때문이다.
 * 붙여 넣은 대본만은 MAX_URL_TEXT를 넘으면 URL에서 빠지고, 그 사실을 화면에 적는다.
 */

import { useCallback, useMemo, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import type { Locale } from '../../../core/i18n';
import {
  DATASET,
  advise,
  composition,
  decodeLabels,
  encodeLabels,
  placement,
  splitScript,
  suggestType,
  type Label,
} from '../../../core/howto';
import { Panel, PaperCard, Segmented } from '../../../kit';
import { MAX_URL_TEXT, PAPER, RELATED_PAGES, SAMPLES } from '../config';
import { PRESET_LABELS, filterToSet, readState, toggleFilter, writeState, type ScriptState } from '../state';
import { scriptDictionary } from '../dictionary';
import { Board } from './Board';
import { Mix } from './Mix';
import { Lane } from './Lane';
import { Counsel } from './Counsel';
import styles from './script.module.css';

export function fill(text: string, values: Record<string, string | number>): string {
  return text.replace(/\{(\w+)\}/g, (whole, key: string) =>
    key in values ? String(values[key]) : whole,
  );
}

export function Script({ locale }: { locale: Locale }) {
  const dict = scriptDictionary[locale];
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const state = useMemo(
    () => readState(new URLSearchParams(searchParams.toString())),
    [searchParams],
  );

  const update = useCallback(
    (patch: Partial<ScriptState>) => {
      const next = { ...state, ...patch };
      // replace를 쓰는 이유: 라벨 하나마다 히스토리가 쌓이면 뒤로가기가 쓸모없어진다.
      router.replace(`${pathname}${writeState(next)}`, { scroll: false });
    },
    [pathname, router, state],
  );

  // URL에 싣기엔 긴 대본은 이 컴포넌트에만 남는다. null이면 URL의 text를 쓴다.
  const [longDraft, setLongDraft] = useState<string | null>(null);
  const text =
    state.sample === 'custom'
      ? longDraft ?? state.text
      : SAMPLES[state.sample].text[locale];

  const sentences = useMemo(() => splitScript(text), [text]);

  const presetEncoded = state.sample === 'custom' ? '' : encodeLabels(SAMPLES[state.sample].labels);
  const labels: Label[] = useMemo(
    () =>
      decodeLabels(
        state.labels === PRESET_LABELS ? presetEncoded : state.labels,
        sentences.length,
      ),
    [state.labels, presetEncoded, sentences.length],
  );

  const setLabel = useCallback(
    (index: number, label: Label) => {
      const next = labels.slice();
      next[index] = label;
      const encoded = encodeLabels(next);
      // 견본의 기본 라벨로 돌아오면 URL도 기본값으로 줄인다.
      update({ labels: encoded === presetEncoded ? PRESET_LABELS : encoded });
    },
    [labels, presetEncoded, update],
  );

  const onText = useCallback(
    (value: string) => {
      if (value.length <= MAX_URL_TEXT) {
        setLongDraft(null);
        update({ sample: 'custom', text: value });
      } else {
        // URL이 깨질 만큼 길면 본문은 여기에만 남긴다. 라벨은 계속 URL에 실린다.
        setLongDraft(value);
        if (state.text !== '') update({ sample: 'custom', text: '' });
      }
    },
    [state.text, update],
  );

  const totalChars = sentences.length > 0 ? sentences[sentences.length - 1].end : 0;
  const suggestions = useMemo(
    () =>
      sentences.map((sentence, i) => {
        if (labels[i] !== null) return null;
        const midpoint = totalChars > 0 ? ((sentence.start + sentence.end) / 2 / totalChars) * 1000 : 0;
        return suggestType(sentence.text, midpoint);
      }),
    [sentences, labels, totalChars],
  );

  const comp = useMemo(() => composition(sentences, labels), [sentences, labels]);
  const lanes = useMemo(() => placement(sentences, labels), [sentences, labels]);
  const checks = useMemo(() => advise(comp), [comp]);
  const visible = filterToSet(state.filter);

  const sampleOptions = [
    { value: 'creating' as const, label: dict.input.samples.creating },
    { value: 'fixing' as const, label: dict.input.samples.fixing },
    { value: 'using' as const, label: dict.input.samples.using },
    { value: 'custom' as const, label: dict.input.samples.custom },
  ];

  return (
    <div className={styles.layout}>
      <div className={styles.workColumn}>
        <Panel title={dict.input.title} note={dict.input.note}>
          <Segmented
            options={sampleOptions}
            value={state.sample}
            onChange={(sample) => {
              setLongDraft(null);
              // 견본을 바꾸면 라벨은 그 견본의 기본으로 돌아간다. 서로 다른 대본의 라벨은 이어지지 않는다.
              update({ sample, labels: PRESET_LABELS, text: '' });
            }}
            dense
          />
          {state.sample === 'custom' && (
            <>
              <textarea
                className={styles.textarea}
                value={text}
                onChange={(event) => onText(event.target.value)}
                placeholder={dict.input.placeholder}
                rows={6}
              />
              {text.length > MAX_URL_TEXT && (
                <p className={styles.urlNote}>{fill(dict.input.urlTooLong, { max: MAX_URL_TEXT })}</p>
              )}
              {sentences.length === 0 && <p className={styles.empty}>{dict.input.emptyCustom}</p>}
            </>
          )}
          <p className={styles.counts}>
            {fill(dict.input.counts, { total: sentences.length, labeled: comp.labeledCount })}
            <span className={styles.splitRule}>{dict.input.splitRule}</span>
          </p>
        </Panel>

        <Board
          dict={dict}
          sentences={sentences}
          labels={labels}
          suggestions={suggestions}
          visible={visible}
          filter={state.filter}
          onToggleFilter={(category) => update({ filter: toggleFilter(state.filter, category) })}
          onResetFilter={() => update({ filter: '' })}
          onLabel={setLabel}
        />
      </div>

      <div className={styles.readColumn}>
        <Mix
          dict={dict}
          comp={comp}
          byType={state.byType}
          onByType={(byType) => update({ byType })}
        />
        <Lane dict={dict} lanes={lanes} hasLabels={comp.labeledCount > 0} />
        <Counsel dict={dict} checks={checks} />

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
          <p className={styles.datasetFacts}>
            {fill(dict.counsel.datasetFacts, {
              videos: DATASET.videos,
              genres: DATASET.genres,
              perGenre: DATASET.perGenre,
              kappa: DATASET.annotatorKappa,
              types: DATASET.meanTypesPerVideo,
            })}
          </p>
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
