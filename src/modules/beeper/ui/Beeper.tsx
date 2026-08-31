'use client';

/**
 * 삐삐 체험 화면.
 *
 * 두 방향으로 논다. 말을 숫자로 밀어 넣어 보내고(보내기), 숫자를 말로 되돌려 본다(해독하기).
 * 보내기는 변환기가 아니다. 누르면 숫자가 한 자리씩 상대의 액정에 찍히고,
 * 그 사람이 그것을 무엇으로 읽었는지가 돌아온다. 그 왕복에서 무엇이 사라지는지 보게 된다.
 */

import { useMemo, useState } from 'react';
import { Panel, Segmented, type SegmentedOption } from '../../../kit';
import {
  CODEBOOK,
  MAX_DIGITS,
  READING_RULES,
  codeOfDay,
  onlyDigits,
  roundTrip,
  segmentations,
} from '../../../core/pager';
import { createTranslator, type Locale } from '../../../core/i18n';
import { PAPER, WELCOME_DIGITS } from '../config';
import { beeperDictionary } from '../dictionary';
import { Codebook } from './Codebook';
import { PagerDevice } from './PagerDevice';
import { Reading } from './Reading';
import { Sending } from './Sending';
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
  // 오늘의 암호도 규칙 하나에 속한다. 그 규칙을 함께 보여 줘야 코드집과 같은 이야기로 읽힌다.
  const todayRule = READING_RULES.find((rule) => rule.id === today.rule);
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
            <Sending
              text={text}
              echo={echo}
              ringing={sending.ringing}
              onChange={setText}
              onSend={sending.send}
              t={t}
            />
          </Panel>
        ) : (
          <Panel title={t('read-title')} note={t('read-note')}>
            <Reading digits={digits} ways={ways} locale={locale} t={t} />
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
          {todayRule && (
            <p className={styles.hint}>
              {t('today-rule')} · {todayRule.name[locale]}
            </p>
          )}
          <p className={styles.context}>{t('today-how')}</p>
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
