export interface FormulaVariation {
  id: string;
  title: string;
  latex: string;
  condition: string;
  note?: string;
  pyqRef?: string;
  status?: 'Verified PYQ' | 'High-Value Variation' | 'Theoretical Boundary';
}

export interface DerivedForm {
  title: string;
  latex: string;
  explanation: string;
}

export interface LimitingCase {
  caseName: string;
  latex: string;
  result: string;
}

export interface MiniArchetype {
  question: string;
  givenData: string;
  solutionSteps: string[];
  finalAnswer: string;
}

export interface FormulaItem {
  id: string;
  category: OpticsCategory;
  title: string;
  primaryLatex: string;
  description: string;
  whenToUse: string;
  variables: { symbol: string; meaning: string }[];
  derivedForms?: DerivedForm[];
  variations: FormulaVariation[];
  questionRecognition: string[];
  ntaTraps: string[];
  limitingCases: LimitingCase[];
  archetype: MiniArchetype;
  pyqFrequency: 'Extreme' | 'Very High' | 'High' | 'Medium';
  recentYears: number[];
  practicalRule: string;
  pyqClassification: 'Verified PYQ' | 'High-Value Variation' | 'Theoretical Boundary';
}

export type OpticsCategory =
  | 'lenses'
  | 'lens_maker_immersion'
  | 'lens_cutting'
  | 'combinations'
  | 'silvered_lenses'
  | 'curved_surfaces'
  | 'plane_refraction_slabs'
  | 'tir_critical_angle'
  | 'prisms_dispersion'
  | 'spherical_mirrors'
  | 'plane_mirrors'
  | 'optical_instruments';

export interface PyqMatrixRow {
  patternId: string;
  topic: string;
  subConcept: string;
  questionConstruction: string;
  typicalData: string;
  formulaRequired: string;
  hiddenClue: string;
  commonTrap: string;
  yearsObserved: string;
  frequency: 'Extreme' | 'Very High' | 'High' | 'Moderate';
  difficulty: 'Easy' | 'Moderate' | 'Tricky' | 'Calculation-Heavy';
  verifiedStatus: 'Verified PYQ' | 'High-Value Variation';
}

export interface TrapItem {
  id: string;
  title: string;
  category: OpticsCategory;
  wrongThinking: string;
  correctRule: string;
  why: string;
  pyqConnection: string;
  dangerLevel: 'Critical' | 'High' | 'Tricky';
}

export interface RecognitionTrigger {
  id: string;
  triggerPhrase: string;
  category: string;
  underlyingPattern: string;
  actionFormula: string;
  pitfallToAvoid: string;
  pyqEvidence: string;
}

export interface GraphKnowledgeItem {
  id: string;
  title: string;
  axes: string;
  latexEquation: string;
  keyPoints: string[];
  asymptotes: string;
  ntaQuestions: string;
  interpretation: string;
}

export interface RapidRevisionItem {
  category: string;
  topic: string;
  latex: string;
  oneLineRule: string;
  mustType: 'RED_MEMORIZE' | 'YELLOW_UNDERSTAND' | 'GREEN_RECOGNIZE';
}

