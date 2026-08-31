/** 셸(공통 프레임) 문구 사전. 페이지별 문구는 각 모듈의 dictionary.ts에 둔다. */

import type { Dictionary } from '../core/i18n';

export type ShellKey =
  | 'site-name'
  | 'site-tagline'
  | 'nav-open-palette'
  | 'nav-palette-hint'
  | 'nav-search-placeholder'
  | 'nav-no-results'
  | 'nav-root'
  | 'comments-title'
  | 'comments-note'
  | 'comments-empty'
  | 'comments-count'
  | 'comments-author'
  | 'comments-author-placeholder'
  | 'comments-body-placeholder'
  | 'comments-submit'
  | 'comments-sending'
  | 'comments-reply'
  | 'comments-reply-to'
  | 'comments-cancel'
  | 'comments-anonymous'
  | 'comments-loading'
  | 'comments-error-empty-body'
  | 'comments-error-too-long'
  | 'comments-error-too-fast'
  | 'comments-error-too-deep'
  | 'comments-error-storage'
  | 'comments-error-network'
  | 'not-found-title'
  | 'not-found-body'
  | 'not-found-home';

export const shellDictionary: Dictionary<ShellKey> = {
  ko: {
    'site-name': 'BigBestBrave',
    'site-tagline': '하나의 도메인, 갈라지는 트리, 페이지마다 하나의 도구',
    'nav-open-palette': '이동',
    'nav-palette-hint': '⌘K',
    'nav-search-placeholder': '페이지 이름이나 주제를 입력하세요',
    'nav-no-results': '일치하는 페이지가 없습니다',
    'nav-root': '루트',
    'comments-title': '의견',
    'comments-note': '이 페이지에 바라는 점이나 불편한 점을 남겨 주세요. 다음 업데이트에 반영합니다.',
    'comments-empty': '아직 남겨진 의견이 없습니다. 첫 의견을 남겨 주세요.',
    'comments-count': '개의 의견',
    'comments-author': '이름',
    'comments-author-placeholder': '비워 두면 익명',
    'comments-body-placeholder': '무엇이 좋았고 무엇이 아쉬웠나요?',
    'comments-submit': '남기기',
    'comments-sending': '보내는 중…',
    'comments-reply': '답글',
    'comments-reply-to': '님에게 답글',
    'comments-cancel': '취소',
    'comments-anonymous': '익명',
    'comments-loading': '불러오는 중…',
    'comments-error-empty-body': '내용을 입력해 주세요.',
    'comments-error-too-long': '내용이 너무 깁니다.',
    'comments-error-too-fast': '잠시 후에 다시 남겨 주세요.',
    'comments-error-too-deep': '더 이상 답글을 달 수 없는 깊이입니다.',
    'comments-error-storage': '저장에 실패했습니다. 잠시 후 다시 시도해 주세요.',
    'comments-error-network': '연결에 실패했습니다.',
    'not-found-title': '이 경로에는 아직 페이지가 없습니다',
    'not-found-body': '트리는 필요할 때마다 자랍니다. 이 자리는 아직 비어 있습니다.',
    'not-found-home': '루트로 돌아가기',
  },
  en: {
    'site-name': 'BigBestBrave',
    'site-tagline': 'One domain, a branching tree, one tool per page',
    'nav-open-palette': 'Go to',
    'nav-palette-hint': '⌘K',
    'nav-search-placeholder': 'Type a page name or topic',
    'nav-no-results': 'No matching pages',
    'nav-root': 'Root',
    'comments-title': 'Feedback',
    'comments-note': 'Tell us what you want from this page. It feeds the next update.',
    'comments-empty': 'No feedback yet. Be the first.',
    'comments-count': ' comments',
    'comments-author': 'Name',
    'comments-author-placeholder': 'Leave blank to stay anonymous',
    'comments-body-placeholder': 'What worked, and what did not?',
    'comments-submit': 'Post',
    'comments-sending': 'Sending…',
    'comments-reply': 'Reply',
    'comments-reply-to': 'Replying to',
    'comments-cancel': 'Cancel',
    'comments-anonymous': 'anonymous',
    'comments-loading': 'Loading…',
    'comments-error-empty-body': 'Write something first.',
    'comments-error-too-long': 'That is too long.',
    'comments-error-too-fast': 'Please wait a moment before posting again.',
    'comments-error-too-deep': 'Replies cannot nest any deeper.',
    'comments-error-storage': 'Saving failed. Try again shortly.',
    'comments-error-network': 'Connection failed.',
    'not-found-title': 'No page lives at this path yet',
    'not-found-body': 'The tree grows on demand. This slot is still empty.',
    'not-found-home': 'Back to root',
  },
  ja: {
    'site-name': 'BigBestBrave',
    'site-tagline': '一つのドメイン、枝分かれする木、ページごとに一つの道具',
    'nav-open-palette': '移動',
    'nav-palette-hint': '⌘K',
    'nav-search-placeholder': 'ページ名かテーマを入力',
    'nav-no-results': '一致するページがありません',
    'nav-root': 'ルート',
    'comments-title': 'ご意見',
    'comments-note': 'このページへの要望や不満をお書きください。次の更新に反映します。',
    'comments-empty': 'まだご意見はありません。最初の一言をどうぞ。',
    'comments-count': '件のご意見',
    'comments-author': '名前',
    'comments-author-placeholder': '空欄なら匿名',
    'comments-body-placeholder': '良かった点、物足りなかった点は？',
    'comments-submit': '送信',
    'comments-sending': '送信中…',
    'comments-reply': '返信',
    'comments-reply-to': 'さんへ返信',
    'comments-cancel': 'キャンセル',
    'comments-anonymous': '匿名',
    'comments-loading': '読み込み中…',
    'comments-error-empty-body': '内容を入力してください。',
    'comments-error-too-long': '内容が長すぎます。',
    'comments-error-too-fast': '少し時間をおいて再度お書きください。',
    'comments-error-too-deep': 'これ以上の返信はできません。',
    'comments-error-storage': '保存に失敗しました。しばらくして再試行してください。',
    'comments-error-network': '接続に失敗しました。',
    'not-found-title': 'このパスにはまだページがありません',
    'not-found-body': '木は必要に応じて育ちます。ここはまだ空きです。',
    'not-found-home': 'ルートへ戻る',
  },
};
