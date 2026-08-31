/**
 * 페이지 공통 프레임(서버 컴포넌트).
 *
 * 구조: 상단 바 → 표제 → 본문 → 의견란 → 하단.
 * 색·간격 값은 특성 엔진과 룩이 공급하지만, 무엇을 어디에 놓을지는 여기서 정한다.
 * 같은 뼈대가 룩에 따라 전혀 다른 인상으로 나온다(serene: 부드러운 지면 / dossier: 서류철).
 */

import type { ReactNode } from 'react';
import Link from 'next/link';
import { createTranslator, type Locale } from '../core/i18n';
import { allNodes, pathOf, trailOf, type PageNode } from '../core/tree';
import { lookIdOf } from '../looks';
import { frameStyleSheet } from '../looks/resolve';
import { CommandPalette, type PaletteEntry } from './CommandPalette';
import { LocaleProvider } from './locale-context';
import { CommentSection } from './CommentSection';
import { LocaleSwitch } from './LocaleSwitch';
import { shellDictionary } from './dictionary';
import styles from './shell.module.css';

/** 커맨드 팔레트에 넘길 노드 목록. 클라이언트로 넘어가는 유일한 트리 정보다. */
function paletteEntries(locale: Locale): PaletteEntry[] {
  return allNodes().map((node) => ({
    path: pathOf(node),
    title: node.title[locale],
    summary: node.summary[locale],
    keywords: node.keywords ?? [],
  }));
}

export function PageFrame({
  node,
  locale,
  children,
}: {
  node: PageNode;
  locale: Locale;
  children: ReactNode;
}) {
  const t = createTranslator(shellDictionary, locale);
  const variables = frameStyleSheet(node);
  const trail = trailOf(node);
  const path = pathOf(node);

  return (
    <LocaleProvider locale={locale}>
      {/* 룩 변수는 문서 루트에 심는다. html·body의 배경까지 같은 값을 읽어야 하기 때문이다. */}
      <style>{variables}</style>
      <div className={styles.frame} data-look={lookIdOf(node.look)}>
        <header className={styles.header}>
          <div className={styles.brand}>
            <span className={styles.brandMark} aria-hidden />
            <span className={styles.brandName}>{t('site-name')}</span>
          </div>

          <nav className={styles.trail} aria-label={t('nav-root')}>
            {trail.map((step, index) => (
              <span key={step.id}>
                {index > 0 && <span className={styles.trailSeparator}> / </span>}
                {index === trail.length - 1 ? (
                  <span className={styles.trailCurrent}>{step.title[locale]}</span>
                ) : (
                  <Link className={styles.trailLink} href={pathOf(step)}>
                    {step.title[locale]}
                  </Link>
                )}
              </span>
            ))}
          </nav>

          <div className={styles.headerActions}>
            <CommandPalette entries={paletteEntries(locale)} locale={locale} />
            <LocaleSwitch />
          </div>
        </header>

        <section className={styles.hero}>
          <div className={styles.heroInner}>
            <h1 className={styles.pageTitle}>
              {node.title[locale]}
              <span className={styles.titleDot}>.</span>
            </h1>
            <p className={styles.pageSummary}>{node.summary[locale]}</p>
          </div>
        </section>

        <main className={styles.main}>
          {children}
          <CommentSection path={path} locale={locale} />
        </main>

        <footer className={styles.footer}>
          <div className={styles.footerInner}>
            <span className={styles.tagline}>{t('site-tagline')}</span>
          </div>
        </footer>
      </div>
    </LocaleProvider>
  );
}
