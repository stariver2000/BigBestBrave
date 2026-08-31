'use client';

/**
 * 상영관.
 *
 * 자막은 멈춰 있을 때가 아니라 흘러갈 때 판단된다. 그래서 재생 단추를 앞에 두고,
 * 원본과 재분할 결과를 같은 시계 위에 나란히 돌린다. 큰 글씨에서 원본이 경계 밖으로
 * 흘러나가는 장면이 이 페이지가 하는 말 전부이며, 설명보다 그 장면이 빠르다.
 */

import { useMemo, useState } from 'react';
import { Button, Segmented, type SegmentedOption } from '../../../kit';
import { BREAK_LADDER, advance, blockAt, buildTimeline, nearestBlock, widestLine } from '../../../core/subtitle';
import type { Chunk, Cue, Measure } from '../../../core/subtitle';
import { PLAYBACK } from '../config';
import type { SubtitleKey } from '../dictionary';
import { CaptionScreen } from './CaptionScreen';
import { useClock } from './useClock';
import styles from './subtitle.module.css';

/** 시간(ms)을 시간 막대 안의 위치(%)로. 막대 전체가 재생 길이 하나를 나타낸다. */
function percentOf(time: number, duration: number): string {
  if (duration <= 0) return '0%';
  const ratio = Math.max(0, Math.min(1, time / duration));
  return `${ratio * 100}%`;
}

function seconds(milliseconds: number): string {
  return `${(milliseconds / 1000).toFixed(1)}s`;
}

export function Theater({
  cues,
  chunks,
  measure,
  pauseThreshold,
  fontSize,
  captionWidth,
  fontStack,
  fontWeight,
  t,
}: {
  cues: readonly Cue[];
  chunks: readonly Chunk[];
  measure: Measure;
  pauseThreshold: number;
  fontSize: number;
  captionWidth: number;
  fontStack: string;
  fontWeight: number;
  t: (key: SubtitleKey) => string;
}) {
  const [time, setTime] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState<number>(PLAYBACK.defaultSpeed);
  const [compare, setCompare] = useState(true);

  const timeline = useMemo(() => buildTimeline(cues, pauseThreshold), [cues, pauseThreshold]);
  const running = playing && timeline.duration > 0;

  useClock(running, (elapsed) => {
    setTime((current) => advance(current, elapsed, speed, timeline.duration));
  });

  // 재생 중에는 시간에 정확히 맞춘다(빈 구간은 빈 화면이 맞다).
  // 멈춰 있을 때는 다음에 뜰 자막을 미리 세워 둔다. 정지 화면이 검기만 하면 볼 것이 없다.
  const locate = (blocks: readonly { start: number; end: number }[]) =>
    playing ? blockAt(blocks, time) : nearestBlock(blocks, time);

  const chunkIndex = locate(chunks);
  const cueIndex = locate(cues);
  const chunk = chunkIndex === -1 ? undefined : chunks[chunkIndex];
  const cue = cueIndex === -1 ? undefined : cues[cueIndex];

  // 넘친 폭을 픽셀로 알린다. 0 이하면 경계 안에 들어온 것이다.
  const cueOverflow = cue === undefined ? 0 : measure(cue.text) - captionWidth;
  const chunkOverflow = chunk === undefined ? 0 : widestLine(chunk, measure) - captionWidth;
  const overflowLabel = (excess: number) => `${t('overflow-flag')} +${Math.round(excess)}px`;

  const speedOptions: SegmentedOption<string>[] = PLAYBACK.speeds.map((value) => ({
    value: String(value),
    label: `${value}×`,
  }));

  const seekTo = (ratio: number) => {
    setTime(Math.max(0, Math.min(1, ratio)) * timeline.duration);
  };

  if (chunks.length === 0) {
    return (
      <CaptionScreen
        lines={[]}
        fontSize={fontSize}
        captionWidth={captionWidth}
        fontStack={fontStack}
        fontWeight={fontWeight}
        emptyLabel={t('theater-empty')}
      />
    );
  }

  return (
    <div className={styles.theater}>
      <div className={styles.screens}>
        {compare && (
          <CaptionScreen
            lines={cue ? [cue.text] : []}
            tag={t('tag-before')}
            meta={cueOverflow > 0 ? overflowLabel(cueOverflow) : cue && seconds(cue.end - cue.start)}
            fontSize={fontSize}
            captionWidth={captionWidth}
            fontStack={fontStack}
            fontWeight={fontWeight}
            emptyLabel=""
            overflowing={cueOverflow > 0}
            wrap={false}
          />
        )}
        <CaptionScreen
          lines={chunk ? chunk.lines : []}
          tag={compare ? t('tag-after') : `${chunkIndex + 1} / ${chunks.length}`}
          meta={chunkOverflow > 0 ? overflowLabel(chunkOverflow) : chunk && seconds(chunk.end - chunk.start)}
          fontSize={fontSize}
          captionWidth={captionWidth}
          fontStack={fontStack}
          fontWeight={fontWeight}
          emptyLabel=""
          overflowing={chunkOverflow > 0}
        />
      </div>

      {/*
        왜 하필 여기서 잘렸는지. 근거 하나만 보여 주면 "그런가 보다"로 끝나므로,
        고를 수 있었던 자리들을 점수 사다리로 함께 놓아 이 자리가 왜 이겼는지가 보이게 한다.
      */}
      {chunk?.reason && (
        <div className={styles.reason}>
          <p className={styles.reasonLine}>
            <span className={styles.reasonLabel}>{t('break-label')}</span>
            <span className={styles.reasonText}>{t(`break-${chunk.reason}` as SubtitleKey)}</span>
          </p>
          <div className={styles.ladder}>
            {BREAK_LADDER.map((step) => (
              <span
                key={step.reason}
                className={`${styles.rung} ${step.reason === chunk.reason ? styles.rungActive : ''}`}
              >
                {t(`break-${step.reason}` as SubtitleKey)}
                <span className={styles.rungScore}>{step.score}</span>
              </span>
            ))}
          </div>
          <p className={styles.ladderNote}>{t('break-ladder')}</p>
        </div>
      )}

      {/* 시간 막대: 자막 덩어리와 말이 쉰 자리를 같은 축에 얹어, 자른 근거가 보이게 한다. */}
      <div
        className={styles.strip}
        onClick={(event) => {
          const bounds = event.currentTarget.getBoundingClientRect();
          seekTo((event.clientX - bounds.left) / bounds.width);
        }}
      >
        {timeline.pauses.map((pause) => (
          <span
            key={pause.start}
            className={styles.stripPause}
            title={t('timeline-pause')}
            style={{
              insetInlineStart: percentOf(pause.start, timeline.duration),
              inlineSize: percentOf(pause.end - pause.start, timeline.duration),
            }}
          />
        ))}
        {chunks.map((block, index) => (
          <span
            key={block.start}
            className={`${styles.stripChunk} ${index === chunkIndex ? styles.stripChunkActive : ''}`}
            style={{
              insetInlineStart: percentOf(block.start, timeline.duration),
              inlineSize: percentOf(block.end - block.start, timeline.duration),
            }}
          />
        ))}
        <span className={styles.playhead} style={{ insetInlineStart: percentOf(time, timeline.duration) }} />
      </div>

      {/*
        쉼을 몇 군데로 봤는지. 하나도 없으면 그 사실이 곧 이 페이지의 한계 설명이 된다 —
        논문은 음성에서 쉼을 찾지만 여기는 자막 파일밖에 보지 못한다.
      */}
      <p className={styles.ladderNote}>
        {timeline.pauses.length > 0 ? (
          <>
            {timeline.pauses.length}
            {t('pause-found')}
          </>
        ) : (
          t('pause-none')
        )}
      </p>

      <input
        className={styles.scrubber}
        type="range"
        min={0}
        max={Math.max(timeline.duration, 1)}
        value={time}
        onChange={(event) => setTime(Number(event.target.value))}
        aria-label={t('theater-title')}
      />

      <div className={styles.transport}>
        <Button variant="primary" onClick={() => setPlaying(!playing)}>
          {playing ? `⏸ ${t('pause')}` : `▶ ${t('play')}`}
        </Button>
        <Button onClick={() => { setTime(0); setPlaying(true); }}>↺ {t('replay')}</Button>
        <span className={styles.transportGap} />
        <span className={styles.transportClock}>
          {seconds(time)} / {seconds(timeline.duration)}
        </span>
        <div className={styles.speed}>
          <Segmented
            options={speedOptions}
            value={String(speed)}
            onChange={(next) => setSpeed(Number(next))}
            dense
          />
        </div>
        <Button variant={compare ? 'primary' : 'default'} onClick={() => setCompare(!compare)}>
          {t('compare')}
        </Button>
      </div>
    </div>
  );
}
