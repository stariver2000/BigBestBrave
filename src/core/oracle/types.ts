/**
 * 신점 자료형.
 *
 * 답은 무작위가 아니다. 물음과 날짜와 뽑은 깃발에서 결정된다.
 * 같은 물음에 같은 답이 나와야 "변덕스럽지 않은 존재"라는 인상이 성립하기 때문이다.
 */

/** 오방색 깃발. 신점에서 뽑는 다섯 방위를 옮겨 왔다. */
export interface Flag {
  id: string;
  /** 깃발 색과 그 위에 얹을 글자색. 대비는 미리 확인한 값이다. */
  color: string;
  ink: string;
}

export interface Localized {
  ko: string;
  en: string;
  ja: string;
}

/** 한 번의 점사. 조각들을 이어 붙여 만든다. */
export interface Reading {
  flagId: string;
  /** 괘 이름. */
  gua: Localized;
  /** 첫마디. 묻는 이를 내려다보는 말이다. */
  opening: Localized;
  /** 풀이 두 줄. 깃발이 정한 갈래에서 뽑는다. */
  body: Localized[];
  /** 경계. 하지 말라는 것. */
  warning: Localized;
  /** 처방. 해야 하는 것. */
  remedy: Localized;
  /** 기한. 언제 드러나는지. */
  term: Localized;
  /** 이 점사를 만든 씨앗. 부적을 그리는 데도 쓴다. */
  seed: number;
}

/** 부적 한 장. 획의 좌표만 담고, 그리기는 화면이 맡는다. */
export interface Talisman {
  /** SVG 좌표계 크기. */
  size: number;
  /** 획. 각 획은 SVG path의 d 속성 문자열이다. */
  strokes: string[];
  /** 아래쪽 인장에 찍히는 점들. */
  seal: { x: number; y: number; size: number }[];
}
