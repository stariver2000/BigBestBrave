'use client';

/**
 * 논문이 잰 것. 뒤섞인 결과를 판정보다 앞에 놓는다 - 소과제 2에서는
 * DirectVis가 오히려 성공이 적고 시간도 더 걸렸다는 사실이 먼저 보여야 한다.
 */

import { DESIGN_GOALS, STUDY } from '../../../core/chartspec';
import { Panel } from '../../../kit';
import type { HandlesDictionary } from '../dictionary';
import { fill } from './Handles';
import styles from './handles.module.css';

export function StudyPane({ dict }: { dict: HandlesDictionary }) {
  return (
    <Panel title={dict.study.title}>
      <p className={styles.mixed}>
        {fill(dict.study.mixed, {
          s1d: STUDY.success.subtask1.directVis,
          s1b: STUDY.success.subtask1.baseline,
          t1d: STUDY.time.subtask1.directVis.mean,
          t1b: STUDY.time.subtask1.baseline.mean,
          s2d: STUDY.success.subtask2.directVis,
          s2b: STUDY.success.subtask2.baseline,
        })}
      </p>
      <p className={styles.studyLine}>
        {fill(dict.study.people, {
          n: STUDY.participants,
          ageMin: STUDY.ageRange[0],
          ageMax: STUDY.ageRange[1],
          visMean: STUDY.visExperience.mean,
          visSd: STUDY.visExperience.sd,
          limit: STUDY.taskLimitMinutes,
        })}
      </p>
      <p className={styles.studyLine}>
        {fill(dict.study.prompts, {
          pb: STUDY.prompts.all.baseline.mean,
          pd: STUDY.prompts.all.directVis.mean,
          pp: STUDY.prompts.all.p,
          nonePrompt: STUDY.nonUsers.prompts,
        })}
      </p>
      <p className={styles.studyLine}>
        {fill(dict.study.codeEdits, {
          cb: STUDY.codeEdits.all.baseline.mean,
          cd: STUDY.codeEdits.all.directVis.mean,
          cp: STUDY.codeEdits.all.p,
          noneCode: STUDY.nonUsers.codeEdits,
        })}
      </p>
      <p className={styles.studyLine}>
        {fill(dict.study.directOnly, {
          dm: STUDY.directOnly.directManipulation.subtask1.mean,
          is: STUDY.directOnly.interactionSpec.subtask2.mean,
        })}
      </p>
      <p className={styles.studyLine}>{dict.study.survey}</p>
      <p className={styles.studyLine}>{dict.study.notSignificant}</p>

      <ul className={styles.goalList}>
        {DESIGN_GOALS.map((goal) => (
          <li key={goal.id}>{dict.goals[goal.id]}</li>
        ))}
      </ul>
    </Panel>
  );
}
