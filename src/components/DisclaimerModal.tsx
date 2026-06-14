import React from 'react';
import { ShieldAlert, AlertTriangle, X } from 'lucide-react';

interface DisclaimerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DisclaimerModal: React.FC<DisclaimerModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
      
      <div className="relative bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl space-y-6 text-left">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg bg-slate-800/80 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-3 text-amber-400 border-b border-slate-800 pb-4">
          <AlertTriangle className="w-7 h-7 shrink-0" />
          <div>
            <h3 className="text-lg font-black text-white">System Limitations & Academic Scope</h3>
            <span className="text-xs font-mono text-slate-400">VeriText.AI Ethical Use Policy</span>
          </div>
        </div>

        <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
          
          <p>
            <strong>VeriText.AI</strong> is designed as a <strong className="text-white underline">controlled, academic NLP research aid</strong> intended to highlight statistical patterns in lexical sentiment, structural sensationalism, and wire agency markers. It is explicitly <strong className="text-rose-400 font-bold uppercase">not an authoritative fact-checker</strong>.
          </p>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center space-x-1.5">
              <ShieldAlert className="w-4 h-4 text-rose-400" />
              <span>Why Natural Language Models Have Factual Blind Spots</span>
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li>• <strong className="text-slate-300">Decontextualized truth:</strong> A classifier reads syntax, not external reality. A true statistic taken out of context to mislead voters will be scored as "Real" by text-only models.</li>
              <li>• <strong className="text-slate-300">Pristine deceptive grammar:</strong> State-sponsored disinformation often utilizes flawless newsroom datelines ("WASHINGTON (Reuters)") that mimic authentic training distributions.</li>
              <li>• <strong className="text-slate-300">Satire misinterpretation:</strong> Outlets like <em>The Onion</em> use perfect AP wire formatting, making them nearly impossible for pure syntax classifiers to separate from genuine breaking news.</li>
            </ul>
          </div>

          <p className="text-xs text-slate-400 italic">
            When reviewing political, public health, or financial claims, always verify information through primary institutional sources (e.g., CISA, WHO, FDA, SEC) and credentialed human investigative journalism organizations.
          </p>

        </div>

        <div className="pt-2 flex justify-end">
          <button
            onClick={onClose}
            className="py-3 px-6 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg transition-all cursor-pointer"
          >
            I Understand & Agree
          </button>
        </div>

      </div>

    </div>
  );
};
