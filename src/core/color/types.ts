/**
 * 색 코어의 공통 자료형.
 *
 * 이 모듈은 어떤 상위 계층도 import하지 않는 최하위 모델이며,
 * 모든 채널값은 0~1로 정규화된 실수다(0~255 정수는 문자열 파싱 경계에서만 다룬다).
 */

/** 부호화된 sRGB. 화면에 그대로 쓰는 값이며 감마가 적용된 상태다. */
export interface Srgb {
  r: number;
  g: number;
  b: number;
  /** 알파. 파싱 시 값이 없으면 1로 채운다. */
  a: number;
}

/** 선형 광량 sRGB. 휘도 계산과 행렬 변환은 반드시 이 공간에서 한다. */
export interface LinearRgb {
  r: number;
  g: number;
  b: number;
}

/** OKLab 직교 좌표. */
export interface Oklab {
  l: number;
  a: number;
  b: number;
}

/** OKLab 극좌표. h는 도(degree) 단위 0~360. */
export interface Oklch {
  l: number;
  c: number;
  h: number;
  a: number;
}

/** 색역 매핑 결과. 원본이 sRGB를 벗어났는지 호출부가 표시할 수 있게 함께 돌려준다. */
export interface GamutMapped {
  color: Oklch;
  clipped: boolean;
  /** 색역 안으로 넣기 위해 깎아낸 채도량. clipped가 false면 0이다. */
  chromaLoss: number;
}
