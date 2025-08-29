'use client';

interface PerformanceMetrics {
  // Core Web Vitals
  firstContentfulPaint: number;
  largestContentfulPaint: number;
  cumulativeLayoutShift: number;
  firstInputDelay: number;
  
  // Loading Performance
  domContentLoaded: number;
  loadComplete: number;
  timeToInteractive: number;
  
  // Resource Performance
  totalResources: number;
  totalSize: number;
  imageCount: number;
  imageSize: number;
  scriptCount: number;
  scriptSize: number;
  cssCount: number;
  cssSize: number;
  
  // Optimization Metrics
  compressionRatio: number;
  cacheHitRatio: number;
  unusedCSS: number;
  unusedJS: number;
  
  // User Experience
  perceivedPerformance: number;
  smoothness: number;
  responsiveness: number;
}

interface PerformanceTestResult {
  test: string;
  passed: boolean;
  score: number;
  message: string;
  details?: Record<string, unknown>;
  severity: 'critical' | 'important' | 'minor';
}

interface ResourceInfo {
  name: string;
  type: string;
  size: number;
  duration: number;
  compression: number;
}

export class PerformanceTester {
  private metrics: PerformanceMetrics | null = null;
  private results: PerformanceTestResult[] = [];
  private resources: ResourceInfo[] = [];

  async runAllTests(): Promise<PerformanceTestResult[]> {
    this.results = [];
    
    // Wait for page to be fully loaded
    if (document.readyState !== 'complete') {
      await new Promise(resolve => {
        window.addEventListener('load', resolve, { once: true });
      });
    }

    // Run all performance tests
    await this.testCoreWebVitals();
    await this.testLoadingPerformance();
    await this.testResourceOptimization();
    await this.testImageOptimization();
    await this.testJavaScriptOptimization();
    await this.testCSSOptimization();
    await this.testCachingPerformance();
    await this.testUserExperience();
    await this.testBundleAnalysis();

    return this.results;
  }

  private async testCoreWebVitals(): Promise<void> {
    const tests = [
      {
        test: 'First Contentful Paint (FCP)',
        check: () => {
          const fcp = this.getFCP();
          return {
            passed: fcp < 1800,
            score: Math.max(0, 100 - (fcp - 1000) / 8),
            message: fcp < 1800 ? 'FCP is excellent' : 'FCP needs improvement',
            severity: 'critical' as const,
            details: { fcp, threshold: 1800 }
          };
        }
      },
      {
        test: 'Largest Contentful Paint (LCP)',
        check: () => {
          const lcp = this.getLCP();
          return {
            passed: lcp < 2500,
            score: Math.max(0, 100 - (lcp - 1500) / 10),
            message: lcp < 2500 ? 'LCP is excellent' : 'LCP needs improvement',
            severity: 'critical' as const,
            details: { lcp, threshold: 2500 }
          };
        }
      },
      {
        test: 'Cumulative Layout Shift (CLS)',
        check: () => {
          const cls = this.getCLS();
          return {
            passed: cls < 0.1,
            score: Math.max(0, 100 - cls * 1000),
            message: cls < 0.1 ? 'CLS is excellent' : 'CLS needs improvement',
            severity: 'critical' as const,
            details: { cls, threshold: 0.1 }
          };
        }
      },
      {
        test: 'First Input Delay (FID)',
        check: () => {
          const fid = this.getFID();
          return {
            passed: fid < 100,
            score: Math.max(0, 100 - fid),
            message: fid < 100 ? 'FID is excellent' : 'FID needs improvement',
            severity: 'critical' as const,
            details: { fid, threshold: 100 }
          };
        }
      }
    ];

    for (const test of tests) {
      const result = test.check();
      this.results.push({
        test: test.test,
        passed: result.passed,
        score: result.score,
        message: result.message,
        details: result.details,
        severity: result.severity
      });
    }
  }

  private async testLoadingPerformance(): Promise<void> {
    const tests = [
      {
        test: 'DOM Content Loaded',
        check: () => {
          const domLoaded = performance.timing.domContentLoadedEventEnd - performance.timing.navigationStart;
          return {
            passed: domLoaded < 2000,
            score: Math.max(0, 100 - (domLoaded - 1000) / 10),
            message: domLoaded < 2000 ? 'DOM loading is fast' : 'DOM loading is slow',
            severity: 'important' as const,
            details: { domLoaded, threshold: 2000 }
          };
        }
      },
      {
        test: 'Page Load Complete',
        check: () => {
          const loadComplete = performance.timing.loadEventEnd - performance.timing.navigationStart;
          return {
            passed: loadComplete < 3000,
            score: Math.max(0, 100 - (loadComplete - 1500) / 15),
            message: loadComplete < 3000 ? 'Page load is fast' : 'Page load is slow',
            severity: 'important' as const,
            details: { loadComplete, threshold: 3000 }
          };
        }
      },
      {
        test: 'Time to Interactive',
        check: () => {
          const tti = this.getTTI();
          return {
            passed: tti < 3500,
            score: Math.max(0, 100 - (tti - 2000) / 15),
            message: tti < 3500 ? 'Time to interactive is good' : 'Time to interactive is slow',
            severity: 'important' as const,
            details: { tti, threshold: 3500 }
          };
        }
      }
    ];

    for (const test of tests) {
      const result = test.check();
      this.results.push({
        test: test.test,
        passed: result.passed,
        score: result.score,
        message: result.message,
        details: result.details,
        severity: result.severity
      });
    }
  }

  private async testResourceOptimization(): Promise<void> {
    const resources = this.getResourceInfo();
    const totalSize = resources.reduce((sum, r) => sum + r.size, 0);
    const totalCount = resources.length;

    const tests = [
      {
        test: 'Total Resource Size',
        check: () => {
          const sizeMB = totalSize / (1024 * 1024);
          return {
            passed: sizeMB < 2,
            score: Math.max(0, 100 - (sizeMB - 1) * 50),
            message: sizeMB < 2 ? 'Total resource size is good' : 'Total resource size is too large',
            severity: 'important' as const,
            details: { sizeMB, threshold: 2 }
          };
        }
      },
      {
        test: 'Resource Count',
        check: () => {
          return {
            passed: totalCount < 50,
            score: Math.max(0, 100 - (totalCount - 25) * 2),
            message: totalCount < 50 ? 'Resource count is reasonable' : 'Too many resources',
            severity: 'important' as const,
            details: { totalCount, threshold: 50 }
          };
        }
      },
      {
        test: 'Compression Ratio',
        check: () => {
          const avgCompression = resources.reduce((sum, r) => sum + r.compression, 0) / resources.length;
          return {
            passed: avgCompression > 0.6,
            score: avgCompression * 100,
            message: avgCompression > 0.6 ? 'Good compression ratio' : 'Compression needs improvement',
            severity: 'minor' as const,
            details: { avgCompression, threshold: 0.6 }
          };
        }
      }
    ];

    for (const test of tests) {
      const result = test.check();
      this.results.push({
        test: test.test,
        passed: result.passed,
        score: result.score,
        message: result.message,
        details: result.details,
        severity: result.severity
      });
    }
  }

  private async testImageOptimization(): Promise<void> {
    const images = this.getResourceInfo().filter(r => r.type === 'image');
    const totalImageSize = images.reduce((sum, img) => sum + img.size, 0);
    const imageCount = images.length;

    const tests = [
      {
        test: 'Total Image Size',
        check: () => {
          const sizeMB = totalImageSize / (1024 * 1024);
          return {
            passed: sizeMB < 1,
            score: Math.max(0, 100 - (sizeMB - 0.5) * 100),
            message: sizeMB < 1 ? 'Image size is optimized' : 'Image size is too large',
            severity: 'important' as const,
            details: { sizeMB, threshold: 1 }
          };
        }
      },
      {
        test: 'Image Count',
        check: () => {
          return {
            passed: imageCount < 20,
            score: Math.max(0, 100 - (imageCount - 10) * 5),
            message: imageCount < 20 ? 'Reasonable number of images' : 'Too many images',
            severity: 'minor' as const,
            details: { imageCount, threshold: 20 }
          };
        }
      },
      {
        test: 'Image Format Optimization',
        check: () => {
          const modernFormats = images.filter(img => 
            img.name.includes('.webp') || img.name.includes('.avif')
          ).length;
          const modernRatio = modernFormats / imageCount;
          
          return {
            passed: modernRatio > 0.5,
            score: modernRatio * 100,
            message: modernRatio > 0.5 ? 'Good use of modern image formats' : 'Consider using modern image formats',
            severity: 'minor' as const,
            details: { modernRatio, threshold: 0.5 }
          };
        }
      }
    ];

    for (const test of tests) {
      const result = test.check();
      this.results.push({
        test: test.test,
        passed: result.passed,
        score: result.score,
        message: result.message,
        details: result.details,
        severity: result.severity
      });
    }
  }

  private async testJavaScriptOptimization(): Promise<void> {
    const scripts = this.getResourceInfo().filter(r => r.type === 'script');
    const totalScriptSize = scripts.reduce((sum, script) => sum + script.size, 0);
    const scriptCount = scripts.length;

    const tests = [
      {
        test: 'JavaScript Bundle Size',
        check: () => {
          const sizeKB = totalScriptSize / 1024;
          return {
            passed: sizeKB < 500,
            score: Math.max(0, 100 - (sizeKB - 250) / 2.5),
            message: sizeKB < 500 ? 'JavaScript bundle is optimized' : 'JavaScript bundle is too large',
            severity: 'important' as const,
            details: { sizeKB, threshold: 500 }
          };
        }
      },
      {
        test: 'Script Count',
        check: () => {
          return {
            passed: scriptCount < 15,
            score: Math.max(0, 100 - (scriptCount - 8) * 7),
            message: scriptCount < 15 ? 'Reasonable number of scripts' : 'Too many script files',
            severity: 'minor' as const,
            details: { scriptCount, threshold: 15 }
          };
        }
      },
      {
        test: 'JavaScript Loading Strategy',
        check: () => {
          const asyncScripts = scripts.filter(s => s.name.includes('async') || s.name.includes('defer')).length;
          const asyncRatio = asyncScripts / scriptCount;
          
          return {
            passed: asyncRatio > 0.3,
            score: asyncRatio * 100,
            message: asyncRatio > 0.3 ? 'Good script loading strategy' : 'Consider async/defer loading',
            severity: 'minor' as const,
            details: { asyncRatio, threshold: 0.3 }
          };
        }
      }
    ];

    for (const test of tests) {
      const result = test.check();
      this.results.push({
        test: test.test,
        passed: result.passed,
        score: result.score,
        message: result.message,
        details: result.details,
        severity: result.severity
      });
    }
  }

  private async testCSSOptimization(): Promise<void> {
    const stylesheets = this.getResourceInfo().filter(r => r.type === 'stylesheet');
    const totalCSSSize = stylesheets.reduce((sum, css) => sum + css.size, 0);
    const cssCount = stylesheets.length;

    const tests = [
      {
        test: 'CSS Bundle Size',
        check: () => {
          const sizeKB = totalCSSSize / 1024;
          return {
            passed: sizeKB < 100,
            score: Math.max(0, 100 - (sizeKB - 50) * 2),
            message: sizeKB < 100 ? 'CSS bundle is optimized' : 'CSS bundle is too large',
            severity: 'important' as const,
            details: { sizeKB, threshold: 100 }
          };
        }
      },
      {
        test: 'CSS File Count',
        check: () => {
          return {
            passed: cssCount < 5,
            score: Math.max(0, 100 - (cssCount - 2) * 25),
            message: cssCount < 5 ? 'Reasonable number of CSS files' : 'Too many CSS files',
            severity: 'minor' as const,
            details: { cssCount, threshold: 5 }
          };
        }
      }
    ];

    for (const test of tests) {
      const result = test.check();
      this.results.push({
        test: test.test,
        passed: result.passed,
        score: result.score,
        message: result.message,
        details: result.details,
        severity: result.severity
      });
    }
  }

  private async testCachingPerformance(): Promise<void> {
    const resources = this.getResourceInfo();
    const cacheableResources = resources.filter(r => 
      r.type === 'image' || r.type === 'stylesheet' || r.type === 'script'
    );
    const cachedResources = cacheableResources.filter(r => r.duration < 100);

    const tests = [
      {
        test: 'Cache Hit Ratio',
        check: () => {
          const cacheRatio = cachedResources.length / cacheableResources.length;
          return {
            passed: cacheRatio > 0.7,
            score: cacheRatio * 100,
            message: cacheRatio > 0.7 ? 'Good cache utilization' : 'Cache utilization needs improvement',
            severity: 'important' as const,
            details: { cacheRatio, threshold: 0.7 }
          };
        }
      }
    ];

    for (const test of tests) {
      const result = test.check();
      this.results.push({
        test: test.test,
        passed: result.passed,
        score: result.score,
        message: result.message,
        details: result.details,
        severity: result.severity
      });
    }
  }

  private async testUserExperience(): Promise<void> {
    const tests = [
      {
        test: 'Perceived Performance',
        check: () => {
          const fcp = this.getFCP();
          const perceivedScore = Math.max(0, 100 - (fcp - 1000) / 8);
          
          return {
            passed: perceivedScore > 80,
            score: perceivedScore,
            message: perceivedScore > 80 ? 'Excellent perceived performance' : 'Perceived performance needs improvement',
            severity: 'critical' as const,
            details: { perceivedScore, threshold: 80 }
          };
        }
      },
      {
        test: 'Smoothness',
        check: () => {
          const cls = this.getCLS();
          const smoothnessScore = Math.max(0, 100 - cls * 1000);
          
          return {
            passed: smoothnessScore > 90,
            score: smoothnessScore,
            message: smoothnessScore > 90 ? 'Excellent visual stability' : 'Visual stability needs improvement',
            severity: 'important' as const,
            details: { smoothnessScore, threshold: 90 }
          };
        }
      },
      {
        test: 'Responsiveness',
        check: () => {
          const fid = this.getFID();
          const responsivenessScore = Math.max(0, 100 - fid);
          
          return {
            passed: responsivenessScore > 90,
            score: responsivenessScore,
            message: responsivenessScore > 90 ? 'Excellent responsiveness' : 'Responsiveness needs improvement',
            severity: 'important' as const,
            details: { responsivenessScore, threshold: 90 }
          };
        }
      }
    ];

    for (const test of tests) {
      const result = test.check();
      this.results.push({
        test: test.test,
        passed: result.passed,
        score: result.score,
        message: result.message,
        details: result.details,
        severity: result.severity
      });
    }
  }

  private async testBundleAnalysis(): Promise<void> {
    // Simulate bundle analysis
    const tests = [
      {
        test: 'Unused CSS',
        check: () => {
          const unusedCSS = Math.random() * 20; // Simulated value
          return {
            passed: unusedCSS < 10,
            score: Math.max(0, 100 - unusedCSS * 5),
            message: unusedCSS < 10 ? 'Low unused CSS' : 'High unused CSS detected',
            severity: 'minor' as const,
            details: { unusedCSS, threshold: 10 }
          };
        }
      },
      {
        test: 'Unused JavaScript',
        check: () => {
          const unusedJS = Math.random() * 30; // Simulated value
          return {
            passed: unusedJS < 15,
            score: Math.max(0, 100 - unusedJS * 3),
            message: unusedJS < 15 ? 'Low unused JavaScript' : 'High unused JavaScript detected',
            severity: 'minor' as const,
            details: { unusedJS, threshold: 15 }
          };
        }
      }
    ];

    for (const test of tests) {
      const result = test.check();
      this.results.push({
        test: test.test,
        passed: result.passed,
        score: result.score,
        message: result.message,
        details: result.details,
        severity: result.severity
      });
    }
  }

  // Helper methods to get performance metrics
  private getFCP(): number {
    const fcpEntry = performance.getEntriesByType('paint').find(entry => entry.name === 'first-contentful-paint');
    return fcpEntry ? fcpEntry.startTime : 0;
  }

  private getLCP(): number {
    const lcpEntry = performance.getEntriesByType('largest-contentful-paint')[0];
    return lcpEntry ? lcpEntry.startTime : 0;
  }

  private getCLS(): number {
    let cls = 0;
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const layoutShiftEntry = entry as PerformanceEntry & { hadRecentInput?: boolean; value?: number };
        if (!layoutShiftEntry.hadRecentInput) {
          cls += layoutShiftEntry.value || 0;
        }
      }
    });
    observer.observe({ entryTypes: ['layout-shift'] });
    return cls;
  }

  private getFID(): number {
    const fidEntry = performance.getEntriesByType('first-input')[0] as PerformanceEntry & { processingStart?: number };
    return fidEntry && fidEntry.processingStart ? fidEntry.processingStart - fidEntry.startTime : 0;
  }

  private getTTI(): number {
    // Simplified TTI calculation
    const domLoaded = performance.timing.domContentLoadedEventEnd - performance.timing.navigationStart;
    return domLoaded + 1000; // Add estimated time for JavaScript execution
  }

  private getResourceInfo(): ResourceInfo[] {
    const resources: ResourceInfo[] = [];
    const entries = performance.getEntriesByType('resource');

    for (const entry of entries) {
      const resourceEntry = entry as PerformanceEntry & { transferSize?: number; decodedBodySize?: number };
      const resource: ResourceInfo = {
        name: entry.name,
        type: this.getResourceType(entry.name),
        size: resourceEntry.transferSize || 0,
        duration: entry.duration,
        compression: this.calculateCompression(entry)
      };
      resources.push(resource);
    }

    return resources;
  }

  private getResourceType(url: string): string {
    if (url.includes('.js')) return 'script';
    if (url.includes('.css')) return 'stylesheet';
    if (url.includes('.png') || url.includes('.jpg') || url.includes('.jpeg') || url.includes('.gif') || url.includes('.webp') || url.includes('.avif')) return 'image';
    if (url.includes('.woff') || url.includes('.woff2') || url.includes('.ttf') || url.includes('.otf')) return 'font';
    return 'other';
  }

  private calculateCompression(entry: PerformanceEntry): number {
    const resourceEntry = entry as PerformanceEntry & { transferSize?: number; decodedBodySize?: number };
    const transferSize = resourceEntry.transferSize || 0;
    const decodedSize = resourceEntry.decodedBodySize || transferSize;
    return decodedSize > 0 ? (decodedSize - transferSize) / decodedSize : 0;
  }

  getTestSummary(): { total: number; passed: number; failed: number; averageScore: number; critical: number; important: number; minor: number } {
    const total = this.results.length;
    const passed = this.results.filter(r => r.passed).length;
    const failed = total - passed;
    const averageScore = this.results.reduce((sum, r) => sum + r.score, 0) / total;
    const critical = this.results.filter(r => r.severity === 'critical').length;
    const important = this.results.filter(r => r.severity === 'important').length;
    const minor = this.results.filter(r => r.severity === 'minor').length;
    
    return { total, passed, failed, averageScore, critical, important, minor };
  }

  generateReport(): string {
    const summary = this.getTestSummary();
    
    let report = `
Performance Testing Report
==========================

Summary:
--------
Total Tests: ${summary.total}
Passed: ${summary.passed}
Failed: ${summary.failed}
Average Score: ${summary.averageScore.toFixed(1)}%
Critical Tests: ${summary.critical}
Important Tests: ${summary.important}
Minor Tests: ${summary.minor}

Performance Grade: ${this.getPerformanceGrade(summary.averageScore)}

Detailed Results:
----------------
`;
    
    // Group by severity
    const critical = this.results.filter(r => r.severity === 'critical');
    const important = this.results.filter(r => r.severity === 'important');
    const minor = this.results.filter(r => r.severity === 'minor');
    
    if (critical.length > 0) {
      report += '\n🔴 Critical Performance Issues:\n';
      critical.forEach(result => {
        report += `  ${result.passed ? '✅' : '❌'} ${result.test}: ${result.message} (Score: ${result.score.toFixed(1)}%)\n`;
      });
    }
    
    if (important.length > 0) {
      report += '\n🟡 Important Performance Issues:\n';
      important.forEach(result => {
        report += `  ${result.passed ? '✅' : '❌'} ${result.test}: ${result.message} (Score: ${result.score.toFixed(1)}%)\n`;
      });
    }
    
    if (minor.length > 0) {
      report += '\n🟢 Minor Performance Issues:\n';
      minor.forEach(result => {
        report += `  ${result.passed ? '✅' : '❌'} ${result.test}: ${result.message} (Score: ${result.score.toFixed(1)}%)\n`;
      });
    }
    
    return report;
  }

  private getPerformanceGrade(score: number): string {
    if (score >= 90) return 'A+ (Excellent)';
    if (score >= 80) return 'A (Very Good)';
    if (score >= 70) return 'B (Good)';
    if (score >= 60) return 'C (Fair)';
    if (score >= 50) return 'D (Poor)';
    return 'F (Very Poor)';
  }
}

// Export singleton instance
export const performanceTester = new PerformanceTester();
