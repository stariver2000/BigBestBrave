/**
 * IEEE VIS 2026 채널 효과 재평가에서 옮겨 적은 자리.
 *
 * 근거: Soohyun Lee, Seokhyeon Park, Minsuk Chang, Jinwook Seo (SNU).
 * "Revisiting Channel Effectiveness: A Multi-Dimensional Evaluation with Primitive
 * Visual Stimuli." IEEE TVCG, to be presented at IEEE VIS 2026.
 * 전문은 연구실이 올려 둔 PDF(hcil.snu.ac.kr/cms/uploads/Revisiting_Channel_Effectiveness_...)로 읽었다.
 *
 * 옮긴 것은 본문과 표의 수치다: 표 1(Anchored Harmonic Weber 적합), 표 3(분리성 행렬,
 * 그 대각선이 4장의 정확도 기준값이다), 7.2절의 튀어나옴 정답률, 4.3절의 거듭제곱 보정.
 * 그림 2의 막대 옆에 적힌 값은 그림에만 있으므로 가져오지 않았다 - 정확도의 수치는
 * 표 3의 대각선(본문 표)에서 온 것만 쓴다.
 *
 * 부호와 방향:
 *   log-error   낮을수록(더 음수일수록) 정확하다. 찍기 수준은 약 -1.33이다.
 *   popout      0~1 정답률. 높을수록 잘 튄다.
 *   R2          0~1. 높을수록 모형이 잘 맞는다.
 */

/** 일곱 채널. 튀어나옴 실험에는 hue가 더해져 여덟이 된다. */
export type ChannelId =
  | 'position' | 'length' | 'tilt' | 'area' | 'luminance' | 'saturation' | 'curvature' | 'hue';

/** 네 과제. 이 논문의 주장은 과제가 바뀌면 순위가 바뀐다는 것이다. */
export type TaskId = 'accuracy' | 'discriminability' | 'separability' | 'popout';

export const TASKS: readonly TaskId[] = ['accuracy', 'discriminability', 'separability', 'popout'];

/** 찍기 수준의 log-error. 균등하게 아무 답이나 낼 때의 기대값이라고 본문이 밝혔다. */
export const CHANCE_LOG_ERROR = -1.33;

/**
 * 4장의 정확도. 수치는 표 3의 대각선(밑줄 친 자기 채널 기준값)에서 옮겼다.
 * position(단독)은 표 3에 행이 없어 수치가 없지만, 본문이 length보다 뜻있게 낫다고
 * 밝혔다(p=0.009, g=0.292). 그래서 순위상 맨 위에 두되 값은 null로 남긴다.
 */
export const ACCURACY_BASELINE: Record<Exclude<ChannelId, 'position' | 'hue'>, number> = {
  tilt: -2.240,
  length: -2.086,
  curvature: -2.019,
  saturation: -1.843,
  area: -1.685,
  luminance: -1.590,
};

/** 4.3절의 거듭제곱 보정. alpha가 1에서 멀수록 굽었지만 고칠 수 있는 왜곡이다. */
export const POWER_CORRECTION = {
  /** 넓이. 가장 굽었지만 보정 이득도 가장 크다(0.531 log-units). */
  area: { alpha: 0.424, ciLow: 0.393, ciHigh: 0.49, improvement: 0.531 },
  /** 길이. 가운데에서 양쪽으로 뻗는 자극이라 작을수록 과대추정한다. */
  length: { alpha: 0.759, improvement: null },
  /** 색 채널은 보정해도 거의 안 나아진다 - 굽음이 아니라 바탕 잡음이라는 뜻이다. */
  saturation: { alpha: null, improvement: 0.042 },
  luminance: { alpha: null, improvement: 0.032 },
} as const;

/** 기울기와 단독 위치가 같다고 본 동치 폭(±0.2 log-error, TOST p=0.015). */
export const TILT_EQUIVALENCE = { margin: 0.2, p: 0.015 } as const;

/**
 * 표 1. Anchored Harmonic Weber 모형의 적합도와 경계 기울기.
 * 기울기가 음수면 그쪽 끝이 닻 노릇을 하지 않는다는 뜻이다.
 * 기울기 채널은 90도에서 무늬가 갈라져 두 구간을 따로 적합했다.
 */
export interface WeberFit {
  r2: number;
  left: number;
  right: number;
}

export const WEBER_FITS: Record<string, WeberFit> = {
  area: { r2: 0.93, left: 0.092, right: 0.4175 },
  curvature: { r2: 0.96, left: 0.1898, right: -0.0615 },
  length: { r2: 0.89, left: 0.1225, right: 2.0544 },
  luminance: { r2: 0.93, left: 0.0545, right: 1.4228 },
  saturation: { r2: 0.99, left: 0.1279, right: -0.099 },
  'tilt-low': { r2: 0.83, left: 0.1204, right: 1.0296 },
  'tilt-high': { r2: 0.87, left: 0.149, right: 0.9858 },
};

/**
 * 표 3. 분리성 행렬(평균 log-error). 행이 판단하는 채널, 열이 함께 흔들리는 채널이다.
 * 대각선은 아무것도 안 흔들 때의 기준값이고, null은 논문이 시험하지 않은 짝이다.
 */
export const SEPARABILITY: Record<string, Record<string, number | null>> = {
  // 길이 행에서 조심할 것: 첫 칸 -2.253은 기준값이 아니라 위치가 함께 흔들릴 때의 개선값이다.
  // 기준값은 자기 열(length)의 -2.086이다. 표의 밑줄이 pdftotext에서 사라져 헷갈리기 쉽다.
  length:     { position: -2.253, length: -2.086, tilt: -2.115, area: null, luminance: -2.001, saturation: -2.101, curvature: -2.090 },
  tilt:       { position: null, length: -2.110, tilt: -2.240, area: -1.342, luminance: -2.111, saturation: -2.134, curvature: -1.843 },
  area:       { position: -1.702, length: null, tilt: -1.524, area: -1.685, luminance: -1.600, saturation: -1.651, curvature: null },
  luminance:  { position: null, length: -1.765, tilt: -1.766, area: -1.843, luminance: -1.590, saturation: -1.622, curvature: -1.626 },
  saturation: { position: null, length: -1.766, tilt: -1.827, area: -1.722, luminance: -1.545, saturation: -1.843, curvature: -1.710 },
  curvature:  { position: null, length: -1.970, tilt: -1.913, area: null, luminance: -2.040, saturation: -1.927, curvature: -2.019 },
};

/**
 * 7.2절의 튀어나옴 정답률. 여기에만 hue가 있다.
 * 넓이가 1등이지만, 논문은 그 이점이 자극 수준의 단서를 일부 반영할 수 있다고 스스로 적었다.
 */
export const POPOUT_ACCURACY: Record<Exclude<ChannelId, 'position'> | 'position', number> = {
  area: 0.917,
  hue: 0.904,
  position: 0.889,
  curvature: 0.864,
  tilt: 0.830,
  length: 0.803,
  saturation: 0.793,
  luminance: 0.770,
};

/**
 * 분리성에서 가장 큰 어긋남: 넓이가 함께 흔들릴 때의 기울기 판단.
 * -2.240에서 -1.342로 무너지고(g=1.285, 모든 짝 가운데 가장 큼), 찍기 수준(-1.33) 언저리다.
 */
export const WORST_PAIR = { primary: 'tilt', secondary: 'area', from: -2.240, to: -1.342, g: 1.285 } as const;

/** 실험의 크기. 초록과 3장에서. */
export const CHANNEL_COUNT = 7;
export const TASK_COUNT = 4;
