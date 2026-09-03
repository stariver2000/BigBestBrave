/** 끼어드는 때 문구 사전 (ko / en / ja). */

import type { Dictionary } from '../../core/i18n';

export type MomentKey =
  | 'title' | 'summary' | 'capability' | 'paper-label' | 'full-text'
  | 'demo-title' | 'demo-note' | 'demo-overlay-title' | 'demo-overlay-body'
  | 'demo-typed' | 'demo-continue' | 'demo-leave' | 'demo-wrong'
  | 'demo-why' | 'demo-why-note' | 'demo-mine' | 'ex-title'
  | 'app-short-video' | 'app-social' | 'app-game' | 'app-reading'
  | 'band-morning' | 'band-afternoon' | 'band-evening' | 'band-night'
  | 'day-for' | 'day-min' | 'day-score' | 'day-threshold' | 'day-urge'
  | 'day-learned' | 'day-nothing' | 'day-accepted' | 'day-dismissed' | 'day-quiet'
  | 'day-interval' | 'day-cooldown'
  | 'why-long' | 'why-night' | 'why-here' | 'why-mine'
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

    'demo-title':
      '당신이 가르치는 하루',
    'demo-note':
      '하루가 스스로 흐릅니다. 화면은 다섯 걸음마다 지금이 끼어들 때인지 다시 재고, 그렇다 싶으면 말을 겁니다. 계속 보려면 열두 자리 숫자를 그대로 쳐야 합니다 — 논문이 정한 값입니다. 당신이 어떻게 답하는지를 보고 화면이 배웁니다.',
    'demo-overlay-title': '지금 많이 보고 계십니다',
    'demo-overlay-body': '계속 보시려면 아래 숫자를 그대로 입력해 주세요.',
    'demo-typed': '입력',
    'demo-continue': '계속 쓰기',
    'demo-leave': '그만 보기',
    'demo-wrong': '숫자가 다릅니다. 다시 확인해 주세요.',
    'demo-why': '왜 지금인가',
    'demo-why-note':
      '논문의 시스템은 SHAP으로 상위 세 갈래를 골라 사람에게 보여 주었습니다. 아래는 논문 표 2가 실은 아홉 예시로, 갈래와 사람이 읽을 말과 모델이 쓰던 이름의 세 층입니다. 이 화면의 개입이 대는 까닭은 이것이 아니라 이 화면 자신의 것입니다.',
    'demo-mine':
      '논문의 모델(XGBoost와 SHAP)은 여기 없습니다. 여기서 배우는 것은 규칙 하나뿐입니다 — 자리마다 당신이 받아들인 비율을 세고, 그 비율로 말을 걸지 말지 정합니다. 브라우저 안에서 돌고 아무것도 밖으로 나가지 않습니다. 논문에서 가져온 것은 두 값입니다:',
    'ex-title': '논문은 이렇게 설명했다',
    'app-short-video': '짧은 동영상',
    'app-social': '소셜',
    'app-game': '게임',
    'app-reading': '읽기',
    'band-morning': '아침',
    'band-afternoon': '낮',
    'band-evening': '저녁',
    'band-night': '밤',
    'day-for': '이어서',
    'day-min': '분',
    'day-score': '지금 점수',
    'day-threshold': '말 거는 선',
    'day-urge': '규칙이 낸 값',
    'day-learned': '당신에게서 배운 것',
    'day-nothing': '아직 아무것도 배우지 않았습니다. 처음에는 어느 자리에서나 반반으로 놓고 시작합니다.',
    'day-accepted': '받아들임',
    'day-dismissed': '넘김',
    'day-quiet': '이제 이 자리에서는 말을 걸지 않습니다 —',
    'day-interval': '다시 재는 간격',
    'day-cooldown': '개입 뒤 쉬는 시간',
    'why-long': '이어서 본 시간',
    'why-night': '밤입니다',
    'why-here': '이 자리에서 받아들이신 비율',
    'why-mine': '이 까닭은 이 화면이 실제로 셈에 쓴 것입니다. 논문의 SHAP 계산이 아닙니다.',

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

    'demo-title':
      'A day you teach',
    'demo-note':
      'The day runs on its own. Every five steps the screen asks itself whether now is the moment, and speaks up if it thinks so. To keep going you must type twelve digits exactly — the number the paper chose. How you answer is what it learns from.',
    'demo-overlay-title': 'You have been on this a while',
    'demo-overlay-body': 'To continue, type the digits below exactly.',
    'demo-typed': 'Your input',
    'demo-continue': 'Continue using',
    'demo-leave': 'Leave the app',
    'demo-wrong': 'The digits do not match. Check again.',
    'demo-why': 'Why now',
    'demo-why-note':
      'The real system used SHAP to pick the top three categories to show. Below are the nine examples from the paper’s Table 2 — the category, the readable phrase, and the model’s own feature name. The reasons this page gives are its own, not these.',
    'demo-mine':
      'The paper’s model (XGBoost and SHAP) is not here. What learns here is a single rule: count how often you accepted in each situation, and let that ratio decide whether to speak. It runs inside your browser and nothing leaves it. Two values come from the paper:',
    'ex-title': 'How the paper explained itself',
    'app-short-video': 'Short video',
    'app-social': 'Social',
    'app-game': 'Game',
    'app-reading': 'Reading',
    'band-morning': 'Morning',
    'band-afternoon': 'Afternoon',
    'band-evening': 'Evening',
    'band-night': 'Night',
    'day-for': 'for',
    'day-min': ' min',
    'day-score': 'Score now',
    'day-threshold': 'Speaks above',
    'day-urge': 'from the rule',
    'day-learned': 'What it learned from you',
    'day-nothing': 'Nothing learned yet. Every situation starts at fifty-fifty.',
    'day-accepted': 'accepted',
    'day-dismissed': 'dismissed',
    'day-quiet': 'It will not speak here any more —',
    'day-interval': 'asks again every',
    'day-cooldown': 'rests after each interruption for',
    'why-long': 'Time in this app',
    'why-night': 'It is night',
    'why-here': 'You accepted here',
    'why-mine': 'These reasons are the ones this page actually used. They are not the paper’s SHAP values.',

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

    'demo-title':
      'あなたが教える一日',
    'demo-note':
      '一日がひとりでに流れます。画面は五歩ごとに今が割り込むときかを測り直し、そうだと思えば話しかけます。続けて見るには十二桁の数字をそのまま打たねばなりません — 論文が定めた値です。あなたの答え方から画面が学びます。',
    'demo-overlay-title': 'ずいぶん長く見ています',
    'demo-overlay-body': '続けるには、下の数字をそのまま入力してください。',
    'demo-typed': '入力',
    'demo-continue': '使い続ける',
    'demo-leave': 'やめる',
    'demo-wrong': '数字が違います。もう一度確かめてください。',
    'demo-why': 'なぜ今か',
    'demo-why-note':
      '実際のシステムはSHAPで上位三つの分類を選んで見せていました。以下は論文の表2にある九つの例で、分類・人が読める言い方・モデルが使う名前の三層です。この画面が挙げる理由はこれではなく、この画面自身のものです。',
    'demo-mine':
      '論文のモデル（XGBoostとSHAP）はここにありません。ここで学ぶのは規則ひとつだけです — 場面ごとにあなたが受け入れた割合を数え、その割合で話しかけるかどうかを決めます。ブラウザの中で回り、何も外に出ません。論文から受け取ったのは二つの値です:',
    'ex-title': '論文はこう説明した',
    'app-short-video': 'ショート動画',
    'app-social': 'ソーシャル',
    'app-game': 'ゲーム',
    'app-reading': '読みもの',
    'band-morning': '朝',
    'band-afternoon': '昼',
    'band-evening': '夕方',
    'band-night': '夜',
    'day-for': '続けて',
    'day-min': '分',
    'day-score': '今の点数',
    'day-threshold': '話しかける線',
    'day-urge': '規則が出した値',
    'day-learned': 'あなたから学んだこと',
    'day-nothing': 'まだ何も学んでいません。どの場面も最初は五分五分から始めます。',
    'day-accepted': '受け入れ',
    'day-dismissed': '無視',
    'day-quiet': 'この場面ではもう話しかけません —',
    'day-interval': '測り直す間隔',
    'day-cooldown': '介入のあと休む時間',
    'why-long': '続けて見た時間',
    'why-night': '夜です',
    'why-here': 'この場面で受け入れた割合',
    'why-mine': 'この理由は、この画面が実際に計算に使ったものです。論文のSHAPではありません。',

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
