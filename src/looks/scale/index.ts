/** 'scale' 룩 — 장부와 저울. 성공 쪽과 비용 쪽에 각각 색을 하나씩 준다. */

import './look.css';
import { CSS_VAR_PREFIX } from '../../core/traits';
import { SCALE_COST, SCALE_PALETTE, SCALE_SHAPE, SCALE_TYPE } from './config';

export function scaleVariables(): Record<string, string> {
  return {
    [`${CSS_VAR_PREFIX}-bg`]: SCALE_PALETTE.bg,
    [`${CSS_VAR_PREFIX}-surface`]: SCALE_PALETTE.surface,
    [`${CSS_VAR_PREFIX}-surface-raised`]: SCALE_PALETTE.surfaceRaised,
    [`${CSS_VAR_PREFIX}-border-color`]: SCALE_PALETTE.border,
    [`${CSS_VAR_PREFIX}-border-strong`]: SCALE_PALETTE.borderStrong,
    [`${CSS_VAR_PREFIX}-fg`]: SCALE_PALETTE.fg,
    [`${CSS_VAR_PREFIX}-fg-muted`]: SCALE_PALETTE.fgMuted,
    [`${CSS_VAR_PREFIX}-accent`]: SCALE_PALETTE.accent,
    [`${CSS_VAR_PREFIX}-accent-fg`]: SCALE_PALETTE.accentFg,
    [`${CSS_VAR_PREFIX}-accent-soft`]: SCALE_PALETTE.accentSoft,
    [`${CSS_VAR_PREFIX}-accent-glow`]: SCALE_PALETTE.accentGlow,
    [`${CSS_VAR_PREFIX}-focus`]: SCALE_PALETTE.focus,
    [`${CSS_VAR_PREFIX}-radius-sm`]: SCALE_SHAPE.radiusSm,
    [`${CSS_VAR_PREFIX}-radius-md`]: SCALE_SHAPE.radiusMd,
    [`${CSS_VAR_PREFIX}-radius-lg`]: SCALE_SHAPE.radiusLg,
    [`${CSS_VAR_PREFIX}-shadow-sm`]: SCALE_SHAPE.shadowSm,
    [`${CSS_VAR_PREFIX}-shadow-md`]: SCALE_SHAPE.shadowMd,
    [`${CSS_VAR_PREFIX}-shadow-lg`]: SCALE_SHAPE.shadowLg,
    [`${CSS_VAR_PREFIX}-font-heading`]: SCALE_TYPE.heading,
    [`${CSS_VAR_PREFIX}-font-body`]: SCALE_TYPE.body,
    [`${CSS_VAR_PREFIX}-font-mono`]: SCALE_TYPE.mono,
    [`${CSS_VAR_PREFIX}-cost`]: SCALE_COST.cost,
    [`${CSS_VAR_PREFIX}-cost-soft`]: SCALE_COST.costSoft,
  };
}
