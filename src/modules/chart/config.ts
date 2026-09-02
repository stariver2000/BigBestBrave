/**
 * 차트 왜곡 검사 페이지 설정.
 *
 * 근거가 된 연구: Automated Pipeline for Detecting and Analyzing Misleading Visual Elements
 * (Minhyeong Kim, Yumin Song, Yungun Kim, Aeri Cho, Soohyun Lee, Hyeon Jeon, Jinwook Seo,
 * 서울대학교), IEEE PacificVis 2025.
 *
 * 연구진은 차트 그림에서 요소를 검출해 구조화한 뒤, 어느 요소가 어떻게 해석을 비트는지 짚어 설명한다.
 * "이 차트는 오해를 부른다"로 끝내지 않고 **어느 부분이 문제인지** 가려내는 것이 핵심이다.
 *
 * 이 페이지는 그림에서 요소를 검출하지 않는다(이미지 인식이 필요하다). 대신 차트의 설정을 직접 받아
 * 같은 질문에 답한다 — 어느 요소가, 얼마나 어긋나게 만드는가. 그래서 남의 차트 이미지는 검사할 수 없고,
 * 대신 왜곡의 크기를 어림이 아니라 계산으로 낸다.
 */

export const PAPER = {
  title: 'Automated Pipeline for Detecting and Analyzing Misleading Visual Elements',
  authors: 'Minhyeong Kim, Yumin Song, Yungun Kim, Aeri Cho, Soohyun Lee, Hyeon Jeon, Jinwook Seo',
  venue: 'IEEE PacificVis 2025',
  affiliation: 'Seoul National University',
  link: 'https://ieeexplore.ieee.org/document/11021031/',
  /**
   * 쉬운 말로. 열두 살이 읽어도 통하는 문장만 쓴다.
   * 논문이 무슨 말을 하려는 것인지 먼저 전하고, 이 페이지가 어디까지 가져왔는지를 밝힌다.
   */
  plain: {
    problem: {
      ko: '같은 숫자라도 그림을 어떻게 그리느냐에 따라 전혀 다르게 보입니다. 세로축을 0에서 시작하지 않으면 작은 차이가 산더미처럼 보이죠. 문제는 그런 그림이 거짓말을 하지 않으면서도 사람을 속인다는 것입니다.',
      en: 'The same numbers can look completely different depending on how they are drawn. Start the axis somewhere above zero and a tiny gap looks like a mountain. The trouble is that such a chart fools people without ever lying.',
      ja: '同じ数字でも描き方しだいで全く違って見えます。縦軸を0から始めなければ、小さな差が山のように見えます。厄介なのは、そうした図が嘘をつかないまま人を欺くことです。',
    },
    work: {
      ko: '연구진은 차트 그림에서 부분들을 자동으로 찾아낸 뒤, 그중 어느 부분이 해석을 비트는지 짚어 주는 방법을 만들었습니다. \'이 차트는 이상하다\'에서 멈추지 않고 어디가 문제인지까지 가려냅니다.',
      en: 'They built a pipeline that finds the parts of a chart image automatically and then points at which part bends the reading. It does not stop at "this chart is off" — it says where.',
      ja: '研究者はチャート画像から要素を自動で見つけ、どの要素が解釈を曲げているかを指し示す方法を作りました。「この図はおかしい」で終わらず、どこが問題かまで示します。',
    },
    took: {
      ko: '같은 물음을 가져왔습니다 — 어느 요소가 얼마나 어긋나게 만드는가. 이 페이지는 차트 설정을 직접 받아 왜곡의 크기를 어림이 아니라 계산으로 냅니다.',
      en: 'The same question: which element distorts, and by how much. This page takes the chart settings directly and computes the distortion instead of estimating it.',
      ja: '同じ問いを受け取りました — どの要素がどれだけ歪ませるのか。このページは図の設定を直接受け取り、歪みの大きさを目分量ではなく計算で出します。',
    },
    left: {
      ko: '그림에서 요소를 찾아내는 부분(이미지 인식)은 없습니다. 그래서 남이 만든 차트 이미지는 검사할 수 없습니다.',
      en: 'The part that detects elements inside an image is not here, so it cannot inspect someone else\'s chart picture.',
      ja: '画像から要素を検出する部分（画像認識）はありません。ですから他人が作ったチャート画像は検査できません。',
    },
  },
} as const;

/** 그림 크기(px). 세로는 사용자와 오르막이 함께 움직인다. */
export const PLOT = { width: 380, minHeight: 90, maxHeight: 460, startHeight: 200 } as const;

/**
 * 거짓말 오르막이 도는 방식.
 *
 * 손잡이가 스스로 돌아가며 같은 자료를 점점 더 부풀려 보여 준다. 사람이 볼 것은 결과가 아니라
 * 그 과정이다 — 숫자를 하나도 바꾸지 않고도 그림이 어디까지 갈 수 있는지.
 */
export const CLIMB = {
  /** 한 걸음에 축을 올리는 양. 자료의 가장 작은 값에 대한 비율로 잡아 어떤 자료에서도 열 걸음 남짓 걷는다. */
  axisFraction: 0.08,
  /** 한 걸음에 그림을 늘리는 높이(px). */
  heightStep: 30,
  /** 한 걸음의 시간(ms). 눈이 변화를 따라올 만큼 느리게. */
  intervalMs: 900,
  /** 꼭대기에서 쉬는 걸음 수. 다 부푼 그림을 볼 시간을 준 뒤 처음으로 돌아간다. */
  restTicks: 4,
} as const;

/**
 * 처음 놓여 있는 자료.
 *
 * 100에서 112로 12퍼센트 오른 값이다. 축을 조금만 올려도 몇 배로 부풀어 보이는데,
 * 뉴스에서 가장 흔히 보는 왜곡이 정확히 이 모양이라 예시로 골랐다.
 */
export const SAMPLE_VALUES = [100, 103, 106, 112];

/** 왜곡 배수를 화면에 적을 때의 상한. 이보다 크면 "잴 수 없음"으로 적는다. */
export const FACTOR_CAP = 99;
