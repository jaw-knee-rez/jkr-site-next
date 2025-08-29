'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

interface ProcessCTAProps {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
}

export default function ProcessCTA({ 
  title, 
  description, 
  buttonText, 
  buttonLink 
}: ProcessCTAProps) {
  return (
    <section className="w-full max-w-[800px] mx-auto px-6 py-16 text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="border-t border-border pt-12"
      >
                  <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4">
            {title}
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground mb-6">
            {description}
          </p>
        <Link
          href={buttonLink}
          className="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background rounded-lg hover:bg-muted-foreground transition-colors duration-200 font-medium"
        >
          {buttonText}
          <ArrowLeftIcon className="w-4 h-4 rotate-180" />
        </Link>
      </motion.div>
    </section>
  );
}
