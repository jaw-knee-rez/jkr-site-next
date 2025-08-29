'use client';

interface PerformanceMetrics {
  imageLoadTime: number;
  totalLoadTime: number;
  firstContentfulPaint: number;
  largestContentfulPaint: number;
  cumulativeLayoutShift: number;
}

interface ImageLoadEvent {
  src: string;
  loadTime: number;
  size: number;
  success: boolean;
}

class PerformanceMonitor {
  private imageEvents: ImageLoadEvent[] = [];
  private startTime: number;

  constructor() {
    this.startTime = performance.now();
    this.initializeObservers();
  }

  private initializeObservers() {
    // Performance Observer for Core Web Vitals
    if ('PerformanceObserver' in window) {
      // First Contentful Paint
      try {
        const fcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry) => {
            if (entry.name === 'first-contentful-paint') {
              console.log('FCP:', entry.startTime);
            }
          });
        });
        fcpObserver.observe({ entryTypes: ['paint'] });
              } catch {
          console.warn('FCP observer not supported');
        }

      // Largest Contentful Paint
      try {
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry) => {
            console.log('LCP:', entry.startTime);
          });
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
              } catch {
          console.warn('LCP observer not supported');
        }

      // Cumulative Layout Shift
      try {
        const clsObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          let clsValue = 0;
          entries.forEach((entry: PerformanceEntry & { hadRecentInput?: boolean; value?: number }) => {
            if (!entry.hadRecentInput) {
              clsValue += entry.value || 0;
            }
          });
          console.log('CLS:', clsValue);
        });
        clsObserver.observe({ entryTypes: ['layout-shift'] });
              } catch {
          console.warn('CLS observer not supported');
        }
    }
  }

  trackImageLoad(src: string, loadTime: number, size: number, success: boolean) {
    const event: ImageLoadEvent = {
      src,
      loadTime,
      size,
      success
    };
    this.imageEvents.push(event);

    // Log performance data in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`Image loaded: ${src}`, {
        loadTime: `${loadTime.toFixed(2)}ms`,
        size: `${(size / 1024).toFixed(2)}KB`,
        success
      });
    }
  }

  getMetrics(): PerformanceMetrics {
    const totalLoadTime = performance.now() - this.startTime;
    
    const successfulImages = this.imageEvents.filter(e => e.success);
    const averageImageLoadTime = successfulImages.length > 0 
      ? successfulImages.reduce((sum, e) => sum + e.loadTime, 0) / successfulImages.length 
      : 0;

    return {
      imageLoadTime: averageImageLoadTime,
      totalLoadTime,
      firstContentfulPaint: 0, // Would be populated by observer
      largestContentfulPaint: 0, // Would be populated by observer
      cumulativeLayoutShift: 0 // Would be populated by observer
    };
  }

  getImageStats() {
    const totalImages = this.imageEvents.length;
    const successfulImages = this.imageEvents.filter(e => e.success).length;
    const totalSize = this.imageEvents.reduce((sum, e) => sum + e.size, 0);
    const averageLoadTime = successfulImages > 0 
      ? this.imageEvents.filter(e => e.success).reduce((sum, e) => sum + e.loadTime, 0) / successfulImages 
      : 0;

    return {
      totalImages,
      successfulImages,
      failedImages: totalImages - successfulImages,
      totalSize: `${(totalSize / 1024 / 1024).toFixed(2)}MB`,
      averageLoadTime: `${averageLoadTime.toFixed(2)}ms`,
      successRate: `${((successfulImages / totalImages) * 100).toFixed(1)}%`
    };
  }

  generateReport(): string {
    const metrics = this.getMetrics();
    const stats = this.getImageStats();

    return `
Performance Report:
==================
Total Load Time: ${metrics.totalLoadTime.toFixed(2)}ms
Average Image Load Time: ${metrics.imageLoadTime.toFixed(2)}ms

Image Statistics:
================
Total Images: ${stats.totalImages}
Successful: ${stats.successfulImages}
Failed: ${stats.failedImages}
Success Rate: ${stats.successRate}
Total Size: ${stats.totalSize}
Average Load Time: ${stats.averageLoadTime}
    `.trim();
  }
}

// Global performance monitor instance
let performanceMonitor: PerformanceMonitor | null = null;

export function getPerformanceMonitor(): PerformanceMonitor {
  if (!performanceMonitor) {
    performanceMonitor = new PerformanceMonitor();
  }
  return performanceMonitor;
}

export function trackImagePerformance(src: string, loadTime: number, size: number, success: boolean) {
  const monitor = getPerformanceMonitor();
  monitor.trackImageLoad(src, loadTime, size, success);
}

export function getPerformanceReport(): string {
  const monitor = getPerformanceMonitor();
  return monitor.generateReport();
}

// Export for debugging in development
if (typeof window !== 'undefined') {
  (window as unknown as Record<string, unknown>).getPerformanceReport = getPerformanceReport;
}
