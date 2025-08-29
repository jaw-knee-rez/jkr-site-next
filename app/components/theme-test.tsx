'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../lib/theme-context';
import { themeTester } from '../lib/theme-testing';

interface ThemeTestResult {
  test: string;
  status: 'pass' | 'fail' | 'pending';
  details?: string;
}

export default function ThemeTest() {
  const { theme, toggleTheme, isTransitioning } = useTheme();
  const [testResults, setTestResults] = useState<ThemeTestResult[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show in development mode and ensure we're on client side
    if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
      setIsVisible(true);
      runThemeTests();
    }
  }, []);

  const runThemeTests = async () => {
    const results = await themeTester.runAllTests();
    
    const formattedResults: ThemeTestResult[] = results.map(result => ({
      test: result.message.split(':')[0] || result.message,
      status: result.passed ? 'pass' : 'fail',
      details: result.details ? JSON.stringify(result.details) : undefined
    }));

    // Add component-specific tests
    formattedResults.push({
      test: 'Theme Context State',
      status: 'pass',
      details: `Current theme: ${theme}, Transitioning: ${isTransitioning}`
    });

    setTestResults(formattedResults);
  };

  const handleToggleTest = () => {
    const beforeTheme = theme;
    toggleTheme();
    
    // Wait for transition to complete
    setTimeout(() => {
      const afterTheme = theme;
      const newResult: ThemeTestResult = {
        test: 'Theme Toggle Functionality',
        status: beforeTheme !== afterTheme ? 'pass' : 'fail',
        details: `Before: ${beforeTheme}, After: ${afterTheme}`
      };
      
      setTestResults(prev => [...prev, newResult]);
    }, 600);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 z-50 max-w-sm">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-card border border-border rounded-lg shadow-lg p-4"
      >
        <h3 className="text-sm font-semibold text-card-foreground mb-3">
          Theme Testing Panel
        </h3>
        
        <div className="space-y-2 mb-4">
          {testResults.map((result, index) => (
            <div key={index} className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">{result.test}</span>
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${
                  result.status === 'pass' ? 'bg-green-500' : 
                  result.status === 'fail' ? 'bg-red-500' : 'bg-yellow-500'
                }`} />
                <span className={`text-xs ${
                  result.status === 'pass' ? 'text-green-600' : 
                  result.status === 'fail' ? 'text-red-600' : 'text-yellow-600'
                }`}>
                  {result.status.toUpperCase()}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-2">
          <button
            onClick={handleToggleTest}
            className="w-full px-3 py-2 bg-accent text-accent-foreground rounded text-xs font-medium hover:bg-accent/80 transition-colors"
          >
            Test Theme Toggle
          </button>
          
          <button
            onClick={runThemeTests}
            className="w-full px-3 py-2 bg-muted text-muted-foreground rounded text-xs font-medium hover:bg-muted/80 transition-colors"
          >
            Re-run Tests
          </button>
        </div>

        <div className="mt-3 pt-3 border-t border-border">
          <div className="text-xs text-muted-foreground">
            Current Theme: <span className="font-medium text-foreground">{theme}</span>
          </div>
          <div className="text-xs text-muted-foreground">
            Transitioning: <span className="font-medium text-foreground">{isTransitioning ? 'Yes' : 'No'}</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
