/**
 * 유출 확인 코어의 상수. 하드코딩은 전부 여기로 모은다.
 *
 * 근거가 된 연구: Understanding and Improving User Adoption and Security Awareness in
 * Password Checkup Services (Sanghak Oh, Heewon Baek, Jun Ho Huh, Taeyoung Kim, Woojin Jeon,
 * Ian Oakley, Hyoungshick Kim), CHI 2025, doi:10.1145/3706598.3713284.
 */

/** 서버로 보내는 해시 앞부분의 길이(16진수 글자 수). 실제 서비스들이 쓰는 값이다. */
export const PREFIX_LENGTH = 5;

/** SHA-1 결과의 길이. */
export const HASH_HEX_LENGTH = 40;
export const HASH_BITS = 160;

/**
 * 확인 서비스가 들고 있다고 가정하는 해시 개수.
 *
 * 서비스마다 다르고 계속 늘기 때문에 고정값으로 두지 않는다. 화면에서 사용자가 직접 움직이고,
 * 아래는 출발점일 뿐이다. 익명 집합의 크기는 이 수에 정비례한다.
 */
export const CORPUS_SIZE = {
  min: 1_000_000,
  max: 10_000_000_000,
  initial: 1_000_000_000,
} as const;

/**
 * 공격자의 추측 속도(초당). 확정된 수치가 아니라 **가정**이다.
 *
 * offline: 유출된 해시 파일을 받아 전용 장비로 SHA-1을 돌리는 경우. SHA-1은 비밀번호 보관용으로
 *   설계된 함수가 아니라 아주 빠르다. 자릿수를 보이려고 잡은 값이다.
 * online: 로그인 창을 두드리는 경우. 잠금과 속도 제한이 걸려 이 정도로 떨어진다.
 */
export const GUESS_RATE = { offline: 1e10, online: 10 } as const;

/** 급한 정도를 가르는 시도 횟수. 이 아래면 사실상 즉시 뚫린다고 본다. */
export const URGENCY_THRESHOLD = { high: 1e9, caution: 1e14 } as const;

/**
 * 크래커가 사전 단어를 비트는 규칙의 가짓수.
 *
 * caseVariants: 소문자·첫 글자 대문자·전부 대문자 세 가지를 훑는다고 본다.
 * leetPerSlot: 바꿀 수 있는 글자마다 바꾸거나 두거나 둘 중 하나다.
 * reverse, repeat: 규칙을 켜고 끄는 두 가지.
 * digitSpace, symbolSpace: 뒤에 붙이는 글자 한 자리가 가질 수 있는 값의 수.
 */
export const BRANCHING = {
  caseVariants: 3,
  leetPerSlot: 2,
  reverse: 2,
  repeat: 2,
  digitSpace: 10,
  symbolSpace: 33,
  letterSpace: 26,
} as const;

/**
 * 크래커가 쓰는 글자 바꿔치기 표. 왼쪽이 비밀번호에 적힌 글자, 오른쪽이 원래 글자다.
 * 사전 단어를 이 표로 되돌려 놓고 맞춰 본다.
 */
export const LEET_MAP: Readonly<Record<string, string>> = {
  '0': 'o',
  '1': 'i',
  '3': 'e',
  '4': 'a',
  '5': 's',
  '7': 't',
  '8': 'b',
  '9': 'g',
  '@': 'a',
  '$': 's',
  '!': 'i',
  '+': 't',
  '|': 'l',
};

/** 뒤나 앞에 덧붙은 것으로 볼 글자. */
export const AFFIX_PATTERN = /[^a-zA-Z]/;

/**
 * 빈도 순으로 늘어놓은 유출 단어 사전.
 *
 * 공개된 유출 목록에서 늘 위쪽에 있는 것들이다. 실제 서비스는 수억 개를 들고 있고 여기 있는 건
 * 그 앞머리뿐이다. **여기 없다고 안전한 것이 아니다** — 화면에서도 그렇게 적는다.
 */
export const CORPUS: readonly string[] = [
  '123456', 'password', '123456789', '12345678', '12345', 'qwerty', '111111',
  '1234567', '123123', 'abc123', '1234567890', '1234', 'iloveyou', '000000',
  'admin', 'letmein', 'monkey', 'dragon', 'sunshine', 'princess', 'football',
  'welcome', 'shadow', 'master', 'qwertyuiop', '654321', 'superman', '1qaz2wsx',
  '7777777', '121212', 'baseball', 'michael', 'jordan', 'harley', 'ranger',
  'hunter', 'buster', 'soccer', 'hockey', 'killer', 'george', 'andrew',
  'charlie', 'michelle', 'jessica', 'pepper', 'daniel', 'access', 'computer',
  'amanda', 'summer', 'ashley', 'bailey', 'trustno1', 'batman', 'freedom',
  'whatever', 'matrix', 'secret', 'angel', 'ginger', 'flower', 'cookie',
  'chicken', 'banana', 'orange', 'purple', 'silver', 'hello', 'samsung',
  'google', 'facebook', 'internet', 'starwars', 'pokemon', 'minecraft',
  'naruto', 'thomas', 'robert', 'william', 'jennifer', 'nicole', 'hannah',
  'taylor', 'joshua', 'andrea', 'maggie', 'tigger', 'chelsea', 'diamond',
  'yellow', 'dallas', 'austin', 'thunder', 'cowboy', 'nascar', 'phoenix',
  'mustang', 'corvette', 'ferrari', 'mercedes', 'guitar', 'rangers', 'yankees',
  'eagles', 'steelers', 'lakers', 'chicago', 'boston', 'london', 'canada',
  'mexico', 'korea', 'seoul', 'asdfgh', 'zxcvbnm', 'qazwsx', '1q2w3e4r',
  'aaaaaa', 'abcdefg', 'changeme', 'default', 'temp', 'test', 'user', 'root',
  'oracle', 'server', 'system', 'love', 'happy', 'winter', 'spring', 'autumn',
];
