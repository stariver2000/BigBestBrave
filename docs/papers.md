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

`/`(개인정보 지우개)와 `/color`(크로마 랩)는 논문에서 나온 페이지가 아니다.

---

## 다음 차례 (구현 가능하다고 본 것)

위에서부터 만든다. 만들기 전에 저자·DOI를 확인하고, 확인이 안 되면 건너뛰고 그 사실을 여기 적는다.

| # | 논문 | 학회 | 페이지로 옮길 것 |
| --- | --- | --- | --- |
| 1 | The Design Space for Online Restorative Justice Tools | CHI 2025 | 갈등을 다루는 방식들의 지도 |
| 2 | Understanding Practical Challenges and Enablers for Embedding Environmental Perspectives in Digital Product Design | CHI 2025 | 화면 하나가 쓰는 자원을 계산해 보는 화면 |
| 3 | Time2Stop: Adaptive and Explainable Human-AI Loop for Smartphone Overuse Intervention | CHI 2024 | 언제 끼어드는 것이 옳은가를 조절해 보는 화면 |

arXiv에 전문이 있는 것: 1번(2502.18861), 3번(doi:10.1145/3613904.3642747).
2번은 arXiv 제목 검색으로 나오지 않았다.

전문을 구하는 길이 arXiv만은 아니다. `/context`의 DataDive는 저자 한 사람의 개인
페이지에 PDF가 있었다. `/space`는 arXiv에 전문이 있었고, 분류표는 저자들이 따로 공개한
자료(writing-assistant.github.io)에서 가져왔다. 논문이 함께 낸 자료가 있으면 그쪽이
정본이다 - 산문은 코드 이름을 풀어 써서 뭉갠다.

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
  Youn-kyung Lim, KAIST, doi:10.1145/3613904.3642544). 같은 이유다. 초록은 "암묵적인
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
