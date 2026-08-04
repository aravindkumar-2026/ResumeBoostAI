import React, { useState } from 'react';
import { History, Trash2, ArrowRight, GitCompare, Search, FileText, Sparkles, CheckCircle2 } from 'lucide-react';
import { AnalysisResult } from '../types';

interface HistoryViewProps {
  history: AnalysisResult[];
  onSelectAnalysis: (result: AnalysisResult) => void;
  onDeleteAnalysis: (id: string) => void;
  onClearHistory: () => void;
  onCompareSelect: (analysisA: AnalysisResult, analysisB: AnalysisResult) => void;
}

export const HistoryView: React.FC<HistoryViewProps> = ({
  history,
  onSelectAnalysis,
  onDeleteAnalysis,
  onClearHistory,
  onCompareSelect
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedForCompare, setSelectedForCompare] = useState<string[]>([]);

  const filteredHistory = history.filter(item => 
    item.fileName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.targetRole.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleCompareSelection = (id: string) => {
    if (selectedForCompare.includes(id)) {
      setSelectedForCompare(selectedForCompare.filter(i => i !== id));
    } else {
      if (selectedForCompare.length >= 2) {
        setSelectedForCompare([selectedForCompare[1], id]);
      } else {
        setSelectedForCompare([...selectedForCompare, id]);
      }
    }
  };

  const handleTriggerCompare = () => {
    if (selectedForCompare.length === 2) {
      const itemA = history.find(h => h.id === selectedForCompare[0]);
      const itemB = history.find(h => h.id === selectedForCompare[1]);
      if (itemA && itemB) {
        onCompareSelect(itemA, itemB);
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Top Title Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold text-white flex items-center gap-3">
            <History className="w-8 h-8 text-blue-400" />
            <span>Analysis History ({history.length})</span>
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Review past ATS resume scans, track score improvements over time, or compare resume revisions.
          </p>
        </div>

        {/* Top Controls */}
        <div className="flex items-center gap-3">
          {selectedForCompare.length === 2 && (
            <button
              onClick={handleTriggerCompare}
              className="px-4 py-2 rounded-xl bg-zinc-100 hover:bg-white text-zinc-950 text-xs font-semibold shadow-md flex items-center gap-2 cursor-pointer transition-all"
            >
              <GitCompare className="w-4 h-4 text-blue-600" />
              <span>Compare Selected (2)</span>
            </button>
          )}

          {history.length > 0 && (
            <button
              onClick={onClearHistory}
              className="px-3 py-2 rounded-xl bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 text-xs font-medium border border-rose-500/20 cursor-pointer transition-colors"
            >
              Clear All
            </button>
          )}
        </div>
      </div>

      {/* Search Input */}
      {history.length > 0 && (
        <div className="relative max-w-md">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-zinc-500" />
          <input
            type="text"
            placeholder="Search history by filename or role..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl text-xs bg-zinc-900 border border-zinc-800 text-zinc-200 focus:outline-none focus:border-blue-500"
          />
        </div>
      )}

      {/* History List */}
      {history.length === 0 ? (
        <div className="p-12 rounded-3xl bg-zinc-900/50 border border-zinc-800 text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-zinc-800 text-zinc-500 mx-auto flex items-center justify-center">
            <History className="w-8 h-8" />
          </div>
          <h2 className="text-lg font-semibold text-white">No Saved Analyses Found</h2>
          <p className="text-xs text-zinc-400 max-w-md mx-auto">
            Once you scan a resume, your evaluation results will be automatically saved here for convenient tracking and side-by-side version comparison.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredHistory.map((item) => {
            const isSelectedCompare = selectedForCompare.includes(item.id);
            return (
              <div
                key={item.id}
                className={`p-5 rounded-3xl bg-zinc-900/50 border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                  isSelectedCompare
                    ? 'border-blue-500 bg-blue-500/10 shadow-sm'
                    : 'border-zinc-800 hover:border-zinc-700'
                }`}
              >
                
                {/* Left File & Role Info */}
                <div className="flex items-start gap-3.5 min-w-0">
                  <input
                    type="checkbox"
                    checked={isSelectedCompare}
                    onChange={() => toggleCompareSelection(item.id)}
                    className="mt-1 rounded border-zinc-700 bg-zinc-800 text-blue-500 focus:ring-blue-500 cursor-pointer"
                    title="Select to compare"
                  />

                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5" />
                  </div>

                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-sm font-semibold text-white truncate">
                        {item.fileName}
                      </h3>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                        {item.targetRole}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-500 mt-1">
                      Scanned on {new Date(item.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* Right Scores & Buttons */}
                <div className="flex items-center gap-4 shrink-0 justify-between sm:justify-end border-t sm:border-t-0 pt-3 sm:pt-0 border-zinc-800">
                  
                  {/* Score pill */}
                  <div className="text-right">
                    <span className={`text-xl font-extrabold ${
                      item.atsScore >= 80 ? 'text-emerald-400' : item.atsScore >= 60 ? 'text-amber-400' : 'text-rose-400'
                    }`}>
                      {item.atsScore} / 100
                    </span>
                    <p className="text-[10px] text-zinc-500 font-medium">ATS Score</p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onSelectAnalysis(item)}
                      className="px-3.5 py-2 rounded-xl bg-zinc-100 hover:bg-white text-zinc-950 text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
                    >
                      <span>View Report</span>
                      <ArrowRight className="w-3.5 h-3.5 text-blue-600" />
                    </button>

                    <button
                      onClick={() => onDeleteAnalysis(item.id)}
                      className="p-2 rounded-xl text-zinc-500 hover:text-rose-400 hover:bg-zinc-800 transition-colors cursor-pointer"
                      title="Delete Report"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                </div>

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
