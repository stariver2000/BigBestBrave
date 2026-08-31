/**
 * 일기 쓰는 사물 페이지 설정.
 *
 * 근거가 된 연구: Living Alongside Areca — Exploring Human Experiences with Things Expressing
 * Thoughts and Emotions (Sueun Jang, Youngseok Seo, Woohyeok Choi, Uichin Lee, KAIST), ACM CHI 2025.
 *
 * 연구진은 일기를 쓰는 공기청정기를 여덟 사람의 집에 3주간 두고 매주 인터뷰했다.
 * 생각과 감정과 의도를 표현하는 사물은 기능을 넘어선 행위자로 인식되었고,
 * 어떤 이는 시간이 지나며 정이 들었고 어떤 이는 시들해졌다.
 *
 * 이 페이지는 그 실험을 재현하지 않는다. 대신 그 자리를 웹에 옮긴다 —
 * 쓸모는 없고, 당신을 알아차리고, 그것을 적는 사물 하나를 놓아 둔다.
 * 3주의 동거는 여러 번의 방문으로 대신한다. 정이 들지 시들해질지는 여기서도 갈릴 것이다.
 */

export const PAPER = {
  title: 'Living Alongside Areca: Exploring Human Experiences with Things Expressing Thoughts and Emotions',
  authors: 'Sueun Jang, Youngseok Seo, Woohyeok Choi, Uichin Lee',
  venue: 'ACM CHI 2025',
  affiliation: 'KAIST',
  doi: 'https://doi.org/10.1145/3706598.3713228',
} as const;

/**
 * 기억이 담기는 자리.
 *
 * 이 기억은 당신의 기기에만 있다. 서버로 가지 않으므로 다른 기기에서는 이 사물이 당신을 모른다.
 * 사물이 한 자리에 놓여 있다는 뜻이기도 하다.
 */
export const STORAGE_KEY = 'bbb.areca.v1';

/** 머문 시간을 다시 재는 간격(ms). 이 사물은 초를 세지 않으므로 성기게 본다. */
export const TICK_MS = 5000;

/** 사물의 몸 크기(px). */
export const BODY = { width: 168, height: 340 } as const;

/**
 * 기기 화면에 비치는 줄 수.
 * 전자잉크 화면은 작아서 일기가 다 들어가지 않는다. 그 사실을 감추지 않고,
 * 앞부분만 보이게 두고 온전한 일기는 아래 칸에서 읽게 한다.
 */
export const EPAPER_LINES = 3;
