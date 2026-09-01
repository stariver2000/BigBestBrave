/** 'margin' 룩 - 책의 난외. 건네받은 물음은 자주, 스스로 적은 물음은 초록. */

import './look.css';
import { CSS_VAR_PREFIX } from '../../core/traits';
import { MARGIN_OWN, MARGIN_PALETTE, MARGIN_SHAPE, MARGIN_TYPE } from './config';

export function marginVariables(): Record<string, string> {
  return {
    [`${CSS_VAR_PREFIX}-bg`]: MARGIN_PALETTE.bg,
    [`${CSS_VAR_PREFIX}-surface`]: MARGIN_PALETTE.surface,
    [`${CSS_VAR_PREFIX}-surface-raised`]: MARGIN_PALETTE.surfaceRaised,
    [`${CSS_VAR_PREFIX}-border-color`]: MARGIN_PALETTE.border,
    [`${CSS_VAR_PREFIX}-border-strong`]: MARGIN_PALETTE.borderStrong,
    [`${CSS_VAR_PREFIX}-fg`]: MARGIN_PALETTE.fg,
    [`${CSS_VAR_PREFIX}-fg-muted`]: MARGIN_PALETTE.fgMuted,
    [`${CSS_VAR_PREFIX}-accent`]: MARGIN_PALETTE.accent,
    [`${CSS_VAR_PREFIX}-accent-fg`]: MARGIN_PALETTE.accentFg,
    [`${CSS_VAR_PREFIX}-accent-soft`]: MARGIN_PALETTE.accentSoft,
    [`${CSS_VAR_PREFIX}-accent-glow`]: MARGIN_PALETTE.accentGlow,
    [`${CSS_VAR_PREFIX}-focus`]: MARGIN_PALETTE.focus,
    [`${CSS_VAR_PREFIX}-radius-sm`]: MARGIN_SHAPE.radiusSm,
    [`${CSS_VAR_PREFIX}-radius-md`]: MARGIN_SHAPE.radiusMd,
    [`${CSS_VAR_PREFIX}-radius-lg`]: MARGIN_SHAPE.radiusLg,
    [`${CSS_VAR_PREFIX}-shadow-sm`]: MARGIN_SHAPE.shadowSm,
    [`${CSS_VAR_PREFIX}-shadow-md`]: MARGIN_SHAPE.shadowMd,
    [`${CSS_VAR_PREFIX}-shadow-lg`]: MARGIN_SHAPE.shadowLg,
    [`${CSS_VAR_PREFIX}-font-heading`]: MARGIN_TYPE.heading,
    [`${CSS_VAR_PREFIX}-font-body`]: MARGIN_TYPE.body,
    [`${CSS_VAR_PREFIX}-font-mono`]: MARGIN_TYPE.mono,
    [`${CSS_VAR_PREFIX}-own`]: MARGIN_OWN.own,
    [`${CSS_VAR_PREFIX}-own-fg`]: MARGIN_OWN.ownFg,
    [`${CSS_VAR_PREFIX}-own-soft`]: MARGIN_OWN.ownSoft,
  };
}
