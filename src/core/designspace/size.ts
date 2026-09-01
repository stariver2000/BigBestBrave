/**
 * 이 설계 공간이 얼마나 큰가.
 *
 * 논문은 공간의 크기를 세지 않았다. 세는 것은 이 페이지가 더한 것이다. 굳이 세는 까닭은
 * 115편이라는 수가 크게 들리기 때문이다. 옆에 공간의 크기를 놓아야 그 115편이 공간의
 * 어느 만큼인지 보인다.
 *
 * 어림하지 않고 정확히 센다. 39개 차원의 코드 수를 곱하면 자릿수가 스물여섯을 넘으므로
 * number로는 담기지 않는다. 그래서 BigInt로 센다.
 *
 * 부호와 방향: 두 수 모두 클수록 공간이 넓다는 뜻이다. floor <= ceiling 이 언제나 참이다.
 */

import { DIMENSIONS } from './config';

/**
 * 차원마다 코드를 하나씩만 고른다고 볼 때의 가짓수.
 * 실제로는 한 차원에 여러 코드가 붙을 수 있으므로 이것은 아래끝이다.
 */
export function configurationFloor(): bigint {
  return DIMENSIONS.reduce((product, dimension) => product * BigInt(dimension.codes.length), 1n);
}

/**
 * 차원마다 코드의 비어 있지 않은 어떤 부분집합이든 고를 수 있다고 볼 때의 가짓수.
 * 코드가 k개면 그 차원의 가짓수는 2^k - 1 이다. 이것이 위끝이다.
 */
export function configurationCeiling(): bigint {
  return DIMENSIONS.reduce((product, dimension) => product * ((1n << BigInt(dimension.codes.length)) - 1n), 1n);
}

/** 자릿수. 사람에게는 값보다 자릿수가 더 잘 와닿는다. */
export function digitsOf(value: bigint): number {
  return value.toString().length;
}

/**
 * 큰 수를 '유효숫자 x 10^n' 꼴로 적는다.
 * 반올림하지 않고 앞자리를 그대로 잘라 온다 - 자릿수를 보여 주는 것이 목적이므로
 * 반올림이 자릿수를 하나 늘려 버리면 곤란하다.
 */
export function scientific(value: bigint, significant = 3): { mantissa: string; exponent: number } {
  const text = value.toString();
  const exponent = text.length - 1;
  const head = text.slice(0, significant);
  const mantissa = head.length <= 1 ? head : `${head[0]}.${head.slice(1)}`;
  return { mantissa, exponent };
}

/** 코드를 모두 합친 수. 공간의 넓이가 아니라 이름표의 개수다. 둘은 다른 것이다. */
export function totalCodes(): number {
  return DIMENSIONS.reduce((sum, dimension) => sum + dimension.codes.length, 0);
}
