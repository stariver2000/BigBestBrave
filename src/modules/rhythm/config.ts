/**
 * 리듬 페이지 설정.
 *
 * 근거가 된 연구: Birds of a Rhythm — The Effects of Haptic Pattern Similarity on People's
 * Social Perceptions in Virtual Reality (Hyuckjin Jang, Jeongmi Lee, KAIST), ACM CHI 2025.
 *
 * 이 연구는 사람마다 다른 진동 패턴을 주고, 그 패턴이 닮은 정도를 같음·비슷함·다름으로 나눈 뒤
 * 사회적 인식이 어떻게 달라지는지 보았다. 패턴이 닮을수록 상대에게 더 가까이 섰고,
 * 소속감과 유대감, 편안함이 높아졌다. 동질감이 눈으로 보는 것 밖에서도 작동한다는 이야기다.
 *
 * 이 페이지는 그 실험을 재현하지 않는다(VR도, 참가자도 없다). 대신 그 발견을 손으로 만지게 한다.
 * 자기 리듬을 두드려 만들고, 이름 붙은 리듬들이 닮은 만큼 가까이 놓이는 것을 본다.
 * 논문이 쓴 31개 패턴과 닮음을 재는 방법은 공개돼 있지 않아, 리듬도 척도도 이 페이지에서 새로 지었다.
 */

export const PAPER = {
  title:
    "Birds of a Rhythm: The Effects of Haptic Pattern Similarity on People's Social Perceptions in Virtual Reality",
  authors: 'Hyuckjin Jang, Jeongmi Lee',
  venue: 'ACM CHI 2025',
  affiliation: 'KAIST',
  doi: 'https://doi.org/10.1145/3706598.3714264',
  /**
   * 쉬운 말로. 열두 살이 읽어도 통하는 문장만 쓴다.
   * 논문이 무슨 말을 하려는 것인지 먼저 전하고, 이 페이지가 어디까지 가져왔는지를 밝힌다.
   */
  plain: {
    problem: {
      ko: '우리는 얼굴이나 옷처럼 눈에 보이는 것으로 남을 판단한다고 여깁니다. 그런데 눈이 아니라 몸에 닿는 느낌만으로도 \'저 사람은 나와 비슷하다\'고 느낄 수 있을까요?',
      en: 'We assume we judge others by what we can see — a face, clothes. But could a feeling on the skin, with nothing to look at, be enough to sense that someone is like us?',
      ja: '私たちは顔や服のように目に見えるもので相手を判断していると思っています。しかし、目ではなく体に触れる感覚だけで「あの人は自分と似ている」と感じられるでしょうか。',
    },
    work: {
      ko: '가상현실 안에서 사람마다 다른 진동 패턴을 주고, 패턴이 닮은 정도(같음·비슷함·다름)에 따라 상대를 어떻게 느끼는지 살폈습니다. 패턴이 닮을수록 더 가까이 다가섰고, 더 가깝게 느꼈습니다.',
      en: 'In virtual reality they gave each person a different vibration pattern, then looked at how people felt about one another as the patterns matched, resembled, or differed. The closer the patterns, the closer people stood — and the closer they felt.',
      ja: 'バーチャルリアリティの中で一人ひとりに違う振動パターンを与え、パターンの似ている度合い（同じ・似ている・違う）によって相手をどう感じるかを調べました。似ているほど近くに立ち、より親しく感じました。',
    },
    took: {
      ko: '그 발견을 손으로 만지게 합니다. 자기 리듬을 두드려 만들면, 닮은 리듬일수록 가까이 놓입니다.',
      en: 'It puts that finding under your hands: tap out your own rhythm, and the rhythms that resemble it come to stand nearer.',
      ja: 'その発見を手で触れるようにします。自分のリズムを叩いて作ると、似たリズムほど近くに置かれます。',
    },
    left: {
      ko: '가상현실도 참가자도 없습니다. 논문이 쓴 31개 패턴과 닮음을 재는 방법은 공개되어 있지 않아, 여기 리듬과 척도는 이 페이지에서 새로 지은 것입니다.',
      en: 'There is no VR here and no participants. The 31 patterns and the similarity measure used in the study are not published, so the rhythms and the scale on this page were made here.',
      ja: 'ここにはVRも参加者もいません。論文の31のパターンと類似度の測り方は公開されていないため、ここでのリズムも尺度もこのページで新しく作ったものです。',
    },
  },
} as const;

/** 리듬 마당의 크기(px). 정사각형이라 거리가 방향에 따라 왜곡되지 않는다. */
export const FIELD_SIZE = 520;

/** 마당의 중심에서 가장 먼 리듬까지의 거리. 화면 밖으로 나가지 않게 잡았다. */
export const FIELD_RADIUS = { min: 58, max: 218 } as const;

/** 리듬 하나를 그리는 막대의 크기. */
export const BAR = { height: 44, gap: 2, minWidth: 2 } as const;

/**
 * 소리로 들려줄 때의 성질.
 * 손끝이 아니라 귀로 듣게 되더라도 세기와 길이는 그대로 전해져야 한다.
 */
export const TONE = { frequency: 68, maxGain: 0.22 } as const;

/** 처음 화면에 놓여 있는 리듬. 아무것도 두드리지 않아도 마당이 채워져 있어야 한다. */
export const STARTER_PATTERN_ID = 'heartbeat';
