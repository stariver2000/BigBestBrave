/** 마우스의 배꼽 문구 사전 (ko / en / ja). */

import type { Dictionary } from '../../core/i18n';

export type MouseKey =
  | 'title' | 'summary' | 'capability' | 'paper-label' | 'full-text'
  | 'pad-title' | 'pad-note' | 'pad-reset' | 'pad-readout' | 'pad-mine'
  | 'legend-front' | 'legend-center' | 'legend-rear' | 'legend-custom'
  | 'slider-label' | 'slider-front' | 'slider-rear'
  | 'mech-title' | 'mech-note'
  | 'eq-front-label' | 'eq-virtual-label' | 'eq-rotation-label'
  | 'mech-span' | 'mech-vertical'
  | 'study-title' | 'study-note'
  | 'pos-front' | 'pos-center' | 'pos-rear' | 'baseline'
  | 'tp-caption' | 'mae-caption' | 'worse-by' | 'rise-by'
  | 'study-figure' | 'study-individual' | 'study-personal' | 'study-effect' | 'study-tension'
  | 'humans-title' | 'humans-note' | 'humans-dx' | 'humans-dy'
  | 'humans-line' | 'humans-192' | 'humans-footnote'
  | 'robot-title' | 'robot-note' | 'robot-check' | 'robot-catch-357' | 'robot-catch-69'
  | 'took-title' | 'took-yes' | 'took-no' | 'took-mine';

export const mouseDictionary: Dictionary<MouseKey> = {
  ko: {
    title: '마우스의 배꼽',
    summary:
      '마우스 바닥의 센서는 앞에 붙기도, 가운데도, 뒤에도 붙습니다. 손이 마우스를 조금씩 돌리기 때문에, 같은 손놀림이라도 센서 자리에 따라 커서는 다른 길을 갑니다. 일곱 자리를 전부 잰 실험이 있습니다 - 가운데가 이깁니다.',
    capability:
      '같은 손놀림이 센서 자리에 따라 얼마나 다른 커서가 되는지 수식 그대로 그려 보고, 일곱 자리를 잰 실험의 셈을 본다',
    'paper-label': '바탕이 된 연구',
    'full-text': '전문',

    'pad-title': '같은 손, 세 개의 커서',
    'pad-note':
      '아래 매트에서 로봇이 논문의 ∞ 계획(폭 24cm, 높이 11cm)을 그리고 있습니다. 마우스는 왼끝에서 -20°, 오른끝에서 +40°로 기웁니다. 손놀림은 하나인데 커서는 셋입니다 - 센서가 앞이면 넓게, 뒤면 좁게 갑니다. 매트를 직접 끌어 그려 볼 수도 있습니다.',
    'pad-reset': '지우기',
    'pad-readout':
      '앞 센서 커서는 가로 {front}mm, 뒤 센서 커서는 {rear}mm를 갔습니다. 앞이 {ratio}% 더 넓습니다.',
    'pad-mine':
      '이 판은 시연입니다. 마우스가 기우는 규칙은 당신 손을 재는 것이 아니라 로봇 계획의 규칙(x 위치에 비례)을 옮긴 것이고, ∞의 매개변수식은 논문에 없어 이 판이 1:2 리사주로 정했습니다.',
    'legend-front': '앞 센서 0%',
    'legend-center': '가운데 50%',
    'legend-rear': '뒤 센서 100%',
    'legend-custom': '가상 센서 {p}%',
    'slider-label': '가상 센서의 자리',
    'slider-front': '앞',
    'slider-rear': '뒤',

    'mech-title': '호는 가로에만 실린다',
    'mech-note':
      '광 센서는 회전을 읽지 못합니다. 대신 회전의 호(弧)가 센서의 자리만큼 가로 이동으로 잘못 읽힙니다. 이것이 논문의 수식 전부입니다 - 앞뒤 두 센서만 있으면 아무 자리의 센서를 소수점 하나까지 흉내 낼 수 있습니다.',
    'eq-front-label': '앞과 뒤의 차이는 회전 그 자체',
    'eq-virtual-label': '아무 자리 p의 센서 흉내 (식 1)',
    'eq-rotation-label': '두 읽기에서 회전 되짚기 (식 3)',
    'mech-span':
      '센서 사이 거리 r=72mm는 논문 기기의 레일에서 유도했습니다: 7.2mm 간격 여섯 칸이 전체의 60%(20%~80% 구간)이므로 43.2 ÷ 0.6 = 72mm입니다.',
    'mech-vertical':
      '세로 읽기는 어느 자리든 같습니다(그림 1). 그래서 가상 센서의 세로는 두 센서의 평균으로만 고릅니다.',

    'study-title': '일곱 자리를 잰 셈',
    'study-note':
      '취미 게이머 14명이 일곱 자리(0~100%)를 전부 치렀습니다. 한 사람이 7×18×15 = 1,890회, 모두 26,460회의 표적 고르기입니다. 본문이 숫자로 적은 자리는 셋뿐이라 세 값만 옮겼습니다 - 곡선 전체는 그림에만 있습니다.',
    'pos-front': '맨 앞 0%',
    'pos-center': '가운데 50%',
    'pos-rear': '맨 뒤 100%',
    baseline: '기준',
    'tp-caption': '처리량 (bits/s) - 높을수록 좋다',
    'mae-caption': '길 이탈 MAE (px) - 낮을수록 좋다',
    'worse-by': '{pct}% 낮음',
    'rise-by': '{pct}% 높음',
    'study-figure':
      '괄호의 백분율은 표기값을 앞으로 다시 계산한 것이라 본문 표기(-10.7 / -14.0 / +22.5 / +19.9%)와 0.1~0.3%p 어긋납니다. 본문은 반올림 전의 원값으로 계산했기 때문입니다.',
    'study-individual':
      '위치의 효과는 14명 가운데 13명에게서 유의했습니다. 예외는 P4 하나(χ²=5.92, p=.43)입니다.',
    'study-personal':
      '사람마다 제일 잘 맞는 자리는 달랐습니다. 저마다의 최적 자리는 가운데 고정보다 0.236 bits/s(약 4.1%) 나았습니다 - 가운데가 이기지만, 저마다의 가운데는 조금씩 다른 곳에 있습니다.',
    'study-effect':
      '분산의 몫(ηp²): 사람 차이 .462, 센서 자리 .241, 사람×자리 .165. 자리의 효과도 크지만 사람 차이가 더 큽니다.',
    'study-tension':
      '가운데 자리의 처리량이 본문에 5.77(위치 비교)과 5.798(개인화 비교)로 두 번 나옵니다. 셈의 자리가 달라 보이며, 논문이 둘 다 적었으므로 둘 다 그대로 옮겼습니다.',

    'humans-title': '사람 손은 로봇보다 더 돌린다',
    'humans-note':
      '여섯 사람이 과녁 게임을 치르는 동안 앞뒤 센서를 같이 기록했습니다(표 2). 가로 기울기 0.56 - 뒤 센서는 앞 센서 가로의 절반 남짓만 읽습니다. 세로 기울기 1.01 - 세로는 어느 센서든 같습니다. 수식이 말한 그대로가 사람 손에서도 나옵니다.',
    'humans-dx': '가로 기울기 (뒤÷앞)',
    'humans-dy': '세로 기울기 (뒤÷앞)',
    'humans-line':
      '절편은 0 언저리입니다 - 제자리에서 돌리기만 하는 일은 거의 없었다는 뜻입니다.',
    'humans-192':
      '앞 센서의 가로 읽기는 뒤 센서의 최대 192%까지 올라갔습니다. 손으로 ∞를 그리면 앞 센서 쪽이 두 배 가까이 넓게 그려집니다(그림 7).',
    'humans-footnote':
      '표 2의 dX R² 평균 표기는 .790인데 여섯 값의 평균은 .788입니다. 다른 다섯 칸은 재계산과 맞으므로 이 칸만 표기 실수로 보입니다. 고치지 않고 그대로 둡니다.',

    'robot-title': '로봇이 그린 ∞',
    'robot-note':
      '로봇 팔(정확도 ±0.1mm)이 {planned}mm의 ∞ 계획을 회전 없이, 그리고 -20°~+40° 회전과 함께 그렸습니다. 위 매트의 ∞는 같은 폭·높이의 1:2 리사주로, 한 바퀴가 {computed}mm로 계산됩니다 - 식이 같아서가 아니라 폭과 높이가 같아서 계획 길이와 2mm 차이로 만납니다.',
    'robot-check':
      '표 1의 셈은 되짚어집니다: 1 kilocount = 25.4÷12 = 2.117mm이고, kilocount 값에 이를 곱하면 표의 mm 표기와 0.15mm 안에서 맞습니다. 가상-물리 어긋남 백분율(.40%, .91%)도 재계산과 맞습니다.',
    'robot-catch-357':
      "붙든 오기 하나: 회전 조건 Virtual의 20% 칸이 '35.7'로 찍혀 있습니다. 같은 표가 가상-물리 어긋남을 1% 미만이라 적고 물리 쪽 같은 칸은 347.2이므로, 이 칸은 345.7 언저리의 인쇄 오기로 보입니다. 고치지 않고 그대로 옮겨 적었습니다.",
    'robot-catch-69':
      "붙든 어긋남 하나: 본문은 회전 조건에서 20% 자리가 80% 자리보다 '6.9% 길게 갔다'고 적는데, 표의 값으로 재계산하면 347.2÷326.0 = 6.5%입니다. 표기값이 반올림된 것이라 본문의 원자료와 어긋날 수 있습니다.",

    'took-title': '논문에서 무엇을 가져왔는가',
    'took-yes':
      '가져온 것: 가상 센서 수식(식 1~4), 레일 치수에서 유도한 r=72mm, 로봇의 ∞ 계획과 표 1, 표 2 전부, 그리고 포인팅 실험의 설계와 본문이 숫자로 적은 결과 전부.',
    'took-no':
      '가져오지 않은 것: 그림 9의 참가자별 곡선과 그림 11의 막대값입니다. 그림에만 있는 값은 옮기지 않습니다. 사람마다의 자리를 찾는 보정·최적화 절차도 옮기지 않았습니다.',
    'took-mine':
      '제가 더한 것: 그리는 판입니다. 기우는 규칙은 로봇 계획의 규칙이고, ∞의 매개변수식은 이 판이 정한 1:2 리사주입니다.',
  },

  en: {
    title: 'The Mouse’s Belly Button',
    summary:
      'The sensor on a mouse’s belly sits at the front on some mice, the middle or the back on others. Because a hand keeps turning the mouse slightly, one same motion becomes different cursor paths depending on that spot. One study measured all seven spots — the middle wins.',
    capability:
      'Draw with the paper’s own formula to see how one hand motion becomes different cursors per sensor spot, and read the numbers from the seven-position experiment',
    'paper-label': 'The study behind this page',
    'full-text': 'Full text',

    'pad-title': 'One hand, three cursors',
    'pad-note':
      'On the mat below, a robot is drawing the paper’s ∞ plan (24 cm wide, 11 cm tall). The mouse tilts from −20° at the left end to +40° at the right. One motion, three cursors — a front sensor draws wide, a rear one narrow. You can also drag on the mat and draw yourself.',
    'pad-reset': 'Clear',
    'pad-readout':
      'The front-sensor cursor spanned {front} mm across; the rear one {rear} mm. The front went {ratio}% wider.',
    'pad-mine':
      'This board is a demonstration. The tilt rule does not measure your hand — it carries the robot plan’s rule (proportional to x). The paper gives no parametric formula for the ∞, so this board chose a 1:2 Lissajous.',
    'legend-front': 'Front sensor 0%',
    'legend-center': 'Center 50%',
    'legend-rear': 'Rear sensor 100%',
    'legend-custom': 'Virtual sensor {p}%',
    'slider-label': 'Virtual sensor position',
    'slider-front': 'front',
    'slider-rear': 'rear',

    'mech-title': 'The arc lands on the horizontal only',
    'mech-note':
      'An optical sensor cannot read rotation. Instead, the arc of each turn is misread as horizontal travel, in proportion to where the sensor sits. That is the whole of the paper’s math — with just a front and a rear sensor, any position can be mimicked exactly.',
    'eq-front-label': 'The front–rear difference is the rotation itself',
    'eq-virtual-label': 'Mimicking a sensor at any position p (Eq. 1)',
    'eq-rotation-label': 'Recovering rotation from two readings (Eq. 3)',
    'mech-span':
      'The sensor span r = 72 mm is derived from the device’s rail: six 7.2 mm steps cover 60% of the range (20%–80%), so 43.2 ÷ 0.6 = 72 mm.',
    'mech-vertical':
      'Vertical readings are identical at every position (Figure 1), so the virtual sensor takes the average of the two for its vertical.',

    'study-title': 'Seven positions, measured',
    'study-note':
      'Fourteen hobby gamers ran all seven positions (0–100%): 7×18×15 = 1,890 target selections each, 26,460 in all. The text prints numbers for only three positions, so only those three are carried — the full curves live in a figure.',
    'pos-front': 'Front 0%',
    'pos-center': 'Center 50%',
    'pos-rear': 'Rear 100%',
    baseline: 'baseline',
    'tp-caption': 'Throughput (bits/s) — higher is better',
    'mae-caption': 'Path deviation MAE (px) — lower is better',
    'worse-by': '{pct}% lower',
    'rise-by': '{pct}% higher',
    'study-figure':
      'The percentages in brackets are recomputed from the printed values, so they sit 0.1–0.3 points off the text’s own −10.7 / −14.0 / +22.5 / +19.9% — the text computed from unrounded originals.',
    'study-individual':
      'The position effect was significant for 13 of the 14 people. The one exception is P4 (χ²=5.92, p=.43).',
    'study-personal':
      'Each person’s best spot differed. Personal optima beat a fixed center by 0.236 bits/s (about 4.1%) — the center wins, but everyone’s center sits somewhere slightly different.',
    'study-effect':
      'Shares of variance (ηp²): person .462, sensor position .241, person×position .165. Position matters a lot; people differ even more.',
    'study-tension':
      'The center position’s throughput appears twice in the text: 5.77 (position comparison) and 5.798 (personalization comparison). The computations seem to differ; the paper prints both, so both are carried as they are.',

    'humans-title': 'Human hands turn more than the robot did',
    'humans-note':
      'Six people played an aiming game while both sensors logged (Table 2). Horizontal slope 0.56 — the rear sensor reads barely more than half the front’s horizontal travel. Vertical slope 1.01 — identical either way. What the formula says shows up in human hands.',
    'humans-dx': 'Horizontal slope (rear ÷ front)',
    'humans-dy': 'Vertical slope (rear ÷ front)',
    'humans-line': 'Intercepts sit near zero — turning in place almost never happened.',
    'humans-192':
      'The front sensor’s horizontal reading rose up to 192% of the rear’s. Draw an ∞ by hand and the front sensor draws it almost twice as wide (Figure 7).',
    'humans-footnote':
      'Table 2 prints the dX R² average as .790, but the six values average to .788. The other five cells match recomputation, so this one looks like a printing slip. It is left as it is.',

    'robot-title': 'The ∞ a robot drew',
    'robot-note':
      'A robot arm (±0.1 mm) drew a {planned} mm ∞ plan, without rotation and with −20° to +40° of it. The ∞ on the mat above is a 1:2 Lissajous of the same width and height; it computes to {computed} mm per lap — meeting the plan within 2 mm not because the formula matches, but because the width and height do.',
    'robot-check':
      'Table 1 re-derives cleanly: 1 kilocount = 25.4÷12 = 2.117 mm, and multiplying the kilocount values lands within 0.15 mm of the printed mm figures. The virtual-physical discrepancy percentages (.40%, .91%) recompute exactly.',
    'robot-catch-357':
      'One typo caught: the rotated-condition Virtual cell at 20% prints “35.7”. The same table states the virtual-physical discrepancy is under 1% and the physical cell reads 347.2, so this cell looks like a misprint of something near 345.7. It is carried verbatim, uncorrected.',
    'robot-catch-69':
      'One mismatch caught: the text says the 20% sensor traveled “6.9% longer” than the 80% one under rotation, but the table’s values give 347.2÷326.0 = 6.5%. The printed values are rounded, so the text’s unrounded source may differ.',

    'took-title': 'What was taken from the paper',
    'took-yes':
      'Taken: the virtual-sensor equations (1–4), the r = 72 mm derived from the rail, the robot’s ∞ plan with Table 1, all of Table 2, and the pointing study’s design plus every result the text prints as a number.',
    'took-no':
      'Not taken: the per-participant curves of Figure 9 and the bar values of Figure 11 — figure-only values are never carried. The calibration and optimization procedures for finding one’s personal spot were not carried either.',
    'took-mine':
      'Added by me: the drawing board. Its tilt rule is the robot plan’s rule, and the ∞’s parametric form is this board’s own 1:2 Lissajous.',
  },

  ja: {
    title: 'マウスのへそ',
    summary:
      'マウスの底のセンサーは、前に付く機種も、真ん中も、後ろもあります。手はマウスを少しずつ回すので、同じ手の動きでもセンサーの位置によってカーソルは違う道を行きます。七つの位置を全部測った実験があります - 真ん中が勝ちます。',
    capability:
      '同じ手の動きがセンサーの位置でどれほど違うカーソルになるかを論文の式のまま描いて見て、七つの位置を測った実験の数を見る',
    'paper-label': 'もとになった研究',
    'full-text': '全文',

    'pad-title': 'ひとつの手、三つのカーソル',
    'pad-note':
      '下のマットでロボットが論文の∞計画(幅24cm、高さ11cm)を描いています。マウスは左端で-20°、右端で+40°に傾きます。手の動きはひとつなのにカーソルは三つ - センサーが前なら広く、後ろなら狭く行きます。マットを直接ドラッグして描くこともできます。',
    'pad-reset': '消す',
    'pad-readout':
      '前センサーのカーソルは横{front}mm、後ろは{rear}mmでした。前が{ratio}%広く行きました。',
    'pad-mine':
      'この盤は実演です。マウスが傾く規則はあなたの手を測るものではなくロボット計画の規則(x位置に比例)を写したもので、∞の媒介変数式は論文になく、この盤が1:2リサージュに決めました。',
    'legend-front': '前センサー 0%',
    'legend-center': '真ん中 50%',
    'legend-rear': '後ろセンサー 100%',
    'legend-custom': '仮想センサー {p}%',
    'slider-label': '仮想センサーの位置',
    'slider-front': '前',
    'slider-rear': '後ろ',

    'mech-title': '弧は横だけに乗る',
    'mech-note':
      '光学センサーは回転を読めません。代わりに回転の弧が、センサーの位置のぶんだけ横移動として誤読されます。これが論文の数式のすべてです - 前後二つのセンサーがあれば、どの位置のセンサーでも正確に真似られます。',
    'eq-front-label': '前と後ろの差は回転そのもの',
    'eq-virtual-label': '任意の位置pのセンサーの真似 (式1)',
    'eq-rotation-label': '二つの読みから回転を遡る (式3)',
    'mech-span':
      'センサー間距離r=72mmは装置のレールから導きました。7.2mm間隔の六つの段が全体の60%(20%〜80%区間)なので、43.2 ÷ 0.6 = 72mmです。',
    'mech-vertical':
      '縦の読みはどの位置でも同じです(図1)。だから仮想センサーの縦は二つのセンサーの平均だけを取ります。',

    'study-title': '七つの位置を測った数',
    'study-note':
      '趣味ゲーマー14人が七つの位置(0〜100%)を全部こなしました。一人あたり7×18×15 = 1,890回、合わせて26,460回の的選びです。本文が数字で書いた位置は三つだけなので、その三つの値だけを写しました - 曲線の全体は図にしかありません。',
    'pos-front': '最前 0%',
    'pos-center': '真ん中 50%',
    'pos-rear': '最後 100%',
    baseline: '基準',
    'tp-caption': 'スループット (bits/s) - 高いほど良い',
    'mae-caption': '道のずれ MAE (px) - 低いほど良い',
    'worse-by': '{pct}%低い',
    'rise-by': '{pct}%高い',
    'study-figure':
      '括弧の百分率は表記値から計算し直したもので、本文の-10.7 / -14.0 / +22.5 / +19.9%と0.1〜0.3ポイントずれます。本文は丸める前の元の値で計算しているからです。',
    'study-individual':
      '位置の効果は14人のうち13人で有意でした。例外はP4ひとり(χ²=5.92、p=.43)です。',
    'study-personal':
      '人ごとに最適な位置は違いました。それぞれの最適位置は真ん中固定より0.236 bits/s(約4.1%)良かったのです - 真ん中が勝つけれど、それぞれの真ん中は少しずつ違う場所にあります。',
    'study-effect':
      '分散の取り分(ηp²): 人の違い .462、センサー位置 .241、人×位置 .165。位置の効果も大きいが、人の違いはもっと大きい。',
    'study-tension':
      '真ん中の位置のスループットが本文に5.77(位置比較)と5.798(個人化比較)の二度現れます。計算の場が違うようで、論文が両方書いているのでどちらもそのまま写しました。',

    'humans-title': '人の手はロボットよりよく回す',
    'humans-note':
      '六人が的当てゲームをする間、前後のセンサーを同時に記録しました(表2)。横の傾き0.56 - 後ろのセンサーは前の横移動の半分あまりしか読みません。縦の傾き1.01 - 縦はどちらでも同じです。式の言うとおりのことが人の手でも起きます。',
    'humans-dx': '横の傾き (後ろ÷前)',
    'humans-dy': '縦の傾き (後ろ÷前)',
    'humans-line': '切片はほぼ0です - その場で回すだけの動きはほとんど無かったという意味です。',
    'humans-192':
      '前センサーの横の読みは後ろの最大192%まで上がりました。手で∞を描くと、前センサーの側がほぼ二倍の幅で描かれます(図7)。',
    'humans-footnote':
      '表2のdX R²平均の表記は.790ですが、六つの値の平均は.788です。他の五つの欄は再計算と合うので、この欄だけ表記の誤りに見えます。直さずそのままにしています。',

    'robot-title': 'ロボットが描いた∞',
    'robot-note':
      'ロボットアーム(±0.1mm)が{planned}mmの∞計画を、回転なしと-20°〜+40°の回転付きで描きました。上のマットの∞は同じ幅・高さの1:2リサージュで、一周が{computed}mmと計算されます - 式が同じだからではなく幅と高さが同じだから、計画の長さと2mm差で出会います。',
    'robot-check':
      '表1の数は遡れます: 1 kilocount = 25.4÷12 = 2.117mmで、kilocount値に掛けると表のmm表記と0.15mm以内で合います。仮想-物理のずれの百分率(.40%、.91%)も再計算と合います。',
    'robot-catch-357':
      "見つけた誤植ひとつ: 回転条件Virtualの20%の欄が「35.7」と印刷されています。同じ表が仮想-物理のずれを1%未満と書き、物理側の同じ欄は347.2なので、この欄は345.7あたりの誤植に見えます。直さずそのまま写しました。",
    'robot-catch-69':
      "見つけたずれひとつ: 本文は回転条件で20%の位置が80%より「6.9%長く行った」と書きますが、表の値で計算し直すと347.2÷326.0 = 6.5%です。表記値は丸められているので、本文の元データとはずれ得ます。",

    'took-title': '論文から何を取ったか',
    'took-yes':
      '取ったもの: 仮想センサーの式(1〜4)、レールから導いたr=72mm、ロボットの∞計画と表1、表2の全部、そしてポインティング実験の設計と本文が数字で書いた結果の全部。',
    'took-no':
      '取らなかったもの: 図9の参加者別曲線と図11の棒の値です。図にしかない値は写しません。人ごとの位置を探す較正・最適化の手順も取っていません。',
    'took-mine':
      '私が足したもの: 描く盤です。傾く規則はロボット計画の規則で、∞の媒介変数式はこの盤が決めた1:2リサージュです。',
  },
};
