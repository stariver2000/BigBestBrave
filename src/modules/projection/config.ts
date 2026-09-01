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
  /**
   * 쉬운 말로. 열두 살이 읽어도 통하는 문장만 쓴다.
   * 논문이 무슨 말을 하려는 것인지 먼저 전하고, 이 페이지가 어디까지 가져왔는지를 밝힌다.
   */
  plain: {
    problem: {
      ko: '자료 하나에는 재는 항목이 수십 개일 수 있습니다(키, 몸무게, 점수…). 그림으로 그리려면 그것을 평면 두 방향으로 눌러 담아야 하는데, 누르는 순간 원래 멀리 있던 점들이 옆에 붙어 버리기도 합니다. 그런데 사람들은 그 그림을 보고 \'이 둘은 비슷하구나\'라고 말해 버립니다.',
      en: 'One dataset can measure dozens of things at once — height, weight, scores. To draw it you have to press all of that onto two directions, and in the pressing, points that were far apart can end up side by side. People then look at the picture and say "these two are alike".',
      ja: '一つのデータには測る項目が何十個もあります（身長、体重、点数…）。図に描くにはそれを平面の二方向に押し込むしかなく、押した瞬間、本当は遠かった点が隣り合ってしまうことがあります。それでも人はその図を見て「この二つは似ている」と言ってしまいます。',
    },
    work: {
      ko: '이 연구는 그런 그림을 믿어도 되는지 확인하는 방법들을, 흩어져 있던 여러 연구에서 모아 한자리에 정리했습니다. 새 도구를 만든 것이 아니라 함정과 확인법의 지도를 그린 연구(서베이)입니다.',
      en: 'This study gathers, from many scattered papers, the ways to check whether such a picture can be trusted. It does not build a new tool — it maps the traps and the checks in one place (a survey).',
      ja: 'この研究は、そうした図を信じてよいか確かめる方法を、散らばっていた多くの研究から集めて一か所に整理しました。新しい道具を作ったのではなく、落とし穴と確認法の地図を描いた研究（サーベイ）です。',
    },
    took: {
      ko: '그중 널리 쓰이는 확인 지표 몇 개를 브라우저에서 직접 계산합니다. 당신이 만든 산점도에서 가까워 보이는 것을 믿어도 되는지, 숫자와 그림으로 함께 보여 줍니다.',
      en: 'A few of the widely used checks, computed right here in the browser. It shows — in numbers and in the picture — whether the closeness you see in your scatterplot can be believed.',
      ja: 'その中で広く使われる確認指標をいくつか、ブラウザの中で直接計算します。あなたの散布図で近く見えるものを信じてよいかを、数値と図の両方で示します。',
    },
    left: {
      ko: '서베이가 세운 분류 체계나 작업 흐름 모델은 구현하지 않았습니다. 지표의 정의도 이 서베이가 아니라 Venna와 Kaski가 세운 표준 정의를 따릅니다.',
      en: 'The taxonomy and workflow model from the survey are not implemented here. The metric definitions follow the standard ones from Venna and Kaski, not the survey itself.',
      ja: 'サーベイが立てた分類体系やワークフローのモデルは実装していません。指標の定義も、このサーベイではなく Venna と Kaski の標準的な定義に従っています。',
    },
  },
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
