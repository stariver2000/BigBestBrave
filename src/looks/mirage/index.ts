/** 'mirage' 룩 - 신기루. 읽어도 되는 것은 청록, 읽으면 안 되는 것은 모래 위 주황. */

import './look.css';
import { CSS_VAR_PREFIX } from '../../core/traits';
import { MIRAGE_HEAT, MIRAGE_PALETTE, MIRAGE_SHAPE, MIRAGE_TYPE } from './config';

export function mirageVariables(): Record<string, string> {
  return {
    [`${CSS_VAR_PREFIX}-bg`]: MIRAGE_PALETTE.bg,
    [`${CSS_VAR_PREFIX}-surface`]: MIRAGE_PALETTE.surface,
    [`${CSS_VAR_PREFIX}-surface-raised`]: MIRAGE_PALETTE.surfaceRaised,
    [`${CSS_VAR_PREFIX}-border-color`]: MIRAGE_PALETTE.border,
    [`${CSS_VAR_PREFIX}-border-strong`]: MIRAGE_PALETTE.borderStrong,
    [`${CSS_VAR_PREFIX}-fg`]: MIRAGE_PALETTE.fg,
    [`${CSS_VAR_PREFIX}-fg-muted`]: MIRAGE_PALETTE.fgMuted,
    [`${CSS_VAR_PREFIX}-accent`]: MIRAGE_PALETTE.accent,
    [`${CSS_VAR_PREFIX}-accent-fg`]: MIRAGE_PALETTE.accentFg,
    [`${CSS_VAR_PREFIX}-accent-soft`]: MIRAGE_PALETTE.accentSoft,
    [`${CSS_VAR_PREFIX}-accent-glow`]: MIRAGE_PALETTE.accentGlow,
    [`${CSS_VAR_PREFIX}-focus`]: MIRAGE_PALETTE.focus,
    [`${CSS_VAR_PREFIX}-radius-sm`]: MIRAGE_SHAPE.radiusSm,
    [`${CSS_VAR_PREFIX}-radius-md`]: MIRAGE_SHAPE.radiusMd,
    [`${CSS_VAR_PREFIX}-radius-lg`]: MIRAGE_SHAPE.radiusLg,
    [`${CSS_VAR_PREFIX}-shadow-sm`]: MIRAGE_SHAPE.shadowSm,
    [`${CSS_VAR_PREFIX}-shadow-md`]: MIRAGE_SHAPE.shadowMd,
    [`${CSS_VAR_PREFIX}-shadow-lg`]: MIRAGE_SHAPE.shadowLg,
    [`${CSS_VAR_PREFIX}-font-heading`]: MIRAGE_TYPE.heading,
    [`${CSS_VAR_PREFIX}-font-body`]: MIRAGE_TYPE.body,
    [`${CSS_VAR_PREFIX}-font-mono`]: MIRAGE_TYPE.mono,
    [`${CSS_VAR_PREFIX}-mirage`]: MIRAGE_HEAT.mirage,
    [`${CSS_VAR_PREFIX}-mirage-fg`]: MIRAGE_HEAT.mirageFg,
    [`${CSS_VAR_PREFIX}-mirage-soft`]: MIRAGE_HEAT.mirageSoft,
  };
}
