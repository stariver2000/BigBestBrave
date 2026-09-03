/**
 * 끼어드는 때 페이지 설정.
 *
 * 근거가 된 연구: Time2Stop: Adaptive and Explainable Human-AI Loop for Smartphone
 * Overuse Intervention (Adiba Orzikulova, Han Xiao, Zhipeng Li, Yukang Yan,
 * Yuntao Wang, Yuanchun Shi, Marzyeh Ghassemi, Sung-Ju Lee, Anind K. Dey,
 * Xuhai "Orson" Xu), CHI 2024, doi:10.1145/3613904.3642747.
 * 전문은 arXiv:2403.05584v1 로 읽었다.
 *
 * 이 페이지가 가져온 것
 *   - 표 1의 사다리. 네 가지 개입 방식이 ML, 적응, 설명을 하나씩 더해 간다.
 *   - 3.2절의 설계 상수. 12자리 마찰 과제, 5분 간격, 10분 냉각, 상위 세 갈래 설명.
 *   - 표 2. 설명의 두 층위와 아홉 예시.
 *   - 6장의 수치. 상대 정확도와 수용도, 방문 감소율, 선호 순위, 효과 크기.
 *
 * 가져오지 않은 것
 *   - ML 모델과 SHAP 계산. 모델 없이 그것을 흉내 내면 지어낸 예측이 된다. 그래서 이 화면이
 *     대는 까닭은 논문의 SHAP이 아니라 이 화면이 실제로 셈에 쓴 값이고, 화면에도 그렇게 적었다.
 *   - 그림(Figure 5~9)의 막대값. 본문이 숫자로 적은 것만 실었다.
 *   - 참가자 71명의 사용 기록.
 *
 * 이 페이지가 스스로 더한 것
 *   - 마찰 과제를 실제로 겪어 보게 한 것. 논문은 12자리라는 수를 정했을 뿐이고,
 *     그 12자리가 손끝에서 얼마나 무거운지는 겪어 봐야 안다.
 *   - 개입이 뜨는 고리를 가장 작게 만들어 실제로 돌린 것. 논문의 모델은 가져올 수 없지만,
 *     '사람의 대답에서 배워 때를 고른다'는 고리 자체는 맥락별 받아들임 비율만으로도 돌아간다.
 *     그 규칙과 상수는 core/jitai의 LOOP에 있고, 논문의 값이 아니라 이 페이지가 정한 것이다.
 *   - 상대 증가율이 곱으로 맞물리는지 되짚은 것. 세 갈래 표는 맞물리고
 *     네 갈래 표는 맞물리지 않는데, 둘 다 그대로 보여 준다.
 */

export const PAPER = {
  title: 'Time2Stop: Adaptive and Explainable Human-AI Loop for Smartphone Overuse Intervention',
  authors: 'Adiba Orzikulova 외 9인',
  venue: 'CHI 2024',
  affiliation: 'KAIST · Tsinghua · CMU · MIT · UW',
  link: 'https://doi.org/10.1145/3613904.3642747',
  fullText: 'arXiv:2403.05584v1',
  /**
   * 쉬운 말로. 열두 살이 읽어도 통하는 문장만 쓴다.
   * 논문이 무슨 말을 하려는 것인지 먼저 전하고, 이 페이지가 어디까지 가져왔는지를 밝힌다.
   */
  plain: {
    problem: {
      ko: '휴대폰을 너무 오래 보고 있을 때 앱이 \'그만 보라\'고 알려 주면 도움이 될까요? 그런데 아무 때나 끼어들면 짜증만 나고, 대개는 그냥 넘겨 버립니다. 언제 끼어들어야 할까요?',
      en: 'Would it help if an app told you to stop when you have been on the phone too long? Interrupt at the wrong moment and it only annoys — most of the time it gets swiped away. So when should it speak up?',
      ja: 'スマホを見すぎているとき、アプリが「やめよう」と知らせてくれたら役に立つでしょうか。しかし、いつでも割り込めばいらだつだけで、たいていは無視されます。いつ割り込むべきなのでしょう。',
    },
    work: {
      ko: '연구진은 사람마다·상황마다 언제 끼어들지 학습하고, 왜 지금 끼어들었는지까지 설명하는 방식을 만들어 71명에게 6주 동안 써 보게 했습니다. 설명이 붙자 사람들이 더 받아들였습니다.',
      en: 'They built a system that learns when to interrupt each person in each situation, and that explains why it is speaking up now. Seventy-one people used it for six weeks; the explanations made it easier to accept.',
      ja: '研究者は、人ごと・状況ごとにいつ割り込むかを学習し、なぜ今なのかまで説明する仕組みを作り、71人に6週間使ってもらいました。説明が付くと、人はより受け入れました。',
    },
    took: {
      ko: '개입 방식 네 단계의 사다리와 설계 상수들(12자리 마찰 과제, 5분 간격, 10분 냉각), 설명의 두 층위, 그리고 논문이 본문에 숫자로 밝힌 결과를 가져왔습니다.',
      en: 'The ladder of four intervention styles, the design constants (a twelve-digit friction task, five-minute spacing, ten-minute cooldown), the two layers of explanation, and the results the paper states as numbers in its text.',
      ja: '介入方式の四段のはしご、設計の定数（12桁の摩擦課題、5分間隔、10分のクールダウン）、説明の二つの層、そして論文が本文に数値で示した結果を受け取りました。',
    },
    left: {
      ko: '학습 모델과 그 설명 계산은 없습니다(이 사이트는 계산 예산이 0입니다). 그래서 여기 개입은 예측이 아니라 시연입니다 — 단추를 눌러야 뜹니다. 71명의 기록도, 그림에만 있는 값도 없습니다.',
      en: 'The model and its explanation maths are not here — this site spends no compute. So an intervention on this page is a demonstration, not a prediction: it appears when you press the button. The 71 people\'s logs and the values that live only in figures are absent too.',
      ja: '学習モデルとその説明の計算はありません（このサイトは計算予算が0です）。ですからここでの介入は予測ではなく実演です — ボタンを押すと現れます。71人の記録も、図にしかない値もありません。',
    },
  },
} as const;
