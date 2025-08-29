'use client';

import { motion } from 'framer-motion';
import { 
  ChartBarIcon, 
  UserGroupIcon, 
  ClockIcon, 
  CurrencyDollarIcon,
  ArrowTrendingUpIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';

interface Metric {
  id: number;
  title: string;
  value: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  trend?: 'up' | 'down' | 'stable';
}

interface DesignMetricsProps {
  metrics: Metric[];
}

export default function DesignMetrics({ metrics }: DesignMetricsProps) {
  return (
    <section className="w-full max-w-[800px] mx-auto px-6 py-12">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="text-2xl sm:text-3xl font-bold text-foreground mb-8 text-center"
      >
        Design Impact Metrics
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="bg-card border border-border rounded-lg p-4 sm:p-6 hover:shadow-lg transition-shadow duration-300"
          >
            {/* Icon and Trend */}
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 ${metric.color} rounded-lg flex items-center justify-center`}>
                <metric.icon className="w-6 h-6 text-white" />
              </div>
              {metric.trend && (
                <div className="flex items-center gap-1">
                  {metric.trend === 'up' && (
                    <ArrowTrendingUpIcon className="w-5 h-5 text-green-500" />
                  )}
                  {metric.trend === 'down' && (
                    <ArrowTrendingUpIcon className="w-5 h-5 text-red-500 transform rotate-180" />
                  )}
                  {metric.trend === 'stable' && (
                    <CheckCircleIcon className="w-5 h-5 text-blue-500" />
                  )}
                </div>
              )}
            </div>

            {/* Metric Value */}
            <div className="mb-2">
              <h3 className="text-2xl sm:text-3xl font-bold text-foreground">
                {metric.value}
              </h3>
            </div>

            {/* Metric Title */}
            <h4 className="text-sm sm:text-base font-semibold text-card-foreground mb-2">
              {metric.title}
            </h4>

            {/* Description */}
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              {metric.description}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Summary Note */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="mt-8 text-center p-4 bg-accent/10 rounded-lg border border-accent/20"
      >
        <p className="text-sm text-muted-foreground">
          These metrics represent typical outcomes from implementing user-centered design processes. 
          Actual results may vary based on project scope and context.
        </p>
      </motion.div>
    </section>
  );
}
