/** 'pager' 룩 — 1990년대 무선호출기의 화면. */

import { CSS_VAR_PREFIX } from '../../core/traits';
import { PAGER_LCD, PAGER_PALETTE, PAGER_SHAPE, PAGER_TYPE } from './config';

export function pagerVariables(): Record<string, string> {
  return {
    [`${CSS_VAR_PREFIX}-bg`]: PAGER_PALETTE.bg,
    [`${CSS_VAR_PREFIX}-surface`]: PAGER_PALETTE.surface,
    [`${CSS_VAR_PREFIX}-surface-raised`]: PAGER_PALETTE.surfaceRaised,
    [`${CSS_VAR_PREFIX}-border-color`]: PAGER_PALETTE.border,
    [`${CSS_VAR_PREFIX}-border-strong`]: PAGER_PALETTE.borderStrong,
    [`${CSS_VAR_PREFIX}-fg`]: PAGER_PALETTE.fg,
    [`${CSS_VAR_PREFIX}-fg-muted`]: PAGER_PALETTE.fgMuted,
    [`${CSS_VAR_PREFIX}-accent`]: PAGER_PALETTE.accent,
    [`${CSS_VAR_PREFIX}-accent-fg`]: PAGER_PALETTE.accentFg,
    [`${CSS_VAR_PREFIX}-accent-soft`]: PAGER_PALETTE.accentSoft,
    [`${CSS_VAR_PREFIX}-accent-glow`]: PAGER_PALETTE.accentGlow,
    [`${CSS_VAR_PREFIX}-focus`]: PAGER_PALETTE.focus,
    [`${CSS_VAR_PREFIX}-radius-sm`]: PAGER_SHAPE.radiusSm,
    [`${CSS_VAR_PREFIX}-radius-md`]: PAGER_SHAPE.radiusMd,
    [`${CSS_VAR_PREFIX}-radius-lg`]: PAGER_SHAPE.radiusLg,
    [`${CSS_VAR_PREFIX}-shadow-sm`]: PAGER_SHAPE.shadowSm,
    [`${CSS_VAR_PREFIX}-shadow-md`]: PAGER_SHAPE.shadowMd,
    [`${CSS_VAR_PREFIX}-shadow-lg`]: PAGER_SHAPE.shadowLg,
    [`${CSS_VAR_PREFIX}-font-heading`]: PAGER_TYPE.heading,
    [`${CSS_VAR_PREFIX}-font-body`]: PAGER_TYPE.body,
    '--look-lcd': PAGER_LCD.screen,
    '--look-lcd-ink': PAGER_LCD.ink,
    '--look-lcd-grid': PAGER_LCD.grid,
  };
}
