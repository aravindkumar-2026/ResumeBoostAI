import React from 'react';
import { Sparkles, Github, Shield, Cpu, ExternalLink } from 'lucide-react';

interface FooterProps {
  setCurrentView: (view: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setCurrentView }) => {
  return (
    <footer className="bg-[#09090b] border-t border-zinc-800/60 text-zinc-400 text-xs py-12 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          
          {/* Column 1: Brand */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-600 p-0.5 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold text-base text-white tracking-tight">ResumeBoost <span className="text-blue-500">AI</span></span>
            </div>
            <p className="text-zinc-400 text-xs leading-relaxed">
              AI-powered ATS Resume Analyzer designed to help students and job seekers optimize resumes for modern HR recruitment software.
            </p>
            <div className="flex items-center gap-2 pt-1">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                Gemini 3.6 Flash Active
              </span>
            </div>
          </div>

          {/* Column 2: Core Tools */}
          <div className="space-y-3">
            <h4 className="font-semibold text-zinc-200 text-sm tracking-wide">Core Features</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => setCurrentView('analyze')} className="hover:text-white transition-colors">
                  ATS Resume Scanner
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('dashboard')} className="hover:text-white transition-colors">
                  Score & Skill Breakdown
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('compare')} className="hover:text-white transition-colors">
                  Resume Version Comparison
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('history')} className="hover:text-white transition-colors">
                  Analysis History Logs
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: AI Capabilities */}
          <div className="space-y-3">
            <h4 className="font-semibold text-zinc-200 text-sm tracking-wide">AI Career Tools</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => setCurrentView('dashboard')} className="hover:text-white transition-colors">
                  Cover Letter Generator
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('dashboard')} className="hover:text-white transition-colors">
                  AI Interview Question Prep
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('dashboard')} className="hover:text-white transition-colors">
                  ATS Keyword Cloud
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('dashboard')} className="hover:text-white transition-colors">
                  GitHub & LinkedIn Audits
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Tech Stack & System Info */}
          <div className="space-y-3">
            <h4 className="font-semibold text-zinc-200 text-sm tracking-wide">Project Details</h4>
            <div className="space-y-2 text-xs">
              <p className="flex items-center gap-1.5 text-zinc-400">
                <Cpu className="w-3.5 h-3.5 text-blue-400" />
                <span>Full-Stack Express + React 19 + Vite</span>
              </p>
              <p className="flex items-center gap-1.5 text-zinc-400">
                <Shield className="w-3.5 h-3.5 text-blue-400" />
                <span>Client-Side Data Privacy First</span>
              </p>
              <button
                onClick={() => setCurrentView('docs')}
                className="mt-2 inline-flex items-center gap-1.5 text-blue-400 hover:text-blue-300 font-medium"
              >
                <span>View Full API & System Docs</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-zinc-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <p>© {new Date().getFullYear()} ResumeBoost AI. All rights reserved. Built for technical portfolios and career growth.</p>
          <div className="flex items-center gap-4">
            <button onClick={() => setCurrentView('docs')} className="hover:text-zinc-300 transition-colors">
              Documentation
            </button>
            <span>•</span>
            <button onClick={() => setCurrentView('analyze')} className="hover:text-zinc-300 transition-colors">
              Scan Now
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
