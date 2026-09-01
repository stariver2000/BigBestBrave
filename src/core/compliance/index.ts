/**
 * 물렁함 착시 코어.
 *
 * 딱딱한 화면을 물렁하게 느끼게 하려고 보내는 진동을 짓고, 그 설정 가운데 어느 것이
 * 손끝에 실제로 닿는지를 논문의 초록에서 되짚는다.
 */

export {
  AFFECTS,
  AXES,
  BURST_MS,
  CARRIER_HZ,
  DELAY_RANGE,
  DELAY_THRESHOLD_MS,
  DIMENSIONS,
  PRESS,
  SAMPLE_COUNT,
  WAVEFORMS,
  type Axis,
  type Dimension,
  type Waveform,
} from './config';
export {
  delayHeadroom,
  delayNoticeable,
  noticeableCount,
  verdicts,
  type FactorVerdict,
  type Setting,
} from './perception';
export { amplitudeFor, cycle, rms, sampleAt } from './waveform';
