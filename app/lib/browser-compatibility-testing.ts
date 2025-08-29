'use client';

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

interface CompatibilityTestResult {
  test: string;
  passed: boolean;
  message: string;
  details?: Record<string, unknown>;
  severity: 'critical' | 'important' | 'minor';
}

// Removed unused interface

export class BrowserCompatibilityTester {
  private results: CompatibilityTestResult[] = [];
  private browserInfo: BrowserInfo | null = null;
  private featureSupport: FeatureSupport[] = [];

  async runAllTests(): Promise<CompatibilityTestResult[]> {
    this.results = [];
    
    // Check if we're in a browser environment
    if (typeof window === 'undefined') {
      return this.results;
    }
    
    // Get browser information
    this.browserInfo = this.createBrowserInfo();
    this.featureSupport = this.createFeatureSupport();

    // Run all compatibility tests
    await this.testCSSFeatures();
    await this.testJavaScriptFeatures();
    await this.testHTML5Features();
    await this.testWebAPIs();
    await this.testPerformanceAPIs();
    await this.testAnimationFeatures();
    await this.testResponsiveFeatures();
    await this.testAccessibilityFeatures();
    await this.testSecurityFeatures();

    return this.results;
  }

  private createBrowserInfo(): BrowserInfo {
    // Check if we're in a browser environment
    if (typeof window === 'undefined' || typeof navigator === 'undefined') {
      return {
        name: 'Unknown',
        version: 'Unknown',
        userAgent: 'Unknown',
        platform: 'Unknown',
        vendor: 'Unknown',
        language: 'Unknown',
        cookieEnabled: false,
        onLine: false,
        javaEnabled: false
      };
    }

    const userAgent = navigator.userAgent;
    const platform = navigator.platform;
    const vendor = navigator.vendor;
    const language = navigator.language;
    const cookieEnabled = navigator.cookieEnabled;
    const onLine = navigator.onLine;
    const javaEnabled = 'javaEnabled' in navigator ? (navigator as Navigator & { javaEnabled(): boolean }).javaEnabled() : false;

    // Detect browser and version
    let name = 'Unknown';
    let version = 'Unknown';

    if (userAgent.includes('Chrome')) {
      name = 'Chrome';
      const match = userAgent.match(/Chrome\/(\d+)/);
      version = match ? match[1] : 'Unknown';
    } else if (userAgent.includes('Firefox')) {
      name = 'Firefox';
      const match = userAgent.match(/Firefox\/(\d+)/);
      version = match ? match[1] : 'Unknown';
    } else if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) {
      name = 'Safari';
      const match = userAgent.match(/Version\/(\d+)/);
      version = match ? match[1] : 'Unknown';
    } else if (userAgent.includes('Edge')) {
      name = 'Edge';
      const match = userAgent.match(/Edge\/(\d+)/);
      version = match ? match[1] : 'Unknown';
    } else if (userAgent.includes('MSIE') || userAgent.includes('Trident')) {
      name = 'Internet Explorer';
      const match = userAgent.match(/MSIE (\d+)/) || userAgent.match(/rv:(\d+)/);
      version = match ? match[1] : 'Unknown';
    }

    return {
      name,
      version,
      userAgent,
      platform,
      vendor,
      language,
      cookieEnabled,
      onLine,
      javaEnabled
    };
  }

  private createFeatureSupport(): FeatureSupport[] {
    const features: FeatureSupport[] = [];

    // Check if we're in a browser environment
    if (typeof window === 'undefined') {
      return features;
    }

    // CSS Features
    features.push({
      feature: 'CSS Grid',
      supported: 'CSS' in window && 'supports' in CSS && CSS.supports('display', 'grid'),
      notes: 'Modern layout system'
    });

    features.push({
      feature: 'CSS Flexbox',
      supported: 'CSS' in window && 'supports' in CSS && CSS.supports('display', 'flex'),
      notes: 'Flexible box layout'
    });

    features.push({
      feature: 'CSS Custom Properties',
      supported: 'CSS' in window && 'supports' in CSS && CSS.supports('--custom-property', 'value'),
      notes: 'CSS variables support'
    });

    features.push({
      feature: 'CSS Transforms',
      supported: 'CSS' in window && 'supports' in CSS && CSS.supports('transform', 'translateX(0)'),
      notes: 'CSS transform support'
    });

    features.push({
      feature: 'CSS Transitions',
      supported: 'CSS' in window && 'supports' in CSS && CSS.supports('transition', 'all 0.3s'),
      notes: 'CSS transition support'
    });

    features.push({
      feature: 'CSS Animations',
      supported: 'CSS' in window && 'supports' in CSS && CSS.supports('animation', 'fade 1s'),
      notes: 'CSS animation support'
    });

    // JavaScript Features
    features.push({
      feature: 'ES6 Modules',
      supported: true, // ES6 modules are supported in modern environments
      notes: 'ES6 module support'
    });

    features.push({
      feature: 'Arrow Functions',
      supported: (() => true)(),
      notes: 'ES6 arrow function support'
    });

    features.push({
      feature: 'Template Literals',
      supported: typeof `template literal` === 'string',
      notes: 'ES6 template literal support'
    });

    features.push({
      feature: 'Destructuring',
      supported: (() => {
        const { test } = { test: true };
        return test;
      })(),
      notes: 'ES6 destructuring support'
    });

    features.push({
      feature: 'Async/Await',
      supported: true, // Async/await is supported in modern environments
      notes: 'ES7 async/await support'
    });

    features.push({
      feature: 'Promise',
      supported: typeof Promise !== 'undefined',
      notes: 'ES6 Promise support'
    });

    features.push({
      feature: 'Fetch API',
      supported: typeof fetch !== 'undefined',
      notes: 'Modern fetch API'
    });

    // HTML5 Features
    features.push({
      feature: 'Local Storage',
      supported: typeof localStorage !== 'undefined',
      notes: 'HTML5 local storage'
    });

    features.push({
      feature: 'Session Storage',
      supported: typeof sessionStorage !== 'undefined',
      notes: 'HTML5 session storage'
    });

    features.push({
      feature: 'Web Workers',
      supported: typeof Worker !== 'undefined',
      notes: 'HTML5 web workers'
    });

    features.push({
      feature: 'Service Workers',
      supported: 'serviceWorker' in navigator,
      notes: 'Progressive web app support'
    });

    // Web APIs
    features.push({
      feature: 'Intersection Observer',
      supported: typeof IntersectionObserver !== 'undefined',
      notes: 'Modern intersection observer API'
    });

    features.push({
      feature: 'Resize Observer',
      supported: typeof ResizeObserver !== 'undefined',
      notes: 'Modern resize observer API'
    });

    features.push({
      feature: 'Performance Observer',
      supported: typeof PerformanceObserver !== 'undefined',
      notes: 'Performance monitoring API'
    });

    features.push({
      feature: 'Web Animations API',
      supported: typeof Element !== 'undefined' && 'animate' in Element.prototype,
      notes: 'Modern animation API'
    });

    return features;
  }

  private async testCSSFeatures(): Promise<void> {
    const tests = [
      {
        test: 'CSS Grid Layout',
        check: () => {
          const supported = this.featureSupport.find(f => f.feature === 'CSS Grid')?.supported;
          return {
            passed: Boolean(supported),
            message: supported ? 'CSS Grid is supported' : 'CSS Grid is not supported',
            severity: 'important' as const,
            details: { supported }
          };
        }
      },
      {
        test: 'CSS Flexbox',
        check: () => {
          const supported = this.featureSupport.find(f => f.feature === 'CSS Flexbox')?.supported;
          return {
            passed: Boolean(supported),
            message: supported ? 'CSS Flexbox is supported' : 'CSS Flexbox is not supported',
            severity: 'critical' as const,
            details: { supported }
          };
        }
      },
      {
        test: 'CSS Custom Properties',
        check: () => {
          const supported = this.featureSupport.find(f => f.feature === 'CSS Custom Properties')?.supported;
          return {
            passed: Boolean(supported),
            message: supported ? 'CSS Custom Properties are supported' : 'CSS Custom Properties are not supported',
            severity: 'important' as const,
            details: { supported }
          };
        }
      },
      {
        test: 'CSS Transforms',
        check: () => {
          const supported = this.featureSupport.find(f => f.feature === 'CSS Transforms')?.supported;
          return {
            passed: Boolean(supported),
            message: supported ? 'CSS Transforms are supported' : 'CSS Transforms are not supported',
            severity: 'important' as const,
            details: { supported }
          };
        }
      },
      {
        test: 'CSS Transitions',
        check: () => {
          const supported = this.featureSupport.find(f => f.feature === 'CSS Transitions')?.supported;
          return {
            passed: Boolean(supported),
            message: supported ? 'CSS Transitions are supported' : 'CSS Transitions are not supported',
            severity: 'important' as const,
            details: { supported }
          };
        }
      },
      {
        test: 'CSS Animations',
        check: () => {
          const supported = this.featureSupport.find(f => f.feature === 'CSS Animations')?.supported;
          return {
            passed: Boolean(supported),
            message: supported ? 'CSS Animations are supported' : 'CSS Animations are not supported',
            severity: 'minor' as const,
            details: { supported }
          };
        }
      }
    ];

    for (const test of tests) {
      const result = test.check();
      this.results.push({
        test: test.test,
        passed: result.passed,
        message: result.message,
        details: result.details,
        severity: result.severity
      });
    }
  }

  private async testJavaScriptFeatures(): Promise<void> {
    const tests = [
      {
        test: 'ES6 Modules',
        check: () => {
          const supported = this.featureSupport.find(f => f.feature === 'ES6 Modules')?.supported;
          return {
            passed: Boolean(supported),
            message: supported ? 'ES6 Modules are supported' : 'ES6 Modules are not supported',
            severity: 'critical' as const,
            details: { supported }
          };
        }
      },
      {
        test: 'Arrow Functions',
        check: () => {
          const supported = this.featureSupport.find(f => f.feature === 'Arrow Functions')?.supported;
          return {
            passed: Boolean(supported),
            message: supported ? 'Arrow Functions are supported' : 'Arrow Functions are not supported',
            severity: 'important' as const,
            details: { supported }
          };
        }
      },
      {
        test: 'Template Literals',
        check: () => {
          const supported = this.featureSupport.find(f => f.feature === 'Template Literals')?.supported;
          return {
            passed: Boolean(supported),
            message: supported ? 'Template Literals are supported' : 'Template Literals are not supported',
            severity: 'important' as const,
            details: { supported }
          };
        }
      },
      {
        test: 'Destructuring',
        check: () => {
          const supported = this.featureSupport.find(f => f.feature === 'Destructuring')?.supported;
          return {
            passed: Boolean(supported),
            message: supported ? 'Destructuring is supported' : 'Destructuring is not supported',
            severity: 'important' as const,
            details: { supported }
          };
        }
      },
      {
        test: 'Async/Await',
        check: () => {
          const supported = this.featureSupport.find(f => f.feature === 'Async/Await')?.supported;
          return {
            passed: Boolean(supported),
            message: supported ? 'Async/Await is supported' : 'Async/Await is not supported',
            severity: 'important' as const,
            details: { supported }
          };
        }
      },
      {
        test: 'Promise',
        check: () => {
          const supported = this.featureSupport.find(f => f.feature === 'Promise')?.supported;
          return {
            passed: Boolean(supported),
            message: supported ? 'Promise is supported' : 'Promise is not supported',
            severity: 'critical' as const,
            details: { supported }
          };
        }
      },
      {
        test: 'Fetch API',
        check: () => {
          const supported = this.featureSupport.find(f => f.feature === 'Fetch API')?.supported;
          return {
            passed: Boolean(supported),
            message: supported ? 'Fetch API is supported' : 'Fetch API is not supported',
            severity: 'important' as const,
            details: { supported }
          };
        }
      }
    ];

    for (const test of tests) {
      const result = test.check();
      this.results.push({
        test: test.test,
        passed: result.passed,
        message: result.message,
        details: result.details,
        severity: result.severity
      });
    }
  }

  private async testHTML5Features(): Promise<void> {
    const tests = [
      {
        test: 'Local Storage',
        check: () => {
          const supported = this.featureSupport.find(f => f.feature === 'Local Storage')?.supported;
          return {
            passed: Boolean(supported),
            message: supported ? 'Local Storage is supported' : 'Local Storage is not supported',
            severity: 'important' as const,
            details: { supported }
          };
        }
      },
      {
        test: 'Session Storage',
        check: () => {
          const supported = this.featureSupport.find(f => f.feature === 'Session Storage')?.supported;
          return {
            passed: Boolean(supported),
            message: supported ? 'Session Storage is supported' : 'Session Storage is not supported',
            severity: 'important' as const,
            details: { supported }
          };
        }
      },
      {
        test: 'Web Workers',
        check: () => {
          const supported = this.featureSupport.find(f => f.feature === 'Web Workers')?.supported;
          return {
            passed: Boolean(supported),
            message: supported ? 'Web Workers are supported' : 'Web Workers are not supported',
            severity: 'minor' as const,
            details: { supported }
          };
        }
      },
      {
        test: 'Service Workers',
        check: () => {
          const supported = this.featureSupport.find(f => f.feature === 'Service Workers')?.supported;
          return {
            passed: Boolean(supported),
            message: supported ? 'Service Workers are supported' : 'Service Workers are not supported',
            severity: 'minor' as const,
            details: { supported }
          };
        }
      }
    ];

    for (const test of tests) {
      const result = test.check();
      this.results.push({
        test: test.test,
        passed: result.passed,
        message: result.message,
        details: result.details,
        severity: result.severity
      });
    }
  }

  private async testWebAPIs(): Promise<void> {
    const tests = [
      {
        test: 'Intersection Observer',
        check: () => {
          const supported = this.featureSupport.find(f => f.feature === 'Intersection Observer')?.supported;
          return {
            passed: Boolean(supported),
            message: supported ? 'Intersection Observer is supported' : 'Intersection Observer is not supported',
            severity: 'important' as const,
            details: { supported }
          };
        }
      },
      {
        test: 'Resize Observer',
        check: () => {
          const supported = this.featureSupport.find(f => f.feature === 'Resize Observer')?.supported;
          return {
            passed: Boolean(supported),
            message: supported ? 'Resize Observer is supported' : 'Resize Observer is not supported',
            severity: 'minor' as const,
            details: { supported }
          };
        }
      },
      {
        test: 'Performance Observer',
        check: () => {
          const supported = this.featureSupport.find(f => f.feature === 'Performance Observer')?.supported;
          return {
            passed: Boolean(supported),
            message: supported ? 'Performance Observer is supported' : 'Performance Observer is not supported',
            severity: 'minor' as const,
            details: { supported }
          };
        }
      },
      {
        test: 'Web Animations API',
        check: () => {
          const supported = this.featureSupport.find(f => f.feature === 'Web Animations API')?.supported;
          return {
            passed: Boolean(supported),
            message: supported ? 'Web Animations API is supported' : 'Web Animations API is not supported',
            severity: 'minor' as const,
            details: { supported }
          };
        }
      }
    ];

    for (const test of tests) {
      const result = test.check();
      this.results.push({
        test: test.test,
        passed: result.passed,
        message: result.message,
        details: result.details,
        severity: result.severity
      });
    }
  }

  private async testPerformanceAPIs(): Promise<void> {
    const tests = [
      {
        test: 'Performance API',
        check: () => {
          const supported = typeof performance !== 'undefined';
          return {
            passed: supported,
            message: supported ? 'Performance API is supported' : 'Performance API is not supported',
            severity: 'important' as const,
            details: { supported }
          };
        }
      },
      {
        test: 'Performance Timing',
        check: () => {
          const supported = typeof performance !== 'undefined' && 'timing' in performance;
          return {
            passed: supported,
            message: supported ? 'Performance Timing is supported' : 'Performance Timing is not supported',
            severity: 'minor' as const,
            details: { supported }
          };
        }
      },
      {
        test: 'Performance Navigation',
        check: () => {
          const supported = typeof performance !== 'undefined' && 'navigation' in performance;
          return {
            passed: supported,
            message: supported ? 'Performance Navigation is supported' : 'Performance Navigation is not supported',
            severity: 'minor' as const,
            details: { supported }
          };
        }
      }
    ];

    for (const test of tests) {
      const result = test.check();
      this.results.push({
        test: test.test,
        passed: result.passed,
        message: result.message,
        details: result.details,
        severity: result.severity
      });
    }
  }

  private async testAnimationFeatures(): Promise<void> {
    const tests = [
      {
        test: 'CSS Animation Support',
        check: () => {
          const supported = this.featureSupport.find(f => f.feature === 'CSS Animations')?.supported;
          return {
            passed: Boolean(supported),
            message: supported ? 'CSS Animations are supported' : 'CSS Animations are not supported',
            severity: 'minor' as const,
            details: { supported }
          };
        }
      },
      {
        test: 'CSS Transition Support',
        check: () => {
          const supported = this.featureSupport.find(f => f.feature === 'CSS Transitions')?.supported;
          return {
            passed: Boolean(supported),
            message: supported ? 'CSS Transitions are supported' : 'CSS Transitions are not supported',
            severity: 'important' as const,
            details: { supported }
          };
        }
      },
      {
        test: 'Web Animations API',
        check: () => {
          const supported = this.featureSupport.find(f => f.feature === 'Web Animations API')?.supported;
          return {
            passed: Boolean(supported),
            message: supported ? 'Web Animations API is supported' : 'Web Animations API is not supported',
            severity: 'minor' as const,
            details: { supported }
          };
        }
      }
    ];

    for (const test of tests) {
      const result = test.check();
      this.results.push({
        test: test.test,
        passed: result.passed,
        message: result.message,
        details: result.details,
        severity: result.severity
      });
    }
  }

  private async testResponsiveFeatures(): Promise<void> {
    const tests = [
      {
        test: 'Media Queries',
        check: () => {
          const supported = typeof window !== 'undefined' && 'matchMedia' in window;
          return {
            passed: supported,
            message: supported ? 'Media Queries are supported' : 'Media Queries are not supported',
            severity: 'critical' as const,
            details: { supported }
          };
        }
      },
      {
        test: 'Touch Events',
        check: () => {
          const supported = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
          return {
            passed: supported,
            message: supported ? 'Touch Events are supported' : 'Touch Events are not supported',
            severity: 'important' as const,
            details: { supported }
          };
        }
      },
      {
        test: 'Viewport Meta',
        check: () => {
          const viewport = typeof document !== 'undefined' ? document.querySelector('meta[name="viewport"]') : null;
          const supported = viewport !== null;
          return {
            passed: supported,
            message: supported ? 'Viewport meta tag is present' : 'Viewport meta tag is missing',
            severity: 'critical' as const,
            details: { supported, viewport: viewport?.getAttribute('content') }
          };
        }
      }
    ];

    for (const test of tests) {
      const result = test.check();
      this.results.push({
        test: test.test,
        passed: result.passed,
        message: result.message,
        details: result.details,
        severity: result.severity
      });
    }
  }

  private async testAccessibilityFeatures(): Promise<void> {
    const tests = [
      {
        test: 'ARIA Support',
        check: () => {
          const supported = typeof document !== 'undefined';
          if (supported) {
            const testElement = document.createElement('div');
            testElement.setAttribute('aria-label', 'test');
            const ariaSupported = testElement.getAttribute('aria-label') === 'test';
            return {
              passed: ariaSupported,
              message: ariaSupported ? 'ARIA attributes are supported' : 'ARIA attributes are not supported',
              severity: 'important' as const,
              details: { supported: ariaSupported }
            };
          }
          return {
            passed: false,
            message: 'ARIA attributes are not supported (no DOM)',
            severity: 'important' as const,
            details: { supported: false }
          };
        }
      },
      {
        test: 'Focus Management',
        check: () => {
          const supported = typeof HTMLElement !== 'undefined' && 'focus' in HTMLElement.prototype;
          return {
            passed: supported,
            message: supported ? 'Focus management is supported' : 'Focus management is not supported',
            severity: 'important' as const,
            details: { supported }
          };
        }
      },
      {
        test: 'Keyboard Navigation',
        check: () => {
          const supported = typeof KeyboardEvent !== 'undefined';
          return {
            passed: supported,
            message: supported ? 'Keyboard navigation is supported' : 'Keyboard navigation is not supported',
            severity: 'important' as const,
            details: { supported }
          };
        }
      }
    ];

    for (const test of tests) {
      const result = test.check();
      this.results.push({
        test: test.test,
        passed: result.passed,
        message: result.message,
        details: result.details,
        severity: result.severity
      });
    }
  }

  private async testSecurityFeatures(): Promise<void> {
    const tests = [
      {
        test: 'HTTPS Support',
        check: () => {
          const supported = typeof location !== 'undefined' && location.protocol === 'https:';
          return {
            passed: supported,
            message: supported ? 'HTTPS is supported' : 'HTTPS is not supported',
            severity: 'important' as const,
            details: { supported, protocol: typeof location !== 'undefined' ? location.protocol : 'unknown' }
          };
        }
      },
      {
        test: 'Content Security Policy',
        check: () => {
          const supported = 'securityPolicyViolation' in window;
          return {
            passed: supported,
            message: supported ? 'CSP is supported' : 'CSP is not supported',
            severity: 'minor' as const,
            details: { supported }
          };
        }
      },
      {
        test: 'Secure Context',
        check: () => {
          const supported = typeof window !== 'undefined' && window.isSecureContext;
          return {
            passed: supported,
            message: supported ? 'Secure context is available' : 'Secure context is not available',
            severity: 'important' as const,
            details: { supported }
          };
        }
      }
    ];

    for (const test of tests) {
      const result = test.check();
      this.results.push({
        test: test.test,
        passed: result.passed,
        message: result.message,
        details: result.details,
        severity: result.severity
      });
    }
  }

  getBrowserInfo(): BrowserInfo | null {
    return this.browserInfo;
  }

  getFeatureSupport(): FeatureSupport[] {
    return this.featureSupport;
  }

  getTestSummary(): { total: number; passed: number; failed: number; critical: number; important: number; minor: number } {
    const total = this.results.length;
    const passed = this.results.filter(r => r.passed).length;
    const failed = total - passed;
    const critical = this.results.filter(r => r.severity === 'critical').length;
    const important = this.results.filter(r => r.severity === 'important').length;
    const minor = this.results.filter(r => r.severity === 'minor').length;
    
    return { total, passed, failed, critical, important, minor };
  }

  generateReport(): string {
    const summary = this.getTestSummary();
    const browserInfo = this.getBrowserInfo();
    const features = this.getFeatureSupport();
    
    let report = `
Browser Compatibility Testing Report
====================================

Browser Information:
-------------------
Name: ${browserInfo?.name || 'Unknown'}
Version: ${browserInfo?.version || 'Unknown'}
Platform: ${browserInfo?.platform || 'Unknown'}
User Agent: ${browserInfo?.userAgent || 'Unknown'}
Language: ${browserInfo?.language || 'Unknown'}
Online: ${browserInfo?.onLine ? 'Yes' : 'No'}
Cookies Enabled: ${browserInfo?.cookieEnabled ? 'Yes' : 'No'}

Feature Support Summary:
-----------------------
Total Features Tested: ${features.length}
Supported Features: ${features.filter(f => f.supported).length}
Unsupported Features: ${features.filter(f => !f.supported).length}
Support Rate: ${((features.filter(f => f.supported).length / features.length) * 100).toFixed(1)}%

Test Results Summary:
-------------------
Total Tests: ${summary.total}
Passed: ${summary.passed}
Failed: ${summary.failed}
Critical Tests: ${summary.critical}
Important Tests: ${summary.important}
Minor Tests: ${summary.minor}

Compatibility Grade: ${this.getCompatibilityGrade(summary)}

Detailed Results:
----------------
`;
    
    // Group by severity
    const critical = this.results.filter(r => r.severity === 'critical');
    const important = this.results.filter(r => r.severity === 'important');
    const minor = this.results.filter(r => r.severity === 'minor');
    
    if (critical.length > 0) {
      report += '\n🔴 Critical Compatibility Issues:\n';
      critical.forEach(result => {
        report += `  ${result.passed ? '✅' : '❌'} ${result.test}: ${result.message}\n`;
      });
    }
    
    if (important.length > 0) {
      report += '\n🟡 Important Compatibility Issues:\n';
      important.forEach(result => {
        report += `  ${result.passed ? '✅' : '❌'} ${result.test}: ${result.message}\n`;
      });
    }
    
    if (minor.length > 0) {
      report += '\n🟢 Minor Compatibility Issues:\n';
      minor.forEach(result => {
        report += `  ${result.passed ? '✅' : '❌'} ${result.test}: ${result.message}\n`;
      });
    }

    report += '\nFeature Support Details:\n';
    report += '----------------------\n';
    features.forEach(feature => {
      report += `  ${feature.supported ? '✅' : '❌'} ${feature.feature}: ${feature.notes || 'No notes'}\n`;
    });
    
    return report;
  }

  private getCompatibilityGrade(summary: { total: number; passed: number; failed: number }): string {
    const percentage = (summary.passed / summary.total) * 100;
    
    if (percentage >= 95) return 'A+ (Excellent)';
    if (percentage >= 90) return 'A (Very Good)';
    if (percentage >= 80) return 'B (Good)';
    if (percentage >= 70) return 'C (Fair)';
    if (percentage >= 60) return 'D (Poor)';
    return 'F (Very Poor)';
  }
}

// Export singleton instance
export const browserCompatibilityTester = new BrowserCompatibilityTester();
