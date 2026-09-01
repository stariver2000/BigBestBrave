/**
 * IEEE VIS 2026 t-SNE/UMAP 오용 연구에서 옮겨 적은 자리.
 *
 * 근거: Hyeon Jeon, Jeongin Park, Sungbok Shin, Jinwook Seo (SNU).
 * "Stop Misusing t-SNE and UMAP for Visual Analytics." IEEE TVCG / VIS 2026.
 * 전문은 연구실이 올려 둔 PDF(hcil.snu.ac.kr/cms/uploads/jeon26tvcg_...)로 읽었다.
 *
 * 옮긴 것은 본문의 수와 구조다: 일곱 과제와 그 갈래(4.2.2절, 4.3절), 일곱 근거(표 2),
 * 문헌 훑기의 깔때기(312 -> 136)와 기법 수, t-SNE 75편·UMAP 31편, 근거 없음 44%,
 * 면접 참가자(실무자 12명, 전문가 8명)와 5장의 셈들.
 * 그림 3~6의 막대값(기법별 오용 수 등)은 그림에만 있어 가져오지 않았다.
 *
 * 부호와 방향: suitable은 '이 과제에 이 기법을 써도 논문이 든 근거상 맞다'는 뜻이다.
 * 오용 비율 같은 크기 값은 그림에만 있어 여기 없다 - 있는 것은 맞고 안 맞고의 판이다.
 */

/** 일곱 과제. 앞의 셋은 찾아내기(identification), 뒤의 넷은 따져보기(investigation)다. */
export type TaskId =
  | 'neighborhood' | 'outlier' | 'cluster'
  | 'pointDistance' | 'classSeparability' | 'clusterDistance' | 'clusterDensity';

export type TaskKind = 'identification' | 'investigation';

/** 기법의 두 갈래. 국소는 이웃을, 전역은 거리를 지킨다. */
export type TechniqueClass = 'local' | 'global';

export interface Task {
  id: TaskId;
  kind: TaskKind;
  /** 논문 4.3절이 이 과제에 맞다고 판정한 기법 갈래. */
  alignsWith: TechniqueClass;
}

/**
 * 4.2.2절과 4.3절. 찾아내기 셋은 국소 기법에, 따져보기 넷은 전역 기법에 맞는다.
 * 논문 스스로 이 정렬이 두 갈래가 거리를 다루는 방식의 차이와 맞아떨어진다고 적었다
 * (국소는 이웃이냐 아니냐의 이진, 전역은 연속적인 거리).
 */
export const TASKS: readonly Task[] = [
  { id: 'neighborhood', kind: 'identification', alignsWith: 'local' },
  { id: 'outlier', kind: 'identification', alignsWith: 'local' },
  { id: 'cluster', kind: 'identification', alignsWith: 'local' },
  { id: 'pointDistance', kind: 'investigation', alignsWith: 'global' },
  { id: 'classSeparability', kind: 'investigation', alignsWith: 'global' },
  { id: 'clusterDistance', kind: 'investigation', alignsWith: 'global' },
  { id: 'clusterDensity', kind: 'investigation', alignsWith: 'global' },
];

export type TechniqueId = 'tsne' | 'umap' | 'pca' | 'mds';

export interface Technique {
  id: TechniqueId;
  class: TechniqueClass;
  /** 136편 가운데 몇 편이 썼는가. 본문에 수가 있는 것만 적고 없으면 null이다. */
  uses: number | null;
}

/** 네 주요 기법. 각각 20번 넘게 쓰였고, 나머지 14개 기법은 각각 5번 미만이다. */
export const TECHNIQUES: readonly Technique[] = [
  { id: 'tsne', class: 'local', uses: 75 },
  { id: 'umap', class: 'local', uses: 31 },
  { id: 'pca', class: 'global', uses: null },
  { id: 'mds', class: 'global', uses: null },
];

/** 표 2. 기법을 고른 일곱 가지 근거. */
export type RationaleId =
  | 'faithfulness' | 'popularity' | 'scalability' | 'interpretability'
  | 'stability' | 'extensibility' | 'simplicity';

export interface Rationale {
  id: RationaleId;
  /** 이 근거가 t-SNE/UMAP을 정당화하는 데 쓰였는가. 확장성과 단순성만 아니다. */
  usedForLocal: boolean;
}

export const RATIONALES: readonly Rationale[] = [
  { id: 'faithfulness', usedForLocal: true },
  { id: 'popularity', usedForLocal: true },
  { id: 'scalability', usedForLocal: true },
  { id: 'interpretability', usedForLocal: true },
  { id: 'stability', usedForLocal: true },
  { id: 'extensibility', usedForLocal: false },
  { id: 'simplicity', usedForLocal: false },
];

/** 문헌 훑기의 크기(4.2절)와 본문이 적은 셈들. */
export const REVIEW = {
  retrieved: 312,
  retained: 136,
  techniques: 18,
  majorTechniques: 4,
  /** 주요 기법의 최소 사용 횟수와 나머지의 최대 횟수. "각각 20번 넘게" / "각각 5번 미만". */
  majorMinUses: 20,
  othersMaxUses: 5,
  /** 근거를 하나도 적지 않은 논문의 몫(%). 4.2.3절. */
  noRationalePercent: 44,
} as const;

/** 면접의 크기. 실무자 12명(시각 분석 6, 다른 분야 6; 표 3), 전문가 8명(표 4). */
export const INTERVIEWS = {
  practitioners: 12,
  practitionersVA: 6,
  practitionersDomain: 6,
  experts: 8,
  /** 5.3절의 셈: 열두 명 가운데 여덟이 초매개변수를 손으로 골라 본 적이 있다고 답했다. */
  cherryPicked: 8,
  /** 그 가운데 넷은 그 효과를 모른 채 골랐다. */
  cherryPickedBlind: 4,
  /** 동료의 권유로 썼다는 사람. */
  peerSuggested: 5,
} as const;

/**
 * 논문이 스스로 단 단서(4.3절 첫머리).
 * 기법 선택만으로 적합성을 다 판정할 수는 없다 - 초매개변수가 크게 좌우한다.
 * 그런데도 기법 단위로 본 까닭: 훑은 논문 거의 전부가 초매개변수를 보고하지 않았고,
 * 기법 선택이 가장 큰 요인이기 때문이다. 이 단서를 화면 앞쪽에 싣는다.
 */
export const CAVEAT = {
  hyperparametersMatter: true,
  almostNoneReported: true,
} as const;
