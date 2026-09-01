/** 맥락 문구 사전 (ko / en / ja). */

import type { Dictionary } from '../../core/i18n';

export type ContextKey =
  | 'title' | 'summary' | 'capability' | 'paper-label' | 'full-text'
  | 'stmt-title' | 'stmt-note' | 'stmt-input' | 'stmt-preset'
  | 'p-entity' | 'p-indicator' | 'p-date' | 'p-value' | 'p-missing' | 'p-span-point' | 'p-span-duration'
  | 'p-confidence' | 'p-rule'
  | 'own-title' | 'own-note' | 'own-placeholder' | 'own-saved' | 'own-add' | 'own-empty'
  | 'hide-title' | 'hide-on' | 'hide-off' | 'hide-note'
  | 'grid-title' | 'grid-note' | 'grid-hidden'
  | 'c-entity' | 'c-indicator' | 'c-date'
  | 'a-inText' | 'a-relational' | 'a-statistical' | 'a-personalized'
  | 'empty-cell' | 'empty-why-indicator' | 'empty-why-date' | 'empty-mine'
  | 'q-entity-inText' | 'q-entity-relational' | 'q-entity-statistical' | 'q-entity-personalized'
  | 'q-indicator-inText' | 'q-indicator-relational' | 'q-indicator-statistical'
  | 'q-date-inText' | 'q-date-relational' | 'q-date-personalized'
  | 'shape-title' | 'shape-note' | 'shape-entities' | 'shape-indicators' | 'shape-span'
  | 'shape-single' | 'shape-multiple' | 'shape-point' | 'shape-duration'
  | 'k-bar' | 'k-groupedBar' | 'k-singleLine' | 'k-multiLine' | 'k-multiLinePerEntity'
  | 'shape-only' | 'shape-pick'
  | 'ev-title' | 'ev-note' | 'ev-match' | 'ev-of-77' | 'ev-rating'
  | 'ev-entity' | 'ev-date' | 'ev-indicator' | 'ev-all' | 'ev-clicks'
  | 'ex-title' | 'ex-note' | 'ex-tool' | 'ex-base' | 'ex-fertility' | 'ex-carbon' | 'ex-total'
  | 'ex-sig' | 'ex-nosig'
  | 'passive-title' | 'passive-note' | 'passive-quote' | 'passive-counts'
  | 'took-title' | 'took-yes' | 'took-no' | 'took-mine';

export const contextDictionary: Dictionary<ContextKey> = {
  ko: {
    title: '이 숫자를 무엇과 견줄까',
    summary:
      '통계 한 줄은 그것만으로는 크지도 작지도 않습니다. 무엇과 견주느냐가 정합니다. 견줄 자리가 어디어디인지 논문이 표로 적어 두었기에, 그 표를 그대로 펼쳐 드립니다.',
    capability:
      '통계 문장을 주체·지표·시점으로 가르고, 맥락을 만들 수 있는 열 자리를 물음으로 펼친 뒤, 고른 맥락이 어떤 그림을 부르는지 논문의 규칙으로 정한다',
    'paper-label': '바탕이 된 연구',
    'full-text': '전문',

    'stmt-title': '견줄 문장',
    'stmt-note':
      '논문은 통계 문장을 세 조각으로 가릅니다. 무엇에 대한 것인가(주체), 무엇을 재는가(지표), 언제인가(시점). 이 셋이 정해져야 무엇과 견줄지도 정해집니다.',
    'stmt-input': '직접 적어 보십시오',
    'stmt-preset': '가져다 쓸 문장',

    'p-entity': '주체',
    'p-indicator': '지표',
    'p-date': '시점',
    'p-value': '값',
    'p-missing': '못 갈랐습니다',
    'p-span-point': '한 시점',
    'p-span-duration': '기간',
    'p-confidence': '세 조각 가운데',
    'p-rule':
      '논문은 이 가르기를 미세조정한 언어 모델에게 맡겼습니다. 이 화면은 모델을 부르지 않으므로 아는 이름을 맞춰 보는 규칙으로 가릅니다. 못 가른 조각은 지어내지 않고 비워 둡니다.',

    'own-title': '먼저 스스로 물어 보십시오',
    'own-note':
      '아래 열 칸을 보기 전에, 이 문장을 읽고 떠오른 물음을 하나 적어 두시기를 권합니다. 까닭은 이 페이지 아래쪽에 적어 두었습니다.',
    'own-placeholder': '이 숫자를 보고 무엇이 궁금하십니까',
    'own-saved': '적어 두신 물음',
    'own-add': '적어 두기',
    'own-empty': '아직 없습니다',

    'hide-title': '물음 가려 두기',
    'hide-on': '가려 둡니다',
    'hide-off': '펼쳐 둡니다',
    'hide-note':
      '가려 두면 열 칸의 물음이 보이지 않고 자리 이름만 남습니다. 자기 물음을 먼저 적고 싶을 때 쓰십시오.',

    'grid-title': '견줄 수 있는 열 자리',
    'grid-note':
      '세로는 문장의 세 조각이고, 가로는 맥락을 만드는 네 가지 방향입니다. 열두 칸 가운데 열 칸만 채워져 있습니다. 하나를 누르시면 그 물음에 어떤 그림이 필요한지 아래에서 정해 드립니다.',
    'grid-hidden': '가려 두었습니다. 자리 이름만 보입니다.',

    'c-entity': '주체',
    'c-indicator': '지표',
    'c-date': '시점',

    'a-inText': '글 안에',
    'a-relational': '이어진 것',
    'a-statistical': '두드러진 것',
    'a-personalized': '내가 아는 것',

    'empty-cell': '이 자리는 비어 있습니다',
    'empty-why-indicator':
      '지표에는 내가 아는 것이라는 자리가 없습니다. 사람은 나라나 해에는 개인적으로 얽히지만 출산율이라는 지표 자체에는 그렇게 얽히지 않습니다.',
    'empty-why-date':
      '시점에는 두드러진 것이라는 자리가 없습니다. 가장 큰 해라는 것은 지표를 정해야 비로소 정해지므로, 시점 혼자서는 극값을 가질 수 없습니다.',
    'empty-mine': '논문은 이 두 칸이 왜 비었는지 따로 적지 않았습니다. 위의 읽기는 제가 붙인 것입니다.',

    'q-entity-inText': '이 글의 다른 문장이 이미 들고 있는 곳은 어디입니까. 거기서는 어떻습니까.',
    'q-entity-relational': '비슷한 처지의 다른 곳에서는 어떻습니까.',
    'q-entity-statistical': '가장 높은 곳과 가장 낮은 곳은 어디입니까.',
    'q-entity-personalized': '당신이 사는 곳에서는 어떻습니까.',
    'q-indicator-inText': '이 글이 함께 들고 있는 다른 지표는 무엇입니까. 그 값은 어떻습니까.',
    'q-indicator-relational': '이 값을 밀어 올리거나 끌어내리는 지표는 무엇입니까.',
    'q-indicator-statistical': '여기서 유난히 크거나 작은 지표는 무엇입니까.',
    'q-date-inText': '이 글이 함께 들고 있는 다른 해는 언제입니까. 그때는 어땠습니까.',
    'q-date-relational': '그 무렵에 무슨 일이 있었습니까. 그 일 앞뒤로 어떻게 움직였습니까.',
    'q-date-personalized': '당신이 기억하는 해와 견주면 얼마나 달라졌습니까.',

    'shape-title': '그러면 어떤 그림이 필요한가',
    'shape-note':
      '무엇과 견줄지가 정해지면 그림의 모양은 이미 정해져 있습니다. 논문은 그 규칙을 여덟 칸짜리 표로 적었습니다. 그림을 먼저 고르고 자료를 끼워 맞추는 순서가 아닙니다.',
    'shape-entities': '견줄 곳',
    'shape-indicators': '견줄 지표',
    'shape-span': '시간',
    'shape-single': '하나',
    'shape-multiple': '여럿',
    'shape-point': '한 시점',
    'shape-duration': '기간',
    'k-bar': '막대',
    'k-groupedBar': '묶은 막대',
    'k-singleLine': '선 하나',
    'k-multiLine': '선 여럿',
    'k-multiLinePerEntity': '곳마다 선 여럿',
    'shape-only': '이 그림에는 값이 없습니다. 모양만 보여 드립니다. 이 페이지는 자료를 싣지 않습니다.',
    'shape-pick': '위에서 자리를 하나 골라 주십시오.',

    'ev-title': '자동으로 찾으면 얼마나 맞았는가',
    'ev-note':
      '논문은 77개의 통계 문장에 대해 파이프라인이 알맞은 자료를 찾아냈는지 세어 보았습니다. 평가한 사람은 18명이고 5점으로 매겼습니다.',
    'ev-match': '맞춘 문장',
    'ev-of-77': '77개 중',
    'ev-rating': '평균 점수',
    'ev-entity': '나라와 지역',
    'ev-date': '시점',
    'ev-indicator': '지표',
    'ev-all': '셋 모두',
    'ev-clicks':
      '물음을 누른 {total}번 가운데 {generated}번({gpct}%)은 시스템이 지은 물음이었고, {fallback}번({fpct}%)은 언제나 딸려 오는 기본 물음("이 자료가 이 문장을 뒷받침합니까")이었습니다.',

    'ex-title': '읽는 사람이 실제로 더 찾아보았는가',
    'ex-note':
      '21명이 같은 글을 도구와 함께, 그리고 도구 없이 읽었습니다. 아래는 글을 읽는 동안 바깥 정보를 찾아본 횟수의 평균입니다. 두 글 가운데 한 글에서만 그 차이가 뜻있었습니다.',
    'ex-tool': '도구와 함께',
    'ex-base': '도구 없이',
    'ex-fertility': '출산율 기사',
    'ex-carbon': '탄소 배출 기사',
    'ex-total': '두 글 합쳐',
    'ex-sig': '뜻있는 차이',
    'ex-nosig': '뜻있다고 보기 어려움',

    'passive-title': '논문이 스스로 적어 둔 역효과',
    'passive-note':
      '이 논문이 미더운 까닭은 여기 있습니다. 밑줄과 물음이 사람을 오히려 수동적으로 읽게 만들 수 있다고 스스로 적었습니다. 건네받은 물음이 있으면 스스로 묻기를 그만두게 된다는 것입니다.',
    'passive-quote':
      '"물음 목록이 저를 더 수동적으로 읽게 만들었습니다. 문장을 누르면 물음이 보이니 스스로 물음을 떠올리지 않게 되더군요. 그런데 그 물음들이 핵심을 찌르는 것도 아니어서, 어떤 틀에 갇힌 느낌이었습니다." — 참가자 P3',
    'passive-counts':
      '21명 가운데 12명은 밑줄이 주의를 끌어 좋았다고 했고, 5명은 물음이 얕고 되풀이된다고 했으며, 2명은 스스로 묻기를 그만두게 된다고 했습니다.',

    'took-title': '논문에서 무엇을 가져왔는가',
    'took-yes':
      '가져온 것: 문장을 세 조각으로 가르는 짜임, 표 2의 열 자리, 표 1의 그림 규칙 여덟 칸, 그리고 표 3과 6.4절·8.1절의 수치.',
    'took-no':
      '가져오지 않은 것: 물음을 짓고 순위를 매기는 부분입니다. 논문은 그 일을 GPT-3.5와 GPT-4에게 맡겼는데 이 사이트는 모델을 부르지 않습니다. 그래서 이 화면에는 순위가 없고, 열 칸을 모두 펼쳐 놓고 고르는 것은 읽는 분입니다. 세계은행과 Our World in Data의 자료도 싣지 않아 그림은 값이 아니라 모양만 보여 줍니다. 그림에만 실린 상자그림 값도 옮기지 않았습니다.',
    'took-mine':
      '제가 더한 것: 문장을 가르는 규칙, 열 칸의 물음 문장, 어느 조각을 고르면 그 조각이 여럿이 된다는 이음 규칙, 그리고 물음 가려 두기입니다. 마지막 것은 논문이 스스로 적은 역효과에 대한 답입니다.',
  },

  en: {
    title: 'What Should This Number Sit Beside',
    summary:
      'A statistic on its own is neither large nor small. What it sits beside decides that. The paper wrote out exactly where those comparisons can come from, so here is that table, opened up.',
    capability:
      'Split a statistical statement into subject, indicator and date, open the ten places a comparison can come from as questions, and let the paper rule decide which chart the chosen comparison needs',
    'paper-label': 'The study behind this page',
    'full-text': 'Full text',

    'stmt-title': 'The statement',
    'stmt-note':
      'The paper splits a statistical statement into three parts: what it is about (subject), what is measured (indicator), and when (date). Until those three are settled, what to compare against is not settled either.',
    'stmt-input': 'Write your own',
    'stmt-preset': 'Or take one of these',

    'p-entity': 'Subject',
    'p-indicator': 'Indicator',
    'p-date': 'Date',
    'p-value': 'Value',
    'p-missing': 'could not tell',
    'p-span-point': 'single point',
    'p-span-duration': 'duration',
    'p-confidence': 'of three parts',
    'p-rule':
      'The paper handed this splitting to a fine-tuned language model. This page calls no model, so it matches against names it knows. What it cannot tell, it leaves blank rather than inventing.',

    'own-title': 'Ask your own question first',
    'own-note':
      'Before looking at the ten places below, write down one question the statement raised for you. The reason is at the bottom of this page.',
    'own-placeholder': 'What do you want to know about this number?',
    'own-saved': 'Your questions',
    'own-add': 'Keep it',
    'own-empty': 'none yet',

    'hide-title': 'Keep the questions covered',
    'hide-on': 'covered',
    'hide-off': 'open',
    'hide-note':
      'Covered, the ten cells show only their names, not their questions. Use it when you want to write your own question first.',

    'grid-title': 'Ten places a comparison can come from',
    'grid-note':
      'Down the side are the three parts of the statement; across the top are the four directions a context can come from. Ten of the twelve cells are filled. Pick one and the chart it needs is worked out below.',
    'grid-hidden': 'Covered. Only the names of the places are shown.',

    'c-entity': 'Subject',
    'c-indicator': 'Indicator',
    'c-date': 'Date',

    'a-inText': 'In the text',
    'a-relational': 'Related to it',
    'a-statistical': 'Standing out',
    'a-personalized': 'Known to you',

    'empty-cell': 'This place is empty',
    'empty-why-indicator':
      'An indicator has no "known to you" place. People are personally tied to countries and years, but not in the same way to the fertility rate itself.',
    'empty-why-date':
      'A date has no "standing out" place. The highest year is only the highest once an indicator is fixed, so a date alone cannot hold an extreme.',
    'empty-mine': 'The paper does not say why these two are empty. The reading above is mine.',

    'q-entity-inText': 'Which other place does this text already name? What is it there?',
    'q-entity-relational': 'What about other places in a similar position?',
    'q-entity-statistical': 'Where is it highest, and where lowest?',
    'q-entity-personalized': 'What about where you live?',
    'q-indicator-inText': 'What other measure does this text carry? What does it say?',
    'q-indicator-relational': 'What pushes this figure up, and what pulls it down?',
    'q-indicator-statistical': 'What stands out here as unusually high or low?',
    'q-date-inText': 'Which other year does this text name? How was it then?',
    'q-date-relational': 'What happened around then? How did it move on either side of that?',
    'q-date-personalized': 'Against a year you remember, how much has it changed?',

    'shape-title': 'And so which chart does it need',
    'shape-note':
      'Once what to compare is settled, the shape of the chart is already settled. The paper wrote that rule as an eight-cell table. The order is not chart first, data fitted after.',
    'shape-entities': 'Places compared',
    'shape-indicators': 'Measures compared',
    'shape-span': 'Time',
    'shape-single': 'one',
    'shape-multiple': 'several',
    'shape-point': 'single point',
    'shape-duration': 'duration',
    'k-bar': 'Bar',
    'k-groupedBar': 'Grouped bar',
    'k-singleLine': 'Single line',
    'k-multiLine': 'Multiple lines',
    'k-multiLinePerEntity': 'Lines per place',
    'shape-only': 'There are no values in this drawing, only the shape. This page carries no data.',
    'shape-pick': 'Pick one of the places above.',

    'ev-title': 'How often the automatic search got it right',
    'ev-note':
      'The authors checked, over 77 statistical statements, whether the pipeline found the right data. Eighteen evaluators rated it out of 5.',
    'ev-match': 'Statements matched',
    'ev-of-77': 'of 77',
    'ev-rating': 'Mean rating',
    'ev-entity': 'Countries and regions',
    'ev-date': 'Time periods',
    'ev-indicator': 'Indicators',
    'ev-all': 'All three',
    'ev-clicks':
      'Of {total} clicks on questions, {generated} ({gpct}%) were on questions the system had written and {fallback} ({fpct}%) on the default one that always comes along ("Does the data support this statement?").',

    'ex-title': 'Did readers actually look things up more',
    'ex-note':
      'Twenty-one people read the same texts with the tool and without it. Below is the mean number of times they searched for outside information while reading. The difference held for only one of the two articles.',
    'ex-tool': 'With the tool',
    'ex-base': 'Without',
    'ex-fertility': 'Fertility rate article',
    'ex-carbon': 'Carbon emissions article',
    'ex-total': 'Both together',
    'ex-sig': 'a real difference',
    'ex-nosig': 'not distinguishable from chance',

    'passive-title': 'The backfire the paper reported on itself',
    'passive-note':
      'This is what makes the paper trustworthy. The authors wrote down that the underlines and the questions could make people read more passively: handed a question, you stop asking your own.',
    'passive-quote':
      '"The list of questions made me read the text more passively. I could see the questions when I clicked the sentence, so I did not really think of questions by myself. However, the provided questions were not really good ones touching the core of the issue, so I felt I was a bit trapped in some frame." — participant P3',
    'passive-counts':
      'Of the 21 participants, 12 said the underlines usefully drew their attention, 5 said the questions were shallow and repetitive, and 2 said they stopped asking their own.',

    'took-title': 'What was taken from the paper',
    'took-yes':
      'Taken: the three-part split of a statement, the ten places in Table 2, the eight-cell chart rule in Table 1, and the figures from Table 3 and sections 6.4 and 8.1.',
    'took-no':
      'Not taken: the generating and ranking of questions. The paper hands that to GPT-3.5 and GPT-4; this site calls no model. So there is no ranking here, and choosing among the ten is left to you. The World Bank and Our World in Data datasets are not carried either, so the drawings show shape and not values. Values that live only in a boxplot were not transcribed.',
    'took-mine':
      'Added by me: the splitting rule, the ten question sentences, the rule joining the two tables (the part you pick becomes the several), and covering the questions. The last is an answer to the backfire the paper reported on itself.',
  },

  ja: {
    title: 'この数字を何と並べるか',
    summary:
      '統計の一行は、それだけでは大きくも小さくもありません。何と並べるかが決めます。並べる場所がどこにあるかを論文が表に書いているので、その表をそのまま開きます。',
    capability:
      '統計文を主体・指標・時点に分け、比較の手がかりとなる十の場所を問いとして開き、選んだ文脈がどの図を要するかを論文の規則で決める',
    'paper-label': 'もとになった研究',
    'full-text': '全文',

    'stmt-title': '並べる文',
    'stmt-note':
      '論文は統計文を三つに分けます。何についてか(主体)、何を測るか(指標)、いつか(時点)。この三つが定まって初めて、何と並べるかも定まります。',
    'stmt-input': 'ご自分で書いてみてください',
    'stmt-preset': '用意した文',

    'p-entity': '主体',
    'p-indicator': '指標',
    'p-date': '時点',
    'p-value': '値',
    'p-missing': '分けられませんでした',
    'p-span-point': '一時点',
    'p-span-duration': '期間',
    'p-confidence': '三つのうち',
    'p-rule':
      '論文はこの切り分けを微調整した言語モデルに任せています。この画面はモデルを呼ばないので、知っている名前を照らし合わせる規則で分けます。分けられなかったものは作らずに空けておきます。',

    'own-title': 'まずご自分で問うてみてください',
    'own-note':
      '下の十の枠を見る前に、この文を読んで浮かんだ問いをひとつ書き留めることをお勧めします。その理由はこのページの下に書いてあります。',
    'own-placeholder': 'この数字を見て何が知りたいですか',
    'own-saved': '書き留めた問い',
    'own-add': '書き留める',
    'own-empty': 'まだありません',

    'hide-title': '問いを伏せておく',
    'hide-on': '伏せます',
    'hide-off': '開きます',
    'hide-note':
      '伏せると十の枠の問いは見えず、場所の名前だけが残ります。自分の問いを先に書きたいときにお使いください。',

    'grid-title': '並べられる十の場所',
    'grid-note':
      '縦は文の三つの部分、横は文脈をつくる四つの方向です。十二の枠のうち十だけが埋まっています。ひとつ押すと、その問いにどんな図が要るかを下で決めます。',
    'grid-hidden': '伏せてあります。場所の名前だけが見えます。',

    'c-entity': '主体',
    'c-indicator': '指標',
    'c-date': '時点',

    'a-inText': '文の中に',
    'a-relational': 'つながるもの',
    'a-statistical': '際立つもの',
    'a-personalized': '自分が知るもの',

    'empty-cell': 'この枠は空です',
    'empty-why-indicator':
      '指標には「自分が知るもの」という場所がありません。人は国や年には個人的に結びつきますが、出生率という指標そのものにはそう結びつきません。',
    'empty-why-date':
      '時点には「際立つもの」という場所がありません。最も大きい年というのは指標を決めて初めて定まるので、時点だけでは極値を持てません。',
    'empty-mine': '論文はこの二つの枠が空である理由を書いていません。上の読みは私が付けたものです。',

    'q-entity-inText': 'この文章が既に挙げている別の場所はどこですか。そこではどうですか。',
    'q-entity-relational': '似た立場の別の場所ではどうですか。',
    'q-entity-statistical': '最も高い場所と最も低い場所はどこですか。',
    'q-entity-personalized': 'あなたの住む場所ではどうですか。',
    'q-indicator-inText': 'この文章が併せて挙げている別の指標は何ですか。その値はどうですか。',
    'q-indicator-relational': 'この値を押し上げ、あるいは引き下げる指標は何ですか。',
    'q-indicator-statistical': 'ここで際立って大きい、あるいは小さい指標は何ですか。',
    'q-date-inText': 'この文章が併せて挙げている別の年はいつですか。そのときはどうでしたか。',
    'q-date-relational': 'その頃に何がありましたか。その前後でどう動きましたか。',
    'q-date-personalized': 'あなたが覚えている年と並べると、どれだけ変わりましたか。',

    'shape-title': 'ではどんな図が要るか',
    'shape-note':
      '何と並べるかが定まれば、図の形はもう定まっています。論文はその規則を八つの枠の表に書きました。図を先に選んで資料を後から合わせる順ではありません。',
    'shape-entities': '並べる場所',
    'shape-indicators': '並べる指標',
    'shape-span': '時間',
    'shape-single': 'ひとつ',
    'shape-multiple': 'いくつも',
    'shape-point': '一時点',
    'shape-duration': '期間',
    'k-bar': '棒',
    'k-groupedBar': '束ねた棒',
    'k-singleLine': '線ひとつ',
    'k-multiLine': '線いくつも',
    'k-multiLinePerEntity': '場所ごとに線いくつも',
    'shape-only': 'この図に値はありません。形だけをお見せします。このページは資料を載せていません。',
    'shape-pick': '上から場所をひとつお選びください。',

    'ev-title': '自動で探すとどれだけ当たったか',
    'ev-note':
      '論文は77の統計文について、仕組みが適切な資料を見つけられたかを数えました。評価した人は18名で、5点で採点しています。',
    'ev-match': '当てた文',
    'ev-of-77': '77のうち',
    'ev-rating': '平均点',
    'ev-entity': '国と地域',
    'ev-date': '時点',
    'ev-indicator': '指標',
    'ev-all': '三つとも',
    'ev-clicks':
      '問いを押した{total}回のうち{generated}回({gpct}%)は仕組みが作った問いで、{fallback}回({fpct}%)は常に付いてくる既定の問い(「この資料はこの文を支えますか」)でした。',

    'ex-title': '読む人は実際に多く調べたか',
    'ex-note':
      '21名が同じ文章を、道具とともに、また道具なしで読みました。下は読んでいる間に外の情報を調べた回数の平均です。二つの記事のうち一つでだけ、その差に意味がありました。',
    'ex-tool': '道具とともに',
    'ex-base': '道具なし',
    'ex-fertility': '出生率の記事',
    'ex-carbon': '炭素排出の記事',
    'ex-total': '二つ合わせて',
    'ex-sig': '意味のある差',
    'ex-nosig': '偶然と見分けがつかない',

    'passive-title': '論文が自ら書いた逆効果',
    'passive-note':
      'この論文が信じられるのはここです。下線と問いがかえって受け身に読ませうる、と著者自身が書いています。問いを差し出されると、自分で問うことをやめてしまうのです。',
    'passive-quote':
      '「問いの一覧が、私をより受け身に読ませました。文を押せば問いが見えるので、自分で問いを思いつかなくなりました。しかもその問いは核心を突くものでもなく、何かの枠に閉じ込められた気がしました。」— 参加者P3',
    'passive-counts':
      '21名のうち12名は下線が注意を引いてよかったと言い、5名は問いが浅く繰り返しだと言い、2名は自分で問うことをやめてしまうと言いました。',

    'took-title': '論文から何を取ったか',
    'took-yes':
      '取ったもの:文を三つに分ける枠組み、表2の十の場所、表1の図の規則八枠、そして表3と6.4節・8.1節の数値。',
    'took-no':
      '取らなかったもの:問いを作り順位をつける部分です。論文はそれをGPT-3.5とGPT-4に任せていますが、この場所はモデルを呼びません。だからここに順位はなく、十のうちどれを選ぶかは読む方に委ねます。世界銀行やOur World in Dataの資料も載せていないので、図は値ではなく形だけを示します。図にしかない箱ひげの値も写していません。',
    'took-mine':
      '私が足したもの:文を分ける規則、十の問いの文、選んだ部分がいくつもになるという二つの表をつなぐ規則、そして問いを伏せておく機能です。最後のものは論文が自ら書いた逆効果への答えです。',
  },
};
