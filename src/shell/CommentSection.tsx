'use client';

/**
 * 페이지 하단 의견란.
 *
 * 여기 쌓인 요구·불만이 다음 업데이트의 입력이 되므로, 어느 페이지에 달렸는지(path)를
 * 함께 저장한다. 답글은 화면에서만 접히는 것이 아니라 자료에도 부모 관계로 남는다.
 */

import { useCallback, useEffect, useMemo, useState } from 'react';
import { ANONYMOUS_AUTHOR } from '../comments/model';
import { createTranslator, type Locale } from '../core/i18n';
import { shellDictionary, type ShellKey } from './dictionary';
import styles from './shell.module.css';

/** API가 돌려주는 트리 형태. 서버의 CommentNode와 같은 모양이다. */
interface CommentNode {
  id: string;
  author: string;
  body: string;
  createdAt: string;
  depth: number;
  replies: CommentNode[];
}

interface Limits {
  maxBodyLength: number;
  maxAuthorLength: number;
  maxDepth: number;
}

/** 서버 오류 코드 -> 사전 키. 사용자에게는 항상 자기 언어의 문구가 보여야 한다. */
const ERROR_KEYS: Record<string, ShellKey> = {
  'empty-body': 'comments-error-empty-body',
  'body-too-long': 'comments-error-too-long',
  'author-too-long': 'comments-error-too-long',
  'too-deep': 'comments-error-too-deep',
  'too-fast': 'comments-error-too-fast',
  'storage-error': 'comments-error-storage',
};

const DEFAULT_LIMITS: Limits = { maxBodyLength: 2000, maxAuthorLength: 24, maxDepth: 3 };

/** 초 단위 차이를 사람이 읽는 상대 시간으로 바꾼다. */
function useRelativeTime(locale: Locale) {
  return useMemo(() => {
    const formatter = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });
    const units: [Intl.RelativeTimeFormatUnit, number][] = [
      ['year', 31536000],
      ['month', 2592000],
      ['day', 86400],
      ['hour', 3600],
      ['minute', 60],
    ];
    return (iso: string): string => {
      const seconds = (Date.parse(iso) - Date.now()) / 1000;
      for (const [unit, size] of units) {
        if (Math.abs(seconds) >= size) return formatter.format(Math.round(seconds / size), unit);
      }
      return formatter.format(Math.round(seconds), 'second');
    };
  }, [locale]);
}

function CommentForm({
  locale,
  limits,
  parentId,
  pending,
  onSubmit,
  onCancel,
}: {
  locale: Locale;
  limits: Limits;
  parentId: string | null;
  pending: boolean;
  onSubmit: (author: string, body: string, parentId: string | null) => void;
  onCancel?: () => void;
}) {
  const t = createTranslator(shellDictionary, locale);
  const [author, setAuthor] = useState('');
  const [body, setBody] = useState('');

  const submit = () => {
    onSubmit(author, body, parentId);
    setBody('');
  };

  return (
    <div className={styles.commentForm}>
      <input
        className={styles.commentAuthorInput}
        value={author}
        maxLength={limits.maxAuthorLength}
        placeholder={t('comments-author-placeholder')}
        onChange={(event) => setAuthor(event.target.value)}
        aria-label={t('comments-author')}
      />
      <textarea
        className={styles.commentBodyInput}
        value={body}
        maxLength={limits.maxBodyLength}
        rows={parentId === null ? 3 : 2}
        placeholder={t('comments-body-placeholder')}
        onChange={(event) => setBody(event.target.value)}
      />
      <div className={styles.commentFormActions}>
        {onCancel && (
          <button type="button" className={styles.commentGhost} onClick={onCancel}>
            {t('comments-cancel')}
          </button>
        )}
        <button
          type="button"
          className={styles.commentSubmit}
          onClick={submit}
          disabled={pending || body.trim().length === 0}
        >
          {pending ? t('comments-sending') : t('comments-submit')}
        </button>
      </div>
    </div>
  );
}

function CommentThread({
  nodes,
  locale,
  limits,
  replyTo,
  pending,
  onReplyTo,
  onSubmit,
  formatTime,
}: {
  nodes: CommentNode[];
  locale: Locale;
  limits: Limits;
  replyTo: string | null;
  pending: boolean;
  onReplyTo: (id: string | null) => void;
  onSubmit: (author: string, body: string, parentId: string | null) => void;
  formatTime: (iso: string) => string;
}) {
  const t = createTranslator(shellDictionary, locale);

  return (
    <ul className={styles.commentList}>
      {nodes.map((node) => (
        <li key={node.id} className={styles.commentItem}>
          <div className={styles.commentHead}>
            <span className={styles.commentAuthor}>
              {node.author === ANONYMOUS_AUTHOR ? t('comments-anonymous') : node.author}
            </span>
            <span className={styles.commentTime}>{formatTime(node.createdAt)}</span>
          </div>
          <p className={styles.commentBody}>{node.body}</p>
          {/* 한도에 닿은 깊이에서는 답글 버튼 자체를 숨긴다. 눌러도 실패할 버튼은 두지 않는다. */}
          {node.depth + 1 <= limits.maxDepth && (
            <button
              type="button"
              className={styles.commentGhost}
              onClick={() => onReplyTo(replyTo === node.id ? null : node.id)}
            >
              {t('comments-reply')}
            </button>
          )}
          {replyTo === node.id && (
            <CommentForm
              locale={locale}
              limits={limits}
              parentId={node.id}
              pending={pending}
              onSubmit={onSubmit}
              onCancel={() => onReplyTo(null)}
            />
          )}
          {node.replies.length > 0 && (
            <div className={styles.commentReplies}>
              <CommentThread
                nodes={node.replies}
                locale={locale}
                limits={limits}
                replyTo={replyTo}
                pending={pending}
                onReplyTo={onReplyTo}
                onSubmit={onSubmit}
                formatTime={formatTime}
              />
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}

export function CommentSection({ path, locale }: { path: string; locale: Locale }) {
  const t = createTranslator(shellDictionary, locale);
  const formatTime = useRelativeTime(locale);

  const [nodes, setNodes] = useState<CommentNode[] | null>(null);
  const [limits, setLimits] = useState<Limits>(DEFAULT_LIMITS);
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [errorKey, setErrorKey] = useState<ShellKey | null>(null);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        const response = await fetch(`/api/comments?path=${encodeURIComponent(path)}`);
        const payload = (await response.json()) as { comments?: CommentNode[]; limits?: Limits };
        if (cancelled) return;
        setNodes(payload.comments ?? []);
        if (payload.limits) setLimits(payload.limits);
      } catch {
        if (!cancelled) setNodes([]);
      }
    };
    void load();
    // 페이지를 옮기는 동안 도착한 응답이 새 페이지의 목록을 덮어쓰지 않게 한다.
    return () => {
      cancelled = true;
    };
  }, [path]);

  const submit = useCallback(
    async (author: string, body: string, parentId: string | null) => {
      setPending(true);
      setErrorKey(null);
      try {
        const response = await fetch('/api/comments', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ path, parentId, author, body }),
        });
        const payload = (await response.json()) as { comments?: CommentNode[]; error?: string };
        if (response.ok && payload.comments) {
          setNodes(payload.comments);
          setReplyTo(null);
        } else {
          setErrorKey(ERROR_KEYS[payload.error ?? ''] ?? 'comments-error-storage');
        }
      } catch {
        setErrorKey('comments-error-network');
      } finally {
        setPending(false);
      }
    },
    [path],
  );

  const total = useMemo(() => {
    const count = (list: CommentNode[]): number =>
      list.reduce((sum, node) => sum + 1 + count(node.replies), 0);
    return nodes ? count(nodes) : 0;
  }, [nodes]);

  return (
    <section className={styles.comments}>
      <header className={styles.commentsHead}>
        <h2 className={styles.commentsTitle}>{t('comments-title')}</h2>
        {nodes !== null && total > 0 && (
          <span className={styles.commentsCount}>
            {total}
            {t('comments-count')}
          </span>
        )}
      </header>
      <p className={styles.commentsNote}>{t('comments-note')}</p>

      <CommentForm
        locale={locale}
        limits={limits}
        parentId={null}
        pending={pending}
        onSubmit={submit}
      />
      {errorKey && <p className={styles.commentError}>{t(errorKey)}</p>}

      {nodes === null ? (
        <p className={styles.commentsEmpty}>{t('comments-loading')}</p>
      ) : nodes.length === 0 ? (
        <p className={styles.commentsEmpty}>{t('comments-empty')}</p>
      ) : (
        <CommentThread
          nodes={nodes}
          locale={locale}
          limits={limits}
          replyTo={replyTo}
          pending={pending}
          onReplyTo={setReplyTo}
          onSubmit={submit}
          formatTime={formatTime}
        />
      )}
    </section>
  );
}
