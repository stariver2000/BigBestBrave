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

`/`(개인정보 지우개)와 `/color`(크로마 랩)는 논문에서 나온 페이지가 아니다.

---

## 다음 차례 (구현 가능하다고 본 것)

위에서부터 만든다. 만들기 전에 저자·DOI를 확인하고, 확인이 안 되면 건너뛰고 그 사실을 여기 적는다.

| # | 논문 | 학회 | 페이지로 옮길 것 |
| --- | --- | --- | --- |
| 1 | Modes of Interaction with Navigation Apps | CHI 2025 | 길찾기를 대하는 여러 방식과 그때 잃는 것 |
| 2 | AReading with Smartphones: Trade-offs between Enhanced Legibility and Display Switching Costs | CHI 2025 | 읽기 쉬움과 시선 옮김의 맞바꿈을 재어 보는 화면 |
| 3 | Big or Small, It's All in Your Head: Visuo-Haptic Illusion of Size-Change Using Finger-Repositioning | CHI 2024 | 보는 것이 만지는 것을 바꾸는 착시를 화면에서 |
| 4 | Effects of Waveform, Time Delay, and Vibration Axis on the Perception of Vibrotactile Compliance Illusions | IJHCI 2024 | 진동만으로 물렁함을 느끼게 하는 조건 |
| 5 | Why I Choose This Sticker When Chatting with You | CSCW 2024 | 무엇을 고르느냐가 관계를 드러내는 화면 |
| 6 | Investigating the Potential of Group Recommendation Systems As a Medium of Social Interactions (Spotify Blend) | CHI 2024 | 두 사람의 취향을 섞을 때 누구의 것이 남는가 |
| 7 | Understanding Users' Dissatisfaction with ChatGPT Responses: Types, Resolving Tactics | IUI 2024 | 불만의 종류를 갈라 보는 화면 |
| 8 | DataDive: Supporting Readers' Contextualization of Statistical Statements with Data Exploration | IUI 2024 | 문장 속 통계를 맥락에 놓아 보는 화면 |
| 9 | A Design Space for Intelligent and Interactive Writing Assistants | CHI 2024 | 설계 공간 자체를 만져 보는 지도 |
| 10 | The Design Space for Online Restorative Justice Tools | CHI 2025 | 갈등을 다루는 방식들의 지도 |
| 11 | Understanding Practical Challenges and Enablers for Embedding Environmental Perspectives in Digital Product Design | CHI 2025 | 화면 하나가 쓰는 자원을 계산해 보는 화면 |
| 12 | Time2Stop: Adaptive and Explainable Human-AI Loop for Smartphone Overuse Intervention | CHI 2024 | 언제 끼어드는 것이 옳은가를 조절해 보는 화면 |

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
