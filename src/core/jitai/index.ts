/** JITAI 코어의 공개 진입점. 다른 계층은 이 파일만 가져다 쓴다. */

export {
  ACCURACY,
  CONDITIONS,
  DESIGN,
  EFFECT_SIZES,
  EXPLANATION_EXAMPLES,
  RANKING,
  RECEPTIVITY,
  SCALE,
  VISIT_REDUCTION,
  type Condition,
  type ConditionId,
  type ExplanationExample,
} from './config';
export {
  accuracyComposition,
  compose,
  delta,
  digitsMatch,
  feedbackRate,
  fourWayAccuracyComposition,
  frictionDigits,
  labelShareSum,
  ratio,
  receptivityGain,
} from './derive';
