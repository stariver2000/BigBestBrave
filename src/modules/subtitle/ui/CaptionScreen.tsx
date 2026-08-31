'use client';

/**
 * 재생 화면 흉내.
 *
 * 자막을 지정한 크기 그대로 그린다. 축소해서 보여 주면 "넘치는지"를 눈으로 판단할 수 없으므로
 * 폰트 크기와 자막 영역 폭을 실제 값으로 넣는다. 점선은 자막이 넘어서면 안 되는 경계다.
 *
 * 원본과 재분할 결과를 같은 부품으로 그린다. 두 화면이 같은 조건이어야 비교가 성립하기 때문이다.
 * 원본은 파일에 적힌 줄을 그대로 두므로(줄바꿈 없음) 경계를 넘어 흘러나가고, 그 장면이 이 페이지의 요점이다.
 */

import styles from './subtitle.module.css';

export function CaptionScreen({
  lines,
  tag,
  meta,
  fontSize,
  captionWidth,
  fontStack,
  fontWeight,
  emptyLabel,
  overflowing = false,
  wrap = true,
}: {
  lines: readonly string[];
  /** 화면 왼쪽 위에 붙는 이름표(원본 / 재분할). */
  tag?: string;
  /** 오른쪽 위에 붙는 짧은 정보. 표시 시간이나 넘침 정도가 온다. */
  meta?: string;
  fontSize: number;
  captionWidth: number;
  fontStack: string;
  fontWeight: number;
  emptyLabel: string;
  /** 경계를 넘었는지. 넘친 화면은 테두리 색으로 알린다. */
  overflowing?: boolean;
  /** 원본은 줄을 접지 않는다. 접어서 보여 주면 넘침이 사라져 문제가 감춰진다. */
  wrap?: boolean;
}) {
  const hasCaption = lines.length > 0;

  return (
    <div className={`${styles.screen} ${overflowing ? styles.screenOverflow : ''}`}>
      <div className={styles.screenBar}>
        <span>{tag}</span>
        <span className={overflowing ? styles.screenAlarm : undefined}>{meta}</span>
      </div>

      {hasCaption ? (
        <div className={styles.captionArea} style={{ inlineSize: `${captionWidth}px` }}>
          {lines.map((line, lineIndex) => (
            <p
              key={lineIndex}
              className={styles.captionLine}
              style={{
                fontSize: `${fontSize}px`,
                fontFamily: fontStack,
                fontWeight,
                lineHeight: 1.25,
                whiteSpace: wrap ? 'pre-wrap' : 'pre',
              }}
            >
              {line}
            </p>
          ))}
        </div>
      ) : (
        <p className={styles.screenEmpty}>{emptyLabel}</p>
      )}
    </div>
  );
}
