import { CuratedArticle, ModelType, RadarMetrics, TokenHighlight } from '../types';

// Lexicons for simulated NLP Scoring
const SENSATIONAL_WORDS = [
  'breaking', 'shocking', 'confirmed', 'leaked', 'miracle', 'banned', 'exposes', 
  'destroys', 'destroy', 'panicked', 'renegade', 'absolutely', 'insane', 'secret',
  'monopoly', 'urgent', 'now', 'catastrophe', 'immediately', 'nightmare', 'wiped',
  'desperately', 'unbelievable', 'mind-blowing', 'truth', 'silenced', 'refuses'
];

const UNVERIFIED_PHRASES = [
  'whistleblower', 'anonymous', 'secret algorithm', 'offshore', 'telegram', 'leaked document',
  'clandestine', 'hidden agenda', 'corrupt insiders', 'renegade', '100%', 'cures all'
];

const JOURNALISTIC_MARKERS = [
  'reuters', 'associated press', 'ap', 'washington', 'bloomberg', 'fec', 'fda', 'sec',
  'unanimously', 'approved', 'guidelines', 'commission', 'stated', 'mandate', 'statistically',
  'significant', 'randomized', 'double-blind', 'phase 3', 'director', 'emphasized',
  'announced', 'spokesperson', 'according to', 'peer review', 'white paper', 'neurips',
  'representatives', 'memorandum', 'regulation'
];

export function analyzeCustomText(title: string, fullText: string): CuratedArticle {
  const combinedText = (title + " " + fullText).trim();
  const lowerText = combinedText.toLowerCase();

  // 1. Calculate raw lexicon hits
  let sensationalHits = 0;
  let unverifiedHits = 0;
  let journalisticHits = 0;

  const tokens = combinedText.split(/\s+/);
  const tokenHighlights: TokenHighlight[] = [];

  // Count exclamation marks
  const exclamationCount = (combinedText.match(/!/g) || []).length;
  // Count ALL CAPS words (longer than 3 chars)
  const allCapsCount = (combinedText.match(/\b[A-Z]{4,}\b/g) || []).length;

  tokens.forEach(token => {
    const cleanToken = token.toLowerCase().replace(/[^a-z0-9]/g, '');
    if (!cleanToken) return;

    let category: TokenHighlight['category'] = 'neutral';
    let weight = 0;

    // Check Sensationalism
    if (SENSATIONAL_WORDS.includes(cleanToken) || token.includes('!')) {
      category = 'sensationalism';
      weight = -0.6 - Math.random() * 0.35; // -0.6 to -0.95
      sensationalHits++;
    } 
    // Check Unverified Claims
    else if (UNVERIFIED_PHRASES.some(phrase => lowerText.includes(phrase)) && UNVERIFIED_PHRASES.some(p => p.includes(cleanToken))) {
      category = 'unverified_claim';
      weight = -0.4 - Math.random() * 0.3;
      unverifiedHits++;
    }
    // Check Journalistic Authentic Anchors
    else if (JOURNALISTIC_MARKERS.includes(cleanToken) || token.includes('Reuters') || token.includes('AP')) {
      category = 'journalistic';
      weight = 0.5 + Math.random() * 0.45; // +0.5 to +0.95
      journalisticHits++;
    }
    // Capitalized formal entities e.g. names or cities
    else if (/^[A-Z][a-z]+$/.test(token) && cleanToken.length > 4) {
      if (Math.random() > 0.5) {
        category = 'neutral';
        weight = 0.1 + Math.random() * 0.25;
      }
    }

    if (category !== 'neutral' || Math.random() > 0.8) {
      tokenHighlights.push({
        token,
        weight,
        normalizedWeight: weight,
        category
      });
    }
  });

  // If there are very few tokens highlighted, add some defaults
  if (tokenHighlights.length === 0 && tokens.length > 0) {
    tokenHighlights.push({
      token: tokens[0],
      weight: 0.1,
      normalizedWeight: 0.1,
      category: 'neutral'
    });
  }

  // Sort tokens by absolute weight magnitude for top interpretability display
  tokenHighlights.sort((a, b) => Math.abs(b.weight) - Math.abs(a.weight));
  const topTokens = tokenHighlights.slice(0, 14);

  // 2. Compute overall likelihood score (-100 for Fake, +100 for Real)
  const sensationalPenalty = sensationalHits * 15 + exclamationCount * 12 + allCapsCount * 8;
  const journalisticBonus = journalisticHits * 22;
  
  // Base raw score
  const rawScore = journalisticBonus - sensationalPenalty;

  // Decide Ground Truth Label
  const isLikelyFake = rawScore < 0;
  const groundTruthLabel: CuratedArticle['groundTruth'] = isLikelyFake ? 'Fake' : 'Real';

  // 3. Build Radar Metrics
  const metrics: RadarMetrics = {
    sensationalism: Math.min(100, Math.max(5, Math.round((sensationalHits * 18 + exclamationCount * 15) || (isLikelyFake ? 85 : 12)))),
    clickbait: Math.min(100, Math.max(5, Math.round((exclamationCount * 25 + allCapsCount * 15) || (isLikelyFake ? 92 : 8)))),
    subjectivity: Math.min(100, Math.max(10, Math.round((isLikelyFake ? 88 : 22) + Math.random() * 10 - 5))),
    analyticalTone: Math.min(100, Math.max(5, Math.round((isLikelyFake ? 14 : 92) + Math.random() * 10 - 5))),
    entityVerification: Math.min(100, Math.max(2, Math.round((journalisticHits * 25) || (isLikelyFake ? 6 : 96))))
  };

  // 4. Generate Predictions across the 4 models with subtle realistic differences
  const generateModelPred = (baseConf: number, name: ModelType) => {
    let conf = baseConf;
    let label: 'Real' | 'Fake' = isLikelyFake ? 'Fake' : 'Real';

    // TF-IDF PAC is ultra-sensitive to raw clickbait words
    if (name === 'tfidf_pac' && sensationalHits > 1) {
      label = 'Fake';
      conf = Math.min(0.99, conf + 0.04);
    }

    // DistilBERT is highly confident but balanced
    if (name === 'distilbert') {
      conf = Math.min(0.995, Math.max(0.75, conf + (isLikelyFake ? 0.03 : 0.02)));
    }

    // Decision summary rationale
    let summary = '';
    if (label === 'Fake') {
      summary = `The ${name.toUpperCase()} classifier detected high likelihood of misinformation driven by ${sensationalHits} sensational keywords, ${exclamationCount} alarming exclamation marks, and unverified linguistic patterns.`;
    } else {
      summary = `The ${name.toUpperCase()} model identified objective journalistic language, credible agency attribution verbs, and highly verifiable named entities matching standard premium wire news corpora.`;
    }

    return {
      label,
      confidence: Number(conf.toFixed(3)),
      tokens: topTokens,
      metrics,
      decisionSummary: summary,
      suggestedFactChecks: [
        `Google Fact Check: ${title.slice(0, 45)}...`,
        `Snopes search: ${tokens.slice(0, 5).join(' ')}`,
        `Reuters trustworthy source lookup: ${title.slice(0, 35)}`
      ]
    };
  };

  // Base confidence magnitude
  const baseConfidence = Math.min(0.985, Math.max(0.65, 0.5 + Math.abs(rawScore) / 80));

  const predictions: CuratedArticle['predictions'] = {
    distilbert: generateModelPred(baseConfidence, 'distilbert'),
    tfidf_pac: generateModelPred(baseConfidence * 0.98, 'tfidf_pac'),
    tfidf_logreg: generateModelPred(baseConfidence * 0.94, 'tfidf_logreg'),
    word2vec_rf: generateModelPred(baseConfidence * 0.96, 'word2vec_rf')
  };

  return {
    id: `custom-${Date.now()}`,
    title: title || 'Custom Input Analysis',
    fullText: fullText || 'No detailed body text provided.',
    category: 'Technology & AI',
    source: 'Custom User Input',
    date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    groundTruth: groundTruthLabel,
    predictions
  };
}
