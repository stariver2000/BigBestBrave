/** 삐삐 숫자 언어 해석의 자료형. */

/** 해독 결과의 한 조각. 코드집에 있는 말이거나, 그냥 읽은 숫자다. */
export interface Piece {
  digits: string;
  /** 코드집에 있으면 그 항목의 자리, 없으면 null. */
  codeIndex: number | null;
  /** 화면에 보여 줄 읽기. 코드면 뜻, 아니면 한자음 읽기다. */
  reading: string;
}

/** 숫자 한 줄을 나눈 한 가지 방법. */
export interface Segmentation {
  pieces: Piece[];
  /** 코드집에 걸린 자릿수. 클수록 "말이 되는" 해석이다. */
  matched: number;
}

/** 말을 숫자로 옮긴 결과의 한 조각. */
export interface EncodedPiece {
  /** 원문에서 가져온 부분. */
  text: string;
  /** 옮겨진 숫자. 옮기지 못했으면 null. */
  digits: string | null;
  /** 어떻게 옮겼는지. lost는 끝내 보낼 수 없는 부분이다. */
  via: 'code' | 'syllable' | 'lost';
}

export interface Encoded {
  pieces: EncodedPiece[];
  digits: string;
  /** 원문 글자 중 숫자로 옮겨진 비율(0~1). 이 값이 곧 "얼마나 전할 수 있는가"다. */
  coverage: number;
  /** 자릿수 한도를 넘겼는지. 넘으면 뒤가 잘린다. */
  overflow: boolean;
}
