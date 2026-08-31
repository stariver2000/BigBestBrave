/**
 * 씨앗에서 나오는 난수.
 *
 * 이 사이트의 놀이(퀴즈·문제 뽑기·예시 자료)는 무작위처럼 보이되 무작위가 아니어야 한다.
 * 같은 자료와 같은 날에는 누구에게나 같은 것이 나와야 "왜 이렇게 나왔는가"를 설명할 수 있고,
 * 서버 없이도 모두가 같은 화면을 볼 수 있기 때문이다.
 * 그래서 난수원(Math.random)을 쓰지 않고 씨앗 하나에서 수열을 끌어낸다.
 */

/** cyrb53: 짧고 고르게 흩어지는 문자열 해시. 암호용이 아니라 씨앗용이다. */
export function hashText(text: string, salt = 0): number {
  let h1 = 0xdeadbeef ^ salt;
  let h2 = 0x41c6ce57 ^ salt;
  for (let i = 0; i < text.length; i += 1) {
    const code = text.charCodeAt(i);
    h1 = Math.imul(h1 ^ code, 2654435761);
    h2 = Math.imul(h2 ^ code, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  return 4294967296 * (2097151 & h2) + (h1 >>> 0);
}

/** 날짜를 하루 단위 열쇠로 만든다. 하루가 지나면 씨앗도 달라진다. */
export function dayKey(date: Date): string {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}

/** mulberry32: 씨앗 하나로 이어지는 난수열. 같은 씨앗이면 같은 순서가 나온다. */
export function createRandom(seed: number): () => number {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** 0 이상 max 미만의 정수. 난수가 1에 닿는 경우까지 범위 안에 가둔다. */
export function randomIndex(max: number, random: () => number): number {
  if (max <= 0) return 0;
  return Math.min(Math.floor(random() * max), max - 1);
}

/** 목록에서 하나를 고른다. 같은 난수열이면 같은 것이 나온다. */
export function pick<T>(items: readonly T[], random: () => number): T {
  return items[randomIndex(items.length, random)];
}

/** 목록에서 서로 다른 것을 count개 고른다. 같은 것이 두 번 나오지 않게 한다. */
export function pickMany<T>(items: readonly T[], count: number, random: () => number): T[] {
  const pool = [...items];
  const chosen: T[] = [];
  while (chosen.length < count && pool.length > 0) {
    const index = randomIndex(pool.length, random);
    chosen.push(pool[index]);
    pool.splice(index, 1);
  }
  return chosen;
}

/** 순서를 섞은 새 배열. 원본은 건드리지 않는다(Fisher-Yates). */
export function shuffle<T>(items: readonly T[], random: () => number): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = randomIndex(i + 1, random);
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}
