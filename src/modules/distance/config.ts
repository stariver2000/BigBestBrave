/**
 * 거리 페이지 설정.
 *
 * 근거가 된 연구: Stop Misusing t-SNE and UMAP for Visual Analytics
 * (Hyeon Jeon, Jeongin Park, Sungbok Shin, Jinwook Seo, SNU), IEEE TVCG / VIS 2026.
 * 전문은 연구실이 올려 둔 PDF로 읽었다.
 *
 * 이 페이지가 가져온 것
 *   - 일곱 과제와 두 갈래(찾아내기/따져보기), 그리고 어느 기법 갈래에 맞는가(4.2~4.3절).
 *   - 문헌 훑기의 셈(312 -> 136, 기법 18개, t-SNE 75편, UMAP 31편, 근거 없음 44%).
 *   - 면접의 셈(실무자 12, 전문가 8, 초매개변수를 골라 본 8, 효과 모른 채 고른 4).
 *   - 논문이 스스로 단 단서: 이것은 기법 단위의 거친 판정이며 초매개변수가 크게
 *     좌우하는데, 훑은 논문 거의 전부가 초매개변수를 보고하지 않았다.
 *
 * 가져오지 않은 것
 *   - 그림 3~6의 막대값(연도별 추이, 기법별·과제별 오용 비율). 그림에만 있다.
 *     그래서 이 화면에는 "얼마나 오용되는가"의 비율이 없고, 무엇이 오용인지의 판만 있다.
 *   - 표 1(과제-문헌 대응)과 부록의 사례.
 *
 * 이 페이지가 스스로 더한 것
 *   - 읽기 판. 그림에서 무엇을 읽으려는지 고르면 판정이 나오는 화면 짜임과,
 *     세 무리의 모양 그림. 그림은 자료가 아니라 모양이며 화면에 그렇게 적었다.
 */

export const PAPER = {
  title: 'Stop Misusing t-SNE and UMAP for Visual Analytics',
  authors: 'Hyeon Jeon, Jeongin Park, Sungbok Shin, Jinwook Seo',
  venue: 'IEEE VIS 2026 (TVCG)',
  affiliation: 'SNU',
  link: 'https://hcil.snu.ac.kr/publications',
  fullText: 'hcil.snu.ac.kr/cms/uploads/jeon26tvcg_4d7a76bf28.pdf',
  /**
   * 쉬운 말로. 열두 살이 읽어도 통하는 문장만 쓴다.
   */
  plain: {
    problem: {
      ko: '수백 개의 숫자로 된 자료를 점 그림 하나로 눌러 담는 도구가 있습니다. t-SNE와 UMAP이라고 합니다. 그림이 예뻐서 다들 씁니다. 그런데 그 그림에서 점 무리 사이의 거리를 읽는 사람이 많습니다. 그 거리는 사실 아무 뜻이 없을 때가 많습니다.',
      en: 'There are tools that squeeze data made of hundreds of numbers into a single dot picture. They are called t-SNE and UMAP. The pictures look nice, so everyone uses them. But many people read the distance between dot groups off the picture — and that distance often means nothing.',
      ja: '何百もの数でできた資料をひとつの点の絵に押し込む道具があります。t-SNEとUMAPといいます。絵がきれいなのでみんな使います。ところがその絵から点の群れどうしの距離を読む人が多いのです。その距離には実は意味がないことが多いのです。',
    },
    work: {
      ko: '이 논문은 136편의 논문을 읽고, 연구자 12명과 전문가 8명을 만나서 물었습니다. 이 도구로 해도 되는 일 일곱 가지를 갈랐고, 왜 잘못 쓰는지(도구를 잘 모르고, 남들이 쓰니까 쓰고, 그림이 예쁠 때까지 설정을 만지작거려서)를 밝혔습니다.',
      en: 'The authors read 136 papers and interviewed 12 researchers and 8 experts. They sorted out seven things people do with these tools, which ones the tools are actually good for, and why misuse happens: people do not know the tools well, use them because everyone else does, and fiddle with settings until the picture looks nice.',
      ja: '著者らは136編の論文を読み、研究者12名と専門家8名に会って尋ねました。この道具でやってよい仕事七つを仕分け、なぜ誤って使うのか(道具をよく知らない、みんなが使うから使う、絵がきれいになるまで設定をいじる)を明らかにしました。',
    },
    took: {
      ko: '이 페이지는 그 일곱 가지 일의 목록과 판정을 그대로 가져왔습니다. 이웃 찾기·무리 찾기·튀는 점 찾기는 됩니다. 무리 사이 거리·촘촘함·나뉨새 따지기는 안 됩니다. 읽고 싶은 것을 고르면 판정이 나옵니다.',
      en: 'This page carries that list of seven jobs and the verdicts as they are. Finding neighbors, finding groups, finding outliers: fine. Judging distances between groups, their density, how separated they are: not fine. Pick what you want to read and get the verdict.',
      ja: 'このページはその七つの仕事の一覧と判定をそのまま持ってきました。近くの点を探す・群れを探す・外れた点を探すのは大丈夫。群れどうしの距離・密度・分かれ具合を測るのは駄目。読みたいものを選ぶと判定が出ます。',
    },
    left: {
      ko: '어느 비율로 오용되는지는 그림에만 있어 가져오지 않았습니다. 점 무리 그림은 자료가 아니라 모양이고, 판정이 기법 단위의 거친 것이라는 논문의 단서도 그대로 실었습니다.',
      en: 'How often each misuse happens lives only in figures and was not carried. The dot-group drawing is a shape, not data, and the paper caveat — that this verdict is coarse and settings matter — is carried as well.',
      ja: 'どの割合で誤用されるかは図にしかなく、持ってきていません。点の群れの絵は資料ではなく形で、この判定は道具単位の粗いものだという論文の但し書きもそのまま載せました。',
    },
  },
} as const;

/** 모양 그림의 크기(px). */
export const SKETCH = { width: 320, height: 200 } as const;

/** 세 무리의 자리와 크기. 자료가 아니라 그림의 배치다. */
export const BLOBS = [
  { cx: 80, cy: 70, rx: 42, ry: 30 },
  { cx: 225, cy: 55, rx: 38, ry: 26 },
  { cx: 175, cy: 150, rx: 46, ry: 28 },
] as const;
