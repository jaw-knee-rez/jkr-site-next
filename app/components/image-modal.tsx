'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { XMarkIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { PortfolioImage } from '../types/portfolio';

interface ImageModalProps {
  images: PortfolioImage[];
  initialIndex: number;
  isOpen: boolean;
  onClose: () => void;
}

export default function ImageModal({ images, initialIndex, isOpen, onClose }: ImageModalProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  // Update current index when initialIndex changes
  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  // Handle keyboard navigation and scroll locking
  useEffect(() => {
    if (!isOpen) return;

    // Lock body scroll
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          navigateToPrevious();
          break;
        case 'ArrowRight':
          navigateToNext();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    
    // Cleanup function to restore scroll and remove event listener
    return () => {
      document.body.style.overflow = originalStyle;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, currentIndex, onClose]);

  const navigateToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const navigateToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const currentImage = images[currentIndex];

  if (!isOpen || !currentImage) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
        onClick={onClose}
      >
        {/* Modal Content */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative min-w-[80vw] max-w-[90vw] max-h-[90vh] bg-background rounded-lg overflow-hidden shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 bg-background/80 backdrop-blur-sm rounded-full hover:bg-background transition-colors duration-200"
            aria-label="Close modal"
          >
            <XMarkIcon className="w-6 h-6 text-foreground" />
          </button>

          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              {/* Previous Button */}
              <button
                onClick={navigateToPrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-1.5 bg-background/80 backdrop-blur-sm rounded-full hover:bg-background transition-colors duration-200"
                aria-label="Previous image"
              >
                <ChevronLeftIcon className="w-3 h-3 text-foreground" />
              </button>

              {/* Next Button */}
              <button
                onClick={navigateToNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-1.5 bg-background/80 backdrop-blur-sm rounded-full hover:bg-background transition-colors duration-200"
                aria-label="Next image"
              >
                <ChevronRightIcon className="w-3 h-3 text-foreground" />
              </button>
            </>
          )}

          {/* Image Container */}
          <div className="relative w-full h-full">
            <Image
              src={currentImage.src}
              alt={currentImage.alt}
              width={currentImage.width}
              height={currentImage.height}
              className="w-full h-auto max-h-[90vh] object-contain"
              priority
              quality={100}
            />
          </div>

          {/* Image Info */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/90 to-transparent p-6">
            <div className="text-center">
              {/* Image Counter */}
              <p className="text-sm text-muted-foreground mb-2">
                {currentIndex + 1} of {images.length}
              </p>
              
              {/* Image Caption */}
              {currentImage.caption && (
                <p className="text-foreground font-medium">{currentImage.caption}</p>
              )}
            </div>
          </div>


        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
