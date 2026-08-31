/**
 * 자막 자료형.
 *
 * 이 모듈은 어떤 상위 계층도 import하지 않는다. 글자 폭 측정처럼 환경이 필요한 계산은
 * 함수로 주입받아, 브라우저와 테스트가 같은 코어를 쓴다.
 */

/** 원본 자막 한 덩어리. 시간은 모두 밀리초다. */
export interface Cue {
  start: number;
  end: number;
  /** 줄바꿈이 제거된 한 줄짜리 본문. 원본의 줄바꿈은 재분할 대상이므로 보존하지 않는다. */
  text: string;
}

/**
 * 이 덩어리가 왜 그 자리에서 끝났는가.
 *
 * 재분할은 점수가 가장 높은 자리를 고른다(config의 BREAK_SCORE). 어느 근거가 이겼는지를 남겨 두면
 * 화면이 "왜 하필 여기서 잘랐는지"를 사용자에게 그대로 말할 수 있다. 설명할 수 없는 자동 편집은
 * 결과를 믿기 어렵게 만든다.
 *   end — 자른 것이 아니라 말이 거기서 끝났다.
 */
export type BreakReason =
  | 'sentence-end'
  | 'pause'
  | 'clause-end'
  | 'closing-bracket'
  | 'whitespace'
  | 'character'
  | 'end';

/** 한 번에 화면에 뜨는 자막. 줄바꿈까지 확정된 상태다. */
export interface Chunk {
  start: number;
  end: number;
  lines: string[];
  /**
   * 이 덩어리의 끝을 정한 근거. 재분할이 만든 덩어리에는 항상 붙는다.
   * 품질 검사처럼 덩어리를 직접 만들어 넘기는 자리에서는 없을 수 있어 선택 항목으로 둔다.
   */
  reason?: BreakReason;
}

export type SubtitleFormat = 'srt' | 'vtt';

export interface ParseResult {
  cues: Cue[];
  format: SubtitleFormat;
  /** 해석하지 못하고 건너뛴 덩어리 수. 0이 아니면 화면이 경고를 띄운다. */
  skipped: number;
}

/** 글자 폭 측정기. 브라우저는 캔버스로, 테스트는 글자 수로 잰다. */
export type Measure = (text: string) => number;

export interface ChunkOptions {
  measure: Measure;
  /** 자막이 놓일 수 있는 최대 가로 폭(측정기와 같은 단위). */
  maxWidth: number;
  maxLines: number;
  /** 한 덩어리가 화면에 머무는 최소·최대 시간(ms). */
  minDuration: number;
  maxDuration: number;
  /** 초당 읽을 수 있는 글자 수 상한. 이 값을 넘으면 표시 시간을 늘린다. */
  maxCps: number;
  /** 이 길이 이상 비면 말이 끊긴 것으로 보고 그 자리를 우선 분할점으로 삼는다(ms). */
  pauseThreshold: number;
}

export type IssueKind = 'too-fast' | 'too-short' | 'too-long' | 'overflow' | 'overlap';

export interface QualityIssue {
  kind: IssueKind;
  /** 문제가 있는 덩어리의 인덱스. */
  index: number;
  /** 실제 값. 화면이 "몇 CPS인지"처럼 구체적으로 보여 줄 수 있게 함께 넘긴다. */
  value: number;
}
