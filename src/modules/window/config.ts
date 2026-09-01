/**
 * 말할 틈 페이지 설정.
 *
 * 근거가 된 연구: Less Talk, More Trust: Understanding Players' In-game Assessment of
 * Communication Processes in League of Legends (Juhoon Lee, Seoyoung Kim, Yeon Su Park,
 * Juho Kim, Jeong-woo Jang, Joseph Seering, KAIST), CHI 2025, doi:10.1145/3706598.3714226.
 *
 * 연구진은 22명이 솔로 랭크를 하는 동안 곁에서 지켜보며, 채팅·핑·이모트·투표를 쓸 때마다
 * 왜 그랬는지 물었다. 그리고 그 답들을 주제별로 묶었다. 나온 이야기는 이렇다.
 *   - 타이핑은 게임 시간을 먹는다. 치다가 멈추고, 끝내 보내지 못한 말이 많았다.
 *   - 기회의 창을 놓치면 그 정보는 영영 나가지 못한다. 판이 몇 초 만에 바뀌기 때문이다.
 *   - 관찰된 수십 번의 오브젝트 투표 가운데 세 표를 넘긴 것이 하나도 없었다.
 *   - 못 본 것이 아니라 아예 알아채지 못했다는 답이 아홉 명에게서 나왔다.
 *   - 지고 있는 사람은 팀을 이끌 자격이 없다고 여겨졌고, 본인도 그렇게 여겨 입을 다물었다.
 *   - 말이 오간다는 사실 자체가 앞으로 팀이 깨질 신호로 읽혔다. 내용이 좋아도 그랬다.
 *
 * 이 페이지가 가져온 것
 *   - 위 여섯 가지를 셈의 항으로 옮겼다. 무엇이 무엇을 좌우하는가, 그 구조만 가져왔다.
 *   - 결론의 모양: 값이 있는 말이라도 창은 몇 초뿐이고, 지고 있으면 그 창이 거의 닫힌다.
 *
 * 가져오지 않은 것
 *   - 숫자 전부. 논문은 질적 연구라 이런 값을 재지 않았다. 여기 숫자는 이 페이지가 지어냈다.
 *   - 22명의 이야기와 인용. 이 화면은 그것을 요약하지 않는다.
 *   - 실제 게임. 여기에는 게임이 없고 결정만 있다.
 */

export const PAPER = {
  title:
    "Less Talk, More Trust: Understanding Players' In-game Assessment of Communication Processes in League of Legends",
  authors: 'Juhoon Lee, Seoyoung Kim, Yeon Su Park, Juho Kim, Jeong-woo Jang, Joseph Seering',
  venue: 'CHI 2025',
  affiliation: 'KAIST',
  link: 'https://doi.org/10.1145/3706598.3714226',
} as const;

/** 처음 놓여 있는 값. */
export const INITIAL = { situation: 'objective', standing: 0.8, attention: 0.85 } as const;

/** 곡선 그림의 크기(px). */
export const PLOT = { width: 520, height: 250, pad: 42 } as const;

/** 창을 막대로 그릴 때의 최대 길이(초). 이보다 긴 창은 꽉 찬 막대로 그린다. */
export const BAR_HORIZON = 12;
