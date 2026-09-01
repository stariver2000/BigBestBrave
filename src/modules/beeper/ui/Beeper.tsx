'use client';

/**
 * 삐삐 체험 화면.
 *
 * 두 방향으로 논다. 말을 숫자로 밀어 넣어 보내고(보내기), 숫자를 말로 되돌려 본다(해독하기).
 * 보내기는 변환기가 아니다. 누르면 숫자가 한 자리씩 상대의 액정에 찍히고,
 * 그 사람이 그것을 무엇으로 읽었는지가 돌아온다. 그 왕복에서 무엇이 사라지는지 보게 된다.
 */

import { useMemo, useState } from 'react';
import { AutopilotChip, Panel, PaperCard, Segmented, useAutopilot, type SegmentedOption } from '../../../kit';
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

  /*
   * 스스로 도는 시연. 이 페이지의 요점은 "말이 숫자를 지나며 깎인다"인데, 그건 직접 보내 봐야 안다.
   * 그래서 화면이 먼저 보낸다 — 통째로 지나가는 말, 한 글자도 못 가는 말, 그리고 돌아온 말.
   * 손을 대면 그 자리에서 멈추고 자리를 내준다.
   */
  const autopilot = useAutopilot([
    { wait: 0, run: () => { setMode('send'); setText('사랑해'); } },
    { wait: 2200, run: () => sending.send() },
    { wait: 4200, run: () => setText('보고싶어') },
    { wait: 3600, run: () => setText('빨리빨리 일찍와') },
    { wait: 2400, run: () => sending.send() },
    { wait: 5200, run: () => { setMode('read'); setDigits('1004'); } },
    { wait: 4600, run: () => setDigits('8282') },
    { wait: 4200, run: () => { setMode('send'); setText(''); } },
  ]);

  const modeOptions: SegmentedOption<Mode>[] = [
    { value: 'send', label: t('mode-send') },
    { value: 'read', label: t('mode-read') },
  ];

  return (
    <div className={styles.layout}>
      <div className={styles.column}>
        <PaperCard
          label={t('paper-label')}
          title={PAPER.title}
          meta={`${PAPER.affiliation} · ${PAPER.venue}`}
          href={PAPER.listing}
          plain={PAPER.plain}
          locale={locale}
        />

        <div className={styles.modes}>
          <Segmented options={modeOptions} value={mode} onChange={setMode} />
        </div>
        <AutopilotChip running={autopilot.running} onRestart={autopilot.restart} locale={locale} />

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
