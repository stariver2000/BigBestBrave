/** 'veil' 룩 - 얇은 장막 뒤의 방. 숨은 것은 연보라, 드러난 것은 복숭아빛. */

import './look.css';
import { CSS_VAR_PREFIX } from '../../core/traits';
import { VEIL_HIDDEN, VEIL_PALETTE, VEIL_SHAPE, VEIL_TYPE } from './config';

export function veilVariables(): Record<string, string> {
  return {
    [`${CSS_VAR_PREFIX}-bg`]: VEIL_PALETTE.bg,
    [`${CSS_VAR_PREFIX}-surface`]: VEIL_PALETTE.surface,
    [`${CSS_VAR_PREFIX}-surface-raised`]: VEIL_PALETTE.surfaceRaised,
    [`${CSS_VAR_PREFIX}-border-color`]: VEIL_PALETTE.border,
    [`${CSS_VAR_PREFIX}-border-strong`]: VEIL_PALETTE.borderStrong,
    [`${CSS_VAR_PREFIX}-fg`]: VEIL_PALETTE.fg,
    [`${CSS_VAR_PREFIX}-fg-muted`]: VEIL_PALETTE.fgMuted,
    [`${CSS_VAR_PREFIX}-accent`]: VEIL_PALETTE.accent,
    [`${CSS_VAR_PREFIX}-accent-fg`]: VEIL_PALETTE.accentFg,
    [`${CSS_VAR_PREFIX}-accent-soft`]: VEIL_PALETTE.accentSoft,
    [`${CSS_VAR_PREFIX}-accent-glow`]: VEIL_PALETTE.accentGlow,
    [`${CSS_VAR_PREFIX}-focus`]: VEIL_PALETTE.focus,
    [`${CSS_VAR_PREFIX}-radius-sm`]: VEIL_SHAPE.radiusSm,
    [`${CSS_VAR_PREFIX}-radius-md`]: VEIL_SHAPE.radiusMd,
    [`${CSS_VAR_PREFIX}-radius-lg`]: VEIL_SHAPE.radiusLg,
    [`${CSS_VAR_PREFIX}-shadow-sm`]: VEIL_SHAPE.shadowSm,
    [`${CSS_VAR_PREFIX}-shadow-md`]: VEIL_SHAPE.shadowMd,
    [`${CSS_VAR_PREFIX}-shadow-lg`]: VEIL_SHAPE.shadowLg,
    [`${CSS_VAR_PREFIX}-font-heading`]: VEIL_TYPE.heading,
    [`${CSS_VAR_PREFIX}-font-body`]: VEIL_TYPE.body,
    [`${CSS_VAR_PREFIX}-font-mono`]: VEIL_TYPE.mono,
    [`${CSS_VAR_PREFIX}-veil-color`]: VEIL_HIDDEN.veil,
    [`${CSS_VAR_PREFIX}-veil-fg`]: VEIL_HIDDEN.veilFg,
    [`${CSS_VAR_PREFIX}-veil-soft`]: VEIL_HIDDEN.veilSoft,
  };
}
