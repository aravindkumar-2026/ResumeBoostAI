export type TargetRoleCategory = 'Engineering' | 'Design' | 'Data' | 'Operations';

export interface TargetRole {
  id: string;
  title: string;
  category: TargetRoleCategory;
  icon: string;
  description: string;
  keySkills: string[];
  softSkills: string[];
}

export interface SectionScore {
  score: number; // 0-100
  status: 'excellent' | 'good' | 'needs_improvement' | 'critical';
  feedback: string;
  suggestions: string[];
}

export interface ResumeSectionAnalysis {
  header: SectionScore;
  contactInfo: SectionScore;
  skills: SectionScore;
  education: SectionScore;
  experience: SectionScore;
  projects: SectionScore;
  certifications: SectionScore;
  achievements: SectionScore;
}

export interface SkillMatchResult {
  matchingSkills: string[];
  missingSkills: string[];
  recommendedSkills: string[];
  matchPercentage: number;
}

export interface ImprovementRoadmap {
  immediate: string[];
  highPriority: string[];
  mediumPriority: string[];
  optional: string[];
}

export interface KeywordCloudItem {
  word: string;
  count: number;
  category: 'found' | 'missing' | 'recommended';
}

export interface AIInterviewQuestion {
  id: string;
  question: string;
  type: 'technical' | 'behavioral' | 'project' | 'situational';
  context: string;
  sampleAnswerHint: string;
}

export interface AnalysisResult {
  id: string;
  timestamp: string;
  fileName: string;
  fileSize: number;
  targetRole: string;
  atsScore: number; // 0 - 100
  qualityScore: number; // 0 - 100
  readabilityScore: number; // 0 - 100
  summary: string;
  strengths: string[];
  weaknesses: string[];
  missingKeywords: string[];
  missingTechnicalSkills: string[];
  missingSoftSkills: string[];
  grammarIssues: string[];
  formattingIssues: string[];
  educationReview: string;
  experienceReview: string;
  projectsReview: string;
  certificationsReview: string;
  portfolioSuggestions: string[];
  gitHubSuggestions: string[];
  linkedInSuggestions: string[];
  improvementSuggestions: string[];
  sections: ResumeSectionAnalysis;
  skillMatch: SkillMatchResult;
  roadmap: ImprovementRoadmap;
  keywordCloud: KeywordCloudItem[];
  interviewQuestions?: AIInterviewQuestion[];
  extractedText?: string;
}

export interface CoverLetterResult {
  targetCompany: string;
  jobRole: string;
  coverLetterText: string;
  keyHighlightsUsed: string[];
}

export interface ResumeComparisonResult {
  id: string;
  timestamp: string;
  resumeA: { id: string; fileName: string; targetRole: string; atsScore: number; date: string };
  resumeB: { id: string; fileName: string; targetRole: string; atsScore: number; date: string };
  scoreDifference: number;
  scoreWinner: 'A' | 'B' | 'Equal';
  improvementsInB: string[];
  regressionsInB: string[];
  keyDifferencesSummary: string;
  recommendation: string;
}
