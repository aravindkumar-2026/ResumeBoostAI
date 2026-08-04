import React from 'react';
import { GitCompare, ArrowUpRight, ArrowDownRight, CheckCircle2, AlertCircle, ArrowRight, Trophy } from 'lucide-react';
import { AnalysisResult } from '../types';

interface CompareViewProps {
  analysisA: AnalysisResult | null;
  analysisB: AnalysisResult | null;
  history: AnalysisResult[];
  onSelectComparePair: (a: AnalysisResult, b: AnalysisResult) => void;
  onBackToHistory: () => void;
}

export const CompareView: React.FC<CompareViewProps> = ({
  analysisA,
  analysisB,
  history,
  onSelectComparePair,
  onBackToHistory
}) => {
  if (!analysisA || !analysisB) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-blue-500/10 text-blue-400 mx-auto flex items-center justify-center">
          <GitCompare className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-semibold text-white">Compare Resume Versions</h1>
        <p className="text-xs text-zinc-400 max-w-md mx-auto">
          Please select two saved resume analyses from your history to see a side-by-side ATS score delta, keyword changes, and version recommendation.
        </p>

        {history.length >= 2 ? (
          <div className="pt-4 max-w-lg mx-auto space-y-3">
            <p className="text-xs font-semibold text-zinc-400">Quick Select Recent Reports:</p>
            <button
              onClick={() => onSelectComparePair(history[0], history[1])}
              className="w-full p-4 rounded-2xl bg-zinc-900/50 border border-zinc-800 text-xs font-medium text-blue-400 hover:border-blue-500 transition-colors shadow-sm flex items-center justify-between cursor-pointer"
            >
              <span>Compare "{history[0].fileName}" vs "{history[1].fileName}"</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <button
            onClick={onBackToHistory}
            className="px-6 py-3 rounded-xl bg-zinc-100 text-zinc-950 text-xs font-semibold hover:bg-white transition-colors cursor-pointer"
          >
            Go to History Page
          </button>
        )}
      </div>
    );
  }

  // Calculate score deltas (B minus A)
  const scoreDelta = analysisB.atsScore - analysisA.atsScore;
  const winner = analysisB.atsScore > analysisA.atsScore ? 'B' : analysisA.atsScore > analysisB.atsScore ? 'A' : 'Tie';

  // Keyword shift analysis
  const keywordsA = new Set(analysisA.skillMatch.matchingSkills);
  const keywordsB = new Set(analysisB.skillMatch.matchingSkills);

  const newlyAddedKeywords = [...keywordsB].filter(k => !keywordsA.has(k));
  const removedKeywords = [...keywordsA].filter(k => !keywordsB.has(k));

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold text-white flex items-center gap-3">
            <GitCompare className="w-8 h-8 text-blue-400" />
            <span>Resume Version Comparison</span>
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Comparing <strong className="text-zinc-200">{analysisA.fileName}</strong> against <strong className="text-zinc-200">{analysisB.fileName}</strong>
          </p>
        </div>

        <button
          onClick={onBackToHistory}
          className="px-4 py-2 rounded-xl bg-zinc-800 text-zinc-300 hover:bg-zinc-700 text-xs font-semibold transition-colors cursor-pointer"
        >
          Back to History
        </button>
      </div>

      {/* Comparison Delta Banner */}
      <div className="p-6 rounded-3xl bg-zinc-900/50 border border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-400" />
            <h2 className="text-lg font-semibold text-white">
              {winner === 'B' ? `Version B (${analysisB.fileName}) is Stronger` : winner === 'A' ? `Version A (${analysisA.fileName}) is Stronger` : 'Both Versions Score Equally'}
            </h2>
          </div>
          <p className="text-xs text-zinc-400">
            {winner === 'B' 
              ? `Score improved by +${scoreDelta} points with additional keyword coverage.` 
              : winner === 'A'
              ? `Version A retains a higher ATS score by +${Math.abs(scoreDelta)} points.`
              : 'Both resume files achieve the exact same ATS pass probability.'}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-center">
            <p className="text-xs text-zinc-500 font-medium">ATS Score Delta</p>
            <p className={`text-2xl font-bold flex items-center justify-center gap-1 ${
              scoreDelta > 0 ? 'text-emerald-400' : scoreDelta < 0 ? 'text-rose-400' : 'text-zinc-400'
            }`}>
              {scoreDelta > 0 ? <ArrowUpRight className="w-5 h-5" /> : scoreDelta < 0 ? <ArrowDownRight className="w-5 h-5" /> : null}
              {scoreDelta > 0 ? `+${scoreDelta}` : scoreDelta}
            </p>
          </div>
        </div>
      </div>

      {/* Side-by-Side Comparison Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Version A Card */}
        <div className={`p-6 rounded-3xl bg-zinc-900/50 border space-y-5 ${winner === 'A' ? 'border-emerald-500/50 bg-emerald-500/10' : 'border-zinc-800'}`}>
          <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3">
            <div>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-zinc-800 text-zinc-300">
                Version A
              </span>
              <h3 className="text-base font-semibold text-white mt-1">{analysisA.fileName}</h3>
              <p className="text-[11px] text-zinc-500">{analysisA.targetRole}</p>
            </div>
            <div className="text-right">
              <span className="text-3xl font-bold text-blue-400">{analysisA.atsScore}</span>
              <span className="text-zinc-500 text-xs">/100</span>
            </div>
          </div>

          <div className="space-y-3 text-xs text-zinc-300">
            <div>
              <strong className="text-white block mb-1">Quality & Readability:</strong>
              <p>Quality: {analysisA.qualityScore}/100 • Readability: {analysisA.readabilityScore}/100</p>
            </div>
            <div>
              <strong className="text-white block mb-1">Matching Keywords ({analysisA.skillMatch.matchingSkills.length}):</strong>
              <div className="flex flex-wrap gap-1">
                {analysisA.skillMatch.matchingSkills.map((sk, i) => (
                  <span key={i} className="px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-300 text-[10px] font-medium border border-zinc-700/60">
                    {sk}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Version B Card */}
        <div className={`p-6 rounded-3xl bg-zinc-900/50 border space-y-5 ${winner === 'B' ? 'border-emerald-500/50 bg-emerald-500/10' : 'border-zinc-800'}`}>
          <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3">
            <div>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-zinc-800 text-zinc-300">
                Version B
              </span>
              <h3 className="text-base font-semibold text-white mt-1">{analysisB.fileName}</h3>
              <p className="text-[11px] text-zinc-500">{analysisB.targetRole}</p>
            </div>
            <div className="text-right">
              <span className="text-3xl font-bold text-blue-400">{analysisB.atsScore}</span>
              <span className="text-zinc-500 text-xs">/100</span>
            </div>
          </div>

          <div className="space-y-3 text-xs text-zinc-300">
            <div>
              <strong className="text-white block mb-1">Quality & Readability:</strong>
              <p>Quality: {analysisB.qualityScore}/100 • Readability: {analysisB.readabilityScore}/100</p>
            </div>
            <div>
              <strong className="text-white block mb-1">Matching Keywords ({analysisB.skillMatch.matchingSkills.length}):</strong>
              <div className="flex flex-wrap gap-1">
                {analysisB.skillMatch.matchingSkills.map((sk, i) => (
                  <span key={i} className="px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-300 text-[10px] font-medium border border-zinc-700/60">
                    {sk}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Keyword Shift Matrix */}
      <div className="p-6 rounded-3xl bg-zinc-900/50 border border-zinc-800 space-y-4">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
          Keyword Shift Analysis (Version A → Version B)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <h4 className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              <span>Newly Gained Keywords in B ({newlyAddedKeywords.length})</span>
            </h4>
            {newlyAddedKeywords.length > 0 ? (
              <div className="flex flex-wrap gap-1.5">
                {newlyAddedKeywords.map((k, i) => (
                  <span key={i} className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-300 text-xs font-medium border border-emerald-500/20">
                    + {k}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-xs text-zinc-500 italic">No new matching keywords detected in Version B.</p>
            )}
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-semibold text-rose-400 flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4" />
              <span>Removed Keywords from A ({removedKeywords.length})</span>
            </h4>
            {removedKeywords.length > 0 ? (
              <div className="flex flex-wrap gap-1.5">
                {removedKeywords.map((k, i) => (
                  <span key={i} className="px-2.5 py-1 rounded-full bg-rose-500/10 text-rose-300 text-xs font-medium border border-rose-500/20">
                    - {k}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-xs text-zinc-500 italic">No previous keywords were lost in Version B.</p>
            )}
          </div>
        </div>
      </div>

    </div>
  );
};
