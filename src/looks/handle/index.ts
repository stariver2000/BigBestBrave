/** 'handle' 룩 - 밝은 작업대의 손잡이. 잡을 것은 보랏빛, 코드 짝은 짙은 청록. */

import './look.css';
import { CSS_VAR_PREFIX } from '../../core/traits';
import { HANDLE_PALETTE, HANDLE_SECOND, HANDLE_SHAPE, HANDLE_TYPE } from './config';

export function handleVariables(): Record<string, string> {
  return {
    [`${CSS_VAR_PREFIX}-bg`]: HANDLE_PALETTE.bg,
    [`${CSS_VAR_PREFIX}-surface`]: HANDLE_PALETTE.surface,
    [`${CSS_VAR_PREFIX}-surface-raised`]: HANDLE_PALETTE.surfaceRaised,
    [`${CSS_VAR_PREFIX}-border-color`]: HANDLE_PALETTE.border,
    [`${CSS_VAR_PREFIX}-border-strong`]: HANDLE_PALETTE.borderStrong,
    [`${CSS_VAR_PREFIX}-fg`]: HANDLE_PALETTE.fg,
    [`${CSS_VAR_PREFIX}-fg-muted`]: HANDLE_PALETTE.fgMuted,
    [`${CSS_VAR_PREFIX}-accent`]: HANDLE_PALETTE.accent,
    [`${CSS_VAR_PREFIX}-accent-fg`]: HANDLE_PALETTE.accentFg,
    [`${CSS_VAR_PREFIX}-accent-soft`]: HANDLE_PALETTE.accentSoft,
    [`${CSS_VAR_PREFIX}-accent-glow`]: HANDLE_PALETTE.accentGlow,
    [`${CSS_VAR_PREFIX}-focus`]: HANDLE_PALETTE.focus,
    [`${CSS_VAR_PREFIX}-radius-sm`]: HANDLE_SHAPE.radiusSm,
    [`${CSS_VAR_PREFIX}-radius-md`]: HANDLE_SHAPE.radiusMd,
    [`${CSS_VAR_PREFIX}-radius-lg`]: HANDLE_SHAPE.radiusLg,
    [`${CSS_VAR_PREFIX}-shadow-sm`]: HANDLE_SHAPE.shadowSm,
    [`${CSS_VAR_PREFIX}-shadow-md`]: HANDLE_SHAPE.shadowMd,
    [`${CSS_VAR_PREFIX}-shadow-lg`]: HANDLE_SHAPE.shadowLg,
    [`${CSS_VAR_PREFIX}-font-heading`]: HANDLE_TYPE.heading,
    [`${CSS_VAR_PREFIX}-font-body`]: HANDLE_TYPE.body,
    [`${CSS_VAR_PREFIX}-font-mono`]: HANDLE_TYPE.mono,
    [`${CSS_VAR_PREFIX}-second-color`]: HANDLE_SECOND.second,
    [`${CSS_VAR_PREFIX}-second-fg`]: HANDLE_SECOND.secondFg,
    [`${CSS_VAR_PREFIX}-second-soft`]: HANDLE_SECOND.secondSoft,
  };
}
