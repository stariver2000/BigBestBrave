/**
 * 길찾기 태도 페이지 설정.
 *
 * 근거가 된 연구: Modes of Interaction with Navigation Apps (Ju Yeon Jung, Tom Steinberger,
 * Phenomenal Data Lab, KAIST), CHI 2025, doi:10.1145/3706598.3714180.
 *
 * 연구진은 서른 번의 면담에서 길찾기 앱을 대하는 방식이 셋으로 묶인다는 것을 보였다.
 * 따르기, 고치기, 켜 두기. 그리고 태도마다 무엇을 바라고 무엇에 걸리는지가 다르다고 적었다.
 *
 * 이 페이지가 가져온 것
 *   - 세 가지 태도와 그 이름.
 *   - 태도마다 얻는 것과 잃는 것이 다르다는 짜임.
 *
 * 가져오지 않은 것
 *   - 서른 번의 면담과 그 이야기, 인용.
 *   - 수치 전부. 면담 연구라 이런 값을 재지 않았다. 화면의 숫자는 여기서 지어낸 도시를
 *     지어낸 규칙으로 돌린 것이다.
 */

export const PAPER = {
  title: 'Modes of Interaction with Navigation Apps',
  authors: 'Ju Yeon Jung, Tom Steinberger',
  venue: 'CHI 2025',
  affiliation: 'KAIST',
  link: 'https://doi.org/10.1145/3706598.3714180',
  /**
   * 쉬운 말로. 열두 살이 읽어도 통하는 문장만 쓴다.
   * 논문이 무슨 말을 하려는 것인지 먼저 전하고, 이 페이지가 어디까지 가져왔는지를 밝힌다.
   */
  plain: {
    problem: {
      ko: '길찾기 앱을 쓰는 방식은 사람마다 다릅니다. 시키는 대로 그대로 가는 사람, 자기 길로 고쳐 가는 사람, 그냥 켜 두기만 하는 사람. 왜 그렇게 갈릴까요?',
      en: 'People use navigation apps in different ways: some follow it exactly, some override it with their own route, some just leave it running. Why the difference?',
      ja: 'ナビアプリの使い方は人それぞれです。言われた通りに行く人、自分の道に直す人、ただ点けておくだけの人。なぜ分かれるのでしょう。',
    },
    work: {
      ko: '서른 번의 면담에서 그 방식이 셋으로 묶인다는 것을 보였습니다 — 따르기, 고치기, 켜 두기. 그리고 방식마다 무엇을 바라고 무엇에 걸리는지가 다르다고 적었습니다.',
      en: 'Across thirty interviews they showed the ways gather into three — following, overriding, keeping it on — and that each way wants something different and trips on something different.',
      ja: '三十回の面談から、その使い方が三つにまとまることを示しました — 従う、直す、点けておく。そして方式ごとに望むものも引っかかるものも違うと述べました。',
    },
    took: {
      ko: '세 가지 태도와 그 이름, 그리고 태도마다 얻는 것과 잃는 것이 다르다는 짜임을 가져왔습니다.',
      en: 'The three stances and their names, and the shape of the idea that each gains and loses something different.',
      ja: '三つの態度とその名前、そして態度ごとに得るものと失うものが違うという組み立てを受け取りました。',
    },
    left: {
      ko: '서른 번의 면담과 그 이야기는 없습니다. 화면의 숫자는 여기서 지어낸 도시를 지어낸 규칙으로 돌린 것이지 논문의 값이 아닙니다.',
      en: 'The thirty interviews and their stories are not here. The numbers on screen come from an invented city run by invented rules, not from the paper.',
      ja: '三十回の面談もその話もありません。画面の数字は、ここで作った架空の街を架空の規則で動かしたもので、論文の値ではありません。',
    },
  },
} as const;

/** 지도 하나의 크기(px). */
export const MAP = { size: 190, pad: 18, dot: 4 } as const;

/** 가장 많이 지난 길의 굵기(px). 지난 횟수에 따라 이만큼까지 굵어진다. */
export const STROKE = { min: 1, max: 7 } as const;
