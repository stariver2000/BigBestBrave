/** 마우스 배꼽 코어의 공개 진입점. */

export {
  DEVICE,
  HUMAN_OBSERVATION,
  HUMAN_PRINTED_AVERAGE,
  HUMAN_REGRESSIONS,
  INDIVIDUAL,
  PATH_DEVIATION,
  ROBOT,
  STUDY,
  THROUGHPUT,
  type RegressionRow,
} from './config';
export { PLAN_STEPS, planAngle, planLengthMm, planPoint, planSamples } from './plan';
export {
  pathLength,
  rotationOf,
  sensorReading,
  tracePath,
  virtualReading,
  xExtent,
  type Point,
  type Sample,
} from './sensor';
export {
  discrepancyPercent,
  dropPercent,
  kilocountToMm,
  personalGain,
  regressionAverage,
  risePercent,
  robotLongerPercent,
  trialsPerParticipant,
} from './stats';
