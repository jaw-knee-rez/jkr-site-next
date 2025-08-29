'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

interface ProcessHeaderProps {
  title: string;
  description: string;
  backLink?: string;
  backText?: string;
}

export default function ProcessHeader({ 
  title, 
  description, 
  backLink = "/", 
  backText = "Back to Portfolio" 
}: ProcessHeaderProps) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-[800px] mx-auto px-6 py-8"
    >
      <div className="flex items-center gap-4 mb-6">
        <Link
          href={backLink}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-200"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          <span>{backText}</span>
        </Link>
      </div>
      
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4"
      >
        {title}
      </motion.h1>
      
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-base sm:text-lg text-muted-foreground leading-relaxed"
      >
        {description}
      </motion.p>
    </motion.header>
  );
}
