/**
 * 베타 분포에서 뽑기.
 *
 * 톰프슨 표집은 "이 팔의 성공 확률이 얼마쯤일까"를 하나 뽑아 보는 일이다. 성공을 alpha번,
 * 실패를 beta번 본 뒤의 믿음이 곧 Beta(alpha+1, beta+1)이므로 거기서 뽑는다.
 * 아직 아무것도 보지 못했을 때(0, 0)는 Beta(1, 1) = 균등분포가 되어, 0부터 1까지
 * 아무 값이나 나온다. 처음에 팔들을 두루 찔러 보게 되는 까닭이 이것이다.
 *
 * 베타는 감마 둘의 비로 얻는다: X ~ Gamma(a), Y ~ Gamma(b)일 때 X / (X + Y) ~ Beta(a, b).
 * 감마는 Marsaglia와 Tsang의 방법을 쓴다. 이 방법은 모양값이 1 이상일 때만 쓸 수 있는데,
 * 여기서는 alpha + 1과 beta + 1이 언제나 1 이상이라 그대로 쓸 수 있다.
 */

/** 균등 난수 둘을 정규 난수 하나로. */
function gaussian(random: () => number): number {
  const u = Math.max(random(), 1e-12);
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * random());
}

/** Gamma(shape, 1). shape >= 1이어야 한다. */
export function gammaSample(shape: number, random: () => number): number {
  const d = shape - 1 / 3;
  const c = 1 / Math.sqrt(9 * d);
  // 기각 표집이다. 받아들여질 때까지 되풀이하지만 평균 한두 번이면 끝난다.
  for (let guard = 0; guard < 1000; guard += 1) {
    const x = gaussian(random);
    const v = Math.pow(1 + c * x, 3);
    if (v <= 0) continue;
    const u = Math.max(random(), 1e-12);
    if (u < 1 - 0.0331 * Math.pow(x, 4)) return d * v;
    if (Math.log(u) < 0.5 * x * x + d * (1 - v + Math.log(v))) return d * v;
  }
  // 여기까지 오는 일은 사실상 없다. 그래도 값을 내야 하므로 평균을 돌려준다.
  return shape;
}

/** Beta(a, b). a, b >= 1이어야 한다. */
export function betaSample(a: number, b: number, random: () => number): number {
  const x = gammaSample(a, random);
  const y = gammaSample(b, random);
  const total = x + y;
  return total <= 0 ? 0.5 : x / total;
}
