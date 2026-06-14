import React, { useState } from 'react';
import { 
  Copy, 
  Check, 
  Download, 
  ExternalLink,
  Sparkles
} from 'lucide-react';
import { NLP_CODE_SNIPPETS } from '../data/nlpCodeExamples';

export const PythonCodeHub: React.FC = () => {
  const [activeSnippetIdx, setActiveSnippetIdx] = useState<number>(0);
  const [copied, setCopied] = useState<boolean>(false);

  const snippet = NLP_CODE_SNIPPETS[activeSnippetIdx];

  const handleCopyCode = () => {
    navigator.clipboard.writeText(snippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadCode = () => {
    const blob = new Blob([snippet.code], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = snippet.filename;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8 pb-16 text-left">
      
      {/* Overview Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 rounded-2xl border border-indigo-500/20 p-6 sm:p-8 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-3 max-w-2xl">
          <span className="text-xs font-extrabold uppercase tracking-widest text-indigo-400">Academic Code Repository</span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            End-to-End Python ML Source Code
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed">
            Ready to build this exact Fake News Detection System in your own Jupyter notebook or Google Colab? All Python source files (`scikit-learn`, `transformers`, `lime`) are completely open-source and documented below.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <a
            href="https://colab.research.google.com/"
            target="_blank"
            rel="noreferrer"
            className="py-3 px-5 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg flex items-center space-x-2 transition-all whitespace-nowrap"
          >
            <span>Launch Google Colab</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Code Snippet Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {NLP_CODE_SNIPPETS.map((sn, index) => {
          const isActive = activeSnippetIdx === index;
          return (
            <button
              key={sn.id}
              onClick={() => setActiveSnippetIdx(index)}
              className={`p-5 rounded-2xl border text-left transition-all relative cursor-pointer flex flex-col justify-between ${
                isActive
                  ? 'bg-gradient-to-br from-indigo-950/80 to-slate-900 border-indigo-500 shadow-xl shadow-indigo-950/50'
                  : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/50'
              }`}
            >
              <div>
                <span className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded font-mono ${
                  isActive ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30' : 'bg-slate-800 text-slate-400'
                }`}>
                  {sn.library}
                </span>

                <h3 className="text-xs font-bold text-white mt-3 leading-snug">
                  {sn.title}
                </h3>
              </div>

              <span className="text-[11px] font-mono text-slate-500 mt-4 block truncate">
                📄 {sn.filename}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active Snippet Display */}
      <div className="bg-slate-900/90 rounded-2xl border border-slate-800 shadow-2xl overflow-hidden space-y-0">
        
        {/* Terminal Tab Header */}
        <div className="bg-slate-950 px-6 py-4 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1.5">
              <span className="w-3 h-3 rounded-full bg-rose-500/80"></span>
              <span className="w-3 h-3 rounded-full bg-amber-500/80"></span>
              <span className="w-3 h-3 rounded-full bg-emerald-500/80"></span>
            </div>
            
            <span className="text-xs font-mono font-bold text-slate-200 border-l border-slate-800 pl-3">
              {snippet.filename}
            </span>
            <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 hidden sm:inline">
              {snippet.library} engine
            </span>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={handleCopyCode}
              className="flex items-center space-x-1.5 text-xs font-bold text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-800 transition-all cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied script!' : 'Copy Code'}</span>
            </button>

            <button
              onClick={handleDownloadCode}
              className="flex items-center space-x-1.5 text-xs font-bold text-indigo-400 hover:text-indigo-300 bg-indigo-500/10 hover:bg-indigo-500/20 px-3 py-1.5 rounded-lg border border-indigo-500/20 transition-all cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download .py</span>
            </button>
          </div>
        </div>

        {/* Description Rationale */}
        <div className="bg-slate-900/50 px-6 py-3 border-b border-slate-800/80 text-xs text-slate-300 flex items-center space-x-2">
          <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" />
          <span><strong>Script Overview:</strong> {snippet.description}</span>
        </div>

        {/* Actual Code Excerpt */}
        <div className="p-6 overflow-x-auto text-xs font-mono text-cyan-200 leading-relaxed selection:bg-indigo-500 selection:text-white">
          <pre>
            <code>{snippet.code}</code>
          </pre>
        </div>

      </div>

    </div>
  );
};
