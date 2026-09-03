/**
 * TVCG 2026 Distortion-aware Brushing에서 옮겨 적은 자리.
 *
 * 근거: Hyeon Jeon, Michaël Aupetit, Soohyun Lee, Kwon Ko, Youngtaek Kim,
 * Ghulam Jilani Quadri, Jinwook Seo. "Distortion-aware Brushing for Reliable
 * Cluster Analysis in Multidimensional Projections."
 * IEEE TVCG 32(2), 2026, 2165-2182. 전문은 저자가 올려 둔 PDF로 읽었다.
 *
 * 옮긴 것: 4.1절의 네 걸음과 그 안의 정의 전부(SNN 유사도, 고차원 밀도, 씨앗 점,
 * 고차원 가까움, 렌즈 치수 τ·3τ, 재배치 규칙), 5장 두 실험의 설계와 본문이 숫자로
 * 적은 결과, 왜곡을 만든 방법(무작위 직교 투영).
 *
 * 옮기지 않은 것: 그림 5·6의 막대값(그림에만 있다), t-SNE로 만든 자극,
 * MNIST 자료, 보로노이 균일화와 볼록 껍질 경계(6장 이후의 구현 세부).
 */

/** 렌즈의 치수. 논문 4.1절 Step 3: 안쪽 = 붓의 반지름 τ, 바깥 = 3τ. */
export const LENS = {
  /** 바깥 경계는 안쪽의 몇 배인가. */
  outerRatio: 3,
} as const;

/** 재배치를 부르는 멈춤 시간(ms). 논문이 반복 설계로 정한 값이다. */
export const RELOCATION_DELAY_MS = 800;

/** 두 실험의 설계와 참가자. 초록의 24명은 두 실험(12+12)을 합한 수다. */
export const STUDIES = {
  total: 24,
  study1: {
    participants: 12,
    males: 9,
    females: 3,
    ageMin: 22,
    ageMax: 32,
    ageMean: 26.4,
    ageSd: 3.2,
    /** 3(왜곡 양) × 4(기법) × 3(왜곡 살피기) = 36회 */
    trials: 36,
  },
  study2: {
    participants: 12,
    males: 10,
    females: 2,
    ageMin: 21,
    ageMax: 30,
    ageMean: 24.6,
    ageSd: 2.5,
    trials: 36,
  },
  compensationUsd: 10,
  maxMinutes: 50,
  /** 자극의 점 개수 범위: 무리 2~4개 × 무리당 100·150·200점. */
  pointsMin: 200,
  pointsMax: 800,
} as const;

export const TECHNIQUES = ['aware', 'dataDriven', 'mBall', 'similarity'] as const;
export type TechniqueId = (typeof TECHNIQUES)[number];

export const DISTORTION_LEVELS = ['low', 'highMn', 'highFn'] as const;
export type DistortionLevel = (typeof DISTORTION_LEVELS)[number];

/**
 * 본문이 숫자로 적은 검정 결과만 옮겼다. 그림 5·6의 막대값(F1 평균과 소요 시간)은
 * 그림에만 있어 가져오지 않았다 - 화면에도 그 사실을 적는다.
 */
export const FINDINGS = {
  /** 실험 1: 기법의 주효과(F(3,33)=36.361, p<.001). */
  study1Technique: { f: 36.361, df: [3, 33], p: '<.001' },
  /** 실험 1: 왜곡 양의 주효과. */
  study1Distortion: { f: 17.102, df: [2, 22], p: '<.001' },
  /** 실험 1: 기법 × 왜곡 양의 상호작용. 이것이 알맹이다. */
  study1Interaction: { f: 7.272, df: [6, 66], p: '<.001' },
  /** 왜곡이 낮으면 기법 사이에 뜻있는 차이가 없다 - 모두 평균 0.85를 넘는다. */
  lowDistortion: { f: 0.847, df: [3, 140], p: '.470', allAboveF1: 0.85 },
  highMn: { f: 20.764, df: [3, 140], p: '<.001' },
  highFn: { f: 19.318, df: [3, 140], p: '<.001' },
  /** 실험 1: 소요 시간의 기법 주효과. 정확도를 시간과 맞바꾼다. */
  study1Time: { f: 8.557, df: [3, 33], p: '<.001' },
  /** 실험 2: 기법의 주효과. */
  study2Technique: { f: 34.51, df: [3, 33], p: '<.001' },
  /** 실험 2: 무리 모양의 까다로움. 사후 검정에서는 기법 간 차이를 잡지 못했다. */
  study2NonTriviality: { f: 8.55, df: [2, 22], p: '<.01' },
} as const;
