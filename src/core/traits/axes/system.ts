/**
 * 기술 조건 축: 이 페이지가 소비하는 자원과 실행 방식.
 *
 * 이 축들이 특성 목록에 함께 있는 이유: 페이지가 수백 개로 늘어날 때
 * "어떤 페이지가 LLM을 쓰는가", "무거운 계산을 하는가"를 데이터로 질의해야 하기 때문이다.
 * (19개 값)
 */

import { axis, label, v } from '../model';

export const RENDER_MODE = axis(
  'render-mode',
  'system',
  label('렌더 방식', 'Render mode', 'レンダー方式'),
  [
    v('static', '정적 생성', 'Static', '静的生成'),
    v('server', '서버 렌더', 'Server render', 'サーバーレンダー'),
    v('client', '클라이언트', 'Client', 'クライアント'),
    v('streaming', '스트리밍', 'Streaming', 'ストリーミング'),
  ],
);

export const COMPUTE_BUDGET = axis(
  'compute-budget',
  'system',
  label('연산 예산', 'Compute budget', '計算予算'),
  [
    v('zero', '없음', 'Zero', 'ゼロ'),
    v('light', '가벼움', 'Light', '軽量'),
    v('moderate', '보통', 'Moderate', '中程度'),
    v('heavy', '무거움', 'Heavy', '重い'),
  ],
);

export const LLM_USAGE = axis(
  'llm-usage',
  'system',
  label('LLM 사용', 'LLM usage', 'LLM利用'),
  [
    v('none', '사용 안 함', 'None', '不使用'),
    v('optional', '선택적 보조', 'Optional', '任意の補助'),
    v('assisted', '주요 보조', 'Assisted', '主要な補助'),
    v('core', '핵심 기능', 'Core', '中核機能'),
  ],
);

export const STATE_SCOPE = axis(
  'state-scope',
  'system',
  label('상태 범위', 'State scope', '状態の範囲'),
  [
    v('stateless', '무상태', 'Stateless', '無状態'),
    v('session', '세션', 'Session', 'セッション'),
    v('device', '기기', 'Device', '端末'),
    v('account', '계정', 'Account', 'アカウント'),
  ],
);

export const OFFLINE = axis(
  'offline',
  'system',
  label('오프라인 동작', 'Offline capability', 'オフライン動作'),
  [
    v('online-only', '온라인 전용', 'Online only', 'オンライン専用'),
    v('degraded', '축소 동작', 'Degraded', '機能縮小'),
    v('full', '완전 동작', 'Full', '完全動作'),
  ],
);

export const SYSTEM_AXES = [RENDER_MODE, COMPUTE_BUDGET, LLM_USAGE, STATE_SCOPE, OFFLINE];
