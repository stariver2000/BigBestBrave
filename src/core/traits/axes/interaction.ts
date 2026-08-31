/** 상호작용 축: 사용자가 페이지를 어떻게 조작하고 이동하는가. (31개 값) */

import { axis, label, v } from '../model';

export const PARADIGM = axis(
  'paradigm',
  'interaction',
  label('조작 방식', 'Interaction paradigm', '操作方式'),
  [
    v('click', '클릭', 'Click', 'クリック'),
    v('command-palette', '커맨드 팔레트', 'Command palette', 'コマンドパレット'),
    v('keyboard-first', '키보드 우선', 'Keyboard-first', 'キーボード優先'),
    v('drag-drop', '드래그 앤 드롭', 'Drag and drop', 'ドラッグ＆ドロップ'),
    v('canvas-manipulation', '캔버스 조작', 'Canvas manipulation', 'キャンバス操作'),
    v('form-wizard', '단계형 폼', 'Form wizard', 'フォームウィザード'),
    v('chat', '대화', 'Chat', 'チャット'),
    v('voice', '음성', 'Voice', '音声'),
    v('gesture', '제스처', 'Gesture', 'ジェスチャー'),
    v('scroll-driven', '스크롤 구동', 'Scroll-driven', 'スクロール駆動'),
    v('hover-reveal', '호버 노출', 'Hover reveal', 'ホバー表示'),
    v('direct-manipulation', '직접 조작', 'Direct manipulation', '直接操作'),
    v('terminal-repl', '터미널 REPL', 'Terminal REPL', 'ターミナルREPL'),
    v('timeline-scrub', '타임라인 스크럽', 'Timeline scrub', 'タイムラインスクラブ'),
  ],
  true,
);

export const NAVIGATION = axis(
  'navigation',
  'interaction',
  label('이동 모델', 'Navigation model', '移動モデル'),
  [
    v('tree', '트리', 'Tree', 'ツリー'),
    v('tabs', '탭', 'Tabs', 'タブ'),
    v('breadcrumb', '브레드크럼', 'Breadcrumb', 'パンくず'),
    v('hub-spoke', '허브 앤 스포크', 'Hub and spoke', 'ハブ＆スポーク'),
    v('infinite', '무한 스크롤', 'Infinite', '無限スクロール'),
    v('wizard', '순차 진행', 'Wizard', 'ウィザード'),
    v('map', '지도', 'Map', 'マップ'),
    v('search-first', '검색 우선', 'Search-first', '検索優先'),
  ],
  true,
);

export const FEEDBACK = axis(
  'feedback',
  'interaction',
  label('피드백', 'Feedback', 'フィードバック'),
  [
    v('silent', '무반응', 'Silent', '無反応'),
    v('minimal', '최소', 'Minimal', '最小'),
    v('responsive', '즉각', 'Responsive', '即時'),
    v('expressive', '표현적', 'Expressive', '表現的'),
    v('haptic', '촉각적', 'Haptic', '触覚的'),
  ],
);

export const PERSISTENCE = axis(
  'persistence',
  'interaction',
  label('상태 보존', 'State persistence', '状態の保存'),
  [
    v('none', '없음', 'None', 'なし'),
    v('url-state', 'URL 상태', 'URL state', 'URL状態'),
    v('local-storage', '로컬 저장', 'Local storage', 'ローカル保存'),
    v('server', '서버 저장', 'Server', 'サーバー保存'),
  ],
  true,
);

export const INTERACTION_AXES = [PARADIGM, NAVIGATION, FEEDBACK, PERSISTENCE];
