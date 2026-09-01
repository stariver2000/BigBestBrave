/**
 * CHI 2024 글쓰기 보조 설계 공간의 분류표.
 *
 * 근거: Mina Lee, Katy Ilonka Gero, John Joon Young Chung 외 30인.
 * "A Design Space for Intelligent and Interactive Writing Assistants." CHI '24.
 * doi:10.1145/3613904.3642697, arXiv:2403.14117v2
 *
 * 분류표는 저자들이 스스로 공개한 자료(writing-assistant.github.io)의 거르개 목록에서
 * 옮겼다. 논문의 표 1~7이 같은 것을 산문으로 적어 두었으므로 두 곳을 맞대어 보았다.
 * 산문 쪽에서는 코드 이름이 뭉개진다 - 이를테면 '제2언어 글쓰기'라고 풀어 쓴 것이
 * 실제 코드 이름으로는 Translation이다. 그래서 저자들의 자료 쪽을 정본으로 삼았다.
 *
 * 가져오지 않은 것: 그림 4와 그림 5의 막대값. 어느 차원에 논문이 몇 편인지는 그림에만
 * 실려 있어, 자로 읽어낸 값은 논문의 수치가 아니다. 대신 5.2절이 문장으로 밝힌 것만
 * UNDER_REPRESENTED와 UNDER_EXPLORED에 담았다.
 *
 * 부호와 방향: 이 파일에 크고 작음을 재는 값은 없다. 있는 것은 이름과 소속뿐이다.
 */

export type AspectId = 'task' | 'user' | 'technology' | 'interaction' | 'ecosystem';

export interface Dimension {
  id: string;
  aspect: AspectId;
  /** 저자들의 자료에 적힌 이름 그대로다. */
  label: string;
  /** 그 차원이 가질 수 있는 값. 논문은 이것을 코드(code)라 부른다. */
  codes: readonly string[];
}

export const ASPECTS: readonly AspectId[] = ['task', 'user', 'technology', 'interaction', 'ecosystem'];

export const DIMENSIONS: readonly Dimension[] = [
  // Task (과제) - 5개 차원
  { id: 'writing-stage', aspect: 'task', label: "Writing Stage", codes: ['Drafting', 'Idea generation', 'Planning', 'Revision', 'Other'] },
  { id: 'writing-context', aspect: 'task', label: "Writing Context", codes: ['Academic', 'Creative', 'Journalistic', 'Personal', 'Professional', 'Technical', 'Other'] },
  { id: 'purpose', aspect: 'task', label: "Purpose", codes: ['Accessibility', 'Analytical', 'Descriptive', 'Educational', 'Entertainment', 'Expository', 'Feedback', 'Narrative', 'Persuasive', 'Translation', 'Other'] },
  { id: 'specificity', aspect: 'task', label: "Specificity", codes: ['Detailed Requirements', 'General Direction', 'Nonspecific', 'Specific Objectives'] },
  { id: 'audience', aspect: 'task', label: "Audience", codes: ['Implied', 'Specified', 'Other'] },
  // User (사용자) - 8개 차원
  { id: 'demographic-profile-design', aspect: 'user', label: "Demographic Profile - Design", codes: ['Age', 'Education', 'Gender', 'Language & culture', 'Profession', 'Race', 'Socioeconomic status', 'Other'] },
  { id: 'demographic-profile-evaluation', aspect: 'user', label: "Demographic Profile - Evaluation", codes: ['Age', 'Education', 'Gender', 'Language & culture', 'Profession', 'Socioeconomic status', 'Other'] },
  { id: 'system-output-preferences-design', aspect: 'user', label: "System Output Preferences - Design", codes: ['Bias', 'Explainability', 'Personalization', 'Textual coherence', 'Textual diversity', 'Other'] },
  { id: 'system-output-preferences-evaluation', aspect: 'user', label: "System Output Preferences - Evaluation", codes: ['Bias', 'Explainability', 'Personalization', 'Textual coherence', 'Textual diversity', 'Other'] },
  { id: 'relationship-to-system-design', aspect: 'user', label: "Relationship to System - Design", codes: ['Agency', 'Availability', 'Integrity', 'Ownership', 'Privacy', 'Transparency', 'Trust', 'Other'] },
  { id: 'relationship-to-system-evaluation', aspect: 'user', label: "Relationship to System - Evaluation", codes: ['Agency', 'Availability', 'Ownership', 'Privacy', 'Transparency', 'Trust', 'Other'] },
  { id: 'user-capabilities-design', aspect: 'user', label: "User Capabilities - Design", codes: ['Cognition', 'Confidence', 'Creativity', 'Efficiency', 'Emotion', 'Empathy', 'Neurodiversity', 'Writing expertise', 'Other'] },
  { id: 'user-capabilities-evaluation', aspect: 'user', label: "User Capabilities - Evaluation", codes: ['Cognition', 'Confidence', 'Creativity', 'Efficiency', 'Emotion', 'Empathy', 'Neurodiversity', 'Technical proficiency', 'Writing expertise', 'Other'] },
  // Technology (기술) - 10개 차원
  { id: 'data-source', aspect: 'technology', label: "Data - Source", codes: ['Authors', 'Crowdworker', 'Expert', 'Machine', 'User', 'Other'] },
  { id: 'data-size', aspect: 'technology', label: "Data - Size", codes: ['Extremely large (>1M)', 'Large (<1M)', 'Medium (<10k)', 'Small (<100)', 'Unknown'] },
  { id: 'model-type', aspect: 'technology', label: "Model - Type", codes: ['Deep neural network', 'Foundation model', 'Rule-based model', 'Statistical ML model', 'Other'] },
  { id: 'model-external-resource-access', aspect: 'technology', label: "Model - External Resource Access", codes: ['Data', 'Tool', 'Other'] },
  { id: 'learning-problem', aspect: 'technology', label: "Learning - Problem", codes: ['Classification', 'Generation', 'Regression', 'Retrieval', 'Rewriting', 'Structured prediction'] },
  { id: 'learning-algorithm', aspect: 'technology', label: "Learning - Algorithm", codes: ['Reinforcement learning', 'Self-supervised learning', 'Supervised learning', 'Unsupervised learning'] },
  { id: 'learning-training-and-adaptation', aspect: 'technology', label: "Learning - Training and Adaptation", codes: ['Fine-tuning', 'Prompt Engineering', 'Training from scratch', 'Tuning decoding parameters', 'Other'] },
  { id: 'evaluation-evaluator', aspect: 'technology', label: "Evaluation - Evaluator", codes: ['Automatic evaluation', 'Human evaluation', 'Human-machine evaluation', 'Machine-learned evaluation'] },
  { id: 'evaluation-focus', aspect: 'technology', label: "Evaluation - Focus", codes: ['Controllability', 'Ethics', 'Linguistic quality', 'Style & adequacy', 'Other'] },
  { id: 'scalability', aspect: 'technology', label: "Scalability", codes: ['Cost', 'Latency'] },
  // Interaction (상호작용) - 10개 차원
  { id: 'user-steering-the-system', aspect: 'interaction', label: "User - Steering the System", codes: ['Explicit', 'Implicit', 'No control', 'Other'] },
  { id: 'user-integrating-system-output', aspect: 'interaction', label: "User - Integrating System Output", codes: ['Editing', 'Inspiration', 'No integration', 'Selection', 'Other'] },
  { id: 'ui-interface-paradigm', aspect: 'interaction', label: "UI - Interface Paradigm", codes: ['Chatbot', 'Text editor', 'Other'] },
  { id: 'ui-layout', aspect: 'interaction', label: "UI - Layout", codes: ['Custom', 'Input UI', 'Separated', 'Writing area', 'Other'] },
  { id: 'ui-visual-differentiation', aspect: 'interaction', label: "UI - Visual Differentiation", codes: ['Formatting', 'Location', 'Media type', 'None'] },
  { id: 'ui-interaction-metaphor', aspect: 'interaction', label: "UI - Interaction Metaphor", codes: ['Agent', 'Hybrid', 'Tool', 'Other'] },
  { id: 'ui-initiation', aspect: 'interaction', label: "UI - Initiation", codes: ['System-initiated', 'User-initiated', 'Other'] },
  { id: 'system-output-type', aspect: 'interaction', label: "System - Output Type", codes: ['Analysis', 'Generation', 'Proposal', 'Other'] },
  { id: 'system-curation-type', aspect: 'interaction', label: "System - Curation Type", codes: ['Curated', 'Customized', 'Deterministic', 'Model'] },
  { id: 'system-user-data-access', aspect: 'interaction', label: "System - User Data Access", codes: ['Additional data', 'Input text', 'Other'] },
  // Ecosystem (생태계) - 6개 차원
  { id: 'digital-infrastructure', aspect: 'ecosystem', label: "Digital Infrastructure", codes: ['Technical interoperability', 'Usability consistency'] },
  { id: 'social-factors', aspect: 'ecosystem', label: "Social Factors", codes: ['Designing for social writing', 'Designing with stakeholders', 'Other'] },
  { id: 'locale', aspect: 'ecosystem', label: "Locale", codes: ['Local writing', 'Remote writing', 'Other'] },
  { id: 'access-model', aspect: 'ecosystem', label: "Access Model", codes: ['Commercial software', 'Free and open-source software', 'Other'] },
  { id: 'norms-rules', aspect: 'ecosystem', label: "Norms & Rules", codes: ['Conventions', 'Laws', 'Other'] },
  { id: 'change-over-time', aspect: 'ecosystem', label: "Change Over Time", codes: ['Authors', 'Information environment', 'Readers', 'Regulation', 'Technologies', 'Writing', 'Other'] },
];

/**
 * 5.2절이 문장으로 밝힌, 논문 무리가 적게 다룬 차원.
 * 그림 5의 막대값을 읽어서 고른 것이 아니라, 저자들이 본문에 이름을 적어 둔 것만 담았다.
 *   "we see audience is under-represented compared to the other task dimensions"
 *   "Scalability is quite under-represented, overall as well as relative to other technology dimensions"
 *   "most ecosystem dimensions are, as previously noted, under-represented"
 */
export const UNDER_REPRESENTED: readonly string[] = [
  'audience',
  'scalability',
  'digital-infrastructure',
  'social-factors',
  'locale',
  'access-model',
  'norms-rules',
  'change-over-time',
];

/**
 * 5.2절이 이름까지 짚은 코드.
 *
 * 기반 모델을 쓴 논문은 2020년 1편에서 2023년 13편으로 늘었는데, 그와 함께 늘었어야 할
 * 것들이 늘지 않았다고 저자들이 적었다 - 신뢰와 투명성에 대한 사용자의 걱정,
 * 제어 가능성과 윤리에 대한 기술적 평가.
 * 여기 적은 코드 이름이 실제 분류표에 있는지 시험이 확인한다.
 */
export const UNDER_EXPLORED: readonly { dimension: string; code: string }[] = [
  { dimension: 'relationship-to-system-design', code: 'Trust' },
  { dimension: 'relationship-to-system-design', code: 'Transparency' },
  { dimension: 'relationship-to-system-evaluation', code: 'Trust' },
  { dimension: 'relationship-to-system-evaluation', code: 'Transparency' },
  { dimension: 'evaluation-focus', code: 'Controllability' },
  { dimension: 'evaluation-focus', code: 'Ethics' },
];

/**
 * 기반 모델을 쓴 논문 수. 5.2절의 문장에서 옮겼다.
 * "we see 13 papers with this code in 2023 versus 1 in 2020 in our corpus"
 */
export const FOUNDATION_MODEL_PAPERS: Readonly<Record<number, number>> = { 2020: 1, 2023: 13 };

/** 논문이 훑은 자료의 크기. 초록과 3.3절에서 옮겼다. */
export const CORPUS = {
  /** 분류표를 만들 때 체계적으로 읽은 논문 수. */
  reviewed: 115,
  /** 저자 수. 논문이 "large community collaboration"이라 부른 것의 크기다. */
  authors: 36,
  aspects: 5,
} as const;
