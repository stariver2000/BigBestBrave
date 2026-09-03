# 논문 풀

페이지의 주제는 여기서 고른다. 목록은 각 연구실이 스스로 공개한 발표 목록에서 옮겨 왔다.
- KAIST HCI: <https://hci.kaist.ac.kr/publications/>, <https://hci.kaist.ac.kr/chi-2025/>
- 서울대 HCIL: <https://hcil.snu.ac.kr/publications>

**제목과 학회만 여기 적어 둔다.** 저자와 DOI는 그 논문으로 페이지를 만들 때 그때 확인한다.
기억에 의존해 인용하지 않기 위해서다(AGENTS.md와 ARCHITECTURE.md 8장).

## 고르는 기준

1. **브라우저 안에서 결정론적으로 돌아갈 것.** 모델 가중치·서버·전용 기기가 필요하면 고르지 않는다.
2. 알고리즘 논문이면 방법을, 질적 연구면 **연구가 놓은 조건**을 옮긴다.
3. 무엇을 가져왔고 무엇을 가져오지 않았는지 페이지에 밝힌다.
4. **논문이 무슨 말을 하려는 것인지 쉬운 말로 적는다.** 열두 살이 읽어도 통하는 문장만 쓴다.
   `config.ts`의 `PAPER.plain`에 네 줄(걸렸던 것 · 연구가 한 일 · 가져온 것 · 가져오지 않은 것)을
   ko/en/ja로 두고, 화면은 `PaperCard`가 같은 자리에 그린다.
   빠뜨리면 `tests/modules/paper-plain.test.ts`가 먼저 깨진다.

---

## 완료

| 페이지 | 논문 | 학회 |
| --- | --- | --- |
| `/subtitle` | OptiSub: Optimizing Video Subtitle Presentation for Varied Display and Font Sizes via Speech Pause-Driven Chunking | CHI 2025 |
| `/projection` | Unveiling High-dimensional Backstage: A Survey for Reliable Visual Analytics with Dimensionality Reduction | CHI 2025 (SNU) |
| `/beeper` | Back to the 1990s, BeeperRedux!: Revisiting Retro Technology to Reflect Communication Quality and Experience in the Digital Age | CHI 2025 |
| `/rhythm` | Birds of a Rhythm: The Effects of Haptic Pattern Similarity on People's Social Perceptions in Virtual Reality | CHI 2025 |
| `/thing` | Living Alongside Areca: Exploring Human Experiences with Things Expressing Thoughts and Emotions | CHI 2025 |
| `/mist` | Sprayable Sound: Exploring the Experiential and Design Potential of Physically Spraying Sound Interaction | CHI 2025 |
| `/chart` | Automated Pipeline for Detecting and Analyzing Misleading Visual Elements | PacificVis 2025 (SNU) |
| `/checkup` | Understanding and Improving User Adoption and Security Awareness in Password Checkup Services | CHI 2025 (SKKU·KAIST·Samsung) |
| `/rulers` | Metric Design != Metric Behavior: Improving Metric Selection for the Unbiased Evaluation of Dimensionality Reduction | IEEE VIS 2025 (SNU) |
| `/reach` | Cross, Dwell, or Pinch: Designing and Evaluating Around-Device Selection Methods for Unmodified Smartwatches | CHI 2025 (KAIST) |
| `/window` | Less Talk, More Trust: Understanding Players' In-game Assessment of Communication Processes in League of Legends | CHI 2025 (KAIST) |
| `/nudge` | Like Adding a Small Weight to a Scale About to Tip: Personalizing Micro-Financial Incentives for Digital Wellbeing | CHI 2025 (KAIST) |
| `/whatif` | CounterStress: Enhancing Stress Coping Planning through Counterfactual Explanations in Personal Informatics | CHI 2025 (KAIST) |
| `/peer` | Peerspective: A Study on Reciprocal Tracking for Self-awareness and Relational Insight | CHI 2025 (KAIST) |
| `/route` | Modes of Interaction with Navigation Apps | CHI 2025 (KAIST) |
| `/reading` | AReading with Smartphones: Trade-offs between Enhanced Legibility and Display Switching Costs | CHI 2025 (KAIST) · 전문을 못 구해 초록의 짜임만 옮김 |
| `/grip` | Big or Small, It's All in Your Head: Visuo-Haptic Illusion of Size-Change Using Finger-Repositioning | CHI 2024 (KAIST·MSR) |
| `/soften` | Effects of Waveform, Time Delay, and Vibration Axis on the Perception of Vibrotactile Compliance Illusions | IJHCI 2024 (KAIST) · 유료라 초록의 짜임만 옮김 |
| `/again` | Understanding Users' Dissatisfaction with ChatGPT Responses: Types, Resolving Tactics, and the Effect of Knowledge Level | IUI 2024 (KAIST·SNU·KDI) |
| `/context` | DataDive: Supporting Readers' Contextualization of Statistical Statements with Data Exploration | IUI 2024 (KAIST·HCMUT·SUTD) |
| `/space` | A Design Space for Intelligent and Interactive Writing Assistants | CHI 2024 (36인 공동 연구) |
| `/repair` | The Design Space for Online Restorative Justice Tools: A Case Study with ApoloBot | CHI 2025 (KAIST) |
| `/moment` | Time2Stop: Adaptive and Explainable Human-AI Loop for Smartphone Overuse Intervention | CHI 2024 (KAIST·Tsinghua·CMU·MIT·UW) |
| `/channel` | Revisiting Channel Effectiveness: A Multi-Dimensional Evaluation with Primitive Visual Stimuli | IEEE VIS 2026 (SNU) |
| `/distance` | Stop Misusing t-SNE and UMAP for Visual Analytics | IEEE VIS 2026 (SNU) |
| `/hidden` | GhostUI: Unveiling Hidden Interactions in Mobile UI | CHI 2026 (SNU) |
| `/fence` | Good Fences Make Good Learning: How Self-Directed Language Learners Navigate LLM Delegation Decisions | CHI 2026 (SNU) |
| `/whisper` | Chillbot: Content Moderation in the Backchannel | CSCW 2024 (KAIST·Stanford) |
| `/script` | Beyond Instructions: A Taxonomy of Information Types in How-to Videos | CHI 2023 (KAIST) |
| `/figure` | A Scoping Review on How HCI Researchers Visualize Results of Thematic Analysis | CHI EA 2026 (SNU·KAIST·RIT) |
| `/mouse` | Optimal Sensor Position for a Computer Mouse | CHI 2020 (Aalto·KAIST·DGIST) |
| `/hooks` | HookLens: Visual Analytics for Understanding React Hooks Structures | PacificVis 2026 (SNU) |
| `/brush` | Distortion-aware Brushing for Reliable Cluster Analysis in Multidimensional Projections | IEEE TVCG 2026 (SNU·QCRI·Oklahoma) |
| `/focus` | Towards More Explainable Nonlinear Dimensionality Reduction: A Feature-Driven Interaction Approach | IEEE TVCG 2026 (SNU) |

`/`(개인정보 지우개)와 `/color`(크로마 랩)는 논문에서 나온 페이지가 아니다.

---

## 다음 차례 (구현 가능하다고 본 것)

위에서부터 만든다. 만들기 전에 저자·DOI를 확인하고, 확인이 안 되면 건너뛰고 그 사실을 여기 적는다.

| # | 논문 | 학회 | 페이지로 옮길 것 |
| --- | --- | --- | --- |
| 5 | Readability vs. Faithfulness: Unveiling Correlations between Graph Aesthetics and DR Quality | EuroVis 2026 GDxDR (SNU) | 보기 좋음과 충실함의 상관 |
| 6 | DirectVis: Editing Code-Based Interactive Visualization with Direct Manipulation | PacificVis 2026 (SNU) | 코드 시각화를 손으로 고치기 |

2026-09-02에 서울대 HCIL 목록에서 다시 채웠다(헤드리스 크롬으로 열어야 한다).
같은 날 KAIST HCI 발표 목록(hci.kaist.ac.kr)은 학교 보안 정책 페이지가 떠서 열리지
않았다. 우회하지 않는다 - KAIST 것은 다음에 목록이 열리거나 OpenAlex로 조회해 고른다.
KIXLAB 논문은 연구실 사이트(kixlab.github.io/website-files/...)가 PDF를 직접 올려 두어
전문 걱정이 없다. /script의 Beyond Instructions도 거기서 받았다.

## 건너뛴 것

저자와 DOI까지 확인했지만 화면으로 옮길 알맹이를 구하지 못해 건너뛴 것이다.
나중에 전문을 구하면 다시 집는다.

- `Why I Choose This Sticker When Chatting with You` (CSCW 2024,
  Gahyeon Bae, Daehyun Kwak, Youn-kyung Lim, KAIST, doi:10.1145/3687063).
  CC-BY로 열려 있으나 유일한 소장처인 ACM DL이 봇 검사로 막혀 있어 전문을 구하지 못했다
  (Unpaywall과 OpenAlex 모두 다른 소장처가 없다고 답한다). 초록은 "세 가지 공통된
  고려사항을 밝혔다"까지만 말하고 그 셋이 무엇인지 밝히지 않는다. 그 셋을 내가 지어내면
  논문에서 나온 페이지가 아니라 논문 이름을 빌린 페이지가 되므로 건너뛴다.
- `Investigating the Potential of Group Recommendation Systems As a Medium of Social
  Interactions` (CHI 2024, Daehyun Kwak, Soobin Park, Inha Cha, Hankyung Kim,
  Youn-kyung Lim, KAIST, doi:10.1145/3613904.3642544). 같은 이유다.
- `Understanding Practical Challenges and Enablers for Embedding Environmental
  Perspectives in Digital Product Design and Development` (CHI 2025, Minha Lee,
  Soyeong Min, Gahyeon Kim, Sangsu Lee, KAIST, doi:10.1145/3706598.3713144).
  같은 이유다. CC-BY인데 소장처가 ACM뿐이고, 여덟 실무자 면접의 질적 연구인데
  초록이 "복잡한 도전과 동기 유발 요인"이라고 이름만 말하고 내용을 밝히지 않는다. 초록은 "암묵적인
  사회적 상호작용"까지만 말하고 그 설계 속성을 밝히지 않는다. 집단 추천의 계산 방법
  (평균, 최소 불행, 보르다)은 이 논문이 아니라 그 분야의 일반적인 것이라, 그것으로
  페이지를 만들면 이 논문의 것이 아닌 것을 이 논문의 것처럼 적게 된다.

## 전문을 못 구한 것

아래는 저자·학회·DOI는 확인했지만 전문 PDF를 구하지 못한 것이다. 초록에 밝혀진 짜임까지만
옮기고, 화면의 수치가 논문에서 온 것이 아님을 그 페이지에 적어 두었다.

- `AReading with Smartphones` (CHI 2025) -> `/reading`
- `Effects of Waveform, Time Delay, and Vibration Axis...` (IJHCI 2024) -> `/soften`
  (저자는 Semantic Scholar API로 확인했다. 웹 검색만으로는 저자 이름이 나오지 않았다.)

`/again`은 반대의 경우다. arXiv에 전문이 있어 표 여섯 개를 끝까지 읽고 옮겼고,
논문이 적어 둔 카이제곱 검정값으로 옮겨 적기가 옳았는지 되짚어 확인했다.

## 어렵다고 본 것

전용 기기·VR·모델 가중치가 필요해 이 사이트의 조건(연산 예산 0, 로컬 실행)에 맞지 않는다.
나중에 조건이 바뀌면 다시 본다.

- 착용형·기기: BudsID, T2IRay, PinchCatcher, QuadStretcher, EStatiG, Palmrest+, Pro-Tact, STButton, SpatIO, VibWalk
- VR/AR: Juggling Extra Limbs, ChoreoCraft, Quantifying Social Connection in VR, Augmented Narrative Spaces, Comfortable Mobility vs. Attractive Scenery
- 생성 모델 필요: HapticGen, AMUSE, Proxona, TeachTune, ExploreSelf, PlanTogether, AACessTalk, ShamAIn, Into the Unknown, Think Together and Work Better, Reimagining Personal Data, Exploring Modular Prompt Design, VideoMix, ExpressEdit, DynamicLabels, User Experience of LLM-based Recommendation
- 센서·자료 수집: DataSentry, Looking but Not Focusing, Toolkit Design for Camera Sensor-Driven DIY Smart Homes, What If Smart Homes Could See Our Homes
- 제작·출력: 3D Printing Locally Activated Visual-Displays, Reconfigurable Interfaces by Shape Change
- 외부 자료 필요: Generating Highlight Videos using Most Replayed Data

## 보류

`ShamAIn: Designing Superior Conversational AI Inspired by Shamanism` (CHI 2025)은
코어(`src/core/oracle/`)까지 만들어 두고 화면을 만들지 않았다. 언어모델 없이 결정론적으로
점사를 짓는 방식이라 만들 수 있다. 다시 집을 때 그 코어에서 이어 간다.
