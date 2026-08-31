/** 정체성 축: 이 페이지가 무엇에 대한 것이고 누구에게 왜 말하는가. (62개 값) */

import { axis, label, v } from '../model';

export const DOMAIN = axis(
  'domain',
  'identity',
  label('주제 영역', 'Domain', '主題領域'),
  [
    v('game', '게임', 'Game', 'ゲーム'),
    v('marketing', '마케팅', 'Marketing', 'マーケティング'),
    v('fashion', '패션', 'Fashion', 'ファッション'),
    v('philosophy', '철학', 'Philosophy', '哲学'),
    v('music', '음악', 'Music', '音楽'),
    v('film', '영화', 'Film', '映画'),
    v('food', '음식', 'Food', '食'),
    v('travel', '여행', 'Travel', '旅行'),
    v('finance', '금융', 'Finance', '金融'),
    v('health', '건강', 'Health', '健康'),
    v('sports', '스포츠', 'Sports', 'スポーツ'),
    v('science', '과학', 'Science', '科学'),
    v('education', '교육', 'Education', '教育'),
    v('literature', '문학', 'Literature', '文学'),
    v('architecture', '건축', 'Architecture', '建築'),
    v('photography', '사진', 'Photography', '写真'),
    v('design', '디자인', 'Design', 'デザイン'),
    v('dev-tools', '개발 도구', 'Dev tools', '開発ツール'),
    v('data', '데이터', 'Data', 'データ'),
    v('ai', '인공지능', 'AI', 'AI'),
    v('security', '보안', 'Security', 'セキュリティ'),
    v('hardware', '하드웨어', 'Hardware', 'ハードウェア'),
    v('biology', '생물학', 'Biology', '生物学'),
    v('space', '우주', 'Space', '宇宙'),
    v('history', '역사', 'History', '歴史'),
    v('religion', '종교', 'Religion', '宗教'),
    v('law', '법', 'Law', '法'),
    v('politics', '정치', 'Politics', '政治'),
    v('craft', '공예', 'Craft', '工芸'),
    v('nature', '자연', 'Nature', '自然'),
  ],
  true,
);

export const AUDIENCE = axis(
  'audience',
  'identity',
  label('대상 독자', 'Audience', '対象読者'),
  [
    v('general', '일반', 'General', '一般'),
    v('expert', '전문가', 'Expert', '専門家'),
    v('beginner', '입문자', 'Beginner', '初心者'),
    v('child', '어린이', 'Child', '子ども'),
    v('teen', '청소년', 'Teen', '若年層'),
    v('professional', '실무자', 'Professional', '実務者'),
    v('executive', '의사결정자', 'Executive', '意思決定者'),
    v('hobbyist', '취미인', 'Hobbyist', '愛好家'),
    v('academic', '연구자', 'Academic', '研究者'),
    v('creator', '창작자', 'Creator', 'クリエイター'),
  ],
  true,
);

export const INTENT = axis(
  'intent',
  'identity',
  label('목적', 'Intent', '目的'),
  [
    v('inform', '정보 전달', 'Inform', '情報提供'),
    v('persuade', '설득', 'Persuade', '説得'),
    v('entertain', '오락', 'Entertain', '娯楽'),
    v('transact', '거래', 'Transact', '取引'),
    v('teach', '교육', 'Teach', '教える'),
    v('explore', '탐색', 'Explore', '探索'),
    v('archive', '보존', 'Archive', '保存'),
    v('provoke', '자극', 'Provoke', '挑発'),
    v('comfort', '위로', 'Comfort', '慰め'),
    v('coordinate', '협업', 'Coordinate', '協調'),
    v('measure', '측정', 'Measure', '計測'),
    v('create', '창작', 'Create', '創作'),
  ],
  true,
);

export const STANCE = axis(
  'stance',
  'identity',
  label('태도', 'Stance', '姿勢'),
  [
    v('neutral', '중립적', 'Neutral', '中立的'),
    v('opinionated', '주관적', 'Opinionated', '主観的'),
    v('playful', '장난스러운', 'Playful', '遊び心のある'),
    v('reverent', '경건한', 'Reverent', '敬虔な'),
    v('ironic', '반어적', 'Ironic', '皮肉な'),
    v('earnest', '진지한', 'Earnest', '真摯な'),
    v('clinical', '냉정한', 'Clinical', '冷徹な'),
    v('poetic', '시적인', 'Poetic', '詩的な'),
    v('contrarian', '역발상의', 'Contrarian', '逆張りの'),
    v('nostalgic', '향수적인', 'Nostalgic', '郷愁的な'),
  ],
);

export const IDENTITY_AXES = [DOMAIN, AUDIENCE, INTENT, STANCE];
