/**
 * 울타리 페이지 설정.
 *
 * 근거가 된 연구: Good Fences Make Good Learning: How Self-Directed Language Learners
 * Navigate LLM Delegation Decisions (Jiwon Song, Aeri Cho, Sihyeon Lee, Kiroong Choe,
 * Jinwook Seo, SNU), CHI 2026, 우수논문 명예상. 전문은 연구실이 올려 둔 PDF로 읽었다.
 *
 * 이 페이지가 가져온 것
 *   - 그림 2의 분류 구조: 다섯 갈래를 짐머만의 세 국면에 놓은 것.
 *   - 표 4: 열아홉 가지 일과, 13명 가운데 몇 명이 맡겨 봤는지.
 *   - 표 1(레딧 여섯 달)과 표 2(낱말별 수), 그리고 두 사건(3월 16일 금지 해제,
 *     4월 28일 듀오링고 선언).
 *   - 세 가지 고려(정확함·홀로서기·진짜다움), 두 가지 걸림돌(고르기·해내기),
 *     프롬프트 품이 모든 결정을 누르는 상수라는 관찰, 그리고 본문의 인용들.
 *
 * 가져오지 않은 것
 *   - 프로브 시스템 자체. Gemini 기반 다섯 에이전트라 모델이 필요한 부분이다.
 *   - 참가자 면접의 통짜 기록과 그림 3의 화면.
 *
 * 이 페이지가 스스로 더한 것
 *   - 지도 위에서 일을 골라 보는 화면 짜임. 판정은 없다 - 질적 연구라 논문도 점수를
 *     매기지 않았고, 세 가지 저울을 스스로 대 보는 것이 이 페이지의 쓸모다.
 */

export const PAPER = {
  title: 'Good Fences Make Good Learning: How Self-Directed Language Learners Navigate LLM Delegation Decisions',
  authors: 'Jiwon Song, Aeri Cho, Sihyeon Lee, Kiroong Choe, Jinwook Seo',
  venue: 'CHI 2026 · 우수논문 명예상',
  affiliation: 'SNU',
  link: 'https://hcil.snu.ac.kr/publications',
  fullText: 'hcil.snu.ac.kr/cms/uploads/Good_Fences_Make_Good_Learning_Self_Directed_Language_Learning_79c2ac6006.pdf',
  /** 쉬운 말로. 열두 살이 읽어도 통하는 문장만 쓴다. */
  plain: {
    problem: {
      ko: '혼자 외국어를 배우는 사람들이 AI에게 도움을 받기 시작했습니다. 그런데 어디까지 맡겨야 할까요? 다 맡기면 편하지만, 사전 찾는 일까지 맡기면 정작 늘어야 할 실력이 늘지 않습니다. 울타리를 어디에 칠지가 문제입니다.',
      en: 'People learning a language on their own have started leaning on AI. But how much should they hand over? Handing over everything is comfortable — yet if even dictionary lookups are delegated, the very skill that should grow does not. The question is where to put the fence.',
      ja: '独学で外国語を学ぶ人たちがAIの助けを借り始めました。でもどこまで任せるべきでしょう?全部任せれば楽ですが、辞書を引くことまで任せると、伸びるはずの実力が伸びません。柵をどこに立てるかが問題です。',
    },
    work: {
      ko: '연구진은 언어 학습 커뮤니티의 여섯 달치 글 1,805건을 읽고, 학습자 13명에게 AI 도우미를 쥐여 주고 세 번의 학습을 지켜봤습니다. 그래서 사람들이 맡길지 말지를 정할 때 쓰는 세 가지 저울 - 정확한가, 스스로 해야 크는 일인가, 진짜 사람 같아야 하는 일인가 - 를 찾아냈습니다.',
      en: 'The authors read 1,805 posts and comments from six months of a language-learning community, then handed an AI helper to 13 learners and watched three study sessions each. They found the three scales people weigh before delegating: is it accurate, is it the kind of work that only grows you if you do it yourself, and does it need to feel like a real person?',
      ja: '研究チームは語学学習コミュニティの六か月分の投稿1,805件を読み、学習者13名にAIの助手を持たせて三回の学習を見守りました。そして人が任せるかどうかを決めるときに使う三つの秤 - 正確か、自分でやってこそ伸びる仕事か、本物の人間らしさが要る仕事か - を見つけました。',
    },
    took: {
      ko: '이 페이지는 그 지도를 그대로 가져왔습니다. 배움의 열아홉 가지 일이 세 국면에 놓여 있고, 13명 가운데 몇 명이 각각을 맡겨 봤는지가 적혀 있습니다. 전원이 맡긴 일은 질문하기 하나뿐입니다.',
      en: 'This page carries that map as it is: nineteen learning jobs laid across three phases, with how many of the 13 tried delegating each. Only one job was delegated by everyone — asking questions.',
      ja: 'このページはその地図をそのまま持ってきました。学びの十九の仕事が三つの局面に置かれ、13名のうち何名がそれぞれを任せてみたかが記されています。全員が任せた仕事は質問することひとつだけです。',
    },
    left: {
      ko: '연구에 쓰인 AI 도우미 자체는 가져오지 않았습니다. 모델이 필요한 부분이라 이 사이트가 다루지 않습니다. 판정도 없습니다 - 질적 연구라 논문도 점수를 매기지 않았고, 세 저울을 대 보는 것은 읽는 분의 몫입니다.',
      en: 'The AI helper used in the study is not carried — it needs a model, which this site does not run. There is no verdict either: this is qualitative work, the paper assigns no scores, and weighing the three scales is left to you.',
      ja: '研究で使われたAI助手そのものは持ってきていません。モデルが要る部分で、この場所は扱いません。判定もありません。質的研究で論文も点数をつけておらず、三つの秤に掛けるのは読む方の仕事です。',
    },
  },
} as const;
