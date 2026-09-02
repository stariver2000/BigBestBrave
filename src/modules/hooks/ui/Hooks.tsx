'use client';

/**
 * 엉킨 갈고리 화면.
 *
 * 맨 앞이 찾기 판이다. 심긴 견본(또는 붙여 넣은 코드)에서 의심 요소를 표시하고,
 * 그림으로 건너가 정답을 켜면 논문의 잣대(정밀도·재현율·F1)로 채점된다.
 * 상태(견본·본문·표시·보기·정답)는 전부 URL에 실려 링크로 넘어간다.
 *
 * 견본을 바꾸면 표시와 정답을 지운다 - 코드 한 글자짜리 표시가 다른 그래프에서
 * 엉뚱한 요소를 가리키게 되기 때문이다.
 */

import { useCallback, useMemo, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Badge, Button, Panel, PaperCard, Segmented } from '../../../kit';
import {
  LLM_COMPARISON,
  TABLE2,
  analyze,
  codesToIds,
  idToCode,
  parseApp,
  scoreSelection,
  selectableItems,
  truthIds,
  type AntiPatternId,
  type Finding,
} from '../../../core/hookgraph';
import { createTranslator, type Locale } from '../../../core/i18n';
import { MAX_CUSTOM_LENGTH, MAX_URL_TEXT, NODE_COLORS, PAPER, SAMPLES } from '../config';
import { hooksDictionary, type HooksKey } from '../dictionary';
import { readState, writeState, type HooksState } from '../state';
import { Diagram } from './Diagram';
import styles from './hooks.module.css';

/** 문구의 {자리}를 코어 값으로 채운다. 숫자를 사전에 박아 두면 코어와 어긋나도 아무도 모른다. */
function fill(text: string, values: Record<string, string | number>): string {
  return Object.entries(values).reduce(
    (out, [key, value]) => out.replaceAll(`{${key}}`, String(value)),
    text,
  );
}

/** 논문식 소수 표기: 0.968 → .968. */
function dot3(value: number): string {
  return value.toFixed(3).replace(/^0\./, '.');
}

const PATTERN_KEYS: Record<AntiPatternId, { name: HooksKey; def: HooksKey }> = {
  unreferenced: { name: 'p-unreferenced', def: 'pd-unreferenced' },
  drilling: { name: 'p-drilling', def: 'pd-drilling' },
  effectParent: { name: 'p-effectParent', def: 'pd-effectParent' },
};

function findingKey(finding: Finding): HooksKey {
  return `f-${finding.detail}` as HooksKey;
}

export function Hooks({ locale }: { locale: Locale }) {
  const t = createTranslator(hooksDictionary, locale);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const state = useMemo(() => readState(new URLSearchParams(searchParams.toString())), [searchParams]);

  const update = useCallback(
    (patch: Partial<HooksState>) => {
      const next = { ...state, ...patch };
      // replace를 쓰는 이유: 표시 하나마다 히스토리가 쌓이면 뒤로가기가 쓸모없어진다.
      router.replace(`${pathname}${writeState(next)}`, { scroll: false });
    },
    [pathname, router, state],
  );

  // URL에 싣기엔 긴 코드는 이 컴포넌트에만 남는다. null이면 URL의 text를 쓴다.
  const [longDraft, setLongDraft] = useState<string | null>(null);
  const source = state.sample === 'custom' ? longDraft ?? state.text : SAMPLES[state.sample];

  const parsed = useMemo(() => parseApp(source), [source]);
  const graph = useMemo(() => analyze(parsed), [parsed]);
  const items = useMemo(() => selectableItems(graph), [graph]);
  const truth = useMemo(() => truthIds(graph.findings), [graph]);

  const pickedIds = useMemo(() => codesToIds(items, state.picked), [items, state.picked]);
  const pickedSet = useMemo(() => new Set(pickedIds), [pickedIds]);
  const truthSet = useMemo(() => new Set(truth), [truth]);
  const score = scoreSelection(truth, pickedIds);

  const togglePick = (id: string) => {
    const next = pickedIds.includes(id) ? pickedIds.filter((other) => other !== id) : [...pickedIds, id];
    const codes = next.map((pickedId) => idToCode(items, pickedId) ?? '').join('');
    update({ picked: codes });
  };

  const changeSample = (sample: HooksState['sample']) => {
    setLongDraft(null);
    update({ sample, picked: '', warn: false, text: '' });
  };

  const changeText = (value: string) => {
    const text = value.slice(0, MAX_CUSTOM_LENGTH);
    if (text.length <= MAX_URL_TEXT) {
      setLongDraft(null);
      update({ text, picked: '', warn: false });
    } else {
      setLongDraft(text);
      update({ text: '', picked: '', warn: false });
    }
  };

  const componentsOf = (name: string) => items.filter((item) => item.component === name);

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
            <Button onClick={() => update({ picked: '' })}>{t('reset')}</Button>
            <Button variant="primary" onClick={() => update({ warn: !state.warn })}>
              {state.warn ? t('unreveal') : t('reveal')}
            </Button>
          </div>
        }
      >
        <div className={styles.controls}>
          <Segmented
            options={[
              { value: 'planted', label: t('sample-planted') },
              { value: 'clean', label: t('sample-clean') },
              { value: 'custom', label: t('sample-custom') },
            ]}
            value={state.sample}
            onChange={changeSample}
          />
          <Segmented
            options={[
              { value: 'code', label: t('view-code') },
              { value: 'graph', label: t('view-graph') },
            ]}
            value={state.view}
            onChange={(view) => update({ view })}
          />
        </div>

        {state.sample === 'custom' && (
          <>
            <textarea
              className={styles.editor}
              value={source}
              onChange={(event) => changeText(event.target.value)}
              placeholder={t('custom-placeholder')}
              spellCheck={false}
            />
            <p className={styles.note}>
              {fill(t('custom-note'), { max: MAX_CUSTOM_LENGTH, url: MAX_URL_TEXT })}
            </p>
            {parsed.errors.length > 0 && (
              <p className={styles.parseErrors}>
                {t('parse-error-label')}: {parsed.errors.join(' · ')}
              </p>
            )}
          </>
        )}

        {state.view === 'code' ? (
          <div className={styles.codeGrid}>
            <pre className={styles.code}>{source}</pre>
            <div className={styles.chipColumn}>
              <p className={styles.note}>{t('pick-note')}</p>
              {graph.components.map((component) => (
                <div key={component.name} className={styles.chipGroup}>
                  <span className={styles.chipComponent}>{component.name}</span>
                  <span className={styles.chipRow}>
                    {componentsOf(component.name).map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        className={styles.chip}
                        data-picked={pickedSet.has(item.id) || undefined}
                        data-flagged={(state.warn && truthSet.has(item.id)) || undefined}
                        onClick={() => togglePick(item.id)}
                      >
                        <i className={styles.dot} style={{ background: NODE_COLORS[item.kind] }} />
                        {item.name}
                      </button>
                    ))}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <>
            <Diagram graph={graph} picked={pickedSet} truth={truthSet} warn={state.warn} onToggle={togglePick} />
            <div className={styles.legend}>
              <span className={styles.legendItem}>
                <i className={styles.dot} style={{ background: NODE_COLORS.state }} /> {t('legend-state')}
              </span>
              <span className={styles.legendItem}>
                <i className={styles.dot} style={{ background: NODE_COLORS.prop }} /> {t('legend-prop')}
              </span>
              <span className={styles.legendItem}>
                <i className={styles.dot} style={{ background: NODE_COLORS.effect }} /> {t('legend-effect')}
              </span>
              <span className={styles.legendItem}>
                <i className={styles.dashSwatch} /> {t('legend-setter')}
              </span>
              {state.warn && (
                <span className={styles.legendItem}>
                  <i className={styles.dot} style={{ background: NODE_COLORS.warn }} /> {t('legend-warn')}
                </span>
              )}
            </div>
          </>
        )}

        <p className={styles.pickedLine}>{fill(t('picked-count'), { n: pickedIds.length })}</p>

        {state.warn && (
          <div className={styles.scoreBlock}>
            <p className={styles.scoreLine}>
              {fill(t('score-line'), {
                p: score.precision.toFixed(2),
                r: score.recall.toFixed(2),
                f: score.f1.toFixed(2),
                truth: truth.length,
                hits: score.hits,
              })}
            </p>
            <p className={styles.truthTitle}>{t('truth-title')}</p>
            {graph.findings.length === 0 ? (
              <p className={styles.note}>{t('no-findings')}</p>
            ) : (
              <ul className={styles.findings}>
                {graph.findings.map((finding, index) => (
                  <li key={index} className={styles.finding}>
                    {fill(t(findingKey(finding)), {
                      component: finding.component,
                      item: finding.item,
                      origin: finding.origin?.component ?? finding.component,
                      path: (finding.path ?? []).join(' → '),
                    })}
                  </li>
                ))}
              </ul>
            )}
            <p className={styles.note}>{t('score-caveat')}</p>
          </div>
        )}
      </Panel>

      <Panel title={t('patterns-title')} note={t('patterns-note')}>
        <dl className={styles.patterns}>
          {(Object.keys(PATTERN_KEYS) as AntiPatternId[]).map((id) => (
            <div key={id} className={styles.pattern}>
              <dt>{t(PATTERN_KEYS[id].name)}</dt>
              <dd>{t(PATTERN_KEYS[id].def)}</dd>
            </div>
          ))}
        </dl>
        <p className={styles.note}>{t('patterns-so')}</p>
        <p className={styles.note}>{t('patterns-projects')}</p>
      </Panel>

      <Panel title={t('study-title')} note={t('study-note')}>
        <div className={styles.studyRows}>
          {(Object.keys(PATTERN_KEYS) as AntiPatternId[]).map((id) => (
            <div key={id} className={styles.studyRow}>
              <p className={styles.studyPattern}>{t(PATTERN_KEYS[id].name)}</p>
              <F1Bar label={t('tool-hooklens')} value={TABLE2[id].hooklens.f1} strong />
              <F1Bar label={t('tool-vscode')} value={TABLE2[id].vscode.f1} />
              <p className={styles.studyPr}>
                {fill(t('study-pr'), {
                  hp: dot3(TABLE2[id].hooklens.precision),
                  vp: dot3(TABLE2[id].vscode.precision),
                  hr: dot3(TABLE2[id].hooklens.recall),
                  vr: dot3(TABLE2[id].vscode.recall),
                })}
              </p>
            </div>
          ))}
        </div>
        <p className={styles.note}>{t('study-sus')}</p>
        <p className={styles.note}>{t('study-groups')}</p>
        <p className={styles.note}>{t('study-ages')}</p>
        <p className={styles.note}>{t('study-figure')}</p>
      </Panel>

      <Panel title={t('llm-title')} note={t('llm-note')}>
        <div className={styles.llmChips}>
          {LLM_COMPARISON.assistants.map((assistant) => (
            <Badge key={assistant.model} tone="neutral">
              {assistant.tool} · {assistant.model}
            </Badge>
          ))}
        </div>
        <p className={styles.note}>{t('llm-result')}</p>
        <p className={styles.note}>{t('llm-examples')}</p>
        <p className={styles.note}>{t('llm-figure')}</p>
        <p className={styles.note}>{t('llm-irony')}</p>
      </Panel>

      <Panel title={t('took-title')}>
        <p className={styles.note}>{t('took-yes')}</p>
        <p className={styles.note}>{t('took-no')}</p>
        <p className={styles.note}>{t('took-mine')}</p>
      </Panel>
    </div>
  );
}

function F1Bar({ label, value, strong = false }: { label: string; value: number; strong?: boolean }) {
  return (
    <div className={styles.f1Row}>
      <span className={styles.f1Label}>{label}</span>
      <span className={styles.barWrap}>
        <span className={styles.bar} data-strong={strong || undefined} style={{ width: `${value * 100}%` }} />
      </span>
      <span className={styles.f1Value}>{value.toFixed(3).replace(/^0\./, '.')}</span>
    </div>
  );
}
