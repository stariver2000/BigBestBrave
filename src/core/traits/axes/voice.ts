/** 문체 축: 화면에 쓰이는 글의 어조. (26개 값) */

import { axis, label, v } from '../model';

export const TONE = axis(
  'tone',
  'voice',
  label('어조', 'Tone', '語調'),
  [
    v('formal', '격식체', 'Formal', '硬い'),
    v('casual', '구어체', 'Casual', '砕けた'),
    v('technical', '기술적', 'Technical', '技術的'),
    v('poetic', '시적', 'Poetic', '詩的'),
    v('terse', '간결', 'Terse', '簡潔'),
    v('verbose', '장황', 'Verbose', '冗長'),
    v('humorous', '유머러스', 'Humorous', 'ユーモラス'),
    v('urgent', '긴박', 'Urgent', '切迫'),
    v('warm', '다정', 'Warm', '温かい'),
    v('authoritative', '권위적', 'Authoritative', '権威的'),
    v('conspiratorial', '은밀', 'Conspiratorial', '内緒めいた'),
    v('academic', '학술적', 'Academic', '学術的'),
    v('promotional', '홍보성', 'Promotional', '宣伝的'),
    v('deadpan', '무표정', 'Deadpan', '無表情'),
  ],
  true,
);

export const PERSON = axis(
  'person',
  'voice',
  label('인칭', 'Person', '人称'),
  [
    v('first', '1인칭', 'First person', '一人称'),
    v('second', '2인칭', 'Second person', '二人称'),
    v('third', '3인칭', 'Third person', '三人称'),
    v('impersonal', '무인칭', 'Impersonal', '非人称'),
  ],
);

export const COPY_LENGTH = axis(
  'copy-length',
  'voice',
  label('문장 길이', 'Copy length', '文の長さ'),
  [
    v('telegraphic', '전보체', 'Telegraphic', '電報体'),
    v('short', '짧게', 'Short', '短文'),
    v('medium', '보통', 'Medium', '中'),
    v('long-form', '장문', 'Long-form', '長文'),
  ],
);

export const JARGON = axis(
  'jargon',
  'voice',
  label('전문 용어', 'Jargon level', '専門用語'),
  [
    v('none', '없음', 'None', 'なし'),
    v('explained', '풀어서 설명', 'Explained', '解説付き'),
    v('assumed', '전제', 'Assumed', '前提'),
    v('dense', '고밀도', 'Dense', '高密度'),
  ],
);

export const VOICE_AXES = [TONE, PERSON, COPY_LENGTH, JARGON];
