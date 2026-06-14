import React, { useState } from 'react';
import { 
  BarChart3, 
  Cpu, 
  CheckCircle2, 
  AlertCircle, 
  TrendingUp, 
  Zap, 
  ShieldAlert, 
  Brain
} from 'lucide-react';
import { MOCK_MODEL_BENCHMARKS } from '../data/curatedNews';
import { ModelBenchmark } from '../types';

export const ModelEvaluation: React.FC = () => {
  const [selectedBenchmarkId, setSelectedBenchmarkId] = useState<string>('distilbert');

  const activeBenchmark: ModelBenchmark = MOCK_MODEL_BENCHMARKS.find(m => m.id === selectedBenchmarkId) as ModelBenchmark;

  // Calculate total evaluation test set size
  const cm = activeBenchmark.confusionMatrix;
  const totalTestSamples = cm.trueRealPredReal + cm.trueRealPredFake + cm.trueFakePredReal + cm.trueFakePredFake;

  return (
    <div className="space-y-8 pb-16 text-left">
      
      {/* Overview Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 rounded-2xl border border-indigo-500/20 p-6 sm:p-8 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-3 max-w-2xl">
          <span className="text-xs font-extrabold uppercase tracking-widest text-indigo-400">Model Ablation & Metrology Suite</span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Classifier Diagnostics & Confusion Matrices
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed">
            Examine how different NLP architectures trade off inference speed, parameter footprint, and semantic comprehension. Compare our baselines against fine-tuned bidirectional Transformers.
          </p>
        </div>

        <div className="flex items-center space-x-2 bg-slate-950 p-2 rounded-xl border border-slate-800">
          <TrendingUp className="w-5 h-5 text-emerald-400" />
          <span className="text-xs font-mono font-bold text-slate-200">Kaggle Benchmark Suite</span>
        </div>
      </div>

      {/* Benchmark Selector Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {MOCK_MODEL_BENCHMARKS.map((bm) => {
          const isActive = activeBenchmark.id === bm.id;
          return (
            <button
              key={bm.id}
              onClick={() => setSelectedBenchmarkId(bm.id)}
              className={`p-5 rounded-2xl border text-left transition-all relative cursor-pointer flex flex-col justify-between ${
                isActive
                  ? 'bg-gradient-to-br from-indigo-950/80 to-slate-900 border-indigo-500 shadow-xl shadow-indigo-950/50'
                  : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/50'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded ${
                    isActive ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {bm.architecture.split(',')[0]}
                  </span>
                  
                  <span className="text-xs font-mono font-extrabold text-amber-400 flex items-center space-x-1">
                    <Zap className="w-3 h-3" />
                    <span>{bm.inferenceTimeMs}ms</span>
                  </span>
                </div>

                <h3 className="text-sm font-bold text-white leading-snug">
                  {bm.name}
                </h3>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400">F1 Score:</span>
                <span className={`font-black text-sm ${isActive ? 'text-emerald-400' : 'text-slate-200'}`}>
                  {bm.f1Score.toFixed(3)}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Model Deep Dive Dashboard */}
      <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 sm:p-8 shadow-2xl space-y-8">
        
        {/* Header summary */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center space-x-2">
              <Cpu className="w-5 h-5 text-indigo-400" />
              <h2 className="text-2xl font-black text-white">{activeBenchmark.name}</h2>
            </div>
            <p className="text-xs font-mono text-slate-400 mt-1">
              Architecture: <strong className="text-slate-200">{activeBenchmark.architecture}</strong> | Parameters: <strong className="text-slate-200">{activeBenchmark.parameters}</strong>
            </p>
          </div>

          {/* Quick core gauges */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="bg-slate-950 px-3.5 py-2 rounded-xl border border-slate-800 text-center">
              <span className="text-[10px] text-slate-400 font-bold uppercase block">Accuracy</span>
              <span className="text-lg font-black font-mono text-white">{(activeBenchmark.accuracy * 100).toFixed(1)}%</span>
            </div>
            <div className="bg-slate-950 px-3.5 py-2 rounded-xl border border-slate-800 text-center">
              <span className="text-[10px] text-slate-400 font-bold uppercase block">Precision</span>
              <span className="text-lg font-black font-mono text-emerald-400">{(activeBenchmark.precision * 100).toFixed(1)}%</span>
            </div>
            <div className="bg-slate-950 px-3.5 py-2 rounded-xl border border-slate-800 text-center">
              <span className="text-[10px] text-slate-400 font-bold uppercase block">Recall</span>
              <span className="text-lg font-black font-mono text-indigo-400">{(activeBenchmark.recall * 100).toFixed(1)}%</span>
            </div>
            <div className="bg-slate-950 px-3.5 py-2 rounded-xl border border-slate-800 text-center">
              <span className="text-[10px] text-slate-400 font-bold uppercase block">ROC-AUC</span>
              <span className="text-lg font-black font-mono text-cyan-400">{(activeBenchmark.rocAuc * 100).toFixed(1)}%</span>
            </div>
          </div>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed font-medium">
          {activeBenchmark.description}
        </p>

        {/* Pros and Cons Panels */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div className="bg-emerald-950/20 p-5 rounded-2xl border border-emerald-500/30 space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-emerald-400 flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>Architectural Strengths & Use Cases</span>
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              {activeBenchmark.pros.map((pro, i) => (
                <li key={i} className="flex items-start space-x-2 font-medium">
                  <span className="text-emerald-400 mt-0.5">✔</span>
                  <span className="leading-relaxed">{pro}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-rose-950/20 p-5 rounded-2xl border border-rose-500/30 space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-rose-400 flex items-center space-x-2">
              <AlertCircle className="w-4 h-4" />
              <span>Vulnerabilities & Blind Spots</span>
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              {activeBenchmark.cons.map((con, i) => (
                <li key={i} className="flex items-start space-x-2 font-medium">
                  <span className="text-rose-400 mt-0.5">✖</span>
                  <span className="leading-relaxed">{con}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Detailed Interactive Confusion Matrix */}
        <div className="bg-slate-950 rounded-2xl p-6 border border-slate-800 space-y-4 shadow-xl">
          <div className="flex flex-wrap items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center space-x-2">
              <BarChart3 className="w-4 h-4 text-indigo-400" />
              <span>Evaluation Test Set Confusion Matrix ({totalTestSamples.toLocaleString()} Articles)</span>
            </h3>
            <span className="text-xs text-slate-400">Class 0: Fake | Class 1: Real</span>
          </div>

          {/* Matrix Graphic */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            
            <div className="md:col-span-8 grid grid-cols-3 gap-2 text-center font-mono text-xs">
              
              <div className="bg-slate-900 p-3 font-bold text-slate-400 flex items-center justify-center rounded-lg">
                Actual \\ Predicted
              </div>
              <div className="bg-slate-900 p-3 font-extrabold text-rose-400 rounded-lg">
                Predicted Fake (0)
              </div>
              <div className="bg-slate-900 p-3 font-extrabold text-emerald-400 rounded-lg">
                Predicted Real (1)
              </div>

              <div className="bg-slate-900 p-3 font-extrabold text-rose-400 flex items-center justify-center rounded-lg">
                Actual Fake (0)
              </div>
              <div className="bg-indigo-950 border border-indigo-500/50 p-4 rounded-xl text-emerald-300 flex flex-col justify-center shadow">
                <span className="text-2xl font-black">{cm.trueFakePredFake.toLocaleString()}</span>
                <span className="text-[10px] text-slate-400 font-sans mt-0.5">True Negative (TN)</span>
              </div>
              <div className="bg-rose-950/40 border border-rose-500/40 p-4 rounded-xl text-rose-400 flex flex-col justify-center shadow">
                <span className="text-2xl font-black">{cm.trueFakePredReal.toLocaleString()}</span>
                <span className="text-[10px] text-rose-300 font-sans mt-0.5">False Positive (FP) Flag Leak</span>
              </div>

              <div className="bg-slate-900 p-3 font-extrabold text-emerald-400 flex items-center justify-center rounded-lg">
                Actual Real (1)
              </div>
              <div className="bg-rose-950/40 border border-rose-500/40 p-4 rounded-xl text-rose-400 flex flex-col justify-center shadow">
                <span className="text-2xl font-black">{cm.trueRealPredFake.toLocaleString()}</span>
                <span className="text-[10px] text-rose-300 font-sans mt-0.5">False Negative (FN) False Alarm</span>
              </div>
              <div className="bg-indigo-950 border border-indigo-500/50 p-4 rounded-xl text-emerald-300 flex flex-col justify-center shadow">
                <span className="text-2xl font-black">{cm.trueRealPredReal.toLocaleString()}</span>
                <span className="text-[10px] text-slate-400 font-sans mt-0.5">True Positive (TP)</span>
              </div>

            </div>

            {/* Factual Matrix Explanations */}
            <div className="md:col-span-4 space-y-3 bg-slate-900/80 p-4 rounded-xl border border-slate-800 text-xs">
              <span className="font-extrabold text-cyan-400 uppercase tracking-widest block">Metrology Insights</span>
              
              <div className="space-y-2 text-slate-300 leading-relaxed">
                <div>
                  • <strong className="text-white">False Positives ({cm.trueFakePredReal}):</strong> A Fake article missed by the AI. This is the most dangerous error for public trust.
                </div>
                <div>
                  • <strong className="text-white">False Negatives ({cm.trueRealPredFake}):</strong> A True news article wrongly flagged as Fake (often caused by sensational breaking headlines).
                </div>
                <div className="pt-1 text-[11px] text-slate-400 italic">
                  Overall Accuracy: {((cm.trueRealPredReal + cm.trueFakePredFake) / totalTestSamples * 100).toFixed(2)}%
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Essential Academic NLP Module: Dealing with Noisy Labels */}
        <div className="bg-gradient-to-br from-indigo-950/50 via-slate-900 to-slate-900 rounded-2xl border border-indigo-500/30 p-6 sm:p-8 space-y-4 shadow-xl">
          <div className="flex items-center space-x-2 text-indigo-400">
            <Brain className="w-5 h-5" />
            <h3 className="text-base font-black text-white">Dealing with Noisy Labels in Sensitive Domains</h3>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
            In human-labeled data (like Kaggle or Reddit submissions), labels are rarely 100% pure. 
            A phenomenon known as <strong className="text-white">Noisy Labels</strong> occurs when human annotators disagree or misclassify items. 
            For example, is a biased but factually accurate hyper-partisan article <span className="text-emerald-400">Real</span> or <span className="text-rose-400">Fake</span>? 
            What about an observational comedy piece from <em className="text-amber-400 font-semibold">The Onion</em>?
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <span className="text-xs font-bold text-amber-400 block">1. Satire Contamination</span>
              <p className="text-xs text-slate-400 leading-relaxed">
                Satirical sites use pristine grammatical structures and wire attribution ("reportedly"). Without a knowledge graph of humor, models often mislabel satire as Real news.
              </p>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <span className="text-xs font-bold text-rose-400 block">2. Decontextualized Truth</span>
              <p className="text-xs text-slate-400 leading-relaxed">
                A true statistic (e.g., "gasoline was $1.50") presented out of its temporal or economic context to intentionally mislead voters. Highly problematic for pure text classifiers.
              </p>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <span className="text-xs font-bold text-cyan-400 block">3. Multi-Class Ambiguity</span>
              <p className="text-xs text-slate-400 leading-relaxed">
                PolitiFact utilizes a 6-point truth spectrum (Pants on Fire, Barely True, Half True). Forcing binary (Real/Fake) targets requires intentional threshold calibration.
              </p>
            </div>

          </div>

          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300 flex items-center space-x-3 mt-4">
            <ShieldAlert className="w-5 h-5 text-indigo-400 shrink-0" />
            <span>
              <strong>Communicating Limits:</strong> Always document in your product README that NLP text classifiers measure <em className="text-white">lexical and structural reliability</em>, not absolute external real-world factual ground truth.
            </span>
          </div>

        </div>

      </div>

    </div>
  );
};
