/**
 * 개인정보 탐지·가림의 공통 자료형.
 *
 * 이 모듈은 어떤 상위 계층도 import하지 않는다. 브라우저와 서버 어디서든 같은 결과를 내야 하므로
 * DOM이나 Node API에 의존하지 않는 순수 계산만 둔다.
 */

/** 탐지기 식별자. 화면의 켜고 끄기, 통계, 다국어 라벨이 모두 이 키를 쓴다. */
export type DetectorId =
  | 'email'
  | 'phone-kr'
  | 'phone-intl'
  | 'rrn'
  | 'brn'
  | 'card'
  | 'account'
  | 'passport-kr'
  | 'ip'
  | 'secret'
  | 'coordinate';

/** 원문에서 찾아낸 한 조각. start는 포함, end는 제외다. */
export interface Match {
  detector: DetectorId;
  start: number;
  end: number;
  value: string;
}

/** 가리는 방식. */
export type MaskStyle =
  /** 전부 기호로 덮는다. 가장 안전하지만 문맥이 사라진다. */
  | 'full'
  /** 앞뒤 일부만 남긴다. 사람이 "내 것이 맞나" 확인할 수 있다. */
  | 'partial'
  /** [이메일]처럼 유형만 남긴다. */
  | 'label'
  /** [이메일#1]처럼 같은 값에 같은 번호를 준다. 문서의 관계가 보존된다. */
  | 'pseudonym';

export interface RedactionResult {
  text: string;
  matches: Match[];
  /** 탐지기별 개수. 화면의 요약 표시에 그대로 쓴다. */
  counts: Record<string, number>;
}
