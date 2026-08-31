'use client';

/**
 * 되돌아온 말.
 *
 * 보낸 말과 상대가 읽은 말을 나란히 놓는다. 점수도 정답도 없다.
 * 숫자를 지나온 말이 무엇이 되어 있는지, 그 한 장면이 이 페이지가 하려는 말 전부다.
 */

import { CODEBOOK } from '../../../core/pager';
import type { Echo } from '../../../core/pager';
import type { Locale } from '../../../core/i18n';
import type { BeeperKey } from '../dictionary';
import styles from './beeper.module.css';

export function Returned({
  echo,
  locale,
  t,
}: {
  echo: Echo;
  locale: Locale;
  t: (key: BeeperKey) => string;
}) {
  if (echo.sent.digits.length === 0) {
    return <p className={styles.hint}>{t('echo-nothing')}</p>;
  }

  // 첫 갈래는 위에 크게 보여 주고, 나머지는 "이렇게도 읽힌다"로 아래에 늘어놓는다.
  const alternates = echo.readings.slice(1, 4);

  return (
    <div className={styles.echo}>
      <div className={styles.echoPair}>
        <span className={styles.echoLabel}>{t('echo-you-said')}</span>
        <span className={styles.echoSaid}>{echo.source}</span>
      </div>
      <div className={styles.echoPair}>
        <span className={styles.echoLabel}>{t('echo-they-read')}</span>
        <span className={echo.intact ? styles.echoIntact : styles.echoChanged}>{echo.returned}</span>
      </div>

      <p className={styles.hint}>{echo.intact ? t('echo-same') : t('echo-different')}</p>

      {alternates.length > 0 && (
        <>
          <p className={styles.hint}>{t('echo-also')}</p>
          <div className={styles.echoAlternates}>
            {alternates.map((reading, index) => (
              <span key={index} className={styles.echoAlternate}>
                {reading.pieces.map((piece, pieceIndex) => (
                  <span
                    key={pieceIndex}
                    className={piece.codeIndex === null ? styles.echoPlain : styles.echoCode}
                    title={piece.codeIndex === null ? undefined : CODEBOOK[piece.codeIndex].reason[locale]}
                  >
                    {piece.reading}
                  </span>
                ))}
              </span>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
