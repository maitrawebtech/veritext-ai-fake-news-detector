import React, { useState } from 'react';
import { 
  ShieldAlert, 
  ShieldCheck, 
  AlertTriangle, 
  Cpu, 
  RefreshCw, 
  Search, 
  ExternalLink, 
  Sparkles, 
  BookOpen, 
  CheckCircle2, 
  SlidersHorizontal,
  Layers,
  ThumbsUp,
  ThumbsDown,
  Info
} from 'lucide-react';
import { CURATED_ARTICLES, MOCK_MODEL_BENCHMARKS } from '../data/curatedNews';
import { CuratedArticle, ModelType } from '../types';
import { analyzeCustomText } from '../utils/nlpEngine';

export const LiveDemo: React.FC = () => {
  const [selectedModel, setSelectedModel] = useState<ModelType>('distilbert');
  const [currentArticle, setCurrentArticle] = useState<CuratedArticle>(CURATED_ARTICLES[0]);
  const [customTitle, setCustomTitle] = useState<string>('');
  const [customBody, setCustomBody] = useState<string>('');
  const [isCustomMode, setIsCustomMode] = useState<boolean>(false);
  const [showHighlightLegend, setShowHighlightLegend] = useState<boolean>(true);
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [userFeedback, setUserFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [showAnalysisSpinner, setShowAnalysisSpinner] = useState<boolean>(false);

  const activePrediction = currentArticle.predictions[selectedModel];
  const modelInfo = MOCK_MODEL_BENCHMARKS.find(m => m.id === selectedModel);

  const categories = ['All', 'Politics & Elections', 'Health & Medicine', 'Financial Markets', 'Technology & AI', 'Satire & Parody'];

  const filteredArticles = CURATED_ARTICLES.filter(art => {
    if (categoryFilter !== 'All' && art.category !== categoryFilter) return false;
    return true;
  });

  const handleSelectCurated = (article: CuratedArticle) => {
    setShowAnalysisSpinner(true);
    setUserFeedback(null);
    setTimeout(() => {
      setCurrentArticle(article);
      setIsCustomMode(false);
      setShowAnalysisSpinner(false);
    }, 200);
  };

  const handleAnalyzeCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customTitle.trim() && !customBody.trim()) return;
    
    setShowAnalysisSpinner(true);
    setUserFeedback(null);
    setTimeout(() => {
      const parsed = analyzeCustomText(customTitle, customBody);
      setCurrentArticle(parsed);
      setIsCustomMode(true);
      setShowAnalysisSpinner(false);
    }, 450);
  };

  const handleLoadSampleToCustom = (title: string, body: string) => {
    setCustomTitle(title);
    setCustomBody(body);
    setIsCustomMode(true);
  };

  // Helper to render the text with highlighted tokens
  const renderHighlightedText = (text: string) => {
    if (!activePrediction || !activePrediction.tokens) return <p className="leading-relaxed">{text}</p>;

    const tokens = text.split(/(\s+)/);
    
    return tokens.map((part, idx) => {
      if (!part.trim()) return part; // Keep exact whitespace

      const cleanPart = part.toLowerCase().replace(/[^a-z0-9!]/g, '');
      const match = activePrediction.tokens.find(t => 
        t.token.toLowerCase().replace(/[^a-z0-9!]/g, '') === cleanPart ||
        cleanPart.includes(t.token.toLowerCase()) ||
        t.token.toLowerCase().includes(cleanPart)
      );

      if (match && cleanPart.length > 1) {
        const isRealBoost = match.weight > 0;
        return (
          <span
            key={idx}
            className={`inline-block px-1.5 py-0.5 mx-0.5 rounded font-medium transition-all cursor-help border ${
              isRealBoost
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30 hover:bg-emerald-500/30'
                : 'bg-rose-500/25 text-rose-200 border-rose-500/40 hover:bg-rose-500/35'
            }`}
            title={`LIME Explainer Token: "${match.token}" | Weight: ${match.weight > 0 ? '+' : ''}${match.weight.toFixed(2)} (${isRealBoost ? 'Promotes Real' : 'Promotes Fake'})`}
          >
            {part}
            <span className={`text-[9px] ml-1 font-mono font-bold ${isRealBoost ? 'text-emerald-400' : 'text-rose-400'}`}>
              {match.weight > 0 ? '+' : ''}{match.weight.toFixed(1)}
            </span>
          </span>
        );
      }

      return part;
    });
  };

  return (
    <div className="space-y-8 pb-16">
      
      {/* Hero Banner / Academic Context Scope */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-indigo-500/20 p-6 sm:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-4xl space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>Interactive NLP Workbench & Demo</span>
            </span>
            <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-medium bg-amber-500/10 text-amber-300 border border-amber-500/20">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
              <span>Research Aid, Not a Factual Oracle</span>
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
            Flagging Nuanced Misinformation & Visualizing Explanations
          </h1>
          
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Misinformation deeply affects high-stakes societal domains like elections, health choices, and financial markets. 
            This classifier applies serious NLP (TF-IDF baselines & pre-trained Transformer embeddings) to predict authenticity 
            and uses <strong className="text-white">LIME token interpretability</strong> to reveal exactly which words drove the decision.
          </p>

          {/* Quick Model Switching Header Bar */}
          <div className="pt-4 flex flex-wrap items-center gap-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center space-x-1">
              <Cpu className="w-3.5 h-3.5" />
              <span>Active AI Model:</span>
            </span>
            
            <div className="inline-flex rounded-xl p-1 bg-slate-950/80 border border-slate-800 shadow-inner">
              {MOCK_MODEL_BENCHMARKS.map((model) => (
                <button
                  key={model.id}
                  onClick={() => setSelectedModel(model.id as ModelType)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    selectedModel === model.id
                      ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-md shadow-indigo-600/30'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                  }`}
                >
                  {model.name.split('(')[0].trim()}
                </button>
              ))}
            </div>

            {modelInfo && (
              <span className="text-xs font-mono text-cyan-400 bg-cyan-950/50 px-2.5 py-1 rounded-lg border border-cyan-800/60 hidden md:inline-flex items-center">
                ⚡ {modelInfo.inferenceTimeMs}ms Inference | F1: {modelInfo.f1Score}
              </span>
            )}
          </div>

        </div>
      </div>

      {/* Main Grid: Left Column (Data Selector & Input) | Right Column (Prediction & LIME Explainer) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: Input Control Panel */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Mode Switcher Tabs */}
          <div className="flex rounded-xl bg-slate-900 p-1 border border-slate-800 shadow-md">
            <button
              onClick={() => setIsCustomMode(false)}
              className={`flex-1 py-2.5 px-4 rounded-lg text-xs font-bold transition-all flex items-center justify-center space-x-2 ${
                !isCustomMode 
                  ? 'bg-slate-800 text-white shadow border border-slate-700' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <BookOpen className="w-4 h-4 text-indigo-400" />
              <span>Curated Examples ({CURATED_ARTICLES.length})</span>
            </button>
            <button
              onClick={() => setIsCustomMode(true)}
              className={`flex-1 py-2.5 px-4 rounded-lg text-xs font-bold transition-all flex items-center justify-center space-x-2 ${
                isCustomMode 
                  ? 'bg-slate-800 text-white shadow border border-slate-700' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <SlidersHorizontal className="w-4 h-4 text-cyan-400" />
              <span>Paste Custom Input</span>
            </button>
          </div>

          {!isCustomMode ? (
            /* Curated News Picker Panel */
            <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-5 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                  <Layers className="w-4 h-4 text-indigo-400" />
                  <span>Select Labeled Test Sample</span>
                </h3>
                
                {/* Category Dropdown */}
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="bg-slate-950 text-slate-300 text-xs font-medium rounded-lg px-2.5 py-1.5 border border-slate-800 focus:outline-none focus:border-indigo-500"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2.5 max-h-[620px] overflow-y-auto pr-1.5 no-scrollbar">
                {filteredArticles.map((article) => {
                  const isSelected = currentArticle.id === article.id && !isCustomMode;
                  const isFake = article.groundTruth === 'Fake';
                  const isSatire = article.groundTruth === 'Satire';

                  return (
                    <div
                      key={article.id}
                      onClick={() => handleSelectCurated(article)}
                      className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-indigo-950/60 border-indigo-500 shadow-md shadow-indigo-950/50'
                          : 'bg-slate-950/50 border-slate-800/80 hover:border-slate-700 hover:bg-slate-800/40'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-slate-800 text-slate-300 tracking-wider">
                          {article.category.split('&')[0]}
                        </span>
                        
                        <span className={`flex items-center space-x-1 text-xs font-bold px-2 py-0.5 rounded-md ${
                          isFake ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' : 
                          isSatire ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 
                          'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        }`}>
                          {isFake ? <ShieldAlert className="w-3 h-3" /> : <ShieldCheck className="w-3 h-3" />}
                          <span>{article.groundTruth}</span>
                        </span>
                      </div>

                      <h4 className="text-xs font-semibold text-slate-100 line-clamp-2 leading-snug">
                        {article.title}
                      </h4>

                      <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400 font-medium">
                        <span>Source: <span className="text-slate-300">{article.source}</span></span>
                        <span>{article.date}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            /* Custom Paste Input Panel */
            <form onSubmit={handleAnalyzeCustom} className="bg-slate-900/90 rounded-2xl border border-slate-800 p-5 shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                  <SlidersHorizontal className="w-4 h-4 text-cyan-400" />
                  <span>Custom News Engine</span>
                </h3>
                <button
                  type="button"
                  onClick={() => handleLoadSampleToCustom(CURATED_ARTICLES[0].title, CURATED_ARTICLES[0].fullText)}
                  className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 bg-indigo-500/10 px-2.5 py-1 rounded border border-indigo-500/20 transition-colors"
                >
                  Fill Fake Template
                </button>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                    Headline / Title Article
                  </label>
                  <input
                    type="text"
                    required
                    value={customTitle}
                    onChange={(e) => setCustomTitle(e.target.value)}
                    placeholder="e.g. BREAKING: New Secret Microchip Discovered in Tap Water!!"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                    Full Text Article Body
                  </label>
                  <textarea
                    rows={8}
                    value={customBody}
                    onChange={(e) => setCustomBody(e.target.value)}
                    placeholder="Paste the full article content here. The system will evaluate lexical sensationalism, factual wire markers, capitalization bias, and entity citations..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 resize-none font-mono"
                  ></textarea>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={showAnalysisSpinner}
                  className="w-full py-3 px-4 bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 font-bold text-white text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-indigo-600/25 flex items-center justify-center space-x-2 transition-all cursor-pointer"
                >
                  {showAnalysisSpinner ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin text-white" />
                      <span>Executing NLP Inference...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>Run Classification & Generate Explanations</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* Key Learning Notes Box */}
          <div className="bg-gradient-to-br from-indigo-950/50 to-slate-900 rounded-2xl border border-indigo-500/20 p-5 space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-indigo-400 flex items-center space-x-2">
              <Info className="w-4 h-4" />
              <span>Why Real Projects Use Baseline Baselines</span>
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              In production, lightweight workflows like TF-IDF or shallow tree models are highly prized because they run instantly on real-world noisy text without massive GPU costs. Try comparing TF-IDF PAC vs DistilBERT using the top bar!
            </p>
          </div>

        </div>

        {/* RIGHT COLUMN: Output Dashboard & Explainer */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Output Classification Banner */}
          <div className={`relative overflow-hidden rounded-2xl border p-6 shadow-2xl transition-all duration-300 ${
            activePrediction.label === 'Fake' 
              ? 'bg-gradient-to-r from-rose-950/40 via-slate-900 to-slate-900 border-rose-500/40 shadow-rose-950/50' 
              : 'bg-gradient-to-r from-emerald-950/40 via-slate-900 to-slate-900 border-emerald-500/40 shadow-emerald-950/50'
          }`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              
              <div className="flex items-center space-x-4">
                <div className={`flex items-center justify-center w-14 h-14 rounded-2xl shadow-inner border ${
                  activePrediction.label === 'Fake'
                    ? 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                    : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                }`}>
                  {activePrediction.label === 'Fake' ? <ShieldAlert className="w-8 h-8 animate-pulse" /> : <ShieldCheck className="w-8 h-8" />}
                </div>

                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
                      AI Model Verdict:
                    </span>
                    {!isCustomMode && (
                      <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono border border-slate-700">
                        Ground Truth: {currentArticle.groundTruth}
                      </span>
                    )}
                  </div>
                  <h2 className={`text-2xl sm:text-3xl font-black tracking-tight ${
                    activePrediction.label === 'Fake' ? 'text-rose-400' : 'text-emerald-400'
                  }`}>
                    Likely {activePrediction.label} News
                  </h2>
                </div>
              </div>

              {/* Confidence Meter Widget */}
              <div className="sm:text-right bg-slate-950/80 px-4 py-3 rounded-xl border border-slate-800 flex sm:flex-col items-center sm:items-end justify-between">
                <span className="text-xs text-slate-400 font-medium">Model Confidence</span>
                <span className="text-xl font-extrabold font-mono text-white">
                  {(activePrediction.confidence * 100).toFixed(1)}%
                </span>
                <div className="w-24 bg-slate-800 h-1.5 rounded-full overflow-hidden mt-1 hidden sm:block">
                  <div 
                    className={`h-full rounded-full ${activePrediction.label === 'Fake' ? 'bg-rose-500' : 'bg-emerald-500'}`}
                    style={{ width: `${activePrediction.confidence * 100}%` }}
                  ></div>
                </div>
              </div>

            </div>

            {/* Decision Rationale Text */}
            <div className="mt-4 pt-4 border-t border-slate-800/80">
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
                <strong className="text-slate-400 uppercase tracking-wider text-[11px] block mb-1 font-bold">Inference Rationale:</strong>
                {activePrediction.decisionSummary}
              </p>
            </div>
          </div>

          {/* Interactive LIME Token Highlights Module */}
          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 shadow-xl space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <h3 className="text-sm font-bold text-white tracking-wide">
                  LIME Explainer Highlighted Text
                </h3>
              </div>
              
              <button
                onClick={() => setShowHighlightLegend(!showHighlightLegend)}
                className="text-xs font-semibold text-slate-400 hover:text-slate-200 bg-slate-800/80 px-2.5 py-1 rounded-lg border border-slate-700/60 transition-colors flex items-center space-x-1"
              >
                <span>{showHighlightLegend ? 'Hide Legend' : 'Show Legend'}</span>
              </button>
            </div>

            {/* Legend Banner */}
            {showHighlightLegend && (
              <div className="flex flex-wrap items-center gap-4 p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs">
                <span className="font-bold text-slate-400">Color Influence Magnitude:</span>
                <span className="inline-flex items-center space-x-1.5 px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  <span>Promotes Likely Real (+)</span>
                </span>
                <span className="inline-flex items-center space-x-1.5 px-2 py-0.5 rounded bg-rose-500/25 text-rose-300 font-semibold border border-rose-500/40">
                  <span className="w-2 h-2 rounded-full bg-rose-400"></span>
                  <span>Promotes Likely Fake (-)</span>
                </span>
                <span className="text-slate-400 italic text-[11px]">Hover over any highlighted token for exact weights!</span>
              </div>
            )}

            {/* Title Excerpt Highlight */}
            <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-400">Article Title / Headline</span>
              <h3 className="text-sm sm:text-base font-extrabold text-white leading-snug">
                {renderHighlightedText(currentArticle.title)}
              </h3>
            </div>

            {/* Full Body Excerpt Highlight */}
            <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 space-y-2 max-h-72 overflow-y-auto no-scrollbar font-serif">
              <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-400 font-sans">Full Article Text Excerpt</span>
              <div className="text-xs sm:text-sm text-slate-200 leading-relaxed space-y-3 font-sans">
                {renderHighlightedText(currentArticle.fullText)}
              </div>
            </div>

            {/* Explainer Influential Tokens List */}
            {activePrediction.tokens && activePrediction.tokens.length > 0 && (
              <div className="space-y-2 pt-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  Top Ranked Feature Contributions
                </span>
                <div className="flex flex-wrap gap-2">
                  {activePrediction.tokens.map((tok, i) => (
                    <span 
                      key={i}
                      className={`inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-lg text-xs font-mono font-bold border ${
                        tok.weight > 0
                          ? 'bg-emerald-950/70 text-emerald-300 border-emerald-500/30'
                          : 'bg-rose-950/70 text-rose-300 border-rose-500/30'
                      }`}
                    >
                      <span>{tok.token}</span>
                      <span className={tok.weight > 0 ? 'text-emerald-400' : 'text-rose-400'}>
                        {tok.weight > 0 ? '+' : ''}{tok.weight.toFixed(2)}
                      </span>
                    </span>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Deep Analytics & Feature Breakdown (Radar Breakdown Metrics) */}
          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 shadow-xl space-y-5">
            <h3 className="text-sm font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-3">
              <SlidersHorizontal className="w-4 h-4 text-cyan-400" />
              <span>Linguistic & Feature Diagnostics</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Metric 1: Sensationalism Index */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-300">Sensationalism Index</span>
                  <span className="text-xs font-mono font-extrabold text-amber-400">{activePrediction.metrics.sensationalism}/100</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-amber-500 h-full rounded-full transition-all duration-500" style={{ width: `${activePrediction.metrics.sensationalism}%` }}></div>
                </div>
                <p className="text-[11px] text-slate-400">Hyperbolic qualifiers, emotional buzzwords, and all-caps alarmism.</p>
              </div>

              {/* Metric 2: Clickbait Trigger Rate */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-300">Clickbait Syntax Rate</span>
                  <span className="text-xs font-mono font-extrabold text-rose-400">{activePrediction.metrics.clickbait}/100</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-rose-500 h-full rounded-full transition-all duration-500" style={{ width: `${activePrediction.metrics.clickbait}%` }}></div>
                </div>
                <p className="text-[11px] text-slate-400">Forward-referencing teasers, exaggerated punctuation, and curiosity voids.</p>
              </div>

              {/* Metric 3: Analytical & Wire Tone */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-300">Analytical & Wire Tone</span>
                  <span className="text-xs font-mono font-extrabold text-emerald-400">{activePrediction.metrics.analyticalTone}/100</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full transition-all duration-500" style={{ width: `${activePrediction.metrics.analyticalTone}%` }}></div>
                </div>
                <p className="text-[11px] text-slate-400">Formal wire reporting style, balanced clauses, and neutral descriptors.</p>
              </div>

              {/* Metric 4: Verifiable Entity Density */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-300">Verifiable Entity Density</span>
                  <span className="text-xs font-mono font-extrabold text-cyan-400">{activePrediction.metrics.entityVerification}/100</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-cyan-500 h-full rounded-full transition-all duration-500" style={{ width: `${activePrediction.metrics.entityVerification}%` }}></div>
                </div>
                <p className="text-[11px] text-slate-400">Presence of official agency registries (FDA, Reuters, FEC) and explicit named locations.</p>
              </div>

            </div>
          </div>

          {/* Suggested Fact-Check Queries Module */}
          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 shadow-xl space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-3">
              <Search className="w-4 h-4 text-indigo-400" />
              <span>Suggested Independent Fact-Checking Queries</span>
            </h3>

            <p className="text-xs text-slate-300">
              Our AI is a preliminary triage tool. Use these suggested Google Fact Check or official institutional queries to verify authoritative truth:
            </p>

            <div className="space-y-2">
              {activePrediction.suggestedFactChecks.map((query, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-indigo-500/50 transition-colors">
                  <span className="text-xs font-mono font-semibold text-slate-200">
                    🔍 {query}
                  </span>
                  
                  <a
                    href={`https://www.google.com/search?q=${encodeURIComponent(query)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center space-x-1 text-xs font-bold text-indigo-400 hover:text-indigo-300 bg-indigo-500/10 px-2.5 py-1 rounded-lg border border-indigo-500/20 transition-all"
                  >
                    <span>Google Fact Check</span>
                    <ExternalLink className="w-3 h-3 text-indigo-400" />
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* User Feedback & Human Verification Audit */}
          <div className="bg-gradient-to-r from-slate-900 via-indigo-950/30 to-slate-900 rounded-2xl border border-indigo-500/20 p-6 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                Human Verification Audit
              </h4>
              <p className="text-xs text-slate-400">
                Do you agree with the {selectedModel.toUpperCase()} classifier verdict of <strong className={activePrediction.label === 'Fake' ? 'text-rose-400' : 'text-emerald-400'}>{activePrediction.label}</strong>?
              </p>
            </div>

            <div className="flex items-center space-x-3">
              <button
                disabled={userFeedback !== null}
                onClick={() => setUserFeedback('correct')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  userFeedback === 'correct' 
                    ? 'bg-emerald-600 text-white shadow shadow-emerald-600/30' 
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700'
                }`}
              >
                <ThumbsUp className="w-3.5 h-3.5 text-emerald-400" />
                <span>Agree AI Correct</span>
              </button>

              <button
                disabled={userFeedback !== null}
                onClick={() => setUserFeedback('incorrect')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  userFeedback === 'incorrect' 
                    ? 'bg-rose-600 text-white shadow shadow-rose-600/30' 
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700'
                }`}
              >
                <ThumbsDown className="w-3.5 h-3.5 text-rose-400" />
                <span>Disagree / Flag Error</span>
              </button>
            </div>
          </div>

          {userFeedback && (
            <div className="p-4 rounded-xl bg-indigo-950/60 border border-indigo-500/30 text-xs text-indigo-200 flex items-center space-x-2 animate-fadeIn">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Thank you for logging human feedback! This data helps refine our active learning noisy label filtering algorithms.</span>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
