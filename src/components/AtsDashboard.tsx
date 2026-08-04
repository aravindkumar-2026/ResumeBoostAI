import React, { useState } from 'react';
import { 
  Sparkles, CheckCircle2, AlertTriangle, AlertCircle, Download, Printer, Copy, 
  Share2, ArrowRight, BookOpen, Layers, Target, Check, HelpCircle, FileText, Send, RefreshCw, Trophy, Lightbulb
} from 'lucide-react';
import { AnalysisResult, CoverLetterResult } from '../types';
import { exportAnalysisAsPdf } from '../utils/pdfExport';

interface AtsDashboardProps {
  analysis: AnalysisResult;
  onReanalyze: () => void;
  onGenerateCoverLetter?: (companyName: string) => Promise<CoverLetterResult>;
}

export const AtsDashboard: React.FC<AtsDashboardProps> = ({
  analysis,
  onReanalyze,
  onGenerateCoverLetter
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'sections' | 'skillmatch' | 'roadmap' | 'aitools'>('overview');
  const [copied, setCopied] = useState(false);
  
  // Cover Letter generation state
  const [companyInput, setCompanyInput] = useState('');
  const [isGeneratingCoverLetter, setIsGeneratingCoverLetter] = useState(false);
  const [coverLetterResult, setCoverLetterResult] = useState<CoverLetterResult | null>(null);

  // Score color helper
  const getScoreColorClass = (score: number) => {
    if (score >= 80) return 'text-emerald-500 stroke-emerald-500 bg-emerald-500/10 border-emerald-500/30';
    if (score >= 60) return 'text-amber-500 stroke-amber-500 bg-amber-500/10 border-amber-500/30';
    return 'text-rose-500 stroke-rose-500 bg-rose-500/10 border-rose-500/30';
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'excellent':
        return <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">Excellent</span>;
      case 'good':
        return <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">Good</span>;
      case 'needs_improvement':
        return <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">Needs Work</span>;
      default:
        return <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">Critical</span>;
    }
  };

  const handleCopyReportText = () => {
    const textReport = `RESUMEBOOST AI REPORT
Target Role: ${analysis.targetRole}
ATS Score: ${analysis.atsScore}/100
Quality Score: ${analysis.qualityScore}/100
Readability Score: ${analysis.readabilityScore}/100

SUMMARY:
${analysis.summary}

STRENGTHS:
${analysis.strengths.map(s => `- ${s}`).join('\n')}

WEAKNESSES:
${analysis.weaknesses.map(w => `- ${w}`).join('\n')}

MISSING KEYWORDS:
${analysis.missingKeywords.join(', ')}

IMMEDIATE ROADMAP:
${analysis.roadmap.immediate.map(r => `- ${r}`).join('\n')}
`;
    navigator.clipboard.writeText(textReport);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrintReport = () => {
    window.print();
  };

  const handleCreateCoverLetter = async () => {
    if (!onGenerateCoverLetter) return;
    setIsGeneratingCoverLetter(true);
    try {
      const res = await onGenerateCoverLetter(companyInput || 'Target Tech Employer');
      setCoverLetterResult(res);
    } catch (e) {
      console.error('Failed to generate cover letter', e);
    } finally {
      setIsGeneratingCoverLetter(false);
    }
  };

  // Sections array for mapping
  const sectionList = [
    { key: 'header', title: 'Header & Title', data: analysis.sections.header },
    { key: 'contactInfo', title: 'Contact Details', data: analysis.sections.contactInfo },
    { key: 'skills', title: 'Technical & Soft Skills', data: analysis.sections.skills },
    { key: 'education', title: 'Education & Honors', data: analysis.sections.education },
    { key: 'experience', title: 'Work Experience', data: analysis.sections.experience },
    { key: 'projects', title: 'Projects & Work', data: analysis.sections.projects },
    { key: 'certifications', title: 'Certifications', data: analysis.sections.certifications },
    { key: 'achievements', title: 'Achievements & Hackathons', data: analysis.sections.achievements },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 print:p-0">
      
      {/* Top Banner & Export Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-zinc-900/50 border border-zinc-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest bg-blue-500/10 text-blue-400 border border-blue-500/20">
              Analysis Complete
            </span>
            <span className="text-xs text-zinc-500">• {new Date(analysis.timestamp).toLocaleDateString()}</span>
          </div>
          <h1 className="text-2xl font-semibold text-white mt-1">
            ATS Evaluation for {analysis.targetRole}
          </h1>
          <p className="text-xs text-zinc-400 mt-0.5">
            File: <strong className="text-zinc-200">{analysis.fileName}</strong>
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2 print:hidden">
          <button
            onClick={() => exportAnalysisAsPdf(analysis)}
            className="px-3.5 py-2 rounded-xl bg-zinc-100 hover:bg-white text-zinc-950 text-xs font-semibold shadow-sm flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-blue-600" />
            <span>Download PDF</span>
          </button>

          <button
            onClick={handleCopyReportText}
            className="px-3 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied!' : 'Copy Report'}</span>
          </button>

          <button
            onClick={handlePrintReport}
            className="px-3 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print</span>
          </button>

          <button
            onClick={onReanalyze}
            className="px-3 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reanalyze</span>
          </button>
        </div>
      </div>

      {/* Main Metric Score Gauge Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Card 1: ATS Circular Score */}
        <div className="p-6 rounded-3xl bg-zinc-900/50 border border-zinc-800 flex items-center justify-between gap-4">
          <div className="space-y-2">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">ATS Pass Probability</h3>
            <div className="flex items-baseline gap-2">
              <span className={`text-4xl font-extrabold ${analysis.atsScore >= 80 ? 'text-emerald-400' : analysis.atsScore >= 60 ? 'text-amber-400' : 'text-rose-400'}`}>
                {analysis.atsScore}
              </span>
              <span className="text-zinc-500 font-semibold text-lg">/ 100</span>
            </div>
            <p className="text-xs text-zinc-400">
              {analysis.atsScore >= 80 ? 'High probability of passing automated screening filters.' : analysis.atsScore >= 60 ? 'Moderate match. Needs minor keyword tuning.' : 'High risk of ATS filtering. Immediate fixes required.'}
            </p>
          </div>

          {/* Circular Progress Gauge */}
          <div className="relative w-24 h-24 shrink-0 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-zinc-800"
                strokeWidth="3.5"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className={analysis.atsScore >= 80 ? 'text-emerald-400' : analysis.atsScore >= 60 ? 'text-amber-400' : 'text-rose-400'}
                strokeDasharray={`${analysis.atsScore}, 100`}
                strokeWidth="3.5"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <span className="absolute text-sm font-bold text-white">{analysis.atsScore}%</span>
          </div>
        </div>

        {/* Card 2: Quality Score Progress */}
        <div className="p-6 rounded-3xl bg-zinc-900/50 border border-zinc-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Resume Quality Rating</h3>
            <span className="text-lg font-bold text-blue-400">{analysis.qualityScore}/100</span>
          </div>
          <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 rounded-full transition-all duration-500"
              style={{ width: `${analysis.qualityScore}%` }}
            ></div>
          </div>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Evaluates achievement metric density, action verbs, and bullet point structure.
          </p>
        </div>

        {/* Card 3: Readability Score */}
        <div className="p-6 rounded-3xl bg-zinc-900/50 border border-zinc-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Human Recruiter Readability</h3>
            <span className="text-lg font-bold text-cyan-400">{analysis.readabilityScore}/100</span>
          </div>
          <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-cyan-400 rounded-full transition-all duration-500"
              style={{ width: `${analysis.readabilityScore}%` }}
            ></div>
          </div>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Measures font formatting clarity, section spacing, and 6-second recruiter skimmability.
          </p>
        </div>

      </div>

      {/* Internal Navigation Tabs */}
      <div className="border-b border-zinc-800 flex items-center gap-2 sm:gap-6 overflow-x-auto text-sm font-medium">
        <button
          onClick={() => setActiveTab('overview')}
          className={`pb-3 px-1 border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer ${
            activeTab === 'overview'
              ? 'border-blue-500 text-blue-400 font-semibold'
              : 'border-transparent text-zinc-400 hover:text-zinc-200'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>Overview & Gaps</span>
        </button>

        <button
          onClick={() => setActiveTab('sections')}
          className={`pb-3 px-1 border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer ${
            activeTab === 'sections'
              ? 'border-blue-500 text-blue-400 font-semibold'
              : 'border-transparent text-zinc-400 hover:text-zinc-200'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Section Breakdown</span>
        </button>

        <button
          onClick={() => setActiveTab('skillmatch')}
          className={`pb-3 px-1 border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer ${
            activeTab === 'skillmatch'
              ? 'border-blue-500 text-blue-400 font-semibold'
              : 'border-transparent text-zinc-400 hover:text-zinc-200'
          }`}
        >
          <Target className="w-4 h-4" />
          <span>Skill & Keyword Match</span>
        </button>

        <button
          onClick={() => setActiveTab('roadmap')}
          className={`pb-3 px-1 border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer ${
            activeTab === 'roadmap'
              ? 'border-blue-500 text-blue-400 font-semibold'
              : 'border-transparent text-zinc-400 hover:text-zinc-200'
          }`}
        >
          <Trophy className="w-4 h-4" />
          <span>Improvement Roadmap</span>
        </button>

        <button
          onClick={() => setActiveTab('aitools')}
          className={`pb-3 px-1 border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer ${
            activeTab === 'aitools'
              ? 'border-blue-500 text-blue-400 font-semibold'
              : 'border-transparent text-zinc-400 hover:text-zinc-200'
          }`}
        >
          <Lightbulb className="w-4 h-4 text-amber-400" />
          <span>AI Cover Letter & Interview Prep</span>
        </button>
      </div>

      {/* TAB 1: OVERVIEW & GAPS */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          
          {/* Executive Summary Box */}
          <div className="p-6 rounded-3xl bg-zinc-900/50 border border-zinc-800 space-y-3">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-blue-400" />
              <span>Recruiter Executive Summary</span>
            </h2>
            <p className="text-sm text-zinc-200 leading-relaxed font-normal">
              {analysis.summary}
            </p>
          </div>

          {/* Strengths & Weaknesses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Strengths */}
            <div className="p-6 rounded-3xl bg-emerald-500/10 border border-emerald-500/20 space-y-4">
              <h3 className="text-sm font-semibold text-emerald-400 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Core Strengths ({analysis.strengths.length})</span>
              </h3>
              <ul className="space-y-2.5 text-xs text-zinc-300">
                {analysis.strengths.map((str, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0"></span>
                    <span>{str}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Weaknesses */}
            <div className="p-6 rounded-3xl bg-rose-500/10 border border-rose-500/20 space-y-4">
              <h3 className="text-sm font-semibold text-rose-400 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-400" />
                <span>Areas Needing Attention ({analysis.weaknesses.length})</span>
              </h3>
              <ul className="space-y-2.5 text-xs text-zinc-300">
                {analysis.weaknesses.map((weak, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1.5 shrink-0"></span>
                    <span>{weak}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Grammar & Formatting Issues */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="p-6 rounded-3xl bg-zinc-900/50 border border-zinc-800 space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Grammar & Phrasing Checks</h3>
              {analysis.grammarIssues.length > 0 ? (
                <ul className="space-y-2 text-xs text-zinc-300">
                  {analysis.grammarIssues.map((g, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-amber-400 font-bold">•</span>
                      <span>{g}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-xs text-emerald-400 font-medium">✓ No critical grammar or spelling issues detected.</p>
              )}
            </div>

            <div className="p-6 rounded-3xl bg-zinc-900/50 border border-zinc-800 space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Formatting & ATS Parsability</h3>
              {analysis.formattingIssues.length > 0 ? (
                <ul className="space-y-2 text-xs text-zinc-300">
                  {analysis.formattingIssues.map((f, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-blue-400 font-bold">•</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-xs text-emerald-400 font-medium">✓ Clean ATS single/double-column text structure.</p>
              )}
            </div>

          </div>

        </div>
      )}

      {/* TAB 2: SECTION BREAKDOWN */}
      {activeTab === 'sections' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sectionList.map((sec) => (
            <div key={sec.key} className="p-6 rounded-3xl bg-zinc-900/50 border border-zinc-800 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-base text-white">{sec.title}</h3>
                <div className="flex items-center gap-2">
                  <span className={`text-sm font-bold px-2.5 py-0.5 rounded-lg border ${getScoreColorClass(sec.data.score)}`}>
                    {sec.data.score} / 100
                  </span>
                  {getStatusBadge(sec.data.status)}
                </div>
              </div>

              <p className="text-xs text-zinc-300 leading-relaxed border-t border-zinc-800/80 pt-3">
                {sec.data.feedback}
              </p>

              {sec.data.suggestions.length > 0 && (
                <div className="space-y-1.5 pt-2">
                  <p className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">Suggestions:</p>
                  <ul className="space-y-1.5 text-xs text-zinc-300">
                    {sec.data.suggestions.map((sug, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-blue-400 font-bold">•</span>
                        <span>{sug}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* TAB 3: SKILL & KEYWORD MATCH */}
      {activeTab === 'skillmatch' && (
        <div className="space-y-8">
          
          {/* Skill Match Gauge Banner */}
          <div className="p-6 rounded-3xl bg-zinc-900/50 border border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <h2 className="text-base font-semibold text-white">
                Skill Match Rate for {analysis.targetRole}
              </h2>
              <p className="text-xs text-zinc-400 mt-1">
                Comparing skills found in your resume against the standard skill taxonomy for this role.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-3xl font-bold text-blue-400">
                  {analysis.skillMatch.matchPercentage}%
                </p>
                <p className="text-[10px] text-zinc-500 font-medium">Match Percentage</p>
              </div>
            </div>
          </div>

          {/* Skill Matrix Columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Matching Skills */}
            <div className="p-6 rounded-3xl bg-zinc-900/50 border border-emerald-500/20 space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-emerald-400 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Matching Skills ({analysis.skillMatch.matchingSkills.length})</span>
              </h3>
              <div className="flex flex-wrap gap-1.5 pt-2">
                {analysis.skillMatch.matchingSkills.map((sk, i) => (
                  <span key={i} className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-300 text-xs font-medium border border-emerald-500/20">
                    ✓ {sk}
                  </span>
                ))}
              </div>
            </div>

            {/* Missing Skills */}
            <div className="p-6 rounded-3xl bg-zinc-900/50 border border-rose-500/20 space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-rose-400 flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                <span>Missing Skills ({analysis.skillMatch.missingSkills.length})</span>
              </h3>
              <div className="flex flex-wrap gap-1.5 pt-2">
                {analysis.skillMatch.missingSkills.map((sk, i) => (
                  <span key={i} className="px-2.5 py-1 rounded-full bg-rose-500/10 text-rose-300 text-xs font-medium border border-rose-500/20">
                    ✕ {sk}
                  </span>
                ))}
              </div>
            </div>

            {/* Recommended Skills */}
            <div className="p-6 rounded-3xl bg-zinc-900/50 border border-amber-500/20 space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-amber-400 flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                <span>Recommended Skills ({analysis.skillMatch.recommendedSkills.length})</span>
              </h3>
              <div className="flex flex-wrap gap-1.5 pt-2">
                {analysis.skillMatch.recommendedSkills.map((sk, i) => (
                  <span key={i} className="px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-300 text-xs font-medium border border-amber-500/20">
                    + {sk}
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* Keyword Cloud Visualization */}
          <div className="p-6 rounded-3xl bg-zinc-900/50 border border-zinc-800 space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
              Interactive Resume Keyword Density Cloud
            </h3>
            <p className="text-xs text-zinc-400">
              Green = Found in Resume | Red = Missing ATS Keywords | Amber = Recommended Skill Booster
            </p>
            <div className="flex flex-wrap gap-2.5 pt-2">
              {analysis.keywordCloud.map((item, i) => {
                const isFound = item.category === 'found';
                const isMissing = item.category === 'missing';
                return (
                  <span
                    key={i}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-transform hover:scale-105 cursor-default ${
                      isFound
                        ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20'
                        : isMissing
                        ? 'bg-rose-500/10 text-rose-300 border-rose-500/20'
                        : 'bg-amber-500/10 text-amber-300 border-amber-500/20'
                    }`}
                  >
                    {item.word} {item.count > 0 && <span className="opacity-60 text-[10px]">({item.count})</span>}
                  </span>
                );
              })}
            </div>
          </div>

        </div>
      )}

      {/* TAB 4: IMPROVEMENT ROADMAP */}
      {activeTab === 'roadmap' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-zinc-900 border border-zinc-800 text-white space-y-2">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-400" />
              <span>Step-by-Step Resume Upgrade Plan</span>
            </h2>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Follow this prioritized checklist before submitting applications to maximize your ATS pass rate for {analysis.targetRole}.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Immediate Fixes */}
            <div className="p-6 rounded-3xl bg-zinc-900/50 border border-rose-500/20 space-y-4">
              <h3 className="text-sm font-semibold text-rose-400 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                <span>Immediate Priority Fixes (Do First)</span>
              </h3>
              <ul className="space-y-2.5 text-xs text-zinc-300">
                {analysis.roadmap.immediate.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <input type="checkbox" className="mt-0.5 rounded border-zinc-700 bg-zinc-800 text-blue-500 focus:ring-blue-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* High Priority Tasks */}
            <div className="p-6 rounded-3xl bg-zinc-900/50 border border-amber-500/20 space-y-4">
              <h3 className="text-sm font-semibold text-amber-400 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                <span>High Priority Enhancements</span>
              </h3>
              <ul className="space-y-2.5 text-xs text-zinc-300">
                {analysis.roadmap.highPriority.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <input type="checkbox" className="mt-0.5 rounded border-zinc-700 bg-zinc-800 text-blue-500 focus:ring-blue-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Medium Priority Tasks */}
            <div className="p-6 rounded-3xl bg-zinc-900/50 border border-blue-500/20 space-y-4">
              <h3 className="text-sm font-semibold text-blue-400 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
                <span>Medium Priority Polish</span>
              </h3>
              <ul className="space-y-2.5 text-xs text-zinc-300">
                {analysis.roadmap.mediumPriority.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <input type="checkbox" className="mt-0.5 rounded border-zinc-700 bg-zinc-800 text-blue-500 focus:ring-blue-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Optional Boosters */}
            <div className="p-6 rounded-3xl bg-zinc-900/50 border border-zinc-800 space-y-4">
              <h3 className="text-sm font-semibold text-zinc-300 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-zinc-500"></span>
                <span>Optional Resume Boosters</span>
              </h3>
              <ul className="space-y-2.5 text-xs text-zinc-300">
                {analysis.roadmap.optional.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <input type="checkbox" className="mt-0.5 rounded border-zinc-700 bg-zinc-800 text-blue-500 focus:ring-blue-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      )}

      {/* TAB 5: AI COVER LETTER & INTERVIEW PREP */}
      {activeTab === 'aitools' && (
        <div className="space-y-8">
          
          {/* Cover Letter Generator Box */}
          <div className="p-6 rounded-3xl bg-zinc-900/50 border border-zinc-800 space-y-4">
            <h2 className="text-base font-semibold text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-400" />
              <span>Tailored Cover Letter Generator</span>
            </h2>
            <p className="text-xs text-zinc-400">
              Generate a custom, ATS-optimized cover letter for {analysis.targetRole} using your resume achievements.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <input
                type="text"
                placeholder="Target Company Name (e.g., Stripe, Google, Startup X)..."
                value={companyInput}
                onChange={(e) => setCompanyInput(e.target.value)}
                className="w-full sm:w-80 px-4 py-2.5 rounded-xl text-xs bg-zinc-900 border border-zinc-800 text-zinc-200 focus:outline-none focus:border-blue-500"
              />
              <button
                onClick={handleCreateCoverLetter}
                disabled={isGeneratingCoverLetter}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-semibold text-zinc-950 bg-zinc-100 hover:bg-white shadow-sm flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
              >
                {isGeneratingCoverLetter ? (
                  <span>Generating Cover Letter...</span>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5 text-blue-600" />
                    <span>Generate Cover Letter</span>
                  </>
                )}
              </button>
            </div>

            {/* Generated Cover Letter Output */}
            {coverLetterResult && (
              <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-3 pt-4 mt-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-blue-400">
                    Generated for {coverLetterResult.targetCompany} ({coverLetterResult.jobRole})
                  </span>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(coverLetterResult.coverLetterText);
                      alert('Cover letter copied to clipboard!');
                    }}
                    className="px-2.5 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-[11px] font-semibold cursor-pointer"
                  >
                    Copy Text
                  </button>
                </div>
                <textarea
                  rows={10}
                  readOnly
                  value={coverLetterResult.coverLetterText}
                  className="w-full p-3 rounded-xl text-xs font-sans bg-zinc-950 border border-zinc-800 text-zinc-200 focus:outline-none"
                />
              </div>
            )}
          </div>

          {/* AI Interview Questions Prep */}
          {analysis.interviewQuestions && analysis.interviewQuestions.length > 0 && (
            <div className="p-6 rounded-3xl bg-zinc-900/50 border border-zinc-800 space-y-4">
              <h2 className="text-base font-semibold text-white flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-purple-400" />
                <span>Tailored Technical & Behavioral Interview Questions</span>
              </h2>
              <p className="text-xs text-zinc-400">
                Questions an HR hiring manager or technical interviewer is likely to ask based on your resume gaps and projects.
              </p>

              <div className="space-y-4 pt-2">
                {analysis.interviewQuestions.map((q, idx) => (
                  <div key={q.id || idx} className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-purple-500/10 text-purple-400 border border-purple-500/20">
                        {q.type} Question #{idx + 1}
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-white">
                      "{q.question}"
                    </p>
                    <p className="text-[11px] text-zinc-400">
                      <strong>Interviewer Focus:</strong> {q.context}
                    </p>
                    <p className="text-[11px] text-blue-400 font-medium">
                      💡 <strong>Sample Answer Strategy:</strong> {q.sampleAnswerHint}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Social & Portfolio Optimizations */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="p-5 rounded-3xl bg-zinc-900/50 border border-zinc-800 space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">LinkedIn Optimization</h3>
              <ul className="space-y-2 text-xs text-zinc-300">
                {analysis.linkedInSuggestions.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-blue-400 font-bold">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-5 rounded-3xl bg-zinc-900/50 border border-zinc-800 space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">GitHub Profile Audit</h3>
              <ul className="space-y-2 text-xs text-zinc-300">
                {analysis.gitHubSuggestions.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-blue-400 font-bold">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-5 rounded-3xl bg-zinc-900/50 border border-zinc-800 space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Portfolio Website Tips</h3>
              <ul className="space-y-2 text-xs text-zinc-300">
                {analysis.portfolioSuggestions.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-blue-400 font-bold">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

        </div>
      )}

    </div>
  );
};
