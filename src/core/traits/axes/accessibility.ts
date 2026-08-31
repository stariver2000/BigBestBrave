/** 접근성 축: 페이지가 스스로 지켜야 할 최소 기준. (11개 값) */

import { axis, label, v } from '../model';

export const CONTRAST_POLICY = axis(
  'contrast-policy',
  'accessibility',
  label('대비 기준', 'Contrast policy', 'コントラスト基準'),
  [
    v('wcag-aa', 'WCAG 2.1 AA', 'WCAG 2.1 AA', 'WCAG 2.1 AA'),
    v('wcag-aaa', 'WCAG 2.1 AAA', 'WCAG 2.1 AAA', 'WCAG 2.1 AAA'),
    v('apca-body', 'APCA 본문(Lc 75)', 'APCA body (Lc 75)', 'APCA本文 (Lc 75)'),
    v('apca-large', 'APCA 큰 글씨(Lc 60)', 'APCA large (Lc 60)', 'APCA大文字 (Lc 60)'),
  ],
  true,
);

export const MOTION_POLICY = axis(
  'motion-policy',
  'accessibility',
  label('모션 정책', 'Motion policy', 'モーション方針'),
  [
    v('respect-reduced', '축소 요청 존중', 'Respect reduced motion', '低減設定を尊重'),
    v('always-minimal', '항상 최소', 'Always minimal', '常に最小'),
    v('opt-in', '사용자 선택', 'Opt-in', 'オプトイン'),
  ],
);

export const FOCUS_STYLE = axis(
  'focus-style',
  'accessibility',
  label('포커스 표시', 'Focus style', 'フォーカス表示'),
  [
    v('ring', '링', 'Ring', 'リング'),
    v('underline', '밑줄', 'Underline', '下線'),
    v('inverted', '반전', 'Inverted', '反転'),
    v('offset-outline', '외곽선 오프셋', 'Offset outline', 'オフセット輪郭'),
  ],
);

export const ACCESSIBILITY_AXES = [CONTRAST_POLICY, MOTION_POLICY, FOCUS_STYLE];
