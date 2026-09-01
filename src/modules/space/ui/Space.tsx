'use client';

/**
 * 설계 공간 화면.
 *
 * 이 화면이 파는 것은 채우기가 아니라 비어 있음이다. 그래서 조각보 바로 아래에 빈 칸을
 * 두 종류로 갈라 놓는 판이 온다 - 내가 아직 정하지 않은 칸과, 학계 전체가 오래 비워 둔 칸.
 *
 * 기본값은 요즘 흔한 대화형 글쓰기 도구 하나다. 과제와 기술과 상호작용은 웬만큼 차 있고
 * 사용자와 생태계는 통째로 비어 있다. 논문이 하려는 말이 첫 화면에서 이미 보여야 한다.
 */

import { useMemo, useState } from 'react';
import { Button, Panel, PaperCard } from '../../../kit';
import {
  ASPECTS,
  CORPUS,
  DIMENSIONS,
  FOUNDATION_MODEL_PAPERS,
  UNDER_EXPLORED,
  UNDER_REPRESENTED,
  configurationCeiling,
  configurationFloor,
  coverageOf,
  digitsOf,
  dimensionById,
  dimensionsOf,
  isDecided,
  scientific,
  toggleCode,
  totalCodes,
  type AspectId,
  type Picks,
} from '../../../core/designspace';
import { createTranslator, type Locale } from '../../../core/i18n';
import { DEFAULT_PICKS, PAPER, SIGNIFICANT_DIGITS } from '../config';
import { spaceDictionary, type SpaceKey } from '../dictionary';
import styles from './space.module.css';

/** 큰 수를 '7.94 x 10^25' 꼴로 적는다. 스물여섯 자리를 그대로 늘어놓으면 아무도 안 읽는다. */
function BigNumber({ value }: { value: bigint }) {
  const { mantissa, exponent } = scientific(value, SIGNIFICANT_DIGITS);
  return (
    <span className={styles.bigNumber}>
      {mantissa}
      <span className={styles.times}>×10</span>
      <sup>{exponent}</sup>
    </span>
  );
}

export function Space({ locale }: { locale: Locale }) {
  const t = createTranslator(spaceDictionary, locale);

  const [picks, setPicks] = useState<Picks>(DEFAULT_PICKS);
  const [open, setOpen] = useState<string | null>('purpose');

  const coverage = useMemo(() => coverageOf(picks), [picks]);
  const floor = useMemo(() => configurationFloor(), []);
  const ceiling = useMemo(() => configurationCeiling(), []);
  const openDimension = open === null ? undefined : dimensionById(open);

  const growthYears = Object.keys(FOUNDATION_MODEL_PAPERS)
    .map(Number)
    .sort((a, b) => a - b);

  return (
    <div className={styles.layout}>
      <PaperCard
        label={t('paper-label')}
        title={PAPER.title}
        meta={`${PAPER.authors} · ${PAPER.venue} · ${PAPER.fullText} · ${PAPER.taxonomy}`}
        href={PAPER.link}
        plain={PAPER.plain}
        locale={locale}
      />

      <Panel title={t('size-title')} note={t('size-note')}>
        <div className={styles.sizes}>
          <div className={styles.size}>
            <span className={styles.sizeLabel}>{t('size-floor')}</span>
            <BigNumber value={floor} />
            <span className={styles.sizeFine}>
              {digitsOf(floor)} {t('size-digits')} · {t('size-floor-why')}
            </span>
          </div>
          <div className={styles.size}>
            <span className={styles.sizeLabel}>{t('size-ceiling')}</span>
            <BigNumber value={ceiling} />
            <span className={styles.sizeFine}>
              {digitsOf(ceiling)} {t('size-digits')} · {t('size-ceiling-why')}
            </span>
          </div>
          <div className={styles.size} data-kind="corpus">
            <span className={styles.sizeLabel}>{t('size-papers')}</span>
            <span className={styles.bigNumber}>{CORPUS.reviewed}</span>
            <span className={styles.sizeFine}>
              {t('size-corpus-fine')
                .replace('{dimensions}', String(DIMENSIONS.length))
                .replace('{codes}', String(totalCodes()))}
            </span>
          </div>
        </div>
        <p className={styles.note}>{t('size-mine')}</p>
      </Panel>

      <Panel
        title={t('map-title')}
        note={t('map-note')}
        actions={<Button onClick={() => setPicks({})}>{t('clear')}</Button>}
      >
        <div className={styles.aspects}>
          {ASPECTS.map((aspect: AspectId) => {
            const entry = coverage.byAspect.find((one) => one.aspect === aspect);
            return (
              <div key={aspect} className={styles.aspect}>
                <div className={styles.aspectHead}>
                  <span className={styles.aspectName}>{t(`a-${aspect}` as SpaceKey)}</span>
                  <span className={styles.aspectCount}>
                    {entry?.decided ?? 0}/{entry?.total ?? 0} {t('decided-of')}
                  </span>
                  <span className={styles.aspectBarWrap}>
                    <span className={styles.aspectBar} style={{ width: `${(entry?.share ?? 0) * 100}%` }} />
                  </span>
                </div>
                <div className={styles.patches}>
                  {dimensionsOf(aspect).map((dimension) => {
                    const decided = isDecided(picks, dimension.id);
                    const thin = UNDER_REPRESENTED.includes(dimension.id);
                    return (
                      <button
                        key={dimension.id}
                        type="button"
                        className={styles.patch}
                        data-decided={decided}
                        data-thin={thin}
                        data-open={open === dimension.id}
                        aria-pressed={open === dimension.id}
                        onClick={() => setOpen(open === dimension.id ? null : dimension.id)}
                      >
                        <span className={styles.patchName}>{dimension.label}</span>
                        <span className={styles.patchCodes}>
                          {decided ? (picks[dimension.id] ?? []).join(', ') : `${dimension.codes.length}`}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
        <p className={styles.note}>{t('map-english')}</p>
      </Panel>

      <Panel title={t('pick-title')} note={t('pick-note')}>
        {openDimension === undefined ? (
          <p className={styles.note}>{t('fill-none')}</p>
        ) : (
          <>
            <p className={styles.openName}>
              {openDimension.label}
              {UNDER_REPRESENTED.includes(openDimension.id) && <span className={styles.thinTag}>·</span>}
            </p>
            <div className={styles.codes}>
              {openDimension.codes.map((code) => {
                const on = (picks[openDimension.id] ?? []).includes(code);
                return (
                  <button
                    key={code}
                    type="button"
                    className={styles.code}
                    data-on={on}
                    aria-pressed={on}
                    onClick={() => setPicks((prev) => toggleCode(prev, openDimension.id, code))}
                  >
                    {code}
                  </button>
                );
              })}
            </div>
          </>
        )}
      </Panel>

      <Panel title={t('blind-title')} note={t('blind-note')}>
        <div className={styles.blindPair}>
          <div className={styles.blind} data-kind="shared">
            <span className={styles.blindHead}>
              {t('blind-shared')} <span className={styles.blindCount}>{coverage.shared.length}</span>
            </span>
            <div className={styles.blindList}>
              {coverage.shared.length === 0 ? (
                <span className={styles.note}>{t('blind-none')}</span>
              ) : (
                coverage.shared.map((dimension) => (
                  <span key={dimension.id} className={styles.blindChip} data-kind="shared">
                    {dimension.label}
                  </span>
                ))
              )}
            </div>
            <span className={styles.blindWhy}>{t('blind-shared-why')}</span>
          </div>

          <div className={styles.blind} data-kind="alone">
            <span className={styles.blindHead}>
              {t('blind-alone')} <span className={styles.blindCount}>{coverage.alone.length}</span>
            </span>
            <div className={styles.blindList}>
              {coverage.alone.length === 0 ? (
                <span className={styles.note}>{t('blind-none')}</span>
              ) : (
                coverage.alone.map((dimension) => (
                  <span key={dimension.id} className={styles.blindChip} data-kind="alone">
                    {dimension.label}
                  </span>
                ))
              )}
            </div>
            <span className={styles.blindWhy}>{t('blind-alone-why')}</span>
          </div>
        </div>
      </Panel>

      <Panel title={t('named-title')} note={t('named-note')}>
        <div className={styles.growth}>
          <span className={styles.sizeLabel}>{t('named-growth')}</span>
          <span className={styles.growthRow}>
            {growthYears.map((year, index) => (
              <span key={year} className={styles.growthCell}>
                {index > 0 && <span className={styles.arrow}>→</span>}
                <span className={styles.growthYear}>{year}</span>
                <span className={styles.growthValue}>{FOUNDATION_MODEL_PAPERS[year]}</span>
              </span>
            ))}
          </span>
        </div>
        <div className={styles.namedCodes}>
          <span className={styles.sizeLabel}>{t('named-codes')}</span>
          <div className={styles.blindList}>
            {UNDER_EXPLORED.map((entry) => (
              <span key={`${entry.dimension}-${entry.code}`} className={styles.blindChip} data-kind="shared">
                {dimensionById(entry.dimension)?.label} · {entry.code}
              </span>
            ))}
          </div>
        </div>
      </Panel>

      <Panel title={t('took-title')}>
        <p className={styles.note}>{t('took-yes')}</p>
        <p className={styles.note}>{t('took-no')}</p>
        <p className={styles.note}>{t('took-mine')}</p>
      </Panel>
    </div>
  );
}
