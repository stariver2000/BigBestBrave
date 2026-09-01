/**
 * CHI 2025 온라인 회복적 정의 도구의 설계 공간.
 *
 * 근거: Bich Ngoc (Rubi) Doan, Joseph Seering (KAIST).
 * "The Design Space for Online Restorative Justice Tools: A Case Study with ApoloBot."
 * CHI '25. arXiv:2502.18861v1
 *
 * 이 논문은 질적 연구다. 그래서 숫자는 가져오지 않았고 구조만 가져왔다. 여덟 개의 축과
 * 각 축의 양 끝, 그리고 어느 자리가 맞고 어느 자리가 안 맞는지는 모두 논문이 본문에
 * 문장으로 밝힌 것이다. 화면에 점수 같은 것은 없다 - 논문이 점수를 매기지 않았다.
 *
 * 축의 모양(shape)이 이 페이지의 알맹이다. 여덟 축 가운데 넷은 가운데가 가장 잘 맞고
 * 양 끝이 모두 안 맞는다. "더 많을수록 좋다"가 아니라는 뜻이다. 논문이 축마다 그 까닭을
 * 따로 적어 두었다.
 *
 * 부호와 방향: position은 1~5이며 축마다 1과 5가 무엇인지는 poles에 적었다.
 * 숫자가 크다고 좋은 것이 아니다 - 어느 자리가 맞는지는 shape이 정한다.
 */

/** 논문이 나눈 세 범위(5장 끝머리): 어떤 공동체에서(Where), 어떤 운영 방식으로(How), 어떤 상황에서(When). */
export type Scope = 'where' | 'how' | 'when';

/**
 * 축의 모양.
 *   peakMiddle  가운데가 맞고 양 끝이 안 맞는다.
 *   towardLow   1쪽이 맞는다.
 *   towardHigh  5쪽이 맞는다.
 * 논문이 문장으로 밝힌 것만 적었다. 밝히지 않은 축은 없다.
 */
export type Shape = 'peakMiddle' | 'towardLow' | 'towardHigh';

/** 한 자리에 대한 판정. 점수가 아니라 세 갈래다. */
export type Verdict = 'fits' | 'edge' | 'misfits';

export interface Axis {
  id: string;
  scope: Scope;
  shape: Shape;
  /** 1쪽과 5쪽이 무엇인가. 논문이 절 제목에 적어 둔 대립쌍이다. */
  poles: readonly [string, string];
  /**
   * 이 축이 그 자리에서 왜 안 맞는지 논문이 댄 까닭.
   * low는 1쪽 끝, high는 5쪽 끝의 까닭이다. 맞는 쪽 끝에는 까닭이 없어 null이다.
   */
  reasons: { low: boolean; high: boolean };
  /**
   * 5쪽 끝에서 도구를 아예 쓰지 말라고 논문이 말하는가.
   * 심한 해악에서만 참이다 - 논문은 그런 경우 대화가 적절하지 않고 상급 기관이
   * 나서야 한다고 적었다.
   */
  blocksAtHigh: boolean;
}

/**
 * 여덟 개의 축.
 *
 * 5.1은 공동체(Where), 5.2는 운영 방식(How), 5.3은 상황(When)이다.
 * community-focus는 축이 아니라 갈래라서 따로 둔다(FOCUS_KINDS).
 */
export const AXES: readonly Axis[] = [
  // 5.1.2 Server Size. 중간 크기가 가장 알맞다. 아주 크면 감당이 안 되고 아주 작으면 필요가 없다.
  { id: 'size', scope: 'where', shape: 'peakMiddle', poles: ['very small', 'very large'], reasons: { low: true, high: true }, blocksAtHigh: false },
  // 5.2.1 Mediation Approach: Conversation vs. Action.
  // 값에 완전히 기운 쪽도, 완전히 등진 쪽도 아니고 '부분적으로만 겹치는' 쪽이 가장 잘 받아들였다.
  { id: 'mediation', scope: 'how', shape: 'peakMiddle', poles: ['action only', 'conversation only'], reasons: { low: true, high: true }, blocksAtHigh: false },
  // 5.2.2 Flexibility: Fluid vs. Rule-based. 유연한 팀은 실험할 수 있고, 규칙이 굳은 팀은 부담스러워한다.
  { id: 'flexibility', scope: 'how', shape: 'towardHigh', poles: ['strictly rule-based', 'fluid'], reasons: { low: true, high: false }, blocksAtHigh: false },
  // 5.2.3 Temporal Perspective. 당장의 효율로 보면 느리고, 길게 보면 재발을 줄여 효율이다.
  { id: 'temporal', scope: 'how', shape: 'towardHigh', poles: ['immediate action', 'long-term'], reasons: { low: true, high: false }, blocksAtHigh: false },
  // 5.3.1 Harm Severity. 가벼운 해악은 감정을 가라앉히지만, 신체 위협이나 금전 피해는 대화로 갚아지지 않는다.
  { id: 'severity', scope: 'when', shape: 'towardLow', poles: ['mild friction', 'threats or scams'], reasons: { low: false, high: true }, blocksAtHigh: true },
  // 5.3.2 Social Ties. 있되 너무 세지 않아야 한다. 없으면 신경 쓰지 않고, 너무 세면 따로 풀거나 아예 등진다.
  { id: 'ties', scope: 'when', shape: 'peakMiddle', poles: ['anonymous strangers', 'close friends or bad blood'], reasons: { low: true, high: true }, blocksAtHigh: false },
  // 6.1 Harm Frequency. 잦으면 쓸 일은 많지만 그만큼 규범이 느슨하다는 뜻이고, 드물면 직접 처리하는 편이 쉽다.
  { id: 'frequency', scope: 'when', shape: 'peakMiddle', poles: ['almost never', 'constant'], reasons: { low: true, high: true }, blocksAtHigh: false },
  // 5.1.1 안쪽. 사람들이 서로에게 얼마나 마음을 두고 있는가. 오래 머무는 공동체일수록 사과에 뜻이 생긴다.
  { id: 'investment', scope: 'where', shape: 'towardHigh', poles: ['passing through', 'invested in each other'], reasons: { low: true, high: false }, blocksAtHigh: false },
];

/** 축의 자리. 1부터 5까지다. */
export const POSITIONS = [1, 2, 3, 4, 5] as const;
export type Position = (typeof POSITIONS)[number];

/**
 * 5.1.1이 나눈 공동체의 갈래. 축이 아니라 갈래라 따로 둔다.
 *   social     사람 중심. 창작자 서버, 언어 학습, 정신 건강, 예술 같은 곳. 논문이 가장 잘 맞는다고 한 곳.
 *   formal     격식 있고 스쳐 가는 곳. 기술 지원, 짧은 질의응답. 머물지 않으니 사과할 까닭이 없다.
 *   toxic      거친 말이 규범이 된 곳. 쓸 일은 가장 많지만 기대되는 효과는 가장 낮다.
 * toxic이 이 표에서 가장 말이 많은 자리다. 기회와 효과가 서로 반대로 간다.
 */
export const FOCUS_KINDS = ['social', 'formal', 'toxic'] as const;
export type FocusKind = (typeof FOCUS_KINDS)[number];

export const FOCUS_VERDICT: Record<FocusKind, Verdict> = {
  social: 'fits',
  formal: 'misfits',
  toxic: 'edge',
};

/**
 * 연구의 깔때기. 4.2절에서 옮겼다.
 *
 * "A total of 16 participants were chosen for Phase 1, with six proceeding to Phases 2
 *  and 3. Two used ApoloBot during their deployment, while the others deployed it but
 *  did not encounter any suitable use cases."
 *
 * 이 세 수가 이 논문에서 가장 정직한 대목이다. 설계 공간을 그린 논문이면서, 자기 도구가
 * 실제로 쓰인 횟수를 숨기지 않고 적었다.
 */
export const FUNNEL = {
  phase1: 16,
  deployed: 6,
  used: 2,
  /** 배포했으나 쓸 만한 경우를 만나지 못한 사람. 시험이 deployed - used와 같은지 확인한다. */
  noOccasion: 4,
} as const;

/** 논문이 스스로 밝힌, 아직 모르는 것(6.2절). */
export const OPEN_QUESTION = {
  /** 중간에 그만둔 사과가 어떤 영향을 남기는지는 아직 알려지지 않았다. */
  partialApology: true,
} as const;
