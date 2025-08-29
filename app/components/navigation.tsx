'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ChevronLeftIcon, ChevronRightIcon, HomeIcon } from '@heroicons/react/24/outline';
import { PortfolioPiece } from '../types/portfolio';

interface NavigationProps {
  currentPiece: PortfolioPiece;
  previousPiece?: PortfolioPiece;
  nextPiece?: PortfolioPiece;
  showHome?: boolean;
}

export default function Navigation({ 
  currentPiece, 
  previousPiece, 
  nextPiece, 
  showHome = true 
}: NavigationProps) {
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30, scale: 0.95 },
    visible: { 
      opacity: 1, 
      x: 0, 
      scale: 1
    }
  };

  const rightItemVariants = {
    hidden: { opacity: 0, x: 30, scale: 0.95 },
    visible: { 
      opacity: 1, 
      x: 0, 
      scale: 1
    }
  };

  return (
    <motion.nav
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full max-w-[800px] mx-auto px-6 py-8 border-t border-border"
    >
      <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-0">
        {/* Previous Piece */}
        <motion.div variants={itemVariants} className="flex-1 w-full lg:w-auto">
          {previousPiece ? (
            <Link
              href={`/portfolio/${previousPiece.slug}`}
              className="group flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors duration-200 w-full justify-center lg:justify-start"
            >
              <motion.div
                whileHover={{ x: -4 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronLeftIcon className="w-5 h-5" />
              </motion.div>
              <div className="text-center lg:text-right">
                <div className="text-xs text-muted-foreground uppercase tracking-wide">
                  Previous
                </div>
                <div className="font-medium line-clamp-1 group-hover:text-accent-foreground transition-colors duration-200 max-w-32 lg:max-w-none">
                  {previousPiece.title}
                </div>
              </div>
            </Link>
          ) : (
            <div className="flex-1" />
          )}
        </motion.div>

        {/* Current Piece Info */}
        <motion.div 
          variants={itemVariants}
          className="flex flex-col items-center text-center px-4 order-first lg:order-none"
        >
          <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
            Current Project
          </div>
          <div className="font-medium text-sm text-foreground line-clamp-2 max-w-48 text-center">
            {currentPiece.title}
          </div>
        </motion.div>

        {/* Next Piece */}
        <motion.div variants={rightItemVariants} className="flex-1 w-full lg:w-auto">
          {nextPiece ? (
            <Link
              href={`/portfolio/${nextPiece.slug}`}
              className="group flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors duration-200 w-full justify-center lg:justify-end"
            >
              <div className="text-center lg:text-left">
                <div className="text-xs text-muted-foreground uppercase tracking-wide">
                  Next
                </div>
                <div className="font-medium line-clamp-1 group-hover:text-accent-foreground transition-colors duration-200 max-w-32 lg:max-w-none">
                  {nextPiece.title}
                </div>
              </div>
              <motion.div
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronRightIcon className="w-5 h-5" />
              </motion.div>
            </Link>
          ) : (
            <div className="flex-1" />
          )}
        </motion.div>
      </div>

      {/* Progress Indicator */}
      <motion.div 
        variants={itemVariants}
        className="mt-6 flex justify-center"
      >
      
      {showHome && (
          <Link
            href="/"
            className="mt-3 flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors duration-200 px-3 py-2 bg-muted rounded-lg hover:bg-accent hover:text-accent-foreground transition-all duration-200"
          >
            <span className="hidden sm:inline">Back to home</span>
          </Link>
        )}
      </motion.div>
    </motion.nav>
  );
}
