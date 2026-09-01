/** 서로 기록하기 문구 사전 (ko / en / ja). */

import type { Dictionary } from '../../core/i18n';

export type PeerKey =
  | 'title' | 'summary' | 'capability' | 'paper-label'
  | 'sample-note' | 'clear' | 'restore'
  | 'mine-title' | 'mine-note' | 'q-self' | 'q-guess' | 'q-sees'
  | 'a-habit' | 'a-trait' | 'a-talk' | 'a-trigger' | 'a-stress' | 'a-strength'
  | 'd-habit' | 'd-trait' | 'd-talk' | 'd-trigger' | 'd-stress' | 'd-strength'
  | 'code-title' | 'code-note' | 'my-code' | 'their-code' | 'paste' | 'copied' | 'copy'
  | 'e-empty' | 'e-letter' | 'e-length' | 'e-version' | 'e-checksum' | 'code-ok'
  | 'win-title' | 'win-note' | 'open' | 'blind' | 'hidden' | 'unknown'
  | 'win-legend' | 'win-self' | 'win-sees'
  | 'split-title' | 'split-note' | 'withheld' | 'misjudged' | 'total-gap'
  | 'meta-title' | 'meta-note' | 'meta-error' | 'asym-title' | 'asym-note'
  | 'i-see' | 'seen-by' | 'asym-even' | 'asym-more' | 'asym-less'
  | 'top-blind' | 'top-blind-none'
  | 'warning'
  | 'took-title' | 'took-yes' | 'took-no';

export const peerDictionary: Dictionary<PeerKey> = {
  ko: {
    title: '남의 눈에 비친 나',
    summary:
      '가까운 사람과 서로를 기록해 보는 도구입니다. 한쪽 답만으로는 아무것도 그려지지 않습니다. 상대의 답이 있어야 창이 완성됩니다.',
    capability:
      '나와 상대의 답으로 조하리의 창 네 칸을 정확히 내고, 어긋남을 알면서 감춘 몫과 짐작이 빗나간 몫으로 가른다',
    'paper-label': '바탕이 된 연구',

    'sample-note':
      '지금은 예시로 지어낸 두 사람이 들어 있습니다. 눈금을 움직이면 바로 내 것이 됩니다.',
    clear: '비우고 내가 채우기',
    restore: '예시 되돌리기',

    'mine-title': '내가 적는 것',
    'mine-note':
      '자리마다 셋을 적습니다. 논문이 참가자에게 살펴보라고 준 여섯 자리 그대로입니다.',
    'q-self': '나는 안다',
    'q-guess': '상대가 볼 것이다',
    'q-sees': '나는 상대에게서 본다',

    'a-habit': '습관',
    'a-trait': '성격',
    'a-talk': '말하는 방식',
    'a-trigger': '감정이 건드려지는 자리',
    'a-stress': '스트레스 반응',
    'a-strength': '나도 모르는 장단점',
    'd-habit': '늘 하면서 스스로는 눈치채지 못하는 몸짓과 버릇.',
    'd-trait': '남들이 나를 설명할 때 쓰는 말.',
    'd-talk': '말을 꺼내는 차례, 끊는 자리, 침묵을 두는 길이.',
    'd-trigger': '어떤 말이나 상황에서 유난히 크게 흔들리는가.',
    'd-stress': '힘들 때 몸과 말이 어떻게 달라지는가.',
    'd-strength': '스스로는 대수롭지 않게 여기는데 남 눈에는 뚜렷한 것.',

    'code-title': '주고받기',
    'code-note':
      '이 사이트에는 계정도 서버도 없습니다. 그래서 답을 짧은 글자로 바꿉니다. 이 글자를 상대에게 건네고, 상대의 글자를 받아 아래에 넣으시면 됩니다. 손으로 옮겨 적어도 됩니다.',
    'my-code': '내 코드',
    'their-code': '상대의 코드',
    paste: '상대에게 받은 글자를 넣으세요',
    copied: '복사했습니다',
    copy: '복사',
    'e-empty': '아직 비어 있습니다.',
    'e-letter': '이 글자는 코드에 쓰이지 않습니다. 0과 O, 1과 I를 헷갈리신 것은 아닐까요.',
    'e-length': '글자가 모자랍니다.',
    'e-version': '다른 판의 코드입니다.',
    'e-checksum': '어딘가 한 글자가 어긋났습니다. 다시 보아 주세요.',
    'code-ok': '상대의 답이 들어왔습니다.',

    'win-title': '조하리의 창',
    'win-note':
      '내가 아는 정도와 상대가 보는 정도, 두 수만 있으면 네 칸이 정해집니다. 네 칸을 더하면 언제나 눈금 전체가 됩니다. 어림이 아니라 항등식이라 칸이 늘 꽉 찹니다.',
    open: '열린 곳',
    blind: '안 보이는 곳',
    hidden: '감춘 곳',
    unknown: '아무도 모르는 곳',
    'win-legend': '둘 다 아는 곳 / 상대만 보는 곳 / 나만 아는 곳 / 둘 다 모르는 곳',
    'win-self': '나는 안다',
    'win-sees': '상대는 본다',

    'split-title': '어긋남은 어디서 왔나',
    'split-note':
      '내가 아는 정도와 상대가 보는 정도의 차이는 둘로 갈립니다. 알면서 내보이지 않은 몫과, 상대가 이만큼 볼 거라 짐작했는데 빗나간 몫. 둘을 더하면 정확히 전체 차이가 됩니다.',
    withheld: '알면서 감춘 몫',
    misjudged: '짐작이 빗나간 몫',
    'total-gap': '전체 어긋남',

    'meta-title': '짐작은 얼마나 맞았나',
    'meta-note':
      '상대가 나를 이만큼 볼 거라던 짐작과 상대가 실제로 적은 값의 차이입니다. 0이면 상대의 눈을 정확히 알고 있었다는 뜻입니다.',
    'meta-error': '평균 빗나간 정도',

    'asym-title': '누가 더 보고 있었나',
    'asym-note': '서로 기록한다지만 보는 양이 같지는 않습니다.',
    'i-see': '내가 상대를 보는 정도',
    'seen-by': '상대가 나를 보는 정도',
    'asym-even': '둘이 서로를 비슷하게 보고 있습니다.',
    'asym-more': '내가 상대를 더 많이 보고 있습니다.',
    'asym-less': '상대가 나를 더 많이 보고 있습니다.',

    'top-blind': '가장 안 보이던 자리',
    'top-blind-none': '상대가 나보다 더 본 자리가 없습니다.',

    warning:
      '이 숫자는 눈금을 옮긴 두 사람의 답일 뿐입니다. 논문에서 가져온 것은 여섯 자리와 조하리의 틀이지 어떤 수치도 아닙니다. 무엇보다 이 창은 사람을 재는 자가 아니라, 서로 이야기를 시작할 자리를 짚어 주는 도구입니다.',

    'took-title': '연구에서 가져온 것과 가져오지 않은 것',
    'took-yes':
      '가져온 것 — 살펴볼 여섯 자리(습관·성격·말하는 방식·감정이 건드려지는 자리·스트레스 반응·모르는 장단점), 조하리의 네 칸, 그리고 서로가 서로를 본다는 구조. 한쪽 답만으로는 창이 그려지지 않게 만든 것도 그래서입니다.',
    'took-no':
      '가져오지 않은 것 — 여덟 쌍의 이야기와 인용, 일주일치 관찰 기록, 카드 세 종류로 이뤄진 절차와 워크숍, 그리고 수치 전부. 답을 짧은 글자로 바꿔 건네는 방식은 논문에 없고, 계정도 서버도 없는 이 사이트의 형편에서 나온 것입니다.',
  },

  en: {
    title: 'You, as another sees you',
    summary:
      'A tool for two people who know each other well to track each other. One side’s answers draw nothing. The window only closes when the other person’s answers arrive.',
    capability:
      'builds the four panes of the Johari window exactly from two people’s answers, and splits the disagreement into what was knowingly withheld and what was simply misjudged',
    'paper-label': 'Based on',

    'sample-note': 'Two invented people are loaded as an example. Move any dial and it becomes yours.',
    clear: 'Clear and fill it myself',
    restore: 'Restore the example',

    'mine-title': 'What I write',
    'mine-note': 'Three answers per area — the same six areas the paper gave its participants.',
    'q-self': 'I know this',
    'q-guess': 'They will see this',
    'q-sees': 'I see this in them',

    'a-habit': 'Habits',
    'a-trait': 'Character',
    'a-talk': 'How I talk',
    'a-trigger': 'What sets me off',
    'a-stress': 'Under pressure',
    'a-strength': 'Strengths I miss',
    'd-habit': 'Gestures and routines you perform constantly without noticing.',
    'd-trait': 'The words other people reach for when describing you.',
    'd-talk': 'When you take a turn, where you cut in, how long you leave a silence.',
    'd-trigger': 'The remarks or situations that move you more than they should.',
    'd-stress': 'How your body and your speech change when things get hard.',
    'd-strength': 'What you think nothing of, and others find obvious.',

    'code-title': 'Trading answers',
    'code-note':
      'This site has no accounts and no server. So the answers become a short string. Hand yours to the other person, take theirs, and paste it below. Copying it by hand works too.',
    'my-code': 'My code',
    'their-code': 'Their code',
    paste: 'Paste the string they gave you',
    copied: 'Copied',
    copy: 'Copy',
    'e-empty': 'Still empty.',
    'e-letter': 'That letter is not used in these codes. Zero and O, one and I, perhaps.',
    'e-length': 'Too short.',
    'e-version': 'That code is from a different version.',
    'e-checksum': 'One character is off somewhere. Worth another look.',
    'code-ok': 'Their answers are in.',

    'win-title': 'The Johari window',
    'win-note':
      'Two numbers fix all four panes: how much you know, and how much they see. The four always sum to the whole scale — an identity, not an estimate, so the window is never short.',
    open: 'Open',
    blind: 'Blind',
    hidden: 'Hidden',
    unknown: 'Unknown',
    'win-legend': 'both / only they see / only you know / neither',
    'win-self': 'I know',
    'win-sees': 'they see',

    'split-title': 'Where the gap came from',
    'split-note':
      'The distance between what you know and what they see divides in two: what you knowingly kept back, and what you simply misjudged about their view. The two add up to exactly the whole gap.',
    withheld: 'knowingly held back',
    misjudged: 'misjudged',
    'total-gap': 'whole gap',

    'meta-title': 'How close was the guess',
    'meta-note':
      'The distance between how much you thought they saw and how much they wrote down. Zero means you knew their view of you exactly.',
    'meta-error': 'mean miss',

    'asym-title': 'Who was watching more',
    'asym-note': 'Reciprocal does not mean equal.',
    'i-see': 'how much I see them',
    'seen-by': 'how much they see me',
    'asym-even': 'The two of you see each other about equally.',
    'asym-more': 'You are watching them more closely.',
    'asym-less': 'They are watching you more closely.',

    'top-blind': 'Least visible to you',
    'top-blind-none': 'Nowhere did they see more than you did.',

    warning:
      'These numbers are only what two people put on a set of dials. What came from the paper is the six areas and the Johari frame — no figure of any kind. And this window measures nobody; it points at the places a conversation could start.',

    'took-title': 'What this page took from the paper, and what it left',
    'took-yes':
      'Taken — the six areas to observe (habits, character, speaking style, emotional triggers, stress responses, unnoticed strengths and weaknesses), the four Johari panes, and the reciprocal structure. That is why one side’s answers deliberately draw nothing here.',
    'took-no':
      'Left — the eight pairs and their accounts, the week of observation logs, the three kinds of cards and the workshop, and every number. Trading answers as a short string is not in the paper; it comes from this site having no accounts and no server.',
  },

  ja: {
    title: '人の目に映る自分',
    summary:
      '近しい相手と互いを記録する道具です。片方の答えだけでは何も描かれません。相手の答えが来てはじめて窓が閉じます。',
    capability:
      '二人の答えからジョハリの窓の四つの面を厳密に出し、食い違いを「承知で伏せた分」と「見込み違いの分」に分ける',
    'paper-label': '下敷きにした研究',

    'sample-note': 'いまは例としてこしらえた二人が入っています。目盛りを動かせばあなたのものになります。',
    clear: '空にして自分で埋める',
    restore: '例に戻す',

    'mine-title': '私が書くこと',
    'mine-note': '一つの領域につき三つ答えます。論文が参加者に与えた六つの領域そのままです。',
    'q-self': '自分では分かっている',
    'q-guess': '相手にはこう見えているはず',
    'q-sees': '相手にこれが見える',

    'a-habit': '習慣',
    'a-trait': '性格',
    'a-talk': '話し方',
    'a-trigger': '感情が動く点',
    'a-stress': '追い詰められたとき',
    'a-strength': '気づかない長所短所',
    'd-habit': '始終しているのに自分では気づかない仕草や癖。',
    'd-trait': '人があなたを説明するときに使う言葉。',
    'd-talk': '話し始める間合い、割り込む位置、沈黙の長さ。',
    'd-trigger': '普通以上に揺さぶられる一言や場面。',
    'd-stress': '苦しいとき、体と言葉がどう変わるか。',
    'd-strength': '自分では何とも思わないのに、人にははっきり見えるもの。',

    'code-title': 'やりとり',
    'code-note':
      'このサイトには口座もサーバーもありません。ですから答えを短い文字列にします。あなたの文字列を相手に渡し、相手のものを下に貼ってください。手で書き写しても構いません。',
    'my-code': '私のコード',
    'their-code': '相手のコード',
    paste: '相手からもらった文字列を入れてください',
    copied: 'コピーしました',
    copy: 'コピー',
    'e-empty': 'まだ空です。',
    'e-letter': 'その文字はコードに使いません。0とO、1とIの取り違えかもしれません。',
    'e-length': '文字が足りません。',
    'e-version': '別の版のコードです。',
    'e-checksum': 'どこか一文字ずれています。もう一度ご覧ください。',
    'code-ok': '相手の答えが入りました。',

    'win-title': 'ジョハリの窓',
    'win-note':
      '二つの数で四つの面が決まります。自分が分かっている度合いと、相手に見えている度合いです。四つを足すと必ず目盛り全体になります。近似ではなく恒等式なので、窓が欠けることはありません。',
    open: '開放',
    blind: '盲点',
    hidden: '秘密',
    unknown: '未知',
    'win-legend': '両方 / 相手だけ / 自分だけ / どちらも',
    'win-self': '自分は分かる',
    'win-sees': '相手に見える',

    'split-title': '食い違いはどこから来たか',
    'split-note':
      '分かっている度合いと見えている度合いの差は二つに分かれます。承知で出さなかった分と、相手の見え方を見込み違いした分。二つを足すとちょうど全体の差になります。',
    withheld: '承知で伏せた分',
    misjudged: '見込み違いの分',
    'total-gap': '全体の差',

    'meta-title': '見込みはどれだけ当たったか',
    'meta-note':
      '相手にこう見えているはずという見込みと、相手が実際に書いた値との差です。0なら相手の目を正確に知っていたということです。',
    'meta-error': '平均のずれ',

    'asym-title': 'どちらがより見ていたか',
    'asym-note': '互いに、といっても見る量が同じとは限りません。',
    'i-see': '私が相手を見る度合い',
    'seen-by': '相手が私を見る度合い',
    'asym-even': '二人はほぼ同じだけ互いを見ています。',
    'asym-more': 'あなたのほうがよく見ています。',
    'asym-less': '相手のほうがよく見ています。',

    'top-blind': '最も見えていなかった領域',
    'top-blind-none': '相手のほうが多く見えた領域はありません。',

    warning:
      'これらの数は二人が目盛りに置いた答えにすぎません。論文から取ったのは六つの領域とジョハリの枠であって、いかなる数値でもありません。そしてこの窓は人を測る物差しではなく、話を始める場所を指すための道具です。',

    'took-title': '研究から取ったものと、取らなかったもの',
    'took-yes':
      '取ったもの — 観察する六つの領域(習慣・性格・話し方・感情が動く点・ストレス反応・気づかない長所短所)、ジョハリの四面、そして互いに見るという構造。片方の答えだけでは何も描かれないようにしたのもそのためです。',
    'took-no':
      '取らなかったもの — 八組の語りと引用、一週間の観察記録、三種類のカードによる手順とワークショップ、そして数値のすべて。答えを短い文字列にして渡すやり方は論文になく、口座もサーバーもないこのサイトの事情から出たものです。',
  },
};
