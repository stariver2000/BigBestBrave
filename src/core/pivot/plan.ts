/**
 * 로봇 팔의 ∞ 계획을 이 판의 표본열로 옮긴 것.
 *
 * 논문의 로봇은 폭 약 24cm, 높이 약 11cm의 ∞를 그리며 맨 왼쪽에서 -20°,
 * 맨 오른쪽에서 +40°까지 기울였다(그림 5). 정확한 매개변수식은 논문에 없으므로
 * 이 판은 같은 폭·높이·회전 규칙을 1:2 리사주(∞ 모양)에 실었다. 이렇게 그리면
 * 한 바퀴가 702.1mm로 계산되어 논문의 계획 700mm와 2mm 차이로 만난다 —
 * 식이 같아서가 아니라 폭과 높이가 같아서다. 화면에는 계산값 그대로 적는다.
 *
 * 회전 규칙: θ(x)는 x 위치에 비례한다. 왼끝 -20°, 오른끝 +40°.
 * 이 규칙은 사람 손의 회전을 재는 것이 아니라 로봇 계획을 옮긴 것이다 — 화면에 밝힌다.
 */

import { ROBOT } from './config';
import { pathLength, type Point, type Sample } from './sensor';

/** ∞ 한 바퀴를 몇 표본으로 쪼갤지. 화면의 부드러움과 시험의 수렴이 같이 걸려 있다. */
export const PLAN_STEPS = 288;

const HALF_WIDTH = (ROBOT.boundsCm.width * 10) / 2;
const HALF_HEIGHT = (ROBOT.boundsCm.height * 10) / 2;

/** 진행도 t(0~1)에서 가운데 지점의 위치. 1:2 리사주 — 가로 한 번 오갈 때 세로는 두 번. */
export function planPoint(t: number): Point {
  const angle = 2 * Math.PI * t;
  return {
    x: HALF_WIDTH * Math.sin(angle),
    y: HALF_HEIGHT * Math.sin(2 * angle),
  };
}

/** x 위치에서 기울기(라디안). 왼끝 -20°, 오른끝 +40°의 선형 규칙. */
export function planAngle(x: number): number {
  const share = (x + HALF_WIDTH) / (2 * HALF_WIDTH);
  const degrees = ROBOT.rotationDeg.atLeft + share * (ROBOT.rotationDeg.atRight - ROBOT.rotationDeg.atLeft);
  return (degrees * Math.PI) / 180;
}

/** ∞ 한 바퀴의 표본열. 위치 차와 기울기 차를 각 표본에 싣는다. */
export function planSamples(steps: number = PLAN_STEPS): Sample[] {
  const samples: Sample[] = [];
  let previous = planPoint(0);
  let previousAngle = planAngle(previous.x);
  for (let i = 1; i <= steps; i += 1) {
    const current = planPoint(i / steps);
    const currentAngle = planAngle(current.x);
    samples.push({
      dx: current.x - previous.x,
      dy: current.y - previous.y,
      dtheta: currentAngle - previousAngle,
    });
    previous = current;
    previousAngle = currentAngle;
  }
  return samples;
}

/** 이 판의 ∞ 한 바퀴 길이(mm). 논문의 700mm와 견주어 화면에 적는다. */
export function planLengthMm(steps: number = PLAN_STEPS): number {
  const points: Point[] = [];
  for (let i = 0; i <= steps; i += 1) points.push(planPoint(i / steps));
  return pathLength(points);
}
