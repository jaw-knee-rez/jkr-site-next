'use client';

import { motion } from 'framer-motion';

interface TimelinePhase {
  id: number;
  title: string;
  duration: string;
  weeks: number;
  color: string;
  description: string;
}

interface ProcessTimelineProps {
  phases: TimelinePhase[];
}

export default function ProcessTimeline({ phases }: ProcessTimelineProps) {
  const totalWeeks = phases.reduce((sum, phase) => sum + phase.weeks, 0);

  return (
    <section className="w-full max-w-[800px] mx-auto px-6 py-12">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="text-2xl sm:text-3xl font-bold text-foreground mb-8 text-center"
      >
        Project Timeline
      </motion.h2>

      <div className="space-y-6">
        {/* Timeline Bar */}
        <div className="relative">
          <div className="h-4 bg-muted rounded-full overflow-hidden">
            {phases.map((phase, index) => {
              const width = (phase.weeks / totalWeeks) * 100;
              const left = phases
                .slice(0, index)
                .reduce((sum, p) => sum + (p.weeks / totalWeeks) * 100, 0);

              return (
                <motion.div
                  key={phase.id}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${width}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  className={`absolute top-0 h-full ${phase.color} rounded-full`}
                  style={{ left: `${left}%` }}
                />
              );
            })}
          </div>

          {/* Week Markers */}
          <div className="flex justify-between mt-2 text-xs text-muted-foreground">
            {Array.from({ length: Math.ceil(totalWeeks / 2) + 1 }, (_, i) => (
              <span key={i} className="text-center">
                {i * 2}w
              </span>
            ))}
          </div>
        </div>

        {/* Phase Details */}
        <div className="grid gap-4 sm:gap-6">
          {phases.map((phase, index) => (
            <motion.div
              key={phase.id}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="flex items-start gap-4 p-4 bg-card border border-border rounded-lg"
            >
              {/* Phase Color Indicator */}
              <div className={`flex-shrink-0 w-4 h-4 ${phase.color} rounded-full mt-1`} />
              
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                  <h3 className="text-lg font-semibold text-card-foreground">
                    {phase.title}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 ${phase.color} rounded-full text-xs font-medium text-white`}>
                      {phase.duration}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {phase.weeks} week{phase.weeks !== 1 ? 's' : ''}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {phase.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Total Duration */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center p-4 bg-accent/10 rounded-lg border border-accent/20"
        >
          <p className="text-sm text-muted-foreground">
            Total project duration: <span className="font-semibold text-foreground">{totalWeeks} weeks</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
