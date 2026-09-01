/**
 * 옮겨 적기가 옳았는지 되짚는 시험.
 *
 * 이 논문의 판은 작아서 전부 셀 수 있다. 일곱 과제 곱하기 네 기법 = 스물여덟 칸을
 * 전수로 훑고, 본문이 문장으로 밝힌 관계(찾아내기 = 국소, 따져보기 = 전역,
 * t-SNE는 절반 넘고 2등의 두 배 넘게)를 붙든다.
 */

import { describe, expect, it } from 'vitest';
import {
  INTERVIEWS,
  RATIONALES,
  REVIEW,
  TASKS,
  TECHNIQUES,
  suitable,
  suitableTasks,
  taskCountBy,
} from '../../../src/core/misuse';

describe('일곱 과제와 두 갈래', () => {
  it('과제는 일곱이고 찾아내기 셋, 따져보기 넷이다', () => {
    expect(TASKS).toHaveLength(7);
    expect(TASKS.filter((task) => task.kind === 'identification')).toHaveLength(3);
    expect(TASKS.filter((task) => task.kind === 'investigation')).toHaveLength(4);
  });

  /** 논문 4.3.3절이 스스로 밝힌 정렬: 찾아내기는 전부 국소에, 따져보기는 전부 전역에 맞는다. */
  it('찾아내기 = 국소, 따져보기 = 전역이 일곱 과제 모두에서 성립한다', () => {
    for (const task of TASKS) {
      expect(task.alignsWith, task.id).toBe(task.kind === 'identification' ? 'local' : 'global');
    }
    expect(taskCountBy('local')).toBe(3);
    expect(taskCountBy('global')).toBe(4);
  });

  it('스물여덟 칸 전수: 국소 기법은 찾아내기에만, 전역 기법은 따져보기에만 맞는다', () => {
    let counted = 0;
    for (const task of TASKS) {
      for (const technique of TECHNIQUES) {
        counted += 1;
        const expected =
          (task.kind === 'identification') === (technique.class === 'local');
        expect(suitable(task.id, technique.id), `${task.id}/${technique.id}`).toBe(expected);
      }
    }
    expect(counted).toBe(28);
  });

  it('기법마다 맞는 과제 수는 갈래로 정해진다', () => {
    expect(suitableTasks('tsne')).toHaveLength(3);
    expect(suitableTasks('umap')).toHaveLength(3);
    expect(suitableTasks('pca')).toHaveLength(4);
    expect(suitableTasks('mds')).toHaveLength(4);
    // 군집 사이 거리는 국소 기법으로 읽으면 안 된다 - 이 논문의 첫 문단이 든 바로 그 예다.
    expect(suitable('clusterDistance', 'tsne')).toBe(false);
    expect(suitable('clusterDistance', 'umap')).toBe(false);
  });
});

describe('문헌 훑기의 셈', () => {
  it('깔때기가 좁아진다: 312에서 136으로', () => {
    expect(REVIEW.retained).toBeLessThan(REVIEW.retrieved);
  });

  it('t-SNE는 절반을 넘고, 2등(UMAP)의 두 배를 넘는다', () => {
    const tsne = TECHNIQUES.find((technique) => technique.id === 'tsne')?.uses ?? 0;
    const umap = TECHNIQUES.find((technique) => technique.id === 'umap')?.uses ?? 0;
    expect(tsne).toBeGreaterThan(REVIEW.retained / 2);
    expect(tsne).toBeGreaterThan(umap * 2);
  });

  it('본문에 수가 없는 기법은 null이고 0으로 채우지 않았다', () => {
    expect(TECHNIQUES.find((technique) => technique.id === 'pca')?.uses).toBeNull();
    expect(TECHNIQUES.find((technique) => technique.id === 'mds')?.uses).toBeNull();
  });

  it('주요 기법 넷과 나머지 열넷이 열여덟을 이룬다', () => {
    expect(REVIEW.majorTechniques + 14).toBe(REVIEW.techniques);
    // 문턱이 앞뒤가 맞다: 주요 기법의 최소(>20)가 나머지의 최대(<5)보다 크다.
    expect(REVIEW.majorMinUses).toBeGreaterThan(REVIEW.othersMaxUses);
  });

  it('근거 없는 논문이 44%다 - 절반 아래지만 셋 중 하나를 넘는다', () => {
    expect(REVIEW.noRationalePercent).toBeLessThan(50);
    expect(REVIEW.noRationalePercent).toBeGreaterThan(33);
  });

  it('일곱 근거 가운데 확장성과 단순성만 t-SNE/UMAP을 정당화하는 데 안 쓰였다', () => {
    expect(RATIONALES).toHaveLength(7);
    const notUsed = RATIONALES.filter((rationale) => !rationale.usedForLocal).map((r) => r.id).sort();
    expect(notUsed).toEqual(['extensibility', 'simplicity']);
  });
});

describe('면접의 셈', () => {
  it('실무자는 시각 분석 여섯과 다른 분야 여섯으로 정확히 나뉜다', () => {
    expect(INTERVIEWS.practitionersVA + INTERVIEWS.practitionersDomain).toBe(INTERVIEWS.practitioners);
  });

  it('전문가는 여덟이다', () => {
    expect(INTERVIEWS.experts).toBe(8);
  });

  it('셈이 사람 수를 넘지 않는다', () => {
    for (const count of [INTERVIEWS.cherryPicked, INTERVIEWS.peerSuggested]) {
      expect(count).toBeLessThanOrEqual(INTERVIEWS.practitioners);
    }
    // 효과를 모르고 고른 넷은 골라 본 여덟의 부분이다.
    expect(INTERVIEWS.cherryPickedBlind).toBeLessThanOrEqual(INTERVIEWS.cherryPicked);
  });
});
