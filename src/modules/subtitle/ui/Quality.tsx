'use client';

/**
 * 품질 점검.
 *
 * 개수만 세면 "문제가 셋 있다"까지만 알고 끝난다. 고치려면 무엇이 문제이고, 왜 문제이며,
 * 어느 자막인지를 알아야 한다. 그래서 종류마다 뜻을 적고, 해당하는 자막의 번호와 실제 값을 붙인다.
 * 값의 단위가 종류마다 다르므로(초당 글자 수, 시간, 폭) 읽는 법도 종류에 따라 다르게 쓴다.
 */

import type { IssueKind, QualityIssue } from '../../../core/subtitle';
import type { SubtitleKey } from '../dictionary';
import styles from './subtitle.module.css';

/** 화면에 늘 이 순서로 낸다. 읽기를 방해하는 정도가 큰 것부터다. */
const ORDER: IssueKind[] = ['overflow', 'too-fast', 'overlap', 'too-short', 'too-long'];

/** 종류마다 값의 뜻이 다르다. 초당 글자 수는 그대로, 시간은 초로, 폭은 넘친 만큼으로 읽는다. */
function formatValue(kind: IssueKind, value: number, maxWidth: number): string {
  if (kind === 'too-fast') return `${value.toFixed(1)} cps`;
  if (kind === 'overflow') return `+${Math.round(value - maxWidth)}px`;
  return `${(value / 1000).toFixed(1)}s`;
}

export function Quality({
  issues,
  maxWidth,
  t,
}: {
  issues: readonly QualityIssue[];
  /** 넘침을 "얼마나 넘쳤는지"로 옮기려면 기준 폭이 필요하다. */
  maxWidth: number;
  t: (key: SubtitleKey) => string;
}) {
  if (issues.length === 0) return <p className={styles.clean}>{t('quality-clean')}</p>;

  const kinds = ORDER.filter((kind) => issues.some((issue) => issue.kind === kind));

  return (
    <div className={styles.issueList}>
      {kinds.map((kind) => {
        const matched = issues.filter((issue) => issue.kind === kind);
        return (
          <section key={kind} className={styles.issueGroup}>
            <p className={styles.issueHead}>
              <span className={styles.issueName}>{t(`issue-${kind}` as SubtitleKey)}</span>
              <span className={styles.issueCount}>{matched.length}</span>
            </p>
            <p className={styles.issueNote}>{t(`issue-${kind}-note` as SubtitleKey)}</p>
            <p className={styles.issueWhere}>
              <span className={styles.issueWhereLabel}>{t('issue-where')}</span>
              {matched.map((issue) => (
                <span key={issue.index} className={styles.issueSpot}>
                  {issue.index + 1}
                  <span className={styles.issueValue}>{formatValue(kind, issue.value, maxWidth)}</span>
                </span>
              ))}
            </p>
          </section>
        );
      })}
    </div>
  );
}
