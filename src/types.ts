export type NewsCategory = 'Politics & Elections' | 'Health & Medicine' | 'Financial Markets' | 'Technology & AI' | 'Satire & Parody';

export type GroundTruthLabel = 'Real' | 'Fake' | 'Unverified' | 'Satire';

export type ModelType = 'tfidf_logreg' | 'tfidf_pac' | 'word2vec_rf' | 'distilbert';

export interface TokenHighlight {
  token: string;
  weight: number; // Negative for Fake (Red/Orange), Positive for Real (Green)
  normalizedWeight: number; // -1 to 1
  category?: 'sensationalism' | 'journalistic' | 'unverified_claim' | 'emotional' | 'neutral';
}

export interface RadarMetrics {
  sensationalism: number; // 0 to 100
  clickbait: number; // 0 to 100
  subjectivity: number; // 0 to 100
  analyticalTone: number; // 0 to 100
  entityVerification: number; // 0 to 100
}

export interface CuratedArticle {
  id: string;
  title: string;
  fullText: string;
  category: NewsCategory;
  source: string;
  date: string;
  groundTruth: GroundTruthLabel;
  predictions: {
    [key in ModelType]: {
      label: 'Real' | 'Fake';
      confidence: number; // 0 to 1
      tokens: TokenHighlight[];
      metrics: RadarMetrics;
      decisionSummary: string;
      suggestedFactChecks: string[];
    }
  };
}

export interface KaggleDatasetInfo {
  name: string;
  kaggleLink: string;
  description: string;
  totalRecords: number;
  realCount: number;
  fakeCount: number;
  vocabSize: number;
  avgWordsPerArticle: number;
  keyCharacteristics: string[];
  sampleRecords: {
    title: string;
    textExcerpt: string;
    label: GroundTruthLabel;
    domain: string;
    date: string;
  }[];
  topRealKeywords: { word: string; count: number }[];
  topFakeKeywords: { word: string; count: number }[];
}

export interface ModelBenchmark {
  id: ModelType;
  name: string;
  architecture: string;
  parameters: string;
  inferenceTimeMs: number;
  f1Score: number;
  accuracy: number;
  precision: number;
  recall: number;
  rocAuc: number;
  description: string;
  pros: string[];
  cons: string[];
  confusionMatrix: {
    trueRealPredReal: number;
    trueRealPredFake: number;
    trueFakePredReal: number;
    trueFakePredFake: number;
  };
}

export interface QuizQuestion {
  id: string;
  headline: string;
  excerpt: string;
  category: NewsCategory;
  groundTruth: GroundTruthLabel;
  explanation: string;
  aiPrediction: 'Real' | 'Fake';
  aiConfidence: number;
  keySubtlety: string;
}

export type ActiveTab = 'demo' | 'pipeline' | 'dataset' | 'evaluation' | 'quiz' | 'pragmatic' | 'code';
