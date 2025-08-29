'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { browserCompatibilityTester } from '../lib/browser-compatibility-testing';

interface CompatibilityTestResult {
  test: string;
  passed: boolean;
  message: string;
  details?: Record<string, unknown>;
  severity: 'critical' | 'important' | 'minor';
}

interface BrowserInfo {
  name: string;
  version: string;
  userAgent: string;
  platform: string;
  vendor: string;
  language: string;
  cookieEnabled: boolean;
  onLine: boolean;
  javaEnabled: boolean;
}

interface FeatureSupport {
  feature: string;
  supported: boolean;
  version?: string;
  notes?: string;
}

export default function BrowserCompatibilityTest() {
  const [testResults, setTestResults] = useState<CompatibilityTestResult[]>([]);
  const [browserInfo, setBrowserInfo] = useState<BrowserInfo | null>(null);
  const [featureSupport, setFeatureSupport] = useState<FeatureSupport[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    // Only show in development mode and ensure we're on client side
    if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
      setIsVisible(true);
      // Delay the test run to ensure component is fully mounted
      setTimeout(() => {
        runCompatibilityTests();
      }, 100);
    }
  }, []);

  const runCompatibilityTests = async () => {
    setIsRunning(true);
    try {
      const results = await browserCompatibilityTester.runAllTests();
      setTestResults(results);
      setBrowserInfo(browserCompatibilityTester.getBrowserInfo());
      setFeatureSupport(browserCompatibilityTester.getFeatureSupport());
    } catch (error) {
      console.error('Browser compatibility testing failed:', error);
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

  const getCompatibilityGrade = (summary: { total: number; passed: number }) => {
    const percentage = (summary.passed / summary.total) * 100;
    
    if (percentage >= 95) return 'A+ (Excellent)';
    if (percentage >= 90) return 'A (Very Good)';
    if (percentage >= 80) return 'B (Good)';
    if (percentage >= 70) return 'C (Fair)';
    if (percentage >= 60) return 'D (Poor)';
    return 'F (Very Poor)';
  };

  const getSummary = () => {
    const total = testResults.length;
    const passed = testResults.filter(r => r.passed).length;
    const failed = total - passed;
    const critical = testResults.filter(r => r.severity === 'critical').length;
    const important = testResults.filter(r => r.severity === 'important').length;
    const minor = testResults.filter(r => r.severity === 'minor').length;
    
    return { total, passed, failed, critical, important, minor };
  };

  if (!isVisible) return null;

  const summary = getSummary();
  const grade = getCompatibilityGrade(summary);

  return (
    <div className="fixed top-4 left-4 z-50 max-w-md">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card border border-border rounded-lg shadow-lg p-4 max-h-96 overflow-y-auto"
      >
        <h3 className="text-sm font-semibold text-card-foreground mb-3">
          Browser Compatibility Testing
        </h3>
        
        {/* Browser Info */}
        {browserInfo && (
          <div className="mb-4 p-3 bg-muted rounded-lg">
            <div className="text-xs space-y-1">
              <div><strong>Browser:</strong> {browserInfo.name} {browserInfo.version}</div>
              <div><strong>Platform:</strong> {browserInfo.platform}</div>
              <div><strong>Language:</strong> {browserInfo.language}</div>
              <div><strong>Online:</strong> {browserInfo.onLine ? 'Yes' : 'No'}</div>
              <div><strong>Cookies:</strong> {browserInfo.cookieEnabled ? 'Enabled' : 'Disabled'}</div>
            </div>
          </div>
        )}

        {/* Feature Support Summary */}
        {featureSupport.length > 0 && (
          <div className="mb-4 p-3 bg-muted rounded-lg">
            <div className="text-xs">
              <div><strong>Feature Support:</strong></div>
              <div>Supported: {featureSupport.filter(f => f.supported).length}/{featureSupport.length}</div>
              <div>Support Rate: {((featureSupport.filter(f => f.supported).length / featureSupport.length) * 100).toFixed(1)}%</div>
            </div>
          </div>
        )}
        
        {/* Summary */}
        <div className="mb-4 p-3 bg-muted rounded-lg">
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>Total: <span className="font-medium">{summary.total}</span></div>
            <div>Passed: <span className="font-medium text-green-600">{summary.passed}</span></div>
            <div>Failed: <span className="font-medium text-red-600">{summary.failed}</span></div>
            <div>Grade: <span className="font-medium text-blue-600">{grade}</span></div>
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
            onClick={runCompatibilityTests}
            disabled={isRunning}
            className="w-full px-3 py-2 bg-accent text-accent-foreground rounded text-xs font-medium hover:bg-accent/80 transition-colors disabled:opacity-50"
          >
            {isRunning ? 'Running Tests...' : 'Re-run Tests'}
          </button>
          
          <button
            onClick={() => {
              const report = browserCompatibilityTester.generateReport();
              console.log('Browser Compatibility Report:', report);
              alert('Browser compatibility report logged to console');
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
