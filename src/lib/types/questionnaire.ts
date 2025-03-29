
export type TraitId = 'experience' | 'portfolio' | 'activity' | 'risk' | 'technical' | 'defi';
export type ActionType = 'fuck' | 'marry' | 'kill';
export type QuestionType = 'multiple_choice' | 'fuck_marry_kill';
export type TraitDescriptorType = 'risk-taking' | 'portfolio-management' | 'technical-skills';

export interface UserTraits {
  experience?: number;
  portfolio?: number;
  activity?: number;
  risk?: number;
  technical?: number;
  defi?: number;
}

export interface TraitScores {
  [key: string]: number;
}

export interface Answer {
  text: string;
  responses: string[];
  scores: TraitScores;
}

export interface QuestionData {
  id: string;
  type: QuestionType;
  variations: string[];
  answers: Answer[];
}

export interface TraitConfig {
  id: TraitId;
  name: string;
  description: string;
}

export interface Badge {
  id: string;
  name: string;
  condition: string;
  threshold: number;
  associatedQuestions: string[];
}

export interface TraitsConfig {
  traits: TraitConfig[];
  badges: Badge[];
}

export interface FuckMarryKillQuestion {
  id: string;
  type: "fuck_marry_kill";
  variations: string[];
  protocols: string[];
  responsePatterns: {
    fuck: Record<string, string[]>;
    marry: Record<string, string[]>;
    kill: Record<string, string[]>;
  };
  traitImplications: {
    fuck: Record<string, TraitScores>;
    marry: Record<string, TraitScores>;
    kill: Record<string, TraitScores>;
  };
}

export interface Threshold {
  min: number;
  max: number;
}

export interface Classification {
  id: string;
  name: string;
  thresholds: {
    [key in TraitId]: Threshold;
  };
  roastTemplates: string[];
  specificRoasts: string[];
  adjectives: string[];
  nouns: string[];
}

export interface RoastFlow {
  openings: string[];
  reactions: string[];
  midRoastReactions: string[];
  closings: string[];
  traitDescriptors: {
    'risk-taking': string[];
    'portfolio-management': string[];
    'technical-skills': string[];
  };
}

export interface UserResponse {
  questionId: string;
  answerIndex?: number;
  fmkResponses?: {
    protocol: string;
    action: ActionType;
  }[];
  scores?: Partial<Record<TraitId, number>>;
}

export interface RoastResult {
  classificationId: string;
  classificationName: string;
  roastLine: string;
  specificRoasts: string[];
  traits: UserTraits;
  percentageScore: number;
  badges: Badge[];
}
