/**
 * 왜곡을 아는 붓 페이지 설정.
 *
 * 근거가 된 연구: Distortion-aware Brushing for Reliable Cluster Analysis in
 * Multidimensional Projections (Hyeon Jeon, Michaël Aupetit, Soohyun Lee, Kwon Ko,
 * Youngtaek Kim, Ghulam Jilani Quadri, Jinwook Seo), IEEE TVCG 32(2) 2026, 2165-2182.
 * 전문은 저자가 올려 둔 PDF로 읽었다.
 *
 * 이 페이지가 가져온 것
 *   - 4.1절의 정의 전부: SNN 유사도, 고차원 밀도, 씨앗 점 고르기, 고차원 가까움,
 *     렌즈 치수(τ와 3τ), 재배치 규칙(참 이웃은 안으로, 남남은 밖으로).
 *   - 왜곡을 만드는 방법(무작위 직교 투영)과 채점 잣대(F1), 5장 두 실험의 설계와
 *     본문이 숫자로 적은 검정 결과.
 *
 * 가져오지 않은 것
 *   - 그림 5·6의 막대값(F1 평균과 소요 시간). 그림에만 있는 값은 옮기지 않는다.
 *   - MNIST 자료와 t-SNE 자극. 보로노이 균일화와 볼록 껍질 경계(구현 세부).
 *   - 세 견줌 기법(Data-driven, M-Ball, Similarity brushing)의 구현.
 *
 * 이 페이지가 스스로 더한 것
 *   - 견본 고차원 자료(치수는 실측으로 골랐다)와 '보통 붓'. 보통 붓은 논문의 세 기법이
 *     아니라 화면 거리만 보는 가장 단순한 붓이며, 화면에 그렇게 적는다.
 */

export const PAPER = {
  title: 'Distortion-aware Brushing for Reliable Cluster Analysis in Multidimensional Projections',
  authors: 'Hyeon Jeon, Michaël Aupetit, Soohyun Lee, Kwon Ko, Youngtaek Kim, Ghulam Jilani Quadri, Jinwook Seo',
  venue: 'IEEE TVCG 32(2), 2026',
  affiliation: 'SNU · QCRI · Oklahoma',
  link: 'https://arxiv.org/abs/2201.06379',
  fullText: 'hyeonjeon.com/assets/pdf/jeon25tvcg3.pdf',
  /** 쉬운 말로. 열두 살이 읽어도 통하는 문장만 쓴다. */
  plain: {
    problem: {
      ko: '수십 가지 숫자로 이루어진 자료를 사람이 보려면 납작한 그림 한 장으로 눌러야 합니다. 그런데 그렇게 누르면 실제로는 멀리 있던 것들이 화면에서 딱 붙어 버립니다. 그림에서 한 덩어리로 보이는 것을 마우스로 감싸 고르면, 남의 무리를 함께 집게 됩니다.',
      en: 'To look at data made of dozens of numbers, you have to flatten it into one picture. But flattening makes things that were far apart land right next to each other. Lasso what looks like one clump on screen, and you scoop up members of another group with it.',
      ja: '何十もの数からなるデータを人が見るには、平たい絵一枚に押しつぶすしかありません。ところが押しつぶすと、本当は遠かったものが画面でぴったりくっつきます。絵で一塊に見えるものをマウスで囲んで選ぶと、よその群れまで一緒に拾ってしまいます。',
    },
    work: {
      ko: '연구진은 붓이 닿는 자리마다 점들을 다시 배치하는 붓을 만들었습니다. 원래 자료에서 가까웠던 점은 붓 안쪽으로 빨려 들어오고, 화면에서만 붙어 있던 점은 바깥으로 튕겨 나갑니다. 24명이 네 가지 붓으로 무리를 골라 봤더니, 그림이 많이 일그러진 경우에도 이 붓만 정확도를 지켰습니다.',
      en: 'The authors built a brush that rearranges the points wherever it touches. Points that were close in the original data get pulled inside the brush; points that only looked close on screen get pushed out. Twenty-four people selected clusters with four brushes — only this one held its accuracy when the picture was badly distorted.',
      ja: '研究チームは、筆が触れる場所ごとに点を並べ替える筆を作りました。元のデータで近かった点は筆の内側に吸い込まれ、画面でだけくっついていた点は外へ弾かれます。24人が四つの筆で群れを選んだところ、絵がひどく歪んだ場合でもこの筆だけが正確さを保ちました。',
    },
    took: {
      ko: '점을 다시 배치하는 계산을 논문의 정의 그대로 옮겼습니다. 화면에서 직접 붓질해 보면 두 가지를 겪습니다. 보통 붓으로는 겹친 무리를 골라내지 못하고, 아는 붓을 켜면 가짜 이웃이 바깥으로 밀려나며 점수가 올라갑니다. 채점은 논문과 같은 잣대(F1)로 합니다.',
      en: 'The relocation math is carried over exactly as the paper defines it. Brushing here, you feel two things: a plain brush cannot pull an overlapped cluster apart, and switching the aware brush on pushes the false neighbours out and your score climbs. Scoring uses the paper’s own yardstick (F1).',
      ja: '点を並べ替える計算を論文の定義そのままに移しました。画面で実際に筆を動かすと二つを体験します。普通の筆では重なった群れを選り分けられず、分かる筆をつけると偽の隣人が外へ押し出されて点数が上がります。採点は論文と同じ物差し(F1)です。',
    },
    left: {
      ko: '실험 결과 막대그림의 값은 그림에만 있어 가져오지 않았고, 논문이 쓴 손글씨 숫자 자료(MNIST)와 세 가지 견줌 붓도 옮기지 않았습니다. 여기의 보통 붓은 그 셋이 아니라 화면 거리만 보는 가장 단순한 붓이며, 여기서 나온 점수는 논문의 표와 견줄 수 없습니다.',
      en: 'The bar-chart values live only in figures and were not carried, nor was the handwritten-digit dataset (MNIST) or the three comparison brushes. The plain brush here is not one of those three but the simplest brush that only sees screen distance, and scores from this board cannot be compared with the paper’s.',
      ja: '実験結果の棒グラフの値は図にしかないので持ってきておらず、論文が使った手書き数字データ(MNIST)と三つの比較用の筆も移していません。ここの普通の筆はその三つではなく画面の距離だけを見る最も単純な筆で、この盤の点数は論文の表とは比べられません。',
    },
  },
} as const;

/** 그림판의 치수(화면 좌표). 정사각이라 무리 모양이 일그러지지 않는다. */
export const BOARD = {
  size: 420,
  margin: 26,
  /** 붓의 반지름 τ. 논문에서 이 값이 곧 렌즈 안쪽 경계의 반지름이다. */
  painterRadius: 34,
  pointRadius: 4,
} as const;

/** 자료의 씨앗. 고정이라 누구에게나 같은 그림이 나온다. */
export const DATA_SEED = 20260903;

/**
 * 무리를 가르는 색. 어두운 그림판(#0B1016) 위 WCAG 대비비는 모두 3:1을 넘는다:
 * 4.5 / 7.4 / 6.8 / 5.4 / 8.9 / 6.1.
 * 색은 무리의 이름표일 뿐 순서를 뜻하지 않으므로 채도를 비슷하게 맞췄다.
 */
export const CLUSTER_COLORS = [
  '#E4572E',
  '#4EC5C1',
  '#C77DFF',
  '#7FB069',
  '#F0B429',
  '#5B9BD5',
] as const;

/** 렌즈 경계의 색. 논문의 그림도 안쪽을 파랑, 바깥을 빨강으로 그렸다. */
export const LENS_COLORS = {
  inner: '#6FA8FF',
  outer: '#FF6B6B',
} as const;
