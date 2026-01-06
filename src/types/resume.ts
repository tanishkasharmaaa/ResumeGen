export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  linkedin: string;
  github: string;
  title: string;
  photo?: string;
}

export interface ProfessionalSummary {
  summary: string;
}

export interface Skill {
  id: string;
  name: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  category?: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  highlights: string[];
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  githubUrl: string;
  liveUrl: string;
  image?: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  location: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  achievements: string[];
}

export interface Achievement {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description: string;
  url?: string;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  professionalSummary: ProfessionalSummary;
  skills: Skill[];
  experience: Experience[];
  projects: Project[];
  education: Education[];
  achievements: Achievement[];
}

export interface ResumeSettings {
  template: 'minimal' | 'modern' | 'creative' | 'ats' | 'tech';
  primaryColor: string;
  fontFamily: string;
  fontSize: 'small' | 'medium' | 'large';
}

export interface PortfolioSettings {
  template: 'developer' | 'designer' | 'minimal';
  primaryColor: string;
  accentColor: string;
}

export type FormStep = 
  | 'personal'
  | 'summary'
  | 'skills'
  | 'experience'
  | 'projects'
  | 'education'
  | 'achievements';

export const FORM_STEPS: { id: FormStep; label: string; icon: string }[] = [
  { id: 'personal', label: 'Personal Info', icon: 'User' },
  { id: 'summary', label: 'Summary', icon: 'FileText' },
  { id: 'skills', label: 'Skills', icon: 'Zap' },
  { id: 'experience', label: 'Experience', icon: 'Briefcase' },
  { id: 'projects', label: 'Projects', icon: 'FolderOpen' },
  { id: 'education', label: 'Education', icon: 'GraduationCap' },
  { id: 'achievements', label: 'Achievements', icon: 'Award' },
];

export const DEFAULT_RESUME_DATA: ResumeData = {
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    location: '',
    website: '',
    linkedin: '',
    github: '',
    title: '',
  },
  professionalSummary: {
    summary: '',
  },
  skills: [],
  experience: [],
  projects: [],
  education: [],
  achievements: [],
};

export const DEFAULT_RESUME_SETTINGS: ResumeSettings = {
  template: 'modern',
  primaryColor: '#0891b2',
  fontFamily: 'Inter',
  fontSize: 'medium',
};

export const DEFAULT_PORTFOLIO_SETTINGS: PortfolioSettings = {
  template: 'developer',
  primaryColor: '#0891b2',
  accentColor: '#f97316',
};
