/**
 * 마우스의 배꼽 페이지 설정.
 *
 * 근거가 된 연구: Optimal Sensor Position for a Computer Mouse
 * (Sunjun Kim, Byungjoo Lee, Thomas van Gemert, Antti Oulasvirta; Aalto·KAIST·DGIST),
 * CHI 2020, doi:10.1145/3313831.3376735. 전문은 저자들이 올려 둔 PDF로 읽었다.
 *
 * 이 페이지가 가져온 것
 *   - 가상 센서 수식(식 1~4)과 그 유도, 기기의 레일 치수(센서 사이 72mm).
 *   - 로봇 실험의 ∞ 계획(24×11cm, -20°~+40°)과 표 1의 수 전부.
 *   - 표 2(여섯 사람의 회귀)와, 포인팅 실험(14명, 26,460회)의 본문 수 전부.
 *
 * 가져오지 않은 것
 *   - 그림 9의 참가자별 처리량 곡선과 그림 11의 막대값. 그림에만 있는 값은 옮기지 않는다.
 *   - 베이즈 최적화 보정 절차. 사람을 붙들고 한 시간 재는 절차라 화면으로 옮길 수 없다.
 *
 * 이 페이지가 스스로 더한 것
 *   - 그리는 판. 손으로 긋는 동안 마우스가 기우는 규칙은 당신 손을 재는 것이 아니라
 *     로봇 계획의 규칙(x 위치에 비례, -20°~+40°)을 옮긴 것이다 - 화면에 밝힌다.
 */

export const PAPER = {
  title: 'Optimal Sensor Position for a Computer Mouse',
  authors: 'Sunjun Kim, Byungjoo Lee, Thomas van Gemert, Antti Oulasvirta',
  venue: 'CHI 2020',
  affiliation: 'Aalto · KAIST · DGIST',
  link: 'https://doi.org/10.1145/3313831.3376735',
  fullText: 'userinterfaces.aalto.fi/mouse_sensor_position',
  /** 쉬운 말로. 열두 살이 읽어도 통하는 문장만 쓴다. */
  plain: {
    problem: {
      ko: '마우스 바닥에는 움직임을 읽는 작은 눈(센서)이 하나 있는데, 그 눈이 앞에 붙은 마우스도 있고 가운데도, 뒤도 있습니다. 손은 마우스를 밀기만 하는 게 아니라 조금씩 돌리기도 합니다. 그 돌림을 눈이 어디서 보느냐에 따라 커서가 다른 길을 가는데, 어디가 좋은지 30년 넘게 아무도 제대로 재 보지 않았습니다.',
      en: 'On the bottom of every mouse sits a small eye (the sensor) that reads movement — some mice put it at the front, some in the middle, some at the back. A hand does not just push a mouse; it also turns it a little. Where the eye sits decides how that turning is read, and for over thirty years nobody had properly measured which spot is best.',
      ja: 'マウスの底には動きを読む小さな目(センサー)がひとつあり、前に付いたマウスも、真ん中も、後ろもあります。手はマウスを押すだけでなく、少しずつ回してもいます。その回りを目がどこで見るかでカーソルは違う道を行くのに、どこが良いのか30年以上誰もきちんと測っていませんでした。',
    },
    work: {
      ko: '연구진은 센서 자리를 마음대로 바꿀 수 있는 마우스를 만들었습니다. 로봇 팔에게 똑같은 ∞를 그리게 해서 자리마다 커서가 얼마나 다른 길을 가는지 재고, 열네 사람에게 일곱 자리를 전부 시켜 보았습니다. 가운데가 가장 나았고(앞·뒤보다 11~14% 빠르고 정확), 사람마다 제일 잘 맞는 자리는 조금씩 달랐습니다.',
      en: 'The authors built mice whose sensor position can be changed at will. A robot arm drew the same ∞ shape so they could measure how the cursor path changes with the spot, and fourteen people tried all seven spots. The middle won — 11–14% better than front or back — and each person’s best spot was slightly different.',
      ja: '研究チームはセンサーの位置を自由に変えられるマウスを作りました。ロボットアームに同じ∞を描かせて位置ごとのカーソルの道の違いを測り、14人に七つの位置を全部試してもらいました。真ん中が一番良く(前や後ろより11〜14%速く正確)、人ごとの最適な位置は少しずつ違いました。',
    },
    took: {
      ko: '앞뒤 두 센서에서 아무 자리의 센서를 흉내 내는 수식과, 로봇의 ∞ 계획, 표에 적힌 수 전부를 가져왔습니다. 그 수식으로 직접 그려 보는 판을 만들어서, 같은 손놀림이 앞·가운데·뒤 센서에서 얼마나 다른 커서가 되는지 눈으로 보게 했습니다.',
      en: 'This page carries the formula that mimics a sensor at any spot from two real ones, the robot’s ∞ plan, and every number printed in the tables. A drawing board runs that formula live, so you can watch one same hand motion become three different cursors — front, middle, back.',
      ja: '前後二つのセンサーから任意の位置のセンサーを真似る式、ロボットの∞計画、表に印刷された数のすべてを持ってきました。その式で実際に描いてみる盤を作り、同じ手の動きが前・真ん中・後ろのセンサーでどれほど違うカーソルになるかを目で見られるようにしました。',
    },
    left: {
      ko: '참가자 열네 명 각각의 곡선(그림 9)과 막대그림의 값은 그림에만 있어 가져오지 않았습니다. 그리는 판에서 마우스가 기우는 규칙은 당신 손을 재는 것이 아니라 로봇 계획의 규칙을 옮긴 것이고, 사람마다 맞는 자리를 찾아 주는 보정 절차도 옮기지 않았습니다.',
      en: 'The fourteen per-person curves (Figure 9) and the bar-chart values live only in figures, so they were not carried. On the drawing board, the tilt rule is the robot plan’s rule — it does not measure your hand — and the hour-long calibration procedure that finds your personal spot was not carried either.',
      ja: '参加者14人それぞれの曲線(図9)と棒グラフの値は図にしかないので持ってきていません。描く盤でマウスが傾く規則はあなたの手を測るものではなくロボット計画の規則を写したもので、人ごとの最適位置を探す較正手順も持ってきていません。',
    },
  },
} as const;

/** 그리는 판의 치수(mm). 로봇의 ∞(24×11cm)가 여유 있게 들어가는 크기다. */
export const PAD = {
  widthMm: 300,
  heightMm: 170,
} as const;

/**
 * 궤적의 색. 매트의 어두운 지면(#12151A) 위에서 줄로 쓰이는 비텍스트 색이다.
 * WCAG 대비비(#12151A 기준): front #FF9D8A 8.2:1, center #ECEFF4 14.9:1,
 * rear #84B9EA 7.6:1, custom(민트, 룩의 강조색) #6FE0CE 10.5:1 - 모두 3:1을 넘는다.
 */
export const TRACE_COLORS = {
  front: '#FF9D8A',
  center: '#ECEFF4',
  rear: '#84B9EA',
  custom: '#6FE0CE',
} as const;

/** 시연의 걸음. 60ms마다 계획 표본 셋씩 - ∞ 한 바퀴(288표본)가 약 6초에 돈다. */
export const DEMO = {
  stepWaitMs: 60,
  samplesPerStep: 3,
} as const;
