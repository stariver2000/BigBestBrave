/**
 * 대본 진단 페이지 설정.
 *
 * 근거가 된 연구: Beyond Instructions: A Taxonomy of Information Types in
 * How-to Videos (Saelyne Yang, Sangkyung Kwak, Juhoon Lee, Juho Kim, KAIST),
 * CHI 2023, doi:10.1145/3544548.3581126.
 * 전문은 연구실이 직접 올린 kixlab.github.io의 PDF로 읽었다.
 *
 * 이 페이지가 가져온 것
 *   - 표 1의 여덟 갈래·스물한 유형과 그 정의.
 *   - 부록 표 4·5의 갈래·유형별 시간 비율(평균·SD·최소·최대)과
 *     표 6의 자리 분포(0~1000 정규화), 5.2절의 차이 분석.
 *   - 3.1절·4장·부록 A.5의 자료집 짜임(120편, 12장르, Kappa 0.78).
 *   - 7~8장 사용자 연구(n=9)에서 과제별로 중요하다고 꼽힌 유형과 점수.
 *
 * 가져오지 않은 것
 *   - HTM-Type 자료집의 문장 원문. 남의 영상 대본이다.
 *   - 그림 2·3·5~8에만 실린 값. 그림의 값은 옮기지 않는다.
 *   - 표 2의 기존 시스템 목록(관련 연구 분석이라 화면 밖).
 *
 * 이 페이지가 스스로 더한 것
 *   - 견본 대본 셋과 그 라벨. 셋 다 이 페이지를 위해 지은 글이다.
 *   - 글자 수 비율로 시간 비율을 근사하는 것(논문은 문장 시각으로 쟀다).
 *   - 단서 낱말로 하는 유형 추천. 논문의 라벨은 사람 셋이 영상을 보며 단 것이고
 *     자동 분류는 후속 과제로 남겼다(9.4절). 추천은 사람이 확정해야 라벨이 된다.
 */

import type { Locale } from '../../core/i18n';
import type { Label } from '../../core/howto';

export const PAPER = {
  title: 'Beyond Instructions: A Taxonomy of Information Types in How-to Videos',
  authors: 'Saelyne Yang, Sangkyung Kwak, Juhoon Lee, Juho Kim',
  venue: 'CHI 2023',
  affiliation: 'KAIST',
  link: 'https://doi.org/10.1145/3544548.3581126',
  fullText: 'kixlab.github.io (연구실 공개본)',
  /** 쉬운 말로. 열두 살이 읽어도 통하는 문장만 쓴다. */
  plain: {
    problem: {
      ko: '하우투 영상은 길고, 내가 필요한 한 마디는 그 어딘가에 숨어 있습니다. 영상 속 말이 지시인지, 팁인지, 경고인지, 그냥 잡담인지 갈라 주는 지도가 없으면 처음부터 끝까지 훑는 수밖에 없습니다.',
      en: 'How-to videos are long, and the one sentence you need hides somewhere inside. Without a map that tells instructions from tips, warnings, and plain chatter, all you can do is scrub from start to end.',
      ja: 'ハウツー動画は長く、必要な一言はそのどこかに隠れています。動画の中の言葉が指示なのか、コツなのか、警告なのか、ただの雑談なのかを分ける地図がなければ、最初から最後まで探すしかありません。',
    },
    work: {
      ko: '연구진은 유튜브 하우투 영상 120편의 문장 9천9백 개를 사람이 일일이 읽고, 영상 속 정보를 여덟 갈래 스물한 유형으로 가르는 분류표를 만들었습니다. 그리고 아홉 명에게 이 지도를 들려 영상을 찾고, 간추리고, 따라 하게 해 봤습니다.',
      en: 'The authors read 9.9k sentences from 120 YouTube how-to videos by hand and built a taxonomy that sorts video information into 21 types under 8 categories. Then they gave nine people this map and had them search, summarize, and follow videos with it.',
      ja: '研究チームはYouTubeのハウツー動画120本の文9千9百個を人の手で読み、動画の中の情報を8分類21種類に分ける分類表を作りました。そして9人にこの地図を渡し、動画を探し、要約し、実際に従ってもらいました。',
    },
    took: {
      ko: '이 페이지는 그 분류표와 측정값을 가져와 반대로 씁니다. 영상을 보는 쪽이 아니라 만드는 쪽에서, 내 대본의 문장마다 유형을 달아 보면 지시가 몇 퍼센트인지, 잡담이 평균보다 많은지, 맺음말이 이상한 자리에 있는지를 120편의 잣대로 비춰 줍니다.',
      en: 'This page takes that taxonomy and its measurements and uses them in reverse. From the maker’s side rather than the viewer’s, label each sentence of your script and it holds your mix of instructions, chatter, and closings against the yardstick of 120 real videos.',
      ja: 'このページはその分類表と測定値を持ってきて、逆向きに使います。動画を見る側ではなく作る側で、自分の台本の文ごとに種類を付ければ、指示が何割か、雑談が平均より多いか、締めの言葉が変な位置にないかを、120本の物差しで照らします。',
    },
    left: {
      ko: '자료집의 실제 영상 문장은 남의 대본이라 싣지 않았습니다. 견본 대본 셋은 지은 글입니다. 유형 추천은 논문에 없는 이 페이지의 어림짐작이라 사람이 확정해야 하고, 논문이 시간으로 잰 비율을 여기서는 글자 수로 근사합니다.',
      en: 'The real video sentences from the dataset are other people’s scripts and are not shown. The three sample scripts are written for this page. Type suggestions are this page’s own guesswork, absent from the paper, so a person must confirm them — and shares the paper measured in time are approximated here by character count.',
      ja: 'データセットの実際の動画の文は他人の台本なので載せていません。見本の台本三つはこのページのために書いた文章です。種類の推薦は論文にないこのページの当て推量なので人が確定する必要があり、論文が時間で測った割合をここでは文字数で近似します。',
    },
  },
} as const;

/** custom 대본이 이 길이(글자)를 넘으면 URL에 싣지 않는다. 링크가 깨질 만큼 길어진다. */
export const MAX_URL_TEXT = 1200;

export interface Sample {
  /** 문장마다 하나씩, 지은이(이 페이지)가 단 라벨. 견본과 함께 지은 것이다. */
  labels: readonly Label[];
  text: Record<Locale, string>;
}

/**
 * 견본 대본 셋. 자료집의 세 작업 종류(만들기·고치기·쓰기)를 하나씩 지었다.
 * 남의 영상에서 가져온 문장은 없다 - 셋 다 이 페이지를 위해 쓴 글이다.
 * 세 언어의 문장 수가 같아야 라벨이 언어를 넘어 통한다(시험이 강제한다).
 * 고치기 견본은 논문의 관찰(고치기 영상은 Status·Context가 많다)을 따라
 * 일부러 상태 묘사를 두 문장 넣었다.
 */
export const SAMPLES: Record<'creating' | 'fixing' | 'using', Sample> = {
  creating: {
    labels: [
      'opening', 'goal', 'motivation', 'tool', 'briefing', 'subgoal', 'instruction',
      'instruction', 'tip', 'justification', 'subgoal', 'instruction', 'warning',
      'effect', 'outcome', 'selfPromotion',
    ],
    text: {
      ko: '안녕하세요, 주말마다 부엌에서 노는 사람입니다. 오늘은 밀가루 없이 바나나 팬케이크를 만들어 보겠습니다. 아침마다 남는 바나나가 아까워서 시작한 조리법이에요. 준비물은 잘 익은 바나나 두 개, 달걀 두 개, 버터 약간이 전부입니다. 반죽을 만들고, 굽고, 마지막에 접시에 쌓는 순서로 갑니다. 먼저 반죽부터 만들죠. 바나나를 볼에 넣고 포크로 곱게 으깹니다. 거기에 달걀 두 개를 깨 넣고 잘 섞어 주세요. 덩어리가 조금 남아 있을 때 멈추면 더 폭신해져요. 왜냐하면 너무 오래 저으면 거품이 다 꺼지기 때문입니다. 이제 굽는 단계입니다. 약한 불로 달군 팬에 버터를 녹이고 반죽을 한 국자씩 올립니다. 불을 세게 올리지 마세요, 겉만 타고 속은 안 익습니다. 가장자리가 마르면 뒤집는데, 그러면 양면이 고르게 노릇해집니다. 접시에 쌓고 꿀을 두르면 완성입니다. 다음 영상에서 만나요, 구독은 큰 힘이 됩니다.',
      en: "Hi there, I'm the person who plays in the kitchen every weekend. Today I'll show you banana pancakes with no flour at all. This recipe started because I hated wasting the bananas left over every morning. You'll need two ripe bananas, two eggs, and a little butter. We'll make the batter, cook it, and stack everything on a plate, in that order. First, the batter. Put the bananas in a bowl and mash them well with a fork. Crack in the two eggs and mix. Stopping while a few lumps remain makes the pancakes fluffier. That's because stirring too long knocks all the air out. Now for the cooking step. Melt butter in a pan over low heat and pour in one ladle of batter at a time. Don't turn up the heat, or the outside burns before the inside cooks. Flip when the edges look dry, and both sides come out evenly golden. Stack them on a plate, drizzle honey, and they're done. See you in the next video, and subscribing helps a lot.",
      ja: 'こんにちは、週末ごとに台所で遊んでいる者です。今日は小麦粉を使わないバナナパンケーキを作ってみます。毎朝残るバナナがもったいなくて始めたレシピです。必要なものは熟したバナナ二本、卵二個、バター少しだけです。生地を作り、焼いて、最後にお皿に重ねる順番で進めます。まずは生地からです。バナナをボウルに入れ、フォークで細かくつぶします。そこに卵を二個割り入れて、よく混ぜてください。塊が少し残るうちに止めると、もっとふんわりします。なぜなら、混ぜすぎると泡が全部消えてしまうからです。次は焼く段階です。弱火で温めたフライパンにバターを溶かし、生地をお玉一杯ずつ落とします。火を強くしないでください、外だけ焦げて中が生になります。縁が乾いたら裏返すと、両面がむらなくきつね色になります。お皿に重ねて蜂蜜をかければ出来上がりです。また次の動画で会いましょう、チャンネル登録が励みになります。',
    },
  },
  fixing: {
    labels: [
      'opening', 'goal', 'status', 'context', 'tool', 'subgoal', 'instruction',
      'status', 'instruction', 'tip', 'instruction', 'warning', 'outcome',
      'reflection', 'closing',
    ],
    text: {
      ko: '안녕하세요, 오늘도 집 안의 말썽을 하나 잡으러 왔습니다. 이번에는 앉을 때마다 삐걱대는 나무 의자를 고쳐 보겠습니다. 소리부터 들어 보면, 몸을 기울일 때마다 오른쪽 뒤 다리에서 삐걱 소리가 납니다. 이 의자는 십 년을 쓴 물건이라 나사가 헐거워질 때가 됐어요. 필요한 것은 육각 렌치와 목공용 접착제, 걸레 하나입니다. 먼저 어디가 흔들리는지 찾는 게 순서입니다. 의자를 뒤집어 놓고 다리를 하나씩 잡고 흔들어 봅니다. 오른쪽 뒤 다리의 이음매가 눈에 띄게 벌어져 있네요. 헐거운 나사를 렌치로 조여 줍니다. 나사를 한 번에 끝까지 조이지 말고 마주 보는 순서로 번갈아 조이세요. 그래도 소리가 나면 이음매에 접착제를 가늘게 넣습니다. 접착제가 마르기 전에 앉지 마세요, 이음매가 다시 벌어집니다. 하루 말린 뒤 앉아 보니 소리가 사라졌습니다. 오래된 의자라도 버리기 전에 한 번은 뒤집어 볼 만합니다. 봐 주셔서 고맙습니다, 다음에 또 만나요.',
      en: "Hello, here to hunt down one more troublemaker around the house. This time we're fixing a wooden chair that creaks every time you sit down. Listening first, the squeak comes from the right rear leg whenever you lean. This chair has seen ten years of use, so it's about time the screws worked loose. You'll need a hex wrench, wood glue, and a rag. Finding out which joint wobbles comes first. Turn the chair upside down and shake each leg one by one. The joint on the right rear leg is visibly open. Tighten the loose screws with the wrench. Instead of driving one screw all the way, alternate between opposite screws. If it still creaks, run a thin bead of glue into the joint. Don't sit on it before the glue dries, or the joint opens right up again. After drying for a day, I sat down and the squeak was gone. Even an old chair deserves one look underneath before it goes to the curb. Thanks for watching, and see you next time.",
      ja: 'こんにちは、今日も家の中の困りものを一つ退治しに来ました。今回は座るたびにきしむ木の椅子を直してみます。まず音を聞くと、体を傾けるたびに右後ろの脚からきしみが出ています。この椅子は十年使った物なので、ネジが緩んでもおかしくない頃です。必要なものは六角レンチと木工用接着剤、雑巾一枚です。まず、どこがぐらつくのかを探すのが順番です。椅子をひっくり返して、脚を一本ずつ持って揺らしてみます。右後ろの脚の継ぎ目が目に見えて開いていますね。緩んだネジをレンチで締めます。一本のネジを一気に締めず、向かい合うネジを交互に締めてください。それでも音が出るなら、継ぎ目に接着剤を細く流し込みます。接着剤が乾く前に座らないでください、継ぎ目がまた開きます。一日乾かしてから座ってみると、音は消えていました。古い椅子でも、捨てる前に一度はひっくり返してみる価値があります。ご視聴ありがとうございました、また次回。',
    },
  },
  using: {
    labels: [
      'opening', 'goal', 'toolSpec', 'toolSpec', 'tool', 'subgoal', 'instruction',
      'instruction', 'tip', 'instruction', 'warning', 'effect', 'closing',
      'selfPromotion',
    ],
    text: {
      ko: '어서 오세요, 오늘은 도구 이야기를 해 봅니다. 이번 영상에서는 프렌치 프레스로 커피를 내리는 법을 보여드리겠습니다. 프렌치 프레스는 유리통과 금속 거름망 달린 뚜껑, 두 부분으로 된 단순한 도구입니다. 종이 필터가 없어서 커피의 기름까지 그대로 잔에 담기는 게 특징이에요. 굵게 간 원두 삼십 그램과 뜨거운 물 오백 밀리리터를 준비합니다. 먼저 통을 데우는 것부터 시작합니다. 뜨거운 물을 조금 부어 통을 헹구고 버립니다. 원두를 넣고 물을 부은 뒤 사 분을 기다립니다. 기다리는 동안은 뚜껑만 얹어 두면 온도가 덜 떨어져요. 사 분이 지나면 막대를 천천히 끝까지 누릅니다. 급하게 누르지 마세요, 뜨거운 커피가 주둥이로 튑니다. 다 내린 커피는 바로 잔에 옮겨야 쓴맛이 덜해집니다. 오늘은 여기까지입니다. 이 영상이 도움이 됐다면 좋아요를 눌러 주세요.',
      en: "Welcome in, today is a tool day. In this video I'll show you how to brew coffee with a french press. A french press is a simple tool in two parts, a glass beaker and a lid with a metal mesh. With no paper filter, the coffee's oils go straight into your cup, which is its whole character. Measure out thirty grams of coarsely ground beans and five hundred milliliters of hot water. Warming the beaker comes first. Pour in a little hot water, swirl it around, and dump it out. Add the grounds, pour the water, and wait four minutes. Resting the lid on top while you wait keeps the temperature from dropping. When four minutes are up, press the plunger down slowly all the way. Don't rush the press, or hot coffee spits out of the spout. Pouring the coffee out right away keeps it from turning bitter. That's all for today. If this video helped, please give it a like.",
      ja: 'ようこそ、今日は道具の話です。この動画ではフレンチプレスでコーヒーを淹れる方法をお見せします。フレンチプレスはガラスの筒と金属フィルター付きの蓋、二つの部品でできた単純な道具です。紙フィルターがないので、コーヒーの油分までそのままカップに入るのが持ち味です。粗く挽いた豆三十グラムと、熱いお湯五百ミリリットルを用意します。まずは筒を温めるところからです。熱いお湯を少し注いで筒をすすぎ、捨てます。豆を入れてお湯を注ぎ、四分待ちます。待つ間は蓋をのせておくだけで、温度が下がりにくくなります。四分たったら、棒をゆっくり最後まで押します。急いで押さないでください、熱いコーヒーが注ぎ口から飛びます。淹れたコーヒーはすぐカップに移すと、苦味が出にくくなります。今日はここまでです。この動画が役に立ったら、高評価を押してください。',
    },
  },
};

export const SAMPLE_IDS = ['creating', 'fixing', 'using'] as const;
export type SampleId = (typeof SAMPLE_IDS)[number];

/** 관련 페이지. 같은 영상 대본을 다루는 자막 페이지와, 같은 분류표 소재의 페이지. */
export const RELATED_PAGES = [
  { path: '/subtitle', key: 'subtitle' },
  { path: '/space', key: 'space' },
] as const;

/**
 * 여덟 갈래의 표식색. 대본 판의 점·띠·막대에 쓴다.
 * 룩(reel)의 밝은 종이 위에서 실측했다(scratchpad reel-measure):
 * 모두 surface(#F9F6EE) 위 APCA |Lc| >= 69.5, WCAG >= 4.69:1이라 글자로도 쓸 수 있고,
 * bg(#EDE7DA) 위에서도 |Lc| >= 60.8이다. method는 룩의 강조색과 같은 구릿빛 계열이다.
 */
export const CATEGORY_COLORS: Record<import('../../core/howto').CategoryId, string> = {
  greeting: '#7059C0',
  overview: '#22689B',
  method: '#96430A',
  supplementary: '#8A6A00',
  explanation: '#1F7A4D',
  description: '#A93A69',
  conclusion: '#5B6E1F',
  misc: '#6F6A5E',
};
