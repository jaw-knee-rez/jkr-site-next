'use client';

import { motion } from 'framer-motion';
import { useTheme } from '../lib/theme-context';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  // Handle keyboard navigation
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggleTheme();
    }
  };

  return (
    <motion.button
      onClick={toggleTheme}
      onKeyDown={handleKeyDown}
      className="fixed top-6 right-6 z-50 p-3 bg-background/80 backdrop-blur-sm border border-border rounded-full shadow-lg hover:shadow-xl theme-toggle-transition focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background"
      whileHover={{ scale: 1.1, rotate: 5, y: -2 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, scale: 0.8, y: -20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.5 }}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      tabIndex={0}
    >
      <motion.div
        key={theme}
        initial={{ rotate: -90, opacity: 0, scale: 0.8 }}
        animate={{ rotate: 0, opacity: 1, scale: 1 }}
        exit={{ rotate: 90, opacity: 0, scale: 0.8 }}
        transition={{ 
          duration: 0.5, 
          ease: [0.4, 0, 0.2, 1],
          scale: { duration: 0.3, ease: "easeOut" }
        }}
        className="w-5 h-5"
      >
        {theme === 'light' ? (
          // Moon icon for dark mode
          <svg
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            className="w-5 h-5 text-foreground"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
            />
          </svg>
        ) : (
          // Sun icon for light mode
          <svg
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            className="w-5 h-5 text-foreground"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
        )}
      </motion.div>
    </motion.button>
  );
}
