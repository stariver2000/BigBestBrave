/**
 * 가중 특징 공간의 결정론적 투영.
 *
 * 논문은 UMAP을 쓰고, 상호작용 속도를 위해 그것을 신경망으로 흉내 냈다(5.2절).
 * 둘 다 브라우저 안에서 가중치 파일 없이 돌릴 수 없으므로, 이 페이지는 대신
 * 가중 주성분 투영을 쓴다 - 특징을 표준화하고 가중치를 곱한 뒤 상위 두 주성분에
 * 얹는다. 선형이라 UMAP이 잡는 굽은 구조는 못 잡지만, 이 페이지가 보이려는 것
 * (가중치를 돌리면 배치가 어떻게 달라지는가)은 그대로 성립한다. 화면에 밝힌다.
 *
 * 고유분해는 야코비 회전으로 한다. 대칭 행렬에서 늘 같은 답을 주므로 링크를
 * 열 때마다 같은 그림이 나온다.
 */

import type { Point } from './data';

export interface Projected {
  id: number;
  x: number;
  y: number;
}

/** 특징별 평균과 표준편차. 가중치를 곱하기 전에 눈금을 맞춘다. */
function standardize(points: readonly Point[]): number[][] {
  const dims = points[0]?.values.length ?? 0;
  const means = new Array(dims).fill(0);
  for (const point of points) {
    for (let j = 0; j < dims; j += 1) means[j] += point.values[j];
  }
  for (let j = 0; j < dims; j += 1) means[j] /= points.length;

  const sds = new Array(dims).fill(0);
  for (const point of points) {
    for (let j = 0; j < dims; j += 1) {
      const diff = point.values[j] - means[j];
      sds[j] += diff * diff;
    }
  }
  for (let j = 0; j < dims; j += 1) {
    sds[j] = Math.sqrt(sds[j] / Math.max(1, points.length - 1)) || 1;
  }
  return points.map((point) => point.values.map((value, j) => (value - means[j]) / sds[j]));
}

/** 대칭 행렬의 고유분해(야코비). 고유값 내림차순으로 정렬해 돌려준다. */
export function jacobiEigen(
  matrix: number[][],
  sweeps = 60,
): { values: number[]; vectors: number[][] } {
  const n = matrix.length;
  const a = matrix.map((row) => row.slice());
  // v는 열이 고유벡터가 된다.
  const v: number[][] = Array.from({ length: n }, (_, i) =>
    Array.from({ length: n }, (_, j) => (i === j ? 1 : 0)),
  );

  for (let sweep = 0; sweep < sweeps; sweep += 1) {
    let off = 0;
    for (let p = 0; p < n; p += 1) {
      for (let q = p + 1; q < n; q += 1) off += a[p][q] * a[p][q];
    }
    if (off < 1e-18) break;
    for (let p = 0; p < n; p += 1) {
      for (let q = p + 1; q < n; q += 1) {
        if (Math.abs(a[p][q]) < 1e-15) continue;
        const theta = (a[q][q] - a[p][p]) / (2 * a[p][q]);
        const t = Math.sign(theta || 1) / (Math.abs(theta) + Math.sqrt(theta * theta + 1));
        const c = 1 / Math.sqrt(t * t + 1);
        const s = t * c;
        for (let k = 0; k < n; k += 1) {
          const akp = a[k][p];
          const akq = a[k][q];
          a[k][p] = c * akp - s * akq;
          a[k][q] = s * akp + c * akq;
        }
        for (let k = 0; k < n; k += 1) {
          const apk = a[p][k];
          const aqk = a[q][k];
          a[p][k] = c * apk - s * aqk;
          a[q][k] = s * apk + c * aqk;
        }
        for (let k = 0; k < n; k += 1) {
          const vkp = v[k][p];
          const vkq = v[k][q];
          v[k][p] = c * vkp - s * vkq;
          v[k][q] = s * vkp + c * vkq;
        }
      }
    }
  }

  const order = Array.from({ length: n }, (_, i) => i).sort((p, q) => a[q][q] - a[p][p]);
  return {
    values: order.map((i) => a[i][i]),
    // 부호를 고정한다. 가장 큰 성분을 양수로 두면 같은 자료에 늘 같은 그림이 나온다.
    vectors: order.map((i) => {
      const column = v.map((row) => row[i]);
      let biggest = 0;
      for (let k = 1; k < n; k += 1) {
        if (Math.abs(column[k]) > Math.abs(column[biggest])) biggest = k;
      }
      return column[biggest] < 0 ? column.map((value) => -value) : column;
    }),
  };
}

/**
 * 가중치를 실은 투영. 결과는 [0, 1] 사각형에 맞춰 늘린다 - 격자 엔트로피와
 * 화면 좌표가 같은 눈금을 쓰게 하기 위해서다.
 * 모든 가중치가 0이면 좌표가 정의되지 않으므로 한가운데로 모은다.
 */
export function project(points: readonly Point[], weights: readonly number[]): Projected[] {
  if (points.length === 0) return [];
  const dims = points[0].values.length;
  const scaled = standardize(points).map((row) => row.map((value, j) => value * (weights[j] ?? 0)));

  const total = weights.reduce((sum, weight) => sum + Math.abs(weight), 0);
  if (total < 1e-12) return points.map((point) => ({ id: point.id, x: 0.5, y: 0.5 }));

  const cov: number[][] = Array.from({ length: dims }, () => new Array(dims).fill(0));
  for (const row of scaled) {
    for (let i = 0; i < dims; i += 1) {
      for (let j = i; j < dims; j += 1) {
        const value = row[i] * row[j];
        cov[i][j] += value;
        if (i !== j) cov[j][i] += value;
      }
    }
  }
  const denominator = Math.max(1, points.length - 1);
  for (let i = 0; i < dims; i += 1) {
    for (let j = 0; j < dims; j += 1) cov[i][j] /= denominator;
  }

  const { vectors } = jacobiEigen(cov);
  const axisX = vectors[0] ?? new Array(dims).fill(0);
  const axisY = vectors[1] ?? new Array(dims).fill(0);

  const raw = scaled.map((row, index) => ({
    id: points[index].id,
    x: row.reduce((sum, value, j) => sum + value * axisX[j], 0),
    y: row.reduce((sum, value, j) => sum + value * axisY[j], 0),
  }));

  return normalize(raw);
}

/** [0, 1] 사각형으로 늘린다. 한 축이 납작하면 그 축은 가운데에 둔다. */
function normalize(raw: readonly Projected[]): Projected[] {
  const xs = raw.map((p) => p.x);
  const ys = raw.map((p) => p.y);
  const spanX = Math.max(...xs) - Math.min(...xs);
  const spanY = Math.max(...ys) - Math.min(...ys);
  const minX = Math.min(...xs);
  const minY = Math.min(...ys);
  return raw.map((p) => ({
    id: p.id,
    x: spanX < 1e-12 ? 0.5 : (p.x - minX) / spanX,
    y: spanY < 1e-12 ? 0.5 : (p.y - minY) / spanY,
  }));
}
