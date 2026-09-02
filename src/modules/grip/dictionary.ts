/** 크기 착시 문구 사전 (ko / en / ja). */

import type { Dictionary } from '../../core/i18n';

export type GripKey =
  | 'title' | 'summary' | 'capability' | 'paper-label'
  | 'setup-title' | 'setup-note' | 'device' | 'reposition' | 'device-note' | 'reposition-note'
  | 'reset-paper'
  | 'ruler-title' | 'ruler-note'
  | 'r-physical' | 'r-window' | 'r-felt' | 'r-lower' | 'r-upper'
  | 'two-title' | 'two-bias' | 'two-bias-note' | 'two-width' | 'two-width-note'
  | 'so-title' | 'so-body'
  | 'reach-title' | 'reach-note' | 'reach-haptic' | 'reach-visual' | 'reach-span' | 'times'
  | 'stair-title' | 'stair-note' | 'who-machine' | 'who-human' | 'take-over' | 'give-back'
  | 'held' | 'seen' | 'ask' | 'yes' | 'no' | 'plot-alt'
  | 'leg' | 'seq' | 'dir-up' | 'dir-down' | 'reversals' | 'found' | 'matches'
  | 'your-window' | 'your-bias' | 'paper-bias' | 'your-lesson' | 'again'
  | 'table-title' | 'table-note'
  | 'col-seq' | 'col-asc' | 'col-desc' | 'col-ratio' | 'se'
  | 'prior-title' | 'prior-rigid' | 'prior-compliant' | 'prior-here'
  | 'warning'
  | 'took-title' | 'took-yes' | 'took-no';

export const gripDictionary: Dictionary<GripKey> = {
  ko: {
    title: '손은 크게 세고 눈은 깐깐하다',
    summary:
      '손에 쥔 것을 사람은 실제보다 40퍼센트쯤 크게 느낍니다. 그런데 그 느낌은 아주 또렷해서, 눈으로 속일 수 있는 폭은 2퍼센트뿐입니다. 이 두 가지가 만나면 크기를 흉내 내는 방법이 하나로 정해집니다.',
    capability:
      '논문이 계단법으로 잰 문턱에서 받아들여지는 크기 범위와 치우침을 되짚고, 손가락을 옮겨 낼 수 있는 크기의 폭을 계산한다',
    'paper-label': '바탕이 된 연구',

    'setup-title': '기기',
    'setup-note': '처음 값은 논문이 만든 기기와 같습니다. 옮겨 보시면 무엇이 달라지는지 보입니다.',
    device: '손잡이의 실제 지름',
    reposition: '손가락을 옮길 수 있는 거리',
    'device-note': '기기 자체는 크기가 변하지 않습니다. 논문의 링 지름은 55밀리미터였습니다.',
    'reposition-note':
      '새끼손가락이 감겼을 때와 펴졌을 때의 차이입니다. 논문에서 잰 평균은 26.6밀리미터(표준편차 6.2)였습니다.',
    'reset-paper': '논문 값으로 되돌리기',

    'ruler-title': '눈이 받아들이는 범위',
    'ruler-note':
      '손에 쥔 크기 하나에 대해, 눈에 이만큼까지는 같은 것으로 받아들여진다는 범위입니다. 범위가 실제 크기 위에 놓여 있다는 점을 보세요. 가운데가 아니라 통째로 위쪽입니다.',
    'r-physical': '손에 쥔 실제 크기',
    'r-window': '받아들이는 범위',
    'r-felt': '느끼는 크기',
    'r-lower': '아래 끝',
    'r-upper': '위 끝',

    'two-title': '두 가지가 함께 참이다',
    'two-bias': '실제보다 크게 느낀다',
    'two-bias-note':
      '올려 가며 잰 문턱은 평균 42.4퍼센트, 내려 가며 잰 문턱은 40.4퍼센트 컸습니다. 참가자들은 언제나 기기를 실제보다 40퍼센트쯤 크다고 느꼈습니다.',
    'two-width': '그런데 아주 또렷하다',
    'two-width-note':
      '위 끝과 아래 끝의 차이는 2.00퍼센트뿐이었습니다. 크게 느끼기는 하지만 흐릿하게 느끼는 것이 아닙니다.',

    'so-title': '그래서 이렇게 된다',
    'so-body':
      '눈으로만 속이려 하면 2퍼센트밖에 못 속입니다. 그러니 크기가 변하는 것처럼 보이게 하려면 손가락이 닿는 자리를 실제로 옮겨야 합니다. 논문이 손잡이를 늘리는 대신 손가락을 옮기기로 한 까닭이 여기 있습니다.',

    'reach-title': '흉내 낼 수 있는 크기',
    'reach-note':
      '손가락을 옮기면 촉각으로 잡히는 크기가 달라지고, 그 크기마다 받아들여지는 눈의 범위가 따로 생깁니다. 그 범위들을 이어 붙인 것이 이 기기로 낼 수 있는 크기의 전부입니다.',
    'reach-haptic': '손이 잡는 크기',
    'reach-visual': '눈에 낼 수 있는 크기',
    'reach-span': '가장 큰 것 나누기 가장 작은 것',
    times: '배',

    'stair-title': '문턱은 이렇게 잽니다',
    'stair-note': '크기를 조금씩 바꿔 가며 묻고, 대답이 뒤집히면 걸음을 반으로 줄입니다. 되돌아선 자리들을 평균한 것이 문턱입니다. 표의 숫자 하나하나가 이렇게 나왔습니다.',
    'who-machine': '논문의 문턱을 감춰 둔 가상의 손이 대답하는 중입니다. 계단이 그 자리를 찾아냅니다.',
    'who-human': '이번엔 당신이 대답합니다. 두 원을 눈으로만 견주세요.',
    'take-over': '내가 대답할래요',
    'give-back': '가상의 손에게 돌려주기',
    'held': '쥔 것',
    'seen': '보이는 것',
    'ask': '오른쪽이 왼쪽보다 큽니까?',
    'yes': '크다',
    'no': '작다',
    'plot-alt': '계단이 오르내리며 문턱에 좁혀 드는 길',
    'leg': '지금',
    'seq': '차례',
    'dir-up': '올려 가며',
    'dir-down': '내려 가며',
    'reversals': '되돌이',
    'found': '찾아낸 문턱',
    'matches': '표의 값',
    'your-window': '당신의 창',
    'your-bias': '당신의 치우침',
    'paper-bias': '손에 쥐었을 때',
    'your-lesson': '눈으로만 두 원을 견주면 치우침이 거의 없습니다. 그런데 왼쪽이 그림이 아니라 손에 쥔 물건이 되면, 사람은 오른쪽이 40%쯤 커야 같은 크기라고 느낍니다. 눈과 손 사이에서만 생기는 어긋남입니다.',
    'again': '다시 재 보기',
    'table-title': '논문이 잰 값',
    'table-note':
      '연구 1, 참가자 열두 명. 손가락을 옮기는 여섯 가지 차례마다 계단법으로 문턱을 재었습니다. 논문은 반복측정 분산분석에서 차례들 사이에 뜻있는 차이가 없다고 밝혔습니다(p = .472). 그래서 이 페이지는 여섯을 평균해 씁니다.',
    'col-seq': '차례',
    'col-asc': '올려 가며 잰 문턱',
    'col-desc': '내려 가며 잰 문턱',
    'col-ratio': '실제 대비',
    se: '표준오차',

    'prior-title': '다른 손잡이와 견주면',
    'prior-rigid': '단단한 손잡이 6.0%',
    'prior-compliant': '무른 손잡이 32.7%',
    'prior-here': '이 기기 2.0%',

    warning:
      '표의 밀리미터 값은 논문 Table 2에서 그대로 옮겼고, 논문이 함께 실은 상대 비율과 맞는지 시험으로 견주어 두었습니다. 다만 화면의 자와 흉내 낼 수 있는 폭은 그 문턱에서 이 페이지가 이어 붙인 것이지 논문이 그렇게 그린 것은 아닙니다.',

    'took-title': '연구에서 가져온 것과 가져오지 않은 것',
    'took-yes':
      '가져온 것 — Table 2의 여섯 차례 문턱을 밀리미터 그대로, 본문이 밝힌 세 수치(42.4퍼센트, 40.4퍼센트, 2.00퍼센트)와 선행 연구와의 견줌(6.0퍼센트, 32.7퍼센트), 기기의 링 지름 55밀리미터와 손가락을 옮길 수 있는 거리 26.6밀리미터.',
    'took-no':
      '가져오지 않은 것 — 연구 2(움직이는 시각과 함께 본 것)의 결과, 기기의 기계 설계와 토크와 속도, 참가자의 주관 평가.',
  },

  en: {
    title: 'The hand overestimates; the eye is strict',
    summary:
      'People feel an object in the hand as about forty per cent larger than it is. Yet that feeling is sharp: the eye will accept only two per cent of disagreement. Put those two together and there is only one way left to fake a size change.',
    capability:
      'recovers the accepted size window and its bias from the paper’s staircase thresholds, and computes the range of sizes a fixed device can render by moving the fingers',
    'paper-label': 'Based on',

    'setup-title': 'The device',
    'setup-note': 'The starting values are the paper’s own device. Move them to see what changes.',
    device: 'Physical diameter of the grip',
    reposition: 'How far the fingers can travel',
    'device-note': 'The device itself never changes size. The paper’s ring was 55 millimetres across.',
    'reposition-note':
      'The distance between the little finger wrapped and unwrapped. The paper measured a mean of 26.6 millimetres (SD 6.2).',
    'reset-paper': 'Back to the paper’s values',

    'ruler-title': 'What the eye will accept',
    'ruler-note':
      'For one size in the hand, this is the band of visual sizes taken as the same object. Notice that the band sits above the physical size — not centred on it, but wholly above.',
    'r-physical': 'actual size in the hand',
    'r-window': 'accepted band',
    'r-felt': 'size as felt',
    'r-lower': 'lower edge',
    'r-upper': 'upper edge',

    'two-title': 'Two things are true at once',
    'two-bias': 'It feels larger than it is',
    'two-bias-note':
      'The ascending thresholds ran 42.4 per cent high on average and the descending ones 40.4 per cent. Participants always felt the device to be about forty per cent bigger than it was.',
    'two-width': 'And yet the feeling is sharp',
    'two-width-note':
      'Only 2.00 per cent separated the upper edge from the lower. Feeling it large is not the same as feeling it vaguely.',

    'so-title': 'So it follows',
    'so-body':
      'Lying with the picture alone buys two per cent. To make something look as if it is changing size, the fingers have to actually move. That is why the paper moved the fingers instead of growing the grip.',

    'reach-title': 'What this device can render',
    'reach-note':
      'Moving the fingers changes the size the hand grips, and every gripped size carries its own accepted band. Stitch those bands together and you have everything this device can pretend to be.',
    'reach-haptic': 'sizes the hand can grip',
    'reach-visual': 'sizes the eye can be shown',
    'reach-span': 'largest over smallest',
    times: '×',

    'stair-title': 'This is how a threshold is measured',
    'stair-note': 'Change the size a little, ask, and halve the step whenever the answer flips. Average the turning points and that is the threshold. Every number in the table below was made this way.',
    'who-machine': 'A virtual hand with the paper’s threshold hidden inside is answering. Watch the staircase find it.',
    'who-human': 'Your turn to answer. Compare the two circles with your eyes only.',
    'take-over': 'Let me answer',
    'give-back': 'Give it back to the virtual hand',
    'held': 'Held',
    'seen': 'Seen',
    'ask': 'Is the right one bigger than the left?',
    'yes': 'Bigger',
    'no': 'Smaller',
    'plot-alt': 'The staircase walking up and down, closing in on the threshold',
    'leg': 'Now',
    'seq': 'Sequence',
    'dir-up': 'ascending',
    'dir-down': 'descending',
    'reversals': 'Turning points',
    'found': 'Threshold found',
    'matches': 'In the table',
    'your-window': 'Your window',
    'your-bias': 'Your bias',
    'paper-bias': 'held in the hand',
    'your-lesson': 'Comparing two circles by eye, your bias is close to nothing. But when the left one stops being a picture and becomes an object in your hand, the right one has to be about 40% bigger before it feels the same size. That gap lives only between eye and hand.',
    'again': 'Measure again',
    'table-title': 'What the paper measured',
    'table-note':
      'Study 1, twelve participants. A staircase found the threshold for each of six finger-repositioning sequences. A repeated-measures ANOVA found no significant difference between sequences (p = .472), so this page averages the six.',
    'col-seq': 'Sequence',
    'col-asc': 'Ascending threshold',
    'col-desc': 'Descending threshold',
    'col-ratio': 'Against actual',
    se: 'SE',

    'prior-title': 'Against other grips',
    'prior-rigid': 'rigid grip 6.0%',
    'prior-compliant': 'compliant grip 32.7%',
    'prior-here': 'this device 2.0%',

    warning:
      'The millimetre figures come straight from the paper’s Table 2, and a test checks them against the relative ratios the paper published alongside. The ruler and the renderable span, however, are this page stitching those thresholds together — the paper did not draw them that way.',

    'took-title': 'What this page took from the paper, and what it left',
    'took-yes':
      'Taken — the six thresholds of Table 2 in millimetres, the three figures stated in the text (42.4 per cent, 40.4 per cent, 2.00 per cent) and the comparison with prior work (6.0 and 32.7 per cent), and the device’s 55-millimetre ring with its 26.6 millimetres of finger travel.',
    'took-no':
      'Left — the results of Study 2 with size-changing visuals, the mechanical design with its torque and speed figures, and the participants’ subjective ratings.',
  },

  ja: {
    title: '手は大きく見積もり、目は厳しい',
    summary:
      '手に持ったものを人は実際より四割ほど大きく感じます。ところがその感覚は鋭く、目が許す食い違いは二パーセントしかありません。この二つが合わさると、大きさを偽る道は一つに決まります。',
    capability:
      '論文が階段法で測った閾値から受け入れられる大きさの幅と偏りを起こし、指を動かして出せる大きさの範囲を計算する',
    'paper-label': '下敷きにした研究',

    'setup-title': '装置',
    'setup-note': '初期値は論文の装置そのものです。動かすと何が変わるか見えます。',
    device: '握りの実際の直径',
    reposition: '指を動かせる距離',
    'device-note': '装置そのものの大きさは変わりません。論文のリング径は55ミリでした。',
    'reposition-note':
      '小指が巻きついたときと伸びたときの差です。論文の平均は26.6ミリ(標準偏差6.2)でした。',
    'reset-paper': '論文の値に戻す',

    'ruler-title': '目が受け入れる幅',
    'ruler-note':
      '手に握る大きさ一つに対し、目にはここまでなら同じものとして受け入れられるという帯です。帯が実際の大きさの上に乗っていることにご注目ください。中央ではなく丸ごと上です。',
    'r-physical': '手に握る実際の大きさ',
    'r-window': '受け入れる帯',
    'r-felt': '感じる大きさ',
    'r-lower': '下端',
    'r-upper': '上端',

    'two-title': '二つが同時に本当である',
    'two-bias': '実際より大きく感じる',
    'two-bias-note':
      '上げながら測った閾値は平均42.4パーセント、下げながら測った閾値は40.4パーセント大きくなりました。参加者は常に装置を実際より四割ほど大きいと感じました。',
    'two-width': 'それでいて鋭い',
    'two-width-note':
      '上端と下端の差は2.00パーセントしかありませんでした。大きく感じることと、ぼんやり感じることは別です。',

    'so-title': 'だからこうなる',
    'so-body':
      '絵だけで偽れるのは二パーセントです。大きさが変わって見えるようにするには、指の当たる場所を実際に動かすしかありません。論文が握りを伸ばす代わりに指を動かしたのはそのためです。',

    'reach-title': '出せる大きさ',
    'reach-note':
      '指を動かすと手が握る大きさが変わり、その大きさごとに受け入れられる帯があります。その帯をつなぎ合わせたものが、この装置に出せる大きさのすべてです。',
    'reach-haptic': '手が握る大きさ',
    'reach-visual': '目に見せられる大きさ',
    'reach-span': '最大割る最小',
    times: '倍',

    'stair-title': 'しきい値はこうやって測ります',
    'stair-note': '大きさを少しずつ変えて尋ね、答えが裏返るたびに歩幅を半分にします。折り返した地点を平均したものがしきい値です。下の表の数字は一つ一つこうして生まれました。',
    'who-machine': '論文のしきい値を隠し持った仮想の手が答えています。階段がその場所を見つけ出します。',
    'who-human': '今度はあなたが答えます。二つの円を目だけで見比べてください。',
    'take-over': '私が答えます',
    'give-back': '仮想の手に返す',
    'held': '握っているもの',
    'seen': '見えているもの',
    'ask': '右は左より大きいですか。',
    'yes': '大きい',
    'no': '小さい',
    'plot-alt': '階段が上下しながらしきい値に迫っていく道',
    'leg': '今',
    'seq': '順番',
    'dir-up': '上げながら',
    'dir-down': '下げながら',
    'reversals': '折り返し',
    'found': '見つけたしきい値',
    'matches': '表の値',
    'your-window': 'あなたの窓',
    'your-bias': 'あなたの偏り',
    'paper-bias': '手に握ったとき',
    'your-lesson': '目だけで二つの円を見比べると、偏りはほとんどありません。ところが左が絵ではなく手に握った物になると、右が40%ほど大きくないと同じ大きさに感じられません。目と手のあいだにだけ生まれるずれです。',
    'again': 'もう一度測る',
    'table-title': '論文が測った値',
    'table-note':
      '研究1、参加者十二名。指を動かす六つの手順ごとに階段法で閾値を測りました。反復測定分散分析では手順間に有意差はありませんでした(p = .472)。ですからこのページは六つを平均します。',
    'col-seq': '手順',
    'col-asc': '上げて測った閾値',
    'col-desc': '下げて測った閾値',
    'col-ratio': '実際との比',
    se: '標準誤差',

    'prior-title': '他の握りと比べると',
    'prior-rigid': '硬い握り 6.0%',
    'prior-compliant': '柔らかい握り 32.7%',
    'prior-here': 'この装置 2.0%',

    warning:
      '表のミリの値は論文のTable 2からそのまま写し、論文が併記した相対比と合うか試験で照らしてあります。ただし画面の物差しと出せる範囲は、その閾値をこのページがつなぎ合わせたものであって、論文がそう描いたわけではありません。',

    'took-title': '研究から取ったものと、取らなかったもの',
    'took-yes':
      '取ったもの — Table 2の六つの閾値をミリのまま、本文の三つの数値(42.4パーセント、40.4パーセント、2.00パーセント)と先行研究との比較(6.0と32.7パーセント)、装置のリング径55ミリと指の移動距離26.6ミリ。',
    'took-no':
      '取らなかったもの — 研究2(変化する視覚と併せて見たもの)の結果、装置の機械設計とトルクや速度、参加者の主観評価。',
  },
};
