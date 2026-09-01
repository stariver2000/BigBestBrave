/**
 * 숨은 손짓 페이지 설정.
 *
 * 근거가 된 연구: GhostUI: Unveiling Hidden Interactions in Mobile UI
 * (Minkyu Kweon, Seokhyeon Park, Soohyun Lee, You Been Lee, Jeongmin Rhee, Jinwook Seo, SNU),
 * CHI 2026, doi:10.1145/3772318.3790283. 전문은 연구실이 올려 둔 PDF로 읽었다.
 *
 * 이 페이지가 가져온 것
 *   - 표 2의 여섯 손짓 정의와 표 3의 분포(1,970건)·쓰임새.
 *   - 3.4절의 깔때기: 자동 탐침 8,312건 -> 검증된 숨은 상호작용 1,970건, 앱 81개.
 *   - 본문이 든 지메일 예: 가로로 밀면 보관되고 길게 누르면 선택 모드가 열리는데,
 *     화면 어디에도 그 단서가 없다.
 *
 * 가져오지 않은 것
 *   - 표 4의 VLM 성능. 모델 학습의 결과라 이 사이트가 다루지 않는 부분이다.
 *   - 자료집 자체(스크린샷, 뷰 계층). 남의 앱 화면을 여기 싣지 않는다.
 *
 * 이 페이지가 스스로 더한 것
 *   - 겪는 판. 단서 없는 목록에서 숨은 손짓 셋을 직접 찾아보게 했다. 시연의 문턱
 *     (0.5초, 48픽셀)은 논문이 아니라 이 페이지의 값이고, 여섯 손짓 가운데 셋만
 *     시연한다 - 스크롤과 핀치와 맨 탭은 데스크톱 브라우저에서 흉내가 어긋난다.
 */

export const PAPER = {
  title: 'GhostUI: Unveiling Hidden Interactions in Mobile UI',
  authors: 'Minkyu Kweon, Seokhyeon Park, Soohyun Lee, You Been Lee, Jeongmin Rhee, Jinwook Seo',
  venue: 'CHI 2026',
  affiliation: 'SNU',
  link: 'https://doi.org/10.1145/3772318.3790283',
  fullText: 'hcil.snu.ac.kr/cms/uploads/Ghost_UI_3589ee1cb2.pdf',
  /** 쉬운 말로. 열두 살이 읽어도 통하는 문장만 쓴다. */
  plain: {
    problem: {
      ko: '휴대폰 앱에는 화면에 아무 표시도 없는 기능이 많습니다. 메일을 옆으로 밀면 보관되고, 길게 누르면 여러 개를 고를 수 있습니다. 그런데 그걸 어떻게 알까요? 아는 사람만 압니다. 사람도 못 찾고, 휴대폰을 대신 조작해 주는 인공지능은 더 못 찾습니다.',
      en: 'Phone apps are full of features with no mark on the screen. Slide an email sideways and it gets archived; press and hold to select several. But how would you know? Only those who already know, know. People miss them, and the AI agents that operate phones for us miss them even more.',
      ja: 'スマホのアプリには画面に何の印もない機能がたくさんあります。メールを横に滑らせると保管され、長く押すと複数を選べます。でもそれをどうやって知るのでしょう?知っている人だけが知っています。人も見つけられず、スマホを代わりに操作するAIはもっと見つけられません。',
    },
    work: {
      ko: '연구진은 인기 앱 81개를 기계로 샅샅이 눌러 보고 밀어 보면서 8,312개의 반응을 모았고, 사람이 하나하나 확인해서 정말로 표시 없이 숨어 있는 기능 1,970개를 추렸습니다. 그리고 어떤 손짓 뒤에 무엇이 숨는지를 여섯 갈래로 정리했습니다.',
      en: 'The authors had a machine tap, press and slide its way through 81 popular apps, collecting 8,312 reactions, then checked each by hand to keep 1,970 that are truly hidden — no visual cue at all. They sorted what hides behind which gesture into six kinds.',
      ja: '研究チームは人気アプリ81個を機械でくまなく押したり滑らせたりして8,312個の反応を集め、人がひとつずつ確かめて、本当に印なく隠れている機能1,970個を選び出しました。そしてどの手つきの後ろに何が隠れるかを六つに整理しました。',
    },
    took: {
      ko: '이 페이지는 그 여섯 손짓의 정의와 분포를 그대로 가져왔습니다. 탭 뒤에 가장 많이 숨고(596개), 옆으로 밀기(513개)와 길게 누르기(379개)가 뒤를 잇습니다. 그리고 단서 없는 목록에서 숨은 손짓을 직접 찾아보는 판을 만들었습니다.',
      en: 'This page carries those six gesture definitions and their distribution as they are. Most hide behind a plain tap (596), then sideways swipes (513) and long presses (379). And there is a board where you hunt for hidden gestures in a list that gives no clue.',
      ja: 'このページはその六つの手つきの定義と分布をそのまま持ってきました。ただのタップの後ろに最も多く隠れ(596個)、横に滑らせる(513個)、長押し(379個)が続きます。そして手掛かりのない一覧から隠れた手つきを自分で探す盤を作りました。',
    },
    left: {
      ko: '인공지능(VLM)을 학습시킨 결과 표는 가져오지 않았습니다. 모형 학습은 이 사이트가 다루지 않는 부분입니다. 남의 앱 화면(자료집의 스크린샷)도 싣지 않았고, 찾기 판의 문턱값은 논문이 아니라 이 페이지가 정한 값입니다.',
      en: 'The table of AI (VLM) training results was not carried — model training is outside what this site does. Screenshots of other people’s apps are not shown either, and the thresholds in the hunt board are this page’s values, not the paper’s.',
      ja: 'AI(VLM)を学習させた結果の表は持ってきていません。モデルの学習はこの場所が扱わない部分です。他人のアプリ画面(資料集のスクリーンショット)も載せず、探しの盤のしきい値は論文ではなくこのページが決めた値です。',
    },
  },
} as const;

/** 겪는 판의 숨은 손짓 셋. 앞의 둘은 논문 본문이 든 지메일 예 그대로다. */
export const DEMO_TARGETS = ['swipeRow', 'longPressRow', 'doubleTapPhoto'] as const;
export type DemoTarget = (typeof DEMO_TARGETS)[number];
