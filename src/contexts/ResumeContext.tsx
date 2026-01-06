import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import {
  ResumeData,
  ResumeSettings,
  PortfolioSettings,
  FormStep,
  DEFAULT_RESUME_DATA,
  DEFAULT_RESUME_SETTINGS,
  DEFAULT_PORTFOLIO_SETTINGS,
} from '@/types/resume';

interface ResumeContextType {
  resumeData: ResumeData;
  resumeSettings: ResumeSettings;
  portfolioSettings: PortfolioSettings;
  currentStep: FormStep;
  isDarkMode: boolean;
  updateResumeData: <K extends keyof ResumeData>(key: K, value: ResumeData[K]) => void;
  updateResumeSettings: <K extends keyof ResumeSettings>(key: K, value: ResumeSettings[K]) => void;
  updatePortfolioSettings: <K extends keyof PortfolioSettings>(key: K, value: PortfolioSettings[K]) => void;
  setCurrentStep: (step: FormStep) => void;
  toggleDarkMode: () => void;
  resetData: () => void;
  exportData: () => string;
  importData: (jsonString: string) => boolean;
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

const STORAGE_KEYS = {
  RESUME_DATA: 'resumeBuilder_resumeData',
  RESUME_SETTINGS: 'resumeBuilder_resumeSettings',
  PORTFOLIO_SETTINGS: 'resumeBuilder_portfolioSettings',
  DARK_MODE: 'resumeBuilder_darkMode',
};

export const ResumeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [resumeData, setResumeData] = useState<ResumeData>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.RESUME_DATA);
    return saved ? JSON.parse(saved) : DEFAULT_RESUME_DATA;
  });

  const [resumeSettings, setResumeSettings] = useState<ResumeSettings>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.RESUME_SETTINGS);
    return saved ? JSON.parse(saved) : DEFAULT_RESUME_SETTINGS;
  });

  const [portfolioSettings, setPortfolioSettings] = useState<PortfolioSettings>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.PORTFOLIO_SETTINGS);
    return saved ? JSON.parse(saved) : DEFAULT_PORTFOLIO_SETTINGS;
  });

  const [currentStep, setCurrentStep] = useState<FormStep>('personal');

  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.DARK_MODE);
    return saved ? JSON.parse(saved) : false;
  });

  // Auto-save to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.RESUME_DATA, JSON.stringify(resumeData));
  }, [resumeData]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.RESUME_SETTINGS, JSON.stringify(resumeSettings));
  }, [resumeSettings]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PORTFOLIO_SETTINGS, JSON.stringify(portfolioSettings));
  }, [portfolioSettings]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.DARK_MODE, JSON.stringify(isDarkMode));
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const updateResumeData = useCallback(<K extends keyof ResumeData>(key: K, value: ResumeData[K]) => {
    setResumeData(prev => ({ ...prev, [key]: value }));
  }, []);

  const updateResumeSettings = useCallback(<K extends keyof ResumeSettings>(key: K, value: ResumeSettings[K]) => {
    setResumeSettings(prev => ({ ...prev, [key]: value }));
  }, []);

  const updatePortfolioSettings = useCallback(<K extends keyof PortfolioSettings>(key: K, value: PortfolioSettings[K]) => {
    setPortfolioSettings(prev => ({ ...prev, [key]: value }));
  }, []);

  const toggleDarkMode = useCallback(() => {
    setIsDarkMode((prev: boolean) => !prev);
  }, []);

  const resetData = useCallback(() => {
    setResumeData(DEFAULT_RESUME_DATA);
    setResumeSettings(DEFAULT_RESUME_SETTINGS);
    setPortfolioSettings(DEFAULT_PORTFOLIO_SETTINGS);
    setCurrentStep('personal');
  }, []);

  const exportData = useCallback(() => {
    return JSON.stringify({
      resumeData,
      resumeSettings,
      portfolioSettings,
    }, null, 2);
  }, [resumeData, resumeSettings, portfolioSettings]);

  const importData = useCallback((jsonString: string): boolean => {
    try {
      const data = JSON.parse(jsonString);
      if (data.resumeData) setResumeData(data.resumeData);
      if (data.resumeSettings) setResumeSettings(data.resumeSettings);
      if (data.portfolioSettings) setPortfolioSettings(data.portfolioSettings);
      return true;
    } catch {
      return false;
    }
  }, []);

  return (
    <ResumeContext.Provider
      value={{
        resumeData,
        resumeSettings,
        portfolioSettings,
        currentStep,
        isDarkMode,
        updateResumeData,
        updateResumeSettings,
        updatePortfolioSettings,
        setCurrentStep,
        toggleDarkMode,
        resetData,
        exportData,
        importData,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = () => {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
};
