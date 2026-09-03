/**
 * 씨앗 점 찾기, 고차원 가까움, 그리고 점 재배치.
 *
 * 논문 4.1절 Step 3~4의 알맹이다. 화면에서 붓이 닿은 자리를 고차원 이웃 관계로
 * 번역해, 가짜 이웃(FN)은 렌즈 밖으로 밀고 놓친 이웃(MN)은 안으로 당긴다.
 *
 * 렌즈의 치수도 논문 그대로다: 안쪽 경계의 반지름은 붓의 반지름 τ와 같고,
 * 바깥 경계는 3τ다. 그래서 고리(렌즈 영역)의 폭이 붓의 지름(2τ)과 같아진다.
 */

export interface Lens {
  /** 렌즈의 중심(2D 화면 좌표). */
  centerX: number;
  centerY: number;
  /** 안쪽 경계의 반지름 τ. 붓의 반지름과 같다. */
  inner: number;
  /** 바깥 경계의 반지름 3τ. */
  outer: number;
}

export function lensAt(centerX: number, centerY: number, painterRadius: number): Lens {
  return { centerX, centerY, inner: painterRadius, outer: painterRadius * 3 };
}

/**
 * 씨앗 점 찾기(Step 2의 Finding seed points).
 *
 * 붓이 덮은 점 가운데 고차원 밀도가 가장 높은 점 하나를 고르고(p_initial),
 * 그 점의 SNN 이웃을 가까운 순서로 붙여 나가되 **붓 안에 있는 동안만** 담는다.
 * 붓이 덮은 점을 전부 씨앗으로 쓰지 않는 이유가 논문에 있다: 그 안에 가짜 이웃
 * 때문에 실제로는 다른 무리인 점들이 섞여 있을 수 있고, 그대로 시작하면 서로 다른
 * 무리가 한 덩어리로 뭉쳐 버린다.
 */
export function findSeeds(
  covered: readonly number[],
  density: readonly number[],
  similarity: readonly (readonly number[])[],
): number[] {
  if (covered.length === 0) return [];

  let initial = covered[0];
  for (const index of covered) {
    if (density[index] > density[initial]) initial = index;
  }

  const coveredSet = new Set(covered);
  // p_initial의 SNN 이웃을 **모든 점**에 대해 가까운 순으로 줄 세운다. 같으면 인덱스 순.
  // 덮인 점만 줄 세우면 안 된다 - κ의 조건이 "κNN이 전부 붓 안에 있는 최대 κ"라서,
  // 붓 밖의 이웃이 어디서 처음 나오는지를 알아야 거기서 멈출 수 있다.
  const ranked = similarity[initial]
    .map((weight, index) => ({ index, weight }))
    .filter((entry) => entry.index !== initial)
    .sort((a, b) => (a.weight === b.weight ? a.index - b.index : b.weight - a.weight));

  const seeds = [initial];
  for (const entry of ranked) {
    // 붓 밖의 이웃을 만나는 순간 멈춘다. 그 뒤는 더 먼 이웃이므로 볼 것도 없다.
    if (!coveredSet.has(entry.index)) break;
    seeds.push(entry.index);
  }
  return seeds;
}

/**
 * 고차원 가까움(Step 3의 MD closeness).
 *
 * close(p, C) = Σ_{q ∈ κNN(p) ∩ C} sim(q,p) / Σ_{q ∈ κNN(p)} sim(q,p)
 *
 * p의 이웃들이 지닌 유사도 가운데 얼마만큼이 C(칠한 점들) 쪽에 실려 있는가다.
 * 1이면 p의 이웃이 전부 C 안에 있다는 뜻(참 이웃), 0이면 하나도 없다는 뜻(남남)이다.
 * 분모가 0이면(이웃과 하나도 안 겹치는 외톨이) 0으로 둔다.
 */
export function closenessTo(
  point: number,
  brushed: ReadonlySet<number>,
  neighbors: readonly number[][],
  similarity: readonly (readonly number[])[],
): number {
  let inside = 0;
  let total = 0;
  for (const neighbor of neighbors[point]) {
    const weight = similarity[point][neighbor];
    total += weight;
    if (brushed.has(neighbor)) inside += weight;
  }
  return total === 0 ? 0 : inside / total;
}

/** 모든 점의 가까움. 칠한 점 자신은 1로 둔다 - 정의상 제 무리의 한복판이다. */
export function closenessMap(
  brushed: ReadonlySet<number>,
  neighbors: readonly number[][],
  similarity: readonly (readonly number[])[],
): number[] {
  return neighbors.map((_, index) =>
    brushed.has(index) ? 1 : closenessTo(index, brushed, neighbors, similarity),
  );
}

/**
 * 가까움 하나를 렌즈 안의 반지름으로 옮긴다(Step 3의 재배치 규칙).
 *
 *   가까움 1  -> 안쪽 경계 안(핵심 영역). 놓친 이웃이 빨려 들어오는 자리다.
 *   가까움 0  -> 바깥 경계 밖. 가짜 이웃이 튕겨 나가는 자리다.
 *   그 사이   -> 고리 안. 가까울수록 안쪽 경계에 붙는다.
 *
 * 고리 안의 규칙은 선형이다: r = τ·(3 − 2c). c=1이면 τ, c=0이면 3τ가 되어
 * 두 경계와 정확히 이어진다.
 */
export function radiusFor(closeness: number, lens: Lens, originalRadius: number): number {
  if (closeness >= 1) {
    // 참 이웃: 핵심 영역 안쪽. 원래 거리를 유지하되 안쪽 경계를 넘지 않게 눌러 담는다.
    return Math.min(originalRadius, lens.inner * 0.92);
  }
  if (closeness <= 0) {
    // 남남: 바깥 경계 밖으로. 이미 밖이면 그대로 둔다 - 공연히 흔들지 않는다.
    return Math.max(originalRadius, lens.outer * 1.06);
  }
  return lens.inner * (3 - 2 * closeness);
}

export interface Point2D {
  x: number;
  y: number;
}

/**
 * 재배치된 자리. 방향(각도)은 원래 것을 지키고 거리만 고친다.
 *
 * 방향을 지키는 이유: 논문은 재배치를 등방적(isotropic)으로 두어 "어느 쪽에서 왔는가"에
 * 뜻을 싣지 않는다고 했다. 그러면 반대로, 각도를 흔들 이유도 없다. 각도를 그대로 두면
 * 사람이 눈으로 점을 따라갈 수 있고, 같은 입력에 언제나 같은 그림이 나온다.
 */
export function relocate(
  original: Point2D,
  closeness: number,
  lens: Lens,
): Point2D {
  const dx = original.x - lens.centerX;
  const dy = original.y - lens.centerY;
  const originalRadius = Math.hypot(dx, dy);
  // 중심에 정확히 얹힌 점은 방향이 없다. 그대로 둔다.
  if (originalRadius === 0) return original;

  const radius = radiusFor(closeness, lens, originalRadius);
  const scale = radius / originalRadius;
  return { x: lens.centerX + dx * scale, y: lens.centerY + dy * scale };
}

/** 붓(원)이 덮은 점들의 인덱스. */
export function coveredBy(
  points: readonly Point2D[],
  centerX: number,
  centerY: number,
  radius: number,
): number[] {
  const covered: number[] = [];
  points.forEach((point, index) => {
    if (Math.hypot(point.x - centerX, point.y - centerY) <= radius) covered.push(index);
  });
  return covered;
}

export interface Score {
  precision: number;
  recall: number;
  f1: number;
}

/** 논문이 쓴 잣대 그대로: 고른 점들을 정답 무리와 견준다(5.1.1절 Measurements). */
export function scoreAgainst(truth: ReadonlySet<number>, picked: ReadonlySet<number>): Score {
  let hits = 0;
  for (const index of picked) if (truth.has(index)) hits += 1;
  const precision = picked.size === 0 ? 0 : hits / picked.size;
  const recall = truth.size === 0 ? 0 : hits / truth.size;
  const f1 = precision + recall === 0 ? 0 : (2 * precision * recall) / (precision + recall);
  return { precision, recall, f1 };
}
