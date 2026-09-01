/**
 * SHA-1 (FIPS 180-4). 외부 의존 없이 순수 함수로 둔다.
 *
 * 왜 직접 쓰는가: 브라우저의 `crypto.subtle.digest`는 비동기이고 안전한 컨텍스트를 요구하는데,
 * 이 계산은 글자를 한 자 칠 때마다 즉시 나와야 하고 테스트에서도 그대로 돌아야 한다.
 * 무엇보다 **비밀번호가 이 파일 밖으로 나가지 않는다는 것을 코드로 보일 수 있어야** 한다.
 *
 * SHA-1은 서명용으로는 이미 깨진 함수다. 여기서 쓰는 이유는 유출 확인 서비스들이 쓰는 형식이
 * SHA-1 16진수 40자이기 때문이고, 그 형식을 그대로 보여 주는 것이 이 페이지의 목적이다.
 */

const INITIAL: readonly [number, number, number, number, number] =
  [0x67452301, 0xefcdab89, 0x98badcfe, 0x10325476, 0xc3d2e1f0];
const K: readonly [number, number, number, number] =
  [0x5a827999, 0x6ed9eba1, 0x8f1bbcdc, 0xca62c1d6];
const BLOCK_BYTES = 64;
const LENGTH_BYTES = 8;

function rotl(value: number, shift: number): number {
  return ((value << shift) | (value >>> (32 - shift))) >>> 0;
}

function toHex8(value: number): string {
  return value.toString(16).padStart(8, '0');
}

/** 메시지 뒤에 0x80과 0을 채우고 마지막 8바이트에 비트 길이를 적는다. */
function pad(bytes: Uint8Array): DataView {
  const blocks = Math.floor((bytes.length + LENGTH_BYTES) / BLOCK_BYTES) + 1;
  const padded = new Uint8Array(blocks * BLOCK_BYTES);
  padded.set(bytes);
  padded[bytes.length] = 0x80;
  const view = new DataView(padded.buffer);
  const bits = bytes.length * 8;
  view.setUint32(padded.length - 8, Math.floor(bits / 0x1_0000_0000));
  view.setUint32(padded.length - 4, bits >>> 0);
  return view;
}

export function sha1Bytes(bytes: Uint8Array): string {
  const view = pad(bytes);
  const words = new Uint32Array(80);
  let [h0, h1, h2, h3, h4] = INITIAL;

  for (let offset = 0; offset < view.byteLength; offset += BLOCK_BYTES) {
    for (let i = 0; i < 16; i += 1) words[i] = view.getUint32(offset + i * 4);
    for (let i = 16; i < 80; i += 1) {
      words[i] = rotl(words[i - 3] ^ words[i - 8] ^ words[i - 14] ^ words[i - 16], 1);
    }

    let a = h0;
    let b = h1;
    let c = h2;
    let d = h3;
    let e = h4;

    for (let i = 0; i < 80; i += 1) {
      let f: number;
      let k: number;
      if (i < 20) {
        f = (b & c) | (~b & d);
        k = K[0];
      } else if (i < 40) {
        f = b ^ c ^ d;
        k = K[1];
      } else if (i < 60) {
        f = (b & c) | (b & d) | (c & d);
        k = K[2];
      } else {
        f = b ^ c ^ d;
        k = K[3];
      }
      const next = (rotl(a, 5) + (f >>> 0) + e + k + words[i]) >>> 0;
      e = d;
      d = c;
      c = rotl(b, 30);
      b = a;
      a = next;
    }

    h0 = (h0 + a) >>> 0;
    h1 = (h1 + b) >>> 0;
    h2 = (h2 + c) >>> 0;
    h3 = (h3 + d) >>> 0;
    h4 = (h4 + e) >>> 0;
  }

  return [h0, h1, h2, h3, h4].map(toHex8).join('');
}

/** UTF-8로 바꾼 뒤 해시한다. 유출 확인 서비스의 관행대로 대문자로 낸다. */
export function sha1Hex(text: string): string {
  return sha1Bytes(new TextEncoder().encode(text)).toUpperCase();
}
