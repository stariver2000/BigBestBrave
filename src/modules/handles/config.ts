/**
 * 손으로 고치는 차트 페이지 설정.
 *
 * 근거가 된 연구: DirectVis: Editing Code-Based Interactive Visualization with
 * Direct Manipulation (Jeongin Park, Mingyu An, Hyunseo Yang, Junhyeong Hwangbo,
 * Min Hyeong Kim, Hyeon Jeon, Jinwook Seo, SNU), IEEE PacificVis 2026,
 * doi:10.1109/pacificvis68791.2026.00014.
 * 전문은 연구실이 직접 올린 hcil.snu.ac.kr/cms/uploads 공개본으로 읽었다.
 *
 * 이 페이지가 가져온 것
 *   - 3.1절의 설계 목표 셋과 3.2.2절의 뼈대(그림과 코드가 같은 하나의 상태에서
 *     나오고, 어느 쪽을 골라도 같은 마디에 닿는다).
 *   - 4.2절의 과제 1(묶음 막대를 쌓기로 바꾸고 클릭 상호작용을 단다).
 *   - 4.1·5장의 참가자와 결과 수치 - 성공률·시간·상호작용 수를 인쇄된 그대로.
 *
 * 가져오지 않은 것
 *   - 언어모델(GPT-4o). 이 페이지에는 없다. 논문 시스템의 세 번째 길(자연어
 *     프롬프트)은 여기서 빠져 있고, 그 사실을 화면 맨 앞에 적는다.
 *   - 그림 4·5의 막대값과 논문 화면 갈무리, 참가자 발언.
 *   - 실제 실험 자료(날씨·판매). 지어낸 세 지역 네 계절 표를 쓴다.
 *
 * 이 페이지가 스스로 더한 것
 *   - 시연자. 논문에서는 사람이 시스템에 시연하는데, 여기서는 시스템이 사람에게
 *     과제 1을 한 조작씩 시연해 보인다. 사람이 만지면 물러난다.
 *   - "손짓 한 번이 코드 몇 줄을 바꾸나"를 세어 보이는 것.
 */

import type { NodeId } from '../../core/chartspec';

export const PAPER = {
  title: 'DirectVis: Editing Code-Based Interactive Visualization with Direct Manipulation',
  authors: 'Jeongin Park, Mingyu An, Hyunseo Yang, Junhyeong Hwangbo, Min Hyeong Kim, Hyeon Jeon, Jinwook Seo',
  venue: 'IEEE PacificVis 2026',
  affiliation: 'SNU',
  link: 'https://doi.org/10.1109/pacificvis68791.2026.00014',
  fullText: 'hcil.snu.ac.kr (연구실 공개본)',
  /** 쉬운 말로. 열두 살이 읽어도 통하는 문장만 쓴다. */
  plain: {
    problem: {
      ko: '요즘은 인공지능에게 말로 부탁해 그래프를 만듭니다. 그런데 만들어진 그래프를 조금 고치려 할 때가 어렵습니다. "저 막대를 이렇게 해 줘"를 말로 옮기기도 힘들고, 코드의 어느 줄이 그 막대를 그리는지도 보이지 않기 때문입니다.',
      en: 'These days you ask an AI in words to make a chart. The hard part comes when you want to change it a little. Putting "make that bar do this" into words is awkward, and nothing shows which line of code drew that bar.',
      ja: '最近はAIに言葉で頼んでグラフを作ります。ところが出来上がったグラフを少し直そうとすると難しい。「あの棒をこうして」を言葉にするのも大変で、コードのどの行がその棒を描いているのかも見えないからです。',
    },
    work: {
      ko: '연구진은 그래프의 요소를 직접 잡아 끌 수 있게 만들었습니다. 막대를 다른 막대 위로 끌면 쌓인 막대가 되고, 그때 코드가 스스로 따라 바뀝니다. 요소를 클릭하면 그것을 그리는 코드 줄이 밝아집니다. 열두 명에게 시켜 보니 말로만 부탁할 때보다 부탁 횟수가 크게 줄었습니다.',
      en: 'The authors made the chart’s parts grabbable. Drag a bar onto another and it becomes a stacked bar, with the code following along by itself. Click a part and the code line that draws it lights up. With twelve people, the number of requests dropped sharply compared to asking in words alone.',
      ja: '研究チームはグラフの要素を直接つかんで動かせるようにしました。棒を別の棒の上へ引くと積み上げ棒になり、そのときコードが自ら追いかけて変わります。要素をクリックすると、それを描くコードの行が光ります。12人に試すと、言葉だけで頼むときより頼む回数が大きく減りました。',
    },
    took: {
      ko: '이 페이지는 그 짜임을 그대로 가져왔습니다. 막대를 잡아 끌고 손잡이를 돌리면 그림과 코드가 같은 하나의 상태에서 함께 다시 만들어집니다. 손짓 한 번이 코드 몇 줄을 바꾸는지도 세어 보여 줍니다. 논문의 첫 과제(묶음을 쌓기로, 클릭하면 흐려지게)를 그대로 놓아 두었습니다.',
      en: 'This page carries that structure over. Grab a bar or turn a handle and the picture and the code are both rebuilt from the same single state. It also counts how many code lines one gesture rewrites. The paper’s first task — grouped to stacked, then click-to-dim — is set out as it was.',
      ja: 'このページはその仕組みをそのまま持ってきました。棒をつかんで引き、つまみを回すと、絵とコードが同じ一つの状態から一緒に作り直されます。手の動き一回がコードの何行を書き換えるかも数えて見せます。論文の最初の課題(グループを積み上げに、クリックで薄く)をそのまま置いてあります。',
    },
    left: {
      ko: '언어모델은 없습니다. 논문 시스템의 세 번째 길인 "말로 부탁하기"가 여기서는 빠져 있고, 코드도 실제로 돌리지 않습니다 - 같은 상태에서 그림과 코드를 나란히 만들 뿐입니다. 실험에 쓴 진짜 자료도 남의 것이라 지어낸 작은 표로 바꿨습니다.',
      en: 'There is no language model. The third path of the paper’s system — asking in words — is missing here, and the code is never actually run; the picture and the code are just built side by side from the same state. The real study data belongs to others, so a small invented table stands in.',
      ja: '言語モデルはありません。論文のシステムの三つ目の道である「言葉で頼む」はここでは抜けており、コードも実際には動かしません - 同じ状態から絵とコードを並べて作るだけです。実験に使った本物のデータも他人のものなので、作り話の小さな表に替えました。',
    },
  },
} as const;

/** 한 걸음의 간격(ms). 시연이 눈에 따라올 만큼 느리게. */
export const STEP_INTERVAL = 1600;

/**
 * 코드 블록과 시각 요소를 잇는 색. 룩(handle)이 변수로 들고 있다 -
 * 잡을 수 있는 것은 보랏빛(accent), 코드 쪽 짝은 짙은 청록(second).
 */
export const LINK_VARS = {
  grabbable: 'var(--bbb-accent)',
  code: 'var(--bbb-second-color)',
} as const;

/** 코드 블록을 화면에 세우는 순서. 명세가 만들어 내는 순서와 같다. */
export const NODE_ORDER: readonly NodeId[] = [
  'title',
  'xAxis',
  'yAxis',
  'marks',
  'legend',
  'interaction',
];

/** 관련 페이지. 차트를 다른 각도에서 다루는 페이지들. */
export const RELATED_PAGES = [
  { path: '/chart', key: 'chart' },
  { path: '/figure', key: 'figure' },
] as const;
