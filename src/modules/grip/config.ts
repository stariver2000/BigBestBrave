/**
 * 크기 착시 페이지 설정.
 *
 * 근거가 된 연구: Big or Small, It's All in Your Head: Visuo-Haptic Illusion of Size-Change
 * Using Finger-Repositioning (Myung Jin Kim, Eyal Ofek, Michel Pahud, Mike J. Sinclair,
 * Andrea Bianchi), CHI 2024, doi:10.1145/3613904.3642254.
 *
 * 연구진은 크기가 변하지 않는 손잡이를 만들고, 손가락이 감기는 자리를 옮기는 것만으로
 * 손에 든 물건이 커지거나 작아지는 느낌을 냈다. 연구 1에서 참가자 열두 명에게
 * 계단법으로 문턱을 재었고, 그 표(Table 2)가 이 페이지의 뼈대다.
 *
 * 이 페이지가 가져온 것
 *   - Table 2의 여섯 차례 문턱을 밀리미터 그대로. 논문이 함께 실은 상대 비율과
 *     맞는지 시험으로 견주어, 옮겨 적다 틀리지 않았음을 붙들어 두었다.
 *   - 본문이 밝힌 세 수치: 올려 잰 문턱의 치우침 42.4%, 내려 잰 문턱 40.4%,
 *     두 끝의 차이 2.00%. 그리고 견준 선행 연구의 6.0%와 32.7%.
 *   - 기기 크기 55mm와 손가락을 옮길 수 있는 거리 26.6mm(SD 6.2).
 *
 * 가져오지 않은 것
 *   - 연구 2(움직이는 시각과 함께 본 것)의 결과. 이 페이지는 연구 1의 문턱만 다룬다.
 *   - 기기의 기계 설계, 토크와 속도, 참가자의 주관 평가.
 */

export const PAPER = {
  title:
    "Big or Small, It's All in Your Head: Visuo-Haptic Illusion of Size-Change Using Finger-Repositioning",
  authors: 'Myung Jin Kim, Eyal Ofek, Michel Pahud, Mike J. Sinclair, Andrea Bianchi',
  venue: 'CHI 2024',
  affiliation: 'KAIST · Microsoft Research',
  link: 'https://doi.org/10.1145/3613904.3642254',
} as const;

/** 자 그림의 크기(px). */
export const RULER = { width: 560, height: 132, pad: 26 } as const;

/** 자에 그릴 수 있는 가장 큰 크기(mm). 이보다 크면 눈금이 벗어난다. */
export const RULER_MAX_MM = 190;
