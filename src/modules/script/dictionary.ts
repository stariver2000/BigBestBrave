/**
 * 대본 진단 페이지의 세 언어 사전.
 *
 * 유형 이름은 논문의 용어(영문)를 괄호로 함께 적는다 - 분류표의 정본이
 * 영문이라, 화면 언어로 옮긴 이름만 두면 논문과 맞대 볼 수 없기 때문이다.
 * 숫자는 {자리}를 두고 화면 쪽에서 코어 값으로 채운다.
 */

import type { Locale } from '../../core/i18n';
import type { CategoryId, TypeId } from '../../core/howto';

interface TypeCopy {
  name: string;
  definition: string;
}

export interface ScriptDictionary {
  title: string;
  summary: string;
  capability: string;
  paperLabel: string;
  categories: Record<CategoryId, string>;
  types: Record<TypeId, TypeCopy>;
  input: {
    title: string;
    note: string;
    samples: { creating: string; fixing: string; using: string; custom: string };
    placeholder: string;
    counts: string;
    urlTooLong: string;
    emptyCustom: string;
    splitRule: string;
  };
  board: {
    title: string;
    note: string;
    keyboard: string;
    unlabeled: string;
    clear: string;
    adopt: string;
    suggestion: string;
    filterTitle: string;
    filterNote: string;
    filterReset: string;
    hiddenBySentence: string;
  };
  mix: {
    title: string;
    note: string;
    byCategory: string;
    byTypeLabel: string;
    headers: { name: string; yours: string; corpus: string; verdict: string };
    verdicts: { within: string; above: string; below: string; missing: string };
    absentTypes: string;
    needLabels: string;
  };
  lane: {
    title: string;
    note: string;
    band: string;
    dot: string;
    outside: string;
    empty: string;
  };
  counsel: {
    title: string;
    note: string;
    yours: string;
    corpus: string;
    checks: Record<'sideNote' | 'subgoal' | 'description' | 'warning' | 'selfPromotion', string>;
    studyTitle: string;
    studySearch: string;
    studySummarize: string;
    studyFollow: string;
    scoreUnit: string;
    reflectionNote: string;
    datasetFacts: string;
    discrepancy: string;
  };
  notes: {
    title: string;
    took: { title: string; items: string[] };
    left: { title: string; items: string[] };
    added: { title: string; items: string[] };
  };
  related: {
    title: string;
    subtitle: string;
    space: string;
  };
}

const ko: ScriptDictionary = {
  title: '대본 진단',
  summary: '하우투 대본의 문장마다 정보 유형을 달고, 실제 영상 120편의 구성과 견준다',
  capability: '대본을 붙여 넣으면 문장으로 나눠 스물한 가지 정보 유형을 달 수 있고, 지시·팁·잡담의 비율과 자리를 CHI 2023 분류표의 측정값과 견줘 지은이 조언으로 돌려준다',
  paperLabel: '근거 논문',
  categories: {
    greeting: '인사',
    overview: '개관',
    method: '방법',
    supplementary: '보충',
    explanation: '설명',
    description: '묘사',
    conclusion: '맺음',
    misc: '그 밖',
  },
  types: {
    opening: { name: '여는 인사 (Opening)', definition: '시작 인사와 진행자·채널 소개' },
    closing: { name: '맺는 인사 (Closing)', definition: '맺음 인사와 마무리 말' },
    goal: { name: '목표 (Goal)', definition: '영상의 주된 목적과 그 설명' },
    motivation: { name: '동기 (Motivation)', definition: '영상을 만든 이유나 배경' },
    briefing: { name: '예고 (Briefing)', definition: '목표를 어떻게 이룰지 짧게 미리 말하기' },
    subgoal: { name: '소목표 (Subgoal)', definition: '한 구간이 이루려는 것' },
    instruction: { name: '지시 (Instruction)', definition: '과제를 이루기 위해 하는 동작 그 자체' },
    tool: { name: '도구 (Tool)', definition: '쓸 재료·도구·장비의 소개' },
    tip: { name: '팁 (Tip)', definition: '지시를 더 쉽고 빠르게 만드는 덧붙임' },
    warning: { name: '경고 (Warning)', definition: '나쁜 결과를 피하려면 하지 말아야 할 것' },
    justification: { name: '근거 (Justification)', definition: '그 지시를 왜 하는지' },
    effect: { name: '결과 (Effect)', definition: '그 지시가 무엇을 낳는지' },
    status: { name: '상태 (Status)', definition: '대상이 지금 어떤 상태인지' },
    context: { name: '상황 (Context)', definition: '방법이나 처지에 대한 묘사' },
    toolSpec: { name: '도구 묘사 (Tool Specification)', definition: '도구·재료를 자세히 그리기' },
    outcome: { name: '결과물 (Outcome)', definition: '절차가 끝난 뒤의 결과물 묘사' },
    reflection: { name: '돌아보기 (Reflection)', definition: '전체 절차의 요약·평가·다음을 위한 제안' },
    sideNote: { name: '잡담 (Side Note)', definition: '사담·농담·시청자 호응·광고' },
    selfPromotion: { name: '자기 홍보 (Self-promotion)', definition: '좋아요·구독·알림·후원 부탁' },
    bridge: { name: '이음말 (Bridge)', definition: '구간을 잇는 뜻 없는 관용구' },
    filler: { name: '군말 (Filler)', definition: '습관처럼 나오는 군소리' },
  },
  input: {
    title: '대본',
    note: '견본 셋은 이 페이지가 지은 글이다. 직접 쓴 대본을 붙여 넣어도 된다.',
    samples: { creating: '만들기 견본', fixing: '고치기 견본', using: '쓰기 견본', custom: '직접 넣기' },
    placeholder: '하우투 영상 대본을 붙여 넣으세요. 마침표·물음표·느낌표·줄바꿈에서 문장이 나뉩니다.',
    counts: '{total}문장 · 라벨 {labeled}개',
    urlTooLong: '본문이 {max}자를 넘어 URL에는 라벨만 실린다. 이 링크를 연 사람은 본문을 다시 붙여 넣어야 한다.',
    emptyCustom: '대본을 붙여 넣으면 문장으로 나뉘어 아래에 놓인다.',
    splitRule: '마침표·물음표·느낌표(전각 포함)와 줄바꿈에서 나눈다. 논문의 자료집은 BERT 문장 분리기를 썼지만 여기서는 이 단순한 규칙을 쓴다.',
  },
  board: {
    title: '문장과 라벨',
    note: '문장을 고르고 갈래에서 유형을 짚으면 라벨이 붙는다. 회색 추천은 단서 낱말로 하는 이 페이지의 어림짐작이라, 채택해야 라벨이 된다.',
    keyboard: '키보드: ↑↓ 문장 이동 · 1~8 갈래 열기 · 1~4 유형 고르기 · Backspace 지움 · Esc 닫기',
    unlabeled: '미정',
    clear: '지움',
    adopt: '채택',
    suggestion: "추천 {type} · 단서 '{cue}'",
    filterTitle: '갈래 필터',
    filterNote: '논문의 실험 화면처럼, 갈래를 끄면 그 문장이 접힌다. 켜진 갈래만 남기고 훑어 보라.',
    filterReset: '전부 보기',
    hiddenBySentence: '{count}문장이 필터로 접혀 있다',
  },
  mix: {
    title: '구성 비율',
    note: '논문은 문장의 시간으로 비율을 쟀다. 대본에는 시각이 없어 글자 수로 근사한다. 판정 띠는 120편의 평균±1SD다 - 밖이라고 틀린 것이 아니라, 흔치 않다는 뜻이다.',
    byCategory: '갈래로',
    byTypeLabel: '유형으로',
    headers: { name: '갈래·유형', yours: '내 대본', corpus: '말뭉치 120편', verdict: '판정' },
    verdicts: { within: '띠 안', above: '띠 위', below: '띠 아래', missing: '없음' },
    absentTypes: '대본에 없는 유형 {count}개는 표에서 접었다.',
    needLabels: '라벨을 달면 여기에 비율이 선다.',
  },
  lane: {
    title: '자리 살피기',
    note: '영상 시간을 1000으로 정규화했을 때(표 6), 말뭉치 120편에서 각 갈래의 가운데 90%가 놓이던 자리다. 내 문장이 띠 밖이면 흔치 않은 자리에 있다는 관찰일 뿐, 잘못이 아니다.',
    band: '말뭉치 가운데 90%',
    dot: '내 문장',
    outside: '띠 밖',
    empty: '라벨이 달리면 문장의 자리가 여기 찍힌다.',
  },
  counsel: {
    title: '지은이 조언',
    note: '논문 9.2.3절이 낸 물음들이다 - 분류표를 지은이 쪽에서 쓰면 자기 영상을 점검하는 잣대가 된다.',
    yours: '내 대본 {share}%',
    corpus: '말뭉치 {mean}±{sd}%',
    checks: {
      sideNote: '잡담이 너무 많지 않은가',
      subgoal: '소목표를 충분히 말하는가',
      description: '묘사가 넉넉한가',
      warning: '경고를 빼놓지 않았는가 - 참가자들은 경고가 눈에 안 띄기 쉽다고 했다',
      selfPromotion: '채널 홍보가 지나치지 않은가',
    },
    studyTitle: '보는 사람은 무엇을 찾았나 (n={n})',
    studySearch: '찾기: 질문 셋을 알맞은 유형에 평균 {matched}개 이었다',
    studySummarize: '간추릴 때 중요하다던 유형',
    studyFollow: '따라할 때 중요하다던 유형',
    scoreUnit: '{score}/5',
    reflectionNote: '돌아보기(Reflection)는 요약을 기대하고 찾았지만 영상에 없어 {score}/5에 그쳤다',
    datasetFacts: '잣대의 출처: 유튜브 하우투 영상 {videos}편({genres}장르×{perGenre}편)의 문장 9.9천 개. 주석자 둘의 일치도 Cohen’s Kappa {kappa}. 한 영상에는 평균 {types}개 유형이 나온다.',
    discrepancy: '논문 자체의 어긋남 하나: 본문은 실시간 나레이션에 도구 묘사가 더 많다고 두 번 말하지만, 인쇄된 수치는 실시간 {realTime}% < 후시녹음 {dubbed}%로 반대다. 고치지 않고 그대로 둔다.',
  },
  notes: {
    title: '가져온 것과 아닌 것',
    took: {
      title: '가져온 것',
      items: [
        '표 1의 여덟 갈래·스물한 유형과 정의',
        '부록 표 4·5·6의 비율·자리 측정값과 5.2절의 차이 분석',
        '자료집의 짜임(120편·12장르·Kappa 0.78)과 7~8장의 과제별 점수',
      ],
    },
    left: {
      title: '가져오지 않은 것',
      items: [
        'HTM-Type 자료집의 문장 원문 - 남의 영상 대본이다',
        '그림 2·3·5~8에만 실린 값 - 그림의 값은 옮기지 않는다',
        '표 2의 기존 시스템 목록',
      ],
    },
    added: {
      title: '이 페이지가 더한 것',
      items: [
        '견본 대본 셋과 그 라벨 - 셋 다 지은 글이다',
        '글자 수로 시간 비율을 근사하는 것',
        '단서 낱말 추천 - 논문에 없는 어림짐작이라 사람이 확정해야 라벨이 된다',
      ],
    },
  },
  related: {
    title: '곁들여 볼 페이지',
    subtitle: '자막 다시 나누기 - 같은 영상 대본을 숨 고르기에 맞춰 자르는 페이지',
    space: '글쓰기 도우미의 설계 공간 - 또 하나의 큰 분류표를 걷는 페이지',
  },
};

const en: ScriptDictionary = {
  title: 'Script Doctor',
  summary: 'Label every sentence of a how-to script and weigh its mix against 120 real videos',
  capability: 'Paste a script, split it into sentences, and tag each with one of 21 information types; the page weighs your mix of instructions, tips, and chatter against the CHI 2023 taxonomy measurements and returns author advice',
  paperLabel: 'Based on',
  categories: {
    greeting: 'Greeting',
    overview: 'Overview',
    method: 'Method',
    supplementary: 'Supplementary',
    explanation: 'Explanation',
    description: 'Description',
    conclusion: 'Conclusion',
    misc: 'Miscellaneous',
  },
  types: {
    opening: { name: 'Opening', definition: 'Starting remarks and channel introductions' },
    closing: { name: 'Closing', definition: 'Parting remarks and wrap-up' },
    goal: { name: 'Goal', definition: 'The main purpose of the video and its description' },
    motivation: { name: 'Motivation', definition: 'Why the video was made' },
    briefing: { name: 'Briefing', definition: 'A quick rundown of how the goal will be achieved' },
    subgoal: { name: 'Subgoal', definition: 'What one section sets out to do' },
    instruction: { name: 'Instruction', definition: 'The action performed to complete the task' },
    tool: { name: 'Tool', definition: 'Introducing materials, ingredients, and equipment' },
    tip: { name: 'Tip', definition: 'Additions that make instructions easier or faster' },
    warning: { name: 'Warning', definition: 'What to avoid to prevent bad outcomes' },
    justification: { name: 'Justification', definition: 'Why the instruction is performed' },
    effect: { name: 'Effect', definition: 'What the instruction leads to' },
    status: { name: 'Status', definition: 'The current state of the target object' },
    context: { name: 'Context', definition: 'Describing the method or the setting' },
    toolSpec: { name: 'Tool Specification', definition: 'Details about tools and materials' },
    outcome: { name: 'Outcome', definition: 'The final result of the procedure' },
    reflection: { name: 'Reflection', definition: 'Summary, evaluation, and suggestions for next time' },
    sideNote: { name: 'Side Note', definition: 'Personal stories, jokes, engagement, ads' },
    selfPromotion: { name: 'Self-promotion', definition: 'Asking for likes, subscriptions, notifications' },
    bridge: { name: 'Bridge', definition: 'Meaningless phrases connecting sections' },
    filler: { name: 'Filler', definition: 'Habitual filler words' },
  },
  input: {
    title: 'Script',
    note: 'The three samples are written for this page. Paste your own script if you have one.',
    samples: { creating: 'Creating sample', fixing: 'Fixing sample', using: 'Using sample', custom: 'Paste your own' },
    placeholder: 'Paste a how-to script. Sentences split at periods, question marks, exclamation marks, and line breaks.',
    counts: '{total} sentences · {labeled} labeled',
    urlTooLong: 'The text is over {max} characters, so the URL carries only the labels. Anyone opening this link must paste the text again.',
    emptyCustom: 'Paste a script and it will be split into sentences below.',
    splitRule: 'Split at periods, question and exclamation marks (full-width too), and line breaks. The paper’s dataset used a BERT sentence splitter; this page uses this simple rule instead.',
  },
  board: {
    title: 'Sentences and labels',
    note: 'Pick a sentence, then a category and a type. Gray suggestions are this page’s cue-word guesses — they only become labels when you adopt them.',
    keyboard: 'Keyboard: ↑↓ move · 1–8 open a category · 1–4 pick a type · Backspace clear · Esc close',
    unlabeled: 'unset',
    clear: 'Clear',
    adopt: 'Adopt',
    suggestion: "suggests {type} · cue '{cue}'",
    filterTitle: 'Category filter',
    filterNote: 'As in the paper’s study probe, switching a category off folds its sentences away. Skim what remains.',
    filterReset: 'Show all',
    hiddenBySentence: '{count} sentences folded by the filter',
  },
  mix: {
    title: 'Composition',
    note: 'The paper measured shares in time; a script has no timestamps, so this page approximates by character count. The band is the 120-video mean ±1SD — outside it means uncommon, not wrong.',
    byCategory: 'By category',
    byTypeLabel: 'By type',
    headers: { name: 'Category · type', yours: 'Your script', corpus: 'Corpus (120)', verdict: 'Verdict' },
    verdicts: { within: 'in band', above: 'above', below: 'below', missing: 'absent' },
    absentTypes: 'Folded from the table: {count} type(s) with no share in the script.',
    needLabels: 'Label some sentences and the shares appear here.',
  },
  lane: {
    title: 'Placement',
    note: 'With video time normalized to 1000 (Table 6), these bands hold the middle 90% of each category across the 120 videos. A dot outside the band sits in an uncommon place — an observation, not a fault.',
    band: 'corpus middle 90%',
    dot: 'your sentences',
    outside: 'outside the band',
    empty: 'Label sentences and their positions land here.',
  },
  counsel: {
    title: 'Author advice',
    note: 'These are the questions Section 9.2.3 raises — used from the author’s side, the taxonomy becomes a checklist for your own video.',
    yours: 'yours {share}%',
    corpus: 'corpus {mean}±{sd}%',
    checks: {
      sideNote: 'Do I have too many side notes?',
      subgoal: 'Do I mention enough subgoals?',
      description: 'Are there adequate descriptions?',
      warning: 'Did I leave out warnings? Participants said warnings are easy to miss',
      selfPromotion: 'Is the self-promotion overdone?',
    },
    studyTitle: 'What viewers looked for (n={n})',
    studySearch: 'Search: participants matched {matched} of three questions to the right type on average',
    studySummarize: 'Rated important for summarizing',
    studyFollow: 'Rated important for following',
    scoreUnit: '{score}/5',
    reflectionNote: 'Reflection was sought as a ready-made summary but the video had none, so it scored {score}/5',
    datasetFacts: 'The yardstick: 9.9k sentences from {videos} YouTube how-to videos ({genres} genres × {perGenre}), annotator agreement Cohen’s Kappa {kappa}, an average of {types} types per video.',
    discrepancy: 'One discrepancy inside the paper itself: the prose says twice that real-time narration carries more Tool Specification, yet the printed shares read real-time {realTime}% < dubbed {dubbed}%. Left as printed.',
  },
  notes: {
    title: 'What was taken, what was not',
    took: {
      title: 'Taken',
      items: [
        'The 8 categories and 21 types of Table 1, with definitions',
        'Share and placement measurements from appendix Tables 4–6 and the Section 5.2 differences',
        'The dataset’s shape (120 videos, 12 genres, Kappa 0.78) and the per-task scores from Sections 7–8',
      ],
    },
    left: {
      title: 'Not taken',
      items: [
        'The HTM-Type sentences themselves — other people’s scripts',
        'Values that appear only in Figures 2, 3, 5–8 — figure-only values are never transcribed',
        'Table 2’s survey of existing systems',
      ],
    },
    added: {
      title: 'Added by this page',
      items: [
        'The three sample scripts and their labels — all written here',
        'Approximating time shares by character count',
        'Cue-word suggestions — guesswork absent from the paper; a person must confirm them',
      ],
    },
  },
  related: {
    title: 'Pages to pair with',
    subtitle: 'Subtitle rechunking — cutting the same kind of video script along speech pauses',
    space: 'The writing-assistant design space — another large taxonomy to walk through',
  },
};

const ja: ScriptDictionary = {
  title: '台本診断',
  summary: 'ハウツー台本の文ごとに情報の種類を付け、実際の動画120本の構成と見比べる',
  capability: '台本を貼り付けると文に分かれ、21種類の情報タイプを付けられる。指示・コツ・雑談の割合と位置をCHI 2023の分類表の測定値と見比べ、作り手への助言として返す',
  paperLabel: '根拠論文',
  categories: {
    greeting: '挨拶',
    overview: '概観',
    method: '方法',
    supplementary: '補足',
    explanation: '説明',
    description: '描写',
    conclusion: '締め',
    misc: 'その他',
  },
  types: {
    opening: { name: '始めの挨拶 (Opening)', definition: '始まりの挨拶とチャンネル紹介' },
    closing: { name: '結びの挨拶 (Closing)', definition: '別れの挨拶と締めくくり' },
    goal: { name: '目標 (Goal)', definition: '動画の主な目的とその説明' },
    motivation: { name: '動機 (Motivation)', definition: '動画を作った理由や背景' },
    briefing: { name: '予告 (Briefing)', definition: '目標をどう達成するかを短く先に言う' },
    subgoal: { name: '小目標 (Subgoal)', definition: '一つの区間が目指すもの' },
    instruction: { name: '指示 (Instruction)', definition: '課題を成すための動作そのもの' },
    tool: { name: '道具 (Tool)', definition: '使う材料・道具・機材の紹介' },
    tip: { name: 'コツ (Tip)', definition: '指示をより楽に速くする添え物' },
    warning: { name: '警告 (Warning)', definition: '悪い結果を避けるためにしてはいけないこと' },
    justification: { name: '根拠 (Justification)', definition: 'その指示をなぜ行うのか' },
    effect: { name: '効果 (Effect)', definition: 'その指示が何をもたらすか' },
    status: { name: '状態 (Status)', definition: '対象がいまどんな状態か' },
    context: { name: '状況 (Context)', definition: '方法や置かれた場についての描写' },
    toolSpec: { name: '道具の描写 (Tool Specification)', definition: '道具・材料を細かく描く' },
    outcome: { name: '成果物 (Outcome)', definition: '手順を終えた後の結果の描写' },
    reflection: { name: '振り返り (Reflection)', definition: '全体の要約・評価・次への提案' },
    sideNote: { name: '雑談 (Side Note)', definition: '私語・冗談・視聴者への呼びかけ・広告' },
    selfPromotion: { name: '自己宣伝 (Self-promotion)', definition: '高評価・登録・通知・支援のお願い' },
    bridge: { name: 'つなぎ (Bridge)', definition: '区間をつなぐ意味のない決まり文句' },
    filler: { name: '口癖 (Filler)', definition: '癖のように出る言葉' },
  },
  input: {
    title: '台本',
    note: '三つの見本はこのページのために書いた文章だ。自分の台本を貼り付けてもいい。',
    samples: { creating: '作る見本', fixing: '直す見本', using: '使う見本', custom: '自分で貼る' },
    placeholder: 'ハウツー動画の台本を貼り付けてください。句点・疑問符・感嘆符・改行で文が分かれます。',
    counts: '{total}文 · ラベル{labeled}個',
    urlTooLong: '本文が{max}字を超えたのでURLにはラベルだけが載る。このリンクを開く人は本文を貼り直す必要がある。',
    emptyCustom: '台本を貼り付けると文に分かれて下に並ぶ。',
    splitRule: '句点・疑問符・感嘆符(全角も)と改行で分ける。論文のデータセットはBERTの文分割器を使ったが、ここではこの単純な規則を使う。',
  },
  board: {
    title: '文とラベル',
    note: '文を選び、分類からタイプを指すとラベルが付く。灰色の推薦は手がかり語によるこのページの当て推量で、採用して初めてラベルになる。',
    keyboard: 'キーボード: ↑↓ 文の移動 · 1~8 分類を開く · 1~4 タイプを選ぶ · Backspace 消す · Esc 閉じる',
    unlabeled: '未定',
    clear: '消す',
    adopt: '採用',
    suggestion: "推薦 {type} · 手がかり「{cue}」",
    filterTitle: '分類フィルタ',
    filterNote: '論文の実験画面のように、分類を消すとその文が畳まれる。残った文だけを流し読みしてみる。',
    filterReset: '全部見る',
    hiddenBySentence: '{count}文がフィルタで畳まれている',
  },
  mix: {
    title: '構成の割合',
    note: '論文は文の時間で割合を測った。台本には時刻がないので文字数で近似する。帯は120本の平均±1SD - 外れても間違いではなく、珍しいという意味だ。',
    byCategory: '分類で',
    byTypeLabel: 'タイプで',
    headers: { name: '分類・タイプ', yours: '自分の台本', corpus: 'コーパス120本', verdict: '判定' },
    verdicts: { within: '帯の内', above: '帯の上', below: '帯の下', missing: 'なし' },
    absentTypes: '台本にないタイプ{count}個は表から畳んだ。',
    needLabels: 'ラベルを付けるとここに割合が立つ。',
  },
  lane: {
    title: '位置を見る',
    note: '動画時間を1000に正規化したとき(表6)、コーパス120本で各分類の真ん中90%が置かれていた場所だ。帯の外の点は珍しい位置にあるという観察であって、誤りではない。',
    band: 'コーパスの真ん中90%',
    dot: '自分の文',
    outside: '帯の外',
    empty: 'ラベルが付くと文の位置がここに刻まれる。',
  },
  counsel: {
    title: '作り手への助言',
    note: '論文9.2.3節が挙げた問いだ - 分類表を作り手の側で使うと、自分の動画を点検する物差しになる。',
    yours: '自分 {share}%',
    corpus: 'コーパス {mean}±{sd}%',
    checks: {
      sideNote: '雑談が多すぎないか',
      subgoal: '小目標を十分に言っているか',
      description: '描写が足りているか',
      warning: '警告を抜かしていないか - 参加者は警告が目に付きにくいと言った',
      selfPromotion: '自己宣伝がくどくないか',
    },
    studyTitle: '見る人は何を探したか (n={n})',
    studySearch: '探す: 三つの質問を正しいタイプに平均{matched}個つないだ',
    studySummarize: '要約するとき大事だとされたタイプ',
    studyFollow: '従うとき大事だとされたタイプ',
    scoreUnit: '{score}/5',
    reflectionNote: '振り返り(Reflection)は出来合いの要約を期待して探されたが動画になく、{score}/5にとどまった',
    datasetFacts: '物差しの出どころ: YouTubeのハウツー動画{videos}本({genres}ジャンル×{perGenre}本)の文9.9千個。注釈者二人の一致度Cohen’s Kappa {kappa}。一本の動画には平均{types}種類が現れる。',
    discrepancy: '論文自体の食い違いが一つ: 本文はリアルタイム実況の方が道具の描写が多いと二度述べるが、印刷された数値はリアルタイム{realTime}% < アフレコ{dubbed}%と逆だ。直さずそのまま置く。',
  },
  notes: {
    title: '受け取ったものとそうでないもの',
    took: {
      title: '受け取ったもの',
      items: [
        '表1の8分類21タイプとその定義',
        '付録表4~6の割合・位置の測定値と5.2節の差の分析',
        'データセットの成り立ち(120本・12ジャンル・Kappa 0.78)と7~8章の課題別スコア',
      ],
    },
    left: {
      title: '受け取らなかったもの',
      items: [
        'HTM-Typeの文そのもの - 他人の動画の台本だ',
        '図2・3・5~8にしかない値 - 図だけの値は写さない',
        '表2の既存システム一覧',
      ],
    },
    added: {
      title: 'このページが足したもの',
      items: [
        '三つの見本台本とそのラベル - すべてここで書いた文章だ',
        '時間の割合を文字数で近似すること',
        '手がかり語による推薦 - 論文にない当て推量なので、人が確定して初めてラベルになる',
      ],
    },
  },
  related: {
    title: '併せて見るページ',
    subtitle: '字幕の切り直し - 同じ動画の台本を息継ぎに合わせて切るページ',
    space: '執筆支援の設計空間 - もう一つの大きな分類表を歩くページ',
  },
};

export const scriptDictionary: Record<Locale, ScriptDictionary> = { ko, en, ja };
