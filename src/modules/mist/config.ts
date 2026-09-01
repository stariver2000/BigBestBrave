/**
 * 뿌리는 소리 페이지 설정.
 *
 * 근거가 된 연구: Sprayable Sound — Exploring the Experiential and Design Potential of
 * Physically Spraying Sound Interaction (Jongik Jeon, Chang Hee Lee, KAIST), ACM CHI 2025.
 *
 * 연구진이 만든 SoundMist는 실제 액체를 공중에 뿌려 그 자리에 소리를 둔다.
 * 향이 그러하듯 가까이 가면 커지고 멀어지면 작아지며, 시간이 지나면 흩어져 사라진다.
 * 연구가 꼽은 즐거움 넷 중 하나가 서로 다른 소리를 섞는 것이었다.
 *
 * 이 페이지는 그 장치를 재현하지 않는다(액체도, 공간도 없다). 대신 그 규칙만 화면으로 옮긴다 —
 * 소리를 자리에 두고, 다가가 듣고, 섞고, 사라지는 것을 지켜본다.
 */

export const PAPER = {
  title: 'Sprayable Sound: Exploring the Experiential and Design Potential of Physically Spraying Sound Interaction',
  authors: 'Jongik Jeon, Chang Hee Lee',
  venue: 'ACM CHI 2025',
  affiliation: 'KAIST',
  doi: 'https://doi.org/10.1145/3706598.3713786',
  /**
   * 쉬운 말로. 열두 살이 읽어도 통하는 문장만 쓴다.
   * 논문이 무슨 말을 하려는 것인지 먼저 전하고, 이 페이지가 어디까지 가져왔는지를 밝힌다.
   */
  plain: {
    problem: {
      ko: '소리는 보통 스피커에서 나와 방을 채웁니다. 그런데 소리를 향수처럼 어떤 자리에 뿌려 둘 수 있다면 어떨까요?',
      en: 'Sound usually pours out of a speaker and fills the room. But what if you could spray it into one spot, the way perfume hangs in the air?',
      ja: '音はふつうスピーカーから出て部屋を満たします。でも、香水のように音をある場所に吹きかけておけるとしたら、どうでしょう。',
    },
    work: {
      ko: '연구진은 실제 액체를 공중에 뿌려 그 자리에 소리를 두는 장치를 만들었습니다. 가까이 가면 커지고 멀어지면 작아지며, 시간이 지나면 흩어져 사라집니다.',
      en: 'They built a device that sprays real liquid into the air and leaves a sound in that place. Come closer and it grows, walk away and it fades, and in time it drifts apart and is gone.',
      ja: '研究者は実際の液体を空中に噴き、その場所に音を置く装置を作りました。近づけば大きく、離れれば小さく、時間がたてば散って消えます。',
    },
    took: {
      ko: '그 규칙만 화면으로 옮겼습니다 — 소리를 자리에 두고, 다가가 듣고, 섞고, 사라지는 것을 지켜봅니다.',
      en: 'Only the rules moved here: put a sound in a place, walk up to hear it, mix it with another, and watch it fade.',
      ja: 'その規則だけを画面に移しました — 音を場所に置き、近づいて聴き、混ぜ、消えていくのを見守ります。',
    },
    left: {
      ko: '액체도 공간도 없습니다. 장치를 재현한 것이 아니라, 그 장치가 만들어 낸 규칙을 흉내 낸 것입니다.',
      en: 'There is no liquid and no room. This is not a copy of the device, only an imitation of the rules the device created.',
      ja: '液体も空間もありません。装置を再現したのではなく、その装置が生んだ規則をまねたものです。',
    },
  },
} as const;

/** 뿌리는 자리의 크기(좌표 단위). 화면 폭에 맞춰 늘어나되 비율은 이 값을 따른다. */
export const CANVAS = { width: 900, height: 560 } as const;

/** 물방울 하나를 그리는 반지름. 가운데가 진하고 가장자리로 갈수록 옅어진다. */
export const DROP_RADIUS = 26;

/** 뿌리는 간격(ms). 누르고 있는 동안 이 간격으로 계속 나온다. */
export const SPRAY_INTERVAL = 90;

/** 소리 크기가 따라 붙는 빠르기(초). 값이 바뀔 때 뚝 끊기지 않게 한다. */
export const GAIN_GLIDE = 0.08;

/** 액체 하나의 최대 소리 크기. 다섯이 겹쳐도 시끄럽지 않을 만큼으로 잡았다. */
export const MAX_GAIN = 0.14;
