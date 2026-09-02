/** 'board' 룩 - 회의실의 화이트보드. 흰 지면에 마커 파랑 하나. */

import './look.css';
import { CSS_VAR_PREFIX } from '../../core/traits';
import { BOARD_PALETTE, BOARD_SHAPE, BOARD_TYPE } from './config';

export function boardVariables(): Record<string, string> {
  return {
    [`${CSS_VAR_PREFIX}-bg`]: BOARD_PALETTE.bg,
    [`${CSS_VAR_PREFIX}-surface`]: BOARD_PALETTE.surface,
    [`${CSS_VAR_PREFIX}-surface-raised`]: BOARD_PALETTE.surfaceRaised,
    [`${CSS_VAR_PREFIX}-border-color`]: BOARD_PALETTE.border,
    [`${CSS_VAR_PREFIX}-border-strong`]: BOARD_PALETTE.borderStrong,
    [`${CSS_VAR_PREFIX}-fg`]: BOARD_PALETTE.fg,
    [`${CSS_VAR_PREFIX}-fg-muted`]: BOARD_PALETTE.fgMuted,
    [`${CSS_VAR_PREFIX}-accent`]: BOARD_PALETTE.accent,
    [`${CSS_VAR_PREFIX}-accent-fg`]: BOARD_PALETTE.accentFg,
    [`${CSS_VAR_PREFIX}-accent-soft`]: BOARD_PALETTE.accentSoft,
    [`${CSS_VAR_PREFIX}-accent-glow`]: BOARD_PALETTE.accentGlow,
    [`${CSS_VAR_PREFIX}-focus`]: BOARD_PALETTE.focus,
    [`${CSS_VAR_PREFIX}-radius-sm`]: BOARD_SHAPE.radiusSm,
    [`${CSS_VAR_PREFIX}-radius-md`]: BOARD_SHAPE.radiusMd,
    [`${CSS_VAR_PREFIX}-radius-lg`]: BOARD_SHAPE.radiusLg,
    [`${CSS_VAR_PREFIX}-shadow-sm`]: BOARD_SHAPE.shadowSm,
    [`${CSS_VAR_PREFIX}-shadow-md`]: BOARD_SHAPE.shadowMd,
    [`${CSS_VAR_PREFIX}-shadow-lg`]: BOARD_SHAPE.shadowLg,
    [`${CSS_VAR_PREFIX}-font-heading`]: BOARD_TYPE.heading,
    [`${CSS_VAR_PREFIX}-font-body`]: BOARD_TYPE.body,
    [`${CSS_VAR_PREFIX}-font-mono`]: BOARD_TYPE.mono,
  };
}
