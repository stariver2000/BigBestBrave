/** 유출 확인 문구 사전 (ko / en / ja). */

import type { Dictionary } from '../../core/i18n';

export type CheckupKey =
  | 'title' | 'summary' | 'capability' | 'paper-label'
  | 'input-title' | 'input-note' | 'input-label' | 'input-placeholder'
  | 'reveal' | 'conceal' | 'samples-label'
  | 'sample-plain' | 'sample-leet' | 'sample-reversed' | 'sample-long'
  | 'local-note'
  | 'anon-title' | 'anon-note' | 'hash-label'
  | 'sent-label' | 'sent-note' | 'kept-label' | 'kept-note' | 'bits-unit'
  | 'corpus-label' | 'corpus-note' | 'bucket-label' | 'bucket-note'
  | 'guess-label' | 'guess-note'
  | 'path-title' | 'path-note' | 'base-label' | 'rank-label' | 'multiplier'
  | 'rule-reverse' | 'rule-repeat' | 'rule-suffix' | 'rule-prefix' | 'rule-case' | 'rule-leet'
  | 'attempts-label' | 'attempts-note'
  | 'offline-label' | 'offline-note' | 'online-label' | 'online-note' | 'instant'
  | 'notfound-title' | 'notfound-note' | 'empty-note'
  | 'urgency-critical' | 'urgency-high' | 'urgency-caution' | 'urgency-unknown'
  | 'action-critical' | 'action-high' | 'action-caution' | 'action-unknown'
  | 'unit-century' | 'unit-year' | 'unit-day' | 'unit-hour' | 'unit-minute' | 'unit-second'
  | 'took-title' | 'took-yes' | 'took-no';

export const checkupDictionary: Dictionary<CheckupKey> = {
  ko: {
    title: '비밀번호를 보여 주지 않고 확인하기',
    summary:
      '유출 확인 서비스가 당신의 비밀번호를 어떻게 안 보고도 확인하는지 글자 단위로 보여 드립니다. 그리고 그 비밀번호가 알려진 단어에서 몇 걸음 떨어져 있는지 세어 드립니다.',
    capability:
      '해시의 앞 다섯 자만 보낼 때 서버가 알게 되는 것의 크기를 재고, 유출 단어에서 이 비밀번호에 이르는 가장 짧은 길을 찾아낸다',
    'paper-label': '바탕이 된 연구',

    'input-title': '비밀번호',
    'input-note': '평소에 쓰는 것을 넣어 보셔도 됩니다. 아래를 보시면 왜 괜찮은지 아실 수 있습니다.',
    'input-label': '확인할 비밀번호',
    'input-placeholder': '아무 글자나 넣어 보세요',
    reveal: '보기',
    conceal: '가리기',
    'samples-label': '눌러서 넣어 보기',
    'sample-plain': '손대지 않은 것',
    'sample-leet': '글자를 바꾼 것',
    'sample-reversed': '거꾸로 쓴 것',
    'sample-long': '긴 것',
    'local-note':
      '이 글자는 이 창을 떠나지 않습니다. 서버로 보내지도, 어디에 저장하지도 않습니다. 계산은 전부 이 화면 안에서 끝납니다.',

    'anon-title': '서버가 알게 되는 것',
    'anon-note':
      '확인 서비스는 비밀번호도, 그 해시 전체도 받지 않습니다. 해시의 앞 다섯 자만 받고, 그 앞자리를 가진 것을 전부 돌려줍니다. 맞춰 보는 일은 당신의 기기 안에서 끝납니다.',
    'hash-label': 'SHA-1',
    'sent-label': '서버로 감',
    'sent-note': '앞 다섯 자',
    'kept-label': '기기에 남음',
    'kept-note': '나머지 서른다섯 자',
    'bits-unit': '비트',
    'corpus-label': '확인 서비스가 들고 있는 해시 수',
    'corpus-note': '서비스마다 다릅니다. 움직여 보시면 숨을 곳이 어떻게 늘어나는지 보입니다.',
    'bucket-label': '서버가 보는 후보',
    'bucket-note': '같은 앞자리를 가진 해시의 수입니다. 서버는 이 중 어느 것이 당신 것인지 모릅니다.',
    'guess-label': '서버가 찍어 맞힐 확률',
    'guess-note': '후보 하나를 고를 때의 값입니다.',

    'path-title': '알려진 단어에서 몇 걸음',
    'path-note':
      '비밀번호를 깨는 쪽은 무작위로 찍지 않습니다. 유출된 단어를 빈도 순으로 놓고 흔한 손질을 씌워 훑습니다. 첫 글자 대문자, a를 @로, 뒤에 연도. 그 손질들은 이미 규칙 목록에 들어 있습니다.',
    'base-label': '출발한 단어',
    'rank-label': '사전에서의 순위',
    multiplier: '가짓수',
    'rule-reverse': '거꾸로 쓰기',
    'rule-repeat': '두 번 잇기',
    'rule-suffix': '뒤에 붙이기',
    'rule-prefix': '앞에 붙이기',
    'rule-case': '대문자로 바꾸기',
    'rule-leet': '글자 바꿔치기',
    'attempts-label': '훑기의 몇 번째에서 걸리는가',
    'attempts-note': '위 사전과 위 규칙으로 순서대로 훑을 때의 어림수입니다.',
    'offline-label': '유출된 해시 파일을 받은 쪽',
    'offline-note': '전용 장비로 초당 백억 번을 시도한다고 보았을 때.',
    'online-label': '로그인 창을 두드리는 쪽',
    'online-note': '잠금과 속도 제한에 걸려 초당 열 번이라고 보았을 때.',
    instant: '눈 깜짝할 사이',
    'notfound-title': '이 사전과는 이어지지 않았습니다',
    'notfound-note':
      '안전하다는 뜻이 아닙니다. 여기 실린 단어는 백여 개뿐이고, 실제 공격자가 쓰는 사전은 수억 개입니다. 이 화면이 말할 수 있는 것은 "여기서는 못 찾았다"까지입니다.',
    'empty-note': '글자를 넣으시면 계산이 시작됩니다.',

    'urgency-critical': '그대로 실려 있음',
    'urgency-high': '한 걸음 거리',
    'urgency-caution': '먼 거리',
    'urgency-unknown': '알 수 없음',
    'action-critical': '이 비밀번호를 쓰는 곳을 지금 바꾸세요. 유출 목록에 글자 그대로 실려 있습니다.',
    'action-high': '이 비밀번호를 쓰는 곳 중 가장 중요한 한 곳부터 바꾸세요. 나머지는 그다음입니다.',
    'action-caution': '급하지는 않습니다. 다음에 로그인할 때 한 번 바꿔 두시면 됩니다.',
    'action-unknown': '지금 할 일은 없습니다. 다만 같은 비밀번호를 여러 곳에 쓰고 계시다면 그것부터 나누세요.',

    'unit-century': '세기',
    'unit-year': '년',
    'unit-day': '일',
    'unit-hour': '시간',
    'unit-minute': '분',
    'unit-second': '초',

    'took-title': '연구에서 가져온 것과 가져오지 않은 것',
    'took-yes':
      '가져온 것 — 연구는 사람들이 확인 서비스를 안 쓰는 까닭으로 자기 효능감, 경보 피로, 낮은 체감 급함을 꼽았습니다. 그래서 이 화면은 "안전합니다"라고 말하는 대신 글자가 어디로 가는지를 보이고, 경고를 늘어놓는 대신 할 일을 언제나 한 줄로만 적습니다.',
    'took-no':
      '가져오지 않은 것 — 설문과 사용자 연구의 수치, 연구진이 시험한 화면 그 자체, 그리고 실제 유출 목록 조회. 이 페이지는 통신을 하지 않으므로 사전은 여기 실린 백여 개뿐입니다.',
  },

  en: {
    title: 'Checking a password without showing it',
    summary:
      'A character-by-character look at how a breach-check service verifies your password without ever seeing it — and a count of how many steps your password sits from a word crackers already have.',
    capability:
      'measures what a server learns when only the first five characters of a hash are sent, and finds the shortest path from a leaked word to your password',
    'paper-label': 'Based on',

    'input-title': 'Password',
    'input-note': 'Type the one you actually use. Below you can see why that is safe here.',
    'input-label': 'Password to check',
    'input-placeholder': 'Type anything',
    reveal: 'Show',
    conceal: 'Hide',
    'samples-label': 'Try one',
    'sample-plain': 'Untouched',
    'sample-leet': 'Letters swapped',
    'sample-reversed': 'Written backwards',
    'sample-long': 'Long',
    'local-note':
      'These characters never leave this window. Nothing is sent, nothing is stored. Every number below is computed here.',

    'anon-title': 'What the server learns',
    'anon-note':
      'A checkup service receives neither your password nor its full hash. It receives the first five characters and returns every hash that begins that way. The comparison happens on your device.',
    'hash-label': 'SHA-1',
    'sent-label': 'Sent',
    'sent-note': 'first five characters',
    'kept-label': 'Kept on device',
    'kept-note': 'the other thirty-five',
    'bits-unit': 'bits',
    'corpus-label': 'Hashes the service holds',
    'corpus-note': 'Every service differs. Drag to see how the crowd you hide in grows.',
    'bucket-label': 'Candidates the server sees',
    'bucket-note': 'Hashes sharing your first five characters. The server cannot tell which is yours.',
    'guess-label': 'Chance the server guesses right',
    'guess-note': 'Picking one candidate at random.',

    'path-title': 'Steps from a known word',
    'path-note':
      'Crackers do not guess at random. They take leaked words in order of frequency and dress them with familiar edits — capitalise the first letter, swap a for @, add a year. Those edits are already in the rule list.',
    'base-label': 'Starting word',
    'rank-label': 'rank in the list',
    multiplier: 'variants',
    'rule-reverse': 'Reversed',
    'rule-repeat': 'Doubled',
    'rule-suffix': 'Appended',
    'rule-prefix': 'Prepended',
    'rule-case': 'Capitalised',
    'rule-leet': 'Letters swapped',
    'attempts-label': 'Reached at roughly attempt',
    'attempts-note': 'Sweeping the dictionary above with the rules above, in order.',
    'offline-label': 'Someone holding the leaked hash file',
    'offline-note': 'Assuming purpose-built hardware at ten billion guesses a second.',
    'online-label': 'Someone knocking on the login form',
    'online-note': 'Assuming lockouts and rate limits hold it to ten a second.',
    instant: 'faster than a blink',
    'notfound-title': 'No path from this dictionary',
    'notfound-note':
      'That does not mean safe. This page carries about a hundred words; a real attacker carries hundreds of millions. All this screen can say is that it did not find one here.',
    'empty-note': 'Type something to begin.',

    'urgency-critical': 'Listed verbatim',
    'urgency-high': 'One step away',
    'urgency-caution': 'Far off',
    'urgency-unknown': 'Unknown',
    'action-critical': 'Change this password everywhere you use it, now. It appears verbatim in leaked lists.',
    'action-high': 'Change it on the one account that matters most first. The rest can follow.',
    'action-caution': 'Not urgent. Change it the next time you happen to sign in.',
    'action-unknown': 'Nothing to do right now. If you reuse this one across sites, split it up first.',

    'unit-century': 'centuries',
    'unit-year': 'years',
    'unit-day': 'days',
    'unit-hour': 'hours',
    'unit-minute': 'minutes',
    'unit-second': 'seconds',

    'took-title': 'What this page took from the paper, and what it left',
    'took-yes':
      'Taken — the paper names self-efficacy, alert fatigue, and low perceived urgency as reasons people skip checkup services. So this screen shows where your characters go instead of asserting that it is safe, and gives you exactly one line to act on instead of a wall of warnings.',
    'took-no':
      'Left — the survey and user-study numbers, the interfaces the authors actually tested, and any real breach lookup. This page makes no network requests, so its dictionary is the hundred-odd words shipped with it.',
  },

  ja: {
    title: 'パスワードを見せずに確かめる',
    summary:
      '漏洩チェックの仕組みが、あなたのパスワードを見ないまま確認できる理由を一文字ずつ示します。そのうえで、そのパスワードが既知の単語から何歩の距離にあるかを数えます。',
    capability:
      'ハッシュの先頭五文字だけを送ったときにサーバーが知り得る範囲を測り、漏洩した単語からそのパスワードに至る最短の道を見つける',
    'paper-label': '下敷きにした研究',

    'input-title': 'パスワード',
    'input-note': '普段お使いのものを入れて構いません。なぜ大丈夫かは下でご覧いただけます。',
    'input-label': '確かめるパスワード',
    'input-placeholder': '何か入力してください',
    reveal: '表示',
    conceal: '隠す',
    'samples-label': '押して試す',
    'sample-plain': '手を加えていない',
    'sample-leet': '文字を置き換えた',
    'sample-reversed': '逆に書いた',
    'sample-long': '長い',
    'local-note':
      'この文字はこの画面から出ません。送信も保存もしません。下の数はすべてここで計算しています。',

    'anon-title': 'サーバーが知ること',
    'anon-note':
      'チェックの仕組みは、パスワードもハッシュ全体も受け取りません。先頭五文字だけを受け取り、その先頭を持つハッシュをすべて返します。突き合わせはお使いの端末の中で終わります。',
    'hash-label': 'SHA-1',
    'sent-label': 'サーバーへ',
    'sent-note': '先頭の五文字',
    'kept-label': '端末に残る',
    'kept-note': '残りの三十五文字',
    'bits-unit': 'ビット',
    'corpus-label': 'サービスが持つハッシュの数',
    'corpus-note': 'サービスごとに違います。動かすと隠れ場所の増え方が見えます。',
    'bucket-label': 'サーバーから見える候補',
    'bucket-note': '同じ先頭を持つハッシュの数です。どれがあなたのものかはわかりません。',
    'guess-label': 'サーバーが当てる確率',
    'guess-note': '候補を一つ選んだときの値です。',

    'path-title': '既知の単語からの歩数',
    'path-note':
      '破る側は当てずっぽうではありません。漏洩した単語を頻度順に並べ、よくある手直しを重ねて総当たりします。頭を大文字に、a を @ に、後ろに西暦。その手直しはすでに規則表に入っています。',
    'base-label': '出発した単語',
    'rank-label': '辞書での順位',
    multiplier: '通り',
    'rule-reverse': '逆順にする',
    'rule-repeat': '二度つなぐ',
    'rule-suffix': '後ろに足す',
    'rule-prefix': '前に足す',
    'rule-case': '大文字にする',
    'rule-leet': '文字を置き換える',
    'attempts-label': '総当たりの何番目で当たるか',
    'attempts-note': '上の辞書と上の規則で順に総当たりしたときの概算です。',
    'offline-label': '漏洩したハッシュ列を手にした側',
    'offline-note': '専用機材で毎秒百億回試すと仮定した場合。',
    'online-label': 'ログイン画面を叩く側',
    'online-note': 'ロックと速度制限で毎秒十回に抑えられると仮定した場合。',
    instant: 'まばたきより早く',
    'notfound-title': 'この辞書からはつながりませんでした',
    'notfound-note':
      '安全という意味ではありません。ここに載る単語は百ほどで、実際の攻撃者は数億語を持っています。この画面が言えるのは「ここでは見つからなかった」までです。',
    'empty-note': '文字を入れると計算が始まります。',

    'urgency-critical': 'そのまま載っている',
    'urgency-high': '一歩の距離',
    'urgency-caution': '遠い距離',
    'urgency-unknown': 'わからない',
    'action-critical': 'このパスワードを使っている場所を今すぐ変えてください。漏洩一覧にそのまま載っています。',
    'action-high': '使っている中で最も大事な一つから変えてください。残りはその後で構いません。',
    'action-caution': '急ぎではありません。次にログインするときに変えておけば十分です。',
    'action-unknown': '今すべきことはありません。ただ同じものを複数の場所で使っているなら、まずそれを分けてください。',

    'unit-century': '世紀',
    'unit-year': '年',
    'unit-day': '日',
    'unit-hour': '時間',
    'unit-minute': '分',
    'unit-second': '秒',

    'took-title': '研究から取ったものと、取らなかったもの',
    'took-yes':
      '取ったもの — 研究は、人がチェックの仕組みを使わない理由として自己効力感・警告疲れ・切迫感の低さを挙げています。そこでこの画面は「安全です」と言う代わりに文字の行き先を見せ、警告を並べる代わりに、すべきことをいつも一行だけ示します。',
    'took-no':
      '取らなかったもの — 調査と利用者実験の数値、著者らが実際に試した画面、そして本物の漏洩照会。このページは通信をしないため、辞書は同梱の百語ほどだけです。',
  },
};
