/**
 * 2차원 주성분 분석.
 *
 * 사용자가 이미 만든 임베딩(t-SNE·UMAP 등)을 검사하는 것이 이 도구의 목적이지만,
 * 좌표 없이 고차원 자료만 가진 사람도 바로 결과를 볼 수 있어야 한다.
 * PCA는 무작위성이 없어 같은 입력이면 항상 같은 그림이 나온다는 점에서 기준선으로 알맞다.
 *
 * 고유벡터는 거듭제곱 반복(power iteration)으로 구한다. 공분산 행렬을 만들고
 * 임의의 벡터에 반복해서 곱하면 가장 큰 고윳값의 방향으로 수렴한다.
 * 두 번째 축은 첫 축 성분을 빼낸(deflation) 뒤 같은 방법으로 구한다.
 */

const ITERATIONS = 120;
const EPSILON = 1e-12;

function covariance(rows: readonly number[][]): number[][] {
  const dimensions = rows[0].length;
  const means = new Array<number>(dimensions).fill(0);
  for (const row of rows) for (let d = 0; d < dimensions; d += 1) means[d] += row[d] / rows.length;

  const matrix = Array.from({ length: dimensions }, () => new Array<number>(dimensions).fill(0));
  for (const row of rows) {
    for (let i = 0; i < dimensions; i += 1) {
      const di = row[i] - means[i];
      for (let j = i; j < dimensions; j += 1) {
        const value = (di * (row[j] - means[j])) / rows.length;
        matrix[i][j] += value;
        if (i !== j) matrix[j][i] += value;
      }
    }
  }
  return matrix;
}

function multiply(matrix: readonly number[][], vector: readonly number[]): number[] {
  return matrix.map((row) => row.reduce((sum, value, index) => sum + value * vector[index], 0));
}

function normalize(vector: number[]): number[] {
  const length = Math.sqrt(vector.reduce((sum, value) => sum + value * value, 0));
  return length < EPSILON ? vector : vector.map((value) => value / length);
}

/** 시작 벡터를 고정한다. 난수를 쓰면 같은 자료에서 매번 다른 그림이 나온다. */
function seedVector(size: number, offset: number): number[] {
  return normalize(Array.from({ length: size }, (_, index) => Math.sin(index + 1 + offset)));
}

function principalAxis(matrix: readonly number[][], offset: number): number[] {
  let vector = seedVector(matrix.length, offset);
  for (let step = 0; step < ITERATIONS; step += 1) {
    vector = normalize(multiply(matrix, vector));
  }
  return vector;
}

/** 첫 축 방향의 성분을 공분산에서 제거한다. 남은 행렬의 최대 방향이 두 번째 축이다. */
function deflate(matrix: readonly number[][], axis: readonly number[]): number[][] {
  const scaled = multiply(matrix, axis);
  const eigenvalue = axis.reduce((sum, value, index) => sum + value * scaled[index], 0);
  return matrix.map((row, i) => row.map((value, j) => value - eigenvalue * axis[i] * axis[j]));
}

export function projectToPlane(rows: readonly number[][]): [number, number][] {
  if (rows.length === 0 || rows[0].length === 0) return [];
  if (rows[0].length === 1) return rows.map((row) => [row[0], 0]);

  const matrix = covariance(rows);
  const first = principalAxis(matrix, 0);
  const second = principalAxis(deflate(matrix, first), 1);

  return rows.map((row) => [
    row.reduce((sum, value, index) => sum + value * first[index], 0),
    row.reduce((sum, value, index) => sum + value * second[index], 0),
  ]);
}
