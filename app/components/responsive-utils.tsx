'use client';

import { useEffect, useState } from 'react';

export interface ViewportInfo {
  width: number;
  height: number;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  breakpoint: string;
}

export function useViewport() {
  const [viewport, setViewport] = useState<ViewportInfo>({
    width: 0,
    height: 0,
    isMobile: false,
    isTablet: false,
    isDesktop: false,
    breakpoint: 'unknown'
  });

  useEffect(() => {
    function updateViewport() {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      let isMobile = false;
      let isTablet = false;
      let isDesktop = false;
      let breakpoint = 'unknown';

      if (width < 640) {
        isMobile = true;
        breakpoint = 'sm';
      } else if (width < 1024) {
        isTablet = true;
        breakpoint = 'lg';
      } else {
        isDesktop = true;
        breakpoint = 'xl';
      }

      setViewport({
        width,
        height,
        isMobile,
        isTablet,
        isDesktop,
        breakpoint
      });
    }

    updateViewport();
    window.addEventListener('resize', updateViewport);
    
    return () => window.removeEventListener('resize', updateViewport);
  }, []);

  return viewport;
}

export function getResponsiveClass(viewport: ViewportInfo, component: string): string {
  const classes = {
    'container': viewport.isMobile ? 'px-4' : viewport.isTablet ? 'px-6' : 'px-8',
    'text': viewport.isMobile ? 'text-sm' : viewport.isTablet ? 'text-base' : 'text-lg',
    'spacing': viewport.isMobile ? 'py-4' : viewport.isTablet ? 'py-6' : 'py-8',
    'grid': viewport.isMobile ? 'grid-cols-1' : viewport.isTablet ? 'grid-cols-2' : 'grid-cols-3'
  };

  return classes[component as keyof typeof classes] || '';
}

export function validateResponsiveLayout(viewport: ViewportInfo): string[] {
  const issues: string[] = [];

  // Check for common responsive issues
  if (viewport.width < 320) {
    issues.push('Viewport width is too small for mobile devices');
  }

  if (viewport.width > 1920) {
    issues.push('Viewport width exceeds common desktop sizes');
  }

  if (viewport.height < 400) {
    issues.push('Viewport height is too small for comfortable viewing');
  }

  return issues;
}
