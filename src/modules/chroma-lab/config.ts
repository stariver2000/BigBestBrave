/**
 * Chroma Lab 페이지 설정.
 *
 * 이 페이지의 모든 기본값·목록·문턱값은 여기에만 있다. UI 파일에는 숫자를 두지 않는다.
 * 다른 페이지가 같은 도구를 다른 기본값으로 쓰고 싶으면 이 파일을 복제해 넘기면 된다.
 */

import type { HarmonyKind } from '../../core/color';
import type { ExportFormat } from '../../kit';

/** 처음 열었을 때의 시드 색. 특성(분위기)에서 파생한 강조색과 같은 계열로 골랐다. */
export const DEFAULT_SEED = '#4f46e5';

export const DEFAULT_HARMONY: HarmonyKind = 'triad';

/** UI에 노출할 조화 규칙. 전체 목록 중 실무에서 자주 쓰는 것만 고른다. */
export const HARMONY_CHOICES: readonly HarmonyKind[] = [
  'mono',
  'analogous',
  'complementary',
  'split-complementary',
  'triad',
  'tetrad',
];

/** 색각 이상 시뮬레이션의 기본 중증도(0~1). */
export const DEFAULT_CVD_SEVERITY = 1;

export const DEFAULT_EXPORT_FORMAT: ExportFormat = 'css';

/** 내보내기 변수 접두사. 프로젝트마다 다르므로 사용자가 바꿀 수 있게 입력을 제공한다. */
export const DEFAULT_EXPORT_PREFIX = 'color';

/** 대비 검사에서 기본으로 선택되는 단계. 밝은 배경 + 진한 글자. */
export const DEFAULT_CONTRAST_PAIR = { text: 700, background: 50 } as const;

/**
 * 대비 판정에 쓰는 APCA 문턱값.
 * 값의 근거는 APCA 실무 가이드의 최소 권장선이며, 페이지 특성의 contrast-policy와 별개로
 * 이 도구 자체가 사용자에게 보여 주는 기준이다.
 */
export const APCA_THRESHOLDS = { body: 75, large: 60, ui: 45 } as const;

/** 미리보기 샘플 텍스트의 크기(px)와 굵기. 세 종류만 보여 준다. */
export const PREVIEW_SAMPLES = [
  { key: 'body', size: 16, weight: 400 },
  { key: 'large', size: 24, weight: 500 },
  { key: 'display', size: 40, weight: 700 },
] as const;

/** 팔레트 이름 짓기에 LLM을 쓸 때의 호출 조건. LLM이 없으면 결정론적 이름으로 대체된다. */
export const NAMING = {
  temperature: 0.8,
  maxTokens: 60,
  /** 응답에서 이 길이를 넘는 부분은 잘라낸다. 모델이 설명을 덧붙이는 것을 막기 위함. */
  maxNameLength: 40,
} as const;

/**
 * 결정론적 색 이름 어휘.
 * 색상환을 12구간으로 나누고 구간마다 이름을 붙인다. LLM이 없을 때도 팔레트에 이름이 생긴다.
 * 각 항목은 [ko, en, ja] 순서다.
 */
export const HUE_NAMES: readonly (readonly [string, string, string])[] = [
  ['진홍', 'Crimson', '深紅'],
  ['주홍', 'Vermilion', '朱'],
  ['호박', 'Amber', '琥珀'],
  ['황금', 'Gold', '黄金'],
  ['연둣빛', 'Chartreuse', '若草'],
  ['숲', 'Forest', '森'],
  ['비취', 'Jade', '翡翠'],
  ['청록', 'Teal', '青緑'],
  ['하늘', 'Azure', '空'],
  ['군청', 'Ultramarine', '群青'],
  ['보라', 'Violet', '菫'],
  ['자주', 'Magenta', '紅紫'],
];

/** 명도 구간별 수식어. 경계값은 OKLab L 기준이며 작은 값부터 검사한다. */
export const LIGHTNESS_WORDS: readonly { max: number; words: readonly [string, string, string] }[] = [
  { max: 0.25, words: ['심야', 'Midnight', '深夜'] },
  { max: 0.45, words: ['그늘', 'Shadowed', '陰'] },
  { max: 0.65, words: ['한낮', 'Solid', '真昼'] },
  { max: 0.82, words: ['맑은', 'Clear', '澄'] },
  { max: 1.01, words: ['서리', 'Frosted', '霜'] },
];

/** 채도 구간별 수식어. */
export const CHROMA_WORDS: readonly { max: number; words: readonly [string, string, string] }[] = [
  { max: 0.03, words: ['재', 'Ash', '灰'] },
  { max: 0.08, words: ['안개', 'Muted', '霧'] },
  { max: 0.15, words: ['선명한', 'Vivid', '鮮'] },
  { max: 1, words: ['형광', 'Electric', '蛍光'] },
];

/** 색각 이상 시뮬레이션 선택지. 'none'은 원본 표시다. */
export const CVD_CHOICES = ['none', 'deuteranopia', 'protanopia', 'tritanopia', 'achromatopsia'] as const;

export type CvdChoice = (typeof CVD_CHOICES)[number];
