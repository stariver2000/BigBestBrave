/**
 * 선택 방식 실험 페이지 설정.
 *
 * 근거가 된 연구: Cross, Dwell, or Pinch: Designing and Evaluating Around-Device Selection
 * Methods for Unmodified Smartwatches (Jiwan Kim, Jiwan Son, Ian Oakley, KAIST),
 * CHI 2025, doi:10.1145/3706598.3714308.
 *
 * 연구진은 손목시계를 고치지 않고 **초음파로 손가락을 좇는** 장치를 만든 뒤, 그 위에서
 * 세 가지 선택 방아쇠를 견주었다. 크로싱(모서리를 넘었다 되넘기), 드웰(500ms 머무르기),
 * 핀치(엄지와 검지 맞대기). 연구 1은 과녁 둘, 연구 2는 과녁 셋에서 재었다.
 * 크로싱은 둘일 때 가장 빨랐지만, 셋이 되자 그 이점이 사라지고 오류만 네 배로 늘었다.
 *
 * 이 페이지가 가져온 것
 *   - 세 방아쇠의 규칙 그대로. 크로싱은 **같은 모서리로** 되나와야 확정되고, 반대편으로
 *     빠지면 취소된다. 드웰 문턱은 논문이 고른 500ms.
 *   - 1차원 과제. 논문의 센서가 손가락을 한 줄 위에서 좇았기 때문에 원래 1차원이다.
 *   - 두 연구의 구조. 과녁 둘을 번갈아 여섯 번, 과녁 셋을 네 번(같은 것·옆 것·건너뛴 것).
 *   - 재는 방법. 유효 폭으로 낸 피츠 모형, 처리량, 이동 시간, 오류율, 재진입.
 *
 * 가져오지 않은 것
 *   - **초음파 손가락 추적.** 여기서는 마우스나 손끝으로 화면을 짚는다. 팔을 허공에 든 채
 *     보이지 않는 자리를 짚는 일과는 몸이 하는 일이 전혀 다르다.
 *   - 밀리미터 단위의 크기. 화면이 제각각이라 띠 대비 비율로 옮겼다.
 *   - 참가자 18명·12명의 표본과 통계 검정. 여기 있는 것은 한 사람의 몇 분치다.
 *
 * 그래서 **논문의 수치와 내 수치를 직접 견주면 안 된다.** 견줄 수 있는 것은 세 방식 사이의
 * 순서뿐이고, 화면에도 그렇게 적는다.
 */

export const PAPER = {
  title:
    'Cross, Dwell, or Pinch: Designing and Evaluating Around-Device Selection Methods for Unmodified Smartwatches',
  authors: 'Jiwan Kim, Jiwan Son, Ian Oakley',
  venue: 'CHI 2025',
  affiliation: 'KAIST',
  link: 'https://doi.org/10.1145/3706598.3714308',
  /**
   * 쉬운 말로. 열두 살이 읽어도 통하는 문장만 쓴다.
   * 논문이 무슨 말을 하려는 것인지 먼저 전하고, 이 페이지가 어디까지 가져왔는지를 밝힌다.
   */
  plain: {
    problem: {
      ko: '스마트워치 화면은 손가락보다 작습니다. 그래서 화면 밖 허공에서 고르는 방법이 연구되는데, \'골랐다\'는 신호를 무엇으로 삼아야 할까요?',
      en: 'A smartwatch screen is smaller than a finger, so people look for ways to select in the air beside it. But what should count as "I picked that one"?',
      ja: 'スマートウォッチの画面は指より小さい。だから画面の外の空中で選ぶ方法が研究されますが、「選んだ」という合図を何にすればよいでしょうか。',
    },
    work: {
      ko: '연구진은 시계를 고치지 않고 초음파로 손가락을 좇는 장치를 만든 뒤 세 가지 신호를 견주었습니다 — 모서리를 넘었다 되돌아오기, 500밀리초 머무르기, 엄지와 검지 맞대기. 과녁이 둘일 때는 넘기가 가장 빨랐지만, 셋이 되자 그 이점이 사라지고 오류만 네 배가 됐습니다.',
      en: 'They tracked the finger with ultrasound, without modifying the watch, and compared three triggers: crossing an edge and coming back, dwelling for 500 milliseconds, and pinching thumb to finger. With two targets crossing was fastest; with three the advantage vanished and errors grew four times.',
      ja: '研究者は時計を改造せず超音波で指を追う装置を作り、三つの合図を比べました — 端を越えて戻る、500ミリ秒とどまる、親指と人差し指を合わせる。的が二つのときは越える方式が最速でしたが、三つになると利点は消え、誤りは四倍になりました。',
    },
    took: {
      ko: '세 신호의 규칙과 두 실험의 짜임, 그리고 재는 방법(피츠 모형·처리량·오류율)을 가져왔습니다.',
      en: 'The rules of the three triggers, the shape of the two studies, and the way they measured — Fitts\' model, throughput, error rate.',
      ja: '三つの合図の規則、二つの実験の組み立て、そして測り方（フィッツの法則・スループット・誤り率）を受け取りました。',
    },
    left: {
      ko: '초음파 손가락 추적은 없습니다. 여기서는 마우스나 손끝으로 화면을 짚습니다 — 팔을 허공에 든 채 보이지 않는 자리를 짚는 일과는 몸이 하는 일이 전혀 다릅니다. 참가자 수십 명의 통계도 없으니 논문의 수치와 당신의 수치를 직접 견주면 안 됩니다.',
      en: 'There is no ultrasound tracking. Here you point with a mouse or a fingertip on glass — the body is doing something quite different from holding an arm in the air over a spot it cannot see. There is no panel of participants either, so your numbers must not be compared with the paper\'s.',
      ja: '超音波の指追跡はありません。ここではマウスや指先で画面を突きます — 腕を宙に上げ、見えない場所を突く作業とは体のしていることが全く違います。参加者の統計もないので、論文の数値とあなたの数値を直接比べてはいけません。',
    },
  },
} as const;

/** 한 차례에 도는 판의 수. 연습 판을 포함한다. */
export const TRIALS = { min: 3, max: 12, initial: 7 } as const;

/** 띠의 크기(px). 세로는 손가락으로 짚기 좋게 넉넉히 둔다. */
export const LANE = { height: 128, cursor: 3, targetRadius: 3 } as const;

/** 커서가 지나온 자리를 남기는 시간(ms). 궤적을 눈으로 되짚게 한다. */
export const TRAIL_MS = 700;

/** 방금 고른 결과를 띠에 남겨 두는 시간(ms). */
export const FLASH_MS = 450;

/** 기계 손이 지나가던 과녁을 골랐을 때, 그 사실을 띄워 두는 시간(ms). 이 페이지가 정한 값이다. */
export const SLIP_MS = 4500;
