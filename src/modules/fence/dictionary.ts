/** 울타리 문구 사전 (ko / en / ja). */

import type { Dictionary } from '../../core/i18n';

export type FenceKey =
  | 'title' | 'summary' | 'capability' | 'paper-label' | 'full-text'
  | 'map-title' | 'map-note' | 'map-pick' | 'map-picked' | 'map-only-all' | 'map-usage'
  | 'ph-forethought' | 'ph-performance' | 'ph-selfReflection'
  | 'c-planning' | 'c-explanation' | 'c-input' | 'c-output' | 'c-evaluation'
  | 's-requestSuggestions' | 's-acceptSuggestions' | 's-declarePlan' | 's-configureLlm'
  | 's-chooseContent' | 's-askQuestions'
  | 's-generateMaterials' | 's-searchResources' | 's-generateSummary'
  | 's-answerQuestions' | 's-demonstrateUnderstanding' | 's-conversation' | 's-writing'
  | 's-requestFeedback' | 's-requestPracticeProblems' | 's-requestProficiencyAssessment'
  | 's-selfAssessProficiency' | 's-reflectOnLearningProcess' | 's-evaluateLlmOutput'
  | 'scales-title' | 'scales-note'
  | 'sc-accuracy' | 'sc-independence' | 'sc-authenticity'
  | 'scd-accuracy' | 'scd-independence' | 'scd-authenticity'
  | 'scq-accuracy' | 'scq-independence' | 'scq-authenticity'
  | 'obstacle-title' | 'obstacle-note' | 'ob-selection' | 'ob-execution' | 'obstacle-meta'
  | 'months-title' | 'months-note' | 'ev-ruleLifted' | 'ev-duolingo' | 'months-line'
  | 'posts' | 'comments'
  | 'words-title' | 'words-note' | 'words-ia' | 'words-line'
  | 'took-title' | 'took-yes' | 'took-no' | 'took-mine';

export const fenceDictionary: Dictionary<FenceKey> = {
  ko: {
    title: '울타리 치는 법',
    summary:
      '혼자 언어를 배우는 사람에게 AI는 어디까지 도와야 도움일까요. 커뮤니티의 여섯 달과 학습자 13명의 실험에서, 맡길 일과 지킬 일을 가르는 세 가지 저울이 나왔습니다.',
    capability:
      '언어 배움의 열아홉 가지 일을 세 국면의 지도에 놓고, 13명이 어디까지 맡겼는지와 맡기기 전에 대 볼 세 가지 저울을 본다',
    'paper-label': '바탕이 된 연구',
    'full-text': '전문',

    'map-title': '배움의 밭, 열아홉 가지 일',
    'map-note':
      '논문은 언어 배움의 일을 짐머만의 세 국면(계획하기, 해내기, 돌아보기)에 놓인 다섯 갈래 열아홉 가지로 갈랐습니다. 막대는 13명 가운데 그 일을 한 번이라도 AI에 맡겨 본 사람 수입니다. 눌러 보십시오.',
    'map-pick': '하나를 골라 보십시오',
    'map-picked': '13명 가운데 {count}명이 이 일을 맡겨 보았습니다.',
    'map-only-all': '전원이 맡긴 일은 이것 하나뿐입니다.',
    'map-usage': '열한 명은 다섯 갈래를 모두 썼고, 나머지 두 명도 네 갈래씩 썼습니다.',

    'ph-forethought': '계획하기',
    'ph-performance': '해내기',
    'ph-selfReflection': '돌아보기',

    'c-planning': '계획',
    'c-explanation': '풀이',
    'c-input': '읽고 듣기',
    'c-output': '말하고 쓰기',
    'c-evaluation': '평가',

    's-requestSuggestions': '계획 제안 받기',
    's-acceptSuggestions': '제안 받아들이기',
    's-declarePlan': '계획 선언하기',
    's-configureLlm': 'AI 설정하기',
    's-chooseContent': '다룰 내용 고르기',
    's-askQuestions': '질문하기',
    's-generateMaterials': '읽을거리 만들게 하기',
    's-searchResources': '자료 찾게 하기',
    's-generateSummary': '요약 받기',
    's-answerQuestions': '문제에 답하기',
    's-demonstrateUnderstanding': '이해한 것 보이기',
    's-conversation': '대화 연습',
    's-writing': '글쓰기 연습',
    's-requestFeedback': '고쳐 달라 하기',
    's-requestPracticeProblems': '연습 문제 받기',
    's-requestProficiencyAssessment': '실력 평가 받기',
    's-selfAssessProficiency': '스스로 실력 재기',
    's-reflectOnLearningProcess': '배움 과정 돌아보기',
    's-evaluateLlmOutput': 'AI의 답 검증하기',

    'scales-title': '맡기기 전에 대 보는 세 가지 저울',
    'scales-note':
      '점수는 없습니다. 질적 연구라 논문도 점수를 매기지 않았습니다. 있는 것은 커뮤니티와 실험에서 되풀이해 나온 세 가지 물음이고, 어디에 울타리를 칠지는 배우는 사람마다 다르게 정했습니다.',
    'sc-accuracy': '정확한가',
    'sc-independence': '스스로 해야 크는가',
    'sc-authenticity': '진짜 사람이어야 하는가',
    'scd-accuracy':
      '틀릴 수 있음을 알고도 맡길 만한 일인가. 문법 예문 만들기는 믿고 맡기고, 대화 연습은 틀려도 상대가 있다는 것이 더 중요했습니다. 견디는 폭은 사람마다 달랐습니다.',
    'scd-independence':
      '그 일을 해내는 힘 자체가 배움인 일이 있습니다. 사전을 찾고 문맥에서 뜻을 짚는 일을 맡겨 버리면 편해지지만, 쉽게 얻은 것은 쉽게 사라집니다.',
    'scd-authenticity':
      '언어는 사람과 말하려고 배웁니다. 사람 아닌 것에게 사람의 말을 배우는 것이 앞뒤가 안 맞는다는 이들도, 처음에는 오히려 마음 편한 상대라는 이들도 있었습니다.',
    'scq-accuracy': '"사람도 틀리잖아요." - 그렇게 말하며 맡기는 이들이 있었습니다.',
    'scq-independence': '"동사 변화를 찾고, 낱말 뜻을 찾고, 문장을 풀어내는 힘을 스스로 빼앗고 있는 겁니다. 무엇을 위해서요? 글을 이해하려고요?"',
    'scq-authenticity': '"사람이 실제로 어떻게 말하는지를 왜 프로그램한테 배우려는 거죠?"',

    'obstacle-title': '두 가지 걸림돌, 그리고 그 밑의 상수',
    'obstacle-note':
      '좋은 울타리를 알아도 무너지는 길이 두 가지 있습니다. 논문은 이 둘을 가려 이름을 붙였습니다.',
    'ob-selection': '고르기의 걸림돌 - 무엇이 좋은 전략인지 몰라서 어긋난 것을 고른다.',
    'ob-execution': '해내기의 걸림돌 - 좋은 전략을 알면서도 그대로 하지 못한다.',
    'obstacle-meta':
      '그리고 그 밑에 프롬프트 품이라는 상수가 깔려 있습니다. 참가자들은 더 정확하고 더 홀로 서고 더 진짜 같은 도움이 좋은 프롬프트로 가능하다는 것을 알면서도, 그 품이 아까워 타협했습니다.',

    'months-title': '울타리가 열리던 여섯 달',
    'months-note':
      '레딧 r/languagelearning의 반 년입니다. 3월 16일에 AI 관련 글 금지가 풀렸고, 4월 28일 듀오링고가 AI 우선을 선언하자 5월이 가장 시끄러웠습니다.',
    'ev-ruleLifted': '3월 16일 · AI 글 금지 해제',
    'ev-duolingo': '4월 28일 · 듀오링고 "AI 우선" 선언',
    'months-line': '여섯 달 동안 글 {posts}건과 댓글 {comments}건, 모두 {all}건입니다.',
    posts: '글',
    comments: '댓글',

    'words-title': '사람들은 그것을 무어라 불렀나',
    'words-note':
      '같은 글 더미에서 낱말을 센 것입니다. 상표가 아니라 그냥 AI라고 부르는 경우가 압도적이고, 서비스 이름 가운데는 ChatGPT가 홀로 큽니다.',
    'words-ia':
      'IA라는 표기가 다섯 번 나옵니다. 금지 시절에 자동 삭제를 피하려고 철자를 뒤집어 쓰던 흔적입니다.',
    'words-line': 'AI {ai}번 · ChatGPT {chatgpt}번 · Gemini {gemini}번 · Claude {claude}번',

    'took-title': '논문에서 무엇을 가져왔는가',
    'took-yes':
      '가져온 것: 다섯 갈래 열아홉 가지 일의 지도와 13명의 셈(표 4), 레딧 여섯 달의 표 1과 낱말 표 2, 두 사건, 세 가지 저울과 두 걸림돌과 프롬프트 품이라는 상수, 그리고 본문의 인용.',
    'took-no':
      '가져오지 않은 것: 연구에 쓰인 AI 도우미(Gemini 기반 다섯 에이전트)입니다. 모델이 필요한 부분이라 이 사이트가 다루지 않습니다. 면접의 통짜 기록과 화면 그림도 싣지 않았습니다.',
    'took-mine':
      '제가 더한 것: 지도에서 일을 골라 보는 화면 짜임과 일 이름의 우리말 옮김입니다. 판정은 더하지 않았습니다 - 세 저울을 대 보는 것은 읽는 분의 몫입니다.',
  },

  en: {
    title: 'How to Build a Fence',
    summary:
      'For someone learning a language alone, how much AI help is still help? From six months of a community and a probe study with 13 learners come three scales that divide what to delegate from what to keep.',
    capability:
      'Lay the nineteen jobs of language learning on a three-phase map, see how far 13 learners delegated each, and weigh the three scales before handing one over',
    'paper-label': 'The study behind this page',
    'full-text': 'Full text',

    'map-title': 'The field: nineteen jobs',
    'map-note':
      'The paper sorts language-learning work into five categories and nineteen jobs, laid across Zimmerman’s three phases (forethought, performance, reflection). Each bar is how many of 13 learners delegated that job at least once. Press one.',
    'map-pick': 'Pick one',
    'map-picked': '{count} of 13 learners tried delegating this.',
    'map-only-all': 'This is the only job every single learner delegated.',
    'map-usage': 'Eleven learners used all five categories; the remaining two used four each.',

    'ph-forethought': 'Forethought',
    'ph-performance': 'Performance',
    'ph-selfReflection': 'Reflection',

    'c-planning': 'Planning',
    'c-explanation': 'Explanation',
    'c-input': 'Input',
    'c-output': 'Output',
    'c-evaluation': 'Evaluation',

    's-requestSuggestions': 'Request plan suggestions',
    's-acceptSuggestions': 'Accept suggestions',
    's-declarePlan': 'Declare a plan',
    's-configureLlm': 'Configure the AI',
    's-chooseContent': 'Choose content',
    's-askQuestions': 'Ask questions',
    's-generateMaterials': 'Have materials generated',
    's-searchResources': 'Have resources searched',
    's-generateSummary': 'Get a summary',
    's-answerQuestions': 'Answer questions',
    's-demonstrateUnderstanding': 'Demonstrate understanding',
    's-conversation': 'Conversation practice',
    's-writing': 'Writing practice',
    's-requestFeedback': 'Request feedback',
    's-requestPracticeProblems': 'Request practice problems',
    's-requestProficiencyAssessment': 'Request an assessment',
    's-selfAssessProficiency': 'Self-assess proficiency',
    's-reflectOnLearningProcess': 'Reflect on the process',
    's-evaluateLlmOutput': 'Verify the AI’s output',

    'scales-title': 'Three scales to weigh before delegating',
    'scales-note':
      'There are no scores — this is qualitative work and the paper assigns none. What there is: three questions that kept returning in the community and the probe, with each learner drawing the fence differently.',
    'sc-accuracy': 'Is it accurate enough?',
    'sc-independence': 'Does it only grow you if you do it?',
    'sc-authenticity': 'Does it need a real person?',
    'scd-accuracy':
      'Some jobs are worth delegating even knowing the AI errs. Grammar examples were trusted; in conversation practice, having someone to talk to mattered more than being right. Tolerance varied by learner.',
    'scd-independence':
      'Some work is the learning. Delegate the dictionary lookups and the guessing-from-context, and it gets easier — but what is easily gained is easily lost.',
    'scd-authenticity':
      'A language is learned to speak with people. Some found it paradoxical to learn human speech from a non-human; others found the non-human an easier first partner.',
    'scq-accuracy': '"Humans make mistakes too," said those who delegated anyway.',
    'scq-independence': '"You’re also taking away essential abilities like finding verb forms, word definitions, working out what sentences mean. For what purpose? To understand the text?"',
    'scq-authenticity': '"Why would anyone want a program to teach you how people actually talk?!"',

    'obstacle-title': 'Two obstacles, and the constant beneath them',
    'obstacle-note': 'Even knowing where the fence belongs, it fails in two ways. The paper names both.',
    'ob-selection': 'The selection challenge — not knowing which strategy is sound, and picking a poor one.',
    'ob-execution': 'The execution challenge — knowing the sound strategy and still not following it.',
    'obstacle-meta':
      'And beneath both lies a constant: prompting effort. Participants knew that better accuracy, independence and authenticity were reachable with careful prompts — and compromised anyway, because the effort felt too dear.',

    'months-title': 'Six months of the fence opening',
    'months-note':
      'Half a year of r/languagelearning. The ban on AI posts was lifted on March 16; Duolingo declared "AI first" on April 28, and May was the loudest month.',
    'ev-ruleLifted': 'Mar 16 · AI-post ban lifted',
    'ev-duolingo': 'Apr 28 · Duolingo declares "AI first"',
    'months-line': 'Across six months: {posts} posts and {comments} comments, {all} in all.',
    posts: 'posts',
    comments: 'comments',

    'words-title': 'What people called it',
    'words-note':
      'Counting words over the same pile. Plain "AI" dwarfs every brand name, and among services ChatGPT stands alone.',
    'words-ia':
      '"IA" appears five times — a spelling flipped to dodge automatic removal during the ban.',
    'words-line': 'AI {ai} · ChatGPT {chatgpt} · Gemini {gemini} · Claude {claude}',

    'took-title': 'What was taken from the paper',
    'took-yes':
      'Taken: the map of five categories and nineteen jobs with the counts of 13 (Table 4), the six-month Table 1 and keyword Table 2 with both dated events, the three scales, the two obstacles, the prompting-effort constant, and the quotations.',
    'took-no':
      'Not taken: the AI helper used in the study (five Gemini-based agents) — it needs a model, which this site does not run. Full interview transcripts and interface figures are not carried either.',
    'took-mine':
      'Added by me: the pick-a-job framing and the Korean renderings of job names. No verdict was added — weighing the three scales is left to you.',
  },

  ja: {
    title: '柵の立て方',
    summary:
      '独学で言語を学ぶ人にとって、AIの助けはどこまでが助けでしょう。コミュニティの六か月と学習者13名の実験から、任せる仕事と守る仕事を分ける三つの秤が出てきました。',
    capability:
      '言語学習の十九の仕事を三つの局面の地図に置き、13名がどこまで任せたかと、任せる前に掛ける三つの秤を見る',
    'paper-label': 'もとになった研究',
    'full-text': '全文',

    'map-title': '学びの畑、十九の仕事',
    'map-note':
      '論文は言語学習の仕事を、ジマーマンの三局面(見通す、行う、振り返る)に置かれた五つの束・十九の仕事に分けました。棒は13名のうちその仕事を一度でもAIに任せた人の数です。押してみてください。',
    'map-pick': 'ひとつ選んでください',
    'map-picked': '13名のうち{count}名がこの仕事を任せてみました。',
    'map-only-all': '全員が任せた仕事はこれひとつだけです。',
    'map-usage': '11名は五つの束をすべて使い、残る2名も四つずつ使いました。',

    'ph-forethought': '見通す',
    'ph-performance': '行う',
    'ph-selfReflection': '振り返る',

    'c-planning': '計画',
    'c-explanation': '解説',
    'c-input': '読む・聞く',
    'c-output': '話す・書く',
    'c-evaluation': '評価',

    's-requestSuggestions': '計画の提案をもらう',
    's-acceptSuggestions': '提案を受け入れる',
    's-declarePlan': '計画を宣言する',
    's-configureLlm': 'AIを設定する',
    's-chooseContent': '扱う内容を選ぶ',
    's-askQuestions': '質問する',
    's-generateMaterials': '教材を作らせる',
    's-searchResources': '資料を探させる',
    's-generateSummary': '要約をもらう',
    's-answerQuestions': '問題に答える',
    's-demonstrateUnderstanding': '理解を示す',
    's-conversation': '会話の練習',
    's-writing': '作文の練習',
    's-requestFeedback': '直してもらう',
    's-requestPracticeProblems': '練習問題をもらう',
    's-requestProficiencyAssessment': '実力を測ってもらう',
    's-selfAssessProficiency': '自分で実力を測る',
    's-reflectOnLearningProcess': '学びの過程を振り返る',
    's-evaluateLlmOutput': 'AIの答えを確かめる',

    'scales-title': '任せる前に掛ける三つの秤',
    'scales-note':
      '点数はありません。質的研究で、論文も点数をつけていません。あるのはコミュニティと実験で繰り返し現れた三つの問いで、どこに柵を立てるかは学ぶ人ごとに違いました。',
    'sc-accuracy': '十分に正確か',
    'sc-independence': '自分でやってこそ伸びるか',
    'sc-authenticity': '本物の人間が要るか',
    'scd-accuracy':
      '間違いうると知りつつ任せる価値のある仕事があります。文法の例文づくりは信じて任せ、会話練習では正しさより相手がいることが大事でした。許容の幅は人それぞれでした。',
    'scd-independence':
      'その仕事自体が学びである場合があります。辞書を引き文脈から意味を推す仕事を任せれば楽になりますが、易く得たものは易く失われます。',
    'scd-authenticity':
      '言語は人と話すために学びます。人でないものから人の言葉を学ぶのは矛盾だと言う人も、初心者にはかえって気楽な相手だと言う人もいました。',
    'scq-accuracy': '「人間だって間違えるでしょう」— そう言って任せる人たちがいました。',
    'scq-independence': '「動詞の変化を探し、語の意味を調べ、文を読み解く力を自分から奪っているんです。何のために?文章を理解するために?」',
    'scq-authenticity': '「人が実際にどう話すかを、なぜプログラムに教わろうとするんですか?」',

    'obstacle-title': '二つのつまずき、その下の定数',
    'obstacle-note': '良い柵を知っていても崩れる道が二つあります。論文はその二つに名前をつけました。',
    'ob-selection': '選びのつまずき - 何が良い戦略か知らず、外れたものを選ぶ。',
    'ob-execution': '実行のつまずき - 良い戦略を知りながら、そのとおりにできない。',
    'obstacle-meta':
      'そしてその下にプロンプトの手間という定数が敷かれています。参加者は、より正確で、より自立的で、より本物らしい助けが良いプロンプトで可能だと知りながら、その手間を惜しんで妥協しました。',

    'months-title': '柵が開いた六か月',
    'months-note':
      'レディットr/languagelearningの半年です。3月16日にAI関連投稿の禁止が解かれ、4月28日にデュオリンゴがAI優先を宣言すると、5月が最も賑やかでした。',
    'ev-ruleLifted': '3月16日 · AI投稿の禁止解除',
    'ev-duolingo': '4月28日 · デュオリンゴ「AI優先」宣言',
    'months-line': '六か月で投稿{posts}件、コメント{comments}件、合わせて{all}件です。',
    posts: '投稿',
    comments: 'コメント',

    'words-title': '人はそれを何と呼んだか',
    'words-note':
      '同じ山から言葉を数えたものです。商標ではなくただAIと呼ぶ場合が圧倒的で、サービス名の中ではChatGPTだけが大きい。',
    'words-ia':
      'IAという表記が五回現れます。禁止の時代に自動削除を避けるため綴りを入れ替えた痕跡です。',
    'words-line': 'AI {ai}回 · ChatGPT {chatgpt}回 · Gemini {gemini}回 · Claude {claude}回',

    'took-title': '論文から何を取ったか',
    'took-yes':
      '取ったもの:五つの束・十九の仕事の地図と13名の数(表4)、六か月の表1と言葉の表2と二つの出来事、三つの秤と二つのつまずきとプロンプトの手間という定数、そして本文の引用。',
    'took-no':
      '取らなかったもの:研究で使われたAI助手(Gemini基盤の五つのエージェント)です。モデルが要る部分で、この場所は扱いません。面接の全記録と画面の図も載せていません。',
    'took-mine':
      '私が足したもの:地図から仕事を選ぶ画面の骨組みと、仕事名の訳です。判定は足していません。三つの秤に掛けるのは読む方の仕事です。',
  },
};
