/** 끼어드는 때 문구 사전 (ko / en / ja). */

import type { Dictionary } from '../../core/i18n';

export type MomentKey =
  | 'title' | 'summary' | 'capability' | 'paper-label' | 'full-text'
  | 'demo-title' | 'demo-note' | 'demo-launch' | 'demo-overlay-title' | 'demo-overlay-body'
  | 'demo-typed' | 'demo-continue' | 'demo-leave' | 'demo-wrong' | 'demo-left' | 'demo-continued'
  | 'demo-again' | 'demo-why' | 'demo-why-note' | 'demo-more' | 'demo-less' | 'demo-mine'
  | 'ladder-title' | 'ladder-note'
  | 'c-control' | 'c-personalized' | 'c-adaptiveWoExp' | 'c-adaptiveWExp'
  | 'cd-control' | 'cd-personalized' | 'cd-adaptiveWoExp' | 'cd-adaptiveWExp'
  | 'f-ml' | 'f-adaptive' | 'f-explainable'
  | 'm-accuracy' | 'm-receptivity' | 'vs-control' | 'design-line'
  | 'mixed-title' | 'mixed-note' | 'mixed-visits' | 'mixed-sig' | 'mixed-marginal'
  | 'mixed-rank' | 'mixed-first' | 'mixed-third' | 'mixed-read'
  | 'check-title' | 'check-note' | 'check-compose' | 'check-abstract' | 'check-four'
  | 'check-ours' | 'check-theirs' | 'check-match' | 'check-mismatch' | 'check-verdict'
  | 'scale-title' | 'scale-note' | 'scale-line'
  | 'took-title' | 'took-yes' | 'took-no' | 'took-mine';

export const momentDictionary: Dictionary<MomentKey> = {
  ko: {
    title: '끼어드는 때',
    summary:
      '휴대폰을 그만 보라고 말해 주는 시스템은 많지만, 언제 말하느냐가 전부입니다. 71명이 8주를 산 실험에서, 때를 배우는 개입이 얼마나 더 잘 듣는지가 숫자로 남았습니다.',
    capability:
      '그만 보라는 개입을 직접 겪어 보고, 아무 때나 끼어드는 것부터 때를 배우고 까닭을 설명하는 것까지 네 단계가 각각 얼마나 잘 들었는지 논문의 수치로 견준다',
    'paper-label': '바탕이 된 연구',
    'full-text': '전문',

    'demo-title': '겪어 보십시오',
    'demo-note':
      '이 논문의 개입은 이렇게 생겼습니다. 계속 보려면 열두 자리 숫자를 그대로 쳐야 합니다. 열두 자리는 논문이 정한 값입니다 - 선행 연구가 10~20자리를 중간 부담이라 했고, 이 마찰이 형벌이 아니라 지연이 되도록 고른 수입니다.',
    'demo-launch': '앱을 계속 쓰려던 참이라고 치고, 개입을 띄워 봅니다',
    'demo-overlay-title': '지금 많이 보고 계십니다',
    'demo-overlay-body': '계속 보시려면 아래 숫자를 그대로 입력해 주세요.',
    'demo-typed': '입력',
    'demo-continue': '계속 쓰기',
    'demo-leave': '그만 보기',
    'demo-wrong': '숫자가 다릅니다. 다시 확인해 주세요.',
    'demo-left': '내려놓으셨습니다. 실험에서는 이 선택이 수용도로 기록되었습니다.',
    'demo-continued': '계속 쓰기를 고르셨습니다. 열두 자리를 다 치고도 계속 보는 것, 그것도 실험이 기록한 선택지였습니다.',
    'demo-again': '다시 겪어 보기',
    'demo-why': '왜 지금인가',
    'demo-why-note':
      '실제 시스템은 SHAP으로 계산한 상위 세 갈래를 여기 보여 줍니다. 다섯 갈래 가운데 어느 셋인지 고르는 것이 모델의 몫이었는데, 이 화면에는 모델이 없으므로 세 갈래를 골라 둔 채 보여 드립니다.',
    'demo-more': '자세히 보기',
    'demo-less': '접기',
    'demo-mine':
      '이 시연은 예측하지 않습니다. 단추를 눌러야 뜹니다. 언제 띄울지 아는 것이 이 논문의 알맹이인데, 그 앎은 모델 안에 있고 모델은 여기 없습니다.',

    'ladder-title': '네 단계의 사다리',
    'ladder-note':
      '실험은 같은 개입 화면을 네 가지 때에 띄워 보았습니다. 아무 때나, 배운 때에, 계속 다시 배우는 때에, 그리고 까닭까지 붙여서. 막대는 아무 때나(Control)를 1.0으로 둔 상대값이고, 본문이 숫자로 적은 것만 옮겼습니다.',
    'c-control': '아무 때나',
    'c-personalized': '배운 때에',
    'c-adaptiveWoExp': '다시 배우며',
    'c-adaptiveWExp': '까닭까지',
    'cd-control': '무작위로 끼어듭니다. 견주기 위한 바닥줄입니다.',
    'cd-personalized': '넉 주의 기록으로 한 번 배운 모델이 때를 고릅니다. 그 뒤로는 그대로입니다.',
    'cd-adaptiveWoExp': '밤마다 피드백으로 다시 배웁니다. 때가 점점 좋아집니다.',
    'cd-adaptiveWExp': '다시 배우면서, 왜 지금인지 상위 세 갈래로 설명합니다. 논문의 Time2Stop입니다.',
    'f-ml': '기계학습',
    'f-adaptive': '적응',
    'f-explainable': '설명',
    'm-accuracy': '때가 맞았다는 답',
    'm-receptivity': '실제로 내려놓음',
    'vs-control': '아무 때나 대비',
    'design-line': '{interval}분마다 다시 재고, 한 번 끼어들면 {cooldown}분을 쉽니다. 모델은 밤마다 갱신됩니다.',

    'mixed-title': '설명의 엇갈린 효과',
    'mixed-note':
      '까닭을 설명하면 개입은 더 잘 받아들여졌습니다. 그런데 정작 앱 방문이 줄어든 폭은 설명이 없는 쪽이 더 컸고, 그쪽만 통계적으로 뜻있었습니다. 마음을 얻는 것과 행동을 바꾸는 것이 같은 일이 아니었던 것입니다.',
    'mixed-visits': '기준 주 대비 앱 방문 감소',
    'mixed-sig': '뜻있는 감소',
    'mixed-marginal': '가장자리 뜻',
    'mixed-rank': '참가자 선호 투표',
    'mixed-first': '1등 표',
    'mixed-third': '3등 표',
    'mixed-read':
      '설명이 있는 쪽은 1등 표를 가장 많이 받았지만 3등 표도 훨씬 많이 받았습니다. 어떤 이에게는 설명이 자기를 돌아보게 했고, 어떤 이에게는 두루뭉술한 참견이었습니다. 논문이 함께 적은 효과 크기도 {rEff}과 {rTrust}로 크지 않습니다.',

    'check-title': '수치를 되짚어 보았습니다',
    'check-note':
      '상대 증가율은 곱으로 맞물려야 합니다. 아무 때나보다 17.1% 좋고 거기서 32.8% 더 좋다면, 아무 때나보다는 (1.171 x 1.328 - 1)만큼 좋아야 합니다.',
    'check-compose': '세 갈래 표의 맞물림',
    'check-abstract': '초록의 "수용도 8.0% 넘게"',
    'check-four': '네 갈래 표의 맞물림',
    'check-ours': '표에서 다시 계산',
    'check-theirs': '논문이 적은 값',
    'check-match': '맞습니다',
    'check-mismatch': '어긋납니다',
    'check-verdict':
      '세 갈래 표는 소수 첫째 자리까지 맞물리고, 초록의 8.0%도 표에서 8.04%로 되짚어집니다. 네 갈래 표는 2.1%p쯤 어긋나는데, 통계 모형의 사후 추정값이라 곱이 정확히 맞물릴 이유가 없습니다. 맞물리는 척하지 않고 그대로 둡니다.',

    'scale-title': '실험의 크기',
    'scale-note': '이 수들이 위의 모든 막대를 받치고 있습니다.',
    'scale-line':
      '{participants}명이 {weeks}주. 앱 {apps}종에서 {sessions}번의 사용, {minutes}분. 라벨 {labels}개(들어갈 때 {entry}%, 쓰는 중 {using}%, 나올 때 {exit}%). 개입을 만난 {encounters}번 가운데 {feedback}번({rate}%)에 답을 남겼습니다.',

    'took-title': '논문에서 무엇을 가져왔는가',
    'took-yes':
      '가져온 것: 표 1의 사다리, 12자리·5분·10분이라는 설계 상수, 표 2의 설명 두 층위와 아홉 예시, 그리고 본문이 숫자로 적은 결과 전부.',
    'took-no':
      '가져오지 않은 것: 기계학습 모델과 SHAP 계산입니다. 이 사이트는 연산 예산이 0이고, 모델 없이 흉내 내면 지어낸 예측이 됩니다. 그래서 이 화면의 개입은 예측하지 않고 단추로 뜹니다. 그림에만 실린 막대값과 참가자 71명의 기록도 옮기지 않았습니다.',
    'took-mine':
      '제가 더한 것: 마찰 과제를 직접 겪어 보게 한 것, 그리고 상대 증가율이 곱으로 맞물리는지 되짚은 것입니다.',
  },

  en: {
    title: 'When to Step In',
    summary:
      'Plenty of systems tell you to put the phone down. Everything hangs on when they say it. From 71 people living with one for eight weeks, the value of learning the moment is written down in numbers.',
    capability:
      'Go through the intervention yourself, then compare four rungs, from barging in at random to learning the moment and explaining why, each by the numbers the paper reports',
    'paper-label': 'The study behind this page',
    'full-text': 'Full text',

    'demo-title': 'Go through it',
    'demo-note':
      'This is what the paper’s intervention looks like. To keep using the app you must retype twelve digits. Twelve is the paper’s number: prior work called 10 to 20 digits a medium load, chosen so the friction delays rather than punishes.',
    'demo-launch': 'Say you were about to keep scrolling. Bring up the intervention.',
    'demo-overlay-title': 'You have been on this a while',
    'demo-overlay-body': 'To continue, type the digits below exactly.',
    'demo-typed': 'Your input',
    'demo-continue': 'Continue using',
    'demo-leave': 'Leave the app',
    'demo-wrong': 'The digits do not match. Check again.',
    'demo-left': 'You put it down. In the experiment, this choice was recorded as receptivity.',
    'demo-continued': 'You chose to continue. Typing all twelve digits and staying anyway was also a recorded outcome.',
    'demo-again': 'Go through it again',
    'demo-why': 'Why now',
    'demo-why-note':
      'The real system shows the top three feature categories computed with SHAP. Choosing which three was the model’s job; there is no model here, so three are shown pre-chosen.',
    'demo-more': 'See more',
    'demo-less': 'Fold',
    'demo-mine':
      'This demonstration predicts nothing. It appears when you press the button. Knowing when to appear is the heart of the paper, and that knowledge lives in the model, which is not here.',

    'ladder-title': 'A ladder of four',
    'ladder-note':
      'The experiment raised the same intervention screen at four kinds of moment: at random, at a learned moment, at a continually re-learned moment, and with the reason attached. Bars are relative to random (Control) at 1.0, and only numbers stated in the text are carried.',
    'c-control': 'At random',
    'c-personalized': 'At a learned moment',
    'c-adaptiveWoExp': 'Re-learning nightly',
    'c-adaptiveWExp': 'With the reason',
    'cd-control': 'Barges in at random. The baseline to compare against.',
    'cd-personalized': 'A model trained once on four weeks of your record picks the moment. Then it stays fixed.',
    'cd-adaptiveWoExp': 'Re-trains nightly on your feedback. The moments keep improving.',
    'cd-adaptiveWExp': 'Re-trains, and explains why now with the top three categories. The paper’s Time2Stop.',
    'f-ml': 'ML',
    'f-adaptive': 'Adaptive',
    'f-explainable': 'Explains',
    'm-accuracy': 'Judged well-timed',
    'm-receptivity': 'Actually put down',
    'vs-control': 'vs. random',
    'design-line': 'Re-measured every {interval} minutes; a {cooldown}-minute rest after each intervention. The model updates nightly.',

    'mixed-title': 'The mixed effect of explaining',
    'mixed-note':
      'With the reason attached, interventions were better received. Yet the drop in app visits was larger without explanations, and only that drop was statistically significant. Winning people over and changing behavior turned out not to be the same thing.',
    'mixed-visits': 'Drop in app visits vs. baseline week',
    'mixed-sig': 'significant',
    'mixed-marginal': 'marginal',
    'mixed-rank': 'Preference votes',
    'mixed-first': 'ranked 1st',
    'mixed-third': 'ranked 3rd',
    'mixed-read':
      'The explained version drew the most first-place votes and far more third-place votes. For some, the reasons prompted reflection; for others, they were vague meddling. The effect sizes the paper reports alongside, {rEff} and {rTrust}, are not large.',

    'check-title': 'The numbers, recomputed',
    'check-note':
      'Relative gains must compose multiplicatively. If it is 17.1% better than random, and 32.8% better than that, it must be (1.171 × 1.328 − 1) better than random.',
    'check-compose': 'Three-way table composition',
    'check-abstract': 'The abstract’s "receptivity by >8.0%"',
    'check-four': 'Four-way table composition',
    'check-ours': 'Recomputed from the table',
    'check-theirs': 'Stated in the paper',
    'check-match': 'agrees',
    'check-mismatch': 'disagrees',
    'check-verdict':
      'The three-way table composes to one decimal place, and the abstract’s 8.0% recomputes to 8.04%. The four-way table is off by about 2.1 points — post-hoc estimates from a statistical model have no duty to compose exactly. It is left as it is rather than made to pretend.',

    'scale-title': 'The size of the experiment',
    'scale-note': 'These numbers hold up every bar above.',
    'scale-line':
      '{participants} people, {weeks} weeks. {sessions} sessions across {apps} apps, {minutes} minutes. {labels} labels ({entry}% at entry, {using}% while using, {exit}% at exit). Of {encounters} intervention encounters, {feedback} ({rate}%) received an answer.',

    'took-title': 'What was taken from the paper',
    'took-yes':
      'Taken: the ladder of Table 1, the design constants of twelve digits, five minutes and ten; the two explanation levels and nine examples of Table 2; and every result the text states in numbers.',
    'took-no':
      'Not taken: the ML model and the SHAP computation. This site has a compute budget of zero, and imitating a model without one yields invented predictions. So the intervention here does not predict; it appears at a button. Bar values that live only in figures, and the records of the 71 participants, are not carried either.',
    'took-mine':
      'Added by me: making the friction task something you go through, and recomputing whether the relative gains compose.',
  },

  ja: {
    title: '割り込む頃合い',
    summary:
      'もう見るのをやめようと言ってくれる仕組みは多くありますが、いつ言うかがすべてです。71人が8週間を過ごした実験に、頃合いを学ぶ介入がどれほど効くかが数字で残っています。',
    capability:
      'やめようという介入を自分で経験し、無作為に割り込むものから頃合いを学び理由まで説明するものまで、四つの段がそれぞれどれほど効いたかを論文の数値で見比べる',
    'paper-label': 'もとになった研究',
    'full-text': '全文',

    'demo-title': '経験してみてください',
    'demo-note':
      'この論文の介入はこういう姿です。使い続けるには十二桁の数字をそのまま打たなければなりません。十二桁は論文が決めた値です。先行研究が10〜20桁を中程度の負荷と呼び、この摩擦が罰ではなく遅延になるよう選ばれた数です。',
    'demo-launch': 'アプリを使い続けようとしていたとして、介入を出してみます',
    'demo-overlay-title': 'ずいぶん長く見ています',
    'demo-overlay-body': '続けるには、下の数字をそのまま入力してください。',
    'demo-typed': '入力',
    'demo-continue': '使い続ける',
    'demo-leave': 'やめる',
    'demo-wrong': '数字が違います。もう一度確かめてください。',
    'demo-left': '手放しました。実験ではこの選択が受容度として記録されました。',
    'demo-continued': '使い続けるを選びました。十二桁を打ち切ってなお見続けること、それも実験が記録した選択肢でした。',
    'demo-again': 'もう一度経験する',
    'demo-why': 'なぜ今か',
    'demo-why-note':
      '実際の仕組みはSHAPで計算した上位三つの区分をここに示します。どの三つかを選ぶのはモデルの仕事でしたが、この画面にモデルはないので、三つを選び置いたまま示します。',
    'demo-more': '詳しく見る',
    'demo-less': '畳む',
    'demo-mine':
      'この実演は予測しません。ボタンを押すと現れます。いつ現れるべきかを知ることこそこの論文の核心で、その知はモデルの中にあり、モデルはここにありません。',

    'ladder-title': '四つの段',
    'ladder-note':
      '実験は同じ介入画面を四つの頃合いに出しました。無作為に、学んだ頃合いに、学び直し続ける頃合いに、そして理由を添えて。棒は無作為(Control)を1.0とした相対値で、本文が数字で記したものだけを移しました。',
    'c-control': '無作為に',
    'c-personalized': '学んだ頃合いに',
    'c-adaptiveWoExp': '学び直しながら',
    'c-adaptiveWExp': '理由まで添えて',
    'cd-control': '無作為に割り込みます。比べるための底の線です。',
    'cd-personalized': '四週間の記録で一度学んだモデルが頃合いを選びます。その後は据え置きです。',
    'cd-adaptiveWoExp': '毎晩フィードバックで学び直します。頃合いはだんだん良くなります。',
    'cd-adaptiveWExp': '学び直しながら、なぜ今かを上位三区分で説明します。論文のTime2Stopです。',
    'f-ml': '機械学習',
    'f-adaptive': '適応',
    'f-explainable': '説明',
    'm-accuracy': '頃合いが合っていたという答え',
    'm-receptivity': '実際に手放した',
    'vs-control': '無作為比',
    'design-line': '{interval}分ごとに測り直し、一度割り込めば{cooldown}分休みます。モデルは毎晩更新されます。',

    'mixed-title': '説明の食い違う効果',
    'mixed-note':
      '理由を説明すると介入はよく受け入れられました。ところがアプリ訪問が減った幅は説明のない方が大きく、そちらだけが統計的に有意でした。心をつかむことと行動を変えることは、同じ仕事ではなかったのです。',
    'mixed-visits': '基準週比のアプリ訪問減少',
    'mixed-sig': '有意な減少',
    'mixed-marginal': '境界的',
    'mixed-rank': '参加者の選好投票',
    'mixed-first': '1位票',
    'mixed-third': '3位票',
    'mixed-read':
      '説明のある方は1位票を最も多く集めながら、3位票もずっと多く集めました。ある人には説明が自省を促し、ある人には漠然としたお節介でした。論文が併記した効果量も{rEff}と{rTrust}で、大きくありません。',

    'check-title': '数値を計算し直しました',
    'check-note':
      '相対の増加率は掛け算で噛み合うはずです。無作為より17.1%良く、そこからさらに32.8%良いなら、無作為よりは(1.171 × 1.328 − 1)だけ良いはずです。',
    'check-compose': '三区分の表の噛み合い',
    'check-abstract': '要旨の「受容度8.0%超」',
    'check-four': '四区分の表の噛み合い',
    'check-ours': '表から計算し直した値',
    'check-theirs': '論文に記された値',
    'check-match': '一致します',
    'check-mismatch': '食い違います',
    'check-verdict':
      '三区分の表は小数第一位まで噛み合い、要旨の8.0%も表から8.04%と計算し直せます。四区分の表は約2.1ポイントずれますが、統計モデルの事後推定に正確に噛み合う義理はありません。噛み合うふりをさせず、そのまま置いておきます。',

    'scale-title': '実験の大きさ',
    'scale-note': 'この数がすべての棒を支えています。',
    'scale-line':
      '{participants}人が{weeks}週間。{apps}種のアプリで{sessions}回の使用、{minutes}分。ラベル{labels}件(入るとき{entry}%、使用中{using}%、出るとき{exit}%)。介入に出会った{encounters}回のうち{feedback}回({rate}%)に答えが残されました。',

    'took-title': '論文から何を取ったか',
    'took-yes':
      '取ったもの:表1の段、十二桁・5分・10分という設計の定数、表2の説明の二層と九つの例、そして本文が数字で記した結果のすべて。',
    'took-no':
      '取らなかったもの:機械学習モデルとSHAPの計算です。この場所は計算予算が0で、モデルなしで真似れば作られた予測になります。だからこの画面の介入は予測せず、ボタンで現れます。図にしかない棒の値と、71人の記録も移していません。',
    'took-mine':
      '私が足したもの:摩擦の課題を実際に経験できるようにしたことと、相対増加率が掛け算で噛み合うかを計算し直したことです。',
  },
};
