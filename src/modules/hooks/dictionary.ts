/** 엉킨 갈고리 문구 사전 (ko / en / ja). */

import type { Dictionary } from '../../core/i18n';

export type HooksKey =
  | 'title' | 'summary' | 'capability' | 'paper-label' | 'full-text'
  | 'board-title' | 'board-note'
  | 'sample-planted' | 'sample-clean' | 'sample-custom'
  | 'custom-placeholder' | 'custom-note' | 'parse-error-label'
  | 'view-code' | 'view-graph'
  | 'pick-note' | 'picked-count' | 'reveal' | 'unreveal' | 'reset'
  | 'score-line' | 'score-caveat'
  | 'truth-title' | 'no-findings'
  | 'f-unusedState' | 'f-unusedProp' | 'f-forwardedOnly' | 'f-drilled' | 'f-setterInEffect'
  | 'legend-state' | 'legend-prop' | 'legend-effect' | 'legend-warn' | 'legend-setter'
  | 'patterns-title' | 'patterns-note'
  | 'p-unreferenced' | 'pd-unreferenced'
  | 'p-drilling' | 'pd-drilling'
  | 'p-effectParent' | 'pd-effectParent'
  | 'patterns-so' | 'patterns-projects'
  | 'study-title' | 'study-note' | 'tool-hooklens' | 'tool-vscode' | 'study-metric'
  | 'study-pr' | 'study-sus' | 'study-groups' | 'study-ages' | 'study-figure'
  | 'llm-title' | 'llm-note' | 'llm-result' | 'llm-examples' | 'llm-figure' | 'llm-irony'
  | 'took-title' | 'took-yes' | 'took-no' | 'took-mine';

export const hooksDictionary: Dictionary<HooksKey> = {
  ko: {
    title: '엉킨 갈고리',
    summary:
      '리액트 코드의 나쁜 버릇 셋 - 아무도 안 쓰는 값, 그냥 지나가는 값, 부모를 몰래 고치는 이펙트 - 은 여러 파일에 흩어져 코드만 읽어서는 안 보입니다. 상자와 화살표로 그리면 빨갛게 드러납니다. 그림이 편집기도, 인공지능 조수 넷도 이겼습니다.',
    capability:
      '작은 리액트 앱(직접 붙여 넣어도 된다)에서 세 앤티패턴을 코드로 먼저 찾아보고, 그림을 켜서 논문의 잣대(정밀도·재현율)로 채점받는다',
    'paper-label': '바탕이 된 연구',
    'full-text': '전문',

    'board-title': '이 코드에 나쁜 버릇이 심겨 있다',
    'board-note':
      '아래 화분 앱은 이 페이지가 지은 견본이고, 세 가지 앤티패턴이 심겨 있습니다. 코드에서 의심스러운 상태·프롭·이펙트를 눌러 표시해 보십시오. 다 골랐으면 그림으로 건너가 정답을 켜면, 논문의 잣대로 채점됩니다.',
    'sample-planted': '심긴 것',
    'sample-clean': '고친 것',
    'sample-custom': '붙여 넣기',
    'custom-placeholder': 'function App() { … } 꼴의 리액트 코드를 붙여 넣으십시오',
    'custom-note':
      '이 추출기는 교본 문법만 알아듣습니다 - function/화살표 컴포넌트, 구조 분해 프롭, useState, useEffect, 대문자 JSX 자식. 논문의 도구는 진짜 파서(AST)를 쓰지만 여기는 가벼운 문자열 읽기라, 그림이 곧 검산지입니다. {max}자까지 받고, {url}자 이하일 때만 URL에 실립니다.',
    'parse-error-label': '읽다가 멈춘 곳',
    'view-code': '코드로 보기',
    'view-graph': '그림으로 보기',
    'pick-note': '의심스러운 요소를 눌러 표시하십시오. 코드 밑의 칩과 그림의 마디가 같은 것입니다.',
    'picked-count': '{n}개 의심 표시',
    reveal: '정답 켜기',
    unreveal: '정답 끄기',
    reset: '표시 지우기',
    'score-line': '정밀도 {p} · 재현율 {r} · F1 {f} - 정답 {truth}개 가운데 {hits}개를 맞혔습니다',
    'score-caveat':
      '이 점수는 표 1·표 2와 견줄 수 없습니다 - 프로젝트도 크기도 시간도 다릅니다. 잣대만 같습니다.',
    'truth-title': '검출기가 찾은 것',
    'no-findings': '이 코드에서는 아무것도 잡히지 않았습니다.',
    'f-unusedState': '{component}의 상태 {item} - 값도 세터도 아무 데도 쓰이지 않습니다',
    'f-unusedProp': '{component}의 프롭 {item} - 받기만 하고 쓰지 않습니다',
    'f-forwardedOnly': '{component}의 프롭 {item} - 쓰지 않고 자식에게 넘기기만 합니다',
    'f-drilled': '{origin}의 상태 {item} - {path} 사슬을 그냥 지나갑니다 (프롭 드릴링)',
    'f-setterInEffect': '{component}의 이펙트가 {origin}의 상태를 고칩니다 ({item} 호출)',
    'legend-state': '상태',
    'legend-prop': '프롭',
    'legend-effect': '이펙트',
    'legend-warn': '앤티패턴',
    'legend-setter': '세터가 실린 흐름(점선)',

    'patterns-title': '세 가지 나쁜 버릇',
    'patterns-note':
      '논문이 표적으로 삼은 앤티패턴 셋입니다(2.2절). 셋 다 참조 관계에서 기계적으로 드러나기에 그림으로 칠할 수 있습니다.',
    'p-unreferenced': '안 쓰는 상태와 프롭',
    'pd-unreferenced':
      '정의된 자리에서 쓰이지 않거나, 쓰지 않으면서 자식에게 넘기기만 하는 값. 메모리를 먹고 코드 부피를 늘리며 다른 버릇의 씨앗이 됩니다.',
    'p-drilling': '프롭 드릴링',
    'pd-drilling':
      '상태 값이 직접 쓰지 않는 컴포넌트들을 거쳐 전달되는 것. 쓸데없는 의존이 생기고, 하나를 고치려면 사슬 전체를 봐야 합니다.',
    'p-effectParent': '부모 상태를 고치는 이펙트',
    'pd-effectParent':
      '자식의 이펙트가 부모의 세터를 불러 부모 상태를 바꾸는 것. 상태가 언제 왜 바뀌는지 예측이 어려워지고 버그로 이어집니다.',
    'patterns-so':
      '스택오버플로 2020~2024년의 리액트 훅 질문 가운데 82%가 useState와 useEffect에 관한 것이었습니다 - 이 둘이 이 페이지가 다루는 전부인 이유입니다. 훅별 몫은 그림에만 있어 가져오지 않았습니다.',
    'patterns-projects':
      '실험에 쓰인 실제 프로젝트 둘(컴포넌트 25·33개)에는 안 쓰는 값 41·32곳, 드릴링 11·11곳, 부모를 고치는 이펙트 2·2곳이 있었습니다(표 1).',

    'study-title': '그림 대 편집기 - 12명의 셈',
    'study-note':
      '리액트 개발자 12명(2년 미만 6, 이상 6)이 같은 앤티패턴 찾기를 VS Code와 HookLens로 각각 10분씩 치렀습니다. 막대는 표 2의 F1 평균이고, 모든 차이가 유의합니다(p ≪ .01).',
    'tool-hooklens': '그림 (HookLens)',
    'tool-vscode': '편집기 (VS Code)',
    'study-metric': 'F1 (12명 평균)',
    'study-pr': '정밀도 {hp} 대 {vp} · 재현율 {hr} 대 {vr}',
    'study-sus':
      '쓰기 편한가의 표준 설문(SUS)은 76.7점으로 기준선 68을 넘었습니다.',
    'study-groups':
      '초보(2년 미만)와 중급 모두 그림 쪽이 유의하게 나았지만(각각 p ≪ .01, p ≪ .05), 정밀도에서는 차이가 유의하지 않았고, 초보가 더 크게 늘었습니다. 중급은 그림을 보면서도 코드를 계속 확인했습니다.',
    'study-ages':
      '붙든 오기 둘: 참가자 나이 표기 "21-30세 [25±9]"는 성립할 수 없습니다 - 폭 9의 범위에서 12명의 표준편차는 아무리 커도 4.70입니다. 설계 회기의 "22-31세 [27±5]"도 상한이 4.81이라 마찬가지입니다. 둘 다 고치지 않고 그대로 옮겼습니다.',
    'study-figure':
      '초보·중급을 가른 막대(그림 6)와 조수별 막대(그림 7)의 값은 그림에만 있어 가져오지 않았고, 본문이 말로 적은 판정만 옮겼습니다.',

    'llm-title': '인공지능 조수 넷도 같은 과제를 받았다',
    'llm-note':
      'Claude Code(sonnet-4, opus-4.1)·Codex CLI(GPT-5)·Gemini CLI(2.5-pro)에 같은 프로젝트, 같은 정답, 같은 예시 프롬프트로 각 6회씩 시켰습니다.',
    'llm-result':
      'GPT-5를 뺀 셋은 VS Code로 찾는 사람보다도 낮았고, 가장 나은 GPT-5도 정밀도에서 그림을 쓰는 사람에게 유의하게 밀렸습니다(p ≪ .01).',
    'llm-examples':
      '틀리는 방식도 기록돼 있습니다: 실제로는 중첩하지 않는 컴포넌트를 부모로 잘못 짚어 없는 앤티패턴을 만들어 내고, 사람 대부분이 그림으로 찾아낸 드릴링 둘(confidenceRange·confidenceOn)을 넷 중 둘만, 각 한 번씩만 찾았습니다.',
    'llm-figure': '조수별 수치 막대는 그림 7에만 있어 옮기지 않았습니다.',
    'llm-irony':
      '이 페이지를 만든 것도 그 목록에 있는 조수(Claude Code)입니다. 논문의 결론을 받아들여, 이 판의 검출 규칙은 사람이 검산할 수 있게 시험으로 붙들었고 그림이 곧 검산지가 되게 했습니다.',

    'took-title': '논문에서 무엇을 가져왔는가',
    'took-yes':
      '가져온 것: 세 앤티패턴의 정의(2.2절), 참조 관계에서 그것을 밝혀 빨갛게 칠하는 짜임(6장), 중첩 상자-화살표 그림, 표 1·표 2 전부, 실험 설계와 SUS, LLM 비교(8장)의 본문 서술.',
    'took-no':
      '가져오지 않은 것: Espree·TypeScript의 AST 파싱(여기 추출기는 교본 문법만 아는 가벼운 것), 그림 2·6·7의 값, GitHub 연동. 실험 프로젝트 둘의 코드도 남의 저장소라 싣지 않았습니다.',
    'took-mine':
      '제가 더한 것: 화분 견본 앱 둘과 찾기 놀이의 채점, 그리고 문자열 추출기 자체. 검출 규칙은 논문의 정의를 읽고 이 페이지가 다시 쓴 것이며, 실제 도구의 규칙 전문은 논문에 없습니다.',
  },

  en: {
    title: 'Tangled Hooks',
    summary:
      'Three bad habits of React code — values nobody uses, values that just pass through, effects that quietly modify a parent — hide across many files where reading alone won’t find them. Drawn as boxes and arrows, they light up red. The picture beat the editor, and four AI assistants too.',
    capability:
      'Hunt the three anti-patterns in a small React app (paste your own if you like) from the code first, then switch the picture on and get scored with the paper’s own yardstick (precision and recall)',
    'paper-label': 'The study behind this page',
    'full-text': 'Full text',

    'board-title': 'Bad habits are planted in this code',
    'board-note':
      'The plant-watering app below is this page’s own sample, with the three anti-patterns planted. Click the states, props, and effects you suspect in the code. When done, cross over to the picture and switch the answers on — you are scored with the paper’s yardstick.',
    'sample-planted': 'Planted',
    'sample-clean': 'Fixed',
    'sample-custom': 'Paste your own',
    'custom-placeholder': 'Paste React code shaped like function App() { … }',
    'custom-note':
      'This extractor understands textbook syntax only — function/arrow components, destructured props, useState, useEffect, capitalized JSX children. The paper’s tool uses a real parser (AST); this is light string reading, so the picture doubles as your proof sheet. Up to {max} characters; carried in the URL only under {url}.',
    'parse-error-label': 'Where reading stopped',
    'view-code': 'As code',
    'view-graph': 'As picture',
    'pick-note': 'Click suspicious elements to mark them. The chips under the code and the nodes in the picture are the same things.',
    'picked-count': '{n} marked',
    reveal: 'Show answers',
    unreveal: 'Hide answers',
    reset: 'Clear marks',
    'score-line': 'Precision {p} · Recall {r} · F1 {f} — you caught {hits} of {truth}',
    'score-caveat':
      'This score cannot be compared with Table 1 or 2 — different project, size, and time. Only the yardstick is the same.',
    'truth-title': 'What the detector found',
    'no-findings': 'Nothing was caught in this code.',
    'f-unusedState': 'State {item} of {component} — neither value nor setter is used anywhere',
    'f-unusedProp': 'Prop {item} of {component} — received but never used',
    'f-forwardedOnly': 'Prop {item} of {component} — never used, only forwarded to children',
    'f-drilled': 'State {item} of {origin} — passes straight through the {path} chain (prop drilling)',
    'f-setterInEffect': 'An effect in {component} modifies {origin}’s state (calls {item})',
    'legend-state': 'State',
    'legend-prop': 'Prop',
    'legend-effect': 'Effect',
    'legend-warn': 'Anti-pattern',
    'legend-setter': 'Flow carrying a setter (dashed)',

    'patterns-title': 'The three bad habits',
    'patterns-note':
      'The three anti-patterns the paper targets (Section 2.2). All three surface mechanically from reference relationships, which is why a picture can paint them.',
    'p-unreferenced': 'Unreferenced states and props',
    'pd-unreferenced':
      'A value unused where it is defined, or merely forwarded without being used. It eats memory, bloats code, and seeds further habits.',
    'p-drilling': 'Prop drilling',
    'pd-drilling':
      'A state value relayed through components that never use it. Needless dependencies form, and changing one link means reviewing the whole chain.',
    'p-effectParent': 'Effects modifying parent state',
    'pd-effectParent':
      'A child’s effect calling a parent’s setter. When and why state changes becomes unpredictable, and bugs follow.',
    'patterns-so':
      'Of Stack Overflow’s React-Hooks questions from 2020–2024, 82% concerned useState and useEffect — which is why these two are all this page handles. Per-Hook shares live only in a figure and were not carried.',
    'patterns-projects':
      'The two real projects used in the study (25 and 33 components) contained 41 and 32 unreferenced values, 11 and 11 drillings, and 2 and 2 parent-modifying effects (Table 1).',

    'study-title': 'Picture vs. editor — twelve people, counted',
    'study-note':
      'Twelve React developers (six under two years, six over) hunted the same anti-patterns for ten minutes each with VS Code and with HookLens. Bars are Table 2’s mean F1; every difference is significant (p ≪ .01).',
    'tool-hooklens': 'Picture (HookLens)',
    'tool-vscode': 'Editor (VS Code)',
    'study-metric': 'F1 (mean of 12)',
    'study-pr': 'Precision {hp} vs {vp} · Recall {hr} vs {vr}',
    'study-sus': 'The standard usability survey (SUS) scored 76.7, above the 68 benchmark.',
    'study-groups':
      'Both novices (under two years) and intermediates did significantly better with the picture (p ≪ .01 and p ≪ .05), though not in precision, and novices gained more. Intermediates kept checking the code even while using the picture.',
    'study-ages':
      'Two typos caught: the participants’ age line “21–30 [25±9]” cannot hold — within a range of width 9, the standard deviation of 12 values is at most 4.70. The design sessions’ “22–31 [27±5]” fails the same way (bound 4.81). Both are carried verbatim, uncorrected.',
    'study-figure':
      'The novice/intermediate bars (Figure 6) and per-assistant bars (Figure 7) live only in figures; only the text’s verbal verdicts are carried.',

    'llm-title': 'Four AI assistants got the same task',
    'llm-note':
      'Claude Code (sonnet-4, opus-4.1), Codex CLI (GPT-5), and Gemini CLI (2.5-pro) ran the same projects, ground truth, and example prompt, six trials each.',
    'llm-result':
      'All but GPT-5 scored below even humans using VS Code, and GPT-5 — the best of them — still fell significantly short of humans with the picture in precision (p ≪ .01).',
    'llm-examples':
      'The ways they failed are on record too: inventing an anti-pattern by mistaking a never-nested component for a parent, and missing two drillings (confidenceRange, confidenceOn) that most humans found with the picture — only two of the four caught them, once each.',
    'llm-figure': 'The per-assistant bars live only in Figure 7 and were not carried.',
    'llm-irony':
      'This very page was built by an assistant on that list (Claude Code). Taking the paper’s conclusion seriously, the board’s detection rules are pinned by tests a human can check, and the picture doubles as the proof sheet.',

    'took-title': 'What was taken from the paper',
    'took-yes':
      'Taken: the three anti-pattern definitions (Section 2.2), the scheme of surfacing them from reference relationships and painting them red (Section 6), the nested box-and-arrow picture, all of Tables 1 and 2, the study design with SUS, and the verbal record of the LLM comparison (Section 8).',
    'took-no':
      'Not taken: the Espree/TypeScript AST parsing (the extractor here is a light one that knows textbook syntax only), the values of Figures 2, 6 and 7, and the GitHub integration. The two study projects’ code is other people’s repositories and is not shown.',
    'took-mine':
      'Added by me: the two plant-app samples, the hunt’s scoring, and the string extractor itself. The detection rules were rewritten by this page from the paper’s definitions — the actual tool’s rule text is not in the paper.',
  },

  ja: {
    title: '絡まったフック',
    summary:
      'Reactコードの三つの悪い癖 - 誰も使わない値、ただ通り過ぎる値、親をこっそり変えるエフェクト - は多くのファイルに散らばり、読むだけでは見えません。箱と矢印で描くと赤く浮かび上がります。絵はエディタにも、AI助手4つにも勝ちました。',
    capability:
      '小さなReactアプリ(自分のコードを貼ってもよい)で三つのアンチパターンをまずコードから探し、絵をつけて論文の物差し(適合率・再現率)で採点される',
    'paper-label': 'もとになった研究',
    'full-text': '全文',

    'board-title': 'このコードには悪い癖が植えてある',
    'board-note':
      '下の水やりアプリはこのページ自作の見本で、三つのアンチパターンが植えてあります。怪しい状態・プロップ・エフェクトをコードで押して印を付けてください。終わったら絵に渡って答えをつけると、論文の物差しで採点されます。',
    'sample-planted': '植えたもの',
    'sample-clean': '直したもの',
    'sample-custom': '貼り付け',
    'custom-placeholder': 'function App() { … } の形のReactコードを貼り付けてください',
    'custom-note':
      'この抽出器は教科書的な文法だけ分かります - function/アロー・コンポーネント、分割代入プロップ、useState、useEffect、大文字JSXの子。論文の道具は本物のパーサー(AST)ですが、ここは軽い文字列読みなので、絵がそのまま検算表です。{max}字まで受け付け、{url}字以下のときだけURLに載ります。',
    'parse-error-label': '読むのを止めた場所',
    'view-code': 'コードで見る',
    'view-graph': '絵で見る',
    'pick-note': '怪しい要素を押して印を付けてください。コード下のチップと絵の節は同じものです。',
    'picked-count': '{n}個に印',
    reveal: '答えをつける',
    unreveal: '答えを消す',
    reset: '印を消す',
    'score-line': '適合率 {p} · 再現率 {r} · F1 {f} - 正解{truth}個のうち{hits}個',
    'score-caveat':
      'この点数は表1・表2と比べられません - プロジェクトも規模も時間も違います。物差しだけが同じです。',
    'truth-title': '検出器が見つけたもの',
    'no-findings': 'このコードでは何も引っかかりませんでした。',
    'f-unusedState': '{component}の状態 {item} - 値もセッターもどこにも使われていません',
    'f-unusedProp': '{component}のプロップ {item} - 受け取るだけで使いません',
    'f-forwardedOnly': '{component}のプロップ {item} - 使わずに子へ渡すだけです',
    'f-drilled': '{origin}の状態 {item} - {path} の鎖をただ通り過ぎます (プロップ・ドリリング)',
    'f-setterInEffect': '{component}のエフェクトが{origin}の状態を変えます ({item} 呼び出し)',
    'legend-state': '状態',
    'legend-prop': 'プロップ',
    'legend-effect': 'エフェクト',
    'legend-warn': 'アンチパターン',
    'legend-setter': 'セッターを載せた流れ(点線)',

    'patterns-title': '三つの悪い癖',
    'patterns-note':
      '論文が標的にしたアンチパターン三つです(2.2節)。三つとも参照関係から機械的に浮かび上がるので、絵で塗れるのです。',
    'p-unreferenced': '使われない状態とプロップ',
    'pd-unreferenced':
      '定義された場所で使われない、あるいは使わずに子へ渡すだけの値。メモリを食い、コードを膨らませ、他の癖の種になります。',
    'p-drilling': 'プロップ・ドリリング',
    'pd-drilling':
      '状態の値が、使いもしないコンポーネントを経由して運ばれること。無用な依存が生まれ、一つ直すには鎖全体を見なければなりません。',
    'p-effectParent': '親の状態を変えるエフェクト',
    'pd-effectParent':
      '子のエフェクトが親のセッターを呼ぶこと。状態がいつなぜ変わるのか予測できなくなり、バグにつながります。',
    'patterns-so':
      'スタックオーバーフロー2020〜2024年のReactフック質問のうち82%がuseStateとuseEffectに関するものでした - この二つだけをこのページが扱う理由です。フック別の取り分は図にしかなく、持ってきていません。',
    'patterns-projects':
      '実験に使われた実プロジェクト二つ(コンポーネント25・33個)には、使われない値41・32箇所、ドリリング11・11箇所、親を変えるエフェクト2・2箇所がありました(表1)。',

    'study-title': '絵対エディタ - 12人の数',
    'study-note':
      'React開発者12人(2年未満6人、以上6人)が同じアンチパターン探しをVS CodeとHookLensで各10分ずつ行いました。棒は表2のF1平均で、すべての差が有意です(p ≪ .01)。',
    'tool-hooklens': '絵 (HookLens)',
    'tool-vscode': 'エディタ (VS Code)',
    'study-metric': 'F1 (12人平均)',
    'study-pr': '適合率 {hp} 対 {vp} · 再現率 {hr} 対 {vr}',
    'study-sus': '使いやすさの標準アンケート(SUS)は76.7点で、基準の68を超えました。',
    'study-groups':
      '初心者(2年未満)も中級者も絵の方が有意に良く(それぞれp ≪ .01、p ≪ .05)、ただし適合率では有意差がなく、初心者の伸びがより大きいものでした。中級者は絵を見ながらもコードを確かめ続けました。',
    'study-ages':
      '見つけた誤植二つ: 参加者の年齢表記「21-30歳 [25±9]」は成り立ちません - 幅9の範囲で12個の値の標準偏差は最大でも4.70です。設計セッションの「22-31歳 [27±5]」も上限4.81で同様です。どちらも直さずそのまま写しました。',
    'study-figure':
      '初心者・中級者の棒(図6)と助手別の棒(図7)の値は図にしかなく、本文が言葉で書いた判定だけを写しました。',

    'llm-title': 'AI助手4つも同じ課題を受けた',
    'llm-note':
      'Claude Code(sonnet-4、opus-4.1)・Codex CLI(GPT-5)・Gemini CLI(2.5-pro)に同じプロジェクト、同じ正解、同じ例示プロンプトで各6回ずつやらせました。',
    'llm-result':
      'GPT-5を除く三つはVS Codeで探す人よりも低く、最も良いGPT-5も適合率では絵を使う人に有意に及びませんでした(p ≪ .01)。',
    'llm-examples':
      '間違い方も記録されています: 実際には入れ子でないコンポーネントを親と誤認して存在しないアンチパターンを作り出し、ほとんどの人が絵で見つけたドリリング二つ(confidenceRange・confidenceOn)を、4つのうち2つだけが各一度ずつしか見つけませんでした。',
    'llm-figure': '助手別の数値棒は図7にしかなく、写していません。',
    'llm-irony':
      'このページを作ったのも、その一覧にある助手(Claude Code)です。論文の結論を受け止めて、この盤の検出規則は人が検算できるようテストで留め、絵がそのまま検算表になるようにしました。',

    'took-title': '論文から何を取ったか',
    'took-yes':
      '取ったもの: 三つのアンチパターンの定義(2.2節)、参照関係から浮かび上がらせ赤く塗る仕組み(6章)、入れ子の箱と矢印の絵、表1・表2の全部、実験設計とSUS、LLM比較(8章)の本文の記述。',
    'took-no':
      '取らなかったもの: Espree・TypeScriptのASTパース(ここの抽出器は教科書文法だけ知る軽いもの)、図2・6・7の値、GitHub連携。実験プロジェクト二つのコードも他人のリポジトリなので載せていません。',
    'took-mine':
      '私が足したもの: 見本アプリ二つと探し遊びの採点、そして文字列抽出器そのもの。検出規則は論文の定義を読んでこのページが書き直したもので、実際の道具の規則の全文は論文にありません。',
  },
};
