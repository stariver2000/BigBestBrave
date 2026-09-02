/**
 * 센서 위치와 커서 궤적의 수식(논문 식 1~4).
 *
 * 마우스의 평면 운동은 이동(T)과 회전(θ)의 합인데, 광 센서는 회전을 읽지 못한다.
 * 대신 회전의 호(弧)가 센서의 자리만큼 가로 이동으로 잘못 읽힌다. 그래서
 * 같은 손놀림이라도 센서가 앞에 있으면 커서가 더 멀리, 뒤에 있으면 덜 간다.
 *
 * 좌표 약속: 표본 하나는 기기 가운데(p=50%) 지점의 이동(dx, dy)과 회전(dtheta)이다.
 * 자리 p의 센서는 가운데에서 (0.5 − p)·r 만큼 앞에 있으므로 그만큼의 호가 가로에 더해진다.
 * 이 약속에서도 논문의 식은 그대로 성립한다: 앞(p=0) − 뒤(p=1) = r·dθ (식 3).
 */

import { DEVICE } from './config';

/** 기기 가운데 지점의 한 표본 운동. 길이는 mm, 각도는 라디안. */
export interface Sample {
  dx: number;
  dy: number;
  dtheta: number;
}

/** 한 점의 좌표(mm). */
export interface Point {
  x: number;
  y: number;
}

/** 자리 p(0=맨 앞, 1=맨 뒤)의 센서가 이 표본에서 읽는 변위. 식 2를 가운데 기준으로 옮긴 것. */
export function sensorReading(sample: Sample, p: number, spanMm: number = DEVICE.sensorSpanMm): Point {
  return {
    x: sample.dx + (0.5 - p) * spanMm * sample.dtheta,
    y: sample.dy,
  };
}

/** 식 1(k=1): 앞·뒤 두 센서의 읽기에서 자리 p의 가상 센서를 합성한다. */
export function virtualReading(front: Point, rear: Point, p: number): Point {
  return {
    x: (1 - p) * front.x + p * rear.x,
    y: (front.y + rear.y) / 2,
  };
}

/** 식 3: 두 센서의 가로 차이에서 회전을 되짚는다. */
export function rotationOf(front: Point, rear: Point, spanMm: number = DEVICE.sensorSpanMm): number {
  return (front.x - rear.x) / spanMm;
}

/** 표본열을 자리 p의 커서 궤적으로 쌓는다. 원점에서 시작한다. */
export function tracePath(samples: readonly Sample[], p: number, spanMm: number = DEVICE.sensorSpanMm): Point[] {
  const points: Point[] = [{ x: 0, y: 0 }];
  let x = 0;
  let y = 0;
  for (const sample of samples) {
    const reading = sensorReading(sample, p, spanMm);
    x += reading.x;
    y += reading.y;
    points.push({ x, y });
  }
  return points;
}

/** 궤적의 길이(mm). */
export function pathLength(points: readonly Point[]): number {
  let length = 0;
  for (let i = 1; i < points.length; i += 1) {
    const dx = points[i].x - points[i - 1].x;
    const dy = points[i].y - points[i - 1].y;
    length += Math.hypot(dx, dy);
  }
  return length;
}

/** 궤적의 가로 폭(mm). 앞 센서 커서가 얼마나 더 넓게 갔는지 잴 때 쓴다. */
export function xExtent(points: readonly Point[]): number {
  if (points.length === 0) return 0;
  let min = points[0].x;
  let max = points[0].x;
  for (const point of points) {
    if (point.x < min) min = point.x;
    if (point.x > max) max = point.x;
  }
  return max - min;
}
