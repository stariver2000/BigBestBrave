/**
 * 팔레트 내보내기 설정.
 *
 * 변수 접두사·트랙 이름·포맷 목록을 여기 모아 둔다. 다른 페이지가 같은 내보내기를 쓰되
 * 접두사만 바꾸고 싶을 때 이 표를 넘겨 덮어쓴다.
 */

export const EXPORT_FORMATS = ['css', 'scss', 'json', 'tailwind', 'svg'] as const;

export type ExportFormat = (typeof EXPORT_FORMATS)[number];

/** 조화 트랙(시드로부터의 회전) 순서대로 붙는 역할 이름. */
export const TRACK_NAMES = [
  'primary',
  'secondary',
  'tertiary',
  'quaternary',
  'quinary',
  'senary',
] as const;

export interface ExportOptions {
  /** CSS 변수/토큰 이름 앞에 붙는 접두사. */
  prefix: string;
  /** 트랙 이름 목록. 트랙 수가 이보다 많으면 인덱스로 이어 붙인다. */
  trackNames: readonly string[];
  /** SVG 스와치 한 칸의 크기(px). */
  swatchSize: number;
}

export const DEFAULT_EXPORT_OPTIONS: ExportOptions = {
  prefix: 'color',
  trackNames: TRACK_NAMES,
  swatchSize: 64,
};
