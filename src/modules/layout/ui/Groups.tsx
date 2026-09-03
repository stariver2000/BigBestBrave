'use client';

/**
 * 논문의 네 갈래 판. 미적 지표 열하나를 그림 1의 행 순서대로 세우고,
 * 이 페이지가 실제로 재는 것과 아닌 것을 구별해 표시한다.
 *
 * 두 눈금이 서로 반대로 움직인 것을 본 사람에게만 "직접 본 것" 절이 열린다 -
 * 겪기 전에 결론부터 읽으면 겪을 것이 없어지기 때문이다.
 */

import { AESTHETICS, FINDINGS, GROUPS, MEASURED_AESTHETICS, METHOD } from '../../../core/graphaes';
import { Panel } from '../../../kit';
import type { LayoutDictionary } from '../dictionary';
import { fill } from './Layout';
import styles from './layout.module.css';

export function Groups({ dict, seenTension }: { dict: LayoutDictionary; seenTension: boolean }) {
  const measured = new Set<string>(MEASURED_AESTHETICS);
  const values = {
    highR: FINDINGS.highestAverage.r,
    mrreR: FINDINGS.highestWithMrre.r,
    g1: FINDINGS.groupRobust.group1,
    g2: FINDINGS.groupRobust.group2,
    ca: FINDINGS.robustCounts.crossingAngle,
    nr: FINDINGS.robustCounts.nodeResolution,
    indep: FINDINGS.independentAbsR,
  };

  return (
    <>
      <Panel title={dict.groups.title} note={dict.groups.note}>
        <ol className={styles.groupList}>
          {GROUPS.map((group) => (
            <li key={group.id} className={styles.group} data-group={group.id}>
              <h3 className={styles.groupName}>
                {dict.groupNames[group.id]}
                <span className={styles.groupOriginal}>{group.name}</span>
              </h3>
              <ul className={styles.metricList}>
                {AESTHETICS.filter((aesthetic) => aesthetic.group === group.id).map((aesthetic) => (
                  <li key={aesthetic.id} className={styles.metric} data-measured={measured.has(aesthetic.id) || undefined}>
                    <span className={styles.metricRow}>{aesthetic.row}</span>
                    {dict.aesthetics[aesthetic.id]}
                    <span className={styles.metricTag}>
                      {measured.has(aesthetic.id) ? dict.groups.measured : dict.groups.notMeasured}
                    </span>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
        <ul className={styles.findingList}>
          {dict.groups.findings.map((finding) => (
            <li key={finding.slice(0, 20)}>{fill(finding, values)}</li>
          ))}
        </ul>
        <p className={styles.methodLine}>
          {METHOD.graphs} graphs · |V| ∈ [{METHOD.nodeRange[0]}, {METHOD.nodeRange[1]}] · |E|/|V| ∈ [
          {METHOD.densityRange[0]}, {METHOD.densityRange[1]}] · {METHOD.layoutAlgorithm} ·{' '}
          {METHOD.variancePercent}% variance
        </p>
      </Panel>

      {seenTension && (
        <Panel title={dict.reveal.title}>
          <p className={styles.revealBody}>
            {fill(dict.reveal.body, { ratioDelta: '↑', stressDelta: '↓' })}
          </p>
          <p className={styles.revealAverage}>{dict.reveal.average}</p>
        </Panel>
      )}
    </>
  );
}
