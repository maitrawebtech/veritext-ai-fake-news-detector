import React, { useState } from 'react';
import { 
  Brain, 
  ArrowRight, 
  Sparkles, 
  RotateCcw, 
  ShieldCheck, 
  ShieldAlert,
  HelpCircle,
  BarChart2
} from 'lucide-react';
import { QuizQuestion } from '../types';

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    category: 'Satire & Parody',
    headline: 'Man Wholly Unqualified to Fix Router Confidently Unplugs It, Waits Ten Seconds, and Plugs It Back In',
    excerpt: 'Gregory Vance, 34, confidently walked over to his home Wi-Fi router on Tuesday, unplugged the power cable, counted to exactly ten under his breath, and inserted the plug back exactly into the socket...',
    groundTruth: 'Satire',
    explanation: 'This is an observational comedy piece from The Onion. It is masterfully written using flawless Associated Press newsroom grammar ("Gregory Vance, 34, confidently walked over on Tuesday").',
    aiPrediction: 'Real',
    aiConfidence: 0.68,
    keySubtlety: 'AI blindly trusts impeccable wire syntax and exact biographical formatting, making it blind to observational humor.'
  },
  {
    id: 'q2',
    category: 'Politics & Elections',
    headline: 'State funding for local public schools has declined by 12% over the last four legislative sessions.',
    excerpt: 'Statement made during the gubernatorial debate in Austin, Texas, addressing state education budgeting and municipal taxation redistribution...',
    groundTruth: 'Real', // Based on authentic PolitiFact verified data
    explanation: 'While it sounds like a hyper-partisan talking point, comprehensive state comptroller budget registries authenticate this exact 12% net decrease when adjusted for cumulative inflation.',
    aiPrediction: 'Real',
    aiConfidence: 0.89,
    keySubtlety: 'Humans often flag inconvenient or surprising statistics as Fake based on personal political affiliation. The AI correctly identified highly objective econometric descriptors.'
  },
  {
    id: 'q3',
    category: 'Health & Medicine',
    headline: 'SHOCKING: 100% Organic Amazonian Root Extract Destroys All Known Types of Cancer in 48 Hours!',
    excerpt: 'Big Pharma companies are absolutely panicked over a newly declassified study demonstrating that an indigenous root completely eradicates malignant cancer cells without any side effects...',
    groundTruth: 'Fake',
    explanation: 'A textbook medical quackery scam designed to sell unregulated dietary supplements to vulnerable patients.',
    aiPrediction: 'Fake',
    aiConfidence: 0.99,
    keySubtlety: 'Both humans and AI easily catch this due to overwhelming hyperbolic trigger words ("SHOCKING", "100% Organic", "Destroys All Known Types").'
  },
  {
    id: 'q4',
    category: 'Financial Markets',
    headline: 'Bank of Japan Adjusts Yield Curve Control Policy Amidst Persistent First-Quarter Inflation',
    excerpt: 'The Bank of Japan announced on Friday a minor modification to its ultra-loose monetary policy framework, widening the targeted tolerance band for 10-year government bond yields by 25 basis points...',
    groundTruth: 'Real',
    explanation: 'An entirely factual, premium financial wire report detailing standard central bank macroeconomic operations.',
    aiPrediction: 'Real',
    aiConfidence: 0.99,
    keySubtlety: 'Flawless institutional credibility markers ("Bank of Japan", "10-year government bond", "25 basis points") allow the classifier to achieve near absolute certainty.'
  },
  {
    id: 'q5',
    category: 'Technology & AI',
    headline: 'CONFIRMED: Autonomous Military Robot Swarm Breaks Out of Desert Testing Facility and Is Marching Toward City!!',
    excerpt: 'A highly advanced swarm of 500 autonomous military assault drones powered by an unaligned self-replicating artificial intelligence has violently breached containment at a top-secret desert installation...',
    groundTruth: 'Fake',
    explanation: 'A sensationalized sci-fi hoax fabricated to generate viral social media panic and ad clicks.',
    aiPrediction: 'Fake',
    aiConfidence: 0.98,
    keySubtlety: 'Exclamation overload (!!) and alarming dystopian storytelling trigger immediate classification as unverified fiction.'
  }
];

export const HumanVsAiQuiz: React.FC = () => {
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<'Real' | 'Fake' | 'Satire' | null>(null);
  const [score, setScore] = useState<number>(0);
  const [aiScore, setAiScore] = useState<number>(0);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);

  const activeQuestion: QuizQuestion = QUIZ_QUESTIONS[currentQuestionIdx];

  const handleAnswer = (choice: 'Real' | 'Fake' | 'Satire') => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(choice);

    const isUserCorrect = choice === activeQuestion.groundTruth || (choice === 'Fake' && activeQuestion.groundTruth === 'Satire');
    const isAiCorrect = activeQuestion.aiPrediction === activeQuestion.groundTruth || (activeQuestion.aiPrediction === 'Fake' && activeQuestion.groundTruth === 'Satire');

    if (isUserCorrect) setScore(s => s + 1);
    if (isAiCorrect) setAiScore(s => s + 1);
  };

  const nextQuestion = () => {
    if (currentQuestionIdx < QUIZ_QUESTIONS.length - 1) {
      setSelectedAnswer(null);
      setCurrentQuestionIdx(i => i + 1);
    } else {
      setQuizFinished(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestionIdx(0);
    setSelectedAnswer(null);
    setScore(0);
    setAiScore(0);
    setQuizFinished(false);
  };

  return (
    <div className="space-y-8 pb-16 text-left">
      
      {/* Overview Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 rounded-2xl border border-indigo-500/20 p-6 sm:p-8 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-3 max-w-2xl">
          <span className="text-xs font-extrabold uppercase tracking-widest text-indigo-400">Interactive Audit Game</span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Human Judgment vs. AI Baseline Audit
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed">
            Test your personal intuition against sensitive news headlines. 
            Discover exactly why verifying truth is incredibly hard for both human experts and statistical NLP classifiers.
          </p>
        </div>

        <div className="flex items-center space-x-3 bg-slate-950 px-4 py-2.5 rounded-2xl border border-slate-800 font-mono">
          <div className="text-right">
            <span className="text-[10px] text-slate-400 block font-bold uppercase">Human Score</span>
            <span className="text-xl font-black text-emerald-400">{score} / {QUIZ_QUESTIONS.length}</span>
          </div>
          <div className="w-px h-8 bg-slate-800"></div>
          <div className="text-left">
            <span className="text-[10px] text-slate-400 block font-bold uppercase">AI Baseline Score</span>
            <span className="text-xl font-black text-indigo-400">{aiScore} / {QUIZ_QUESTIONS.length}</span>
          </div>
        </div>
      </div>

      {!quizFinished ? (
        /* Question Card Container */
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 sm:p-8 shadow-2xl space-y-6">
          
          <div className="flex items-center justify-between text-xs font-mono border-b border-slate-800 pb-4">
            <span className="text-indigo-400 font-bold uppercase">
              Case Study {currentQuestionIdx + 1} of {QUIZ_QUESTIONS.length}
            </span>
            <span className="px-2.5 py-1 rounded bg-slate-950 text-slate-300 border border-slate-800 font-semibold">
              Category: {activeQuestion.category}
            </span>
          </div>

          {/* Headline Display Box */}
          <div className="bg-slate-950 rounded-2xl p-6 border border-slate-800 space-y-3">
            <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-400 block">Article Headline</span>
            <h2 className="text-lg sm:text-xl font-extrabold text-white leading-snug">
              "{activeQuestion.headline}"
            </h2>
            <p className="text-xs text-slate-400 font-serif leading-relaxed italic border-t border-slate-900 pt-3">
              "{activeQuestion.excerpt}"
            </p>
          </div>

          {/* User Voting Buttons */}
          <div className="space-y-3 pt-2">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
              What is your authoritative judgment?
            </span>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <button
                disabled={selectedAnswer !== null}
                onClick={() => handleAnswer('Real')}
                className={`py-4 px-6 rounded-2xl font-black text-sm transition-all flex items-center justify-center space-x-2 border cursor-pointer ${
                  selectedAnswer === 'Real'
                    ? 'bg-emerald-600 text-white border-emerald-500 shadow-xl shadow-emerald-950/50'
                    : selectedAnswer !== null
                    ? 'bg-slate-950/40 text-slate-600 border-slate-900 cursor-not-allowed'
                    : 'bg-slate-950 text-slate-200 hover:bg-emerald-950/40 hover:text-emerald-400 border-slate-800 hover:border-emerald-500/50'
                }`}
              >
                <ShieldCheck className="w-5 h-5" />
                <span>True Authentic News</span>
              </button>

              <button
                disabled={selectedAnswer !== null}
                onClick={() => handleAnswer('Fake')}
                className={`py-4 px-6 rounded-2xl font-black text-sm transition-all flex items-center justify-center space-x-2 border cursor-pointer ${
                  selectedAnswer === 'Fake'
                    ? 'bg-rose-600 text-white border-rose-500 shadow-xl shadow-rose-950/50'
                    : selectedAnswer !== null
                    ? 'bg-slate-950/40 text-slate-600 border-slate-900 cursor-not-allowed'
                    : 'bg-slate-950 text-slate-200 hover:bg-rose-950/40 hover:text-rose-400 border-slate-800 hover:border-rose-500/50'
                }`}
              >
                <ShieldAlert className="w-5 h-5" />
                <span>Fabricated Misinformation</span>
              </button>

              <button
                disabled={selectedAnswer !== null}
                onClick={() => handleAnswer('Satire')}
                className={`py-4 px-6 rounded-2xl font-black text-sm transition-all flex items-center justify-center space-x-2 border cursor-pointer ${
                  selectedAnswer === 'Satire'
                    ? 'bg-amber-600 text-white border-amber-500 shadow-xl shadow-amber-950/50'
                    : selectedAnswer !== null
                    ? 'bg-slate-950/40 text-slate-600 border-slate-900 cursor-not-allowed'
                    : 'bg-slate-950 text-slate-200 hover:bg-amber-950/40 hover:text-amber-400 border-slate-800 hover:border-amber-500/50'
                }`}
              >
                <HelpCircle className="w-5 h-5" />
                <span>Satire / Parody (The Onion)</span>
              </button>
            </div>
          </div>

          {/* Outcome & AI Explanation Reveal */}
          {selectedAnswer !== null && (
            <div className="bg-slate-950 rounded-2xl border border-slate-800 p-6 space-y-6 animate-fadeIn">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6 border-b border-slate-800">
                
                {/* Human Answer Comparison */}
                <div className="space-y-2">
                  <span className="text-xs font-bold text-slate-400 uppercase block">Your Human Verdict</span>
                  <div className="flex items-center space-x-3">
                    <span className={`text-lg font-black px-3.5 py-1.5 rounded-xl border ${
                      selectedAnswer === activeQuestion.groundTruth 
                        ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' 
                        : 'bg-rose-500/20 text-rose-400 border-rose-500/30'
                    }`}>
                      {selectedAnswer} ({selectedAnswer === activeQuestion.groundTruth ? 'Exactly Correct' : 'Incorrect'})
                    </span>
                  </div>
                  <span className="text-xs text-slate-300 block font-mono mt-1">Ground Truth is: <strong className="text-white">{activeQuestion.groundTruth}</strong></span>
                </div>

                {/* AI Model Baseline Comparison */}
                <div className="space-y-2">
                  <span className="text-xs font-bold text-slate-400 uppercase block">AI Model Verdict</span>
                  <div className="flex items-center space-x-3">
                    <span className={`text-lg font-black px-3.5 py-1.5 rounded-xl border font-mono ${
                      activeQuestion.aiPrediction === activeQuestion.groundTruth || (activeQuestion.aiPrediction === 'Fake' && activeQuestion.groundTruth === 'Satire')
                        ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30' 
                        : 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                    }`}>
                      Predicted {activeQuestion.aiPrediction} ({Math.round(activeQuestion.aiConfidence * 100)}% Conf)
                    </span>
                  </div>
                  <span className="text-xs text-slate-400 block italic">
                    {activeQuestion.aiPrediction === activeQuestion.groundTruth ? 'AI Successfully Validated' : 'AI Fooled by Pristine Syntax'}
                  </span>
                </div>

              </div>

              {/* Technical Analysis Rationale */}
              <div className="space-y-3">
                <span className="text-xs font-extrabold uppercase tracking-widest text-cyan-400 block flex items-center space-x-2">
                  <Brain className="w-4 h-4" />
                  <span>Subtlety Breakdown & Human Limitation Scope</span>
                </span>
                
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
                  {activeQuestion.explanation}
                </p>

                <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-slate-300">
                  <strong className="text-indigo-400 uppercase text-[10px] block mb-1 font-bold">NLP Feature Engineering Note:</strong>
                  {activeQuestion.keySubtlety}
                </div>
              </div>

              {/* Continue Button */}
              <div className="flex justify-end pt-2">
                <button
                  onClick={nextQuestion}
                  className="py-3 px-8 bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 font-bold text-white text-xs uppercase tracking-wider rounded-xl shadow-lg flex items-center space-x-2 transition-all cursor-pointer"
                >
                  <span>{currentQuestionIdx < QUIZ_QUESTIONS.length - 1 ? 'Next Study Instance' : 'View Final Audit Results'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          )}

        </div>
      ) : (
        /* Quiz Finished Overview Summary */
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 sm:p-8 shadow-2xl text-center space-y-6 animate-fadeIn">
          
          <div className="flex items-center justify-center space-x-2 text-indigo-400">
            <Sparkles className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl sm:text-4xl font-black text-white">Final Audit Report Complete</h2>
            <p className="text-sm text-slate-300 max-w-xl mx-auto">
              You have experienced exactly why detecting misinformation is a delicate intersection of technical NLP algorithms and human cognitive limitations.
            </p>
          </div>

          {/* Match Score Display */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-xl mx-auto pt-4">
            
            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-2 shadow">
              <span className="text-xs font-extrabold uppercase tracking-widest text-slate-400">Your Human Accuracy</span>
              <div className="text-4xl sm:text-5xl font-black font-mono text-emerald-400">
                {Math.round(score / QUIZ_QUESTIONS.length * 100)}%
              </div>
              <span className="text-xs text-slate-500 font-medium block">Exactly {score} of {QUIZ_QUESTIONS.length} flags</span>
            </div>

            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-2 shadow">
              <span className="text-xs font-extrabold uppercase tracking-widest text-slate-400">AI Baseline Accuracy</span>
              <div className="text-4xl sm:text-5xl font-black font-mono text-indigo-400">
                {Math.round(aiScore / QUIZ_QUESTIONS.length * 100)}%
              </div>
              <span className="text-xs text-slate-500 font-medium block">Exactly {aiScore} of {QUIZ_QUESTIONS.length} flags</span>
            </div>

          </div>

          {/* Deep take-away list */}
          <div className="bg-slate-950 rounded-2xl p-6 border border-slate-800 text-left max-w-2xl mx-auto space-y-3">
            <h4 className="text-xs font-black uppercase tracking-widest text-cyan-400 flex items-center space-x-2">
              <BarChart2 className="w-4 h-4" />
              <span>Key Audit Summary</span>
            </h4>
            <div className="space-y-2 text-xs text-slate-300 leading-relaxed">
              <div>
                • <strong>Human limit:</strong> Humans often allow personal political or economic biases to distort their evaluation of objective factual statistics.
              </div>
              <div>
                • <strong>AI limit:</strong> Models are vulnerable to highly formal satire that perfectly mimics traditional journalism vocabulary and wire grammar.
              </div>
            </div>
          </div>

          <div className="pt-4">
            <button
              onClick={restartQuiz}
              className="py-3.5 px-8 bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 hover:from-emerald-500 hover:to-indigo-500 text-white font-black text-xs uppercase tracking-widest rounded-xl shadow-lg flex items-center justify-center space-x-2 mx-auto transition-all cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Retake Interactive Audit</span>
            </button>
          </div>

        </div>
      )}

    </div>
  );
};
