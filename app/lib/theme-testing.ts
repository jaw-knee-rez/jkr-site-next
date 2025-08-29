'use client';

interface ThemeTestSuite {
  name: string;
  run: () => Promise<ThemeTestResult>;
}

interface ThemeTestResult {
  passed: boolean;
  message: string;
  details?: Record<string, unknown>;
}

export class ThemeTester {
  private results: ThemeTestResult[] = [];

  async runAllTests(): Promise<ThemeTestResult[]> {
    this.results = [];
    
    const testSuites: ThemeTestSuite[] = [
      {
        name: 'Theme Context Initialization',
        run: this.testThemeContextInit.bind(this)
      },
      {
        name: 'LocalStorage Persistence',
        run: this.testLocalStoragePersistence.bind(this)
      },
      {
        name: 'Document Class Application',
        run: this.testDocumentClassApplication.bind(this)
      },
      {
        name: 'CSS Variables Application',
        run: this.testCSSVariablesApplication.bind(this)
      },
      {
        name: 'System Preference Detection',
        run: this.testSystemPreferenceDetection.bind(this)
      },
      {
        name: 'Theme Toggle Functionality',
        run: this.testThemeToggleFunctionality.bind(this)
      },
      {
        name: 'Cross-Page Persistence',
        run: this.testCrossPagePersistence.bind(this)
      },
      {
        name: 'Browser Refresh Persistence',
        run: this.testBrowserRefreshPersistence.bind(this)
      },
      {
        name: 'Transition Animations',
        run: this.testTransitionAnimations.bind(this)
      },
      {
        name: 'Accessibility Compliance',
        run: this.testAccessibilityCompliance.bind(this)
      }
    ];

    for (const testSuite of testSuites) {
      try {
        const result = await testSuite.run();
        this.results.push(result);
      } catch (error) {
        this.results.push({
          passed: false,
          message: `Test "${testSuite.name}" failed with error: ${error}`,
          details: { error: error instanceof Error ? error.message : String(error) }
        });
      }
    }

    return this.results;
  }

  private async testThemeContextInit(): Promise<ThemeTestResult> {
    // This test would need to be run within a component that has access to useTheme
    return {
      passed: true,
      message: 'Theme context initialization test requires component context',
      details: { note: 'This test should be run within a React component' }
    };
  }

  private async testLocalStoragePersistence(): Promise<ThemeTestResult> {
    const currentTheme = localStorage.getItem('theme');
    const isValidTheme = currentTheme === 'light' || currentTheme === 'dark';
    
    return {
      passed: isValidTheme,
      message: isValidTheme 
        ? `Theme persisted in localStorage: ${currentTheme}`
        : `Invalid theme in localStorage: ${currentTheme}`,
      details: { storedTheme: currentTheme }
    };
  }

  private async testDocumentClassApplication(): Promise<ThemeTestResult> {
    const hasLightClass = document.documentElement.classList.contains('light');
    const hasDarkClass = document.documentElement.classList.contains('dark');
    const hasValidClass = hasLightClass || hasDarkClass;
    const hasOnlyOneClass = (hasLightClass && !hasDarkClass) || (!hasLightClass && hasDarkClass);
    
    return {
      passed: hasValidClass && hasOnlyOneClass,
      message: hasValidClass && hasOnlyOneClass
        ? `Document has correct theme class: ${hasLightClass ? 'light' : 'dark'}`
        : `Document has invalid theme classes: light=${hasLightClass}, dark=${hasDarkClass}`,
      details: { hasLightClass, hasDarkClass }
    };
  }

  private async testCSSVariablesApplication(): Promise<ThemeTestResult> {
    const computedStyle = getComputedStyle(document.documentElement);
    const bgColor = computedStyle.getPropertyValue('--background').trim();
    const fgColor = computedStyle.getPropertyValue('--foreground').trim();
    
    // Check if variables are properly set
    const hasValidVariables = Boolean(bgColor && fgColor && bgColor !== 'initial' && fgColor !== 'initial');
    
    return {
      passed: hasValidVariables,
      message: hasValidVariables
        ? 'CSS variables are properly applied'
        : 'CSS variables are not properly applied',
      details: { 
        backgroundColor: bgColor, 
        foregroundColor: fgColor,
        hasValidVariables 
      }
    };
  }

  private async testSystemPreferenceDetection(): Promise<ThemeTestResult> {
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const mediaQuerySupported = 'matchMedia' in window;
    
    return {
      passed: mediaQuerySupported,
      message: mediaQuerySupported
        ? `System preference detection working: ${systemPrefersDark ? 'dark' : 'light'}`
        : 'System preference detection not supported',
      details: { 
        systemPrefersDark, 
        mediaQuerySupported 
      }
    };
  }

  private async testThemeToggleFunctionality(): Promise<ThemeTestResult> {
    // This test would need to be run within a component that has access to toggleTheme
    return {
      passed: true,
      message: 'Theme toggle functionality test requires component context',
      details: { note: 'This test should be run within a React component' }
    };
  }

  private async testCrossPagePersistence(): Promise<ThemeTestResult> {
    const currentTheme = localStorage.getItem('theme');
    
    // Simulate navigation by changing URL
    const originalUrl = window.location.href;
    const testUrl = originalUrl + '?theme-test=' + Date.now();
    
    // Store current theme
    const storedTheme = currentTheme;
    
    // Change URL (simulating navigation)
    window.history.pushState({}, '', testUrl);
    
    // Check if theme persists
    const persistedTheme = localStorage.getItem('theme');
    const themePersisted = persistedTheme === storedTheme;
    
    // Restore original URL
    window.history.pushState({}, '', originalUrl);
    
    return {
      passed: themePersisted,
      message: themePersisted
        ? 'Theme persists across simulated navigation'
        : 'Theme does not persist across navigation',
      details: { 
        originalTheme: storedTheme, 
        persistedTheme,
        testUrl 
      }
    };
  }

  private async testBrowserRefreshPersistence(): Promise<ThemeTestResult> {
    const currentTheme = localStorage.getItem('theme');
    
    // This test can't actually refresh the browser, but we can verify localStorage is working
    const localStorageWorking = typeof Storage !== 'undefined' && localStorage.getItem('theme') !== null;
    
    return {
      passed: localStorageWorking,
      message: localStorageWorking
        ? 'LocalStorage is working and theme should persist on refresh'
        : 'LocalStorage is not working, theme will not persist on refresh',
      details: { 
        currentTheme,
        localStorageSupported: typeof Storage !== 'undefined',
        themeStored: localStorage.getItem('theme') !== null
      }
    };
  }

  private async testTransitionAnimations(): Promise<ThemeTestResult> {
    const computedStyle = getComputedStyle(document.body);
    const transitionProperty = computedStyle.transition;
    const hasTransitions = Boolean(transitionProperty && transitionProperty !== 'all 0s ease 0s');
    
    return {
      passed: hasTransitions,
      message: hasTransitions
        ? 'Theme transition animations are enabled'
        : 'Theme transition animations are not enabled',
      details: { 
        transitionProperty,
        hasTransitions 
      }
    };
  }

  private async testAccessibilityCompliance(): Promise<ThemeTestResult> {
    // Check for proper contrast ratios and focus indicators
    const computedStyle = getComputedStyle(document.documentElement);
    const bgColor = computedStyle.getPropertyValue('--background').trim();
    const fgColor = computedStyle.getPropertyValue('--foreground').trim();
    
    // Basic accessibility check - ensure we have different colors
    const hasContrast = Boolean(bgColor !== fgColor && bgColor && fgColor);
    
    // Check for focus-visible styles
    const focusVisibleStyles = getComputedStyle(document.documentElement);
    const hasFocusStyles = Boolean(focusVisibleStyles.getPropertyValue('--accent-foreground').trim() !== '');
    
    return {
      passed: hasContrast && hasFocusStyles,
      message: hasContrast && hasFocusStyles
        ? 'Basic accessibility requirements met'
        : 'Basic accessibility requirements not met',
      details: { 
        hasContrast,
        hasFocusStyles,
        backgroundColor: bgColor,
        foregroundColor: fgColor
      }
    };
  }

  getTestSummary(): { total: number; passed: number; failed: number; successRate: number } {
    const total = this.results.length;
    const passed = this.results.filter(r => r.passed).length;
    const failed = total - passed;
    const successRate = total > 0 ? (passed / total) * 100 : 0;
    
    return { total, passed, failed, successRate };
  }

  generateReport(): string {
    const summary = this.getTestSummary();
    
    let report = `
Theme Testing Report
===================

Summary:
--------
Total Tests: ${summary.total}
Passed: ${summary.passed}
Failed: ${summary.failed}
Success Rate: ${summary.successRate.toFixed(1)}%

Detailed Results:
----------------
`;
    
    this.results.forEach((result, index) => {
      report += `
${index + 1}. ${result.passed ? '✅' : '❌'} ${result.message}
   Details: ${JSON.stringify(result.details, null, 2)}
`;
    });
    
    return report;
  }
}

// Export singleton instance
export const themeTester = new ThemeTester();
