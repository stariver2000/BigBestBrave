/**
 * 되돌아온 말.
 *
 * 보낸 사람의 말은 숫자를 지나며 깎이고, 받은 사람은 그 숫자를 다시 말로 읽는다.
 * 두 말이 같은 경우는 생각보다 드물다. '사랑해'는 486이 되어 '사랑해'로 돌아오지만,
 * 대부분의 문장은 숫자를 통과하는 동안 다른 말이 되거나 아예 사라진다.
 *
 * 이 왕복이 그 시절 소통의 실제 모습이었다. 옳고 그름을 매기지 않는다.
 * 무엇이 되어 돌아오는지를 보여 주는 것으로 충분하다.
 */

import { segmentations } from './decode';
import { encode } from './encode';
import type { Encoded, Segmentation } from './types';

export interface Echo {
  /** 보낸 사람이 쓴 말 그대로. 조각을 이어 붙이면 띄어쓰기가 사라지므로 원문을 따로 든다. */
  source: string;
  /** 보낸 쪽: 말이 숫자로 눌러 담긴 결과. 잃어버린 조각이 여기 남는다. */
  sent: Encoded;
  /** 받은 쪽: 그 숫자를 읽을 수 있는 갈래들. 첫 번째가 가장 그럴듯한 읽기다. */
  readings: Segmentation[];
  /** 가장 그럴듯한 갈래를 한 줄로 이은 말. 이것이 상대에게 도착한 말이다. */
  returned: string;
  /** 보낸 말과 돌아온 말이 같은가. 띄어쓰기 차이는 같은 것으로 본다. */
  intact: boolean;
}

/** 띄어쓰기는 숫자에 실리지 않으므로 비교에서도 빼고 본다. */
function compact(text: string): string {
  return text.replace(/\s+/g, '');
}

export function roundTrip(text: string): Echo {
  const sent = encode(text);
  const readings = segmentations(sent.digits);
  const returned = readings[0]?.pieces.map((piece) => piece.reading).join('') ?? '';

  return {
    source: text.trim(),
    sent,
    readings,
    returned,
    // 보낼 것이 하나도 없었다면 '그대로 갔다'고 말할 수 없다.
    intact: sent.digits.length > 0 && compact(returned) === compact(text),
  };
}
