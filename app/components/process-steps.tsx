'use client';

import { motion } from 'framer-motion';

interface ProcessStep {
  id: number;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  details: string[];
  duration: string;
  deliverables: string[];
}

interface ProcessStepsProps {
  steps: ProcessStep[];
}

export default function ProcessSteps({ steps }: ProcessStepsProps) {
  return (
    <section className="w-full max-w-[800px] mx-auto px-6 py-12">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-bold text-foreground mb-8"
      >
        The Design Process
      </motion.h2>

      <div className="space-y-8">
        {steps.map((step, index) => (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="relative"
          >
                          {/* Step Number */}
              <div className="absolute -left-2 sm:-left-4 top-0 w-6 h-6 sm:w-8 sm:h-8 bg-accent rounded-full flex items-center justify-center text-xs sm:text-sm font-bold text-accent-foreground">
                {step.id}
              </div>

              <div className="bg-card border border-border rounded-lg p-4 sm:p-6 ml-2 sm:ml-4">
                <div className="flex flex-col sm:flex-row sm:items-start gap-4 mb-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center">
                    <step.icon className="w-6 h-6 text-accent-foreground" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg sm:text-xl font-semibold text-card-foreground mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sm sm:text-base text-muted-foreground mb-3">
                      {step.description}
                    </p>
                    <div className="flex items-center gap-4 text-xs sm:text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <span className="w-2 h-2 bg-accent rounded-full"></span>
                        Duration: {step.duration}
                      </span>
                    </div>
                  </div>
                </div>

                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <h4 className="text-sm sm:text-base font-semibold text-card-foreground mb-3">Key Activities</h4>
                    <ul className="space-y-2">
                      {step.details.map((detail, detailIndex) => (
                        <motion.li
                          key={detailIndex}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: detailIndex * 0.1 }}
                          className="flex items-start gap-2 text-xs sm:text-sm text-muted-foreground"
                        >
                          <span className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0"></span>
                          {detail}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-semibold text-card-foreground mb-3">Deliverables</h4>
                    <div className="flex flex-wrap gap-1 sm:gap-2">
                      {step.deliverables.map((deliverable, deliverableIndex) => (
                        <motion.span
                          key={deliverableIndex}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.3, delay: deliverableIndex * 0.1 }}
                          className="px-2 sm:px-3 py-1 bg-muted rounded-full text-xs text-muted-foreground"
                        >
                          {deliverable}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
