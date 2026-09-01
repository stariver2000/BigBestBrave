/**
 * CHI 2026 Good Fences에서 옮겨 적은 자리.
 *
 * 근거: Jiwon Song, Aeri Cho, Sihyeon Lee, Kiroong Choe, Jinwook Seo (SNU).
 * "Good Fences Make Good Learning: How Self-Directed Language Learners Navigate
 * LLM Delegation Decisions." CHI '26 (우수논문 명예상).
 * 전문은 연구실이 올려 둔 PDF로 읽었다.
 *
 * 옮긴 것: 그림 2의 과제 분류(다섯 갈래를 짐머만의 세 국면에 놓은 것 - 그림이지만
 * 글로 적힌 분류 구조다. 막대값 같은 잰 수치가 아니다), 표 4의 열아홉 가지 일과
 * 참가자 수(13명 중 몇 명), 표 1(여섯 달의 글·댓글 수)과 표 2(낱말별 수),
 * 세 가지 고려(정확함·홀로서기·진짜다움)와 두 가지 걸림돌(고르기·해내기),
 * 그리고 프롬프트 품이 모든 결정을 누르는 상수라는 관찰.
 *
 * 가져오지 않은 것: 참가자 면접의 통짜 기록, 프로브 시스템 자체(Gemini 기반 다섯
 * 에이전트 - 모델이 필요한 부분이다), 그림 3의 화면.
 *
 * 부호와 방향: count는 13명 가운데 그 일을 한 번이라도 맡겨 본 사람 수다.
 * 많다고 좋은 것도 나쁜 것도 아니다 - 이 논문은 질적 연구라 점수를 매기지 않는다.
 */

/** 짐머만 자기조절학습의 세 국면. 논문의 분류가 이 위에 놓인다. */
export type PhaseId = 'forethought' | 'performance' | 'selfReflection';

/** 다섯 갈래. */
export type CategoryId = 'planning' | 'explanation' | 'input' | 'output' | 'evaluation';

export const CATEGORY_PHASE: Record<CategoryId, PhaseId> = {
  planning: 'forethought',
  explanation: 'performance',
  input: 'performance',
  output: 'performance',
  evaluation: 'selfReflection',
};

export interface Subtask {
  id: string;
  category: CategoryId;
  /** 13명 가운데 이 일을 한 번이라도 LLM에 맡겨 본 사람 수(표 4). */
  count: number;
}

/** 참가자 수. */
export const PARTICIPANTS = 13;

/** 표 4. 다섯 갈래 아래 열아홉 가지 일. */
export const SUBTASKS: readonly Subtask[] = [
  { id: 'requestSuggestions', category: 'planning', count: 6 },
  { id: 'acceptSuggestions', category: 'planning', count: 3 },
  { id: 'declarePlan', category: 'planning', count: 5 },
  { id: 'configureLlm', category: 'planning', count: 7 },
  { id: 'chooseContent', category: 'explanation', count: 5 },
  { id: 'askQuestions', category: 'explanation', count: 13 },
  { id: 'generateMaterials', category: 'input', count: 12 },
  { id: 'searchResources', category: 'input', count: 12 },
  { id: 'generateSummary', category: 'input', count: 6 },
  { id: 'answerQuestions', category: 'output', count: 7 },
  { id: 'demonstrateUnderstanding', category: 'output', count: 5 },
  { id: 'conversation', category: 'output', count: 8 },
  { id: 'writing', category: 'output', count: 5 },
  { id: 'requestFeedback', category: 'evaluation', count: 7 },
  { id: 'requestPracticeProblems', category: 'evaluation', count: 9 },
  { id: 'requestProficiencyAssessment', category: 'evaluation', count: 6 },
  { id: 'selfAssessProficiency', category: 'evaluation', count: 4 },
  { id: 'reflectOnLearningProcess', category: 'evaluation', count: 4 },
  { id: 'evaluateLlmOutput', category: 'evaluation', count: 7 },
];

/** 6.1절의 셈: 열한 명이 다섯 갈래를 다 썼고 나머지 두 명은 네 갈래씩 썼다. */
export const CATEGORY_USAGE = { usedAllFive: 11, usedFour: 2 } as const;

/** 세 가지 고려와 두 가지 걸림돌. 질적 연구라 이름과 뜻만 있고 점수는 없다. */
export const CONSIDERATIONS = ['accuracy', 'independence', 'authenticity'] as const;
export const OBSTACLES = ['selection', 'execution'] as const;

/**
 * 표 1. 레딧 r/languagelearning의 여섯 달(글/댓글 수).
 * 행의 합과 열의 합이 모두 본문의 총계와 맞물린다.
 * 3월 16일에 AI 관련 글 금지가 풀렸고, 4월 28일 듀오링고의 "AI 우선" 선언이 있었다.
 */
export const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN'] as const;
export type Month = (typeof MONTHS)[number];

export const REDDIT_POSTS: Record<Month, number> = { JAN: 14, FEB: 12, MAR: 25, APR: 28, MAY: 55, JUN: 57 };
export const REDDIT_COMMENTS: Record<Month, number> = { JAN: 81, FEB: 15, MAR: 182, APR: 186, MAY: 579, JUN: 571 };
export const REDDIT_TOTALS = { posts: 191, comments: 1614, all: 1805 } as const;

export const REDDIT_EVENTS = [
  { month: 'MAR' as Month, day: 16, kind: 'ruleLifted' as const },
  { month: 'APR' as Month, day: 28, kind: 'duolingo' as const },
];

/**
 * 표 2. 낱말별 글/댓글 수. 각 행에서 posts + comments = total 이다.
 * 'IA'는 공동체 규칙의 자동 삭제를 피하려고 쓰던 바꿔치기 표기다.
 */
export interface Keyword {
  word: string;
  posts: number;
  comments: number;
  total: number;
  group: 'generic' | 'agent';
}

export const KEYWORDS: readonly Keyword[] = [
  { word: 'LLM', posts: 8, comments: 59, total: 67, group: 'generic' },
  { word: 'language model', posts: 0, comments: 6, total: 6, group: 'generic' },
  { word: 'AI', posts: 150, comments: 575, total: 725, group: 'generic' },
  { word: 'IA', posts: 3, comments: 2, total: 5, group: 'generic' },
  { word: 'artificial intelligence', posts: 0, comments: 4, total: 4, group: 'generic' },
  { word: 'chatbot', posts: 6, comments: 24, total: 30, group: 'generic' },
  { word: 'ChatGPT', posts: 40, comments: 176, total: 216, group: 'agent' },
  { word: 'GPT', posts: 18, comments: 41, total: 59, group: 'agent' },
  { word: 'Gemini', posts: 7, comments: 26, total: 33, group: 'agent' },
  { word: 'DeepSeek', posts: 2, comments: 6, total: 8, group: 'agent' },
  { word: 'Claude', posts: 1, comments: 7, total: 8, group: 'agent' },
  { word: 'Copilot', posts: 0, comments: 8, total: 8, group: 'agent' },
  { word: 'Grok', posts: 0, comments: 7, total: 7, group: 'agent' },
  { word: 'Perplexity', posts: 0, comments: 4, total: 4, group: 'agent' },
  { word: 'LLaMA', posts: 0, comments: 1, total: 1, group: 'agent' },
  { word: 'Qwen', posts: 0, comments: 0, total: 0, group: 'agent' },
  { word: 'Bard', posts: 0, comments: 0, total: 0, group: 'agent' },
];
