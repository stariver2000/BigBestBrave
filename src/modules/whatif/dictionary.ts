/** 반사실 문구 사전 (ko / en / ja). */

import type { Dictionary } from '../../core/i18n';

export type WhatifKey =
  | 'title' | 'summary' | 'capability' | 'paper-label'
  | 'log-title' | 'log-note' | 'log-size' | 'records' | 'high-rate'
  | 'target-title' | 'target-note' | 'seen-times' | 'now'
  | 'f-activity' | 'f-place' | 'f-social' | 'f-time'
  | 'v-study' | 'v-work' | 'v-commute' | 'v-rest' | 'v-exercise'
  | 'v-home' | 'v-campus' | 'v-cafe' | 'v-outside'
  | 'v-alone' | 'v-friends' | 'v-family' | 'v-strangers'
  | 'v-morning' | 'v-day' | 'v-evening' | 'v-night'
  | 'cf-title' | 'cf-note' | 'lock' | 'lock-note' | 'cf-empty'
  | 'changes' | 'never-tried' | 'tried' | 'drop'
  | 'why-title' | 'why-note' | 'why-empty' | 'why-sum'
  | 'cause-title' | 'cause-note' | 'cause-naive' | 'cause-matched' | 'cause-pairs' | 'cause-gap'
  | 'cause-up' | 'cause-down' | 'cause-thin'
  | 'warning'
  | 'took-title' | 'took-yes' | 'took-no';

export const whatifDictionary: Dictionary<WhatifKey> = {
  ko: {
    title: '그때 이랬더라면',
    summary:
      '스트레스 기록을 놓고, 무엇을 바꿨더라면 덜 힘들었을지를 남김없이 찾아 드립니다. 바꿀 수 없는 것은 잠가 두고, 바꿀 수 있는 것만 보실 수 있습니다.',
    capability:
      '자기 기록에서 스트레스 모형을 되짚고 상황 320가지를 모두 훑어 반사실을 찾은 뒤, 맥락마다의 이바지를 정확한 섀플리 값으로 내고 짝짓기로 인과까지 가른다',
    'paper-label': '바탕이 된 연구',

    'log-title': '기록',
    'log-note':
      '실제 사람의 기록을 실을 수는 없어 지어냈습니다. 다만 맥락끼리 얽히게 두었습니다. 공부는 주로 학교에서, 운동은 주로 밖에서 하는 식으로요. 그래야 아래 인과 이야기가 뜻을 갖습니다.',
    'log-size': '기록 줄 수',
    records: '줄',
    'high-rate': '높은 스트레스',

    'target-title': '되짚을 상황',
    'target-note': '자주 겪은 상황 여섯 가지입니다. 되짚을 것이 많은 쪽이 먼저 오도록 스트레스가 높은 순으로 놓았습니다.',
    'seen-times': '번 겪음',
    now: '지금',

    'f-activity': '활동',
    'f-place': '장소',
    'f-social': '사회적 상황',
    'f-time': '시간',
    'v-study': '공부',
    'v-work': '일',
    'v-commute': '이동',
    'v-rest': '쉼',
    'v-exercise': '운동',
    'v-home': '집',
    'v-campus': '학교',
    'v-cafe': '카페',
    'v-outside': '바깥',
    'v-alone': '혼자',
    'v-friends': '친구와',
    'v-family': '가족과',
    'v-strangers': '낯선 사람들과',
    'v-morning': '아침',
    'v-day': '낮',
    'v-evening': '저녁',
    'v-night': '밤',

    'cf-title': '이랬더라면',
    'cf-note':
      '상황이 320가지뿐이라 어림잡지 않고 전부 세어 봅니다. 바꾼 것이 적은 순, 그다음 확률이 낮은 순입니다.',
    lock: '잠글 맥락',
    'lock-note': '바꿀 수 없는 것을 잠그면 그것을 건드리지 않는 길만 남습니다.',
    'cf-empty': '남는 길이 없습니다. 잠근 것을 하나 풀어 보세요.',
    changes: '바꾼 수',
    'never-tried': '겪어 본 적 없음',
    tried: '겪어 봄',
    drop: '내려감',

    'why-title': '무엇이 얼마나 내렸나',
    'why-note':
      '고른 길에서 맥락마다의 이바지입니다. 바꾼 맥락이 넷을 넘지 않아 부분집합을 전부 세었고, 그래서 이 막대들을 다 더하면 확률 변화와 정확히 같습니다. 어림이 아닙니다.',
    'why-empty': '위에서 길을 하나 고르시면 여기에 나옵니다.',
    'why-sum': '합',

    'cause-title': '정말 그것 때문인가',
    'cause-note':
      '단순히 평균을 견주면 다른 사정이 섞입니다. 학교에 있을 때 스트레스가 높다 해도, 학교에서 주로 공부를 하기 때문일 수 있습니다. 그래서 나머지 맥락 셋이 똑같은 기록끼리만 짝지어 견줍니다. 두 값이 크게 다르면 그 차이가 곧 섞여 있던 사정입니다.',
    'cause-naive': '단순 차이',
    'cause-matched': '짝지은 차이',
    'cause-pairs': '짝',
    'cause-gap': '섞여 있던 몫',
    'cause-up': '올림',
    'cause-down': '내림',
    'cause-thin': '짝이 적어 믿기 어렵습니다',

    warning:
      '이 기록은 지어낸 것입니다. 여기 나오는 확률과 효과는 지어낸 사람에 대한 것이지 사람 일반에 대한 것이 아닙니다. 논문에서 가져온 것은 방법이지 결과가 아닙니다.',

    'took-title': '연구에서 가져온 것과 가져오지 않은 것',
    'took-yes':
      '가져온 것 — 맥락 넷과, 반사실마다 보여 주는 세 수치(높은 스트레스일 확률, 바꾼 맥락의 수, 전에 겪은 횟수), 겪어 본 것과 아닌 것을 갈라 그리는 것, 바꾸지 않을 맥락을 잠그는 기능, 맥락마다의 이바지를 섀플리 값으로 내는 것, 그리고 거친 정확 짝짓기로 인과를 보는 것.',
    'took-no':
      '가져오지 않은 것 — 실제 사람의 기록, 12명의 실험 결과와 인용, 휴대폰 센서로 맥락을 자동으로 모으는 부분.',
  },

  en: {
    title: 'If it had gone otherwise',
    summary:
      'Take a stress log and find, exhaustively, what could have been changed to make the day easier. Lock whatever you cannot change and only the reachable paths remain.',
    capability:
      'fits a stress model from a personal log, sweeps all 320 situations for counterfactuals, attributes the drop to each context with exact Shapley values, and separates cause from confounding by matching',
    'paper-label': 'Based on',

    'log-title': 'The log',
    'log-note':
      'A real person’s log cannot be shipped, so this one is invented — but with the contexts tangled together. Studying happens mostly on campus, exercise mostly outdoors. Without that tangle the causal section below would have nothing to say.',
    'log-size': 'Entries',
    records: 'entries',
    'high-rate': 'high stress',

    'target-title': 'The situation to revisit',
    'target-note': 'The six situations that occurred most often, ordered by stress so the ones worth revisiting come first.',
    'seen-times': 'times',
    now: 'now',

    'f-activity': 'Activity',
    'f-place': 'Place',
    'f-social': 'Company',
    'f-time': 'Time',
    'v-study': 'studying',
    'v-work': 'working',
    'v-commute': 'commuting',
    'v-rest': 'resting',
    'v-exercise': 'exercising',
    'v-home': 'home',
    'v-campus': 'campus',
    'v-cafe': 'a café',
    'v-outside': 'outdoors',
    'v-alone': 'alone',
    'v-friends': 'with friends',
    'v-family': 'with family',
    'v-strangers': 'among strangers',
    'v-morning': 'morning',
    'v-day': 'daytime',
    'v-evening': 'evening',
    'v-night': 'night',

    'cf-title': 'Had it been',
    'cf-note':
      'With only 320 situations, nothing is approximated — every one is checked. Fewest changes first, then lowest probability.',
    lock: 'Lock',
    'lock-note': 'Lock what you cannot change and only the paths that leave it alone remain.',
    'cf-empty': 'No path left. Try releasing one of the locks.',
    changes: 'changed',
    'never-tried': 'never happened',
    tried: 'happened before',
    drop: 'drop',

    'why-title': 'What brought it down, and by how much',
    'why-note':
      'The contribution of each context in the chosen path. At most four contexts change, so every subset was enumerated — which means these bars sum exactly to the change in probability. Nothing is estimated.',
    'why-empty': 'Choose a path above and it appears here.',
    'why-sum': 'sum',

    'cause-title': 'Was it really that',
    'cause-note':
      'Comparing raw averages mixes other things in. Stress may look high on campus simply because campus is where the studying happens. So each entry is compared only against entries whose other three contexts match exactly. A wide gap between the two numbers is the size of what was mixed in.',
    'cause-naive': 'raw difference',
    'cause-matched': 'matched difference',
    'cause-pairs': 'pairs',
    'cause-gap': 'mixed in',
    'cause-up': 'raises',
    'cause-down': 'lowers',
    'cause-thin': 'too few pairs to trust',

    warning:
      'This log is invented. The probabilities and effects here describe an invented person, not people in general. What was taken from the paper is the method, not any result.',

    'took-title': 'What this page took from the paper, and what it left',
    'took-yes':
      'Taken — the four contexts; the three figures shown per counterfactual (probability of high stress, number of changes, how often it had occurred before); drawing the experienced ones differently from the never-experienced; locking contexts that must not change; attributing the drop with Shapley values; and reading cause through coarsened exact matching.',
    'took-no':
      'Left — real logs, the twelve-participant study and its quotations, and the phone sensing that collects context automatically.',
  },

  ja: {
    title: 'あのときこうしていたら',
    summary:
      'ストレスの記録をもとに、何を変えていれば楽だったかを漏れなく探します。変えられないものは鍵をかけ、変えられるものだけを見られます。',
    capability:
      '記録からストレスの模型を起こし、320通りの状況をすべて調べて反事実を見つけ、文脈ごとの寄与を厳密なシャプレー値で出し、対応づけで因果まで分ける',
    'paper-label': '下敷きにした研究',

    'log-title': '記録',
    'log-note':
      '実在の人の記録は載せられないのでこしらえました。ただし文脈どうしを絡めてあります。勉強は主に学校で、運動は主に外で、というように。そうでないと下の因果の話が意味を持ちません。',
    'log-size': '記録の行数',
    records: '行',
    'high-rate': '高ストレス',

    'target-title': '振り返る場面',
    'target-note': 'よく起きた六つの場面です。振り返る値打ちのあるものが先に来るよう、ストレスの高い順に並べました。',
    'seen-times': '回',
    now: 'いま',

    'f-activity': '活動',
    'f-place': '場所',
    'f-social': '誰と',
    'f-time': '時間',
    'v-study': '勉強',
    'v-work': '仕事',
    'v-commute': '移動',
    'v-rest': '休み',
    'v-exercise': '運動',
    'v-home': '家',
    'v-campus': '学校',
    'v-cafe': 'カフェ',
    'v-outside': '外',
    'v-alone': 'ひとり',
    'v-friends': '友人と',
    'v-family': '家族と',
    'v-strangers': '見知らぬ人の中で',
    'v-morning': '朝',
    'v-day': '昼',
    'v-evening': '夕方',
    'v-night': '夜',

    'cf-title': 'こうしていたら',
    'cf-note':
      '状況は320通りしかないので、近似せずすべて数えます。変えた数の少ない順、次に確率の低い順です。',
    lock: '鍵をかける',
    'lock-note': '変えられないものに鍵をかけると、それに触れない道だけが残ります。',
    'cf-empty': '残る道がありません。鍵を一つ外してみてください。',
    changes: '変えた数',
    'never-tried': '経験なし',
    tried: '経験あり',
    drop: '下がり幅',

    'why-title': '何がどれだけ下げたか',
    'why-note':
      '選んだ道での文脈ごとの寄与です。変わる文脈は多くて四つなので部分集合をすべて数え上げました。ですからこの棒を全部足すと確率の変化と厳密に一致します。近似ではありません。',
    'why-empty': '上で道を一つ選ぶとここに出ます。',
    'why-sum': '合計',

    'cause-title': '本当にそれのせいか',
    'cause-note':
      '単純に平均を比べると別の事情が混ざります。学校でストレスが高く見えても、学校で勉強しているからかもしれません。そこで残り三つの文脈がまったく同じ記録どうしだけを対応づけて比べます。二つの値が大きく違えば、その差が混ざっていた事情の大きさです。',
    'cause-naive': '単純な差',
    'cause-matched': '対応づけた差',
    'cause-pairs': '対',
    'cause-gap': '混ざっていた分',
    'cause-up': '上げる',
    'cause-down': '下げる',
    'cause-thin': '対が少なく当てになりません',

    warning:
      'この記録はこしらえたものです。ここに出る確率や効果はこしらえた人についてのものであって、人一般についてではありません。論文から取ったのは方法であって結果ではありません。',

    'took-title': '研究から取ったものと、取らなかったもの',
    'took-yes':
      '取ったもの — 四つの文脈、反事実ごとに示す三つの数値(高ストレスの確率・変えた文脈の数・過去に経験した回数)、経験の有無で描き分けること、変えない文脈に鍵をかける機能、寄与をシャプレー値で出すこと、そして粗い厳密対応づけで因果を見ること。',
    'took-no':
      '取らなかったもの — 実在の記録、12名の実験結果と引用、携帯のセンサーで文脈を自動収集する部分。',
  },
};
