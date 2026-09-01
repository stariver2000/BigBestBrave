/** 'circle' 룩 - 둘러앉은 자리. 맞는 자리는 짙은 청록, 어긋나는 자리는 흙빛 붉은색. */

import './look.css';
import { CSS_VAR_PREFIX } from '../../core/traits';
import { CIRCLE_MISS, CIRCLE_PALETTE, CIRCLE_SHAPE, CIRCLE_TYPE } from './config';

export function circleVariables(): Record<string, string> {
  return {
    [`${CSS_VAR_PREFIX}-bg`]: CIRCLE_PALETTE.bg,
    [`${CSS_VAR_PREFIX}-surface`]: CIRCLE_PALETTE.surface,
    [`${CSS_VAR_PREFIX}-surface-raised`]: CIRCLE_PALETTE.surfaceRaised,
    [`${CSS_VAR_PREFIX}-border-color`]: CIRCLE_PALETTE.border,
    [`${CSS_VAR_PREFIX}-border-strong`]: CIRCLE_PALETTE.borderStrong,
    [`${CSS_VAR_PREFIX}-fg`]: CIRCLE_PALETTE.fg,
    [`${CSS_VAR_PREFIX}-fg-muted`]: CIRCLE_PALETTE.fgMuted,
    [`${CSS_VAR_PREFIX}-accent`]: CIRCLE_PALETTE.accent,
    [`${CSS_VAR_PREFIX}-accent-fg`]: CIRCLE_PALETTE.accentFg,
    [`${CSS_VAR_PREFIX}-accent-soft`]: CIRCLE_PALETTE.accentSoft,
    [`${CSS_VAR_PREFIX}-accent-glow`]: CIRCLE_PALETTE.accentGlow,
    [`${CSS_VAR_PREFIX}-focus`]: CIRCLE_PALETTE.focus,
    [`${CSS_VAR_PREFIX}-radius-sm`]: CIRCLE_SHAPE.radiusSm,
    [`${CSS_VAR_PREFIX}-radius-md`]: CIRCLE_SHAPE.radiusMd,
    [`${CSS_VAR_PREFIX}-radius-lg`]: CIRCLE_SHAPE.radiusLg,
    [`${CSS_VAR_PREFIX}-shadow-sm`]: CIRCLE_SHAPE.shadowSm,
    [`${CSS_VAR_PREFIX}-shadow-md`]: CIRCLE_SHAPE.shadowMd,
    [`${CSS_VAR_PREFIX}-shadow-lg`]: CIRCLE_SHAPE.shadowLg,
    [`${CSS_VAR_PREFIX}-font-heading`]: CIRCLE_TYPE.heading,
    [`${CSS_VAR_PREFIX}-font-body`]: CIRCLE_TYPE.body,
    [`${CSS_VAR_PREFIX}-font-mono`]: CIRCLE_TYPE.mono,
    [`${CSS_VAR_PREFIX}-miss`]: CIRCLE_MISS.miss,
    [`${CSS_VAR_PREFIX}-miss-fg`]: CIRCLE_MISS.missFg,
    [`${CSS_VAR_PREFIX}-miss-soft`]: CIRCLE_MISS.missSoft,
  };
}
