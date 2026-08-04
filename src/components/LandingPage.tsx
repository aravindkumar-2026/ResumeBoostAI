import React, { useState } from 'react';
import { 
  Sparkles, FileText, CheckCircle2, ArrowRight, Target, BarChart3, 
  ShieldCheck, Zap, Layers, Award, ChevronDown, ChevronUp, Bot, BrainCircuit, Users, Star
} from 'lucide-react';
import { TARGET_ROLES } from '../data/targetRoles';

interface LandingPageProps {
  onStartAnalysis: () => void;
  onTrySample: (sampleId: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStartAnalysis, onTrySample }) => {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: "How does ResumeBoost AI evaluate my resume?",
      a: "ResumeBoost AI parses your resume layout, bullet points, skills, and experience, comparing them against real-world Applicant Tracking System (ATS) parsing rules used by Workday, Greenhouse, Lever, and Taleo. It uses Google's Gemini 3.6 Flash model configured as a veteran HR Hiring Manager and Technical Recruiter."
    },
    {
      q: "Is my resume data stored or shared with third parties?",
      a: "No. ResumeBoost AI prioritizes candidate privacy. Your uploaded resumes are processed in memory for analysis and saved locally in your browser's private storage. You can clear your analysis history anytime with one click."
    },
    {
      q: "What target job roles are supported?",
      a: "We support 11 specialized technical and design roles including Software Engineer, Frontend, Backend, Full Stack, Mobile Developer, Data Analyst, Data Scientist, UI/UX Designer, DevOps Engineer, Cybersecurity Engineer, and Machine Learning Engineer."
    },
    {
      q: "What file formats are accepted?",
      a: "Currently, we accept PDF format files up to 10MB, which is the industry standard for ATS parsers. You can also paste resume text directly or evaluate pre-loaded sample candidate resumes instantly."
    },
    {
      q: "What makes ResumeBoost AI different from basic keyword checkers?",
      a: "Unlike simple word counters, ResumeBoost AI evaluates section-by-section formatting, bullet point metric density (Google XYZ formula), skill categorizations, soft skills, grammar issues, and generates an actionable step-by-step career improvement roadmap."
    }
  ];

  const testimonials = [
    {
      name: "Marcus Vance",
      role: "Incoming SWE @ Stripe",
      university: "UC Berkeley '25",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
      content: "My initial ATS score was only 58% due to formatting errors and missing keywords. After applying ResumeBoost AI's roadmap suggestions, my response rate jumped from 5% to over 35%!",
      rating: 5
    },
    {
      name: "Sophia Lin",
      role: "Frontend Engineer Intern @ Meta",
      university: "UW Seattle '25",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80",
      content: "The missing technical skills breakdown and section-by-section feedback gave me exact guidance on how to rephrase my project bullet points with quantified metrics.",
      rating: 5
    },
    {
      name: "Priya Sharma",
      role: "Data Analyst @ Coinbase",
      university: "NYU Stern '25",
      avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&q=80",
      content: "The Cover Letter Generator and AI Interview Prep tools saved me hours during peak campus recruiting season. Highly recommended for every job seeker!",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen text-zinc-100 transition-colors duration-200">
      
      {/* Hero Section */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-32 overflow-hidden">
        {/* Subtle Background Glow Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-tr from-blue-600/10 via-indigo-500/10 to-cyan-500/10 blur-3xl pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Top Animated Badge */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold shadow-sm backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
              <span>Next-Gen ATS Resume Intelligence 2.0</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            </div>
          </div>

          {/* Main Headline */}
          <div className="text-center max-w-4xl mx-auto space-y-6">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.15]">
              Land 3x More Interviews with <br />
              <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                AI-Powered ATS Precision
              </span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed font-normal">
              Beat automated ATS resume filters. Get instant 0–100 scores, section-by-section recruiter feedback, missing keyword analysis, and an actionable improvement roadmap.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <button
                id="hero-start-analysis-btn"
                onClick={onStartAnalysis}
                className="w-full sm:w-auto px-8 py-4 rounded-xl text-sm font-semibold text-zinc-950 bg-zinc-100 hover:bg-white shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2 group"
              >
                <span>Upload & Scan Resume</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                id="hero-try-sample-btn"
                onClick={() => onTrySample('sample-swe')}
                className="w-full sm:w-auto px-6 py-4 rounded-xl text-sm font-semibold text-zinc-200 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 transition-all flex items-center justify-center gap-2"
              >
                <Bot className="w-4 h-4 text-blue-400" />
                <span>Try Instant Sample Evaluation</span>
              </button>
            </div>

            {/* Key Trust Metrics */}
            <div className="pt-10 grid grid-cols-2 md:grid-cols-4 gap-4 text-center max-w-3xl mx-auto border-t border-zinc-800/80">
              <div>
                <p className="text-2xl font-bold text-white">98.4%</p>
                <p className="text-xs text-zinc-500">ATS Parsing Accuracy</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-white">11 Roles</p>
                <p className="text-xs text-zinc-500">Tailored Tech Profiles</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-white">3.2x</p>
                <p className="text-xs text-zinc-500">Avg. Callback Increase</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-white">&lt; 5 Sec</p>
                <p className="text-xs text-zinc-500">Instant AI Scan Time</p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Target Roles Carousel / Grid Preview */}
      <section className="py-12 bg-zinc-900/30 border-y border-zinc-800/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h2 className="text-[10px] font-bold uppercase tracking-widest text-blue-400 mb-2">
              Target Role Benchmarks
            </h2>
            <h3 className="text-2xl font-semibold tracking-tight text-white">
              Optimized for 11 Key Tech & Design Roles
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {TARGET_ROLES.map((role) => (
              <button
                key={role.id}
                onClick={onStartAnalysis}
                className="p-3.5 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 hover:border-blue-500/50 hover:bg-zinc-800/80 text-left transition-all group"
              >
                <span className="text-xs font-semibold text-white group-hover:text-blue-400 block truncate">
                  {role.title}
                </span>
                <span className="text-[10px] text-zinc-500 block mt-0.5">
                  {role.category}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-[10px] font-bold uppercase tracking-widest text-blue-400">
            End-to-End Career Intelligence
          </h2>
          <h3 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white">
            Everything You Need to Ace ATS & Human Screeners
          </h3>
          <p className="text-zinc-400 text-base">
            Engineered with recruiter logic to transform weak bullet points into high-impact, keyword-rich achievements.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Feature 1 */}
          <div className="p-6 rounded-3xl bg-zinc-900/50 border border-zinc-800 space-y-4">
            <div className="w-10 h-10 rounded-2xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
              <BarChart3 className="w-5 h-5" />
            </div>
            <h4 className="text-lg font-semibold text-white">Circular ATS Score & Metric Dashboard</h4>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Get an overall ATS compatibility score (0–100), quality rating, and readability score parsed instantly against role expectations.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="p-6 rounded-3xl bg-zinc-900/50 border border-zinc-800 space-y-4">
            <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
              <Layers className="w-5 h-5" />
            </div>
            <h4 className="text-lg font-semibold text-white">Granular 8-Section Audit</h4>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Individually score Header, Contact Info, Skills, Education, Experience, Projects, Certifications, and Achievements with actionable bullet suggestions.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="p-6 rounded-3xl bg-zinc-900/50 border border-zinc-800 space-y-4">
            <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
              <Target className="w-5 h-5" />
            </div>
            <h4 className="text-lg font-semibold text-white">Keyword Gap & Cloud Analysis</h4>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Detect missing hard skills, soft skills, and industry terminology required by hiring software before you hit apply.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="p-6 rounded-3xl bg-zinc-900/50 border border-zinc-800 space-y-4">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <Zap className="w-5 h-5" />
            </div>
            <h4 className="text-lg font-semibold text-white">Actionable Roadmap</h4>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Prioritized checklist categorized into Immediate Fixes, High Priority Tasks, Medium Priority, and Optional Boosters.
            </p>
          </div>

          {/* Feature 5 */}
          <div className="p-6 rounded-3xl bg-zinc-900/50 border border-zinc-800 space-y-4">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
              <BrainCircuit className="w-5 h-5" />
            </div>
            <h4 className="text-lg font-semibold text-white">AI Cover Letter & Interview Prep</h4>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Generate tailored cover letters and receive 6+ customized behavioral & technical interview questions based on your resume gaps.
            </p>
          </div>

          {/* Feature 6 */}
          <div className="p-6 rounded-3xl bg-zinc-900/50 border border-zinc-800 space-y-4">
            <div className="w-10 h-10 rounded-2xl bg-rose-500/10 text-rose-400 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="text-lg font-semibold text-white">PDF Export & History Logs</h4>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Download structured PDF reports, copy evaluation text, and save previous resume revisions to compare scores over time.
            </p>
          </div>

        </div>
      </section>

      {/* Why ResumeBoost AI? Contrast Table */}
      <section className="py-16 bg-zinc-900/30 border-y border-zinc-800/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <h2 className="text-[10px] font-bold uppercase tracking-widest text-blue-400">
              Why ResumeBoost AI?
            </h2>
            <h3 className="text-2xl sm:text-3xl font-semibold text-white">
              Traditional Applying vs. AI-Optimized Applications
            </h3>
          </div>

          <div className="bg-zinc-900/60 rounded-3xl border border-zinc-800 overflow-hidden shadow-xl">
            <div className="grid grid-cols-2 divide-x divide-zinc-800 border-b border-zinc-800 font-semibold text-xs bg-zinc-900">
              <div className="p-4 text-zinc-400 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                <span>Standard Resume Submission</span>
              </div>
              <div className="p-4 text-blue-400 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span>ResumeBoost AI Optimized</span>
              </div>
            </div>

            <div className="divide-y divide-zinc-800/80 text-xs sm:text-sm">
              <div className="grid grid-cols-2 divide-x divide-zinc-800/80 p-4">
                <p className="text-zinc-400">75% rejected automatically by ATS keyword filters.</p>
                <p className="text-white font-medium">95%+ ATS keyword pass rate across targeted roles.</p>
              </div>

              <div className="grid grid-cols-2 divide-x divide-zinc-800/80 p-4">
                <p className="text-zinc-400">Unclear formatting and unquantified responsibility statements.</p>
                <p className="text-white font-medium">Google XYZ formula applied to all achievement bullet points.</p>
              </div>

              <div className="grid grid-cols-2 divide-x divide-zinc-800/80 p-4">
                <p className="text-zinc-400">Zero feedback when rejections occur without response.</p>
                <p className="text-white font-medium">Instant 0-100 scores with step-by-step roadmap fixes.</p>
              </div>

              <div className="grid grid-cols-2 divide-x divide-zinc-800/80 p-4">
                <p className="text-zinc-400">Generic cover letters and unprepared interview responses.</p>
                <p className="text-white font-medium">Custom cover letter & 6+ tailored interview questions.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <h2 className="text-[10px] font-bold uppercase tracking-widest text-blue-400">
            Success Stories
          </h2>
          <h3 className="text-3xl font-semibold text-white">
            Trusted by Students & Job Seekers Nationwide
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div key={i} className="p-6 rounded-3xl bg-zinc-900/50 border border-zinc-800 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex gap-1 text-amber-400">
                  {[...Array(t.rating)].map((_, r) => (
                    <Star key={r} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-zinc-300 italic leading-relaxed">
                  "{t.content}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-zinc-800">
                <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover border border-zinc-700" />
                <div>
                  <h4 className="text-sm font-semibold text-white">{t.name}</h4>
                  <p className="text-xs text-blue-400 font-medium">{t.role}</p>
                  <p className="text-[11px] text-zinc-500">{t.university}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="py-16 bg-zinc-900/30 border-t border-zinc-800/60">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-[10px] font-bold uppercase tracking-widest text-blue-400">
              Frequently Asked Questions
            </h2>
            <h3 className="text-2xl sm:text-3xl font-semibold text-white">
              Got Questions? We Have Answers.
            </h3>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="rounded-2xl bg-zinc-900/60 border border-zinc-800 overflow-hidden"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full p-4 text-left flex items-center justify-between font-semibold text-sm text-white focus:outline-none"
                >
                  <span>{faq.q}</span>
                  {activeFaq === idx ? (
                    <ChevronUp className="w-4 h-4 text-blue-400" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-zinc-500" />
                  )}
                </button>
                {activeFaq === idx && (
                  <div className="px-4 pb-4 text-xs sm:text-sm text-zinc-400 leading-relaxed border-t border-zinc-800/60 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final Bottom Call To Action */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="p-10 rounded-3xl bg-zinc-900 border border-zinc-800 text-white shadow-2xl space-y-6 relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Ready to Upgrade Your Resume?
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base">
              Scan your resume in seconds, fix hidden ATS formatting traps, and apply with maximum confidence.
            </p>
            <div className="pt-2">
              <button
                onClick={onStartAnalysis}
                className="px-8 py-4 rounded-xl text-sm font-semibold bg-zinc-100 text-zinc-950 hover:bg-white shadow-lg active:scale-95 transition-all inline-flex items-center gap-2"
              >
                <span>Analyze My Resume Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
