/** 읽기 쉬움과 시선 옮김 문구 사전 (ko / en / ja). */

import type { Dictionary } from '../../core/i18n';

export type ReadingKey =
  | 'title' | 'summary' | 'capability' | 'paper-label'
  | 'setup-title' | 'setup-note'
  | 'ambient' | 'arcminutes' | 'words' | 'lookaways'
  | 'ambient-note' | 'arcminutes-note' | 'words-note' | 'lookaways-note'
  | 'amb-indoor' | 'amb-window' | 'amb-outdoor'
  | 's-ar' | 's-phone' | 'd-ar' | 'd-phone'
  | 'verdict-faster' | 'verdict-by' | 'verdict-tie' | 'seconds'
  | 'bars-title' | 'bars-note' | 'bar-read' | 'bar-switch' | 'unreadable'
  | 'detail-title' | 'detail-note'
  | 'col-what' | 'col-size' | 'col-contrast' | 'col-speed' | 'col-total'
  | 'row-mm' | 'row-reserve' | 'row-weber' | 'row-sizefactor' | 'row-contrastfactor' | 'row-wpm'
  | 'flip-title' | 'flip-ambient' | 'flip-lookaway' | 'flip-none'
  | 'why-title' | 'why-additive' | 'why-reserve' | 'why-switch'
  | 'warning'
  | 'took-title' | 'took-yes' | 'took-no';

export const readingDictionary: Dictionary<ReadingKey> = {
  ko: {
    title: '눈앞에 띄울까 손에 들까',
    summary:
      '같은 글을 AR 안경에 띄울 때와 손에 든 폰에 띄울 때, 어느 쪽이 빠른지 재 드립니다. 안경은 눈을 돌릴 일이 없고 폰은 또렷합니다. 답은 둘레의 밝기와 몇 번이나 바깥을 돌아보는지에 따라 뒤집힙니다.',
    capability:
      '글자의 각도 크기·시력 여유·베버 대비·초점 옮김을 함께 셈해 두 화면의 읽기 시간을 내고, 답이 뒤집히는 자리를 찾아낸다',
    'paper-label': '바탕이 된 연구',

    'setup-title': '지금 형편',
    'setup-note': '네 가지를 옮겨 보세요. 처음 값은 둘이 거의 비기는 자리에 두었습니다.',
    ambient: '둘레의 밝기',
    arcminutes: '글자가 맺히는 크기',
    words: '읽을 낱말 수',
    lookaways: '바깥을 돌아보는 횟수',
    'ambient-note':
      '칸델라/제곱미터입니다. 실내는 100~300쯤, 창가는 1000~3000쯤, 한낮 바깥은 10000을 넘습니다.',
    'arcminutes-note':
      '분각입니다. 밀리미터가 아니라 각도로 다루는 까닭은, 안경의 글자는 몇 미터 앞 허공에 맺히고 폰의 글자는 손안에 있어 같은 밀리미터라도 눈에는 전혀 다른 크기로 닿기 때문입니다.',
    'words-note': '한 번에 읽어야 하는 분량입니다.',
    'lookaways-note': '글을 읽다가 눈앞의 사물이나 풍경을 확인해야 하는 횟수입니다.',

    'amb-indoor': '실내',
    'amb-window': '창가',
    'amb-outdoor': '한낮 바깥',

    's-ar': 'AR 안경',
    's-phone': '손에 든 폰',
    'd-ar': '글이 눈앞에 떠 있어 시선을 옮길 일이 없습니다. 대신 화소가 성기고, 무엇보다 검정을 만들지 못합니다.',
    'd-phone': '화소가 촘촘하고 스스로 검정을 냅니다. 대신 바깥을 볼 때마다 눈과 초점을 옮겨야 합니다.',

    'verdict-faster': '더 빠른 쪽',
    'verdict-by': '차이',
    'verdict-tie': '둘이 거의 같습니다',
    seconds: '초',

    'bars-title': '걸리는 시간',
    'bars-note': '글을 읽는 시간과 시선을 옮기는 시간을 나눠 그렸습니다. 둘을 더한 것이 전체입니다.',
    'bar-read': '읽기',
    'bar-switch': '시선 옮김',
    unreadable: '읽을 수 없음',

    'detail-title': '왜 그런가',
    'detail-note':
      '읽기 속도는 두 가지에 매입니다. 글자가 그 화면의 한계보다 얼마나 큰가(여유), 그리고 글자가 배경에서 얼마나 떠오르는가(대비). 둘 다 어느 지점을 넘으면 더 좋아지지 않습니다.',
    'col-what': '재는 것',
    'col-size': '크기',
    'col-contrast': '대비',
    'col-speed': '속도',
    'col-total': '합',
    'row-mm': '이 각도를 내려면',
    'row-reserve': '시력 여유',
    'row-weber': '베버 대비',
    'row-sizefactor': '크기가 남긴 몫',
    'row-contrastfactor': '대비가 남긴 몫',
    'row-wpm': '분당 낱말',

    'flip-title': '답이 뒤집히는 자리',
    'flip-ambient': '둘레 밝기를 이 값으로 옮기면 승자가 바뀝니다',
    'flip-lookaway': '돌아보는 횟수를 이만큼으로 하면 승자가 바뀝니다',
    'flip-none': '이 눈금으로는 끝까지 뒤집히지 않습니다',

    'why-title': '이 셈의 뼈대',
    'why-additive':
      '투과형 AR은 풍경 위에 빛을 더할 뿐이라 검정을 만들 수 없습니다. 그래서 대비가 그대로 화면빛 나누기 풍경빛이 되고, 바깥이 밝아지면 곧장 묽어집니다. 폰은 스스로 검정을 내므로 유리에 비친 빛만 견디면 됩니다.',
    'why-reserve':
      '글자가 그 화면이 낼 수 있는 한계보다 넉넉히 커야 술술 읽힙니다. AR 안경은 각도당 화소가 적어 그 한계가 높습니다. 같은 각도의 글자라도 안경 쪽이 먼저 뭉개지는 까닭입니다.',
    'why-switch':
      '시선을 한 번 옮기는 값은 셋으로 나뉩니다. 눈과 고개를 돌리는 시간, 초점을 다시 맞추는 시간, 그리고 읽던 자리를 되찾는 시간. 안경의 상은 몇 미터 앞에, 폰은 40센티미터 앞에 맺히므로 초점을 꽤 크게 옮겨야 합니다.',

    warning:
      '이 논문의 전문을 구하지 못했습니다. 그래서 가져온 것은 초록이 밝힌 맞바꿈의 짜임뿐이고, 화면의 숫자는 어느 것도 논문에서 온 것이 아닙니다. 널리 알려진 시각 연구의 관계를 옮기되 계수는 이 페이지가 골랐습니다. 실제 기기를 고르는 근거로 삼지 마세요.',

    'took-title': '연구에서 가져온 것과 가져오지 않은 것',
    'took-yes':
      '가져온 것 — 맞바꿈의 짜임입니다. 투과형 AR은 시선을 옮길 일이 없는 대신 글이 잘 안 보이고, 손에 든 폰은 잘 보이는 대신 화면 사이를 오가야 한다는 것. 그리고 두 화면을 함께 쓰는 자리라는 조건.',
    'took-no':
      '가져오지 않은 것 — 논문의 실험과 수치 전부, 과제와 참가자. 전문을 읽지 못했으므로 초록 너머의 것은 아무것도 옮기지 않았습니다.',
  },

  en: {
    title: 'In the glasses or in the hand',
    summary:
      'The same passage in AR glasses or on the phone in your hand — which is faster? The glasses never make you look away; the phone is sharper. The answer flips with the ambient light and with how often you must glance at the world.',
    capability:
      'combines angular print size, acuity reserve, Weber contrast and focal switching into a reading time for each display, and finds where the answer flips',
    'paper-label': 'Based on',

    'setup-title': 'The situation',
    'setup-note': 'Move any of the four. The starting values sit almost exactly on the tie.',
    ambient: 'Ambient brightness',
    arcminutes: 'Angular size of the type',
    words: 'Words to read',
    lookaways: 'Glances at the world',
    'ambient-note':
      'In candela per square metre. Indoors is 100–300, near a window 1000–3000, outdoors at midday over 10000.',
    'arcminutes-note':
      'In arcminutes. Angle rather than millimetres, because the glasses put type metres away and the phone puts it in your hand — the same millimetre reaches the eye at wholly different sizes.',
    'words-note': 'How much has to be read in one go.',
    'lookaways-note': 'How often you must break off and check the object or scene in front of you.',

    'amb-indoor': 'indoors',
    'amb-window': 'by a window',
    'amb-outdoor': 'midday outdoors',

    's-ar': 'AR glasses',
    's-phone': 'Phone in hand',
    'd-ar': 'The text floats in front of you, so you never look away. But the pixels are coarse and — above all — it cannot produce black.',
    'd-phone': 'Dense pixels and a real black. But every glance at the world costs a shift of gaze and of focus.',

    'verdict-faster': 'Faster',
    'verdict-by': 'by',
    'verdict-tie': 'The two are almost even',
    seconds: 's',

    'bars-title': 'Time taken',
    'bars-note': 'Reading time and switching time are drawn apart. Together they are the whole.',
    'bar-read': 'reading',
    'bar-switch': 'switching',
    unreadable: 'cannot be read',

    'detail-title': 'Why',
    'detail-note':
      'Reading speed hangs on two things: how much larger the type is than the display’s own limit (reserve), and how far the letters rise off the background (contrast). Past a point, neither helps further.',
    'col-what': 'Measure',
    'col-size': 'Size',
    'col-contrast': 'Contrast',
    'col-speed': 'Speed',
    'col-total': 'Total',
    'row-mm': 'to reach this angle',
    'row-reserve': 'acuity reserve',
    'row-weber': 'Weber contrast',
    'row-sizefactor': 'left by size',
    'row-contrastfactor': 'left by contrast',
    'row-wpm': 'words per minute',

    'flip-title': 'Where the answer flips',
    'flip-ambient': 'Move ambient brightness here and the winner changes',
    'flip-lookaway': 'Set the glances here and the winner changes',
    'flip-none': 'Along this dial it never flips',

    'why-title': 'What the arithmetic rests on',
    'why-additive':
      'Optical see-through AR only adds light on top of the world, so it cannot make black. Its contrast is simply display light over world light, and it thins the moment the world brightens. A phone makes its own black and need only survive the glare on its glass.',
    'why-reserve':
      'Type has to sit comfortably above what a display can resolve before reading flows. AR glasses have few pixels per degree, so that floor is high — which is why the same angular size breaks up in the glasses first.',
    'why-switch':
      'One switch costs three things: turning the eyes and head, refocusing, and finding your place again. The glasses image sits metres away and the phone forty centimetres away, so the focus has a long way to travel.',

    warning:
      'The full text of this paper was not obtainable. So what was taken is only the shape of the trade-off as the abstract states it, and not one number on this screen comes from the paper. The relationships are standard vision science; the coefficients were chosen here. Do not use this to choose a device.',

    'took-title': 'What this page took from the paper, and what it left',
    'took-yes':
      'Taken — the shape of the trade-off: see-through AR never makes you look away but renders text poorly, while the phone in your hand renders well but makes you cross between displays. And the setting of using both together.',
    'took-no':
      'Left — the study and every figure in it, the tasks and the participants. The full text was never read, so nothing beyond the abstract was carried over.',
  },

  ja: {
    title: '眼前に出すか手に持つか',
    summary:
      '同じ文をARグラスに出す場合と手の中のスマホに出す場合、どちらが速いかを測ります。グラスは目を逸らさずに済み、スマホははっきり見えます。答えは周りの明るさと、外を何度見るかで裏返ります。',
    capability:
      '文字の角度の大きさ・視力の余裕・ウェーバー対比・焦点の移動を合わせて計り、二つの画面の読み時間と答えが裏返る点を出す',
    'paper-label': '下敷きにした研究',

    'setup-title': 'いまの状況',
    'setup-note': '四つを動かしてみてください。初期値は二つがほぼ並ぶ点に置いてあります。',
    ambient: '周りの明るさ',
    arcminutes: '文字が結ぶ大きさ',
    words: '読む語数',
    lookaways: '外を見る回数',
    'ambient-note':
      'カンデラ毎平方メートルです。屋内は100〜300、窓辺は1000〜3000、真昼の屋外は10000を超えます。',
    'arcminutes-note':
      '分角です。ミリメートルでなく角度で扱うのは、グラスの文字は数メートル先の空中に、スマホの文字は手の中に結ぶため、同じミリでも目にはまったく違う大きさで届くからです。',
    'words-note': '一度に読む分量です。',
    'lookaways-note': '読む途中で目の前の物や景色を確かめる回数です。',

    'amb-indoor': '屋内',
    'amb-window': '窓辺',
    'amb-outdoor': '真昼の屋外',

    's-ar': 'ARグラス',
    's-phone': '手の中のスマホ',
    'd-ar': '文が眼前に浮かぶので目を逸らす必要がありません。ただし画素が粗く、何より黒を作れません。',
    'd-phone': '画素が細かく自ら黒を出せます。ただし外を見るたび視線と焦点を移す必要があります。',

    'verdict-faster': '速いのは',
    'verdict-by': '差',
    'verdict-tie': '二つはほぼ同じです',
    seconds: '秒',

    'bars-title': 'かかる時間',
    'bars-note': '読む時間と視線を移す時間を分けて描きました。足したものが全体です。',
    'bar-read': '読み',
    'bar-switch': '視線移動',
    unreadable: '読めません',

    'detail-title': 'なぜそうなるか',
    'detail-note':
      '読む速さは二つに掛かります。文字がその画面の限界よりどれだけ大きいか(余裕)、そして文字が背景からどれだけ浮き上がるか(対比)。どちらもある点を越えるとそれ以上は良くなりません。',
    'col-what': '測るもの',
    'col-size': '大きさ',
    'col-contrast': '対比',
    'col-speed': '速さ',
    'col-total': '合計',
    'row-mm': 'この角度を出すには',
    'row-reserve': '視力の余裕',
    'row-weber': 'ウェーバー対比',
    'row-sizefactor': '大きさが残した分',
    'row-contrastfactor': '対比が残した分',
    'row-wpm': '毎分の語数',

    'flip-title': '答えが裏返る点',
    'flip-ambient': '周りの明るさをここにすると勝者が変わります',
    'flip-lookaway': '外を見る回数をここにすると勝者が変わります',
    'flip-none': 'この目盛りでは最後まで裏返りません',

    'why-title': 'この計算の骨組み',
    'why-additive':
      '透過型ARは景色の上に光を足すだけで、黒を作れません。ですから対比はそのまま画面の光を景色の光で割ったものになり、外が明るくなるとすぐ薄まります。スマホは自ら黒を出すので、ガラスに映る光だけ凌げば足ります。',
    'why-reserve':
      '文字が画面の解像限界より十分大きくないと読みは流れません。ARグラスは角度あたりの画素が少なくその床が高いので、同じ角度の文字でもグラス側から先に崩れます。',
    'why-switch':
      '一度の移動は三つに分かれます。目と頭を回す時間、焦点を合わせ直す時間、読んでいた場所を探し直す時間。グラスの像は数メートル先、スマホは40センチ先に結ぶので、焦点はかなりの距離を移ります。',

    warning:
      'この論文の全文は入手できませんでした。ですから取ったのは要旨が述べる釣り合いの形だけで、画面の数値はどれも論文由来ではありません。関係は広く知られた視覚研究のものですが、係数はこのページが選びました。機器選びの根拠にはしないでください。',

    'took-title': '研究から取ったものと、取らなかったもの',
    'took-yes':
      '取ったもの — 釣り合いの形。透過型ARは目を逸らさずに済むかわり文字が読みにくく、手の中のスマホは読みやすいかわり画面の間を行き来させる、ということ。そして二つの画面を併せて使う場面という条件。',
    'took-no':
      '取らなかったもの — 実験とその数値のすべて、課題と参加者。全文を読めなかったので、要旨を超えるものは何も持ち込んでいません。',
  },
};
