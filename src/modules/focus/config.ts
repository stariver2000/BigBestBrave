/**
 * 초점 맞추기 페이지 설정.
 *
 * 근거가 된 연구: Towards More Explainable Nonlinear Dimensionality Reduction:
 * A Feature-Driven Interaction Approach (Aeri Cho, Hyeon Jeon, Kiroong Choe,
 * Seokhyeon Park, Jinwook Seo, SNU), IEEE TVCG 2026, doi:10.1109/TVCG.2025.3622114.
 * 전문은 연구실이 직접 올린 hcil.snu.ac.kr/cms/uploads 공개본으로 읽었다.
 *
 * 이 페이지가 가져온 것
 *   - 두 시각 의미의 식 그대로: Clusteredness(Calinski-Harabasz)와
 *     Overlap(20x20 격자의 칸별 엔트로피 합).
 *   - 세 질의(무리 찾기 / 무리 합치기 / 무리 가르기)와 그 방향, 필요한 무리 수.
 *   - 6장 정량 실험과 8장 사용자 연구의 수치.
 *
 * 가져오지 않은 것
 *   - UMAP과 그것을 흉내 낸 신경망. 브라우저 안에서 결정론적으로 돌릴 수 없다.
 *     대신 가중 주성분 투영을 쓰고 그 사실을 화면 맨 앞에 적는다.
 *   - 구매 이력 자료(7,200점 11특징). 남의 자료다.
 *   - Optuna의 TPE. 대신 결정론적 좌표 탐색을 쓴다.
 *   - 그림에만 있는 값(그림 5·6·8·10).
 *
 * 이 페이지가 스스로 더한 것
 *   - 지어낸 카페 예순 곳(세 무리, 가르는 특징 셋 + 잡음 다섯).
 *   - 질의가 한 걸음씩 도는 것을 눈으로 보는 것. 논문은 질의를 100회 돌려
 *     결과만 돌려주지만, 여기서는 걸음마다 무엇이 움직이는지 보인다.
 */

import type { GroupId } from '../../core/featurespace';

export const PAPER = {
  title: 'Towards More Explainable Nonlinear Dimensionality Reduction: A Feature-Driven Interaction Approach',
  authors: 'Aeri Cho, Hyeon Jeon, Kiroong Choe, Seokhyeon Park, Jinwook Seo',
  venue: 'IEEE TVCG 2026',
  affiliation: 'SNU',
  link: 'https://doi.org/10.1109/TVCG.2025.3622114',
  fullText: 'hcil.snu.ac.kr (연구실 공개본)',
  /** 쉬운 말로. 열두 살이 읽어도 통하는 문장만 쓴다. */
  plain: {
    problem: {
      ko: '자료가 특징을 여럿 가질 때, 그것을 종이 위 점으로 눌러 그리면 비슷한 것끼리 뭉쳐 보입니다. 그런데 왜 저기 뭉쳤는지는 그림만 봐서는 알 수 없습니다. 어느 특징이 저 무리를 만들었는지 그림이 말해 주지 않기 때문입니다.',
      en: 'When data has many features, squashing it onto a sheet makes similar things clump together. But the picture never says why they clumped there — it does not tell you which feature made that group.',
      ja: 'データが特徴をたくさん持つとき、それを紙の上の点に押しつぶすと似たもの同士が固まって見えます。でもなぜそこに固まったのかは絵だけでは分かりません。どの特徴がその群れを作ったかを絵は教えてくれないからです。',
    },
    work: {
      ko: '연구진은 그림과 특징을 양방향으로 이었습니다. 특징마다 손잡이를 두어 돌리면 그림이 곧바로 다시 그려지고, 반대로 "무리를 찾아 줘"라고 부탁하면 컴퓨터가 손잡이 조합을 스스로 찾아냅니다. 무리가 얼마나 또렷한지와 얼마나 섞였는지를 재는 잣대 둘도 함께 정의했습니다.',
      en: 'The authors wired the picture and the features together in both directions. Each feature gets a knob; turn it and the picture redraws at once. Ask instead for "find me clusters" and the computer searches for the knob setting itself. They also defined two measures: how distinct the clusters are, and how mixed they are.',
      ja: '研究チームは絵と特徴を双方向につなぎました。特徴ごとにつまみを置いて回すと絵がすぐ描き直され、逆に「群れを見つけて」と頼めばコンピュータがつまみの組み合わせを自分で探します。群れがどれだけくっきりしているか、どれだけ混ざっているかを測る物差しも二つ定めました。',
    },
    took: {
      ko: '이 페이지는 그 두 잣대와 세 가지 부탁을 그대로 가져왔습니다. 지어낸 카페 예순 곳의 손잡이 여덟 개를 직접 돌려 보고, 부탁을 걸면 탐색이 한 걸음씩 도는 것을 눈으로 볼 수 있습니다. 다 돌고 나면 무엇이 얼마나 움직였는지가 남습니다 - 그게 답입니다.',
      en: 'This page takes both measures and all three requests as they are. Turn the eight knobs on sixty invented cafes yourself, or ask, and watch the search walk one step at a time. When it settles, what moved and by how much is what remains — and that is the answer.',
      ja: 'このページはその二つの物差しと三つの頼みをそのまま持ってきました。作り話のカフェ六十軒のつまみ八つを自分で回してみて、頼めば探索が一歩ずつ回るのを目で見られます。回り終えると何がどれだけ動いたかが残ります - それが答えです。',
    },
    left: {
      ko: '논문이 쓴 UMAP과 그것을 흉내 낸 신경망은 가져오지 않았습니다. 브라우저 안에서 무겁고 매번 답이 달라지기 때문입니다. 대신 늘 같은 그림을 주는 가중 주성분 투영을 씁니다 - 굽은 구조는 못 잡지만, 손잡이가 그림을 바꾸는 이야기는 그대로입니다. 실제 구매 자료도 남의 것이라 싣지 않았습니다.',
      en: 'The paper’s UMAP and the neural network that imitates it are not carried over — too heavy for a browser and different every run. In their place is a weighted principal-component projection that always draws the same picture; it cannot catch curved structure, but the story of knobs reshaping the picture survives. The real purchase data is someone else’s and is not included either.',
      ja: '論文が使ったUMAPとそれを真似た神経網は持ってきませんでした。ブラウザの中では重く、毎回答えが変わるからです。代わりに常に同じ絵を返す加重主成分投影を使います - 曲がった構造は捉えられませんが、つまみが絵を変える話はそのままです。実際の購買データも他人のものなので載せていません。',
    },
  },
} as const;

/**
 * 세 무리의 색. aperture 룩의 어두운 판 위에서 실측했다(scratchpad ap):
 * 모두 surface(#1A2029) 위 APCA |Lc| >= 63.3, WCAG >= 7.79:1이고
 * bg(#12161B) 위에서도 |Lc| >= 64.5다.
 */
export const GROUP_COLORS: Record<GroupId, string> = {
  work: '#6FC5E8',
  talk: '#F4A6BE',
  takeout: '#93D97E',
};

/** 탐색이 한 걸음 도는 간격(ms). 눈이 따라갈 만큼 느리게. */
export const STEP_INTERVAL = 700;

/** 관련 페이지. 같은 투영을 다른 각도에서 보는 페이지들. */
export const RELATED_PAGES = [
  { path: '/distance', key: 'distance' },
  { path: '/projection', key: 'projection' },
] as const;
