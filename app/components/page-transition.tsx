'use client';

import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { ReactNode, useEffect, useState } from 'react';

interface PageTransitionProps {
  children: ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const [visiblePath, setVisiblePath] = useState<string | null>(null);

  // Content is hidden until the delay elapses for the current path
  const isVisible = visiblePath === pathname;

  // Handle page transitions
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisiblePath(pathname);
    }, 100);
    
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ 
        duration: 0.4,
        ease: 'easeInOut'
      }}
      className="w-full min-h-screen"
    >
      {children}
    </motion.div>
  );
}
