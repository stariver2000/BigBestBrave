/** 분위기 축: 페이지의 정서와 색·밝기 성향. (59개 값) */

import { axis, label, v } from '../model';

export const ATMOSPHERE = axis(
  'atmosphere',
  'mood',
  label('분위기', 'Atmosphere', '雰囲気'),
  [
    v('serene', '고요한', 'Serene', '静謐な'),
    v('tense', '긴장된', 'Tense', '緊張した'),
    v('joyful', '경쾌한', 'Joyful', '快活な'),
    v('melancholic', '우울한', 'Melancholic', '物憂げな'),
    v('mysterious', '신비로운', 'Mysterious', '神秘的な'),
    v('energetic', '활기찬', 'Energetic', 'エネルギッシュな'),
    v('austere', '금욕적인', 'Austere', '禁欲的な'),
    v('cozy', '아늑한', 'Cozy', '居心地のよい'),
    v('futuristic', '미래적인', 'Futuristic', '未来的な'),
    v('ancient', '고대적인', 'Ancient', '古代的な'),
    v('dreamy', '몽환적인', 'Dreamy', '夢幻的な'),
    v('brutal', '거친', 'Brutal', '荒々しい'),
    v('elegant', '우아한', 'Elegant', '優雅な'),
    v('raw', '날것의', 'Raw', '素の'),
    v('whimsical', '엉뚱한', 'Whimsical', '気まぐれな'),
    v('solemn', '엄숙한', 'Solemn', '厳粛な'),
    v('sensual', '관능적인', 'Sensual', '官能的な'),
    v('sterile', '무균의', 'Sterile', '無機質な'),
    v('cosmic', '우주적인', 'Cosmic', '宇宙的な'),
    v('pastoral', '목가적인', 'Pastoral', '牧歌的な'),
    v('urban', '도시적인', 'Urban', '都会的な'),
    v('industrial', '산업적인', 'Industrial', '工業的な'),
    v('sacred', '성스러운', 'Sacred', '聖なる'),
    v('feral', '야생적인', 'Feral', '野生的な'),
  ],
  true,
);

export const TEMPERATURE = axis(
  'temperature',
  'mood',
  label('색온도', 'Temperature', '色温度'),
  [
    v('icy', '얼음', 'Icy', '氷'),
    v('cool', '차가운', 'Cool', '寒色'),
    v('neutral', '중성', 'Neutral', '中性'),
    v('warm', '따뜻한', 'Warm', '暖色'),
    v('hot', '뜨거운', 'Hot', '熱い'),
    v('scorching', '작열하는', 'Scorching', '灼熱'),
    v('ambient', '무채색', 'Achromatic', '無彩色'),
  ],
);

export const BRIGHTNESS = axis(
  'brightness',
  'mood',
  label('밝기', 'Brightness', '明度'),
  [
    v('abyssal', '심연', 'Abyssal', '深淵'),
    v('dim', '어둑한', 'Dim', '薄暗い'),
    v('muted', '가라앉은', 'Muted', '落ち着いた'),
    v('balanced', '균형', 'Balanced', 'バランス'),
    v('bright', '밝은', 'Bright', '明るい'),
    v('radiant', '눈부신', 'Radiant', '眩い'),
  ],
);

export const INTENSITY = axis(
  'intensity',
  'mood',
  label('채도 강도', 'Chroma intensity', '彩度'),
  [
    v('monochrome', '단색', 'Monochrome', 'モノクロ'),
    v('desaturated', '탈색된', 'Desaturated', '脱色'),
    v('restrained', '절제된', 'Restrained', '抑制'),
    v('vivid', '선명한', 'Vivid', '鮮やか'),
    v('saturated', '진한', 'Saturated', '濃厚'),
    v('neon', '네온', 'Neon', 'ネオン'),
  ],
);

export const TENSION = axis(
  'tension',
  'mood',
  label('긴장도', 'Tension', '緊張度'),
  [
    v('still', '정지', 'Still', '静止'),
    v('calm', '잔잔한', 'Calm', '穏やか'),
    v('taut', '팽팽한', 'Taut', '張り詰めた'),
    v('restless', '들썩이는', 'Restless', '落ち着かない'),
    v('violent', '격렬한', 'Violent', '激烈'),
  ],
);

export const SEASON = axis(
  'season',
  'mood',
  label('계절', 'Season', '季節'),
  [
    v('spring', '봄', 'Spring', '春'),
    v('summer', '여름', 'Summer', '夏'),
    v('autumn', '가을', 'Autumn', '秋'),
    v('winter', '겨울', 'Winter', '冬'),
    v('seasonless', '무계절', 'Seasonless', '無季'),
  ],
);

export const DAYTIME = axis(
  'daytime',
  'mood',
  label('시간대', 'Time of day', '時間帯'),
  [
    v('dawn', '새벽', 'Dawn', '夜明け'),
    v('morning', '아침', 'Morning', '朝'),
    v('noon', '한낮', 'Noon', '真昼'),
    v('dusk', '해질녘', 'Dusk', '黄昏'),
    v('night', '밤', 'Night', '夜'),
    v('timeless', '무시간', 'Timeless', '無時間'),
  ],
);

export const MOOD_AXES = [ATMOSPHERE, TEMPERATURE, BRIGHTNESS, INTENSITY, TENSION, SEASON, DAYTIME];
