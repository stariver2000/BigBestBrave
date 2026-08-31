'use client';

/**
 * 코드집.
 *
 * 낱말을 늘어놓지 않고 읽기 규칙별로 묶는다. 이 코드집은 외워야 할 목록이 아니라
 * 규칙이 있는 언어였고, 규칙을 알면 목록에 없는 숫자도 읽히기 때문이다.
 * 목록만 보여 주면 사람들은 외울 것이 많다고 느끼고 덮는다. 규칙을 먼저 보여 주면 읽기 시작한다.
 */

import { groupByRule, repeatedEntries } from '../../../core/pager';
import type { CodebookEntry } from '../../../core/pager';
import type { Locale } from '../../../core/i18n';
import type { BeeperKey } from '../dictionary';
import styles from './beeper.module.css';

export function Codebook({
  locale,
  t,
  onPick,
}: {
  locale: Locale;
  t: (key: BeeperKey) => string;
  /** 코드를 누르면 지금 모드에 맞는 자리로 넣어 준다. 무엇을 넣을지는 화면이 정한다. */
  onPick: (entry: CodebookEntry) => void;
}) {
  const groups = groupByRule();
  const repeated = repeatedEntries();

  return (
    <>
      <p className={styles.rulesLead}>{t('codebook-rules')}</p>

      {groups.map((group) => (
        <section key={group.rule} className={styles.ruleGroup}>
          <h3 className={styles.ruleName}>
            {group.name[locale]}
            <span className={styles.ruleCount}>{group.entries.length}</span>
          </h3>
          <p className={styles.ruleNote}>{group.note[locale]}</p>

          <div className={styles.codeList}>
            {group.entries.map((entry) => (
              <button
                key={entry.digits}
                type="button"
                className={styles.code}
                onClick={() => onPick(entry)}
              >
                <span className={styles.codeDigits}>{entry.digits}</span>
                <span className={styles.codeMeaning}>{entry.meaning[locale]}</span>
                <span className={styles.codeReason}>{entry.reason[locale]}</span>
              </button>
            ))}
          </div>
        </section>
      ))}

      {/* 겹치기는 규칙 하나로 묶이지 않고 규칙들 위에 얹히므로, 표가 아니라 관찰로 적는다. */}
      <p className={styles.hint}>
        {repeated.length}
        {t('codebook-repeat')}
      </p>
    </>
  );
}
