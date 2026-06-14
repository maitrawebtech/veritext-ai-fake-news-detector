import React, { useState } from 'react';
import { 
  ExternalLink, 
  Search, 
  BookOpen, 
  CheckCircle, 
  AlertTriangle, 
  BarChart2, 
  Layers,
  Sparkles
} from 'lucide-react';
import { KAGGLE_DATASETS } from '../data/mockDatasets';
import { KaggleDatasetInfo } from '../types';

export const DatasetExplorer: React.FC = () => {
  const [activeDatasetIndex, setActiveDatasetIndex] = useState<number>(0);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const dataset: KaggleDatasetInfo = KAGGLE_DATASETS[activeDatasetIndex];

  const filteredSamples = dataset.sampleRecords.filter(rec => 
    rec.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rec.textExcerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rec.domain.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 pb-16 text-left">
      
      {/* Overview Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 rounded-2xl border border-indigo-500/20 p-6 sm:p-8 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-3 max-w-2xl">
          <span className="text-xs font-extrabold uppercase tracking-widest text-indigo-400">Ground Truth Benchmarking</span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Kaggle Labeled Datasets Workbench
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed">
            In academic machine learning, high-quality labeled corpora are everything. Explore the exact Kaggle benchmark datasets we use to train our token embeddings and baseline TF-IDF hyperplanes.
          </p>
        </div>

        <a
          href={dataset.kaggleLink}
          target="_blank"
          rel="noreferrer"
          className="py-3 px-5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg flex items-center space-x-2 transition-all whitespace-nowrap"
        >
          <span>Open on Kaggle</span>
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>

      {/* Dataset Selector Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {KAGGLE_DATASETS.map((ds, index) => {
          const isActive = activeDatasetIndex === index;
          return (
            <button
              key={ds.name}
              onClick={() => {
                setActiveDatasetIndex(index);
                setSearchTerm('');
              }}
              className={`p-5 rounded-2xl border text-left transition-all relative cursor-pointer ${
                isActive
                  ? 'bg-gradient-to-br from-indigo-950/80 to-slate-900 border-indigo-500 shadow-xl shadow-indigo-950/50'
                  : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/50'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full ${
                  isActive ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30' : 'bg-slate-800 text-slate-400'
                }`}>
                  {isActive ? 'Active Workbench' : 'Benchmark Available'}
                </span>
                
                <span className="text-xs font-mono text-slate-400">
                  {ds.totalRecords.toLocaleString()} Samples
                </span>
              </div>

              <h3 className="text-sm sm:text-base font-bold text-white">
                {ds.name}
              </h3>
              
              <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                {ds.description}
              </p>
            </button>
          );
        })}
      </div>

      {/* Active Dataset Dashboard */}
      <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 sm:p-8 shadow-2xl space-y-8">
        
        {/* Dataset Stats Summary Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pb-6 border-b border-slate-800">
          <div>
            <span className="text-xs text-slate-400 font-semibold block mb-1">Total Records</span>
            <span className="text-2xl sm:text-3xl font-black font-mono text-white">{dataset.totalRecords.toLocaleString()}</span>
          </div>
          <div>
            <span className="text-xs text-slate-400 font-semibold block mb-1">Real Count (Label 1)</span>
            <span className="text-2xl sm:text-3xl font-black font-mono text-emerald-400">{dataset.realCount.toLocaleString()}</span>
          </div>
          <div>
            <span className="text-xs text-slate-400 font-semibold block mb-1">Fake Count (Label 0)</span>
            <span className="text-2xl sm:text-3xl font-black font-mono text-rose-400">{dataset.fakeCount.toLocaleString()}</span>
          </div>
          <div>
            <span className="text-xs text-slate-400 font-semibold block mb-1">Vocab / Feature Size</span>
            <span className="text-2xl sm:text-3xl font-black font-mono text-cyan-400">{dataset.vocabSize.toLocaleString()}</span>
          </div>
        </div>

        {/* Characteristics and Academic Key Scope */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-indigo-400 flex items-center space-x-2">
              <Sparkles className="w-4 h-4" />
              <span>Key Dataset Specifications</span>
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              {dataset.keyCharacteristics.map((char, idx) => (
                <li key={idx} className="flex items-start space-x-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span className="leading-relaxed">{char}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-cyan-400 flex items-center space-x-2">
              <BarChart2 className="w-4 h-4" />
              <span>Class Ratio Visualizer</span>
            </h4>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-emerald-400 font-bold">Real: {(dataset.realCount / dataset.totalRecords * 100).toFixed(1)}%</span>
                <span className="text-rose-400 font-bold">Fake: {(dataset.fakeCount / dataset.totalRecords * 100).toFixed(1)}%</span>
              </div>
              <div className="w-full bg-slate-800 h-4 rounded-full overflow-hidden flex shadow-inner">
                <div 
                  className="bg-emerald-500 h-full rounded-l transition-all duration-500"
                  style={{ width: `${(dataset.realCount / dataset.totalRecords * 100)}%` }}
                ></div>
                <div 
                  className="bg-rose-500 h-full rounded-r transition-all duration-500"
                  style={{ width: `${(dataset.fakeCount / dataset.totalRecords * 100)}%` }}
                ></div>
              </div>
            </div>

            <p className="text-[11px] text-slate-400 leading-relaxed">
              Having nearly 50/50 balance guarantees that evaluation metrics like Accuracy and F1 Score correlate closely, making our baseline Confusion Matrix exceptionally stable.
            </p>
          </div>
        </div>

        {/* Top Keywords Analysis */}
        <div className="space-y-4">
          <h4 className="text-xs font-extrabold uppercase tracking-widest text-slate-300 flex items-center space-x-2">
            <Layers className="w-4 h-4 text-indigo-400" />
            <span>Top High-Frequency Lexical Keywords (Discriminative Tokens)</span>
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            <div className="bg-emerald-950/20 p-4 rounded-xl border border-emerald-500/30 space-y-2">
              <span className="text-xs font-bold text-emerald-400 block mb-2">🟢 Most Frequent in Real Articles</span>
              <div className="flex flex-wrap gap-2">
                {dataset.topRealKeywords.map(kw => (
                  <span key={kw.word} className="px-2.5 py-1 rounded bg-slate-950 text-emerald-300 text-xs font-mono border border-emerald-500/20 flex items-center space-x-1.5">
                    <span className="font-bold">{kw.word}</span>
                    <span className="text-[10px] text-slate-500">({kw.count})</span>
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-rose-950/20 p-4 rounded-xl border border-rose-500/30 space-y-2">
              <span className="text-xs font-bold text-rose-400 block mb-2">🔴 Most Frequent in Fake Articles</span>
              <div className="flex flex-wrap gap-2">
                {dataset.topFakeKeywords.map(kw => (
                  <span key={kw.word} className="px-2.5 py-1 rounded bg-slate-950 text-rose-300 text-xs font-mono border border-rose-500/20 flex items-center space-x-1.5">
                    <span className="font-bold">{kw.word}</span>
                    <span className="text-[10px] text-slate-500">({kw.count})</span>
                  </span>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Sample Kaggle Database Searcher */}
        <div className="space-y-4 pt-4 border-t border-slate-800">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-slate-300 flex items-center space-x-2">
              <BookOpen className="w-4 h-4 text-cyan-400" />
              <span>Search Sample Labeled Kaggle Records</span>
            </h4>

            {/* Search Input */}
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search headlines or sources..."
                className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="space-y-3">
            {filteredSamples.map((rec, index) => {
              const isFake = rec.label === 'Fake';
              return (
                <div key={index} className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 hover:border-slate-700 transition-colors space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-white">{rec.title}</span>
                    <span className={`inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-md font-bold text-[10px] ${
                      isFake ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    }`}>
                      {isFake ? <AlertTriangle className="w-3 h-3" /> : <CheckCircle className="w-3 h-3" />}
                      <span>{rec.label}</span>
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed font-serif italic">
                    "{rec.textExcerpt}"
                  </p>

                  <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono pt-1">
                    <span>Source Domain: <strong className="text-slate-400">{rec.domain}</strong></span>
                    <span>Dateline: {rec.date}</span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>

    </div>
  );
};
