/** 길찾기 태도 문구 사전 (ko / en / ja). */

import type { Dictionary } from '../../core/i18n';

export type RouteKey =
  | 'title' | 'summary' | 'capability' | 'paper-label'
  | 'setup-title' | 'setup-note' | 'trips' | 'seed' | 'reshuffle'
  | 'm-follow' | 'm-modify' | 'm-background'
  | 'w-follow' | 'w-modify' | 'w-background'
  | 'maps-title' | 'maps-note' | 'legend-road' | 'legend-used' | 'legend-start' | 'legend-goal'
  | 'table-title' | 'table-note'
  | 'col-mode' | 'col-minutes' | 'col-regret' | 'col-glances' | 'col-routes' | 'col-top' | 'col-seen'
  | 'best-time' | 'best-calm'
  | 'lost-title' | 'lost-note' | 'lost-follow' | 'lost-modify' | 'lost-background'
  | 'how-title' | 'how-app' | 'how-me' | 'how-why'
  | 'warning'
  | 'took-title' | 'took-yes' | 'took-no';

export const routeDictionary: Dictionary<RouteKey> = {
  ko: {
    title: '길찾기를 대하는 세 가지 태도',
    summary:
      '앱이 시키는 대로 갈지, 아는 구간은 고쳐 갈지, 켜만 두고 늘 다니던 길로 갈지. 셋을 같은 도시 같은 날씨에 태워 보고 각각 무엇을 잃는지 재 드립니다.',
    capability:
      '격자 도시에서 세 태도로 여러 날 다녀 보고 걸린 시간·후회·화면 본 횟수·길의 되풀이 정도를 재어 견준다',
    'paper-label': '바탕이 된 연구',

    'setup-title': '설정',
    'setup-note': '세 태도가 같은 도시, 같은 날씨를 겪습니다. 그래야 견줄 수 있습니다.',
    trips: '며칠이나 다니는가',
    seed: '도시와 날씨',
    reshuffle: '다른 도시로',

    'm-follow': '따르기',
    'm-modify': '고치기',
    'm-background': '켜 두기',
    'w-follow': '앱이 시키는 대로 갑니다. 화면을 자주 봅니다.',
    'w-modify': '앱의 길을 받되, 아는 구간은 내가 아는 대로 고쳐 갑니다.',
    'w-background': '늘 다니던 길로 갑니다. 앱은 켜 두기만 하고, 크게 밀린다고 할 때만 듣습니다.',

    'maps-title': '지나온 자취',
    'maps-note':
      '선이 굵을수록 자주 지난 길입니다. 태도마다 도시를 다르게 쓰는 것이 눈에 보입니다.',
    'legend-road': '도시의 길',
    'legend-used': '지나온 길',
    'legend-start': '출발',
    'legend-goal': '도착',

    'table-title': '무엇을 얻고 무엇을 잃었나',
    'table-note':
      '후회는 모든 것을 알았다면 걸렸을 시간과의 차이입니다. 도시가 작아 그 값을 정확히 낼 수 있으므로, 후회는 결코 0보다 작아지지 않습니다.',
    'col-mode': '태도',
    'col-minutes': '평균 시간',
    'col-regret': '후회',
    'col-glances': '화면 본 횟수',
    'col-routes': '길의 갈래',
    'col-top': '가장 잦은 길',
    'col-seen': '지나 본 길',
    'best-time': '시간을 가장 덜 잃음',
    'best-calm': '화면을 가장 덜 봄',

    'lost-title': '태도마다 잃는 것',
    'lost-note': '돌려 보면 셋이 서로 다른 값을 치릅니다.',
    'lost-follow':
      '따르기는 큰길의 오늘을 잘 압니다. 다만 앱은 골목이 평소 어떤지를 거의 모르고, 그래서 늘 느린 골목으로 들여보내기도 합니다. 그리고 화면을 가장 자주 봐야 합니다.',
    'lost-modify':
      '고치기는 앱이 놓친 몫만 얹습니다. 앱의 오늘에 내가 아는 평소를 더하는 것이라 대개 가장 적게 잃습니다. 다만 그러려면 먼저 그 길을 다녀 봤어야 합니다.',
    'lost-background':
      '켜 두기는 화면을 거의 보지 않습니다. 대신 오늘 무슨 일이 났는지 늦게 알아, 시간에서 가장 많이 잃습니다.',

    'how-title': '앱과 나는 서로 다른 것을 안다',
    'how-app':
      '앱은 오늘을 봅니다. 차가 많이 다니는 큰길일수록 잘 보고, 골목은 자료가 얕아 흐릿하게 봅니다.',
    'how-me':
      '나는 평소를 압니다. 다녀 본 길이 대개 얼마나 걸리는지는 알지만, 오늘 거기서 무슨 일이 났는지는 모릅니다.',
    'how-why':
      '두 앎을 그냥 바꿔치기하면 안 됩니다. 하나는 오늘이고 하나는 평소라, 한 지도에 섞으면 뜻이 어긋난 수를 견주게 됩니다. 그래서 고치기는 앱이 놓쳤을 몫만큼만 얹습니다.',

    warning:
      '여기 도시도 날씨도 지어낸 것이고, 세 태도를 숫자로 옮긴 규칙도 지어낸 것입니다. 논문에서 가져온 것은 태도가 셋이라는 것과 저마다 치르는 값이 다르다는 짜임이지, 어떤 수치도 아닙니다.',

    'took-title': '연구에서 가져온 것과 가져오지 않은 것',
    'took-yes':
      '가져온 것 — 길찾기 앱을 대하는 방식이 따르기·고치기·켜 두기 셋으로 묶인다는 것, 그리고 태도마다 바라는 것과 걸리는 것이 다르다는 짜임.',
    'took-no':
      '가져오지 않은 것 — 서른 번의 면담과 그 이야기와 인용, 그리고 수치 전부. 화면의 도시와 규칙은 이 페이지가 지어냈습니다.',
  },

  en: {
    title: 'Three ways to hold a map',
    summary:
      'Do what the app says, override it where you know better, or leave it running and drive your usual way. All three face the same city and the same traffic, and each pays a different price.',
    capability:
      'runs three navigation attitudes over many days in a grid city and measures travel time, regret, screen glances and how repetitive the routes become',
    'paper-label': 'Based on',

    'setup-title': 'Setup',
    'setup-note': 'All three meet the same city and the same weather. Otherwise there is nothing to compare.',
    trips: 'How many days',
    seed: 'City and traffic',
    reshuffle: 'Another city',

    'm-follow': 'Follow',
    'm-modify': 'Modify',
    'm-background': 'Background',
    'w-follow': 'Do what the app says. Look at the screen often.',
    'w-modify': 'Take the app’s route, but override the stretches you know.',
    'w-background': 'Drive your usual way. The app is on, and you listen only when it says something is badly jammed.',

    'maps-title': 'Where the wheels went',
    'maps-note': 'Thicker lines were driven more often. Each attitude wears the city differently.',
    'legend-road': 'roads',
    'legend-used': 'driven',
    'legend-start': 'start',
    'legend-goal': 'end',

    'table-title': 'What each one gained and lost',
    'table-note':
      'Regret is the gap against what the trip would have taken with perfect knowledge. The city is small enough to compute that exactly, so regret can never fall below zero.',
    'col-mode': 'Attitude',
    'col-minutes': 'Mean minutes',
    'col-regret': 'Regret',
    'col-glances': 'Glances',
    'col-routes': 'Distinct routes',
    'col-top': 'Most-used route',
    'col-seen': 'Roads driven',
    'best-time': 'loses the least time',
    'best-calm': 'looks at the screen least',

    'lost-title': 'What each attitude pays',
    'lost-note': 'Run it and the three prices separate.',
    'lost-follow':
      'Following reads today’s main roads well. But the app barely knows what a side street is usually like, so it will send you down one that is always slow — and it asks for your eyes most often.',
    'lost-modify':
      'Modifying adds only what the app missed: today from the app, the usual from you. It generally loses the least. The catch is that you must have driven the road first.',
    'lost-background':
      'Leaving it in the background costs almost no attention. In exchange you learn about today too late, and lose the most time.',

    'how-title': 'The app and you know different things',
    'how-app':
      'The app sees today. The busier the road, the better it sees; on side streets the data is thin and the picture blurs.',
    'how-me':
      'You know the usual. You know roughly how long a road you drive takes — but not what happened on it this morning.',
    'how-why':
      'The two cannot simply be swapped. One is today and one is typical; mixed into a single map you end up comparing quantities that do not mean the same thing. So modifying adds only the share the app would have missed.',

    warning:
      'The city, the traffic and the rules that turn three attitudes into numbers were all invented here. What came from the paper is that there are three attitudes and that each pays differently — not any figure.',

    'took-title': 'What this page took from the paper, and what it left',
    'took-yes':
      'Taken — that interaction with navigation apps falls into follow, modify and background, and that each carries its own motivations and frictions.',
    'took-no':
      'Left — the thirty interviews with their accounts and quotations, and every number. The city and its rules are this page’s invention.',
  },

  ja: {
    title: '地図との三つの付き合い方',
    summary:
      'アプリの言うとおりに行くか、知っている区間は自分流に直すか、点けたまま いつもの道を行くか。三つを同じ街の同じ天気に走らせ、それぞれ何を失うかを測ります。',
    capability:
      '格子の街で三つの態度を何日も走らせ、所要時間・後悔・画面を見た回数・道の繰り返し具合を測って比べる',
    'paper-label': '下敷きにした研究',

    'setup-title': '設定',
    'setup-note': '三つとも同じ街、同じ天気に遭います。でなければ比べられません。',
    trips: '何日ぶん',
    seed: '街と天気',
    reshuffle: '別の街へ',

    'm-follow': '従う',
    'm-modify': '直す',
    'm-background': '点けておく',
    'w-follow': 'アプリの言うとおりに行きます。画面をよく見ます。',
    'w-modify': 'アプリの道を受けつつ、知っている区間は自分の知る通りに直します。',
    'w-background': 'いつもの道を行きます。アプリは点けておくだけで、ひどく混むと言うときだけ聞きます。',

    'maps-title': '通った跡',
    'maps-note': '線が太いほどよく通った道です。態度ごとに街の使い方が違うのが見えます。',
    'legend-road': '街の道',
    'legend-used': '通った道',
    'legend-start': '出発',
    'legend-goal': '到着',

    'table-title': '何を得て何を失ったか',
    'table-note':
      '後悔は、すべてを知っていたら要した時間との差です。街が小さいのでその値を厳密に出せるため、後悔が0を下回ることはありません。',
    'col-mode': '態度',
    'col-minutes': '平均時間',
    'col-regret': '後悔',
    'col-glances': '画面を見た回数',
    'col-routes': '道の種類',
    'col-top': '最も多い道',
    'col-seen': '通った道',
    'best-time': '時間の損が最も少ない',
    'best-calm': '画面を最も見ない',

    'lost-title': '態度ごとに払うもの',
    'lost-note': '回してみると三つの代価が分かれます。',
    'lost-follow':
      '従うは大通りの今日をよく読みます。ただしアプリは路地が普段どうかをほとんど知らず、いつも遅い路地へ入れてしまうこともあります。そして最も頻繁に目を求めます。',
    'lost-modify':
      '直すはアプリが取りこぼした分だけを足します。アプリの今日に自分の知る普段を重ねるので、たいてい最も損が少なくなります。ただしそのためには先にその道を走っている必要があります。',
    'lost-background':
      '点けておくは注意をほとんど使いません。代わりに今日何が起きたかを知るのが遅れ、時間で最も損をします。',

    'how-title': 'アプリと自分は別のことを知っている',
    'how-app':
      'アプリは今日を見ます。車の多い道ほどよく見え、路地はデータが薄くぼやけます。',
    'how-me':
      '自分は普段を知っています。走っている道がだいたい何分かは分かりますが、今朝そこで何が起きたかは分かりません。',
    'how-why':
      '二つは単純に入れ替えられません。一方は今日、一方は普段であり、一枚の地図に混ぜると意味の違う数を比べることになります。ですから直すは、アプリが取りこぼしたはずの分だけを足します。',

    warning:
      'ここの街も天気も、三つの態度を数に移した規則も、すべてこしらえたものです。論文から取ったのは態度が三つあることと、それぞれ払うものが違うという骨組みであって、いかなる数値でもありません。',

    'took-title': '研究から取ったものと、取らなかったもの',
    'took-yes':
      '取ったもの — ナビアプリとの関わりが「従う・直す・点けておく」の三つにまとまること、そして態度ごとに動機とつまずきが異なるという骨組み。',
    'took-no':
      '取らなかったもの — 三十件の面談とその語りと引用、そして数値のすべて。画面の街と規則はこのページの作り物です。',
  },
};
