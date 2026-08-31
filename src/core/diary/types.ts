/**
 * 일기 쓰는 사물의 자료형.
 *
 * 사물이 알 수 있는 것은 웹 페이지 안에서 관찰되는 것뿐이다 — 언제 왔고, 얼마 만에 다시 왔고,
 * 얼마나 머물렀는지. 그 좁은 관찰만으로 일기를 쓴다. 좁다는 사실 자체가 이 사물의 성격이다.
 */

export interface Localized {
  ko: string;
  en: string;
  ja: string;
}

/** 한 번의 방문에서 사물이 알아챈 것. */
export interface Observation {
  /** 이번을 포함해 몇 번째 방문인지. */
  visitCount: number;
  /** 방문한 시각(0~23). */
  hour: number;
  /** 직전 방문으로부터 흐른 시간(ms). 첫 방문이면 null. */
  sinceLast: number | null;
  /** 이번에 머문 시간(ms). */
  stay: number;
  /** 화면을 떠났다 돌아온 횟수. 다른 탭으로 갔다 온 것을 사물은 이렇게 느낀다. */
  away: number;
}

/** 사물의 기분. 관찰에서 정해지며, 일기의 말투를 바꾼다. */
export type Mood = 'curious' | 'settled' | 'lonely' | 'restless' | 'content';

/** 일기 한 줄이 어느 묶음의 몇 번째 문장인지. 글자 대신 이것을 저장한다. */
export interface FragmentRef {
  pool: string;
  index: number;
}

/** 저장되는 일기. 언어를 바꿔도 다시 읽히도록 문장 대신 자리만 담는다. */
export interface StoredEntry {
  at: number;
  mood: Mood;
  lines: FragmentRef[];
  /** 그날의 관찰. 일기 옆에 조용히 붙여 둔다. */
  visitCount: number;
}
