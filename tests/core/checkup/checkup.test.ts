import { describe, expect, it } from 'vitest';
import {
  anonymitySet,
  checkPassword,
  CORPUS,
  deriveFromCorpus,
  isInCorpus,
  sha1Bytes,
  sha1Hex,
  splitHash,
} from '../../../src/core/checkup';

describe('sha1', () => {
  // FIPS 180-2 부록과 널리 쓰이는 검증 벡터. 하나라도 어긋나면 이 페이지 전체가 거짓말이 된다.
  it('빈 문자열', () => {
    expect(sha1Hex('')).toBe('DA39A3EE5E6B4B0D3255BFEF95601890AFD80709');
  });

  it('abc', () => {
    expect(sha1Hex('abc')).toBe('A9993E364706816ABA3E25717850C26C9CD0D89D');
  });

  it('블록 경계를 넘는 448비트 메시지', () => {
    expect(sha1Hex('abcdbcdecdefdefgefghfghighijhijkijkljklmklmnlmnomnopnopq')).toBe(
      '84983E441C3BD26EBAAE4AA1F95129E5E54670F1',
    );
  });

  it('여러 블록', () => {
    expect(sha1Hex('The quick brown fox jumps over the lazy dog')).toBe(
      '2FD4E1C67A2D28FCED849EE1BB76E7391B93EB12',
    );
  });

  it('한 글자만 달라도 전부 달라진다', () => {
    expect(sha1Hex('The quick brown fox jumps over the lazy cog')).toBe(
      'DE9F2C7FD25E1B3AFAD3E85A0BD17D9B100DB4B3',
    );
  });

  it('a 백만 개', () => {
    expect(sha1Hex('a'.repeat(1_000_000))).toBe('34AA973CD4C4DAA4F61EEB2BDBAD27316534016F');
  });

  it('UTF-8로 인코딩한다', () => {
    // '한'은 UTF-8로 ED 95 9C 세 바이트다. 코드 유닛(D55C)으로 잘못 다루면 다른 값이 나온다.
    expect(sha1Hex('한')).toBe(sha1Bytes(new Uint8Array([0xed, 0x95, 0x9c])).toUpperCase());
    expect(sha1Hex('한')).toBe('EDDEA29AAACE3B9F6C961F82BE64B57D7D0E3A7A');
  });

  it('언제나 16진수 40자다', () => {
    for (const sample of ['', 'a', 'password', '한글 비밀번호 😀', 'x'.repeat(200)]) {
      expect(sha1Hex(sample)).toMatch(/^[0-9A-F]{40}$/);
    }
  });
});

describe('k-익명성', () => {
  it('앞 다섯 자와 뒤 서른다섯 자로 가른다', () => {
    const split = splitHash(sha1Hex('password'), 5);
    expect(split.prefix).toBe('5BAA6');
    expect(split.suffix).toHaveLength(35);
    expect(split.prefix + split.suffix).toBe(split.hash);
  });

  it('보내는 비트와 남는 비트를 합치면 160이다', () => {
    const set = anonymitySet(1e9, 5);
    expect(set.bitsSent).toBe(20);
    expect(set.bitsWithheld).toBe(140);
    expect(set.prefixSpace).toBe(1_048_576);
  });

  it('목록이 클수록 숨을 곳이 많아진다', () => {
    const small = anonymitySet(1e7, 5);
    const large = anonymitySet(1e9, 5);
    expect(large.expectedBucket).toBeGreaterThan(small.expectedBucket);
    expect(large.guessProbability).toBeLessThan(small.guessProbability);
  });

  it('앞자리를 늘리면 서버가 더 많이 알게 된다', () => {
    const short = anonymitySet(1e9, 5);
    const long = anonymitySet(8, 8);
    expect(long.bitsSent).toBeGreaterThan(short.bitsSent);
    expect(anonymitySet(1e9, 8).expectedBucket).toBeLessThan(short.expectedBucket);
  });

  it('후보가 하나도 없을 만큼 목록이 작으면 확률은 1이다', () => {
    expect(anonymitySet(10, 5).guessProbability).toBe(1);
  });
});

describe('유출 단어에서의 거리', () => {
  it('사전에 그대로 있으면 규칙이 없다', () => {
    const derivation = deriveFromCorpus('password');
    expect(derivation?.base).toBe('password');
    expect(derivation?.rules).toHaveLength(0);
    expect(derivation?.attempts).toBe(derivation?.baseRank);
  });

  it('첫 글자를 대문자로 바꾼 것을 되돌린다', () => {
    const derivation = deriveFromCorpus('Sunshine');
    expect(derivation?.base).toBe('sunshine');
    expect(derivation?.rules.map((rule) => rule.id)).toEqual(['case']);
  });

  it('뒤에 붙인 연도와 느낌표를 떼어 낸다', () => {
    const derivation = deriveFromCorpus('Sunshine2024!');
    expect(derivation?.base).toBe('sunshine');
    expect(derivation?.rules.map((rule) => rule.id)).toEqual(['suffix', 'case']);
    const suffix = derivation?.rules.find((rule) => rule.id === 'suffix');
    // 숫자 넉 자(10^4)와 기호 한 자(33)를 훑는 값이다.
    expect(suffix?.branching).toBe(10 * 10 * 10 * 10 * 33);
  });

  it('글자 바꿔치기를 되돌린다', () => {
    const derivation = deriveFromCorpus('p@ssw0rd');
    expect(derivation?.base).toBe('password');
    expect(derivation?.rules.map((rule) => rule.id)).toContain('leet');
  });

  it('뒤집은 것을 되돌린다', () => {
    const derivation = deriveFromCorpus('gnatsum');
    expect(derivation?.base).toBe('mustang');
    expect(derivation?.rules.map((rule) => rule.id)).toEqual(['reverse']);
  });

  it('두 번 이어 붙인 것을 되돌린다', () => {
    const derivation = deriveFromCorpus('dragondragon');
    expect(derivation?.base).toBe('dragon');
    expect(derivation?.rules.map((rule) => rule.id)).toEqual(['repeat']);
  });

  it('손질이 늘수록 걸리는 시도 번호가 커진다', () => {
    const plain = deriveFromCorpus('sunshine');
    const dressed = deriveFromCorpus('$unsh1ne2024!');
    expect(plain).not.toBeNull();
    expect(dressed).not.toBeNull();
    expect(dressed!.attempts).toBeGreaterThan(plain!.attempts);
    expect(dressed!.base).toBe('sunshine');
  });

  it('사전과 이어지지 않으면 null이다', () => {
    expect(deriveFromCorpus('zqxjvwbkfmpldrht')).toBeNull();
    expect(deriveFromCorpus('')).toBeNull();
  });

  it('사전의 모든 단어는 손질 없이도 닿는다', () => {
    for (const [index, word] of CORPUS.entries()) {
      const derivation = deriveFromCorpus(word);
      expect(isInCorpus(word)).toBe(true);
      // 손질 없는 길이 늘 있으므로 순위보다 비싼 답이 나올 수 없다.
      // ('654321'처럼 다른 단어를 뒤집은 것이 더 싼 경우도 있어 등호가 아니다.)
      expect(derivation!.attempts).toBeLessThanOrEqual(index + 1);
    }
  });

  it('가장 싼 길을 고른다', () => {
    // 'Love' 는 'love'에 대문자 규칙 하나뿐이다. 더 비싼 길을 고르면 안 된다.
    const derivation = deriveFromCorpus('Love');
    expect(derivation?.base).toBe('love');
    expect(derivation?.rules).toHaveLength(1);
  });
});

describe('보고서', () => {
  it('사전에 그대로 있으면 가장 급하다', () => {
    expect(checkPassword('123456').urgency).toBe('critical');
  });

  it('손질한 사전 단어도 급하다', () => {
    const report = checkPassword('Password1');
    expect(report.exact).toBe(false);
    expect(report.urgency).toBe('high');
    expect(report.derivation?.base).toBe('password');
  });

  it('사전에 닿지 않으면 안전이 아니라 모름이다', () => {
    const report = checkPassword('zqxjvwbkfmpldrht');
    expect(report.derivation).toBeNull();
    expect(report.urgency).toBe('unknown');
    expect(report.crackTime).toBeNull();
  });

  it('약할수록 깨지는 시간이 짧다', () => {
    const weak = checkPassword('123456').crackTime;
    const stronger = checkPassword('Sunshine2024!').crackTime;
    expect(weak!.offline).toBeLessThan(stronger!.offline);
    expect(weak!.online).toBeLessThan(weak!.offline * 1e10);
  });

  it('목록 크기를 바꿔도 해시는 그대로다', () => {
    const a = checkPassword('hello', { corpusSize: 1e6 });
    const b = checkPassword('hello', { corpusSize: 1e9 });
    expect(a.split.hash).toBe(b.split.hash);
    expect(b.anonymity.expectedBucket).toBeGreaterThan(a.anonymity.expectedBucket);
  });

  it('빈 비밀번호에도 해시는 나온다', () => {
    const report = checkPassword('');
    expect(report.split.hash).toHaveLength(40);
    expect(report.urgency).toBe('unknown');
  });
});
