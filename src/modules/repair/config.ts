/**
 * 회복 페이지 설정.
 *
 * 근거가 된 연구: The Design Space for Online Restorative Justice Tools:
 * A Case Study with ApoloBot (Bich Ngoc (Rubi) Doan, Joseph Seering, KAIST),
 * CHI 2025. 전문은 arXiv:2502.18861v1 로 읽었다.
 *
 * 이 페이지가 가져온 것
 *   - 5장의 기회 공간. 어떤 공동체에서(Where), 어떤 운영 방식으로(How),
 *     어떤 상황에서(When) 회복적 도구가 통하는가. 여덟 개의 축과 각 축의 양 끝,
 *     그리고 어느 쪽 끝이 왜 안 맞는지.
 *   - 4.2절의 깔때기. 16명이 1단계에 들어와 6명이 배포했고 2명이 실제로 썼다.
 *   - 6.2절이 밝힌 아직 모르는 것. 중간에 그만둔 사과가 무엇을 남기는지.
 *
 * 가져오지 않은 것
 *   - 숫자 전부. 이 논문은 질적 연구라 축에 눈금이 없다. 그래서 이 화면에도 점수가 없고
 *     세 갈래 판정과 셈만 있다. 몇 점 같은 것을 만들면 논문에 없는 저울을 세우는 일이 된다.
 *   - 표 1의 참가자 인적사항. 열여섯 명의 서버 종류와 규모가 적혀 있지만, 남의 공동체를
 *     여기 옮겨 오지 않는다.
 *   - ApoloBot의 화면과 명령어 그림. 그림에만 실린 것이다.
 *
 * 이 페이지가 스스로 더한 것
 *   - 다섯 자리를 세 갈래에 붙이는 규칙. 논문은 '가운데가 좋다', '유연한 쪽이 좋다'까지만
 *     말했지 그 사이 칸이 어떻다고 말하지 않았다. 규칙은 코어에 적어 두었다.
 *   - 여덟 축 가운데 넷이 가운데에서 봉우리를 이룬다는 것을 세어 앞에 내놓은 것.
 *     논문은 축마다 따로 말했을 뿐 넷이라고 세지 않았다.
 */

export const PAPER = {
  title: 'The Design Space for Online Restorative Justice Tools: A Case Study with ApoloBot',
  authors: 'Bich Ngoc (Rubi) Doan, Joseph Seering',
  venue: 'CHI 2025',
  affiliation: 'KAIST',
  link: 'https://arxiv.org/abs/2502.18861',
  fullText: 'arXiv:2502.18861v1',
} as const;

/**
 * 첫 화면의 기본값.
 *
 * 축은 모두 가운데에 둔다. 가운데에 두면 봉우리 축 넷이 맞고 기운 축 넷이 가장자리가 되어,
 * 이 화면이 하려는 말이 첫 화면에서 바로 보인다. 공동체 갈래는 거친 곳으로 둔다 -
 * 쓸 일은 가장 많지만 효과는 가장 낮다고 논문이 적은, 가장 말이 많은 자리다.
 */
export const DEFAULT_FOCUS = 'toxic' as const;
