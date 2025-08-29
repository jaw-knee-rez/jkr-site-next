'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../lib/theme-context';

export default function ThemeTransitionOverlay() {
  const { isTransitioning } = useTheme();

  return (
    <AnimatePresence>
      {isTransitioning && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[9999] pointer-events-none"
          style={{
            background: 'radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.1) 100%)',
          }}
        >
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute top-6 right-6 w-4 h-4 bg-accent rounded-full"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
