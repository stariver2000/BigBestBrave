/** 숨은 손짓 문구 사전 (ko / en / ja). */

import type { Dictionary } from '../../core/i18n';

export type HiddenKey =
  | 'title' | 'summary' | 'capability' | 'paper-label' | 'full-text'
  | 'hunt-title' | 'hunt-note' | 'hunt-progress' | 'hunt-reset' | 'hunt-mine'
  | 'mail-1-from' | 'mail-1-line' | 'mail-2-from' | 'mail-2-line' | 'mail-3-from' | 'mail-3-line'
  | 'photo-caption'
  | 'found-swipeRow' | 'found-longPressRow' | 'found-doubleTapPhoto'
  | 'hint-title' | 'hint-body'
  | 'archived' | 'selected' | 'zoomed'
  | 'share-title' | 'share-note'
  | 'g-tap' | 'g-doubleTap' | 'g-longPress' | 'g-swipe' | 'g-scroll' | 'g-pinch'
  | 'gd-tap' | 'gd-doubleTap' | 'gd-longPress' | 'gd-swipe' | 'gd-scroll' | 'gd-pinch'
  | 'u-tap' | 'u-doubleTap' | 'u-longPress' | 'u-swipe' | 'u-scroll' | 'u-pinch'
  | 'of-total' | 'share-footnote'
  | 'funnel-title' | 'funnel-note' | 'funnel-line'
  | 'took-title' | 'took-yes' | 'took-no' | 'took-mine';

export const hiddenDictionary: Dictionary<HiddenKey> = {
  ko: {
    title: '숨은 손짓',
    summary:
      '옆으로 밀면 보관되고 길게 누르면 선택됩니다. 그런데 화면 어디에도 그 단서가 없습니다. 인기 앱 81개를 샅샅이 뒤져 표시 없이 숨은 기능 1,970개를 찾아낸 자료가 있습니다.',
    capability:
      '단서 없는 목록에서 숨은 손짓을 직접 찾아보고, 여섯 손짓 뒤에 기능이 얼마나 숨는지 1,970건의 분포로 본다',
    'paper-label': '바탕이 된 연구',
    'full-text': '전문',

    'hunt-title': '이 목록에 세 가지가 숨어 있습니다',
    'hunt-note':
      '아래는 여느 메일함처럼 생겼고, 단서는 하나도 없습니다. 논문 본문이 든 지메일의 예 그대로 - 옆으로 밀면, 길게 누르면, 그리고 사진을 두 번 두드리면 무슨 일이 일어납니다. 찾아보십시오.',
    'hunt-progress': '셋 가운데 {found}개를 찾으셨습니다',
    'hunt-reset': '되돌리기',
    'hunt-mine':
      '이 판은 시연입니다. 문턱값(길게 누름 0.5초, 밀기 48픽셀)은 논문이 아니라 이 페이지의 값이고, 여섯 손짓 가운데 셋만 시연합니다 - 스크롤·핀치·맨 탭은 데스크톱 브라우저에서 흉내가 어긋납니다.',

    'mail-1-from': '도서관',
    'mail-1-line': '예약하신 책이 도착했습니다',
    'mail-2-from': '전기요금',
    'mail-2-line': '8월분 청구서가 발행되었습니다',
    'mail-3-from': '지호',
    'mail-3-line': '주말에 시간 되면 사진 보러 올래?',
    'photo-caption': '지호가 보낸 사진',

    'found-swipeRow': '옆으로 밀기 - 보관',
    'found-longPressRow': '길게 누르기 - 선택 모드',
    'found-doubleTapPhoto': '두 번 두드리기 - 확대',

    'hint-title': '못 찾으시겠다면',
    'hint-body': '그것이 바로 이 논문이 하려는 말입니다. 단서가 없으면 아는 사람만 압니다.',

    archived: '보관됨',
    selected: '선택 모드',
    zoomed: '확대됨',

    'share-title': '여섯 손짓 뒤에 무엇이 숨는가',
    'share-note':
      '검증된 1,970건을 손짓별로 센 것입니다. 뜻밖에도 맨 탭 뒤에 가장 많이 숨습니다 - 단추처럼 생기지 않은 곳을 눌러야 나오는 기능들입니다. 쓰임새 문구는 저자들이 뽑은 것을 옮겼습니다.',
    'g-tap': '탭',
    'g-doubleTap': '두 번 탭',
    'g-longPress': '길게 누름',
    'g-swipe': '옆으로 밀기',
    'g-scroll': '위아래로 밀기',
    'g-pinch': '두 손가락 벌리기',
    'gd-tap': '한 점을 짧게 눌렀다 뗌',
    'gd-doubleTap': '짧은 사이를 두고 두 번 두드림',
    'gd-longPress': '한 점을 한동안 누르고 있음',
    'gd-swipe': '가로로(왼쪽이나 오른쪽으로) 끌어 옮김',
    'gd-scroll': '세로로(위나 아래로) 끌어 옮김',
    'gd-pinch': '두 손가락을 가운데 기준으로 벌리거나 오므림',
    'u-tap': '멀티미디어 보기 · 자세한 정보 열기 · 탐색 요소 여닫기',
    'u-doubleTap': '소셜 미디어 콘텐츠와 프로필 · 지도와 위치 서비스 · 상품 검색',
    'u-longPress': '숨은 메뉴 열기 · 항목 선택하고 관리하기 · 두 번째 동작 부르기',
    'u-swipe': '화면과 콘텐츠 사이 오가기 · 대화와 알림 정리 · 상품 갈래 훑기',
    'u-scroll': '새 추천 발견하기 · 늘어난 메뉴와 상태 드러내기 · 이어지는 피드 훑기',
    'u-pinch': '사진과 시각 콘텐츠 들여다보기',
    'of-total': '{count}건 · 1,970건 중 {percent}%',
    'share-footnote':
      '길게 누름의 백분율은 논문 표기가 19.3%인데 379/1970은 19.24%입니다. 여섯 손짓의 합이 1,970과 정확히 맞으므로 개수가 옳고 표기 쪽이 반올림 실수로 보입니다. 고치지 않고 그대로 둡니다.',

    'funnel-title': '숨은 것은 뒤져야 나온다',
    'funnel-note':
      '이 1,970건은 사람이 그냥 쓰다 발견한 것이 아닙니다. 기계가 앱을 샅샅이 눌러 보고 민 결과입니다.',
    'funnel-line':
      '앱 {apps}개를 자동으로 탐침해 {probed}건의 반응을 모았고, 사람이 하나하나 확인해 {validated}건({share}%)만 표시 없이 숨은 기능으로 남겼습니다. 넷 가운데 셋은 걸러졌습니다 - 숨은 기능은 체계적으로 뒤지지 않으면 사람에게도 기계에게도 보이지 않습니다.',

    'took-title': '논문에서 무엇을 가져왔는가',
    'took-yes':
      '가져온 것: 표 2의 여섯 손짓 정의, 표 3의 분포와 쓰임새, 3.4절의 깔때기, 그리고 본문이 든 지메일의 예.',
    'took-no':
      '가져오지 않은 것: 표 4의 VLM 성능입니다. 모형 학습의 결과라 이 사이트가 다루지 않습니다. 자료집의 스크린샷과 뷰 계층도 싣지 않았습니다 - 남의 앱 화면입니다.',
    'took-mine':
      '제가 더한 것: 겪는 판입니다. 목록의 글귀는 지어낸 것이고, 문턱값은 이 페이지의 값이며, 여섯 손짓 가운데 셋만 시연합니다.',
  },

  en: {
    title: 'Hidden Gestures',
    summary:
      'Slide sideways to archive; press and hold to select. Yet nothing on the screen says so. Here is a dataset that combed 81 popular apps and surfaced 1,970 features hiding with no visual cue at all.',
    capability:
      'Hunt for hidden gestures in a list that gives no clue, then see how much hides behind each of six gestures across 1,970 verified cases',
    'paper-label': 'The study behind this page',
    'full-text': 'Full text',

    'hunt-title': 'Three things are hiding in this list',
    'hunt-note':
      'Below looks like any inbox, and gives no clue. Exactly as in the Gmail example the paper opens with: slide sideways, press and hold, and double-tap the photo — something happens. Go find them.',
    'hunt-progress': 'Found {found} of three',
    'hunt-reset': 'Reset',
    'hunt-mine':
      'This board is a demonstration. The thresholds (0.5 s hold, 48 px slide) are this page’s values, not the paper’s, and only three of the six gestures are demonstrated — scroll, pinch and plain tap do not translate honestly to a desktop browser.',

    'mail-1-from': 'Library',
    'mail-1-line': 'The book you reserved has arrived',
    'mail-2-from': 'Electric bill',
    'mail-2-line': 'Your August statement is ready',
    'mail-3-from': 'Jiho',
    'mail-3-line': 'Free this weekend? Come see the photos',
    'photo-caption': 'Photo from Jiho',

    'found-swipeRow': 'Slide sideways - archive',
    'found-longPressRow': 'Press and hold - selection mode',
    'found-doubleTapPhoto': 'Double-tap - zoom',

    'hint-title': 'Cannot find them?',
    'hint-body': 'That is precisely the paper’s point. Without a cue, only those who already know, know.',

    archived: 'Archived',
    selected: 'Selection mode',
    zoomed: 'Zoomed',

    'share-title': 'What hides behind six gestures',
    'share-note':
      'The 1,970 verified cases counted by gesture. Unexpectedly, most hide behind a plain tap — features that appear only when you press something that does not look like a button. The usage phrases are the authors’ own, translated.',
    'g-tap': 'Tap',
    'g-doubleTap': 'Double tap',
    'g-longPress': 'Long press',
    'g-swipe': 'Swipe',
    'g-scroll': 'Scroll',
    'g-pinch': 'Pinch',
    'gd-tap': 'A single touch-and-release at a point',
    'gd-doubleTap': 'Two taps with a brief pause between',
    'gd-longPress': 'A touch held at one point for a while',
    'gd-swipe': 'A horizontal drag, left or right',
    'gd-scroll': 'A vertical drag, up or down',
    'gd-pinch': 'Two fingers moving apart or together about a center',
    'u-tap': 'Viewing multimedia · opening details · toggling navigation',
    'u-doubleTap': 'Social content and profiles · maps and location · product search',
    'u-longPress': 'Opening hidden menus · selecting and managing items · secondary actions',
    'u-swipe': 'Moving across content and screens · managing conversations and notifications · browsing categories',
    'u-scroll': 'Discovering recommendations · revealing extended menus and states · browsing feeds',
    'u-pinch': 'Inspecting photos and other visual content',
    'of-total': '{count} · {percent}% of 1,970',
    'share-footnote':
      'For long press the paper prints 19.3%, but 379/1970 is 19.24%. Since the six counts sum to exactly 1,970, the counts are right and the printed percentage looks like a rounding slip. It is left as it is.',

    'funnel-title': 'The hidden only turns up when you comb for it',
    'funnel-note':
      'These 1,970 cases were not stumbled upon in everyday use. A machine pressed and slid its way through the apps.',
    'funnel-line':
      '{apps} apps were probed automatically, yielding {probed} reactions; human validation kept {validated} ({share}%) as genuinely cue-less hidden features. Three in four were filtered out — hidden features stay invisible, to people and machines alike, unless combed for systematically.',

    'took-title': 'What was taken from the paper',
    'took-yes':
      'Taken: the six gesture definitions of Table 2, the distribution and usage patterns of Table 3, the funnel of Section 3.4, and the Gmail example the text opens with.',
    'took-no':
      'Not taken: the VLM performance of Table 4 — model training is outside this site. The dataset’s screenshots and view hierarchies are not shown either; they are other people’s app screens.',
    'took-mine':
      'Added by me: the hunt board. Its texts are invented, its thresholds are this page’s values, and only three of the six gestures are demonstrated.',
  },

  ja: {
    title: '隠れた手つき',
    summary:
      '横に滑らせると保管され、長く押すと選択できます。なのに画面のどこにもその手掛かりがありません。人気アプリ81個をくまなく探り、印なく隠れた機能1,970個を掘り出した資料があります。',
    capability:
      '手掛かりのない一覧から隠れた手つきを自分で探し、六つの手つきの後ろに機能がどれだけ隠れるかを検証済み1,970件の分布で見る',
    'paper-label': 'もとになった研究',
    'full-text': '全文',

    'hunt-title': 'この一覧に三つ隠れています',
    'hunt-note':
      '下はどこにでもある受信箱のようで、手掛かりはひとつもありません。論文が冒頭に挙げたGmailの例のとおり、横に滑らせると、長く押すと、そして写真を二度叩くと、何かが起きます。探してみてください。',
    'hunt-progress': '三つのうち{found}個を見つけました',
    'hunt-reset': '元に戻す',
    'hunt-mine':
      'この盤は実演です。しきい値(長押し0.5秒、スライド48ピクセル)は論文ではなくこのページの値で、六つの手つきのうち三つだけを実演します。スクロール・ピンチ・ただのタップはデスクトップのブラウザでは正直に再現できません。',

    'mail-1-from': '図書館',
    'mail-1-line': 'ご予約の本が届きました',
    'mail-2-from': '電気料金',
    'mail-2-line': '8月分の請求書が発行されました',
    'mail-3-from': 'ジホ',
    'mail-3-line': '週末、時間あったら写真見に来ない?',
    'photo-caption': 'ジホからの写真',

    'found-swipeRow': '横に滑らせる - 保管',
    'found-longPressRow': '長く押す - 選択モード',
    'found-doubleTapPhoto': '二度叩く - 拡大',

    'hint-title': '見つからないなら',
    'hint-body': 'それこそがこの論文の言いたいことです。手掛かりがなければ、知っている人だけが知っています。',

    archived: '保管済み',
    selected: '選択モード',
    zoomed: '拡大',

    'share-title': '六つの手つきの後ろに何が隠れるか',
    'share-note':
      '検証済み1,970件を手つきごとに数えたものです。意外にも、ただのタップの後ろに最も多く隠れています。ボタンに見えない場所を押して初めて現れる機能たちです。使い道の文句は著者らが抽出したものを訳しました。',
    'g-tap': 'タップ',
    'g-doubleTap': 'ダブルタップ',
    'g-longPress': '長押し',
    'g-swipe': 'スワイプ',
    'g-scroll': 'スクロール',
    'g-pinch': 'ピンチ',
    'gd-tap': '一点を短く押して離す',
    'gd-doubleTap': '短い間を置いて二度叩く',
    'gd-longPress': '一点をしばらく押し続ける',
    'gd-swipe': '横に(左か右へ)引いて動かす',
    'gd-scroll': '縦に(上か下へ)引いて動かす',
    'gd-pinch': '二本の指を中心から開くか閉じる',
    'u-tap': 'メディアを見る · 詳しい情報を開く · ナビ要素の開閉',
    'u-doubleTap': 'SNSの内容とプロフィール · 地図と位置サービス · 商品検索',
    'u-longPress': '隠れたメニューを開く · 項目の選択と管理 · 二次動作の呼び出し',
    'u-swipe': '画面や内容の行き来 · 会話と通知の整理 · 商品カテゴリの見渡し',
    'u-scroll': '新しいおすすめの発見 · 伸びたメニューや状態の表示 · 続くフィードの閲覧',
    'u-pinch': '写真などの視覚内容の観察',
    'of-total': '{count}件 · 1,970件中{percent}%',
    'share-footnote':
      '長押しの百分率は論文の表記が19.3%ですが、379/1970は19.24%です。六つの件数の合計が1,970とぴったり合うので件数が正しく、表記の方が丸めの誤りに見えます。直さずそのままにしています。',

    'funnel-title': '隠れたものは探らないと出てこない',
    'funnel-note':
      'この1,970件は普段使いで偶然見つかったものではありません。機械がアプリをくまなく押して滑らせた結果です。',
    'funnel-line':
      'アプリ{apps}個を自動で探って{probed}件の反応を集め、人がひとつずつ確かめて{validated}件({share}%)だけを印なく隠れた機能として残しました。四つのうち三つは除かれました。隠れた機能は、体系的に探らない限り、人にも機械にも見えないのです。',

    'took-title': '論文から何を取ったか',
    'took-yes':
      '取ったもの:表2の六つの手つきの定義、表3の分布と使い道、3.4節の漏斗、そして本文が挙げたGmailの例。',
    'took-no':
      '取らなかったもの:表4のVLM性能です。モデル学習の結果で、この場所は扱いません。資料集のスクリーンショットとビュー階層も載せていません。他人のアプリ画面だからです。',
    'took-mine':
      '私が足したもの:探しの盤です。一覧の文は作りもので、しきい値はこのページの値、六つのうち三つだけを実演します。',
  },
};
