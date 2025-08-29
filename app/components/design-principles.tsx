'use client';

import { motion } from 'framer-motion';

interface DesignPrinciple {
  title: string;
  description: string;
  examples: string[];
}

interface DesignPrinciplesProps {
  principles: DesignPrinciple[];
}

export default function DesignPrinciples({ principles }: DesignPrinciplesProps) {
  return (
    <section className="w-full max-w-[800px] mx-auto px-6 py-12 border-t border-border">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-bold text-foreground mb-8"
      >
        Design Principles
      </motion.h2>

              <div className="grid gap-4 sm:gap-6">
          {principles.map((principle, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-card border border-border rounded-lg p-4 sm:p-6"
            >
              <h3 className="text-lg sm:text-xl font-semibold text-card-foreground mb-3">
                {principle.title}
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground mb-4 leading-relaxed">
                {principle.description}
              </p>
              <div className="flex flex-wrap gap-1 sm:gap-2">
                {principle.examples.map((example, exampleIndex) => (
                  <motion.span
                    key={exampleIndex}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: exampleIndex * 0.1 }}
                    className="px-2 sm:px-3 py-1 bg-accent/20 rounded-full text-xs sm:text-sm text-accent-foreground"
                  >
                    {example}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
    </section>
  );
}
