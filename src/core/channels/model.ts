/**
 * Anchored Harmonic Weber 모형 (논문의 식 2).
 *
 *   |Δ|(x) = w0 · x / xmax  +  1 / ( 1/(wL·x) + 1/(wR·(xmax − x)) )  +  offset
 *
 * 첫 항은 고전적인 베버 비율이고, 둘째 항은 양 끝의 닻(wL, wR)에서 오는 민감도를
 * 조화평균으로 섞은 것이다. 끝점에서는 둘째 항이 사라지고 안쪽에서 봉우리를 이룬다.
 *
 * 논문이 함께 적은 끝점 기울기 항등식을 시험이 수치미분으로 확인한다:
 *   왼끝에서 문턱이 오르는 비율  = wL + w0/xmax
 *   오른끝으로 문턱이 내리는 비율 = wR − w0/xmax
 *
 * 부호와 방향: |Δ|는 '이만큼은 달라야 알아챈다'는 최소 차이다. 낮을수록 민감하다.
 */

export interface WeberParams {
  w0: number;
  wL: number;
  wR: number;
  xmax: number;
  offset: number;
}

/** 기준값 x에서의 최소 감지 차이. 정의역 밖은 끝점으로 자른다. */
export function minimalDifference(x: number, params: WeberParams): number {
  const { w0, wL, wR, xmax, offset } = params;
  const clamped = Math.min(Math.max(x, 0), xmax);
  const weber = (w0 * clamped) / xmax;
  const fromLeft = wL * clamped;
  const fromRight = wR * (xmax - clamped);
  // 어느 한쪽이 0이면 조화평균도 0이다 - 끝점에서 닻 항이 사라진다는 논문의 성질 그대로다.
  const anchor = fromLeft <= 0 || fromRight <= 0 ? 0 : 1 / (1 / fromLeft + 1 / fromRight);
  return weber + anchor + offset;
}

/** 논문이 적은 왼끝 기울기: wL + w0/xmax. */
export function leftSlope(params: WeberParams): number {
  return params.wL + params.w0 / params.xmax;
}

/** 논문이 적은 오른끝 내림 비율: wR - w0/xmax. */
export function rightSlope(params: WeberParams): number {
  return params.wR - params.w0 / params.xmax;
}

/** 곡선을 n+1개 점으로 편다. 화면이 모양을 그릴 때 쓴다. */
export function curve(params: WeberParams, steps: number): { x: number; y: number }[] {
  const points: { x: number; y: number }[] = [];
  for (let i = 0; i <= steps; i += 1) {
    const x = (i / steps) * params.xmax;
    points.push({ x, y: minimalDifference(x, params) });
  }
  return points;
}
