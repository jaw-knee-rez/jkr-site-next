'use client';

import { motion } from 'framer-motion';
import { LightBulbIcon, UserGroupIcon, CogIcon, ChartBarIcon, RocketLaunchIcon } from '@heroicons/react/24/outline';

interface ProcessFlowStep {
  id: number;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  color: string;
}

interface ProcessFlowDiagramProps {
  steps: ProcessFlowStep[];
}

export default function ProcessFlowDiagram({ steps }: ProcessFlowDiagramProps) {
  return (
    <section className="w-full max-w-[800px] mx-auto px-6 py-12">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="text-2xl sm:text-3xl font-bold text-foreground mb-8 text-center"
      >
        Process Flow
      </motion.h2>

      <div className="relative">
        {/* Connection Line */}
        <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-accent/20 via-accent to-accent/20 transform -translate-y-1/2 z-0" />

        {/* Steps */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-4 relative z-10">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="flex flex-col items-center text-center"
            >
              {/* Step Circle */}
              <div className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-full ${step.color} flex items-center justify-center mb-4 shadow-lg`}>
                <step.icon className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                
                {/* Step Number */}
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-background border-2 border-accent rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-accent-foreground">{step.id}</span>
                </div>
              </div>

              {/* Step Title */}
              <h3 className="text-sm sm:text-base font-semibold text-foreground mb-2 leading-tight">
                {step.title}
              </h3>

              {/* Step Description */}
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {step.description}
              </p>

              {/* Arrow (Desktop Only) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-full w-4 h-4 transform -translate-y-2 z-20">
                  <svg className="w-full h-full text-accent" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
                  </svg>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Mobile Connection Lines */}
        <div className="lg:hidden">
          {steps.slice(0, -1).map((_, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scaleY: 0 }}
              whileInView={{ opacity: 1, scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 + 0.3 }}
              className="w-0.5 h-8 bg-accent/30 mx-auto my-4"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
