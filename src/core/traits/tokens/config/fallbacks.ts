/**
 * 페이지가 선언하지 않은 축을 메우는 기본값.
 *
 * 파생 로직에는 숫자를 두지 않는다. 표를 바꾸면 그 표를 읽는 모든 페이지가 함께 움직인다.
 */

/** 축 id -> 그 축 값이 없을 때 쓸 기본값. 모든 페이지가 모든 축을 선언할 필요는 없다. */
export const AXIS_FALLBACKS: Record<string, string> = {
  temperature: 'neutral',
  intensity: 'restrained',
  brightness: 'balanced',
  density: 'comfortable',
  corner: 'rounded',
  border: 'hairline',
  elevation: 'subtle',
  surface: 'plain',
  'type-voice': 'grotesk',
  'type-scale': 'major-third',
  'type-contrast': 'gentle',
  tracking: 'normal',
  leading: 'normal',
  casing: 'sentence',
  'motion-duration': 'measured',
  easing: 'ease-out',
  'contrast-policy': 'apca-body',
};
