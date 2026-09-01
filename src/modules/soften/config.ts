/**
 * 물렁함 착시 페이지 설정.
 *
 * 근거가 된 연구: Effects of Waveform, Time Delay, and Vibration Axis on the Perception of
 * Vibrotactile Compliance Illusions on Smartphone Touchscreens
 * (Joyoung Han, Youngin Kim, J. Jung, Keunwoo Park, Geehyuk Lee),
 * International Journal of Human-Computer Interaction 2024,
 * doi:10.1080/10447318.2024.2385184.
 *
 * 이 논문은 유료라 전문을 구하지 못했다. 초록에 밝혀진 네 줄까지만 옮겼고
 * 그 사실을 화면과 papers.md에 적어 두었다.
 *
 * 이 페이지가 가져온 것
 *   - 세 가지 설계 물음(파형·시간 지연·진동 축)과 그 답.
 *   - 25밀리초라는 문턱. 초록이 밝힌 유일한 수치다.
 *   - 지연이 물렁함·매끄러움·탄성·불쾌함을, 축이 앞의 셋을 움직였다는 것.
 *
 * 가져오지 않은 것
 *   - 실험의 수치 전부(평균, 표준편차, 검정값)와 참가자, 장비.
 *   - 영향의 방향. 초록은 '뜻있는 영향이 있었다'까지만 밝혔으므로 여기서도 지어내지 않는다.
 *
 * 이 페이지가 스스로 더한 것
 *   - 파형을 소리로 들려주는 것. 브라우저는 진동의 파형을 바꿀 수 없지만 소리는 낼 수 있다.
 *     귀로는 네 파형이 또렷이 갈리는데 손끝은 못 가른다는 것이 이 연구의 재미이므로,
 *     그 갈림을 직접 들어 보게 했다.
 */

export const PAPER = {
  title:
    'Effects of Waveform, Time Delay, and Vibration Axis on the Perception of Vibrotactile Compliance Illusions on Smartphone Touchscreens',
  authors: 'Joyoung Han, Youngin Kim, J. Jung, Keunwoo Park, Geehyuk Lee',
  venue: 'IJHCI 2024',
  affiliation: 'KAIST',
  link: 'https://doi.org/10.1080/10447318.2024.2385184',
  /**
   * 쉬운 말로. 열두 살이 읽어도 통하는 문장만 쓴다.
   * 논문이 무슨 말을 하려는 것인지 먼저 전하고, 이 페이지가 어디까지 가져왔는지를 밝힌다.
   */
  plain: {
    problem: {
      ko: '유리처럼 딱딱한 화면인데, 누르면 말랑하게 눌리는 느낌이 들 때가 있습니다. 진동을 어떻게 주느냐에 따라 손끝이 속는 것인데, 무엇이 그 느낌을 만들까요?',
      en: 'The screen is hard glass, yet sometimes a press feels soft and yielding. The fingertip is being fooled by how the vibration is delivered — but by which part of it?',
      ja: 'ガラスのように硬い画面なのに、押すとやわらかく沈む感じがすることがあります。振動の与え方で指先が騙されているのですが、何がその感覚を作るのでしょう。',
    },
    work: {
      ko: '연구진은 세 가지를 바꿔 가며 물었습니다 — 진동의 파형, 누른 뒤 진동까지의 시간 차, 진동의 방향. 시간 차는 25밀리초를 넘으면 느낌이 달라졌고, 파형은 손끝으로 잘 갈리지 않았습니다.',
      en: 'They varied three things: the waveform of the vibration, the delay between press and vibration, and the axis it shakes along. Past 25 milliseconds of delay the feeling changed; the waveform, the fingertip could hardly tell apart.',
      ja: '研究者は三つを変えて尋ねました — 振動の波形、押してから振動までの時間差、振動の方向。時間差は25ミリ秒を超えると感覚が変わり、波形は指先ではほとんど区別できませんでした。',
    },
    took: {
      ko: '세 물음과 그 답, 그리고 초록이 밝힌 유일한 수치인 25밀리초를 가져왔습니다.',
      en: 'The three questions and their answers, plus the one number the abstract gives: 25 milliseconds.',
      ja: '三つの問いとその答え、そして要旨が示す唯一の数値である25ミリ秒を受け取りました。',
    },
    left: {
      ko: '이 논문은 유료라 전문을 보지 못했습니다. 그래서 실험의 평균이나 검정값은 없고, \'뜻있는 영향이 있었다\'까지만 옮겼습니다. 영향의 방향은 지어내지 않았습니다.',
      en: 'The paper is behind a paywall, so the full text was not read. There are no means or test statistics here — only that the effects were significant. Which way they pointed is not invented.',
      ja: 'この論文は有料で全文を読めませんでした。ですから実験の平均や検定値はなく、「有意な影響があった」までを移しています。影響の向きは作り話にしていません。',
    },
  },
} as const;

/** 파형 그림의 크기(px). */
export const WAVE = { width: 300, height: 84, pad: 6 } as const;

/** 소리를 낼 때의 길이(초)와 크기. 귀가 아프지 않게 낮춰 둔다. */
export const AUDIO = { seconds: 0.9, gain: 0.16 } as const;
