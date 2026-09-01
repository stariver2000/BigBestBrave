/** 'vault' 룩 — 금고 안쪽. 비밀번호를 다루되 겁주지 않는 화면을 위한 룩이다. */

import './look.css';
import { CSS_VAR_PREFIX } from '../../core/traits';
import { VAULT_PALETTE, VAULT_SHAPE, VAULT_SIGNAL, VAULT_TYPE } from './config';

export function vaultVariables(): Record<string, string> {
  return {
    [`${CSS_VAR_PREFIX}-bg`]: VAULT_PALETTE.bg,
    [`${CSS_VAR_PREFIX}-surface`]: VAULT_PALETTE.surface,
    [`${CSS_VAR_PREFIX}-surface-raised`]: VAULT_PALETTE.surfaceRaised,
    [`${CSS_VAR_PREFIX}-border-color`]: VAULT_PALETTE.border,
    [`${CSS_VAR_PREFIX}-border-strong`]: VAULT_PALETTE.borderStrong,
    [`${CSS_VAR_PREFIX}-fg`]: VAULT_PALETTE.fg,
    [`${CSS_VAR_PREFIX}-fg-muted`]: VAULT_PALETTE.fgMuted,
    [`${CSS_VAR_PREFIX}-accent`]: VAULT_PALETTE.accent,
    [`${CSS_VAR_PREFIX}-accent-fg`]: VAULT_PALETTE.accentFg,
    [`${CSS_VAR_PREFIX}-accent-soft`]: VAULT_PALETTE.accentSoft,
    [`${CSS_VAR_PREFIX}-accent-glow`]: VAULT_PALETTE.accentGlow,
    [`${CSS_VAR_PREFIX}-focus`]: VAULT_PALETTE.focus,
    [`${CSS_VAR_PREFIX}-radius-sm`]: VAULT_SHAPE.radiusSm,
    [`${CSS_VAR_PREFIX}-radius-md`]: VAULT_SHAPE.radiusMd,
    [`${CSS_VAR_PREFIX}-radius-lg`]: VAULT_SHAPE.radiusLg,
    [`${CSS_VAR_PREFIX}-shadow-sm`]: VAULT_SHAPE.shadowSm,
    [`${CSS_VAR_PREFIX}-shadow-md`]: VAULT_SHAPE.shadowMd,
    [`${CSS_VAR_PREFIX}-shadow-lg`]: VAULT_SHAPE.shadowLg,
    [`${CSS_VAR_PREFIX}-font-heading`]: VAULT_TYPE.heading,
    [`${CSS_VAR_PREFIX}-font-body`]: VAULT_TYPE.body,
    // 이 룩만 쓰는 값들. 모듈 CSS가 이 이름으로 집는다.
    [`${CSS_VAR_PREFIX}-font-mono`]: VAULT_TYPE.mono,
    [`${CSS_VAR_PREFIX}-alert`]: VAULT_SIGNAL.alert,
    [`${CSS_VAR_PREFIX}-alert-soft`]: VAULT_SIGNAL.alertSoft,
    [`${CSS_VAR_PREFIX}-steady`]: VAULT_SIGNAL.steady,
    [`${CSS_VAR_PREFIX}-steady-soft`]: VAULT_SIGNAL.steadySoft,
  };
}
