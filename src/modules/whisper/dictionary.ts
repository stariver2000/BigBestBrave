/** 귓속말 문구 사전 (ko / en / ja). */

import type { Dictionary } from '../../core/i18n';

export type WhisperKey =
  | 'title' | 'summary' | 'capability' | 'paper-label' | 'full-text'
  | 'try-title' | 'try-note' | 'try-message' | 'try-you'
  | 'act-public' | 'act-remove' | 'act-nudge' | 'act-reset'
  | 'front-title' | 'back-title'
  | 'front-idle' | 'front-public' | 'front-removed' | 'front-nudged'
  | 'back-idle' | 'back-public' | 'back-removed' | 'back-nudge-intro'
  | 'try-read-public' | 'try-read-removed' | 'try-read-nudged' | 'try-mine'
  | 'n-gentleWarning' | 'n-violation' | 'n-offTopic' | 'n-nsfw'
  | 'nudges-title' | 'nudges-note' | 'uses' | 'nudges-original'
  | 'outcome-title' | 'outcome-note'
  | 'o-silent' | 'o-positive' | 'o-negative'
  | 'od-silent' | 'od-positive' | 'od-negative'
  | 'outcome-typo'
  | 'servers-title' | 'servers-note' | 'sv-wave' | 'sv-category' | 'sv-members' | 'sv-nudges' | 'sv-days'
  | 'servers-read' | 'servers-line'
  | 'cat-Gaming' | 'cat-Web Development' | 'cat-Remote Work' | 'cat-Community Management'
  | 'cat-Professional Development' | 'cat-Anime'
  | 'took-title' | 'took-yes' | 'took-no' | 'took-mine';

export const whisperDictionary: Dictionary<WhisperKey> = {
  ko: {
    title: '뒷무대의 귓속말',
    summary:
      '글을 지우기엔 작고 그냥 두기엔 거슬리는 말썽이 있습니다. 그 사이를 위해, 모두가 보는 앞무대 대신 그 사람에게만 조용히 쪽지를 보내는 도구가 만들어졌고, 열한 서버에서 그 결과가 세어졌습니다.',
    capability:
      '운영자가 되어 공개 경고·삭제·귓속말 세 갈래를 골라 보고, 앞무대와 뒷무대에 각각 무엇이 남는지와 열한 서버의 실제 셈을 본다',
    'paper-label': '바탕이 된 연구',
    'full-text': '전문',

    'try-title': '운영자가 되어 보십시오',
    'try-note':
      '채널에 살짝 어긋난 글이 올라왔습니다. 규칙을 대놓고 어긴 것은 아닙니다. 세 가지 길이 있습니다 - 모두가 보는 데서 경고하거나, 지우거나, 그 사람에게만 귓속말을 보내거나. 하나씩 골라 앞무대와 뒷무대에 무엇이 남는지 보십시오.',
    'try-message': '얘들아 내가 만든 서버 놀러와!! 초대 링크 → discord.gg/××× 지금 오면 등급 줌',
    'try-you': '당신 (운영자)',

    'act-public': '공개 경고',
    'act-remove': '삭제',
    'act-nudge': '귓속말',
    'act-reset': '되돌리기',

    'front-title': '앞무대 - 모두가 보는 채널',
    'back-title': '뒷무대 - 그 사람만 받는 쪽지',

    'front-idle': '아직 아무 조치도 하지 않았습니다.',
    'front-public': '[운영자] @민들레 홍보 글은 여기 올리지 마세요. 다음부터는 경고 없이 지웁니다.',
    'front-removed': '(메시지가 삭제되었습니다)',
    'front-nudged': '채널은 그대로입니다. 아무도 조치가 있었는지 모릅니다.',

    'back-idle': '조용합니다.',
    'back-public': '쪽지는 없습니다. 대신 모두가 보는 데서 이름이 불렸습니다.',
    'back-removed': '쪽지는 없습니다. 글이 왜 사라졌는지 알 길이 없습니다.',
    'back-nudge-intro': '봇이 익명으로 보낸 쪽지:',

    'try-read-public':
      '공개 경고는 확실하지만, 논문의 형성 면접에서 운영자들이 꼽은 문제를 안습니다 - 창피함은 방어로 바뀌고, 경고한 운영자가 보복의 표적이 됩니다.',
    'try-read-removed':
      '삭제는 깔끔하지만 아무것도 가르치지 않습니다. 글쓴이는 영문을 모른 채 같은 일을 되풀이하기 쉽습니다.',
    'try-read-nudged':
      '이것이 논문의 사잇길입니다. 익명이라 운영자가 표적이 되지 않고, 링크가 있어 어느 글 때문인지 알 수 있고, 앞무대는 조용합니다. 등록된 86건 가운데 78건이 조용히 멎거나 사과로 이어졌습니다.',
    'try-mine':
      '이 판은 시연입니다. 말썽 메시지와 공개 경고문은 지어낸 글이고, 귓속말 본문만 도구의 원문 그대로입니다.',

    'n-gentleWarning': '순한 주의',
    'n-violation': '위반 알림',
    'n-offTopic': '자리 안내',
    'n-nsfw': 'NSFW 주의',

    'nudges-title': '네 가지 기본 귓속말',
    'nudges-note':
      '도구에 실려 나온 기본 문안 넷입니다. 운영자가 고치거나 더할 수 있습니다. 막대는 등록된 86건 가운데 각각이 쓰인 수입니다 - 가장 많이 쓰인 것은 위반 알림이지만, 규칙을 어기지 않았을 때 쓰는 순한 주의가 바로 뒤를 잇습니다.',
    uses: '{count}건 · 86건 중 {percent}%',
    'nudges-original': '원문(도구가 보내는 그대로)',

    'outcome-title': '보내고 나서 무슨 일이',
    'outcome-note': '값을 매겨 등록된 86건의 뒷이야기입니다.',
    'o-silent': '조용히 멎음',
    'o-positive': '눈에 보이게 좋아짐',
    'o-negative': '나빠짐',
    'od-silent': '더 말썽을 부리지 않았지만, 따로 무언가를 되돌리지도 않았습니다.',
    'od-positive': '글을 지우고, 사과하고, 다른 이에게 규칙을 알려 주기까지 했습니다.',
    'od-negative': '셋은 봇을 놀렸고, 넷은 무시하고 계속했고, 하나는 서버를 떠났습니다.',
    'outcome-typo':
      '본문은 나빠진 8건을 "84건 가운데"라고 적었습니다. 등록 사례는 앞뒤 모두 86건이고 세 갈래의 합도 86이라, 84 쪽이 잘못 적힌 것으로 보입니다. 고치지 않고 그대로 둡니다.',

    'servers-title': '열한 서버의 넉 달',
    'servers-note':
      '두 물결로 나눠 열한 서버에 붙였습니다. 연구가 요구한 기간은 14일이었는데, 여섯 서버는 끝난 뒤에도 제 발로 계속 썼습니다. 가장 오래 쓴 곳은 192일입니다.',
    'sv-wave': '물결',
    'sv-category': '갈래',
    'sv-members': '회원',
    'sv-nudges': '귓속말',
    'sv-days': '날수',
    'servers-read':
      '크기가 쓰임을 정하지 않습니다. 가장 많이 쓴 곳은 5,300명 서버(166건)이고, 240,000명짜리 가장 큰 서버는 59건에 그쳤습니다. 150명짜리 일하는 서버에서는 한 번뿐이었습니다 - 작은 곳은 굳이 도구가 필요 없었습니다.',
    'servers-line': '열한 서버가 모두 {total}건을 보냈고, {continued}곳이 연구 뒤에도 계속 썼습니다.',

    'cat-Gaming': '게임',
    'cat-Web Development': '웹 개발',
    'cat-Remote Work': '원격 근무',
    'cat-Community Management': '공동체 운영',
    'cat-Professional Development': '직업 계발',
    'cat-Anime': '애니메이션',

    'took-title': '논문에서 무엇을 가져왔는가',
    'took-yes':
      '가져온 것: 표 1의 귓속말 원문 넷, 표 2의 열한 서버 기록 전체, 86건의 귓속말별 분할(31/25/18/12)과 결과 분할(48/30/8, 세부 3+4+1), 형성 면접 8명, 그리고 본문이 문장으로 밝힌 것들.',
    'took-no':
      '가져오지 않은 것: 표 3의 실제 댓글 사례입니다. 남의 대화 기록이라 싣지 않습니다. 봇의 구현과 화면 그림도 옮기지 않았습니다.',
    'took-mine':
      '제가 더한 것: 앞무대와 뒷무대를 나란히 보는 겪는 판입니다. 말썽 메시지와 공개 경고문은 지어냈고, 귓속말 본문만 도구의 원문입니다.',
  },

  en: {
    title: 'A Whisper in the Backchannel',
    summary:
      'Some trouble is too small to delete and too grating to ignore. For that in-between, a tool was built that sends a quiet note to just that person instead of the public stage — and eleven servers counted what happened.',
    capability:
      'Be the moderator: choose between public warning, removal and a whisper, see what each leaves on the front stage and the back, and read the counts from eleven servers',
    'paper-label': 'The study behind this page',
    'full-text': 'Full text',

    'try-title': 'Be the moderator',
    'try-note':
      'A slightly-off post lands in the channel. No rule is plainly broken. Three paths: warn in front of everyone, delete, or whisper to just that person. Try each and watch what remains on the front stage and the back.',
    'try-message': 'hey everyone come check out MY server!! invite → discord.gg/xxx join now for a free rank',
    'try-you': 'You (moderator)',

    'act-public': 'Public warning',
    'act-remove': 'Remove',
    'act-nudge': 'Whisper',
    'act-reset': 'Reset',

    'front-title': 'Front stage - the channel everyone sees',
    'back-title': 'Back stage - the note only they receive',

    'front-idle': 'No action taken yet.',
    'front-public': '[MOD] @Dandelion — no self-promotion here. Next time it goes without warning.',
    'front-removed': '(message deleted)',
    'front-nudged': 'The channel is untouched. Nobody knows anything happened.',

    'back-idle': 'Quiet.',
    'back-public': 'No note. Instead, their name was called in front of everyone.',
    'back-removed': 'No note. They have no way of knowing why the post vanished.',
    'back-nudge-intro': 'The note the bot sends, anonymously:',

    'try-read-public':
      'A public warning is unambiguous, but carries the problem moderators named in the formative interviews: embarrassment turns into defensiveness, and the warning moderator becomes a target.',
    'try-read-removed':
      'Removal is clean but teaches nothing. The author never learns why, and repeats.',
    'try-read-nudged':
      'This is the paper’s in-between path. Anonymous, so no moderator becomes a target; linked, so the person knows which post; and the front stage stays quiet. Of the 86 logged cases, 78 ended quietly or in apologies.',
    'try-mine':
      'This board is a demonstration. The troublesome post and the public warning are invented; only the whisper texts are the tool’s own.',

    'n-gentleWarning': 'Gentle warning',
    'n-violation': 'Violation',
    'n-offTopic': 'Off-topic',
    'n-nsfw': 'NSFW',

    'nudges-title': 'The four default whispers',
    'nudges-note':
      'The four stock messages shipped with the tool, editable by moderators. Bars show how often each appears among the 86 logged cases — Violation leads, but the gentle warning for un-broken rules follows right behind.',
    uses: '{count} · {percent}% of 86',
    'nudges-original': 'Original (exactly as the tool sends it)',

    'outcome-title': 'What happened after sending',
    'outcome-note': 'The afterlives of the 86 logged cases.',
    'o-silent': 'Quietly stopped',
    'o-positive': 'Visibly improved',
    'o-negative': 'Went badly',
    'od-silent': 'Caused no further trouble, though repaired nothing either.',
    'od-positive': 'Deleted their post, apologized, even explained the rules to others.',
    'od-negative': 'Three mocked the bot, four ignored it and continued, one left the server.',
    'outcome-typo':
      'The text counts the 8 bad cases "of the 84 cases." The logged total reads 86 everywhere else, and the three shares sum to 86 — the 84 looks like the slip. Left as it is.',

    'servers-title': 'Eleven servers, four-plus months',
    'servers-note':
      'Deployed in two waves across eleven servers. The study required 14 days; six servers kept using it afterwards, on their own. The longest ran 192 days.',
    'sv-wave': 'Wave',
    'sv-category': 'Category',
    'sv-members': 'Members',
    'sv-nudges': 'Whispers',
    'sv-days': 'Days',
    'servers-read':
      'Size does not set usage. The heaviest user was a 5,300-member server (166), while the largest at 240,000 sent 59. The 150-member work server used it once — small places simply did not need the tool.',
    'servers-line': 'All eleven sent {total} whispers; {continued} kept going after the study.',

    'cat-Gaming': 'Gaming',
    'cat-Web Development': 'Web development',
    'cat-Remote Work': 'Remote work',
    'cat-Community Management': 'Community management',
    'cat-Professional Development': 'Professional development',
    'cat-Anime': 'Anime',

    'took-title': 'What was taken from the paper',
    'took-yes':
      'Taken: the four whisper texts of Table 1, the full eleven-server record of Table 2, the split of the 86 cases by whisper (31/25/18/12) and by outcome (48/30/8, detailed 3+4+1), the eight formative interviews, and what the text states in sentences.',
    'took-no':
      'Not taken: the real comment examples of Table 3 — other people’s conversations. The bot implementation and interface figures are not carried either.',
    'took-mine':
      'Added by me: the side-by-side front-stage/back-stage board. The troublesome post and public warning are invented; only the whisper texts are the tool’s own.',
  },

  ja: {
    title: '舞台裏のささやき',
    summary:
      '消すには小さく、放っておくには障る、そんな厄介ごとがあります。その中間のために、皆が見る表舞台ではなく本人にだけ静かにメモを送る道具が作られ、11のサーバーでその結果が数えられました。',
    capability:
      '運営者になって公開警告・削除・ささやきの三つを選び、表舞台と舞台裏に何が残るかと、11サーバーの実際の数を見る',
    'paper-label': 'もとになった研究',
    'full-text': '全文',

    'try-title': '運営者になってみてください',
    'try-note':
      'チャンネルに少しずれた投稿が届きました。規則をあからさまに破ってはいません。道は三つ - 皆の前で警告する、消す、本人にだけささやく。ひとつずつ選んで、表舞台と舞台裏に何が残るか見てください。',
    'try-message': 'みんな俺のサーバー遊びに来て!! 招待 → discord.gg/xxx 今来たらランクあげる',
    'try-you': 'あなた(運営者)',

    'act-public': '公開警告',
    'act-remove': '削除',
    'act-nudge': 'ささやき',
    'act-reset': '元に戻す',

    'front-title': '表舞台 - 皆が見るチャンネル',
    'back-title': '舞台裏 - 本人だけが受け取るメモ',

    'front-idle': 'まだ何もしていません。',
    'front-public': '[運営] @たんぽぽ 宣伝はここに投稿しないでください。次は警告なしで消します。',
    'front-removed': '(メッセージは削除されました)',
    'front-nudged': 'チャンネルはそのままです。何かあったと誰も知りません。',

    'back-idle': '静かです。',
    'back-public': 'メモはありません。代わりに皆の前で名前を呼ばれました。',
    'back-removed': 'メモはありません。なぜ投稿が消えたのか知るすべがありません。',
    'back-nudge-intro': 'ボットが匿名で送るメモ:',

    'try-read-public':
      '公開警告は明確ですが、形成面接で運営者が挙げた問題を抱えます。恥ずかしさは反発に変わり、警告した運営者が報復の的になります。',
    'try-read-removed':
      '削除はきれいですが何も教えません。書いた人は訳が分からないまま、同じことを繰り返しがちです。',
    'try-read-nudged':
      'これが論文の中間の道です。匿名なので運営者が的にならず、リンクがあるのでどの投稿か分かり、表舞台は静かなまま。記録された86件のうち78件が静かに収まるか謝罪につながりました。',
    'try-mine':
      'この盤は実演です。いたずら投稿と公開警告文は作り話で、ささやきの本文だけが道具の原文です。',

    'n-gentleWarning': 'やさしい注意',
    'n-violation': '違反の知らせ',
    'n-offTopic': '場所の案内',
    'n-nsfw': 'NSFW注意',

    'nudges-title': '四つの標準ささやき',
    'nudges-note':
      '道具に付いてきた標準文面の四つで、運営者が直したり足したりできます。棒は記録86件の中で各々が使われた数 - 最多は違反の知らせですが、規則を破っていないときのやさしい注意がすぐ後に続きます。',
    uses: '{count}件 · 86件中{percent}%',
    'nudges-original': '原文(道具が送るそのまま)',

    'outcome-title': '送ったあと何が',
    'outcome-note': '記録された86件のその後です。',
    'o-silent': '静かに収まった',
    'o-positive': '目に見えて良くなった',
    'o-negative': '悪くなった',
    'od-silent': 'それ以上の厄介は起こさなかったが、何かを直しもしなかった。',
    'od-positive': '投稿を消し、謝り、他の人に規則を教えさえした。',
    'od-negative': '三人はボットをからかい、四人は無視して続け、一人はサーバーを去った。',
    'outcome-typo':
      '本文は悪くなった8件を「84件のうち」と書いています。記録総数は他の箇所すべてで86件、三つの分け前の合計も86 - 84の方が書き誤りに見えます。直さずそのままにします。',

    'servers-title': '11サーバーの四か月余り',
    'servers-note':
      '二つの波に分けて11サーバーに入れました。研究が求めた期間は14日でしたが、6サーバーは終了後も自ら使い続けました。最長は192日です。',
    'sv-wave': '波',
    'sv-category': '種類',
    'sv-members': '会員',
    'sv-nudges': 'ささやき',
    'sv-days': '日数',
    'servers-read':
      '大きさが使われ方を決めません。最も多く使ったのは5,300人のサーバー(166件)で、24万人の最大サーバーは59件どまり。150人の仕事サーバーでは一度だけ - 小さな場所はそもそも道具を要しませんでした。',
    'servers-line': '11サーバー合わせて{total}件を送り、{continued}か所が研究後も使い続けました。',

    'cat-Gaming': 'ゲーム',
    'cat-Web Development': 'ウェブ開発',
    'cat-Remote Work': 'リモートワーク',
    'cat-Community Management': 'コミュニティ運営',
    'cat-Professional Development': '職能開発',
    'cat-Anime': 'アニメ',

    'took-title': '論文から何を取ったか',
    'took-yes':
      '取ったもの:表1のささやき原文四つ、表2の11サーバーの記録すべて、86件のささやき別分割(31/25/18/12)と結果分割(48/30/8、内訳3+4+1)、形成面接8名、そして本文が文章で述べたこと。',
    'took-no':
      '取らなかったもの:表3の実際のコメント例です。他人の会話記録なので載せません。ボットの実装と画面の図も移していません。',
    'took-mine':
      '私が足したもの:表舞台と舞台裏を並べて見る体験盤です。いたずら投稿と公開警告文は作り話で、ささやき本文だけが道具の原文です。',
  },
};
