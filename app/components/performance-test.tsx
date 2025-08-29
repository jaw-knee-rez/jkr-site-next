'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { performanceTester } from '../lib/performance-testing';

interface PerformanceTestResult {
  test: string;
  passed: boolean;
  score: number;
  message: string;
  details?: Record<string, unknown>;
  severity: 'critical' | 'important' | 'minor';
}

export default function PerformanceTest() {
  const [testResults, setTestResults] = useState<PerformanceTestResult[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    // Only show in development mode and ensure we're on client side
    if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
      setIsVisible(true);
      runPerformanceTests();
    }
  }, []);

  const runPerformanceTests = async () => {
    setIsRunning(true);
    try {
      const results = await performanceTester.runAllTests();
      setTestResults(results);
    } catch (error) {
      console.error('Performance testing failed:', error);
    } finally {
      setIsRunning(false);
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical': return '🔴';
      case 'important': return '🟡';
      case 'minor': return '🟢';
      default: return '⚪';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-blue-600';
    if (score >= 70) return 'text-yellow-600';
    if (score >= 60) return 'text-orange-600';
    return 'text-red-600';
  };

  const getSummary = () => {
    const total = testResults.length;
    const passed = testResults.filter(r => r.passed).length;
    const failed = total - passed;
    const averageScore = testResults.reduce((sum, r) => sum + r.score, 0) / total;
    const critical = testResults.filter(r => r.severity === 'critical').length;
    const important = testResults.filter(r => r.severity === 'important').length;
    const minor = testResults.filter(r => r.severity === 'minor').length;
    
    return { total, passed, failed, averageScore, critical, important, minor };
  };

  if (!isVisible) return null;

  const summary = getSummary();

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-md">
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-card border border-border rounded-lg shadow-lg p-4 max-h-96 overflow-y-auto"
      >
        <h3 className="text-sm font-semibold text-card-foreground mb-3">
          Performance Testing Panel
        </h3>
        
        {/* Summary */}
        <div className="mb-4 p-3 bg-muted rounded-lg">
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>Total: <span className="font-medium">{summary.total}</span></div>
            <div>Passed: <span className="font-medium text-green-600">{summary.passed}</span></div>
            <div>Failed: <span className="font-medium text-red-600">{summary.failed}</span></div>
            <div>Score: <span className={`font-medium ${getScoreColor(summary.averageScore)}`}>
              {summary.averageScore.toFixed(1)}%
            </span></div>
          </div>
          <div className="mt-2 text-xs">
            Grade: <span className={`font-medium ${getScoreColor(summary.averageScore)}`}>
              {summary.averageScore >= 90 ? 'A+ (Excellent)' : 
               summary.averageScore >= 80 ? 'A (Very Good)' :
               summary.averageScore >= 70 ? 'B (Good)' :
               summary.averageScore >= 60 ? 'C (Fair)' :
               summary.averageScore >= 50 ? 'D (Poor)' : 'F (Very Poor)'}
            </span>
          </div>
        </div>

        {/* Test Results */}
        <div className="space-y-2 mb-4">
          {testResults.map((result, index) => (
            <div key={index} className="flex items-start gap-2 text-xs">
              <span className={`flex-shrink-0 ${getSeverityIcon(result.severity)}`} />
              <div className="flex-1 min-w-0">
                <div className={`font-medium ${result.passed ? 'text-green-600' : 'text-red-600'}`}>
                  {result.test}
                </div>
                <div className="text-muted-foreground">
                  {result.message}
                </div>
                <div className={`text-xs font-medium ${getScoreColor(result.score)}`}>
                  Score: {result.score.toFixed(1)}%
                </div>
                {result.details && (
                  <div className="text-xs text-muted-foreground mt-1">
                    <details>
                      <summary className="cursor-pointer">Details</summary>
                      <pre className="mt-1 text-xs bg-muted p-2 rounded overflow-x-auto">
                        {JSON.stringify(result.details, null, 2)}
                      </pre>
                    </details>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Controls */}
        <div className="space-y-2">
          <button
            onClick={runPerformanceTests}
            disabled={isRunning}
            className="w-full px-3 py-2 bg-accent text-accent-foreground rounded text-xs font-medium hover:bg-accent/80 transition-colors disabled:opacity-50"
          >
            {isRunning ? 'Running Tests...' : 'Re-run Tests'}
          </button>
          
          <button
            onClick={() => {
              const report = performanceTester.generateReport();
              console.log('Performance Report:', report);
              alert('Performance report logged to console');
            }}
            className="w-full px-3 py-2 bg-muted text-muted-foreground rounded text-xs font-medium hover:bg-muted/80 transition-colors"
          >
            Generate Report
          </button>
        </div>

        {/* Status */}
        <div className="mt-3 pt-3 border-t border-border">
          <div className="text-xs text-muted-foreground">
            Status: <span className="font-medium text-foreground">
              {isRunning ? 'Testing...' : 'Ready'}
            </span>
          </div>
          <div className="text-xs text-muted-foreground">
            Last Run: <span className="font-medium text-foreground">
              {testResults.length > 0 ? new Date().toLocaleTimeString() : 'Never'}
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
