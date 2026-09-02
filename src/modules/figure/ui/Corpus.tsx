'use client';

/**
 * 말뭉치 판. 수집 셈과 일치도, 그리고 논문 자체의 어긋남 세 곳을 밝힌다.
 */

import { CORPUS } from '../../../core/taviz';
import { Panel } from '../../../kit';
import { PAPER } from '../config';
import type { FigureDictionary } from '../dictionary';
import { CORPUS_FILL, fill } from './Figure';
import styles from './figure.module.css';

export function Corpus({ dict }: { dict: FigureDictionary }) {
  return (
    <Panel title={dict.corpus.title}>
      <p className={styles.corpusFacts}>{fill(dict.corpus.facts, CORPUS_FILL)}</p>
      <p className={styles.corpusFacts}>
        {fill(dict.corpus.alpha, {
          step: CORPUS.krippendorff.researchStep,
          type: CORPUS.krippendorff.dataType,
          encoding: CORPUS.krippendorff.visualEncoding,
        })}
      </p>
      <ul className={styles.pinList}>
        {dict.corpus.pins.map((pin) => (
          <li key={pin.slice(0, 24)}>{pin}</li>
        ))}
      </ul>
      <p className={styles.siteNote}>
        {dict.corpus.siteNote}{' '}
        <a className={styles.relatedLink} href={PAPER.site} target="_blank" rel="noreferrer">
          taresultvis.github.io
        </a>
      </p>
    </Panel>
  );
}
