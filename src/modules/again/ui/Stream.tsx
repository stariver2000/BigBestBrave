'use client';

/**
 * 다시 묻는 일이 옆에서 계속 일어나는 자리.
 *
 * 이 페이지에는 표가 다 있었다. 없던 것은 그 표가 가리키는 겪음이다 — 가장 서늘한 숫자는
 * 28%인데, 적어 두는 것만으로는 아무것도 남지 않는다. 그래서 사람들이 실제로 고른 대로
 * 수법을 뽑아 다시 묻는 일이 저절로 이어지고, 옆에서 셈이 쌓인다. 열 번 물어도 일곱 번은
 * 그대로라는 것이 숫자가 아니라 줄줄이 흘러가는 문장으로 보인다.
 *
 * 그 아래에서 당신은 잘 드는 쪽을 골라 볼 수 있다. 굴림은 그대로다 — 수법별 해결률은
 * 논문에 그림으로만 있어 지어낼 수 없다. 달라지는 것은 논문이 숫자로 밝힌 것 하나,
 * 사람들이 매긴 효과 점수다.
 */

import { useRef, useState } from 'react';
import { Button, SimulationChip, useClipboard, useReach, useSimulation } from '../../../kit';
import {
  crowdEffect,
  meanEffect,
  outdoesCrowd,
  pickCode,
  rankCodes,
  resolved,
  resolveRate,
  type Knowledge,
  type TacticCode,
} from '../../../core/dissatisfaction';
import { createTranslator, type Locale } from '../../../core/i18n';
import { BAR, SCALE, STREAM, SUGGEST_LIMIT } from '../config';
import { againDictionary, type AgainKey } from '../dictionary';
import styles from './again.module.css';

interface Turn {
  id: number;
  code: TacticCode;
  solved: boolean;
}

/** 1~10 점수를 0~1 폭으로. 눈금의 아래끝이 1이므로 1을 빼고 나눈다. */
function scoreWidth(score: number): number {
  return (score - SCALE.min) / (SCALE.max - SCALE.min);
}

export function Stream({ locale, knowledge }: { locale: Locale; knowledge: Knowledge | null }) {
  const t = createTranslator(againDictionary, locale);
  const { copy, copiedKey } = useClipboard();
  const reach = useReach();

  const [turns, setTurns] = useState<Turn[]>([]);
  const [asked, setAsked] = useState(0);
  const [solved, setSolved] = useState(0);
  const [codes, setCodes] = useState<TacticCode[]>([]);
  const [outdid, setOutdid] = useState(false);
  const counter = useRef(0);

  const stream = useSimulation(() => {
    counter.current += 1;
    const code = pickCode(Math.random());
    const won = resolved(Math.random(), knowledge);
    setTurns((prev) => [{ id: counter.current, code, solved: won }, ...prev].slice(0, STREAM.keep));
    setAsked((count) => count + 1);
    if (won) setSolved((count) => count + 1);
  }, STREAM.tickMs);

  const ranked = rankCodes(knowledge);
  const suggestions = ranked.filter((entry) => !entry.thin).slice(0, SUGGEST_LIMIT);
  const crowd = crowdEffect();
  const mine = meanEffect(codes);

  const toggleCode = (code: TacticCode) => {
    const next = codes.includes(code) ? codes.filter((x) => x !== code) : [...codes, code];
    setCodes(next);
    // 알아차리는 자리 — 자주 고르는 수법과 잘 드는 수법이 같지 않다는 것을 자기 손으로 넘어섰을 때.
    if (!outdid && outdoesCrowd(next)) {
      setOutdid(true);
      reach();
    }
  };

  const ordered = [...codes].sort(
    (a, b) => ranked.findIndex((e) => e.code === a) - ranked.findIndex((e) => e.code === b),
  );
  const prompt =
    ordered.length === 0 ? '' : [t('ask-lead'), ...ordered.map((code) => t(`s-${code}` as AgainKey))].join(' ');

  return (
    <>
      <div className={styles.streamHead}>
        <SimulationChip running={stream.running} onToggle={stream.toggle} locale={locale} />
        <span className={styles.tally}>
          {t('stream-asked')} <b>{asked}</b> · {t('stream-solved')} <b>{solved}</b> ·{' '}
          <b>{asked === 0 ? '—' : `${Math.round((solved / asked) * 100)}%`}</b>
          <span className={styles.quiet}>
            {' '}
            · {t('stream-paper')} {Math.round(resolveRate(knowledge) * 100)}%
          </span>
        </span>
      </div>

      <ol className={styles.stream}>
        {turns.length === 0 && <li className={styles.quiet}>{t('stream-waiting')}</li>}
        {turns.map((turn) => (
          <li key={turn.id} className={styles.turn} data-solved={turn.solved || undefined}>
            <span className={styles.turnSaid}>{t(`s-${turn.code}` as AgainKey)}</span>
            <span className={styles.turnMark}>{turn.solved ? t('stream-fixed') : t('stream-still')}</span>
          </li>
        ))}
      </ol>
      <p className={styles.note}>{t('stream-mine')}</p>

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

      <div className={styles.compare}>
        <span className={styles.compareCell}>
          <span className={styles.statLabel}>{t('crowd-effect')}</span>
          <span className={styles.compareValue}>{crowd.toFixed(2)}</span>
        </span>
        <span className={styles.compareCell} data-mine>
          <span className={styles.statLabel}>{t('mine-effect')}</span>
          <span className={styles.compareValue}>{mine === null ? '—' : mine.toFixed(2)}</span>
        </span>
      </div>
      {outdid && <p className={styles.outdid}>{t('outdid')}</p>}

      {prompt === '' ? (
        <p className={styles.empty}>{t('ask-empty')}</p>
      ) : (
        <>
          <p className={styles.prompt}>{prompt}</p>
          <Button onClick={() => void copy(prompt, 'prompt')} variant="primary">
            {copiedKey === 'prompt' ? t('ask-copied') : t('ask-copy')}
          </Button>
        </>
      )}
      <p className={styles.note}>{t('ask-mine')}</p>
    </>
  );
}
