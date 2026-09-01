/** 물렁함 착시 문구 사전 (ko / en / ja). */

import type { Dictionary } from '../../core/i18n';

export type SoftenKey =
  | 'title' | 'summary' | 'capability' | 'paper-label'
  | 'how-title' | 'how-body'
  | 'design-title' | 'design-note'
  | 'waveform' | 'delay' | 'axis' | 'carrier' | 'depth'
  | 'w-sine' | 'w-square' | 'w-triangle' | 'w-sawtooth'
  | 'ax-x' | 'ax-y' | 'ax-z' | 'ax-note'
  | 'listen' | 'stop' | 'buzz' | 'no-buzz'
  | 'verdict-title' | 'verdict-note'
  | 'f-waveform' | 'f-delay' | 'f-axis'
  | 'felt' | 'not-felt' | 'moves' | 'moves-none'
  | 'd-soft' | 'd-smooth' | 'd-elastic' | 'd-unpleasant'
  | 'headroom-under' | 'headroom-over' | 'ms'
  | 'ear-title' | 'ear-body'
  | 'warning'
  | 'took-title' | 'took-yes' | 'took-no' | 'took-mine';

export const softenDictionary: Dictionary<SoftenKey> = {
  ko: {
    title: '딱딱한 유리를 물렁하게',
    summary:
      '누르는 손가락에 알맞은 진동을 주면 유리도 물렁하게 느껴집니다. 그 진동을 설계할 때 무엇이 손끝에 닿고 무엇이 닿지 않는지, 논문이 알아낸 것을 만져 보실 수 있습니다.',
    capability:
      '물렁함 착시에 쓰는 진동을 파형·지연·축으로 설계하고, 그중 어느 것이 손끝에 실제로 닿는지 논문의 문턱으로 가른다',
    'paper-label': '바탕이 된 연구',

    'how-title': '어떻게 물렁해지는가',
    'how-body':
      '화면은 조금도 들어가지 않습니다. 다만 손가락이 누르는 깊이에 맞춰 진동의 세기를 키우면, 손끝은 표면이 밀려 들어간다고 읽습니다. 깊이 누를수록 세게 떨리는 것이 전부입니다.',

    'design-title': '진동을 설계합니다',
    'design-note':
      '세 가지를 고르실 수 있습니다. 논문이 물은 것도 정확히 이 셋이었습니다. 파형은 어떤 모양이어야 하는가, 지연은 얼마까지 괜찮은가, 진동 축은 화면에 수직이어야 하는가.',
    waveform: '파형',
    delay: '시간 지연',
    axis: '진동 축',
    carrier: '진동수',
    depth: '누르는 깊이',
    'w-sine': '사인',
    'w-square': '사각',
    'w-triangle': '삼각',
    'w-sawtooth': '톱니',
    'ax-x': '가로',
    'ax-y': '세로',
    'ax-z': '수직',
    'ax-note': '수직은 화면을 밀어내는 방향입니다.',

    listen: '귀로 들어 보기',
    stop: '멈추기',
    buzz: '떨려 보기',
    'no-buzz': '이 기기는 떨 수 없습니다',

    'verdict-title': '무엇이 손끝에 닿는가',
    'verdict-note':
      '초록이 밝힌 것을 그대로 옮긴 표입니다. 실험의 수치는 구하지 못했으므로, 여기서는 닿는지 안 닿는지까지만 말합니다. 얼마나 닿는지는 말하지 않습니다.',
    'f-waveform': '파형',
    'f-delay': '시간 지연',
    'f-axis': '진동 축',
    felt: '손끝이 알아챕니다',
    'not-felt': '손끝이 못 가릅니다',
    moves: '움직이는 느낌',
    'moves-none': '없음',
    'd-soft': '물렁함',
    'd-smooth': '매끄러움',
    'd-elastic': '탄성',
    'd-unpleasant': '불쾌함',
    'headroom-under': '문턱까지 남은 여유',
    'headroom-over': '문턱을 넘어선 정도',
    ms: '밀리초',

    'ear-title': '귀는 가르는데 손은 못 가른다',
    'ear-body':
      '네 파형을 들어 보시면 서로 다른 소리가 납니다. 실효값도 세 갈래로 갈립니다(삼각과 톱니만 같습니다). 그런데 논문은 흔한 스마트폰 조건에서 손끝이 이들을 구별하지 못한다고 했습니다. 파형을 다듬는 데 공을 들일 이유가 없다는 뜻입니다. 지연을 25밀리초 아래로 붙드는 편이 훨씬 낫습니다.',

    warning:
      '이 논문은 유료라 전문을 구하지 못했습니다. 초록이 밝힌 네 줄까지만 옮겼고, 실험의 수치는 하나도 가져오지 않았습니다. 화면의 파형과 소리는 이 페이지가 지어낸 것이며, 브라우저의 떨림은 켜고 끄는 것만 되므로 파형도 축도 실제로는 흉내 낼 수 없습니다.',

    'took-title': '연구에서 가져온 것과 가져오지 않은 것',
    'took-yes':
      '가져온 것 — 세 가지 설계 물음(파형·시간 지연·진동 축)과 그 답, 25밀리초라는 문턱, 그리고 지연이 물렁함·매끄러움·탄성·불쾌함을, 축이 앞의 셋을 움직였다는 것.',
    'took-no':
      '가져오지 않은 것 — 실험의 수치 전부와 참가자와 장비, 그리고 영향의 방향. 초록은 뜻있는 영향이 있었다는 것까지만 밝혔으므로 여기서도 방향을 지어내지 않았습니다.',
    'took-mine':
      '이 페이지가 더한 것 — 파형을 소리로 들려주는 것. 브라우저는 진동의 파형을 바꿀 수 없지만 소리는 낼 수 있습니다. 귀로는 갈리는데 손끝은 못 가른다는 것이 이 연구의 재미이므로, 그 갈림을 직접 들어 보게 했습니다.',
  },

  en: {
    title: 'Making glass feel soft',
    summary:
      'Give a pressing finger the right vibration and even glass yields. Here you can handle what the paper found about designing that vibration: what the fingertip actually registers, and what it never will.',
    capability:
      'designs the vibration behind a compliance illusion by waveform, delay and axis, and separates what the fingertip registers from what it does not, using the paper’s threshold',
    'paper-label': 'Based on',

    'how-title': 'How glass gives way',
    'how-body':
      'The screen does not move at all. But raise the strength of the vibration in step with how hard the finger presses, and the fingertip reads the surface as sinking. Press deeper, buzz harder — that is the whole of it.',

    'design-title': 'Design the vibration',
    'design-note':
      'Three things to choose. They are exactly the three the paper asked about: what shape should the wave be, how much delay is tolerable, and must the vibration run perpendicular to the surface.',
    waveform: 'Waveform',
    delay: 'Time delay',
    axis: 'Vibration axis',
    carrier: 'Frequency',
    depth: 'Press depth',
    'w-sine': 'sine',
    'w-square': 'square',
    'w-triangle': 'triangle',
    'w-sawtooth': 'sawtooth',
    'ax-x': 'across',
    'ax-y': 'along',
    'ax-z': 'perpendicular',
    'ax-note': 'Perpendicular is the direction that pushes back out of the screen.',

    listen: 'Listen to it',
    stop: 'Stop',
    buzz: 'Feel it buzz',
    'no-buzz': 'This device cannot buzz',

    'verdict-title': 'What reaches the fingertip',
    'verdict-note':
      'A table carried straight over from the abstract. The experimental figures were not obtainable, so this says only whether something registers — never how much.',
    'f-waveform': 'Waveform',
    'f-delay': 'Time delay',
    'f-axis': 'Vibration axis',
    felt: 'the fingertip registers it',
    'not-felt': 'the fingertip cannot tell',
    moves: 'what it shifts',
    'moves-none': 'nothing',
    'd-soft': 'softness',
    'd-smooth': 'smoothness',
    'd-elastic': 'elasticity',
    'd-unpleasant': 'unpleasantness',
    'headroom-under': 'headroom to the threshold',
    'headroom-over': 'over the threshold by',
    ms: 'ms',

    'ear-title': 'The ear can tell; the hand cannot',
    'ear-body':
      'Listen to the four waveforms and they plainly differ; their RMS falls into three groups before you even hear them (only triangle and sawtooth match). Yet the paper found the fingertip cannot separate them under ordinary smartphone conditions. Which means there is no point polishing the waveform. Holding the delay under 25 milliseconds is worth far more.',

    warning:
      'This paper sits behind a paywall and the full text was not obtainable. Only the four lines of the abstract were carried over, and not one experimental figure. The waveforms and sounds on this screen are this page’s own, and a browser’s vibration can only switch on and off — so neither waveform nor axis can actually be reproduced here.',

    'took-title': 'What this page took from the paper, and what it left',
    'took-yes':
      'Taken — the three design questions (waveform, time delay, vibration axis) and their answers, the 25-millisecond threshold, and that delay shifted softness, smoothness, elasticity and unpleasantness while axis shifted the first three.',
    'took-no':
      'Left — every experimental figure, the participants and the apparatus, and the direction of each effect. The abstract stated only that the effects were significant, so no direction is invented here.',
    'took-mine':
      'Added here — playing the waveforms as sound. A browser cannot shape a vibration, but it can shape a tone. Since the point of the study is that the ear separates what the fingertip cannot, you may as well hear the separation for yourself.',
  },

  ja: {
    title: '硬いガラスを柔らかく',
    summary:
      '押す指にふさわしい振動を与えると、ガラスさえ柔らかく感じられます。その振動を設計するとき、何が指先に届き何が届かないのか、論文が突き止めたことを手で触れられます。',
    capability:
      '柔らかさの錯覚に使う振動を波形・遅延・軸で設計し、そのうち何が指先に実際に届くかを論文の閾値で分ける',
    'paper-label': '下敷きにした研究',

    'how-title': 'どうして柔らかくなるのか',
    'how-body':
      '画面は少しも沈みません。ただ指の押し込む深さに合わせて振動を強くすると、指先は表面が沈んでいると読みます。深く押すほど強く震える、それだけです。',

    'design-title': '振動を設計します',
    'design-note':
      '三つを選べます。論文が問うたのもまさにこの三つでした。波形はどんな形であるべきか、遅延はどこまで許されるか、振動の軸は画面に垂直であるべきか。',
    waveform: '波形',
    delay: '時間遅延',
    axis: '振動軸',
    carrier: '振動数',
    depth: '押し込む深さ',
    'w-sine': '正弦',
    'w-square': '矩形',
    'w-triangle': '三角',
    'w-sawtooth': 'のこぎり',
    'ax-x': '横',
    'ax-y': '縦',
    'ax-z': '垂直',
    'ax-note': '垂直は画面から押し返す向きです。',

    listen: '耳で聴く',
    stop: '止める',
    buzz: '震えてみる',
    'no-buzz': 'この端末は震えられません',

    'verdict-title': '何が指先に届くか',
    'verdict-note':
      '要旨をそのまま写した表です。実験の数値は入手できなかったので、ここでは届くか届かないかまでしか言いません。どれだけ届くかは言いません。',
    'f-waveform': '波形',
    'f-delay': '時間遅延',
    'f-axis': '振動軸',
    felt: '指先が気づきます',
    'not-felt': '指先には分けられません',
    moves: '動かす感覚',
    'moves-none': 'なし',
    'd-soft': '柔らかさ',
    'd-smooth': '滑らかさ',
    'd-elastic': '弾性',
    'd-unpleasant': '不快さ',
    'headroom-under': '閾値までの余裕',
    'headroom-over': '閾値を超えた分',
    ms: 'ミリ秒',

    'ear-title': '耳は分けられ、手は分けられない',
    'ear-body':
      '四つの波形を聴けばはっきり違う音がします。実効値も三通りに分かれます(三角とのこぎりだけが同じです)。ところが論文は、ありふれたスマートフォンの条件では指先がこれらを区別できないと述べました。波形を磨くことに手をかける意味がないということです。遅延を25ミリ秒より下に抑えるほうがずっと効きます。',

    warning:
      'この論文は有料で全文を入手できませんでした。要旨の四行までを写しただけで、実験の数値は一つも持ち込んでいません。画面の波形と音はこのページの作り物であり、ブラウザの振動は入切しかできないため、波形も軸も実際には再現できません。',

    'took-title': '研究から取ったものと、取らなかったもの',
    'took-yes':
      '取ったもの — 三つの設計上の問い(波形・時間遅延・振動軸)とその答え、25ミリ秒という閾値、そして遅延が柔らかさ・滑らかさ・弾性・不快さを、軸が前の三つを動かしたということ。',
    'took-no':
      '取らなかったもの — 実験の数値のすべて、参加者と装置、そして影響の向き。要旨は有意な影響があったとまでしか述べていないので、ここでも向きは作りません。',
    'took-mine':
      'このページが加えたもの — 波形を音で聴かせること。ブラウザは振動の形を変えられませんが、音は出せます。耳が分けられるものを指先は分けられない、というのがこの研究の面白さですから、その分かれ目をご自身で聴けるようにしました。',
  },
};
