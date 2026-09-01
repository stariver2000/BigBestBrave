/**
 * 옮겨 적기가 옳았는지 되짚는 시험.
 *
 * 표 1은 행의 합과 열의 합이 모두 본문의 총계와 맞물리는 2x6 표라 전부 센다.
 * 표 2는 행마다 글+댓글=합이 성립한다. 표 4는 본문의 서술(전원이 질문했고,
 * 열두 명이 자료를 만들고 찾았다)이 수에서 그대로 읽혀야 한다.
 */

import { describe, expect, it } from 'vitest';
import {
  CATEGORY_PHASE,
  CATEGORY_USAGE,
  CONSIDERATIONS,
  KEYWORDS,
  MONTHS,
  OBSTACLES,
  PARTICIPANTS,
  REDDIT_COMMENTS,
  REDDIT_EVENTS,
  REDDIT_POSTS,
  REDDIT_TOTALS,
  SUBTASKS,
  busiestMonth,
  categoriesInPhase,
  monthTotal,
  mostDelegated,
  redditSums,
  subtasksOf,
  topKeyword,
} from '../../../src/core/delegation';

describe('표 4 - 열아홉 가지 일', () => {
  it('열아홉 가지가 다섯 갈래에 4·2·3·4·6으로 나뉜다', () => {
    expect(SUBTASKS).toHaveLength(19);
    expect(subtasksOf('planning')).toHaveLength(4);
    expect(subtasksOf('explanation')).toHaveLength(2);
    expect(subtasksOf('input')).toHaveLength(3);
    expect(subtasksOf('output')).toHaveLength(4);
    expect(subtasksOf('evaluation')).toHaveLength(6);
  });

  it('모든 수가 13명을 넘지 않고 0도 아니다', () => {
    for (const subtask of SUBTASKS) {
      expect(subtask.count, subtask.id).toBeGreaterThan(0);
      expect(subtask.count, subtask.id).toBeLessThanOrEqual(PARTICIPANTS);
    }
  });

  it('본문의 서술이 수에서 그대로 읽힌다: 전원이 질문했고 열두 명이 자료를 만들고 찾았다', () => {
    expect(SUBTASKS.find((s) => s.id === 'askQuestions')?.count).toBe(PARTICIPANTS);
    expect(SUBTASKS.find((s) => s.id === 'generateMaterials')?.count).toBe(12);
    expect(SUBTASKS.find((s) => s.id === 'searchResources')?.count).toBe(12);
    // 13명 가운데 전원이 한 일은 질문뿐이다.
    expect(SUBTASKS.filter((s) => s.count === PARTICIPANTS)).toHaveLength(1);
  });

  it('열한 명이 다섯 갈래를 다 썼고 두 명이 네 갈래를 썼다 - 합이 13이다', () => {
    expect(CATEGORY_USAGE.usedAllFive + CATEGORY_USAGE.usedFour).toBe(PARTICIPANTS);
  });

  it('갈래마다 으뜸이 뚜렷하다', () => {
    expect(mostDelegated('explanation').id).toBe('askQuestions');
    expect(mostDelegated('evaluation').id).toBe('requestPracticeProblems');
    expect(mostDelegated('output').id).toBe('conversation');
  });

  it('다섯 갈래가 세 국면에 1·3·1로 놓인다', () => {
    expect(categoriesInPhase('forethought')).toEqual(['planning']);
    expect(categoriesInPhase('performance').sort()).toEqual(['explanation', 'input', 'output']);
    expect(categoriesInPhase('selfReflection')).toEqual(['evaluation']);
    expect(Object.keys(CATEGORY_PHASE)).toHaveLength(5);
  });
});

describe('표 1 - 레딧의 여섯 달', () => {
  it('행의 합이 본문의 총계와 맞는다', () => {
    const sums = redditSums();
    expect(sums.posts).toBe(REDDIT_TOTALS.posts);
    expect(sums.comments).toBe(REDDIT_TOTALS.comments);
    expect(sums.all).toBe(REDDIT_TOTALS.all);
  });

  it('달마다 글+댓글이 표의 달 합과 맞는다 (전수)', () => {
    const stated = { JAN: 95, FEB: 27, MAR: 207, APR: 214, MAY: 634, JUN: 628 } as const;
    for (const month of MONTHS) {
      expect(monthTotal(month), month).toBe(stated[month]);
    }
  });

  it('가장 말이 많던 달은 5월이다 - 듀오링고 선언(4월 28일) 바로 뒤다', () => {
    expect(busiestMonth()).toBe('MAY');
    expect(REDDIT_EVENTS.find((event) => event.kind === 'duolingo')?.month).toBe('APR');
  });

  it('금지가 풀린 3월부터 글이 뛴다', () => {
    // 3월 16일에 AI 글 금지가 풀렸다. 2월까지와 3월부터의 차이가 그 사실을 담는다.
    expect(REDDIT_EVENTS.find((event) => event.kind === 'ruleLifted')?.month).toBe('MAR');
    expect(REDDIT_POSTS.MAR).toBeGreaterThan(REDDIT_POSTS.FEB * 2);
    expect(REDDIT_COMMENTS.MAR).toBeGreaterThan(REDDIT_COMMENTS.FEB * 10);
  });
});

describe('표 2 - 낱말들', () => {
  it('모든 행에서 글+댓글=합이 성립한다 (전수)', () => {
    expect(KEYWORDS).toHaveLength(17);
    for (const keyword of KEYWORDS) {
      expect(keyword.posts + keyword.comments, keyword.word).toBe(keyword.total);
    }
  });

  it('가장 많이 쓰인 낱말은 AI이고, 서비스 이름 가운데는 ChatGPT다', () => {
    expect(topKeyword().word).toBe('AI');
    expect(topKeyword('agent').word).toBe('ChatGPT');
    // AI(725)는 ChatGPT(216)의 세 배가 넘는다 - 사람들은 상표가 아니라 낱말로 말한다.
    expect(topKeyword().total).toBeGreaterThan(topKeyword('agent').total * 3);
  });

  it('자동 삭제를 피하던 바꿔치기 표기 IA가 실제로 있다', () => {
    const ia = KEYWORDS.find((keyword) => keyword.word === 'IA');
    expect(ia?.total).toBe(5);
  });

  it('한 번도 안 나온 이름은 Qwen과 Bard다', () => {
    const zero = KEYWORDS.filter((keyword) => keyword.total === 0).map((keyword) => keyword.word).sort();
    expect(zero).toEqual(['Bard', 'Qwen']);
  });
});

describe('세 고려와 두 걸림돌', () => {
  it('고려는 셋, 걸림돌은 둘이다', () => {
    expect(CONSIDERATIONS).toHaveLength(3);
    expect(OBSTACLES).toHaveLength(2);
    expect(new Set([...CONSIDERATIONS, ...OBSTACLES]).size).toBe(5);
  });
});
