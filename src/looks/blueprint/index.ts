/** 'blueprint' 룩 — 모눈종이 위의 도면. 계측하는 화면을 위한 룩이다. */

import { CSS_VAR_PREFIX } from '../../core/traits';
import { BLUEPRINT_GRID, BLUEPRINT_PALETTE, BLUEPRINT_SHAPE, BLUEPRINT_TYPE, BLUEPRINT_WARN } from './config';

export function blueprintVariables(): Record<string, string> {
  return {
    [`${CSS_VAR_PREFIX}-bg`]: BLUEPRINT_PALETTE.bg,
    [`${CSS_VAR_PREFIX}-surface`]: BLUEPRINT_PALETTE.surface,
    [`${CSS_VAR_PREFIX}-surface-raised`]: BLUEPRINT_PALETTE.surfaceRaised,
    [`${CSS_VAR_PREFIX}-border-color`]: BLUEPRINT_PALETTE.border,
    [`${CSS_VAR_PREFIX}-border-strong`]: BLUEPRINT_PALETTE.borderStrong,
    [`${CSS_VAR_PREFIX}-fg`]: BLUEPRINT_PALETTE.fg,
    [`${CSS_VAR_PREFIX}-fg-muted`]: BLUEPRINT_PALETTE.fgMuted,
    [`${CSS_VAR_PREFIX}-accent`]: BLUEPRINT_PALETTE.accent,
    [`${CSS_VAR_PREFIX}-accent-fg`]: BLUEPRINT_PALETTE.accentFg,
    [`${CSS_VAR_PREFIX}-accent-soft`]: BLUEPRINT_PALETTE.accentSoft,
    [`${CSS_VAR_PREFIX}-accent-glow`]: BLUEPRINT_PALETTE.accentGlow,
    [`${CSS_VAR_PREFIX}-focus`]: BLUEPRINT_PALETTE.focus,
    [`${CSS_VAR_PREFIX}-radius-sm`]: BLUEPRINT_SHAPE.radiusSm,
    [`${CSS_VAR_PREFIX}-radius-md`]: BLUEPRINT_SHAPE.radiusMd,
    [`${CSS_VAR_PREFIX}-radius-lg`]: BLUEPRINT_SHAPE.radiusLg,
    [`${CSS_VAR_PREFIX}-shadow-sm`]: BLUEPRINT_SHAPE.shadowSm,
    [`${CSS_VAR_PREFIX}-shadow-md`]: BLUEPRINT_SHAPE.shadowMd,
    [`${CSS_VAR_PREFIX}-shadow-lg`]: BLUEPRINT_SHAPE.shadowLg,
    [`${CSS_VAR_PREFIX}-font-heading`]: BLUEPRINT_TYPE.heading,
    [`${CSS_VAR_PREFIX}-font-body`]: BLUEPRINT_TYPE.body,
    '--look-grid-fine': BLUEPRINT_GRID.fine,
    '--look-grid-coarse': BLUEPRINT_GRID.coarse,
    '--look-grid-fine-size': BLUEPRINT_GRID.fineSize,
    '--look-grid-coarse-size': BLUEPRINT_GRID.coarseSize,
    '--look-warn': BLUEPRINT_WARN,
  };
}
