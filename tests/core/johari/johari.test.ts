import { describe, expect, it } from 'vitest';
import {
  AREAS,
  decode,
  encode,
  report,
  SAMPLE,
  SCALE,
  splitOf,
  splitsOf,
  windowOf,
  windowsOf,
  type Sheet,
} from '../../../src/core/johari';

const mine: Sheet = {
  selfKnows: [...SAMPLE.mine.selfKnows],
  guessesOther: [...SAMPLE.mine.guessesOther],
  seesOther: [...SAMPLE.mine.seesOther],
};
const theirs: Sheet = {
  selfKnows: [...SAMPLE.theirs.selfKnows],
  guessesOther: [...SAMPLE.theirs.guessesOther],
  seesOther: [...SAMPLE.theirs.seesOther],
};

/** 눈금 안의 모든 (자기, 상대) 짝. 25가지뿐이라 전부 세어 본다. */
const allPairs: [number, number][] = [];
for (let s = 0; s <= SCALE; s += 1) for (let o = 0; o <= SCALE; o += 1) allPairs.push([s, o]);

describe('조하리의 창', () => {
  /** 이 페이지의 뼈대다. 깨지면 화면의 네 칸이 꽉 차지 않는다. */
  it('네 칸을 더하면 언제나 눈금의 최대값이다', () => {
    for (const [s, o] of allPairs) {
      const w = windowOf('habit', s, o);
      expect(w.open + w.blind + w.hidden + w.unknown).toBe(SCALE);
    }
  });

  it('모든 칸이 음수가 아니다', () => {
    for (const [s, o] of allPairs) {
      const w = windowOf('trait', s, o);
      for (const part of [w.open, w.blind, w.hidden, w.unknown]) expect(part).toBeGreaterThanOrEqual(0);
    }
  });

  it('안 보이는 곳과 감춘 곳은 동시에 있을 수 없다', () => {
    for (const [s, o] of allPairs) {
      const w = windowOf('talk', s, o);
      expect(Math.min(w.blind, w.hidden)).toBe(0);
    }
  });

  it('상대가 나보다 많이 보면 안 보이는 곳이 생긴다', () => {
    const w = windowOf('stress', 1, 4);
    expect(w.blind).toBe(3);
    expect(w.hidden).toBe(0);
    expect(w.open).toBe(1);
    expect(w.unknown).toBe(0);
  });

  it('내가 더 알면 감춘 곳이 생긴다', () => {
    const w = windowOf('stress', 4, 1);
    expect(w.hidden).toBe(3);
    expect(w.blind).toBe(0);
  });

  it('둘 다 0이면 전부 모르는 곳이다', () => {
    const w = windowOf('habit', 0, 0);
    expect(w.unknown).toBe(SCALE);
    expect(w.open).toBe(0);
  });

  it('눈금 밖의 값은 안으로 끌어당긴다', () => {
    const w = windowOf('habit', 99, -5);
    expect(w.selfKnows).toBe(SCALE);
    expect(w.seesMe).toBe(0);
    expect(w.open + w.blind + w.hidden + w.unknown).toBe(SCALE);
  });

  it('여섯 자리가 모두 나오고 순서가 같다', () => {
    const windows = windowsOf(mine, theirs.seesOther);
    expect(windows.map((w) => w.area)).toEqual([...AREAS]);
  });

  it('답이 모자라면 0으로 본다', () => {
    const short: Sheet = { selfKnows: [2], guessesOther: [1], seesOther: [3] };
    const windows = windowsOf(short, [4]);
    expect(windows).toHaveLength(AREAS.length);
    for (const w of windows) expect(w.open + w.blind + w.hidden + w.unknown).toBe(SCALE);
  });
});

describe('어긋남 가르기', () => {
  /** 두 번째 항등식. 감춘 몫과 빗나간 몫을 더하면 전체 어긋남이다. */
  it('감춘 몫 + 빗나간 몫 = 전체 어긋남', () => {
    for (let s = 0; s <= SCALE; s += 1) {
      for (let g = 0; g <= SCALE; g += 1) {
        for (let o = 0; o <= SCALE; o += 1) {
          const split = splitOf('habit', s, g, o);
          expect(split.withheld + split.misjudged).toBe(split.total);
        }
      }
    }
  });

  it('짐작이 딱 맞으면 빗나간 몫이 0이다', () => {
    expect(splitOf('talk', 3, 2, 2).misjudged).toBe(0);
  });

  it('실제와 같게 알고 있으면 전체 어긋남이 0이다', () => {
    const split = splitOf('trait', 3, 1, 3);
    expect(split.total).toBe(0);
    // 그래도 속은 갈릴 수 있다. 감춘 줄 알았는데 실은 다 보이고 있었던 경우다.
    expect(split.withheld).toBe(2);
    expect(split.misjudged).toBe(-2);
  });

  it('여섯 자리가 모두 나온다', () => {
    expect(splitsOf(mine, theirs.seesOther).map((s) => s.area)).toEqual([...AREAS]);
  });
});

describe('보고서', () => {
  const made = report(mine, theirs);

  it('창과 가르기가 여섯씩 나온다', () => {
    expect(made.windows).toHaveLength(AREAS.length);
    expect(made.splits).toHaveLength(AREAS.length);
  });

  it('안 보이는 곳이 큰 순으로 놓인다', () => {
    for (let i = 1; i < made.blindSpots.length; i += 1) {
      expect(made.blindSpots[i - 1].blind).toBeGreaterThanOrEqual(made.blindSpots[i].blind);
    }
  });

  it('짐작 오차는 음수가 아니다', () => {
    expect(made.metaError).toBeGreaterThanOrEqual(0);
  });

  it('짐작을 다 맞히면 오차가 0이다', () => {
    const perfect: Sheet = { ...mine, guessesOther: [...theirs.seesOther] };
    expect(report(perfect, theirs).metaError).toBe(0);
  });

  it('한쪽이 더 많이 보면 어긋남이 양수다', () => {
    const watchful: Sheet = { ...mine, seesOther: [4, 4, 4, 4, 4, 4] };
    const blindPartner: Sheet = { ...theirs, seesOther: [0, 0, 0, 0, 0, 0] };
    const made2 = report(watchful, blindPartner);
    expect(made2.iSee).toBe(4);
    expect(made2.seenByOther).toBe(0);
    expect(made2.asymmetry).toBe(4);
  });

  it('어긋남은 내가 보는 정도에서 상대가 보는 정도를 뺀 값이다', () => {
    expect(made.asymmetry).toBeCloseTo(made.iSee - made.seenByOther, 12);
  });
});

describe('코드', () => {
  it('넣은 답이 그대로 돌아온다', () => {
    const back = decode(encode(mine));
    expect(back.ok).toBe(true);
    expect(back.sheet).toEqual(mine);
  });

  it('눈금 안의 모든 답에 대해 되돌아온다', () => {
    // 여섯 자리 x 세 벌을 한꺼번에 흔들어 본다.
    for (let v = 0; v <= SCALE; v += 1) {
      const flat: Sheet = {
        selfKnows: AREAS.map((_, i) => (v + i) % (SCALE + 1)),
        guessesOther: AREAS.map((_, i) => (v + i * 2) % (SCALE + 1)),
        seesOther: AREAS.map((_, i) => (v + i * 3) % (SCALE + 1)),
      };
      expect(decode(encode(flat)).sheet).toEqual(flat);
    }
  });

  it('코드는 헷갈리는 글자를 쓰지 않는다', () => {
    const code = encode(mine);
    expect(code).not.toMatch(/[01OI]/);
    expect(code.length).toBeLessThan(20);
  });

  it('소문자와 사이 공백을 받아 준다', () => {
    const code = encode(mine);
    const messy = code.toLowerCase().replace(/(.{4})/g, '$1 ');
    expect(decode(messy).sheet).toEqual(mine);
  });

  it('빈 글자는 거절한다', () => {
    expect(decode('  ')).toEqual({ ok: false, reason: 'empty' });
  });

  it('없는 글자가 있으면 거절한다', () => {
    expect(decode(encode(mine).slice(0, -1) + '0').reason).toBe('letter');
  });

  it('너무 짧으면 거절한다', () => {
    expect(decode('AB').reason).toBe('length');
  });

  it('한 글자만 바뀌어도 거의 언제나 잡아낸다', () => {
    const code = encode(mine);
    let caught = 0;
    let tried = 0;
    for (let at = 0; at < code.length; at += 1) {
      for (const letter of '23456789ABCDEFGHJKLMNPQRSTUVWXYZ') {
        if (letter === code[at]) continue;
        tried += 1;
        const broken = code.slice(0, at) + letter + code.slice(at + 1);
        const back = decode(broken);
        if (!back.ok || JSON.stringify(back.sheet) !== JSON.stringify(mine)) caught += 1;
      }
    }
    expect(tried).toBeGreaterThan(100);
    expect(caught / tried).toBeGreaterThan(0.9);
  });
});
