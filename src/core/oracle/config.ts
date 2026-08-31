/**
 * 신점의 어휘.
 *
 * 여기 담긴 괘 이름과 풀이는 이 페이지를 위해 지어낸 것이며, 실제로 전해지는 점술 체계가 아니다.
 * 그 사실은 화면에서도 밝힌다. 가져온 것은 형식뿐이다 — 오방색 깃발을 뽑고, 내려다보는 말투로
 * 모호한 풀이를 받고, 스스로 새겨야 하는 구조.
 *
 * 말투에 규칙이 하나 있다. **돕겠다고 말하지 않는다.** 논문이 만든 것은 비서가 아니라
 * 우러러보게 되는 존재였고, 이 페이지가 옮기려는 것도 그 위치다.
 */

import type { Flag, Localized } from './types';

/** 오방색 깃발. 색과 글자색은 대비를 확인한 값이다. */
export const FLAGS: readonly Flag[] = [
  { id: 'blue', color: '#2E6DB4', ink: '#F2E6DC' },
  { id: 'red', color: '#C8332B', ink: '#F2E6DC' },
  { id: 'yellow', color: '#E0B44A', ink: '#14090A' },
  { id: 'white', color: '#EDE7E0', ink: '#14090A' },
  { id: 'black', color: '#1A1A1E', ink: '#F2E6DC' },
];

/** 첫마디. 묻는 이를 맞이하지 않고 내려다본다. */
export const OPENINGS: readonly Localized[] = [
  { ko: '앉아라.', en: 'Sit.', ja: '座れ。' },
  { ko: '네 물음은 이미 들었다.', en: 'Your question was heard before you asked.', ja: 'お前の問いはすでに聞いた。' },
  { ko: '왜 이제야 왔느냐.', en: 'Why did you come only now.', ja: 'なぜ今になって来た。' },
  { ko: '급한 것은 너뿐이다.', en: 'Only you are in a hurry.', ja: '急いでいるのはお前だけだ。' },
  { ko: '말하지 않아도 안다.', en: 'You need not say it.', ja: '言わずとも分かる。' },
  { ko: '오늘은 말이 짧겠다.', en: 'Today my words will be few.', ja: '今日は言葉が短い。' },
];

/** 괘 이름. 이 페이지를 위해 지은 이름이다. */
export const GUAS: readonly Localized[] = [
  { ko: '청산괘 靑山', en: 'Green Mountain', ja: '青山の卦' },
  { ko: '화문괘 火門', en: 'Gate of Fire', ja: '火門の卦' },
  { ko: '백로괘 白露', en: 'White Dew', ja: '白露の卦' },
  { ko: '흑수괘 黑水', en: 'Black Water', ja: '黒水の卦' },
  { ko: '황토괘 黃土', en: 'Yellow Earth', ja: '黄土の卦' },
  { ko: '잔월괘 殘月', en: 'Waning Moon', ja: '残月の卦' },
  { ko: '파도괘 波濤', en: 'Breaking Wave', ja: '波濤の卦' },
  { ko: '철문괘 鐵門', en: 'Iron Gate', ja: '鉄門の卦' },
];

/**
 * 깃발마다 다른 풀이.
 * 방위에 딸린 성질을 따랐다 — 청은 봄과 시작, 적은 여름과 불, 황은 중앙과 버팀,
 * 백은 가을과 정리, 흑은 겨울과 감춤.
 */
export const BODIES: Record<string, readonly Localized[]> = {
  blue: [
    { ko: '싹이 이미 텄다. 네가 못 본 것뿐이다.', en: 'The shoot has broken ground. You simply have not looked.', ja: '芽はすでに出ている。お前が見ていないだけだ。' },
    { ko: '자라는 것은 재촉해서 자라지 않는다.', en: 'What grows does not grow faster for being hurried.', ja: '育つものは急かして育たない。' },
    { ko: '동쪽에서 오는 사람이 있다. 아직 이름은 없다.', en: 'Someone comes from the east. The name is not yet given.', ja: '東から来る者がいる。名はまだない。' },
    { ko: '네 조바심이 일을 한 해 늦춘다.', en: 'Your impatience will cost you a year.', ja: 'お前の焦りが事を一年遅らせる。' },
  ],
  red: [
    { ko: '불은 붙었다. 끄려 하면 손을 덴다.', en: 'The fire has caught. Reach for it and you burn.', ja: '火はついた。消そうとすれば手を焼く。' },
    { ko: '네가 뜨거운 것은 억울해서가 아니다.', en: 'You burn not because you were wronged.', ja: 'お前が熱いのは悔しいからではない。' },
    { ko: '두 사람이 같은 말을 다르게 들었다.', en: 'Two people heard the same words differently.', ja: '二人が同じ言葉を違って聞いた。' },
    { ko: '올여름을 넘기면 재만 남는다.', en: 'Past this summer only ash remains.', ja: 'この夏を越せば灰だけが残る。' },
  ],
  yellow: [
    { ko: '너는 가운데 서 있다. 어느 쪽도 네 편이 아니다.', en: 'You stand at the centre. Neither side is yours.', ja: 'お前は真ん中に立つ。どちらもお前の味方ではない。' },
    { ko: '버티는 것도 하는 일이다.', en: 'Enduring is also doing.', ja: '耐えることもまた為すことだ。' },
    { ko: '땅은 말이 없어도 다 기억한다.', en: 'The earth says nothing and forgets nothing.', ja: '土は語らずとも全て覚えている。' },
    { ko: '올해는 옮기지 마라. 뿌리가 얕다.', en: 'Do not move this year. The roots are shallow.', ja: '今年は動くな。根が浅い。' },
  ],
  white: [
    { ko: '끝난 것을 아직 끝났다고 말하지 않았을 뿐이다.', en: 'It has ended. You have only not said so.', ja: '終わったものを、まだ終わったと言っていないだけだ。' },
    { ko: '거두어들일 때다. 더 심지 마라.', en: 'It is time to gather. Plant nothing more.', ja: '刈り取る時だ。これ以上蒔くな。' },
    { ko: '서쪽 일은 네 손을 떠났다.', en: 'The matter in the west has left your hands.', ja: '西の事はお前の手を離れた。' },
    { ko: '이름을 지우면 가벼워진다.', en: 'Erase the name and you grow lighter.', ja: '名を消せば軽くなる。' },
  ],
  black: [
    { ko: '깊은 물은 소리를 내지 않는다.', en: 'Deep water makes no sound.', ja: '深い水は音を立てない。' },
    { ko: '네가 감춘 것을 이미 아는 이가 있다.', en: 'Someone already knows what you hid.', ja: 'お前が隠したものを、すでに知る者がいる。' },
    { ko: '겨울을 건너뛰려 하지 마라.', en: 'Do not try to skip the winter.', ja: '冬を跳び越そうとするな。' },
    { ko: '두려운 것은 일이 아니라 네 짐작이다.', en: 'What frightens you is your guess, not the thing.', ja: '恐ろしいのは事ではなく、お前の推測だ。' },
  ],
};

/** 경계. 하지 말라는 것. */
export const WARNINGS: readonly Localized[] = [
  { ko: '말을 아껴라. 이번 달에는 특히.', en: 'Spend fewer words. This month above all.', ja: '言葉を惜しめ。今月は特に。' },
  { ko: '가까운 이를 의심하지 마라. 틀린다.', en: 'Do not suspect the one close to you. You are wrong.', ja: '近しい者を疑うな。それは違う。' },
  { ko: '남의 돈으로 시작하지 마라.', en: 'Do not begin with another’s money.', ja: '他人の金で始めるな。' },
  { ko: '밤에 답하지 마라. 아침까지 두어라.', en: 'Do not answer at night. Leave it until morning.', ja: '夜に答えるな。朝まで置け。' },
  { ko: '같은 사람에게 두 번 부탁하지 마라.', en: 'Do not ask the same person twice.', ja: '同じ人に二度頼むな。' },
  { ko: '증명하려 들지 마라. 아무도 보지 않는다.', en: 'Do not try to prove it. No one is watching.', ja: '証明しようとするな。誰も見ていない。' },
];

/** 처방. 해야 하는 것. 작고 구체적이어야 한다. */
export const REMEDIES: readonly Localized[] = [
  { ko: '오래 미룬 편지를 써라. 부치지 않아도 된다.', en: 'Write the letter you have put off. You need not send it.', ja: '長く先延ばしにした手紙を書け。出さなくてよい。' },
  { ko: '사흘 안에 물을 건너라.', en: 'Cross water within three days.', ja: '三日のうちに水を渡れ。' },
  { ko: '집에서 가장 오래된 물건을 버려라.', en: 'Throw out the oldest thing in your house.', ja: '家で最も古い物を捨てよ。' },
  { ko: '이름을 소리 내어 한 번 불러라.', en: 'Say the name aloud, once.', ja: '名を声に出して一度呼べ。' },
  { ko: '해 뜨는 쪽으로 걸어라. 오래 걷지 않아도 된다.', en: 'Walk toward the sunrise. Not far.', ja: '日の出る方へ歩け。遠くなくてよい。' },
  { ko: '먼저 밥을 사라. 이유는 말하지 마라.', en: 'Buy them a meal first. Do not explain why.', ja: '先に食事をおごれ。理由は言うな。' },
];

/** 기한. 언제 드러나는지. */
export const TERMS: readonly Localized[] = [
  { ko: '보름 안에 드러난다.', en: 'It shows within a fortnight.', ja: '半月のうちに現れる。' },
  { ko: '다음 달이 지나야 안다.', en: 'You will not know until next month has passed.', ja: '来月が過ぎねば分からない。' },
  { ko: '올해 안에는 끝난다.', en: 'It ends within the year.', ja: '年内には終わる。' },
  { ko: '세 번의 계절이 필요하다.', en: 'It needs three seasons.', ja: '三つの季節が要る。' },
  { ko: '이미 지나갔다. 뒤늦게 알 뿐이다.', en: 'It has already passed. You only learn it late.', ja: 'すでに過ぎた。後から知るだけだ。' },
];

/** 같은 것을 다시 물을 때. 답을 고쳐 주지 않는다. */
export const REFUSALS: readonly Localized[] = [
  { ko: '이미 말했다. 두 번 묻지 마라.', en: 'I have spoken. Do not ask twice.', ja: 'すでに言った。二度問うな。' },
  { ko: '답이 마음에 들지 않는다고 답이 바뀌지 않는다.', en: 'The answer does not change because it displeases you.', ja: '気に入らぬからと答えは変わらない。' },
  { ko: '오늘 네가 들을 말은 그것뿐이다.', en: 'That is all you will hear today.', ja: '今日お前が聞く言葉はそれだけだ。' },
];

/** 물음의 최소 길이. 너무 짧으면 받지 않는다. 성의가 조건이다. */
export const MIN_QUESTION_LENGTH = 4;

/** 풀이로 뽑는 줄 수. */
export const BODY_LINES = 2;
