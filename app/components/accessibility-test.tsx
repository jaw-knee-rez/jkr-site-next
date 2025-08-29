'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { accessibilityTester } from '../lib/accessibility-testing';

interface AccessibilityTestResult {
  test: string;
  passed: boolean;
  message: string;
  details?: Record<string, unknown>;
  severity: 'critical' | 'important' | 'minor';
}

export default function AccessibilityTest() {
  const [testResults, setTestResults] = useState<AccessibilityTestResult[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    // Only show in development mode and ensure we're on client side
    if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
      setIsVisible(true);
      runAccessibilityTests();
    }
  }, []);

  const runAccessibilityTests = async () => {
    setIsRunning(true);
    try {
      const results = await accessibilityTester.runAllTests();
      setTestResults(results);
    } catch (error) {
      console.error('Accessibility testing failed:', error);
    } finally {
      setIsRunning(false);
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-600';
      case 'important': return 'text-yellow-600';
      case 'minor': return 'text-green-600';
      default: return 'text-gray-600';
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

  const getSummary = () => {
    const total = testResults.length;
    const passed = testResults.filter(r => r.passed).length;
    const failed = total - passed;
    const critical = testResults.filter(r => !r.passed && r.severity === 'critical').length;
    const important = testResults.filter(r => !r.passed && r.severity === 'important').length;
    const minor = testResults.filter(r => !r.passed && r.severity === 'minor').length;
    
    return { total, passed, failed, critical, important, minor };
  };

  if (!isVisible) return null;

  const summary = getSummary();

  return (
    <div className="fixed bottom-4 left-4 z-50 max-w-md">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-card border border-border rounded-lg shadow-lg p-4 max-h-96 overflow-y-auto"
      >
        <h3 className="text-sm font-semibold text-card-foreground mb-3">
          Accessibility Testing Panel
        </h3>
        
        {/* Summary */}
        <div className="mb-4 p-3 bg-muted rounded-lg">
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>Total: <span className="font-medium">{summary.total}</span></div>
            <div>Passed: <span className="font-medium text-green-600">{summary.passed}</span></div>
            <div>Failed: <span className="font-medium text-red-600">{summary.failed}</span></div>
            <div>Critical: <span className="font-medium text-red-600">{summary.critical}</span></div>
          </div>
          <div className="mt-2 text-xs">
            WCAG Compliance: <span className={`font-medium ${summary.critical === 0 ? 'text-green-600' : 'text-red-600'}`}>
              {summary.critical === 0 ? 'Compliant' : 'Non-Compliant'}
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
            onClick={runAccessibilityTests}
            disabled={isRunning}
            className="w-full px-3 py-2 bg-accent text-accent-foreground rounded text-xs font-medium hover:bg-accent/80 transition-colors disabled:opacity-50"
          >
            {isRunning ? 'Running Tests...' : 'Re-run Tests'}
          </button>
          
          <button
            onClick={() => {
              const report = accessibilityTester.generateReport();
              console.log('Accessibility Report:', report);
              alert('Accessibility report logged to console');
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
