/**
 * CSCW 2024 Chillbot에서 옮겨 적은 자리.
 *
 * 근거: Joseph Seering (KAIST), Manas Khadka, Nava Haghighi, Tanya Yang, Zachary Xi,
 * Michael Bernstein (Stanford). "Chillbot: Content Moderation in the Backchannel."
 * PACM HCI (CSCW 2024), doi:10.1145/3686941. 전문은 MIT DSpace의 공개본으로 읽었다.
 *
 * 옮긴 것: 표 1(네 가지 기본 귓속말 - 도구의 설계물이라 옮겨도 된다), 표 2(열한 서버의
 * 사용 기록 전체), 5.2절의 귓속말별 사용 수(86건의 분할), 5.3절의 결과 분할(48/30/8과
 * 그 세부), 형성 면접 8명, 그리고 값을 매겨 등록한 사례 86건이라는 셈.
 * 표 3(실제 댓글 사례)은 옮기지 않았다 - 남의 대화 기록이다.
 *
 * 부호와 방향: nudges는 그 서버에서 보낸 귓속말 수, days는 쓴 날수다.
 * 많다고 좋은 것이 아니다 - 서버마다 크기와 규범이 다르다.
 */

/** 표 1의 네 가지 기본 귓속말. text는 도구가 보내는 원문 그대로다. */
export type NudgeId = 'gentleWarning' | 'violation' | 'offTopic' | 'nsfw';

export interface Nudge {
  id: NudgeId;
  /** 도구의 영문 원문. 설계물이라 그대로 둔다. */
  text: string;
  /** 등록된 86건 가운데 이 귓속말이 쓰인 수(5.2절). */
  catalogedUses: number;
}

export const NUDGES: readonly Nudge[] = [
  {
    id: 'gentleWarning',
    text: "A message you posted has caught the attention of the moderators. [Link to Conversation]. Though you haven't explicitly broken a rule, please take care to make sure that your future messages stay within the community guidelines, and help us keep the discussion civil and constructive.",
    catalogedUses: 25,
  },
  {
    id: 'violation',
    text: 'A message you posted has been flagged because it violates a norm or convention for posting in this server. [Link to Conversation]. Please consider pausing to get to know the expectations better before continuing.',
    catalogedUses: 31,
  },
  {
    id: 'offTopic',
    text: 'A message you posted has been flagged as off-topic for the channel where it was posted. [Link to Conversation]. The message does not explicitly violate any rules so it will not be removed, but please take care in the future to find the best channel to put this type of message.',
    catalogedUses: 18,
  },
  {
    id: 'nsfw',
    text: 'A message you posted has been flagged as borderline NSFW. [Link to Conversation]. Please be careful to keep NSFW content only to approved channels.',
    catalogedUses: 12,
  },
];

/** 표 2. 열한 서버의 사용 기록. */
export interface ServerRow {
  wave: 1 | 2;
  server: number;
  category: string;
  members: number;
  nudges: number;
  days: number;
}

export const SERVERS: readonly ServerRow[] = [
  { wave: 1, server: 1, category: 'Gaming', members: 650, nudges: 3, days: 14 },
  { wave: 1, server: 2, category: 'Gaming', members: 20000, nudges: 13, days: 14 },
  { wave: 1, server: 3, category: 'Gaming', members: 5300, nudges: 166, days: 145 },
  { wave: 1, server: 4, category: 'Web Development', members: 37000, nudges: 43, days: 192 },
  { wave: 1, server: 5, category: 'Remote Work', members: 150, nudges: 1, days: 14 },
  { wave: 1, server: 6, category: 'Community Management', members: 25, nudges: 2, days: 14 },
  { wave: 2, server: 7, category: 'Professional Development', members: 25000, nudges: 84, days: 36 },
  { wave: 2, server: 8, category: 'Gaming', members: 700, nudges: 12, days: 52 },
  { wave: 2, server: 9, category: 'Anime', members: 6500, nudges: 64, days: 14 },
  { wave: 2, server: 10, category: 'Anime', members: 240000, nudges: 59, days: 71 },
  { wave: 2, server: 11, category: 'Gaming', members: 150000, nudges: 19, days: 29 },
];

/** 연구의 크기. */
export const STUDY = {
  formativeInterviews: 8,
  servers: 11,
  waves: 2,
  /** 연구가 요구한 최소 사용 기간(일). */
  minDays: 14,
  /** 값을 매겨 등록한 사례 수(서버 7, 9, 11에서). */
  cataloged: 86,
  catalogedServers: [7, 9, 11],
} as const;

/**
 * 5.3절. 등록된 사례의 결과 분할.
 *
 * 48(조용히 멎음) + 30(눈에 보이게 좋아짐) + 8(나빠짐) = 86으로 등록 사례 총계와
 * 정확히 맞는다. 그런데 본문은 나빠진 8건을 "8 of the 84 cases"라고 적었다 -
 * 세 분할의 합이 86이므로 84 쪽이 잘못 적힌 것으로 보인다. 고치지 않고 붙들어 둔다.
 */
export const OUTCOMES = {
  silent: 48,
  visiblyPositive: 30,
  negative: 8,
  negativeDetail: { mocked: 3, ignored: 4, leftServer: 1 },
  /** 본문이 나빠진 사례를 셀 때 쓴 분모 표기. 86이어야 앞뒤가 맞는다. */
  proseDenominator: 84,
} as const;
