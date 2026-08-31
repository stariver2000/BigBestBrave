/**
 * 자막 재분할 페이지의 트리 노드.
 *
 * 루트에서 '주제 영역'으로 갈라진 두 번째 가지다(/color 는 디자인, 여기는 영상·접근성).
 * 근거가 된 연구는 config.ts의 PAPER에 적혀 있다.
 */

import { ROOT_ID } from '../../core/tree';
import type { PageNode } from '../../core/tree';
import { subtitleDictionary } from './dictionary';

export const subtitleNode: PageNode = {
  id: 'subtitle-rechunker',
  slug: 'subtitle',
  parentId: ROOT_ID,
  title: {
    ko: subtitleDictionary.ko.title,
    en: subtitleDictionary.en.title,
    ja: subtitleDictionary.ja.title,
  },
  summary: {
    ko: subtitleDictionary.ko.summary,
    en: subtitleDictionary.en.summary,
    ja: subtitleDictionary.ja.summary,
  },
  capability: {
    ko: subtitleDictionary.ko.capability,
    en: subtitleDictionary.en.capability,
    ja: subtitleDictionary.ja.capability,
  },
  look: 'cinema',
  keywords: [
    '자막', 'srt', 'vtt', '캡션', '재분할', '접근성', '영상',
    'subtitle', 'caption', 'rechunk', 'optisub', 'accessibility',
    '字幕', 'キャプション',
  ],
  traits: {
    domain: ['film', 'design', 'dev-tools'],
    audience: ['creator', 'professional'],
    intent: ['create', 'measure'],
    stance: ['clinical'],
    atmosphere: ['cosmic', 'serene'],
    temperature: ['warm'],
    brightness: ['abyssal'],
    intensity: ['saturated'],
    tension: ['calm'],
    daytime: ['night'],
    layout: ['split-screen'],
    density: ['comfortable'],
    rhythm: ['modular'],
    alignment: ['left'],
    grid: ['col-12'],
    corner: ['subtle'],
    border: ['hairline'],
    elevation: ['flat'],
    surface: ['plain'],
    'type-voice': ['grotesk'],
    'type-scale': ['major-third'],
    'type-contrast': ['gentle'],
    tracking: ['normal'],
    leading: ['normal'],
    casing: ['sentence'],
    'motion-character': ['subtle-fade'],
    'motion-duration': ['quick'],
    easing: ['ease-out'],
    entrance: ['fade'],
    paradigm: ['direct-manipulation'],
    navigation: ['tree', 'breadcrumb'],
    feedback: ['responsive'],
    persistence: ['none'],
    tone: ['technical', 'terse'],
    person: ['second'],
    'copy-length': ['short'],
    jargon: ['explained'],
    'data-presence': ['central'],
    imagery: ['none'],
    ornament: ['rule-lines'],
    'number-format': ['tabular'],
    'render-mode': ['client'],
    'compute-budget': ['light'],
    'llm-usage': ['none'],
    'state-scope': ['stateless'],
    offline: ['full'],
    'contrast-policy': ['apca-body', 'wcag-aa'],
    'motion-policy': ['respect-reduced'],
    'focus-style': ['ring'],
  },
};
