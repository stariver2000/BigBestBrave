'use client';

/**
 * 논문이 잰 것. 6장 정량 실험과 8장 사용자 연구의 수치를 그대로 편다.
 * 통찰 네 갈래의 개수는 그림에만 있어 옮기지 않고, 이름과 검정값만 둔다.
 */

import { MODEL_EXPERIMENT, USER_STUDY } from '../../../core/featurespace';
import { Panel } from '../../../kit';
import type { FocusDictionary } from '../dictionary';
import { fill } from './Focus';
import styles from './focus.module.css';

export function Study({ dict }: { dict: FocusDictionary }) {
  const tests = new Map(USER_STUDY.tests.map((test) => [test.id, test]));
  const hypothesis = tests.get('hypothesisCount');
  const confirmation = tests.get('confirmationCount');

  return (
    <Panel title={dict.study.title}>
      <p className={styles.studyLine}>
        {fill(dict.study.model, {
          mean: MODEL_EXPERIMENT.inferenceTimeMean,
          sd: MODEL_EXPERIMENT.inferenceTimeSd,
          low: MODEL_EXPERIMENT.inferenceTimeRange[0],
          high: MODEL_EXPERIMENT.inferenceTimeRange[1],
          datasets: MODEL_EXPERIMENT.datasets,
          minF: MODEL_EXPERIMENT.featureRange[0],
          maxF: MODEL_EXPERIMENT.featureRange[1],
          repeats: MODEL_EXPERIMENT.repeats,
        })}
      </p>
      <p className={styles.studyLine}>
        {fill(dict.study.accuracy, {
          k: MODEL_EXPERIMENT.neighborK,
          tw: `${MODEL_EXPERIMENT.againstHighDim.trustworthiness.mean}±${MODEL_EXPERIMENT.againstHighDim.trustworthiness.sd}`,
          co: `${MODEL_EXPERIMENT.againstHighDim.continuity.mean}±${MODEL_EXPERIMENT.againstHighDim.continuity.sd}`,
          mr: `${MODEL_EXPERIMENT.againstHighDim.mrre.mean}±${MODEL_EXPERIMENT.againstHighDim.mrre.sd}`,
          twU: `${MODEL_EXPERIMENT.againstUmap.trustworthiness.mean}±${MODEL_EXPERIMENT.againstUmap.trustworthiness.sd}`,
          coU: `${MODEL_EXPERIMENT.againstUmap.continuity.mean}±${MODEL_EXPERIMENT.againstUmap.continuity.sd}`,
          mrU: `${MODEL_EXPERIMENT.againstUmap.mrre.mean}±${MODEL_EXPERIMENT.againstUmap.mrre.sd}`,
          mae: `${MODEL_EXPERIMENT.hitRateMae.mean}±${MODEL_EXPERIMENT.hitRateMae.sd}`,
        })}
      </p>
      <p className={styles.studyLine}>
        {fill(dict.study.people, {
          n: USER_STUDY.participants,
          m: USER_STUDY.males,
          f: USER_STUDY.females,
          ageMin: USER_STUDY.ageRange[0],
          ageMax: USER_STUDY.ageRange[1],
          ageMean: USER_STUDY.ageMean,
          ageSd: USER_STUDY.ageSd,
        })}
      </p>
      <p className={styles.studyLine}>
        {fill(dict.study.insights, {
          pH: hypothesis?.p ?? '',
          rH: hypothesis?.r ?? '',
          pC: confirmation?.p ?? '',
          rC: confirmation?.r ?? '',
        })}
      </p>
      <ul className={styles.kindList}>
        {USER_STUDY.insightKinds.map((kind) => (
          <li key={kind}>{dict.study.kinds[kind]}</li>
        ))}
      </ul>
      <p className={styles.studyLine}>{dict.study.followed}</p>
    </Panel>
  );
}
