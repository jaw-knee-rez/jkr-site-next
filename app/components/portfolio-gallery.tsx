'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import PortfolioCard from './portfolio-card';
import { PortfolioPiece } from '../types/portfolio';

interface PortfolioGalleryProps {
  pieces: PortfolioPiece[];
  title?: string;
  subtitle?: string;
  loading?: boolean;
}

export default function PortfolioGallery({ pieces, title, subtitle, loading = false }: PortfolioGalleryProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);

  // Check scroll position to show/hide navigation arrows
  const checkScrollPosition = () => {
    if (!scrollContainerRef.current) return;
    
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    // Use a small threshold to account for rounding errors
    setShowLeftArrow(scrollLeft > 5);
    setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 5);
  };

  // Handle scroll events
  const handleScroll = () => {
    if (!isScrolling) {
      setIsScrolling(true);
      setTimeout(() => setIsScrolling(false), 150);
    }
    checkScrollPosition();
  };

  // Scroll to specific direction
  const scrollTo = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    
    const container = scrollContainerRef.current;
    const scrollAmount = container.clientWidth * 0.8; // Scroll 80% of container width
    
    container.scrollTo({
      left: direction === 'left' 
        ? container.scrollLeft - scrollAmount 
        : container.scrollLeft + scrollAmount,
      behavior: 'smooth'
    });
  };

  // Handle keyboard navigation
  const handleKeyDown = (event: KeyboardEvent) => {
    if (!scrollContainerRef.current) return;
    
    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault();
        scrollTo('left');
        break;
      case 'ArrowRight':
        event.preventDefault();
        scrollTo('right');
        break;
      case 'Home':
        event.preventDefault();
        scrollToStart();
        break;
      case 'End':
        event.preventDefault();
        scrollToEnd();
        break;
    }
  };

  // Scroll to beginning
  const scrollToStart = () => {
    if (!scrollContainerRef.current) return;
    scrollContainerRef.current.scrollTo({ left: 0, behavior: 'smooth' });
  };

  // Scroll to end
  const scrollToEnd = () => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    container.scrollTo({ 
      left: container.scrollWidth - container.clientWidth, 
      behavior: 'smooth' 
    });
  };

  useEffect(() => {
    // Add a small delay to ensure container is properly sized
    const timer = setTimeout(() => {
      checkScrollPosition();
    }, 100);
    
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      window.addEventListener('resize', checkScrollPosition);
      window.addEventListener('keydown', handleKeyDown);
      
      return () => {
        clearTimeout(timer);
        container.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', checkScrollPosition);
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
    
    return () => clearTimeout(timer);
  }, [pieces, handleScroll, handleKeyDown]);

  if (!pieces.length) {
    return (
      <div className="w-full max-w-[800px] mx-auto py-12 text-center">
        <p className="text-muted-foreground">No portfolio pieces available yet.</p>
      </div>
    );
  }

  return (
    <section className="w-full py-12">
      {/* Header */}
      {(title || subtitle) && (
        <div className="max-w-[800px] mx-auto mb-8 px-6">
          {title && (
            <h2 className="text-3xl font-bold text-foreground mb-2 text-left">{title}</h2>
          )}
          {subtitle && (
            <p className="text-lg text-muted-foreground mb-4 text-left">{subtitle}</p>
          )}   
        </div>
      )}

      {/* Gallery Container */}
      <div className="relative group w-4/5 mx-auto">
        {/* Navigation Arrows */}
        <AnimatePresence>
          {showLeftArrow && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={() => scrollTo('left')}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 bg-background/90 backdrop-blur-sm border border-border rounded-full p-2 sm:p-3 shadow-lg hover:bg-background transition-all duration-200 opacity-100 sm:opacity-0 sm:group-hover:opacity-100"
              aria-label="Scroll left"
            >
              <ChevronLeftIcon className="w-5 h-5 sm:w-6 sm:h-6 text-foreground" />
            </motion.button>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showRightArrow && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={() => scrollTo('right')}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 bg-background/90 backdrop-blur-sm border border-border rounded-full p-2 sm:p-3 shadow-lg hover:bg-background transition-all duration-200 opacity-100 sm:opacity-0 sm:group-hover:opacity-100"
              aria-label="Scroll right"
            >
              <ChevronRightIcon className="w-5 h-5 sm:w-6 sm:h-6 text-foreground" />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Scroll Container */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto pt-5 scrollbar-hide pb-4 snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {loading ? (
            // Loading skeleton cards
            [...Array(5)].map((_, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="snap-start"
              >
                <div className="group relative flex-shrink-0 w-80 h-96 bg-card border border-border rounded-lg overflow-hidden shadow-sm">
                  {/* Image skeleton */}
                  <div className="relative h-48 overflow-hidden">
                    <motion.div
                      className="w-full h-full bg-muted animate-pulse"
                      animate={{
                        opacity: [0.5, 0.8, 0.5],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: index * 0.2
                      }}
                    />
                    {/* Shimmer effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      animate={{
                        x: ['-100%', '100%'],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: index * 0.3
                      }}
                    />
                  </div>
                  
                  {/* Content skeleton */}
                  <div className="p-6 flex flex-col h-48">
                    <div className="flex items-center justify-between mb-3">
                      <motion.div className="w-16 h-3 bg-muted rounded animate-pulse" />
                      <motion.div className="w-12 h-3 bg-muted rounded animate-pulse" />
                    </div>
                    <motion.div className="w-3/4 h-6 bg-muted rounded mb-2 animate-pulse" />
                    <motion.div className="w-full h-4 bg-muted rounded mb-2 animate-pulse" />
                    <motion.div className="w-5/6 h-4 bg-muted rounded mb-2 animate-pulse" />
                    <motion.div className="w-4/5 h-4 bg-muted rounded flex-grow animate-pulse" />
                    <div className="flex gap-2 mt-3">
                      <motion.div className="w-12 h-6 bg-muted rounded-full animate-pulse" />
                      <motion.div className="w-16 h-6 bg-muted rounded-full animate-pulse" />
                      <motion.div className="w-14 h-6 bg-muted rounded-full animate-pulse" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            pieces.map((piece, index) => (
              <div key={piece.id} className="snap-start">
                <PortfolioCard piece={piece} index={index} />
              </div>
            ))
          )}
        </div>

        {/* Scroll Indicators */}
        <div className="mt-6 text-center">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-sm text-muted-foreground">
            <motion.button
              onClick={scrollToStart}
              className="flex items-center gap-2 px-3 py-2 bg-muted rounded-lg hover:bg-accent hover:text-accent-foreground transition-all duration-200"
              whileHover={{ scale: 1.05, x: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeftIcon className="w-4 h-4" />
              <span className="hidden sm:inline">Start</span>
            </motion.button>
            <motion.span 
              className="text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {pieces.length} piece{pieces.length !== 1 ? 's' : ''}
            </motion.span>
            <motion.button
              onClick={scrollToEnd}
              className="flex items-center gap-2 px-3 py-2 bg-muted rounded-lg hover:bg-accent hover:text-accent-foreground transition-all duration-200"
              whileHover={{ scale: 1.05, x: 2 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="hidden sm:inline">End</span>
              <ChevronRightIcon className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
