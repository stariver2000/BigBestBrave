/** 말할 틈 문구 사전 (ko / en / ja). */

import type { Dictionary } from '../../core/i18n';

export type WindowKey =
  | 'title' | 'summary' | 'capability' | 'paper-label'
  | 'setup-title' | 'setup-note' | 'standing' | 'attention' | 'standing-note' | 'attention-note'
  | 's-missing' | 's-omw' | 's-objective' | 's-fight' | 's-flame'
  | 's-missing-note' | 's-omw-note' | 's-objective-note' | 's-fight-note' | 's-flame-note'
  | 'verdict-say' | 'verdict-silence' | 'verdict-window' | 'verdict-closed' | 'verdict-seconds'
  | 'c-chat' | 'c-ping' | 'c-emote' | 'c-vote' | 'c-silence'
  | 'w-chat' | 'w-ping' | 'w-emote' | 'w-vote' | 'w-silence'
  | 'table-title' | 'table-note'
  | 'col-channel' | 'col-value' | 'col-lands' | 'col-left' | 'col-reach' | 'col-clarity'
  | 'col-hands' | 'col-friction' | 'col-window' | 'never' | 'always'
  | 'plot-title' | 'plot-note' | 'plot-x' | 'plot-y' | 'plot-zero'
  | 'observed-title' | 'observed-ping' | 'observed-vote' | 'observed-notice'
  | 'warning'
  | 'took-title' | 'took-yes' | 'took-no';

export const windowDictionary: Dictionary<WindowKey> = {
  ko: {
    title: '말할 틈',
    summary:
      '급한 판에서 한마디를 할지 말지, 한다면 어느 통로로 할지를 값으로 따져 드립니다. 대개는 창이 몇 초뿐이고, 지고 있으면 그 창이 거의 닫힙니다.',
    capability:
      '정보의 값이 줄어드는 속도, 손이 멈추는 값, 오해의 손해, 말의 무게를 함께 셈해 지금 어느 통로로 말해야 하는지와 그 창이 몇 초 남았는지를 낸다',
    'paper-label': '바탕이 된 연구',

    'setup-title': '지금 무슨 일이 벌어졌나',
    'setup-note': '상황을 고르고, 아래 두 가지를 자기 형편에 맞게 옮겨 보세요.',
    standing: '지금 내 성적',
    attention: '팀이 깨어 있는 정도',
    'standing-note':
      '지고 있으면 같은 말도 덜 먹힙니다. 논문에서 참가자들은 지고 있는 사람에게는 팀을 이끌 자격이 없다고 여겼고, 본인도 그렇게 여겨 입을 다물었습니다.',
    'attention-note':
      '팀이 딴 데 보고 있으면 무엇을 보내도 닿지 않습니다. 논문에서 아홉 명이 "그저 못 봤다"고 답했습니다.',

    's-missing': '적이 사라졌다',
    's-omw': '지금 간다',
    's-objective': '큰 목표가 열린다',
    's-fight': '한창 싸우는 중',
    's-flame': '팀원이 화를 낸다',
    's-missing-note': '몇 초만 지나면 이미 늦은 정보입니다. 잘못 읽히면 엉뚱한 곳을 보게 됩니다.',
    's-omw-note': '값도 급함도 중간입니다. 잘못 읽혀도 크게 손해될 것이 없습니다.',
    's-objective-note': '값이 크고 오래갑니다. 다만 잘못 읽히면 팀이 통째로 죽습니다.',
    's-fight-note': '값은 큰데 손이 하나도 남지 않습니다. 1초가 가장 비싼 순간입니다.',
    's-flame-note': '무슨 말을 해도 얻을 것이 거의 없고 위험만 남습니다.',

    'verdict-say': '지금은 이것',
    'verdict-silence': '아무 말도 하지 않는 편이 낫습니다',
    'verdict-window': '이 안에 시작해야 합니다',
    'verdict-closed': '이미 늦었습니다',
    'verdict-seconds': '초',

    'c-chat': '타이핑',
    'c-ping': '핑',
    'c-emote': '이모트',
    'c-vote': '투표',
    'c-silence': '침묵',
    'w-chat': '뜻은 또렷하지만 손이 2초 넘게 멈추고, 말이라서 나중에 적대로 읽힐 위험이 가장 큽니다.',
    'w-ping': '거의 공짜입니다. 대신 뜻이 갈립니다.',
    'w-emote': '뜻을 거의 싣지 못합니다. 분위기만 옮깁니다.',
    'w-vote': '뜻은 또렷한데 넷 중 셋이 응해야 이뤄집니다.',
    'w-silence': '아무 값도 없고 아무 값도 치르지 않습니다. 그래서 다른 모든 선택의 기준선입니다.',

    'table-title': '통로마다의 셈',
    'table-note':
      '기대값이 0보다 커야 할 만한 말입니다. 침묵이 0이므로, 0 아래로 내려간 통로는 안 하느니만 못합니다.',
    'col-channel': '통로',
    'col-value': '기대값',
    'col-lands': '닿는 데',
    'col-left': '그때 남은 값',
    'col-reach': '닿을 확률',
    'col-clarity': '뜻의 또렷함',
    'col-hands': '손이 멈춘 값',
    'col-friction': '나중의 위험',
    'col-window': '남은 창',
    never: '없음',
    always: '계속',

    'plot-title': '창이 닫히는 모양',
    'plot-note':
      '가로는 지금부터 몇 초 뒤에 말을 시작하는가, 세로는 그때의 기대값입니다. 선이 0을 지나는 지점이 그 통로의 창이 닫히는 순간입니다.',
    'plot-x': '몇 초 뒤에 시작 (초)',
    'plot-y': '기대값',
    'plot-zero': '침묵',

    'observed-title': '논문이 관찰한 것',
    'observed-ping':
      '핑은 끊임없이 쓰입니다. 가장 흔한 두 가지가 분당 0.267회와 0.164회였고, 마스터 이상에서는 0.489회와 0.245회로 늘었습니다. 잘하는 사람일수록 말 없이 더 많이 주고받습니다.',
    'observed-vote':
      '관찰된 수십 번의 오브젝트 투표 가운데 세 표를 넘긴 것이 하나도 없었습니다. 이 화면에서도 투표는 거의 언제나 손해로 나옵니다. 넷 중 셋이 응해야 하는데, 알아채는 사람이 그만큼 되지 않기 때문입니다.',
    'observed-notice':
      '왜 답하지 않았느냐는 물음에 아홉 명이 "다른 일이 벌어지는 중이라 아예 알아채지 못했다"고 답했습니다.',

    warning:
      '여기 숫자는 이 페이지가 지어낸 것입니다. 논문은 질적 연구라 이런 값을 재지 않았습니다. 논문에서 가져온 것은 무엇이 무엇을 좌우하는가 하는 구조뿐이고, 그 구조를 눈으로 보게 하려고 숫자를 붙였습니다. 이 값들을 근거로 삼지 마세요.',

    'took-title': '연구에서 가져온 것과 가져오지 않은 것',
    'took-yes':
      '가져온 것 — 여섯 가지 구조입니다. 타이핑이 게임 시간을 먹는 것, 창을 놓치면 정보가 영영 나가지 못하는 것, 알아채지 못해 답하지 않는 것, 투표가 문턱을 넘지 못하는 것, 지고 있으면 말의 무게가 줄어드는 것, 그리고 말이 오간다는 사실 자체가 앞으로의 위험으로 읽히는 것.',
    'took-no':
      '가져오지 않은 것 — 숫자 전부와, 22명의 이야기와 인용. 이 화면은 논문을 요약하지 않고, 논문이 말한 구조를 만져 볼 수 있게 만들 뿐입니다.',
  },

  en: {
    title: 'The window to speak',
    summary:
      'Whether a word is worth saying right now, and through which channel, worked out as a value. Usually the window is a few seconds wide — and if you are losing, it has all but closed.',
    capability:
      'weighs how fast information loses its value, what a stopped hand costs, what a misreading costs, and how much your word carries — then names the channel to use and how many seconds the window has left',
    'paper-label': 'Based on',

    'setup-title': 'What just happened',
    'setup-note': 'Pick a situation, then move the two dials to match your own game.',
    standing: 'How you are doing',
    attention: 'How awake the team is',
    'standing-note':
      'Losing players are heard less. In the paper, participants held that someone who is behind has no right to lead the team — and silenced themselves on the same reasoning.',
    'attention-note':
      'If the team is looking elsewhere, nothing you send arrives. Nine participants answered that they simply never noticed.',

    's-missing': 'An enemy has vanished',
    's-omw': 'On my way',
    's-objective': 'A major objective is opening',
    's-fight': 'Mid-fight',
    's-flame': 'A teammate is raging',
    's-missing-note': 'Stale within seconds. Misread, it sends someone to watch the wrong place.',
    's-omw-note': 'Middling value, middling urgency. A misreading costs almost nothing.',
    's-objective-note': 'Valuable and long-lived — but a misreading kills the whole team.',
    's-fight-note': 'High value, no hands to spare. This is when a second costs the most.',
    's-flame-note': 'Almost nothing to gain from anything you say; only the risk remains.',

    'verdict-say': 'Use this',
    'verdict-silence': 'Better to say nothing',
    'verdict-window': 'start within',
    'verdict-closed': 'Already too late',
    'verdict-seconds': 's',

    'c-chat': 'Typing',
    'c-ping': 'Ping',
    'c-emote': 'Emote',
    'c-vote': 'Vote',
    'c-silence': 'Silence',
    'w-chat': 'Unambiguous, but your hands stop for over two seconds — and words carry the greatest risk of being read as hostility later.',
    'w-ping': 'Nearly free. In exchange, the meaning splits.',
    'w-emote': 'Carries almost no meaning. It moves mood, not information.',
    'w-vote': 'Unambiguous, but three of four teammates must answer for it to happen.',
    'w-silence': 'Costs nothing and gains nothing. That is what makes it the baseline for every other choice.',

    'table-title': 'Channel by channel',
    'table-note':
      'A word is worth saying when its expected value clears zero. Silence sits at zero, so anything below it is worse than not speaking.',
    'col-channel': 'Channel',
    'col-value': 'Expected',
    'col-lands': 'Lands after',
    'col-left': 'Value left',
    'col-reach': 'Reaches',
    'col-clarity': 'Clarity',
    'col-hands': 'Hands stopped',
    'col-friction': 'Later risk',
    'col-window': 'Window',
    never: 'none',
    always: 'open',

    'plot-title': 'How the window closes',
    'plot-note':
      'Across: how many seconds from now you begin. Up: the expected value then. Where a line crosses zero, that channel’s window has closed.',
    'plot-x': 'begin after (s)',
    'plot-y': 'expected value',
    'plot-zero': 'silence',

    'observed-title': 'What the paper observed',
    'observed-ping':
      'Pings run constantly. The two commonest were used 0.267 and 0.164 times per minute on average, rising to 0.489 and 0.245 among Master players and above. The better the player, the more they say without words.',
    'observed-vote':
      'Across dozens of observed objective votes, not one drew more than three votes. This screen makes voting a loss almost everywhere too — three of four must answer, and that many rarely notice.',
    'observed-notice':
      'Asked why they had not replied, nine participants said they simply never noticed it among everything else happening.',

    warning:
      'These numbers are this page’s invention. The paper is qualitative and measured nothing of the kind. What was taken from it is the structure — what governs what — and numbers were attached only to make that structure visible. Do not cite these values.',

    'took-title': 'What this page took from the paper, and what it left',
    'took-yes':
      'Taken — six mechanisms: that typing eats game time; that a missed window means the information never leaves; that people do not reply because they never noticed; that votes fail to clear their threshold; that a losing player’s word carries less weight; and that the mere fact of talking reads as a warning of future breakdown.',
    'took-no':
      'Left — every number, and the twenty-two accounts and quotations. This screen does not summarise the paper; it only makes the structure the paper describes something you can handle.',
  },

  ja: {
    title: '話す隙',
    summary:
      '差し迫った場面で一言を言うべきか、言うならどの経路かを値として計ります。たいてい隙は数秒しかなく、負けているとその隙はほとんど閉じています。',
    capability:
      '情報の価値が減る速さ、手が止まる代価、誤読の損、言葉の重みを合わせて計り、いまどの経路で言うべきかと隙が何秒残っているかを出す',
    'paper-label': '下敷きにした研究',

    'setup-title': 'いま何が起きたか',
    'setup-note': '場面を選び、下の二つをご自身の状況に合わせて動かしてください。',
    standing: 'いまの自分の成績',
    attention: 'チームが起きている度合い',
    'standing-note':
      '負けていると同じ言葉も通りません。論文の参加者は、負けている者にチームを導く資格はないと考え、自らもそう考えて口をつぐみました。',
    'attention-note':
      'チームが余所を見ていれば何を送っても届きません。九人が「そもそも気づかなかった」と答えました。',

    's-missing': '敵が消えた',
    's-omw': 'いま向かう',
    's-objective': '大きな目標が開く',
    's-fight': '交戦の最中',
    's-flame': '味方が怒っている',
    's-missing-note': '数秒で古びます。誤読されると見当違いの場所を見張らせます。',
    's-omw-note': '価値も急ぎ具合も中くらい。誤読されてもほとんど損はありません。',
    's-objective-note': '価値が大きく長持ちします。ただし誤読されるとチームごと落ちます。',
    's-fight-note': '価値は大きいのに手が一つも余りません。一秒が最も高い瞬間です。',
    's-flame-note': '何を言っても得るものはほとんどなく、危険だけが残ります。',

    'verdict-say': 'いまはこれ',
    'verdict-silence': '何も言わないほうがましです',
    'verdict-window': 'この内に始めること',
    'verdict-closed': 'すでに遅すぎます',
    'verdict-seconds': '秒',

    'c-chat': 'タイピング',
    'c-ping': 'ping',
    'c-emote': 'エモート',
    'c-vote': '投票',
    'c-silence': '沈黙',
    'w-chat': '意味は明快ですが手が二秒以上止まり、言葉であるぶん後で敵意と読まれる危険が最も大きいです。',
    'w-ping': 'ほぼ無料です。そのかわり意味が割れます。',
    'w-emote': '意味をほとんど載せられません。気分を移すだけです。',
    'w-vote': '意味は明快ですが、四人のうち三人が応じないと成立しません。',
    'w-silence': '何も得ず何も払いません。だからこそ他のすべての選択の基準線になります。',

    'table-title': '経路ごとの計算',
    'table-note':
      '期待値が0を超えて初めて言う価値があります。沈黙が0なので、0を下回った経路は言わないほうがましです。',
    'col-channel': '経路',
    'col-value': '期待値',
    'col-lands': '届くまで',
    'col-left': '残る価値',
    'col-reach': '届く確率',
    'col-clarity': '意味の明快さ',
    'col-hands': '手が止まる代価',
    'col-friction': '後の危険',
    'col-window': '残る隙',
    never: 'なし',
    always: '継続',

    'plot-title': '隙が閉じる形',
    'plot-note':
      '横は今から何秒後に言い始めるか、縦はそのときの期待値です。線が0を横切る点が、その経路の隙が閉じる瞬間です。',
    'plot-x': '何秒後に開始 (秒)',
    'plot-y': '期待値',
    'plot-zero': '沈黙',

    'observed-title': '論文が観察したこと',
    'observed-ping':
      'pingは絶えず使われます。最も多い二つは平均で毎分0.267回と0.164回、マスター以上では0.489回と0.245回に増えました。上手い人ほど言葉なしで多くをやり取りします。',
    'observed-vote':
      '観察された数十回の目標投票のうち、三票を超えたものは一つもありませんでした。この画面でも投票はほぼ常に損になります。四人中三人が応じる必要があるのに、それだけの人が気づかないからです。',
    'observed-notice':
      'なぜ答えなかったのかという問いに、九人が「他のことが起きていて、そもそも気づかなかった」と答えました。',

    warning:
      'ここの数値はこのページの作り物です。論文は質的研究であり、この種の値を測っていません。取ったのは何が何を左右するかという構造だけで、その構造を目に見せるために数を付けました。この値を根拠にしないでください。',

    'took-title': '研究から取ったものと、取らなかったもの',
    'took-yes':
      '取ったもの — 六つの仕組み。タイピングが試合の時間を食うこと、隙を逃せば情報は永遠に出ないこと、気づかないから返さないこと、投票が閾値を越えないこと、負けていると言葉の重みが減ること、そして話すという事実自体が今後の崩壊の兆しと読まれること。',
    'took-no':
      '取らなかったもの — 数値のすべてと、二十二人の語りと引用。この画面は論文を要約せず、論文の述べる構造を手で触れるようにするだけです。',
  },
};
