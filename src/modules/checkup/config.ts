/**
 * 유출 확인 페이지 설정.
 *
 * 근거가 된 연구: Understanding and Improving User Adoption and Security Awareness in
 * Password Checkup Services (Sanghak Oh, Heewon Baek, Jun Ho Huh, Taeyoung Kim, Woojin Jeon,
 * Ian Oakley, Hyoungshick Kim), CHI 2025, doi:10.1145/3706598.3713284.
 *
 * 연구진은 설문(n=238)과 사용자 연구(N=50)로 "왜 유출 확인 서비스를 안 쓰는가"를 물었다.
 * 받아들이는 데 걸린 것은 쓸모에 대한 인식, 쉬움, 그리고 **자기 효능감**이었고,
 * 알림을 받고도 비밀번호를 안 바꾸는 이유로 경보 피로와 낮은 체감 급함이 나왔다.
 * 개선안은 알림 문구를 또렷하게 하고 바꾸는 절차를 줄이는 쪽이었다.
 *
 * 이 페이지가 가져온 것
 *   - 자기 효능감: "내 비밀번호를 넘겨주는 것 아닌가"라는 의심을 **글자 단위로 보여** 지운다.
 *   - 경보 피로: 경고를 늘어놓지 않는다. 할 일은 언제나 한 줄이다.
 *   - 낮은 체감 급함: "유출됨"이라는 딱지 대신 **몇 번째 시도에서 걸리는지**를 센다.
 *
 * 가져오지 않은 것
 *   - 설문과 사용자 연구의 수치. 이 페이지는 연구를 재현하지 않는다.
 *   - 연구진이 시험한 화면 그 자체. 여기 화면은 그 발견을 따로 옮긴 것이다.
 *   - 실제 유출 목록 조회. 통신을 하지 않으므로 사전은 아래 CORPUS 하나뿐이다.
 */

export const PAPER = {
  title:
    'Understanding and Improving User Adoption and Security Awareness in Password Checkup Services',
  authors:
    'Sanghak Oh, Heewon Baek, Jun Ho Huh, Taeyoung Kim, Woojin Jeon, Ian Oakley, Hyoungshick Kim',
  venue: 'CHI 2025',
  affiliation: 'Sungkyunkwan University · KAIST · Samsung Research',
  link: 'https://doi.org/10.1145/3706598.3713284',
} as const;

/** 처음 놓여 있는 예시. 사람들이 가장 흔히 하는 손질(첫 글자 대문자 + 연도 + 느낌표)이다. */
export const INITIAL_PASSWORD = 'Sunshine2024!';

/** 눌러서 넣어 보는 예시. 각각 다른 손질을 보여 준다. */
export const SAMPLES = [
  { key: 'sample-plain', value: 'password' },
  { key: 'sample-leet', value: 'P@ssw0rd123!' },
  { key: 'sample-reversed', value: 'gnatsum' },
  { key: 'sample-long', value: 'correcthorsebatterystaple' },
] as const;

/** 목록 크기 슬라이더. 10의 거듭제곱으로 움직인다. */
export const CORPUS_SLIDER = { minExponent: 6, maxExponent: 10, step: 0.1 } as const;

/** 초를 사람이 읽는 단위로 바꿀 때의 경계. 위에서부터 처음 걸리는 것을 쓴다. */
export const DURATION_UNITS = [
  { key: 'unit-century', seconds: 3_155_760_000 },
  { key: 'unit-year', seconds: 31_557_600 },
  { key: 'unit-day', seconds: 86_400 },
  { key: 'unit-hour', seconds: 3_600 },
  { key: 'unit-minute', seconds: 60 },
  { key: 'unit-second', seconds: 1 },
] as const;

/** 이보다 짧으면 숫자를 적지 않고 '눈 깜짝할 사이'라고 적는다. */
export const INSTANT_SECONDS = 1;

/** 해시를 화면에 늘어놓을 때 한 덩이의 길이. 눈으로 자리를 세기 좋은 크기다. */
export const HASH_GROUP = 5;
