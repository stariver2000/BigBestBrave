/**
 * 귓속말 페이지 설정.
 *
 * 근거가 된 연구: Chillbot: Content Moderation in the Backchannel
 * (Joseph Seering(KAIST), Manas Khadka, Nava Haghighi, Tanya Yang, Zachary Xi,
 * Michael Bernstein(Stanford)), PACM HCI / CSCW 2024, doi:10.1145/3686941.
 * 전문은 MIT DSpace의 공개본으로 읽었다.
 *
 * 이 페이지가 가져온 것
 *   - 표 1의 네 가지 기본 귓속말 원문. 도구의 설계물이라 옮겨도 된다.
 *   - 표 2의 열한 서버 사용 기록 전체와, 본문이 문장으로 밝힌 것들(여섯 서버가
 *     제 발로 계속 씀, 14~192일, 작은 서버에선 한 번뿐).
 *   - 5.2절의 귓속말별 사용 수(31/25/18/12 = 86)와 5.3절의 결과 분할(48/30/8).
 *   - 형성 면접 8명.
 *
 * 가져오지 않은 것
 *   - 표 3의 실제 댓글 사례. 남의 대화 기록이다.
 *   - 봇 구현과 화면 그림.
 *
 * 이 페이지가 스스로 더한 것
 *   - 겪는 판. 앞무대와 뒷무대를 나란히 보여 주는 화면 짜임과, 판에 놓은 가상의
 *     말썽 메시지(지어낸 글이다). 공개 경고와 삭제의 결과 묘사도 논문의 동기 서술을
 *     따라 지은 것이다.
 */

export const PAPER = {
  title: 'Chillbot: Content Moderation in the Backchannel',
  authors: 'Joseph Seering, Manas Khadka, Nava Haghighi, Tanya Yang, Zachary Xi, Michael Bernstein',
  venue: 'CSCW 2024 (PACM HCI)',
  affiliation: 'KAIST · Stanford',
  link: 'https://doi.org/10.1145/3686941',
  fullText: 'dspace.mit.edu (공개본)',
  /** 쉬운 말로. 열두 살이 읽어도 통하는 문장만 쓴다. */
  plain: {
    problem: {
      ko: '온라인 모임을 지키는 사람들이 쓸 수 있는 도구는 대개 둘뿐입니다. 글을 지우거나, 모두가 보는 데서 혼내거나. 그런데 살짝 어긋난 글에는 둘 다 너무 큽니다. 지우면 그 사람은 영문을 모르고, 공개로 혼내면 창피해서 대들게 됩니다.',
      en: 'People who keep online communities safe mostly have two tools: delete the post, or scold in front of everyone. For a slightly-off post, both are too big. Delete it and the person never learns why; scold publicly and embarrassment turns into pushback.',
      ja: 'オンラインの集まりを守る人が使える道具は大抵二つだけです。投稿を消すか、みんなの前で叱るか。でも少しずれただけの投稿にはどちらも大きすぎます。消せば本人は訳が分からず、公開で叱れば恥ずかしさが反発に変わります。',
    },
    work: {
      ko: '연구진은 그 사이의 도구를 만들었습니다. 조용히, 익명으로, 그 사람에게만 쪽지를 보내는 봇입니다. 디스코드 서버 열한 곳에 붙여 넉 달 넘게 지켜봤고, 어디서 얼마나 쓰였고 무슨 일이 생겼는지 세었습니다.',
      en: 'The authors built the in-between tool: a bot that sends a quiet, anonymous note to just that person. They installed it on eleven Discord servers, watched for months, and counted where it was used and what happened.',
      ja: '研究チームはその中間の道具を作りました。静かに、匿名で、その人にだけメモを送るボットです。11のDiscordサーバーに入れて数か月見守り、どこでどれだけ使われ何が起きたかを数えました。',
    },
    took: {
      ko: '이 페이지는 그 셈을 그대로 가져왔습니다. 등록된 사례 86건 가운데 48건은 조용히 멎었고 30건은 사과나 자진 삭제로 이어졌으며 나빠진 것은 8건뿐입니다. 열한 서버 중 여섯은 연구가 끝난 뒤에도 제 발로 계속 썼습니다.',
      en: 'This page carries those counts as they are. Of 86 logged cases, 48 quietly stopped, 30 led to apologies or self-deletion, and only 8 went badly. Six of the eleven servers kept using the bot after the study ended, on their own.',
      ja: 'このページはその数をそのまま持ってきました。記録された86件のうち48件は静かに収まり、30件は謝罪や自主削除につながり、悪くなったのは8件だけ。11サーバー中6つは研究終了後も自ら使い続けました。',
    },
    left: {
      ko: '실제 서버의 댓글 사례(표 3)는 남의 대화라 싣지 않았습니다. 겪는 판의 말썽 메시지는 지어낸 글입니다. 그리고 본문에 86이어야 할 자리가 84로 적힌 곳이 하나 있는데, 고치지 않고 그 어긋남을 그대로 적어 두었습니다.',
      en: 'The real comment examples from the servers (Table 3) are other people’s conversations and are not shown. The troublesome message in the demo is invented. And one spot in the text says 84 where 86 belongs — left as is, with the discrepancy noted.',
      ja: '実際のサーバーのコメント例(表3)は他人の会話なので載せていません。体験盤のいたずらメッセージは作り話です。そして本文に86であるべき箇所が84と書かれた所が一つあり、直さずその食い違いをそのまま記しました。',
    },
  },
} as const;

/** 겪는 판에 놓는 말썽 메시지. 지어낸 글이다. */
export const DEMO_MESSAGE = { author: '민들레', channel: '#일상-잡담' } as const;
