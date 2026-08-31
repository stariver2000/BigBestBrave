/** 개인정보 지우개 문구 사전 (ko / en / ja). 탐지기 라벨도 여기서 온다. */

import type { Dictionary } from '../../core/i18n';

export type RedactorKey =
  | 'title'
  | 'summary'
  | 'capability'
  | 'input-title'
  | 'input-note'
  | 'input-placeholder'
  | 'input-sample'
  | 'input-clear'
  | 'input-length'
  | 'output-title'
  | 'output-note'
  | 'output-copy'
  | 'output-copied'
  | 'output-download'
  | 'output-empty'
  | 'style-title'
  | 'style-full'
  | 'style-partial'
  | 'style-label'
  | 'style-pseudonym'
  | 'style-note-full'
  | 'style-note-partial'
  | 'style-note-label'
  | 'style-note-pseudonym'
  | 'detectors-title'
  | 'detectors-note'
  | 'found-none'
  | 'found-total'
  | 'privacy-title'
  | 'privacy-body'
  | 'detector-email'
  | 'detector-phone-kr'
  | 'detector-phone-intl'
  | 'detector-rrn'
  | 'detector-brn'
  | 'detector-card'
  | 'detector-account'
  | 'detector-passport-kr'
  | 'detector-ip'
  | 'detector-secret'
  | 'detector-coordinate';

export const redactorDictionary: Dictionary<RedactorKey> = {
  ko: {
    title: '개인정보 지우개',
    summary: '문서를 남에게 보내기 전에, 붙여넣기만 하면 개인정보를 찾아 가려 줍니다.',
    capability: '주민등록번호·카드번호까지 검증 자리로 확인해 가리고, 원문은 브라우저 밖으로 내보내지 않는다',
    'input-title': '원문',
    'input-note': '여기에 붙여넣으세요. 입력한 글은 어디에도 전송되지 않습니다.',
    'input-placeholder': '가릴 내용을 붙여넣으세요',
    'input-sample': '예시 넣기',
    'input-clear': '비우기',
    'input-length': '글자',
    'output-title': '가린 결과',
    'output-note': '그대로 복사해서 쓰면 됩니다.',
    'output-copy': '복사',
    'output-copied': '복사됨',
    'output-download': '파일로 저장',
    'output-empty': '원문을 넣으면 여기에 결과가 나옵니다.',
    'style-title': '가리는 방식',
    'style-full': '전부',
    'style-partial': '일부만',
    'style-label': '유형',
    'style-pseudonym': '가명',
    'style-note-full': '가장 안전하지만 어떤 정보였는지 알 수 없습니다.',
    'style-note-partial': '앞뒤 일부를 남겨 본인 확인이 가능합니다.',
    'style-note-label': '[이메일]처럼 유형만 남깁니다.',
    'style-note-pseudonym': '같은 값에 같은 번호를 주어 문서의 관계가 보존됩니다.',
    'detectors-title': '찾을 항목',
    'detectors-note': '계좌번호는 은행마다 형식이 달라 오탐이 많아 기본으로 꺼 두었습니다.',
    'found-none': '찾은 개인정보가 없습니다.',
    'found-total': '건을 가렸습니다',
    'privacy-title': '이 글은 브라우저를 떠나지 않습니다',
    'privacy-body':
      '모든 탐지와 가림은 이 페이지 안에서 계산됩니다. 서버로 보내지 않고, 저장하지도 않습니다. 그래서 챗봇에 붙여넣을 수 없는 내용도 여기서는 다룰 수 있습니다.',
    'detector-email': '이메일',
    'detector-phone-kr': '전화번호',
    'detector-phone-intl': '국제전화',
    'detector-rrn': '주민등록번호',
    'detector-brn': '사업자등록번호',
    'detector-card': '카드번호',
    'detector-account': '계좌번호',
    'detector-passport-kr': '여권번호',
    'detector-ip': 'IP 주소',
    'detector-secret': 'API 키',
    'detector-coordinate': '위치 좌표',
  },
  en: {
    title: 'Redactor',
    summary: 'Paste a document and it finds and masks personal data before you send it to anyone.',
    capability:
      'Masks national ID and card numbers verified by their check digits, and never sends the text out of the browser',
    'input-title': 'Source',
    'input-note': 'Paste here. Nothing you type is transmitted anywhere.',
    'input-placeholder': 'Paste the text you need to clean',
    'input-sample': 'Load sample',
    'input-clear': 'Clear',
    'input-length': 'characters',
    'output-title': 'Redacted',
    'output-note': 'Copy it and use it as is.',
    'output-copy': 'Copy',
    'output-copied': 'Copied',
    'output-download': 'Save as file',
    'output-empty': 'Paste something and the result appears here.',
    'style-title': 'Masking style',
    'style-full': 'Full',
    'style-partial': 'Partial',
    'style-label': 'Label',
    'style-pseudonym': 'Alias',
    'style-note-full': 'Safest, but you lose what the value was.',
    'style-note-partial': 'Keeps a few characters so the owner can still recognise it.',
    'style-note-label': 'Leaves only the type, like [email].',
    'style-note-pseudonym': 'Same value gets the same number, so relationships survive.',
    'detectors-title': 'What to find',
    'detectors-note': 'Bank account numbers vary by bank and produce false hits, so they start off.',
    'found-none': 'No personal data found.',
    'found-total': ' items masked',
    'privacy-title': 'This text never leaves your browser',
    'privacy-body':
      'Detection and masking run entirely on this page. Nothing is uploaded and nothing is stored. That is why you can put things here that you must not paste into a chatbot.',
    'detector-email': 'Email',
    'detector-phone-kr': 'Phone',
    'detector-phone-intl': 'Intl. phone',
    'detector-rrn': 'National ID',
    'detector-brn': 'Business no.',
    'detector-card': 'Card number',
    'detector-account': 'Bank account',
    'detector-passport-kr': 'Passport',
    'detector-ip': 'IP address',
    'detector-secret': 'API key',
    'detector-coordinate': 'Coordinates',
  },
  ja: {
    title: '個人情報けし',
    summary: '書類を誰かに送る前に、貼り付けるだけで個人情報を見つけて隠します。',
    capability: 'マイナンバー相当の番号やカード番号を検査桁で確認して隠し、原文をブラウザの外に出さない',
    'input-title': '原文',
    'input-note': 'ここに貼り付けてください。入力した内容はどこにも送信されません。',
    'input-placeholder': '隠したい内容を貼り付けてください',
    'input-sample': '例を入れる',
    'input-clear': 'クリア',
    'input-length': '文字',
    'output-title': '隠した結果',
    'output-note': 'そのままコピーして使えます。',
    'output-copy': 'コピー',
    'output-copied': 'コピーしました',
    'output-download': 'ファイルに保存',
    'output-empty': '原文を入れると、ここに結果が出ます。',
    'style-title': '隠し方',
    'style-full': '全部',
    'style-partial': '一部だけ',
    'style-label': '種類',
    'style-pseudonym': '仮名',
    'style-note-full': '最も安全ですが、何の情報だったか分かりません。',
    'style-note-partial': '前後を少し残し、本人が確認できます。',
    'style-note-label': '［メール］のように種類だけ残します。',
    'style-note-pseudonym': '同じ値に同じ番号を付け、文書内の関係が保たれます。',
    'detectors-title': '検出する項目',
    'detectors-note': '口座番号は銀行ごとに形式が異なり誤検出が多いため、既定でオフです。',
    'found-none': '個人情報は見つかりませんでした。',
    'found-total': '件を隠しました',
    'privacy-title': 'この文章はブラウザの外に出ません',
    'privacy-body':
      '検出も加工もこのページの中だけで行われます。送信も保存もしません。だからチャットボットに貼れない内容も、ここでは扱えます。',
    'detector-email': 'メール',
    'detector-phone-kr': '電話番号',
    'detector-phone-intl': '国際電話',
    'detector-rrn': '住民番号',
    'detector-brn': '事業者番号',
    'detector-card': 'カード番号',
    'detector-account': '口座番号',
    'detector-passport-kr': 'パスポート',
    'detector-ip': 'IPアドレス',
    'detector-secret': 'APIキー',
    'detector-coordinate': '位置座標',
  },
};
