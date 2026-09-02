/**
 * PacificVis 2026 HookLens에서 옮겨 적은 자리.
 *
 * 근거: Suyeon Hwang (SNU·Samsung), Minkyu Kweon, Jeongmin Rhee, Soohyun Lee,
 * Seokhyeon Park, Seokweon Jung, Hyeon Jeon, Jinwook Seo (SNU).
 * "HookLens: Visual Analytics for Understanding React Hooks Structures."
 * IEEE PacificVis 2026. 전문은 arXiv:2602.17891v2로 읽었다.
 *
 * 옮긴 것: 세 앤티패턴의 정의(2.2절), 표 1(두 프로젝트), 표 2(정밀도·재현율·F1),
 * 실험 설계의 수 전부, SUS 76.7, LLM 비교(8장)의 본문 서술.
 * 그림 2(훅별 파이 값)와 그림 6·7(막대값)은 그림에만 있어 옮기지 않았다.
 *
 * 붙든 것: 참가자 나이 표기 두 곳(21-30 [25±9], 22-31 [27±5])은 범위가 그 표준편차를
 * 허용하지 않는다 - 범위 폭이 w면 표본 표준편차의 최대값은 (w/2)·√(n/(n-1))이다.
 * 각각 4.70과 4.81이 상한이므로 9와 5는 수학적으로 불가능하다. 오기로 보이며
 * 고치지 않고 그대로 옮겨 적었다. maxSampleSd()가 이 상한을 계산한다.
 */

/** 앤티패턴 세 갈래(2.2절). 화면과 검출기가 같은 id를 쓴다. */
export const ANTI_PATTERNS = ['unreferenced', 'drilling', 'effectParent'] as const;
export type AntiPatternId = (typeof ANTI_PATTERNS)[number];

/** 스택오버플로 2020~2024 분석. 개별 훅의 몫은 그림 2에만 있어 합만 옮겼다. */
export const HOOK_SHARE = {
  stateAndEffectPercent: 82,
  fromYear: 2020,
  toYear: 2024,
} as const;

/** 예비 면접과 반복 설계 회기. 나이 표기는 논문 그대로다(위 머리말의 붙든 것 참조). */
export const DESIGN_SESSIONS = {
  preliminary: { n: 3, ages: [28, 30, 34], maxMinutes: 35, minYearsExperience: 2 },
  feedback: { n: 8, ageMin: 22, ageMax: 31, printedAgeMean: 27, printedAgeSd: 5 },
} as const;

/** 사용자 실험의 설계(7장). */
export const STUDY = {
  participants: 12,
  males: 8,
  females: 4,
  ageMin: 21,
  ageMax: 30,
  printedAgeMean: 25,
  printedAgeSd: 9,
  noviceCount: 6,
  intermediateCount: 6,
  noviceMaxYears: 2,
  taskMinutes: 10,
  compensationUsd: 10,
  susScore: 76.7,
  susBenchmark: 68,
} as const;

export interface ProjectRow {
  id: string;
  jsxFiles: number;
  components: number;
  linesOfCode: number;
  antiPatterns: Record<AntiPatternId, number>;
}

/** 표 1. 실험에 쓰인 두 오픈소스 프로젝트. */
export const PROJECTS: readonly ProjectRow[] = [
  {
    id: 'Confides',
    jsxFiles: 29,
    components: 25,
    linesOfCode: 2707,
    antiPatterns: { unreferenced: 41, drilling: 11, effectParent: 2 },
  },
  {
    id: 'paper_vis',
    jsxFiles: 30,
    components: 33,
    linesOfCode: 3937,
    antiPatterns: { unreferenced: 32, drilling: 11, effectParent: 2 },
  },
];

export interface MetricTriple {
  precision: number;
  precisionSd: number;
  recall: number;
  recallSd: number;
  f1: number;
  f1Sd: number;
}

/** 표 2. 앤티패턴별 검출 성적(평균 ± 표준편차). 전부 p ≪ .01 (Mann-Whitney U). */
export const TABLE2: Record<AntiPatternId, { hooklens: MetricTriple; vscode: MetricTriple }> = {
  unreferenced: {
    hooklens: { precision: 0.968, precisionSd: 0.098, recall: 0.509, recallSd: 0.311, f1: 0.614, f1Sd: 0.272 },
    vscode: { precision: 0.669, precisionSd: 0.322, recall: 0.147, recallSd: 0.111, f1: 0.219, f1Sd: 0.153 },
  },
  drilling: {
    hooklens: { precision: 0.938, precisionSd: 0.121, recall: 0.568, recallSd: 0.255, f1: 0.669, f1Sd: 0.213 },
    vscode: { precision: 0.492, precisionSd: 0.457, recall: 0.197, recallSd: 0.243, f1: 0.264, f1Sd: 0.294 },
  },
  effectParent: {
    hooklens: { precision: 0.889, precisionSd: 0.283, recall: 0.792, recallSd: 0.32, f1: 0.817, f1Sd: 0.284 },
    vscode: { precision: 0.181, precisionSd: 0.369, recall: 0.167, recallSd: 0.312, f1: 0.16, f1Sd: 0.316 },
  },
};

/**
 * LLM 비교(8장). 그림 7의 막대값은 옮기지 않았고, 본문이 말로 적은 서열만 옮겼다:
 * GPT-5를 뺀 나머지는 VS Code 기준선보다도 낮았고, GPT-5도 정밀도에서
 * HookLens보다 통계적으로 낮았다(p ≪ .01).
 */
export const LLM_COMPARISON = {
  trialsPerAssistant: 6,
  assistants: [
    { tool: 'Claude Code', model: 'claude-sonnet-4' },
    { tool: 'Claude Code', model: 'claude-opus-4.1' },
    { tool: 'Codex CLI', model: 'GPT-5' },
    { tool: 'Gemini CLI', model: 'gemini-2.5-pro' },
  ],
  /** 그림 8의 두 사례: 중첩하지 않는 컴포넌트를 부모로 잘못 짚은 것과, 놓친 드릴링 둘. */
  missedDrillingProps: ['confidenceRange', 'confidenceOn'],
} as const;

/**
 * 폭이 [min, max]로 묶인 n개 값이 가질 수 있는 표본 표준편차의 최대값.
 * 절반을 min에, 절반을 max에 둘 때가 최대다: (폭/2)·√(n/(n-1)).
 */
export function maxSampleSd(min: number, max: number, n: number): number {
  return ((max - min) / 2) * Math.sqrt(n / (n - 1));
}
