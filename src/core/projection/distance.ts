/**
 * 거리·순위 계산.
 *
 * 신뢰도 지표는 모두 "i에서 본 j의 순위"를 기준으로 정의되므로,
 * 거리 행렬과 순위 행렬을 한 번만 만들어 여러 지표가 나눠 쓴다.
 */

/** 열별로 평균 0, 표준편차 1로 맞춘다. 단위가 다른 열이 거리를 지배하는 것을 막는다. */
export function standardize(rows: readonly number[][]): number[][] {
  if (rows.length === 0) return [];
  const dimensions = rows[0].length;
  const means = new Array<number>(dimensions).fill(0);
  const deviations = new Array<number>(dimensions).fill(0);

  for (let d = 0; d < dimensions; d += 1) {
    let sum = 0;
    for (const row of rows) sum += row[d];
    means[d] = sum / rows.length;

    let squared = 0;
    for (const row of rows) squared += (row[d] - means[d]) ** 2;
    // 표준편차가 0인 열(값이 모두 같은 열)은 나누지 않고 그대로 둔다.
    deviations[d] = Math.sqrt(squared / rows.length) || 1;
  }

  return rows.map((row) => row.map((value, d) => (value - means[d]) / deviations[d]));
}

export function euclidean(a: readonly number[], b: readonly number[]): number {
  let sum = 0;
  for (let i = 0; i < a.length; i += 1) sum += (a[i] - b[i]) ** 2;
  return Math.sqrt(sum);
}

/** 대칭 거리 행렬. 자기 자신과의 거리는 0이다. */
export function distanceMatrix(rows: readonly number[][]): Float64Array[] {
  const size = rows.length;
  const matrix = Array.from({ length: size }, () => new Float64Array(size));
  for (let i = 0; i < size; i += 1) {
    for (let j = i + 1; j < size; j += 1) {
      const distance = euclidean(rows[i], rows[j]);
      matrix[i][j] = distance;
      matrix[j][i] = distance;
    }
  }
  return matrix;
}

/**
 * 각 점에서 본 다른 점들의 순위. 가장 가까운 점이 1위다(자기 자신은 제외).
 * ranks[i][j] = i에서 본 j의 순위.
 */
export function rankMatrix(matrix: readonly Float64Array[]): Int32Array[] {
  const size = matrix.length;
  return matrix.map((row, i) => {
    const order = [];
    for (let j = 0; j < size; j += 1) if (j !== i) order.push(j);
    order.sort((a, b) => row[a] - row[b]);

    const ranks = new Int32Array(size);
    order.forEach((j, position) => {
      ranks[j] = position + 1;
    });
    return ranks;
  });
}

/** 순위 행렬에서 가장 가까운 k개를 뽑는다. */
export function neighborsOf(ranks: readonly Int32Array[], index: number, k: number): number[] {
  const row = ranks[index];
  const found: number[] = [];
  for (let j = 0; j < row.length; j += 1) {
    if (j !== index && row[j] <= k) found.push(j);
  }
  return found;
}
