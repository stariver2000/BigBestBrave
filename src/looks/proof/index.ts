/** 'proof' 룩 — 교정지. 잘못된 자리를 붉게 짚는 화면을 위한 룩이다. */

import './look.css';
import { CSS_VAR_PREFIX } from '../../core/traits';
import { PROOF_PALETTE, PROOF_SHAPE, PROOF_TYPE } from './config';

export function proofVariables(): Record<string, string> {
  return {
    [`${CSS_VAR_PREFIX}-bg`]: PROOF_PALETTE.bg,
    [`${CSS_VAR_PREFIX}-surface`]: PROOF_PALETTE.surface,
    [`${CSS_VAR_PREFIX}-surface-raised`]: PROOF_PALETTE.surfaceRaised,
    [`${CSS_VAR_PREFIX}-border-color`]: PROOF_PALETTE.border,
    [`${CSS_VAR_PREFIX}-border-strong`]: PROOF_PALETTE.borderStrong,
    [`${CSS_VAR_PREFIX}-fg`]: PROOF_PALETTE.fg,
    [`${CSS_VAR_PREFIX}-fg-muted`]: PROOF_PALETTE.fgMuted,
    [`${CSS_VAR_PREFIX}-accent`]: PROOF_PALETTE.accent,
    [`${CSS_VAR_PREFIX}-accent-fg`]: PROOF_PALETTE.accentFg,
    [`${CSS_VAR_PREFIX}-accent-soft`]: PROOF_PALETTE.accentSoft,
    [`${CSS_VAR_PREFIX}-accent-glow`]: PROOF_PALETTE.accentGlow,
    [`${CSS_VAR_PREFIX}-focus`]: PROOF_PALETTE.focus,
    [`${CSS_VAR_PREFIX}-radius-sm`]: PROOF_SHAPE.radiusSm,
    [`${CSS_VAR_PREFIX}-radius-md`]: PROOF_SHAPE.radiusMd,
    [`${CSS_VAR_PREFIX}-radius-lg`]: PROOF_SHAPE.radiusLg,
    [`${CSS_VAR_PREFIX}-shadow-sm`]: PROOF_SHAPE.shadowSm,
    [`${CSS_VAR_PREFIX}-shadow-md`]: PROOF_SHAPE.shadowMd,
    [`${CSS_VAR_PREFIX}-shadow-lg`]: PROOF_SHAPE.shadowLg,
    [`${CSS_VAR_PREFIX}-font-heading`]: PROOF_TYPE.heading,
    [`${CSS_VAR_PREFIX}-font-body`]: PROOF_TYPE.body,
  };
}
