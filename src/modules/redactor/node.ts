/**
 * 개인정보 지우개 = 트리의 루트.
 *
 * 이 도구를 루트에 둔 이유: 처음 온 사람이 설명 없이 쓸모를 알 수 있고,
 * "왜 챗봇에 물어보지 않고 여기서 하느냐"에 대한 답이 기능 자체에 들어 있기 때문이다.
 * 챗봇에 붙여넣으면 안 되는 내용을 다루는 도구라, 브라우저 안에서만 도는 것이 곧 존재 이유다.
 */

import { ROOT_ID } from '../../core/tree';
import type { PageNode } from '../../core/tree';
import { redactorDictionary } from './dictionary';

export const redactorNode: PageNode = {
  id: ROOT_ID,
  slug: '',
  parentId: null,
  title: {
    ko: redactorDictionary.ko.title,
    en: redactorDictionary.en.title,
    ja: redactorDictionary.ja.title,
  },
  summary: {
    ko: redactorDictionary.ko.summary,
    en: redactorDictionary.en.summary,
    ja: redactorDictionary.ja.summary,
  },
  capability: {
    ko: redactorDictionary.ko.capability,
    en: redactorDictionary.en.capability,
    ja: redactorDictionary.ja.capability,
  },
  // 자식은 '주제 영역'으로 갈라진다. 색 도구가 첫 분기다.
  splitAxis: 'domain',
  look: 'dossier',
  keywords: [
    '개인정보', '마스킹', '가리기', '주민등록번호', '카드번호', '보안',
    'redact', 'mask', 'privacy', 'pii', 'anonymize',
    '個人情報', 'マスキング', '匿名化',
  ],
  traits: {
    domain: ['security', 'dev-tools'],
    audience: ['general', 'professional'],
    intent: ['transact', 'measure'],
    stance: ['earnest'],
    atmosphere: ['austere', 'ancient'],
    temperature: ['neutral'],
    brightness: ['bright'],
    intensity: ['saturated'],
    tension: ['still'],
    daytime: ['dawn'],
    layout: ['split-screen'],
    density: ['airy'],
    rhythm: ['modular'],
    alignment: ['left'],
    grid: ['col-12'],
    corner: ['sharp'],
    border: ['hairline'],
    elevation: ['floating'],
    surface: ['paper'],
    'type-voice': ['editorial-serif'],
    'type-scale': ['major-third'],
    'type-contrast': ['gentle'],
    tracking: ['normal'],
    leading: ['relaxed'],
    casing: ['sentence'],
    'motion-character': ['subtle-fade'],
    'motion-duration': ['measured'],
    easing: ['ease-in-out'],
    entrance: ['fade'],
    paradigm: ['direct-manipulation'],
    navigation: ['tree', 'breadcrumb'],
    feedback: ['responsive'],
    // 원문을 URL이나 저장소에 남기지 않는다. 이 페이지에서는 상태를 보존하지 않는 것이 기능이다.
    persistence: ['none'],
    tone: ['warm', 'technical'],
    person: ['second'],
    'copy-length': ['short'],
    jargon: ['explained'],
    'data-presence': ['central'],
    imagery: ['none'],
    ornament: ['rule-lines'],
    'number-format': ['tabular'],
    'render-mode': ['client'],
    'compute-budget': ['zero'],
    'llm-usage': ['none'],
    'state-scope': ['stateless'],
    offline: ['full'],
    'contrast-policy': ['apca-body', 'wcag-aa'],
    'motion-policy': ['respect-reduced'],
    'focus-style': ['ring'],
  },
};
