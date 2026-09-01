/** 'hush' 룩 - 무대 뒤의 낮춘 목소리. 귓속말은 하늘빛, 공개 조치는 장밋빛. */

import './look.css';
import { CSS_VAR_PREFIX } from '../../core/traits';
import { HUSH_PALETTE, HUSH_SHAPE, HUSH_STAGE, HUSH_TYPE } from './config';

export function hushVariables(): Record<string, string> {
  return {
    [`${CSS_VAR_PREFIX}-bg`]: HUSH_PALETTE.bg,
    [`${CSS_VAR_PREFIX}-surface`]: HUSH_PALETTE.surface,
    [`${CSS_VAR_PREFIX}-surface-raised`]: HUSH_PALETTE.surfaceRaised,
    [`${CSS_VAR_PREFIX}-border-color`]: HUSH_PALETTE.border,
    [`${CSS_VAR_PREFIX}-border-strong`]: HUSH_PALETTE.borderStrong,
    [`${CSS_VAR_PREFIX}-fg`]: HUSH_PALETTE.fg,
    [`${CSS_VAR_PREFIX}-fg-muted`]: HUSH_PALETTE.fgMuted,
    [`${CSS_VAR_PREFIX}-accent`]: HUSH_PALETTE.accent,
    [`${CSS_VAR_PREFIX}-accent-fg`]: HUSH_PALETTE.accentFg,
    [`${CSS_VAR_PREFIX}-accent-soft`]: HUSH_PALETTE.accentSoft,
    [`${CSS_VAR_PREFIX}-accent-glow`]: HUSH_PALETTE.accentGlow,
    [`${CSS_VAR_PREFIX}-focus`]: HUSH_PALETTE.focus,
    [`${CSS_VAR_PREFIX}-radius-sm`]: HUSH_SHAPE.radiusSm,
    [`${CSS_VAR_PREFIX}-radius-md`]: HUSH_SHAPE.radiusMd,
    [`${CSS_VAR_PREFIX}-radius-lg`]: HUSH_SHAPE.radiusLg,
    [`${CSS_VAR_PREFIX}-shadow-sm`]: HUSH_SHAPE.shadowSm,
    [`${CSS_VAR_PREFIX}-shadow-md`]: HUSH_SHAPE.shadowMd,
    [`${CSS_VAR_PREFIX}-shadow-lg`]: HUSH_SHAPE.shadowLg,
    [`${CSS_VAR_PREFIX}-font-heading`]: HUSH_TYPE.heading,
    [`${CSS_VAR_PREFIX}-font-body`]: HUSH_TYPE.body,
    [`${CSS_VAR_PREFIX}-font-mono`]: HUSH_TYPE.mono,
    [`${CSS_VAR_PREFIX}-stage-color`]: HUSH_STAGE.stage,
    [`${CSS_VAR_PREFIX}-stage-fg`]: HUSH_STAGE.stageFg,
    [`${CSS_VAR_PREFIX}-stage-soft`]: HUSH_STAGE.stageSoft,
  };
}
