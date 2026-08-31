/**
 * 모든 축의 등록 지점.
 *
 * 새 축 그룹을 추가할 때는 이 파일에 import와 배열 항목만 더한다.
 * 축 정의 파일끼리는 서로 import하지 않는다.
 */

import { ACCESSIBILITY_AXES } from './accessibility';
import { CONTENT_AXES } from './content';
import { FORM_AXES } from './form';
import { IDENTITY_AXES } from './identity';
import { INTERACTION_AXES } from './interaction';
import { MOOD_AXES } from './mood';
import { MOTION_AXES } from './motion';
import { SYSTEM_AXES } from './system';
import { TYPOGRAPHY_AXES } from './typography';
import { VOICE_AXES } from './voice';
import type { TraitAxis } from '../model';

export const ALL_AXES: readonly TraitAxis[] = [
  ...IDENTITY_AXES,
  ...MOOD_AXES,
  ...FORM_AXES,
  ...TYPOGRAPHY_AXES,
  ...MOTION_AXES,
  ...INTERACTION_AXES,
  ...VOICE_AXES,
  ...CONTENT_AXES,
  ...SYSTEM_AXES,
  ...ACCESSIBILITY_AXES,
];
