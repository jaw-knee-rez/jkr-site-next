'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface ScreenSize {
  name: string;
  width: number;
  height: number;
}

const screenSizes: ScreenSize[] = [
  { name: 'Mobile S', width: 320, height: 568 },
  { name: 'Mobile M', width: 375, height: 667 },
  { name: 'Mobile L', width: 425, height: 812 },
  { name: 'Tablet', width: 768, height: 1024 },
  { name: 'Laptop', width: 1024, height: 768 },
  { name: 'Desktop', width: 1440, height: 900 },
  { name: 'Large Desktop', width: 1920, height: 1080 }
];

export default function ResponsiveTest() {
  const [currentSize, setCurrentSize] = useState<ScreenSize>(screenSizes[0]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show in development mode
    if (process.env.NODE_ENV === 'development') {
      setIsVisible(true);
    }
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card border border-border rounded-lg shadow-lg p-4 max-w-xs"
      >
        <h3 className="text-sm font-semibold text-card-foreground mb-3">
          Responsive Test
        </h3>
        
        <div className="space-y-2">
          {screenSizes.map((size) => (
            <button
              key={size.name}
              onClick={() => setCurrentSize(size)}
              className={`w-full text-left px-3 py-2 rounded text-xs transition-colors ${
                currentSize.name === size.name
                  ? 'bg-accent text-accent-foreground'
                  : 'text-muted-foreground hover:bg-muted'
              }`}
            >
              <div className="font-medium">{size.name}</div>
              <div className="text-xs opacity-75">
                {size.width} × {size.height}
              </div>
            </button>
          ))}
        </div>

        <div className="mt-3 pt-3 border-t border-border">
          <div className="text-xs text-muted-foreground">
            Current: {currentSize.name}
          </div>
          <div className="text-xs text-muted-foreground">
            {currentSize.width} × {currentSize.height}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
