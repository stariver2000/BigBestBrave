/**
 * 예시 자료 생성.
 *
 * 난수를 쓰되 씨앗을 고정한다. 같은 예시에서 항상 같은 결과가 나와야
 * "이 값이 왜 이렇게 나왔는가"를 설명할 수 있기 때문이다.
 */

import { createRandom } from '../../core/random';
import { SAMPLE } from './config';

/** 두 개의 균등난수로 정규분포 표본 하나를 만든다(Box-Muller). */
function gaussian(random: () => number): number {
  const u = Math.max(random(), Number.EPSILON);
  const v = random();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

export function sampleCsv(): string {
  const random = createRandom(SAMPLE.seed);
  const dimensions = SAMPLE.centers[0].length;
  const header = [...Array.from({ length: dimensions }, (_, index) => `f${index + 1}`), 'label'];

  const lines: string[] = [header.join(',')];
  SAMPLE.centers.forEach((center, cluster) => {
    for (let point = 0; point < SAMPLE.perCluster; point += 1) {
      const features = center.map((value) => (value + gaussian(random) * SAMPLE.spread).toFixed(4));
      lines.push([...features, `cluster-${cluster + 1}`].join(','));
    }
  });
  return lines.join('\n');
}
