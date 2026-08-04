import React from 'react';
import { Sparkles, FileSearch, History, GitCompare, BookOpen, Sun, Moon, ArrowRight } from 'lucide-react';

interface HeaderProps {
  currentView: string;
  setCurrentView: (view: string) => void;
  theme: 'dark' | 'light';
  setTheme: (theme: 'dark' | 'light') => void;
  hasActiveAnalysis: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  setCurrentView,
  theme,
  setTheme,
  hasActiveAnalysis
}) => {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-[#09090b]/80 border-b border-zinc-800/60 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo */}
        <button
          id="brand-logo-btn"
          onClick={() => setCurrentView('landing')}
          className="flex items-center gap-3 group focus:outline-none text-left"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 via-indigo-500 to-cyan-400 p-0.5 shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform duration-200 flex items-center justify-center">
            <div className="w-full h-full bg-[#09090b] rounded-[6px] flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-blue-400 group-hover:rotate-12 transition-transform duration-200" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-lg text-white tracking-tight">ResumeBoost <span className="text-blue-500">AI</span></span>
            </div>
            <p className="text-[10px] text-zinc-400 font-medium hidden sm:block">ATS Resume Analyzer & Career Optimizer</p>
          </div>
        </button>

        {/* Navigation Tabs (Sleek Pill Bar) */}
        <nav className="hidden md:flex items-center bg-zinc-900 rounded-full px-1 py-1 border border-zinc-800 text-xs font-medium">
          <button
            id="nav-analyze-btn"
            onClick={() => setCurrentView('analyze')}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-full transition-all duration-150 ${
              currentView === 'analyze'
                ? 'bg-zinc-800 text-white shadow-sm font-semibold'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
            }`}
          >
            <FileSearch className="w-3.5 h-3.5" />
            <span>Analyze Resume</span>
          </button>

          {hasActiveAnalysis && (
            <button
              id="nav-dashboard-btn"
              onClick={() => setCurrentView('dashboard')}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-full transition-all duration-150 ${
                currentView === 'dashboard'
                  ? 'bg-zinc-800 text-white shadow-sm font-semibold'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              <span>ATS Dashboard</span>
            </button>
          )}

          <button
            id="nav-history-btn"
            onClick={() => setCurrentView('history')}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-full transition-all duration-150 ${
              currentView === 'history'
                ? 'bg-zinc-800 text-white shadow-sm font-semibold'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
            }`}
          >
            <History className="w-3.5 h-3.5" />
            <span>History</span>
          </button>

          <button
            id="nav-compare-btn"
            onClick={() => setCurrentView('compare')}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-full transition-all duration-150 ${
              currentView === 'compare'
                ? 'bg-zinc-800 text-white shadow-sm font-semibold'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
            }`}
          >
            <GitCompare className="w-3.5 h-3.5" />
            <span>Compare</span>
          </button>

          <button
            id="nav-docs-btn"
            onClick={() => setCurrentView('docs')}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-full transition-all duration-150 ${
              currentView === 'docs'
                ? 'bg-zinc-800 text-white shadow-sm font-semibold'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Docs</span>
          </button>
        </nav>

        {/* Right CTA & Theme Toggle */}
        <div className="flex items-center gap-3">
          <button
            id="theme-toggle-btn"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors"
            title={`Switch Theme`}
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-zinc-300" />}
          </button>

          <button
            id="header-start-btn"
            onClick={() => setCurrentView('analyze')}
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-zinc-950 bg-zinc-100 hover:bg-white transition-colors shadow-sm active:scale-95"
          >
            <span>Scan Resume</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Mobile Bar */}
      <div className="md:hidden flex items-center justify-around py-2 border-t border-zinc-800/60 bg-zinc-900/90 text-xs font-medium text-zinc-400">
        <button
          onClick={() => setCurrentView('analyze')}
          className={`flex flex-col items-center gap-1 ${currentView === 'analyze' ? 'text-blue-400 font-semibold' : 'hover:text-white'}`}
        >
          <FileSearch className="w-4 h-4" />
          <span>Analyze</span>
        </button>
        {hasActiveAnalysis && (
          <button
            onClick={() => setCurrentView('dashboard')}
            className={`flex flex-col items-center gap-1 ${currentView === 'dashboard' ? 'text-blue-400 font-semibold' : 'hover:text-white'}`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Dashboard</span>
          </button>
        )}
        <button
          onClick={() => setCurrentView('history')}
          className={`flex flex-col items-center gap-1 ${currentView === 'history' ? 'text-blue-400 font-semibold' : 'hover:text-white'}`}
        >
          <History className="w-4 h-4" />
          <span>History</span>
        </button>
        <button
          onClick={() => setCurrentView('compare')}
          className={`flex flex-col items-center gap-1 ${currentView === 'compare' ? 'text-blue-400 font-semibold' : 'hover:text-white'}`}
        >
          <GitCompare className="w-4 h-4" />
          <span>Compare</span>
        </button>
        <button
          onClick={() => setCurrentView('docs')}
          className={`flex flex-col items-center gap-1 ${currentView === 'docs' ? 'text-blue-400 font-semibold' : 'hover:text-white'}`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Docs</span>
        </button>
      </div>
    </header>
  );
};
