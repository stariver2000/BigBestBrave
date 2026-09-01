'use client';

/**
 * 크기 착시 화면.
 *
 * 읽는 순서: 자 위에 범위를 보이고 -> 두 가지가 함께 참임을 짚고 -> 그래서 어떻게 되는지 -> 낼 수 있는 폭.
 * 자를 먼저 두는 까닭: '범위가 실제 크기 위에 통째로 얹혀 있다'는 것은 숫자보다 그림이 빠르다.
 */

import { useMemo, useState } from 'react';
import { Panel } from '../../../kit';
import {
  DEVICE_MM,
  FELT_RATIO,
  INITIAL,
  LOWER_RATIO,
  PARTICIPANTS,
  RANGE,
  reachOf,
  REPORTED,
  REPOSITION_MM,
  THRESHOLDS,
  UPPER_RATIO,
  windowOf,
} from '../../../core/illusion';
import { createTranslator, type Locale } from '../../../core/i18n';
import { PAPER, RULER, RULER_MAX_MM } from '../config';
import { gripDictionary, type GripKey } from '../dictionary';
import styles from './grip.module.css';

export function Grip({ locale }: { locale: Locale }) {
  const t = createTranslator(gripDictionary, locale);

  const [device, setDevice] = useState<number>(INITIAL.device);
  const [reposition, setReposition] = useState<number>(INITIAL.reposition);

  const window_ = useMemo(() => windowOf(device), [device]);
  const reach = useMemo(() => reachOf(device, reposition), [device, reposition]);

  const mm = (value: number) => `${value.toFixed(1)}mm`;
  const pct = (value: number) => `${(value * 100).toFixed(1)}%`;

  /** 자 위의 밀리미터를 픽셀로. */
  const x = (value: number) =>
    RULER.pad + (Math.min(value, RULER_MAX_MM) / RULER_MAX_MM) * (RULER.width - RULER.pad * 2);

  const ticks = [0, 25, 50, 75, 100, 125, 150, 175];

  return (
    <div className={styles.layout}>
      <p className={styles.paper}>
        <span className={styles.paperLabel}>{t('paper-label')}</span>
        <a href={PAPER.link} target="_blank" rel="noreferrer">
          {PAPER.title}
        </a>
        <span className={styles.paperMeta}>
          {PAPER.authors} · {PAPER.affiliation} · {PAPER.venue}
        </span>
      </p>

      <Panel title={t('setup-title')} note={t('setup-note')}>
        <div className={styles.dials}>
          <label className={styles.dial}>
            <span className={styles.dialLabel}>
              {t('device')}
              <span className={styles.dialValue} data-touch>
                {device}mm
              </span>
            </span>
            <input
              type="range"
              min={RANGE.device.min}
              max={RANGE.device.max}
              step={RANGE.device.step}
              value={device}
              onChange={(event) => setDevice(Number(event.target.value))}
            />
            <span className={styles.quiet}>{t('device-note')}</span>
          </label>

          <label className={styles.dial}>
            <span className={styles.dialLabel}>
              {t('reposition')}
              <span className={styles.dialValue} data-touch>
                {reposition.toFixed(1)}mm
              </span>
            </span>
            <input
              type="range"
              min={RANGE.reposition.min}
              max={RANGE.reposition.max}
              step={RANGE.reposition.step}
              value={reposition}
              onChange={(event) => setReposition(Number(event.target.value))}
            />
            <span className={styles.quiet}>{t('reposition-note')}</span>
          </label>
        </div>

        <button
          type="button"
          className={styles.reset}
          onClick={() => {
            setDevice(DEVICE_MM);
            setReposition(REPOSITION_MM.mean);
          }}
        >
          {t('reset-paper')}
        </button>
      </Panel>

      <Panel title={t('ruler-title')} note={t('ruler-note')}>
        <div className={styles.rulerWrap}>
          <svg className={styles.ruler} viewBox={`0 0 ${RULER.width} ${RULER.height}`} role="img">
            <line
              x1={RULER.pad}
              y1={RULER.height - 30}
              x2={RULER.width - RULER.pad}
              y2={RULER.height - 30}
              className={styles.axis}
            />
            {ticks.map((tick) => (
              <g key={tick}>
                <line x1={x(tick)} y1={RULER.height - 30} x2={x(tick)} y2={RULER.height - 24} className={styles.tick} />
                <text x={x(tick)} y={RULER.height - 10} className={styles.tickLabel} textAnchor="middle">
                  {tick}
                </text>
              </g>
            ))}

            {/* 받아들이는 범위. 실제 크기 위에 통째로 얹혀 있다. */}
            <rect
              x={x(window_.lower)}
              y={34}
              width={Math.max(2, x(window_.upper) - x(window_.lower))}
              height={30}
              className={styles.band}
            />
            <line x1={x(window_.felt)} y1={28} x2={x(window_.felt)} y2={70} className={styles.felt} />

            {/* 손에 쥔 실제 크기. */}
            <line x1={x(device)} y1={44} x2={x(device)} y2={RULER.height - 30} className={styles.physical} />
            <circle cx={x(device)} cy={44} r={4} className={styles.physicalDot} />

            <text x={x(device)} y={36} className={styles.mark} data-touch textAnchor="middle">
              {device}
            </text>
            <text x={x(window_.felt)} y={22} className={styles.mark} textAnchor="middle">
              {window_.felt.toFixed(0)}
            </text>
          </svg>
        </div>

        <dl className={styles.readouts}>
          <div className={styles.readout}>
            <dt data-touch>{t('r-physical')}</dt>
            <dd data-touch>{mm(device)}</dd>
          </div>
          <div className={styles.readout}>
            <dt>{t('r-felt')}</dt>
            <dd className={styles.big}>{mm(window_.felt)}</dd>
          </div>
          <div className={styles.readout}>
            <dt>{t('r-window')}</dt>
            <dd>
              {mm(window_.lower)} – {mm(window_.upper)}
            </dd>
          </div>
        </dl>
      </Panel>

      <div className={styles.pair}>
        <section className={styles.half}>
          <h2 className={styles.halfTitle}>{t('two-bias')}</h2>
          <p className={styles.halfBig}>+{((FELT_RATIO - 1) * 100).toFixed(1)}%</p>
          <p className={styles.quiet}>{t('two-bias-note')}</p>
        </section>
        <section className={styles.half} data-tight>
          <h2 className={styles.halfTitle}>{t('two-width')}</h2>
          <p className={styles.halfBig}>{((UPPER_RATIO - LOWER_RATIO) * 100).toFixed(2)}%</p>
          <p className={styles.quiet}>{t('two-width-note')}</p>
        </section>
      </div>

      <section className={styles.so}>
        <h2 className={styles.soTitle}>{t('so-title')}</h2>
        <p>{t('so-body')}</p>
      </section>

      <Panel title={t('reach-title')} note={t('reach-note')}>
        <dl className={styles.readouts}>
          <div className={styles.readout}>
            <dt data-touch>{t('reach-haptic')}</dt>
            <dd data-touch>
              {mm(reach.minHaptic)} – {mm(reach.maxHaptic)}
            </dd>
          </div>
          <div className={styles.readout}>
            <dt>{t('reach-visual')}</dt>
            <dd className={styles.big}>
              {mm(reach.smallest)} – {mm(reach.largest)}
            </dd>
          </div>
          <div className={styles.readout}>
            <dt>{t('reach-span')}</dt>
            <dd className={styles.big}>
              {reach.span.toFixed(2)}
              {t('times')}
            </dd>
          </div>
        </dl>
      </Panel>

      <Panel title={t('table-title')} note={t('table-note')}>
        <div className={styles.tableScroll}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th scope="col">{t('col-seq')}</th>
                <th scope="col">{t('col-asc')}</th>
                <th scope="col">{t('col-desc')}</th>
                <th scope="col">{t('col-ratio')}</th>
              </tr>
            </thead>
            <tbody>
              {THRESHOLDS.map((row) => (
                <tr key={row.sequence}>
                  <th scope="row">{row.sequence}</th>
                  <td>
                    {row.ascending.toFixed(3)}
                    <span className={styles.se}>
                      {t('se')} {row.ascendingSe.toFixed(3)}
                    </span>
                  </td>
                  <td>
                    {row.descending.toFixed(3)}
                    <span className={styles.se}>
                      {t('se')} {row.descendingSe.toFixed(3)}
                    </span>
                  </td>
                  <td className={styles.ratio}>
                    {pct(row.ascending / DEVICE_MM)}
                    <span className={styles.se}>{pct(row.descending / DEVICE_MM)}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className={styles.quiet}>n = {PARTICIPANTS}</p>
      </Panel>

      <section className={styles.prior}>
        <h2 className={styles.soTitle}>{t('prior-title')}</h2>
        <div className={styles.priorBars}>
          {[
            { key: 'prior-compliant' as GripKey, value: REPORTED.priorCompliant },
            { key: 'prior-rigid' as GripKey, value: REPORTED.priorRigid },
            { key: 'prior-here' as GripKey, value: UPPER_RATIO - LOWER_RATIO, here: true },
          ].map((entry) => (
            <div key={entry.key} className={styles.priorRow}>
              <span className={styles.priorName} data-here={entry.here || undefined}>
                {t(entry.key)}
              </span>
              <span className={styles.priorTrack}>
                <span
                  className={styles.priorFill}
                  data-here={entry.here || undefined}
                  style={{ width: `${(entry.value / REPORTED.priorCompliant) * 100}%` }}
                />
              </span>
            </div>
          ))}
        </div>
      </section>

      <p className={styles.warning}>{t('warning')}</p>

      <section className={styles.took}>
        <h2 className={styles.soTitle}>{t('took-title')}</h2>
        <p>{t('took-yes')}</p>
        <p>{t('took-no')}</p>
      </section>
    </div>
  );
}
