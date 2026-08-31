/** 뿌리는 소리 문구 사전 (ko / en / ja). 액체 이름도 여기서 온다. */

import type { Dictionary } from '../../core/i18n';

export type MistKey =
  | 'title' | 'summary' | 'capability'
  | 'canvas-title' | 'canvas-note' | 'canvas-hint' | 'canvas-silent'
  | 'liquid-title' | 'liquid-note'
  | 'clear' | 'sound-on' | 'sound-off'
  | 'meter-drops' | 'meter-heard' | 'meter-blend'
  | 'finding-title' | 'finding-body'
  | 'paper-label' | 'paper-note'
  | 'name-drip' | 'name-bell' | 'name-wind' | 'name-string' | 'name-breath';

export const mistDictionary: Dictionary<MistKey> = {
  ko: {
    title: '소리를 뿌리다',
    summary: '소리를 공중에 뿌려 그 자리에 둡니다. 다가가면 커지고, 멀어지면 작아지고, 시간이 지나면 흩어집니다.',
    capability: '소리를 자리에 두고 다가가 듣게 하며, 서로 다른 소리를 섞는 재미를 만든다',
    'canvas-title': '뿌리는 자리',
    'canvas-note': '눌러서 뿌리고, 그냥 움직이면 그 자리의 소리가 들립니다. 소리를 켜 두세요.',
    'canvas-hint': '눌러서 뿌려 보세요',
    'canvas-silent': '소리가 꺼져 있습니다',
    'liquid-title': '액체',
    'liquid-note': '액체마다 다른 소리를 품습니다. 섞어 두면 함께 들립니다.',
    clear: '걷어내기',
    'sound-on': '소리 켜기',
    'sound-off': '소리 끄기',
    'meter-drops': '떠 있는 방울',
    'meter-heard': '지금 들리는',
    'meter-blend': '섞인 정도',
    'finding-title': '논문이 발견한 것',
    'finding-body': '실제 액체를 뿌려 소리를 두는 장치를 만들고 사람들에게 써 보게 했습니다. 흩어지는 물방울에서 소리의 물성을 느꼈고, 액체마다 다른 소리가 얽혀 있다고 여겼으며, 공중에 잠시 떠 있는 소리를 착각처럼 지각했고, 서로 다른 소리를 섞는 데서 즐거움을 얻었습니다.',
    'paper-label': '근거 논문',
    'paper-note': '논문의 장치를 재현한 것이 아닙니다. 액체도 공간도 없이, 소리를 자리에 두고 다가가 듣는 규칙만 화면으로 옮겼습니다.',
    'name-drip': '물방울',
    'name-bell': '종',
    'name-wind': '바람',
    'name-string': '현',
    'name-breath': '숨',
  },
  en: {
    title: 'Spraying Sound',
    summary: 'Spray sound into the air and it stays there. Come closer and it grows, step away and it fades, and in time it disperses.',
    capability: 'Places sound in space so you have to approach it, and makes blending different sounds a pleasure',
    'canvas-title': 'The space',
    'canvas-note': 'Press to spray. Just move to hear what is there. Turn the sound on.',
    'canvas-hint': 'press to spray',
    'canvas-silent': 'sound is off',
    'liquid-title': 'Liquids',
    'liquid-note': 'Each liquid carries a different sound. Sprayed together, they are heard together.',
    clear: 'Clear the air',
    'sound-on': 'Sound on',
    'sound-off': 'Sound off',
    'meter-drops': 'drops in the air',
    'meter-heard': 'heard now',
    'meter-blend': 'blending',
    'finding-title': 'What the paper found',
    'finding-body': 'They built a device that sprays real liquid to place sound in space, and had people use it. People felt the materiality of sound in the dispersing droplets, took each liquid to be entangled with its own sound, perceived sound as briefly floating in the air, and found pleasure in blending different sounds together.',
    'paper-label': 'Based on',
    'paper-note': 'This does not reproduce the device. With no liquid and no room, it carries over only the rule — sound sits in a place, and you go to it.',
    'name-drip': 'droplet',
    'name-bell': 'bell',
    'name-wind': 'wind',
    'name-string': 'string',
    'name-breath': 'breath',
  },
  ja: {
    title: '音を撒く',
    summary: '音を空中に撒いて、その場に置きます。近づけば大きく、離れれば小さく、やがて散って消えます。',
    capability: '音を場所に置いて近づいて聴かせ、異なる音を混ぜる楽しさを作る',
    'canvas-title': '撒く場所',
    'canvas-note': '押して撒き、動かすとその場の音が聞こえます。音をオンにしてください。',
    'canvas-hint': '押して撒いてみてください',
    'canvas-silent': '音がオフです',
    'liquid-title': '液体',
    'liquid-note': '液体ごとに違う音を宿します。混ぜて撒けば一緒に聞こえます。',
    clear: '空気を払う',
    'sound-on': '音をオン',
    'sound-off': '音をオフ',
    'meter-drops': '浮かぶ粒',
    'meter-heard': '今聞こえる',
    'meter-blend': '混ざり具合',
    'finding-title': '論文が見つけたこと',
    'finding-body': '実際の液体を撒いて音を空間に置く装置を作り、人々に使ってもらいました。散る粒に音の物質性を感じ、液体ごとに異なる音が絡んでいると捉え、空中に一瞬漂う音を錯覚のように知覚し、異なる音を混ぜることに楽しさを見いだしました。',
    'paper-label': '参照論文',
    'paper-note': '装置を再現したものではありません。液体も空間もなく、音を場所に置いて近づいて聴くという規則だけを画面に移しました。',
    'name-drip': '水滴',
    'name-bell': '鈴',
    'name-wind': '風',
    'name-string': '弦',
    'name-breath': '息',
  },
};
