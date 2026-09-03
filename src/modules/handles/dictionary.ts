/**
 * 손으로 고치는 차트 페이지의 세 언어 사전.
 * 숫자는 {자리}를 두고 화면 쪽에서 코어 값으로 채운다.
 */

import type { Locale } from '../../core/i18n';
import type { DesignGoalId, NodeId, SurveyItemId } from '../../core/chartspec';

export interface HandlesDictionary {
  title: string;
  summary: string;
  capability: string;
  paperLabel: string;
  caveat: string;
  goals: Record<DesignGoalId, string>;
  nodes: Record<NodeId, string>;
  survey: Record<SurveyItemId, string>;
  chart: {
    title: string;
    note: string;
    grabHint: string;
    dropHint: string;
    picked: string;
    nothingPicked: string;
    keyboard: string;
    legendOn: string;
    legendOff: string;
  };
  edits: {
    title: string;
    note: string;
    toStacked: string;
    toGrouped: string;
    clickDim: string;
    hoverTooltip: string;
    noInteraction: string;
    toggleLegend: string;
    reset: string;
    lastEdit: string;
    changedLines: string;
    nothingYet: string;
  };
  code: {
    title: string;
    note: string;
    lines: string;
    clickToPick: string;
    notRun: string;
  };
  demo: {
    title: string;
    note: string;
    run: string;
    stop: string;
    stepLine: string;
    done: string;
    handOver: string;
  };
  study: {
    title: string;
    people: string;
    mixed: string;
    prompts: string;
    codeEdits: string;
    directOnly: string;
    survey: string;
    notSignificant: string;
  };
  notes: {
    title: string;
    took: { title: string; items: string[] };
    left: { title: string; items: string[] };
    added: { title: string; items: string[] };
  };
  related: { title: string; chart: string; figure: string };
}

const ko: HandlesDictionary = {
  title: '손으로 고치는 차트',
  summary: '막대를 잡아 끌면 그림과 코드가 같은 자리에서 함께 바뀐다',
  capability: '차트 요소를 직접 잡아 묶음을 쌓기로 바꾸고 상호작용을 달면 코드가 스스로 따라 바뀌며, 코드 블록을 누르면 그 블록이 그리는 요소가 밝아진다. 손짓 한 번이 코드 몇 줄을 바꾸는지도 함께 센다',
  paperLabel: '근거 논문',
  caveat: '논문의 시스템은 직접 조작·코드 편집·언어모델 프롬프트 셋을 함께 쓴다. 이 페이지에는 언어모델이 없어 셋째 길이 빠져 있고, 코드를 실제로 돌리지도 않는다 - 하나의 명세에서 그림과 코드를 나란히 만들 뿐이다. 그래서 둘이 어긋나지 않는다는 논문의 뼈대는 그대로 성립한다.',
  goals: {
    dg1: 'DG1. 코드와 그림을 맞대어 어느 코드가 어느 요소를 그리는지 보이게 한다',
    dg2: 'DG2. 요소를 직접 잡아 고치고 상호작용도 시연으로 만들게 한다',
    dg3: 'DG3. 무엇이 어떻게 바뀔지 즉시 눈으로 보여 준다',
  },
  nodes: {
    title: '제목',
    xAxis: '가로축',
    yAxis: '세로축',
    marks: '막대',
    legend: '범례',
    interaction: '상호작용',
  },
  survey: {
    speed: '빠르게 끝낼 수 있었다',
    intentReflection: '의도한 수정이 결과에 그대로 반영됐다',
    easeOfManipulation: '원하는 요소를 고르고 다루기 쉬웠다',
    cognitiveLoad: '머리를 덜 썼다',
    easeOfUse: '전반적으로 쓰기 쉬웠다',
    futureUsage: '실제 일에도 쓰고 싶다',
  },
  chart: {
    title: '그림',
    note: '막대를 눌러 고르고, 다른 막대 위로 끌면 쌓인다. 고른 것은 코드에서도 함께 밝아진다.',
    grabHint: '막대를 잡아 끌어 보라.',
    dropHint: '여기에 놓으면 쌓인 막대가 된다',
    picked: '고른 것: {node}',
    nothingPicked: '아직 고른 것이 없다. 그림이나 코드에서 아무거나 눌러 보라.',
    keyboard: '키보드: Tab으로 요소를 옮기고 Enter로 고른다.',
    legendOn: '범례 있음',
    legendOff: '범례 없음',
  },
  edits: {
    title: '손잡이',
    note: '논문 과제 1의 목표는 묶음을 쌓기로 바꾸고 클릭하면 나머지가 흐려지게 하는 것이다.',
    toStacked: '쌓인 막대로',
    toGrouped: '묶은 막대로',
    clickDim: '클릭하면 흐려지게',
    hoverTooltip: '올리면 설명 뜨게',
    noInteraction: '상호작용 없이',
    toggleLegend: '범례 켜고 끄기',
    reset: '처음으로',
    lastEdit: '방금 한 것: {what}',
    changedLines: '코드 {lines}줄이 따라 바뀌었다',
    nothingYet: '아직 아무것도 고치지 않았다.',
  },
  code: {
    title: '코드',
    note: '이 코드는 그림과 같은 하나의 명세에서 나온다. 사람이 쓴 코드를 해석한 것이 아니라, 지금의 차트 상태를 적어 낸 것이다.',
    lines: '{lines}줄',
    clickToPick: '블록을 누르면 그 블록이 그리는 요소가 그림에서 밝아진다.',
    notRun: '이 코드는 실제로 돌지 않는다. 논문의 시스템은 D3로 돌리지만 이 페이지는 그림을 따로 그린다.',
  },
  demo: {
    title: '시연',
    note: '논문에서는 사람이 시스템에 시연한다. 여기서는 거꾸로, 시스템이 과제 1을 한 조작씩 시연해 보인다. 손잡이를 만지면 시연은 물러난다.',
    run: '시연 보기',
    stop: '멈추기',
    stepLine: '{done}/{total} 조작',
    done: '목표에 닿았다 - 쌓인 막대에 클릭 상호작용이 붙었다.',
    handOver: '여기서부터는 직접 잡아 고쳐 보라. 논문에서도 참가자들은 시연을 본 뒤 자기 손으로 이어 갔다.',
  },
  study: {
    title: '논문이 잰 것',
    people: '참가자 {n}명({ageMin}~{ageMax}세). 코딩 경험은 있지만 시각화 경험은 평균 {visMean}/5({visSd})로 적은 사람들이다. 과제마다 {limit}분이 주어졌다.',
    mixed: '결과는 뒤섞였다. 모양 바꾸기(소과제 1)에서는 DirectVis가 {s1d}명 전원 성공에 평균 {t1d}초로 기준선({s1b}명, {t1b}초)보다 나았지만, 상호작용 만들기(소과제 2)에서는 오히려 성공이 {s2d}명으로 기준선({s2b}명)보다 적고 시간도 더 걸렸다.',
    prompts: '말로 부탁한 횟수는 확실히 줄었다: 기준선 평균 {pb}회, DirectVis {pd}회(p<{pp}). DirectVis에서 프롬프트를 한 번도 안 쓴 사람이 {nonePrompt}명 있었다.',
    codeEdits: '코드를 직접 고친 횟수도 줄었다: {cb}회에서 {cd}회로(p<{cp}). 코드 편집을 아예 안 쓴 사람도 {noneCode}명이었다.',
    directOnly: '직접 조작은 소과제 1에서만 쓰였고(평균 {dm}회), 소과제 2에서는 대신 상호작용 시연이 쓰였다(평균 {is}회).',
    survey: '설문에서 유의하게 높았던 것: 빠름, 다루기 쉬움, 쓰기 쉬움.',
    notSignificant: '차이가 유의하지 않았던 것: 의도 반영, 머리 쓰기, 앞으로 쓸 뜻. 점수 분포는 그림에만 있어 옮기지 않았다.',
  },
  notes: {
    title: '가져온 것과 아닌 것',
    took: {
      title: '가져온 것',
      items: [
        '설계 목표 셋과 "그림과 코드가 한 상태에서 나온다"는 뼈대',
        '과제 1(묶음 → 쌓기, 클릭 흐리기)',
        '참가자와 결과 수치 - 성공률·시간·상호작용 수를 인쇄된 그대로',
      ],
    },
    left: {
      title: '가져오지 않은 것',
      items: [
        '언어모델(GPT-4o) - 말로 부탁하는 세 번째 길이 여기엔 없다',
        '그림 4·5의 막대값, 논문 화면 갈무리, 참가자 발언',
        '실험에 쓴 실제 자료',
      ],
    },
    added: {
      title: '이 페이지가 더한 것',
      items: [
        '시연자 - 논문과 반대로 시스템이 사람에게 시연한다',
        '손짓 한 번이 코드 몇 줄을 바꾸는지 세는 것',
        '지어낸 세 지역 네 계절 표',
      ],
    },
  },
  related: {
    title: '곁들여 볼 페이지',
    chart: '이 차트가 거짓말하는 크기 - 손잡이를 돌려 같은 자료를 부풀리는 페이지',
    figure: '그림 계획 - 무엇을 무엇으로 그릴지 고르는 페이지',
  },
};

const en: HandlesDictionary = {
  title: 'Handles on a Chart',
  summary: 'Grab a bar and both the picture and the code change from the same place',
  capability: 'Grab chart elements to turn grouped bars into stacked ones and attach interactions; the code rewrites itself, and clicking a code block lights up the element it draws. It also counts how many code lines one gesture rewrote',
  paperLabel: 'Based on',
  caveat: 'The paper’s system combines three paths: direct manipulation, code editing, and language-model prompting. This page has no language model, so the third path is missing, and the code is never actually run — the picture and the code are simply built side by side from one spec. The paper’s core idea, that the two cannot drift apart, still holds.',
  goals: {
    dg1: 'DG1. Show the correspondence between code and visualization so users can tell which code controls which element',
    dg2: 'DG2. Let users edit by grabbing elements directly, and author interactions by demonstration',
    dg3: 'DG3. Show immediately what will change and how',
  },
  nodes: {
    title: 'Title',
    xAxis: 'X axis',
    yAxis: 'Y axis',
    marks: 'Bars',
    legend: 'Legend',
    interaction: 'Interaction',
  },
  survey: {
    speed: 'let me finish tasks quickly',
    intentReflection: 'reflected my intended modifications',
    easeOfManipulation: 'made elements easy to select and manipulate',
    cognitiveLoad: 'required low mental effort',
    easeOfUse: 'was easy to use overall',
    futureUsage: 'I would use it for real work',
  },
  chart: {
    title: 'The picture',
    note: 'Click a bar to pick it; drag it onto another to stack. What you pick lights up in the code too.',
    grabHint: 'Try grabbing a bar and dragging it.',
    dropHint: 'drop here to stack',
    picked: 'picked: {node}',
    nothingPicked: 'Nothing picked yet. Click anything in the picture or the code.',
    keyboard: 'Keyboard: Tab moves between elements, Enter picks one.',
    legendOn: 'legend on',
    legendOff: 'legend off',
  },
  edits: {
    title: 'Handles',
    note: 'The paper’s first task is to turn grouped bars into stacked ones, then make a click dim the rest.',
    toStacked: 'Stack the bars',
    toGrouped: 'Group the bars',
    clickDim: 'Click dims the rest',
    hoverTooltip: 'Hover shows a tooltip',
    noInteraction: 'No interaction',
    toggleLegend: 'Toggle legend',
    reset: 'Back to start',
    lastEdit: 'just did: {what}',
    changedLines: '{lines} lines of code followed',
    nothingYet: 'Nothing edited yet.',
  },
  code: {
    title: 'The code',
    note: 'This code comes from the same single spec as the picture. It is not parsed from hand-written source; it is the current chart state written out.',
    lines: '{lines} lines',
    clickToPick: 'Click a block and the element it draws lights up in the picture.',
    notRun: 'This code is never actually run. The paper’s system executes D3; this page draws the picture separately.',
  },
  demo: {
    title: 'Demonstration',
    note: 'In the paper the user demonstrates to the system. Here it runs the other way: the system demonstrates task 1 to you, one edit at a time. Touch a handle and it steps back.',
    run: 'Watch it',
    stop: 'Stop',
    stepLine: '{done}/{total} edits',
    done: 'Target reached — stacked bars with a click interaction.',
    handOver: 'From here, grab things yourself. In the paper too, participants carried on by hand after the tutorial.',
  },
  study: {
    title: 'What the paper measured',
    people: '{n} participants (aged {ageMin}–{ageMax}). All could code, but visualization experience averaged only {visMean}/5 ({visSd}). Each task had a {limit}-minute limit.',
    mixed: 'The results are mixed. For the shape change (subtask 1), DirectVis had all {s1d} succeed at {t1d}s on average, beating the baseline ({s1b} people, {t1b}s). But for authoring interaction (subtask 2), DirectVis had fewer successes ({s2d} vs {s2b}) and took longer.',
    prompts: 'Prompting dropped clearly: baseline {pb} on average, DirectVis {pd} (p<{pp}). {nonePrompt} participants never prompted at all with DirectVis.',
    codeEdits: 'Hand code edits dropped too: from {cb} to {cd} (p<{cp}). {noneCode} participants never edited code at all.',
    directOnly: 'Direct manipulation appeared only in subtask 1 (mean {dm}); in subtask 2 people used interaction demonstration instead (mean {is}).',
    survey: 'Rated significantly higher: speed, ease of manipulation, ease of use.',
    notSignificant: 'Not significantly different: intent reflection, cognitive load, future usage. The score distributions live only in a figure and are not transcribed.',
  },
  notes: {
    title: 'What was taken, what was not',
    took: {
      title: 'Taken',
      items: [
        'The three design goals and the idea that picture and code come from one state',
        'Task 1 (grouped → stacked, click to dim)',
        'The participants and results — success rates, times, interaction counts as printed',
      ],
    },
    left: {
      title: 'Not taken',
      items: [
        'The language model (GPT-4o) — the third, spoken path is absent here',
        'Values in Figures 4–5, the paper’s screenshots, participant quotes',
        'The real study data',
      ],
    },
    added: {
      title: 'Added by this page',
      items: [
        'The demonstrator — reversed, so the system demonstrates to you',
        'Counting how many code lines one gesture rewrites',
        'An invented three-region, four-season table',
      ],
    },
  },
  related: {
    title: 'Pages to pair with',
    chart: 'How big this chart lies — turning handles to inflate the same data',
    figure: 'Figure planner — choosing what to draw with what',
  },
};

const ja: HandlesDictionary = {
  title: '手で直すチャート',
  summary: '棒をつかんで引くと、絵とコードが同じ場所から一緒に変わる',
  capability: 'チャートの要素を直接つかんでグループ棒を積み上げ棒に変え、インタラクションを付けるとコードが自ら追いかけて変わり、コードブロックを押すとそのブロックが描く要素が光る。手の動き一回がコードの何行を書き換えるかも数える',
  paperLabel: '根拠論文',
  caveat: '論文のシステムは直接操作・コード編集・言語モデルへの依頼の三つを併せて使う。このページには言語モデルがないので三つ目の道が抜けており、コードも実際には動かさない - 一つの仕様から絵とコードを並べて作るだけだ。二つがずれないという論文の骨組みはそのまま成り立つ。',
  goals: {
    dg1: 'DG1. コードと絵を突き合わせ、どのコードがどの要素を描くか見えるようにする',
    dg2: 'DG2. 要素を直接つかんで直し、インタラクションも実演で作れるようにする',
    dg3: 'DG3. 何がどう変わるかをすぐ目で見せる',
  },
  nodes: {
    title: 'タイトル',
    xAxis: '横軸',
    yAxis: '縦軸',
    marks: '棒',
    legend: '凡例',
    interaction: 'インタラクション',
  },
  survey: {
    speed: '速く終えられた',
    intentReflection: '意図した修正が結果に反映された',
    easeOfManipulation: '狙った要素を選び操作しやすかった',
    cognitiveLoad: '頭をあまり使わずに済んだ',
    easeOfUse: '全体として使いやすかった',
    futureUsage: '実際の仕事にも使いたい',
  },
  chart: {
    title: '絵',
    note: '棒を押して選び、別の棒の上へ引くと積み上がる。選んだものはコードでも一緒に光る。',
    grabHint: '棒をつかんで引いてみよう。',
    dropHint: 'ここに置くと積み上げ棒になる',
    picked: '選択: {node}',
    nothingPicked: 'まだ何も選んでいない。絵かコードのどれかを押してみよう。',
    keyboard: 'キーボード: Tabで要素を移動、Enterで選ぶ。',
    legendOn: '凡例あり',
    legendOff: '凡例なし',
  },
  edits: {
    title: 'つまみ',
    note: '論文の課題1の目標は、グループ棒を積み上げ棒に変え、クリックで残りを薄くすることだ。',
    toStacked: '積み上げ棒に',
    toGrouped: 'グループ棒に',
    clickDim: 'クリックで薄く',
    hoverTooltip: '乗せると説明が出る',
    noInteraction: 'インタラクションなし',
    toggleLegend: '凡例の切り替え',
    reset: '最初へ',
    lastEdit: '今したこと: {what}',
    changedLines: 'コード{lines}行が追いかけて変わった',
    nothingYet: 'まだ何も直していない。',
  },
  code: {
    title: 'コード',
    note: 'このコードは絵と同じ一つの仕様から出てくる。人が書いたコードを解釈したのではなく、今のチャートの状態を書き出したものだ。',
    lines: '{lines}行',
    clickToPick: 'ブロックを押すと、そのブロックが描く要素が絵で光る。',
    notRun: 'このコードは実際には動かない。論文のシステムはD3で動かすが、このページは絵を別に描く。',
  },
  demo: {
    title: '実演',
    note: '論文では人がシステムに実演する。ここでは逆に、システムが課題1を一操作ずつ実演して見せる。つまみを触ると実演は下がる。',
    run: '実演を見る',
    stop: '止める',
    stepLine: '{done}/{total}操作',
    done: '目標に届いた - 積み上げ棒にクリックのインタラクションが付いた。',
    handOver: 'ここからは自分でつかんで直してみよう。論文でも参加者はチュートリアルの後、自分の手で続けた。',
  },
  study: {
    title: '論文が測ったもの',
    people: '参加者{n}人({ageMin}~{ageMax}歳)。コーディング経験はあるが可視化経験は平均{visMean}/5({visSd})と少ない人たちだ。課題ごとに{limit}分が与えられた。',
    mixed: '結果は入り混じっている。形を変える(小課題1)ではDirectVisが{s1d}人全員成功、平均{t1d}秒で基準({s1b}人、{t1b}秒)より良かったが、インタラクション作り(小課題2)ではむしろ成功が{s2d}人と基準({s2b}人)より少なく、時間もかかった。',
    prompts: '言葉で頼んだ回数ははっきり減った: 基準は平均{pb}回、DirectVisは{pd}回(p<{pp})。DirectVisで一度も頼まなかった人が{nonePrompt}人いた。',
    codeEdits: 'コードを直に直した回数も減った: {cb}回から{cd}回へ(p<{cp})。コード編集を全く使わなかった人も{noneCode}人いた。',
    directOnly: '直接操作は小課題1でだけ使われ(平均{dm}回)、小課題2では代わりにインタラクションの実演が使われた(平均{is}回)。',
    survey: 'アンケートで有意に高かったもの: 速さ、操作のしやすさ、使いやすさ。',
    notSignificant: '差が有意でなかったもの: 意図の反映、頭の負担、今後使う意向。点数の分布は図にしかないので写していない。',
  },
  notes: {
    title: '受け取ったものとそうでないもの',
    took: {
      title: '受け取ったもの',
      items: [
        '三つの設計目標と「絵とコードが一つの状態から出る」骨組み',
        '課題1(グループ → 積み上げ、クリックで薄く)',
        '参加者と結果の数値 - 成功率・時間・操作回数を印刷のまま',
      ],
    },
    left: {
      title: '受け取らなかったもの',
      items: [
        '言語モデル(GPT-4o) - 言葉で頼む三つ目の道はここにない',
        '図4・5の棒の値、論文のスクリーンショット、参加者の発言',
        '実験に使った本物のデータ',
      ],
    },
    added: {
      title: 'このページが足したもの',
      items: [
        '実演者 - 論文とは逆に、システムが人に実演する',
        '手の動き一回がコードの何行を書き換えるかを数えること',
        '作り話の三地域四季の表',
      ],
    },
  },
  related: {
    title: '併せて見るページ',
    chart: 'このチャートが嘘をつく大きさ - つまみを回して同じデータを膨らませるページ',
    figure: '図の計画 - 何を何で描くかを選ぶページ',
  },
};

export const handlesDictionary: Record<Locale, HandlesDictionary> = { ko, en, ja };
