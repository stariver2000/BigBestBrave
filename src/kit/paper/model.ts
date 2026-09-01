/**
 * 논문을 쉬운 말로 옮긴 네 줄.
 *
 * 이 사이트의 페이지들은 논문 한 편씩을 근거로 삼는다. 그런데 제목과 저자만 적어 두면
 * "그래서 이 연구가 무슨 말을 하려는 건데?"에는 아무도 답하지 않는 셈이 된다.
 * 그래서 페이지마다 네 줄을 쓴다. 열두 살이 읽어도 통하는 문장만 쓴다는 것이 규칙이다.
 *
 *   problem — 연구자들이 마음에 걸려 한 것. 아직 답이 아니라 물음이다.
 *   work    — 연구가 실제로 한 일. 무엇을 만들었거나, 누구를 어떻게 살펴봤는가.
 *   took    — 이 페이지가 그중 무엇을 가져왔는가.
 *   left    — 가져오지 않은 것. 논문을 그대로 재현했다는 인상을 주지 않기 위해 반드시 적는다.
 */

import type { Locale } from '../../core/i18n';

export type Localized = Record<Locale, string>;

export interface PlainPaper {
  problem: Localized;
  work: Localized;
  took: Localized;
  left: Localized;
}

/** 네 줄에 붙는 이름표. 페이지마다 같은 말이므로 부품이 들고 있는다. */
export const PLAIN_LABELS: Record<'heading' | keyof PlainPaper, Localized> = {
  heading: {
    ko: '쉬운 말로',
    en: 'In plain words',
    ja: 'やさしい言葉で',
  },
  problem: {
    ko: '연구자들이 걸렸던 것',
    en: 'What bothered the researchers',
    ja: '研究者が気にしたこと',
  },
  work: {
    ko: '연구가 한 일',
    en: 'What the study did',
    ja: '研究がしたこと',
  },
  took: {
    ko: '이 페이지가 가져온 것',
    en: 'What this page takes from it',
    ja: 'このページが受け取ったもの',
  },
  left: {
    ko: '가져오지 않은 것',
    en: 'What it leaves behind',
    ja: '受け取らなかったもの',
  },
};
