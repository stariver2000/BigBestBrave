/**
 * 채널 페이지 설정.
 *
 * 근거가 된 연구: Revisiting Channel Effectiveness: A Multi-Dimensional Evaluation with
 * Primitive Visual Stimuli (Soohyun Lee, Seokhyeon Park, Minsuk Chang, Jinwook Seo, SNU),
 * IEEE TVCG / IEEE VIS 2026. 전문은 연구실이 올려 둔 PDF로 읽었다.
 *
 * 이 페이지가 가져온 것
 *   - 일곱 채널 x 네 과제라는 짜임과, 과제가 바뀌면 순위가 바뀐다는 주장.
 *   - 표 3(분리성 행렬)과 그 대각선이 주는 정확도 기준값, 표 1(AHW 적합), 7.2절의
 *     튀어나옴 정답률, 4.3절의 거듭제곱 보정.
 *   - 저자들이 스스로 단 단서: 넓이의 튀어나옴 1등은 자극 수준의 단서를 일부 반영할 수 있다.
 *
 * 가져오지 않은 것
 *   - 그림 2 막대 옆의 정확도 값. 그림에만 있다. 정확도 수치는 표 3의 대각선에서만 온다.
 *   - AHW 모형의 채널별 매개변수(w0, wL, wR). 논문 본문에는 끝점 기울기만 있다.
 *     그래서 채널별 적합 곡선은 그리지 않고, 모형의 모양은 일반 매개변수로만 그린다.
 *   - 실험 자극의 정확한 명세(보충 자료). 시연은 과제의 짜임만 가져온 것이다.
 *
 * 이 페이지가 스스로 더한 것
 *   - 튀어나옴 과제를 겪어 보게 한 것. 넓이로 찾을 때와 밝기로 찾을 때의 차이는
 *     순위표로 읽는 것보다 한 번 겪는 쪽이 빠르다.
 */

export const PAPER = {
  title: 'Revisiting Channel Effectiveness: A Multi-Dimensional Evaluation with Primitive Visual Stimuli',
  authors: 'Soohyun Lee, Seokhyeon Park, Minsuk Chang, Jinwook Seo',
  venue: 'IEEE VIS 2026 (TVCG)',
  affiliation: 'SNU',
  link: 'https://hcil.snu.ac.kr/publications',
  fullText: 'hcil.snu.ac.kr/cms/uploads/Revisiting_Channel_Effectiveness_a994efdf05.pdf',
  /**
   * 쉬운 말로. 열두 살이 읽어도 통하는 문장만 쓴다.
   * 논문이 무슨 말을 하려는 것인지 먼저 전하고, 이 페이지가 어디까지 가져왔는지를 밝힌다.
   */
  plain: {
    problem: {
      ko: '그래프를 그릴 때 숫자를 무엇으로 나타낼까요? 막대의 길이로? 네모의 크기로? 색의 진하기로? 옛날 연구는 "길이가 제일 정확하고 크기와 색은 나쁘다"는 순위표를 만들었고, 다들 수십 년 동안 그 표를 따랐습니다.',
      en: 'When you draw a chart, what should carry the number? The length of a bar? The size of a square? How dark a color is? An old study made a ranking — length is best, size and color are bad — and everyone followed that table for decades.',
      ja: 'グラフを描くとき、数字を何で表しましょう?棒の長さ?四角の大きさ?色の濃さ?昔の研究は「長さが一番正確で、大きさと色は悪い」という順位表を作り、みんなが何十年もその表に従ってきました。',
    },
    work: {
      ko: '이 논문은 물음을 네 가지로 늘렸습니다. 값을 정확히 읽을 수 있는가, 작은 차이를 알아챌 수 있는가, 다른 것이 함께 흔들려도 버티는가, 그리고 여럿 속에서 하나가 튀어 보이는가. 축도 눈금도 없는 맨 도형만 가지고 일곱 가지 방법을 다 시험했습니다.',
      en: 'This paper widened the question to four: can you read the value precisely, can you notice a small difference, does the judgment survive when something else wiggles alongside, and does one odd thing pop out of a crowd? They tested seven ways of drawing, using bare shapes with no axes or grid.',
      ja: 'この論文は問いを四つに広げました。値を正確に読めるか、小さな違いに気づけるか、他のものが一緒に揺れても保つか、そして大勢の中でひとつが目に飛び込むか。軸も目盛りもない裸の図形だけで、七つの描き方を全部試しました。',
    },
    took: {
      ko: '이 페이지는 논문의 표에 적힌 수를 그대로 가져왔습니다. 정확히 읽히는 순위와 눈에 띄는 순위가 서로 뒤집힌다는 것, 넓이가 흔들리면 기울기 읽기가 찍기 수준까지 무너진다는 것, 그리고 문턱이 눈금의 끝에서 낮아진다는 모형의 모양입니다.',
      en: 'This page carries the numbers straight from the paper tables: that the precise-reading ranking and the eye-catching ranking flip against each other, that judging tilt collapses to guessing when area wiggles alongside, and the shape of the model showing thresholds drop near the ends of a scale.',
      ja: 'このページは論文の表の数をそのまま持ってきました。正確に読まれる順位と目に留まる順位が互いに覆ること、面積が揺れると傾きの読み取りが当てずっぽうの水準まで崩れること、そして閾値が目盛りの端で下がるというモデルの形です。',
    },
    left: {
      ko: '그림에만 적힌 값과 모형의 채널별 계수는 가져오지 않았습니다. 찾기 판은 논문 실험의 재현이 아니라 과제를 겪어 보는 시연이고, 차이의 크기도 시연용으로 고른 값입니다.',
      en: 'Values that live only in figures, and the per-channel model coefficients, were not carried. The find-the-odd-one board is a demonstration of the task, not a reproduction of the experiment, and the size of the difference is a demo value.',
      ja: '図にしかない値と、モデルのチャネル別係数は持ってきていません。探しの盤は実験の再現ではなく課題を経験するための実演で、差の大きさも実演用に選んだ値です。',
    },
  },
} as const;

/** 시연에서 겪어 볼 채널. 튀어나옴 1등(넓이)과 꼴찌(밝기)를 반드시 넣는다. */
export const DEMO_CHANNELS = ['area', 'luminance', 'tilt', 'length'] as const;
export type DemoChannel = (typeof DEMO_CHANNELS)[number];

/** 시연 판의 크기와 차이. 차이는 다섯 눈금 가운데 셋째쯤의 무게로 골랐다(시연용 값이다). */
export const DEMO = { count: 20, columns: 5, delta: 0.30, markSize: 56 } as const;

/** 모형 곡선을 그릴 때 쓰는 일반 매개변수. 채널별 값이 아니라 모양을 보이기 위한 값이다. */
export const MODEL_SHAPE = { w0: 0.05, wL: 0.12, wR: 0.45, xmax: 100, offset: 0, steps: 120 } as const;
