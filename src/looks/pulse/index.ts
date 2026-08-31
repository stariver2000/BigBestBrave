/** 'pulse' 룩 — 눈 감은 어둠과 맥박 하나. */

import { CSS_VAR_PREFIX } from '../../core/traits';
import { PULSE_PALETTE, PULSE_SHAPE, PULSE_TYPE, PULSE_WASH } from './config';

export function pulseVariables(): Record<string, string> {
  return {
    [`${CSS_VAR_PREFIX}-bg`]: PULSE_PALETTE.bg,
    [`${CSS_VAR_PREFIX}-surface`]: PULSE_PALETTE.surface,
    [`${CSS_VAR_PREFIX}-surface-raised`]: PULSE_PALETTE.surfaceRaised,
    [`${CSS_VAR_PREFIX}-border-color`]: PULSE_PALETTE.border,
    [`${CSS_VAR_PREFIX}-border-strong`]: PULSE_PALETTE.borderStrong,
    [`${CSS_VAR_PREFIX}-fg`]: PULSE_PALETTE.fg,
    [`${CSS_VAR_PREFIX}-fg-muted`]: PULSE_PALETTE.fgMuted,
    [`${CSS_VAR_PREFIX}-accent`]: PULSE_PALETTE.accent,
    [`${CSS_VAR_PREFIX}-accent-fg`]: PULSE_PALETTE.accentFg,
    [`${CSS_VAR_PREFIX}-accent-soft`]: PULSE_PALETTE.accentSoft,
    [`${CSS_VAR_PREFIX}-accent-glow`]: PULSE_PALETTE.accentGlow,
    [`${CSS_VAR_PREFIX}-focus`]: PULSE_PALETTE.focus,
    [`${CSS_VAR_PREFIX}-radius-sm`]: PULSE_SHAPE.radiusSm,
    [`${CSS_VAR_PREFIX}-radius-md`]: PULSE_SHAPE.radiusMd,
    [`${CSS_VAR_PREFIX}-radius-lg`]: PULSE_SHAPE.radiusLg,
    [`${CSS_VAR_PREFIX}-shadow-sm`]: PULSE_SHAPE.shadowSm,
    [`${CSS_VAR_PREFIX}-shadow-md`]: PULSE_SHAPE.shadowMd,
    [`${CSS_VAR_PREFIX}-shadow-lg`]: PULSE_SHAPE.shadowLg,
    [`${CSS_VAR_PREFIX}-font-heading`]: PULSE_TYPE.heading,
    [`${CSS_VAR_PREFIX}-font-body`]: PULSE_TYPE.body,
    '--look-wash-a': PULSE_WASH.a,
    '--look-wash-b': PULSE_WASH.b,
    '--look-wash-c': 'transparent',
  };
}
