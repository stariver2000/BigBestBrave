/**
 * 차원 축소 신뢰도 검사 페이지 설정.
 *
 * 근거가 된 연구: Unveiling High-dimensional Backstage — A Survey for Reliable Visual Analytics
 * with Dimensionality Reduction (Hyeon Jeon, Hyunwook Lee, Yun-Hsin Kuo, Taehyun Yang,
 * Daniel Archambault, Sungahn Ko, Takanori Fujiwara, Kwan-Liu Ma, Jinwook Seo),
 * ACM CHI 2025, Article 394. 서울대학교 HCI Lab 주도.
 *
 * 이 서베이는 차원 축소 산점도를 그대로 믿을 때 생기는 문제와, 그것을 확인하는 방법들을 정리한다.
 * 이 페이지는 그중 널리 쓰이는 왜곡 지표를 브라우저에서 직접 계산해, 자기 산점도를 검사하게 한다.
 * 서베이의 분류 체계나 워크플로 모델을 구현한 것은 아니다.
 */

import { DEFAULTS } from '../../core/projection';

export const PAPER = {
  title:
    'Unveiling High-dimensional Backstage: A Survey for Reliable Visual Analytics with Dimensionality Reduction',
  authors: 'Hyeon Jeon, Hyunwook Lee, Yun-Hsin Kuo, Taehyun Yang, Daniel Archambault, Sungahn Ko, Takanori Fujiwara, Kwan-Liu Ma, Jinwook Seo',
  venue: 'ACM CHI 2025',
  affiliation: 'Seoul National University HCI Lab',
  doi: 'https://doi.org/10.1145/3706598.3713551',
  preprint: 'https://arxiv.org/abs/2501.10168',
} as const;

/** 신뢰도·연속성의 표준 정의를 세운 연구. 지표 설명에 함께 밝힌다. */
export const MEASURE_SOURCE = 'Venna & Kaski, trustworthiness & continuity';

export const DEFAULT_SETTINGS = {
  neighbors: DEFAULTS.neighbors,
  standardize: true,
} as const;

/** 산점도 크기(px). 정사각형으로 두어 가로세로 비율이 좌표를 왜곡하지 않게 한다. */
export const PLOT_SIZE = 560;
export const PLOT_PADDING = 24;

/** 점 반지름. 왜곡이 큰 점은 조금 더 크게 그린다. */
export const POINT_RADIUS = { base: 3.2, emphasis: 5 } as const;

/**
 * 진실의 렌즈 반지름(그림 좌표).
 * 점 몇 개가 함께 들어올 만큼이면 충분하다. 너무 크면 그림 전체가 렌즈가 되어 비교할 바깥이 사라진다.
 */
export const LENS_RADIUS = 88;

/**
 * 예시 자료를 만드는 설정.
 *
 * 세 덩어리가 고차원에서는 뚜렷이 나뉘지만, 그중 두 덩어리는 서로 가깝다.
 * PCA로 눌러 담으면 그 두 덩어리가 겹쳐 보이는데, 바로 그 상황이 이 도구가 잡아내려는 것이다.
 */
export const SAMPLE = {
  perCluster: 80,
  spread: 0.8,
  /**
   * 군집 중심(8차원). 앞의 두 덩어리는 서로 가깝고, 세 번째만 멀리 떨어져 있다.
   * PCA로 두 축에 눌러 담으면 가까운 두 덩어리가 겹쳐 보이는데, 바로 그 상황이
   * 이 도구가 잡아내려는 것이다. 예시가 문제를 보여 주지 못하면 도구도 설명되지 않는다.
   */
  centers: [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [4, 4, 0, 0, 0, 0, 0, 0],
    [0, 0, 9, 9, 0, 0, 0, 0],
  ],
  seed: 20250601,
} as const;

export const DOWNLOAD_FILENAME = 'projection-report.csv';
