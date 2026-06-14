import React, { useState } from 'react';
import { 
  Database, 
  Layers, 
  FileText, 
  Sliders, 
  Cpu, 
  BarChart2, 
  CheckCircle, 
  ArrowRight, 
  Sparkles, 
  Play, 
  RefreshCw,
  Info
} from 'lucide-react';

export const NlpPipeline: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(1);
  
  // Interactive Step 2 State (Ablation Selection)
  const [featureAblation, setFeatureAblation] = useState<'title' | 'text' | 'both'>('both');
  
  // Interactive Step 3 State (Tokenizer Sandbox)
  const [sandboxInput, setSandboxInput] = useState<string>("BREAKING: Secret AI Algorithm Flipped 500,000 Votes!!");
  const [removeStopwords, setRemoveStopwords] = useState<boolean>(true);
  const [applyLemmatization, setApplyLemmatization] = useState<boolean>(true);
  
  // Interactive Step 4 State (Training Simulation)
  const [simulatingTrain, setSimulatingTrain] = useState<boolean>(false);
  const [trainComplete, setTrainComplete] = useState<boolean>(false);
  const [simulatedEpoch, setSimulatedEpoch] = useState<number>(0);

  const steps = [
    { id: 1, title: '1. Data Loading & Counts', icon: <Database className="w-4 h-4" /> },
    { id: 2, title: '2. Title vs Text Ablation', icon: <Layers className="w-4 h-4" /> },
    { id: 3, title: '3. Tokenize & TF-IDF / Vectors', icon: <FileText className="w-4 h-4" /> },
    { id: 4, title: '4. Baseline Classifier & Evaluation', icon: <Cpu className="w-4 h-4" /> },
    { id: 5, title: '5. LIME Local Explanations', icon: <Sliders className="w-4 h-4" /> },
  ];

  // Tokenizer logic for Step 3 Sandbox
  const rawTokens = sandboxInput.split(/\s+/).filter(Boolean);
  const stopwordsList = ['a', 'an', 'the', 'in', 'is', 'at', 'of', 'and', 'to', 'for', 'with', 'on', 'that'];
  const cleanedTokens = rawTokens.map(t => {
    let clean = t.replace(/[^a-zA-Z0-9!]/g, '');
    if (removeStopwords && stopwordsList.includes(clean.toLowerCase())) return null;
    if (applyLemmatization) {
      if (clean.toLowerCase() === 'flipped') clean = 'flip';
      if (clean.toLowerCase() === 'votes') clean = 'vote';
      if (clean.toLowerCase() === 'exposes') clean = 'expose';
      if (clean.toLowerCase() === 'destroys') clean = 'destroy';
    }
    return clean;
  }).filter(Boolean) as string[];

  const runTrainingSimulation = () => {
    setSimulatingTrain(true);
    setTrainComplete(false);
    setSimulatedEpoch(1);
    
    setTimeout(() => setSimulatedEpoch(2), 600);
    setTimeout(() => setSimulatedEpoch(3), 1200);
    setTimeout(() => {
      setSimulatingTrain(false);
      setTrainComplete(true);
    }, 1800);
  };

  return (
    <div className="space-y-8 pb-16">
      
      {/* Title & Pipeline Header Bar */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 rounded-2xl border border-indigo-500/20 p-6 sm:p-8 shadow-xl">
        <div className="max-w-3xl space-y-3 text-left">
          <span className="text-xs font-extrabold uppercase tracking-widest text-indigo-400">Step-by-Step Interactive Workflow</span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            End-to-End NLP Text Classification Process
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed">
            Walk through the exact 5-step research pipeline required to turn raw, unformatted news collections into a highly accurate, interpretability-driven machine learning system.
          </p>
        </div>

        {/* Clickable Workflow Steps Map */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-5 gap-2.5">
          {steps.map((step) => {
            const isActive = activeStep === step.id;
            const isFinished = step.id < activeStep;

            return (
              <button
                key={step.id}
                onClick={() => setActiveStep(step.id)}
                className={`flex items-center space-x-2.5 p-3 rounded-xl text-left transition-all relative cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-lg shadow-indigo-600/30 border border-indigo-500/40'
                    : isFinished
                    ? 'bg-slate-900 text-slate-200 border border-emerald-500/30 hover:border-slate-700'
                    : 'bg-slate-950 text-slate-400 border border-slate-800 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                <div className={`flex items-center justify-center w-7 h-7 rounded-lg shrink-0 ${
                  isActive ? 'bg-white/20 text-white' : isFinished ? 'bg-emerald-500/10 text-emerald-400' : 'bg-slate-900 text-slate-500'
                }`}>
                  {isFinished ? <CheckCircle className="w-4 h-4 text-emerald-400" /> : step.icon}
                </div>
                
                <div className="overflow-hidden">
                  <span className="block text-[11px] font-bold truncate leading-tight">
                    {step.title}
                  </span>
                  <span className={`text-[9px] ${isActive ? 'text-indigo-200' : isFinished ? 'text-emerald-500' : 'text-slate-500'}`}>
                    {isActive ? 'Active Workbench' : isFinished ? 'Completed Step' : 'Pending Step'}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Step Content Container */}
      <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 sm:p-8 shadow-2xl text-left space-y-6">
        
        {/* STEP 1 CONTENT: Load Data & Inspect Counts */}
        {activeStep === 1 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-mono font-bold text-indigo-400">01 / Loading Kaggle Labeled Corpus</span>
                <h2 className="text-xl sm:text-2xl font-black text-white">Load Dataset & Inspect Target Balance</h2>
              </div>
              <span className="text-xs px-3 py-1 bg-indigo-500/10 text-indigo-300 rounded-lg border border-indigo-500/20 font-mono font-semibold">
                ISOT Reuters & Flagged Web Corpus
              </span>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">
              Before training an AI model, you must thoroughly inspect your target class distributions. 
              Highly imbalanced datasets (e.g., 90% Real, 10% Fake) can cause an AI to predict "Real" every time and still achieve 90% accuracy! 
              Fortunately, the academic Kaggle ISOT dataset provides excellent class equilibrium.
            </p>

            {/* Visual Balance Counters */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 text-center space-y-1">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Articles</span>
                <div className="text-3xl font-black font-mono text-white">44,898</div>
                <span className="text-[11px] text-slate-500 block">100% of labeled CSV items</span>
              </div>

              <div className="bg-emerald-950/30 p-5 rounded-xl border border-emerald-500/30 text-center space-y-1">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">True News Articles</span>
                <div className="text-3xl font-black font-mono text-emerald-400">21,417</div>
                <span className="text-[11px] text-emerald-500 block">47.7% (Reuters wire feed)</span>
              </div>

              <div className="bg-rose-950/30 p-5 rounded-xl border border-rose-500/30 text-center space-y-1">
                <span className="text-xs font-bold text-rose-400 uppercase tracking-wider">Flagged Fake Articles</span>
                <div className="text-3xl font-black font-mono text-rose-400">23,481</div>
                <span className="text-[11px] text-rose-500 block">52.3% (Flagged partisan sites)</span>
              </div>
            </div>

            {/* Factual Integrity & Text Length Histogram Visualizer */}
            <div className="bg-slate-950 rounded-xl p-5 border border-slate-800 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center space-x-2">
                <BarChart2 className="w-4 h-4 text-cyan-400" />
                <span>Article Word Count Distribution Analysis</span>
              </h4>

              <p className="text-xs text-slate-400">
                Noticeable pattern in exploratory data analysis (EDA): Fake news articles often exhibit highly skewed length distributions—either incredibly brief clickbait stubs or massive conspiratorial rants.
              </p>

              {/* Simulated visual bar graph */}
              <div className="space-y-2 font-mono text-[11px] pt-2">
                <div className="flex items-center space-x-3">
                  <span className="w-32 text-slate-400 text-right">0 - 100 Words:</span>
                  <div className="flex-1 bg-slate-900 h-4 rounded overflow-hidden flex">
                    <div className="bg-emerald-500 h-full rounded-l" style={{ width: '12%' }} title="Real: 12%"></div>
                    <div className="bg-rose-500 h-full rounded-r" style={{ width: '38%' }} title="Fake: 38%"></div>
                  </div>
                  <span className="w-20 text-rose-400 font-bold">High Fake</span>
                </div>

                <div className="flex items-center space-x-3">
                  <span className="w-32 text-slate-400 text-right">101 - 500 Words:</span>
                  <div className="flex-1 bg-slate-900 h-4 rounded overflow-hidden flex">
                    <div className="bg-emerald-500 h-full rounded-l" style={{ width: '55%' }} title="Real: 55%"></div>
                    <div className="bg-rose-500 h-full rounded-r" style={{ width: '35%' }} title="Fake: 35%"></div>
                  </div>
                  <span className="w-20 text-emerald-400 font-bold">Normal Wire</span>
                </div>

                <div className="flex items-center space-x-3">
                  <span className="w-32 text-slate-400 text-right">501+ Words:</span>
                  <div className="flex-1 bg-slate-900 h-4 rounded overflow-hidden flex">
                    <div className="bg-emerald-500 h-full rounded-l" style={{ width: '33%' }} title="Real: 33%"></div>
                    <div className="bg-rose-500 h-full rounded-r" style={{ width: '27%' }} title="Fake: 27%"></div>
                  </div>
                  <span className="w-20 text-slate-400">Balanced</span>
                </div>
              </div>

            </div>

            <div className="flex justify-end pt-4">
              <button
                onClick={() => setActiveStep(2)}
                className="py-3 px-6 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 font-bold text-white text-xs uppercase tracking-wider rounded-xl shadow-lg flex items-center space-x-2 transition-all cursor-pointer"
              >
                <span>Proceed to Step 2: Feature Ablation</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2 CONTENT: Title vs Full Text Ablation */}
        {activeStep === 2 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-mono font-bold text-indigo-400">02 / Feature Scope Decisions</span>
                <h2 className="text-xl sm:text-2xl font-black text-white">Ablation Analysis: Titles, Full Text, or Both?</h2>
              </div>
              <span className="text-xs px-3 py-1 bg-cyan-500/10 text-cyan-300 rounded-lg border border-cyan-500/20 font-mono font-semibold">
                Interactive Ablation Test
              </span>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">
              An essential question in NLP text classification is deciding which input features to feed the model. 
              Should you train only on the <strong className="text-white">Headline (Title)</strong>, only on the <strong className="text-white">Article Body (Full Text)</strong>, or concatenate them into a single unified input string? 
              Test our simulated ablation results below:
            </p>

            {/* Interactive Feature Ablation Pickers */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              
              <div 
                onClick={() => setFeatureAblation('title')}
                className={`p-5 rounded-2xl border text-left cursor-pointer transition-all space-y-3 ${
                  featureAblation === 'title' 
                    ? 'bg-indigo-950/80 border-indigo-500 shadow-xl shadow-indigo-950/50' 
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase tracking-wider text-white">Titles Only</span>
                  <span className="text-xs font-mono font-black text-rose-400">84.2% Acc</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Headlines contain high sensationalism triggers ("SHOCKING", "!!"), but lack context. Vulnerable to non-clickbait fake news or sarcastic real titles.
                </p>
              </div>

              <div 
                onClick={() => setFeatureAblation('text')}
                className={`p-5 rounded-2xl border text-left cursor-pointer transition-all space-y-3 ${
                  featureAblation === 'text' 
                    ? 'bg-indigo-950/80 border-indigo-500 shadow-xl shadow-indigo-950/50' 
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase tracking-wider text-white">Full Text Only</span>
                  <span className="text-xs font-mono font-black text-cyan-400">92.5% Acc</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Excellent at catching contradictory logic, unverified speaker statements, and authentic wire agency datelines ("WASHINGTON (Reuters)").
                </p>
              </div>

              <div 
                onClick={() => setFeatureAblation('both')}
                className={`p-5 rounded-2xl border text-left cursor-pointer transition-all space-y-3 ${
                  featureAblation === 'both' 
                    ? 'bg-indigo-950/80 border-indigo-500 shadow-xl shadow-indigo-950/50' 
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase tracking-wider text-emerald-400">Combined (Both)</span>
                  <span className="text-xs font-mono font-black text-emerald-400">96.8% Acc ⭐</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-semibold">
                  The ultimate winner. Combining headline sensationalism with body contradiction maximizes semantic coverage and interpretability precision.
                </p>
              </div>

            </div>

            {/* Deep Breakdown Box */}
            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-2">
              <h4 className="text-xs font-bold text-white uppercase tracking-widest flex items-center space-x-2">
                <Info className="w-4 h-4 text-indigo-400" />
                <span>Key Engineering Takeaway for your README</span>
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                When presenting your project to engineering managers or newsrooms, explaining why you chose <code className="text-cyan-400 bg-slate-900 px-1.5 py-0.5 rounded">full_text = title + " " + text</code> shows profound maturity. It demonstrates that you understand how real-world spammers construct deceptive articles (enticing headlines hiding vacuous content).
              </p>
            </div>

            <div className="flex justify-between items-center pt-4">
              <button
                onClick={() => setActiveStep(1)}
                className="py-3 px-5 bg-slate-800 hover:bg-slate-700 font-bold text-white text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer"
              >
                ← Back to Step 1
              </button>

              <button
                onClick={() => setActiveStep(3)}
                className="py-3 px-6 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 font-bold text-white text-xs uppercase tracking-wider rounded-xl shadow-lg flex items-center space-x-2 transition-all cursor-pointer"
              >
                <span>Proceed to Step 3: Text Preprocessing</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3 CONTENT: Tokenize, Lemmatize, & Feature Extraction Workbench */}
        {activeStep === 3 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-mono font-bold text-indigo-400">03 / Preprocessing & Vector Construction</span>
                <h2 className="text-xl sm:text-2xl font-black text-white">Interactive Tokenizer & Feature Extraction Sandbox</h2>
              </div>
              <span className="text-xs px-3 py-1 bg-amber-500/10 text-amber-300 rounded-lg border border-amber-500/20 font-mono font-semibold">
                Live NLP Sandbox
              </span>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">
              Machine learning models cannot read raw alphabetical letters. Text must be cleaned, tokenized, and mapped into numerical arrays. 
              Type any sentence below and test how standard <strong className="text-white">TF-IDF sparse matrices</strong> and <strong className="text-white">Transformer 768-dim embeddings</strong> process it:
            </p>

            {/* Input & Checkbox controls */}
            <div className="bg-slate-950 rounded-xl p-5 border border-slate-800 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                  Sandbox Input String
                </label>
                <input
                  type="text"
                  value={sandboxInput}
                  onChange={(e) => setSandboxInput(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white font-mono focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="flex flex-wrap items-center gap-6">
                <label className="flex items-center space-x-2 text-xs font-bold text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={removeStopwords}
                    onChange={(e) => setRemoveStopwords(e.target.checked)}
                    className="w-4 h-4 rounded bg-slate-900 border-slate-700 text-indigo-600 focus:ring-0"
                  />
                  <span>Remove Stopwords (a, an, the, is, of, that)</span>
                </label>

                <label className="flex items-center space-x-2 text-xs font-bold text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={applyLemmatization}
                    onChange={(e) => setApplyLemmatization(e.target.checked)}
                    className="w-4 h-4 rounded bg-slate-900 border-slate-700 text-indigo-600 focus:ring-0"
                  />
                  <span>Apply Lemmatization (Flipped → Flip, Votes → Vote)</span>
                </label>
              </div>
            </div>

            {/* Output Token Output Box */}
            <div className="space-y-4">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-400 block font-mono">
                  1. Resulting Preprocessed Tokens ({cleanedTokens.length} Tokens)
                </span>
                <div className="flex flex-wrap gap-2 pt-1">
                  {cleanedTokens.map((tok, index) => (
                    <span key={index} className="px-2.5 py-1 bg-indigo-950/80 text-indigo-200 rounded-lg text-xs font-mono font-bold border border-indigo-500/40 shadow">
                      {tok}
                    </span>
                  ))}
                </div>
              </div>

              {/* Vector Comparison Array */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* TF IDF Simulation */}
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-400 block font-mono">
                    2A. TF-IDF Sparse Trigram Vector Projection
                  </span>
                  <div className="text-[11px] font-mono text-slate-400 leading-relaxed bg-slate-900/60 p-3 rounded-lg overflow-x-auto no-scrollbar">
                    {cleanedTokens.map((_, index) => `idx_14${Math.floor(Math.random() * 80) + index}: ${Number(0.2 + Math.random() * 0.7).toFixed(3)}`).join(', ')}
                  </div>
                  <p className="text-[11px] text-slate-500">Maps each token to an exact n-gram dictionary index with an inverse-document frequency frequency weight.</p>
                </div>

                {/* Transformer Embedding Simulation */}
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-purple-400 block font-mono">
                    2B. Dense Transformer 768-Dim Embedding Vector
                  </span>
                  <div className="flex items-center space-x-1 py-1">
                    {Array.from({ length: 24 }).map((_, idx) => (
                      <div 
                        key={idx} 
                        className="flex-1 h-6 rounded-sm opacity-80" 
                        style={{ backgroundColor: `hsl(${260 + Math.random() * 60}, 80%, ${30 + Math.random() * 40}%)` }}
                        title={`Dimension ${idx + 1}: ${Math.random().toFixed(4)}`}
                      ></div>
                    ))}
                  </div>
                  <p className="text-[11px] text-slate-500">Generates a unified contextual dense semantic vector that captures rich relationships across the complete phrase.</p>
                </div>

              </div>
            </div>

            <div className="flex justify-between items-center pt-4">
              <button
                onClick={() => setActiveStep(2)}
                className="py-3 px-5 bg-slate-800 hover:bg-slate-700 font-bold text-white text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer"
              >
                ← Back to Step 2
              </button>

              <button
                onClick={() => setActiveStep(4)}
                className="py-3 px-6 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 font-bold text-white text-xs uppercase tracking-wider rounded-xl shadow-lg flex items-center space-x-2 transition-all cursor-pointer"
              >
                <span>Proceed to Step 4: Model Training</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4 CONTENT: Baseline Classifier Training & Confusion Matrix */}
        {activeStep === 4 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-mono font-bold text-indigo-400">04 / ML Baseline Construction & Metrology</span>
                <h2 className="text-xl sm:text-2xl font-black text-white">Train Baseline Classifier & Evaluate with Confusion Matrix</h2>
              </div>
              <span className="text-xs px-3 py-1 bg-emerald-500/10 text-emerald-300 rounded-lg border border-emerald-500/20 font-mono font-semibold">
                TF-IDF Baseline vs Deep ML
              </span>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">
              In academic research and enterprise systems, you always train a powerful, interpretable baseline first (like Scikit-Learn `PassiveAggressiveClassifier` or `LogisticRegression`) before experimenting with heavyweight Transformer models. 
              Click below to execute our simulated training run:
            </p>

            {/* Run Training Button */}
            <div className="bg-slate-950 rounded-xl p-6 border border-slate-800 text-center space-y-4">
              {!simulatingTrain && !trainComplete ? (
                <button
                  onClick={runTrainingSimulation}
                  className="py-4 px-8 bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 hover:from-emerald-500 hover:to-indigo-500 text-white font-black text-sm uppercase tracking-widest rounded-2xl shadow-xl shadow-emerald-950/50 flex items-center justify-center space-x-3 mx-auto transition-all cursor-pointer"
                >
                  <Play className="w-5 h-5 fill-current" />
                  <span>Execute 50-Epoch Scikit-Learn Baseline Training Run</span>
                </button>
              ) : simulatingTrain ? (
                <div className="space-y-3 max-w-lg mx-auto">
                  <div className="flex items-center justify-between text-xs font-mono text-cyan-400">
                    <span className="flex items-center space-x-2">
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Optimizing PAC Margin Hyperplane...</span>
                    </span>
                    <span>Epoch {simulatedEpoch} of 3</span>
                  </div>
                  <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden">
                    <div className="bg-gradient-to-r from-emerald-500 to-cyan-500 h-full rounded-full transition-all duration-500" style={{ width: `${simulatedEpoch * 33.3}%` }}></div>
                  </div>
                </div>
              ) : (
                <div className="space-y-6 animate-fadeIn">
                  <div className="inline-flex items-center space-x-2 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-4 py-2 rounded-xl text-xs font-bold font-mono">
                    <CheckCircle className="w-4 h-4" />
                    <span>Baseline Training Successfully Converged! (F1 Score: 0.942)</span>
                  </div>

                  {/* Confusion matrix graphic */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center max-w-3xl mx-auto text-left">
                    
                    {/* Visual Matrix */}
                    <div className="bg-slate-900 rounded-xl p-4 border border-slate-800 space-y-3">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-300 block text-center">
                        Validation Set Confusion Matrix (8,980 Samples)
                      </span>

                      <div className="grid grid-cols-3 gap-2 font-mono text-xs pt-1 text-center">
                        <div className="bg-slate-950 p-2 font-bold text-slate-500 flex items-center justify-center">Actual / Pred</div>
                        <div className="bg-slate-950 p-2 font-bold text-slate-300">Pred Fake (0)</div>
                        <div className="bg-slate-950 p-2 font-bold text-slate-300">Pred Real (1)</div>

                        <div className="bg-slate-950 p-2 font-bold text-slate-300 flex items-center justify-center">Actual Fake (0)</div>
                        <div className="bg-indigo-950 border border-indigo-500/40 p-3 rounded-lg text-emerald-400 font-extrabold flex flex-col justify-center">
                          <span className="text-lg">4,369</span>
                          <span className="text-[9px] text-slate-400 font-sans">True Negative (TN)</span>
                        </div>
                        <div className="bg-rose-950/40 border border-rose-500/30 p-3 rounded-lg text-rose-400 font-extrabold flex flex-col justify-center">
                          <span className="text-lg">275</span>
                          <span className="text-[9px] text-slate-400 font-sans">False Pos (FP)</span>
                        </div>

                        <div className="bg-slate-950 p-2 font-bold text-slate-300 flex items-center justify-center">Actual Real (1)</div>
                        <div className="bg-rose-950/40 border border-rose-500/30 p-3 rounded-lg text-rose-400 font-extrabold flex flex-col justify-center">
                          <span className="text-lg">220</span>
                          <span className="text-[9px] text-slate-400 font-sans">False Neg (FN)</span>
                        </div>
                        <div className="bg-indigo-950 border border-indigo-500/40 p-3 rounded-lg text-emerald-400 font-extrabold flex flex-col justify-center">
                          <span className="text-lg">4,115</span>
                          <span className="text-[9px] text-slate-400 font-sans">True Positive (TP)</span>
                        </div>
                      </div>
                    </div>

                    {/* F1 Rationale */}
                    <div className="space-y-3">
                      <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest block">Metrics Summary</span>
                      <div className="space-y-2 text-xs text-slate-300">
                        <div className="flex justify-between bg-slate-950 px-3 py-2 rounded-lg border border-slate-800">
                          <span>F1 Score (Harmonic Mean):</span>
                          <strong className="text-white font-mono">0.942</strong>
                        </div>
                        <div className="flex justify-between bg-slate-950 px-3 py-2 rounded-lg border border-slate-800">
                          <span>Precision (Quality of Flags):</span>
                          <strong className="text-white font-mono">0.941</strong>
                        </div>
                        <div className="flex justify-between bg-slate-950 px-3 py-2 rounded-lg border border-slate-800">
                          <span>Recall (Sensitivity to Fakes):</span>
                          <strong className="text-white font-mono">0.944</strong>
                        </div>
                        <div className="flex justify-between bg-slate-950 px-3 py-2 rounded-lg border border-slate-800">
                          <span>ROC-AUC Discriminative Power:</span>
                          <strong className="text-cyan-400 font-mono">0.971</strong>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-between items-center pt-4">
              <button
                onClick={() => setActiveStep(3)}
                className="py-3 px-5 bg-slate-800 hover:bg-slate-700 font-bold text-white text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer"
              >
                ← Back to Step 3
              </button>

              <button
                onClick={() => setActiveStep(5)}
                className="py-3 px-6 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 font-bold text-white text-xs uppercase tracking-wider rounded-xl shadow-lg flex items-center space-x-2 transition-all cursor-pointer"
              >
                <span>Proceed to Step 5: Explainability</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 5 CONTENT: Token Interpretability Explanations (LIME) */}
        {activeStep === 5 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-mono font-bold text-indigo-400">05 / Trust & Interpretability Tooling</span>
                <h2 className="text-xl sm:text-2xl font-black text-white">Use an Explanation Tool to Highlight Tokens That Drive Predictions</h2>
              </div>
              <span className="text-xs px-3 py-1 bg-amber-500/10 text-amber-300 rounded-lg border border-amber-500/20 font-mono font-semibold">
                LIME Explainer Engine
              </span>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">
              Black-box AI models that only return a numeric score are unacceptable in highly sensitive newsrooms and courtrooms. 
              We incorporate the <strong className="text-white">Local Interpretable Model-agnostic Explanations (LIME)</strong> workflow. 
              LIME generates thousands of perturbed variations of an article, observes how the prediction fluctuates, and fits a localized linear ridge regression model to determine exact single-token weights:
            </p>

            {/* Explainer Visual Animation Graphic */}
            <div className="bg-slate-950 rounded-xl p-6 border border-slate-800 space-y-6">
              
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                
                {/* Step 1 Original Text */}
                <div className="flex-1 space-y-2 text-center md:text-left">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-400 block">1. Target Instance</span>
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-white">
                    "BREAKING: Secret Whistleblower Exposes AI Algorithm!!"
                  </div>
                </div>

                <ArrowRight className="w-6 h-6 text-slate-600 hidden md:block shrink-0" />

                {/* Step 2 LIME Perturbations */}
                <div className="flex-1 space-y-2 text-center">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-400 block">2. Perturbed Neighborhood</span>
                  <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800 font-mono text-[10px] text-slate-400 space-y-1">
                    <div>"BREAKING: [MASK] Whistleblower Exposes [MASK]" (Pred: 0.81)</div>
                    <div>"[MASK] [MASK] Whistleblower Exposes AI" (Pred: 0.65)</div>
                  </div>
                </div>

                <ArrowRight className="w-6 h-6 text-slate-600 hidden md:block shrink-0" />

                {/* Step 3 Local Explainer Weights */}
                <div className="flex-1 space-y-2 text-center md:text-right">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400 block">3. Local Linear Weights</span>
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs space-y-1 text-left">
                    <div className="text-rose-400">🟥 BREAKING: -0.85</div>
                    <div className="text-rose-400">🟥 Secret: -0.79</div>
                    <div className="text-emerald-400">🟩 Whistleblower: +0.12</div>
                  </div>
                </div>

              </div>

              {/* Ready to jump to demo */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-indigo-950/60 via-slate-900 to-slate-900 border border-indigo-500/30 text-xs text-slate-200 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Sparkles className="w-5 h-5 text-amber-400 shrink-0" />
                  <span>You now understand the underlying math and engineering of VeriText.AI!</span>
                </div>
                
                <a
                  href="#top"
                  onClick={(e) => {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-xs font-bold text-indigo-400 hover:text-indigo-300 underline"
                >
                  Test the Live LIME Detector Demo ↑
                </a>
              </div>

            </div>

            <div className="flex justify-between items-center pt-4">
              <button
                onClick={() => setActiveStep(4)}
                className="py-3 px-5 bg-slate-800 hover:bg-slate-700 font-bold text-white text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer"
              >
                ← Back to Step 4
              </button>

              <button
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="py-3 px-6 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 font-black text-white text-xs uppercase tracking-wider rounded-xl shadow-lg flex items-center space-x-2 transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>Launch Live Full Demo</span>
              </button>
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
