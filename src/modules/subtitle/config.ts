/**
 * 자막 재분할 페이지 설정.
 *
 * 근거가 된 연구: OptiSub — Optimizing Video Subtitle Presentation for Varied Display and
 * Font Sizes via Speech Pause-Driven Chunking (Dawon Lee, Jongwoo Choi, Junyong Noh, KAIST),
 * ACM CHI 2025. https://doi.org/10.1145/3706598.3714199
 *
 * 이 페이지는 논문의 착안점(글자 수가 아니라 실제 표시 폭에 맞추고, 말이 끊긴 자리를 우선해 자른다)을
 * 자막 파일만으로 구현한 것이다. 논문의 최적화 수식을 그대로 옮긴 구현이 아니며,
 * 음성 파형 대신 자막 덩어리 사이의 빈 시간을 말이 끊긴 지점으로 삼는다는 점이 다르다.
 */

import { DEFAULTS } from '../../core/subtitle';

export const PAPER = {
  title: 'OptiSub: Optimizing Video Subtitle Presentation for Varied Display and Font Sizes via Speech Pause-Driven Chunking',
  authors: 'Dawon Lee, Jongwoo Choi, Junyong Noh',
  venue: 'ACM CHI 2025',
  affiliation: 'KAIST',
  doi: 'https://doi.org/10.1145/3706598.3714199',
  project: 'https://w-dlee.github.io/optisub',
} as const;

/** 처음 열었을 때의 값. 휴대폰에서 큰 자막을 보는 상황을 기본으로 잡았다. */
export const DEFAULT_SETTINGS = {
  fontSize: 28,
  displayWidth: 640,
  maxLines: DEFAULTS.maxLines,
  maxCps: DEFAULTS.maxCps,
  pauseThreshold: DEFAULTS.pauseThreshold,
} as const;

/** 자막 미리보기에 쓰는 서체. 폭 측정과 화면 표시가 같은 값을 써야 결과가 맞는다. */
export const CAPTION_FONT_STACK =
  '"Pretendard", "Noto Sans KR", "Helvetica Neue", Arial, sans-serif';

export const CAPTION_FONT_WEIGHT = 600;

/**
 * 자막이 화면 가로폭에서 차지할 수 있는 비율.
 * 방송 자막은 화면 끝까지 채우지 않는다. 좌우에 여백을 남기는 것이 관행이다.
 */
export const CAPTION_WIDTH_RATIO = 0.9;

export const DOWNLOAD_BASENAME = 'rechunked';

/**
 * 상영관의 재생 속도 선택지.
 * 0.5×는 자막 한 장을 뜯어볼 때, 2×는 전체 흐름을 훑을 때 쓴다. 기본은 실제 속도다.
 */
export const PLAYBACK = {
  speeds: [0.5, 1, 1.5, 2],
  defaultSpeed: 1,
} as const;

/** 예시 자막. 한 문장이 여러 덩어리에 걸쳐 있고 중간에 짧은 쉼이 있는 실제 상황을 담았다. */
export const SAMPLE_SRT = `1
00:00:01,000 --> 00:00:04,200
지난 분기 실적을 간단히 정리하면

2
00:00:04,300 --> 00:00:08,600
국내 매출은 12퍼센트 늘었고 해외 매출은 거의 제자리였습니다.

3
00:00:09,400 --> 00:00:14,000
다만 신규 가입자 수가 두 배 가까이 늘었다는 점은 눈여겨볼 만합니다.

4
00:00:15,200 --> 00:00:18,000
자세한 수치는 배포해 드린 자료를 참고해 주세요.
`;
