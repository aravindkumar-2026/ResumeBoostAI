import React, { useState, useRef } from 'react';
import { 
  Upload, FileText, CheckCircle2, AlertCircle, Sparkles, X, Search, Bot,
  Code2, Layout, Server, Layers, Smartphone, BarChart3, BrainCircuit, Palette, Terminal, ShieldCheck, Cpu
} from 'lucide-react';
import { TARGET_ROLES } from '../data/targetRoles';
import { SAMPLE_RESUMES } from '../data/sampleResumes';
import { TargetRole } from '../types';

interface ResumeUploadProps {
  onAnalyze: (fileData: { pdfBase64?: string; text?: string; fileName: string; fileSize: number; roleTitle: string }) => void;
  isAnalyzing: boolean;
}

export const ResumeUpload: React.FC<ResumeUploadProps> = ({ onAnalyze, isAnalyzing }) => {
  const [selectedRole, setSelectedRole] = useState<TargetRole>(TARGET_ROLES[0]);
  const [searchRoleQuery, setSearchRoleQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'upload' | 'paste'>('upload');
  
  // File upload states
  const [file, setFile] = useState<File | null>(null);
  const [pdfBase64, setPdfBase64] = useState<string | undefined>(undefined);
  const [pastedText, setPastedText] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Icon mapping helper for target roles
  const getRoleIcon = (iconName: string) => {
    switch (iconName) {
      case 'Code2': return <Code2 className="w-4 h-4" />;
      case 'Layout': return <Layout className="w-4 h-4" />;
      case 'Server': return <Server className="w-4 h-4" />;
      case 'Layers': return <Layers className="w-4 h-4" />;
      case 'Smartphone': return <Smartphone className="w-4 h-4" />;
      case 'BarChart3': return <BarChart3 className="w-4 h-4" />;
      case 'BrainCircuit': return <BrainCircuit className="w-4 h-4" />;
      case 'Palette': return <Palette className="w-4 h-4" />;
      case 'Terminal': return <Terminal className="w-4 h-4" />;
      case 'ShieldCheck': return <ShieldCheck className="w-4 h-4" />;
      case 'Cpu': return <Cpu className="w-4 h-4" />;
      default: return <Code2 className="w-4 h-4" />;
    }
  };

  const filteredRoles = TARGET_ROLES.filter(r => 
    r.title.toLowerCase().includes(searchRoleQuery.toLowerCase()) ||
    r.category.toLowerCase().includes(searchRoleQuery.toLowerCase()) ||
    r.keySkills.some(s => s.toLowerCase().includes(searchRoleQuery.toLowerCase()))
  );

  const handleFileChange = (selectedFile: File) => {
    setErrorMessage(null);

    if (!selectedFile) return;

    // Check file type: must be PDF
    if (!selectedFile.name.toLowerCase().endsWith('.pdf') && selectedFile.type !== 'application/pdf') {
      setErrorMessage('Please upload a PDF file only. Other formats like Word or PNG are not supported for strict ATS parsing.');
      return;
    }

    // Check size limit (10MB)
    if (selectedFile.size > 10 * 1024 * 1024) {
      setErrorMessage('File size exceeds 10MB limit. Please compress or select a smaller PDF.');
      return;
    }

    setFile(selectedFile);

    // Read file as base64
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setPdfBase64(result);
    };
    reader.onerror = () => {
      setErrorMessage('Failed to read PDF file. Please try re-selecting the file.');
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleRemoveFile = () => {
    setFile(null);
    setPdfBase64(undefined);
    setErrorMessage(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleStartScan = () => {
    setErrorMessage(null);

    if (activeTab === 'upload') {
      if (!file || !pdfBase64) {
        setErrorMessage('Please select a PDF resume to proceed.');
        return;
      }
      onAnalyze({
        pdfBase64: pdfBase64,
        fileName: file.name,
        fileSize: file.size,
        roleTitle: selectedRole.title
      });
    } else {
      if (!pastedText.trim() || pastedText.trim().length < 50) {
        setErrorMessage('Please paste at least 50 characters of resume text.');
        return;
      }
      onAnalyze({
        text: pastedText,
        fileName: `${selectedRole.title.replace(/\s+/g, '_')}_Resume.txt`,
        fileSize: new Blob([pastedText]).size,
        roleTitle: selectedRole.title
      });
    }
  };

  const handleSelectSample = (sampleId: string) => {
    const sample = SAMPLE_RESUMES.find(s => s.id === sampleId) || SAMPLE_RESUMES[0];
    const roleMatch = TARGET_ROLES.find(r => r.title.toLowerCase() === sample.roleTitle.toLowerCase()) || TARGET_ROLES[0];
    setSelectedRole(roleMatch);
    setActiveTab('paste');
    setPastedText(sample.content);
    
    // Auto trigger analysis for instant satisfaction
    onAnalyze({
      text: sample.content,
      fileName: sample.filename,
      fileSize: 1024 * 300,
      roleTitle: sample.roleTitle
    });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header Title */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <h1 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight">
          Scan & Analyze Your Resume
        </h1>
        <p className="text-zinc-400 text-sm sm:text-base">
          Select your target role, upload your PDF resume or try a sample candidate profile, and get an instant AI ATS breakdown.
        </p>
      </div>

      {/* Step 1: Target Role Selector */}
      <div className="bg-zinc-900/50 rounded-3xl border border-zinc-800 p-6 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-800/80 pb-4">
          <div>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest bg-blue-500/10 text-blue-400 border border-blue-500/20">Step 1</span>
            <h2 className="text-lg font-semibold text-white mt-1">Select Target Job Role</h2>
          </div>
          
          {/* Role Search */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-zinc-500" />
            <input
              type="text"
              placeholder="Search roles or skills..."
              value={searchRoleQuery}
              onChange={(e) => setSearchRoleQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-xl text-xs bg-zinc-900 border border-zinc-800 text-zinc-200 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* Roles Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-h-64 overflow-y-auto pr-1">
          {filteredRoles.map((role) => {
            const isSelected = selectedRole.id === role.id;
            return (
              <button
                key={role.id}
                onClick={() => setSelectedRole(role)}
                className={`p-3 rounded-2xl text-left border transition-all flex items-start gap-2.5 ${
                  isSelected
                    ? 'bg-blue-600/20 border-blue-500/50 text-white shadow-sm'
                    : 'bg-zinc-800/30 border-zinc-800 hover:border-zinc-700 text-zinc-300'
                }`}
              >
                <div className={`p-1.5 rounded-xl shrink-0 mt-0.5 ${isSelected ? 'bg-blue-500 text-white' : 'bg-zinc-800 text-zinc-400'}`}>
                  {getRoleIcon(role.icon)}
                </div>
                <div className="min-w-0">
                  <h3 className="text-xs font-semibold truncate">{role.title}</h3>
                  <p className="text-[10px] text-zinc-500 truncate">{role.category}</p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Role Summary pill */}
        <div className="p-3.5 rounded-2xl bg-zinc-800/40 border border-zinc-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div className="space-y-1">
            <p className="font-medium text-zinc-200 flex items-center gap-2">
              <span>Evaluating for: <strong className="text-blue-400 font-semibold">{selectedRole.title}</strong></span>
            </p>
            <p className="text-zinc-500 text-[11px] line-clamp-1">{selectedRole.description}</p>
          </div>
          <div className="flex flex-wrap gap-1">
            {selectedRole.keySkills.slice(0, 4).map((skill, i) => (
              <span key={i} className="px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700/60 text-[10px] font-medium">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Step 2: Upload / Paste Section */}
      <div className="bg-zinc-900/50 rounded-3xl border border-zinc-800 p-6 space-y-6">
        <div className="flex items-center justify-between border-b border-zinc-800/80 pb-4">
          <div>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest bg-blue-500/10 text-blue-400 border border-blue-500/20">Step 2</span>
            <h2 className="text-lg font-semibold text-white mt-1">Provide Resume File</h2>
          </div>

          {/* Toggle Tab */}
          <div className="flex items-center bg-zinc-900 border border-zinc-800 p-1 rounded-full text-xs font-medium">
            <button
              onClick={() => setActiveTab('upload')}
              className={`px-3 py-1 rounded-full transition-colors ${activeTab === 'upload' ? 'bg-zinc-800 text-white font-semibold' : 'text-zinc-400'}`}
            >
              Upload PDF
            </button>
            <button
              onClick={() => setActiveTab('paste')}
              className={`px-3 py-1 rounded-full transition-colors ${activeTab === 'paste' ? 'bg-zinc-800 text-white font-semibold' : 'text-zinc-400'}`}
            >
              Paste Text
            </button>
          </div>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Tab 1: Upload PDF */}
        {activeTab === 'upload' && (
          <div className="space-y-4">
            {!file ? (
              <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-2xl p-8 sm:p-12 text-center cursor-pointer transition-all ${
                  isDragging
                    ? 'border-blue-500 bg-blue-500/10'
                    : 'border-zinc-800 hover:border-blue-500/60 bg-zinc-900/30'
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,application/pdf"
                  onChange={(e) => e.target.files?.[0] && handleFileChange(e.target.files[0])}
                  className="hidden"
                />

                <div className="w-14 h-14 rounded-2xl bg-blue-500/10 text-blue-400 mx-auto flex items-center justify-center mb-4">
                  <Upload className="w-7 h-7" />
                </div>

                <h3 className="text-base font-semibold text-white">
                  Drag and drop your PDF resume here
                </h3>
                <p className="text-xs text-zinc-400 mt-1">
                  or <span className="text-blue-400 font-semibold underline">browse files</span> from your device
                </p>
                <p className="text-[11px] text-zinc-500 mt-3">
                  Supported format: PDF only (Max 10MB)
                </p>
              </div>
            ) : (
              /* Uploaded File Selected Card */
              <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold text-white truncate">{file.name}</p>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400">
                        Ready
                      </span>
                    </div>
                    <p className="text-xs text-zinc-400 mt-0.5">
                      {(file.size / (1024 * 1024)).toFixed(2)} MB • PDF Document
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleRemoveFile}
                  className="p-2 rounded-lg text-zinc-400 hover:text-rose-400 hover:bg-zinc-800 transition-colors"
                  title="Remove file"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Paste Text */}
        {activeTab === 'paste' && (
          <div className="space-y-3">
            <label className="text-xs font-semibold text-zinc-300 block">
              Paste Resume Plain Text
            </label>
            <textarea
              rows={10}
              placeholder="Paste your full resume content here (Header, Summary, Experience, Education, Projects, Skills)..."
              value={pastedText}
              onChange={(e) => setPastedText(e.target.value)}
              className="w-full p-4 rounded-2xl text-xs font-mono bg-zinc-900 border border-zinc-800 text-zinc-200 focus:outline-none focus:border-blue-500"
            />
            <p className="text-[11px] text-zinc-500 flex justify-between">
              <span>Character count: {pastedText.length}</span>
              <span>Min. 50 characters recommended</span>
            </p>
          </div>
        )}

        {/* Try Sample Resumes Banner */}
        <div className="pt-4 border-t border-zinc-800/80">
          <p className="text-xs font-semibold text-zinc-400 mb-2.5 flex items-center gap-1.5">
            <Bot className="w-3.5 h-3.5 text-blue-400" />
            <span>Don't have a PDF ready? Try instant sample candidate resumes:</span>
          </p>
          <div className="flex flex-wrap gap-2">
            {SAMPLE_RESUMES.map((sample) => (
              <button
                key={sample.id}
                onClick={() => handleSelectSample(sample.id)}
                className="px-3 py-1.5 rounded-full bg-zinc-800/60 hover:bg-blue-600/20 text-zinc-300 hover:text-blue-400 text-xs font-medium border border-zinc-700/60 transition-colors"
              >
                ⚡ {sample.roleTitle} ({sample.name})
              </button>
            ))}
          </div>
        </div>

        {/* Submit Scan Button */}
        <div className="pt-4">
          <button
            onClick={handleStartScan}
            disabled={isAnalyzing}
            className="w-full py-4 rounded-xl text-sm font-semibold text-zinc-950 bg-zinc-100 hover:bg-white shadow-lg active:scale-[0.99] transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
          >
            {isAnalyzing ? (
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 border-2 border-zinc-950/30 border-t-zinc-950 rounded-full animate-spin"></div>
                <span>Scanning Resume with Gemini AI Recruiter...</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-blue-600" />
                <span>Run Complete ATS Analysis Now</span>
              </div>
            )}
          </button>
        </div>

      </div>

    </div>
  );
};
