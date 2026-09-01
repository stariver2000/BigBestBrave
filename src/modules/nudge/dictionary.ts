/** 작은 보상 문구 사전 (ko / en / ja). */

import type { Dictionary } from '../../core/i18n';

export type NudgeKey =
  | 'title' | 'summary' | 'capability' | 'paper-label'
  | 'person-title' | 'person-note' | 'base' | 'lift' | 'enough' | 'rounds'
  | 'base-note' | 'lift-note' | 'enough-note'
  | 'ctx-work' | 'ctx-off' | 'ctx-weekend'
  | 'arms-title' | 'arms-note' | 'front' | 'chance' | 'expected-cost' | 'tries' | 'redraw'
  | 'runs-title' | 'runs-note'
  | 'st-fixed' | 'st-random' | 'st-personal'
  | 'sd-fixed' | 'sd-random' | 'sd-personal'
  | 'col-strategy' | 'col-rate' | 'col-total' | 'col-per' | 'col-mean' | 'none'
  | 'plot-title' | 'plot-note' | 'plot-x' | 'plot-y'
  | 'finding-title' | 'finding-free' | 'finding-enough' | 'finding-linear'
  | 'paper-said' | 'warning'
  | 'took-title' | 'took-yes' | 'took-no';

export const nudgeDictionary: Dictionary<NudgeKey> = {
  ko: {
    title: '기울기 직전의 저울',
    summary:
      '약속을 지킬 때마다 아주 적은 돈을 주되, 얼마를 줄지를 사람마다 배워 정하는 알고리즘입니다. 사람을 하나 만들어 놓고 세 가지 방식을 나란히 돌려 보실 수 있습니다.',
    capability:
      '보상 금액을 팔로 둔 다목적 톰프슨 표집을 돌려, 성공 확률과 비용의 파레토 앞면에서 금액을 고르고 고정·무작위 방식과 견준다',
    'paper-label': '바탕이 된 연구',

    'person-title': '사람을 하나 만듭니다',
    'person-note':
      '알고리즘이 상대할 사람입니다. 지어낸 사람이므로 여기서 나오는 수치는 이 사람에 대한 것이지 사람 일반에 대한 것이 아닙니다.',
    base: '돈이 없어도 해내는 정도',
    lift: '돈이 충분할 때 더 해내는 정도',
    enough: '이만하면 충분한 금액',
    rounds: '몇 번 겪는가',
    'base-note': '보상이 0원일 때의 성공 확률입니다.',
    'lift-note': '충분한 금액을 받았을 때 여기에 더해집니다.',
    'enough-note':
      '이 페이지의 요점입니다. 이 금액을 넘으면 더 줘도 그대로입니다. 알고리즘은 그 위를 잘라 내어 돈을 아낍니다.',

    'ctx-work': '근무 시간',
    'ctx-off': '근무 외',
    'ctx-weekend': '주말',

    'arms-title': '지금 이 순간의 뽑기',
    'arms-note':
      '금액마다 성공 확률을 하나씩 뽑아 봅니다. 아직 본 것이 적으면 아무 값이나 나오고, 겪을수록 좁아집니다. 성공은 크게 비용은 작게 하는 것들만 앞면에 남고, 그 안에서 무작위로 하나를 고릅니다.',
    front: '앞면',
    chance: '뽑힌 성공 확률',
    'expected-cost': '기대 비용',
    tries: '겪은 횟수',
    redraw: '다시 뽑기',

    'runs-title': '세 방식을 견주기',
    'runs-note': '같은 사람에게 같은 횟수만큼 돌린 결과입니다. 성공했을 때만 돈이 나갑니다.',
    'st-fixed': '고정',
    'st-random': '무작위',
    'st-personal': '개인화',
    'sd-fixed': '언제나 50원. 논문의 대조 집단입니다.',
    'sd-random': '다섯 금액 중 아무거나. 또 하나의 대조 집단입니다.',
    'sd-personal': '논문의 Algorithm 1. 겪으면서 금액을 배웁니다.',
    'col-strategy': '방식',
    'col-rate': '성공률',
    'col-total': '총비용',
    'col-per': '성공 한 번당',
    'col-mean': '평균 제시 금액',
    none: '없음',

    'plot-title': '돈이 쌓이는 모양',
    'plot-note': '가로는 겪은 횟수, 세로는 그때까지 나간 돈입니다. 기울기가 완만할수록 싸게 굴린 것입니다.',
    'plot-x': '겪은 횟수',
    'plot-y': '나간 돈 (원)',

    'finding-title': '돌려 보시면 드러나는 것',
    'finding-free':
      '0원짜리 팔은 언제나 앞면에 남습니다. 공짜보다 싼 것은 없기 때문입니다. 그래서 이 알고리즘은 끝까지, 당신이 돈 없이도 했을 사람인지를 계속 떠봅니다.',
    'finding-enough':
      '"이만하면 충분한 금액"을 낮게 잡아 보세요. 그 위의 금액들은 성공률이 같으면서 비싸기만 하므로 앞면에서 밀려납니다. 알고리즘이 당신의 충분한 지점을 찾아내는 순간입니다.',
    'finding-linear':
      '반대로 그 금액을 100원까지 올려 보세요. 돈을 줄수록 끝없이 잘하는 사람에게는 다섯 팔이 모두 앞면에 남아, 개인화가 무작위와 다를 바 없어집니다. 알고리즘이 아낄 수 있는 것은 오직 "같은 성과에 더 비싼" 선택뿐입니다.',

    'paper-said':
      '논문에서는 참가자 72명을 세 집단으로 나눠 실제로 돌렸고, 개인화 집단의 평균 성공률은 58%, 휴대폰 사용 시간은 평균 339.2초 줄었습니다.',
    warning:
      '이 화면의 성공률과 비용은 여기서 지어낸 사람에게서 나온 것입니다. 논문의 수치와 견주지 마세요. 같은 것은 알고리즘뿐입니다.',

    'took-title': '연구에서 가져온 것과 가져오지 않은 것',
    'took-yes':
      '가져온 것 — Algorithm 1 그대로입니다. 금액마다 Beta(성공+1, 실패+1)에서 성공 확률을 뽑고, 기대 비용을 확률 곱하기 금액으로 두고, 성공은 크게 비용은 작게 하는 파레토 앞면에서 무작위로 고르고, 결과를 세어 넣습니다. 금액 다섯 가지와 맥락 셋, 그리고 견주는 세 방식도 논문과 같습니다.',
    'took-no':
      '가져오지 않은 것 — 72명의 참가자와 그들의 결과, 휴대폰 사용 시간을 재는 부분, 알림 설계. 여기서 알고리즘을 상대하는 사람은 화면에서 만든 것입니다.',
  },

  en: {
    title: 'A scale about to tip',
    summary:
      'An algorithm that pays a tiny amount each time you keep a small promise — and learns, per person, how much to pay. Build a person, then run three strategies against them side by side.',
    capability:
      'runs multi-objective Thompson sampling over incentive amounts, picking from the Pareto front of success against cost, and compares it with fixed and random schemes',
    'paper-label': 'Based on',

    'person-title': 'Build a person',
    'person-note':
      'This is who the algorithm will face. They are invented, so the numbers below describe this person and no one else.',
    base: 'Succeeds even unpaid',
    lift: 'Adds when paid enough',
    enough: 'Enough is',
    rounds: 'How many rounds',
    'base-note': 'Chance of succeeding when the reward is zero.',
    'lift-note': 'Added on top once the reward is enough.',
    'enough-note':
      'This is the crux. Past this amount, paying more changes nothing — and the algorithm cuts everything above it away.',

    'ctx-work': 'Work hours',
    'ctx-off': 'Off hours',
    'ctx-weekend': 'Weekend',

    'arms-title': 'One draw, right now',
    'arms-note':
      'A success probability is drawn for each amount. With little evidence anything can come out; with experience it narrows. Only the options that are not beaten on both counts stay on the front, and one of those is picked at random.',
    front: 'on front',
    chance: 'drawn chance',
    'expected-cost': 'expected cost',
    tries: 'times tried',
    redraw: 'Draw again',

    'runs-title': 'Three strategies compared',
    'runs-note': 'The same person, the same number of rounds. Money is paid only on success.',
    'st-fixed': 'Fixed',
    'st-random': 'Random',
    'st-personal': 'Personalised',
    'sd-fixed': 'Always 50 won. The paper’s control group.',
    'sd-random': 'Any of the five amounts. The other control group.',
    'sd-personal': 'The paper’s Algorithm 1. It learns the amount as it goes.',
    'col-strategy': 'Strategy',
    'col-rate': 'Success',
    'col-total': 'Total paid',
    'col-per': 'Per success',
    'col-mean': 'Mean offered',
    none: 'none',

    'plot-title': 'How the money piles up',
    'plot-note': 'Rounds across, money paid so far up. The flatter the line, the cheaper the run.',
    'plot-x': 'rounds',
    'plot-y': 'paid (won)',

    'finding-title': 'What running it reveals',
    'finding-free':
      'The zero-won arm is always on the front — nothing is cheaper than free. So this algorithm never stops testing whether you would have done it for nothing.',
    'finding-enough':
      'Set "enough is" low. Everything above it earns the same success at a higher price, so it falls off the front. That is the moment the algorithm finds your threshold.',
    'finding-linear':
      'Now push it to 100. For someone who keeps improving the more they are paid, all five arms stay on the front and personalisation becomes indistinguishable from random. The only thing this algorithm can save is a choice that costs more for the same result.',

    'paper-said':
      'In the paper, 72 participants were split across the three groups for real. The personalised group averaged a 58% success rate and cut phone time by 339.2 seconds on average.',
    warning:
      'The success rates and costs on this screen come from a person invented here. Do not compare them with the paper’s. Only the algorithm is the same.',

    'took-title': 'What this page took from the paper, and what it left',
    'took-yes':
      'Taken — Algorithm 1 verbatim: draw a success chance from Beta(successes+1, failures+1) for each amount, set expected cost to chance times amount, pick at random from the Pareto front of high success and low cost, then count the outcome in. The five amounts, the three contexts, and the three compared strategies are the paper’s too.',
    'took-no':
      'Left — the 72 participants and their results, the phone-time measurement, and the notification design. The person the algorithm faces here was built on this screen.',
  },

  ja: {
    title: '傾く寸前の天秤',
    summary:
      '小さな約束を守るたびにごくわずかな金額を渡し、いくら渡すかを人ごとに学ぶアルゴリズムです。人を一人こしらえて、三つのやり方を並べて回せます。',
    capability:
      '報酬額を腕とした多目的トンプソン抽出を回し、成功と費用のパレート前面から金額を選び、固定・無作為のやり方と比べる',
    'paper-label': '下敷きにした研究',

    'person-title': '人を一人こしらえます',
    'person-note':
      'アルゴリズムが相手にする人です。こしらえた人なので、ここの数値はこの人についてのものであって、人一般についてではありません。',
    base: '無報酬でもやれる度合い',
    lift: '十分もらえたとき増える分',
    enough: 'これで十分な金額',
    rounds: '何回ぶん',
    'base-note': '報酬が0円のときの成功確率です。',
    'lift-note': '十分な金額を受け取ったときに上乗せされます。',
    'enough-note':
      'ここが肝心です。この金額を超えると、いくら足しても変わりません。アルゴリズムはその上を切り落として節約します。',

    'ctx-work': '勤務時間',
    'ctx-off': '勤務外',
    'ctx-weekend': '週末',

    'arms-title': 'いまこの瞬間の抽出',
    'arms-note':
      '金額ごとに成功確率を一つずつ引きます。見た数が少ないうちは何でも出ますが、重ねるほど狭まります。成功は大きく費用は小さく、その両方で負けていないものだけが前面に残り、その中から無作為に一つ選ばれます。',
    front: '前面',
    chance: '引いた成功確率',
    'expected-cost': '期待費用',
    tries: '試した回数',
    redraw: 'もう一度引く',

    'runs-title': '三つのやり方を比べる',
    'runs-note': '同じ人に同じ回数だけ回した結果です。成功したときだけ支払われます。',
    'st-fixed': '固定',
    'st-random': '無作為',
    'st-personal': '個人化',
    'sd-fixed': '常に50ウォン。論文の対照群です。',
    'sd-random': '五つの金額から任意に。もう一つの対照群です。',
    'sd-personal': '論文の Algorithm 1。重ねながら金額を学びます。',
    'col-strategy': 'やり方',
    'col-rate': '成功率',
    'col-total': '総額',
    'col-per': '成功一回あたり',
    'col-mean': '平均提示額',
    none: 'なし',

    'plot-title': 'お金の積み上がり方',
    'plot-note': '横が回数、縦がそれまでに出たお金です。傾きがゆるいほど安く回せています。',
    'plot-x': '回数',
    'plot-y': '支払い (ウォン)',

    'finding-title': '回すと見えてくること',
    'finding-free':
      '0円の腕は常に前面に残ります。ただより安いものはないからです。ですからこのアルゴリズムは最後まで、あなたが無報酬でもやる人かどうかを試し続けます。',
    'finding-enough':
      '「これで十分な金額」を低く設定してみてください。それより上は同じ成功率で高いだけなので前面から落ちます。アルゴリズムがあなたの十分な点を見つけた瞬間です。',
    'finding-linear':
      '逆に100まで上げてみてください。払うほど際限なく良くなる人には五つの腕がすべて前面に残り、個人化は無作為と変わらなくなります。このアルゴリズムが節約できるのは「同じ成果でより高い」選択だけです。',

    'paper-said':
      '論文では72名を三群に分けて実際に回し、個人化群の平均成功率は58%、スマートフォン利用時間は平均339.2秒減りました。',
    warning:
      'この画面の成功率と費用は、ここでこしらえた人から出たものです。論文の数値と比べないでください。同じなのはアルゴリズムだけです。',

    'took-title': '研究から取ったものと、取らなかったもの',
    'took-yes':
      '取ったもの — Algorithm 1 をそのまま。金額ごとに Beta(成功+1, 失敗+1) から成功確率を引き、期待費用を確率かける金額とし、成功は大きく費用は小さくのパレート前面から無作為に選び、結果を数え入れます。五つの金額、三つの文脈、比べる三つのやり方も論文どおりです。',
    'took-no':
      '取らなかったもの — 72名の参加者とその結果、利用時間の計測、通知の設計。ここでアルゴリズムが相手にする人は、この画面でこしらえたものです。',
  },
};
