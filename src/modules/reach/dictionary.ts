/** 선택 방식 실험 문구 사전 (ko / en / ja). */

import type { Dictionary } from '../../core/i18n';

export type ReachKey =
  | 'title' | 'summary' | 'capability' | 'paper-label'
  | 'setup-title' | 'setup-note'
  | 'task' | 'task-binary' | 'task-multi' | 'task-binary-note' | 'task-multi-note'
  | 'trigger' | 'trials' | 'haptics' | 'haptics-note'
  | 't-cross' | 't-dwell' | 't-pinch'
  | 'h-cross' | 'h-dwell' | 'h-pinch'
  | 'lane-title' | 'lane-note' | 'start' | 'stop' | 'restart'
  | 'idle' | 'warmup' | 'progress' | 'done' | 'pinch-hint' | 'move-hint'
  | 'hand-slip' | 'hand-mine' | 'both-done'
  | 'results-title' | 'results-note' | 'results-empty'
  | 'col-trigger' | 'col-mt' | 'col-er' | 'col-tp' | 'col-model' | 'col-fit' | 'col-tre' | 'col-n'
  | 'mine' | 'theirs'
  | 'plot-title' | 'plot-note' | 'plot-x' | 'plot-y' | 'plot-empty'
  | 'paper-said-title' | 'paper-said-binary' | 'paper-said-multi'
  | 'warning'
  | 'took-title' | 'took-yes' | 'took-no';

export const reachDictionary: Dictionary<ReachKey> = {
  ko: {
    title: '손끝으로 고르는 세 가지 방법',
    summary:
      '과녁을 고르는 세 가지 방아쇠를 직접 겪어 보고, 자기 손의 수치를 재 드립니다. 어느 것이 빠른지는 과녁이 둘일 때와 셋일 때가 다릅니다.',
    capability:
      '크로싱·드웰·핀치 세 선택 방식으로 1차원 과제를 돌려 유효 폭 기반 피츠 모형, 처리량, 오류율, 재진입을 낸다',
    'paper-label': '바탕이 된 연구',

    'setup-title': '차례 설정',
    'setup-note':
      '한 번에 방아쇠 하나씩 돌립니다. 셋 다 돌리면 아래 표에서 나란히 견줄 수 있습니다.',
    task: '과제',
    'task-binary': '과녁 둘',
    'task-multi': '과녁 셋',
    'task-binary-note': '두 과녁을 번갈아 여섯 번. 폭과 거리가 판마다 달라집니다.',
    'task-multi-note': '가운데 놓인 세 과녁에서 네 번. 같은 것·옆 것·건너뛴 것이 한 번씩 나옵니다.',
    trigger: '방아쇠',
    trials: '판 수',
    haptics: '흔들림',
    'haptics-note': '휴대폰에서만 느껴집니다. 논문은 흔들림이 편안함은 올렸지만 성적은 바꾸지 못했다고 적었습니다.',

    't-cross': '크로싱',
    't-dwell': '드웰',
    't-pinch': '핀치',
    'h-cross': '과녁의 한쪽 모서리로 들어갔다가 같은 모서리로 되나오면 골라집니다. 반대편으로 빠지면 그냥 지나간 것입니다.',
    'h-dwell': '과녁 위에 0.5초 머무르면 골라집니다. 누를 것이 없어 편하지만, 지나가는 길목의 과녁도 눌립니다.',
    'h-pinch': '과녁 위에서 누르면(또는 스페이스) 골라집니다. 손목시계에서는 엄지와 검지를 맞대는 동작입니다.',

    'lane-title': '띠',
    'lane-note':
      '띠 위에서 좌우로만 움직이시면 됩니다. 논문의 센서가 손가락을 한 줄 위에서 좇았기 때문에 원래 1차원 과제입니다.',
    start: '시작',
    stop: '그만',
    restart: '다시',
    idle: '규칙으로 움직이는 손이 대신 해 보고 있습니다. 시작을 누르면 당신 차례입니다.',
    warmup: '연습 판입니다. 성적에 넣지 않습니다.',
    progress: '판',
    done: '끝났습니다. 아래에서 성적을 보세요.',
    'pinch-hint': '과녁 위에서 누르거나 스페이스를 치세요.',
    'move-hint': '켜진 과녁으로 옮기세요.',

    'hand-slip': '지나가던 과녁이 골라졌습니다. 크로싱은 들어온 모서리로 되나오면 고른 것으로 읽는데, 지나가던 손이 잠깐 뒤로 흔들리면 그 모양이 됩니다.',
    'hand-mine': '이 손의 빠르기와 떨림은 이 페이지가 정한 값입니다. 여기서 나오는 어긋남의 잦기는 잰 값이 아니므로 논문의 오류율과 견주지 마세요. 기계 손의 선택은 아래 성적에 넣지 않습니다.',
    'both-done': '이제 두 방식을 견줄 수 있습니다. 이 페이지가 견줄 수 있다고 한 것은 방식들 사이의 순서뿐입니다.',

    'results-title': '내 수치',
    'results-note':
      '연습 판을 뺀 기록입니다. 빗나간 선택은 시간 계산에서 빼고 오류율로 따로 셉니다. 폭은 명목 폭이 아니라 끝점이 흩어진 정도에서 되짚은 유효 폭을 씁니다.',
    'results-empty': '아직 기록이 없습니다. 위에서 한 차례 돌려 보세요.',
    'col-trigger': '방아쇠',
    'col-mt': '이동 시간',
    'col-er': '오류율',
    'col-tp': '처리량',
    'col-model': '피츠 모형',
    'col-fit': '적합도',
    'col-tre': '재진입',
    'col-n': '선택 수',
    mine: '내 수치',
    theirs: '논문',

    'plot-title': '난이도와 시간',
    'plot-note':
      '가로는 유효 난이도, 세로는 걸린 시간입니다. 점이 직선에 가깝게 놓이면 피츠 법칙이 잘 맞는 것입니다.',
    'plot-x': '유효 난이도 (bits)',
    'plot-y': '이동 시간 (초)',
    'plot-empty': '점이 둘 이상 모여야 직선을 그립니다.',

    'paper-said-title': '논문은 이렇게 적었습니다',
    'paper-said-binary':
      '과녁 둘: 크로싱이 가장 빨랐습니다(0.88초). 드웰은 1.34초, 핀치는 1.48초였고, 크로싱의 처리량은 드웰의 1.47배, 핀치의 2.37배였습니다. 오류는 핀치가 가장 많았고(7.52%) 드웰은 아예 없었습니다.',
    'paper-said-multi':
      '과녁 셋: 이동 시간에는 차이가 없었습니다. 대신 크로싱의 오류율이 5.21%로 드웰의 1.36%보다 네 배가량 높았고, 편안함도 드웰이 더 높았습니다(4.33 대 3.17). 빠르다는 이점이 과녁이 늘자 사라진 것입니다.',

    warning:
      '이 수치를 논문의 수치와 직접 견주지 마세요. 논문은 팔을 든 채 허공에서 손가락을 움직이는 일을 초음파로 좇았고, 여기서는 마우스나 손끝으로 화면을 짚습니다. 몸이 하는 일이 다릅니다. 견줄 수 있는 것은 세 방식 사이의 순서뿐입니다.',

    'took-title': '연구에서 가져온 것과 가져오지 않은 것',
    'took-yes':
      '가져온 것 — 세 방아쇠의 규칙(크로싱은 같은 모서리로 되나와야 하고 반대편으로 빠지면 취소, 드웰 문턱은 500ms), 1차원 과제라는 조건, 두 연구의 구조(둘을 번갈아 여섯 번 / 셋에서 네 번), 그리고 재는 방법(유효 폭 기반 피츠 모형, 처리량, 오류율, 재진입).',
    'took-no':
      '가져오지 않은 것 — 초음파 손가락 추적 장치, 밀리미터 단위의 크기, 참가자 18명·12명의 표본과 통계 검정. 여기 있는 것은 한 사람의 몇 분치입니다.',
  },

  en: {
    title: 'Three ways to pick with a fingertip',
    summary:
      'Try three selection triggers yourself and get the numbers for your own hand. Which one is fastest depends on whether there are two targets or three.',
    capability:
      'runs a one-dimensional selection task under crossing, dwell and pinch, and reports an effective-width Fitts model, throughput, error rate and target re-entries',
    'paper-label': 'Based on',

    'setup-title': 'Run setup',
    'setup-note': 'One trigger per run. Do all three and the table below puts them side by side.',
    task: 'Task',
    'task-binary': 'Two targets',
    'task-multi': 'Three targets',
    'task-binary-note': 'Six alternating selections. Width and distance change from trial to trial.',
    'task-multi-note': 'Four selections among three centred targets: one repeat, one adjacent, one skipped over.',
    trigger: 'Trigger',
    trials: 'Trials',
    haptics: 'Haptics',
    'haptics-note': 'Felt on phones only. The paper found haptics improved comfort but not performance.',

    't-cross': 'Crossing',
    't-dwell': 'Dwell',
    't-pinch': 'Pinch',
    'h-cross': 'Enter the target through one edge and come back out through the same edge. Leaving by the far edge means you merely passed through.',
    'h-dwell': 'Rest on the target for half a second. Nothing to press — but targets along the way get picked too.',
    'h-pinch': 'Click (or press space) while over a target. On a watch this is thumb meeting index finger.',

    'lane-title': 'The lane',
    'lane-note':
      'Move left and right along the lane. The task is one-dimensional because the paper’s sensor tracked a finger along a single line.',
    start: 'Start',
    stop: 'Stop',
    restart: 'Again',
    idle: 'A rule-driven hand is having a go. Press start and the lane is yours.',
    warmup: 'Practice trial — not counted.',
    progress: 'trial',
    done: 'Finished. Your numbers are below.',
    'pinch-hint': 'Click over the target, or press space.',
    'move-hint': 'Move to the lit target.',

    'hand-slip': 'A target it was only passing over got selected. Crossing counts a return through the entry edge as a choice, and a hand that wobbles backwards while passing makes exactly that shape.',
    'hand-mine': 'This hand’s speed and tremor are values this page chose. How often it slips is not a measurement, so do not compare it with the paper’s error rates. Nothing the hand selects is counted in the results below.',
    'both-done': 'You can compare two methods now. The only comparison this page allows is the ordering between methods.',

    'results-title': 'Your numbers',
    'results-note':
      'Practice trials excluded. Missed selections are left out of the timing and counted separately as errors. Width is effective width, recovered from how far your endpoints scattered, not the nominal width.',
    'results-empty': 'Nothing recorded yet. Do a run above.',
    'col-trigger': 'Trigger',
    'col-mt': 'Movement time',
    'col-er': 'Error rate',
    'col-tp': 'Throughput',
    'col-model': 'Fitts model',
    'col-fit': 'Fit',
    'col-tre': 'Re-entries',
    'col-n': 'Selections',
    mine: 'yours',
    theirs: 'paper',

    'plot-title': 'Difficulty against time',
    'plot-note':
      'Effective difficulty across, time up. Points falling near a straight line mean Fitts’ law holds for you.',
    'plot-x': 'effective difficulty (bits)',
    'plot-y': 'movement time (s)',
    'plot-empty': 'Two or more points are needed to draw a line.',

    'paper-said-title': 'What the paper reported',
    'paper-said-binary':
      'Two targets: crossing was fastest at 0.88 s, against 1.34 s for dwell and 1.48 s for pinch, with 1.47× the throughput of dwell and 2.37× that of pinch. Pinch made the most errors (7.52%); dwell made none.',
    'paper-said-multi':
      'Three targets: movement times no longer differed. Crossing instead produced 5.21% errors against dwell’s 1.36% — roughly four times as many — and felt less comfortable (3.17 against 4.33). The speed advantage vanished once targets multiplied.',

    warning:
      'Do not compare these numbers directly with the paper’s. There, an arm was held up and a finger moved through the air, tracked by sonar; here you drag a pointer across a screen. The body is doing something else. Only the ordering between the three methods is comparable.',

    'took-title': 'What this page took from the paper, and what it left',
    'took-yes':
      'Taken — the rules of all three triggers (crossing must exit through the same edge and cancels on the far edge; dwell threshold 500 ms), the one-dimensional setting, the structure of both studies (six alternating selections between two targets; four selections among three), and the measures: effective-width Fitts model, throughput, error rate, target re-entries.',
    'took-no':
      'Left — the sonar finger tracker, the millimetre sizes, and the 18- and 12-participant samples with their statistical tests. What is here is a few minutes from one person.',
  },

  ja: {
    title: '指先で選ぶ三つのやり方',
    summary:
      '的を選ぶ三つの引き金をご自身で試し、あなたの手の数値を測ります。どれが速いかは、的が二つのときと三つのときで違います。',
    capability:
      'クロッシング・ドウェル・ピンチの三方式で一次元の選択課題を回し、有効幅によるフィッツのモデル・スループット・誤り率・再進入を出す',
    'paper-label': '下敷きにした研究',

    'setup-title': '試行の設定',
    'setup-note': '一度に引き金を一つずつ回します。三つとも回すと下の表で並べて見られます。',
    task: '課題',
    'task-binary': '的が二つ',
    'task-multi': '的が三つ',
    'task-binary-note': '二つの的を交互に六回。幅と距離が回ごとに変わります。',
    'task-multi-note': '中央に並ぶ三つの的から四回。同じ的・隣の的・飛ばした的が一度ずつ出ます。',
    trigger: '引き金',
    trials: '回数',
    haptics: '振動',
    'haptics-note': '携帯でのみ感じられます。論文では振動は快適さを上げましたが成績は変えませんでした。',

    't-cross': 'クロッシング',
    't-dwell': 'ドウェル',
    't-pinch': 'ピンチ',
    'h-cross': '的の片方の縁から入り、同じ縁から戻って出ると選ばれます。反対側へ抜ければ通り過ぎただけです。',
    'h-dwell': '的の上に0.5秒とどまると選ばれます。押すものがなく楽ですが、通り道の的まで押されます。',
    'h-pinch': '的の上で押す(またはスペース)と選ばれます。腕時計では親指と人差し指を合わせる動作です。',

    'lane-title': '帯',
    'lane-note':
      '帯の上を左右にだけ動かしてください。論文のセンサーが指を一本の線の上で追ったため、もともと一次元の課題です。',
    start: '開始',
    stop: 'やめる',
    restart: 'もう一度',
    idle: '規則で動く手が代わりにやっています。開始を押せばあなたの番です。',
    warmup: '練習回です。成績には入れません。',
    progress: '回',
    done: '終わりました。下で成績をご覧ください。',
    'pinch-hint': '的の上で押すか、スペースを打ってください。',
    'move-hint': '光った的へ移してください。',

    'hand-slip': '通り過ぎるだけの的が選ばれました。クロッシングは入った端から戻ることを「選んだ」と読むので、通りがかりに手が少し後ろへ揺れると、その形になります。',
    'hand-mine': 'この手の速さと震えはこのページが決めた値です。ここでのずれの頻度は測った値ではないので、論文の誤り率と比べないでください。機械の手が選んだものは下の成績に入れません。',
    'both-done': 'これで二つの方式を比べられます。このページが比べてよいと言ったのは、方式どうしの順序だけです。',

    'results-title': 'あなたの数値',
    'results-note':
      '練習回を除いた記録です。外した選択は時間の計算から外し、誤り率として別に数えます。幅は名目の幅ではなく、終点の散らばりから戻した有効幅を使います。',
    'results-empty': 'まだ記録がありません。上で一度回してみてください。',
    'col-trigger': '引き金',
    'col-mt': '移動時間',
    'col-er': '誤り率',
    'col-tp': 'スループット',
    'col-model': 'フィッツのモデル',
    'col-fit': '適合',
    'col-tre': '再進入',
    'col-n': '選択数',
    mine: 'あなた',
    theirs: '論文',

    'plot-title': '難度と時間',
    'plot-note':
      '横が有効難度、縦がかかった時間です。点が直線に近く並べば、フィッツの法則がよく当てはまっています。',
    'plot-x': '有効難度 (bits)',
    'plot-y': '移動時間 (秒)',
    'plot-empty': '点が二つ以上集まると直線を引きます。',

    'paper-said-title': '論文はこう書いています',
    'paper-said-binary':
      '的が二つ: クロッシングが最も速く0.88秒。ドウェルは1.34秒、ピンチは1.48秒で、スループットはドウェルの1.47倍、ピンチの2.37倍でした。誤りはピンチが最多(7.52%)、ドウェルはゼロでした。',
    'paper-said-multi':
      '的が三つ: 移動時間に差はなくなりました。代わりにクロッシングの誤り率が5.21%とドウェルの1.36%の約四倍になり、快適さでも劣りました(3.17対4.33)。的が増えると速さの利点が消えたのです。',

    warning:
      'この数値を論文の数値と直接比べないでください。論文では腕を上げて空中で指を動かし、それを超音波で追いました。ここでは画面上をカーソルでなぞります。体のしていることが違います。比べられるのは三方式の順序だけです。',

    'took-title': '研究から取ったものと、取らなかったもの',
    'took-yes':
      '取ったもの — 三つの引き金の規則(クロッシングは同じ縁から出る必要があり、反対側へ抜けると取り消し。ドウェルの閾値は500ms)、一次元という条件、二つの研究の構造(二つの的を交互に六回/三つの的から四回)、そして測り方(有効幅によるフィッツのモデル、スループット、誤り率、再進入)。',
    'took-no':
      '取らなかったもの — 超音波の指追跡装置、ミリメートル単位の大きさ、18名・12名の標本と統計検定。ここにあるのは一人の数分ぶんです。',
  },
};
