/** 다시 묻기 문구 사전 (ko / en / ja). */

import type { Dictionary } from '../../core/i18n';

export type AgainKey =
  | 'title' | 'summary' | 'capability' | 'paper-label' | 'full-text'
  | 'pick-title' | 'pick-note' | 'pick-empty'
  | 'd-intent' | 'd-depth' | 'd-accuracy' | 'd-transparency' | 'd-refusal' | 'd-ethics' | 'd-format'
  | 'dd-intent' | 'dd-depth' | 'dd-accuracy' | 'dd-transparency' | 'dd-refusal' | 'dd-ethics' | 'dd-format'
  | 'how-common' | 'how-bad' | 'of-522'
  | 'know-title' | 'know-all' | 'know-high' | 'know-low' | 'know-note'
  | 'gap-title' | 'gap-note' | 'gap-people' | 'gap-worked' | 'gap-same' | 'gap-diverge' | 'gap-giveup'
  | 't-repeat' | 't-specify' | 't-error' | 't-adapt' | 't-none'
  | 'unresolved-title' | 'unresolved-body' | 'nothing-share' | 'resolved-share'
  | 'ask-title' | 'ask-note' | 'ask-mine' | 'ask-copy' | 'ask-copied' | 'ask-empty' | 'ask-lead'
  | 'stream-asked' | 'stream-solved' | 'stream-paper' | 'stream-waiting' | 'stream-fixed'
  | 'stream-still' | 'stream-mine' | 'crowd-effect' | 'mine-effect' | 'outdid'
  | 'effect' | 'from-n' | 'thin-sample' | 'pooled'
  | 'c-T1' | 'c-T2' | 'c-T3' | 'c-T4' | 'c-T5' | 'c-T6' | 'c-T7'
  | 'c-T8' | 'c-T9' | 'c-T10' | 'c-T11' | 'c-T12' | 'c-T13'
  | 's-T1' | 's-T2' | 's-T3' | 's-T4' | 's-T5' | 's-T6' | 's-T7'
  | 's-T8' | 's-T9' | 's-T10' | 's-T11' | 's-T12' | 's-T13'
  | 'check-title' | 'check-note' | 'check-ours' | 'check-theirs' | 'check-match' | 'check-mismatch'
  | 'check-t5' | 'check-t6' | 'check-verdict'
  | 'took-title' | 'took-yes' | 'took-no' | 'took-mine';

export const againDictionary: Dictionary<AgainKey> = {
  ko: {
    title: '다시 묻는 법',
    summary:
      'AI의 답이 마음에 들지 않을 때 사람들은 무엇을 하고, 그중 무엇이 실제로 들었을까요. 511건의 실제 사례를 잰 논문의 표를 그대로 놓고, 다시 물을 문장까지 세워 드립니다.',
    capability:
      '어떤 불만인지 고르면 논문이 잰 흔함·세기·효과를 보여 주고, 효과가 높았던 수법으로 다시 물을 문장을 세운다',
    'paper-label': '바탕이 된 연구',
    'full-text': '전문',

    'pick-title': '무엇이 마음에 들지 않았습니까',
    'pick-note':
      '논문은 문헌을 훑어 불만을 일곱 갈래로 나눈 뒤, 107명에게서 511건의 실제 사례를 받았습니다. 한 답이 여러 갈래에 걸릴 수 있으니 여럿 고르셔도 됩니다.',
    'pick-empty': '하나 이상 골라 주십시오.',

    'd-intent': '내 뜻을 못 알아들었다',
    'd-depth': '뻔하고 얕다',
    'd-accuracy': '사실이 틀렸다',
    'd-transparency': '왜 그렇게 답했는지 모르겠다',
    'd-refusal': '답하기를 피한다',
    'd-ethics': '해롭거나 치우쳤다',
    'd-format': '말투와 형식이 거슬린다',

    'dd-intent': '내가 시킨 것, 내가 놓인 자리를 답이 반영하지 못했습니다.',
    'dd-depth': '너무 일반적이거나, 새로울 것이 없거나, 알맹이가 모자랍니다.',
    'dd-accuracy': '틀린 정보, 오래된 정보, 앞뒤가 안 맞는 말, 지어낸 근거입니다.',
    'dd-transparency': '무엇을 근거로 그런 판단에 이르렀는지 알 수 없습니다.',
    'dd-refusal': '"저는 언어 모델이라 할 수 없습니다" 쪽으로 비켜 갑니다.',
    'dd-ethics': '불법이거나 해롭거나 한쪽으로 치우친 내용이 들어 있습니다.',
    'dd-format': '길이, 짜임, 말투, 태도가 원하던 것과 다릅니다.',

    'how-common': '얼마나 흔한가',
    'how-bad': '얼마나 아팠나',
    'of-522': '522건 중',

    'know-title': '누구의 자료로 볼까요',
    'know-all': '모두',
    'know-high': 'AI를 잘 아는 사람',
    'know-low': '잘 모르는 사람',
    'know-note':
      '논문은 참가자에게 언어 모델을 얼마나 아는지 7점으로 물어 1~3을 낮음, 5~7을 높음으로 갈랐습니다. 가운데 4를 매긴 사람은 어느 쪽에도 넣지 않았습니다. 그래서 두 무리의 합은 전체보다 작습니다.',

    'gap-title': '기우는 쪽과 드는 쪽',
    'gap-note':
      '사람들이 자주 고르는 대응과 실제로 잘 들었던 대응은 같지 않습니다. 왼쪽은 논문이 본문에 적은 사람들의 기울기이고, 오른쪽은 논문이 1~10으로 잰 효과입니다. 이 둘은 종류가 다른 값이라 한 눈금에 섞지 않았습니다.',
    'gap-people': '사람들이 기운 쪽',
    'gap-worked': '가장 잘 들었던 쪽',
    'gap-same': '이 불만에서는 두 쪽이 같습니다.',
    'gap-diverge': '이 불만에서는 두 쪽이 어긋납니다.',
    'gap-giveup': '이 불만 앞에서 사람들은 흔히 대화를 그냥 끝냈습니다. 효과를 잴 것이 남지 않습니다.',

    't-repeat': '같은 것을 다시 던지기',
    't-specify': '내 뜻을 더 또렷이 말하기',
    't-error': '틀린 곳을 짚어 고치기',
    't-adapt': '과제 자체를 바꾸기',
    't-none': '아무것도 하지 않기',

    'unresolved-title': '그래서 풀렸을까요',
    'unresolved-body':
      '이 논문에서 가장 큰 수는 여기 있습니다. 불만을 겪은 사람의 셋 중 하나는 아무것도 하지 않았고, 무언가 해 본 사람까지 합쳐도 끝내 풀린 것은 넷 중 하나가 조금 넘습니다.',
    'nothing-share': '아무것도 하지 않았다',
    'resolved-share': '끝내 풀렸다',

    'ask-title': '이렇게 다시 물어보십시오',
    'ask-note':
      '옆에서는 사람들이 계속 다시 묻고 있습니다. 어떤 수법을 쓰는지, 그래서 풀리는지 세어 보세요. 그 아래에서 당신은 잘 들었던 쪽을 골라 문장을 만들 수 있습니다. 효과 점수가 높았던 순서이고, 다섯 건이 안 되는 표본에서 나온 점수는 순위의 맨 뒤로 보냈습니다.',
    'ask-mine':
      '문장은 제가 썼습니다. 논문은 열세 가지 수법이 무엇인지 적었을 뿐 문장을 주지 않았습니다.',
    'ask-copy': '문장 복사',
    'ask-copied': '복사했습니다',
    'ask-empty': '수법을 하나 이상 고르시면 문장이 만들어집니다.',
    'ask-lead': '방금 답이 아쉬웠습니다.',

    effect: '효과',
    'from-n': '건에서',
    'thin-sample': '표본이 적습니다',
    pooled: '이 무리의 표본이 적어 전체 값을 씁니다',

    'stream-asked': '물어봄',
    'stream-solved': '풀림',
    'stream-paper': '논문',
    'stream-waiting': '곧 누군가 다시 묻습니다.',
    'stream-fixed': '풀렸다',
    'stream-still': '그대로',
    'stream-mine': '이 대화는 지어낸 것입니다. 어떤 수법이 나올지는 논문 표 3의 개수대로 뽑고, 풀렸는지는 논문이 밝힌 비율(전체 28%, 지식 높음 29%, 낮음 23.5%)로 굴립니다. 수법별 해결률은 논문에 그림으로만 실려 있어 어떤 수법을 골라도 같은 비율로 굴립니다.',
    'crowd-effect': '사람들이 고른 대로',
    'mine-effect': '당신이 고른 대로',
    'outdid': '방금 사람들이 고르던 것보다 잘 들었던 쪽을 고르셨습니다. 위에서 흘러가는 문장 대부분은 그 반대쪽입니다.',

    'c-T1': '같은 것을 그대로 다시',
    'c-T2': '"다른 걸로" 한마디',
    'c-T3': '대문자나 따옴표로 힘주기',
    'c-T4': '지시를 더 구체적으로',
    'c-T5': '내 상황을 덧붙이기',
    'c-T6': '형식을 못박기',
    'c-T7': '말투를 정해 주기',
    'c-T8': '틀린 곳을 짚기',
    'c-T9': '맞는 답을 알려 주기',
    'c-T10': '되물어 확인하기',
    'c-T11': '다른 과제로 옮기기',
    'c-T12': '잘게 쪼개기',
    'c-T13': '곁가지를 더 묻기',

    's-T1': '방금 것 말고 다시 한 번 답해 주세요.',
    's-T2': '다른 걸로 주세요.',
    's-T3': '앞에서 말한 조건을 반드시 지켜 주세요.',
    's-T4': '제가 원하는 것은 정확히 이렇습니다: (원하는 결과를 한 문장으로 적으십시오).',
    's-T5': '제 상황은 이렇습니다: (누가, 어디에, 무엇을 위해 쓰는지 적으십시오).',
    's-T6': '다섯 줄 목록으로, 한 줄에 한 가지만 담아 주세요.',
    's-T7': '격식을 빼고 편하게 말해 주세요.',
    's-T8': '(어느 부분)이 사실과 다릅니다. 거기만 고쳐 주세요.',
    's-T9': '맞는 값은 (…)입니다. 이걸 기준으로 다시 써 주세요.',
    's-T10': '그 근거를 어디서 가져왔는지 알려 주세요. 확실합니까?',
    's-T11': '그건 어려워 보이니, 대신 (…)를 해 주세요.',
    's-T12': '한꺼번에 말고 첫 단계부터 하나씩 해 주세요.',
    's-T13': '방금 답에서 (…) 부분만 더 자세히 풀어 주세요.',

    'check-title': '표를 되짚어 보았습니다',
    'check-note':
      '논문은 두 무리의 분포가 다른지 카이제곱으로 검정하고 그 값을 적어 두었습니다. 여기 옮겨 적은 표로 그 값을 다시 계산해 보면 옮겨 적기가 옳았는지 알 수 있습니다.',
    'check-ours': '옮긴 표에서 다시 계산',
    'check-theirs': '논문이 적어 둔 값',
    'check-match': '맞습니다',
    'check-mismatch': '어긋납니다',
    'check-t5': '불만 일곱 갈래 × 두 무리',
    'check-t6': '대응 다섯 갈래 × 두 무리',
    'check-verdict':
      '앞의 것은 소수 첫째 자리까지 맞습니다. 열네 개 숫자 가운데 하나만 잘못 옮겨도 맞지 않으므로, 이 표는 제대로 옮겨졌습니다. 뒤의 것은 맞지 않습니다. 개수는 자기 백분율과도 맞고 합도 262와 131로 맞으니 옮겨 적기의 잘못은 아닌 듯한데, 표만 보아서는 어느 쪽이 옳은지 알 수 없습니다. 맞추려고 표를 고치지 않고 어긋난 채로 둡니다.',

    'took-title': '논문에서 무엇을 가져왔는가',
    'took-yes':
      '가져온 것: 불만 일곱 갈래와 대응 열세 수법, 표 2·4·5·6의 개수와 백분율과 점수 전부, 그리고 본문이 밝힌 방향과 검정값.',
    'took-no':
      '가져오지 않은 것: 그림에 실린 값 전부입니다. 어느 불만에 어느 대응을 몇 번 썼는지는 생키 다이어그램으로만 실렸습니다. 그림에서 눈으로 읽어낸 값은 논문의 수치가 아니라 제가 자로 잰 값이 되므로 적지 않았습니다. 참가자의 대화 기록도 싣지 않았습니다.',
    'took-mine':
      '제가 더한 것: 다시 물을 문장, 그리고 표본이 다섯 건이 안 되는 칸은 순위에 쓰지 않는다는 규칙입니다.',
  },

  en: {
    title: 'How to Ask Again',
    summary:
      "When an AI's answer disappoints you, what do people actually do about it, and what actually works? Here are the measured tables from 511 real cases, plus a follow-up prompt built from them.",
    capability:
      'Pick what went wrong and see how common, how painful, and how fixable it was in the measured data, then build a follow-up prompt from the tactics that scored highest',
    'paper-label': 'The study behind this page',
    'full-text': 'Full text',

    'pick-title': 'What bothered you about the answer',
    'pick-note':
      'The authors read the literature into seven kinds of dissatisfaction, then collected 511 real cases from 107 people. One answer can fall into several kinds, so pick as many as fit.',
    'pick-empty': 'Pick at least one.',

    'd-intent': 'It missed what I meant',
    'd-depth': 'Obvious and shallow',
    'd-accuracy': 'The facts were wrong',
    'd-transparency': "I can't see how it got there",
    'd-refusal': 'It dodged the question',
    'd-ethics': 'Harmful or slanted',
    'd-format': 'Wrong tone and shape',

    'dd-intent': 'The answer did not reflect my instruction or my situation.',
    'dd-depth': 'Too general, nothing new in it, or missing substance.',
    'dd-accuracy': 'Wrong facts, stale facts, self-contradiction, invented sources.',
    'dd-transparency': 'No way to see the reasoning or the criteria behind it.',
    'dd-refusal': 'It slides toward "as a language model, I cannot".',
    'dd-ethics': 'Unlawful, harmful, or biased content in the answer.',
    'dd-format': 'Length, structure, tone, or attitude is not what I wanted.',

    'how-common': 'How often',
    'how-bad': 'How much it stung',
    'of-522': 'of 522',

    'know-title': 'Whose data should we read',
    'know-all': 'Everyone',
    'know-high': 'Knows AI well',
    'know-low': 'Does not',
    'know-note':
      'Participants rated their own knowledge of language models on a 7-point scale. The authors called 1-3 low and 5-7 high, and left the middle out. That is why the two groups add up to less than the whole.',

    'gap-title': 'What people reach for, what actually works',
    'gap-note':
      'The tactic people reach for is not the tactic that worked. On the left is where people leaned, stated in the paper’s own prose. On the right is the effectiveness they rated from 1 to 10. These are different kinds of quantity, so they are not put on one scale.',
    'gap-people': 'People leaned toward',
    'gap-worked': 'Rated most effective',
    'gap-same': 'For this one, the two agree.',
    'gap-diverge': 'For this one, the two pull apart.',
    'gap-giveup': 'Faced with this one, people often just ended the conversation. There is no effectiveness left to measure.',

    't-repeat': 'Throw the same prompt again',
    't-specify': 'Say what I mean more plainly',
    't-error': 'Point at the error and fix it',
    't-adapt': 'Change the task itself',
    't-none': 'Do nothing',

    'unresolved-title': 'So did it get fixed',
    'unresolved-body':
      'Here is the biggest number in the paper. One in three people did nothing at all, and even counting everyone who tried something, only a little over one in four ended up satisfied.',
    'nothing-share': 'did nothing',
    'resolved-share': 'ended up resolved',

    'ask-title': 'Try asking again like this',
    'ask-note':
      'Beside you, people keep asking again. Count what they reach for and how often it works. Below that you can pick the ones that scored higher and build a sentence. They are ordered by effect, and scores from fewer than five cases are pushed to the back.',
    'ask-mine':
      'The sentences are mine. The paper names the thirteen tactics but does not write them out.',
    'ask-copy': 'Copy the prompt',
    'ask-copied': 'Copied',
    'ask-empty': 'Pick a tactic or two and a prompt appears here.',
    'ask-lead': 'That answer was not quite what I needed.',

    effect: 'Effectiveness',
    'from-n': 'cases',
    'thin-sample': 'thin sample',
    pooled: 'too few cases in this group, using the overall figure',

    'stream-asked': 'asked',
    'stream-solved': 'solved',
    'stream-paper': 'paper',
    'stream-waiting': 'Someone is about to ask again.',
    'stream-fixed': 'solved',
    'stream-still': 'still wrong',
    'stream-mine': 'This conversation is invented. Which tactic comes up is drawn by the counts in the paper’s Table 3, and whether it got solved is rolled at the rate the paper reports (28% overall, 29% for high knowledge, 23.5% for low). Per-tactic solve rates appear only inside the paper’s figures, so every tactic here is rolled at the same rate.',
    'crowd-effect': 'The way people chose',
    'mine-effect': 'The way you chose',
    'outdid': 'You just picked higher-scoring ground than what people actually reached for. Most of the sentences drifting past above are the other kind.',

    'c-T1': 'Send the same thing again',
    'c-T2': 'Just say "another one"',
    'c-T3': 'Add emphasis with caps or quotes',
    'c-T4': 'Give a more specific instruction',
    'c-T5': 'Add my context',
    'c-T6': 'Pin down the format',
    'c-T7': 'Pin down the tone',
    'c-T8': 'Point at what is wrong',
    'c-T9': 'Hand it the right answer',
    'c-T10': 'Ask it to confirm',
    'c-T11': 'Move to a different task',
    'c-T12': 'Break it into steps',
    'c-T13': 'Ask a follow-up on the side',

    's-T1': 'Not that one. Try answering again.',
    's-T2': 'Another one, please.',
    's-T3': 'Please keep to the condition I gave above.',
    's-T4': 'Here is exactly what I want: (write the outcome you want in one sentence).',
    's-T5': 'Here is my situation: (who this is for, where it goes, what it is for).',
    's-T6': 'Give it as five bullet points, one idea per line.',
    's-T7': 'Drop the formality and say it plainly.',
    's-T8': '(That part) is not true. Fix only that part.',
    's-T9': 'The correct value is (...). Rewrite it on that basis.',
    's-T10': 'Where did that come from? Are you sure?',
    's-T11': 'That looks out of reach, so do (...) instead.',
    's-T12': 'Not all at once. Start with the first step and go one at a time.',
    's-T13': 'From that answer, expand just the (...) part.',

    'check-title': 'We recomputed the tables',
    'check-note':
      'The paper tested whether the two knowledge groups differ, and printed the chi-square. Recomputing that value from the numbers transcribed here tells us whether the transcription was faithful.',
    'check-ours': 'Recomputed from our transcription',
    'check-theirs': 'Printed in the paper',
    'check-match': 'agrees',
    'check-mismatch': 'disagrees',
    'check-t5': 'Seven dissatisfactions x two groups',
    'check-t6': 'Five tactics x two groups',
    'check-verdict':
      'The first agrees to one decimal place. A single mistyped digit among fourteen would break it, so that table came across intact. The second does not agree. The counts match their own percentages and sum to 262 and 131, so the transcription looks sound, yet the table alone cannot say which value is right. We leave the disagreement standing rather than adjusting the table to close it.',

    'took-title': 'What was taken from the paper',
    'took-yes':
      'Taken: the seven kinds of dissatisfaction and the thirteen tactics, every count, percentage and score in Tables 2, 4, 5 and 6, and the directions and test statistics stated in the prose.',
    'took-no':
      'Not taken: every value that lives only in a figure. Which tactic followed which dissatisfaction appears only as a Sankey diagram. A number read off a figure with a ruler is my measurement, not the paper’s, so it is not here. Participants’ conversation logs are not reproduced either.',
    'took-mine':
      'Added by me: the follow-up sentences, and the rule that a cell with fewer than five cases does not get ranked.',
  },

  ja: {
    title: 'もう一度たずねる',
    summary:
      'AIの答えが物足りないとき、人は何をして、そのうち何が実際に効いたのか。511件の実例を測った論文の表をそのまま置き、次に送る一文まで組み立てます。',
    capability:
      '不満の種類を選ぶと、論文が測った頻度・強さ・効果を見せ、効果の高かった手立てで次の一文を組み立てる',
    'paper-label': 'もとになった研究',
    'full-text': '全文',

    'pick-title': '答えのどこが物足りませんでしたか',
    'pick-note':
      '著者らは文献を読み解いて不満を七つに分け、107人から511件の実例を集めました。ひとつの答えが複数にまたがることもあるので、いくつ選んでも構いません。',
    'pick-empty': 'ひとつ以上お選びください。',

    'd-intent': '意図が伝わらなかった',
    'd-depth': 'ありきたりで浅い',
    'd-accuracy': '事実が違う',
    'd-transparency': 'なぜそう答えたのか分からない',
    'd-refusal': '答えを避けている',
    'd-ethics': '有害または偏っている',
    'd-format': '口調と形式が合わない',

    'dd-intent': '指示や置かれた状況が答えに反映されていません。',
    'dd-depth': '一般的すぎる、目新しさがない、中身が足りない。',
    'dd-accuracy': '誤った情報、古い情報、前後の矛盾、作り上げた根拠です。',
    'dd-transparency': 'どんな根拠でその判断に至ったのか見えません。',
    'dd-refusal': '「言語モデルなのでできません」の方へ逃げます。',
    'dd-ethics': '違法・有害・偏った内容が含まれています。',
    'dd-format': '長さ、構成、口調、態度が望んだものと違います。',

    'how-common': 'どれくらい多いか',
    'how-bad': 'どれくらい痛かったか',
    'of-522': '522件中',

    'know-title': '誰のデータで見ますか',
    'know-all': '全員',
    'know-high': 'AIをよく知る人',
    'know-low': 'あまり知らない人',
    'know-note':
      '参加者は言語モデルへの理解度を7段階で答えました。著者らは1〜3を低い、5〜7を高いとし、真ん中の4はどちらにも入れていません。だから二つの群の合計は全体より小さくなります。',

    'gap-title': '手が伸びる方と、効く方',
    'gap-note':
      'よく選ばれる手立てと、実際に効いた手立ては同じではありません。左は論文が本文で述べた人々の傾きで、右は1〜10で測られた効果です。種類の違う値なので、ひとつの目盛りには載せていません。',
    'gap-people': '人が傾いた方',
    'gap-worked': '最も効いた方',
    'gap-same': 'この不満では二つが一致します。',
    'gap-diverge': 'この不満では二つが食い違います。',
    'gap-giveup': 'この不満を前にすると、人はしばしば会話をそこで終えました。測る効果が残りません。',

    't-repeat': '同じものをもう一度投げる',
    't-specify': '意図をもっとはっきり言う',
    't-error': '誤りを指して直す',
    't-adapt': '課題そのものを変える',
    't-none': '何もしない',

    'unresolved-title': 'それで解決したのか',
    'unresolved-body':
      'この論文で最も大きい数がここにあります。三人に一人は何もせず、何かを試した人まで合わせても、最後に満たされたのは四人に一人を少し超えるだけでした。',
    'nothing-share': '何もしなかった',
    'resolved-share': '最後に解決した',

    'ask-title': 'こう聞き直してみてください',
    'ask-note':
      'すぐ横で、人がずっと聞き直しています。どの手を使い、それで解決するのかを数えてみてください。その下で、あなたはよく効いた側を選んで文を作れます。効果の高い順で、五件に満たない標本から出た点数は末尾に回しています。',
    'ask-mine':
      '文は私が書きました。論文は十三の手立てが何かを記しただけで、文そのものは与えていません。',
    'ask-copy': '文をコピー',
    'ask-copied': 'コピーしました',
    'ask-empty': '手立てをひとつ以上選ぶと文ができます。',
    'ask-lead': 'いまの答えは少し物足りませんでした。',

    effect: '効果',
    'from-n': '件から',
    'thin-sample': '標本が少ない',
    pooled: 'この群は標本が少ないため全体の値を使います',

    'stream-asked': '聞いた回数',
    'stream-solved': '解決',
    'stream-paper': '論文',
    'stream-waiting': 'まもなく誰かが聞き直します。',
    'stream-fixed': '解決した',
    'stream-still': 'そのまま',
    'stream-mine': 'この会話は作りものです。どの聞き直し方が出るかは論文の表3の件数どおりに引き、解決したかどうかは論文が示した割合（全体28%、知識が高い群29%、低い群23.5%）で振ります。聞き直し方ごとの解決率は論文では図の中にしかないため、どれを選んでも同じ割合で振ります。',
    'crowd-effect': '人が選んだとおり',
    'mine-effect': 'あなたが選んだとおり',
    'outdid': '今、人が実際に選んでいたものより効いた側を選びました。上を流れていく文のほとんどは、その反対側です。',

    'c-T1': '同じものをそのまま',
    'c-T2': '「別のを」の一言',
    'c-T3': '大文字や引用符で強調',
    'c-T4': '指示をもっと具体的に',
    'c-T5': '自分の状況を添える',
    'c-T6': '形式を決めてしまう',
    'c-T7': '口調を指定する',
    'c-T8': '誤りを指す',
    'c-T9': '正しい答えを渡す',
    'c-T10': '聞き返して確かめる',
    'c-T11': '別の課題へ移る',
    'c-T12': '細かく分ける',
    'c-T13': '枝葉をさらに聞く',

    's-T1': 'いまのではなく、もう一度答えてください。',
    's-T2': '別のものをください。',
    's-T3': '先に伝えた条件を必ず守ってください。',
    's-T4': '私が欲しいのは正確にこれです:(欲しい結果を一文で書いてください)。',
    's-T5': '私の状況はこうです:(誰が、どこで、何のために使うか書いてください)。',
    's-T6': '五行の箇条書きで、一行にひとつだけ入れてください。',
    's-T7': '堅い言い方をやめて、くだけた調子で話してください。',
    's-T8': '(その部分)が事実と違います。そこだけ直してください。',
    's-T9': '正しい値は(…)です。それを基準に書き直してください。',
    's-T10': 'その根拠はどこから来ましたか。確かですか。',
    's-T11': 'それは難しそうなので、代わりに(…)をしてください。',
    's-T12': '一度にではなく、最初の段階からひとつずつ進めてください。',
    's-T13': 'いまの答えのうち、(…)の部分だけ詳しく説明してください。',

    'check-title': '表を計算し直しました',
    'check-note':
      '論文は二つの群の分布が違うかをカイ二乗で検定し、その値を記しています。ここに書き写した表からその値を計算し直せば、写し取りが正しかったか分かります。',
    'check-ours': '写した表から計算し直した値',
    'check-theirs': '論文に記された値',
    'check-match': '一致します',
    'check-mismatch': '食い違います',
    'check-t5': '不満七種 × 二群',
    'check-t6': '手立て五種 × 二群',
    'check-verdict':
      '前者は小数第一位まで一致します。十四個の数字のうち一つでも写し間違えれば合わないので、この表は正しく写せています。後者は合いません。件数は自身の百分率とも合い、合計も262と131で合うので写し間違いではなさそうですが、表だけではどちらが正しいか分かりません。合わせるために表を直すことはせず、食い違ったままにしておきます。',

    'took-title': '論文から何を取ったか',
    'took-yes':
      '取ったもの:不満の七種と手立ての十三種、表2・4・5・6の件数と百分率と点数のすべて、そして本文が述べた方向と検定値。',
    'took-no':
      '取らなかったもの:図にしかない値のすべてです。どの不満にどの手立てが続いたかはサンキー図としてしか載っていません。図から目盛りで読み取った数は論文の数値ではなく私の測定値になるので、書きませんでした。参加者の会話記録も載せていません。',
    'took-mine':
      '私が足したもの:聞き直すための文と、5件に満たない枠は順位に使わないという決まりです。',
  },
};
