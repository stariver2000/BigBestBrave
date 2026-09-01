/** 채널 문구 사전 (ko / en / ja). */

import type { Dictionary } from '../../core/i18n';

export type ChannelKey =
  | 'title' | 'summary' | 'capability' | 'paper-label' | 'full-text'
  | 'try-title' | 'try-note' | 'try-find' | 'try-hit' | 'try-miss' | 'try-next' | 'try-measured'
  | 'try-mine'
  | 'ch-position' | 'ch-length' | 'ch-tilt' | 'ch-area' | 'ch-luminance' | 'ch-saturation'
  | 'ch-curvature' | 'ch-hue'
  | 'rank-title' | 'rank-note' | 'rank-accuracy' | 'rank-popout' | 'rank-accuracy-unit' | 'rank-popout-unit'
  | 'rank-position-note' | 'rank-area-caveat' | 'rank-read'
  | 'sep-title' | 'sep-note' | 'sep-primary' | 'sep-secondary' | 'sep-baseline' | 'sep-untested'
  | 'sep-worst' | 'sep-chance'
  | 'weber-title' | 'weber-note' | 'weber-r2' | 'weber-left' | 'weber-right' | 'weber-shape-note'
  | 'w-area' | 'w-curvature' | 'w-length' | 'w-luminance' | 'w-saturation' | 'w-tilt-low' | 'w-tilt-high'
  | 'weber-read'
  | 'alpha-title' | 'alpha-note' | 'alpha-read'
  | 'took-title' | 'took-yes' | 'took-no' | 'took-mine';

export const channelDictionary: Dictionary<ChannelKey> = {
  ko: {
    title: '채널의 네 얼굴',
    summary:
      '위치가 넓이보다 정확하다는 순위표는 수십 년을 버텼습니다. 그런데 물음을 바꾸면 순위가 뒤집힙니다. 정확히 읽히는 것과 얼른 눈에 띄는 것은 다른 능력입니다.',
    capability:
      '일곱 시각 채널을 네 과제로 나누어 보고, 정확히 읽히는 순위와 눈에 띄는 순위가 어긋나는 것을 직접 겪어 본다',
    'paper-label': '바탕이 된 연구',
    'full-text': '전문',

    'try-title': '하나만 다릅니다. 찾아 보십시오',
    'try-note':
      '스무 개 가운데 하나만 값이 다릅니다. 채널을 바꿔 가며 찾아 보시면, 넓이로 찾을 때와 밝기로 찾을 때 걸리는 시간이 다르다는 것을 몸이 먼저 압니다. 그것이 튀어나옴(pop-out)이라는 과제입니다.',
    'try-find': '다른 하나를 눌러 보십시오',
    'try-hit': '맞습니다.',
    'try-miss': '거기가 아닙니다.',
    'try-next': '다음 판',
    'try-measured': '이 채널의 측정된 튀어나옴 정답률',
    'try-mine':
      '이 판은 시연입니다. 실험 자극의 정확한 명세는 보충 자료에 있어 여기서는 과제의 짜임만 가져왔고, 차이의 크기도 시연용으로 고른 값입니다.',

    'ch-position': '위치',
    'ch-length': '길이',
    'ch-tilt': '기울기',
    'ch-area': '넓이',
    'ch-luminance': '밝기',
    'ch-saturation': '채도',
    'ch-curvature': '곡률',
    'ch-hue': '색상',

    'rank-title': '두 개의 순위표',
    'rank-note':
      '왼쪽은 값을 정확히 읽어내는 순위(표 3의 대각선), 오른쪽은 다른 하나를 얼른 찾아내는 순위(7.2절)입니다. 두 값은 종류가 달라서(로그 오차와 정답률) 한 눈금에 놓지 않았습니다.',
    'rank-accuracy': '정확히 읽히는 순서',
    'rank-popout': '눈에 띄는 순서',
    'rank-accuracy-unit': '로그 오차 · 낮을수록 정확',
    'rank-popout-unit': '정답률 · 높을수록 잘 튐',
    'rank-position-note':
      '위치(단독)는 이 표에 수치가 없지만 본문이 길이보다 뜻있게 낫다고 밝혀 값 없이 맨 위에 두었습니다.',
    'rank-area-caveat':
      '넓이의 1등에는 저자들이 스스로 단 단서가 있습니다 - 자극 수준의 단서가 일부 섞였을 수 있다는 것입니다.',
    'rank-read':
      '넓이는 정확히 읽히는 쪽에서는 끝줄인데 눈에 띄는 쪽에서는 1등이고, 길이는 그 반대입니다. 크기를 읽게 하려면 길이를, 하나를 찾게 하려면 넓이를 쓰라는 뜻입니다.',

    'sep-title': '함께 흔들리면 무너지는 짝',
    'sep-note':
      '한 채널을 판단하는 동안 다른 채널이 함께 흔들리면 어떻게 되는가를 잰 행렬입니다. 행이 판단하는 채널, 열이 흔들리는 채널이고, 시험하지 않은 짝은 빈 채로 두었습니다.',
    'sep-primary': '판단하는 채널',
    'sep-secondary': '함께 흔들리는 채널',
    'sep-baseline': '기준값',
    'sep-untested': '시험 안 함',
    'sep-worst':
      '가장 크게 무너지는 짝: 넓이가 흔들리는 동안의 기울기 판단은 {from}에서 {to}로 밀려, 찍기 수준({chance})과 {gap}밖에 차이가 나지 않습니다. 기울기로 값을 매기고 넓이로 다른 값을 함께 매기는 그림은 기울기를 버리는 그림입니다.',
    'sep-chance': '찍기 수준',

    'weber-title': '문턱은 끝에서 낮아진다',
    'weber-note':
      '얼마나 달라야 다르다고 알아채는가를 잰 것이 판별(discriminability) 과제입니다. 논문은 그 문턱이 눈금의 끝(닻) 가까이에서 낮아지는 것을 Anchored Harmonic Weber 모형으로 붙들었습니다. 아래 곡선은 모형의 모양입니다 - 채널별 매개변수는 본문에 없어 일반 값으로 그렸고, 표의 값은 채널별 적합도와 끝점 기울기입니다.',
    'weber-r2': '적합도',
    'weber-left': '왼끝 기울기',
    'weber-right': '오른끝 기울기',
    'weber-shape-note': '모형의 모양(일반 매개변수). 값이 아니라 모양입니다.',
    'w-area': '넓이',
    'w-curvature': '곡률',
    'w-length': '길이',
    'w-luminance': '밝기',
    'w-saturation': '채도',
    'w-tilt-low': '기울기 0°~90°',
    'w-tilt-high': '기울기 90°~180°',
    'weber-read':
      '오른끝 기울기가 음수인 채널은 곡률과 채도뿐입니다 - 그 끝이 닻 노릇을 못 한다는 뜻입니다. 길이의 오른끝 기울기({lengthRight})는 모든 채널 가운데 가장 커서, 가득 찬 길이 근처에서는 아주 작은 차이도 보입니다.',

    'alpha-title': '굽은 것과 흐린 것',
    'alpha-note':
      '넓이는 원래 순위표의 죄인이었습니다. 그런데 이 논문은 넓이의 오차 대부분이 잡음이 아니라 일정하게 굽은 왜곡이라는 것을 보였습니다. 굽은 것은 펴면 됩니다.',
    'alpha-read':
      '넓이를 지수 {alphaArea}로 펴면 오차가 {improveArea} 로그 단위 줄어듭니다 - 모든 채널 가운데 가장 큰 이득입니다. 변의 길이로 넓이를 어림하는 버릇이 내놓는 0.5에 가깝습니다. 반면 채도({improveSat})와 밝기({improveLum})는 펴도 거의 그대로입니다. 굽은 게 아니라 흐린 것이라, 고칠 수 없습니다.',

    'took-title': '논문에서 무엇을 가져왔는가',
    'took-yes':
      '가져온 것: 일곱 채널 곱하기 네 과제의 짜임, 표 3의 분리성 행렬과 그 대각선의 정확도 기준값, 표 1의 적합도와 끝점 기울기, 7.2절의 튀어나옴 정답률, 4.3절의 거듭제곱 보정, 그리고 저자들이 넓이의 1등에 스스로 단 단서.',
    'took-no':
      '가져오지 않은 것: 그림 2 막대 옆의 정확도 값(그림에만 있습니다), AHW 모형의 채널별 매개변수(본문에는 끝점 기울기만 있어 채널별 곡선은 그리지 않았습니다), 실험 자극의 정확한 명세(보충 자료에 있습니다).',
    'took-mine':
      '제가 더한 것: 튀어나옴 과제를 겪어 보게 한 판입니다. 차이의 크기는 시연용으로 고른 값이고, 논문의 측정을 재현하는 것이 아닙니다.',
  },

  en: {
    title: 'Four Faces of a Channel',
    summary:
      'The ranking that says position beats area has held for decades. Change the question, and the ranking flips. Being read precisely and being spotted quickly are different abilities.',
    capability:
      'Split seven visual channels across four perceptual tasks and experience how the precise-reading ranking and the catching-the-eye ranking pull apart',
    'paper-label': 'The study behind this page',
    'full-text': 'Full text',

    'try-title': 'One of these is different. Find it',
    'try-note':
      'Of the twenty marks, exactly one carries a different value. Switch channels and search: your body learns before you do that finding by area and finding by luminance take different amounts of time. That task is called pop-out.',
    'try-find': 'Press the different one',
    'try-hit': 'That is it.',
    'try-miss': 'Not that one.',
    'try-next': 'Next board',
    'try-measured': 'Measured pop-out accuracy for this channel',
    'try-mine':
      'This board is a demonstration. The exact stimulus specification lives in the supplementary material; only the structure of the task is carried here, and the size of the difference is a value chosen for the demo.',

    'ch-position': 'Position',
    'ch-length': 'Length',
    'ch-tilt': 'Tilt',
    'ch-area': 'Area',
    'ch-luminance': 'Luminance',
    'ch-saturation': 'Saturation',
    'ch-curvature': 'Curvature',
    'ch-hue': 'Hue',

    'rank-title': 'Two rankings',
    'rank-note':
      'On the left, how precisely a value is read (the diagonal of Table 3); on the right, how quickly the odd one is found (Section 7.2). The two are different kinds of quantity — log error and hit rate — so they are not placed on one scale.',
    'rank-accuracy': 'Read precisely',
    'rank-popout': 'Catches the eye',
    'rank-accuracy-unit': 'log error · lower is more precise',
    'rank-popout-unit': 'hit rate · higher pops more',
    'rank-position-note':
      'Position (single) has no number in that table, but the text states it significantly beats length, so it sits on top without a value.',
    'rank-area-caveat':
      'Area’s first place carries a caveat the authors attached themselves: stimulus-level cues may account for part of the advantage.',
    'rank-read':
      'Area sits at the bottom for precise reading and at the top for catching the eye; length is the reverse. To have magnitudes read, use length. To have one thing found, use area.',

    'sep-title': 'Pairs that collapse together',
    'sep-note':
      'This matrix measures what happens to a judgment when another channel varies alongside. Rows judge; columns vary; untested pairs are left empty.',
    'sep-primary': 'Judged channel',
    'sep-secondary': 'Varying channel',
    'sep-baseline': 'baseline',
    'sep-untested': 'untested',
    'sep-worst':
      'The worst collapse: judging tilt while area varies slides from {from} to {to}, within {gap} of guessing ({chance}). A chart that encodes one value in tilt and another in area is a chart that discards tilt.',
    'sep-chance': 'chance level',

    'weber-title': 'Thresholds fall near the ends',
    'weber-note':
      'Discriminability asks how different two values must be before you notice. The paper captures how that threshold drops near the ends of the scale (the anchors) with an Anchored Harmonic Weber model. The curve below shows the model’s shape — per-channel parameters are not in the body text, so it is drawn with generic values; the table carries each channel’s fit and endpoint slopes.',
    'weber-r2': 'Fit',
    'weber-left': 'Left slope',
    'weber-right': 'Right slope',
    'weber-shape-note': 'The model’s shape (generic parameters). A shape, not values.',
    'w-area': 'Area',
    'w-curvature': 'Curvature',
    'w-length': 'Length',
    'w-luminance': 'Luminance',
    'w-saturation': 'Saturation',
    'w-tilt-low': 'Tilt 0°–90°',
    'w-tilt-high': 'Tilt 90°–180°',
    'weber-read':
      'Only curvature and saturation have negative right slopes — that end anchors nothing. Length’s right slope ({lengthRight}) is the largest of all: near full length, the smallest differences become visible.',

    'alpha-title': 'Bent versus blurred',
    'alpha-note':
      'Area was the villain of the old ranking. This paper shows most of area’s error is not noise but a consistent bend. What is bent can be straightened.',
    'alpha-read':
      'Straightening area with exponent {alphaArea} removes {improveArea} log units of error — the largest gain of any channel, close to the 0.5 a side-length habit would produce. Saturation ({improveSat}) and luminance ({improveLum}) barely improve: not bent but blurred, and blur cannot be corrected.',

    'took-title': 'What was taken from the paper',
    'took-yes':
      'Taken: the seven-by-four structure, the separability matrix of Table 3 and its diagonal as accuracy baselines, the fits and endpoint slopes of Table 1, the pop-out hit rates of Section 7.2, the power-law corrections of Section 4.3, and the caveat the authors attached to area’s first place.',
    'took-no':
      'Not taken: the accuracy values beside the bars of Figure 2 (they live only in the figure), the per-channel parameters of the AHW model (the body carries only endpoint slopes, so no per-channel curves are drawn), and the exact stimulus specification (supplementary material).',
    'took-mine':
      'Added by me: the board that lets you experience pop-out. The size of the difference is chosen for the demo and does not reproduce the paper’s measurement.',
  },

  ja: {
    title: 'チャネルの四つの顔',
    summary:
      '位置は面積より正確だという順位表は何十年も保たれてきました。ところが問いを変えると順位が覆ります。正確に読まれることと、すぐ目に留まることは別の能力です。',
    capability:
      '七つの視覚チャネルを四つの課題に分けて見て、正確に読まれる順位と目に留まる順位が食い違うのを自分で経験する',
    'paper-label': 'もとになった研究',
    'full-text': '全文',

    'try-title': 'ひとつだけ違います。探してみてください',
    'try-note':
      '二十個のうちひとつだけ値が違います。チャネルを替えて探すと、面積で探すときと明度で探すときで掛かる時間が違うことを、体が先に知ります。それがポップアウトという課題です。',
    'try-find': '違うひとつを押してください',
    'try-hit': 'それです。',
    'try-miss': 'そこではありません。',
    'try-next': '次の盤',
    'try-measured': 'このチャネルの測定されたポップアウト正答率',
    'try-mine':
      'この盤は実演です。刺激の正確な仕様は補足資料にあり、ここには課題の骨組みだけを持ち込みました。差の大きさも実演用に選んだ値です。',

    'ch-position': '位置',
    'ch-length': '長さ',
    'ch-tilt': '傾き',
    'ch-area': '面積',
    'ch-luminance': '明度',
    'ch-saturation': '彩度',
    'ch-curvature': '曲率',
    'ch-hue': '色相',

    'rank-title': '二つの順位表',
    'rank-note':
      '左は値を正確に読み取る順位(表3の対角線)、右は違うひとつを素早く見つける順位(7.2節)です。二つは種類の違う量(対数誤差と正答率)なので、ひとつの目盛りには載せていません。',
    'rank-accuracy': '正確に読まれる順',
    'rank-popout': '目に留まる順',
    'rank-accuracy-unit': '対数誤差 · 低いほど正確',
    'rank-popout-unit': '正答率 · 高いほど目立つ',
    'rank-position-note':
      '位置(単独)はこの表に数値がありませんが、本文が長さより有意に優れると述べているため、値なしで最上段に置きました。',
    'rank-area-caveat':
      '面積の一位には著者自身が付けた但し書きがあります。刺激水準の手掛かりが一部混ざっている可能性があるというものです。',
    'rank-read':
      '面積は正確に読まれる側では末席なのに、目に留まる側では一位。長さはその逆です。大きさを読ませたいなら長さを、ひとつを見つけさせたいなら面積を、ということです。',

    'sep-title': '一緒に揺れると崩れる組',
    'sep-note':
      'あるチャネルを判断している間に別のチャネルが一緒に揺れるとどうなるかを測った行列です。行が判断する側、列が揺れる側で、試していない組は空けてあります。',
    'sep-primary': '判断するチャネル',
    'sep-secondary': '一緒に揺れるチャネル',
    'sep-baseline': '基準値',
    'sep-untested': '未試験',
    'sep-worst':
      '最も大きく崩れる組:面積が揺れる間の傾きの判断は{from}から{to}へ押し流され、当てずっぽう({chance})との差は{gap}しかありません。ひとつの値を傾きに、別の値を面積に載せる図は、傾きを捨てる図です。',
    'sep-chance': '当てずっぽうの水準',

    'weber-title': '閾値は端で下がる',
    'weber-note':
      'どれだけ違えば違うと気づくかを測るのが判別課題です。論文はその閾値が目盛りの端(錨)の近くで下がることをAnchored Harmonic Weberモデルで捉えました。下の曲線はモデルの形です。チャネル別の係数は本文になく、一般の値で描きました。表の値はチャネル別の適合度と端点勾配です。',
    'weber-r2': '適合度',
    'weber-left': '左端の勾配',
    'weber-right': '右端の勾配',
    'weber-shape-note': 'モデルの形(一般の係数)。値ではなく形です。',
    'w-area': '面積',
    'w-curvature': '曲率',
    'w-length': '長さ',
    'w-luminance': '明度',
    'w-saturation': '彩度',
    'w-tilt-low': '傾き 0°〜90°',
    'w-tilt-high': '傾き 90°〜180°',
    'weber-read':
      '右端の勾配が負なのは曲率と彩度だけです。その端は錨の役をしないという意味です。長さの右端勾配({lengthRight})は全チャネル中で最も大きく、満杯に近い長さではごく小さな差まで見えます。',

    'alpha-title': '曲がりと霞み',
    'alpha-note':
      '面積は昔の順位表の悪役でした。ところがこの論文は、面積の誤差の大半が雑音ではなく一定に曲がった歪みであることを示しました。曲がったものは伸ばせます。',
    'alpha-read':
      '面積を指数{alphaArea}で伸ばすと誤差が{improveArea}対数単位減ります。全チャネル中最大の利得で、辺の長さで面積を見積もる癖が生む0.5に近い値です。一方、彩度({improveSat})と明度({improveLum})は伸ばしてもほとんど変わりません。曲がりではなく霞みで、霞みは直せません。',

    'took-title': '論文から何を取ったか',
    'took-yes':
      '取ったもの:七チャネル×四課題の骨組み、表3の分離性行列とその対角線が与える正確度の基準値、表1の適合度と端点勾配、7.2節のポップアウト正答率、4.3節の冪補正、そして面積の一位に著者自身が付けた但し書き。',
    'took-no':
      '取らなかったもの:図2の棒の横の正確度の値(図にしかありません)、AHWモデルのチャネル別係数(本文には端点勾配しかなく、チャネル別の曲線は描いていません)、刺激の正確な仕様(補足資料)。',
    'took-mine':
      '私が足したもの:ポップアウトを経験できる盤です。差の大きさは実演用に選んだ値で、論文の測定の再現ではありません。',
  },
};
