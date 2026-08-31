/**
 * Chroma Lab 페이지의 트리 노드 정의.
 *
 * 루트가 아니라 2층에 두는 이유: 색 대비 검증은 제품을 출시하는 사람에게 필요한 도구지
 * 지나가는 방문자를 붙잡는 도구가 아니다. 필요한 사람이 찾아오는 자리에 둔다.
 */

import { ROOT_ID } from '../../core/tree';
import type { PageNode } from '../../core/tree';
import { chromaDictionary } from './dictionary';

export const chromaLabNode: PageNode = {
  id: 'chroma-lab',
  slug: 'color',
  parentId: ROOT_ID,
  title: {
    ko: chromaDictionary.ko.title,
    en: chromaDictionary.en.title,
    ja: chromaDictionary.ja.title,
  },
  summary: {
    ko: chromaDictionary.ko.summary,
    en: chromaDictionary.en.summary,
    ja: chromaDictionary.ja.summary,
  },
  capability: {
    ko: chromaDictionary.ko.capability,
    en: chromaDictionary.en.capability,
    ja: chromaDictionary.ja.capability,
  },
  // 자식이 생기면 '주제 영역(domain)' 기준으로 갈라진다. 첫 분기가 만들어질 때까지의 예약 값이다.
  splitAxis: 'domain',
  look: 'serene',
  keywords: ['color', 'palette', 'contrast', 'wcag', 'apca', 'oklch', '색', '팔레트', '대비', '配色'],
  traits: {
    domain: ['design', 'dev-tools'],
    audience: ['professional', 'creator'],
    intent: ['create', 'measure'],
    stance: ['clinical'],
    atmosphere: ['elegant', 'dreamy'],
    temperature: ['neutral'],
    brightness: ['bright'],
    intensity: ['saturated'],
    tension: ['still'],
    daytime: ['dawn'],
    layout: ['workbench'],
    density: ['airy'],
    rhythm: ['modular'],
    alignment: ['left'],
    grid: ['col-12'],
    corner: ['organic'],
    border: ['hairline'],
    elevation: ['floating'],
    surface: ['plain'],
    'type-voice': ['editorial-serif'],
    'type-scale': ['major-third'],
    'type-contrast': ['gentle'],
    tracking: ['normal'],
    leading: ['relaxed'],
    casing: ['sentence'],
    'motion-character': ['slow-drift'],
    'motion-duration': ['languid'],
    easing: ['ease-in-out'],
    entrance: ['fade'],
    paradigm: ['direct-manipulation', 'command-palette'],
    navigation: ['tree', 'breadcrumb'],
    feedback: ['responsive'],
    persistence: ['url-state'],
    tone: ['technical', 'terse'],
    person: ['impersonal'],
    'copy-length': ['short'],
    jargon: ['explained'],
    'data-presence': ['central'],
    imagery: ['none'],
    ornament: ['none'],
    'number-format': ['tabular'],
    'render-mode': ['client'],
    'compute-budget': ['zero'],
    'llm-usage': ['optional'],
    'state-scope': ['stateless'],
    offline: ['degraded'],
    'contrast-policy': ['apca-body', 'wcag-aa'],
    'motion-policy': ['respect-reduced'],
    'focus-style': ['ring'],
  },
};
