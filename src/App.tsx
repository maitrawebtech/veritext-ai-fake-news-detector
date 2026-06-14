import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { LiveDemo } from './components/LiveDemo';
import { NlpPipeline } from './components/NlpPipeline';
import { DatasetExplorer } from './components/DatasetExplorer';
import { ModelEvaluation } from './components/ModelEvaluation';
import { HumanVsAiQuiz } from './components/HumanVsAiQuiz';
import { PythonCodeHub } from './components/PythonCodeHub';
import { PragmaticAiHub } from './components/PragmaticAiHub';
import { DisclaimerModal } from './components/DisclaimerModal';
import { ActiveTab } from './types';
import { ShieldCheck, Info, Heart, ExternalLink } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('demo');
  const [isDisclaimerOpen, setIsDisclaimerOpen] = useState<boolean>(false);

  return (
    <div className="min-h-full flex flex-col bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500 selection:text-white">
      
      {/* Navbar Header */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onOpenDisclaimer={() => setIsDisclaimerOpen(true)} 
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 pb-12">
        
        {/* Tab Content Router */}
        {activeTab === 'demo' && <LiveDemo />}
        {activeTab === 'pipeline' && <NlpPipeline />}
        {activeTab === 'dataset' && <DatasetExplorer />}
        {activeTab === 'evaluation' && <ModelEvaluation />}
        {activeTab === 'quiz' && <HumanVsAiQuiz />}
        {activeTab === 'code' && <PythonCodeHub />}
        {activeTab === 'pragmatic' && <PragmaticAiHub />}

      </main>

      {/* Persistent Academic & Limitation Disclaimer Bar */}
      <div className="border-t border-slate-900 bg-slate-950 px-4 py-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          
          <div className="flex items-center space-x-2">
            <span className="flex items-center justify-center w-6 h-6 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <ShieldCheck className="w-3.5 h-3.5" />
            </span>
            <span>
              <strong>VeriText AI Workbench</strong> — Academic Misinformation Classifier & LIME Explainer.
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => setIsDisclaimerOpen(true)}
              className="text-amber-400 hover:text-amber-300 font-bold underline flex items-center space-x-1 cursor-pointer"
            >
              <Info className="w-3.5 h-3.5" />
              <span>Research Scope & Limit Statement</span>
            </button>

            <a
              href="https://www.kaggle.com/datasets/clmentbisaillon/fake-and-real-news-dataset"
              target="_blank"
              rel="noreferrer"
              className="text-slate-400 hover:text-white flex items-center space-x-1"
            >
              <span>Kaggle Dataset Benchmark</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

        </div>
      </div>

      {/* Deep Footer */}
      <footer className="bg-slate-900/60 border-t border-slate-900 py-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          <div className="space-y-1 text-center sm:text-left">
            <p className="font-semibold text-slate-400">
              Demonstrating Serious NLP while preserving human judgment boundaries.
            </p>
            <p>
              Built with React 19, Vite, Tailwind CSS, and Simulated LIME / TF-IDF Hyperplanes.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <span>Built for rigorous NLP portfolios</span>
            <Heart className="w-3.5 h-3.5 text-indigo-400" />
          </div>

        </div>
      </footer>

      {/* Disclaimer Modal */}
      <DisclaimerModal 
        isOpen={isDisclaimerOpen} 
        onClose={() => setIsDisclaimerOpen(false)} 
      />

    </div>
  );
}
