/** 'hedge' 룩 - 생울타리 안의 밭. 지키는 것은 풀빛, 맡기는 것은 볏짚빛. */

import './look.css';
import { CSS_VAR_PREFIX } from '../../core/traits';
import { HEDGE_HAY, HEDGE_PALETTE, HEDGE_SHAPE, HEDGE_TYPE } from './config';

export function hedgeVariables(): Record<string, string> {
  return {
    [`${CSS_VAR_PREFIX}-bg`]: HEDGE_PALETTE.bg,
    [`${CSS_VAR_PREFIX}-surface`]: HEDGE_PALETTE.surface,
    [`${CSS_VAR_PREFIX}-surface-raised`]: HEDGE_PALETTE.surfaceRaised,
    [`${CSS_VAR_PREFIX}-border-color`]: HEDGE_PALETTE.border,
    [`${CSS_VAR_PREFIX}-border-strong`]: HEDGE_PALETTE.borderStrong,
    [`${CSS_VAR_PREFIX}-fg`]: HEDGE_PALETTE.fg,
    [`${CSS_VAR_PREFIX}-fg-muted`]: HEDGE_PALETTE.fgMuted,
    [`${CSS_VAR_PREFIX}-accent`]: HEDGE_PALETTE.accent,
    [`${CSS_VAR_PREFIX}-accent-fg`]: HEDGE_PALETTE.accentFg,
    [`${CSS_VAR_PREFIX}-accent-soft`]: HEDGE_PALETTE.accentSoft,
    [`${CSS_VAR_PREFIX}-accent-glow`]: HEDGE_PALETTE.accentGlow,
    [`${CSS_VAR_PREFIX}-focus`]: HEDGE_PALETTE.focus,
    [`${CSS_VAR_PREFIX}-radius-sm`]: HEDGE_SHAPE.radiusSm,
    [`${CSS_VAR_PREFIX}-radius-md`]: HEDGE_SHAPE.radiusMd,
    [`${CSS_VAR_PREFIX}-radius-lg`]: HEDGE_SHAPE.radiusLg,
    [`${CSS_VAR_PREFIX}-shadow-sm`]: HEDGE_SHAPE.shadowSm,
    [`${CSS_VAR_PREFIX}-shadow-md`]: HEDGE_SHAPE.shadowMd,
    [`${CSS_VAR_PREFIX}-shadow-lg`]: HEDGE_SHAPE.shadowLg,
    [`${CSS_VAR_PREFIX}-font-heading`]: HEDGE_TYPE.heading,
    [`${CSS_VAR_PREFIX}-font-body`]: HEDGE_TYPE.body,
    [`${CSS_VAR_PREFIX}-font-mono`]: HEDGE_TYPE.mono,
    [`${CSS_VAR_PREFIX}-hay`]: HEDGE_HAY.hay,
    [`${CSS_VAR_PREFIX}-hay-fg`]: HEDGE_HAY.hayFg,
    [`${CSS_VAR_PREFIX}-hay-soft`]: HEDGE_HAY.haySoft,
  };
}
