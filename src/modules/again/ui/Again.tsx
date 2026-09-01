'use client';

/**
 * 다시 묻기 화면.
 *
 * 순서가 이 화면의 전부다. 먼저 무엇이 아쉬웠는지 고르게 하고, 그 다음 "사람들은 이럴 때
 * 이쪽으로 기울었는데 실제로 잘 든 것은 저쪽이었다"를 보여 준 뒤, 마지막에 그래서 뭐라고
 * 다시 물을지를 손에 쥐어 준다. 표를 먼저 펼치면 아무도 끝까지 읽지 않는다.
 *
 * 기본값을 '사실이 틀렸다'로 둔 이유: 일곱 갈래 가운데 기울기와 효과가 어긋나는 유일한
 * 자리다. 첫 화면에서 이미 볼거리가 있어야 한다.
 */

import { useMemo, useState } from 'react';
import { Badge, Button, Panel, PaperCard, Segmented, useClipboard, type SegmentedOption } from '../../../kit';
import {
  DISSATISFACTION,
  DISSATISFACTION_BY_KNOWLEDGE,
  DISSATISFACTION_IDS,
  REPORTED,
  TACTIC_CATEGORY,
  TACTIC_CATEGORY_BY_KNOWLEDGE,
  TACTIC_IDS,
  chiSquare,
  gapFor,
  rankCodes,
  severest,
  shareOf,
  type ContingencyRow,
  type DissatisfactionId,
  type Knowledge,
  type TacticCode,
} from '../../../core/dissatisfaction';
import { createTranslator, type Locale } from '../../../core/i18n';
import { BAR, PAPER, SCALE, SUGGEST_LIMIT } from '../config';
import { againDictionary, type AgainKey } from '../dictionary';
import styles from './again.module.css';

type Group = 'all' | Knowledge;

/** 1~10 점수를 0~1 폭으로. 눈금의 아래끝이 1이므로 1을 빼고 나눈다. */
function scoreWidth(score: number): number {
  return (score - SCALE.min) / (SCALE.max - SCALE.min);
}

export function Again({ locale }: { locale: Locale }) {
  const t = createTranslator(againDictionary, locale);
  const { copy, copiedKey } = useClipboard();

  const [picked, setPicked] = useState<DissatisfactionId[]>(['accuracy']);
  const [group, setGroup] = useState<Group>('all');
  const [codes, setCodes] = useState<TacticCode[]>(['T4', 'T6']);

  const knowledge: Knowledge | null = group === 'all' ? null : group;
  const table = knowledge ? DISSATISFACTION_BY_KNOWLEDGE[knowledge] : DISSATISFACTION;
  const tacticTable = knowledge ? TACTIC_CATEGORY_BY_KNOWLEDGE[knowledge] : TACTIC_CATEGORY;
  const total = knowledge ? REPORTED.knowledgeDissatisfactionTotal[knowledge] : REPORTED.dissatisfactionTotal;

  const focus = severest(picked);
  const gap = focus ? gapFor(focus, knowledge) : null;
  const ranked = useMemo(() => rankCodes(knowledge), [knowledge]);
  const suggestions = useMemo(() => ranked.filter((entry) => !entry.thin).slice(0, SUGGEST_LIMIT), [ranked]);

  const share = shareOf(picked, REPORTED.dissatisfactionTotal);

  // 우리가 옮겨 적은 표에서 논문의 검정값을 되짚는다. 맞는 것과 안 맞는 것이 하나씩 나온다.
  const checks = useMemo(() => {
    const byDissatisfaction = chiSquare(
      DISSATISFACTION_IDS.map(
        (id) =>
          [DISSATISFACTION_BY_KNOWLEDGE.high[id].count, DISSATISFACTION_BY_KNOWLEDGE.low[id].count] as ContingencyRow,
      ),
    );
    const byTactic = chiSquare(
      TACTIC_IDS.map(
        (id) =>
          [
            TACTIC_CATEGORY_BY_KNOWLEDGE.high[id].count,
            TACTIC_CATEGORY_BY_KNOWLEDGE.low[id].count,
          ] as ContingencyRow,
      ),
    );
    return [
      { key: 'check-t5' as AgainKey, ours: byDissatisfaction.statistic, theirs: REPORTED.chiSquareDissatisfaction },
      { key: 'check-t6' as AgainKey, ours: byTactic.statistic, theirs: REPORTED.chiSquareTacticCategory },
    ].map((row) => ({ ...row, agrees: Math.abs(row.ours - row.theirs) < 0.1 }));
  }, []);

  const prompt = useMemo(() => {
    if (codes.length === 0) return '';
    const ordered = [...codes].sort(
      (a, b) => ranked.findIndex((e) => e.code === a) - ranked.findIndex((e) => e.code === b),
    );
    return [t('ask-lead'), ...ordered.map((code) => t(`s-${code}` as AgainKey))].join(' ');
  }, [codes, ranked, t]);

  const groupOptions: SegmentedOption<Group>[] = [
    { value: 'all', label: t('know-all') },
    { value: 'high', label: t('know-high') },
    { value: 'low', label: t('know-low') },
  ];

  const toggle = (id: DissatisfactionId) =>
    setPicked((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  const toggleCode = (code: TacticCode) =>
    setCodes((prev) => (prev.includes(code) ? prev.filter((x) => x !== code) : [...prev, code]));

  return (
    <div className={styles.layout}>
      <PaperCard
        label={t('paper-label')}
        title={PAPER.title}
        meta={`${PAPER.authors} · ${PAPER.affiliation} · ${PAPER.venue} · ${PAPER.fullText}`}
        href={PAPER.link}
        plain={PAPER.plain}
        locale={locale}
      />

      <Panel title={t('pick-title')} note={t('pick-note')}>
        <div className={styles.picker}>
          {DISSATISFACTION_IDS.map((id) => {
            const cell = table[id];
            const on = picked.includes(id);
            return (
              <button
                key={id}
                type="button"
                className={styles.card}
                data-on={on}
                aria-pressed={on}
                onClick={() => toggle(id)}
              >
                <span className={styles.cardName}>{t(`d-${id}` as AgainKey)}</span>
                <span className={styles.cardDesc}>{t(`dd-${id}` as AgainKey)}</span>
                <span className={styles.cardStats}>
                  <span className={styles.stat}>
                    <span className={styles.statLabel}>{t('how-common')}</span>
                    <span className={styles.statValue}>{cell.percent.toFixed(1)}%</span>
                    <span className={styles.statFine}>
                      {cell.count} / {total}
                    </span>
                  </span>
                  <span className={styles.stat}>
                    <span className={styles.statLabel}>{t('how-bad')}</span>
                    <span className={styles.statValue}>{cell.mean === null ? '–' : cell.mean.toFixed(2)}</span>
                    <span className={styles.bar} style={{ width: BAR.width }}>
                      <span
                        className={styles.barFill}
                        style={{ width: `${(cell.mean === null ? 0 : scoreWidth(cell.mean)) * 100}%` }}
                      />
                    </span>
                  </span>
                </span>
              </button>
            );
          })}
        </div>
        {picked.length === 0 && <p className={styles.empty}>{t('pick-empty')}</p>}
      </Panel>

      <Panel title={t('know-title')} note={t('know-note')}>
        <Segmented options={groupOptions} value={group} onChange={setGroup} />
      </Panel>

      <div className={styles.pair}>
        <Panel title={t('gap-title')} note={t('gap-note')}>
          {gap === null ? (
            <p className={styles.empty}>{t('pick-empty')}</p>
          ) : (
            <>
              <p className={styles.focusLine}>{t(`d-${focus}` as AgainKey)}</p>
              <div className={styles.gap}>
                <div className={styles.gapSide} data-kind="people">
                  <span className={styles.gapLabel}>{t('gap-people')}</span>
                  <span className={styles.gapValue}>{t(`t-${gap.preferred}` as AgainKey)}</span>
                  <span className={styles.gapFine}>
                    {gap.preferredEffect === null
                      ? '–'
                      : `${t('effect')} ${gap.preferredEffect.toFixed(2)} / ${SCALE.max}`}
                  </span>
                </div>
                <div className={styles.gapSide} data-kind="worked">
                  <span className={styles.gapLabel}>{t('gap-worked')}</span>
                  <span className={styles.gapValue}>{t(`t-${gap.mostEffective}` as AgainKey)}</span>
                  <span className={styles.gapFine}>
                    {t('effect')} {gap.mostEffectiveEffect.toFixed(2)} / {SCALE.max}
                  </span>
                </div>
              </div>
              <p className={styles.verdict} data-diverge={gap.diverges}>
                {gap.diverges ? t('gap-diverge') : t('gap-same')}
              </p>
              {gap.preferred === 'none' && <p className={styles.note}>{t('gap-giveup')}</p>}
            </>
          )}
        </Panel>

        <Panel title={t('unresolved-title')} note={t('unresolved-body')}>
          <div className={styles.bigPair}>
            <div className={styles.big} data-kind="stuck">
              <span className={styles.bigNumber}>{Math.round(tacticTable.none.percent)}%</span>
              <span className={styles.bigLabel}>{t('nothing-share')}</span>
            </div>
            <div className={styles.big} data-kind="ok">
              <span className={styles.bigNumber}>
                {Math.round(
                  (knowledge === 'high'
                    ? REPORTED.resolvedHigh
                    : knowledge === 'low'
                      ? REPORTED.resolvedLow
                      : REPORTED.resolved) * 100,
                )}
                %
              </span>
              <span className={styles.bigLabel}>{t('resolved-share')}</span>
            </div>
          </div>
          <p className={styles.note}>
            {t('of-522')} {picked.reduce((sum, id) => sum + DISSATISFACTION[id].count, 0)} ·{' '}
            {(share * 100).toFixed(1)}%
          </p>
        </Panel>
      </div>

      <Panel
        title={t('ask-title')}
        note={t('ask-note')}
        actions={
          prompt === '' ? null : (
            <Button onClick={() => void copy(prompt, 'prompt')} variant="primary">
              {copiedKey === 'prompt' ? t('ask-copied') : t('ask-copy')}
            </Button>
          )
        }
      >
        <div className={styles.tactics}>
          {suggestions.map((entry) => {
            const on = codes.includes(entry.code);
            return (
              <button
                key={entry.code}
                type="button"
                className={styles.tactic}
                data-on={on}
                aria-pressed={on}
                onClick={() => toggleCode(entry.code)}
              >
                <span className={styles.tacticHead}>
                  <span className={styles.tacticName}>{t(`c-${entry.code}` as AgainKey)}</span>
                  <span className={styles.tacticScore}>{entry.effect.toFixed(2)}</span>
                </span>
                <span className={styles.bar} style={{ width: BAR.width }}>
                  <span className={styles.barFill} style={{ width: `${scoreWidth(entry.effect) * 100}%` }} />
                </span>
                <span className={styles.tacticFine}>
                  {t(`t-${entry.category}` as AgainKey)} · {entry.count} {t('from-n')}
                  {entry.pooled ? ` · ${t('pooled')}` : ''}
                </span>
              </button>
            );
          })}
        </div>

        {prompt === '' ? (
          <p className={styles.empty}>{t('ask-empty')}</p>
        ) : (
          <p className={styles.prompt}>{prompt}</p>
        )}
        <p className={styles.note}>{t('ask-mine')}</p>
      </Panel>

      <Panel title={t('check-title')} note={t('check-note')}>
        <div className={styles.checks}>
          {checks.map((row) => (
            <div key={row.key} className={styles.check}>
              <span className={styles.checkName}>{t(row.key)}</span>
              <span className={styles.checkPair}>
                <span className={styles.checkCell}>
                  <span className={styles.statLabel}>{t('check-ours')}</span>
                  <span className={styles.checkValue}>{row.ours.toFixed(2)}</span>
                </span>
                <span className={styles.checkCell}>
                  <span className={styles.statLabel}>{t('check-theirs')}</span>
                  <span className={styles.checkValue}>{row.theirs.toFixed(2)}</span>
                </span>
              </span>
              <Badge tone={row.agrees ? 'pass' : 'fail'}>
                {row.agrees ? t('check-match') : t('check-mismatch')}
              </Badge>
            </div>
          ))}
        </div>
        <p className={styles.note}>{t('check-verdict')}</p>
      </Panel>

      <Panel title={t('took-title')}>
        <p className={styles.note}>{t('took-yes')}</p>
        <p className={styles.note}>{t('took-no')}</p>
        <p className={styles.note}>{t('took-mine')}</p>
      </Panel>
    </div>
  );
}
