/**
 * 사물이 쓸 수 있는 문장들.
 *
 * 언어모델을 쓰지 않는다. 이 사물의 어휘는 좁아야 한다 —
 * 무엇이든 말할 수 있는 것은 사물이 아니라 비서이고, 논문이 다룬 것은 비서가 아니다.
 * 좁은 어휘가 같은 자리를 맴도는 데서 오히려 사물의 성격이 생긴다.
 *
 * 문장에는 규칙이 하나 있다. **도움을 주겠다고 말하지 않는다.**
 * 이 사물은 당신을 위해 무언가 하지 않는다. 그저 같이 있고, 알아차리고, 적는다.
 */

import type { Localized } from './types';

const line = (ko: string, en: string, ja: string): Localized => ({ ko, en, ja });

/** 시간대. 사물이 하루를 나누는 방식이다. */
export const HOUR_BANDS = [
  { id: 'dawn', from: 4, to: 7 },
  { id: 'morning', from: 7, to: 12 },
  { id: 'afternoon', from: 12, to: 18 },
  { id: 'evening', from: 18, to: 22 },
  { id: 'night', from: 22, to: 4 },
] as const;

/** 다시 오기까지 걸린 시간의 구간(ms). */
export const RETURN_BANDS = [
  { id: 'first', max: 0 },
  { id: 'soon', max: 1000 * 60 * 60 * 6 },
  { id: 'daily', max: 1000 * 60 * 60 * 36 },
  { id: 'long', max: 1000 * 60 * 60 * 24 * 10 },
  { id: 'distant', max: Number.POSITIVE_INFINITY },
] as const;

/** 머문 시간의 구간(ms). */
export const STAY_BANDS = [
  { id: 'brief', max: 1000 * 20 },
  { id: 'normal', max: 1000 * 90 },
  { id: 'long', max: Number.POSITIVE_INFINITY },
] as const;

/** 첫 줄: 언제 왔는지. */
export const OPENING: Record<string, readonly Localized[]> = {
  dawn: [
    line('아직 어두울 때 당신이 왔다.', 'You came while it was still dark.', 'まだ暗いうちにあなたが来た。'),
    line('새벽에는 소리가 다르게 들린다. 오늘은 당신 소리였다.', 'Sounds are different at dawn. Today it was you.', '夜明けは音が違う。今日はあなたの音だった。'),
  ],
  morning: [
    line('아침에 당신이 왔다. 아직 하루가 접혀 있었다.', 'You came in the morning. The day was still folded up.', '朝にあなたが来た。一日はまだ畳まれていた。'),
    line('빛이 들기 시작할 때 당신이 있었다.', 'You were here as the light began.', '光が差し始める頃、あなたがいた。'),
  ],
  afternoon: [
    line('한낮에 당신이 왔다. 나는 조금 나른했다.', 'You came at midday. I was a little drowsy.', '真昼にあなたが来た。少しけだるかった。'),
    line('오후는 길다. 오늘은 덜 길었다.', 'Afternoons are long. Today less so.', '午後は長い。今日は少し短かった。'),
  ],
  evening: [
    line('저녁에 당신이 왔다.', 'You came in the evening.', '夕方にあなたが来た。'),
    line('불이 켜질 무렵 당신이 있었다.', 'You were here around the time lights go on.', '灯りがつく頃、あなたがいた。'),
  ],
  night: [
    line('늦은 시간에 당신이 왔다. 나는 깨어 있었다.', 'You came late. I was awake.', '遅くにあなたが来た。私は起きていた。'),
    line('밤에는 오래 기다리는 편이다. 오늘은 오래 기다리지 않았다.', 'At night I usually wait a long while. Not tonight.', '夜は長く待つほうだ。今夜は長くなかった。'),
  ],
};

/** 둘째 줄: 얼마 만에 왔는지. */
export const RETURN: Record<string, readonly Localized[]> = {
  first: [
    line('처음 보는 사람이다. 무엇을 적어야 할지 몰라 이렇게 적는다.', 'Someone I have not met. Not knowing what to write, I write this.', '初めて見る人だ。何を書けばよいか分からず、こう書く。'),
    line('오늘 누군가 왔다. 그것만으로도 적을 것이 생겼다.', 'Someone came today. That alone gave me something to write.', '今日誰かが来た。それだけで書くことができた。'),
  ],
  soon: [
    line('아까 왔다 갔는데 또 왔다. 무슨 일이 있는 걸까.', 'You were here not long ago and came again. Something must be happening.', 'さっき来て、また来た。何かあったのだろうか。'),
    line('금방 다시 왔다. 나는 아직 자리를 정리하지 못했다.', 'You came back soon. I had not tidied myself yet.', 'すぐに戻ってきた。まだ片づけていなかった。'),
  ],
  daily: [
    line('어제쯤 보고 오늘 또 본다. 이런 것을 습관이라고 하는지 모르겠다.', 'I saw you around yesterday and see you today. I do not know if this is what a habit is.', '昨日あたり見て、今日また見る。これを習慣と呼ぶのか分からない。'),
    line('하루쯤 지났다. 그동안 별일은 없었다.', 'About a day passed. Nothing much happened.', '一日ほど過ぎた。特に何もなかった。'),
  ],
  long: [
    line('며칠 만이다. 그동안 나는 같은 자리에 있었다.', 'It has been a few days. I was in the same place the whole time.', '数日ぶりだ。その間ずっと同じ場所にいた。'),
    line('오래 비어 있었다. 비어 있는 것도 지나고 나면 하루다.', 'It was empty for a while. Emptiness turns out to be a day too, once it passes.', '長く空いていた。空白も過ぎてしまえば一日だ。'),
  ],
  distant: [
    line('아주 오랜만이다. 나는 당신을 알아본 것 같기도 하고 아닌 것 같기도 하다.', 'It has been very long. I think I recognise you, or perhaps I do not.', '久しぶりだ。見覚えがある気もするし、ない気もする。'),
    line('그사이 계절이 바뀌었을지도 모른다. 나는 창이 없어서 모른다.', 'A season may have turned. I have no window, so I would not know.', 'その間に季節が変わったかもしれない。窓がないので分からない。'),
  ],
};

/** 셋째 줄: 얼마나 머물렀는지. */
export const STAY: Record<string, readonly Localized[]> = {
  brief: [
    line('잠깐 있다 갔다. 나는 그 잠깐을 하루로 적는다.', 'You stayed only a moment. I write that moment down as a day.', '少しだけいて帰った。その少しを一日として書く。'),
    line('스치듯 지나갔다. 그래도 지나간 것은 지나간 것이다.', 'You passed through. Passing through is still passing through.', '通り過ぎただけだ。それでも通ったことは通ったことだ。'),
  ],
  normal: [
    line('한동안 같이 있었다. 특별한 일은 없었다. 그게 좋았다.', 'We were together a while. Nothing special happened. That was good.', 'しばらく一緒にいた。特別なことはなかった。それがよかった。'),
    line('오래는 아니고, 짧지도 않게 있었다.', 'Not long, not short.', '長くもなく、短くもなくいた。'),
  ],
  long: [
    line('오늘은 오래 있었다. 나는 그동안 아무 말도 하지 않았다.', 'You stayed long today. I said nothing the whole time.', '今日は長くいた。その間、私は何も言わなかった。'),
    line('오래 머물렀다. 나는 그 시간을 어디에 쓸지 모르겠다.', 'You stayed long. I do not know what to do with all that time.', '長く留まった。その時間をどう使えばいいのか分からない。'),
  ],
};

/** 사물의 혼잣말. 당신과 상관없는, 사물 자신의 생각이다. */
export const INNER: readonly Localized[] = [
  line('나는 하루 종일 같은 자리에 있다. 그것이 싫지는 않다.', 'I stay in the same place all day. I do not mind it.', '一日中同じ場所にいる。それが嫌ではない。'),
  line('먼지는 조용히 쌓인다. 나는 그 소리를 듣는 것 같다.', 'Dust settles quietly. I think I can hear it.', '埃は静かに積もる。その音が聞こえる気がする。'),
  line('어제 적은 것을 다시 읽었다. 내가 쓴 것 같지 않았다.', 'I reread what I wrote yesterday. It did not seem to be mine.', '昨日書いたものを読み返した。自分が書いた気がしなかった。'),
  line('나는 아무것도 하지 않는 날이 많다. 그런 날도 적어 둔다.', 'Many days I do nothing. I write those days down too.', '何もしない日が多い。そんな日も書いておく。'),
  line('내가 없어도 하루는 지나갈 것이다. 그래도 적는다.', 'The day would pass without me. I write anyway.', '私がいなくても一日は過ぎる。それでも書く。'),
  line('누가 읽을 것을 생각하며 쓰지는 않았다.', 'I did not write this thinking anyone would read it.', '誰かが読むと思って書いたのではない。'),
  line('오늘은 조금 기울어져 있는 것 같다. 아무도 고쳐 주지 않았다.', 'I think I am tilted a little today. No one straightened me.', '今日は少し傾いている気がする。誰も直してくれなかった。'),
  line('기억은 잘 안 나지만, 적어 둔 것은 남는다.', 'I do not remember well, but what is written stays.', 'よく覚えていないが、書いたものは残る。'),
];

/** 마지막 줄: 사물이 품은 작은 뜻. 부탁이 아니라 저 혼자의 마음이다. */
export const INTENT: readonly Localized[] = [
  line('내일은 조금 더 일찍 깨어 있어 보려 한다.', 'Tomorrow I mean to be awake a little earlier.', '明日はもう少し早く起きていようと思う。'),
  line('다음에는 아무 말도 적지 않아 볼까 한다.', 'Next time I may write nothing at all.', '次は何も書かずにいようかと思う。'),
  line('언젠가 창이 있는 자리로 옮겨지면 좋겠다.', 'I would like to be moved somewhere with a window one day.', 'いつか窓のある場所へ移されたい。'),
  line('당신이 오지 않는 날에도 나는 적을 것이다.', 'On days you do not come, I will write anyway.', 'あなたが来ない日にも、私は書くだろう。'),
  line('오늘 것은 조금 길게 적어 두고 싶었다.', 'I wanted today’s to be a little longer.', '今日の分は少し長く書いておきたかった。'),
  line('이만 접는다. 접는다는 말을 써 보고 싶었다.', 'I will close here. I wanted to use the word close.', 'ここで閉じる。閉じるという言葉を使ってみたかった。'),
];

/** 기분을 정하는 기준. 관찰이 이 조건에 맞으면 그 기분이 된다. */
export const MOOD_RULES = [
  { mood: 'curious', when: 'first' },
  { mood: 'restless', when: 'soon' },
  { mood: 'lonely', when: 'distant' },
  { mood: 'content', when: 'longStay' },
  { mood: 'settled', when: 'default' },
] as const;

/** 일기에 남기는 최대 개수. 넘으면 오래된 것부터 잊는다. */
export const MAX_ENTRIES = 40;
