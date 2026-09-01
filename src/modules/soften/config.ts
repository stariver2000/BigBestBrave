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
} as const;

/** 파형 그림의 크기(px). */
export const WAVE = { width: 300, height: 84, pad: 6 } as const;

/** 소리를 낼 때의 길이(초)와 크기. 귀가 아프지 않게 낮춰 둔다. */
export const AUDIO = { seconds: 0.9, gain: 0.16 } as const;
