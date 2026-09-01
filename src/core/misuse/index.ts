/** 오용 코어의 공개 진입점. 다른 계층은 이 파일만 가져다 쓴다. */

export {
  CAVEAT,
  INTERVIEWS,
  RATIONALES,
  REVIEW,
  TASKS,
  TECHNIQUES,
  type Rationale,
  type RationaleId,
  type Task,
  type TaskId,
  type TaskKind,
  type Technique,
  type TechniqueClass,
  type TechniqueId,
} from './config';
export { suitable, suitableTasks, taskCountBy, taskOf, techniqueOf } from './verdict';
