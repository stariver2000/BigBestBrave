/**
 * 일기 쓰는 사물 페이지 설정.
 *
 * 근거가 된 연구: Living Alongside Areca — Exploring Human Experiences with Things Expressing
 * Thoughts and Emotions (Sueun Jang, Youngseok Seo, Woohyeok Choi, Uichin Lee, KAIST), ACM CHI 2025.
 *
 * 연구진은 일기를 쓰는 공기청정기를 여덟 사람의 집에 3주간 두고 매주 인터뷰했다.
 * 생각과 감정과 의도를 표현하는 사물은 기능을 넘어선 행위자로 인식되었고,
 * 어떤 이는 시간이 지나며 정이 들었고 어떤 이는 시들해졌다.
 *
 * 이 페이지는 그 실험을 재현하지 않는다. 대신 그 자리를 웹에 옮긴다 —
 * 쓸모는 없고, 당신을 알아차리고, 그것을 적는 사물 하나를 놓아 둔다.
 * 3주의 동거는 여러 번의 방문으로 대신한다. 정이 들지 시들해질지는 여기서도 갈릴 것이다.
 */

export const PAPER = {
  title: 'Living Alongside Areca: Exploring Human Experiences with Things Expressing Thoughts and Emotions',
  authors: 'Sueun Jang, Youngseok Seo, Woohyeok Choi, Uichin Lee',
  venue: 'ACM CHI 2025',
  affiliation: 'KAIST',
  doi: 'https://doi.org/10.1145/3706598.3713228',
  /**
   * 쉬운 말로. 열두 살이 읽어도 통하는 문장만 쓴다.
   * 논문이 무슨 말을 하려는 것인지 먼저 전하고, 이 페이지가 어디까지 가져왔는지를 밝힌다.
   */
  plain: {
    problem: {
      ko: '물건이 생각과 마음을 말하기 시작하면 우리는 그것을 어떻게 대할까요? 공기청정기가 \'오늘은 이런 기분이었다\'고 적어 둔다면, 그건 여전히 그냥 기계일까요?',
      en: 'What happens when a thing starts telling you its thoughts and feelings? If an air purifier wrote down how its day felt, would it still be just an appliance?',
      ja: '物が考えや気持ちを話し始めたら、私たちはそれをどう扱うでしょうか。空気清浄機が「今日はこんな気分だった」と書き残したら、それはまだただの機械でしょうか。',
    },
    work: {
      ko: '연구진은 일기를 쓰는 공기청정기를 여덟 사람의 집에 3주 동안 두고, 매주 무엇을 느꼈는지 물었습니다. 어떤 사람은 정이 들었고, 어떤 사람은 시들해졌습니다.',
      en: 'They placed a diary-writing air purifier in eight homes for three weeks and asked each week what it felt like. Some people grew attached; for others the feeling faded.',
      ja: '研究者は日記を書く空気清浄機を八人の家に三週間置き、毎週どう感じたかを聞きました。情がわいた人もいれば、冷めていった人もいました。',
    },
    took: {
      ko: '그 자리를 웹으로 옮겼습니다. 쓸모는 없지만 당신을 알아차리고 그것을 적어 두는 사물 하나. 3주의 동거는 여러 번의 방문으로 대신합니다.',
      en: 'The situation, moved onto the web: one thing with no use, which notices you and writes it down. Three weeks of living together become several visits.',
      ja: 'その状況をウェブに移しました。役には立たないが、あなたに気づいて書き留める物が一つ。三週間の同居は何度かの訪問で置き換えます。',
    },
    left: {
      ko: '여덟 사람의 인터뷰와 3주의 생활은 옮길 수 없습니다. 이 페이지는 연구를 재현하지 않고, 그 자리만 다시 만들어 둡니다.',
      en: 'Eight people\'s interviews and three weeks of living cannot be ported. This page does not reproduce the study; it only rebuilds the situation.',
      ja: '八人のインタビューと三週間の生活は移せません。このページは研究を再現せず、その状況だけを作り直します。',
    },
  },
} as const;

/**
 * 기억이 담기는 자리.
 *
 * 이 기억은 당신의 기기에만 있다. 서버로 가지 않으므로 다른 기기에서는 이 사물이 당신을 모른다.
 * 사물이 한 자리에 놓여 있다는 뜻이기도 하다.
 */
export const STORAGE_KEY = 'bbb.areca.v1';

/** 머문 시간을 다시 재는 간격(ms). 이 사물은 초를 세지 않으므로 성기게 본다. */
export const TICK_MS = 5000;

/** 사물의 몸 크기(px). */
export const BODY = { width: 168, height: 340 } as const;

/**
 * 기기 화면에 비치는 줄 수.
 * 전자잉크 화면은 작아서 일기가 다 들어가지 않는다. 그 사실을 감추지 않고,
 * 앞부분만 보이게 두고 온전한 일기는 아래 칸에서 읽게 한다.
 */
export const EPAPER_LINES = 3;
