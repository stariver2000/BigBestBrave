/**
 * 손으로 고치는 차트 페이지의 상수.
 *
 * 근거가 된 연구: DirectVis: Editing Code-Based Interactive Visualization with
 * Direct Manipulation (Jeongin Park, Mingyu An, Hyunseo Yang, Junhyeong Hwangbo,
 * Min Hyeong Kim, Hyeon Jeon, Jinwook Seo, SNU), IEEE PacificVis 2026,
 * doi:10.1109/pacificvis68791.2026.00014.
 * 전문은 연구실이 직접 올린 hcil.snu.ac.kr/cms/uploads 공개본으로 읽었다.
 *
 * 옮겨 적은 것
 *   - DESIGN_GOALS: 3.1절의 설계 목표 셋(DG1~DG3).
 *   - TASKS: 4.2절의 두 과제와 각 두 소과제.
 *   - STUDY: 4.1·5장의 참가자와 결과 수치. 성공률·완료 시간·상호작용 수는
 *     본문에 인쇄된 그대로다.
 *   - SURVEY_ITEMS: 표 1의 여섯 문항과 이름표.
 *
 * 가져오지 않은 것
 *   - 그림 4·5의 막대값(설문 점수 분포, 시간 그래프). 그림에만 있다.
 *   - DirectVis의 구현과 GPT-4o 프롬프트. 이 페이지에는 언어모델이 없다.
 *   - 논문 화면 갈무리와 참가자 발언.
 */

/** 3.1절의 설계 목표. 이 페이지가 어느 것을 실제로 구현했는지도 함께 둔다. */
export const DESIGN_GOALS = [
  { id: 'dg1', built: true },
  { id: 'dg2', built: true },
  { id: 'dg3', built: true },
] as const;

export type DesignGoalId = (typeof DESIGN_GOALS)[number]['id'];

/** 4.2절의 과제. 각 과제는 모양 바꾸기와 상호작용 만들기 둘로 이뤄졌다. */
export const TASKS = [
  { id: 'task1', chart: 'bar', subtask1: 'groupedToStacked', subtask2: 'clickDim' },
  { id: 'task2', chart: 'line', subtask1: 'multiToSmallMultiples', subtask2: 'hoverTooltip' },
] as const;

/** 5장 결과. 두 조건은 DirectVis와 자연어만 쓰는 기준선이다. */
export const STUDY = {
  participants: 12,
  ageRange: [23, 25],
  males: 10,
  females: 2,
  /** 코딩 경력 분포. 합이 참가자 수와 맞아야 한다. */
  codingYears: { fivePlus: 6, threeToFour: 4, oneToTwo: 2 },
  /** 시각화 경험 자기 보고(5점). */
  visExperience: { mean: 2.6, sd: 1.1, range: [1, 4] },
  /** D3 경험 유무. 합이 참가자 수와 맞아야 한다. */
  d3Experience: { yes: 4, no: 8 },
  sessionMinutes: 60,
  taskLimitMinutes: 20,
  compensationUsd: 10,
  llmBackend: 'GPT-4o',
  /** 소과제별 성공한 사람 수. */
  success: {
    subtask1: { baseline: 10, directVis: 12 },
    subtask2: { baseline: 10, directVis: 9 },
  },
  /** 성공한 시도만 잰 완료 시간(초). */
  time: {
    subtask1: { baseline: { mean: 460.2, sd: 227.2 }, directVis: { mean: 371.2, sd: 243.7 } },
    subtask2: { baseline: { mean: 302.3, sd: 159.0 }, directVis: { mean: 328.2, sd: 186.7 } },
  },
  /** 상호작용 수(자연어·코드 편집·직접 조작·상호작용 명세의 합). */
  totalInteractions: {
    all: { baseline: { mean: 17.58, sd: 11.29 }, directVis: { mean: 11.92, sd: 5.55 }, w: 11.5, p: 0.055 },
    subtask1: { baseline: { mean: 12.58, sd: 10.82 }, directVis: { mean: 7.5, sd: 4.68 }, w: 8.0, p: 0.05 },
    subtask2: { baseline: { mean: 5.0, sd: 4.63 }, directVis: { mean: 4.42, sd: 3.06 }, w: 28.5, p: 0.688 },
  },
  /** 자연어 프롬프트 수. */
  prompts: {
    all: { baseline: { mean: 11.25, sd: 5.79 }, directVis: { mean: 3.67, sd: 2.81 }, w: 5.0, p: 0.01 },
    subtask1: { baseline: { mean: 7.5, sd: 4.76 }, directVis: { mean: 2.67, sd: 1.78 }, w: 9.5, p: 0.05 },
    subtask2: { baseline: { mean: 3.75, sd: 2.42 }, directVis: { mean: 1.0, sd: 1.81 }, w: 4.0, p: 0.05 },
  },
  /** 코드 편집 수. */
  codeEdits: {
    all: { baseline: { mean: 6.33, sd: 7.28 }, directVis: { mean: 3.75, sd: 4.16 }, w: 11.0, p: 0.05 },
    subtask1: { baseline: { mean: 5.08, sd: 7.3 }, directVis: { mean: 3.17, sd: 4.34 }, w: 21.5, p: 0.301 },
    subtask2: { baseline: { mean: 1.25, sd: 2.93 }, directVis: { mean: 0.58, sd: 1.16 }, w: 4.0, p: 0.715 },
  },
  /** DirectVis에서만 쓸 수 있던 두 방식. */
  directOnly: {
    directManipulation: { subtask1: { mean: 1.67, sd: 1.23 }, subtask2: null },
    interactionSpec: { subtask2: { mean: 2.83, sd: 2.86 } },
  },
  /** DirectVis에서 그 방식을 한 번도 안 쓴 사람 수. */
  nonUsers: { prompts: 2, codeEdits: 3 },
  /** 설문에서 유의하게 높았던 항목과 그렇지 않은 항목. 점수는 그림에만 있다. */
  surveySignificant: ['speed', 'easeOfManipulation', 'easeOfUse'],
  surveyNotSignificant: ['intentReflection', 'cognitiveLoad', 'futureUsage'],
} as const;

/** 표 1의 여섯 문항. 이름표는 논문 그대로다. */
export const SURVEY_ITEMS = [
  'speed',
  'intentReflection',
  'easeOfManipulation',
  'cognitiveLoad',
  'easeOfUse',
  'futureUsage',
] as const;

export type SurveyItemId = (typeof SURVEY_ITEMS)[number];

/**
 * 이 페이지가 지어낸 자료. 논문은 날씨·판매 자료를 썼지만 그 자료는 가져오지
 * 않았다. 세 도시 x 네 분기의 작은 표를 여기서 짓는다.
 */
export const SERIES = ['봄', '여름', '가을', '겨울'] as const;
export const CATEGORIES = ['북쪽', '가운데', '남쪽'] as const;

/** 값은 손으로 고른 것이라 늘 같다. 난수를 쓰지 않는다. */
export const VALUES: Record<string, Record<string, number>> = {
  북쪽: { 봄: 32, 여름: 18, 가을: 27, 겨울: 45 },
  가운데: { 봄: 28, 여름: 34, 가을: 30, 겨울: 22 },
  남쪽: { 봄: 21, 여름: 47, 가을: 25, 겨울: 14 },
};
