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

/**
 * 숫자가 말이 되는 방식.
 *
 * 코드집은 낱말 목록이 아니라 규칙이 있는 언어였다. 아래 다섯 가지가 그 규칙이며,
 * 각 항목의 reason에 적힌 설명이 어느 규칙에 속하는지를 rule이 가리킨다.
 * 규칙을 알면 코드집에 없는 숫자도 읽을 수 있다 — 그것이 이 언어가 퍼진 방법이다.
 */
export type ReadingRule = 'sound' | 'place' | 'letter' | 'shape' | 'omen';

export interface CodebookEntry {
  digits: string;
  /** 뜻. 숫자를 말로 옮길 때와, 말을 숫자로 옮길 때 양방향으로 쓴다. */
  meaning: { ko: string; en: string; ja: string };
  /** 왜 그렇게 읽히는지. 이 설명이 이 페이지의 재미다. */
  reason: { ko: string; en: string; ja: string };
  /** 이 항목이 기대고 있는 읽기 규칙. reason에 적힌 방식을 그대로 분류한 것이다. */
  rule: ReadingRule;
}

/**
 * 읽기 규칙의 표. 화면에 보이는 순서이기도 하다.
 *
 * 흔한 것부터 둔다. 소리로 읽는 방식이 코드집의 대부분이고, 나머지는 그 방식이 막힐 때 쓰였다.
 * 설명에 담은 것은 "어떻게 읽는가"만이 아니라 "왜 그렇게 읽어도 통했는가"다.
 * 받는 사람이 상황을 이미 알고 있었기 때문에, 소리는 닮기만 하면 됐다.
 */
export const READING_RULES: readonly {
  id: ReadingRule;
  name: { ko: string; en: string; ja: string };
  note: { ko: string; en: string; ja: string };
}[] = [
  {
    id: 'sound',
    name: { ko: '소리로 읽기', en: 'Read it aloud', ja: '音で読む' },
    note: {
      ko: '숫자를 한자음으로 읽으면 음절이 하나씩 나온다. 팔이팔이 → 빨리빨리. 음절 수만 맞으면 말의 골격이 남으므로, 소리가 정확히 같지 않아도 통했다. 코드집의 대부분이 이 방식이다.',
      en: 'Read each digit in its Sino-Korean sound and you get one syllable each: pal-i-pal-i becomes ppalli-ppalli. Matching the syllable count kept the skeleton of the phrase, so it never had to sound exact. Most of the codebook works this way.',
      ja: '数字を漢字音で読むと音節が一つずつ出る。パリパリ → 早く早く。音節の数さえ合えば言葉の骨格が残るので、正確に同じ音である必要はなかった。コードの大半がこの方式である。',
    },
  },
  {
    id: 'place',
    name: { ko: '수로 읽기', en: 'Read it as a number', ja: '数として読む' },
    note: {
      ko: '자릿수를 살려 수 그대로 읽는다. 1004는 일공공사가 아니라 천사(1000+4)다. 숫자 네 자리에 두 음절을 담을 수 있어, 자릿수가 귀하던 화면에서 값이 컸다.',
      en: 'Keep the place value and read the number itself: 1004 is not il-gong-gong-sa but cheon-sa (1000 + 4). Two syllables in four digits went a long way on a screen where every digit counted.',
      ja: '桁を生かして数のまま読む。1004 は일공공사ではなく천사（1000+4）。四桁に二音節を収められるので、桁数の限られた画面では価値が大きかった。',
    },
  },
  {
    id: 'letter',
    name: { ko: '남의 말소리로 읽기', en: 'Borrow another language', ja: '他の言語の音で読む' },
    note: {
      ko: '한국어 밖의 소리를 끌어와 붙인다. 9는 굿(good)이 되고, 100(백)은 백(back)이 된다. 영어가 일상으로 들어오던 시기의 흔적이다.',
      en: 'Pull in a sound from outside Korean: 9 becomes "good", 100 (baek) becomes "back". A trace of the years English was working its way into daily speech.',
      ja: '韓国語の外から音を借りてくる。9 はグッド（good）、100（백）はバック（back）になる。英語が日常に入ってきた時期の痕跡である。',
    },
  },
  {
    id: 'shape',
    name: { ko: '모양으로 읽기', en: 'Read the shape', ja: '形で読む' },
    note: {
      ko: '소리를 버리고 액정에 뜬 생김새를 본다. 505는 읽는 것이 아니라 보는 것이다. 드물지만, 숫자만 보낼 수 있는 화면에서 나올 수 있는 가장 그림에 가까운 방식이었다.',
      en: 'Drop the sound and look at the shape on the screen. 505 is not read, it is seen. Rare — but on a screen that could only carry digits, this was as close to a picture as anyone could get.',
      ja: '音を捨てて液晶に出た形を見る。505 は読むものではなく見るものだ。まれではあるが、数字しか送れない画面で最も絵に近い方式だった。',
    },
  },
  {
    id: 'omen',
    name: { ko: '뜻으로 읽기', en: 'Use what the number already means', ja: '意味で読む' },
    note: {
      ko: '숫자에 이미 붙어 있던 뜻을 그대로 쓴다. 9는 오래전부터 행운의 수였고, 그래서 9999는 읽지 않아도 뜻이 전해졌다.',
      en: 'Use the meaning the number already carried. Nine had long been a lucky number, so 9999 arrived without needing to be read at all.',
      ja: '数字にもともと付いていた意味をそのまま使う。9 は古くから幸運の数で、9999 は読まなくても意味が届いた。',
    },
  },
];

export const CODEBOOK: readonly CodebookEntry[] = [
  {
    digits: '1004',
    meaning: { ko: '천사', en: 'angel', ja: '天使' },
    reason: { ko: '천(1000)과 사(4)를 붙여 읽는다', en: 'one thousand plus four reads as cheonsa', ja: '千(1000)と四(사)を続けて読む' },
    rule: 'place',
  },
  {
    digits: '8282',
    meaning: { ko: '빨리빨리', en: 'hurry up', ja: '早く早く' },
    reason: { ko: '팔이팔이 → 빨리빨리', en: 'pal-i pal-i sounds like ppalli ppalli', ja: 'パリパリ → 早く早く' },
    rule: 'sound',
  },
  {
    digits: '8253',
    meaning: { ko: '빨리 오세요', en: 'come quickly', ja: '早く来て' },
    reason: { ko: '팔이오삼 → 빨리 오세', en: 'pal-i-o-sam sounds like ppalli ose', ja: 'パリオサム → 早く来て' },
    rule: 'sound',
  },
  {
    digits: '8255',
    meaning: { ko: '빨리 만나', en: 'let us meet soon', ja: '早く会おう' },
    reason: { ko: '팔이오오 → 빨리 오오, 어서 보자는 뜻', en: 'pal-i-o-o — come quickly, let us meet', ja: 'パリオオ → 早く来て会おう' },
    rule: 'sound',
  },
  {
    digits: '2255',
    meaning: { ko: '이리 와라', en: 'come here', ja: 'こっちへおいで' },
    reason: { ko: '이이오오 → 이리 와라', en: 'i-i-o-o sounds like iri wara', ja: 'イイオオ → こっちへ' },
    rule: 'sound',
  },
  {
    digits: '175',
    meaning: { ko: '일어나', en: 'wake up', ja: '起きて' },
    reason: { ko: '일칠오 → 일어나', en: 'il-chil-o sounds like ireona', ja: 'イルチルオ → 起きて' },
    rule: 'sound',
  },
  {
    digits: '178',
    meaning: { ko: '일찍 와', en: 'come early', ja: '早めに来て' },
    reason: { ko: '일칠팔 → 일찍 와', en: 'il-chil-pal sounds like iljjik-wa', ja: 'イルチルパル → 早く来て' },
    rule: 'sound',
  },
  {
    digits: '486',
    meaning: { ko: '사랑해', en: 'I love you', ja: '愛してる' },
    reason: { ko: '사팔육을 빠르게 읽으면 사랑해에 가까워진다. 삐삐 시절 가장 널리 쓰인 고백', en: 'sa-pal-yuk said quickly lands near saranghae — the best known confession of the era', ja: 'サパルユクを速く読むと사랑해に近い。当時最も知られた告白' },
    rule: 'sound',
  },
  {
    digits: '4486',
    meaning: { ko: '죽도록 사랑해', en: 'I love you to death', ja: '死ぬほど愛してる' },
    reason: { ko: '사사(44)를 앞에 붙여 486을 강하게 만든 것', en: '44 in front intensifies 486', ja: '44を前に付けて486を強めた形' },
    rule: 'sound',
  },
  {
    digits: '7942',
    meaning: { ko: '친구 사이', en: 'just friends', ja: 'ただの友達' },
    reason: { ko: '칠구사이 → 친구사이', en: 'chil-gu-sa-i sounds like chingu sai', ja: 'チルグサイ → 友達同士' },
    rule: 'sound',
  },
  {
    digits: '7179',
    meaning: { ko: '친한 친구', en: 'close friend', ja: '親友' },
    reason: { ko: '칠일칠구 → 친한친구', en: 'chil-il-chil-gu sounds like chinhan chingu', ja: 'チルイルチルグ → 親友' },
    rule: 'sound',
  },
  {
    digits: '7142',
    meaning: { ko: '친한 사이', en: 'close relationship', ja: '親しい仲' },
    reason: { ko: '칠일사이 → 친한사이', en: 'chil-il-sa-i sounds like chinhan sai', ja: 'チルイルサイ → 親しい仲' },
    rule: 'sound',
  },
  {
    digits: '0404',
    meaning: { ko: '영원히 사랑해', en: 'love you forever', ja: '永遠に愛してる' },
    reason: { ko: '영사(04)를 두 번 겹쳐 영원히 사랑한다는 뜻', en: 'zero-four twice: yeong(0) sa(4) — forever love', ja: '영사(04)を二度重ねて永遠の愛' },
    rule: 'sound',
  },
  {
    digits: '0242',
    meaning: { ko: '연인 사이', en: 'a couple', ja: '恋人同士' },
    reason: { ko: '영이사이 → 연인사이', en: 'yeong-i-sa-i sounds like yeonin sai', ja: 'ヨンイサイ → 恋人同士' },
    rule: 'sound',
  },
  {
    digits: '1010235',
    meaning: { ko: '열렬히 사모', en: 'I admire you passionately', ja: '熱烈に慕う' },
    reason: { ko: '열(10)열(10)이삼오 → 열렬히 사모. 천천히 사랑해로 읽었다는 사람도 많다', en: 'ten-ten-two-three-five; some read it instead as "love you slowly"', ja: '十十二三五 → 熱烈に慕う。「ゆっくり愛して」と読む人もいた' },
    rule: 'place',
  },
  {
    digits: '2848',
    meaning: { ko: '이판사판', en: 'all or nothing', ja: '一か八か' },
    reason: { ko: '이팔사팔 → 이판사판', en: 'i-pal-sa-pal sounds like ipan sapan', ja: 'イパルサパル → 一か八か' },
    rule: 'sound',
  },
  {
    digits: '2626',
    meaning: { ko: '이륙 이륙', en: 'on my way', ja: '出発する' },
    reason: { ko: '이(2)륙(6)을 두 번. 지금 출발한다는 뜻', en: 'i(2) ryuk(6) twice — taking off now', ja: '이(2)륙(6)を二度。今出発する' },
    rule: 'sound',
  },
  {
    digits: '981',
    meaning: { ko: '굿바이', en: 'goodbye', ja: 'さようなら' },
    reason: { ko: '구(9)를 굿으로, 팔일(81)을 바이로 읽는다', en: 'nine reads as "good", eight-one as "bye"', ja: '9をグッド、81をバイと読む' },
    rule: 'letter',
  },
  {
    digits: '952',
    meaning: { ko: '굿모닝', en: 'good morning', ja: 'おはよう' },
    reason: { ko: '구(9)를 굿으로 읽는 같은 방식. 유래에는 여러 설이 있다', en: 'same trick: nine as "good"; several origin stories exist', ja: '9をグッドと読む同じ方式。由来には諸説ある' },
    rule: 'letter',
  },
  {
    digits: '9090',
    meaning: { ko: '고고', en: 'go go', ja: 'ゴーゴー' },
    reason: { ko: '구공구공을 빠르게 읽으면 고고', en: 'gu-gong said quickly becomes "go"', ja: 'クゴンを速く読むとゴー' },
    rule: 'sound',
  },
  {
    digits: '9999',
    meaning: { ko: '행운을 빌어', en: 'good luck', ja: '幸運を祈る' },
    reason: { ko: '구(9)를 행운의 숫자로 여겨 네 번 겹쳤다', en: 'nine repeated four times as a lucky number', ja: '9を幸運の数として四度重ねた' },
    rule: 'omen',
  },
  {
    digits: '505',
    meaning: { ko: 'SOS', en: 'SOS', ja: 'SOS' },
    reason: { ko: '숫자 모양이 SOS를 닮았다', en: 'the shape of the digits looks like SOS', ja: '数字の形が SOS に似ている' },
    rule: 'shape',
  },
  {
    digits: '100',
    meaning: { ko: '백(빽)', en: 'call me back', ja: 'かけ直して' },
    reason: { ko: '백 → 빽, 되돌려 달라는 뜻', en: 'baek sounds like "back" — call me back', ja: '百（ペク）→ バック' },
    rule: 'letter',
  },
];

/**
 * 유니코드에 담긴 한글 음절의 수.
 *
 * 한글 음절 블록(U+AC00 가 ~ U+D7A3 힣)의 크기이며, 계산으로 확인할 수 있는 값이다.
 * 이 수를 두는 이유는 하나다 — 숫자로 지나갈 수 있는 글자가 몇이나 되는지를 견주기 위해서다.
 * (일상에서 실제로 쓰이는 음절은 이보다 훨씬 적지만, 그 수는 세는 기준마다 달라 여기 적지 않는다.)
 */
export const HANGUL_SYLLABLE_COUNT = 0xd7a3 - 0xac00 + 1;

/**
 * 한 번에 보낼 수 있는 자릿수.
 * 실제 기기마다 달랐지만, 짧다는 사실 자체가 이 체험의 핵심이라 넉넉하지 않게 잡았다.
 */
export const MAX_DIGITS = 20;

/** 해독할 때 보여 줄 최대 후보 수. 조합이 많아지면 화면이 의미를 잃는다. */
export const MAX_SEGMENTATIONS = 12;
