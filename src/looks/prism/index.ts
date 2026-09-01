/** 'prism' 룩 - 지각 실험실의 흰 벽. 정확히 읽히는 것은 파랑, 눈에 띄는 것은 자홍. */

import './look.css';
import { CSS_VAR_PREFIX } from '../../core/traits';
import { PRISM_PALETTE, PRISM_POP, PRISM_SHAPE, PRISM_TYPE } from './config';

export function prismVariables(): Record<string, string> {
  return {
    [`${CSS_VAR_PREFIX}-bg`]: PRISM_PALETTE.bg,
    [`${CSS_VAR_PREFIX}-surface`]: PRISM_PALETTE.surface,
    [`${CSS_VAR_PREFIX}-surface-raised`]: PRISM_PALETTE.surfaceRaised,
    [`${CSS_VAR_PREFIX}-border-color`]: PRISM_PALETTE.border,
    [`${CSS_VAR_PREFIX}-border-strong`]: PRISM_PALETTE.borderStrong,
    [`${CSS_VAR_PREFIX}-fg`]: PRISM_PALETTE.fg,
    [`${CSS_VAR_PREFIX}-fg-muted`]: PRISM_PALETTE.fgMuted,
    [`${CSS_VAR_PREFIX}-accent`]: PRISM_PALETTE.accent,
    [`${CSS_VAR_PREFIX}-accent-fg`]: PRISM_PALETTE.accentFg,
    [`${CSS_VAR_PREFIX}-accent-soft`]: PRISM_PALETTE.accentSoft,
    [`${CSS_VAR_PREFIX}-accent-glow`]: PRISM_PALETTE.accentGlow,
    [`${CSS_VAR_PREFIX}-focus`]: PRISM_PALETTE.focus,
    [`${CSS_VAR_PREFIX}-radius-sm`]: PRISM_SHAPE.radiusSm,
    [`${CSS_VAR_PREFIX}-radius-md`]: PRISM_SHAPE.radiusMd,
    [`${CSS_VAR_PREFIX}-radius-lg`]: PRISM_SHAPE.radiusLg,
    [`${CSS_VAR_PREFIX}-shadow-sm`]: PRISM_SHAPE.shadowSm,
    [`${CSS_VAR_PREFIX}-shadow-md`]: PRISM_SHAPE.shadowMd,
    [`${CSS_VAR_PREFIX}-shadow-lg`]: PRISM_SHAPE.shadowLg,
    [`${CSS_VAR_PREFIX}-font-heading`]: PRISM_TYPE.heading,
    [`${CSS_VAR_PREFIX}-font-body`]: PRISM_TYPE.body,
    [`${CSS_VAR_PREFIX}-font-mono`]: PRISM_TYPE.mono,
    [`${CSS_VAR_PREFIX}-pop-color`]: PRISM_POP.pop,
    [`${CSS_VAR_PREFIX}-pop-fg`]: PRISM_POP.popFg,
    [`${CSS_VAR_PREFIX}-pop-soft`]: PRISM_POP.popSoft,
  };
}
