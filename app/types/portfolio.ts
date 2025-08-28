// Portfolio piece types
export interface PortfolioImage {
  src: string;
  alt: string;
  caption?: string;
  width: number;
  height: number;
}

export interface PortfolioPiece {
  id: string;
  slug: string;
  title: string;
  description: string;
  thumbnail: PortfolioImage;
  category: 'product-design' | 'ux-design' | 'research' | 'prototype';
  date: string;
  isProtected: boolean;
  tags: string[];
  featured: boolean;
}

export interface PortfolioDetail extends PortfolioPiece {
  problemSpace: string;
  process: string;
  images: PortfolioImage[];
  results: {
    impact: string;
    metrics?: string[];
    outcomes: string[];
  };
  technologies?: string[];
  duration?: string;
  teamSize?: number;
  role: string;
}

// Navigation types
export interface NavigationItem {
  id: string;
  title: string;
  href: string;
  isProtected: boolean;
}

export interface PortfolioNavigation {
  current: PortfolioPiece;
  previous?: PortfolioPiece;
  next?: PortfolioPiece;
}

// Theme types
export type Theme = 'light' | 'dark';

// Authentication types
export interface AuthState {
  isAuthenticated: boolean;
  protectedAccess: string[]; // Array of protected portfolio piece IDs
}

// Design process types
export interface ProcessSection {
  id: string;
  title: string;
  description: string;
  steps?: string[];
  tools?: string[];
  examples?: PortfolioImage[];
}

export interface DesignProcess {
  overview: string;
  sections: ProcessSection[];
  principles: string[];
  methodology: string;
}

// API response types
export interface PortfolioResponse {
  pieces: PortfolioPiece[];
  total: number;
  hasMore: boolean;
}

export interface PortfolioDetailResponse {
  piece: PortfolioDetail;
  navigation: PortfolioNavigation;
}

// Form types
export interface PasswordForm {
  password: string;
}

// Error types
export interface PortfolioError {
  code: 'NOT_FOUND' | 'UNAUTHORIZED' | 'INTERNAL_ERROR';
  message: string;
  details?: string;
}
