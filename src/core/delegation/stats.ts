/**
 * 옮긴 표에서 다시 계산해 내는 값.
 */

import {
  CATEGORY_PHASE,
  KEYWORDS,
  MONTHS,
  PARTICIPANTS,
  REDDIT_COMMENTS,
  REDDIT_POSTS,
  SUBTASKS,
  type CategoryId,
  type Month,
} from './config';

/** 한 갈래의 일들. */
export function subtasksOf(category: CategoryId) {
  return SUBTASKS.filter((subtask) => subtask.category === category);
}

/** 한 갈래에서 가장 많은 사람이 맡겨 본 일. */
export function mostDelegated(category: CategoryId) {
  return [...subtasksOf(category)].sort((a, b) => b.count - a.count)[0];
}

/** 몇 명이 맡겼는가를 13분율로. */
export function shareOf(count: number): number {
  return count / PARTICIPANTS;
}

/** 한 달의 글+댓글. */
export function monthTotal(month: Month): number {
  return REDDIT_POSTS[month] + REDDIT_COMMENTS[month];
}

/** 여섯 달의 글 합 / 댓글 합 / 전체 합. */
export function redditSums() {
  const posts = MONTHS.reduce((sum, month) => sum + REDDIT_POSTS[month], 0);
  const comments = MONTHS.reduce((sum, month) => sum + REDDIT_COMMENTS[month], 0);
  return { posts, comments, all: posts + comments };
}

/** 가장 말이 많던 달. */
export function busiestMonth(): Month {
  return [...MONTHS].sort((a, b) => monthTotal(b) - monthTotal(a))[0];
}

/** 낱말 표에서 가장 많이 쓰인 것. */
export function topKeyword(group?: 'generic' | 'agent') {
  const pool = group ? KEYWORDS.filter((keyword) => keyword.group === group) : [...KEYWORDS];
  return pool.sort((a, b) => b.total - a.total)[0];
}

/** 국면마다의 갈래 수. */
export function categoriesInPhase(phase: 'forethought' | 'performance' | 'selfReflection'): CategoryId[] {
  return (Object.keys(CATEGORY_PHASE) as CategoryId[]).filter((category) => CATEGORY_PHASE[category] === phase);
}
