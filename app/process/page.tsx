'use client';

import dynamic from 'next/dynamic';
import ProcessHeader from '../components/process-header';
import ProcessSteps from '../components/process-steps';
import DesignPrinciples from '../components/design-principles';
import ToolsMethods from '../components/tools-methods';
import ProcessCTA from '../components/process-cta';
import ProcessFlowDiagram from '../components/process-flow-diagram';
import ProcessTimeline from '../components/process-timeline';
import DesignMetrics from '../components/design-metrics';
import Logo from '../components/logo';
import Footer from '../components/footer';
import { 
  processSteps, 
  designPrinciples, 
  toolsAndMethods,
  processFlowSteps,
  timelinePhases,
  designMetrics
} from '../lib/process-data';

const ThemeToggle = dynamic(() => import('../components/theme-toggle'), {
  ssr: false,
  loading: () => <div className="fixed top-6 right-6 z-50 w-14 h-14" />
});

export default function ProcessPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Logo */}
      <Logo />
      
      {/* Theme Toggle */}
      <ThemeToggle />

      {/* Header */}
      <ProcessHeader
        title="My Design Process"
        description="A systematic approach to solving complex design challenges through research, iteration, and user-centered design principles. Here&apos;s how I approach design problems and deliver impactful solutions."
      />

      {/* Process Steps */}
      <div className="py-8 sm:py-12">
        <ProcessSteps steps={processSteps} />
      </div>


      {/* Design Principles */}
      <div className="py-8 sm:py-12">
        <DesignPrinciples principles={designPrinciples} />
      </div>


      {/* Tools & Methods */}
      <div className="py-8 sm:py-12">
        <ToolsMethods tools={toolsAndMethods} />
      </div>

      {/* Call to Action */}
      <div className="py-8 sm:py-16">
        <ProcessCTA
          title="Ready to see this process in action?"
          description="Explore my portfolio to see how this methodology translates into real design solutions."
          buttonText="View Portfolio"
          buttonLink="/"
        />
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}
