'use client';

/**
 * 지은이 조언 판.
 *
 * 9.2.3절의 물음(잡담이 너무 많은가, 소목표는 충분한가, 묘사는 넉넉한가)을
 * 점검 목록으로 만들고, 7~8장의 사용자 연구에서 시청자가 과제마다 무엇을
 * 찾았는지를 곁들인다. 판정은 세 갈래 + 없음뿐이고 점수는 논문이 적은 것만 쓴다.
 */

import { CATEGORY_STATS, STUDY, TYPE_STATS, DIFFERENCES, type AdviceCheck, type TypeId, type CategoryId } from '../../../core/howto';
import { Badge, Panel } from '../../../kit';
import type { ScriptDictionary } from '../dictionary';
import { fill } from './Script';
import styles from './script.module.css';

const pct = (value: number) => value.toFixed(1);

/** 없음(missing)의 무게는 점검마다 다르다. 경고가 없는 건 봐야 할 일, 잡담이 없는 건 좋은 일. */
const MISSING_TONE: Record<AdviceCheck['id'], 'pass' | 'fail'> = {
  sideNote: 'pass',
  selfPromotion: 'pass',
  subgoal: 'fail',
  description: 'fail',
  warning: 'fail',
};

export function Counsel({ dict, checks }: { dict: ScriptDictionary; checks: readonly AdviceCheck[] }) {
  const statsOf = (check: AdviceCheck) =>
    check.target.type !== undefined
      ? TYPE_STATS[check.target.type]
      : CATEGORY_STATS[check.target.category as CategoryId];

  const typeName = (id: string) => dict.types[id as TypeId].name;

  return (
    <Panel title={dict.counsel.title} note={dict.counsel.note}>
      <ul className={styles.checkList}>
        {checks.map((check) => {
          const stats = statsOf(check);
          const tone =
            check.verdict === 'missing'
              ? MISSING_TONE[check.id]
              : check.verdict === 'within'
                ? 'pass'
                : 'neutral';
          return (
            <li key={check.id} className={styles.check}>
              <span className={styles.checkQuestion}>{dict.counsel.checks[check.id]}</span>
              <span className={styles.checkNumbers}>
                {fill(dict.counsel.yours, { share: pct(check.yourShare) })}
                {' · '}
                {fill(dict.counsel.corpus, { mean: pct(stats.mean), sd: pct(stats.sd) })}
              </span>
              <Badge tone={tone}>{dict.mix.verdicts[check.verdict]}</Badge>
            </li>
          );
        })}
      </ul>

      <h3 className={styles.noteTitle}>{fill(dict.counsel.studyTitle, { n: STUDY.participants })}</h3>
      <p className={styles.studyLine}>
        {fill(dict.counsel.studySearch, { matched: STUDY.search.matchedOfThree })}
      </p>
      <div className={styles.studyColumns}>
        <div>
          <h4 className={styles.studyHead}>{dict.counsel.studySummarize}</h4>
          <ul className={styles.studyList}>
            {STUDY.summarize.topTypes.map((entry) => (
              <li key={entry.id}>
                {typeName(entry.id)}
                <span className={styles.studyScore}>{fill(dict.counsel.scoreUnit, { score: entry.score })}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className={styles.studyHead}>{dict.counsel.studyFollow}</h4>
          <ul className={styles.studyList}>
            {STUDY.follow.topTypes.slice(0, 6).map((entry) => (
              <li key={entry.id}>
                {typeName(entry.id)}
                <span className={styles.studyScore}>{fill(dict.counsel.scoreUnit, { score: entry.score })}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <p className={styles.studyLine}>
        {fill(dict.counsel.reflectionNote, { score: STUDY.summarize.reflectionScore })}
      </p>

      <p className={styles.discrepancy}>
        {fill(dict.counsel.discrepancy, {
          realTime: DIFFERENCES.byNarration.toolSpec.printedShare.realTime,
          dubbed: DIFFERENCES.byNarration.toolSpec.printedShare.dubbed,
        })}
      </p>
    </Panel>
  );
}
