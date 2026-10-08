'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  isTransitioning: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');
  const [mounted, setMounted] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    // Read the persisted theme from localStorage after mount. This must happen in an
    // effect (localStorage is unavailable during SSR and reading it earlier would
    // cause a hydration mismatch), so the synchronous setState here is intentional.
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    /* eslint-disable react-hooks/set-state-in-effect */
    setTheme(savedTheme ?? 'light');
    setMounted(true);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  useEffect(() => {
    if (mounted) {
      // Update document class and localStorage when theme changes
      document.documentElement.classList.remove('light', 'dark');
      document.documentElement.classList.add(theme);
      
      // Save theme to localStorage
      localStorage.setItem('theme', theme);
    }
  }, [theme, mounted]);

  // System theme listener removed since we default to light mode

  const toggleTheme = () => {
    setIsTransitioning(true);
    
    // Toggle between light and dark themes
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
    
    // Reset transition state after animation completes
    setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
  };



  // Prevent hydration mismatch
  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <ThemeContext.Provider value={{ 
      theme, 
      toggleTheme, 
      isTransitioning
    }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
