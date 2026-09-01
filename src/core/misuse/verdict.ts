/**
 * 이 과제에 이 기법을 써도 되는가.
 *
 * 판정은 단순하다: 과제가 기법의 갈래와 맞으면 맞다. 논문 4.3절의 판정을 그대로 옮긴
 * 것이며, 점수나 정도는 없다 - 논문도 그렇게 판정했다.
 *
 * 논문이 스스로 단 단서(CAVEAT)를 잊지 않는다: 이것은 기법 단위의 거친 판정이고,
 * 초매개변수가 결과를 크게 좌우한다. 화면이 이 단서를 함께 싣는다.
 */

import { TASKS, TECHNIQUES, type TaskId, type TechniqueClass, type TechniqueId } from './config';

export function taskOf(id: TaskId) {
  const task = TASKS.find((entry) => entry.id === id);
  if (task === undefined) throw new Error(`unknown task: ${id}`);
  return task;
}

export function techniqueOf(id: TechniqueId) {
  const technique = TECHNIQUES.find((entry) => entry.id === id);
  if (technique === undefined) throw new Error(`unknown technique: ${id}`);
  return technique;
}

/** 이 과제에 이 기법이 맞는가. */
export function suitable(task: TaskId, technique: TechniqueId): boolean {
  return taskOf(task).alignsWith === techniqueOf(technique).class;
}

/** 한 기법이 맞는 과제들. */
export function suitableTasks(technique: TechniqueId): TaskId[] {
  return TASKS.filter((task) => task.alignsWith === techniqueOf(technique).class).map((task) => task.id);
}

/** 갈래별 과제 수. 국소 셋, 전역 넷이어야 한다. */
export function taskCountBy(cls: TechniqueClass): number {
  return TASKS.filter((task) => task.alignsWith === cls).length;
}
