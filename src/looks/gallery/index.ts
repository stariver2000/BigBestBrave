/** 'gallery' 룩 — 흰 벽의 전시장. 색은 화면이 아니라 작품이 낸다. */

import './look.css';
import { CSS_VAR_PREFIX } from '../../core/traits';
import { GALLERY_PALETTE, GALLERY_SHAPE, GALLERY_TYPE } from './config';

export function galleryVariables(): Record<string, string> {
  return {
    [`${CSS_VAR_PREFIX}-bg`]: GALLERY_PALETTE.bg,
    [`${CSS_VAR_PREFIX}-surface`]: GALLERY_PALETTE.surface,
    [`${CSS_VAR_PREFIX}-surface-raised`]: GALLERY_PALETTE.surfaceRaised,
    [`${CSS_VAR_PREFIX}-border-color`]: GALLERY_PALETTE.border,
    [`${CSS_VAR_PREFIX}-border-strong`]: GALLERY_PALETTE.borderStrong,
    [`${CSS_VAR_PREFIX}-fg`]: GALLERY_PALETTE.fg,
    [`${CSS_VAR_PREFIX}-fg-muted`]: GALLERY_PALETTE.fgMuted,
    [`${CSS_VAR_PREFIX}-accent`]: GALLERY_PALETTE.accent,
    [`${CSS_VAR_PREFIX}-accent-fg`]: GALLERY_PALETTE.accentFg,
    [`${CSS_VAR_PREFIX}-accent-soft`]: GALLERY_PALETTE.accentSoft,
    [`${CSS_VAR_PREFIX}-accent-glow`]: GALLERY_PALETTE.accentGlow,
    [`${CSS_VAR_PREFIX}-focus`]: GALLERY_PALETTE.focus,
    [`${CSS_VAR_PREFIX}-radius-sm`]: GALLERY_SHAPE.radiusSm,
    [`${CSS_VAR_PREFIX}-radius-md`]: GALLERY_SHAPE.radiusMd,
    [`${CSS_VAR_PREFIX}-radius-lg`]: GALLERY_SHAPE.radiusLg,
    [`${CSS_VAR_PREFIX}-shadow-sm`]: GALLERY_SHAPE.shadowSm,
    [`${CSS_VAR_PREFIX}-shadow-md`]: GALLERY_SHAPE.shadowMd,
    [`${CSS_VAR_PREFIX}-shadow-lg`]: GALLERY_SHAPE.shadowLg,
    [`${CSS_VAR_PREFIX}-font-heading`]: GALLERY_TYPE.heading,
    [`${CSS_VAR_PREFIX}-font-body`]: GALLERY_TYPE.body,
  };
}
