import React from 'react';
import { 
  ShieldCheck, 
  Sliders, 
  Database, 
  BarChart3, 
  Brain, 
  Terminal, 
  Cpu, 
  Info,
  ExternalLink
} from 'lucide-react';
import { ActiveTab } from '../types';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  onOpenDisclaimer: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, onOpenDisclaimer }) => {
  const navItems: { id: ActiveTab; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'demo', label: 'Live Detector & LIME', icon: <ShieldCheck className="w-4 h-4" />, badge: 'Demo' },
    { id: 'pipeline', label: 'NLP Pipeline Simulator', icon: <Sliders className="w-4 h-4" /> },
    { id: 'dataset', label: 'Kaggle Datasets', icon: <Database className="w-4 h-4" /> },
    { id: 'evaluation', label: 'Model Metrics & Ablation', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'quiz', label: 'Human vs. AI Audit', icon: <Brain className="w-4 h-4" />, badge: 'Quiz' },
    { id: 'code', label: 'Python Code Hub', icon: <Terminal className="w-4 h-4" /> },
    { id: 'pragmatic', label: 'Pragmatic Deployments', icon: <Cpu className="w-4 h-4" /> },
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur border-b border-slate-800 text-slate-100 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('demo')}>
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 p-0.5 shadow-lg shadow-indigo-500/20">
              <div className="flex items-center justify-center w-full h-full bg-slate-950 rounded-[10px]">
                <ShieldCheck className="w-6 h-6 text-indigo-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
                  VeriText<span className="text-indigo-400">.AI</span>
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  NLP Workbench
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                Interpretability, Ablation & Misinformation Classifier
              </p>
            </div>
          </div>

          {/* Nav Tabs */}
          <nav className="hidden xl:flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all duration-200 relative ${
                    isActive 
                      ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-md shadow-indigo-600/25 border border-indigo-500/30' 
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/70'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-extrabold uppercase tracking-wide ${
                      isActive ? 'bg-white/20 text-white' : 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action / Research Disclaimer Button */}
          <div className="flex items-center space-x-3">
            <button
              onClick={onOpenDisclaimer}
              className="flex items-center space-x-1.5 text-xs text-slate-400 hover:text-slate-200 bg-slate-800/80 hover:bg-slate-800 px-3 py-2 rounded-lg border border-slate-700/60 transition-colors"
              title="Academic & Ethical AI Statement"
            >
              <Info className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden md:inline font-medium">Research Scope & Limits</span>
            </button>

            <a
              href="https://www.kaggle.com/datasets/clmentbisaillon/fake-and-real-news-dataset"
              target="_blank"
              rel="noreferrer"
              className="hidden lg:flex items-center space-x-1.5 text-xs font-medium text-slate-300 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 hover:from-cyan-500/20 hover:to-blue-500/20 border border-cyan-500/20 px-3 py-2 rounded-lg transition-all"
            >
              <span>Kaggle Data</span>
              <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
            </a>
          </div>

        </div>

        {/* Mobile Navigation Bar */}
        <div className="flex xl:hidden overflow-x-auto py-2.5 space-x-1.5 no-scrollbar border-t border-slate-800/80">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 transition-all ${
                  isActive 
                    ? 'bg-indigo-600 text-white shadow shadow-indigo-600/30' 
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/70'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

      </div>
    </header>
  );
};
