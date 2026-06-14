import React, { useState } from 'react';
import { 
  MessageSquare, 
  Video, 
  Globe, 
  Sparkles, 
  Bot, 
  Volume2, 
  CheckCircle, 
  ExternalLink,
  Send
} from 'lucide-react';

export const PragmaticAiHub: React.FC = () => {
  const [discordInput, setDiscordInput] = useState<string>("https://patrioteaglenews.net/breaking-whistleblower-exposes-voting-algorithm");
  const [discordMessages, setDiscordMessages] = useState<{ id: number; sender: 'user' | 'bot'; text: string; embed?: boolean }[]>([
    { id: 1, sender: 'user', text: '!veritext https://reuters.com/article/us-fec-campaign-guidelines-2026' },
    { id: 2, sender: 'bot', text: '✅ **VERITEXT TRIAGE: Likely Real News (98.1% Confidence)**\n• Authoritative source detected: Reuters Wire\n• Validated named entities: Federal Election Commission, Chair Ellen Weintraub\n• Sensationalism factor: Very Low (10/100)\n*Research aid only. Cross-check with official FEC meeting minutes.*', embed: true },
  ]);
  const [youtubeSimulated, setYoutubeSimulated] = useState<boolean>(false);

  const handleSendDiscord = (e: React.FormEvent) => {
    e.preventDefault();
    if (!discordInput.trim()) return;

    const newId = discordMessages.length + 1;
    setDiscordMessages(prev => [...prev, { id: newId, sender: 'user', text: `!veritext ${discordInput}` }]);

    const isFake = discordInput.includes('breaking') || discordInput.includes('patriot') || discordInput.includes('secret');

    setTimeout(() => {
      const reply = isFake 
        ? '🚨 **VERITEXT TRIAGE: Likely Misinformation (96.2% Confidence)**\n• Flaw detected: Extreme capitalized clickbait ("BREAKING", "EXPOSES")\n• Corroboration score: 0/100 (No CISA or AP wire confirmations found)\n• Explainer token trigger: "Whistleblower" (-0.42), "Secret" (-0.79)\n*Caution: Recommended Google search: CISA election machine security audit.*'
        : '✅ **VERITEXT TRIAGE: Authentic News Pattern (94.5% Confidence)**\n• Factual density: Standard journalistic wire\n• Verifiable markers found in article metadata.';
      
      setDiscordMessages(prev => [...prev, { id: newId + 1, sender: 'bot', text: reply, embed: true }]);
      setDiscordInput('');
    }, 600);
  };

  return (
    <div className="space-y-8 pb-16 text-left">
      
      {/* Overview Banner connecting to Reddit thread */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 rounded-2xl border border-indigo-500/20 p-6 sm:p-8 shadow-xl space-y-4">
        
        <div className="flex flex-wrap items-center justify-between gap-4">
          <span className="text-xs font-extrabold uppercase tracking-widest text-indigo-400 flex items-center space-x-1.5">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span>The r/ArtificialInteligence Builders Philosophy</span>
          </span>

          <a
            href="https://www.reddit.com/r/ArtificialInteligence/"
            target="_blank"
            rel="noreferrer"
            className="text-xs text-cyan-400 hover:text-cyan-300 underline font-semibold flex items-center space-x-1"
          >
            <span>Read Reddit Discussion Pattern</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
          Why Real AI Projects Look Simple Because They Get Used
        </h1>

        <p className="text-sm text-slate-300 leading-relaxed font-medium">
          In active AI developer communities, builders agree that complex 50-layer deep learning experiments often gather dust in Jupyter notebooks. 
          The projects developers actually stick with and use daily share three definitive traits: <strong className="text-white">a crystal-clear scope, real daily inputs, and a fast interactive interface you can run anywhere</strong>. 
          Below are three blueprints for deploying our Fake News Classifier into real daily workflows:
        </p>
      </div>

      {/* Grid of 3 pragmatic deployments */}
      <div className="space-y-8">
        
        {/* DEPLOYMENT 1: Discord Bot Interface Sandbox */}
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 sm:p-8 shadow-2xl space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-black text-white">1. NewsGuard Interactive Discord Chatbot</h3>
                <p className="text-xs text-slate-400">Plugs into news link sharing servers to run real-time credibility audits and summarize key entities.</p>
              </div>
            </div>
            <span className="text-xs font-mono font-bold text-emerald-400 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800">
              ⚡ Python Discord.py API
            </span>
          </div>

          {/* Simulated Discord Window */}
          <div className="bg-slate-950 rounded-xl border border-slate-800 overflow-hidden shadow-inner">
            
            {/* Header bar */}
            <div className="bg-slate-900 px-4 py-2.5 border-b border-slate-800 flex items-center space-x-2 text-xs font-bold text-slate-300 font-mono">
              <MessageSquare className="w-4 h-4 text-indigo-400" />
              <span>#general-news-triage</span>
            </div>

            {/* Message Thread */}
            <div className="p-4 space-y-4 max-h-72 overflow-y-auto font-sans text-xs">
              {discordMessages.map(msg => (
                <div key={msg.id} className="flex items-start space-x-3 text-left">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold font-mono text-xs shrink-0 ${
                    msg.sender === 'bot' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-300'
                  }`}>
                    {msg.sender === 'bot' ? 'AI' : 'US'}
                  </div>

                  <div className="space-y-1 flex-1">
                    <span className="font-bold text-slate-300 block">
                      {msg.sender === 'bot' ? 'VeriText Bot' : 'DevResearcher'} 
                      <span className="text-[10px] text-slate-500 font-mono ml-2">Today at 2:14 PM</span>
                    </span>

                    {msg.embed ? (
                      <div className="p-3.5 rounded-xl bg-indigo-950/40 border-l-4 border-indigo-500 text-slate-200 font-medium leading-relaxed whitespace-pre-line">
                        {msg.text}
                      </div>
                    ) : (
                      <p className="text-slate-100 font-mono text-xs bg-slate-900 py-1.5 px-3 rounded-lg inline-block">
                        {msg.text}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Input Form */}
            <form onSubmit={handleSendDiscord} className="p-3 bg-slate-900 border-t border-slate-800 flex items-center space-x-2">
              <input
                type="text"
                value={discordInput}
                onChange={(e) => setDiscordInput(e.target.value)}
                placeholder="Type !veritext <news URL> to test simulated Discord bot..."
                className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer"
              >
                <span>Audit Link</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>

          </div>
        </div>

        {/* DEPLOYMENT 2: YouTube Caption Summarizer & Audio Generator */}
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 sm:p-8 shadow-2xl space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20">
                <Video className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-black text-white">2. YouTube Caption Audio Podcast Summarizer</h3>
                <p className="text-xs text-slate-400">Pulls auto-captions from long 45-minute political videos and turns them into highly digestible audio bulletins with verified entity highlights.</p>
              </div>
            </div>
            <span className="text-xs font-mono font-bold text-cyan-400 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800">
              ⚡ Lightweight Audio Summaries
            </span>
          </div>

          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-slate-400">Target Video:</span>
                <h4 className="text-sm font-extrabold text-white mt-0.5">U.S. Senate Candidate Debate on Financial Technology Regulation (48 Mins)</h4>
              </div>

              {!youtubeSimulated ? (
                <button
                  onClick={() => setYoutubeSimulated(true)}
                  className="py-2.5 px-5 bg-gradient-to-r from-rose-600 to-indigo-600 hover:from-rose-500 hover:to-indigo-500 text-white font-bold text-xs uppercase rounded-xl transition-all flex items-center space-x-2 cursor-pointer"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>Generate Audio-Style Summary</span>
                </button>
              ) : (
                <div className="flex items-center space-x-2 text-xs font-bold text-emerald-400 bg-emerald-950/40 px-3 py-1.5 rounded-lg border border-emerald-500/30">
                  <CheckCircle className="w-4 h-4" />
                  <span>Audio & Triage Bulletins Active</span>
                </div>
              )}
            </div>

            {youtubeSimulated && (
              <div className="space-y-4 pt-3 border-t border-slate-800/80 animate-fadeIn text-xs">
                
                {/* Audio player stub */}
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <button className="w-9 h-9 rounded-full bg-indigo-600 text-white flex items-center justify-center hover:bg-indigo-500 font-bold">
                      ▶
                    </button>
                    <div>
                      <span className="font-bold text-white block">AI Audio Podcast Digest</span>
                      <span className="text-[10px] text-slate-400">0:00 / 1:24 — Normal wire tone certified</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-1">
                    {Array.from({ length: 16 }).map((_, i) => (
                      <span key={i} className="w-1 bg-indigo-500 rounded-full animate-pulse" style={{ height: `${12 + Math.random() * 20}px` }}></span>
                    ))}
                  </div>
                </div>

                {/* Extracted points */}
                <div className="space-y-2 text-slate-300 leading-relaxed">
                  <div>• <strong>Main Triage Outcome:</strong> Highly analytical, objective legislative debate (Label: Likely Real News).</div>
                  <div>• <strong>Key Entities Referenced:</strong> SEC, Federal Deposit Insurance Corporation, Consumer Financial Protection Bureau.</div>
                  <div>• <strong>Follow-up Prompt Suggestion:</strong> "What exact capital reserve percentage did Candidate Miller propose?"</div>
                </div>

              </div>
            )}

          </div>
        </div>

        {/* DEPLOYMENT 3: Browser RSS Feed Inspector Extension */}
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 sm:p-8 shadow-2xl space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                <Globe className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-black text-white">3. Fast RSS Feed Browser Triage Extension</h3>
                <p className="text-xs text-slate-400">A tiny JavaScript popup that runs our sub-15ms TF-IDF baseline directly in Chrome or Edge as you browse news feeds.</p>
              </div>
            </div>
            <span className="text-xs font-mono font-bold text-indigo-400 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800">
              ⚡ WebAssembly / CPU Inference
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Because our TF-IDF + PassiveAggressive classifier only requires a dictionary of 75,000 sparse bigram weights, the entire AI model fits in a tiny 2MB JSON file. It executes instantly in the user's browser without calling external cloud APIs, ensuring 100% reader privacy.
          </p>
        </div>

      </div>

    </div>
  );
};
