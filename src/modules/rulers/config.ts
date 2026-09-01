/**
 * 지표 비교 페이지 설정.
 *
 * 근거가 된 연구: Metric Design != Metric Behavior: Improving Metric Selection for the
 * Unbiased Evaluation of Dimensionality Reduction (Jiyeon Bae, Hyeon Jeon, Jinwook Seo,
 * 서울대학교), IEEE VIS 2025 short paper, doi:10.1109/VIS60296.2025.00014.
 *
 * 연구진의 질문은 이렇다. 차원 축소 그림을 평가할 때 지표를 여러 개 쓰는 것이 관행인데,
 * 그중 몇 개가 사실상 같은 것을 재고 있다면 평가는 그쪽으로 기운다. 그래서 지표를
 * **설계 의도로 나누지 말고 실제 행동으로 나누자**고 제안한다. 절차는 셋이다 —
 * 지표 쌍의 경험적 상관을 재고, 그것으로 묶고, 무리마다 대표 하나를 세운다.
 * 96개 자료집 × 300장씩으로 재어 보니 알맞은 무리 수는 다섯이었고,
 * 가장 큰 무리는 국소 지표가 많았지만 군집·전역 지표도 섞여 있었다.
 *
 * 이 페이지가 가져온 것
 *   - 절차 셋 전부. 스피어만 순위 상관 → 평균 연결 계층 군집화 → 무리별 대표.
 *   - 결론의 모양: 설계 갈래가 행동을 예측하지 못한다는 것을 직접 보게 한다.
 *
 * 가져오지 않은 것
 *   - 논문이 쓴 지표 목록과 96개 자료집. 여기서는 브라우저에서 결정론적으로 계산되는
 *     아홉 개와, 씨앗에서 짓는 네 벌을 쓴다.
 *   - 40가지 차원 축소 기법. 반복 최적화가 필요한 것(t-SNE, UMAP)은 돌릴 수 없다.
 *     대신 선형 사영과 이름 붙인 망가뜨리기 여덟 가지로 무리를 넓게 편다.
 *   - 무리 수를 고르는 Kneedle 알고리즘. 같은 생각을 더 짧게 옮긴 팔꿈치 계산을 쓴다.
 *   - 논문의 수치. 이 페이지의 숫자는 여기서 새로 잰 것이고 논문의 것과 견줄 수 없다.
 */

export const PAPER = {
  title:
    'Metric Design != Metric Behavior: Improving Metric Selection for the Unbiased Evaluation of Dimensionality Reduction',
  authors: 'Jiyeon Bae, Hyeon Jeon, Jinwook Seo',
  venue: 'IEEE VIS 2025',
  affiliation: 'Seoul National University',
  link: 'https://doi.org/10.1109/VIS60296.2025.00014',
} as const;

/** 처음 놓여 있는 설정. */
export const INITIAL = {
  dataset: 'moons',
  population: 60,
  k: 12,
} as const;

/** 상관 행렬 한 칸의 크기(px). */
export const CELL = 34;

/** 산점도 미리보기. */
export const THUMB = { size: 96, dot: 1.7, count: 8 } as const;

/** 상관을 색으로 옮길 때의 최대 진하기. 1로 두면 글자가 묻힌다. */
export const HEAT_MAX_ALPHA = 0.72;

/** 이 값보다 상관이 크면 칸의 숫자를 밝은 색으로 뒤집는다. */
export const HEAT_FLIP = 0.55;
