'use client';

/**
 * 회복 화면.
 *
 * 순서가 뜻을 갖는다. 맨 앞에 깔때기(16 -> 6 -> 2)를 둔다. 이 도구가 통하는 자리가
 * 얼마나 좁은지를 먼저 보아야, 뒤따르는 여덟 축이 "어디가 좁은가"에 대한 답으로 읽힌다.
 * 설계 공간을 먼저 펼쳐 놓으면 그저 또 하나의 표로 보인다.
 *
 * 기본값은 축을 모두 가운데에 두고 공동체를 거친 곳으로 둔 것이다. 가운데에 두면
 * 봉우리 축 넷이 맞고 기운 축 넷이 가장자리가 되어 이 화면이 하려는 말이 바로 보인다.
 */

import { useMemo, useState } from 'react';
import { Badge, Panel, Segmented, type SegmentedOption } from '../../../kit';
import {
  AXES,
  FOCUS_KINDS,
  FUNNEL,
  MIDDLE,
  hasReasonAt,
  peakMiddleCount,
  read,
  type Axis,
  type FocusKind,
  type Placement,
  type Position,
  type Scope,
} from '../../../core/restorative';
import { createTranslator, type Locale } from '../../../core/i18n';
import { DEFAULT_FOCUS, PAPER } from '../config';
import { repairDictionary, type RepairKey } from '../dictionary';
import styles from './repair.module.css';

const SCOPES: Scope[] = ['where', 'how', 'when'];

/** 안 맞는 까닭의 사전 키. 없는 조합은 사전에도 없다. */
function reasonKey(axis: Axis, position: Position): RepairKey | null {
  if (!hasReasonAt(axis, position)) return null;
  return `r-${axis.id}-${position <= 2 ? 'low' : 'high'}` as RepairKey;
}

export function Repair({ locale }: { locale: Locale }) {
  const t = createTranslator(repairDictionary, locale);

  const [placement, setPlacement] = useState<Placement>({});
  const [focus, setFocus] = useState<FocusKind>(DEFAULT_FOCUS);

  const reading = useMemo(() => read(placement, focus), [placement, focus]);
  const peak = peakMiddleCount();

  const focusOptions: SegmentedOption<FocusKind>[] = FOCUS_KINDS.map((kind) => ({
    value: kind,
    label: t(`k-${kind}` as RepairKey),
  }));

  const set = (id: string, position: Position) =>
    setPlacement((prev) => ({ ...prev, [id]: position }));

  return (
    <div className={styles.layout}>
      <p className={styles.paper}>
        <span className={styles.paperLabel}>{t('paper-label')}</span>
        <a href={PAPER.link} target="_blank" rel="noreferrer">
          {PAPER.title}
        </a>
        <span className={styles.paperMeta}>
          {PAPER.authors} · {PAPER.affiliation} · {PAPER.venue} · {t('full-text')} {PAPER.fullText}
        </span>
      </p>

      <Panel title={t('funnel-title')} note={t('funnel-note')}>
        <div className={styles.funnel}>
          {([
            ['f-phase1', FUNNEL.phase1, 'wide'],
            ['f-deployed', FUNNEL.deployed, 'mid'],
            ['f-used', FUNNEL.used, 'narrow'],
          ] as const).map(([key, value, kind]) => (
            <div key={key} className={styles.funnelStep} data-kind={kind}>
              <span className={styles.funnelValue}>{value}</span>
              <span className={styles.funnelLabel}>{t(key)}</span>
              <span
                className={styles.funnelBar}
                style={{ width: `${(value / FUNNEL.phase1) * 100}%` }}
              />
            </div>
          ))}
        </div>
        <p className={styles.note}>
          {t('f-no-occasion')}: {FUNNEL.noOccasion}
        </p>
        <p className={styles.note}>{t('funnel-read')}</p>
      </Panel>

      <Panel title={t('peak-title')} note={t('peak-note').replace('{peak}', String(peak))}>
        <div className={styles.shapeKey}>
          {(['peakMiddle', 'towardHigh', 'towardLow'] as const).map((shape) => (
            <span key={shape} className={styles.shapeChip} data-shape={shape}>
              {t(`shape-${shape}` as RepairKey)} ·{' '}
              {AXES.filter((axis) => axis.shape === shape).length}
            </span>
          ))}
        </div>
      </Panel>

      <Panel title={t('focus-title')} note={t('focus-note')}>
        <Segmented options={focusOptions} value={focus} onChange={setFocus} />
        <p className={styles.focusWhy} data-verdict={reading.focus}>
          {t(`kd-${focus}` as RepairKey)}
        </p>
        <Badge tone={reading.focus === 'fits' ? 'pass' : reading.focus === 'misfits' ? 'fail' : 'neutral'}>
          {t(`v-${reading.focus}` as RepairKey)}
        </Badge>
      </Panel>

      <Panel title={t('axes-title')} note={t('axes-note')}>
        {SCOPES.map((scope) => (
          <div key={scope} className={styles.scope}>
            <h3 className={styles.scopeName}>{t(`s-${scope}` as RepairKey)}</h3>
            {reading.byAxis
              .filter((entry) => entry.axis.scope === scope)
              .map(({ axis, position, verdict, blocked }) => {
                const key = reasonKey(axis, position);
                return (
                  <div key={axis.id} className={styles.axis} data-verdict={verdict} data-blocked={blocked}>
                    <div className={styles.axisHead}>
                      <span className={styles.axisName}>{t(`x-${axis.id}` as RepairKey)}</span>
                      <span className={styles.axisShape}>{t(`shape-${axis.shape}` as RepairKey)}</span>
                      <span className={styles.axisVerdict} data-verdict={verdict}>
                        {t(`v-${verdict}` as RepairKey)}
                      </span>
                    </div>
                    <div className={styles.slider}>
                      <span className={styles.pole}>{t(`p-${axis.id}-0` as RepairKey)}</span>
                      <div className={styles.steps}>
                        {([1, 2, 3, 4, 5] as Position[]).map((step) => (
                          <button
                            key={step}
                            type="button"
                            className={styles.step}
                            data-on={position === step}
                            aria-label={`${t(`x-${axis.id}` as RepairKey)} ${step}`}
                            aria-pressed={position === step}
                            onClick={() => set(axis.id, step)}
                          />
                        ))}
                      </div>
                      <span className={styles.pole}>{t(`p-${axis.id}-1` as RepairKey)}</span>
                    </div>
                    {key !== null && <p className={styles.reason}>{t(key)}</p>}
                  </div>
                );
              })}
          </div>
        ))}
        <p className={styles.note}>{t('poles-note')}</p>
        <p className={styles.note}>{t('axes-mine')}</p>
      </Panel>

      <Panel title={t('read-title')} note={t('read-note')}>
        {reading.blocked ? (
          <div className={styles.blocked}>
            <span className={styles.blockedHead}>{t('read-blocked')}</span>
            <span className={styles.blockedWhy}>{t('read-blocked-why')}</span>
          </div>
        ) : (
          <div className={styles.counts}>
            {(['fits', 'edge', 'misfits'] as const).map((verdict) => (
              <div key={verdict} className={styles.count} data-verdict={verdict}>
                <span className={styles.countValue}>{reading[verdict]}</span>
                <span className={styles.countLabel}>
                  {t('read-counts')} {t(`v-${verdict}` as RepairKey)}
                </span>
              </div>
            ))}
          </div>
        )}
      </Panel>

      <Panel title={t('open-title')}>
        <p className={styles.note}>{t('open-note')}</p>
      </Panel>

      <Panel title={t('took-title')}>
        <p className={styles.note}>{t('took-yes')}</p>
        <p className={styles.note}>{t('took-no')}</p>
        <p className={styles.note}>{t('took-mine')}</p>
      </Panel>
    </div>
  );
}
