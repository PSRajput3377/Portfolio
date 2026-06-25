export interface Project {
  id: string;
  title: string;
  subtitle: string;
  problem: string;
  solution: string;
  impact: string[];
  tech: string[];
  github?: string;
  demo?: string;
  metrics?: { label: string; value: string }[];
  images: string[];
  gradient: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  description: string;
  highlights: string[];
  achievements: { label: string; value: number; suffix?: string }[];
  tech: string[];
}

export interface TimelineItem {
  year: string;
  title: string;
  description: string;
}

export interface SkillCategory {
  name: string;
  skills: { name: string; level: number }[];
}

export interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  language: string | null;
  fork: boolean;
  updated_at: string;
}

export interface GitHubStats {
  repos: GitHubRepo[];
  totalStars: number;
  totalForks: number;
  languages: Record<string, number>;
  contributions: number;
}

export interface LeetCodeStats {
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  ranking: number;
  acceptanceRate: string;
}
