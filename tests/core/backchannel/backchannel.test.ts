/**
 * 옮겨 적기가 옳았는지 되짚는 시험.
 *
 * 이 논문은 되짚을 자리가 유난히 많다. 귓속말별 사용 수의 합은 등록 사례 총계와,
 * 결과 분할의 합도 그 총계와, 표 2에서 센 '계속 쓴 서버'는 본문의 여섯과,
 * 날수의 끝값들은 본문의 14와 192와 맞아야 한다. 그리고 본문의 "8 of the 84"는
 * 앞뒤가 맞지 않는 표기라 그 어긋남 자체를 붙든다.
 */

import { describe, expect, it } from 'vitest';
import {
  NUDGES,
  OUTCOMES,
  SERVERS,
  STUDY,
  catalogedSum,
  continuedServers,
  dayRange,
  heaviestUser,
  largestServer,
  nudgeShare,
  totalNudges,
} from '../../../src/core/backchannel';

describe('표 1과 5.2절 - 네 가지 귓속말', () => {
  it('네 귓속말의 등록 사용 수 합이 등록 사례 총계 86과 정확히 같다', () => {
    expect(NUDGES).toHaveLength(4);
    expect(catalogedSum()).toBe(STUDY.cataloged);
  });

  it('가장 많이 쓰인 것은 위반 알림(31), 가장 적게 쓰인 것은 NSFW(12)다', () => {
    const sorted = [...NUDGES].sort((a, b) => b.catalogedUses - a.catalogedUses);
    expect(sorted[0].id).toBe('violation');
    expect(sorted[0].catalogedUses).toBe(31);
    expect(sorted[3].id).toBe('nsfw');
    expect(sorted[3].catalogedUses).toBe(12);
  });

  it('몫의 합이 100이다', () => {
    const sum = NUDGES.reduce((acc, nudge) => acc + nudgeShare(nudge.id), 0);
    expect(sum).toBeCloseTo(100, 9);
  });

  it('귓속말 원문에는 모두 대화로 가는 손잡이가 들어 있다', () => {
    for (const nudge of NUDGES) {
      expect(nudge.text, nudge.id).toContain('[Link to Conversation]');
    }
  });
});

describe('표 2 - 열한 서버', () => {
  it('열한 서버가 두 물결로 나뉜다(6과 5)', () => {
    expect(SERVERS).toHaveLength(STUDY.servers);
    expect(SERVERS.filter((row) => row.wave === 1)).toHaveLength(6);
    expect(SERVERS.filter((row) => row.wave === 2)).toHaveLength(5);
  });

  it('보낸 귓속말의 합은 466이다', () => {
    expect(totalNudges()).toBe(466);
  });

  it('연구 기간을 넘겨 계속 쓴 서버가 본문대로 여섯이다', () => {
    expect(continuedServers()).toBe(6);
  });

  it('날수의 끝값이 본문의 14와 192다', () => {
    const range = dayRange();
    expect(range.min).toBe(STUDY.minDays);
    expect(range.max).toBe(192);
  });

  it('본문의 "작은 서버에서 한 번뿐"이 표에서 읽힌다', () => {
    const once = SERVERS.filter((row) => row.nudges === 1);
    expect(once).toHaveLength(1);
    expect(once[0].members).toBeLessThan(1000);
  });

  it('가장 많이 쓴 서버는 가장 큰 서버가 아니다', () => {
    // 5,300명 서버가 166건으로 1등이고, 240,000명 서버는 59건이다. 크기가 쓰임을 정하지 않는다.
    const heavy = heaviestUser();
    const large = largestServer();
    expect(heavy.server).not.toBe(large.server);
    expect(heavy.members).toBeLessThan(large.members / 10);
    expect(heavy.nudges).toBe(166);
    expect(large.nudges).toBe(59);
  });

  it('등록 사례를 낸 세 서버(7, 9, 11)의 귓속말 합이 등록 사례 수보다 크거나 같다', () => {
    // 84+64+19 = 167 >= 86. 모두 등록하지는 않았다는 뜻이다.
    const pool = SERVERS.filter((row) => (STUDY.catalogedServers as readonly number[]).includes(row.server));
    const sum = pool.reduce((acc, row) => acc + row.nudges, 0);
    expect(pool).toHaveLength(3);
    expect(sum).toBeGreaterThanOrEqual(STUDY.cataloged);
  });
});

describe('5.3절 - 결과 분할과 본문의 오기', () => {
  it('세 갈래의 합이 등록 사례 86과 정확히 같다', () => {
    expect(OUTCOMES.silent + OUTCOMES.visiblyPositive + OUTCOMES.negative).toBe(STUDY.cataloged);
  });

  it('나빠진 8건의 세부(3+4+1)가 맞물린다', () => {
    const { mocked, ignored, leftServer } = OUTCOMES.negativeDetail;
    expect(mocked + ignored + leftServer).toBe(OUTCOMES.negative);
  });

  /**
   * 본문은 나빠진 사례를 "8 of the 84 cases"라 적었다. 그런데 등록 사례는 앞뒤 모두
   * 86으로 적혀 있고 세 분할의 합도 86이다. 84 쪽이 잘못 적힌 것으로 보이며,
   * 그 어긋남(2)을 그대로 붙들어 둔다.
   */
  it('본문의 분모 표기 84는 총계 86과 2만큼 어긋난다', () => {
    expect(OUTCOMES.proseDenominator).toBe(84);
    expect(STUDY.cataloged - OUTCOMES.proseDenominator).toBe(2);
  });

  it('조용히 멎은 것이 절반을 넘고, 나빠진 것은 열에 하나가 안 된다', () => {
    expect(OUTCOMES.silent / STUDY.cataloged).toBeGreaterThan(0.5);
    expect(OUTCOMES.negative / STUDY.cataloged).toBeLessThan(0.1);
  });
});
