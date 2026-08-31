'use client';

/**
 * 삐삐 체험 화면.
 *
 * 두 방향으로 논다. 말을 숫자로 밀어 넣어 보내고(보내기), 숫자를 말로 되돌려 본다(해독하기).
 * 보내기는 변환기가 아니다. 누르면 숫자가 한 자리씩 상대의 액정에 찍히고,
 * 그 사람이 그것을 무엇으로 읽었는지가 돌아온다. 그 왕복에서 무엇이 사라지는지 보게 된다.
 */

import { useMemo, useState } from 'react';
import { Button, Panel, Segmented, type SegmentedOption } from '../../../kit';
import {
  CODEBOOK,
  MAX_DIGITS,
  codeOfDay,
  literalReading,
  onlyDigits,
  roundTrip,
  segmentations,
} from '../../../core/pager';
import { createTranslator, type Locale } from '../../../core/i18n';
import { PAPER, SUGGESTIONS, WELCOME_DIGITS } from '../config';
import { beeperDictionary } from '../dictionary';
import { Codebook } from './Codebook';
import { PagerDevice } from './PagerDevice';
import { Returned } from './Returned';
import { useSending } from './useSending';
import styles from './beeper.module.css';

type Mode = 'send' | 'read';

export function Beeper({ locale }: { locale: Locale }) {
  const t = createTranslator(beeperDictionary, locale);

  // 해독 모드로 시작한다. 첫 화면에서 액정에 숫자가 떠 있고 키패드가 보여야
  // 무엇을 하는 곳인지 설명 없이 전해진다.
  const [mode, setMode] = useState<Mode>('read');
  const [text, setText] = useState('');
  const [digits, setDigits] = useState(WELCOME_DIGITS);

  const echo = useMemo(() => roundTrip(text), [text]);
  const sending = useSending(echo.sent.digits);
  const ways = useMemo(() => (mode === 'read' ? segmentations(digits) : []), [mode, digits]);

  const today = CODEBOOK[codeOfDay(new Date())];
  const bestReading = ways[0]?.pieces.map((piece) => piece.reading).join(' · ') ?? '';

  // 액정에 뜰 숫자와 그 아래 한 줄은 모드마다 나오는 곳이 다르다.
  //   보내기: 눌러 담긴 숫자(보내는 중에는 한 자리씩) / 해독하기: 직접 눌러 넣은 숫자
  const screen =
    mode === 'send'
      ? { digits: sending.digits, meaning: sending.delivered ? echo.returned : text.trim() }
      : { digits, meaning: bestReading };

  const modeOptions: SegmentedOption<Mode>[] = [
    { value: 'send', label: t('mode-send') },
    { value: 'read', label: t('mode-read') },
  ];

  const lost = echo.sent.pieces.filter((piece) => piece.via === 'lost');

  return (
    <div className={styles.layout}>
      <div className={styles.column}>
        <p className={styles.paper}>
          <span className={styles.paperLabel}>{t('paper-label')}</span>
          <a href={PAPER.listing} target="_blank" rel="noreferrer">
            {PAPER.title}
          </a>
          <span>
            {PAPER.affiliation} · {PAPER.venue}
          </span>
        </p>

        <div className={styles.modes}>
          <Segmented options={modeOptions} value={mode} onChange={setMode} />
        </div>

        <PagerDevice
          digits={screen.digits}
          meaning={screen.meaning}
          maxDigits={MAX_DIGITS}
          // 보내기에서 이 기기는 내 수신함이 아니라 상대의 수신함이다.
          label={mode === 'send' ? t('device-theirs') : t('device-label')}
          countLabel={`${t('device-digits')} ${t('device-of')}`}
          clearLabel={t('read-clear')}
          editable={mode === 'read'}
          ringing={sending.ringing}
          onChange={(next) => setDigits(onlyDigits(next))}
        />

        {mode === 'send' ? (
          <Panel title={t('send-title')} note={t('send-note')}>
            <input
              className={styles.input}
              value={text}
              placeholder={t('send-placeholder')}
              onChange={(event) => setText(event.target.value)}
            />
            <div className={styles.suggestions}>
              {SUGGESTIONS.map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  className={styles.suggestion}
                  onClick={() => setText(suggestion)}
                >
                  {suggestion}
                </button>
              ))}
            </div>

            {text.trim().length === 0 ? (
              <p className={styles.hint}>{t('send-empty')}</p>
            ) : (
              <>
                <div className={styles.coverageRow}>
                  <span>{t('send-coverage')}</span>
                  <span className={styles.coverageTrack}>
                    <span
                      className={styles.coverageFill}
                      style={{ inlineSize: `${Math.round(echo.sent.coverage * 100)}%` }}
                    />
                  </span>
                  <span>{Math.round(echo.sent.coverage * 100)}%</span>
                </div>

                <div className={styles.pieceList}>
                  {echo.sent.pieces.map((piece, index) => (
                    <span
                      key={index}
                      className={`${styles.piece} ${piece.via === 'lost' ? styles.pieceLost : styles.pieceSent}`}
                    >
                      {piece.text}
                      {piece.digits && <span className={styles.pieceDigits}>{piece.digits}</span>}
                    </span>
                  ))}
                </div>

                <p className={styles.hint}>
                  {lost.length === 0 ? t('send-lost-none') : `${t('send-lost')} · ${lost.map((piece) => piece.text).join(' ')}`}
                </p>
                {echo.sent.overflow && <p className={styles.hint}>{t('send-overflow')}</p>}

                <Button
                  variant="primary"
                  disabled={echo.sent.digits.length === 0 || sending.ringing}
                  onClick={sending.send}
                >
                  {sending.ringing ? t('send-going') : t('send-button')}
                </Button>
              </>
            )}
          </Panel>
        ) : (
          <Panel title={t('read-title')} note={t('read-note')}>
            {digits.length === 0 ? (
              <p className={styles.hint}>{t('read-empty')}</p>
            ) : (
              <>
                <p className={styles.hint}>
                  {t('read-literal')} · {literalReading(digits)}
                </p>
                <p className={styles.hint}>
                  {ways.length}
                  {t('read-ways')}
                </p>
                <div className={styles.wayList}>
                  {ways.map((way, index) => (
                    <div key={index} className={`${styles.way} ${index === 0 ? styles.wayFirst : ''}`}>
                      {way.pieces.map((piece, pieceIndex) => (
                        <span key={pieceIndex} className={styles.wayPiece}>
                          <span className={styles.wayDigits}>{piece.digits}</span>
                          <span
                            className={`${styles.wayReading} ${piece.codeIndex !== null ? styles.wayKnown : ''}`}
                          >
                            {piece.reading}
                          </span>
                        </span>
                      ))}
                    </div>
                  ))}
                </div>
              </>
            )}
          </Panel>
        )}

        {mode === 'send' && sending.delivered && (
          <Panel title={t('echo-title')} note={t('echo-note')}>
            <Returned echo={echo} locale={locale} t={t} />
          </Panel>
        )}

        <Panel title={t('today-title')} note={t('today-note')}>
          <div className={styles.today}>
            <span className={styles.todayDigits}>{today.digits}</span>
            <span>{today.meaning[locale]}</span>
            <span className={styles.hint}>{today.reason[locale]}</span>
          </div>
        </Panel>

        <Panel title={t('codebook-title')} note={t('codebook-note')}>
          <Codebook
            locale={locale}
            t={t}
            onPick={(entry) => {
              // 읽던 흐름이 끊기지 않게, 지금 모드에 맞는 자리로 넣어 준다.
              if (mode === 'read') setDigits(entry.digits);
              else setText(entry.meaning.ko);
            }}
          />
        </Panel>

        <Panel title={t('reflect-title')}>
          <p className={styles.reflect}>{t('reflect-body')}</p>
          <p className={styles.hint}>{t('paper-note')}</p>
        </Panel>
      </div>
    </div>
  );
}
