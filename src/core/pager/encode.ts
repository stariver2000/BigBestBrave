/**
 * 말을 숫자로 옮기기.
 *
 * 대부분의 말은 숫자로 옮겨지지 않는다. 그 사실이 이 체험의 핵심이다.
 * 옮기지 못한 부분을 감추지 않고 그대로 보여 줘야, 무엇을 포기했는지가 드러난다.
 */

import { CODEBOOK, MAX_DIGITS, SYLLABLE_TO_DIGIT } from './config';
import type { Encoded, EncodedPiece } from './types';

/** 코드집의 뜻을 긴 것부터 본다. '빨리빨리'가 '빨리'보다 먼저 걸려야 한다. */
const BY_MEANING_LENGTH = [...CODEBOOK]
  .map((entry, index) => ({ entry, index }))
  .sort((a, b) => b.entry.meaning.ko.length - a.entry.meaning.ko.length);

/** 이 자리에서 시작하는 코드집 뜻이 있으면 가장 긴 것을 돌려준다. */
function matchCode(text: string, position: number): { digits: string; length: number } | null {
  for (const { entry } of BY_MEANING_LENGTH) {
    const meaning = entry.meaning.ko;
    if (meaning.length > 0 && text.startsWith(meaning, position)) {
      return { digits: entry.digits, length: meaning.length };
    }
  }
  return null;
}

/** 옮기지 못한 글자들을 한 조각으로 묶는다. 조각이 잘게 쪼개지면 화면이 읽히지 않는다. */
function pushLost(pieces: EncodedPiece[], text: string): void {
  const last = pieces[pieces.length - 1];
  if (last && last.via === 'lost') {
    last.text += text;
    return;
  }
  pieces.push({ text, digits: null, via: 'lost' });
}

export function encode(text: string): Encoded {
  const pieces: EncodedPiece[] = [];
  let position = 0;
  let carried = 0;

  while (position < text.length) {
    const character = text[position];

    // 공백은 전할 수도 없고 잃은 것도 아니다. 조각을 끊는 역할만 한다.
    if (/\s/.test(character)) {
      position += 1;
      continue;
    }

    const code = matchCode(text, position);
    if (code) {
      pieces.push({ text: text.slice(position, position + code.length), digits: code.digits, via: 'code' });
      position += code.length;
      carried += code.length;
      continue;
    }

    const digit = SYLLABLE_TO_DIGIT[character];
    if (digit) {
      pieces.push({ text: character, digits: digit, via: 'syllable' });
      position += 1;
      carried += 1;
      continue;
    }

    pushLost(pieces, character);
    position += 1;
  }

  const digits = pieces.map((piece) => piece.digits ?? '').join('');
  const meaningful = text.replace(/\s/g, '').length;
  return {
    pieces,
    digits: digits.slice(0, MAX_DIGITS),
    coverage: meaningful === 0 ? 0 : carried / meaningful,
    overflow: digits.length > MAX_DIGITS,
  };
}
