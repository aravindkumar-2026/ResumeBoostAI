import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { LandingPage } from './components/LandingPage';
import { ResumeUpload } from './components/ResumeUpload';
import { AtsDashboard } from './components/AtsDashboard';
import { HistoryView } from './components/HistoryView';
import { CompareView } from './components/CompareView';
import { DocsView } from './components/DocsView';
import { AnalysisResult, CoverLetterResult } from './types';
import { getSavedHistory, saveAnalysisToHistory, deleteAnalysisFromHistory, clearAllHistory, getSavedTheme, saveTheme } from './utils/storage';

export default function App() {
  const [currentView, setCurrentView] = useState<string>('landing');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [history, setHistory] = useState<AnalysisResult[]>(getSavedHistory);
  const [currentAnalysis, setCurrentAnalysis] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  
  // Compare pair state
  const [comparePair, setComparePair] = useState<{ a: AnalysisResult | null; b: AnalysisResult | null }>({
    a: null,
    b: null
  });

  // Apply dark class to <html> element for dark/light mode
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    saveTheme(theme);
  }, [theme]);

  // Handle Resume Analysis API call
  const handleAnalyzeResume = async (fileData: { pdfBase64?: string; text?: string; fileName: string; fileSize: number; roleTitle: string }) => {
    setIsAnalyzing(true);
    try {
      const response = await fetch('/api/analyze-resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pdfBase64: fileData.pdfBase64,
          resumeText: fileData.text,
          fileName: fileData.fileName,
          fileSize: fileData.fileSize,
          targetRole: fileData.roleTitle
        })
      });

      if (!response.ok) {
        throw new Error(`Server returned error ${response.status}`);
      }

      const result: AnalysisResult = await response.json();

      // Save to local storage history
      saveAnalysisToHistory(result);
      setHistory(getSavedHistory());

      // Update current active result & switch view
      setCurrentAnalysis(result);
      setCurrentView('dashboard');

    } catch (err) {
      console.error('Error analyzing resume:', err);
      alert('Failed to analyze resume. Please try again or paste resume text.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Cover Letter generation API call
  const handleGenerateCoverLetter = async (companyName: string): Promise<CoverLetterResult> => {
    if (!currentAnalysis) {
      throw new Error('No active analysis');
    }

    const response = await fetch('/api/generate-cover-letter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        resumeText: currentAnalysis.extractedText || currentAnalysis.summary,
        targetRole: currentAnalysis.targetRole,
        targetCompany: companyName
      })
    });

    if (!response.ok) {
      throw new Error('Failed to generate cover letter');
    }

    return await response.json();
  };

  // Delete analysis item from history
  const handleDeleteHistoryItem = (id: string) => {
    const updated = deleteAnalysisFromHistory(id);
    setHistory(updated);
    if (currentAnalysis?.id === id) {
      setCurrentAnalysis(updated[0] || null);
    }
  };

  // Clear all history
  const handleClearAllHistory = () => {
    clearAllHistory();
    setHistory([]);
    setCurrentAnalysis(null);
  };

  // Select 2 items for comparison
  const handleCompareSelect = (itemA: AnalysisResult, itemB: AnalysisResult) => {
    setComparePair({ a: itemA, b: itemB });
    setCurrentView('compare');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#09090b] text-zinc-100 selection:bg-blue-500/30 font-sans antialiased transition-colors duration-200">
      
      {/* Header Navbar */}
      <Header
        currentView={currentView}
        setCurrentView={setCurrentView}
        theme={theme}
        setTheme={setTheme}
        hasActiveAnalysis={currentAnalysis !== null}
      />

      {/* Main View Area */}
      <main className="flex-1">
        {currentView === 'landing' && (
          <LandingPage
            onStartAnalysis={() => setCurrentView('analyze')}
            onTrySample={(sampleId) => {
              setCurrentView('analyze');
            }}
          />
        )}

        {currentView === 'analyze' && (
          <ResumeUpload
            onAnalyze={handleAnalyzeResume}
            isAnalyzing={isAnalyzing}
          />
        )}

        {currentView === 'dashboard' && currentAnalysis && (
          <AtsDashboard
            analysis={currentAnalysis}
            onReanalyze={() => setCurrentView('analyze')}
            onGenerateCoverLetter={handleGenerateCoverLetter}
          />
        )}

        {currentView === 'history' && (
          <HistoryView
            history={history}
            onSelectAnalysis={(result) => {
              setCurrentAnalysis(result);
              setCurrentView('dashboard');
            }}
            onDeleteAnalysis={handleDeleteHistoryItem}
            onClearHistory={handleClearAllHistory}
            onCompareSelect={handleCompareSelect}
          />
        )}

        {currentView === 'compare' && (
          <CompareView
            analysisA={comparePair.a}
            analysisB={comparePair.b}
            history={history}
            onSelectComparePair={(a, b) => setComparePair({ a, b })}
            onBackToHistory={() => setCurrentView('history')}
          />
        )}

        {currentView === 'docs' && <DocsView />}
      </main>

      {/* Footer */}
      <Footer setCurrentView={setCurrentView} />

    </div>
  );
}
