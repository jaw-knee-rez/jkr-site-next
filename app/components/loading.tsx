'use client';

import { motion } from 'framer-motion';

export default function Loading() {
  const skeletonVariants = {
    initial: { opacity: 0.3 },
    animate: { 
      opacity: [0.3, 0.7, 0.3],
      transition: {
        duration: 1.5,
        repeat: Infinity
      }
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="w-full max-w-[800px] mx-auto px-6 py-16">
        {/* Header Skeleton */}
        <div className="mb-8">
          {/* Breadcrumbs Skeleton */}
          <div className="mb-6">
            <div className="flex items-center gap-2">
              <motion.div
                variants={skeletonVariants}
                initial="initial"
                animate="animate"
                className="w-4 h-4 bg-muted rounded"
              />
              <motion.div
                variants={skeletonVariants}
                initial="initial"
                animate="animate"
                className="w-20 h-4 bg-muted rounded"
              />
              <motion.div
                variants={skeletonVariants}
                initial="initial"
                animate="animate"
                className="w-4 h-4 bg-muted rounded"
              />
              <motion.div
                variants={skeletonVariants}
                initial="initial"
                animate="animate"
                className="w-32 h-4 bg-muted rounded"
              />
            </div>
          </div>

          {/* Title and Meta Skeleton */}
          <div className="space-y-4">
            <motion.div
              variants={skeletonVariants}
              initial="initial"
              animate="animate"
              className="w-3/4 h-12 bg-muted rounded"
            />
            <motion.div
              variants={skeletonVariants}
              initial="initial"
              animate="animate"
              className="w-full h-6 bg-muted rounded"
            />
            <motion.div
              variants={skeletonVariants}
              initial="initial"
              animate="animate"
              className="w-2/3 h-6 bg-muted rounded"
            />
          </div>

          {/* Project Details Skeleton */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6 border-t border-border mt-6">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="space-y-2">
                <motion.div
                  variants={skeletonVariants}
                  initial="initial"
                  animate="animate"
                  className="w-16 h-3 bg-muted rounded"
                />
                <motion.div
                  variants={skeletonVariants}
                  initial="initial"
                  animate="animate"
                  className="w-20 h-4 bg-muted rounded"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Content Sections Skeleton */}
        {[...Array(4)].map((_, sectionIndex) => (
          <div key={sectionIndex} className="py-12 border-t border-border">
            <motion.div
              variants={skeletonVariants}
              initial="initial"
              animate="animate"
              className="w-48 h-8 bg-muted rounded mb-6"
            />
            <div className="space-y-4">
              <motion.div
                variants={skeletonVariants}
                initial="initial"
                animate="animate"
                className="w-full h-6 bg-muted rounded"
              />
              <motion.div
                variants={skeletonVariants}
                initial="initial"
                animate="animate"
                className="w-5/6 h-6 bg-muted rounded"
              />
              <motion.div
                variants={skeletonVariants}
                initial="initial"
                animate="animate"
                className="w-4/5 h-6 bg-muted rounded"
              />
            </div>
          </div>
        ))}

        {/* Image Gallery Skeleton */}
        <div className="py-12 border-t border-border">
          <motion.div
            variants={skeletonVariants}
            initial="initial"
            animate="animate"
            className="w-48 h-8 bg-muted rounded mb-8"
          />
          
          {/* Horizontal Scrolling Gallery Skeleton */}
          <div className="relative">
            <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-4">
              {[...Array(4)].map((_, index) => (
                <motion.div
                  key={index}
                  variants={skeletonVariants}
                  initial="initial"
                  animate="animate"
                  className="flex-shrink-0 w-full max-w-md space-y-3"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="relative overflow-hidden rounded-lg border border-border">
                    <motion.div
                      variants={skeletonVariants}
                      initial="initial"
                      animate="animate"
                      className="w-full h-48 bg-muted"
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
                        delay: index * 0.2
                      }}
                    />
                  </div>
                  <motion.div
                    variants={skeletonVariants}
                    initial="initial"
                    animate="animate"
                    className="w-32 h-4 bg-muted rounded mx-auto"
                  />
                </motion.div>
              ))}
            </div>
            
            {/* Scroll indicator skeleton */}
            <motion.div
              variants={skeletonVariants}
              initial="initial"
              animate="animate"
              className="text-center mt-4"
            >
              <div className="w-48 h-3 bg-muted rounded mx-auto" />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
