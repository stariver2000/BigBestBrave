/**
 * 삐삐 숫자 언어의 사전과 규칙.
 *
 * 1990년대 한국의 무선호출기는 숫자만 보낼 수 있었다. 그래서 사람들은 숫자를 소리 내어 읽어
 * 말을 만들었다. 8282를 '팔이팔이'로 읽으면 '빨리빨리'와 닮는 식이다.
 *
 * 아래 코드집은 공개된 여러 자료(무선호출기 문서와 당시를 다룬 기사들)에서 교차 확인해 모았다.
 * 담는 기준은 두 가지다.
 *   1) 왜 그렇게 읽히는지 설명할 수 있을 것. 설명을 지어내면 이 페이지의 재미가 거짓이 된다.
 *   2) 같은 숫자를 다르게 읽던 경우에는 그 사실도 함께 적을 것(1010235가 그렇다).
 * 욕설과 죽음을 뜻하던 코드는 널리 쓰였더라도 담지 않았다.
 * 완전한 목록이 아니며 지역과 시기에 따라 달랐다는 점을 화면에서도 밝힌다.
 */

/** 숫자의 한자음 읽기. 해독의 출발점이다. */
export const DIGIT_READINGS: Record<string, string> = {
  '0': '공',
  '1': '일',
  '2': '이',
  '3': '삼',
  '4': '사',
  '5': '오',
  '6': '육',
  '7': '칠',
  '8': '팔',
  '9': '구',
};

/** 글자 하나를 숫자 하나로 그대로 옮길 수 있는 경우. 뜻을 숫자로 바꿀 때 쓴다. */
export const SYLLABLE_TO_DIGIT: Record<string, string> = {
  공: '0',
  영: '0',
  일: '1',
  이: '2',
  삼: '3',
  사: '4',
  오: '5',
  육: '6',
  칠: '7',
  팔: '8',
  구: '9',
};

export interface CodebookEntry {
  digits: string;
  /** 뜻. 숫자를 말로 옮길 때와, 말을 숫자로 옮길 때 양방향으로 쓴다. */
  meaning: { ko: string; en: string; ja: string };
  /** 왜 그렇게 읽히는지. 이 설명이 이 페이지의 재미다. */
  reason: { ko: string; en: string; ja: string };
}

export const CODEBOOK: readonly CodebookEntry[] = [
  {
    digits: '1004',
    meaning: { ko: '천사', en: 'angel', ja: '天使' },
    reason: { ko: '천(1000)과 사(4)를 붙여 읽는다', en: 'one thousand plus four reads as cheonsa', ja: '千(1000)と四(사)を続けて読む' },
  },
  {
    digits: '8282',
    meaning: { ko: '빨리빨리', en: 'hurry up', ja: '早く早く' },
    reason: { ko: '팔이팔이 → 빨리빨리', en: 'pal-i pal-i sounds like ppalli ppalli', ja: 'パリパリ → 早く早く' },
  },
  {
    digits: '8253',
    meaning: { ko: '빨리 오세요', en: 'come quickly', ja: '早く来て' },
    reason: { ko: '팔이오삼 → 빨리 오세', en: 'pal-i-o-sam sounds like ppalli ose', ja: 'パリオサム → 早く来て' },
  },
  {
    digits: '8255',
    meaning: { ko: '빨리 만나', en: 'let us meet soon', ja: '早く会おう' },
    reason: { ko: '팔이오오 → 빨리 오오, 어서 보자는 뜻', en: 'pal-i-o-o — come quickly, let us meet', ja: 'パリオオ → 早く来て会おう' },
  },
  {
    digits: '2255',
    meaning: { ko: '이리 와라', en: 'come here', ja: 'こっちへおいで' },
    reason: { ko: '이이오오 → 이리 와라', en: 'i-i-o-o sounds like iri wara', ja: 'イイオオ → こっちへ' },
  },
  {
    digits: '175',
    meaning: { ko: '일어나', en: 'wake up', ja: '起きて' },
    reason: { ko: '일칠오 → 일어나', en: 'il-chil-o sounds like ireona', ja: 'イルチルオ → 起きて' },
  },
  {
    digits: '178',
    meaning: { ko: '일찍 와', en: 'come early', ja: '早めに来て' },
    reason: { ko: '일칠팔 → 일찍 와', en: 'il-chil-pal sounds like iljjik-wa', ja: 'イルチルパル → 早く来て' },
  },
  {
    digits: '486',
    meaning: { ko: '사랑해', en: 'I love you', ja: '愛してる' },
    reason: { ko: '사팔육을 빠르게 읽으면 사랑해에 가까워진다. 삐삐 시절 가장 널리 쓰인 고백', en: 'sa-pal-yuk said quickly lands near saranghae — the best known confession of the era', ja: 'サパルユクを速く読むと사랑해に近い。当時最も知られた告白' },
  },
  {
    digits: '4486',
    meaning: { ko: '죽도록 사랑해', en: 'I love you to death', ja: '死ぬほど愛してる' },
    reason: { ko: '사사(44)를 앞에 붙여 486을 강하게 만든 것', en: '44 in front intensifies 486', ja: '44を前に付けて486を強めた形' },
  },
  {
    digits: '7942',
    meaning: { ko: '친구 사이', en: 'just friends', ja: 'ただの友達' },
    reason: { ko: '칠구사이 → 친구사이', en: 'chil-gu-sa-i sounds like chingu sai', ja: 'チルグサイ → 友達同士' },
  },
  {
    digits: '7179',
    meaning: { ko: '친한 친구', en: 'close friend', ja: '親友' },
    reason: { ko: '칠일칠구 → 친한친구', en: 'chil-il-chil-gu sounds like chinhan chingu', ja: 'チルイルチルグ → 親友' },
  },
  {
    digits: '7142',
    meaning: { ko: '친한 사이', en: 'close relationship', ja: '親しい仲' },
    reason: { ko: '칠일사이 → 친한사이', en: 'chil-il-sa-i sounds like chinhan sai', ja: 'チルイルサイ → 親しい仲' },
  },
  {
    digits: '0404',
    meaning: { ko: '영원히 사랑해', en: 'love you forever', ja: '永遠に愛してる' },
    reason: { ko: '영사(04)를 두 번 겹쳐 영원히 사랑한다는 뜻', en: 'zero-four twice: yeong(0) sa(4) — forever love', ja: '영사(04)を二度重ねて永遠の愛' },
  },
  {
    digits: '0242',
    meaning: { ko: '연인 사이', en: 'a couple', ja: '恋人同士' },
    reason: { ko: '영이사이 → 연인사이', en: 'yeong-i-sa-i sounds like yeonin sai', ja: 'ヨンイサイ → 恋人同士' },
  },
  {
    digits: '1010235',
    meaning: { ko: '열렬히 사모', en: 'I admire you passionately', ja: '熱烈に慕う' },
    reason: { ko: '열(10)열(10)이삼오 → 열렬히 사모. 천천히 사랑해로 읽었다는 사람도 많다', en: 'ten-ten-two-three-five; some read it instead as "love you slowly"', ja: '十十二三五 → 熱烈に慕う。「ゆっくり愛して」と読む人もいた' },
  },
  {
    digits: '2848',
    meaning: { ko: '이판사판', en: 'all or nothing', ja: '一か八か' },
    reason: { ko: '이팔사팔 → 이판사판', en: 'i-pal-sa-pal sounds like ipan sapan', ja: 'イパルサパル → 一か八か' },
  },
  {
    digits: '2626',
    meaning: { ko: '이륙 이륙', en: 'on my way', ja: '出発する' },
    reason: { ko: '이(2)륙(6)을 두 번. 지금 출발한다는 뜻', en: 'i(2) ryuk(6) twice — taking off now', ja: '이(2)륙(6)を二度。今出発する' },
  },
  {
    digits: '981',
    meaning: { ko: '굿바이', en: 'goodbye', ja: 'さようなら' },
    reason: { ko: '구(9)를 굿으로, 팔일(81)을 바이로 읽는다', en: 'nine reads as "good", eight-one as "bye"', ja: '9をグッド、81をバイと読む' },
  },
  {
    digits: '952',
    meaning: { ko: '굿모닝', en: 'good morning', ja: 'おはよう' },
    reason: { ko: '구(9)를 굿으로 읽는 같은 방식. 유래에는 여러 설이 있다', en: 'same trick: nine as "good"; several origin stories exist', ja: '9をグッドと読む同じ方式。由来には諸説ある' },
  },
  {
    digits: '9090',
    meaning: { ko: '고고', en: 'go go', ja: 'ゴーゴー' },
    reason: { ko: '구공구공을 빠르게 읽으면 고고', en: 'gu-gong said quickly becomes "go"', ja: 'クゴンを速く読むとゴー' },
  },
  {
    digits: '9999',
    meaning: { ko: '행운을 빌어', en: 'good luck', ja: '幸運を祈る' },
    reason: { ko: '구(9)를 행운의 숫자로 여겨 네 번 겹쳤다', en: 'nine repeated four times as a lucky number', ja: '9を幸運の数として四度重ねた' },
  },
  {
    digits: '505',
    meaning: { ko: 'SOS', en: 'SOS', ja: 'SOS' },
    reason: { ko: '숫자 모양이 SOS를 닮았다', en: 'the shape of the digits looks like SOS', ja: '数字の形が SOS に似ている' },
  },
  {
    digits: '100',
    meaning: { ko: '백(빽)', en: 'call me back', ja: 'かけ直して' },
    reason: { ko: '백 → 빽, 되돌려 달라는 뜻', en: 'baek sounds like "back" — call me back', ja: '百（ペク）→ バック' },
  },
];

/**
 * 한 번에 보낼 수 있는 자릿수.
 * 실제 기기마다 달랐지만, 짧다는 사실 자체가 이 체험의 핵심이라 넉넉하지 않게 잡았다.
 */
export const MAX_DIGITS = 20;

/** 해독할 때 보여 줄 최대 후보 수. 조합이 많아지면 화면이 의미를 잃는다. */
export const MAX_SEGMENTATIONS = 12;
