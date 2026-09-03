/**
 * 공유 최근접 이웃(SNN) 유사도와 고차원 밀도.
 *
 * 논문 4.1절 Step 1이 쓰는 두 가지다. 왜 유클리드 거리가 아니라 SNN인가:
 * 차원이 높아지면 거리들이 서로 비슷해져 이웃과 남남을 가르지 못한다(차원의 저주).
 * SNN은 "두 점이 이웃 목록을 얼마나 나눠 갖는가"를 세므로 그 병에 덜 걸린다고
 * 논문이 적었다(4.1절, [46][17][47]).
 *
 * 정의(논문 그대로): sim_k(p,q) = Σ_{(m,n) ∈ S_pq} (k+1-m)(k+1-n).
 * S_pq는 p의 m번째 이웃과 q의 n번째 이웃이 같은 점인 (m,n) 쌍의 집합이다.
 * 순위 m, n은 1부터 센다. 앞자리에서 겹칠수록 무겁게 친다.
 *
 * k는 점 개수의 제곱근으로 둔다(논문이 [48]을 따라 그렇게 고정했다).
 */

/** 점 개수에서 이웃 수 k를 정한다. 논문: k = √N. */
export function neighborCountFor(pointCount: number): number {
  return Math.max(1, Math.round(Math.sqrt(pointCount)));
}

/** 두 점 사이 유클리드 거리. */
export function distance(a: readonly number[], b: readonly number[]): number {
  let sum = 0;
  for (let i = 0; i < a.length; i += 1) {
    const diff = a[i] - b[i];
    sum += diff * diff;
  }
  return Math.sqrt(sum);
}

/**
 * 각 점의 k최근접 이웃 목록. 가까운 순서대로이며 자기 자신은 빼고 담는다.
 * 거리가 같으면 인덱스가 작은 쪽을 앞에 둔다 - 같은 자료면 언제나 같은 목록이 나와야
 * 화면과 시험이 같은 것을 본다.
 */
export function nearestNeighbors(rows: readonly (readonly number[])[], k: number): number[][] {
  return rows.map((row, index) => {
    const others = rows
      .map((other, otherIndex) => ({ otherIndex, gap: distance(row, other) }))
      .filter((entry) => entry.otherIndex !== index);
    others.sort((a, b) => (a.gap === b.gap ? a.otherIndex - b.otherIndex : a.gap - b.gap));
    return others.slice(0, k).map((entry) => entry.otherIndex);
  });
}

/** 이웃 목록에서 "그 점의 몇 번째 이웃인가"를 빨리 찾는 표. 이웃이 아니면 없다. */
function rankTables(neighbors: readonly number[][]): Map<number, number>[] {
  return neighbors.map((list) => {
    const table = new Map<number, number>();
    // 순위는 1부터. 논문의 (k+1-m) 가중치가 1-기반이기 때문이다.
    list.forEach((neighborIndex, position) => table.set(neighborIndex, position + 1));
    return table;
  });
}

/** 모든 점 쌍의 SNN 유사도 행렬. 대칭이며 대각선은 0이다. */
export function snnSimilarity(neighbors: readonly number[][], k: number): number[][] {
  const ranks = rankTables(neighbors);
  const size = neighbors.length;
  const matrix: number[][] = Array.from({ length: size }, () => new Array<number>(size).fill(0));

  for (let p = 0; p < size; p += 1) {
    for (let q = p + 1; q < size; q += 1) {
      let sum = 0;
      // p의 이웃을 훑으며 q도 그 점을 이웃으로 갖는지 본다. 갖는다면 두 순위를 곱해 더한다.
      for (const shared of neighbors[p]) {
        const m = ranks[p].get(shared);
        const n = ranks[q].get(shared);
        if (m !== undefined && n !== undefined) sum += (k + 1 - m) * (k + 1 - n);
      }
      matrix[p][q] = sum;
      matrix[q][p] = sum;
    }
  }
  return matrix;
}

/**
 * 고차원 밀도: dens(p) = Σ_q sim_k(p,q).
 * 밀도가 높은 점은 무리의 한복판에 있다 - 붓질을 시작하기 좋은 자리다(Step 1).
 */
export function densities(similarity: readonly (readonly number[])[]): number[] {
  return similarity.map((row) => row.reduce((sum, value) => sum + value, 0));
}
