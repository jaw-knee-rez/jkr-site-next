'use client';

import { motion } from 'framer-motion';

interface ToolCategory {
  category: string;
  items: string[];
}

interface ToolsMethodsProps {
  tools: ToolCategory[];
}

export default function ToolsMethods({ tools }: ToolsMethodsProps) {
  return (
    <section className="w-full max-w-[800px] mx-auto px-6 py-12 border-t border-border">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-bold text-foreground mb-8"
      >
        Tools & Methods
      </motion.h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {tools.map((toolCategory, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="bg-card border border-border rounded-lg p-4 sm:p-6"
          >
            <h3 className="text-base sm:text-lg font-semibold text-card-foreground mb-3 sm:mb-4">
              {toolCategory.category}
            </h3>
            <div className="flex flex-wrap gap-1 sm:gap-2">
              {toolCategory.items.map((tool, toolIndex) => (
                <motion.span
                  key={toolIndex}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: toolIndex * 0.1 }}
                  className="px-2 sm:px-3 py-1 bg-muted rounded-full text-xs sm:text-sm text-muted-foreground"
                >
                  {tool}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
