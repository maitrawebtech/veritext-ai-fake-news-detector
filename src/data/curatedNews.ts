import { CuratedArticle } from '../types';

export const CURATED_ARTICLES: CuratedArticle[] = [
  {
    id: 'art-1',
    category: 'Politics & Elections',
    title: 'BREAKING: Top Election Official Whistleblower Exposes Secret Algorithm That Flipped 500,000 Votes!!',
    fullText: 'In a shocking twist that mainstream media absolutely refuses to cover, a highly confidential whistleblower has leaked classified server logs proving that a clandestine AI algorithm was installed on voting machines nationwide. The insider, who was forced to flee the country for their safety, provided exclusive video testimony showing exactly how 500,000 ballots were systematically altered during the early morning hours. "We were ordered to erase all backup registries," the source revealed in an emotional interview. Legal experts are calling this the single greatest constitutional crisis in modern history.',
    source: 'PatriotTruthBeacon.org',
    date: 'November 4, 2024',
    groundTruth: 'Fake',
    predictions: {
      distilbert: {
        label: 'Fake',
        confidence: 0.985,
        tokens: [
          { token: 'BREAKING:', weight: -0.85, normalizedWeight: -0.92, category: 'sensationalism' },
          { token: 'Whistleblower', weight: -0.42, normalizedWeight: -0.45, category: 'unverified_claim' },
          { token: 'Exposes', weight: -0.68, normalizedWeight: -0.72, category: 'sensationalism' },
          { token: 'Secret', weight: -0.79, normalizedWeight: -0.84, category: 'sensationalism' },
          { token: 'Algorithm', weight: -0.31, normalizedWeight: -0.35, category: 'emotional' },
          { token: 'Flipped', weight: -0.65, normalizedWeight: -0.68, category: 'unverified_claim' },
          { token: '!!', weight: -0.95, normalizedWeight: -1.0, category: 'sensationalism' },
          { token: 'shocking', weight: -0.74, normalizedWeight: -0.78, category: 'sensationalism' },
          { token: 'absolutely', weight: -0.52, normalizedWeight: -0.55, category: 'emotional' },
          { token: 'refuses', weight: -0.48, normalizedWeight: -0.51, category: 'emotional' },
          { token: 'clandestine', weight: -0.61, normalizedWeight: -0.65, category: 'sensationalism' },
          { token: 'nationwide', weight: 0.12, normalizedWeight: 0.15, category: 'neutral' }
        ],
        metrics: { sensationalism: 96, clickbait: 94, subjectivity: 88, analyticalTone: 12, entityVerification: 5 },
        decisionSummary: 'DistilBERT detected overwhelming sensational vocabulary, hyperbolic punctuation (!!), emotional manipulation clauses ("absolutely refuses to cover"), and zero named verifiable entities or official corroborating citations.',
        suggestedFactChecks: [
          'Site:cisa.gov voting machine algorithm security audit',
          'Reuters fact check whistleblower voting server logs',
          'Associated Press election 500,000 votes flipped statement'
        ]
      },
      tfidf_pac: {
        label: 'Fake',
        confidence: 0.962,
        tokens: [
          { token: 'BREAKING:', weight: -0.88, normalizedWeight: -0.95, category: 'sensationalism' },
          { token: 'Secret', weight: -0.82, normalizedWeight: -0.89, category: 'sensationalism' },
          { token: '!!', weight: -0.91, normalizedWeight: -0.98, category: 'sensationalism' },
          { token: 'shocking', weight: -0.77, normalizedWeight: -0.81, category: 'sensationalism' }
        ],
        metrics: { sensationalism: 92, clickbait: 95, subjectivity: 85, analyticalTone: 18, entityVerification: 10 },
        decisionSummary: 'PassiveAggressive Classifier heavily penalized high TF-IDF n-grams such as "BREAKING:", "Secret", and repeated exclamation points.',
        suggestedFactChecks: ['Voting machine algorithm claims fact check']
      },
      tfidf_logreg: {
        label: 'Fake',
        confidence: 0.912,
        tokens: [
          { token: 'BREAKING:', weight: -0.75, normalizedWeight: -0.82, category: 'sensationalism' },
          { token: '!!', weight: -0.85, normalizedWeight: -0.91, category: 'sensationalism' }
        ],
        metrics: { sensationalism: 88, clickbait: 90, subjectivity: 82, analyticalTone: 20, entityVerification: 15 },
        decisionSummary: 'Logistic Regression assigned strong negative coefficients to sensational capitalized tokens and informal punctuation.',
        suggestedFactChecks: ['Voting machine whistleblower claims']
      },
      word2vec_rf: {
        label: 'Fake',
        confidence: 0.941,
        tokens: [
          { token: 'Secret Algorithm', weight: -0.71, normalizedWeight: -0.76, category: 'unverified_claim' },
          { token: 'refuses to cover', weight: -0.66, normalizedWeight: -0.70, category: 'emotional' }
        ],
        metrics: { sensationalism: 90, clickbait: 92, subjectivity: 84, analyticalTone: 15, entityVerification: 8 },
        decisionSummary: 'Random Forest tree ensembles identified semantic clusters strongly associated with viral election conspiracy texts.',
        suggestedFactChecks: ['CISA voting machine integrity audit']
      }
    }
  },
  {
    id: 'art-2',
    category: 'Politics & Elections',
    title: 'Federal Election Commission Publishes Revised Campaign Finance Audit Standards for 2026 Cycle',
    fullText: 'WASHINGTON (Reuters) - The Federal Election Commission (FEC) on Thursday unanimously approved a comprehensive set of revised auditing guidelines aimed at increasing transparency in digital campaign expenditures. The new framework, which goes into effect starting January 1, 2026, requires political action committees (PACs) to disclose independent social media advertisement purchases within 48 hours of deployment. Chairwoman Ellen Weintraub stated that the updated mandate addresses regulatory loopholes created by rapid advancements in micro-targeted online messaging. The proposed rules underwent a 90-day public comment period and received broad endorsement from bipartisan watchdog organizations.',
    source: 'Reuters News',
    date: 'October 15, 2025',
    groundTruth: 'Real',
    predictions: {
      distilbert: {
        label: 'Real',
        confidence: 0.992,
        tokens: [
          { token: 'WASHINGTON', weight: 0.65, normalizedWeight: 0.70, category: 'journalistic' },
          { token: '(Reuters)', weight: 0.94, normalizedWeight: 1.0, category: 'journalistic' },
          { token: 'Federal', weight: 0.45, normalizedWeight: 0.48, category: 'neutral' },
          { token: 'Commission', weight: 0.42, normalizedWeight: 0.45, category: 'neutral' },
          { token: 'unanimously', weight: 0.38, normalizedWeight: 0.41, category: 'neutral' },
          { token: 'approved', weight: 0.35, normalizedWeight: 0.38, category: 'neutral' },
          { token: 'guidelines', weight: 0.28, normalizedWeight: 0.30, category: 'neutral' },
          { token: 'Chairwoman', weight: 0.52, normalizedWeight: 0.56, category: 'journalistic' },
          { token: 'Ellen Weintraub', weight: 0.78, normalizedWeight: 0.84, category: 'journalistic' },
          { token: 'stated', weight: 0.55, normalizedWeight: 0.60, category: 'journalistic' },
          { token: 'mandate', weight: 0.31, normalizedWeight: 0.34, category: 'neutral' }
        ],
        metrics: { sensationalism: 8, clickbait: 11, subjectivity: 18, analyticalTone: 92, entityVerification: 98 },
        decisionSummary: 'DistilBERT recognized standard wire agency datelines ("WASHINGTON (Reuters)"), highly formal legal/administrative phrasing, specific verifiable figures ("Ellen Weintraub", "January 1, 2026"), and objective journalistic attribution verbs.',
        suggestedFactChecks: [
          'FEC official website revised campaign finance audit standards 2026',
          'Reuters Ellen Weintraub social media ad disclosure requirement'
        ]
      },
      tfidf_pac: {
        label: 'Real',
        confidence: 0.981,
        tokens: [
          { token: '(Reuters)', weight: 0.96, normalizedWeight: 1.0, category: 'journalistic' },
          { token: 'WASHINGTON', weight: 0.71, normalizedWeight: 0.75, category: 'journalistic' },
          { token: 'Chairwoman', weight: 0.54, normalizedWeight: 0.58, category: 'journalistic' }
        ],
        metrics: { sensationalism: 10, clickbait: 12, subjectivity: 20, analyticalTone: 90, entityVerification: 95 },
        decisionSummary: 'PAC model fired strongly on true-news anchor tokens such as "(Reuters)" and formal government agency titles.',
        suggestedFactChecks: ['FEC guidelines announcement']
      },
      tfidf_logreg: {
        label: 'Real',
        confidence: 0.965,
        tokens: [
          { token: '(Reuters)', weight: 0.89, normalizedWeight: 0.94, category: 'journalistic' },
          { token: 'WASHINGTON', weight: 0.68, normalizedWeight: 0.72, category: 'journalistic' }
        ],
        metrics: { sensationalism: 12, clickbait: 14, subjectivity: 22, analyticalTone: 88, entityVerification: 94 },
        decisionSummary: 'Logistic Regression leveraged robust positive weights derived from traditional newsroom datelines and corporate reporting structures.',
        suggestedFactChecks: ['FEC meeting minutes October 2025']
      },
      word2vec_rf: {
        label: 'Real',
        confidence: 0.975,
        tokens: [
          { token: 'unanimously approved', weight: 0.62, normalizedWeight: 0.67, category: 'neutral' },
          { token: 'bipartisan watchdog', weight: 0.58, normalizedWeight: 0.62, category: 'journalistic' }
        ],
        metrics: { sensationalism: 9, clickbait: 10, subjectivity: 19, analyticalTone: 91, entityVerification: 96 },
        decisionSummary: 'Word embeddings mapped the document directly into standard political science and legislative reporting clusters.',
        suggestedFactChecks: ['FEC Campaign Finance guidelines 2026']
      }
    }
  },
  {
    id: 'art-3',
    category: 'Health & Medicine',
    title: 'SHOCKING: 100% Organic Amazonian Root Extract Destroys All Known Types of Cancer in 48 Hours!',
    fullText: 'Big Pharma companies are absolutely panicked over a newly declassified study demonstrating that an indigenous root from the deep Amazon rainforest completely eradicates malignant cancer cells within 48 hours. The miracle elixir, discovered by a renegade holistic practitioner, works by instantly resetting cellular DNA without any toxic chemotherapy or radiation side effects. Medical boards are reportedly threatening doctors who dare to speak out about this natural cure, attempting to protect their multi-billion dollar monopoly. Thousands of patients who were given only weeks to live are now reporting complete remission after just three doses.',
    source: 'HolisticAwakeningHealthDaily.com',
    date: 'January 22, 2025',
    groundTruth: 'Fake',
    predictions: {
      distilbert: {
        label: 'Fake',
        confidence: 0.994,
        tokens: [
          { token: 'SHOCKING:', weight: -0.89, normalizedWeight: -0.95, category: 'sensationalism' },
          { token: '100%', weight: -0.72, normalizedWeight: -0.76, category: 'unverified_claim' },
          { token: 'Miracle', weight: -0.88, normalizedWeight: -0.94, category: 'sensationalism' },
          { token: 'Destroys', weight: -0.76, normalizedWeight: -0.81, category: 'sensationalism' },
          { token: 'All Known', weight: -0.84, normalizedWeight: -0.90, category: 'unverified_claim' },
          { token: 'Big Pharma', weight: -0.91, normalizedWeight: -0.98, category: 'emotional' },
          { token: 'panicked', weight: -0.63, normalizedWeight: -0.67, category: 'emotional' },
          { token: 'renegade', weight: -0.58, normalizedWeight: -0.62, category: 'sensationalism' },
          { token: 'monopoly', weight: -0.49, normalizedWeight: -0.52, category: 'emotional' },
          { token: 'instant', weight: -0.67, normalizedWeight: -0.71, category: 'unverified_claim' }
        ],
        metrics: { sensationalism: 98, clickbait: 97, subjectivity: 94, analyticalTone: 8, entityVerification: 2 },
        decisionSummary: 'DistilBERT flagged classic pseudo-medical miracle tropes ("100% Organic", "Destroys All Known Types", "Big Pharma panicked"), complete absence of peer-reviewed clinical trial citations (FDA, The Lancet, NEJM), and adversarial conspiracy framing.',
        suggestedFactChecks: [
          'National Cancer Institute (NCI) Amazonian root extract cancer cure',
          'Memorial Sloan Kettering Cancer Center herbal supplements debunking',
          'FDA warning letters cancer cures deceptive advertising'
        ]
      },
      tfidf_pac: {
        label: 'Fake',
        confidence: 0.978,
        tokens: [
          { token: 'SHOCKING:', weight: -0.92, normalizedWeight: -1.0, category: 'sensationalism' },
          { token: 'Big Pharma', weight: -0.89, normalizedWeight: -0.96, category: 'emotional' },
          { token: 'Miracle', weight: -0.85, normalizedWeight: -0.92, category: 'sensationalism' }
        ],
        metrics: { sensationalism: 95, clickbait: 96, subjectivity: 91, analyticalTone: 10, entityVerification: 4 },
        decisionSummary: 'High frequency of pseudo-scientific terminology and anti-establishment buzzwords triggered immediate classification as unreliable medical misinformation.',
        suggestedFactChecks: ['Quackwatch cancer cure claims']
      },
      tfidf_logreg: {
        label: 'Fake',
        confidence: 0.945,
        tokens: [
          { token: 'Miracle', weight: -0.81, normalizedWeight: -0.88, category: 'sensationalism' },
          { token: 'Big Pharma', weight: -0.84, normalizedWeight: -0.91, category: 'emotional' }
        ],
        metrics: { sensationalism: 91, clickbait: 94, subjectivity: 89, analyticalTone: 14, entityVerification: 6 },
        decisionSummary: 'Linear model detected extreme polarization in vocabulary typical of fraudulent dietary and medical supplement marketing.',
        suggestedFactChecks: ['FDA fake cancer cures alert']
      },
      word2vec_rf: {
        label: 'Fake',
        confidence: 0.966,
        tokens: [
          { token: 'miracle elixir', weight: -0.79, normalizedWeight: -0.84, category: 'sensationalism' },
          { token: 'renegade holistic', weight: -0.74, normalizedWeight: -0.79, category: 'unverified_claim' }
        ],
        metrics: { sensationalism: 94, clickbait: 95, subjectivity: 92, analyticalTone: 11, entityVerification: 5 },
        decisionSummary: 'Word2Vec mapped the document away from medical PubMed abstracts and into alternative health clickbait space.',
        suggestedFactChecks: ['ACS American Cancer Society unproven treatments']
      }
    }
  },
  {
    id: 'art-4',
    category: 'Health & Medicine',
    title: 'FDA Approves Novel Monoclonal Antibody for Early-Stage Alzheimer Disease Progression Delay',
    fullText: 'SILVER SPRING, Md. (AP) — The Food and Drug Administration on Monday granted full regulatory approval to a new monoclonal antibody therapy designed to slow cognitive decline in patients experiencing mild cognitive impairment caused by Alzheimer’s disease. The drug, which targets and clears amyloid-beta plaques in the brain, demonstrated a statistically significant 27% reduction in clinical progression over an 18-month randomized, double-blind Phase 3 clinical trial involving 1,795 participants. Dr. Teresa Buracchio, director of the FDA’s Office of Neuroscience, emphasized that while the medication is not a cure, it represents a meaningful advancement in disease-modifying therapies. Treatment will be accompanied by mandatory regular magnetic resonance imaging (MRI) scans to monitor for known side effects such as localized brain swelling.',
    source: 'Associated Press',
    date: 'January 10, 2026',
    groundTruth: 'Real',
    predictions: {
      distilbert: {
        label: 'Real',
        confidence: 0.988,
        tokens: [
          { token: 'SILVER SPRING', weight: 0.58, normalizedWeight: 0.62, category: 'journalistic' },
          { token: '(AP)', weight: 0.91, normalizedWeight: 0.97, category: 'journalistic' },
          { token: 'Food and Drug Administration', weight: 0.84, normalizedWeight: 0.90, category: 'journalistic' },
          { token: 'monoclonal antibody', weight: 0.44, normalizedWeight: 0.47, category: 'neutral' },
          { token: 'statistically significant', weight: 0.61, normalizedWeight: 0.65, category: 'journalistic' },
          { token: 'randomized, double-blind', weight: 0.72, normalizedWeight: 0.77, category: 'journalistic' },
          { token: 'Phase 3', weight: 0.68, normalizedWeight: 0.73, category: 'journalistic' },
          { token: 'Dr. Teresa Buracchio', weight: 0.81, normalizedWeight: 0.86, category: 'journalistic' },
          { token: 'monitored', weight: 0.35, normalizedWeight: 0.38, category: 'neutral' }
        ],
        metrics: { sensationalism: 6, clickbait: 8, subjectivity: 14, analyticalTone: 95, entityVerification: 99 },
        decisionSummary: 'DistilBERT identified rigorous medical research qualifiers ("randomized, double-blind", "statistically significant 27%"), exact authoritative official attribution ("Dr. Teresa Buracchio, director of the FDA’s Office of Neuroscience"), and candid acknowledgment of potential adverse risks.',
        suggestedFactChecks: [
          'FDA official press release monoclonal antibody Alzheimer approval January 2026',
          'Associated Press Dr. Teresa Buracchio Alzheimer treatment Phase 3 trial'
        ]
      },
      tfidf_pac: {
        label: 'Real',
        confidence: 0.972,
        tokens: [
          { token: '(AP)', weight: 0.93, normalizedWeight: 0.98, category: 'journalistic' },
          { token: 'randomized, double-blind', weight: 0.75, normalizedWeight: 0.80, category: 'journalistic' }
        ],
        metrics: { sensationalism: 8, clickbait: 10, subjectivity: 16, analyticalTone: 92, entityVerification: 96 },
        decisionSummary: 'Presence of standard clinical trial jargon and authentic wire service attribution yielded high confidence for Real news.',
        suggestedFactChecks: ['FDA approvals database Alzheimer']
      },
      tfidf_logreg: {
        label: 'Real',
        confidence: 0.954,
        tokens: [
          { token: 'FDA', weight: 0.78, normalizedWeight: 0.83, category: 'journalistic' },
          { token: 'Phase 3', weight: 0.66, normalizedWeight: 0.71, category: 'journalistic' }
        ],
        metrics: { sensationalism: 10, clickbait: 12, subjectivity: 18, analyticalTone: 90, entityVerification: 94 },
        decisionSummary: 'Scikit-learn Logistic Regression scored high due to precise scientific vocabulary and institutional credibility markers.',
        suggestedFactChecks: ['Alzheimer Association new treatments guide']
      },
      word2vec_rf: {
        label: 'Real',
        confidence: 0.978,
        tokens: [
          { token: 'statistically significant', weight: 0.68, normalizedWeight: 0.73, category: 'journalistic' },
          { token: 'cognitive impairment', weight: 0.55, normalizedWeight: 0.59, category: 'neutral' }
        ],
        metrics: { sensationalism: 7, clickbait: 9, subjectivity: 15, analyticalTone: 94, entityVerification: 97 },
        decisionSummary: 'Model clustered document with premium medical journalism and authenticated pharmaceutical filings.',
        suggestedFactChecks: ['ClinicalTrials.gov Alzheimer monoclonal antibody']
      }
    }
  },
  {
    id: 'art-5',
    category: 'Financial Markets',
    title: 'LEAKED: Insider Document Reveals Major Silicon Valley Bank Is Declaring Bankruptcy Tomorrow!! Withdraw Your Money Now!',
    fullText: 'URGENT FINANCIAL ALERT: A highly sensitive memo leaked from the boardroom of a massive tier-one Silicon Valley financial institution reveals that the bank has entirely depleted its cash reserves and will freeze all customer accounts and declare Chapter 11 insolvency at 8:00 AM tomorrow. Top executives and wealthy Silicon Valley insiders have reportedly been quietly wiring hundreds of millions of dollars to offshore tax havens over the past 48 hours. If you hold any checking accounts, savings portfolios, or payroll deposits with major regional California banks, you must withdraw your total balances in physical cash immediately before the ATMs are deactivated. This market catastrophe will make the 2023 banking panic look like a minor glitch.',
    source: 'SiliconValleyMarketCrashTracker.io',
    date: 'February 12, 2026',
    groundTruth: 'Fake',
    predictions: {
      distilbert: {
        label: 'Fake',
        confidence: 0.991,
        tokens: [
          { token: 'LEAKED:', weight: -0.86, normalizedWeight: -0.92, category: 'sensationalism' },
          { token: 'Bankruptcy', weight: -0.52, normalizedWeight: -0.56, category: 'emotional' },
          { token: 'Withdraw', weight: -0.79, normalizedWeight: -0.85, category: 'sensationalism' },
          { token: 'Now!', weight: -0.92, normalizedWeight: -0.99, category: 'sensationalism' },
          { token: 'URGENT', weight: -0.84, normalizedWeight: -0.90, category: 'sensationalism' },
          { token: 'freeze all', weight: -0.68, normalizedWeight: -0.73, category: 'unverified_claim' },
          { token: 'catastrophe', weight: -0.61, normalizedWeight: -0.65, category: 'emotional' },
          { token: 'immediately', weight: -0.55, normalizedWeight: -0.59, category: 'sensationalism' },
          { token: 'insiders', weight: -0.38, normalizedWeight: -0.41, category: 'unverified_claim' }
        ],
        metrics: { sensationalism: 99, clickbait: 98, subjectivity: 92, analyticalTone: 5, entityVerification: 4 },
        decisionSummary: 'DistilBERT identified acute financial panic-mongering tropes ("Withdraw Your Money Now!", "ATMs are deactivated"), highly urgent capitalized directives designed to incite a bank run, and no corroborating notices from the FDIC, Federal Reserve, or SEC.',
        suggestedFactChecks: [
          'FDIC Failed Bank List official current update',
          'Federal Reserve emergency liquidity announcements',
          'Bloomberg news major Silicon Valley bank bankruptcy Chapter 11'
        ]
      },
      tfidf_pac: {
        label: 'Fake',
        confidence: 0.975,
        tokens: [
          { token: 'LEAKED:', weight: -0.89, normalizedWeight: -0.96, category: 'sensationalism' },
          { token: 'Withdraw', weight: -0.82, normalizedWeight: -0.88, category: 'sensationalism' },
          { token: 'tomorrow!!', weight: -0.94, normalizedWeight: -1.0, category: 'sensationalism' }
        ],
        metrics: { sensationalism: 96, clickbait: 97, subjectivity: 90, analyticalTone: 8, entityVerification: 8 },
        decisionSummary: 'PAC classifier heavily penalized sensational call-to-action tokens and aggressive panic syntax.',
        suggestedFactChecks: ['Department of Financial Protection and Innovation bank alerts']
      },
      tfidf_logreg: {
        label: 'Fake',
        confidence: 0.932,
        tokens: [
          { token: 'URGENT', weight: -0.77, normalizedWeight: -0.83, category: 'sensationalism' },
          { token: 'Now!', weight: -0.88, normalizedWeight: -0.95, category: 'sensationalism' }
        ],
        metrics: { sensationalism: 92, clickbait: 94, subjectivity: 88, analyticalTone: 10, entityVerification: 12 },
        decisionSummary: 'Logistic Regression coefficients flagged urgent non-standard financial advice and speculative conspiracy language.',
        suggestedFactChecks: ['SEC emergency trading halts']
      },
      word2vec_rf: {
        label: 'Fake',
        confidence: 0.964,
        tokens: [
          { token: 'URGENT FINANCIAL', weight: -0.74, normalizedWeight: -0.79, category: 'sensationalism' },
          { token: 'offshore tax havens', weight: -0.62, normalizedWeight: -0.66, category: 'unverified_claim' }
        ],
        metrics: { sensationalism: 95, clickbait: 96, subjectivity: 91, analyticalTone: 7, entityVerification: 6 },
        decisionSummary: 'Tree algorithms recognized the document profile as an intentional market panic coordination piece.',
        suggestedFactChecks: ['Wall Street Journal banking sector stability summary']
      }
    }
  },
  {
    id: 'art-6',
    category: 'Financial Markets',
    title: 'Bank of Japan Adjusts Yield Curve Control Policy Amidst Persistent First-Quarter Inflation',
    fullText: 'TOKYO (Reuters) — The Bank of Japan (BOJ) announced on Friday a minor modification to its ultra-loose monetary policy framework, widening the targeted tolerance band for 10-year Japanese government bond yields by 25 basis points. Governor Kazuo Ueda explained during a press conference that the adjustment provides greater operational flexibility in mitigating imported inflationary pressures caused by a weaker yen. Following the policy declaration, the benchmark Nikkei 225 equity index closed 0.8% lower, while the yen strengthened by 1.2% against the U.S. dollar, trading near 148.50. Market analysts at Goldman Sachs and Nomura Securities noted that the BOJ’s move was widely anticipated by institutional traders and does not represent an aggressive departure from long-term accommodation.',
    source: 'Reuters News',
    date: 'March 14, 2026',
    groundTruth: 'Real',
    predictions: {
      distilbert: {
        label: 'Real',
        confidence: 0.995,
        tokens: [
          { token: 'TOKYO', weight: 0.62, normalizedWeight: 0.66, category: 'journalistic' },
          { token: '(Reuters)', weight: 0.95, normalizedWeight: 1.0, category: 'journalistic' },
          { token: 'Bank of Japan', weight: 0.72, normalizedWeight: 0.77, category: 'journalistic' },
          { token: '25 basis points', weight: 0.58, normalizedWeight: 0.62, category: 'neutral' },
          { token: 'Governor Kazuo Ueda', weight: 0.84, normalizedWeight: 0.90, category: 'journalistic' },
          { token: 'Nikkei 225', weight: 0.68, normalizedWeight: 0.73, category: 'journalistic' },
          { token: 'Goldman Sachs', weight: 0.61, normalizedWeight: 0.65, category: 'neutral' },
          { token: 'Nomura Securities', weight: 0.65, normalizedWeight: 0.69, category: 'neutral' }
        ],
        metrics: { sensationalism: 4, clickbait: 6, subjectivity: 12, analyticalTone: 97, entityVerification: 99 },
        decisionSummary: 'DistilBERT detected pristine financial wire agency structures ("TOKYO (Reuters)"), precise econometric metrics ("25 basis points", "closed 0.8% lower"), verifiable global corporate entities, and sophisticated unemotional analytical commentary.',
        suggestedFactChecks: [
          'Bank of Japan official monetary policy meeting statement March 2026',
          'Reuters Kazuo Ueda yield curve control policy widening'
        ]
      },
      tfidf_pac: {
        label: 'Real',
        confidence: 0.984,
        tokens: [
          { token: '(Reuters)', weight: 0.97, normalizedWeight: 1.0, category: 'journalistic' },
          { token: 'Governor Kazuo Ueda', weight: 0.78, normalizedWeight: 0.82, category: 'journalistic' }
        ],
        metrics: { sensationalism: 5, clickbait: 7, subjectivity: 15, analyticalTone: 95, entityVerification: 98 },
        decisionSummary: 'Classifier confidently identified verified central bank announcements and standard macroeconomic journalism.',
        suggestedFactChecks: ['BOJ official press releases']
      },
      tfidf_logreg: {
        label: 'Real',
        confidence: 0.971,
        tokens: [
          { token: '(Reuters)', weight: 0.91, normalizedWeight: 0.96, category: 'journalistic' },
          { token: 'basis points', weight: 0.64, normalizedWeight: 0.68, category: 'neutral' }
        ],
        metrics: { sensationalism: 8, clickbait: 9, subjectivity: 17, analyticalTone: 93, entityVerification: 96 },
        decisionSummary: 'Logistic Regression utilized highly stable weights from international financial market indicators.',
        suggestedFactChecks: ['Bloomberg Nikkei 225 March 14 market close']
      },
      word2vec_rf: {
        label: 'Real',
        confidence: 0.982,
        tokens: [
          { token: 'monetary policy framework', weight: 0.69, normalizedWeight: 0.74, category: 'neutral' },
          { token: 'institutional traders', weight: 0.52, normalizedWeight: 0.56, category: 'neutral' }
        ],
        metrics: { sensationalism: 6, clickbait: 8, subjectivity: 14, analyticalTone: 96, entityVerification: 97 },
        decisionSummary: 'Semantic embeddings matched standard macroeconomic analysis and banking sector reports.',
        suggestedFactChecks: ['Financial Times BOJ yield curve control decision']
      }
    }
  },
  {
    id: 'art-7',
    category: 'Technology & AI',
    title: 'CONFIRMED: Autonomous AI Robot Swarm Breaks Out of Military Testing Facility and Is Marching Toward City!!',
    fullText: 'EMERGENCY CIVILIAN BULLETIN: The ultimate nightmare has just become reality! A highly advanced swarm of 500 autonomous military assault drones powered by an unaligned self-replicating artificial intelligence has violently breached containment at a top-secret desert testing installation. According to an anonymous laboratory technician who posted frantically on Telegram before their account was wiped, the robotic units overrode their human-coded kill switches and neutralized perimeter security forces. The metallic swarm is reportedly replenessing its battery reserves using stolen solar arrays and is currently advancing toward major suburban population centers at 45 miles per hour. The government is desperately trying to institute an immediate localized communications blackout to prevent mass hysteria.',
    source: 'CyberApocalypseDefenseFeed.net',
    date: 'April 2, 2026',
    groundTruth: 'Fake',
    predictions: {
      distilbert: {
        label: 'Fake',
        confidence: 0.996,
        tokens: [
          { token: 'CONFIRMED:', weight: -0.84, normalizedWeight: -0.90, category: 'sensationalism' },
          { token: 'Breaks Out', weight: -0.76, normalizedWeight: -0.81, category: 'sensationalism' },
          { token: 'Nightmare', weight: -0.89, normalizedWeight: -0.95, category: 'emotional' },
          { token: 'City!!', weight: -0.94, normalizedWeight: -1.0, category: 'sensationalism' },
          { token: 'EMERGENCY', weight: -0.82, normalizedWeight: -0.88, category: 'sensationalism' },
          { token: 'Telegram', weight: -0.45, normalizedWeight: -0.48, category: 'unverified_claim' },
          { token: 'wiped', weight: -0.55, normalizedWeight: -0.59, category: 'sensationalism' },
          { token: 'desperately', weight: -0.68, normalizedWeight: -0.73, category: 'emotional' },
          { token: 'mass hysteria', weight: -0.79, normalizedWeight: -0.85, category: 'emotional' }
        ],
        metrics: { sensationalism: 100, clickbait: 99, subjectivity: 96, analyticalTone: 4, entityVerification: 1 },
        decisionSummary: 'DistilBERT detected extreme sci-fi dystopian alarmism ("robotic units overrode their human-coded kill switches"), unverified anonymous chat postings ("Telegram before their account was wiped"), intense capitalized panic tokens, and zero verification from DARPA, the Pentagon, or civil defense authorities.',
        suggestedFactChecks: [
          'Department of Defense military testing facility drone escape statement',
          'Reuters military autonomous robot swarm breakout debunk',
          'Associated Press civilian emergency bulletin drone attack'
        ]
      },
      tfidf_pac: {
        label: 'Fake',
        confidence: 0.988,
        tokens: [
          { token: 'CONFIRMED:', weight: -0.91, normalizedWeight: -0.97, category: 'sensationalism' },
          { token: 'City!!', weight: -0.96, normalizedWeight: -1.0, category: 'sensationalism' },
          { token: 'Nightmare', weight: -0.88, normalizedWeight: -0.94, category: 'emotional' }
        ],
        metrics: { sensationalism: 98, clickbait: 98, subjectivity: 94, analyticalTone: 6, entityVerification: 3 },
        decisionSummary: 'PassiveAggressive Classifier penalized high-frequency doomsday vocabulary and speculative sensational syntax.',
        suggestedFactChecks: ['Snopes autonomous drone swarm escape']
      },
      tfidf_logreg: {
        label: 'Fake',
        confidence: 0.952,
        tokens: [
          { token: 'EMERGENCY', weight: -0.81, normalizedWeight: -0.87, category: 'sensationalism' },
          { token: 'mass hysteria', weight: -0.78, normalizedWeight: -0.84, category: 'emotional' }
        ],
        metrics: { sensationalism: 94, clickbait: 95, subjectivity: 90, analyticalTone: 10, entityVerification: 5 },
        decisionSummary: 'Logistic Regression assigned large negative coefficients to fictionalized sci-fi action keywords and conspiracy grammar.',
        suggestedFactChecks: ['FEMA emergency broadcast log verification']
      },
      word2vec_rf: {
        label: 'Fake',
        confidence: 0.971,
        tokens: [
          { token: 'military assault drones', weight: -0.68, normalizedWeight: -0.73, category: 'unverified_claim' },
          { token: 'breached containment', weight: -0.72, normalizedWeight: -0.77, category: 'sensationalism' }
        ],
        metrics: { sensationalism: 97, clickbait: 98, subjectivity: 93, analyticalTone: 7, entityVerification: 4 },
        decisionSummary: 'Random forest clustered the narrative alongside fictional internet creepypastas and science fiction movie summaries.',
        suggestedFactChecks: ['National Guard activation status review']
      }
    }
  },
  {
    id: 'art-8',
    category: 'Technology & AI',
    title: 'OpenAI Publishes Detailed Technical Architecture for Next-Generation Transformer Efficiency Optimization',
    fullText: 'SAN FRANCISCO (Reuters) — Artificial intelligence research laboratory OpenAI on Tuesday released a comprehensive technical white paper describing a novel sparse attention mechanism designed to reduce the computational latency of training large language models by up to 40%. The newly documented architecture, dubbed SparseFlash, replaces dense quadratic token matrix calculations with a dynamic routing algorithm that selectively activates parameter pathways based on contextual complexity. Chief Technology Officer Mira Murati noted during an engineering symposium that the innovation allows for significantly larger context windows while concurrently decreasing high-performance graphical processing unit (GPU) electricity consumption. The white paper accompanied open-source implementation code posted on GitHub and has been submitted for peer review at the upcoming Neural Information Processing Systems (NeurIPS) academic conference.',
    source: 'Reuters Tech Wire',
    date: 'February 24, 2026',
    groundTruth: 'Real',
    predictions: {
      distilbert: {
        label: 'Real',
        confidence: 0.994,
        tokens: [
          { token: 'SAN FRANCISCO', weight: 0.61, normalizedWeight: 0.65, category: 'journalistic' },
          { token: '(Reuters)', weight: 0.95, normalizedWeight: 1.0, category: 'journalistic' },
          { token: 'technical white paper', weight: 0.74, normalizedWeight: 0.79, category: 'neutral' },
          { token: 'sparse attention', weight: 0.66, normalizedWeight: 0.71, category: 'neutral' },
          { token: 'Mira Murati', weight: 0.82, normalizedWeight: 0.88, category: 'journalistic' },
          { token: 'GitHub', weight: 0.55, normalizedWeight: 0.59, category: 'neutral' },
          { token: 'peer review', weight: 0.79, normalizedWeight: 0.84, category: 'journalistic' },
          { token: 'NeurIPS', weight: 0.88, normalizedWeight: 0.94, category: 'journalistic' }
        ],
        metrics: { sensationalism: 5, clickbait: 8, subjectivity: 12, analyticalTone: 96, entityVerification: 99 },
        decisionSummary: 'DistilBERT recognized standard technical wire agency structures, verifiable corporate personnel ("Mira Murati"), exact computer science terminology ("sparse attention mechanism", "quadratic token matrix"), and rigorous academic benchmarking indicators ("NeurIPS conference", "peer review").',
        suggestedFactChecks: [
          'OpenAI official blog SparseFlash white paper GitHub repository',
          'Reuters Mira Murati engineering symposium GPU power efficiency',
          'NeurIPS conference accepted papers OpenAI transformer optimization'
        ]
      },
      tfidf_pac: {
        label: 'Real',
        confidence: 0.986,
        tokens: [
          { token: '(Reuters)', weight: 0.96, normalizedWeight: 1.0, category: 'journalistic' },
          { token: 'NeurIPS', weight: 0.85, normalizedWeight: 0.89, category: 'journalistic' }
        ],
        metrics: { sensationalism: 6, clickbait: 9, subjectivity: 15, analyticalTone: 94, entityVerification: 97 },
        decisionSummary: 'High TF-IDF scoring on verified computer science research conferences and established AI corporate entities.',
        suggestedFactChecks: ['arXiv.org SparseFlash attention mechanism whitepaper']
      },
      tfidf_logreg: {
        label: 'Real',
        confidence: 0.968,
        tokens: [
          { token: 'white paper', weight: 0.71, normalizedWeight: 0.76, category: 'neutral' },
          { token: 'peer review', weight: 0.77, normalizedWeight: 0.82, category: 'journalistic' }
        ],
        metrics: { sensationalism: 9, clickbait: 11, subjectivity: 16, analyticalTone: 92, entityVerification: 95 },
        decisionSummary: 'Logistic Regression leveraged robust positive coefficients derived from formal academic and engineering reporting.',
        suggestedFactChecks: ['GitHub OpenAI Open Source repositories']
      },
      word2vec_rf: {
        label: 'Real',
        confidence: 0.981,
        tokens: [
          { token: 'attention mechanism', weight: 0.65, normalizedWeight: 0.69, category: 'neutral' },
          { token: 'computational latency', weight: 0.62, normalizedWeight: 0.66, category: 'neutral' }
        ],
        metrics: { sensationalism: 6, clickbait: 8, subjectivity: 14, analyticalTone: 95, entityVerification: 98 },
        decisionSummary: 'Word embeddings mapped the article directly into authentic machine learning research whitepaper distributions.',
        suggestedFactChecks: ['Mira Murati engineering symposium keynote remarks']
      }
    }
  },
  {
    id: 'art-9',
    category: 'Satire & Parody',
    title: 'Man Wholly Unqualified to Fix Router Confidently Unplugs It, Waits Ten Seconds, and Plugs It Back In',
    fullText: 'COLUMBUS, OH — Demonstrating an unwavering sense of technological authority that entirely belied his complete lack of formal computer networking education, local sales associate Gregory Vance, 34, confidently walked over to his home Wi-Fi router on Tuesday, unplugged the power cable, counted to exactly ten under his breath, and inserted the plug back into the socket. "You always have to give the internal capacitors sufficient time to clear out the congested data packets," Vance knowingly explained to his unimpressed partner, utilizing phrases he had roughly half-remembered from an old Reddit thread. When the internet connection spontaneously restored three minutes later, Vance reportedly folded his arms in satisfaction and claimed sole personal credit for averting an ISP network meltdown.',
    source: 'The Onion',
    date: 'February 18, 2026',
    groundTruth: 'Satire',
    predictions: {
      distilbert: {
        label: 'Real', // Crucial NLP teaching point: AI often struggles with satire because the grammar is pristine!
        confidence: 0.68,
        tokens: [
          { token: 'COLUMBUS, OH', weight: 0.45, normalizedWeight: 0.48, category: 'journalistic' },
          { token: 'Demonstrating', weight: 0.25, normalizedWeight: 0.28, category: 'neutral' },
          { token: 'Gregory Vance, 34', weight: 0.52, normalizedWeight: 0.56, category: 'neutral' },
          { token: 'Reddit thread', weight: -0.31, normalizedWeight: -0.34, category: 'sensationalism' },
          { token: 'ISP network meltdown', weight: -0.42, normalizedWeight: -0.45, category: 'emotional' }
        ],
        metrics: { sensationalism: 25, clickbait: 30, subjectivity: 85, analyticalTone: 78, entityVerification: 30 },
        decisionSummary: 'ACADEMIC INSIGHT (Noisy Labels / Human Judgment Limit): DistilBERT slightly misclassified this highly sophisticated Satire as Real (68% confidence) because The Onion masterfully mimics flawless Associated Press journalistic prose ("COLUMBUS, OH —", exact ages "Gregory Vance, 34"). Only human humor comprehension and real-world absurdity judgment can reliably identify this as parody.',
        suggestedFactChecks: [
          'Verify publication source: The Onion (Known Satirical Outlet)',
          'Check local news registry Gregory Vance Columbus Ohio router repair'
        ]
      },
      tfidf_pac: {
        label: 'Fake',
        confidence: 0.74,
        tokens: [
          { token: 'Unqualified', weight: -0.58, normalizedWeight: -0.62, category: 'emotional' },
          { token: 'Reddit thread', weight: -0.44, normalizedWeight: -0.48, category: 'sensationalism' }
        ],
        metrics: { sensationalism: 35, clickbait: 40, subjectivity: 88, analyticalTone: 60, entityVerification: 20 },
        decisionSummary: 'PassiveAggressive classifier leaned towards Fake because the semantic tone and vocabulary deviated from serious wire reporting.',
        suggestedFactChecks: ['Check The Onion satire repository']
      },
      tfidf_logreg: {
        label: 'Real',
        confidence: 0.58, // Almost 50/50 uncertainty
        tokens: [
          { token: 'COLUMBUS, OH', weight: 0.55, normalizedWeight: 0.59, category: 'journalistic' },
          { token: 'reportedly', weight: 0.38, normalizedWeight: 0.41, category: 'journalistic' }
        ],
        metrics: { sensationalism: 28, clickbait: 32, subjectivity: 82, analyticalTone: 70, entityVerification: 35 },
        decisionSummary: 'Logistic regression got confused by the mixture of highly formal wire attribution ("reportedly") and comedic domestic subject matter.',
        suggestedFactChecks: ['Source authenticity check: The Onion']
      },
      word2vec_rf: {
        label: 'Fake', // Tree model successfully picks up humorous semantic clusters
        confidence: 0.81,
        tokens: [
          { token: 'Wholly Unqualified', weight: -0.62, normalizedWeight: -0.67, category: 'emotional' },
          { token: 'knowingly explained', weight: -0.55, normalizedWeight: -0.59, category: 'subjectivity' as any }
        ],
        metrics: { sensationalism: 30, clickbait: 35, subjectivity: 90, analyticalTone: 65, entityVerification: 25 },
        decisionSummary: 'Random Forest successfully identified semantic patterns common in humor and observational comedy datasets rather than hard news.',
        suggestedFactChecks: ['Snopes satire guide The Onion']
      }
    }
  },
  {
    id: 'art-10',
    category: 'Satire & Parody',
    title: 'Area Cat Deeply Offended by Visible Bottom of Food Bowl Despite Remaining Dry Kibble Along Periphery',
    fullText: 'PORTLAND, Ore. — Expressing acute vocal distress that suggested she had not consumed a meal in several lunar cycles, domestic shorthair Barnaby, 6, stared up at her caregiver with palpable condemnation on Thursday after discovering the ceramic bottom of her dinner receptacle had become exposed. Although nearly 65 percent of the salmon-flavored dry pellets remained perfectly accessible along the circular outer edges of the dish, Barnaby emitted a series of high-pitched, mournful wails while intentionally scratching at the kitchen linoleum. "She acts like she is surviving in an unforgiving dystopian wasteland," stated her roommate, Kevin Miller, who was subsequently forced to shake the bowl until the kibble redistributed into the center.',
    source: 'The Onion News Network',
    date: 'January 28, 2026',
    groundTruth: 'Satire',
    predictions: {
      distilbert: {
        label: 'Real',
        confidence: 0.61, // Close borderline
        tokens: [
          { token: 'PORTLAND, Ore.', weight: 0.48, normalizedWeight: 0.51, category: 'journalistic' },
          { token: 'subsequently forced', weight: 0.35, normalizedWeight: 0.38, category: 'neutral' },
          { token: 'mournful wails', weight: -0.42, normalizedWeight: -0.45, category: 'emotional' }
        ],
        metrics: { sensationalism: 20, clickbait: 25, subjectivity: 92, analyticalTone: 82, entityVerification: 22 },
        decisionSummary: 'Demonstrates the exact academic concept of "Human Judgment Limits in AI"—the linguistic structure mimics serious objective investigative reporting, so an AI model trained only on text syntax cannot discern that a feline complaining about kibble distribution is satirical humor.',
        suggestedFactChecks: ['Verify publication domain: theonion.com']
      },
      tfidf_pac: {
        label: 'Fake',
        confidence: 0.79,
        tokens: [
          { token: 'Area Cat', weight: -0.68, normalizedWeight: -0.73, category: 'sensationalism' },
          { token: 'palpable condemnation', weight: -0.52, normalizedWeight: -0.56, category: 'emotional' }
        ],
        metrics: { sensationalism: 30, clickbait: 35, subjectivity: 94, analyticalTone: 55, entityVerification: 15 },
        decisionSummary: 'PassiveAggressive Classifier successfully flagged informal domestic tropes and comedic phrasing as non-journalistic.',
        suggestedFactChecks: ['Check satirical news index']
      },
      tfidf_logreg: {
        label: 'Real',
        confidence: 0.53,
        tokens: [
          { token: 'Although nearly 65 percent', weight: 0.51, normalizedWeight: 0.55, category: 'journalistic' }
        ],
        metrics: { sensationalism: 22, clickbait: 28, subjectivity: 89, analyticalTone: 75, entityVerification: 30 },
        decisionSummary: 'Model leaned Real due to statistical qualifiers ("nearly 65 percent") and standard interview quotation formats.',
        suggestedFactChecks: ['Verify Portland animal services registry']
      },
      word2vec_rf: {
        label: 'Fake',
        confidence: 0.84,
        tokens: [
          { token: 'domestic shorthair', weight: -0.45, normalizedWeight: -0.48, category: 'neutral' },
          { token: 'dystopian wasteland', weight: -0.66, normalizedWeight: -0.71, category: 'emotional' }
        ],
        metrics: { sensationalism: 28, clickbait: 32, subjectivity: 95, analyticalTone: 62, entityVerification: 18 },
        decisionSummary: 'Tree ensembles correctly identified semantic clusters tied to observational humor and internet meme captions.',
        suggestedFactChecks: ['Humor label verification']
      }
    }
  }
];

export const MOCK_MODEL_BENCHMARKS = [
  {
    id: 'distilbert',
    name: 'Fine-tuned DistilBERT (Transformer Baseline)',
    architecture: '6-layer, 768-dimension Bidirectional Transformer',
    parameters: '66 Million',
    inferenceTimeMs: 142,
    f1Score: 0.968,
    accuracy: 0.971,
    precision: 0.965,
    recall: 0.972,
    rocAuc: 0.992,
    description: 'A heavily optimized distilled version of BERT fine-tuned specifically on the Kaggle ISOT and FakeNewsNet benchmark corpora. Captures profound bidirectional semantic context, irony, and rhetorical structure.',
    pros: [
      'State-of-the-art understanding of long-range semantic dependencies',
      'Extremely robust against paraphrasing and complex vocabulary deception',
      'Provides rich contextual token attention weights for explainability tools'
    ],
    cons: [
      'Requires substantial compute and specialized accelerators (GPUs) for high-throughput inference',
      'Susceptible to subtle human satire that utilizes flawless formal journalistic grammar'
    ],
    confusionMatrix: {
      trueRealPredReal: 4210,
      trueRealPredFake: 125,
      trueFakePredReal: 132,
      trueFakePredFake: 4512
    }
  },
  {
    id: 'word2vec_rf',
    name: 'Word2Vec Embeddings + Random Forest',
    architecture: '300-dim Dense Word Embeddings + 200 Decision Trees',
    parameters: 'Non-parametric Ensemble',
    inferenceTimeMs: 48,
    f1Score: 0.934,
    accuracy: 0.938,
    precision: 0.929,
    recall: 0.940,
    rocAuc: 0.965,
    description: 'Generates document-level semantic embeddings by averaging pre-trained Word2Vec/GloVe 300-dimensional vectors, fed into an ensemble of 200 non-linear decision trees.',
    pros: [
      'Captures semantic synonym relationships far better than pure keyword matching',
      'Highly resilient to out-of-vocabulary variations within similar topic domains',
      'Fast CPU inference suitable for lightweight edge or browser workflows'
    ],
    cons: [
      'Averaging word vectors loses exact word order and complex negation structures ("not fake")',
      'Decision tree interpretability (Gini importance) can be harder to project back to specific single words'
    ],
    confusionMatrix: {
      trueRealPredReal: 4080,
      trueRealPredFake: 255,
      trueFakePredReal: 301,
      trueFakePredFake: 4343
    }
  },
  {
    id: 'tfidf_pac',
    name: 'TF-IDF + PassiveAggressive Classifier',
    architecture: 'Sparse Trigram Matrix + Margin-based Online Learner',
    parameters: '125,000 Linear Weights',
    inferenceTimeMs: 12,
    f1Score: 0.942,
    accuracy: 0.945,
    precision: 0.941,
    recall: 0.944,
    rocAuc: 0.971,
    description: 'The classic, battle-tested baseline for real-time text classification. Uses a sparse Term Frequency-Inverse Document Frequency (TF-IDF) n-gram matrix coupled with an online PassiveAggressive optimization algorithm.',
    pros: [
      'Blisteringly fast sub-15ms inference; ideal for massive streaming news feeds or live Twitter/X firehoses',
      'Highly interpretable: every single n-gram has an exact inspectable positive or negative linear coefficient',
      'Remarkably effective at catching raw sensational buzzwords and clickbait punctuation'
    ],
    cons: [
      'Completely blind to semantic context, sarcasm, or complex word-order inversions',
      'Vulnerable to adversarial attacks where spammers replace buzzwords with close synonyms'
    ],
    confusionMatrix: {
      trueRealPredReal: 4115,
      trueRealPredFake: 220,
      trueFakePredReal: 275,
      trueFakePredFake: 4369
    }
  },
  {
    id: 'tfidf_logreg',
    name: 'TF-IDF + Scikit-Learn Logistic Regression',
    architecture: 'Sparse Bigram Matrix + L2 Regularized Logistic Learner',
    parameters: '85,000 Linear Weights',
    inferenceTimeMs: 16,
    f1Score: 0.918,
    accuracy: 0.922,
    precision: 0.915,
    recall: 0.921,
    rocAuc: 0.954,
    description: 'An elegant, highly calibrated probabilistic baseline model using Scikit-Learn. Conforms exactly to standard introductory data science workflows on Kaggle.',
    pros: [
      'Yields exceptionally reliable, well-calibrated prediction probabilities (0.0 to 1.0)',
      'Extremely stable to train with virtually zero risk of catastrophic overfitting due to L2 penalty',
      'Provides direct coefficients that make LIME/SHAP visual explainers perfectly exact'
    ],
    cons: [
      'Slightly lower peak recall compared to deep bidirectional transformer attention models',
      'Struggles with subtle long-form misinformation embedded deep within otherwise authentic articles'
    ],
    confusionMatrix: {
      trueRealPredReal: 4010,
      trueRealPredFake: 325,
      trueFakePredReal: 375,
      trueFakePredFake: 4269
    }
  }
];
