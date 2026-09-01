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
  /**
   * 쉬운 말로. 열두 살이 읽어도 통하는 문장만 쓴다.
   * 논문이 무슨 말을 하려는 것인지 먼저 전하고, 이 페이지가 어디까지 가져왔는지를 밝힌다.
   */
  plain: {
    problem: {
      ko: '휴대폰에서 글씨를 키우면 자막이 화면 밖으로 밀려 나가거나 엉뚱한 데서 뚝 끊깁니다. 자막은 대개 \'한 줄에 몇 글자\'로 만들어져 있어서, 보는 화면과 글씨 크기가 달라지면 어긋나기 때문입니다.',
      en: 'Turn the font size up on a phone and subtitles slide off the screen or snap in odd places. Subtitles are usually written as "so many characters per line", so they come apart the moment the screen or the font size changes.',
      ja: 'スマホで文字を大きくすると、字幕が画面からはみ出したり、変なところで切れたりします。字幕はたいてい「一行に何文字」で作られているので、画面や文字サイズが変わるとずれてしまうのです。',
    },
    work: {
      ko: '연구자들은 화면 크기와 글씨 크기에 맞춰 자막을 다시 끊어 주는 방법을 만들었습니다. 끊는 자리는 아무 데나가 아니라, 말하는 사람이 숨을 고르며 잠깐 멈추는 자리를 먼저 골랐습니다.',
      en: 'The researchers built a way to re-cut subtitles to fit the screen and font size at hand. And not just anywhere: they cut first at the places where the speaker pauses for breath.',
      ja: '研究者は、画面と文字サイズに合わせて字幕を切り直す方法を作りました。切る場所はどこでもよいのではなく、話し手が息をついて少し止まるところを先に選びます。',
    },
    took: {
      ko: '생각 두 가지를 가져왔습니다 — 글자 수가 아니라 실제로 차지하는 폭을 재고, 말이 쉬는 자리를 먼저 자른다. 이 페이지는 그 둘을 자막 파일 하나만으로 해 봅니다.',
      en: 'Two ideas: measure the width the text really takes, not the number of characters, and cut at pauses first. This page does both with nothing but a subtitle file.',
      ja: '二つの考えを受け取りました — 文字数ではなく実際に占める幅で測ること、そして話が休むところを先に切ること。このページは字幕ファイルだけでそれをやってみます。',
    },
    left: {
      ko: '논문은 영상의 목소리를 들어서 쉼을 찾습니다. 이 페이지는 자막 파일밖에 보지 못하므로, 자막과 자막 사이의 빈 시간을 쉼으로 칩니다. 논문의 계산식을 그대로 옮긴 것도 아닙니다.',
      en: 'The paper listens to the audio to find the pauses. This page only ever sees the subtitle file, so it treats the silence between cues as the pause. It is not a port of the optimisation in the paper either.',
      ja: '論文は映像の音声を聞いて休止を見つけます。このページは字幕ファイルしか見られないので、字幕と字幕の間の空白時間を休止とみなします。論文の数式をそのまま移したものでもありません。',
    },
  },
} as const;

/**
 * 값이 어디서 왔는가.
 *
 * 이 화면은 숫자 다섯 개로 남의 자막을 다시 자른다. 그 숫자가 어디서 온 것인지 밝히지 않으면
 * 결과를 믿을 근거도, 의심할 근거도 주지 않는 셈이다. 그래서 값마다 성격을 붙인다.
 *   yours  — 당신의 재생 환경에서 오는 값. 기본값은 가정일 뿐이니 실제 값으로 바꿔야 한다.
 *   craft  — 자막 실무에서 흔히 쓰이는 범위. 한 곳이 정한 규격이 아니라 관행이라, 여기서 출처를 하나로 못 박지 않는다.
 *   ours   — 이 화면이 고른 출발점. 근거가 되는 표준이 있어서가 아니라, 어디선가 시작해야 해서 정한 값이다.
 */
export type SettingOrigin = 'yours' | 'craft' | 'ours';

export const SETTING_ORIGINS = {
  fontSize: 'yours',
  displayWidth: 'yours',
  maxLines: 'craft',
  maxCps: 'craft',
  pauseThreshold: 'ours',
  duration: 'craft',
} as const satisfies Record<string, SettingOrigin>;

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

/**
 * 예시 자막.
 *
 * 이 페이지가 다루는 문제가 한 화면에서 모두 드러나도록 골랐다. 날씨 예보를 고른 이유는
 * 실제로 자막이 길고 빠르며, 한 문장이 여러 덩어리에 걸쳐 나오는 대표적인 방송 자막이기 때문이다.
 *
 *   1·2번 — 사이가 0.1초뿐이라 한 묶음으로 이어진다. 2번은 40자가 넘어, 기본값(28px/640px)에서
 *           원본 그대로는 화면 밖으로 넘친다. 재분할이 이 묶음을 어디서 자르는지가 이 페이지의 요점이다.
 *           1번이 서른 자 남짓인 것은 의도다 — 너무 짧으면 그 쉼이 MIN_FILL_RATIO(담을 수 있는 양의 55%)
 *           앞에 놓여 후보에서 아예 빠지고, 말이 쉰 자리(85점) 대신 어절 사이(40점)가 이긴다.
 *           쉼이 이기는 장면을 보여 주려면 쉼이 화면을 절반 넘게 채운 뒤에 와야 한다.
 *   3번   — 쉼표가 있어 절이 끊긴 자리(70점)가 후보로 생긴다. 문장 끝이 없을 때 무엇을 고르는지 보인다.
 *   3→4  — 1.7초를 쉰다. 쉼 판정 기준(300ms)을 넘으므로 묶음이 갈리고, 시간 막대에 쉼으로 표시된다.
 *   4·5번 — 마침표로 끝나는 짧은 문장. 문장 끝(100점)이 이기는 경우를 보여 준다.
 */
export const SAMPLE_SRT = `1
00:00:00,600 --> 00:00:03,600
오늘 하루는 장마 전선이 제주 남쪽 해상으로 물러나면서

2
00:00:03,700 --> 00:00:08,100
중부 지방은 대체로 흐리고 오후 늦게부터 곳에 따라 빗방울이 떨어지겠습니다

3
00:00:08,200 --> 00:00:11,400
낮 최고 기온은 서울 이십육 도, 대전 이십칠 도로 어제와 비슷하겠습니다.

4
00:00:13,100 --> 00:00:15,200
바다의 물결은 잔잔합니다.

5
00:00:15,300 --> 00:00:17,800
자세한 지역별 예보는 화면에서 확인하시기 바랍니다.
`;
