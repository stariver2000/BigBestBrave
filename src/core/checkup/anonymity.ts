/**
 * k-익명성 범위 질의의 산수.
 *
 * 확인 서비스는 비밀번호도, 그 해시 전체도 받지 않는다. 해시의 **앞 몇 글자**만 받고
 * 그 앞자리를 가진 해시를 전부 돌려준다. 맞춰 보는 일은 기기 안에서 끝난다.
 * 그래서 서버가 알게 되는 것은 "그 앞자리를 가진 수억 개 중 하나"라는 사실뿐이다.
 *
 * 이 파일은 그 "수억 개 중 하나"가 정확히 몇 개 중 하나인지를 센다.
 */

import { HASH_BITS, PREFIX_LENGTH } from './config';
import type { AnonymitySet, HashSplit } from './types';

/** 16진수 한 자리가 담는 비트. */
const BITS_PER_HEX = 4;

export function splitHash(hash: string, prefixLength: number = PREFIX_LENGTH): HashSplit {
  return {
    hash,
    prefix: hash.slice(0, prefixLength),
    suffix: hash.slice(prefixLength),
  };
}

export function anonymitySet(
  corpusSize: number,
  prefixLength: number = PREFIX_LENGTH,
): AnonymitySet {
  const bitsSent = prefixLength * BITS_PER_HEX;
  const prefixSpace = Math.pow(2, bitsSent);
  // 해시는 고르게 퍼지므로 한 앞자리에 걸리는 개수의 기댓값은 단순한 나눗셈이다.
  const expectedBucket = corpusSize / prefixSpace;
  return {
    prefixSpace,
    bitsSent,
    bitsWithheld: HASH_BITS - bitsSent,
    corpusSize,
    expectedBucket,
    // 후보가 하나도 없을 만큼 작은 목록이면 찍어 맞힐 것도 없다.
    guessProbability: expectedBucket >= 1 ? 1 / expectedBucket : 1,
  };
}
