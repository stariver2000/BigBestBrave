'use client';

/**
 * 근거 논문 카드.
 *
 * 제목·저자·발표처는 출처를 밝히기 위한 것이고, 그 아래 네 줄은 읽는 사람을 위한 것이다.
 * 논문 제목만 걸어 두면 "어려운 것에 기대고 있다"는 인상만 남고 무슨 이야기인지는 전해지지 않는다.
 * 그래서 어떤 페이지에서든 같은 자리에, 같은 네 줄이 오도록 부품으로 만들었다.
 */

import type { Locale } from '../../core/i18n';
import { PLAIN_LABELS, type PlainPaper } from './model';
import styles from '../ui/ui.module.css';

export function PaperCard({
  label,
  title,
  meta,
  href,
  plain,
  locale,
}: {
  /** '근거 논문' 같은 머리말. 페이지마다 부르는 말이 조금씩 달라 밖에서 받는다. */
  label: string;
  title: string;
  /** 저자·소속·발표처를 한 줄로 이은 것. */
  meta: string;
  href: string;
  plain: PlainPaper;
  locale: Locale;
}) {
  const rows = (['problem', 'work', 'took', 'left'] as const).map((key) => ({
    key,
    term: PLAIN_LABELS[key][locale],
    text: plain[key][locale],
  }));

  return (
    <section className={styles.paper}>
      <p className={styles.paperHead}>
        <span className={styles.paperLabel}>{label}</span>
        <a className={styles.paperTitle} href={href} target="_blank" rel="noreferrer">
          {title}
        </a>
        <span className={styles.paperMeta}>{meta}</span>
      </p>

      <p className={styles.plainHeading}>{PLAIN_LABELS.heading[locale]}</p>
      <dl className={styles.plainList}>
        {rows.map((row) => (
          <div key={row.key} className={styles.plainRow}>
            <dt className={styles.plainTerm}>{row.term}</dt>
            <dd className={styles.plainText}>{row.text}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
