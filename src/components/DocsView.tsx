import React, { useState } from 'react';
import { BookOpen, Code, Terminal, Layers, ShieldCheck, Cpu, Copy, Check } from 'lucide-react';

export const DocsView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'readme' | 'install' | 'api' | 'structure' | 'future'>('readme');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copySnippet = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Title Banner */}
      <div>
        <h1 className="text-3xl font-semibold text-white flex items-center gap-3">
          <BookOpen className="w-8 h-8 text-blue-400" />
          <span>Documentation & Architecture Guide</span>
        </h1>
        <p className="text-xs text-zinc-400 mt-1">
          Complete engineering reference for ResumeBoost AI, REST endpoints, local installation, and system design.
        </p>
      </div>

      {/* Docs Tabs */}
      <div className="border-b border-zinc-800 flex items-center gap-2 sm:gap-6 overflow-x-auto text-sm font-semibold">
        <button
          onClick={() => setActiveTab('readme')}
          className={`pb-3 px-1 border-b-2 transition-colors cursor-pointer ${
            activeTab === 'readme'
              ? 'border-blue-500 text-blue-400'
              : 'border-transparent text-zinc-400 hover:text-zinc-200'
          }`}
        >
          README & Overview
        </button>

        <button
          onClick={() => setActiveTab('install')}
          className={`pb-3 px-1 border-b-2 transition-colors cursor-pointer ${
            activeTab === 'install'
              ? 'border-blue-500 text-blue-400'
              : 'border-transparent text-zinc-400 hover:text-zinc-200'
          }`}
        >
          Installation Guide
        </button>

        <button
          onClick={() => setActiveTab('api')}
          className={`pb-3 px-1 border-b-2 transition-colors cursor-pointer ${
            activeTab === 'api'
              ? 'border-blue-500 text-blue-400'
              : 'border-transparent text-zinc-400 hover:text-zinc-200'
          }`}
        >
          REST API Docs
        </button>

        <button
          onClick={() => setActiveTab('structure')}
          className={`pb-3 px-1 border-b-2 transition-colors cursor-pointer ${
            activeTab === 'structure'
              ? 'border-blue-500 text-blue-400'
              : 'border-transparent text-zinc-400 hover:text-zinc-200'
          }`}
        >
          Folder Structure
        </button>

        <button
          onClick={() => setActiveTab('future')}
          className={`pb-3 px-1 border-b-2 transition-colors cursor-pointer ${
            activeTab === 'future'
              ? 'border-blue-500 text-blue-400'
              : 'border-transparent text-zinc-400 hover:text-zinc-200'
          }`}
        >
          Future Scope & License
        </button>
      </div>

      {/* Content Panels */}
      {activeTab === 'readme' && (
        <div className="p-8 rounded-3xl bg-zinc-900/50 border border-zinc-800 space-y-6">
          <h2 className="text-xl font-semibold text-white">ResumeBoost AI - Project Overview</h2>
          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
            ResumeBoost AI is an AI-powered ATS (Applicant Tracking System) Resume Analyzer designed for students, graduates, and job seekers. It simulates how top recruitment software (Workday, Greenhouse, Lever) and senior technical recruiters scan resumes.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-2">
              <h3 className="text-sm font-semibold text-blue-400">Core Engine</h3>
              <p className="text-xs text-zinc-400">
                Powered by Google Gemini 3.6 Flash configured with structured JSON schema output for zero-parsing-error evaluation.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-2">
              <h3 className="text-sm font-semibold text-blue-400">Target Role Benchmarks</h3>
              <p className="text-xs text-zinc-400">
                Supports 11 technical & design roles with tailored keyword taxonomy and Google XYZ bullet formatting checks.
              </p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'install' && (
        <div className="p-8 rounded-3xl bg-zinc-900/50 border border-zinc-800 space-y-6">
          <h2 className="text-xl font-semibold text-white">Local Installation & Setup Guide</h2>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <p className="text-xs font-semibold text-zinc-300">1. Clone repository & install npm packages:</p>
              <div className="p-4 rounded-xl bg-zinc-950 text-zinc-300 border border-zinc-800 text-xs font-mono relative">
                <code>npm install</code>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-xs font-semibold text-zinc-300">2. Configure Environment Variables (.env):</p>
              <div className="p-4 rounded-xl bg-zinc-950 text-zinc-300 border border-zinc-800 text-xs font-mono">
                <code>GEMINI_API_KEY="YOUR_GEMINI_API_KEY_HERE"</code>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-xs font-semibold text-zinc-300">3. Launch Full-Stack Development Server:</p>
              <div className="p-4 rounded-xl bg-zinc-950 text-zinc-300 border border-zinc-800 text-xs font-mono">
                <code>npm run dev</code>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-xs font-semibold text-zinc-300">4. Build for Production:</p>
              <div className="p-4 rounded-xl bg-zinc-950 text-zinc-300 border border-zinc-800 text-xs font-mono">
                <code>npm run build && npm start</code>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'api' && (
        <div className="p-8 rounded-3xl bg-zinc-900/50 border border-zinc-800 space-y-6">
          <h2 className="text-xl font-semibold text-white">REST API Documentation</h2>

          {/* Endpoint 1 */}
          <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-3">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[11px] font-bold">POST</span>
              <code className="text-xs font-semibold text-white">/api/analyze-resume</code>
            </div>
            <p className="text-xs text-zinc-400">
              Evaluates PDF base64 file or raw resume text against a specified target role.
            </p>
            <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-300 text-[11px] font-mono">
              <pre>{`{
  "pdfBase64": "data:application/pdf;base64,...",
  "resumeText": "Optional fallback plain text",
  "fileName": "Alex_Resume.pdf",
  "fileSize": 245000,
  "targetRole": "Software Engineer"
}`}</pre>
            </div>
          </div>

          {/* Endpoint 2 */}
          <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-3">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[11px] font-bold">POST</span>
              <code className="text-xs font-semibold text-white">/api/generate-cover-letter</code>
            </div>
            <p className="text-xs text-zinc-400">
              Generates an ATS-tailored cover letter based on candidate resume and target employer.
            </p>
          </div>
        </div>
      )}

      {activeTab === 'structure' && (
        <div className="p-8 rounded-3xl bg-zinc-900/50 border border-zinc-800 space-y-4">
          <h2 className="text-xl font-semibold text-white">Project Folder Architecture</h2>
          <pre className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800 text-zinc-300 text-xs font-mono leading-relaxed overflow-x-auto">
{`resumeboost-ai/
├── server.ts                       # Express + Vite Full-Stack Server
├── metadata.json                   # Applet Capabilities & Metadata
├── package.json                    # Full-Stack Scripts & Dependencies
├── src/
│   ├── main.tsx                    # React Entry Point
│   ├── App.tsx                     # Main Router & Layout Controller
│   ├── types.ts                    # Shared TypeScript Interfaces
│   ├── server/
│   │   └── geminiService.ts        # Server-Side @google/genai Integration
│   ├── data/
│   │   ├── targetRoles.ts          # 11 Tech Role Taxonomies
│   │   └── sampleResumes.ts        # Pre-loaded Candidates for Instant Testing
│   ├── utils/
│   │   ├── storage.ts              # LocalStorage History Persistence
│   │   └── pdfExport.ts            # jsPDF Report Generator
│   └── components/
│       ├── Header.tsx              # Navbar & Theme Switcher
│       ├── Footer.tsx              # Footer Branding & Links
│       ├── LandingPage.tsx         # Hero, Features, FAQ, Testimonials
│       ├── ResumeUpload.tsx        # Drag-and-Drop PDF Scanner & Role Selector
│       ├── AtsDashboard.tsx        # Circular Gauge, 8-Section Audit, Keywords, AI Tools
│       ├── HistoryView.tsx         # Saved Analysis Logs
│       ├── CompareView.tsx         # Side-by-Side Version Comparison
│       └── DocsView.tsx            # API & System Architecture Documentation`}
          </pre>
        </div>
      )}

      {activeTab === 'future' && (
        <div className="p-8 rounded-3xl bg-zinc-900/50 border border-zinc-800 space-y-6">
          <h2 className="text-xl font-semibold text-white">Future Scope & License</h2>
          <div className="space-y-4 text-xs sm:text-sm text-zinc-300 leading-relaxed">
            <h3 className="font-semibold text-white">Future Scope Enhancements:</h3>
            <ul className="list-disc pl-5 space-y-2 text-zinc-400">
              <li>Real-time LaTeX resume template rendering and online builder.</li>
              <li>Browser extension for instant 1-click ATS scan on LinkedIn job postings.</li>
              <li>Mock voice AI interview simulator based on generated interview questions.</li>
            </ul>

            <h3 className="font-semibold text-white pt-2">License:</h3>
            <p className="text-zinc-400">Released under the <strong className="text-zinc-200">Apache-2.0 License</strong>. Free for personal, academic, and technical portfolio usage.</p>
          </div>
        </div>
      )}

    </div>
  );
};
