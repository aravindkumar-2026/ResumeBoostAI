import { AnalysisResult, ResumeComparisonResult } from '../types';

const HISTORY_KEY = 'resumeboost_history';
const COMPARISONS_KEY = 'resumeboost_comparisons';
const THEME_KEY = 'resumeboost_theme';

export function getSavedHistory(): AnalysisResult[] {
  try {
    const data = localStorage.getItem(HISTORY_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error('Failed to load history from localStorage', e);
    return [];
  }
}

export function saveAnalysisToHistory(result: AnalysisResult): void {
  try {
    const history = getSavedHistory();
    // Remove duplicate if exists
    const filtered = history.filter(item => item.id !== result.id);
    const updated = [result, ...filtered].slice(0, 20); // Keep last 20
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to save analysis to localStorage', e);
  }
}

export function deleteAnalysisFromHistory(id: string): AnalysisResult[] {
  try {
    const history = getSavedHistory();
    const updated = history.filter(item => item.id !== id);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error('Failed to delete history item', e);
    return getSavedHistory();
  }
}

export function clearAllHistory(): void {
  try {
    localStorage.removeItem(HISTORY_KEY);
  } catch (e) {
    console.error('Failed to clear history', e);
  }
}

export function getSavedTheme(): 'dark' | 'light' {
  try {
    const theme = localStorage.getItem(THEME_KEY);
    if (theme === 'light' || theme === 'dark') return theme;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  } catch (e) {
    return 'dark';
  }
}

export function saveTheme(theme: 'dark' | 'light'): void {
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch (e) {
    console.error('Failed to save theme', e);
  }
}
