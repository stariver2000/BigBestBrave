/** 회복 문구 사전 (ko / en / ja). */

import type { Dictionary } from '../../core/i18n';

export type RepairKey =
  | 'title' | 'summary' | 'capability' | 'paper-label' | 'full-text'
  | 'funnel-title' | 'funnel-note' | 'f-phase1' | 'f-deployed' | 'f-used' | 'f-no-occasion' | 'funnel-read'
  | 'peak-title' | 'peak-note'
  | 'focus-title' | 'focus-note' | 'k-social' | 'k-formal' | 'k-toxic'
  | 'kd-social' | 'kd-formal' | 'kd-toxic'
  | 'axes-title' | 'axes-note' | 'axes-mine'
  | 's-where' | 's-how' | 's-when'
  | 'x-size' | 'x-mediation' | 'x-flexibility' | 'x-temporal'
  | 'x-severity' | 'x-ties' | 'x-frequency' | 'x-investment'
  | 'r-size-low' | 'r-size-high' | 'r-mediation-low' | 'r-mediation-high'
  | 'r-flexibility-low' | 'r-temporal-low' | 'r-severity-high'
  | 'r-ties-low' | 'r-ties-high' | 'r-frequency-low' | 'r-frequency-high'
  | 'r-investment-low'
  | 'p-size-0' | 'p-size-1' | 'p-mediation-0' | 'p-mediation-1'
  | 'p-flexibility-0' | 'p-flexibility-1' | 'p-temporal-0' | 'p-temporal-1'
  | 'p-severity-0' | 'p-severity-1' | 'p-ties-0' | 'p-ties-1'
  | 'p-frequency-0' | 'p-frequency-1' | 'p-investment-0' | 'p-investment-1'
  | 'poles-note'
  | 'v-fits' | 'v-edge' | 'v-misfits'
  | 'shape-peakMiddle' | 'shape-towardHigh' | 'shape-towardLow'
  | 'read-title' | 'read-note' | 'read-counts' | 'read-blocked' | 'read-blocked-why'
  | 'open-title' | 'open-note'
  | 'took-title' | 'took-yes' | 'took-no' | 'took-mine';

export const repairDictionary: Dictionary<RepairKey> = {
  ko: {
    title: '사과가 통하는 자리',
    summary:
      '온라인에서 누가 누구를 다치게 했을 때, 벌 대신 사과를 주선하는 도구가 있습니다. 그런데 그 도구는 아무 데서나 통하지 않습니다. 여덟 개의 축 가운데 넷은 가운데에서만 맞습니다.',
    capability:
      '공동체를 여덟 개의 축에 놓아 보고, 회복적 도구가 어느 자리에서 통하고 어느 끝에서 왜 어긋나는지 논문의 조건으로 가른다',
    'paper-label': '바탕이 된 연구',
    'full-text': '전문',

    'funnel-title': '먼저 이 수부터 보십시오',
    'funnel-note':
      '연구진은 디스코드 운영자를 모아 자기들이 만든 사과 주선 봇을 실제 공동체에 붙여 보게 했습니다. 아래가 그 결과입니다. 설계 공간을 그린 논문이면서 자기 도구가 몇 번 쓰였는지를 숨기지 않고 적었습니다. 이 화면이 이 논문을 믿는 까닭이 여기 있습니다.',
    'f-phase1': '1단계에 들어온 운영자',
    'f-deployed': '자기 공동체에 붙여 본 사람',
    'f-used': '실제로 쓸 일이 생긴 사람',
    'f-no-occasion': '붙였지만 쓸 만한 일이 없던 사람',
    'funnel-read':
      '붙여 본 여섯 가운데 넷은 넉 주 동안 이 도구를 쓸 만한 일을 만나지 못했습니다. 도구가 나쁘다는 뜻이 아니라, 통하는 자리가 좁다는 뜻입니다. 그 자리가 어디인지가 이 논문의 내용입니다.',

    'peak-title': '많을수록 좋은 것이 아닙니다',
    'peak-note':
      '여덟 축 가운데 {peak}개는 가운데에서 가장 잘 맞고 양 끝이 모두 어긋납니다. 서버가 클수록 좋은 것도, 사이가 가까울수록 좋은 것도, 다툼이 잦을수록 좋은 것도 아닙니다. 논문이 축마다 그 까닭을 따로 적어 두었습니다. 넷이라고 세어 앞에 내놓은 것은 이 화면입니다.',

    'focus-title': '어떤 공동체입니까',
    'focus-note':
      '이것은 눈금이 아니라 갈래입니다. 그래서 축과 섞지 않고 따로 둡니다.',
    'k-social': '사람이 중심인 곳',
    'k-formal': '스쳐 가는 곳',
    'k-toxic': '거친 말이 규범인 곳',
    'kd-social':
      '창작자의 서버, 언어 학습, 정신 건강, 예술처럼 사람들이 서로 오래 마주치는 곳입니다. 논문이 가장 잘 맞는다고 한 자리입니다.',
    'kd-formal':
      '기술 지원이나 짧은 질의응답처럼 답만 얻고 떠나는 곳입니다. 서로에게 마음을 두지 않으니 사과할 까닭도 생기지 않습니다.',
    'kd-toxic':
      '거친 말이 그 장르의 규범이 된 곳입니다. 쓸 일은 가장 많지만 기대되는 효과는 가장 낮습니다. 운영자들은 이 자리에서 보상보다 위험을 더 무겁게 보았습니다.',

    'axes-title': '여덟 개의 축',
    'axes-note':
      '슬라이더를 옮겨 보십시오. 축마다 어느 자리가 맞는지는 논문이 정했고, 다섯 칸을 세 갈래에 붙인 규칙은 제가 정했습니다.',
    'axes-mine':
      '논문은 가운데가 좋다거나 유연한 쪽이 좋다까지만 말했지, 그 사이 칸이 어떻다고는 말하지 않았습니다. 사이 칸을 가장자리로 부르는 것은 제 규칙입니다.',

    's-where': '어떤 공동체에서',
    's-how': '어떤 운영 방식으로',
    's-when': '어떤 상황에서',

    'x-size': '공동체의 크기',
    'x-mediation': '운영진이 기우는 쪽',
    'x-flexibility': '절차의 유연함',
    'x-temporal': '내다보는 시간',
    'x-severity': '해악의 무게',
    'x-ties': '당사자들의 사이',
    'x-frequency': '다툼의 잦기',
    'x-investment': '머무는 마음',

    'r-size-low': '너무 작으면 새 도구가 필요하지 않습니다. 운영자가 직접 이야기를 붙일 수 있습니다.',
    'r-size-high': '너무 크면 처리할 일이 밀려듭니다. 보고 조치하고 넘어갈 뿐 마주 앉을 틈이 없습니다.',
    'r-mediation-low': '벌로만 처리하는 팀은 사과를 다룰 절차도 감각도 갖고 있지 않습니다.',
    'r-mediation-high': '대화를 가장 중히 여기는 팀은 오히려 직접 하려 합니다. 봇은 거들 뿐이라고 봅니다.',
    'r-flexibility-low': '규칙이 굳은 팀에서는 사과가 끼어들 틈이 없습니다. 했으면 받는다, 그뿐입니다.',
    'r-temporal-low': '당장을 보는 팀에게 이 도구는 느립니다. 기다려 주고 살펴야 하기 때문입니다.',
    'r-severity-high':
      '신체 위협이나 금전 피해에는 대화가 갚음이 되지 않습니다. 오히려 일을 키울 수 있고, 논문은 이런 경우 플랫폼이나 법에 넘기라고 적었습니다.',
    'r-ties-low': '서로 모르는 사이면 사과를 받아도 받은 줄 모릅니다. 익명이고 스쳐 갑니다.',
    'r-ties-high': '너무 가까우면 따로 풀거나, 이미 등져서 말을 섞지 않습니다.',
    'r-frequency-low': '드물게 일어나면 직접 처리하는 편이 쉽습니다.',
    'r-frequency-high': '너무 잦으면 그만큼 규범이 느슨하다는 뜻이라, 사과가 잘 듣지 않습니다.',
    'r-investment-low': '스쳐 가는 사람들에게는 사과할 까닭이 생기지 않습니다.',

    'p-size-0': '아주 작음',
    'p-size-1': '아주 큼',
    'p-mediation-0': '벌로만',
    'p-mediation-1': '대화로만',
    'p-flexibility-0': '규칙대로',
    'p-flexibility-1': '그때그때',
    'p-temporal-0': '당장',
    'p-temporal-1': '길게',
    'p-severity-0': '가벼운 마찰',
    'p-severity-1': '위협이나 사기',
    'p-ties-0': '모르는 사이',
    'p-ties-1': '아주 가깝거나 등진 사이',
    'p-frequency-0': '거의 없음',
    'p-frequency-1': '끊이지 않음',
    'p-investment-0': '스쳐 감',
    'p-investment-1': '서로에게 마음을 둠',
    'poles-note':
      '양 끝의 이름 가운데 셋은 논문의 절 제목에서 그대로 왔습니다(대화 대 행동, 유연함 대 규칙, 길게 대 당장). 나머지는 본문에 적힌 설명을 제가 짧게 줄인 것입니다.',

    'v-fits': '맞습니다',
    'v-edge': '가장자리입니다',
    'v-misfits': '어긋납니다',

    'shape-peakMiddle': '가운데가 봉우리',
    'shape-towardHigh': '오른쪽이 맞음',
    'shape-towardLow': '왼쪽이 맞음',

    'read-title': '읽어 보면',
    'read-note': '점수가 아니라 셈입니다. 논문이 점수를 매기지 않았으므로 여기서도 매기지 않습니다.',
    'read-counts': '여덟 축 가운데',
    'read-blocked': '여기서는 이 도구를 쓰지 마십시오',
    'read-blocked-why':
      '나머지 셈은 뜻이 없습니다. 논문은 이 무게의 해악에는 대화가 적절하지 않다고 못박았습니다.',

    'open-title': '아직 모르는 것',
    'open-note':
      '논문이 스스로 적어 둔 빈자리입니다. 사과를 시작했다가 중간에 그만두면 무엇이 남는지 아직 아무도 모릅니다. 사과를 청했는데 아무 답도 오지 않는 경우가 가장 나쁘다고 운영자들은 말했습니다. 거절보다 침묵이 더 아픕니다.',

    'took-title': '논문에서 무엇을 가져왔는가',
    'took-yes':
      '가져온 것: 5장의 기회 공간, 여덟 축과 각 축의 양 끝과 어긋나는 까닭, 4.2절의 깔때기, 6.2절이 밝힌 빈자리.',
    'took-no':
      '가져오지 않은 것: 숫자 전부입니다. 질적 연구라 축에 눈금이 없고, 그래서 이 화면에도 점수가 없습니다. 몇 점 같은 것을 만들면 논문에 없는 저울을 세우는 일이 됩니다. 표 1의 참가자 인적사항도, 봇의 화면 그림도 옮기지 않았습니다.',
    'took-mine':
      '제가 더한 것: 다섯 칸을 세 갈래에 붙이는 규칙, 그리고 가운데가 봉우리인 축이 넷이라고 세어 앞에 내놓은 것입니다.',
  },

  en: {
    title: 'Where an Apology Lands',
    summary:
      'When someone harms someone else online, there are tools that arrange an apology instead of a punishment. But they do not work just anywhere. Of eight axes, four fit only in the middle.',
    capability:
      'Place a community on eight axes and see where a restorative tool lands, and at which end it fails and why, judged by the conditions the paper states',
    'paper-label': 'The study behind this page',
    'full-text': 'Full text',

    'funnel-title': 'Start with these numbers',
    'funnel-note':
      'The authors recruited Discord moderators and had them run their own apology bot in real communities. Below is what happened. A paper that maps a design space, and still writes down how few times its own tool was used. That is why this page trusts it.',
    'f-phase1': 'Moderators in phase 1',
    'f-deployed': 'Ran it in their community',
    'f-used': 'Actually had occasion to use it',
    'f-no-occasion': 'Ran it but no occasion arose',
    'funnel-read':
      'Four of the six who ran it met no occasion worth using it on in four weeks. That does not make the tool bad. It means the place where it lands is narrow. Where that place is, is what the paper is about.',

    'peak-title': 'More is not better',
    'peak-note':
      'Of the eight axes, {peak} peak in the middle and fail at both ends. A bigger server is not better, closer ties are not better, more frequent conflict is not better. The paper gives a reason at each end. Counting them as four and putting it up front is this page’s doing.',

    'focus-title': 'What kind of community',
    'focus-note': 'This is a kind, not a scale. So it sits apart from the axes rather than mixed in.',
    'k-social': 'Built around people',
    'k-formal': 'Passing through',
    'k-toxic': 'Harsh talk is the norm',
    'kd-social':
      'Creator servers, language learning, mental health, the arts — places where people keep meeting each other. The paper’s best fit.',
    'kd-formal':
      'Technical support, quick questions: get an answer and leave. Nobody is invested in anyone, so no reason to apologise arises.',
    'kd-toxic':
      'Places where harsh talk is the genre’s norm. The most occasions to use it, the least expected effect. Moderators weighed the risk here more heavily than the reward.',

    'axes-title': 'Eight axes',
    'axes-note':
      'Move the sliders. Which position fits is the paper’s; mapping five steps onto three verdicts is mine.',
    'axes-mine':
      'The paper says the middle is best, or that fluid is better, and stops there. Calling the step in between an edge is my rule.',

    's-where': 'In which community',
    's-how': 'Through which practice',
    's-when': 'Under which circumstance',

    'x-size': 'Size of the community',
    'x-mediation': 'Where the moderators lean',
    'x-flexibility': 'Flexibility of procedure',
    'x-temporal': 'How far ahead they look',
    'x-severity': 'Weight of the harm',
    'x-ties': 'Ties between those involved',
    'x-frequency': 'How often conflict arises',
    'x-investment': 'How much people stay',

    'r-size-low': 'Too small and no new tool is needed; moderators can hold the conversation themselves.',
    'r-size-high': 'Too large and the queue never empties. Look, act, move on — no room to sit down together.',
    'r-mediation-low': 'A team that only punishes has neither the procedure nor the feel for handling an apology.',
    'r-mediation-high': 'A team that prizes conversation most would rather do it themselves. A bot only assists.',
    'r-flexibility-low': 'Where the rules are fixed, an apology has nowhere to fit. You did it, you get this.',
    'r-temporal-low': 'To a team looking at right now, this tool is slow. It asks you to wait and watch.',
    'r-severity-high':
      'For physical threats or money lost, conversation does not pay it back. It can make things worse, and the paper says to hand these to the platform or the law.',
    'r-ties-low': 'Between strangers an apology arrives without landing. Anonymous, passing through.',
    'r-ties-high': 'Too close and they settle it privately, or the bad blood is such that they will not speak.',
    'r-frequency-low': 'If it happens rarely, handling it yourself is simply easier.',
    'r-frequency-high': 'Too often means the norms are loose, and a loose norm blunts an apology.',
    'r-investment-low': 'People passing through never acquire a reason to apologise.',

    'p-size-0': 'very small',
    'p-size-1': 'very large',
    'p-mediation-0': 'action only',
    'p-mediation-1': 'conversation only',
    'p-flexibility-0': 'strictly rule-based',
    'p-flexibility-1': 'fluid',
    'p-temporal-0': 'immediate',
    'p-temporal-1': 'long-term',
    'p-severity-0': 'mild friction',
    'p-severity-1': 'threats or scams',
    'p-ties-0': 'strangers',
    'p-ties-1': 'close friends or bad blood',
    'p-frequency-0': 'almost never',
    'p-frequency-1': 'constant',
    'p-investment-0': 'passing through',
    'p-investment-1': 'invested in each other',
    'poles-note':
      'Three of these pairs come straight from the paper section titles (conversation vs. action, fluid vs. rule-based, long-term vs. short-term). The rest I shortened from what the text describes.',

    'v-fits': 'fits',
    'v-edge': 'at the edge',
    'v-misfits': 'does not fit',

    'shape-peakMiddle': 'peaks in the middle',
    'shape-towardHigh': 'fits to the right',
    'shape-towardLow': 'fits to the left',

    'read-title': 'Reading it back',
    'read-note': 'A count, not a score. The paper assigns no score, so neither does this page.',
    'read-counts': 'of eight axes',
    'read-blocked': 'Do not use this tool here',
    'read-blocked-why':
      'The rest of the count means nothing. The paper is firm that conversation is not appropriate for harm of this weight.',

    'open-title': 'What is still unknown',
    'open-note':
      'A gap the authors wrote down themselves. Nobody yet knows what a half-finished apology leaves behind. Moderators said the worst case is asking for an apology and receiving no answer at all. Silence hurts more than refusal.',

    'took-title': 'What was taken from the paper',
    'took-yes':
      'Taken: the opportunity space of section 5, the eight axes with their ends and the reason each end fails, the funnel from section 4.2, and the gap named in section 6.2.',
    'took-no':
      'Not taken: every number. This is qualitative work; the axes carry no scale, so this page carries no score. Inventing one would erect a measure the paper does not have. The participant demographics in Table 1 and the screenshots of the bot are not carried either.',
    'took-mine':
      'Added by me: the rule mapping five steps onto three verdicts, and counting the middle-peaking axes as four and saying so up front.',
  },

  ja: {
    title: '謝罪が届く場所',
    summary:
      'オンラインで誰かが誰かを傷つけたとき、罰の代わりに謝罪を取り持つ道具があります。けれどもその道具はどこでも効くわけではありません。八つの軸のうち四つは、真ん中でしか合いません。',
    capability:
      '共同体を八つの軸に置き、修復的な道具がどこで効き、どちらの端でなぜ外れるかを論文の条件で分ける',
    'paper-label': 'もとになった研究',
    'full-text': '全文',

    'funnel-title': 'まずこの数から',
    'funnel-note':
      '著者らはDiscordの運営者を集め、自分たちが作った謝罪の取り持ち役のボットを実際の共同体で動かしてもらいました。下がその結果です。設計空間を描いた論文でありながら、自分の道具が何度使われたかを隠さず書いています。この画面がこの論文を信じる理由はここにあります。',
    'f-phase1': '第1段階に入った運営者',
    'f-deployed': '自分の共同体に入れた人',
    'f-used': '実際に使う機会があった人',
    'f-no-occasion': '入れたが使う機会がなかった人',
    'funnel-read':
      '入れた六人のうち四人は、四週間のあいだ使うに値する出来事に出会いませんでした。道具が悪いという意味ではなく、効く場所が狭いという意味です。その場所がどこかが、この論文の中身です。',

    'peak-title': '多いほど良いのではありません',
    'peak-note':
      '八つの軸のうち{peak}つは真ん中で最もよく合い、両端で外れます。サーバーが大きいほど良いのでも、仲が近いほど良いのでも、争いが多いほど良いのでもありません。論文は軸ごとにその理由を書いています。四つと数えて前に出したのはこの画面です。',

    'focus-title': 'どんな共同体ですか',
    'focus-note': 'これは目盛りではなく種類です。だから軸と混ぜず別に置きます。',
    'k-social': '人が中心の場',
    'k-formal': '通り過ぎる場',
    'k-toxic': '荒い言葉が規範の場',
    'kd-social':
      '創作者のサーバー、語学学習、心の健康、芸術のように、人が長く顔を合わせる場です。論文が最もよく合うとした場所です。',
    'kd-formal':
      '技術支援や短い質疑のように、答えだけ得て去る場です。互いに気を置かないので、謝る理由も生まれません。',
    'kd-toxic':
      '荒い言葉がその分野の規範になった場です。使う機会は最も多いのに、期待される効果は最も低い。運営者はここで報いより危うさを重く見ました。',

    'axes-title': '八つの軸',
    'axes-note':
      'つまみを動かしてみてください。どの位置が合うかは論文が決め、五つの目盛りを三つの判定に当てる規則は私が決めました。',
    'axes-mine':
      '論文は真ん中が良い、柔らかい方が良い、とまでしか言っておらず、その間の目盛りについては言っていません。間を縁と呼ぶのは私の規則です。',

    's-where': 'どんな共同体で',
    's-how': 'どんな運び方で',
    's-when': 'どんな場面で',

    'x-size': '共同体の大きさ',
    'x-mediation': '運営が傾く側',
    'x-flexibility': '手続きの柔らかさ',
    'x-temporal': '見通す時間',
    'x-severity': '害の重さ',
    'x-ties': '当事者どうしの間柄',
    'x-frequency': '争いの多さ',
    'x-investment': 'とどまる気持ち',

    'r-size-low': '小さすぎれば新しい道具は要りません。運営者が自分で話をつなげます。',
    'r-size-high': '大きすぎれば処理が押し寄せます。見て、処し、次へ。向かい合う隙がありません。',
    'r-mediation-low': '罰だけで処理する組は、謝罪を扱う手順も勘も持っていません。',
    'r-mediation-high': '対話を最も重んじる組は、かえって自分でやろうとします。ボットは添えるだけだと見ます。',
    'r-flexibility-low': '規則が固まった組では謝罪の入る隙がありません。したならこう、それだけです。',
    'r-temporal-low': '今を見る組にとってこの道具は遅い。待って見守ることを求めるからです。',
    'r-severity-high':
      '身体への脅しや金銭の被害には、対話は償いになりません。かえって事を大きくしかねず、論文はこうした場合は運営元か法に委ねよと書いています。',
    'r-ties-low': '見知らぬ間柄では、謝罪が届いても届いたと分かりません。匿名で、通り過ぎます。',
    'r-ties-high': '近すぎれば別に片づけるか、すでに背を向けて言葉を交わしません。',
    'r-frequency-low': 'まれにしか起きないなら、自分で処理する方が楽です。',
    'r-frequency-high': '多すぎれば規範が緩いということで、緩い規範は謝罪を鈍らせます。',
    'r-investment-low': '通り過ぎる人には、謝る理由が生まれません。',

    'p-size-0': 'ごく小さい',
    'p-size-1': 'ごく大きい',
    'p-mediation-0': '罰だけ',
    'p-mediation-1': '対話だけ',
    'p-flexibility-0': '規則どおり',
    'p-flexibility-1': 'その都度',
    'p-temporal-0': '今すぐ',
    'p-temporal-1': '長い目で',
    'p-severity-0': '軽い摩擦',
    'p-severity-1': '脅しや詐欺',
    'p-ties-0': '見知らぬ間柄',
    'p-ties-1': 'ごく近いか背を向けた間柄',
    'p-frequency-0': 'ほとんど起きない',
    'p-frequency-1': '絶え間ない',
    'p-investment-0': '通り過ぎる',
    'p-investment-1': '互いに気を置く',
    'poles-note':
      '両端の名のうち三つは論文の節題からそのまま来ています(対話対行動、柔らかさ対規則、長い目対今すぐ)。残りは本文の説明を私が短くまとめたものです。',

    'v-fits': '合います',
    'v-edge': '縁です',
    'v-misfits': '外れます',

    'shape-peakMiddle': '真ん中が峰',
    'shape-towardHigh': '右が合う',
    'shape-towardLow': '左が合う',

    'read-title': '読んでみると',
    'read-note': '点数ではなく数え上げです。論文が点数をつけていないので、ここでもつけません。',
    'read-counts': '八つの軸のうち',
    'read-blocked': 'ここではこの道具を使わないでください',
    'read-blocked-why':
      '残りの数え上げに意味はありません。論文はこの重さの害に対話は適さないと明言しています。',

    'open-title': 'まだ分かっていないこと',
    'open-note':
      '著者が自ら書き留めた空白です。謝罪を始めて途中でやめたとき何が残るのかは、まだ誰も知りません。謝罪を求めたのに何の返事もない場合が最も悪いと運営者は言いました。拒まれるより黙られる方が痛いのです。',

    'took-title': '論文から何を取ったか',
    'took-yes':
      '取ったもの:5章の機会空間、八つの軸とその両端と外れる理由、4.2節の漏斗、6.2節が挙げた空白。',
    'took-no':
      '取らなかったもの:数のすべてです。質的研究なので軸に目盛りがなく、だからこの画面にも点数がありません。点数を作れば論文にない秤を立てることになります。表1の参加者の属性も、ボットの画面の図も移していません。',
    'took-mine':
      '私が足したもの:五つの目盛りを三つの判定に当てる規則と、真ん中が峰の軸を四つと数えて前に出したことです。',
  },
};
